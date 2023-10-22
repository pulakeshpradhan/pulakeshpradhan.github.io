var geometry = 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[113.60412328570465, 22.447626977501578],
          [113.60412328570465, 22.385103060733424],
          [113.67089956133941, 22.385103060733424],
          [113.67089956133941, 22.447626977501578]]], null, false);
var visualization = {"min":0,"max":0.3,"bands":["B8","B4","B3"]};
var imageVisParam = {"opacity":0.01,"gamma":0.1};
var ROI = geometry;
Map.centerObject(ROI, 13);
var regionjson = ee.Geometry(ROI).toGeoJSONString();
var sentinel = ee.ImageCollection('COPERNICUS/S2_SR');
var train_points = "users/20192633055/landuse";
var bands = ['SR', 'NDVI', 'NDWI', 'MNDWI', 'CMRI', 'MMRI','SAVI','OSAVI','EVI','LSWI','NDTI','EBBI'];
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
function addLegend(palette, names) {
 //图例的底层Panel
 var legend = ui.Panel({
   style: {
     position: 'bottom-right',
     padding: '5px 10px'
   }
 });
 //图例标题
 var title = ui.Label({
   value: '图例',
   style: {
     fontWeight: 'bold',
     color: "red",
     fontSize: '16px',
     textAlign:'center'
   }
 });
 legend.add(title);
 //添加每一列图例颜色以及说明
 var addLegendLabel = function(color, name) {
       var showColor = ui.Label({
         style: {
           backgroundColor: color,
           padding: '8px',
           margin: '0 0 4px 0',
           border:'1px solid black'
         }
       });
       var desc = ui.Label({
         value: name,
         style: {margin: '0 0 4px 8px'}
       });
     //颜色和说明是水平放置
       return ui.Panel({
         widgets: [showColor, desc],
         layout: ui.Panel.Layout.Flow('horizontal')
       });
 };
  //添加所有的图例列表
 for (var i = 0; i < palette.length; i++) {
   var label = addLegendLabel(palette[i], names[i]);
   legend.add(label);
 }  
 Map.add(legend);
}
var addIndex_simple = function(image){
  image = ee.Image(image);
  var SR_func = function(img){
                        var SR = ee.Image(img).select('B8').divide(ee.Image(img).select('B4'))
                        .rename(['SR']);
                        return SR.copyProperties(img,['system:time_start']);
                        };
  var NDVI_func = function(img){
                        var NDVI = ee.Image(img).expression('(B8 - B4)/(B8 + B4)', {
                             'B8': img.select('B8'),
                             'B4': img.select('B4')
                             }).rename(['NDVI']);
                        return NDVI.copyProperties(img,['system:time_start']);
                        };
  var NDWI_func = function(img){
                        var NDWI = ee.Image(img).expression('(B3 - B8)/(B3 + B8)', {
                             'B3': img.select('B3'),
                             'B8': img.select('B8')
                             }).rename(['NDWI']);
                        return NDWI.copyProperties(img,['system:time_start']);
                        };
  var MNDWI_func = function(img){
                       var MNDWI = ee.Image(img).expression('(B3 - B11)/(B3 + B11)', {
                             'B3': img.select('B3'),
                             'B11': img.select('B11')
                             }).rename(['MNDWI']);
                        return MNDWI.copyProperties(img,['system:time_start']);
                        };
  var CMRI_func = function(img){
                        var NDVI = ee.Image(img).expression('(B8 - B4)/(B8 + B4)', {
                             'B8': img.select('B8'),
                             'B4': img.select('B4')
                             }).rename(['NDVI']);
                        var NDFT = ee.Image(img).expression('(B3 - B8)/(B3 + B8)', {
                             'B3': img.select('B3'),
                             'B8': img.select('B8')
                             }).rename(['NDFT']);
                        var CMRI = NDVI.subtract(NDFT)
                                 .rename(['CMRI']);
                        return CMRI.copyProperties(img,['system:time_start']);
                        };   
  var MMRI_func = function(img){
                        var NDVI = ee.Image(img).expression('(B8 - B4)/(B8 + B4)', {
                             'B8': img.select('B8'),
                             'B4': img.select('B4')
                             }).rename(['NDVI']);
                        NDVI = NDVI.abs();
                        var MNDWI = ee.Image(img).expression('(B3 - B11)/(B3 + B11)', {
                             'B3': img.select('B3'),
                             'B11': img.select('B11')
                             }).rename(['MNDWI']);
                        MNDWI = MNDWI.abs();
                        var MMRI = ee.Image(MNDWI.subtract(NDVI))
                                 .divide(ee.Image(MNDWI.add(NDVI)))
                                 .rename(['MMRI']);
                        return MMRI.copyProperties(img,['system:time_start']);
                        };   
  var SAVI_func = function(img){
                        var SAVI = ee.Image(ee.Image(img).select('B8').subtract(ee.Image(img).select('B4'))
                                   .divide(ee.Image(img).select('B8').add(ee.Image(img).select('B4')).add(0.5)))
                                   .multiply(1.5).rename(['SAVI']);
                        return SAVI.copyProperties(img,['system:time_start']);
                        };      
  var OSAVI_func = function(img){
                        var OSAVI = ee.Image(ee.Image(img).select('B8').subtract(ee.Image(img).select('B4'))
                                   .divide(ee.Image(img).select('B8').add(ee.Image(img).select('B4')).add(0.16)))
                                   .rename(['OSAVI']);
                        return OSAVI.copyProperties(img,['system:time_start']);
                        };  
  var EVI_func = function(img){
                        //EVI = 2.5 * ((Band 4 – Band 3) / (Band 4 + 6 * Band 3 – 7.5 * Band 1 + 1)).
                        var p1 = ee.Image(img).select('B8').add(ee.Image(img).select('B4').multiply(6))
                                    .subtract(ee.Image(img).select('B2').multiply(7.5)).add(1);
                        var p2 = ee.Image(ee.Image(img).select('B8').subtract(ee.Image(img).select('B4')))
                                  .divide(p1);
                        var EVI = p2.multiply(2.5)
                                  .rename(['EVI']);
                        return EVI.copyProperties(img,['system:time_start']);
                        };
  var LSWI_func = function(img){
                        var LSWI = ee.Image(img).expression('(B8 - B11)/(B8 + B11)', {
                             'B8': img.select('B8'),
                             'B11': img.select('B11')
                             }).rename(['LSWI']);
                        return LSWI.copyProperties(img,['system:time_start']);
                        };
  var NDTI_func = function(img){
                        var NDTI = ee.Image(img).expression('(B8 - B12)/(B8 + B12)', {
                             'B8': img.select('B8'),
                             'B12': img.select('B12')
                             }).rename(['NDTI']);
                        return NDTI.copyProperties(img,['system:time_start']);
                        };   
  var EBBI_func = function(img){
                        var EBBI = ee.Image(img.select('B11').subtract(img.select('B8')))
                                .divide((ee.Image(img.select('B11').add(img.select('B12')))).sqrt().multiply(10))
                                .rename(['EBBI']);
                        return EBBI.copyProperties(img,['system:time_start']);
                        };
  image = ee.Image(image).addBands(SR_func(image));
  image = ee.Image(image).addBands(NDVI_func(image));
  image = ee.Image(image).addBands(NDWI_func(image));
  image = ee.Image(image).addBands(MNDWI_func(image));
  image = ee.Image(image).addBands(CMRI_func(image));
  image = ee.Image(image).addBands(MMRI_func(image));
  image = ee.Image(image).addBands(SAVI_func(image));
  image = ee.Image(image).addBands(OSAVI_func(image));
  image = ee.Image(image).addBands(EVI_func(image));
  image = ee.Image(image).addBands(LSWI_func(image));
  image = ee.Image(image).addBands(NDTI_func(image));
  image = ee.Image(image).addBands(EBBI_func(image));
  return ee.Image(image);
};
/**
 * 定义相关常量和变量
 * @type {Object}
 */
