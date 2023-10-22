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
          [113.43546354656132, 23.08992188445835]]], null, false);
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
mapMain.setZoom(8);
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
var panelMain1 = ui.Panel();
panelMain.add(panelMain1);
// system title
var titleLabel = ui.Label({
  value: "水质遥感检测系统",
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
  {label:"2000", value:"2000"}, 
  {label:"2001", value:"2001"}, 
  {label:"2002", value:"2002"}, 
  {label:"2003", value:"2003"}, 
  {label:"2004", value:"2004"}, 
  {label:"2005", value:"2005"}, 
  {label:"2006", value:"2006"}, 
  {label:"2007", value:"2007"}, 
  {label:"2008", value:"2008"}, 
  {label:"2009", value:"2009"}, 
  {label:"2010", value:"2010"}, 
  {label:"2011", value:"2011"}, 
  {label:"2012", value:"2012"}, 
  {label:"2013", value:"2013"}, 
  {label:"2014", value:"2014"},
  {label:"2015", value:"2015"},
  {label:"2016", value:"2016"},
  {label:"2017", value:"2017"},
  {label:"2018", value:"2018"},
  {label:"2019", value:"2019"},
  {label:"2020", value:"2020"},
  {label:"2021", value:"2021"},
  {label:"2022", value:"2022"},
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
  value: "从：",
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
  value: "2019",
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
    margin: '10px 5px 0 10px',
    textAlign: "left",
    color: "#000000",
  },
  value: "2019",
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
// check box for sigle image
var checkboxSingle = ui.Button({
  label: '单景',
    style:{
    height: "30px",
    margin: '10px 10px 0 30px',
    textAlign: "left",
    color: "#000000",
  }
});
// check box for time series
var checkboxTimes = ui.Button({
  label: '多时序',
    style:{
    height: "30px",
    margin: '10px 10px 0 10px',
    textAlign: "left",
    color: "#000000",
  }
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
// panelDraw.add(checkboxSingle);
// panelDraw.add(checkboxTimes);
// panelDraw.add(buttonSearch);
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
    if (polygonNumber === 0) {labelMessage.setValue("请选择区域！")}
    else{
      var roi = mapMain.drawingTools().layers().get(0).toGeometry();
      // image acquistion time  
      var image1_start_time = selectImage1StartYear.getValue()+"-"+selectImage1StartMonth.getValue()+"-"+selectImage1StartDate.getValue();
      var image1_end_time = selectImage1EndYear.getValue()+"-"+selectImage1EndMonth.getValue()+"-"+selectImage1EndDate.getValue();
      if (image1_start_time >= image1_end_time) {labelMessage.setValue("影像获取结束时间需晚于开始时间！")}
      else {
        // lci threshold
        //var lci_t = sliderThreshold.getValue();
        // run detection
        searchImage(roi, 
          image1_start_time,
          image1_end_time)
      }
    }
  },
  disabled:false,
});
// load Image button 
var loadImageButton = ui.Button({
  label:"加载影像",
  style:{
    height: "30px",
    margin: '10px 0 0 50px',
    textAlign: "left",
    color: "#000000"
  },
  onClick:function(){
    var selectid = selector.getValue();
    //print(selectid)
    var simg = ee.Image(selectid);
    mapMain.addLayer(simg,vis1,selectid);
    imgSelected = simg;
    mapMain.centerObject(imgSelected.geometry(),10);
  }
});
// run button single image
var runButton2 = ui.Button({
  label:"开始检测",
  style:{
    height: "30px",
    margin: '10px 0 0 50px',
    textAlign: "left",
    color: "#b10d02"
  },
  onClick:function(){
    var maplist = mapMain.layers();
    // print('maplist',maplist);
    // var aa = maplist.get(1).get('name');
    // print(aa,typeof(aa))
    var shownid = getShownLayer(jsid,maplist);
    // print(shownid);
    // print(shownid[1],typeof(shownid[1]));
    imgcolselect = ee.ImageCollection(shownid.map(function (idid)
    {
      var idimg = ee.Image(idid);
      return idimg;
    }
    ));
    imgcolselectGeometry = imgcolselect.geometry()
    print('imgcolselect',imgcolselect)
    clearRoi(); 
    clearLayers();
        var selectid = selector.getValue();
    //print(selectid)
    imgSelected = ee.Image(selectid);
    correction(imgSelected);
  }
});
var labelselector = ui.Label({
  value: '  ',
  style:{
    height: '5px',
    margin: '0 0 0 10px',
    textAlign: "left",
    color: "#000000",
    shown:false
  },
});
// dc button  chla
var singledcButton = ui.Button({
  label:"dc叶绿素a",
  style:{
    height: "30px",
    margin: '10px 0 0 10px',
    textAlign: "left",
    color: "#000000"
  },
  onClick:function(){
    clearLayers();
    mapMain.addLayer(imgSelected,vis1,'真彩色影像');
    mapMain.centerObject(imgSelected.geometry(),11);
    singleDetection(imgDC,'dc叶绿素a');
    timeDetection(imgcolDC);
    mapMain.addLayer(imgcolDC,{},'imgcolDC',false);
  }
});
// ds button  TSM
var singledsButton = ui.Button({
  label:"ds浑浊度",
  style:{
    height: "30px",
    margin: '10px 0 0 20px',
    textAlign: "left",
    color: "#000000"
  },
  onClick:function(){
    clearLayers();
    mapMain.addLayer(imgSelected,vis1,'真彩色影像');
    mapMain.centerObject(imgSelected.geometry(),11);
    singleDetection(imgDS,'ds浑浊度');
    timeDetection(imgcolDS);
    mapMain.addLayer(imgcolDS,{},'imgcolDS',false);
  }
});
// du button  COD
var singleduButton = ui.Button({
  label:"du化学需氧量",
  style:{
    height: "30px",
    margin: '10px 0 0 20px',
    textAlign: "left",
    color: "#000000"
  },
  onClick:function(){
    clearLayers();
    mapMain.addLayer(imgSelected,vis1,'真彩色影像');
    mapMain.centerObject(imgSelected.geometry(),11);
    singleDetection(imgDU,'du化学需氧量');
    timeDetection(imgcolDU);
    mapMain.addLayer(imgcolDU,{},'imgcolDU',false);
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
//panelSingle1.add(loadImageButton);
panelSingle1.add(runButton2);
var panelSingle2 = ui.Panel({layout: ui.Panel.Layout.flow("horizontal")});
panelSingle2.add(labelselector);
var panelSingle3 = ui.Panel({layout: ui.Panel.Layout.flow("horizontal")});
panelSingle3.add(singledcButton);
panelSingle3.add(singledsButton);
panelSingle3.add(singleduButton);
var panelSingle = ui.Panel();
panelSingle.add(panelSingle1);
panelSingle.add(panelSingle2);
panelSingle.add(panelSingle3);
panelMain.add(panelSingle);
panelMain.add(labelBar3);
}
// //---------------------------------------------------------------------------------------------------------------------
// //---------------------------run------------------------------------------------------------
// //---------------------------------------------------------------------------------------------------------------------
{
// run button 
var runButton = ui.Button({
  label:"开始监测",
  style:{
    height: "30px",
    margin: '10px 0 0 10px',
    textAlign: "left",
    color: "#b10d02"
  },
  onClick:function(){
    // roi 
    if (polygonNumber === 0) {labelMessage.setValue("请选择区域！")}
    else{
      var roi = mapMain.drawingTools().layers().get(0).toGeometry();
      // image acquistion time  
      var image1_start_time = selectImage1StartYear.getValue()+"-"+selectImage1StartMonth.getValue()+"-"+selectImage1StartDate.getValue();
      var image1_end_time = selectImage1EndYear.getValue()+"-"+selectImage1EndMonth.getValue()+"-"+selectImage1EndDate.getValue();
      if (image1_start_time >= image1_end_time) {labelMessage.setValue("影像获取结束时间需晚于开始时间！")}
      else {
        // lci threshold
        //var lci_t = sliderThreshold.getValue();
        // run detection
        stdDetection(roi, 
          image1_start_time,
          image1_end_time)
      }
    }
  }
});
// set a point
var pointButton = ui.Button({
  label:"选取一个点",
  style:{
    height: "30px",
    margin: '10px 0 0 10px',
    textAlign: "left",
    color: "#000000"
  },
  onClick:function(){
    clearRoi();
    mapMain.drawingTools().setShape('point');
    mapMain.drawingTools().draw();
    // mapMain.style().set('cursor', 'crosshair');
    // mapMain.onClick(generateChart2);
  }
});
// set a chart
var chartButton = ui.Button({
  label:"读取",
  style:{
    height: "30px",
    margin: '10px 0 0 10px',
    textAlign: "left",
    color: "#000000"
  },
  onClick:function(){
    //clearLayers();
    //generateChart2(roipoint,imgcolDC)
    roipoint = mapMain.drawingTools().layers().get(0).toGeometry();
    // print(mapMain.drawingTools().layers())
    // print(roipoint);
    generateChart2(roipoint,imgcolChart)
  }
})
var labelchart = ui.Label({
  value: '  ',
  style:{
    height: '5px',
    margin: '0 0 0 10px',
    textAlign: "left",
    color: "#000000",
    shown:false
  },
});
// dc button  chla
var dcButton = ui.Button({
  label:"dc叶绿素a",
  style:{
    height: "30px",
    margin: '10px 0 0 10px',
    textAlign: "left",
    color: "#000000"
  },
  onClick:function(){
    clearLayers();
    //timeDetection2(imgDCstd,imgDCmean,imgcolDC);
    timeDetection(imgcolDC);
  }
});
// ds button  TSM
var dsButton = ui.Button({
  label:"ds浑浊度",
  style:{
    height: "30px",
    margin: '10px 0 0 20px',
    textAlign: "left",
    color: "#000000"
  },
  onClick:function(){
    clearLayers();
    //timeDetection2(imgDSstd,imgDSmean,imgcolDS);
    timeDetection(imgcolDS);
  }
});
// du button  COD
var duButton = ui.Button({
  label:"du化学需氧量",
  style:{
    height: "30px",
    margin: '10px 0 0 20px',
    textAlign: "left",
    color: "#000000"
  },
  onClick:function(){
    clearLayers();
    //timeDetection2(imgDUstd,imgDUmean,imgcolDU);
    timeDetection(imgcolDU);
  }
});
var labelBar4 = ui.Label({
  value: '______________________________________________',
  style:{
    margin: '0 0 0 10px',
    textAlign: "left",
    color: "#000000",
  },
});
var panelTime1 = ui.Panel({layout: ui.Panel.Layout.flow("horizontal")});
//panelTime1.add(runButton);
panelTime1.add(pointButton);
panelTime1.add(chartButton);
var panelTime2 = ui.Panel({layout: ui.Panel.Layout.flow("horizontal")});
//panelTime2.add(labelchart);
panelTime2.add(dcButton);
panelTime2.add(dsButton);
panelTime2.add(duButton);
var panelTime = ui.Panel();
panelTime.add(panelTime1);
//panelTime.add(panelTime2);
panelTime.add(labelchart)
panelMain.add(panelTime);
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
// get shown layers 
var getShownLayersButton = ui.Button({
  label:"确定图层",
  style:{
    height: "30px",
    margin: '10px 0 0 10px',
    textAlign: "left",
    color: "#000000"
  },
  onClick:function(){
    var alllayer = selector.items();
    print(alllayer.get(1),typeof(alllayer.get(1)));
    var maplist = mapMain.layers();
    print('maplist',maplist);
    var aa = maplist.get(1).get('name');
    print(aa,typeof(aa))
    var shownid = getShownLayer(jsid,maplist);
    print(shownid);
    print(shownid[1],typeof(shownid[1]));
    // maplist.map(function (aclayer)
    //   {
    //     if(aclayer.getShown() === false)
    //     {
    //       return
    //     }
    //   }
    // )
    // var maplist = mapMain.layers();
    // print('idlist',idlist,'maplist',maplist)
    // //idlistshown = getShownLayer(idlist,maplist)
    // var idlistshown = ee.List(maplist.map(function (acitem)
    // {
    //   return ee.Algorithms.If(acitem.get('shown'),
    //   acitem.get('name'),'a');
    // }
    // ));
    // print('idlistshown',idlistshown);
    // idlistshown.remove('a');
    // var colll = ee.ImageCollection(idlistshown.map(function (shownname)
    // {
    //   return ee.Image(shownname);
    // }));
    // print(colll)
  }
});
panelMain.add(clearButton);
panelMain.add(getShownLayersButton);
// //---------------------------------------------------------------------------------------------------------------------
// //---------------------------chart------------------------------------------------------------
// //---------------------------------------------------------------------------------------------------------------------
var panelChart = ui.Panel();
var roipoint;
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
// Add placeholders for the chart and legend.
var labelChart =ui.Label('[Chart]');
var labelLegend =ui.Label('[Legend]');
// // set a point
// var pointButton = ui.Button({
//   label:"选取一个点",
//   style:{
//     height: "30px",
//     margin: '10px 0 0 10px',
//     textAlign: "left",
//     color: "#000000"
//   },
//   onClick:function(){
//     clearRoi();
//     mapMain.drawingTools().setShape('point');
//     mapMain.drawingTools().draw();
//     // mapMain.style().set('cursor', 'crosshair');
//     // mapMain.onClick(generateChart2);
//   }
// });
// // set a chart
// var chartButton = ui.Button({
//   label:"读取",
//   style:{
//     height: "30px",
//     margin: '10px 0 0 10px',
//     textAlign: "left",
//     color: "#000000"
//   },
//   onClick:function(){
//     //generateChart2(roipoint,imgcolDC)
//     roipoint = mapMain.drawingTools().layers().get(0).toGeometry();
//     // print(mapMain.drawingTools().layers())
//     // print(roipoint);
//     generateChart2(roipoint,imgcolDC)
//   }
// })
var generateChart2 = function (ppoint,imgcol) {
  // mapMain.style().set('cursor', 'hand')
  // Update the lon/lat panel with values from the click event.
  // lon.setValue('lon: ' + coords.lon.toFixed(2));
  // lat.setValue('lat: ' + coords.lat.toFixed(2));
  // Add a dot for the point clicked on.
  // var point = ee.Geometry.Point(coords.lon, coords.lat);
  //var dot = ui.Map.Layer(point, {color: '000000'}, 'clicked location');
  // Add the dot as the second layer, so it shows up on top of the composite.
  //mapPanel.layers().set(1, dot);
  // mapMain.add(dot,{color: '000000'},'dot');
  // Make a chart from the time series.
  //var collectionNO2Chart = ui.Chart.image.series(imgcol, ppoint, ee.Reducer.mean(), 10,'time');
  var collectionNO2Chart = ui.Chart.image.series(
    {imageCollection:imgcol, 
    region:ppoint, 
    xProperty:'time',}
    );
  // Customize the chart.
   collectionNO2Chart.setOptions({
      title: 'time series',
      vAxis: {title: ' ',viewWindow: {min: 0.0, max: 1.0}},
      hAxis: {title: 'Date', format: 'MM-yy', gridlines: {count: 7}},
      // trendlines: {0: {
      //   color: 'CC0000',
      //   lineWidth: 3,
      // }},
      series: {
        0: {
          color: 'blue',
          lineWidth: 0,
          pointsVisible: true,
          pointSize: 5,
          //pointShape: 'square',
        },
      },
      legend: {position: 'right'},
  //     trendlines: {
  //   0: {  // add a trend line to the 1st series
  //     type: 'linear',  // or 'polynomial', 'exponential'
  //     color: 'green',
  //     lineWidth: 3,
  //     opacity: 0.8,
  //     visibleInLegend: true,
  //   }
  // }
    });
  panelTime.widgets().set(1, collectionNO2Chart);
  //panelMain.insert(4, collectionNO2Chart);
};
// Generates a new time series chart of collectionNO2 for the given coordinates.
var generateChart = function (coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2));
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  // Add a dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: '000000'}, 'clicked location');
  // Add the dot as the second layer, so it shows up on top of the composite.
  mapPanel.layers().set(1, dot);
  mapPanel.remove(dot)
  // Make a chart from the time series.
  var collectionNO2Chart = ui.Chart.image.series(collectionNO2, point, ee.Reducer.mean(), 500);
  // Customize the chart.
 collectionNO2Chart.setOptions({
    title: 'dc: time series',
    vAxis: {title: 'dc'},
    hAxis: {title: 'Date', format: 'MM-yy', gridlines: {count: 7}},
    series: {
      0: {
        color: 'blue',
        lineWidth: 0,
        pointsVisible: true,
        pointSize: 2,
      },
    },
    legend: {position: 'right'},
  });
  // Add the chart at a fixed position, so that new charts overwrite older ones.
  inspectorPanel.widgets().set(3, collectionNO2Chart);
};
// panelChart.add(lon);
// panelChart.add(lat);
// panelChart.add(labelChart);
// panelChart.add(labelLegend);
// panelChart.add(pointButton);
// panelChart.add(chartButton);
// panelMain.add(panelChart);
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
var imgcolselect;
//setttttttttttt
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
function Normaliz(img){
  var norstats = (img.rename('value')).reduceRegion({
    reducer:ee.Reducer.minMax(),
    scale: 10,
    maxPixels: 1e12,
  });
  var min = ee.Number(norstats.get('value_min'));
  var max = ee.Number(norstats.get('value_max'));
  var norimg = (img.subtract(min).divide(max.subtract(min))).toFloat();
  return norimg;
}
function correction(img)
{
  // //-------------------single image---------------
  mapMain.centerObject(img.geometry(),10);
  mapMain.addLayer(img,vis1,'真彩色影像');
  // //-------------------time images---------------
  // //-------------------median filter---------------
  var kernelpx = ee.Kernel.square(4,'pixels',false);
  var imgmedian = img.focal_median({kernel: kernelpx, iterations: 1});
  var proj = img.select(0).projection();
  var imgmedianpro = imgmedian.reproject(proj,null,20); 
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
  //geometry: geometry,
  scale: 10,
  maxPixels: 1e12
});
  var mmin = ee.Number(stats.get('b2b8'));
  var mmax = mmin.multiply(1.3);
  var maskmid = immgtb2b8.gte(mmin).and(immgtb2b8.lt(mmax));
  //% 对估算范围做掩膜
  var immgtb2b8est = immgtb2b8.updateMask(maskmid);
  //% 列表排序 
  var listPixel1=ee.List(immgtb2b8est.reduceRegion({
		reducer:ee.Reducer.toList(),
    scale:10,
    maxPixels:1e13,
  }).get('b2b8')).sort().slice(0,60);
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
      maxPixels: 1e13,
  });
  var meanblue = ee.Number(meandict.get('B2')),
      meangreen = ee.Number(meandict.get('B3')),
      meanred = ee.Number(meandict.get('B4')),
      meannir = ee.Number(meandict.get('B8'));
  var rw=ee.Array([meanblue,meangreen,meanred,meannir]).divide(10000.0);
