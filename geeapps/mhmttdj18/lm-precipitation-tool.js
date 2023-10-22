//程序根据需求下载澜湄流域任意时间段内降雨数据
//全局变量 
var dataset; 
var mainImage;
var mailLayer;
var startDate = '2020-06-01';
var endDate = '2020-07-01';
var URLs = ee.List(['']);
var lanmei = ee.FeatureCollection("users/mhmttdj18/lanmei_bound");
var lanmei_subbasins = ee.FeatureCollection("users/mhmttdj18/Lanmei/LM_651basin");
var imageVisParam = {min: 0, max: 400,
                       "palette":["ff0000","ff6a00","ffbd00","efff00","b4ff00","33ff00","00b8ff","0089ff","1000ff"]};
//UI面板
var panel = ui.Panel();
panel.style().set('width', '350px');
//label
var title_label = ui.Label({
 value: "Precipitation in Lancang-Mekong Basin",
 style: {fontSize:'18px', width:'350px',color:'#000000', fontWeight:'bold'}
});
panel.add(title_label);
//输入框、按钮 
var strDate_input_tBox = ui.Textbox({placeholder:'Start date，format as: 2020-06-01',style: {width:'300px'}});
var endDate_input_tBox = ui.Textbox({placeholder:'End date，format as: 2020-07-01',style: {width:'300px'}});
var MaxValue_input_tBox = ui.Textbox({placeholder:'Maximum value of the legend (optional): 400',style: {width:'300px'},
  onChange: function(value) {
    imageVisParam.max = value;
    }
  });
var btn1 = ui.Button({label:"Total precipitation over this period of time (slow)",style: {width:'300px'}});
var btn2 = ui.Button({label:"Monthly precipitation over this period of time (fast)",style: {width:'300px'}});
var btn3 = ui.Button({label:"Download this image",style: {width:'300px'}});
var btn4 = ui.Button({label:"Clear Layers",style: {width:'300px'}});
btn1.onClick(function(){  //加载数据
  startDate = strDate_input_tBox.getValue();
  endDate   = endDate_input_tBox.getValue();
  run(startDate,endDate);
});
btn2.onClick(function(){
  startDate = strDate_input_tBox.getValue();
  endDate   = endDate_input_tBox.getValue();
  getMonthlyData(startDate,endDate);
});
btn3.onClick(function(){
  downloadImageToPcbyURL(mainImage);
}); 
btn4.onClick(function(){
  Map.clear();
  Map.drawingTools().clear();
  getMeanPrecipitation();
});
panel.add(strDate_input_tBox);
panel.add(endDate_input_tBox);
panel.add(MaxValue_input_tBox);
panel.add(btn2);
panel.add(btn1);
panel.add(btn3);
panel.add(btn4);
ui.root.insert(0, panel);
//加载数据   
var run = function(startDate,endDate){
  print(endDate);
  dataset = ee.ImageCollection("NASA/GPM_L3/IMERG_V06")
                  .filterDate(startDate,endDate)
                  .select('precipitationCal');
  print('dataset',dataset);
  mainImage = dataset.sum().multiply(0.5).clipToCollection(lanmei);
  print('mainImage',mainImage);
  Map.addLayer(mainImage, imageVisParam, 'Precipitation');
}
//Monthly Data   
var getMonthlyData = function(startDate,endDate){
  print(endDate);
  dataset = ee.ImageCollection("NASA/GPM_L3/IMERG_MONTHLY_V06")
                  .filterDate(startDate,endDate)
                  .select('precipitation');
  print('dataset',dataset);
  mainImage = dataset.sum().multiply(30*24).clipToCollection(lanmei);
  print('mainImage',mainImage);
  Map.addLayer(mainImage, imageVisParam, 'Precipitation');
}
//download Image to PC
var downloadImageToPcbyURL = function(img){
  var url = img.getDownloadURL({scale:5000,
                                region: lanmei.geometry(),});
  print('Download URL:', url);
}
//程序初次启动时直接运行 
dataset = ee.ImageCollection("NASA/GPM_L3/IMERG_MONTHLY_V06")
                  .filterDate(startDate,endDate)
                  .select('precipitation');
print('dataset',dataset);
mainImage = dataset.sum().multiply(30*24).clipToCollection(lanmei);
Map.addLayer(mainImage, imageVisParam, 'Precipitation');
Map.centerObject(lanmei,5);
//求平均降水量  start
var inspector = new ui.Panel();
getMeanPrecipitation();
function getMeanPrecipitation(){
  inspector.clear();
  // Make a label to display mean elevation at drawn points.
  var pointLabel = new ui.Label('Draw points to calculate mean precipitation');
  inspector.add(pointLabel); 
  Map.add(inspector);
  // Don't make imports that correspond to the drawn points.
  Map.drawingTools().setLinked(false);
  // Limit the draw modes to points.
  Map.drawingTools().setDrawModes(['point']);
  // Add an empty layer to hold the drawn points.
  Map.drawingTools().addLayer([]);
  // Set the geometry type to be point.
  Map.drawingTools().setShape('point');
  // Enter drawing mode.
  Map.drawingTools().draw();
  // This function gets called when the geometry layer changes.
  // Use debounce to call the function at most every 100 milliseconds.
  var getAverageElevation = ui.util.debounce(function() {
    var points = Map.drawingTools().layers().get(0).toGeometry();
    var precipitation = mainImage.reduceRegion({
      reducer: ee.Reducer.mean(),
      geometry: points,
      scale: 30
    }).get('precipitation');
    // Asynchronously evaluate the mean elevation.
    precipitation.evaluate(showElevation);
  }, 100);
  // Set the callback function on changes of the geometry layer.
  Map.drawingTools().onEdit(getAverageElevation);
  Map.drawingTools().onDraw(getAverageElevation);
  Map.drawingTools().onErase(getAverageElevation);
}
// Set the label to the result of the mean reduction.
function showElevation(precipitation) {
  inspector.clear();
  var elevationLabel = ui.Label('Mean precipitation: ' + precipitation);
  inspector.add(elevationLabel);
}
//求平均降水量  end