var app = {
  data: {
    startDate: "2022-1-1",
    endDate: "2022-7-1",
    cloudScore: 20,
    SentinelCol: null,
    mapClickFlag: false,
    pannelflag: null,
    rawLayer: null,
    itemimage: null,
    selectImageKey: null,
    clickPoint: null
  },
  config: {
    ndviVisParam: {
      min: -0.2, 
      max: 0.8,
      palette: 'FFFFFF, CE7E45, DF923D, F1B555, FCD163, 99B718, 74A901, 66A000, 529400,' +
        '3E8601, 207401, 056201, 004C00, 023B01, 012E01, 011D01, 011301'
    },
    rgbVisParam: {
      min: 0, 
      max: 0.3,
      bands: ["B4", "B3", "B2"]
    }
  },
  ui: {}
};
/**
 * 定义sentinel公共方法
 * @type {Object}
 */
var dataset = {
  /**
   * 通过日期、区域、云量筛选数据
   * @param  {[type]} startDate [description]
   * @param  {[type]} endDate   [description]
   * @param  {[type]} region    [description]
   * @param  {[type]} cloud     [description]
   * @return {[type]}           [description]
   */
  getImageCollection : function(startDate, endDate, cloud) {
    var dataset = sentinel.filterDate(startDate, endDate)
                    .filterBounds(ROI)
                    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',ee.Number(cloud)))
                    .map(maskS2clouds)
    return dataset;
  }
};
/**
 * 显示边界
 * @param  {[type]} region [description]
 * @return {[type]}        [description]
 */