//  print('rw',rw);
 // Convert the zones of the thresholded nightlights to vectors.
  // var aa = immgt40.gte(0);
  // var vectors = aa.reduceToVectors({
  //   crs: 'EPSG:32649',
  //   scale: 10,
  //   geometryType: 'polygon',
  //   eightConnected: true,
  //   maxPixels:1e13,
  // });
  // var aadisplay = ee.Image(0).updateMask(0).paint(vectors, '000000', 5);
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
      immc = immc.clamp(0,1);
    // //-------------------water and land---------------
  var wmask1temp = immc.expression(
                  '1.0 * (b3 - b8) / (b3 + b8)',
                  {
                    b3:immc.select('B3'),
                    b8:immc.select('B8'),
                  });
  var wmask1 = wmask1temp.gt(0);
  var wmask2 = immc.select('B8').lt(0.1);
  var wmask3 = wmask1.and(wmask2);
  immc = immc.updateMask(wmask3);
  //return immc;
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
  var Dc = ((mC2.subtract(mA2.multiply(Ds))).divide(mB2)).rename('Dc');
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
              )).rename('Ds1');
  var Du = ((mC2.subtract(mA2.multiply(Ds1))).divide(mB2)).rename('Du');
  Dc = Normaliz(Dc).updateMask(wmask3);
  Ds1 = (Normaliz(Ds1)).updateMask(wmask3);
  Du = Normaliz(Du).updateMask(wmask3);
  imgDC = Dc; imgDS = Ds1; imgDU = Du;
  // immc = immc.addBands(Dc).addBands(Ds1).addBands(Du);
  // var systemtime = ee.String(img.get('system:index')).slice(0,8);
  // immc.set('system:index',systemtime);
  //print(immc);
  // AddLayerPercentStretch(Dc,90,'叶绿素浓度');
  // AddLayerPercentStretch(Ds1,90,'悬浮泥沙浓度');
  // AddLayerPercentStretch(Du,90,'化学需氧量');
    imgcol3d = ee.ImageCollection(imgcolselect.map(correctionTimes));
    print('imgcol3d',imgcol3d);
    imgcol3d = imgcol3d.map(function(image) 
      {return image.set({time: ee.String(image.get('system:index')).slice(0,8)})});
    //print('imgcol3d',imgcol3d);
    imgcolDC = imgcol3d.select('Dc');
    imgcolDS = imgcol3d.select('Ds1');
    imgcolDU = imgcol3d.select('Du');
  // message
  labelMessage.setValue("运行成功！");
  return immc;
}
function singleDetection(img,layername)
{
    //var imgcolSTD = imgcol.reduce(ee.Reducer.sampleStdDev());
    //var imgcolMean = imgcol.reduce(ee.Reducer.mean());
    //mapMain.centerObject(img.geometry(),11)
    AddLayerPercentStretch(img,90,layername);
    //AddLayerPercentStretchSTD(imgcolMean,90,'平均值');
    // imgcolChart = imgcol;
}
function timeDetection(imgcol)
{   
    // var smask = (imgcol.first()).selfMask();
    // mapMain.centerObject(image1colGeometry,11);
    var imgcolSTD = imgcol.reduce(ee.Reducer.sampleStdDev());
    //var imgcolMean = imgcol.reduce(ee.Reducer.mean());
    //print(imgcolSTD)
    // mapMain.addLayer(smask);
    AddLayerPercentStretchSTD(imgcolSTD,90,'标准差');
    //AddLayerPercentStretchSTD(imgcolMean,90,'平均值');
    imgcolChart = imgcol;
}
function correctionTimes(img)
{
  // mapMain.centerObject(img.geometry(),10);
  //mapMain.addLayer(img,vis1,'真彩色影像');
  // //-------------------median filter---------------
  var kernelpx = ee.Kernel.square(4,'pixels',false);
  var imgmedian = img.focal_median({kernel: kernelpx, iterations: 1});
  var proj = img.select(0).projection();
  var imgmedianpro = imgmedian.reproject(proj,null,20); 
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
  //geometry: geometry,
  scale: 10,
  maxPixels: 1e12
});
  var mmin = ee.Number(stats.get('b2b8'));
  var mmax = mmin.multiply(1.3);
  var maskmid = immgtb2b8.gte(mmin).and(immgtb2b8.lt(mmax));
  //% 对估算范围做掩膜
  var immgtb2b8est = immgtb2b8.updateMask(maskmid);
  //% 列表排序 
  var listPixel1=ee.List(immgtb2b8est.reduceRegion({
		reducer:ee.Reducer.toList(),
    scale:10,
    maxPixels:1e13,
  }).get('b2b8')).sort().slice(0,60);
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
      maxPixels: 1e13,
  });
  var meanblue = ee.Number(meandict.get('B2')),
      meangreen = ee.Number(meandict.get('B3')),
      meanred = ee.Number(meandict.get('B4')),
      meannir = ee.Number(meandict.get('B8'));
  var rw=ee.Array([meanblue,meangreen,meanred,meannir]).divide(10000.0);
