var out = ui.import && ui.import("out", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                112.96305143718632,
                23.08992188445835
              ],
              [
                112.96305143718632,
                22.771200294836255
              ],
              [
                113.43546354656132,
                22.771200294836255
              ],
              [
                113.43546354656132,
                23.08992188445835
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Polygon(
        [[[112.96305143718632, 23.08992188445835],
          [112.96305143718632, 22.771200294836255],
          [113.43546354656132, 22.771200294836255],
          [113.43546354656132, 23.08992188445835]]], null, false),
    jy = ui.import && ui.import("jy", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                116.05777062803614,
                23.57927468606347
              ],
              [
                116.05777062803614,
                23.13801805846396
              ],
              [
                116.72244347959864,
                23.13801805846396
              ],
              [
                116.72244347959864,
                23.57927468606347
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Polygon(
        [[[116.05777062803614, 23.57927468606347],
          [116.05777062803614, 23.13801805846396],
          [116.72244347959864, 23.13801805846396],
          [116.72244347959864, 23.57927468606347]]], null, false);
//软著申请 单景 水质
/*
Export.image.toDrive({
  image: Dc,
  description: "DcTODrive2",
  fileNamePrefix: "Dc215",
  crs:'EPSG:32649',
  scale: 10,
  region:Dc.geometry(),
  maxPixels: 1e13
});
*/
// // main map
var mapMain = ui.Map();
mapMain.setCenter(113.38, 22.99);
mapMain.setZoom(9);
mapMain.drawingTools().setShown(false);
mapMain.drawingTools().setLinked(false);
mapMain.drawingTools().setDrawModes(['rectangle']);
mapMain.drawingTools().onDraw(function(value){polygonNumber = polygonNumber+1; mapMain.drawingTools().stop()});
// main panel
var panelMain = ui.Panel();
panelMain.style().set({width: '350px', position: "bottom-right"});
// root interface
ui.root.clear();
ui.root.add(panelMain);
ui.root.add(mapMain);
var testLabel = ui.Label({
  value: "",
  style:{
    margin: '10px 0 0 10px',
    textAlign: "left",
    color: "#b10d02",
    position:'bottom-left',
  },
});
mapMain.add(testLabel);
var panelMain1 = ui.Panel();
panelMain.add(panelMain1);
// system title
var titleLabel = ui.Label({
  value: "水质遥感云监测系统",
  style:{
    margin: '10px 0 0 10px',
    fontSize: '18px',
    textAlign: "left",
    color: "#b10d02",
    fontWeight: 'bold',
  },
});
// section bar
var labelBar1 = ui.Label({
  value: '______________________________________________',
  style:{
    margin: '0 0 0 10px',
    textAlign: "left",
    color: "#000000",
  },
});
panelMain1.add(titleLabel);  
panelMain1.add(labelBar1);
var yearList = [
  {label:"2015", value:"2015"},
  {label:"2016", value:"2016"},
  {label:"2017", value:"2017"},
  {label:"2018", value:"2018"},
  {label:"2019", value:"2019"},
  {label:"2020", value:"2020"},
  {label:"2021", value:"2021"},
  {label:"2022", value:"2022"},
  {label:"2023", value:"2023"},
];
var monthList = [
  {label:"1", value:"01"},
  {label:"2", value:"02"},
  {label:"3", value:"03"},
  {label:"4", value:"04"},
  {label:"5", value:"05"},
  {label:"6", value:"06"},
  {label:"7", value:"07"},
  {label:"8", value:"08"},
  {label:"9", value:"09"},
  {label:"10", value:"10"},
  {label:"11", value:"11"},
  {label:"12", value:"12"},
];
var dateList1 = [
  {label:"1", value:"01"},
  {label:"2", value:"02"},
  {label:"3", value:"03"},
  {label:"4", value:"04"},
  {label:"5", value:"05"},
  {label:"6", value:"06"},
  {label:"7", value:"07"},
  {label:"8", value:"08"},
  {label:"9", value:"09"},
  {label:"10", value:"10"},
  {label:"11", value:"11"},
  {label:"12", value:"12"},
  {label:"13", value:"13"},
  {label:"14", value:"14"},
  {label:"15", value:"15"},
  {label:"16", value:"16"},
  {label:"17", value:"17"},
  {label:"18", value:"18"},
  {label:"19", value:"19"},
  {label:"20", value:"20"},
  {label:"21", value:"21"},
  {label:"22", value:"22"},
  {label:"23", value:"23"},
  {label:"24", value:"24"},
  {label:"25", value:"25"},
  {label:"26", value:"26"},
  {label:"27", value:"27"},
  {label:"28", value:"28"},
  {label:"29", value:"29"},
  {label:"30", value:"30"},
  {label:"31", value:"31"},
];
var dateList2 = [
  {label:"1", value:"01"},
  {label:"2", value:"02"},
  {label:"3", value:"03"},
  {label:"4", value:"04"},
  {label:"5", value:"05"},
  {label:"6", value:"06"},
  {label:"7", value:"07"},
  {label:"8", value:"08"},
  {label:"9", value:"09"},
  {label:"10", value:"10"},
  {label:"11", value:"11"},
  {label:"12", value:"12"},
  {label:"13", value:"13"},
  {label:"14", value:"14"},
  {label:"15", value:"15"},
  {label:"16", value:"16"},
  {label:"17", value:"17"},
  {label:"18", value:"18"},
  {label:"19", value:"19"},
  {label:"20", value:"20"},
  {label:"21", value:"21"},
  {label:"22", value:"22"},
  {label:"23", value:"23"},
  {label:"24", value:"24"},
  {label:"25", value:"25"},
  {label:"26", value:"26"},
  {label:"27", value:"27"},
  {label:"28", value:"28"},
  {label:"29", value:"29"},
  {label:"30", value:"30"},
];
var dateList3 = [
  {label:"1", value:"01"},
  {label:"2", value:"02"},
  {label:"3", value:"03"},
  {label:"4", value:"04"},
  {label:"5", value:"05"},
  {label:"6", value:"06"},
  {label:"7", value:"07"},
  {label:"8", value:"08"},
  {label:"9", value:"09"},
  {label:"10", value:"10"},
  {label:"11", value:"11"},
  {label:"12", value:"12"},
  {label:"13", value:"13"},
  {label:"14", value:"14"},
  {label:"15", value:"15"},
  {label:"16", value:"16"},
  {label:"17", value:"17"},
  {label:"18", value:"18"},
  {label:"19", value:"19"},
  {label:"20", value:"20"},
  {label:"21", value:"21"},
  {label:"22", value:"22"},
  {label:"23", value:"23"},
  {label:"24", value:"24"},
  {label:"25", value:"25"},
  {label:"26", value:"26"},
  {label:"27", value:"27"},
  {label:"28", value:"28"},
];
// //---------------------------------------------------------------------------------------------------------------------
// //---------------------------Setting for the first image--------------------------------------------------
// //---------------------------------------------------------------------------------------------------------------------
{
// panel title
var dateLabel = ui.Label({
  value: "选择时间",
  style:{
    fontWeight: "bold",
    margin: '10px 0 0 10px',
    textAlign: "left",
    color: "#b10d02",
  },
});
var labelImage1Time = ui.Label({
  value: "遥感影像获取时间段:",
  style:{
    margin: '10px 0 0 10px',
    textAlign: "left",
    color: "#000000",
  },
});
var labelImage1From = ui.Label({
  value: "从:",
  style:{
    height: "26px",
    margin: '10px 10px 0 10px',
    textAlign: "left",
    color: "#000000",
  },
});
var labelImage1StartYear = ui.Label({
  value: "年",
  style:{
    height: "26px",
    margin: '10px 20px 0 0',
    textAlign: "left",
    color: "#000000",
  },
});
var labelImage1StartMonth = ui.Label({
  value: "月",
  style:{
    height: "26px",
    margin: '10px 20px 0 0',
    textAlign: "left",
    color: "#000000",
  },
});
var labelImage1StartDate = ui.Label({
  value: "日",
  style:{
    height: "26px",
    margin: '10px 0 0 0',
    textAlign: "left",
    color: "#000000",
  },
});
// select the staring year for the first image
var selectImage1StartYear = ui.Select({
  items: yearList,
  style:{
    height: "30px",
    margin: '10px 5px 0 0',
    textAlign: "left",
    color: "#000000",
  },
  value: "2022",
});
// select the staring month for the first image
var selectImage1StartMonth = ui.Select({
  items: monthList,
  style:{
    height: "30px",
    margin: '10px 5px 0 0',
    textAlign: "left",
    color: "#000000",
  },
  value: "01",
  onChange: function(key) {
    if ((key == "01")||(key == "03")||(key == "05")||(key == "07")||(key == "08")||(key == "10")||(key == "12")) {
      selectImage1StartDate.items().reset(dateList1); 
      selectImage1StartDate.setPlaceholder ("01");
    }
    else if ((key == "04")||(key == "06")||(key == "09")||(key == "11")) {
      selectImage1StartDate.items().reset(dateList2); 
      selectImage1StartDate.setPlaceholder ("01");
    }
    else if (key == "02"){
      selectImage1StartDate.items().reset(dateList3); 
      selectImage1StartDate.setPlaceholder ("01");
    }
  }
});
// select the staring date for the first image
var selectImage1StartDate = ui.Select({
  items: dateList1,
  style:{
    height: "30px",
    margin: '10px 5px 0 0',
    textAlign: "left",
    color: "#000000",
  },
  value: "01",
});
// end time of the first image
var labelImage1To = ui.Label({
  value: "至:",
  style:{
    height: "25px",
    margin: '10px 10px 0 10px',
    textAlign: "left",
    color: "#000000",
  },
});
var labelImage1EndYear = ui.Label({
  value: "年",
  style:{
    height: "25px",
    margin: '10px 20px 0 0',
    textAlign: "left",
    color: "#000000",
  },
});
var labelImage1EndMonth = ui.Label({
  value: "月",
  style:{
    height: "25px",
    margin: '10px 20px 0 0',
    textAlign: "left",
    color: "#000000",
  },
});
var labelImage1EndDate = ui.Label({
  value: "日",
  style:{
    height: "25px",
    margin: '10px 0 0 0',
    textAlign: "left",
    color: "#000000",
  },
});
// select the ending year for the first image
var selectImage1EndYear = ui.Select({
  items: yearList,
  style:{
    height: "30px",
    margin: '10px 5px 0 0px',
    textAlign: "left",
    color: "#000000",
  },
  value: "2022",
});
// select the ending month for the first image
var selectImage1EndMonth = ui.Select({
  items: monthList,
  style:{
    height: "30px",
    margin: '10px 5px 0 0',
    textAlign: "left",
    color: "#000000",
  },
  value: "01",
  onChange: function(key) {
    if ((key == "01")||(key == "03")||(key == "05")||(key == "07")||(key == "08")||(key == "10")||(key == "12")) {
      selectImage1EndDate.items().reset(dateList1); 
      selectImage1EndDate.setPlaceholder ("01");
    }
    else if ((key == "04")||(key == "06")||(key == "09")||(key == "11")) {
      selectImage1EndDate.items().reset(dateList2); 
      selectImage1EndDate.setPlaceholder ("01");
    }
    else if (key == "02"){
      selectImage1EndDate.items().reset(dateList3); 
      selectImage1EndDate.setPlaceholder ("01");
    }
  }
});
// select the ending date for the first image
var selectImage1EndDate = ui.Select({
  items: dateList1,
  style:{
    height: "30px",
    margin: '10px 5px 0 0',
    textAlign: "left",
    color: "#000000",
  },
  value: "01",
});
var monthList2 = [
  {label:"1", value:1},
  {label:"2", value:2},
  {label:"3", value:3},
  {label:"4", value:4},
  {label:"5", value:5},
  {label:"6", value:6},
  {label:"7", value:7},
  {label:"8", value:8},
  {label:"9", value:9},
  {label:"10", value:10},
  {label:"11", value:11},
  {label:"12", value:12},
];
// panel for determing the starting date of the first image
var panelImage1StartTime = ui.Panel({layout: ui.Panel.Layout.flow("horizontal")});
panelImage1StartTime.add(labelImage1From);
panelImage1StartTime.add(selectImage1StartYear);
panelImage1StartTime.add(labelImage1StartYear);
panelImage1StartTime.add(selectImage1StartMonth);
panelImage1StartTime.add(labelImage1StartMonth);
panelImage1StartTime.add(selectImage1StartDate);
panelImage1StartTime.add(labelImage1StartDate);
var panelImage1EndTime = ui.Panel({layout: ui.Panel.Layout.flow("horizontal")});
panelImage1EndTime.add(labelImage1To);
panelImage1EndTime.add(selectImage1EndYear);
panelImage1EndTime.add(labelImage1EndYear);
panelImage1EndTime.add(selectImage1EndMonth);
panelImage1EndTime.add(labelImage1EndMonth);
panelImage1EndTime.add(selectImage1EndDate);
panelImage1EndTime.add(labelImage1EndDate);
panelMain1.add(dateLabel);
panelMain1.add(labelImage1Time);
panelMain1.add(panelImage1StartTime);
panelMain1.add(panelImage1EndTime);
}
// //---------------------------------------------------------------------------------------------------------------------
// //---------------------------Region selection panel selection------------------------------------------------------------
// //---------------------------------------------------------------------------------------------------------------------
var selector;
{
// panel title
var labelRegionSelection = ui.Label({
  value: "选择区域",
  style:{
    fontWeight: "bold",
    margin: '10px 0 0 10px',
    textAlign: "left",
    color: "#b10d02",
  },
});
//button for dawing roi
var buttonRectangle = ui.Button({
  label:"绘制区域",
  style:{
    height: "30px",
    margin: '10px 0 0 10px',
    textAlign: "left",
    color: "#000000",
  },
  onClick:function(){
    mapMain.drawingTools().setShape('rectangle');
    mapMain.drawingTools().draw();
    //labelImage1id.setValue(" ");
  },
  disabled: false,
});
//button for clearing roi
var buttonClear = ui.Button({
  label:"删除区域",
  style:{
    height: "30px",
    margin: '10px 0 0 20px',
    textAlign: "left",
    color: "#000000",
  },
  onClick:function(){
    clearRoi();
    //labelImage1id.setValue(" ");
  },
  disabled:false,
});
var labelBar2 = ui.Label({
  value: '______________________________________________',
  style:{
    margin: '0 0 0 10px',
    textAlign: "left",
    color: "#000000",
  },
});
var panelDraw = ui.Panel({layout:ui.Panel.Layout.flow("horizontal")});
panelDraw.add(buttonRectangle);
panelDraw.add(buttonClear);
panelMain1.add(labelRegionSelection);
panelMain1.add(panelDraw);
panelMain1.add(labelBar2);
}
// //---------------------------------------------------------------------------------------------------------------------
// //---------------------------run------------------------------------------------------------
// //---------------------------------------------------------------------------------------------------------------------
{
//button for search image
var buttonSearch = ui.Button({
  label:"筛选影像",
  style:{
    height: "30px",
    margin: '10px 0 0 10px',
    textAlign: "left",
    color: "#000000",
  },
  onClick:function(){
// roi 
    if (polygonNumber === 0) {testLabel.setValue("请选择区域！")}
    else{
      var roi = mapMain.drawingTools().layers().get(0).toGeometry();
      // image acquistion time  
      var image1_start_time = selectImage1StartYear.getValue()+"-"+selectImage1StartMonth.getValue()+"-"+selectImage1StartDate.getValue();
      var image1_end_time = selectImage1EndYear.getValue()+"-"+selectImage1EndMonth.getValue()+"-"+selectImage1EndDate.getValue();
      if (image1_start_time >= image1_end_time) {testLabel.setValue("影像获取结束时间需晚于开始时间！")}
      else {
        searchImage(roi, 
          image1_start_time,
          image1_end_time)
      }
    }
  },
  disabled:false,
});
var resolution = [
  {label:"分辨率:30m", value:30},
  {label:"分辨率:20m", value:20},
  {label:"分辨率:10m", value:10},
];
 // select the staring year for the first image
var selectImage1Scale = ui.Select({
  items: resolution,
  style:{
    height: "30px",
    margin: '10px 5px 0 20px',
    textAlign: "left",
    color: "#000000",
  },
  value: 30,
});
// run button single image
var runButton2 = ui.Button({
  label:"开始检测",
  style:{
    height: "30px",
    margin: '10px 0 0 20px',
    textAlign: "left",
    color: "#b10d02"
  },
  onClick:function(){
    mapMain.setZoom(11);
    var maplist = mapMain.layers();
    //maplist.sort('system:time_start');
    // print('maplist',maplist);
    // var aa = maplist.get(1).get('name');
    // print(aa,typeof(aa))
    var topImage = maplist.getJsArray()
    .filter(function(f) { return f.getShown() });
    // print('topImage',topImage);
    var imglist = ee.List(topImage.map(function (img)
    {
      var obj = img.get('eeObject');
      return obj;
    }));
    print('imglist',imglist);
    imgcolselect = ee.ImageCollection(imglist);
    imgcolselectGeometry = imgcolselect.geometry()
    clearRoi(); 
    clearLayers();
    // var selectid = selector.getValue();
    // imgSelected = ee.Image(shownid[0]);
    imgSelected = imgcolselect.first();
    imgproj = imgSelected.select(0).projection();
    // mapMain.addLayer(imgSelected,vis1,'真彩色影像');
    // correction(imgSelected);
    mapMain.addLayer(imgSelected,vis1,'真彩色影像');
    // imgcol3d = ee.ImageCollection(imgcolselect.map(detectionTimes)).sort('system:time_start');
    // print('imgcol3d',imgcol3d);
    var imgg = ee.Image(detectionTimes(imgSelected));
    // mapMain.addLayer(imgg,{},'imgg')
    imgcol3d = ee.ImageCollection(imgg)
    print(imgg)
    //     imgDC = imgg.select('DC');
    // imgDS = imgg.select('DS');
    // imgDU = imgg.select('DU');
    imgcolDC = imgcol3d.select('DC');
    imgcolDS = imgcol3d.select('DS');
    imgcolDU = imgcol3d.select('DU');
    print('imgcolDC',imgcolDC);
  }
});
// dc button  chla
var singledcButton = ui.Button({
  label:"叶绿素a",
  style:{
    height: "30px",
    margin: '10px 0 0 10px',
    textAlign: "left",
    color: "#000000"
  },
  onClick:function(){
    clearLayers();
    //719
    imgDC = imgcolDC.first();
    mapMain.addLayer(imgSelected,vis1,'真彩色影像');
    // mapMain.addLayer(wwater,vis1,'wwater',false);
    // singleDetection(imgDC,'dc叶绿素a');
    // AddLayerPercentStretch2(imgDC,'叶绿素a浓度')
    AddLayerPercentStretchMean(imgDC,5,'叶绿素a','DC_lower','DC_upper')
    mapMain.setZoom(11);
  }
});
// ds button  TSM
var singledsButton = ui.Button({
  label:"悬浮泥沙",
  style:{
    height: "30px",
    margin: '10px 0 0 20px',
    textAlign: "left",
    color: "#000000"
  },
  onClick:function(){
    clearLayers();
    imgDS = imgcolDS.first();
    mapMain.addLayer(imgSelected,vis1,'真彩色影像');
    // AddLayerPercentStretch2(imgDS,'悬浮物浓度');
    AddLayerPercentStretchMean(imgDS,5,'悬浮泥沙','DS_lower','DS_upper')
    mapMain.setZoom(11);
  }
});
// du button  COD
var singleduButton = ui.Button({
  label:"综合有机污染物",
  style:{
    height: "30px",
    margin: '10px 0 0 20px',
    textAlign: "left",
    color: "#000000"
  },
  onClick:function(){
    clearLayers();
    imgDU = imgcolDU.first();
    mapMain.addLayer(imgSelected,vis1,'真彩色影像');
    // AddLayerPercentStretch2(imgDU,'化学需氧量浓度');
    AddLayerPercentStretchMean(imgDU,5,'综合有机污染物','DU_lower','DU_upper')
    mapMain.setZoom(11);
  }
});
var labelBar3 = ui.Label({
  value: '______________________________________________',
  style:{
    margin: '0 0 0 10px',
    textAlign: "left",
    color: "#000000",
  },
});
var panelSingle1 = ui.Panel({layout: ui.Panel.Layout.flow("horizontal")});
panelSingle1.add(buttonSearch);
panelSingle1.add(selectImage1Scale);
panelSingle1.add(runButton2);
var panelSingle3 = ui.Panel({layout: ui.Panel.Layout.flow("horizontal")});
panelSingle3.add(singledcButton);
panelSingle3.add(singledsButton);
panelSingle3.add(singleduButton);
var panelSingle = ui.Panel();
panelSingle.add(panelSingle1);
panelSingle.add(panelSingle3);
panelMain.add(panelSingle);
panelMain.add(labelBar3);
}
// //---------------------------------------------------------------------------------------------------------------------
// //---------------------------run------------------------------------------------------------
// //---------------------------------------------------------------------------------------------------------------------
{
var labelBar4 = ui.Label({
  value: '______________________________________________',
  style:{
    margin: '0 0 0 10px',
    textAlign: "left",
    color: "#000000",
  },
});
panelMain.add(labelBar4);
}
// clearbutton 
var clearButton = ui.Button({
  label:"重置",
  style:{
    height: "30px",
    margin: '10px 0 0 10px',
    textAlign: "left",
    color: "#000000"
  },
  onClick:function(){
    clearRoi(); 
    clearLayers();
    //labelImage1id.setValue("  ");
    labelMessage.setValue('点击“开始检测”后，请耐心等待系统加载结果!');
    panelMain1.remove(selector);
  }
});
panelMain.add(clearButton);
var layers = mapMain.layers();
var imgcolAA;
var imgSelected;
var image1col;
var imgcolselectGeometry;
var imgcol3d;
var imgcolDC;
var imgcolDS;
var imgcolDU;
var imgDCstd;
var imgDSstd;
var imgDUstd;
var imgDCmean;
var imgDSmean;
var imgDUmean;
var imgcolChart;
var imgDC; var imgDS; var imgDU;
var idlist = ee.List([]);
var idlistshown;
var jsid;
var imgcol3dJSid;
var idlist2 = ee.List([]);
var imgcolselect;
var imgproj;
// var imgSelector;
var colorbarTextmin;
var colorbarTextmax;
var imgcolDisplay;
var imgcolDCmean;var imgcolDSmean;var imgcolDUmean;
var imgcolDCstd;var imgcolDSstd;var imgcolDUstd;
var wwater;
var imgscale = 30;
//setttttttttttt
//aaaaaaaaa
var vis1 = {
  bands: ['B4', 'B3', 'B2'],
  min: 0,
  max: 3000
};
var colorparams ={
  palette:["0008ff","00a1ff","00e7ff","00ffd0","9dff00","efff02","ffe000","ffb100","ff6a00","ff0000"],
  format: 'png',
};
// number of drawing polygons
var polygonNumber = 0;
// clear all the layers in the map
function clearLayers(){
  while (mapMain.layers().length()>0){
    var layer = mapMain.layers().get(0);
    mapMain.layers().remove(layer);
  }
}
// clear all the rois
function clearRoi(){
  while (mapMain.drawingTools().layers().length() > 0){
    var layer = mapMain.drawingTools().layers().get(0);
    mapMain.drawingTools().layers().remove(layer);
  }
  polygonNumber = 0;
}
function NormalizStretch(img,percent){
  var lower_percentile = ee.Number(percent);
  var upper_percentile = ee.Number(100).subtract(lower_percentile);
  var norstats = (img.rename('value')).reduceRegion({
    reducer: ee.Reducer.percentile({percentiles: [lower_percentile, upper_percentile]}).setOutputs(['lower', 'upper']),
    scale: 20, 
    maxPixels:1e13,
    // geometry:jy,
  });
  var min = ee.Number(norstats.get('value_lower'));
  var max = ee.Number(norstats.get('value_upper'));
  var norimg = img.clamp(min,max);
  norimg = (norimg.subtract(min).divide(max.subtract(min))).toFloat();
  return norimg;
}
function singleDetection(img,layername)
{
    //var imgcolSTD = imgcol.reduce(ee.Reducer.sampleStdDev());
    //var imgcolMean = imgcol.reduce(ee.Reducer.mean());
    //mapMain.centerObject(img.geometry(),11)
    AddLayerPercentStretch2(img,90,layername);
    //AddLayerPercentStretchSTD(imgcolMean,90,'平均值');
    // imgcolChart = imgcol;
}
function slopeStdStretchGT02(img,dev,layername)
{
  var stats = img.rename(['value']).reduceRegion({
    reducer: ee.Reducer.mean().combine({reducer2:ee.Reducer.stdDev(), sharedInputs:true})
                              .setOutputs(['mean', 'stddev']), 
    geometry: imgcolselectGeometry,
    scale: 20, 
    maxPixels:1e13
  });
  var mean = ee.Number(stats.get('value_mean'));
  var std = ee.Number(stats.get('value_stddev'));
  var max = mean.add(std.multiply(ee.Number(dev)));
  var min = mean.subtract(std.multiply(ee.Number(dev)));
  min = min.multiply(min.gte(0));
  // colorbarMax.setValue(max.format('%.2f').getInfo());
  print('max,min',max,min);
  var minmax = ee.List([min,max]);
  print('minmax',minmax)
  var mmlist = minmax.getInfo();
  colorbarMax.setValue(mmlist[1].toFixed(2));
  //aaaaa   
  // minmax.evaluate(function (minmaxlist)
  // {
  //   colorbarMax.setValue(minmaxlist[1].toFixed(2));
  //   var vistemp = ({
  //     min: minmaxlist[0],
  //     max: minmaxlist[1],
  //     //hong红
  //     palette:["fff5f0","fee0d2","fcbba1","fc9272","fb6a4a","ef3b2c","cb181d","a50f15","67000d"],
  //   });
  //   mapMain.addLayer({
  //   eeObject: img,
  //   visParams: vistemp,
  //   name: layername,
  //   shown: false,
  //   });
  // })
  var vistemp = ({
      'min': mmlist[0],
      'max': mmlist[1],
      'palette':["fff5f0","fee0d2","fcbba1","fc9272","fb6a4a","ef3b2c","cb181d","a50f15","67000d"],//hong红
    });
  mapMain.addLayer({
    eeObject: img,
    visParams: vistemp,
    name: layername,
    shown: false,
  });
}
function slopeStdStretchLT0(img,dev,layername)
{
  var stats = img.rename(['value']).reduceRegion({
    reducer: ee.Reducer.mean().combine({reducer2:ee.Reducer.stdDev(), sharedInputs:true})
                              .setOutputs(['mean', 'stddev']), 
    geometry: imgcolselectGeometry,
    scale: 20, 
    maxPixels:1e13
  });
  var mean = ee.Number(stats.get('value_mean'));
  var std = ee.Number(stats.get('value_stddev'));
  var max = mean.add(std.multiply(ee.Number(dev)));
  var min = mean.subtract(std.multiply(ee.Number(dev)));
  max = max.multiply(max.lt(0));
  // colorbarMin.setValue(min.format('%.2f').getInfo());
  var minmax = ee.List([min,max]);
  var mmlist = minmax.getInfo();
  colorbarMin.setValue(mmlist[0].toFixed(2));
  // minmax.evaluate(function (minmaxlist)
  // {
  //   colorbarMax.setValue(minmaxlist[0].toFixed(2));
  //   var vistemp = ({
  //     min: minmaxlist[0],
  //     max: minmaxlist[1],
  //     //lan蓝
  //     palette:["08306b","08519c","08519c","2171b5","4292c6","6baed6","9ecae1","c6dbef","deebf7","f7fbff"],
  //   });
  //   mapMain.addLayer({
  //   eeObject: img,
  //   visParams: vistemp,
  //   name: layername,
  //   shown: false,
  //   });
  // })
  var vistemp = ({
      'min': mmlist[0],
      'max': mmlist[1],
      'palette':["08306b","08519c","08519c","2171b5","4292c6","6baed6","9ecae1","c6dbef","deebf7","f7fbff"],//lan蓝
    });
  mapMain.addLayer({
    eeObject: img,
    visParams: vistemp,
    name: layername,
    shown: false,
  });
}
function slopePerStretchGT0(img,perc,layername)
{
  var lower_percentile = ee.Number(perc);
  var upper_percentile = ee.Number(100).subtract(lower_percentile);
  var stats = (img.rename('value')).reduceRegion({
    reducer: ee.Reducer.percentile({percentiles: [lower_percentile, upper_percentile]}).setOutputs(['lower', 'upper']),
    scale: 20, 
    maxPixels:1e13,
    geometry:imgcolselectGeometry,
  });
  var min = ee.Number(stats.get('value_lower'));
  var max = ee.Number(stats.get('value_upper'));
  min = min.multiply(min.gte(0));
  colorbarMax.setValue(max.format('%.2f').getInfo());
  var vis_params = ee.Dictionary({
    min: min,
    max: max,
    palette:["fff5f0","fee0d2","fcbba1","fc9272","fb6a4a","ef3b2c","cb181d","a50f15","67000d"],//hong红
  });
  mapMain.addLayer({
    eeObject: img,
    visParams: vis_params.getInfo(),
    name: layername,
    shown: false,
  });
}
function slopePerStretchLT0(img,perc,layername)
{
  var lower_percentile = ee.Number(perc);
  var upper_percentile = ee.Number(100).subtract(lower_percentile);
  var stats = (img.rename('value')).reduceRegion({
    reducer: ee.Reducer.percentile({percentiles: [lower_percentile, upper_percentile]}).setOutputs(['lower', 'upper']),
    scale: 20, 
    maxPixels:1e13,
    geometry:imgcolselectGeometry,
  });
  var min = ee.Number(stats.get('value_lower'));
  var max = ee.Number(stats.get('value_upper'));
  max = max.multiply(max.lt(0));
  colorbarMin.setValue('标准差: 0');
  var vis_params = ee.Dictionary({
    'min': min,
    'max': max,
    'palette':["08306b","08519c","08519c","2171b5","4292c6","6baed6","9ecae1","c6dbef","deebf7","f7fbff"],//lan蓝
  });
  mapMain.addLayer({
    eeObject: img,
    visParams: vis_params.getInfo(),
    name: layername,
    shown: false,
  });
}
//719
function detectionTimes(img)
{
  // var yswmasktemp = img.expression(
  //                 '1.0 * (b3 - b8) / (b3 + b8)',
  //                 {
  //                   b3:img.select('B3'),
  //                   b8:img.select('B8'),
  //                 });
  // var yswmask1 = yswmasktemp.gt(0);
  // var yswmask2 = img.select('B8').lt(1000);
  // var yswmask3 = yswmask1.and(yswmask2);
  // mapMain.addLayer(yswmask3,{},'yuanshi water',false);
  imgscale = selectImage1Scale.getValue();
  // print('imgscale',imgscale,typeof imgscale)
  // //-------------------median filter---------------
  var kernelpx = ee.Kernel.square(2,'pixels',false);
  print('kernelpx',kernelpx);
  var imgmedian = img.focal_median({kernel: kernelpx, iterations: 1});
  var proj = img.select(0).projection();
  var imgmedianpro = imgmedian.reproject(proj,null,imgscale); 
  var mfwmasktemp = imgmedianpro.expression(
                  '1.0 * (b3 - b8) / (b3 + b8)',
                  {
                    b3:imgmedianpro.select('B3'),
                    b8:imgmedianpro.select('B8'),
                  });
  var mfwmask1 = mfwmasktemp.gt(0);
  var mfwmask2 = imgmedianpro.select('B8').lt(1000);
  var mfwmask3 = mfwmask1.and(mfwmask2);
  // mapMain.addLayer(mfwmask3,{},'medianf water',false);
  // //-------------------dark piexl , rw[b2,b3,b4,b8]---------------
  var immg = imgmedianpro;
  var immgb2=immg.select('B2'),
      immgb3=immg.select('B3'),
      immgb4=immg.select('B4'),
      immgb8=immg.select('B8');
  var mask84 = immgb8.lt(immgb4),
      mask2 = immgb2.gt(650),
      maskall = mask84.and(mask2);
  var immgt = immg.updateMask(maskall);
  var immgtb2 = immgt.select('B2'),
      immgtb8 = immgt.select('B8');
  var immgtb2b8 = (immgtb2.multiply(immgtb2).add(immgtb8.multiply(immgtb8))).rename(['b2b8']);
  var stats = immgtb2b8.reduceRegion({
  reducer: ee.Reducer.min(),
  // geometry: jy,
  scale: 10,
  maxPixels: 1e12
});
  // print('stats',stats)
  var mmin = ee.Number(stats.get('b2b8'));
  var mmax = mmin.multiply(1.08);
  var maskmid = immgtb2b8.gte(mmin).and(immgtb2b8.lt(mmax));
  //% 对估算范围做掩膜
  var immgtb2b8est = immgtb2b8.updateMask(maskmid);
  //% 列表排序 
  var listPixel1=ee.List(immgtb2b8est.reduceRegion({
		reducer:ee.Reducer.toList(),
    scale:10,
    maxPixels:1e13,
      // geometry: jy,
  }).get('b2b8')).sort().slice(0,60);
  // print('listPixel1',listPixel1)
  var dark10th = ee.Number(listPixel1.get(10)),
      dark50th = ee.Number(listPixel1.get(49));
  var mask10th = immgtb2b8est.gte(dark10th),
      mask50th = immgtb2b8est.lte(dark50th),
      maskdark = mask10th.and(mask50th);
  var immgt40 = immgtb2b8est.updateMask(maskdark);
  var mask40 = maskall.and(maskdark)
  var imm = immg.updateMask(mask40)
  var meandict = imm.reduceRegion({
      reducer: ee.Reducer.mean(),
      scale: 10,
      // geometry:jy,
      maxPixels: 1e13,
  });
  var meanblue = ee.Number(meandict.get('B2')),
      meangreen = ee.Number(meandict.get('B3')),
      meanred = ee.Number(meandict.get('B4')),
      meannir = ee.Number(meandict.get('B8'));
  var rw=ee.Array([meanblue,meangreen,meanred,meannir]).divide(10000.0);
  print('rw',rw)
  // Convert the zones of the thresholded nightlights to vectors.
  var aa = immgt40.gte(0);
  var vectors = aa.reduceToVectors({
    crs: 'EPSG:32649',
    scale: 10,
    geometryType: 'polygon',
    eightConnected: true,
    maxPixels:1e13,
  });
  var aadisplay = ee.Image(0).updateMask(0).paint(vectors, '000000', 5);
  // mapMain.addLayer(aadisplay, {palette: 'FF0000'}, '暗像元',false);
   // //-------------------radiometric correction ， air correction---------------
  imm = imgmedianpro.divide(10000.0);
  //% 成像月份 
  var month = ee.String(img.get('system:index')).slice(4,6);
  //% 天卫星天顶角 B2 B3 B4 B8
  var vzaB2=ee.Number(img.get('MEAN_INCIDENCE_ZENITH_ANGLE_B2')),
      vzaB3=ee.Number(img.get('MEAN_INCIDENCE_ZENITH_ANGLE_B3')),
      vzaB4=ee.Number(img.get('MEAN_INCIDENCE_ZENITH_ANGLE_B4')),
      vzaB8=ee.Number(img.get('MEAN_INCIDENCE_ZENITH_ANGLE_B8'));
  var vza=ee.Number(ee.List([vzaB2,vzaB3,vzaB4,vzaB8]).reduce(ee.Reducer.mean())),
      vzar=vza.multiply((Math.PI/180)),
      vzarsec = ee.Number(1).divide(vzar.cos());
  //% sza-太阳天顶角   
  var sza=ee.Number(img.get('MEAN_SOLAR_ZENITH_ANGLE')),
      szar = sza.multiply((Math.PI/180)),
      szarcos=szar.cos(),
      szarsin=szar.sin(),
      szarsec = ee.Number(1).divide(szarcos);
  //% 39.68-入射天顶角
  var rsa=ee.Number(39.68),
      rsar=rsa.multiply((Math.PI/180)),
      rsarcos=rsar.cos();
   //% 哨兵2号， 2、3、4、8 波段 纳米 
  var wlB=ee.Array([492.3, 559, 665, 833]);
  //% TM band
  var wl0=ee.Array([485, 560, 660, 840, 1650, 2215, 10950]); 
  //% 实测清深水体反射率
  var rw1=ee.Array([0.023259977, 0.021259977, 0.02877713, 0.009774899, 0.000893186, 0, 0]);
  //% rw1 = rw1.*(1+1/cosd(sza))./(1+1/cosd(39.68)); % 成像时清深水体反射率
      rw1=rw1.multiply(ee.Number(1).add((ee.Number(1).divide(szarcos)))).divide(
          ee.Number(1).add(ee.Number(1).divide(rsarcos)));
  ////////////////////////////////////////////////////////////////////////////
  var wl = wlB;
  var k1 = rw1.get([1]).subtract(rw1.get([0])).divide(wl0.get([1]).subtract(wl0.get([0])));
  var b1 = rw1.get([0]).subtract(k1.multiply(wl0.get([0])));
  var line0 = wl.get([0]).multiply(k1).add(b1);
  var line1 = wl.get([1]).multiply(k1).add(b1);
  var k2 = rw1.get([3]).subtract(rw1.get([2])).divide(wl0.get([3]).subtract(wl0.get([2])));
  var b2 = rw1.get([2]).subtract(k2.multiply(wl0.get([2])));
  var line2 = wl.get([2]).multiply(k2).add(b2);
  var line3 = wl.get([3]).multiply(k2).add(b2);
  rw1=ee.Array([line0,line1,line2,line3]);
  print('rw1',rw1)
   //% 清洁水体像元光学厚度 
  var phf=ee.Number(0.75).multiply(ee.Number(1).add(szarcos.pow(ee.Number(2))));
      wl=wlB.divide(1000);
  var fixtemp1 = rw.subtract(rw1).gt(0);
  var fixtemp2 = rw.subtract(rw1).lte(0)
  //var ras =ee.Number(0.0088).multiply(tempwl.pow(ee.Number(-4.05))).multiply(phf).divide(ee.Number(4));
  var ras = wl.pow(-4.05).multiply(0.0088).multiply(phf).divide(ee.Number(4));
  var fix = rw.multiply(fixtemp1).add(ras.multiply(fixtemp2));
      rw = fix;
  ////////////////////////////////////////////////////////////////////////////
  var temp1 = rw.subtract(rw1),
      temp2 = ee.Array(ee.List.repeat(ee.Number(0.25).multiply(szarsec).multiply(phf),4)),
      temp3 = rw1.multiply(szarsec.add(vzarsec)),
      tau1 = temp1.divide(temp2.subtract(temp3));
  var tau = temp1.divide(temp2.subtract(temp3).add(rw1.multiply(szarsec.multiply(0.5)).multiply(
              tau1.multiply(vzarsec).multiply(-1).add(1))));
  //% 辐射校正
  var alphaa = ee.Number(-1).multiply((tau.get([0]).divide(tau.get([2]))).log()).divide(
              ((wl.get([0])).divide(wl.get([2]))).log());
  var betaa = tau.get([0]).divide(wl.get([0]).pow(ee.Number(-1).multiply(alphaa)));
  tau = (wl.pow(ee.Array(ee.List.repeat(ee.Number(-1).multiply(alphaa),4)))).multiply(betaa);
  var biass =((tau.multiply(ee.Number(-1).multiply(szarsec.add(vzarsec)))).exp()).multiply(rw1);
      biass = biass.add(
              rw1.multiply(0.5).multiply(szarsec).multiply(tau).multiply(
                (tau.multiply(-1).multiply(vzarsec)).exp())
              );
      biass = biass.add(tau.multiply(szarsec).multiply(phf).divide(4)).subtract(rw);
  print('biass',biass)
  var blueRC=imm.select('B2').add(biass.get([0])),
      greenRC=imm.select('B3').add(biass.get([1])),
      redRC=imm.select('B4').add(biass.get([2])),
      nirRC=imm.select('B8').add(biass.get([3]));
////////////////////////////////////////////////////////////////////////////
  //% 大气校正
  var temp4 = (tau.multiply(szarsec.add(vzarsec)).multiply(-1)).exp();
      temp4 = temp4.add(tau.multiply(szarsec).multiply(0.5).multiply(
                (tau.multiply(vzarsec).multiply(-1)).exp())
              );
  var blueRCAC = (blueRC.subtract(temp2.get([0]).multiply(tau.get([0])).divide(
                  temp4.get([0])
                  ))).rename('B2');
  var greenRCAC = (greenRC.subtract(temp2.get([0]).multiply(tau.get([1])).divide(
                  temp4.get([1])
                  ))).rename('B3');
  var redRCAC = (redRC.subtract(temp2.get([0]).multiply(tau.get([2])).divide(
                  temp4.get([2])
                  ))).rename('B4');
  var nirRCAC = (nirRC.subtract(temp2.get([0]).multiply(tau.get([3])).divide(
                  temp4.get([3])
                  ))).rename('B8');
  var immc = ee.Image([blueRCAC,greenRCAC,redRCAC,nirRCAC]);
      immc = immc.clamp(ee.Number(0),ee.Number(1));
  print('immc',immc)
  // mapMain.addLayer(immc,{},"immc");
  wwater = immc ;
    // //-------------------water and land---------------
  // var wmask1temp = immc.expression(
  //                 '1.0 * (b3 - b8) / (b3 + b8)',
  //                 {
  //                   b3:immc.select('B3'),
  //                   b8:immc.select('B8'),
  //                 });
  // var wmask1 = wmask1temp.gt(0);
  // var wmask2 = immc.select('B8').lt(0.1);
  // var wmask3 = wmask1.and(wmask2);
  // mapMain.addLayer(wmask3,{},"immc water",false);
  immc = immc.updateMask(mfwmask3);
  //%% 水质反演
      //% 污染物散射系数比
  var uk = ee.Number(100.0);
      //% 悬沙吸收系数比的倒数
  var sk = ee.Number(20.0);
      //% 水折射率:
  var nw=ee.Number(1.333);
      //% 水\黄色物质\有机污染物\悬沙和叶绿素上行散射比:
  var kw=ee.Number(0.5),
      ky=ee.Number(0.5),
      ku=ee.Number(0.5),
      ks=ee.Number(1.0),
      kc=ee.Number(1.0);
      //% 水\黄色物质\有机污染物\悬沙和叶绿素散射入瞳分量比:
  var qw=ee.Number(1/4),
      qy=ee.Number(1/4),
      qu=ee.Number(1/4),
      qs=ee.Number(1/2),
      qc=ee.Number(1/2);
      //% 单位质量黄色物质\有机污染物瑞利散射波长指数与混浊度系数
  var ary=ee.Number(4.32),
      bry=ee.Number(0.002023129);
  //% 黄色物质平均浓度Dy
  var Dy = ee.Number(ee.Algorithms.If(month.equals(ee.String('11')),
            ee.Number(2.54),
            ee.Number(1.356008978)
            ));
  //% 纯水散射系数和纯水、黄色物质与有机污染物吸收系数
  var bw = ee.Array([0.003346667, 0.001829412, 0.000869231, 0.000348191]),
      aw = ee.Array([0.023933333, 0.095058824, 0.397692308, 3.424706453]),
      ay = ee.Array([0.5574, 0.197411765, 0.047538462, 0.007829253]),
      au = ee.Array([0.14, 0.155949192, 0.085814616, 0.067345041]);
  //% 土壤、植被土壤反射率
  var rs = ee.Array([0.100526901, 0.150289321, 0.198228836, 0.249020255]),
      rc = ee.Array([0.014847887, 0.026177778, 0.016055738, 0.352893617]);
  //% 黄色物质、有机污染物、悬浮泥沙、叶绿素散射系数及悬浮泥沙、叶绿素吸收系数计算：
  var by = wl.pow(ary.multiply(-1)).multiply(bry),
      bu = by.multiply(uk),
      bs = rs,
      bc = rc,
      as = (bs.multiply(-1).add(1)).divide(sk);
  bc = ee.Array([0.014847887, 0.026177778, 0.016055738, 0.39]);
  var ac = bc.multiply(-1).add(1).divide(2);
  ac = ee.Array((ac.toList()).splice(1,1,[0.7]));
  au = ee.Array([0.14, 0.46, 0.039, 0.067345041]);
  bs = ee.Array([0.100526901, 0.08, 0.21, 0.249020255]),
  as = ee.Array((as.toList()).splice(1,1,[15]));
  as = ee.Array((as.toList()).splice(2,1,[0.1]));
  bc = ee.Array([0.014847887, 0.05, 0.016055738, 0.39]);
  ac = ee.Array((ac.toList()).splice(1,1,[0.6]));
  //% 水下入射角
  var ref_ang =  (szarsin.divide(nw)).asin(); //弧度 
  var u = (ee.Number(1.0).divide(ref_ang.cos())).add(1);
  //% 散射相函数
  var pw = (ref_ang.cos().pow(2).add(1)).multiply(3).divide(4);
  var py = pw;
  var pu = pw;
  var fw = bw.multiply(qw).multiply(pw).add(by.multiply(qy).multiply(Dy).multiply(py)),
      ew = bw.multiply(kw).add(aw).add((by.multiply(ky).add(ay)).multiply(Dy));
  var mA1 = immc.select('B4').expression(
                '(imac * u) * (ks * bs + as) - qs * bs',
                {
                  imac:immc.select('B4') , u:u ,
                  ks:ks , bs:bs.get([2]) , as:as.get([2]) ,
                  qs:qs 
                });
  var mA2 = immc.select('B8').expression(
                  '(imac * u) * (ks * bs + as) - qs * bs',
                  {
                    imac:immc.select('B8') , u:u ,
                    ks:ks , bs:bs.get([3]) , as:as.get([3]) ,
                    qs:qs 
                  });
  var mB1 = immc.select('B4').expression(
                  '(imac * u) * (kc * bc + ac) - qc * bc',
                  {
                    imac:immc.select('B4') , u:u ,
                    kc:kc , bc:bc.get([2]) , ac:ac.get([2]) ,
                    qc:qc
                  });
  var mB2 = immc.select('B8').expression(
                  '(imac * u) * (kc * bc + ac) - qc * bc',
                  {
                    imac:immc.select('B8') , u:u ,
                    kc:kc , bc:bc.get([3]) , ac:ac.get([3]) ,
                    qc:qc
                  });
  var mC1 = immc.select('B4').expression(
                  'imac * (- 1) * u * ew + fw',
                  {
                    imac:immc.select('B4') , u:u , ew:ew.get([2]) ,
                    fw:fw.get([2])
                  });
  var mC2 = immc.select('B8').expression(
                  'imac * (- 1) * u * ew + fw',
                  {
                    imac:immc.select('B8') , u:u , ew:ew.get([3]) ,
                    fw:fw.get([3])
                  });
  var Ds = (mB1.multiply(mC2).subtract(mB2.multiply(mC1))).divide(
            (mB1.multiply(mA2)).subtract(mB2.multiply(mA1)));
  var Dc = ((mC2.subtract(mA2.multiply(Ds))).divide(mB2)).rename('DC');
  var fw2 = Dc.multiply(bc.get([1])).multiply(qc).add(fw.get([1])),
      fw3 = Dc.multiply(bc.get([2])).multiply(qc).add(fw.get([2]));
  var ew2 = Dc.multiply(kc.multiply(bc.get([1])).add(ac.get([1]))).add(ew.get([1])),
      ew3 = Dc.multiply(kc.multiply(bc.get([2])).add(ac.get([2]))).add(ew.get([2]));
  mA1 = immc.expression(
              '(immc * u) * (ku * bu + au) - (qu * bu * pu)',
              {
                immc:immc.select('B3') , u:u,
                ku:ku , bu:bu.get([1]) , au:au.get([1]),
                qu:qu , pu:pu
              });
  mA2 = immc.expression(
              '(immc * u) * (ku * bu + au) - (qu * bu * pu)',
              {
                immc:immc.select('B4') , u:u,
                ku:ku , bu:bu.get([2]) , au:au.get([2]),
                qu:qu , pu:pu
              });
  mB1 = immc.expression(
              '(immc * u) * (ks * bs + as) - (qs * bs )',
              {
                immc:immc.select('B3') , u:u,
                ks:ks , bs:bs.get([1]) , as:as.get([1]),
                qs:qs 
              });
  mB2 = immc.expression(
              '(immc * u) * (ks * bs + as) - (qs * bs )',
              {
                immc:immc.select('B4') , u:u,
                ks:ks , bs:bs.get([2]) , as:as.get([2]),
                qs:qs 
              });
  mC1 = immc.expression(
                'immc * u * ew * (- 1) + fw',
                {
                  immc:immc.select('B3') , u:u , ew:ew2,
                  fw:fw2
                });
  mC2 = immc.expression(
                'immc * u * ew * (- 1) + fw',
                {
                  immc:immc.select('B4') , u:u , ew:ew3,
                  fw:fw3
                }); 
  var Ds1 = ((mB1.multiply(mC2).subtract(mB2.multiply(mC1))).divide(
              mB1.multiply(mA2).subtract(mB2.multiply(mA1))
              )).rename('DS');
  var Du = ((mC2.subtract(mA2.multiply(Ds1))).divide(mB2)).rename('DU');
// detectionTimes
  Dc = NormalizStretch(Dc,2).updateMask(mfwmask3);
  Ds1 = NormalizStretch(Ds1,2).updateMask(mfwmask3);
  Du = NormalizStretch(Du,2).updateMask(mfwmask3);
  //   Dc = Dc
  // Ds1 = Ds1
  // Du = Du
  immc = immc.addBands(Dc).addBands(Ds1).addBands(Du);
  // message
  labelMessage.setValue("运行成功！");
  return immc.set({time: ee.String(img.get('system:index')).slice(0,8)})
            //.addBands(img.metadata('system:time_start').divide(1e10))
            .copyProperties(img, ['system:time_start']);
  // return immc
}
// Function for displaying stretched image based on percentile values.
var AddLayerPercentStretch = function(img, percent,layername)
{
  var lower_percentile = ee.Number(100).subtract(percent).divide(2);
  var upper_percentile = ee.Number(100).subtract(lower_percentile);
  var stats = img.select(img.select(0).bandNames(),['value']).reduceRegion({
    reducer: ee.Reducer.percentile({percentiles: [lower_percentile, upper_percentile]}).setOutputs(['lower', 'upper']),
    scale: 10, 
    maxPixels:1e13,
    geometry:imgcolselectGeometry,
  });
  var vis_params = ee.Dictionary({
      'min': ee.Number(stats.get('value_lower')),
      'max': ee.Number(stats.get('value_upper')),
      'palette':["#007eff","00a1ff","00e7ff","00ffd0","9dff00","efff02","ffe000","ffb100","ff6a00","#ff3b00"],
      //'gamma': ee.Number(0.8),
    });
  mapMain.addLayer({
    eeObject: img,
    visParams: vis_params.getInfo(),
    name: layername,
    shown: false,
  });
};
// Function for displaying stretched image based on percentile values.
var AddLayerPercentStretch2 = function(img,layername)
{
  // var vis_params = ee.Dictionary({
  //     'min': 0,
  //     'max': 1,
  //     'palette':["#007eff","00a1ff","00e7ff","00ffd0","9dff00","efff02","ffe000","ffb100","ff6a00","#ff3b00"],
  //     //'gamma': ee.Number(0.8),
  //   });
    var vis_params2 = ({
      'min': 0,
      'max': 1,
      'palette':["#007eff","00a1ff","00e7ff","00ffd0","9dff00","efff02","ffe000","ffb100","ff6a00","#ff3b00"],
    });
  mapMain.addLayer({
    eeObject: img,
    visParams: vis_params2,
    // visParams: vis_params.getInfo(),
    name: layername,
    shown: false,
  });
};
// Function for displaying stretched image based on percentile values.
var AddLayerPercentStretchMean = function(img, percent,layername,low,up)
{
  // print('img',img)
  // var tempimg = img.rename(['value']);
  // print('tempimg',tempimg)
  var lower_percentile = ee.Number(percent);
  var upper_percentile = ee.Number(100).subtract(percent);
  var stats = img.reduceRegion({
    reducer: ee.Reducer.percentile({percentiles: [lower_percentile, upper_percentile]}).setOutputs(['lower', 'upper']),
    scale: imgscale, 
    maxPixels:1e13,
    geometry:imgcolselectGeometry,
  });
  // print('stats',stats)
  var min = ee.Number(stats.get(low));
  var max = ee.Number(stats.get(up));
  var minmax = ee.List([min,max]);
  var mmlist = minmax.getInfo();
  // aaaaa
  var vis_params = ({
      'min': mmlist[0],
      'max': mmlist[1],
      'palette':["#007eff","00a1ff","00e7ff","00ffd0","9dff00","efff02","ffe000","ffb100","ff6a00","#ff3b00"],
    });
  mapMain.addLayer({
    eeObject: img,
    visParams: vis_params,
    name: layername,
    shown: false,
  });
};
// Function for displaying stretched image based on percentile values.
var AddLayerStdStretchMean = function(img, dev,layername)
{
  var stats = img.rename(['value']).reduceRegion({
    reducer: ee.Reducer.mean().combine({reducer2:ee.Reducer.stdDev(), sharedInputs:true})
                              .setOutputs(['mean', 'stddev']), 
    geometry: imgcolselectGeometry,
    scale: 20, 
    maxPixels:1e13
  });
  var mean = ee.Number(stats.get('value_mean'));
  var std = ee.Number(stats.get('value_stddev'));
  var max = mean.add(std.multiply(ee.Number(dev)));
  var min = mean.subtract(std.multiply(ee.Number(dev)));
  // min = min.multiply(min.gte(0));
  // colorbarMax.setValue(max.format('%.2f').getInfo());
  var minmax = ee.List([min,max]);
  var mmlist = minmax.getInfo();
  // aaaaa
  var vis_params = ({
      'min': mmlist[0],
      'max': mmlist[1],
      'palette':["#007eff","00a1ff","00e7ff","00ffd0","9dff00","efff02","ffe000","ffb100","ff6a00","#ff3b00"],
    });
  mapMain.addLayer({
    eeObject: img,
    visParams: vis_params,
    name: layername,
    shown: false,
  });
};
// Function for displaying stretched image based on percentile values.
var AddLayerPercentStretchSTD = function(img, percent,layername)
{
  var lower_percentile = ee.Number(100).subtract(percent).divide(2);
  var upper_percentile = ee.Number(100).subtract(lower_percentile);
  var stats = img.select(img.select(0).bandNames(),['value']).reduceRegion({
    reducer: ee.Reducer.percentile({percentiles: [lower_percentile, upper_percentile]}).setOutputs(['lower', 'upper']),
    scale:10, 
    maxPixels:1e13,
    geometry:imgcolselectGeometry,
  });
  var vis_params = ee.Dictionary({
      'min': ee.Number(stats.get('value_lower')),
      'max': ee.Number(stats.get('value_upper')),
      'palette':["#007eff","00a1ff","00e7ff","00ffd0","9dff00","efff02","ffe000","ffb100","ff6a00","#ff3b00"],
    });
  mapMain.addLayer({
    eeObject: img,
    visParams: vis_params.getInfo(),
    name: layername,
    shown: false,
  });
};
function searchImage(roi,image1_start_time, image1_end_time)
{
    // clear all the existing rois and layers
    clearRoi(); 
    clearLayers();
  var image1col = ee.ImageCollection('COPERNICUS/S2_HARMONIZED')//COPERNICUS/S2_HARMONIZED   COPERNICUS/S2
                .filterBounds(roi)
                .filterDate(image1_start_time, image1_end_time)
                // .filter(ee.Filter.calendarRange(specificmonth1, specificmonth2, 'month'))
                // .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
                .sort('CLOUDY_PIXEL_PERCENTAGE', false)
                //.first();
  if (image1col.size().getInfo()===0) 
  {testLabel.setValue("没有满足条件的遥感影像！")}
  else{
    testLabel.setValue("");
    imgcolAA = image1col;
    // print(imgcolAA);
    mapMain.centerObject(imgcolAA.geometry(),11);
    var time_start = imgcolAA
      .reduceColumns(ee.Reducer.toList(), ['system:time_start'])
      .get('list');
  time_start.evaluate(
      function (time_start) {
        time_start.forEach(
          function (date) {
            // var images = imgcolAA.filterMetadata('system:time_start', 'equals', date);
            var images = imgcolAA.filter(ee.Filter.eq('system:time_start',date)).first();
            var year = new Date(date).getFullYear();
            var month = new Date(date).getMonth()+1;
            var strDate = new Date(date).getDate();
            var currentdate = year + '-' + month + '-' + strDate
            // if (month >= 1 && month <= 9) {
            //     month = "0" + month;
            // }
            // if (strDate >= 0 && strDate <= 9) {
            //     strDate = "0" + strDate;
            // }
            mapMain.addLayer(images,vis1, String(currentdate),false);
          });
      }
  );
  }
}
// //---------------------------------------------------------------------------------------------------------------------
// //---------------------------legend---------------------------------------------
// //---------------------------------------------------------------------------------------------------------------------
var colortext1 = ui.Label({
  value:"优",
  style:{padding: '8px',margin: '0 0 0 40px'}
});
var color1 = ui.Label({
  value:" ",
  style:{
    backgroundColor: "0008ff",
    // Use padding to give the box height and width.
    padding: '8px',
    margin: '5px 0 0 0',
  }
});
var color2 = ui.Label({
  value:" ",
  style:{backgroundColor: "00a1ff", padding: '8px',margin: '5px 0 0 0'}
});
var color3 = ui.Label({
  value:" ",
  style:{backgroundColor: "00e7ff",padding: '8px',margin: '5px 0 0 0'}
});
var color4 = ui.Label({
  value:" ",
  style:{backgroundColor: "00ffd0",padding: '8px',margin: '5px 0 0 0'}
});
var color5 = ui.Label({
  value:" ",
  style:{backgroundColor: "9dff00",padding: '8px',margin: '5px 0 0 0'}
});
var color6 = ui.Label({
  value:" ",
  style:{backgroundColor: "efff02",padding: '8px',margin: '5px 0 0 0'}
});
var color7 = ui.Label({
  value:" ",
  style:{backgroundColor: "ffe000",padding: '8px',margin: '5px 0 0 0'}
});
var color8 = ui.Label({
  value:" ",
  style:{backgroundColor: "ffb100",padding: '8px',margin: '5px 0 0 0'}
});
var color9 = ui.Label({
  value:" ",
  style:{backgroundColor: "ff6a00",padding: '8px',margin: '5px 0 0 0'}
});
var color10 = ui.Label({
  value:" ",
  style:{backgroundColor: "ff0000",padding: '8px',margin: '5px 0 0 0'}
});
var colortext2 = ui.Label({
  value:"差",
  style:{
    // backgroundColor: "0008ff",
    // // Use padding to give the box height and width.
    padding: '8px',
    margin: '0'
  }
});
var panelLegend = ui.Panel({layout: ui.Panel.Layout.flow("horizontal")});
panelLegend.add(colortext1);
panelLegend.add(color1);
panelLegend.add(color2);
panelLegend.add(color3);
panelLegend.add(color4);
panelLegend.add(color5);
panelLegend.add(color6);
panelLegend.add(color7);
panelLegend.add(color8);
panelLegend.add(color9);
panelLegend.add(color10);
panelLegend.add(colortext2);
// //---------------------------------------------------------------------------------------------------------------------
// //---------------------------System message---------------------------------------------
// //---------------------------------------------------------------------------------------------------------------------
// panel title
var labelMessagetitle = ui.Label({
  value: "系统提示",
  style:{
    fontWeight: "bold",
    margin: '10px 0 0 10px',
    textAlign: "left",
    color: "#b10d02",
  },
});
// message box
var labelMessage = ui.Label({
  value: '点击“开始检测”后，请耐心等待系统加载结果!',
    style:{
    margin: '10px 0 0 10px',
    textAlign: "left",
    color: "#000000",
  },
});
panelMain1.style().set({width: '350px', position: "bottom-right"});
panelMain.add(panelLegend);
panelMain.add(labelMessagetitle);
panelMain.add(labelMessage);