function showBounds(region) {
  var outline = ee.Image()
                  .toByte()
                  .paint({
                    featureCollection:region,
                    color:0,
                    width:1.5
                  });
  Map.addLayer(outline, {palette: "ff0000"}, "bounds");
}
/**
 * 导出影像数据
 * @param  {[type]} image    [description]
 * @param  {[type]} region   [description]
 * @param  {[type]} desc     [description]
 * @param  {[type]} fileName [description]
 * @return {[type]}          [description]
 */
function GetImageUrl(image, fileName) {
    var url = image.clip(ROI).getDownloadURL({scale: 10,
                              region:regionjson,
                              name:fileName,
                              crs: "EPSG:4326"})
    if(app.data.pannelflag !== null){
      Map.remove(app.data.pannelflag);
    }
    app.data.pannelflag = null;
    var urldata = ui.Label({
      value: url,
      style: {
        position: 'bottom-left',
        padding: '5px 10px',
        margin: '0 0 4px 8px',
        width:'500px',
        height:'100px'
      }
    });
    app.data.pannelflag = urldata;
    Map.add(urldata);
}
/**
 * 查找卫星影像
 * @return {[type]} [description]
 */
function searchSentinelImages () {
  app.data.SentinelCol = dataset.getImageCollection(app.data.startDate, app.data.endDate, app.data.cloudScore);
  var Ids = app.data.SentinelCol.reduceColumns(ee.Reducer.toList(), ["system:index"])
                            .get("list");
  Ids.evaluate(function(ids) {
    print("影像的数量: " + ids.length);
    app.ui.rawImagePanel.select.items().reset(ids);
    app.ui.rawImagePanel.select.setValue(app.ui.rawImagePanel.select.items().get(0));
  });
}
/**
 * 切换卫星影像
 * @param  {[type]} key [description]
 * @return {[type]}     [description]
 */
function showSentinelImage(key) {
  if (app.data.rawLayer !== null) {
    Map.remove(app.data.rawLayer);
  }
  app.data.rawLayer = null;
  // if (app.data.ndviLayer !== null) {
  //   Map.remove(app.data.ndviLayer);
  // }
  // app.data.ndviLayer = null;
  print("show sentinel-2 image id is: " + key);
  app.data.selectImageKey = key;
  var image = ee.Image(app.data.SentinelCol.filter(ee.Filter.eq("system:index", key)).first());
  app.data.rawLayer = Map.addLayer(image, app.config.rgbVisParam, "RGB-"+key);
  // if (app.data.showNDVILayer) {
  //   app.data.ndviLayer = Map.addLayer(image.select("NDVI"), app.config.ndviVisParam, "NDVI-"+key);
  // }
}
/**
 * 导出结果
 * @return {[type]} [description]
 */
