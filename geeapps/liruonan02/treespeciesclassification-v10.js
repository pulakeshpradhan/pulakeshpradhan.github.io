/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var roi = 
    /* color: #98ff00 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[99.66331559617714, 27.485708932375502],
                  [99.66331559617714, 26.582973968457043],
                  [100.82511979539589, 26.582973968457043],
                  [100.82511979539589, 27.485708932375502]]], null, false),
            {
              "system:index": "0"
            })]);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
/**===============================require========================================== **/
var feaAccess = require("users/liruonan02/Apps:TreeSpeciesClassification/file/1_featureExtract.js"); 
var timeSeries = require("users/liruonan02/Apps:TreeSpeciesClassification/file/2_FQ1_sg_timeSeries.js");
var sample = require("users/liruonan02/Apps:TreeSpeciesClassification/file/3_sample.js");
var Grid = require("users/liruonan02/Apps:TreeSpeciesClassification/file/4_Grid.js");
var classifierModel = require("users/liruonan02/Apps:TreeSpeciesClassification/file/5_classifierModel.js");
var Normal = require("users/liruonan02/Apps:TreeSpeciesClassification/file/6_normalization.js");
/**===============================app========================================== **/
var app = {};  
/**===============================app.createHelpers============================ **/
app.createHelpers = function(){
  app.setLoadingMode = function(enabled) {
        // Set each of the widgets to the given enabled mode.
        var loadDependentWidgets = [
            app.roi.selectROI,
            app.dateFilter.startDate,
            app.dateFilter.endDate,
            app.dateFilter.applyButton, 
            app.feaSelect.texture,
            app.feaSelect.spectral,
            app.feaSelect.timeSeries,
            app.feaSelect.terrain,
            app.feaSelect.maxent,
            app.feaSelect.allFea,
            app.feaSelect.optimalFea,
            app.classifier.classifierApply,
            app.classifier.enAccuracy,
            app.classifier.yunnanClassResult,
        ];
    };
  /** get features : spectral,texture,timeSeries,terrain**/
    /* ================ get composite image=======*/
  app.applyCompositeImg = function(){
      app.setLoadingMode(true);
      var studyArea = app.STUDYAREA_OPTIONS[app.roi.selectROI.getValue()].roi;
      var geo = ee.Feature(studyArea.first()).bounds();
      geo = ee.Feature(geo);
      geo = ee.FeatureCollection([geo]);   
      var start = app.dateFilter.startDate.getValue();
      if (start) start = ee.Date(start);
      var end = app.dateFilter.endDate.getValue();
      if (end) end = ee.Date(end);
      var sentinelImg = feaAccess.sentinel(start,end,geo);
      return sentinelImg;
  }
    /* ================ function for abtaining terrain =======*/ 
  app.fea_Terrain = function(){
      var studyArea = app.STUDYAREA_OPTIONS[app.roi.selectROI.getValue()].roi; 
      var geo = ee.Feature(studyArea.first()).bounds();
      geo = ee.Feature(geo);
      geo = ee.FeatureCollection([geo]);
      var srtm = ee.Image("USGS/SRTMGL1_003");
      var dem = ee.Algorithms.Terrain(srtm).clip(geo).select(['elevation','slope','aspect']);
      return dem.toInt16();
  }
    /* ================ function for abtaining texture feature =======*/
  app.fea_texture = function(){
    var composite = app.applyCompositeImg();
    var band =['blue', 'green', 'red','red1','red2','red3','nir','red4','swir1', 'swir2'];
        var _bands = composite.select(band).multiply(10000).toInt32();
        var _bandName = _bands.bandNames().get(0);
        var square = ee.Kernel.square({radius:4});
        var entropy = _bands.entropy(square);
        var _glcm = _bands.glcmTexture({size:4}).set('id',ee.String(_bandName));
        var  glcm = _glcm.select (
        "blue_contrast","green_contrast","red_contrast","red1_contrast","red2_contrast","red3_contrast","nir_contrast","red4_contrast","swir1_contrast","swir2_contrast",
        "blue_diss","green_diss","red_diss","red1_diss","red2_diss","red3_diss","nir_diss","red4_diss","swir1_diss","swir2_diss",
        "blue_var","green_var","red_var","red1_var","red2_var","red3_var","nir_var","red4_var","swir1_var","swir2_var",
        "blue_corr","green_corr","red_corr","red1_corr","red2_corr","red3_corr","nir_corr","red4_corr","swir1_corr","swir2_corr",
        "blue_savg","green_savg", "red_savg","red1_savg", "red2_savg", "red3_savg", "nir_savg","red4_savg","swir1_savg","swir2_savg",
        "blue_shade","green_shade","red_shade","red1_shade","red2_shade","red3_shade","nir_shade","red4_shade","swir1_shade","swir2_shade"
      ); 
      return glcm;  }
    /* ================ function for abtaining time series feature =======*/
  app.sg_timeSeries = function(){
    var studyArea = app.STUDYAREA_OPTIONS[app.roi.selectROI.getValue()].roi; 
    var geo = ee.Feature(studyArea.first()).bounds();
    geo = ee.Feature(geo);
    geo = ee.FeatureCollection([geo]);
    var Composite_interval = ee.Number(5);
    var start_date = ee.Date("2016-01-01");
    var rep_series = timeSeries.sg_series(start_date,Composite_interval,geo,"REP");
    var ndvi_series = timeSeries.sg_series(start_date,Composite_interval,geo,"NDVI");
    return rep_series.merge(ndvi_series)
  }
  /** ================ function for feature combiantion =======**/
  app.classImg = function(){
    var compositeImg = app.applyCompositeImg();
    var terrain = app.fea_Terrain();
    var texture = app.fea_texture();
    var timeSeriesCol = app.sg_timeSeries();
    var ndvi_series = timeSeriesCol.filter(ee.Filter.eq("feaName",'NDVI')).toBands();
    var rep_series = timeSeriesCol.filter(ee.Filter.eq("feaName",'REP')).toBands();
    var rep = rep_series.regexpRename('^(1_)', 'b_');
    var ndvi = ndvi_series.regexpRename('^(2_)', 'b_');
    var timeSeries = ee.Image.cat(rep,ndvi);
    var maxent = app.classMasentImg();
    var allFea = ee.Image.cat([compositeImg,terrain,texture,timeSeries]).float();
    var outputImg = ee.Image();
    var feaSetName = app.FEATURESET_OPTIONS[app.feaSelect.feaSetSelect.getValue()].abre;
    if (feaSetName == 'All features set'){
      outputImg = allFea;
      if (app.classifier.serialEnsemble.getValue()){outputImg = outputImg.addBands(maxent);}
      else{outputImg = outputImg;}
    }
    else if  (feaSetName == 'Optimal features set'){
      outputImg = allFea.select(app.featureOptimationBandName);
      if (app.classifier.serialEnsemble.getValue()){outputImg = outputImg.addBands(maxent);}
      else{outputImg = outputImg;}
    }
    else if (feaSetName == 'Optimal features set + MaxEnt probability'){
              outputImg = allFea.select(app.featureOptimationBandName).addBands(maxent);
              }
    else if (feaSetName == 'Selected features from below'){ 
              if (app.feaSelect.texture.getValue()){ outputImg = outputImg.addBands(texture);}
              if (app.feaSelect.terrain.getValue()){ outputImg = outputImg.addBands(terrain);}
              if (app.feaSelect.timeSeries.getValue()){ outputImg = outputImg.addBands(timeSeries);} 
              if (app.feaSelect.spectral.getValue()){ outputImg = outputImg.addBands(compositeImg);}
              if (app.feaSelect.maxent.getValue()){ outputImg = outputImg.addBands(maxent)}
              else {
                    if (app.classifier.serialEnsemble.getValue()){outputImg = outputImg.addBands(maxent);}
                    else{outputImg = outputImg;}
                  }
              var bandName = outputImg.bandNames();
              var length = bandName.length();
              bandName = bandName.slice(1,ee.Number(length-1))
              outputImg = outputImg.select(bandName)
    }
    return outputImg; 
  }
  /** ================ function for classification and visualization =======**/
    /* ================ maxent =======*/
  app.classMasentImg = function(){
    var studyArea = app.STUDYAREA_OPTIONS[app.roi.selectROI.getValue()].roi;
    var geo = ee.Feature(studyArea.first()).bounds();
    geo = ee.Feature(geo);
    geo = ee.FeatureCollection([geo]);
    var MaxEntResult = ee.Image();
    var fq1ynszdscs = ee.Image("users/fu/FQ1TEST/fq1ynszdsnew"),
        fq1llzdscs = ee.Image("users/fu/FQ1TEST/fq1llzdsnew"),
        fq1lszdscs = ee.Image("users/fu/FQ1TEST/fq1lszdsnew"),
        fq1gsszdscs = ee.Image("users/fu/FQ1TEST/fq1gsszdsnew"),
        fq1qmzdscs = ee.Image("users/fu/FQ1TEST/fq1qmzdsnew"),
        fq1yszdscs = ee.Image("users/fu/FQ1TEST/fq1yszdsnew"),
          fq1qtkzdscs= ee.Image("users/fu/FQ1TEST/fq1qtkzdsnew"),
          fq1hsszdscs = ee.Image("users/fu/FQ1TEST/fq1hsszdsnew"), 
          fq1lyszdscs = ee.Image("users/fu/FQ1TEST/fq1lyszdsnew");
      var image1 = fq1ynszdscs.rename("a_treetype_1");
      var image2 = fq1llzdscs.rename("a_treetype_2");
      var image3 = fq1lszdscs.rename("a_treetype_3");
      var image4 = fq1gsszdscs.rename("a_treetype_4");
      var image5 = fq1qmzdscs.rename("a_treetype_5");
      var image6 = fq1yszdscs.rename("a_treetype_6");
      var image7 = fq1qtkzdscs.rename("a_treetype_7");
      var image8 = fq1hsszdscs.rename("a_treetype_8");
      var image9 = fq1lyszdscs.rename("a_treetype_9");
      MaxEntResult = image1.addBands(image2)
                           .addBands(image3)
                           .addBands(image4)
                           .addBands(image5)
                           .addBands(image6)
                           .addBands(image7)
                           .addBands(image8)
                           .addBands(image9);
     return MaxEntResult.clip(geo);              
  }
    /* ================ function for select classifier model =======*/
  app.classModel = function(classifierName,mode,image,trainSample){
    // obtain training sample
    var  training = image.sampleRegions({
                      collection:trainSample,
                      properties: ['name'],
                      scale: 10,
                      tileScale:16,
                  });
    var bandName;
     if  (app.feaSelect.optimalFea.getValue()){bandName = app.featureOptimationBandName;}
     else {bandName = image.bandNames();}
    var classModel;
    switch(classifierName){
      case 'RF':
        classModel = ee.Classifier.smileRandomForest({numberOfTrees:120,variablesPerSplit:null,bagFraction:1})
                                                  .setOutputMode(mode)
                                                  .train({
                                          features:training,
                                          classProperty: 'name',
                                          inputProperties:bandName
                                        });
        break;
      case "SVM":
        classModel = ee.Classifier.libsvm({kernelType: 'RBF',gamma:0.5,cost:8})
                                               .setOutputMode(mode)
                                               .train({
                                                        features: training,
                                                        classProperty: 'name',
                                                      inputProperties: bandName
                                                                      });
        break;
      case "XGBoost":
        classModel = ee.Classifier.smileGradientTreeBoost({numberOfTrees:45,shrinkage:0.006,samplingRate:0.8})
                                                   .setOutputMode(mode)
                                                   .train({features:training,
                                                           classProperty: 'name',
                                                            inputProperties: bandName
                                                           });
        break;
    }
    return classModel;
  }
    /* ================ function for classification=======*/
  app.classification = function(classifierName,mode){
    // mode:'CLASSIFICATION' || 'MULTIPROBABILITY', which means output classification or probability
      // get the studyArea
      var studyArea = app.STUDYAREA_OPTIONS[app.roi.selectROI.getValue()].roi;
      var studyAreaName = app.STUDYAREA_OPTIONS[app.roi.selectROI.getValue()].abre;
      // get a feature containing the bounding box of the geometry of a given feature
      var geo = ee.Feature(studyArea.first()).bounds();
      geo = ee.Feature(geo);
      geo = ee.FeatureCollection([geo]);
    // obtain images used for classification
    var composerimage = app.classImg();
    var mask = app.DATA_OPTIONS.Yunnan_forestMask.clip(geo)
    composerimage = composerimage.updateMask(mask.eq(1))
    var normal_image = Normal.main(composerimage,geo,1000);
    // obtain samples used for training classifier
    var samples = app.SAMPLE_SELECTION[app.roi.sampleSelection.getValue()].trainData;
        samples = ee.FeatureCollection(samples).filterBounds(studyArea)
    // conduct classification
        //generate grid;
    var grid = app.DATA_OPTIONS.Region1_Grid;
        //train classification model
    var classModel = app.classModel(classifierName,mode,normal_image,samples);
    var classResult; 
    switch (studyAreaName){
      case 'ROI': 
        classResult  = normal_image.classify(classModel);
        if (mode == 'CLASSIFICATION'){classResult = classResult;}
        else if (mode == 'MULTIPROBABILITY'){
          classResult = classResult.arrayProject([0])
                         .arrayFlatten([['a_treetype_1', 'a_treetype_2', 'a_treetype_3', 'a_treetype_4', 'a_treetype_5', 
                                        'a_treetype_6', 'a_treetype_7', 'a_treetype_8', 'a_treetype_9']]);
        }
        break;
      case 'Region_1':
        classResult = Grid.classification(normal_image,classModel,grid);
        classResult = ee.ImageCollection(classResult);
        if (mode == 'CLASSIFICATION'){classResult = classResult;}
        else if (mode == 'MULTIPROBABILITY'){
          classResult = classResult.map(function(img){
            var out = img.arrayProject([0])
                         .arrayFlatten([['a_treetype_1', 'a_treetype_2', 'a_treetype_3', 'a_treetype_4', 'a_treetype_5', 
                                        'a_treetype_6', 'a_treetype_7', 'a_treetype_8', 'a_treetype_9']]);
            return out;
          })
        }
        classResult = classResult.max().clip(studyArea);
        break;
    }
    return ee.Image(classResult);
  };
  app.classResult = function(classifierName){
    var classResult;
    if (classifierName == 'Parallel ensemble'){
      classResult = app.ParallelEnsembleNew();}
    else if (classifierName == 'MaxEnt + RF'){
      classResult = app.classification("RF","CLASSIFICATION");
    }
    else if (classifierName == 'MaxEnt + SVM'){
      classResult = app.classification("SVM","CLASSIFICATION");
    }
    else if (classifierName == 'MaxEnt + XgBoost'){
      classResult = app.classification("XgBoost","CLASSIFICATION");
    }
    else if (classifierName == 'MaxEnt'){
      classResult = ee.Image("users/fu/FQ1TEST/FQ1MaxEntresult").rename('classification');
    }
    else {
      classResult = app.classification(classifierName,"CLASSIFICATION");
    }
    return classResult;
  };
  app.ProbabilityResult = function(classifierName){
    var ProbabilityResult;
    if (classifierName == 'MaxEnt'){ProbabilityResult =app.classMasentImg()}
    else {ProbabilityResult = app.classification(classifierName,"MULTIPROBABILITY");}
    return ProbabilityResult;
  }
  /**===================ensemble learning==================*/
    /* ======= Serial Ensemble==========*/ 
  app.SerialEnsembleNew = function(){
    var classResultAcc_RF  = app.calculateAcc("RF","CLASSIFICATION");
    var classResultAcc_SVM  = app.calculateAcc("SVM","CLASSIFICATION");
    var classResultAcc_XGBoost  = app.calculateAcc("XGBoost","CLASSIFICATION");
    var OA_RF = classResultAcc_RF.accuracy();
    var OA_SVM = classResultAcc_SVM.accuracy();
    var OA_XGBoost = classResultAcc_XGBoost.accuracy();
    var OA_RF_string = ee.Number(OA_RF).multiply(100).format('%.3f');
    var OA_SVM_string = ee.Number(OA_SVM).multiply(100).format('%.3f');
    var OA_XGBoost_string = ee.Number(OA_XGBoost).multiply(100).format('%.3f');
    print('The overall accuracy of RF is:',ee.String(OA_RF_string).cat('%'))
    print('The overall accuracy of SVM is:',ee.String(OA_SVM_string).cat('%'))
    print('The overall accuracy of XGBoost is:',ee.String(OA_XGBoost_string).cat('%'))
      var max = ee.List([OA_RF,OA_SVM,OA_XGBoost]).reduce(ee.Reducer.max());
      var m = ee.Algorithms.IsEqual(max,OA_RF); 
      var n = ee.Algorithms.IsEqual(max,OA_SVM);
      var o = ee.Algorithms.IsEqual(max,OA_XGBoost);
      var classResult = ee.Algorithms.If(m,app.classification("RF","CLASSIFICATION"),
                        ee.Algorithms.If(n,app.classification("SVM","CLASSIFICATION"),
                                           app.classification("XGBoost","CLASSIFICATION")));
    app.classifier.label.setValue('Classification is finished!')
    return classResult; }
  app.showSerialEnsemble = function(){
    var classResult = ee.Image('users/fu/FQ1TEST/FQ1MRFresult');
    app.classifier.label.setValue('Classification is finished!')
    return classResult;  }
    /* ======= Parallel Ensemble==========*/
  app.ParallelEnsembleNew = function(){
      // the probability image of RF
      var RFZJ = app.classification ("RF","MULTIPROBABILITY"); 
      // the probability image of SVM
      var SVMZJ = app.classification ("SVM","MULTIPROBABILITY"); 
      // the probability image of XGBoost
      var XGBoostZJ = app.classification ("XGBoost","MULTIPROBABILITY");
      // the probability image of maxEnt
      var maxEnt = app.classMasentImg();
      var method_a = maxEnt;
      var method_b = RFZJ;
      var method_c = SVMZJ;
      var method_d = XGBoostZJ;
      //====weighted======
      var weighted = ee.Image([]);
      for(var i=0;i<9;i++){
         var xuhao = i + 1;
         xuhao = ee.String('treetype_').cat(xuhao.toString());
         var treetype_i = method_a.select(i).multiply(0.15)
                                  .add(method_b.select(i).multiply(0.29))
                                  .add(method_c.select(i).multiply(0.28))
                                  .add(method_d.select(i).multiply(0.28)).rename(xuhao);
         weighted = weighted.addBands(treetype_i);
      }
      //=========translate probability image to classification image==========
    var list = ee.List.sequence(0,8);
        list = list.map(function(index){
          index = ee.Number(index)
          var j = index.add(1);
          j = ee.Number(j);
          var classImg = ee.Image.constant(j).cast({'constant': ee.PixelType('int', 1,9)})
                                             .rename('classification');
          var img = weighted.select(index).rename('probability').addBands(classImg);
          return img;})
    list = ee.ImageCollection(list);
    function getMaxAndOthers(col, maxBand, otherBands) {
      var theseBands = [maxBand].concat(otherBands);
      col = col.select(theseBands);
      return col.reduce(ee.Reducer.max(theseBands.length)).rename(theseBands);
    } 
    var probabilityMax = getMaxAndOthers(list, 'probability', 'classification');
    var classificationImg = probabilityMax.select(['classification']);
    return classificationImg; }
  /** =====================calculate confusion matrix===========================**/
  app.calculateAcc = function(classifierName,mode){
    // studyArea
    var studyArea = app.STUDYAREA_OPTIONS[app.roi.selectROI.getValue()].roi;
    // get a feature containing the bounding box of the geometry of a given feature
    var geo = ee.Feature(studyArea.first()).bounds();
    geo = ee.Feature(geo);
    geo = ee.FeatureCollection([geo]);
    // obtain images used for classification
    var composerimage = app.classImg();
    var mask = app.DATA_OPTIONS.Yunnan_forestMask.clip(geo)
    composerimage = composerimage.updateMask(mask.eq(1))
    var normal_image = Normal.main(composerimage,geo,1000);
    // obtain samples used for training classifier
    var trainsamples =  app.SAMPLE_SELECTION[app.roi.sampleSelection.getValue()].trainData;
        trainsamples = ee.FeatureCollection(trainsamples).filterBounds(studyArea)
    var testsamples = app.SAMPLE_SELECTION[app.roi.sampleSelection.getValue()].testData;
        testsamples = ee.FeatureCollection(testsamples).filterBounds(studyArea)
    var testSampleRegion = normal_image.sampleRegions(testsamples,['name'],10);
    var confuMatrix;
    var validData;
    var classModel;
    var classResult;
    switch (classifierName){
      case 'MaxEnt':
        confuMatrix = ee.Array([
        [0,0,0,0,0, 0,  0,  0,  0,  0],
        [0,838,526,1,73,112,7,173,28,0],
        [0,281,670,31,69,114,11,110,66,14],
        [0,2,5,876,37,0,137,60,0,162],
        [0,51,32,30,753,0,169,59,0,27],
        [0,125,240,0,0,261,0,183,37,0],
        [0,1,4,101,122,3,354,210,0,95],
        [0,144,61,8,33,39,35,446,30,5],
        [0,29,55,1,8,12,3,92,380,0],
        [0,0,4,65,11,0,52,10,0,248]
        ])
        confuMatrix =ee.ConfusionMatrix(confuMatrix)
        break;
      case 'RF':
        classModel = app.classModel(classifierName,"CLASSIFICATION",normal_image,trainsamples);
        confuMatrix = testSampleRegion.classify(classModel).errorMatrix('name', 'classification');
        break;
      case 'SVM':
        classModel = app.classModel(classifierName,"CLASSIFICATION",normal_image,trainsamples);
        confuMatrix = testSampleRegion.classify(classModel).errorMatrix('name', 'classification');
        break;
      case 'XGBoost':
        classModel = app.classModel(classifierName,"CLASSIFICATION",normal_image,trainsamples);
        confuMatrix = testSampleRegion.classify(classModel).errorMatrix('name', 'classification');
        break;
      case 'Parallel ensemble':
        classResult = app.ParallelEnsembleNew();
        validData = classResult.sampleRegions(testsamples,['name'],10);
        confuMatrix = validData.errorMatrix('name', 'classification');
        break;
      case 'Serial ensemble':
        if (app.classifier.serialEnsemble.getValue()){
              var name = app.classifier.serialEnsemble.getValue();
              if (name=='MaxEnt + RF'){
                classModel = app.classModel("RF","CLASSIFICATION",normal_image,trainsamples);
              }
              else if (name=='MaxEnt + SVM'){
                classModel = app.classModel("SVM","CLASSIFICATION",normal_image,trainsamples);
              }
              else if (name=='MaxEnt + XgBoost'){
                classModel = app.classModel("XGboost","CLASSIFICATION",normal_image,trainsamples);
              }
            }
        confuMatrix = testSampleRegion.classify(classModel).errorMatrix('name', 'classification');
        break;
    }
    return confuMatrix;
  } 
      /*  ========showing accuracy of result ======== */
  app.showAcc = function(classifierName,mode){
    var chart;
    var confuMatrix;
    confuMatrix = app.calculateAcc(classifierName,"CLASSIFICATION");
      var UA = confuMatrix.consumersAccuracy().project([1]);
      var PA = confuMatrix.producersAccuracy().project([0]);
      var Kappa = confuMatrix.kappa();
      var OA = confuMatrix.accuracy();
      PA = ee.Array(PA.slice(0,1,10));
      UA = ee.Array(UA.slice(0,1,10));
      var errorMatrix = confuMatrix.array();
      errorMatrix = errorMatrix.slice(0,1,10);
      errorMatrix = errorMatrix.slice(1,1,10);
      var PA_value = ee.Array([[PA.get([0]),PA.get([1]),PA.get([2]),PA.get([3]),PA.get([4]),PA.get([5]),PA.get([6]),PA.get([7]),PA.get([8])]]).multiply(100);
      var UA_value = ee.Array([[UA.get([0]),PA.get([1]),UA.get([2]),UA.get([3]),UA.get([4]),UA.get([5]),PA.get([6]),UA.get([7]),UA.get([8])]]).multiply(100);
      var array = ee.Array.cat([errorMatrix,PA_value,UA_value],0);
      chart = ui.Chart.array.values({array:array,axis:0,
                                      xLabels:['1.Pinus yunnanensis',  '2.Quercus L.','3.Picea asperata Mast.','4.Larix gmelinii', '5.Alnus cremastogyne Burk.',
                  '6.Abies fabri','7.Pinus armandii Franch.','8.Pinus densata Mast.','9.Other broadleaves','Producer Accuracy','User Accuracy'],
                    })
                .setSeriesNames([['1.Pinus yunnanensis'],  ['2.Quercus L.'],['3.Picea asperata Mast.'],['4.Larix gmelinii'], ['5.Alnus cremastogyne Burk.'],
                  ['6.Abies fabri'],['7.Pinus armandii Franch.'],['8.Pinus densata Mast.'],['9.Other broadleaves']])
                .setChartType("Table")
                .setOptions({title:'matrix',vAxis:{title: "predicted value"},hAxis: {title: 'true value'}});
      var titleLabel1 = ui.Label({
                  value:'Confusion Matrix',
                  style:{textAlign:'center',
                  width:'800px',
                  position:'top-center',
                  fontFamily:'serif',
                  fontSize:'12px',
                  fontWeight:'bold',
                  margin:'2px 2px 0px 0px'}});
      var titleLabel2 = ui.Label({
                    value:'True Classes',
                    style:{textAlign:'center',
                    width:'800px',
                    fontSize:'12px', 
                    position:'top-center',
                    fontFamily:'serif',
                    fontWeight:'bold',
                    margin:'2px 2px 0px 0px',}    });
      var label = ui.Panel({
                    widgets: [
                      titleLabel1,titleLabel2,chart,
                      ui.Panel([ui.Label({value:'Kappa:',style:{textAlign:'center',position:'top-center'}}),
                      ui.Label({value:ee.Number(Kappa).float().format("%.3f").getInfo()}),
                      ui.Label({value:'OA(%):',style:{textAlign:'center',position:'top-center'}}),
                      ui.Label({value:ee.Number(OA).multiply(100).format("%.2f").getInfo()})],ui.Panel.Layout.flow('horizontal'))],
                      style: {border:'1px solid black', margin:'5px 2px 1px 1px',fontFamily:'Times New Roman',position:'middle-left',fontSize:'8px'}    });
      app.result.accTable.clear().add(label).add(ui.Button({
      label: 'Close',
      onClick: function() {
        app.result.accTable.clear();
      }
    }));
      return chart;
  }
  /** =====================show===========================**/
    /*  ========add color to legend======== */
  app.addColor = function(color, name) {
        // Create the label that is actually the colored box.
        var colorBox = ui.Label({style: {backgroundColor: color,padding: '9px',margin: '1 0 4px 0'}});
        // Create the label filled with the description text.
        var description = ui.Label({value:name,style: {margin: '0 0 4px 6px' }});
        return ui.Panel({widgets: [colorBox, description],layout: ui.Panel.Layout.Flow('horizontal')});
    };
    /*  ========add legend to map======= */
  app.addLegend = function(out){
    var legend1 = ui.Panel({widgets:[ui.Label('Legend')],style: {fontFamily:'serif',fontSize:'12px', position: 'bottom-left',padding: '8px 8px'}});
        legend1 = legend1.add(app.addColor('09683c','1.Forest'))
                         .add(app.addColor('c4d4d8','2.Non-forest'));
    var legend2 = ui.Panel({widgets:[ui.Label('Legend')],style: {fontFamily:'monospace',position: 'bottom-left',padding: '8px 8px'}});
        legend2 = legend2.add(app.addColor('149136','1.Pinus yunnanensis'))
                         .add(app.addColor('4CE600','2.Quercus L.'))
                         .add(app.addColor('ED8EF5','3.Picea asperata Mast.'))
                         .add(app.addColor('FFFF00','4.Larix gmelinii'))
                         .add(app.addColor('00FFC5','5.Alnus cremastogyne Burk.'))
                         .add(app.addColor('364AC2','6.Abies fabri'))
                         .add(app.addColor('FF0000','7.Pinus armandii Franch.'))
                         .add(app.addColor('D4B311','8.Pinus densata Mast.'))
                         .add(app.addColor('FF00C5','9.Other broadleaves'))
                         .add(app.addColor('B4B4B4','10.Non-forest'));
var legend3 = ui.Panel({widgets:[ui.Label('Legend')],style: {fontFamily:'monospace',position: 'bottom-left',padding: '8px 8px'}});
    legend3 = legend3.add(app.addColor('149136','1.Pinus yunnanensis'))
                         .add(app.addColor('FFAA00','2.Cunninghamia lanceolata'))
                         .add(app.addColor('4CE600','3.Quercus L.'))
                         .add(app.addColor('FF00C5','4.Other broadleaves'))
                         .add(app.addColor('005CE6','5.Eucalyptus L.Herit '))
                         .add(app.addColor('FF0000','6.Pinus armandii Franch.'))
                         .add(app.addColor('00FFC5','7.Alnus cremastogyne Burk.'))
                         .add(app.addColor('AAFF00','8.Betula L.'))
                         .add(app.addColor('FF7F7F','9.Cupressus funebris Endl.'))
                         .add(app.addColor('A5D1B0','10.PopulusL.'))
                         .add(app.addColor('780701','11.Pinus kesiya var. langbianensis'))
                         .add(app.addColor('364AC2','12.Abies fabri'))
                         .add(app.addColor('D4B311','13.Pinus densata Mast.'))
                         .add(app.addColor('46FA73','14.Sassafras tsumu'))
                         .add(app.addColor('EB5E00','15.Hevea brasiliensis'))
                         .add(app.addColor('A900E6','16.Acacia dealbata Link.'))
                         .add(app.addColor('DE5F9F','17.Juglans regia'))
                         .add(app.addColor('ED8EF5','18.Picea asperata Mast.'))
                         .add(app.addColor('FFFF00','19.Larix gmelinii'))
                         .add(app.addColor('B4B4B4','20.Non-forest'));
    var legend;
    if (out == 'mask'){
      legend = legend1
      app.result.maskLegend.clear().add(legend).add(ui.Button({
      label: 'Close',
      onClick: function() {
        app.result.maskLegend.clear();
      }
    }))
    }
    else if (out == 'Region1_tree'){
      legend = legend2
      app.result.maskLegend.clear().add(legend).add(ui.Button({
      label: 'Close',
      onClick: function() {
        app.result.maskLegend.clear();
      }
    }))
    }
    else if (out == 'Yunnan_tree'){
      legend = legend3
      app.result.maskLegend.clear().add(legend).add(ui.Button({
      label: 'Close',
      onClick: function() {
        app.result.maskLegend.clear();
      }
    }))
    }
    return legend;
  }
    /*  ========showing classification result ======== */
  app.showClassifyResult = function(classifier,mode){
    // Map.clear();
    app.result.accTable.clear();
    var forest_names = ['1.Pinus yunnanensis',  '2.Quercus L.','3.Picea asperata Mast.','4.Larix gmelinii', '5.Alnus cremastogyne Burk.',
                        '6.Abies fabri','7.Pinus armandii Franch.','8.Pinus densata Mast.','9.Other broadleaves'];
    var forest_colors=['FF7500','267300','FF0000','751B30','005CE6','4CE600','AAFF00','FF00C5','00FFC5'];
    var vis = {min: 1,max: 9, palette: forest_colors};
    var region = app.STUDYAREA_OPTIONS[app.roi.selectROI.getValue()].roi;
    var classResult;
    var nName;
    if (classifier == 'Parallel ensemble'){
      classResult = app.ParallelEnsembleNew(); 
      nName = classifier}
    else if (classifier == 'MaxEnt + RF'){
      classResult = app.classification("RF","CLASSIFICATION");
      nName = 'MaxEnt + Random Forest classifier'
    }
    else if (classifier == 'MaxEnt + SVM'){
      classResult = app.classification("SVM","CLASSIFICATION");
      nName = 'MaxEnt + Support vector machine classifier'
    }
    else if (classifier == 'MaxEnt + XgBoost'){
      classResult = app.classification("XgBoost","CLASSIFICATION");
      nName = 'MaxEnt + XgBoost classifier'
    }
    else if (classifier == 'MaxEnt'){
      classResult = ee.Image("users/fu/FQ1TEST/FQ1MaxEntresult").rename('classification');
      nName = 'MaxEnt';
    }
    else {
      classResult = app.classification(classifier,mode);
      if (classifier == 'RF'){nName = 'Random Forest classifier'}
      else if (classifier == 'SVM'){nName = 'Support vector machine classifier'}
      else if (classifier == 'XgBoost'){nName = 'XgBoost classifier'}
    }
    switch (mode) {
      case 'CLASSIFICATION':
        print("CLASSIFICATION:",nName,classResult)
        classResult = ee.Image(classResult);
        classResult = classResult.updateMask(app.DATA_OPTIONS.Region1_forestMask.eq(1)).clip(region);
        Map.addLayer(classResult,vis,"Classification Result of " + classifier);
        // add legend
        app.addLegend('tree');
        var nonForest = app.DATA_OPTIONS.Region1_forestMask.updateMask(app.DATA_OPTIONS.Region1_forestMask.eq(0));
        nonForest = nonForest.clip(region)
        break;
      case 'MULTIPROBABILITY':
        if (classifier == 'MaxEnt'){classResult =app.classMasentImg ()}
        print("Probability Result of " + nName,classResult)
        app.showMaxentProbability(classResult)
        break;
    }
    app.classifier.label.setValue(nName +' is computing...');
  }
    /*  ========showing propability result of maxent======== */
  app.showMaxentProbability = function(probabilityImg){
    // A color bar widget. Makes a horizontal color bar to display the given
    function ColorBar(palette) {
      return ui.Thumbnail({
        image: ee.Image.pixelLonLat().select(0),
        params: {
          bbox: [0,0.3,0.8,1],
          dimensions: '100x10',
          format: 'png',
          min: 0,
          max: 1,
          palette: palette    },
        style: {stretch: 'horizontal', margin: '0px 8px'}
      });
    }
    function makeLegend() {
      var labelPanel = ui.Panel(
        [ ui.Label(0, {margin: '4px 8px'}),
        ui.Label(0.5,{margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label(1, {margin: '4px 8px'})],ui.Panel.Layout.flow('horizontal'));
      return ui.Panel([ColorBar(app.GRADIENT_STYLE.palette),labelPanel]);}  
    var panel = ui.Panel([ui.Label('Probability of species occurrence', app.LEGEND_TITLE_STYLE), makeLegend()],
                      ui.Panel.Layout.flow('vertical'), {width: '230px', position: 'bottom-left'})
    Map.addLayer(probabilityImg.select('a_treetype_1'), app.GRADIENT_STYLE,'1.Pinus yunnanensis');
    Map.addLayer(probabilityImg.select('a_treetype_2'), app.GRADIENT_STYLE,'2.Quercus L.');
    Map.addLayer(probabilityImg.select('a_treetype_3'), app.GRADIENT_STYLE,'3.Picea asperata Mast.');
    Map.addLayer(probabilityImg.select('a_treetype_4'), app.GRADIENT_STYLE,'4.Larix gmelinii');
    Map.addLayer(probabilityImg.select('a_treetype_5'), app.GRADIENT_STYLE,'5.Alnus cremastogyne Burk.');
    Map.addLayer(probabilityImg.select('a_treetype_6'), app.GRADIENT_STYLE,'6.Abies fabri');
    Map.addLayer(probabilityImg.select('a_treetype_7'), app.GRADIENT_STYLE,'7.Pinus armandii Franch.');
    Map.addLayer(probabilityImg.select('a_treetype_8'), app.GRADIENT_STYLE,'8.Pinus densata Mast.');
    Map.addLayer(probabilityImg.select('a_treetype_9'), app.GRADIENT_STYLE,'9.Other broadleaves');
    function clearResults() {
      var layers = Map.layers();
      // print(layers)
      // Map.layers().remove(Map.layers().get(2));
      var removeLayer = ['1.Pinus yunnanensis','2.Quercus L.','3.Picea asperata Mast.','4.Larix gmelinii',
                         '5.Alnus cremastogyne Burk.','6.Abies fabri','7.Pinus armandii Franch.',
                          '8.Pinus densata Mast.','9.Other broadleaves'];
          removeLayer.forEach(function(name){
                                    var layers = Map.layers();
                                 var layerNames = [];
                                // // get name
                                layers.forEach(function(layer){
                                  var layerName = layer.getName()
                                    layerNames.push(layerName)
                                  });
                                    var index = layerNames.indexOf(name);
                                    var layer = layers.get(index);
                                    // print(name,layer,index)
                                    Map.layers().remove(layer);
                                 })
}
    Map.add(panel)
    panel.add(ui.Button({
      label: 'Close',
      onClick: function() {
        panel.style().set('shown', false);
      }
    }));
  } 
    /*  ========showing result of entire yunnan province======== */
  app.showYunanMap = function(out){
    var region = app.STUDYAREA_OPTIONS['Example study area'].roi;
    Map.centerObject(region, 7);
    // forest mask
    var yunnanMask = app.DATA_OPTIONS.Yunnan_forestMask;
    var vis= {min: 1,max: 20, palette: app.LEGEND.Yunnan_treeColors};
    if (out == 'mask') {
      Map.addLayer(yunnanMask,{min:0,max:1,palette:['#c4d4d8','#09683c']},'forest mask');
      app.addLegend();
    }
    if (out == 'Region1_tree'){
      var img = app.DATA_OPTIONS.Yunnan_tree.clip(app.STUDYAREA_OPTIONS['Example study area'].roi)
      Map.addLayer(img,vis,"Tree Map of Region1");
      app.addLegend('Yunnan_tree');
    }
    else if (out == 'Yunnan_tree') {
      //tree map
      Map.addLayer(app.DATA_OPTIONS.Yunnan_tree,vis,"Tree Map of Yunnan");
      app.addLegend('Yunnan_tree');
    }
  }
  /** =====================export===========================**/
    /*  ========export classification result ======== */
  app.exportClassification = function(){
    var classifier = app.classifier_OPTIONS[app.showResult.buttonClassify.getValue()].classifier;
    var classResult;
    switch (classifier){
      case 'MaxEnt':
        classResult = ee.Image('users/fu/FQ1TEST/FQ1MaxEntresult').rename('classification');
        break;
      case 'RF':
        classResult = app.classification('RF','CLASSIFICATION');
        break;
      case 'SVM':
        classResult = app.classification('SVM','CLASSIFICATION');
        break;
      case 'XGBoost':
        classResult = app.classification('XGBoost','CLASSIFICATION');
        break;
      case 'Parallel ensemble':
            classResult = app.ParallelEnsembleNew(); 
        break;
      case 'Serial ensemble':
              var name = app.classifier.serialEnsemble.getValue();
              if (name=='MaxEnt + RF'){
                app.classification("MaxEnt + RF","CLASSIFICATION");
              }
              else if (name=='MaxEnt + SVM'){
                app.classification("MaxEnt + SVM","CLASSIFICATION");
              }
              else if (name=='MaxEnt + XgBoost'){
                app.classification("MaxEnt + XGBoost","CLASSIFICATION");
              }
              app.classifier.label.setValue("Serial ensemble" +' is computing...');
        break;
    }
    var region = app.STUDYAREA_OPTIONS[app.roi.selectROI.getValue()].roi;
    // Palette 
    var forest_colors=['FF7500','267300','FF0000','751B30','005CE6','4CE600','AAFF00','FF00C5','00FFC5'];
    var classResultParams = {min: 1, max: 9,palette: forest_colors}
    Export.image.toDrive({
      image: classResult.clip(region).visualize(classResultParams),
      description: classifier+'_classificationResult',
      scale: 10,
      region: region,
      crs:'EPSG:4326',
       maxPixels:1e13
      }); 
  }
};
/**===============================app.createPanels============================= **/
app.createPanels = function(){
  /* ========================== the part of introduce=========================== */
    app.intro = {
        panel: ui.Panel([
            ui.Label({
                value: 'Regionalized Mapping Forest Stand Species in a Large Mountainous Region by Fusing Machine Learning and Ecological Niche Model',
                style: {
                    fontWeight: 'bold',
                    fontSize: '14px',
                    margin: '5px 5px 1px 5px',
                    textAlign:'center',
                    position:'top-center',
                    color:'red',
                    shown: true,
                    fontFamily:'Times New Roman'
                }
            }),
            ui.Label('This app allows users to explore a combination of data (Sentinel-2 , DEM and WorldClim bioclimatic) and advanced classification models (Ecological Niche model and Machine Learning models) to obtain stand species distribution maps within a time window.',
                    {fontSize: '8px',color:'grey',fontFamily:'Times New Roman'})
        ])
    };
  /* ========================== the part of selecting and showing studyarea and samples====== */
    app.roi = {
       labelROI:ui.Label({value:'1. Selection of study area',style:app.SECTION_LABEL_STYLE}),
        // Create a select with a function that reacts to the "change" event.
       selectROI: ui.Select({
            items: Object.keys(app.STUDYAREA_OPTIONS),style:app.TEXT_STYLE,
            placeholder:'Select one study area',
            onChange: function() {
                app.roi.showArea.setDisabled(false);
            }}),
        showArea:ui.Button({label:'Show study area',style:app.TEXT_STYLE,disabled:true,
                               onClick:function(){
                                 var studyArea = app.STUDYAREA_OPTIONS[app.roi.selectROI.getValue()].roi;
                                  Map.addLayer(studyArea.style({color:'black',fillColor:'00000000'}),{},app.roi.selectROI.getValue());
                               }
        }),
       labelSample:ui.Label({value:'2. Selection of samples',style:app.SECTION_LABEL_STYLE}),
       sampleSelection:ui.Select({
            items: Object.keys(app.SAMPLE_SELECTION),style:app.TEXT_STYLE,
            placeholder:'Select one sample set',
            onChange: function() {app.roi.trainButton.setDisabled(false);app.roi.testButton.setDisabled(false);}
        }),
       trainButton:ui.Button({label:'Show training samples',style:{color:'#808080',margin: '3px 10px 2px 2px',fontSize: '8px',fontFamily:'Georgia',},disabled:true,
                               onClick:function(){
                                 var studyArea = app.STUDYAREA_OPTIONS[app.roi.selectROI.getValue()].roi;
                                 var train = app.SAMPLE_SELECTION[app.roi.sampleSelection.getValue()].trainData.filterBounds(studyArea)
                                 var chart1 = ui.Chart.feature.histogram({features:train, property:'type'})
                                                              .setOptions({title: 'Statistics of train samples',
                                                                           hAxis: {title: 'class',titleTextStyle: {italic: false, bold: true}}, 
                                                                           vAxis: {title: 'count',titleTextStyle: {italic: false, bold: true}},
                                                                           colors: ['1d6b99'],
                                                                           legend: {position: 'none'}})
                                 print("The number of training sample is :",train.size(),chart1)
                                 Map.addLayer(train,{},'training samples')
                               }
        }),
        testButton:ui.Button({label:'Show validation samples',style:{color:'#deb887',margin: '3px 10px 2px 2px',fontSize: '8px',fontFamily:'Georgia',},disabled:true,
                               onClick:function(){
                                 var studyArea = app.STUDYAREA_OPTIONS[app.roi.selectROI.getValue()].roi;
                                 var test =  app.SAMPLE_SELECTION[app.roi.sampleSelection.getValue()].testData.filterBounds(studyArea);
                                 var chart = ui.Chart.feature.histogram({features:test, property:'type'})
                                                             .setOptions({title: 'Statistics of test samples',
                                                                           hAxis: {title: 'class',titleTextStyle: {italic: false, bold: true}}, 
                                                                           vAxis: {title: 'count',titleTextStyle: {italic: false, bold: true}},
                                                                           colors: ['1d6b99'],
                                                                           legend: {position: 'none'}})
                                 print("The number of validation sample is :",test.size(),chart)
                                 Map.addLayer(test,{},'validation samples')
                               }})}
    app.roi.panel = ui.Panel({
        widgets: [//,{backgroundColor:'#deb887'}
            ui.Panel([app.roi.labelROI]),
            ui.Panel([app.roi.selectROI,app.roi.showArea],ui.Panel.Layout.flow('horizontal')),
            ui.Panel([app.roi.labelSample,app.roi.sampleSelection]),
            ui.Panel([ui.Panel([app.roi.trainButton],ui.Panel.Layout.flow('horizontal'),{margin: '3px 10px 2px 3px',backgroundColor:'#ffffff'}),
                      ui.Panel([app.roi.testButton],ui.Panel.Layout.flow('horizontal'),{margin: '3px 10px 2px 2px',backgroundColor:'#ffffff'})],
                      ui.Panel.Layout.flow('horizontal')),
        ],
        style: app.SECTION_STYLE
    })
    app.roi.selectROI.setValue(app.roi.selectROI.items().get(0));
  /* ========================== the part of selecting images by inputing year-month-date of image=== */
    app.dateFilter = {
        startDate: ui.Textbox({placeholder:'YYYY-MM-DD',value:'2015-07-01',style:{width:'100px',height:'25px'},
          onChange:function(){app.dateFilter.applyButton.setDisabled(false)}}),
        endDate: ui.Textbox({placeholder:'YYYY-MM-DD',style:{width:'100px',height:'25px'},
          onChange:function(){app.dateFilter.applyButton.setDisabled(false)}}),
        applyButton: ui.Button({label:'Show sentinel images', style:app.TEXT_STYLE,disabled:true,
                               onClick:function(){
                                 var studyArea = app.STUDYAREA_OPTIONS[app.roi.selectROI.getValue()].roi;
                                 var sentinelImg = app.applyCompositeImg().clipToCollection(studyArea);
                                 Map.addLayer(sentinelImg,{bands:['swir1','nir','red'],gamma:1.8,max:0.7,min:0},'sentinelImg')// swir1,nir,red
                               }}),
    };
    app.dateFilter.panel = ui.Panel({
        widgets: [ 
            ui.Label({value:'3. Sentinel imagery filter ',style:app.SECTION_LABEL_STYLE}),
            ui.Panel([ui.Label('Start date:', {margin: '10px 6px 0px 10px',fontSize: '8px',fontFamily:'Georgia',}),app.dateFilter.startDate,
                      ui.Label('End date:',{margin: '10px 6px 0px 10px',fontSize: '8px',fontFamily:'Georgia',}),app.dateFilter.endDate,],ui.Panel.Layout.flow('horizontal'),{position:'middle-left',height:'40px'}),
            ui.Panel([ui.Label('Apply filter and image composite *', app.TEXT_STYLE),app.dateFilter.applyButton],ui.Panel.Layout.flow('vertical')),
        ],
        style: app.SECTION_STYLE
    });
  /* ========================== the part of showing features==================== */
    app.feaSelect = {
      feacalcu:ui.Select({
            items: Object.keys(app.FEATURE_OPTIONS),
            placeholder:'Feature calculation',
            style:app.TEXT_STYLE,
            onChange: function() {app.feaSelect.feaShow.setDisabled(false);},
        }),
      feaShow:ui.Button({label:'Feature visualization',style:app.TEXT_STYLE,disabled:true,
                               onClick:function(){
                                 var fea;
                                 var name = app.FEATURE_OPTIONS[app.feaSelect.feacalcu.getValue()].abre;
                               if (name == 'Texture'){
                                 fea = app.fea_texture();
                                 print("60 bands for texture feature:",fea)}
                               else if (name == 'Spectral'){
                                 fea = app.applyCompositeImg();
                                 Map.addLayer(fea,{bands:['swir1','nir','red'],gamma:1.8,max:0.7,min:0},'spectral')}
                               else if (name == 'Time series'){
                                 fea = app.sg_timeSeries();
                                 var ndvi_series = fea.filter(ee.Filter.eq("feaName","NDVI"));
                                  var rep_series = fea.filter(ee.Filter.eq("feaName","REP"));
                                  var palette= ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901','66A000'];
                                  Map.addLayer(rep_series,{min:710,max:750,palette:palette},'rep_series');
                                  Map.addLayer(ndvi_series,{min:-1,max:1,palette:palette},'ndvi_series');
                               }
                               else if (name == 'Terrian'){
                                 fea = app.fea_Terrain();
                                 Map.addLayer(fea.select('elevation'),
                  {min:500,max:4000,
                  palette: ['3ae237', 'b5e22e', 'd6e21f', 'fff705', 'ffd611', 'ffb613', 'ff8b13',
                            'ff6e08', 'ff500d', 'ff0000', 'de0101', 'c21301', '0602ff', '235cb1',
                            '307ef3', '269db1', '30c8e2', '32d3ef', '3be285', '3ff38f', '86e26f'],
                  },'elevation');
      Map.addLayer(fea.select('slope'),
                  {min:0,max:90,
                  palette: ['3ae237', 'b5e22e', 'd6e21f', 'fff705', 'ffd611', 'ffb613', 'ff8b13',
                            'ff6e08', 'ff500d', 'ff0000', 'de0101', 'c21301', '0602ff', '235cb1',
                            '307ef3', '269db1', '30c8e2', '32d3ef', '3be285', '3ff38f', '86e26f'],
                  },'slope');
      Map.addLayer(fea.select('aspect'),
                  {min:0,max:360,
                  palette: ['3ae237', 'b5e22e', 'd6e21f', 'fff705', 'ffd611', 'ffb613', 'ff8b13',
                            'ff6e08', 'ff500d', 'ff0000', 'de0101', 'c21301', '0602ff', '235cb1',
                            '307ef3', '269db1', '30c8e2', '32d3ef', '3be285', '3ff38f', '86e26f'],
                  },'aspect');
                               }  
                               else if (name == 'The probability output of MaxEnt'){
                                 fea = app.classMasentImg();
                              app.showMaxentProbability(fea);
                               }
                               }}),
      texture : ui.Checkbox({label:'Texture',value:false,disabled:true,style:app.TEXT_STYLE}),
      spectral : ui.Checkbox({label:'Spectral',value:false,disabled:true,style:app.TEXT_STYLE}),
      timeSeries : ui.Checkbox({label:'Time series',value:false,disabled:true,style:app.TEXT_STYLE}),
      terrain : ui.Checkbox({label:'Terrian',disabled:true,value:false,style:app.TEXT_STYLE}),
      maxent:ui.Checkbox({label:'The probability output of MaxEnt',value:false,disabled:true,style:app.TEXT_STYLE}),
      selectFea:ui.Checkbox({label:'Selected Feature',value:false,style:app.TEXT_STYLE,
                              onChange:function(){
                                if (app.feaSelect.selectFea.getValue()){
                                   var outputImg = app.classImg();
                                  print("Features used for classification:",outputImg)
                            }}
      }),
      allFea:ui.Checkbox({label:'All Feature Set (MaxEnt probability not included)',value:false,style:app.TEXT_STYLE,
                              onChange:function(){
                                if (app.feaSelect.allFea.getValue()){
                                  var outputImg = app.classImg();
                                  print("Features used for classification:",outputImg);
                            }}
      }),
      optimalFea:ui.Checkbox({label:'Optimal Feature Set',value:false,style:app.TEXT_STYLE,
                              onChange:function(){
                                if (app.feaSelect.optimalFea.getValue()){
                                  var outputImg = app.classImg();
                                  print("Optimal feature combination:",outputImg);
                            }}
      }),
      optimalFeaM:ui.Checkbox({label:'Optimal Feature Set + MaxEnt probability',value:false,style:app.TEXT_STYLE,
                              onChange:function(){
                                if (app.feaSelect.optimalFea.getValue()){
                                  var outputImg = app.classImg();
                                  print("Optimal feature combination:",outputImg);
                            }}
      }),
      feaSetSelect:ui.Select({
        items:Object.keys(app.FEATURESET_OPTIONS),
        placeholder:'Feature set selection',
        value:'Optimal features set',
        style:app.TEXT_STYLE,
        onChange: function() {
          var setName = app.FEATURESET_OPTIONS[app.feaSelect.feaSetSelect.getValue()].abre;
          if (setName == 'Selected features from below'){
            app.feaSelect.spectral.setDisabled(false);
            app.feaSelect.texture.setDisabled(false)
            app.feaSelect.timeSeries.setDisabled(false)
            app.feaSelect.terrain.setDisabled(false)
            app.feaSelect.maxent.setDisabled(false)
          }
          else{
            app.feaSelect.spectral.setDisabled(true);
            app.feaSelect.texture.setDisabled(true)
            app.feaSelect.timeSeries.setDisabled(true)
            app.feaSelect.terrain.setDisabled(true)
            app.feaSelect.maxent.setDisabled(true)
          }
        }
      }),
    };
    app.feaSelect.panel = ui.Panel({
      widgets:[
        ui.Label({value:'4. Features calculation and selection',style:app.SECTION_LABEL_STYLE}),
        ui.Label({value:'Features calculation and visualization',style:app.TEXT_STYLE}),
        ui.Panel([app.feaSelect.feacalcu,app.feaSelect.feaShow],ui.Panel.Layout.flow('horizontal')),
        ui.Label({value:'Feature set selection*',style:app.TEXT_STYLE}),
        ui.Panel([app.feaSelect.feaSetSelect],ui.Panel.Layout.flow('horizontal')),
        ui.Panel([app.feaSelect.spectral,app.feaSelect.terrain,app.feaSelect.timeSeries,app.feaSelect.texture],
                  ui.Panel.Layout.flow('horizontal'),{margin:'2px 1px 1px 15px',}),
        ui.Panel([app.feaSelect.maxent],ui.Panel.Layout.flow('horizontal'),{margin:'2px 1px 1px 15px',}),
      ],
      style:app.SECTION_STYLE
    });
  /* ==========================the part of classification and showing accuracy============== */
    /* =======classifier===========*/
    var classifierOptions = ['MaxEnt','RF','SVM','XGBoost',/*'Parallel ensemble (MRSX)','Serial ensemble (MR,MS,MX)'*/];
    var singleClassifierPanel = ui.Panel({layout: ui.Panel.Layout.flow('horizontal'),style:app.TEXT_STYLE});
    app.classifierCheckboxes = classifierOptions.map(function(name){
      var checkbox = ui.Checkbox({label:name,style:app.TEXT_STYLE,onChange:function(){
        if (checkbox.getValue()){
          var out = app.classImg();
            print('Feature used for classification:',out)
          app.classifier.forecastC.setDisabled(false);
          app.classifier.forecastP.setDisabled(false);
        }
      }});
        switch (name){
          case 'MaxEnt':
            singleClassifierPanel.add(checkbox);
            break;
          case 'RF':
            singleClassifierPanel.add(checkbox);
            break;
          case 'SVM':
            singleClassifierPanel.add(checkbox);
            break;
          case 'XGBoost':
            singleClassifierPanel.add(checkbox);
            break;
  }
      return {'checkbox':checkbox,'name':name}});
    /* =======classifier panel ===========*/
    app.classifier = {
      // singleClassifierPanel
      singleClassifierPanel:singleClassifierPanel,
      // Options for classification results or probability results 
      forecastC:ui.Button({label:'Calculate CLASSIFICATION result',disabled:true,style:app.TEXT_STYLE,onClick:function(){
        var classResult;
        app.classifierCheckboxes.forEach(function(a){
          if (a.checkbox.getValue()){
            var c = a.name;
             var nName;
             if (c == 'RF'){nName = 'Random Forest classifier'}
             else if (c == 'SVM'){nName = 'Support vector machine classifier'}
             else if (c == 'XgBoost'){nName = 'XgBoost classifier'}
             classResult = app. classResult(c);
             app.classifier.label.setValue(nName+' is computing');
          }
  });
        app.classifier.singleAccuracy.setDisabled(false);
        app.classifier.showC.setDisabled(false);
}}),
      showC:ui.Button({label:'Dispaly CLASSIFICATION result',disabled:true,style:app.TEXT_STYLE,onClick:function(){
        app.classifier.label.setValue('Loading classification result');
        var classResult;
        app.result.accTable.clear();
        var forest_colors=['FF7500','267300','FF0000','751B30','005CE6','4CE600','AAFF00','FF00C5','00FFC5'];
        var vis = {min: 1,max: 9, palette: forest_colors};
        app.classifierCheckboxes.forEach(function(a){
          if (a.checkbox.getValue()){
            var c = a.name;
             var nName;
             if (c == 'RF'){nName = 'Random Forest classifier'}
             else if (c == 'SVM'){nName = 'Support vector machine classifier'}
             else if (c == 'XgBoost'){nName = 'XgBoost classifier'}
             classResult = app. classResult(c);
             print("Classification result of " + nName,classResult)
             Map.addLayer(classResult,vis,"Classification Result of " + nName);
             app.addLegend('tree');
             app.classifier.label.setValue(nName+' is computing');
          }
  });
        app.classifier.showC.setDisabled(false);
}}),
      forecastP:ui.Button({label:'Calculate MULTIPROBABILITY result',disabled:true,style:app.TEXT_STYLE,onClick:function(){
        app.classifierCheckboxes.forEach(function(a){
          if (a.checkbox.getValue()){
            var c = a.name;
              var result = app.ProbabilityResult(c);
              var nName;
             if (c == 'RF'){nName = 'Random Forest classifier'}
             else if (c == 'SVM'){nName = 'Support vector machine classifier'}
             else if (c == 'XgBoost'){nName = 'XgBoost classifier'}
             app.classifier.label.setValue(nName+' is computing...');
    }
  });
        app.classifier.showP.setDisabled(false);
}}),
      showP:ui.Button({label:'Dispaly MULTIPROBABILITY result',disabled:true,style:app.TEXT_STYLE,onClick:function(){
        app.classifierCheckboxes.forEach(function(a){
          if (a.checkbox.getValue()){
            var c = a.name;
              var result = app.ProbabilityResult(c);
              app.showMaxentProbability(result)
              var nName;
             if (c == 'RF'){nName = 'Random Forest classifier'}
             else if (c == 'SVM'){nName = 'Support vector machine classifier'}
             else if (c == 'XgBoost'){nName = 'XgBoost classifier'}
             app.classifier.label.setValue(nName+' is computing...');
             print("Probability Result of " + nName,result)
    }
  });
}}),
      singleAccuracy:ui.Button({label:'Calculate confusion matrix',disabled:true,
                               style:{margin: '3px 10px 2px 2px',width:'170px',fontSize: '8px',fontFamily:'Georgia'},
                               onClick:function(){
        app.classifier.label.setValue('It will take a long time...');
        app.classifierCheckboxes.forEach(function(a){
          if (a.checkbox.getValue()){
            var c = a.name;
              app.showAcc(c,"CLASSIFICATION"); }
  });
      }}),
      //ensembleClassifierPanel
      parallelEnsemble:ui.Select({
        items:Object.keys(app.ENSEMBLELEARNING_OPTIONS),
        placeholder:'Select parallel ensemble',
        style:{margin: '3px 10px 2px 2px',width:'170px',fontSize: '8px',fontFamily:'Georgia',}, 
        disabled:false,
        onChange:function(){app.classifier.classifierApply.setDisabled(false);}
      }),
      serialEnsemble:ui.Select({
        items:Object.keys(app.SERIALENSEMBLE_OPTIONS),disabled:false,
        placeholder:'Select serial ensemble',
        style:{margin: '3px 10px 2px 2px',width:'170px',fontSize: '8px',fontFamily:'Georgia',},
        onChange: function() {
          var setName = app.SERIALENSEMBLE_OPTIONS[app.classifier.serialEnsemble.getValue()].abre;
          app.classifier.classifierApply.setDisabled(false);
        }}),
      label:ui.Label(),
      classifierApply:ui.Button({label:'Perform prediction',disabled:true,
                                 style:{margin: '3px 10px 2px 2px',width:'170px',fontSize: '8px',fontFamily:'Georgia'},
                                 onClick:function(){
                                   var pName = app.classifier.parallelEnsemble.getValue();
                                   var sName = app.classifier.serialEnsemble.getValue();
                                   var result;
                                   if (pName == "Parallel ensemble"){
                                    result = app.classResult("Parallel ensemble");
                                    print("Prediction result of " + pName,result)
                                    app.classifier.parallelEnsemble.setValue('No selection',false);
                                    app.classifier.label.setValue('Parallel ensemble is computing...');
                                   }
                                   if (sName){
                                     if (sName=='No selection'){
                                       app.classifier.label.setValue("Do not perform classification");
                                     }
                                     else{
                                       result = app.classResult(sName);
                                       print("Prediction result of " + sName,result)
                                     }
                                     app.classifier.label.setValue("Serial ensemble is computing, please wait..");
                                     app.classifier.serialEnsemble.setValue('No selection',false);}
                                  app.classifier.enAccuracy.setDisabled(false);
                                  app.classifier.showclassifierApply.setDisabled(false);
}}),
      showclassifierApply:ui.Button({label:'Display prediction result',disabled:true,
                                 style:{margin: '3px 10px 2px 2px',width:'170px',fontSize: '8px',fontFamily:'Georgia'},
                                 onClick:function(){
                                   var forest_colors=['FF7500','267300','FF0000','751B30','005CE6','4CE600','AAFF00','FF00C5','00FFC5'];
                                   var vis = {min: 1,max: 9, palette: forest_colors};
                                   var pName = app.classifier.parallelEnsemble.getValue();
                                   var sName = app.classifier.serialEnsemble.getValue();
                                   var result;
                                   if (pName == "Parallel ensemble"){
                                    result = app.classResult("Parallel ensemble");
                                    app.classifier.label.setValue('Parallel ensemble is computing...');
                                    Map.addLayer(result,vis,"Classification Result of " + nName);
                                    app.addLegend('tree');
                                    app.classifier.parallelEnsemble.setValue('No selection',false);
                                   }
                                   if (sName){
                                     if (sName=='No selection'){
                                       app.classifier.label.setValue("Do not perform classification");
                                     }
                                    else {
                                      result = app.classResult(sName);print("Prediction result of " + sName,result);
                                      Map.addLayer(result,vis,"Classification Result of " + nName);
                                      app.classifier.label.setValue("Dispaly prediction result, please wait..");
                                      app.classifier.serialEnsemble.setValue('No selection',false);
                                    }
                                     }
                                  app.classifier.enAccuracy.setDisabled(false);
}}),
      // click to process accuracy assessment task
      enAccuracy:ui.Button({label:'Calculate confusion matrix',disabled:true,
                               style:{margin: '3px 10px 2px 2px',width:'170px',fontSize: '8px',fontFamily:'Georgia'},
                               onClick:function(){
        app.classifier.label.setValue('It will take a long time...');
        var pName = app.classifier.parallelEnsemble.getValue();
        var sName = app.classifier.serialEnsemble.getValue();
        if (pName == "Parallel ensemble"){
          app.showAcc("Parallel ensemble","CLASSIFICATION");
             }
        else if (sName){
          app.showAcc("Serial ensemble","CLASSIFICATION")
              app.classifier.label.setValue("Serial ensemble" +' is computing, please wait..');
            }
      }}),
    };
    app.classifier.panel = ui.Panel({ 
        widgets:[
          ui.Panel([ui.Label({value:'5. Training and prediction',style:app.SECTION_LABEL_STYLE})]),
          ui.Label({value:'Classification with component classifier', style:app.LABEL_STYLE}),
          ui.Panel([app.classifier.singleClassifierPanel],ui.Panel.Layout.flow('horizontal')),
          ui.Panel([app.classifier.forecastC,app.classifier.showC],ui.Panel.Layout.flow('horizontal')),
          ui.Panel([app.classifier.forecastP,app.classifier.showP],ui.Panel.Layout.flow('horizontal')),
          ui.Panel([app.classifier.singleAccuracy]),
          ui.Label({value:'Classification with multi-classifier fusion', style:app.LABEL_STYLE}),
          ui.Panel([app.classifier.parallelEnsemble,app.classifier.serialEnsemble],ui.Panel.Layout.flow('horizontal')),
          ui.Panel([app.classifier.classifierApply,app.classifier.showclassifierApply],ui.Panel.Layout.flow('horizontal')),
          ui.Panel([app.classifier.enAccuracy,app.classifier.label],ui.Panel.Layout.flow('horizontal'))],
      style:app.SECTION_STYLE
    });
    app.showResult = {
      buttonClassify:ui.Select({
            items: Object.keys(app.classifier_OPTIONS),
            style:{textAlign:'left',margin: '3px 10px 2px 2px',width:'300px',fontSize: '8px',fontFamily:'Georgia'},
            placeholder:'User-defined classification results',
            onChange: function(){
              app.exportClassification();
              var cName = app.classifier.buttonClassify.getValue();
              switch (cName){
                case 'MaxEnt':
                  app.showClassifyResult(c,'CLASSIFICATION');
                  break;
                case 'RF':
                  app.showClassifyResult(c,'CLASSIFICATION');
                  break;
                case 'SVM':
                  app.showClassifyResult(c,'CLASSIFICATION');
                  break;
                case 'XGBoost':
                  app.showClassifyResult(c,'CLASSIFICATION');
                  break;
                case "Parallel ensemble":
                  app.showClassifyResult("Parallel ensemble","CLASSIFICATION");
                  break;
                case "Serial ensemble":
                  var sName = app.classifier.serialEnsemble.getValue();
                  if (sName=='MaxEnt + RF'){app.showClassifyResult("MaxEnt + RF","CLASSIFICATION");}
                  if (sName=='MaxEnt + SVM'){app.showClassifyResult("MaxEnt + SVM","CLASSIFICATION");}
                  if (sName=='MaxEnt + XgBoost'){app.showClassifyResult("MaxEnt + XGBoost","CLASSIFICATION");}
              }
            }
        }),
      // click to show Tree map of Yunnan
      treeMap_Region1:ui.Button({label:'Forest stand species map of example region in our research',
                                 style:{textAlign:'left',margin: '3px 10px 2px 2px',width:'360px',fontSize: '8px',fontFamily:'Georgia'},
                                 onClick:function(){
                                   app.showYunanMap('Region1_tree');
                                   var region = ee.FeatureCollection("users/fu/FPF/Floristicregion").filter(ee.Filter.eq("ID",1));
                                   var img = app.DATA_OPTIONS['Yunnan_tree'];
                                      Export.image.toDrive({image: img.clip(region),
                                        description:"Forest stand species map of example region",
                                        scale: 10,
                                        region: region,
                                        crs:'EPSG:4326',
                                        maxPixels:1e13      });
                                 }}),
      // click to show Tree map of Yunnan
      treeMap:ui.Button({label:'Forest stand species map of Yunnan in our research',
                         style:{textAlign:'left',margin: '3px 10px 2px 2px',width:'360px',fontSize: '8px',fontFamily:'Georgia'},
                         onClick:function(){
                           app.showYunanMap('Yunnan_tree');
                           var region = ee.FeatureCollection("users/fu/FPF/Floristicregion");
                           var img = app.DATA_OPTIONS['Yunnan_tree'];
                                      Export.image.toDrive({image: img.clip(region),
                                        description:"Forest stand species map of Yunnan",
                                        scale: 10,
                                        region: region,
                                        crs:'EPSG:4326',
                                        maxPixels:1e13 });
      }}),
      accTable:ui.Button({label:'Accuracy evaluation result',style:app.TEXT_STYLE,onClick:function(){app.showAcc("Parallel ensemble (MRSX)","CLASSIFICATION")}})
    };
    app.showResult.panel = ui.Panel({
      widgets:[
        ui.Label({value:'6. Results display and export',style:app.SECTION_LABEL_STYLE}),
        ui.Panel([app.showResult.buttonClassify,app.showResult.treeMap_Region1,app.showResult.treeMap],ui.Panel.Layout.flow('vertical'),{textAlign:'left'}),
        ],style:app.SECTION_STYLE
    });
    app.result = {
      maskLegend:ui.Panel(),
      accTable:ui.Panel({style:{textAlign: 'middle-left',fontSize: '10px',fontFamily:'Times New Roman'}})
    };
};
/**===============================app.createConstants========================== **/
app.createConstants = function(){
  // palette for tree specieis
  app.LEGEND = {Yunnan_treeColors: ['149136','FFAA00','4CE600','FF00C5','005CE6','FF0000','00FFC5','AAFF00','FF7F7F','A5D1B0',
                                     '780701','364AC2','D4B311','46FA73','EB5E00','A900E6','DE5F9F','ED8EF5','FFFF00','B4B4B4'],//'B4B4B4' indicate non-forest areas
                Region1_treeColors:['149136','4CE600','ED8EF5','FFFF00','00FFC5','364AC2','AAFF00','D4B311','00FFC5','B4B4B4'],//'B4B4B4' indicate non-forest areas
                Region1_treeNames:  ['1.Pinus yunnanensis',  '2.Quercus L.','3.Picea asperata Mast.','4.Larix gmelinii', '5.Alnus cremastogyne Burk.',
                                     '6.Abies fabri','7.Pinus armandii Franch.','8.Pinus densata Mast.','9.Other broadleaves','10.Non-forest'],
                Yunnan_treeNames:['1.Pinus yunnanensis','2.Cunninghamia lanceolata ','3.Quercus L.','4.Other broadleaves','5.Eucalyptus L.Herit','6.Pinus armandii Franch.',
                                  '7.Alnus cremastogyne Burk.','8.Betula L.','9.Cupressus funebris Endl.','10.PopulusL.','11.Pinus kesiya var. langbianensis','12.Abies fabri',
                                  '13.Pinus densata Mast.','14.Sassafras tsumu','15.Hevea brasiliensis','16.Acacia dealbata Link.','17.Juglans regia','18.Picea asperata Mast.','19.Larix gmelinii ','20.Non-forest']
  }
  // gradient style for prabability map
  app.GRADIENT_STYLE = {min: 0, max: 1, palette: ['EEF2E6', 'D6CDA4', '3D8361','1C6758']};
  // Styling for the gradient legend title.
  app.LEGEND_TITLE_STYLE = {  
    fontSize: '14px',  
    fontWeight: 'bold',  
    stretch: 'horizontal',
    textAlign: 'center',
    margin: '2px'};
  app.SECTION_STYLE = {
                  border:'1px solid black', 
                  margin:'5px 2px 1px 1px',
                  // fontFamily:'monospace',
                  position:'middle-left'};
  app.SECTION_LABEL_STYLE = {
        margin: '1px 8px 1px 10px',
        textAlign: 'center',
        fontSize: '14px',
        fontWeight: 'bold',
        fontFamily:'Sans-serif'
  };
  app.LABEL_STYLE = {
        margin: '3px 10px 2px 2px',
        textAlign: 'center',
        fontSize: '12px',
        fontWeight: 'bold',
        fontFamily:'Times New Roman'
        };
  app.TEXT_STYLE = {
        margin: '3px 10px 2px 2px',
        fontSize: '8px',
        fontFamily:'Georgia',
    };
  // studyarea shapefile, samples, and classifier description
  app.STUDYAREA_OPTIONS = {
    'Sub-region of example study area': {abre: 'ROI',roi:roi},
    'Example study area': {abre: 'Region_1',roi:ee.FeatureCollection("users/fu/FPF/Floristicregion").filter(ee.Filter.eq("ID",1))}
  };
  app.SAMPLE_SELECTION = {
    'Whole samples':{trainData:sample.samplesAll('train'),testData:sample.samplesAll('test')},
    'Sparse samples':{trainData:sample.samplesSub('train'),testData:sample.samplesSub('test')}
  }
  app.FEATURE_OPTIONS = {
    'Spectral':{abre:'Spectral'},
    'Time series':{abre:'Time series'},
    'Terrian':{abre:'Terrian'},
    'Texture':{abre:'Texture'},
    'The probability output of MaxEnt':{abre:'The probability output of MaxEnt'}
  }
  app.FEATURESET_OPTIONS = {
    'All features set':{abre:'All features set'},
    'Optimal features set':{abre:'Optimal features set'},
    'Optimal features set + MaxEnt probability':{abre:'Optimal features set + MaxEnt probability'},
    'Selected features from below':{abre:'Selected features from below'},
  }
  app.ENSEMBLELEARNING_OPTIONS = {
    // 'Serial ensemble':{abre:'Serial ensemble (MR,MS,MX)'},
    'Parallel ensemble':{abre:'Parallel ensemble (MRSX)'},
    'No selection':{abre:'No selection'},
  };
  app.SERIALENSEMBLE_OPTIONS = {
    'MaxEnt + RF':{abre:'MaxEnt + RF'},
    'MaxEnt + SVM':{abre:'MaxEnt + SVM'},
    'MaxEnt + XgBoost':{abre:'MaxEnt + XgBoost'},
    'No selection':{abre:'No selection'},
  }
  app.DATA_OPTIONS = {Region1_forestMask:ee.Image("users/fu/FQ1TEST/fq1forest_mask"),
                      Yunnan_forestMask:ee.Image('users/mbond7/yunnanforest'),
                      Yunnan_tree:ee.Image('users/mbond7/Mosaic'),
                      Region1_tree: ee.Image('users/fu/FQ1TEST/FQ1MRFRESULTGX'),
                      Region1_Grid:ee.FeatureCollection("projects/liruonan02/assets/TreeSpeciesClassification/1sample/Fenqu1_grid2")}
  app.classifier_OPTIONS = {
    'MaxEnt':{description:'Maximum Entropy Model',classifier:'MaxEnt'},
    'RF':{description:'Random forest classifer',classifier:'RF'},
    'SVM':{description:'Support vector machine',classifier:'SVM'},
    'XGBoost':{description:'XGBoost',classifier:'XGBoost'},
    //MR means MaxEnt-RF; MS means MaxEnt-SVM; MX means MaxEnt-XGBoost
    'Serial ensemble':{description:'Serial ensemble (MR,MS,MX)',classifier:'Serial ensemble'},
    'Parallel ensemble':{description:'Parallel ensemble (MRSX)',classifier:'Parallel Ensemble'},
  };
  app.forecast_OPTIONS = {
    'CLASSIFICATION':{MODE:'CLASSIFICATION'},
    'MULTIPROBABILITY':{MODE:'MULTIPROBABILITY'}
  }
  app.featureOptimationBandName = ["elevation","NDSVI", "NDBI", "NDTI", "b_54_REP", "b_45_NDVI", "b_43_REP", 
                                   "b_36_NDVI", "b_14_NDVI", "b_5_REP","b_47_REP", "b_34_REP", "b_49_NDVI", 
                                   "b_35_NDVI","b_31_NDVI", "aspect"];
};
/**===============================app.boot===================================== **/
app.boot = function() {
    app.createConstants();
    app.createHelpers();
    app.createPanels();
    var main = ui.Panel({
        widgets: [
            app.intro.panel,app.roi.panel,
            app.dateFilter.panel,
            app.feaSelect.panel,
            app.classifier.panel,
            app.showResult.panel,
            // app.result.accTable,
            app.result.maskLegend
        ],
        style:{width:'28%',border:'1px solid black',fontFamily:'monospace',position:'middle-left'},
    });
    Map.setCenter(100.274,26.759, 6);
    ui.root.insert(0, main);
    ui.root.add(app.result.accTable)
    var closeButton =  ui.Button({label: 'Close current layers', 
                                  style:{height:'50px',width:'180px',fontFamily:'Georgia',position:'top-center'},
                                  onClick: function() {
                                    var layers = Map.layers();
                                    layers.forEach(function(layer){
                                      Map.layers().remove(layer);});},
                                  });
    Map.add(closeButton);
};
app.boot();