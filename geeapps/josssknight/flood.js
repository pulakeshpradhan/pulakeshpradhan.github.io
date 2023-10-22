//软著申请  洪涝
// // main map
var mapMain = ui.Map();
mapMain.setCenter(113.6906, 35.3232);
//113.2547, 23.134     113.8664, 35.3337   113.716, 35.3133
mapMain.setZoom(11);
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
  value: "雷达遥感洪涝检测系统",
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
  value: "洪涝发生前 遥感影像获取时间段:",
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
  value: "2021",
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
  value: "09",
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
  value: "2021",
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
  value: "09",
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
  value: "04",
});
////////////////////////
//
var labelImage2Time = ui.Label({
  value: "洪涝发生后  遥感影像获取时间段:",
  style:{
    margin: '10px 0 0 10px',
    textAlign: "left",
    color: "#000000",
  },
});
var labelImage2From = ui.Label({
  value: "从:",
  style:{
    height: "26px",
    margin: '10px 10px 0 10px',
    textAlign: "left",
    color: "#000000",
  },
});
var labelImage2StartYear = ui.Label({
  value: "年",
  style:{
    height: "26px",
    margin: '10px 20px 0 0',
    textAlign: "left",
    color: "#000000",
  },
});
var labelImage2StartMonth = ui.Label({
  value: "月",
  style:{
    height: "26px",
    margin: '10px 20px 0 0',
    textAlign: "left",
    color: "#000000",
  },
});
var labelImage2StartDate = ui.Label({
  value: "日",
  style:{
    height: "26px",
    margin: '10px 0 0 0',
    textAlign: "left",
    color: "#000000",
  },
});
// select the staring year for the first image
var selectImage2StartYear = ui.Select({
  items: yearList,
  style:{
    height: "30px",
    margin: '10px 5px 0 0',
    textAlign: "left",
    color: "#000000",
  },
  value: "2021",
});
// select the staring month for the first image
var selectImage2StartMonth = ui.Select({
  items: monthList,
  style:{
    height: "30px",
    margin: '10px 5px 0 0',
    textAlign: "left",
    color: "#000000",
  },
  value: "09",
  onChange: function(key) {
    if ((key == "01")||(key == "03")||(key == "05")||(key == "07")||(key == "08")||(key == "10")||(key == "12")) {
      selectImage2StartDate.items().reset(dateList1); 
      selectImage2StartDate.setPlaceholder ("01");
    }
    else if ((key == "04")||(key == "06")||(key == "09")||(key == "11")) {
      selectImage2StartDate.items().reset(dateList2); 
      selectImage2StartDate.setPlaceholder ("01");
    }
    else if (key == "02"){
      selectImage2StartDate.items().reset(dateList3); 
      selectImage2StartDate.setPlaceholder ("01");
    }
  }
});
// select the staring date for the first image
var selectImage2StartDate = ui.Select({
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
var labelImage2To = ui.Label({
  value: "至:",
  style:{
    height: "25px",
    margin: '10px 10px 0 10px',
    textAlign: "left",
    color: "#000000",
  },
});
var labelImage2EndYear = ui.Label({
  value: "年",
  style:{
    height: "25px",
    margin: '10px 20px 0 0',
    textAlign: "left",
    color: "#000000",
  },
});
var labelImage2EndMonth = ui.Label({
  value: "月",
  style:{
    height: "25px",
    margin: '10px 20px 0 0',
    textAlign: "left",
    color: "#000000",
  },
});
var labelImage2EndDate = ui.Label({
  value: "日",
  style:{
    height: "25px",
    margin: '10px 0 0 0',
    textAlign: "left",
    color: "#000000",
  },
});
// select the ending year for the first image
var selectImage2EndYear = ui.Select({
  items: yearList,
  style:{
    height: "30px",
    margin: '10px 5px 0 0px',
    textAlign: "left",
    color: "#000000",
  },
  value: "2021",
});
// select the ending month for the first image
var selectImage2EndMonth = ui.Select({
  items: monthList,
  style:{
    height: "30px",
    margin: '10px 5px 0 0',
    textAlign: "left",
    color: "#000000",
  },
  value: "09",
  onChange: function(key) {
    if ((key == "01")||(key == "03")||(key == "05")||(key == "07")||(key == "08")||(key == "10")||(key == "12")) {
      selectImage2EndDate.items().reset(dateList1); 
      selectImage2EndDate.setPlaceholder ("01");
    }
    else if ((key == "04")||(key == "06")||(key == "09")||(key == "11")) {
      selectImage2EndDate.items().reset(dateList2); 
      selectImage2EndDate.setPlaceholder ("01");
    }
    else if (key == "02"){
      selectImage2EndDate.items().reset(dateList3); 
      selectImage2EndDate.setPlaceholder ("01");
    }
  }
});
// select the ending date for the first image
var selectImage2EndDate = ui.Select({
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
// panel for determing the ending date of the first image
var panelImage2StartTime = ui.Panel({layout: ui.Panel.Layout.flow("horizontal")});
panelImage2StartTime.add(labelImage2From);
panelImage2StartTime.add(selectImage2StartYear);
panelImage2StartTime.add(labelImage2StartYear);
panelImage2StartTime.add(selectImage2StartMonth);
panelImage2StartTime.add(labelImage2StartMonth);
panelImage2StartTime.add(selectImage2StartDate);
panelImage2StartTime.add(labelImage2StartDate);
var panelImage2EndTime = ui.Panel({layout: ui.Panel.Layout.flow("horizontal")});
panelImage2EndTime.add(labelImage2To);
panelImage2EndTime.add(selectImage2EndYear);
panelImage2EndTime.add(labelImage2EndYear);
panelImage2EndTime.add(selectImage2EndMonth);
panelImage2EndTime.add(labelImage2EndMonth);
panelImage2EndTime.add(selectImage2EndDate);
panelImage2EndTime.add(labelImage2EndDate);
panelMain1.add(dateLabel);
panelMain1.add(labelImage1Time);
panelMain1.add(panelImage1StartTime);
panelMain1.add(panelImage1EndTime);
panelMain1.add(labelImage2Time);
panelMain1.add(panelImage2StartTime);
panelMain1.add(panelImage2EndTime);
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
      roirectangle = roi;
      // image acquistion time  
      var image1_start_time = selectImage1StartYear.getValue()+"-"+selectImage1StartMonth.getValue()+"-"+selectImage1StartDate.getValue();
      var image1_end_time = selectImage1EndYear.getValue()+"-"+selectImage1EndMonth.getValue()+"-"+selectImage1EndDate.getValue();
      var image2_start_time = selectImage2StartYear.getValue()+"-"+selectImage2StartMonth.getValue()+"-"+selectImage2StartDate.getValue();
      var image2_end_time = selectImage2EndYear.getValue()+"-"+selectImage2EndMonth.getValue()+"-"+selectImage2EndDate.getValue();
      // print('1',image1_start_time,image1_end_time);
      // print('2',image2_start_time,image2_end_time);
      if (image1_start_time >= image1_end_time) {labelMessage.setValue("灾前影像获取结束时间需晚于开始时间！")}
      else if (image2_start_time >= image2_end_time) {labelMessage.setValue("灾后影像获取结束时间需晚于开始时间！")}
      else if (image1_end_time >= image2_start_time) {labelMessage.setValue("灾后影像获取开始时间需晚于灾前影像获取结束时间！")}
      else {
        // lci threshold
        //var lci_t = sliderThreshold.getValue();
        labelMessage.setValue(" ")
        // run detection
        searchImage720(roi, 
          image1_start_time,image1_end_time,
          image2_start_time,image2_end_time);
      }
    }
  },
  disabled:false,
});
var panelDraw = ui.Panel({layout:ui.Panel.Layout.flow("horizontal")});
panelDraw.add(buttonRectangle);
panelDraw.add(buttonClear);
panelDraw.add(buttonSearch);
panelMain1.add(labelRegionSelection);
panelMain1.add(panelDraw);
panelMain1.add(labelBar2);
}
// //---------------------------choose choose choose ------------------------------------------------------------
//button for feng
var buttonFeng = ui.Button({
  label:"手动提取水体",
  style:{
    height: "30px",
    margin: '10px 0 0 40px',
    textAlign: "left",
    color: "#000000",
  },
  onClick:function(){
    clearRoi();
    Panelsilder.style().set('shown',true);
    S11VV = S11VV.clamp(-30,20);
      chartVV1 =
    ui.Chart.image.histogram({
      image: S11VV, 
      region: S11VV.geometry(), 
      scale: 10,
      maxBuckets:1000,
      maxPixels:1e13,
      minBucketWidth:0.2,
    });
  chartVV1.style().set('shown',false);
  Panelsilder.widgets().set(1, chartVV1);
  chartVH1 =
    ui.Chart.image.histogram({
      image: S11VH, 
      region: S11VH.geometry(), 
      scale: 10,
      maxBuckets:1000,
      maxPixels:1e13,
      minBucketWidth:0.2,
    });
  chartVH1.style().set('shown',false);
  Panelsilder.widgets().set(3, chartVH1);
    chartVH2 =
    ui.Chart.image.histogram({
      image: S12VH, 
      region: S12VH.geometry(), 
      scale: 10,
      maxBuckets:1000,
      maxPixels:1e13,
      minBucketWidth:0.2,
    });
  chartVH2.style().set('shown',false);
  Panelsilder.widgets().set(9, chartVH2);
  S12VV = S12VV.clamp(-40,20);
    chartVV2 =
    ui.Chart.image.histogram({
      image: S12VV, 
      region: S12VV.geometry(), 
      scale: 10,
      maxBuckets:1000,
      maxPixels:1e13,
      minBucketWidth:0.2,
    });
  chartVV2.style().set('shown',false);
  Panelsilder.widgets().set(7, chartVV2);
  // chartVH2 =
  //   ui.Chart.image.histogram({
  //     image: S12VH, 
  //     region: S12VH.geometry(), 
  //     scale: 10,
  //     maxBuckets:1000,
  //     maxPixels:1e13,
  //     minBucketWidth:0.2,
  //   });
  // chartVH2.style().set('shown',false);
  // Panelsilder.widgets().set(9, chartVH2);
    //labelImage1id.setValue(" ");
  },
  disabled:false,
});
//button for jia
var buttonJia = ui.Button({
  label:"自动提取水体",
  style:{
    height: "30px",
    margin: '10px 0 0 60px',
    textAlign: "left",
    color: "#000000",
  },
  onClick:function(){
        waterJIAbefore = jiashichao(S11VV,S11VH);
        waterJIAafter = jiashichao(S12VV,S12VH);
        waterJIA = waterJIAafter.subtract(waterJIAbefore);
        waterJIA = waterJIA.updateMask(waterJIA.gt(0));
        // waterJIA = waterJIA.reproject(proj,null,20);
        mapMain.addLayer(waterJIA,visflood2, "自动提取 洪涝范围");
        Panelsilder.style().set('shown',false);
        PanelPWI.style().set('shown',false);
  },
  disabled:false,
});
var panelChoose = ui.Panel({layout:ui.Panel.Layout.flow("horizontal")});
panelChoose.add(buttonFeng);
panelChoose.add(buttonJia);
panelMain.add(panelChoose);
// //---------------------------------------------------------------------------------------------------------------------
// //---------------------------silder silder silder ------------------------------------------------------------
// //---------------------------------------------------------------------------------------------------------------------
var labelSilderBefore = ui.Label({
  value: '洪涝前',
  style:{
    height: '30px',
    margin: '0 0 0 10px',
    textAlign: "left",
    color: "#000000",
    // shown:false
  },
});
var labelchartvv = ui.Label({
  value: '1111',
  style:{
    height: '5px',
    margin: '0 0 0 0',
    textAlign: "left",
    color: "#000000",
    shown:false
  },
});
var labelThresholdVV = ui.Label({
  value: "VV阈值:",
  style:{
    height: "30px",
    margin: '0px 0 0 10px',
    textAlign: "left",
    color: "#000000",
    fontWeight: "500",
  },
});
var sliderThresholdVV = ui.Slider({
  min: -30,
  max: 10,
  value: -17,
  step: 0.2,
  direction: 'horizontal',
  style:{
    height: "30px",
    width: "180px",
    margin: '5px 0 0 5px',
    textAlign: "left",
    color: "#000000",
  },
});
var VVButton = ui.Button({
  label:"查看",
  style:{
    height: "30px",
    margin: '0px 0 0 20px',
    textAlign: "left",
    color: "#000000"
  },
    onClick:function(){
        // PanelhideVV1.style().set('shown',true);
  //     S11VV = S11VV.clamp(-30,20)
  //     var chartvvvh =
  //   ui.Chart.image.histogram({
  //     image: S11VV, 
  //     region: S11VV.geometry(), 
  //     scale: 10,
  //     maxBuckets:1000,
  //     maxPixels:1e13,
  //     minBucketWidth:0.5,
  //   })
  // Panelsilder.widgets().set(1, chartvvvh);
  chartVV1.style().set('shown',true);
  }
});
var Panelsilder = ui.Panel({layout: ui.Panel.Layout.flow("vertical"),style:{shown:false},});
Panelsilder.add(labelSilderBefore);
Panelsilder.add(labelchartvv);
var PanelsilderVV1 = ui.Panel({layout: ui.Panel.Layout.flow("horizontal")});
PanelsilderVV1.add(labelThresholdVV);
PanelsilderVV1.add(sliderThresholdVV);
PanelsilderVV1.add(VVButton);
Panelsilder.add(PanelsilderVV1);
panelMain.add(Panelsilder);
var labelchartvh = ui.Label({
  value: '1111',
  style:{
    height: '5px',
    margin: '0 0 0 10px',
    textAlign: "left",
    color: "#000000",
    shown:false
  },
});
var labelThresholdVH = ui.Label({
  value: "VH阈值:",
  style:{
    height: "30px",
    margin: '0px 0 0 10px',
    textAlign: "left",
    color: "#000000",
    fontWeight: "500",
  },
});
var sliderThresholdVH = ui.Slider({
  min: -30,
  max: 10,
  value: -24,
  step: 0.2,
  direction: 'horizontal',
  style:{
    height: "30px",
    width: "180px",
    margin: '5px 0 0 5px',
    textAlign: "left",
    color: "#000000",
  },
});
var VHButton = ui.Button({
  label:"查看",
  style:{
    height: "30px",
    margin: '0px 0 0 20px',
    textAlign: "left",
    color: "#000000"
  },
    onClick:function(){
        // PanelhideVH1.style().set('shown',true);
      // S11VV = S11VH.clamp(-30,20)
  //     var chartvvvh =
  //   ui.Chart.image.histogram({
  //     image: S11VH, 
  //     region: S11VH.geometry(), 
  //     scale: 10,
  //     maxBuckets:1000,
  //     maxPixels:1e13,
  //     minBucketWidth:0.5,
  //   })
  // Panelsilder.widgets().set(3, chartvvvh);
    chartVH1.style().set('shown',true);
  }
});
var dsButton = ui.Button({
  label:"确认",
  style:{
    height: "30px",
    margin: '0px 0 0 20px',
    textAlign: "left",
    color: "#000000"
  },
    onClick:function(){
    VVThreshold = sliderThresholdVV.getValue();
    VHThreshold = sliderThresholdVH.getValue();
    SUBThreshold = ee.Number(VVThreshold).subtract(ee.Number(VHThreshold));
    imgPWI = getVmin(S11VV,S11VH,SUBThreshold);
    // mapMain.addLayer(imgPWI,{},'imgPWI',false)
    imgPWI = imgPWI.updateMask(imgPWI.gt(ee.Number(0)));
    var chartvmin =
    ui.Chart.image.histogram({
      image: imgPWI, 
      region: imgPWI.geometry(), 
      scale: 10,
      maxBuckets:1000,
      maxPixels:1e13,
      minBucketWidth:0.06,
    });
  // print('chartvmin',chartvmin);
  PanelPWI.widgets().set(0, chartvmin);
  }
});
var labelBar3 = ui.Label({
  value: '=========================================',
  style:{
    margin: '0 0 0 10px',
    textAlign: "left",
    color: "red",
  },
});
Panelsilder.add(labelchartvh);
var PanelsilderVH = ui.Panel({layout: ui.Panel.Layout.flow("horizontal")});
PanelsilderVH.add(labelThresholdVH);
PanelsilderVH.add(sliderThresholdVH);
PanelsilderVH.add(VHButton);
Panelsilder.add(PanelsilderVH);
Panelsilder.add(labelBar3);
// //---------------------------------------------------------------------------------------------------------------------
var labelSilderAfter = ui.Label({
  value: '洪涝后',
  style:{
    height: '30px',
    margin: '0 0 0 10px',
    textAlign: "left",
    color: "#000000",
    // shown:false
  },
});
var labelchartvv2 = ui.Label({
  value: '1111',
  style:{
    height: '5px',
    margin: '10px 0 0 10px',
    textAlign: "left",
    color: "#000000",
    shown:false
  },
});
var labelThresholdVV2 = ui.Label({
  value: "VV阈值:",
  style:{
    height: "30px",
    margin: '0px 0 0 10px',
    textAlign: "left",
    color: "#000000",
    fontWeight: "500",
  },
});
var sliderThresholdVV2 = ui.Slider({
  min: -30,
  max: 10,
  value: -17,
  step: 0.2,
  direction: 'horizontal',
  style:{
    height: "30px",
    width: "180px",
    margin: '5px 0 0 5px',
    textAlign: "left",
    color: "#000000",
  },
});
var VVButton2 = ui.Button({
  label:"查看",
  style:{
    height: "30px",
    margin: '0px 0 0 20px',
    textAlign: "left",
    color: "#000000"
  },
    onClick:function(){
      S11VV = S12VV.clamp(-30,20)
      var chartvvvh =
    ui.Chart.image.histogram({
      image: S12VV, 
      region: S12VV.geometry(), 
      scale: 10,
      maxBuckets:1000,
      maxPixels:1e13,
      minBucketWidth:0.5,
    })
  Panelsilder.widgets().set(7, chartvvvh);
  }
});
Panelsilder.add(labelSilderAfter);
Panelsilder.add(labelchartvv2);
var PanelsilderVV2 = ui.Panel({layout: ui.Panel.Layout.flow("horizontal")});
PanelsilderVV2.add(labelThresholdVV2);
PanelsilderVV2.add(sliderThresholdVV2);
PanelsilderVV2.add(VVButton2);
Panelsilder.add(PanelsilderVV2);
var labelchartvh2 = ui.Label({
  value: '1111',
  style:{
    height: '5px',
    margin: '0 0 0 10px',
    textAlign: "left",
    color: "#000000",
    shown:false
  },
});
var labelThresholdVH2 = ui.Label({
  value: "VH阈值:",
  style:{
    height: "30px",
    margin: '0px 0 0 10px',
    textAlign: "left",
    color: "#000000",
    fontWeight: "500",
  },
});
var sliderThresholdVH2 = ui.Slider({
  min: -30,
  max: 10,
  value: -24,
  step: 0.2,
  direction: 'horizontal',
  style:{
    height: "30px",
    width: "180px",
    margin: '5px 0 0 5px',
    textAlign: "left",
    color: "#000000",
  },
});
var VHButton2 = ui.Button({
  label:"查看",
  style:{
    height: "30px",
    margin: '0px 0 0 20px',
    textAlign: "left",
    color: "#000000"
  },
    onClick:function(){
      // S11VV = S11VH.clamp(-30,20)
      var chartvvvh =
    ui.Chart.image.histogram({
      image: S12VH, 
      region: S12VH.geometry(), 
      scale: 10,
      maxBuckets:1000,
      maxPixels:1e13,
      minBucketWidth:0.5,
    });
  Panelsilder.widgets().set(9, chartvvvh);
  }
});
Panelsilder.add(labelchartvh2);
var PanelsilderVH2 = ui.Panel({layout: ui.Panel.Layout.flow("horizontal")});
PanelsilderVH2.add(labelThresholdVH2);
PanelsilderVH2.add(sliderThresholdVH2);
PanelsilderVH2.add(VHButton2);
Panelsilder.add(PanelsilderVH2);
var deltaButton = ui.Button({
  label:"确 认",
  style:{
    height: "30px",
    width:"120px",
    margin: '0px 0 0 100px',
    textAlign: "left",
    color: "#000000"
  },
    onClick:function(){
    VVThreshold = sliderThresholdVV.getValue();
    VHThreshold = sliderThresholdVH.getValue();
    SUBThreshold = ee.Number(VVThreshold).subtract(ee.Number(VHThreshold));
    VVThreshold2 = sliderThresholdVV2.getValue();
    VHThreshold2 = sliderThresholdVH2.getValue();
    SUBThreshold2 = ee.Number(VVThreshold2).subtract(ee.Number(VHThreshold2));
    imgPWI = getVmin(S11VV,S11VH,SUBThreshold);
    imgPWI2 = getVmin(S12VV,S12VH,SUBThreshold2);
    imgPWI = imgPWI.updateMask(imgPWI.gt(ee.Number(0)));
    imgPWI2 = imgPWI2.updateMask(imgPWI2.gt(ee.Number(0)));
    PanelPWI.style().set('shown',true)
    imgPWI = imgPWI.clamp(2,10)
    chartVmin1 =ui.Chart.image.histogram({
      image: imgPWI, 
      region: imgPWI.geometry(), 
      scale: 10,
      maxBuckets:1000,
      maxPixels:1e13,
      minBucketWidth:0.05,
    });
  PanelPWI.widgets().set(0, chartVmin1);
  chartVmin1.style().set('shown',false);
  imgPWI2 = imgPWI2.clamp(2,10)
  chartVmin2 =ui.Chart.image.histogram({
      image: imgPWI2, 
      region: imgPWI2.geometry(), 
      scale: 10,
      maxBuckets:1000,
      maxPixels:1e13,
      minBucketWidth:0.05,
    });
  PanelPWI.widgets().set(2, chartVmin2);
  chartVmin2.style().set('shown',false);
  //   // mapMain.addLayer(imgPWI,{},'imgPWI',false)
  //   imgPWI = imgPWI.updateMask(imgPWI.gt(ee.Number(0)));
  //   var chartvmin =
  //   ui.Chart.image.histogram({
  //     image: imgPWI, 
  //     region: imgPWI.geometry(), 
  //     scale: 10,
  //     maxBuckets:1000,
  //     maxPixels:1e13,
  //     minBucketWidth:0.05,
  //   });
  // // print('chartvmin',chartvmin);
  // PanelPWI.widgets().set(0, chartvmin);
  // var chartvmin2 =
  //   ui.Chart.image.histogram({
  //     image: imgPWI2, 
  //     region: imgPWI2.geometry(), 
  //     scale: 10,
  //     maxBuckets:1000,
  //     maxPixels:1e13,
  //     minBucketWidth:0.05,
  //   });
  // PanelPWI.widgets().set(2, chartvmin2);
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
Panelsilder.add(deltaButton);
Panelsilder.add(labelBar4);
// //---------------------------------------------------------------------------------------------------------------------
// //---------------------------imgPWI imgPWI imgPWI imgPWI ------------------------------------------------------------
// //---------------------------------------------------------------------------------------------------------------------
var labelchartpwi = ui.Label({
  value: '1111',
  style:{
    height: '5px',
    margin: '0 0 0 10px',
    textAlign: "left",
    color: "#000000",
    shown:false
  },
});
var labelPWI = ui.Label({
  value: "洪涝前 水体阈值:",
  style:{
    height: "30px",
    margin: '0px 0 0 10px',
    textAlign: "left",
    color: "#000000",
    fontWeight: "500",
  },
});
var textThresholdPWI = ui.Textbox({
  // placeholder:"输入 洪涝前影像 PWI阈值",
  value:'6.25',
  style:{
    margin: '10px 0 0 10px',
    width:'80px',
    fontSize: '18px',
    textAlign: "left",
    color: "#b10d02",
    fontWeight: 'bold',
  },
});
var PWIButton = ui.Button({
  label:"查看",
  style:{
    height: "30px",
    margin: '5px 0 0 20px',
    textAlign: "left",
    color: "#000000"
  },
    onClick:function(){
      // S11VV = S11VH.clamp(-30,20)
// var chartvmin =
//     ui.Chart.image.histogram({
//       image: imgPWI, 
//       region: imgPWI.geometry(), 
//       scale: 10,
//       maxBuckets:1000,
//       maxPixels:1e13,
//       minBucketWidth:0.05,
//     });
//   PanelPWI.widgets().set(0, chartvmin);
  chartVmin1.style().set('shown',true);
  }
});
var labelchartpwi2 = ui.Label({
  value: '1111',
  style:{
    height: '5px',
    margin: '0 0 0 10px',
    textAlign: "left",
    color: "#000000",
    shown:false
  },
});
var labelPWI2 = ui.Label({
  value: "洪涝后 水体阈值:",
  style:{
    height: "30px",
    margin: '0px 0 0 10px',
    textAlign: "left",
    color: "#000000",
    fontWeight: "500",
  },
});
var textThresholdPWI2 = ui.Textbox({
  // placeholder:"输入 洪涝后影像 PWI阈值",
  value:'6.25',
  style:{
    width:'80px',
    margin: '10px 0 0 10px',
    fontSize: '18px',
    textAlign: "left",
    color: "#b10d02",
    fontWeight: 'bold',
  },
});
var PWIButton2 = ui.Button({
  label:"查看",
  style:{
    height: "30px",
    margin: '5px 0 0 20px',
    textAlign: "left",
    color: "#000000"
  },
    onClick:function(){
      // S11VV = S11VH.clamp(-30,20)
// var chartvmin =
//     ui.Chart.image.histogram({
//       image: imgPWI2, 
//       region: imgPWI2.geometry(), 
//       scale: 10,
//       maxBuckets:1000,
//       maxPixels:1e13,
//       minBucketWidth:0.05,
//     });
//   PanelPWI.widgets().set(2, chartvmin);
  chartVmin2.style().set('shown',true);
  }
});
var waterButtonPWI = ui.Button({
  label:"提取水体",
  style:{
    height: "30px",
    width:"120px",
    margin: '10px 0 0 100px',
    textAlign: "left",
    color: "#000000"
  },
    onClick:function(){
      // mapMain.centerObject(roirectangle,12);
      PWIThreshold = ee.Number.parse((textThresholdPWI.getValue()));
      // print(PWIThreshold);
      water = imgPWI.gt(PWIThreshold).clip(roirectangle);
      PWIThreshold2 = ee.Number.parse((textThresholdPWI2.getValue()));
      // print(PWIThreshold2);
      water2 = imgPWI2.gt(PWIThreshold2).clip(roirectangle);
      PWIFlood = water2.subtract(water);
      // print('PWIFlood',PWIFlood);
      PWIFlood = PWIFlood.updateMask(PWIFlood.gt(0));
      // mapMain.addLayer(water,{},'water',true);
      // mapMain.addLayer(water2,{},'water2',true);
      mapMain.addLayer(PWIFlood,visflood,'手动提取 洪涝范围',true);
      // var waterpro = water.reproject(proj,null,10); 
      // print('waterpro',waterpro);
      // mapMain.addLayer(water,{},'water',true);
      // mapMain.addLayer(waterpro,{},'waterpro',false);
      // Export.image.toDrive({
      //   image: water,
      //   description: "waterDrive",
      //   fileNamePrefix: "water",
      //   crs:'EPSG:32649',
      //   scale: 10,
      //   region: water.geometry(),
      //   maxPixels: 1e13
      // });
  }
});
var labelBar5 = ui.Label({
  value: '______________________________________________',
  style:{
    margin: '0 0 0 10px',
    textAlign: "left",
    color: "#000000",
  },
});
var PanelPWI = ui.Panel({layout: ui.Panel.Layout.flow("vertical"),style:{shown:false}});
PanelPWI.add(labelchartpwi);
var PanelPWItext = ui.Panel({layout: ui.Panel.Layout.flow("horizontal")});
PanelPWItext.add(labelPWI);
PanelPWItext.add(textThresholdPWI);
PanelPWItext.add(PWIButton);
var PanelPWItext2 = ui.Panel({layout: ui.Panel.Layout.flow("horizontal")});
PanelPWItext2.add(labelPWI2);
PanelPWItext2.add(textThresholdPWI2);
PanelPWItext2.add(PWIButton2);
PanelPWI.add(PanelPWItext);
PanelPWI.add(labelchartpwi2);
PanelPWI.add(PanelPWItext2);
PanelPWI.add(waterButtonPWI);
PanelPWI.add(labelBar5);
panelMain.add(PanelPWI);
// //---------------------------------------------------------------------------------------------------------------------
// //---------------------------tishi提示------------------------------------------------------------
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
panelMain.add(labelMessagetitle);
panelMain.add(labelMessage);
// //---------------------------------------------------------------------------------------------------------------------
// //---------------------------贾 贾 贾 贾------------------------------------------------------------
// //---------------------------------------------------------------------------------------------------------------------
var waterButtonJIA = ui.Button({
  label:"贾",
  style:{
    height: "30px",
    margin: '10px 0 0 20px',
    textAlign: "left",
    color: "#000000",
    shown:true,
  },
    onClick:function(){
      waterJIA = jiashichao(S11VV,S11VH);
      mapMain.addLayer(waterJIA,{},'JIA',false);
      // Export.image.toDrive({
      //   image: waterJIA,
      //   description: "waterJIADrive",
      //   fileNamePrefix: "waterJIA",
      //   crs:'EPSG:32649',
      //   scale: 10,
      //   region: waterJIA.geometry(),
      //   maxPixels: 1e13
      // });
  }
});
var PanelJIA = ui.Panel({layout: ui.Panel.Layout.flow("horizontal")});
// PanelJIA.add(waterButtonJIA);
panelMain.add(PanelJIA);
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
function searchImage720(roi,image_start_time1, image_end_time1,image_start_time2, image_end_time2)
{
    // clear all the existing rois and layers
    clearRoi(); 
    clearLayers();
    mapMain.centerObject(roirectangle,11);
  var image1col = ee.ImageCollection('COPERNICUS/S1_GRD')
                .filterBounds(roi)
                .filterDate(image_start_time1, image_end_time1)
                .filter(ee.Filter.eq('instrumentMode', 'IW'))
                // .select('V.*')
  var image2col = ee.ImageCollection('COPERNICUS/S1_GRD')
                .filterBounds(roi)
                .filterDate(image_start_time2, image_end_time2)
                .filter(ee.Filter.eq('instrumentMode', 'IW'))
  if (image1col.size().getInfo()===0) 
  {labelMessage.setValue("发生洪涝前 没有满足条件的遥感影像！")}
  else if (image2col.size().getInfo()===0) 
  {labelMessage.setValue("发生洪涝后 没有满足条件的遥感影像！")}
  else{
labelMessage.setValue("  ")
    print('image1col',image1col);
    print('image2col',image2col);
    var imgmos1 = image1col.mosaic().clip(roi);
    var imgmos2 = image2col.mosaic().clip(roi);
    mapMain.addLayer(imgmos1,{min: -25, max: 5}, "洪涝前 微波影像",false); 
    mapMain.addLayer(imgmos2,{min: -25, max: 5}, "洪涝后 微波影像",true); 
    // print('imgmos1',imgmos1);
    // print('imgmos2',imgmos2);
    proj = imgmos1.select(0).projection();
    // print('proj',proj);
    imgmos1 = medianFilter(imgmos1);
    imgmos2 = medianFilter(imgmos2);
    S11 = imgmos1;
    S12 = imgmos2;
    // var s11vvre = RefinedLee(imgmos1.select('VV')).select("VV_spk");
    S11VV = RefinedLee(imgmos1.select('VV')).select("VV_spk");
    // var s11vhre = RefinedLee(imgmos1.select('VH')).select("VH_spk");
    S11VH = RefinedLee(imgmos1.select('VH')).select("VH_spk");
    S12VV = RefinedLee(imgmos2.select('VV')).select("VV_spk");
    S12VH = RefinedLee(imgmos2.select('VH')).select("VH_spk");
  }
}
function toNatural(img) {
 return ee.Image(10.0).pow(img.divide(10.0)).select('V.*');
}
function toDB(img) {
 return ee.Image(img).log10().multiply(10.0);
}
function medianFilter(img){
  var kernelpx = ee.Kernel.square(2,'pixels',false);
  var imgmedian = img.focal_median({kernel: kernelpx, iterations: 1});
  return imgmedian;
}
// The refined lee speckle filter
function RefinedLee(img) {
  // img must be in natural units, i.e. not in dB!
  // Set up 3x3 kernels 
  var weights3 = ee.List.repeat(ee.List.repeat(1,3),3);
  var kernel3 = ee.Kernel.fixed(3,3, weights3, 1, 1, false);
  var mean3 = img.reduceNeighborhood(ee.Reducer.mean(), kernel3);
  var variance3 = img.reduceNeighborhood(ee.Reducer.variance(), kernel3);
  // Use a sample of the 3x3 windows inside a 7x7 windows to determine gradients and directions
  var sample_weights = ee.List([[0,0,0,0,0,0,0], [0,1,0,1,0,1,0],
                               [0,0,0,0,0,0,0], [0,1,0,1,0,1,0], [0,0,0,0,0,0,0], 
                               [0,1,0,1,0,1,0],[0,0,0,0,0,0,0]]);
  var sample_kernel = ee.Kernel.fixed(7,7, sample_weights, 3,3, false);
  // Calculate mean and variance for the sampled windows and store as 9 bands
  var sample_mean = mean3.neighborhoodToBands(sample_kernel); 
  var sample_var = variance3.neighborhoodToBands(sample_kernel);
  // Determine the 4 gradients for the sampled windows
  var gradients = sample_mean.select(1).subtract(sample_mean.select(7)).abs();
  gradients = gradients.addBands(sample_mean.select(6).subtract(sample_mean.select(2)).abs());
  gradients = gradients.addBands(sample_mean.select(3).subtract(sample_mean.select(5)).abs());
  gradients = gradients.addBands(sample_mean.select(0).subtract(sample_mean.select(8)).abs());
  // And find the maximum gradient amongst gradient bands
  var max_gradient = gradients.reduce(ee.Reducer.max());
  // Create a mask for band pixels that are the maximum gradient
  var gradmask = gradients.eq(max_gradient);
  // duplicate gradmask bands: each gradient represents 2 directions
  gradmask = gradmask.addBands(gradmask);
  // Determine the 8 directions
  var directions = sample_mean.select(1).subtract(sample_mean.select(4))
                   .gt(sample_mean.select(4).subtract(sample_mean.select(7))).multiply(1);
  directions = directions.addBands(sample_mean.select(6).subtract(sample_mean.select(4))
               .gt(sample_mean.select(4).subtract(sample_mean.select(2))).multiply(2));
  directions = directions.addBands(sample_mean.select(3).subtract(sample_mean.select(4))
               .gt(sample_mean.select(4).subtract(sample_mean.select(5))).multiply(3));
  directions = directions.addBands(sample_mean.select(0).subtract(sample_mean.select(4))
               .gt(sample_mean.select(4).subtract(sample_mean.select(8))).multiply(4));
  // The next 4 are the not() of the previous 4
  directions = directions.addBands(directions.select(0).not().multiply(5));
  directions = directions.addBands(directions.select(1).not().multiply(6));
  directions = directions.addBands(directions.select(2).not().multiply(7));
  directions = directions.addBands(directions.select(3).not().multiply(8));
  // Mask all values that are not 1-8
  directions = directions.updateMask(gradmask);
  // "collapse" the stack into a singe band image (due to masking, 
  //each pixel has just one value (1-8) in it's directional band, and is otherwise masked)
  directions = directions.reduce(ee.Reducer.sum());  
  //var pal = ['ffffff','ff0000','ffff00', '00ff00', '00ffff', '0000ff', 'ff00ff', '000000'];
  //Map.addLayer(directions.reduce(ee.Reducer.sum()), {min:1, max:8, palette: pal}, 'Directions', false);
  var sample_stats = sample_var.divide(sample_mean.multiply(sample_mean));
  // Calculate localNoiseVariance
  var sigmaV = sample_stats.toArray().arraySort().arraySlice(0,0,5)
                            .arrayReduce(ee.Reducer.mean(), [0]);
  // Set up the 7*7 kernels for directional statistics
  var rect_weights = ee.List.repeat(ee.List.repeat(0,7),3)
                       .cat(ee.List.repeat(ee.List.repeat(1,7),4));
  var diag_weights = ee.List([[1,0,0,0,0,0,0], [1,1,0,0,0,0,0], [1,1,1,0,0,0,0], 
    [1,1,1,1,0,0,0], [1,1,1,1,1,0,0], [1,1,1,1,1,1,0], [1,1,1,1,1,1,1]]);
  var rect_kernel = ee.Kernel.fixed(7,7, rect_weights, 3, 3, false);
  var diag_kernel = ee.Kernel.fixed(7,7, diag_weights, 3, 3, false);
  // Create stacks for mean and variance using the original kernels. Mask with relevant direction.
  var dir_mean = img.reduceNeighborhood(ee.Reducer.mean(), rect_kernel)
                    .updateMask(directions.eq(1));
  var dir_var = img.reduceNeighborhood(ee.Reducer.variance(), rect_kernel)
                   .updateMask(directions.eq(1));
  dir_mean = dir_mean.addBands(img.reduceNeighborhood(ee.Reducer.mean(), diag_kernel)
                     .updateMask(directions.eq(2)));
  dir_var = dir_var.addBands(img.reduceNeighborhood(ee.Reducer.variance(), diag_kernel)
                   .updateMask(directions.eq(2)));
  // and add the bands for rotated kernels
  for (var i=1; i<4; i++) {
    dir_mean = dir_mean.addBands(img.reduceNeighborhood(ee.Reducer.mean(), rect_kernel.rotate(i))
                       .updateMask(directions.eq(2*i+1)));
    dir_var = dir_var.addBands(img.reduceNeighborhood(ee.Reducer.variance(), rect_kernel.rotate(i))
                     .updateMask(directions.eq(2*i+1)));
    dir_mean = dir_mean.addBands(img.reduceNeighborhood(ee.Reducer.mean(), diag_kernel.rotate(i))
                       .updateMask(directions.eq(2*i+2)));
    dir_var = dir_var.addBands(img.reduceNeighborhood(ee.Reducer.variance(), diag_kernel.rotate(i))
                     .updateMask(directions.eq(2*i+2)));}
  // "collapse" the stack into a single band image (due to masking, 
  //each pixel has just one value in it's directional band, and is otherwise masked)
  dir_mean = dir_mean.reduce(ee.Reducer.sum());
  dir_var = dir_var.reduce(ee.Reducer.sum());
  // A finally generate the filtered value
  var varX = dir_var.subtract(dir_mean.multiply(dir_mean).multiply(sigmaV))
                    .divide(sigmaV.add(1.0));
  var b = varX.divide(dir_var);
  var result = ee.Image(dir_mean.add(b.multiply(img.subtract(dir_mean))));
  var imgbn = img.bandNames().get(0);
  return img.addBands(result.arrayGet([0]).rename(ee.String(imgbn).cat("_spk")), null, true);
}
function getVmin(imgvv,imgvh,sub)
{
  imgvv = imgvv.subtract(sub);
  var imgmin = imgvv.min(imgvh);
  imgmin = imgmin.multiply(imgmin);
  imgmin = imgmin.log();
  return imgmin;
}
function jiashichao(imgvv,imgvh)
{
  var temp = imgvv.multiply(imgvh).multiply(10);
  var temp2 = temp.log().subtract(8);
  var tempwater = temp2.gt(0).clip(roirectangle).unmask();
  return tempwater;
}
//aaa
var roirectangle;
var S11; var S12; 
var S11VV;var S11VH;
var S12VV;var S12VH;
var polygonNumber = 0;
var VVThreshold; var VVThreshold2;
var VHThreshold; var VHThreshold2;
var SUBThreshold; var SUBThreshold2;
var imgPWI; var imgPWI2;
var PWIThreshold; var PWIThreshold2;
var water;  var water2;
var PWIFlood;
var waterJIA;
var waterJIAbefore;
var waterJIAafter;
var proj;
var chartVV1; var chartVH1;
var chartVV2; var chartVH2;
var chartVmin1;  var chartVmin2;
var vizS1 = {bands:['VV_spk','VH_spk','VV_spk'], min: -25, max: -5, gamma:1};
var visflood = {palette: ['red']}
var visflood2 = {palette: ['yellow']}