function exportResult() {
  var key = app.data.selectImageKey;
  var image = ee.Image(app.data.SentinelCol.filter(ee.Filter.eq("system:index", key)).first());
  GetImageUrl(image.select('B.*'), key);
}
/**
 * @return {[type]} [description]
 */
function calculater() {
  var key = app.data.selectImageKey;
  var dataset = ee.Image(app.data.SentinelCol.filter(ee.Filter.eq("system:index", key)).first()).select('B.*')
  var dataset_all = addIndex_simple(dataset);
  var construct_img = dataset_all.select(bands);
  //分类样本cropland.merge(grassland).merge(city).merge(forest).merge(water)
  var train_data= construct_img.sampleRegions({
    collection: train_points,
    properties: ['landcover'],
    scale: 10
  });
  //精度评价
  var withRandom = train_data.randomColumn('random');//样本点随机的排列
  var split = 0.7; 
  var trainingPartition = withRandom.filter(ee.Filter.lt('random', split));//筛选70%的样本作为训练样本
  var testingPartition = withRandom.filter(ee.Filter.gte('random', split));//筛选30%的样本作为测试样本
  //分类方法选择随机森林
  var rf = ee.Classifier.smileRandomForest({
    numberOfTrees: 20,  
    bagFraction: 0.8
  }).train({
    features: trainingPartition,
    classProperty: 'landcover',
    inputProperties: bands
  });
  //对哨兵数据进行随机森林分类
  var img_classfication = construct_img.classify(rf); 
  //运用测试样本分类，确定要进行函数运算的数据集以及函数
  var test = testingPartition.classify(rf);
  // 计算混淆矩阵
  var confusionMatrix = test.errorMatrix('landcover', 'classification');
  print('confusionMatrix',confusionMatrix);// 面板上显示混淆矩阵
  print('consumers accuracy',confusionMatrix.consumersAccuracy());
  print('producers accuracy',confusionMatrix.producersAccuracy());
  print('overall accuracy', confusionMatrix.accuracy());// 面板上显示总体精度
  print('kappa accuracy', confusionMatrix.kappa());//面板上显示kappa值
  //1 white city, 2 red forest,3 green mangrove,4 blue water 5 yellow field
  Map.addLayer(img_classfication.clip(ROI), {min: 1, max: 5, palette: ['white', 'red', 'green','blue',"yellow"]},"classfication");
  var palette = ['white', 'red', 'green','blue',"yellow"];
  var names = ["不透水面","林地","红树林","水体","水田"];
  //添加图例
  addLegend(palette, names);
  var class1=img_classfication.clip(ROI);
  //导出分类图
  var classurl = class1.getDownloadURL({scale: 10,
                                      region:ROI,
                                      name:"class",
                                      crs: "EPSG:4326"
  });
  print("classurl is: ", classurl);
  var areasmangrove = function(image){
    var areaImage = ee.Image.pixelArea().addBands(image);
    var areas = areaImage.reduceRegion({
        reducer: ee.Reducer.sum().group({
        groupField: 1,
        groupName: 'classification',
      }),
      geometry: ROI,
      scale: 10,
      maxPixels: 1e15
      }); 
    var mangrove = ee.Dictionary(ee.List(areas.get("groups")).get(2)).get("sum");
    return mangrove;
  };
  var mangrove = ee.Number(areasmangrove(class1));
  print(mangrove,"红树林的的面积(平方米)");
  var accuracy = ee.Number(confusionMatrix.accuracy()).format("%.4f")
  var output1 = ee.String('分类精度为').cat(accuracy).cat(ee.String("\n"))
  var output2 = output1.cat(ee.String("红树林的的面积(平方米)为").cat(mangrove.format('%.2f')).cat(ee.String("\n")));
  var output3 = output2.cat(ee.String("分类下载链接为")).cat(ee.String(classurl));
  var output = output3.getInfo();
  print(output3)
  if(app.data.pannelflag !== null){
      Map.remove(app.data.pannelflag);
    }
  app.data.pannelflag = null;
  var outputdata = ui.Label({
    value: output,
    style: {
      position: 'bottom-left',
      padding: '5px 10px',
      margin: '0 0 2px 2px',
      width:'500px',
      height:'100px'
    }
  });
  app.data.pannelflag = outputdata;
  Map.add(outputdata);
}
function timeareadetect(){
  var year_start = 2018;
  var year_end = 2022;
  var year_sequence = ee.List.sequence(year_start,year_end);
  var monthCol = year_sequence.map(function(year){
    var collectionsdata = ee.ImageCollection('COPERNICUS/S2_SR')
                            .filter(ee.Filter.calendarRange(year,year,'year'))
                            .filterBounds(ROI)
                            .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                            .map(maskS2clouds)
                            .map(addIndex_simple)
                            .select(bands)
                            .sort("CLOUDY_PIXEL_PERCENTAGE")
                            .first()
                            .clip(ROI);
    return collectionsdata;
  });
  var dataset = ee.ImageCollection('COPERNICUS/S2_SR')
                            .filter(ee.Filter.calendarRange(2022,2022,'year'))
                            .filterBounds(ROI)
                            .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                            .map(maskS2clouds)
  var dataset_all = dataset.map(addIndex_simple);
  var construct_img = dataset_all.select(bands).sort("CLOUDY_PIXEL_PERCENTAGE").first();
  //分类样本cropland.merge(grassland).merge(city).merge(forest).merge(water)
  var train_data= construct_img.sampleRegions({
    collection: train_points,
    properties: ['landcover'],
    scale: 10
  });
  //精度评价
  var withRandom = train_data.randomColumn('random');//样本点随机的排列
  var split = 0.7; 
  var trainingPartition = withRandom.filter(ee.Filter.lt('random', split));//筛选70%的样本作为训练样本
  var testingPartition = withRandom.filter(ee.Filter.gte('random', split));//筛选30%的样本作为测试样本
  //分类方法选择随机森林
  var rf = ee.Classifier.smileRandomForest({
    numberOfTrees: 20,  
    bagFraction: 0.8
  }).train({
    features: train_data,
    classProperty: 'landcover',
    inputProperties: bands
  });
  //对哨兵数据进行随机森林分类
  var img_classfication = construct_img.classify(rf);
  var year_Col = ee.ImageCollection(monthCol).map(function(image){
    return ee.Image(image).classify(rf);
  });
  // Map.addLayer(year_Col.first(), {min: 1, max: 5, palette: ['white', 'red', 'green','blue',"yellow"]},'2018')
  var mask=function(image,my_type){
    var mask=image.eq(my_type);
    var masked_image=image.updateMask(mask);
    return masked_image;
  }
  year_Col = year_Col.map(function(image){
    return mask(image,3);
  });
  // Map.addLayer(year_Col.first(),{"min":0,"max":4,palette: ['orange', 'blue', 'green','yellow']},'aa')
  // Map.addLayer(year_Col.first(),{"min":3,"max":3,palette: 'green'},'mangrove')
  var time_cf = year_Col.toList(year_sequence.size());
  Map.addLayer(ee.Image(ee.List(time_cf).get(0)).clip(ROI), {min: 1, max: 5, palette: ['white', 'red', 'green','blue',"yellow"]},"2018");
  Map.addLayer(ee.Image(ee.List(time_cf).get(1)).clip(ROI), {min: 1, max: 5, palette: ['white', 'red', 'green','blue',"yellow"]},"2019");
  Map.addLayer(ee.Image(ee.List(time_cf).get(2)).clip(ROI), {min: 1, max: 5, palette: ['white', 'red', 'green','blue',"yellow"]},"2020");
  Map.addLayer(ee.Image(ee.List(time_cf).get(3)).clip(ROI), {min: 1, max: 5, palette: ['white', 'red', 'green','blue',"yellow"]},"2021");
  Map.addLayer(ee.Image(ee.List(time_cf).get(4)).clip(ROI), {min: 1, max: 5, palette: ['white', 'red', 'green','blue',"yellow"]},"2022");
  var countDictionary = time_cf.map(function(image){
      var realArea = ee.Image.pixelArea().updateMask(ee.Image(image).mask()).reduceRegion({
        reducer: ee.Reducer.sum(),
        geometry: geometry,
        scale: 30,
        maxPixels: 10e15,
        }).get("area");
    return realArea})
  //把统计结果打印出来
  year_sequence = year_sequence.map(function(number){
    var number1 = ee.Number(number).toInt();
    return ee.String(number1);
  });
  var landuse_time = ee.Dictionary.fromLists(year_sequence,countDictionary).toArray({keys:year_sequence});
  //设置图标属性，标题，坐标轴名，图例，线宽，点大小
  // 创造一个随时间变化的折线图.
  if(app.data.itemimage){
        Map.remove(app.data.itemimage);
      }
  app.data.itemimage = null;
  var chart = ui.Chart.array.values({
  array: landuse_time,
  axis: 0,
  xLabels: year_sequence
  });
  //让上面的折线图设置属性并加载到map上
  chart.setOptions({
    title: '红树林年均变化面积（平方米）',
    vAxis: {
      title: '面积（平方米）'
    },
    legend: 'none',
    lineWidth: 1,
    pointSize: 4
  });
  chart.style().set({
    position: 'top-right',
    width: '300px',
    height: '200px'
  });
  app.data.itemimage = chart;
  Map.add(chart);
}
function djiflydetection(){
  var djifly_bands = "users/20192633055/GEE_fly_bands"
  var djifly_dsm = "users/20192633055/GEE_fly_dsm"
  var djifly_train = "users/20192633055/GEE_fly_train"
  var djivision = {"min":0,"max":255,"bands":["b3","b2","b1"]};
  var dji_bands = ee.Image(djifly_bands)
  var dji_dsm = ee.Image(djifly_dsm)
  var dji_train = ee.FeatureCollection(djifly_train)
  function NDVI(img) {
   var nir = img.select("b4");
   var red = img.select("b3");
   var ndvi = nir.subtract(red).divide(nir.add(red)).rename(['ndvi']);
   return ee.Image(img).addBands(ndvi);
  }
  dji_bands = NDVI(dji_bands);
  Map.addLayer(dji_bands,djivision,"DJI")
  Map.centerObject(dji_bands,16)
  // Map.addLayer(dji_bands,{"min":0,"max":1,"bands":["ndvi"]},"ndvi")
  print(dji_train)
  var construct_img = ee.Image(dji_bands).addBands(dji_dsm.rename(['dsm']))
  //选取分类所需波段
  var bandNames = ['b1', 'b2', 'b3', 'b4', 'ndvi', 'dsm'];
  // 设置分类是选择的属性
  var classProperty = 'landcover';
  var scale = 0.026;
  var vetor = construct_img.select(['b1']).reduceToVectors({scale:10,maxPixels:1e13}).union({maxError :10});
  var dji_region = vetor.first().geometry().bounds({maxError :10})
  var train_data= construct_img.sampleRegions({
      collection: dji_train,
      properties: ['landcover'],
      scale: scale
    });
  //精度评价
  var withRandom = train_data.randomColumn('random');//样本点随机的排列
  var split = 0.9; 
  var trainingPartition = withRandom.filter(ee.Filter.lt('random', split));//筛选70%的样本作为训练样本
  var testingPartition = withRandom.filter(ee.Filter.gte('random', split));//筛选30%的样本作为测试样本
  //分类方法选择随机森林
  var rf = ee.Classifier.smileRandomForest({
    numberOfTrees: 20,  
    bagFraction: 0.8
  }).train({
    features: trainingPartition,
    classProperty: 'landcover',
    inputProperties: bandNames
  });
  var img_classfication = construct_img.classify(rf); 
  //运用测试样本分类，确定要进行函数运算的数据集以及函数
  var test = testingPartition.classify(rf);
  // 计算混淆矩阵
  var confusionMatrix = test.errorMatrix('landcover', 'classification');
  print('confusionMatrix',confusionMatrix);// 面板上显示混淆矩阵
  print('consumers accuracy',confusionMatrix.consumersAccuracy());
  print('producers accuracy',confusionMatrix.producersAccuracy());
  print('overall accuracy', confusionMatrix.accuracy());// 面板上显示总体精度
  print('kappa accuracy', confusionMatrix.kappa());//面板上显示kappa值
  //1 water, 2 low ,3 high
  Map.addLayer(img_classfication, {min: 1, max: 3, palette: [ 'red', 'green','blue']},"dji_classfication");
  var palette = ['red', 'green','blue'];
  var names = ["water","lower mangrove","upper mangrove"];
  //添加图例
  addLegend(palette, names);
  var areasmangrove = function(image){
    var areaImage = ee.Image.pixelArea().addBands(image);
    var areas = areaImage.reduceRegion({
        reducer: ee.Reducer.sum().group({
        groupField: 1,
        groupName: 'classification',
      }),
      geometry: dji_region,
      scale: 1,
      maxPixels: 1e15
      }); 
    var all = ee.List(areas.get("groups")).map(function(data){
      return ee.Dictionary(data).get("sum");
    });
    return all;
  };
  var aeras = areasmangrove(img_classfication);
  //设置图标属性，标题，坐标轴名，图例，线宽，点大小
  // 创造一个随时间变化的折线图.
  if(app.data.itemimage){
        Map.remove(app.data.itemimage);
      }
  app.data.itemimage = null;
  var chart = ui.Chart.array.values({
  array: aeras,
  axis: 0,
  xLabels: names
  });
  chart.setChartType('ColumnChart');
  chart.setOptions({
    title: '无人机数据结果各类别面积（平方米）',
    vAxis: {
      title: '面积（平方米）'
    },
    legend: 'none'
  });
  chart.style().set({
    position: 'top-right',
    width: '300px',
    height: '200px'
  });
  app.data.itemimage = chart;
  Map.add(chart);
  var accuracy = ee.Number(confusionMatrix.accuracy()).format("%.0f")
  var output1 = ee.String('分类精度为').cat(accuracy)
  var output = output1.getInfo();
  if(app.data.pannelflag !== null){
      Map.remove(app.data.pannelflag);
    }
  app.data.pannelflag = null;
  var outputdata = ui.Label({
    value: output,
    style: {
      position: 'bottom-left',
      padding: '5px 10px',
      margin: '0 0 2px 2px',
      width:'100px',
      height:'50px'
    }
  });
  app.data.pannelflag = outputdata;
  Map.add(outputdata);
}
/**
 * 地图点击事件
 * @param  {[type]} coords)        {                                print("click map point         is: " + coords.lon + " " + coords.lat);    if (app.data.mapClickFlag) {      var point [description]
 * @param  {[type]} region:point   [description]
 * @param  {[type]} regionReducer: ee.Reducer.mean() [description]
 * @param  {[type]} scale:30                                                      }  [description]
 * @return {[type]}                [description]
 */