//  print('rw',rw);
 // Convert the zones of the thresholded nightlights to vectors.
  // var aa = immgt40.gte(0);
  // var vectors = aa.reduceToVectors({
  //   crs: 'EPSG:32649',
  //   scale: 10,
  //   geometryType: 'polygon',
  //   eightConnected: true,
  //   maxPixels:1e13,
  // });
  // var aadisplay = ee.Image(0).updateMask(0).paint(vectors, '000000', 5);
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
      immc = immc.clamp(0,1);
    // //-------------------water and land---------------
  var wmask1temp = immc.expression(
                  '1.0 * (b3 - b8) / (b3 + b8)',
                  {
                    b3:immc.select('B3'),
                    b8:immc.select('B8'),
                  });
  var wmask1 = wmask1temp.gt(0);
  var wmask2 = immc.select('B8').lt(0.1);
  var wmask3 = wmask1.and(wmask2);
  immc = immc.updateMask(wmask3);
  //return immc;
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
  var Dc = ((mC2.subtract(mA2.multiply(Ds))).divide(mB2)).rename('Dc');
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
              )).rename('Ds1');
  var Du = ((mC2.subtract(mA2.multiply(Ds1))).divide(mB2)).rename('Du');
  Dc = Normaliz(Dc).updateMask(wmask3);
  Ds1 = (Normaliz(Ds1)).updateMask(wmask3);
  Du = Normaliz(Du).updateMask(wmask3);
  immc = immc.addBands(Dc).addBands(Ds1).addBands(Du);
  //print(immc);
  // AddLayerPercentStretch(Dc,90,'叶绿素浓度');
  // AddLayerPercentStretch(Ds1,90,'悬浮泥沙浓度');
  // AddLayerPercentStretch(Du,90,'化学需氧量');
  // message
  labelMessage.setValue("运行成功！");
  return immc;
}
function showDC(img)
{
  // // var lower_percentile = ee.Number(100).subtract(percent).divide(2);
  // // var upper_percentile = ee.Number(100).subtract(lower_percentile);
  // var lower_percentile = ee.Number(5);
  // var upper_percentile = ee.Number(95);
  // var stats = img.select(img.select(0).bandNames(),['value']).reduceRegion({
  //   reducer: ee.Reducer.percentile({percentiles: [lower_percentile, upper_percentile]}).setOutputs(['lower', 'upper']),
  //   scale: 10, 
  //   maxPixels:1e13,
  // });
  // var vis_params = ee.Dictionary({
  //     'min': ee.Number(stats.get('value_lower')),
  //     'max': ee.Number(stats.get('value_upper')),
  //     'palette':["0008ff","00a1ff","00e7ff","00ffd0","9dff00","efff02","ffe000","ffb100","ff6a00","ff0000"],
  //   });
  // mapMain.addLayer({
  //   eeObject: img,
  //   visParams: vis_params,
  //   //name: layername,
  //   shown: false,
  // });
  imgDCstd = img
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
    //geometry:image1colGeometry,
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
  // print('Single-band GeoTIFF files wrapped in a zip file',
  // img.getDownloadURL({
  //   name: 'single_band',
  //   //bands: ['B3'],
  //   scale:30,
  //   region: img.geometry(),
  // }));
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
function getIds(collection) {
  var info = collection.getInfo() // turns the collection to a local list
  var images = info['features'] // need to use local javascript to access
  var ids = []
  for (var i=0; i<images.length; i++) {  // note .length not size()
    var im = images[i]                   // [i] not .get(i)
    var id = im['id']
    ids.push(id)                       // note .push() not .cat()
    //print(id,typeof(id))
    idlist = idlist.insert(i,id);
  }
  print('ids',ids,typeof(ids[1]));
  return ids
}
function searchImage(roi,image1_start_time, image1_end_time)
{
    // clear all the existing rois and layers
    clearRoi(); 
    clearLayers();
  var image1col = ee.ImageCollection('COPERNICUS/S2')
                .filterBounds(roi)
                .filterDate(image1_start_time, image1_end_time)
                .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 8))
                //.sort('CLOUD_COVERAGE_ASSESSMENT', true)
                .sort('CLOUDY_PIXEL_PERCENTAGE', true)
                //.first();
  if (image1col.size().getInfo()===0) 
  {labelMessage.setValue("没有满足条件的遥感影像！")}
  else{
    imgcolAA = image1col;
    print(imgcolAA);
    //image1colGeometry = imgcolAA.geometry()
    jsid = getIds(imgcolAA);
    selector = ui.Select(jsid)
    selector.setPlaceholder('选择一景影像')
    panelSingle2.widgets().set(0, selector);
    //print('selector',selector.items())
    var selectorList = selector.items();
    //print('selectorList',selectorList);
    //print('idlist',idlist);
    selectorList.map(function (item)
    {
      var listimg = ee.Image(item);
      mapMain.addLayer(listimg,vis1,item,false);
    });
    // var maplist = mapMain.layers();
    // print('maplist',maplist);
    // print(maplist.get(2).getShown())
    // var sec1 = (selector.items()).get(0);
    // print('sec1',sec1,typeof(sec1))
    //idlistshown = getShownLayer(idlist,maplist)
    // var list11 = getShownLayer (selectorList,maplist);
    // print(list1)
    //var show = ee.List();
    // print(show)
  }
}
function getShownLayer (idlist2,maplist2)
{
    var jstempid = []; var jstempindex = 0;
    for (var i=0; i<maplist2.length(); i++) 
    {  
      if(maplist2.get(i).getShown() === true)
      {
        jstempid[jstempindex] = idlist2[i];
        // print(0);
        // idlist2.splice(i,1,999)
        jstempindex++;
      }
      // else{
      //   print(1)
      // }
    }
  return jstempid;
}
function addcollayer(collection) {
  for (var i=0; i<images.length; i++) {  // note .length not size()
    var im = images[i]                   // [i] not .get(i)
    var id = im['id']
    ids.push(id)                       // note .push() not .cat()
  }
  return ids
}
function addcollayer(collection) {
  var info = collection.getInfo() // turns the collection to a local list
  var images = info['features'] // need to use local javascript to access
  var ids = []
  for (var i=0; i<images.length; i++) {  // note .length not size()
    var im = images[i]                   // [i] not .get(i)
    var id = im['id']
    ids.push(id)                       // note .push() not .cat()
  }
  return ids
}
function stdDetection(roi,image1_start_time, image1_end_time)
{
  // clear all the existing rois and layers
  clearRoi(); 
  clearLayers();
  var image1col = ee.ImageCollection('COPERNICUS/S2')
                .filterBounds(roi)
                .filterDate(image1_start_time, image1_end_time)
                .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 8))
  //image1colGeometry = image1col.geometry();
  //print(image1colGeometry);
  if (image1col.size().getInfo()===0) 
  {labelMessage.setValue("没有满足条件的遥感影像！")}
  else
  {
    mapMain.centerObject(roi,10);
    //mapMain.addLayer(image1,vis1,'真彩色遥感');
    //print('image1col',image1col);
    //var imgcor = ee.ImageCollection(image1col.map(correction));
    imgcol3d = ee.ImageCollection(image1col.map(correctionTimes));
    //print('imgcol3d',imgcol3d);
    imgcol3d = imgcol3d.map(function(image) 
      {return image.set({time: ee.String(image.get('system:index')).slice(0,8)})});
    //print('imgcol3d',imgcol3d);
    imgcolDC = imgcol3d.select('Dc');
    imgcolDS = imgcol3d.select('Ds1');
    imgcolDU = imgcol3d.select('Du');
    // imgDCstd = imgcolDC.reduce(ee.Reducer.sampleStdDev());
    // imgDSstd = imgcolDS.reduce(ee.Reducer.sampleStdDev());
    // imgDUstd = imgcolDU.reduce(ee.Reducer.sampleStdDev());
    // imgDCmean = imgcolDC.reduce(ee.Reducer.mean());
    // imgDSmean = imgcolDS.reduce(ee.Reducer.mean());
    // imgDUmean = imgcolDU.reduce(ee.Reducer.mean());
    // imgDCstd = imgcolDC.reduce(ee.Reducer.sampleStdDev());
    // var imgDCmean = imgcolDC.reduce(ee.Reducer.mean());
    // print('dc std',imgDCstd);
    // mapMain.addLayer(imgDCstd,{palette:["0008ff","00a1ff","00e7ff","00ffd0","9dff00","efff02","ffe000","ffb100","ff6a00","ff0000"]},'dc std',false);
    // mapMain.addLayer(imgDCstd,{},'dcdc',false)
    // mapMain.addLayer(imgcolDC);
    //print('imgcolDU',imgcolDU);
    // AddLayerPercentStretchSTD(imgDCstd,90,'dcstd2');
    // AddLayerPercentStretchSTD(imgDCmean,90,'dcmean')
  }
}
// function timeDetection(imgcol)
// {
//     var imgcolSTD = imgcol.reduce(ee.Reducer.sampleStdDev());
//     //var imgcolMean = imgcol.reduce(ee.Reducer.mean());
//     AddLayerPercentStretchSTD(imgcolSTD,90,'标准差');
//     //AddLayerPercentStretchSTD(imgcolMean,90,'平均值');
//     imgcolChart = imgcol;
// }
function timeDetection2(imgstd,imgmean,imgcol)
{
    // var imgcolSTD = imgcol.reduce(ee.Reducer.sampleStdDev());
    // var imgcolMean = imgcol.reduce(ee.Reducer.mean());
    AddLayerPercentStretchSTD(imgstd,90,'标准差');
    AddLayerPercentStretchSTD(imgmean,90,'平均值');
    imgcolChart = imgcol;
}
function setTime(img)
{
  var systemtime = ee.String(img.get('system:index')).slice(0,8);
  img.set('systemtime',systemtime);
  return(img);
}
// detection water function core
function runDetection(roi,image1_start_time, image1_end_time)
{
      // clear all the existing rois and layers
    clearRoi(); 
    clearLayers();
  var image1col = ee.ImageCollection('COPERNICUS/S2')
                .filterBounds(roi)
                .filterDate(image1_start_time, image1_end_time)
                .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 8))
                //.sort('CLOUD_COVERAGE_ASSESSMENT', true)
                //.sort('CLOUDY_PIXEL_PERCENTAGE', true)
                //.first();
  if (image1col.size().getInfo()===0) 
  {labelMessage.setValue("没有满足条件的遥感影像！")}
  else{
  var image1 = image1col.first();
  labelImage1id.setValue((image1.get('PRODUCT_ID')).getInfo().slice(0,37));
  mapMain.centerObject(roi,10);
  //mapMain.addLayer(image1,vis1,'真彩色遥感');
  print('image1col',image1col);
  //var imgcor = ee.ImageCollection(image1col.map(correction));
  imgcol3d = ee.ImageCollection(image1col.map(correction));
  print('imgcol3d',imgcol3d);
  imgcolDC = imgcol3d.select('Dc');
  imgcolDS = imgcol3d.select('Ds1');
  imgcolDU = imgcol3d.select('Du');
  // imgDCstd = imgcolDC.reduce(ee.Reducer.sampleStdDev());
  // print('dc std',imgDCstd);
  // mapMain.addLayer(imgDCstd,{palette:["0008ff","00a1ff","00e7ff","00ffd0","9dff00","efff02","ffe000","ffb100","ff6a00","ff0000"]},'dc std',false);
  // mapMain.addLayer(imgDCstd,{},'')
  // mapMain.addLayer(imgcolDC);
  // print('imgcolDU',imgcolDU);
  // AddLayerPercentStretch(imgDCstd,90,'dcstd2')
//   var img1 = image1;
//   var pimg = img1.select(['B2','B3','B4','B8']);
//   print('pimg',pimg);
//   // //-------------------median filter---------------
//   var kernelpx = ee.Kernel.square(4,'pixels',false);
//   var imgmedian = pimg.focal_median({kernel: kernelpx, iterations: 1});
//   var proj = pimg.select(0).projection();
//   var imgmedianpro = imgmedian.reproject(proj,null,30); 
//   // //-------------------dark piexl , rw[b2,b3,b4,b8]---------------
//   var immg = imgmedianpro;
//   var immgb2=immg.select('B2'),
//       immgb3=immg.select('B3'),
//       immgb4=immg.select('B4'),
//       immgb8=immg.select('B8');
//   var mask84 = immgb8.lt(immgb4),
//       mask2 = immgb2.gt(650),
//       maskall = mask84.and(mask2);
//   var immgt = immg.updateMask(maskall);
//   var immgtb2 = immgt.select('B2'),
//       immgtb8 = immgt.select('B8');
//   var immgtb2b8 = (immgtb2.multiply(immgtb2).add(immgtb8.multiply(immgtb8))).rename(['b2b8']);
//   var stats = immgtb2b8.reduceRegion({
//   reducer: ee.Reducer.min(),
//   //geometry: geometry,
//   scale: 10,
//   maxPixels: 1e12
// });
//   var mmin = ee.Number(stats.get('b2b8'));
//   var mmax = mmin.multiply(1.3);
//   var maskmid = immgtb2b8.gte(mmin).and(immgtb2b8.lt(mmax));
//   //% 对估算范围做掩膜
//   var immgtb2b8est = immgtb2b8.updateMask(maskmid);
//   //% 列表排序 
//   var listPixel1=ee.List(immgtb2b8est.reduceRegion({
// 		reducer:ee.Reducer.toList(),
//     scale:10,
//     maxPixels:1e13,
//   }).get('b2b8')).sort().slice(0,60);
//   var dark10th = ee.Number(listPixel1.get(10)),
//       dark50th = ee.Number(listPixel1.get(49));
//   var mask10th = immgtb2b8est.gte(dark10th),
//       mask50th = immgtb2b8est.lte(dark50th),
//       maskdark = mask10th.and(mask50th);
//   var immgt40 = immgtb2b8est.updateMask(maskdark);
//   var mask40 = maskall.and(maskdark)
//   var imm = immg.updateMask(mask40)
//   var meandict = imm.reduceRegion({
//       reducer: ee.Reducer.mean(),
//       scale: 10,
//       maxPixels: 1e13,
//   });
//   var meanblue = ee.Number(meandict.get('B2')),
//       meangreen = ee.Number(meandict.get('B3')),
//       meanred = ee.Number(meandict.get('B4')),
//       meannir = ee.Number(meandict.get('B8'));
//   var rw=ee.Array([meanblue,meangreen,meanred,meannir]).divide(10000.0);
//   print('rw',rw);
//   // Convert the zones of the thresholded nightlights to vectors.
//   // var aa = immgt40.gte(0);
//   // var vectors = aa.reduceToVectors({
//   //   crs: 'EPSG:32649',
//   //   scale: 10,
//   //   geometryType: 'polygon',
//   //   eightConnected: true,
//   //   maxPixels:1e13,
//   // });
//   // var aadisplay = ee.Image(0).updateMask(0).paint(vectors, '000000', 5);
//   // mapMain.addLayer(aadisplay, {palette: 'FF0000'}, 'display vectors',false);
//   // //-------------------radiometric correction ， air correction---------------
//   imm = imgmedianpro.divide(10000.0);
//   //% 成像月份 
//   var month = ee.String(img1.get('system:index')).slice(4,6);
//   //% 天卫星天顶角 B2 B3 B4 B8
//   var vzaB2=ee.Number(img1.get('MEAN_INCIDENCE_ZENITH_ANGLE_B2')),
//       vzaB3=ee.Number(img1.get('MEAN_INCIDENCE_ZENITH_ANGLE_B3')),
//       vzaB4=ee.Number(img1.get('MEAN_INCIDENCE_ZENITH_ANGLE_B4')),
//       vzaB8=ee.Number(img1.get('MEAN_INCIDENCE_ZENITH_ANGLE_B8'));
//   var vza=ee.Number(ee.List([vzaB2,vzaB3,vzaB4,vzaB8]).reduce(ee.Reducer.mean())),
//       vzar=vza.multiply((Math.PI/180)),
//       vzarsec = ee.Number(1).divide(vzar.cos());
//   //% sza-太阳天顶角   
//   var sza=ee.Number(img1.get('MEAN_SOLAR_ZENITH_ANGLE')),
//       szar = sza.multiply((Math.PI/180)),
//       szarcos=szar.cos(),
//       szarsin=szar.sin(),
//       szarsec = ee.Number(1).divide(szarcos);
//   //% 39.68-入射天顶角
//   var rsa=ee.Number(39.68),
//       rsar=rsa.multiply((Math.PI/180)),
//       rsarcos=rsar.cos();
// ////////////////////////////////////////////////////////////////////////////
//   //% 哨兵2号， 2、3、4、8 波段 纳米 
//   var wlB=ee.Array([492.3, 559, 665, 833]);
//   //% TM band
//   var wl0=ee.Array([485, 560, 660, 840, 1650, 2215, 10950]); 
//   //% 实测清深水体反射率
//   var rw1=ee.Array([0.023259977, 0.021259977, 0.02877713, 0.009774899, 0.000893186, 0, 0]);
//   //% rw1 = rw1.*(1+1/cosd(sza))./(1+1/cosd(39.68)); % 成像时清深水体反射率
//       rw1=rw1.multiply(ee.Number(1).add((ee.Number(1).divide(szarcos)))).divide(
//           ee.Number(1).add(ee.Number(1).divide(rsarcos)));
// ////////////////////////////////////////////////////////////////////////////
//   var wl = wlB;
//   var k1 = rw1.get([1]).subtract(rw1.get([0])).divide(wl0.get([1]).subtract(wl0.get([0])));
//   var b1 = rw1.get([0]).subtract(k1.multiply(wl0.get([0])));
//   var line0 = wl.get([0]).multiply(k1).add(b1);
//   var line1 = wl.get([1]).multiply(k1).add(b1);
//   var k2 = rw1.get([3]).subtract(rw1.get([2])).divide(wl0.get([3]).subtract(wl0.get([2])));
//   var b2 = rw1.get([2]).subtract(k2.multiply(wl0.get([2])));
//   var line2 = wl.get([2]).multiply(k2).add(b2);
//   var line3 = wl.get([3]).multiply(k2).add(b2);
//   rw1=ee.Array([line0,line1,line2,line3]);
//   //print(rw1);
// /*
//   //% 线性插值 
//   var indvar1 =wl0.slice(0,0,2).toList(),//%自变量 wl0[485, 560]
//       indvar2 =wl0.slice(0,2,4).toList();//%自变量 wl0[660, 840]
//   var dvar1=rw1.slice(0,0,2).toList(),//%因变量 rw1[0,1]
//       dvar2=rw1.slice(0,2,4).toList();//%因变量 rw1[2,3]
//   var listsVarRow1=ee.List([indvar1,dvar1]),
//       listsVarRow2=ee.List([indvar2,dvar2]);
//   //% Cast the ee.List as an ee.Array, transpose it, and cast back to ee.List.
//   var listsVarCol1 = ee.Array(listsVarRow1).transpose().toList(),
//       listsVarCol2 = ee.Array(listsVarRow2).transpose().toList();
//   var linearFit1 = ee.Dictionary(listsVarCol1.reduce(ee.Reducer.linearFit())),
//       linearFit2 = ee.Dictionary(listsVarCol2.reduce(ee.Reducer.linearFit()));
//   var lineark1=ee.Number(linearFit1.get('scale')),
//       linearb1=ee.Number(linearFit1.get('offset')),
//       lineark2=ee.Number(linearFit2.get('scale')),
//       linearb2=ee.Number(linearFit2.get('offset'));
//   var wlB1=wlB.slice(0,0,2),//%哨兵待插值x [492.3, 559]
//       wlB2=wlB.slice(0,2);//%  哨兵待插值x [665, 833]
//   var wlBlinear1 =wlB1.multiply(lineark1).add(linearb1),
//       wlBlinear2 =wlB2.multiply(lineark2).add(linearb2);
//   var wlBB=ee.Array([wlBlinear1.get([0]),wlBlinear1.get([1]),wlBlinear2.get([0]),wlBlinear2.get([1])]);
//       rw1=wlBB;
//   print('rw1',rw1);
//   */
// ////////////////////////////////////////////////////////////////////////////
//   //% 清洁水体像元光学厚度 
//   var phf=ee.Number(0.75).multiply(ee.Number(1).add(szarcos.pow(ee.Number(2))));
//       wl=wlB.divide(1000);
//   var fixtemp1 = rw.subtract(rw1).gt(0);
//   var fixtemp2 = rw.subtract(rw1).lte(0)
//   //var ras =ee.Number(0.0088).multiply(tempwl.pow(ee.Number(-4.05))).multiply(phf).divide(ee.Number(4));
//   var ras = wl.pow(-4.05).multiply(0.0088).multiply(phf).divide(ee.Number(4));
//   var fix = rw.multiply(fixtemp1).add(ras.multiply(fixtemp2));
//       rw = fix;
//       print('rw fix',rw);
// /*
//   //% 如果均值rw2比线性插值rw1小，则进行修正   
//   //var wl=wlB.divide(1000);
//   var rw2=rw; 
//   var rw3=rw2.subtract(rw1).toList();
//   //% 清洁水体像元光学厚度 
//   var phf=ee.Number(0.75).multiply(ee.Number(1).add(szarcos.pow(ee.Number(2))));
//   //% rw2 暗像元的四个波段均值 , rw1 线性插值后的清深水体反射率 , wl 哨兵波段/1000 , phf
//   var fix =function(number) {
//     var index =rw3.indexOf(number);
//     var temprw2=rw2.get([index]);
//     var temprw1=rw1.get([index]);//
//     var tempwl=wl.get([index]);
//     //% ras=0.0088*wl(jj).^(-4.05)*phf/4;
//     var ras =ee.Number(0.0088).multiply(tempwl.pow(ee.Number(-4.05))).multiply(phf).divide(ee.Number(4));
//     var fix=temprw1.add(ras);
//     return ee.Algorithms.If(ee.Number(number).lt(0),
//     fix,
//     temprw2);
//   }
//   rw=ee.Array(rw3.map(fix));
// */
// ////////////////////////////////////////////////////////////////////////////
//   var temp1 = rw.subtract(rw1),
//       temp2 = ee.Array(ee.List.repeat(ee.Number(0.25).multiply(szarsec).multiply(phf),4)),
//       temp3 = rw1.multiply(szarsec.add(vzarsec)),
//       tau1 = temp1.divide(temp2.subtract(temp3));
//   var tau = temp1.divide(temp2.subtract(temp3).add(rw1.multiply(szarsec.multiply(0.5)).multiply(
//               tau1.multiply(vzarsec).multiply(-1).add(1))));
//   //% 辐射校正
//   var alphaa = ee.Number(-1).multiply((tau.get([0]).divide(tau.get([2]))).log()).divide(
//               ((wl.get([0])).divide(wl.get([2]))).log());
//   var betaa = tau.get([0]).divide(wl.get([0]).pow(ee.Number(-1).multiply(alphaa)));
//   tau = (wl.pow(ee.Array(ee.List.repeat(ee.Number(-1).multiply(alphaa),4)))).multiply(betaa);
//   var biass =((tau.multiply(ee.Number(-1).multiply(szarsec.add(vzarsec)))).exp()).multiply(rw1);
//       biass = biass.add(
//               rw1.multiply(0.5).multiply(szarsec).multiply(tau).multiply(
//                 (tau.multiply(-1).multiply(vzarsec)).exp())
//               );
//       biass = biass.add(tau.multiply(szarsec).multiply(phf).divide(4)).subtract(rw);
//   var blueRC=imm.select('B2').add(biass.get([0])),
//       greenRC=imm.select('B3').add(biass.get([1])),
//       redRC=imm.select('B4').add(biass.get([2])),
//       nirRC=imm.select('B8').add(biass.get([3]));
// ////////////////////////////////////////////////////////////////////////////
//   //% 大气校正
//   var temp4 = (tau.multiply(szarsec.add(vzarsec)).multiply(-1)).exp();
//       temp4 = temp4.add(tau.multiply(szarsec).multiply(0.5).multiply(
//                 (tau.multiply(vzarsec).multiply(-1)).exp())
//               );
//   var blueRCAC = (blueRC.subtract(temp2.get([0]).multiply(tau.get([0])).divide(
//                   temp4.get([0])
//                   ))).rename('B2');
//   var greenRCAC = (greenRC.subtract(temp2.get([0]).multiply(tau.get([1])).divide(
//                   temp4.get([1])
//                   ))).rename('B3');
//   var redRCAC = (redRC.subtract(temp2.get([0]).multiply(tau.get([2])).divide(
//                   temp4.get([2])
//                   ))).rename('B4');
//   var nirRCAC = (nirRC.subtract(temp2.get([0]).multiply(tau.get([3])).divide(
//                   temp4.get([3])
//                   ))).rename('B8');
//   var immc = ee.Image([blueRCAC,greenRCAC,redRCAC,nirRCAC]);
//       immc = immc.clamp(0,1);
  //print('immc',immc);
////////////////////////////////////////////////////////////////////////////
  // // //-------------------water and land---------------
  // var wmask1temp = immc.expression(
  //                 '1.0 * (b3 - b8) / (b3 + b8)',
  //                 {
  //                   b3:immc.select('B3'),
  //                   b8:immc.select('B8'),
  //                 });
  // var wmask1 = wmask1temp.gt(0);
  // var wmask2 = immc.select('B8').lt(0.1);
  // var wmask3 = wmask1.and(wmask2);
  // //var immcwater = immc.updateMask(wmask3);
  // var nowater = wmask3.eq(0);
  //     nowater = nowater.multiply(-1);
  // immc = immc.updateMask(wmask3);
////////////////////////////////////////////////////////////////////////////
  // //-------------------detection---------------
  // //%% 水质反演
  //     //% 污染物散射系数比
  // var uk = ee.Number(100.0);
  //     //% 悬沙吸收系数比的倒数
  // var sk = ee.Number(20.0);
  //     //% 水折射率:
  // var nw=ee.Number(1.333);
  //     //% 水\黄色物质\有机污染物\悬沙和叶绿素上行散射比:
  // var kw=ee.Number(0.5),
  //     ky=ee.Number(0.5),
  //     ku=ee.Number(0.5),
  //     ks=ee.Number(1.0),
  //     kc=ee.Number(1.0);
  //     //% 水\黄色物质\有机污染物\悬沙和叶绿素散射入瞳分量比:
  // var qw=ee.Number(1/4),
  //     qy=ee.Number(1/4),
  //     qu=ee.Number(1/4),
  //     qs=ee.Number(1/2),
  //     qc=ee.Number(1/2);
  //     //% 单位质量黄色物质\有机污染物瑞利散射波长指数与混浊度系数
  // var ary=ee.Number(4.32),
  //     bry=ee.Number(0.002023129);
  // //% 黄色物质平均浓度Dy
  // var Dy = ee.Number(ee.Algorithms.If(month.equals(ee.String('11')),
  //           ee.Number(2.54),
  //           ee.Number(1.356008978)
  //           ));
  // //% 纯水散射系数和纯水、黄色物质与有机污染物吸收系数
  // var bw = ee.Array([0.003346667, 0.001829412, 0.000869231, 0.000348191]),
  //     aw = ee.Array([0.023933333, 0.095058824, 0.397692308, 3.424706453]),
  //     ay = ee.Array([0.5574, 0.197411765, 0.047538462, 0.007829253]),
  //     au = ee.Array([0.14, 0.155949192, 0.085814616, 0.067345041]);
  // //% 土壤、植被土壤反射率
  // var rs = ee.Array([0.100526901, 0.150289321, 0.198228836, 0.249020255]),
  //     rc = ee.Array([0.014847887, 0.026177778, 0.016055738, 0.352893617]);
  // //% 黄色物质、有机污染物、悬浮泥沙、叶绿素散射系数及悬浮泥沙、叶绿素吸收系数计算：
  // var by = wl.pow(ary.multiply(-1)).multiply(bry),
  //     bu = by.multiply(uk),
  //     bs = rs,
  //     bc = rc,
  //     as = (bs.multiply(-1).add(1)).divide(sk);
    //%参数调整
  // bc = ee.Array((bc.toList()).splice(3,1,[0.39]));
  // var ac = bc.multiply(-1).add(1).divide(2);
  // ac = ee.Array((ac.toList()).splice(1,1,[0.7]));
  // au = ee.Array((au.toList()).splice(1,1,[0.46]));
  // au = ee.Array((au.toList()).splice(2,1,[0.039]));
  // bs = ee.Array((bs.toList()).splice(1,1,[0.08]));
  // bs = ee.Array((bs.toList()).splice(2,1,[0.21]));
  // as = ee.Array((as.toList()).splice(1,1,[15]));
  // as = ee.Array((as.toList()).splice(2,1,[0.1]));
  // bc = ee.Array((bc.toList()).splice(1,1,[0.05]));
  // ac = ee.Array((ac.toList()).splice(1,1,[0.6]));
  // bc = ee.Array([0.014847887, 0.026177778, 0.016055738, 0.39]);
  // var ac = bc.multiply(-1).add(1).divide(2);
  // ac = ee.Array((ac.toList()).splice(1,1,[0.7]));
  // au = ee.Array([0.14, 0.46, 0.039, 0.067345041]);
  // bs = ee.Array([0.100526901, 0.08, 0.21, 0.249020255]),
  // as = ee.Array((as.toList()).splice(1,1,[15]));
  // as = ee.Array((as.toList()).splice(2,1,[0.1]));
  // bc = ee.Array([0.014847887, 0.05, 0.016055738, 0.39]);
  // ac = ee.Array((ac.toList()).splice(1,1,[0.6]));
  // //% 水下入射角
  // var ref_ang =  (szarsin.divide(nw)).asin(); //弧度 
  // var u = (ee.Number(1.0).divide(ref_ang.cos())).add(1);
  // //% 散射相函数
  // var pw = (ref_ang.cos().pow(2).add(1)).multiply(3).divide(4);
  // var py = pw;
  // var pu = pw;
  // var fw = bw.multiply(qw).multiply(pw).add(by.multiply(qy).multiply(Dy).multiply(py)),
  //     ew = bw.multiply(kw).add(aw).add((by.multiply(ky).add(ay)).multiply(Dy));
  // var mA1 = immc.select('B4').expression(
  //               '(imac * u) * (ks * bs + as) - qs * bs',
  //               {
  //                 imac:immc.select('B4') , u:u ,
  //                 ks:ks , bs:bs.get([2]) , as:as.get([2]) ,
  //                 qs:qs 
  //               });
  // var mA2 = immc.select('B8').expression(
  //                 '(imac * u) * (ks * bs + as) - qs * bs',
  //                 {
  //                   imac:immc.select('B8') , u:u ,
  //                   ks:ks , bs:bs.get([3]) , as:as.get([3]) ,
  //                   qs:qs 
  //                 });
  // var mB1 = immc.select('B4').expression(
  //                 '(imac * u) * (kc * bc + ac) - qc * bc',
  //                 {
  //                   imac:immc.select('B4') , u:u ,
  //                   kc:kc , bc:bc.get([2]) , ac:ac.get([2]) ,
  //                   qc:qc
  //                 });
  // var mB2 = immc.select('B8').expression(
  //                 '(imac * u) * (kc * bc + ac) - qc * bc',
  //                 {
  //                   imac:immc.select('B8') , u:u ,
  //                   kc:kc , bc:bc.get([3]) , ac:ac.get([3]) ,
  //                   qc:qc
  //                 });
  // var mC1 = immc.select('B4').expression(
  //                 'imac * (- 1) * u * ew + fw',
  //                 {
  //                   imac:immc.select('B4') , u:u , ew:ew.get([2]) ,
  //                   fw:fw.get([2])
  //                 });
  // var mC2 = immc.select('B8').expression(
  //                 'imac * (- 1) * u * ew + fw',
  //                 {
  //                   imac:immc.select('B8') , u:u , ew:ew.get([3]) ,
  //                   fw:fw.get([3])
  //                 });
  // var Ds = (mB1.multiply(mC2).subtract(mB2.multiply(mC1))).divide(
  //           (mB1.multiply(mA2)).subtract(mB2.multiply(mA1)));
  // var Dc = ((mC2.subtract(mA2.multiply(Ds))).divide(mB2)).rename('Dc');
  // var fw2 = Dc.multiply(bc.get([1])).multiply(qc).add(fw.get([1])),
  //     fw3 = Dc.multiply(bc.get([2])).multiply(qc).add(fw.get([2]));
  // var ew2 = Dc.multiply(kc.multiply(bc.get([1])).add(ac.get([1]))).add(ew.get([1])),
  //     ew3 = Dc.multiply(kc.multiply(bc.get([2])).add(ac.get([2]))).add(ew.get([2]));
  // mA1 = immc.expression(
  //             '(immc * u) * (ku * bu + au) - (qu * bu * pu)',
  //             {
  //               immc:immc.select('B3') , u:u,
  //               ku:ku , bu:bu.get([1]) , au:au.get([1]),
  //               qu:qu , pu:pu
  //             });
  // mA2 = immc.expression(
  //             '(immc * u) * (ku * bu + au) - (qu * bu * pu)',
  //             {
  //               immc:immc.select('B4') , u:u,
  //               ku:ku , bu:bu.get([2]) , au:au.get([2]),
  //               qu:qu , pu:pu
  //             });
  // mB1 = immc.expression(
  //             '(immc * u) * (ks * bs + as) - (qs * bs )',
  //             {
  //               immc:immc.select('B3') , u:u,
  //               ks:ks , bs:bs.get([1]) , as:as.get([1]),
  //               qs:qs 
  //             });
  // mB2 = immc.expression(
  //             '(immc * u) * (ks * bs + as) - (qs * bs )',
  //             {
  //               immc:immc.select('B4') , u:u,
  //               ks:ks , bs:bs.get([2]) , as:as.get([2]),
  //               qs:qs 
  //             });
  // mC1 = immc.expression(
  //               'immc * u * ew * (- 1) + fw',
  //               {
  //                 immc:immc.select('B3') , u:u , ew:ew2,
  //                 fw:fw2
  //               });
  // mC2 = immc.expression(
  //               'immc * u * ew * (- 1) + fw',
  //               {
  //                 immc:immc.select('B4') , u:u , ew:ew3,
  //                 fw:fw3
  //               }); 
  // var Ds1 = ((mB1.multiply(mC2).subtract(mB2.multiply(mC1))).divide(
  //             mB1.multiply(mA2).subtract(mB2.multiply(mA1))
  //             )).rename('Ds1');
  // var Du = ((mC2.subtract(mA2.multiply(Ds1))).divide(mB2)).rename('Du');
  //Dc = (Dc.multiply(10000)).toUint16().rename('Dc');
  // Ds1 = (Ds1.multiply(10000)).toUint16().rename('Ds1');
  // Du = (Du.multiply(10000)).toUint16().rename('Du');
  // Dc = Normaliz(Dc).updateMask(wmask3);
  // Ds1 = (Normaliz(Ds1)).updateMask(wmask3);
  // Du = Normaliz(Du).updateMask(wmask3);
  // mapMain.addLayer(Dc,{},'DC');
  // mapMain.addLayer(Ds1,{},'Ds1');
  // print(Dc)
//   Export.image.toDrive({
//   image: Dc,
//   description: "novaluetest-dc",
//   fileNamePrefix: "novaluetest-dc",
//   crs:'EPSG:32649',
//   scale: 50,
//   region:out,
//   maxPixels: 1e13
// });
//   Export.image.toDrive({
//   image: Ds1,
//   description: "novaluetest-ds1",
//   fileNamePrefix: "novaluetest-ds1",
//   crs:'EPSG:32649',
//   scale: 50,
//   region:out,
//   maxPixels: 1e13
// });
//   Export.image.toDrive({
//   image: Du,
//   description: "novaluetest-du",
//   fileNamePrefix: "novaluetest-du",
//   crs:'EPSG:32649',
//   scale: 50,
//   region:out,
//   maxPixels: 1e13
// });
  //print('Dc',Dc,'Ds1',Ds1,'Du',Du);
  // Export.image.toDrive({
  //   image: Du,
  //   description: 'duTOdrive',
  //   fileNamePrefix: 'du228',
  //   crs:'EPSG:32649',
  //   scale: 30,
  //   region:img1.geometry(),
  //   maxPixels: 1e13
  // });
////////////////////////////////////////////////////////////////////////////
  // //-------------------strecth---------------
  // AddLayerPercentStretch(Dc,90,'dc叶绿素浓度');
  // AddLayerPercentStretch(Ds1,90,'ds1浑浊度');
  // AddLayerPercentStretch(Du,90,'du化学需氧量');
  // message
  labelMessage.setValue("运行成功！");
  // var dcurl = Dc.getDownloadURL({
  //       params:{name:'dcout',
  //       scale:30,
  //       format:'png',
  //       region:out,
  //   }
  // });
  // labelURL.setUrl(dcurl);
  // labelURL.setValue('dcdcdc');
  // labelURL.style().set({backgroundColor:'#90EE90'});
  // var dcurl2 = Dc.getThumbURL({
  //       region:out,
  //       format:'png',
  // });
  // labelURL.setUrl(dcurl2);
  // labelURL.setValue('dcdcdc');
  // labelURL.style().set({backgroundColor:'#90EE90'});
  // mapMain.addLayer(Dc,colorparams,'dc',false);
  // mapMain.addLayer(Ds1,colorparams,'ds',false);
  // mapMain.addLayer(Du,colorparams,'du',false);
  // var img3d = ee.Image([Dc, Ds1,Du]);
  // print('img3d',img3d);
  // Dc.getDownloadURL({
  //   params:{name:'image3D',
  //     //bands:['Dc', 'Ds1', 'Du'],
  //     //region:img3d.geometry(),
  //     scale:30
  //     }, 
  //   callback:function(URL) {
  //     print('url',URL);
  //     buttonDownload.setUrl(URL);
  //     buttonDownload.style().set({backgroundColor:'#90EE90'});
  //     buttonDownload.setValue('image3D');
  //   }
  // })
  }
}
// //---------------------------image id------------------------------------------------------------
// var layerIndex = [
//   {label:"1", value:"01"},
//   {label:"2", value:"02"},
//   {label:"3", value:"03"},
//   {label:"4", value:"04"},
//   {label:"5", value:"05"},
//   {label:"6", value:"06"},
//   {label:"7", value:"07"},
//   {label:"8", value:"08"},
//   {label:"9", value:"09"},
//   {label:"10", value:"10"},
//   {label:"11", value:"11"},
//   {label:"12", value:"12"},
// ];
// // select the image for detection
// var selectImageList = ui.Select({
//   items: layerIndex,
//   style:{
//     height: "30px",
//     margin: '10px 5px 0 10px',
//     textAlign: "left",
//     color: "#000000",
//   },
//   //value: "03",
// });
// var selector = ui.Select();
// // image1 id
// var labelImage1id = ui.Label({
//   value: " ",
//   style:{
//     height: "25px",
//     margin: '10px 0 0 10px',
//     textAlign: "left",
//     color: "#000000",
//   },
// });
// var panelSelect = ui.Panel({layout:ui.Panel.Layout.flow("horizontal")});
// panelSelect.add(selectImageList);
// // panelSelect.add(selector);
// //---------------------------------------------------------------------------------------------------------------------
// //---------------------------run------------------------------------------------------------
// //---------------------------------------------------------------------------------------------------------------------
// // run button 
// var runButton = ui.Button({
//   label:"方差开始检测",
//   style:{
//     height: "30px",
//     margin: '10px 0 0 120px',
//     textAlign: "left",
//     color: "#b10d02"
//   },
//   onClick:function(){
//     runDetection(roi, 
//     image1_start_time,
//     image1_end_time)
//   }
// });
// var panelDetection = ui.Panel({layout: ui.Panel.Layout.flow("horizontal")});
// panelDetection.add(loadImageButton);
// // panelDetection.add(runButton);
// panelDetection.add(runButton2);
//panelDetection.add(clearButton);
// //---------------------------------------------------------------------------------------------------------------------
// //---------------------------chart------------------------------------------------------------
// //---------------------------------------------------------------------------------------------------------------------
// Create panels to hold lon/lat values.
// var lon = ui.Label();
// var lat = ui.Label();
// // Generates a new time series chart of collectionNO2 for the given coordinates.
// var generateChart = function (coords) {
//   // Update the lon/lat panel with values from the click event.
//   lon.setValue('lon: ' + coords.lon.toFixed(2));
//   lat.setValue('lat: ' + coords.lat.toFixed(2));
//   // Add a dot for the point clicked on.
//   var point = ee.Geometry.Point(coords.lon, coords.lat);
//   var dot = ui.Map.Layer(point, {color: '000000'}, 'clicked location');
//   // Add the dot as the second layer, so it shows up on top of the composite.
//   mapMain.layers().set(1, dot);
//   // Make a chart from the time series.
//   var collectionNO2Chart = ui.Chart.image.series(imgcolDC, point, ee.Reducer.mean(), 50);
//   // Customize the chart.
// collectionNO2Chart.setOptions({
//     title: 'Air quality: time series',
//     vAxis: {title: 'NO2'},
//     hAxis: {title: 'Date', format: 'MM-yy', gridlines: {count: 7}},
//     series: {
//       0: {
//         color: 'blue',
//         lineWidth: 0,
//         pointsVisible: true,
//         pointSize: 2,
//       },
//     },
//     legend: {position: 'right'},
//   });
//   // Add the chart at a fixed position, so that new charts overwrite older ones.
//   panelMain.widgets().set(2, collectionNO2Chart);
// };
// // Initialize with a test point.
// var initialPoint = ee.Geometry.Point(96.15, 16.81);
// generateChart({
//   lon: initialPoint.coordinates().get(0).getInfo(),
//   lat: initialPoint.coordinates().get(1).getInfo()
// });
// //---------------------------------------------------------------------------------------------------------------------
// //---------------------------3D3D------------------------------------------------------------
// //---------------------------------------------------------------------------------------------------------------------
// // dc button  chla
// var dcButton = ui.Button({
//   label:"dc叶绿素a",
//   style:{
//     height: "30px",
//     margin: '10px 0 0 10px',
//     textAlign: "left",
//     color: "#000000"
//   },
//   onClick:function(){
//     var selectid = selector.getValue();
//     print(selectid)
//     var simg = ee.Image(selectid);
//     mapMain.addLayer(simg,vis1)
//   }
// });
// // ds button  TSM
// var dsButton = ui.Button({
//   label:"ds浑浊度",
//   style:{
//     height: "30px",
//     margin: '10px 0 0 20px',
//     textAlign: "left",
//     color: "#000000"
//   },
//   onClick:function(){
//     imgcolDC.map(showDC);
//   }
// });
// // du button  COD
// var duButton = ui.Button({
//   label:"du化学需氧量",
//   style:{
//     height: "30px",
//     margin: '10px 0 0 30px',
//     textAlign: "left",
//     color: "#000000"
//   },
//   onClick:function(){
//   }
// });
// var panelDetection2 = ui.Panel({layout: ui.Panel.Layout.flow("horizontal")});
// panelDetection2.add(dcButton);
// panelDetection2.add(dsButton);
// panelDetection2.add(duButton);
// //---------------------------------------------------------------------------------------------------------------------
// //---------------------------getDownloadURL---------------------------------------------
// //---------------------------------------------------------------------------------------------------------------------
// url label
var labelURL = ui.Label({
  value: ' ',
    style:{
    margin: '10px 0 0 10px',
    textAlign: "left",
    color: "#000000",
  },
});
// url button
var buttonDownload = ui.Label({
  value:" ",
  style:{
    height: "30px",
    margin: '10px 0 0 10px',
    textAlign: "left",
    color: "#000000",
  },
});
var panelURL = ui.Panel({layout: ui.Panel.Layout.flow("horizontal")});
panelURL.add(labelURL);
panelURL.add(buttonDownload);
// //---------------------------------------------------------------------------------------------------------------------
// //---------------------------legend---------------------------------------------
// //---------------------------------------------------------------------------------------------------------------------
var colortext1 = ui.Label({
  value:"low",
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
  value:"high",
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
// panelMain1.add(dateLabel);
// panelMain1.add(labelImage1Time);
// panelMain1.add(panelImage1StartTime);
// panelMain1.add(panelImage1EndTime);
// panelMain1.add(labelRegionSelection);
// panelMain1.add(panelDraw);
// panelMain1.add(labelBar2);
// main panel
// var panelMain = ui.Panel();
//panelMain.style().set({width: '320px', position: "bottom-right"});
//panelMain.add(titleLabel);  
// panelMain.add(labelAuthor);
// panelMain.add(labelBar1);
// panelMain.add(dateLabel);
// panelMain.add(labelImage1Time);
// panelMain.add(panelImage1StartTime);
// panelMain.add(panelImage1EndTime);
// panelMain.add(labelRegionSelection);
// panelMain.add(panelDraw);
// panelMain.add(labelBar2);
 //panelMain.add(panelMain1);
// panelMain.add(panelSelect);
//panelMain.add(labelImage1id);
//panelMain.add(panelDetection);
//panelMain.add(panelDetection2);
// panelMain.add(runButton);
// panelMain.add(clearButton);
// panelMain.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Add placeholders for the chart and legend.
// panelMain.add(ui.Label('[Chart]'));
// panelMain.add(ui.Label('[Legend]'));
panelMain.add(panelURL);
panelMain.add(panelLegend);
panelMain.add(labelMessagetitle);
panelMain.add(labelMessage);