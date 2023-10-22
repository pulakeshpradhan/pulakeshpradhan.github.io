//程序根据需求下载澜湄流域任意时间段内逐月NDVI数据
//UI面板
var panel = ui.Panel();
panel.style().set('width', '350px');
//label
var title_label = ui.Label({
 value: "NDVI下载工具",
 style: {fontSize:'24px', width:'350px',color:'#ff00ff', fontWeight:'bold'}
});
panel.add(title_label);
//输入框、按钮 
var strDate_input_tBox = ui.Textbox({placeholder:'请输入开始日期，格式:2020-04-01',style: {width:'300px'}});
var endDate_input_tBox = ui.Textbox({placeholder:'请输入结束日期，格式:2020-05-01',style: {width:'300px'}});
var btn1 = ui.Button({label:"点击确定起止时间",style: {width:'300px'}});
var btn2 = ui.Button({label:"点击下载影像数据(.tiff)到谷歌云",style: {width:'300px'}});
var btn3 = ui.Button({label:"点击下载影像数据(.tiff)到本地",style: {width:'300px'}});
var btn4 = ui.Button({label:"点击下载子流域数据(.csv/shp)到本地",style: {width:'300px'}});
//print(strDate_input_tBox,endDate_input_tBox,btn1,btn2,btn3,btn4);
//全局变量 
var dataset;  
var URLs = ee.List(['']);
var lanmei = ee.FeatureCollection("users/mhmttdj18/lanmei_bound");
var lanmei_basins = ee.FeatureCollection("users/mhmttdj18/lanmei_subBasins");
Map.centerObject(lanmei,4);
btn1.onClick(function(){  //加载数据
  //lanmei = ee.FeatureCollection("users/mhmttdj18/lanmei_bound");
  //lanmei_basins = ee.FeatureCollection("users/mhmttdj18/lanmei_subBasins");
  var startDate = strDate_input_tBox.getValue();
  var endDate   = endDate_input_tBox.getValue();
  run(startDate,endDate);
});
btn2.onClick(function(){
  downloadImagesToDrive(dataset);
});
btn3.onClick(function(){
  downloadImagesToPcbyURL(dataset);
});
btn4.onClick(function(){
  downloadSubbasinData(dataset);
});
panel.add(strDate_input_tBox);
panel.add(endDate_input_tBox);
panel.add(btn1);
panel.add(btn2);
panel.add(btn3);
panel.add(btn4);
ui.root.insert(0, panel);
//加载数据   
var run = function(startDate,endDate){
  print(endDate);
  dataset = ee.ImageCollection('LANDSAT/LC08/C01/T1_32DAY_NDVI')
                  .filterDate(startDate,endDate);
  print(dataset);
  var colorizedVis = {
    min: 0.0,
    max: 1.0,
    palette: [
      'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
      '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
      '012E01', '011D01', '011301'
    ],
  };
  var mean = dataset.mean();    //平均值 
  var clipped = mean.clipToCollection(lanmei);
  print(clipped);
  //加载 
  Map.centerObject(lanmei,2);
  Map.addLayer(clipped, colorizedVis, 'LM_NDVI');
}
//download Images to Google
var downloadImagesToDrive = function(dataset){
  var dataNums = dataset.size();  // 数据大小（图像个数 ）
  var list = dataset.toList(dataNums); 
  print(list); // 将时间序列转为list并打印信息，便于查看
  for(var i=0; i<ee.Number(dataNums).getInfo(); i++){
    var image = ee.Image(list.get(i)).clipToCollection(lanmei);
    var nameOut = ee.String('NDVI_').cat(ee.String(ee.Number(i+1))).getInfo();
    if(i===0){print('请到Tasks下载数据');}
    // 将数据下载到Google云盘上
    Export.image.toDrive({
        image: image,         // 要下载的影像
        description: nameOut, // 文件的默认名称
        folder: 'NDVI',       // 选择要下载到云盘的哪个文件夹
        region: lanmei,       // 裁剪区域
        scale: 1000,          // 分辨率，默认值是1000m
        maxPixels: 1e10       // 下载数据的最大像元数
    });
  }
}
//download Images to PC
var downloadImagesToPcbyURL = function(dataset){
  var dataNums = dataset.size();  // 数据大小（图像个数 ）
  var list = dataset.toList(dataNums); 
  print(list); // 将时间序列转为list并打印信息，便于查看
  for(var i=0; i<ee.Number(dataNums).getInfo(); i++){
    var image = ee.Image(list.get(i)).clipToCollection(lanmei);
    var nameOut = ee.String('NDVI_').cat(ee.String(ee.Number(i+1))).getInfo();
    //var imageInfo = image.geometry().getInfo();
    //var region1 = JSON.stringify(imageInfo);
    var url = image.getDownloadURL({scale: 1000,
                                    region: lanmei.geometry(),
                                     name:nameOut});
    var urlname = ee.String('URL_').cat(ee.String(ee.Number(i+1)))
                                   .cat(ee.String(" is:")).getInfo();
    print(urlname, url);
    URLs.add(url);
  }
  print(URLs);
}
var downloadSubbasinData = function(dataset){
    var sortdeBasins = lanmei_basins.distinct(['GRIDCODE']) //除掉重复的 
                                       .sort('GRIDCODE',true); //
    var dataNums = dataset.size();  // 数据大小（图像个数 ）
    var list = dataset.toList(dataNums); 
    for(var i=0; i<ee.Number(dataNums).getInfo(); i++){
      //影像数据转换成子流域数据 
      var ndvi_basins_FeaCol = ee.Image(list.get(i)).reduceRegions({
          collection: sortdeBasins,
          reducer: ee.Reducer.mean(),
          scale: 1000
          });
      var nameOut = ee.String('NDVI_').cat(ee.String(ee.Number(i+1))).getInfo();
      //输出子流域数据 
      Export.table.toDrive({
            collection:ndvi_basins_FeaCol,
            description: nameOut,
            fileNamePrefix: nameOut,
            fileFormat: "CSV",
            selectors: ["GRIDCODE","mean"]
          });
    }
}