Map.onClick(function(coords) {
    print("click map point is: " + coords.lon + " " + coords.lat);
    if (app.data.mapClickFlag) {
      var point = ee.Geometry.Point(coords.lon, coords.lat);
      if (app.data.clickPoint !== null) {
        Map.remove(app.data.clickPoint);
      }
      app.data.clickPoint = null;
      app.data.clickPoint = Map.addLayer(point, {color: "red"}, "clickPoint");
      var spectralbands = ['NDVI',  'MNDWI', 'CMRI', 'MMRI','EVI','LSWI'];
      //normal
      if(app.data.itemimage){
        Map.remove(app.data.itemimage);
      }
      app.data.itemimage = null;
      var spectraChart = ui.Chart.image.regions({
        image: app.data.SentinelCol.map(addIndex_simple).select(spectralbands).mean(),
        regions: point,
        scale: 10,
        seriesProperty: 'label',
        xLabels: spectralbands
      });
      spectraChart.setChartType('LineChart');
      spectraChart.setOptions({
        title: '光谱指数',
        hAxis: {
          title: 'index'
        },
        vAxis: {
          title: 'value'
        },
        lineWidth: 1,
        pointSize: 4,
        series: {
          0: {color: '0000ff'}}
      });
      spectraChart.style().set({
        position: 'top-right',
        width: '300px',
        height: '200px'
      });
      app.data.itemimage = spectraChart;
      Map.add(spectraChart);
    }
  }
);
//Panel 可视化
/***
 * 初始化UI界面
 * */
function initUI() {
  app.ui = {};
  /////////////////////////////////////
  app.ui.titlePanel = {
    panel: ui.Panel({
      widgets: [
        ui.Label({
          value: "淇澳岛红树林检测系统",
          style: {
            color: "0000ff",
            fontSize: "25px"
          }
        })
      ]
    })
  };
  /////////////////////////////////////
  var rawImageTitle = ui.Label({
    value:"筛选Sentinel-2影像",
    style: {
      fontWeight: "bold",
      fontSize: "16px"
    }
  });
  var startLabel = ui.Label("起始时间: yyyy-mm-dd");
  var startTextbox = ui.Textbox({
    placeholder: "起始时间: yyyy-mm-dd",
    value: app.data.startDate,
    onChange: function(value) {
      print("录入的起始时间: " + value);
      app.data.startDate = value;
    }
  });
  var endLabel = ui.Label("结束时间: yyyy-mm-dd");
  var endTextbox = ui.Textbox({
    placeholder: "结束时间: yyyy-mm-dd",
    value: app.data.endDate,
    onChange: function(value) {
      print("录入的结束时间: " + value);
      app.data.endDate = value;
    }
  });
  var cloudLabel = ui.Label("筛选云量");
  var cloudSlider = ui.Slider({
    min:1,
    max:100,
    value:app.data.cloudScore,
    step:1,
    direction: "horizontal",
    onChange: function(value) {
      print("slider1 change value is:"+ value);
      app.data.cloudScore = parseInt(value, 10);
    }
  });
  var searchBtn = ui.Button({
    label: "查找Sentinel-2原始影像",
    onClick: searchSentinelImages
  });
  var showImages = ui.Select({
    items: [],
    placeholder: "显示Sentinel-2原始影像",
    onChange: showSentinelImage
  });
  var exportBtn = ui.Button({
    label: "导出原始影像",
    onClick: exportResult
  });
  app.ui.rawImagePanel = {
    panel: ui.Panel({
      widgets: [
        rawImageTitle, 
        startLabel, startTextbox, 
        endLabel, endTextbox, 
        cloudLabel, cloudSlider,
        searchBtn,showImages,
        exportBtn
      ],
      style: {
        border : "1px solid black"
      }
    }),
    select: showImages
  };
  /////////////////////////////////////
  var processTitle = ui.Label({
    value:"影像分类",
    style: {
      fontWeight: "bold",
      fontSize: "16px"
    }
  });
  var mapClickCB = ui.Checkbox("开启地图点击事件查看指数结果图", app.data.mapClickFlag);
  mapClickCB.onChange(function(checked){
    print("地图点击事件：" + checked);
    app.data.mapClickFlag = checked;
  });
  var showThumbnailBtn = ui.Button({
    label: "计算光谱指数并分类",
    onClick: calculater
  });
  var detection = ui.Button({
    label: "红树林面积变化",
    onClick: timeareadetect
  });
  var djifly = ui.Button({
    label: "无人机数据",
    onClick: djiflydetection
  });
  app.ui.processPanel = {
    panel: ui.Panel({
      widgets: [
        processTitle,
        showThumbnailBtn,
        mapClickCB,
        detection,
        djifly
      ],
      style: {
        border : "1px solid black"
      }
    })
  };
  var main = ui.Panel({
      widgets: [
        app.ui.titlePanel.panel,
        app.ui.rawImagePanel.panel,
        app.ui.processPanel.panel
      ],
      style: {width: "350px", padding: '8px'}
    });
  ui.root.insert(0, main);
}
/***
 * 
 * main
 * */
function main() {
  Map.style().set('cursor', 'crosshair');
  Map.setOptions("SATELLITE");
  initUI();
  showBounds(ROI);
}
main();