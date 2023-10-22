//全局变量
var geometry = 
    /* color: #98ff00 */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[121.66519276978242, 41.00960022267085],
          [121.66519276978242, 40.83111820261983],
          [122.02224843384492, 40.83111820261983],
          [122.02224843384492, 41.00960022267085]]], null, false);
var dataset;
// 设置PANELS
// 左侧控制 panel
var controlPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical'),
    style: { width: '340px' }
});
// 区域范围 panel
var fanweiLabel = ui.Label('绘制区域范围', { fontWeight: 'bold' });
// var editButton = ui.Button({ label: '编辑' });
// editButton.style().set('stretch', 'horizontal');
var submitButton = ui.Button({ label: '确认', style:{ color:'#3366cc'} });
submitButton.style().set('stretch', 'horizontal');
var clearButton = ui.Button({ label: '清除' , style:{ color:'red'}});
clearButton.style().set('stretch', 'horizontal');
var fanweiPanel = ui.Panel(
    [
        fanweiLabel,
        ui.Panel([submitButton, clearButton], ui.Panel.Layout.Flow('horizontal'))
    ]
);
// 设置参数PANELS
// years panel
var d = new Date();
var y = d.getFullYear();
var yearSectionLabel = ui.Label('年份跨度', { fontWeight: 'bold' });
var startYearLabel = ui.Label('起始年:');
var startYearslider = ui.Slider({ min: 1984, max: y, value: 2018, step: 1 });
startYearslider.style().set('stretch', 'horizontal');
var endYearLabel = ui.Label('终止年:');
var endYearslider = ui.Slider({ min: 1984, max: y, value: y - 1, step: 1 });
endYearslider.style().set('stretch', 'horizontal');
var yearsPanel = ui.Panel(
    [
        yearSectionLabel,
        ui.Panel([startYearLabel, startYearslider], ui.Panel.Layout.Flow('horizontal'), { stretch: 'horizontal' }), //
        ui.Panel([endYearLabel, endYearslider], ui.Panel.Layout.Flow('horizontal'), { stretch: 'horizontal' })
    ]
);
// date panel
var dateSectionLabel = ui.Label('月份跨度', { fontWeight: 'bold' });
var startDayLabel = ui.Label('起始月:');
var startDayBox = ui.Textbox({ value: 6 });
startDayBox.style().set('stretch', 'horizontal');
var endDayLabel = ui.Label('终止月:');
var endDayBox = ui.Textbox({ value: 10 });
endDayBox.style().set('stretch', 'horizontal');
var datesPanel = ui.Panel(
    [
        dateSectionLabel,
        ui.Panel(
            [startDayLabel, startDayBox],
            ui.Panel.Layout.Flow('horizontal'), { stretch: 'horizontal' }
        ),
        ui.Panel(
            [endDayLabel, endDayBox],
            ui.Panel.Layout.Flow('horizontal'), { stretch: 'horizontal' }
        )
    ],null
);
//合成区间
var datehechengLabel = ui.Label('合成区间', { fontWeight: 'bold',stretch: 'horizontal' });
var dataselect = ui.Select({items :["月","旬"],value:"月", style:{stretch: 'horizontal'}});
var qujianPanel=ui.Panel(
  [
    datehechengLabel,dataselect
    ]//, ui.Panel.Layout.Flow('horizontal')
    // ,{border :'1px solid blue'}
    )
// index panel
var indexList = [['NDVI', -1], ['EVI', -1], ['NDTI', -1], ['NDSVI', -1],
['YELLOW', 1], ['GREEN', -1], ['RED', 1], ['Wetness', 1],
['MSAVI', 1], ['SSVI', -1], ['Brightness', 1]];
var indexBox = [];
indexList.forEach(function (name, index) {
    var checkBox = ui.Checkbox(name[0]);
    indexBox.push(checkBox);
});
var indexPanelLabel = ui.Label('选择指数/波段', { fontWeight: 'bold' });
var indexPanel = ui.Panel(
    [
        ui.Panel([indexBox[0], indexBox[4], indexBox[8]], null, { stretch: 'horizontal' }),
        ui.Panel([indexBox[1], indexBox[5], indexBox[9]], null, { stretch: 'horizontal' }),
        ui.Panel([indexBox[2], indexBox[6], indexBox[10]], null, { stretch: 'horizontal' }),
        ui.Panel([indexBox[3], indexBox[7]], null, { stretch: 'horizontal' })
    ],
    ui.Panel.Layout.Flow('horizontal'), { stretch: 'horizontal' }
);
indexBox[0].setValue(1);
indexBox[4].setValue(1);
indexBox[5].setValue(1);
// 确认 panel
var querenjiheLabel = ui.Label('获取影像数据并计算', { fontWeight: 'bold' });
var bigsubmitButton = ui.Button({ label: '确认' , style:{stretch: 'horizontal', color:'#3366cc'}});
// bigsubmitButton.style().set('stretch', 'horizontal');
var dataview = ui.Select({items :[],placeholder: "显示影像",value:null, style:{stretch: 'horizontal', color:'#3366cc'}});
var shujujiheLabel = ui.Label('数据集合', { fontWeight: 'bold' });
var getimage11=ui.Panel(
  [
    querenjiheLabel,bigsubmitButton,shujujiheLabel,dataview
    ]//, ui.Panel.Layout.Flow('horizontal')
    // ,{border :'1px solid blue'}
    )
var canshukuang=ui.Panel(
  [
    fanweiPanel,yearsPanel,datesPanel,qujianPanel
    ], ui.Panel.Layout.Flow('vertical')
     ,{border :'3px solid black'}
    )
// controlPanel.add(fanweiPanel);
// controlPanel.add(yearsPanel);
// controlPanel.add(datesPanel);
// controlPanel.add(qujianPanel);
controlPanel.add(canshukuang);
// controlPanel.add(indexPanelLabel);
// controlPanel.add(indexPanel);
// controlPanel.add(bigsubmitButton);
controlPanel.add(getimage11);
//右侧panel
var plotsPanelLabel = ui.Label('指标时间序列图', { fontWeight: 'bold', stretch: 'horizontal' });
var plotPanel = ui.Panel(null, null, { stretch: 'horizontal' });
// controlPanel.add(indexPanelLabel);
// controlPanel.add(indexPanel);
var plotPanelParent = ui.Panel([plotsPanelLabel,indexPanelLabel,indexPanel, plotPanel], null, { width: '480px' });
// 地图
var map = ui.Map();
map.style().set({ cursor: 'crosshair' });
map.setOptions('HYBRID');
map.setCenter(121.8, 40.9, 11);
map.setControlVisibility({
    zoomControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    layerList: true, drawingToolsControl: true
})
//矢量编辑工具
map.drawingTools().setLinked(false);
map.drawingTools().setDrawModes(['polygon', 'rectangle']);
print("旧的", ui.root.widgets())
ui.root.clear();
ui.root.add(controlPanel);
ui.root.add(map);
ui.root.add(plotPanelParent);
print("新的", ui.root.widgets())
//####################################################################################
//########### 绑定事件#################################################################
//####################################################################################
function getlayerindex(map,name){
  var index;
  for(var i=0;i<map.layers().length();i++){
    if(map.layers().get(i).getName()==name){
      index=i;
    }
  }
  return index;
  // map.layers().forEach(function(layer){
  //   if(ee.Algorithms.IsEqual(layer.getName(), name)){
  //     return 
  //   }
  // })
}
function extain(map,name){
  var ex=false;
  for(var i=0;i<map.layers().length();i++){
    if(map.layers().get(i).getName()==name){
      ex=true;
    }
  }
  return ex;
}
var keshihuacanshu={
  bands: ['B4', 'B3', 'B2'],
  min: 0,
  max: 3000,
  gamma: 1.4,
};
dataview.onChange(function(key) {
   var image = ee.Image(ee.ImageCollection(dataset).filter(ee.Filter.eq("time", key)).first());
   print(image)
   if(extain(map,"图像")){
      map.layers().set(getlayerindex(map,"图像"), ui.Map.Layer(image,keshihuacanshu, "图像"));
    }
    else{
      map.addLayer(image,keshihuacanshu,"图像")
    }
})
// plot for clicked point on map
map.onClick(function (coords) {
    var x = coords.lon;
    var y = coords.lat;
    var point = ee.Geometry.Point(coords.lon, coords.lat);  
    // map.addLayer(point, {color: "blue"}, "clickPoint");
    if(extain(map,"clickPoint")){
      map.layers().set(getlayerindex(map,"clickPoint"), ui.Map.Layer(point, {color: "blue"}, "clickPoint"));
    }
    else{
      map.addLayer(point, {color: "blue"},"clickPoint")
    }
    // map.layers().set(99, ui.Map.Layer(point, {color: "blue"}, "clickPoint"));
    print("index",getlayerindex(map,"clickPoint"))
    // print("坐标为: " + coords.lon + " " + coords.lat); 
    var tishi= ui.Label("坐标为:<" + coords.lon + " " + coords.lat+">")
    if(dataset===undefined){
      // plotPanel = plotPanel.clear();
       tishi= ui.Label("坐标为:<" + coords.lon + " " + coords.lat+">无数据")
      plotPanel.add(tishi);
      return;}
      // get the indices that are checked
  var doTheseIndices = [];
  indexBox.forEach(function(name, index) {
    var isChecked = indexBox[index].getValue();
    if(isChecked){
      doTheseIndices.push([indexList[index][0],indexList[index][1]]);
    }
  });
    // clear the plot panel
  plotPanel = plotPanel.clear();
  plotPanel.add(tishi);
    // for each selected index, draw a plot to the plot panel
  doTheseIndices.forEach(function(name, index) {
    var chart = ui.Chart.image.series({  
          imageCollection:ee.ImageCollection(dataset).select(name[0]),   
          region:point,   
          reducer : ee.Reducer.mean(),   
          scale:30  ,
          xProperty :"time"
      }).setOptions({  
        title: name[0],  
        hAxis: {title: "时间"},  
        vAxis: {title: "数值"},  
        series: {  
          0: { lineWidth: 1, pointSize: 2 },  
          1: { lineWidth: 1, pointSize: 2 },  
          2: { lineWidth: 1, pointSize: 2 },  
          3: { lineWidth: 1, pointSize: 2 }  
        }  
      });  
    plotPanel.add(chart);
  });
});
submitButton.onClick(function () {
  // var region=geometry;
  if(map.drawingTools().layers().get(0)){
    geometry=map.drawingTools().layers().get(0).toGeometry();
  }
  // print(region)
  var outline = ee.Image()  
                  .toByte()  
                  .paint({  
                    featureCollection:geometry,  
                    color:0,  
                    width:1.5  
                  }); 
  // map.addLayer(outline, {palette: "ff0000"},"研究区");
  if(extain(map,"研究区")){
      map.layers().set(getlayerindex(map,"研究区"), ui.Map.Layer(outline, {palette: "ff0000"}, "研究区"));
    }
    else{
      map.addLayer(outline, {palette: "ff0000"},"研究区")
    }
  // map.layers().set(0, ui.Map.Layer(outline, {palette: "ff0000"},"研究区"));
  // print(map.drawingTools().layers().get(0))
  map.drawingTools().clear();
});
clearButton.onClick(function(){
  // map.layers().clear()
  print(map.layers());
  // map.layers().remove(map.layers().get(0))
  map.layers().get(0).setShown(false);
  // print(map.layers().get(0).getName());
  // // print(map.layers().get(0).getName()===ee.String("研究区1"))
  // map.layers().map(function(layer){
  //   // ee.Algorithms.If(ee.Algorithms.IsEqual(layer.getName(), ee.String("研究区")),layer.setShown(false),layer.setShown(true));
  //   layer.setShown(false)
  // });
});
bigsubmitButton.onClick(function(){
  var outline = ee.Image()  
                  .toByte()  
                  .paint({  
                    featureCollection:geometry,  
                    color:0,  
                    width:1.5  
                  }); 
  if(extain(map,"研究区")){
      // map.layers().set(getlayerindex(map,"研究区"), ui.Map.Layer(outline, {palette: "ff0000"}, "研究区"));
    }
    else{
      map.addLayer(outline, {palette: "ff0000"},"研究区")
    }
  // var fun = require('users/2200902213/zhishuyingyong:function.js'); 
  var yearlist=ee.List.sequence(startYearslider.getValue(),endYearslider.getValue(),1)//.evaluate(print)
  var monthlist=ee.List.sequence(startDayBox.getValue(),endDayBox.getValue(),1)
  print("yearlist",yearlist)
  print("monthlist",monthlist)
  dataset=yearlist.map(function(year){
    monthlist.map(function(mon){
      return getimage(year,mon,geometry)
    })
    return monthlist.map(function(mon){
      return getimage(year,mon,geometry)
    })//fun.getimage(year,7,geometry)
  }).flatten()
  print(dataset)
  // var dataset=fun.getimage(2019,7,geometry)
  var tmplist=[]
  var imagelist=[]
  for(var j=0;j<dataset.size().getInfo();j++){
    var img=ee.Image(dataset.get(j))
    var year=ee.Date(img.get("date")).get("year").getInfo();
    var month=ee.Date(img.get("date")).get("month").getInfo()
    // map.addLayer(img,null,year+"年"+month+"月")
    tmplist.push(img.set("time",year+"年"+month+"月"))
   imagelist.push(year+"年"+month+"月")
  }
  dataset=tmplist;
   print("dataset",dataset)
  dataview.items().reset(imagelist)
  dataview.setValue(dataview.items().get(0)); 
  // var datasetlist=dataset//.toList(dataset.size())
  // for(var i=0;i<dataset.length;i++){
  //   var img=ee.Image(datasetlist[i])
  //   // print("img",img)
  //   // var year=ee.Date(img.get("date")).get("year").getInfo();
  //   // var month=ee.Date(img.get("date")).get("month").getInfo()
  //   // map.addLayer(img,null,year+"年"+month+"月")
  // }
});
//function                  
function getimage(year1,month,geometrysa){
  var date1=ee.Date.fromYMD(year1, month,1);
  // var date2=ee.Date.fromYMD(year2, month,1)
  var dataset1 = ee.ImageCollection('COPERNICUS/S2')
                  .filterDate(date1,date1.advance(1,"month"))
                   .filterBounds(geometrysa)
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 5))
                  // .map(maskS2clouds)
                  .select(["B2","B3","B4","B5","B6","B7","B8","B8A","B10","B11","B12" ]);
  // var dataset2 = ee.ImageCollection('COPERNICUS/S2')
  //                 .filterDate(date2,date2.advance(1,"month"))
  //                 .filterBounds(geometrysa)
  //                 .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 5))
  //                 .map(maskS2clouds)
  //                 .select(["B2","B3","B4","B5","B6","B7","B8","B8A","B10","B11","B12" ])
  //                 ;
  var tempimg=dataset1.median().set("date",date1);
  return tempimg.addBands(gettezhengimg(tempimg)).clip(geometrysa)//.unmask(0).updateMask(geometry.eq(1))
  // var tempimg=dataset.mean();
  // return gettezhengimg(tempimg).unmask(0).clip(geometry)
}
function gettezhengimg(img){
    var NDVI=img.expression(
    '(NIR-Red)/(NIR+Red)',
    {
        Blue: img.select('B2'),    // 0.452-0.512, BLUE
        Green:img.select('B3'), //0.533-0.590 green
        Red: img.select('B4'),    // 0.636-0.673 μm, RED
        NIR: img.select('B8'),    //  NIR
        SWIR_1: img.select('B11'),    //  SWIR_1
        SWIR_2: img.select('B12'),    //  SWIR_2
    }).rename('NDVI');
    var EVI=img.expression(
    '2.5*((NIR-Red)/(NIR+6*Red-7.5*Blue+10000))',
    {
        Blue: img.select('B2'),    // 0.452-0.512, BLUE
        Green:img.select('B3'), //0.533-0.590 green
        Red: img.select('B4'),    // 0.636-0.673 μm, RED
        NIR: img.select('B8'),    //  NIR
        SWIR_1: img.select('B11'),    //  SWIR_1
        SWIR_2: img.select('B12'),    //  SWIR_2
    }).rename('EVI');
    var NDTI=img.expression(
    '(SWIR_1-SWIR_2)/(SWIR_1+SWIR_2)',
    {
        Blue: img.select('B2'),    // 0.452-0.512, BLUE
        Green:img.select('B3'), //0.533-0.590 green
        Red: img.select('B4'),    // 0.636-0.673 μm, RED
        NIR: img.select('B8'),    //  NIR
        SWIR_1: img.select('B11'),    //  SWIR_1
        SWIR_2: img.select('B12'),    //  SWIR_2
    }).rename('NDTI');
    var NDSVI=img.expression(
    '(SWIR_1-Red)/(SWIR_1+Red)',
    {
        Blue: img.select('B2'),    // 0.452-0.512, BLUE
        Green:img.select('B3'), //0.533-0.590 green
        Red: img.select('B4'),    // 0.636-0.673 μm, RED
        NIR: img.select('B8'),    //  NIR
        SWIR_1: img.select('B11'),    //  SWIR_1
        SWIR_2: img.select('B12'),    //  SWIR_2
    }).rename('NDSVI');
    var SVI=img.expression(
    '(Red-Green)/ NIR',
    {
        Blue: img.select('B2'),    // 0.452-0.512, BLUE
        Green:img.select('B3'), //0.533-0.590 green
        Red: img.select('B4'),    // 0.636-0.673 μm, RED
        NIR: img.select('B8'),    //  NIR
        SWIR_1: img.select('B11'),    //  SWIR_1
        SWIR_2: img.select('B12'),    //  SWIR_2
    }).rename('SVI');
    // var MNDWI=img.expression(
    // '(Green-SWIR_1)/(Green+SWIR_1)',
    // {
    //     Blue: img.select('B2'),    // 0.452-0.512, BLUE
    //     Green:img.select('B3'), //0.533-0.590 green
    //     Red: img.select('B4'),    // 0.636-0.673 μm, RED
    //     NIR: img.select('B8'),    //  NIR
    //     SWIR_1: img.select('B11'),    //  SWIR_1
    //     SWIR_2: img.select('B12'),    //  SWIR_2
    // }).rename('MNDWI');
    var NGBDI=img.expression(
    '(Green-Blue)/(Green+Blue)',
    {
        Blue: img.select('B2'),    // 0.452-0.512, BLUE
        Green:img.select('B3'), //0.533-0.590 green
        Red: img.select('B4'),    // 0.636-0.673 μm, RED
        NIR: img.select('B8'),    //  NIR
        SWIR_1: img.select('B11'),    //  SWIR_1
        SWIR_2: img.select('B12'),    //  SWIR_2
    }).rename('NGBDI');
    var YELLOW=img.expression(
    '(Red+Green)/10000*255',
    {
        Blue: img.select('B2'),    // 0.452-0.512, BLUE
        Green:img.select('B3'), //0.533-0.590 green
        Red: img.select('B4'),    // 0.636-0.673 μm, RED
        NIR: img.select('B8'),    //  NIR
        SWIR_1: img.select('B11'),    //  SWIR_1
        SWIR_2: img.select('B12'),    //  SWIR_2
    }).rename('YELLOW');
    var GREEN=img.expression(
    'Green/10000*255',
    {
        Blue: img.select('B2'),    // 0.452-0.512, BLUE
        Green:img.select('B3'), //0.533-0.590 green
        Red: img.select('B4'),    // 0.636-0.673 μm, RED
        NIR: img.select('B8'),    //  NIR
        SWIR_1: img.select('B11'),    //  SWIR_1
        SWIR_2: img.select('B12'),    //  SWIR_2
    }).rename('GREEN');
    var RED=img.expression(
    'Red/10000*255',
    {
        Blue: img.select('B2'),    // 0.452-0.512, BLUE
        Green:img.select('B3'), //0.533-0.590 green
        Red: img.select('B4'),    // 0.636-0.673 μm, RED
        NIR: img.select('B8'),    //  NIR
        SWIR_1: img.select('B11'),    //  SWIR_1
        SWIR_2: img.select('B12'),    //  SWIR_2
    }).rename('RED');
    var Greeness=img.expression(
    '((-0.3599)*Blue+(-0.3533)*Green+(-0.4734)*Red+(0.6633)*NIR+(0.0087) *SWIR_1+(-0.2856) *SWIR_2)/10000',
    {
        Blue: img.select('B2'),    // 0.452-0.512, BLUE
        Green:img.select('B3'), //0.533-0.590 green
        Red: img.select('B4'),    // 0.636-0.673 μm, RED
        NIR: img.select('B8'),    //  NIR
        SWIR_1: img.select('B11'),    //  SWIR_1
        SWIR_2: img.select('B12'),    //  SWIR_2
    }).rename('Greeness');
    var Wetness=img.expression(
    '(0.2578*Blue+0.2305*Green+0.0883*Red+(0.1071)*NIR+(-0.7611) *SWIR_1+(-0.5308) *SWIR_2)/10000',
    {
        Blue: img.select('B2'),    // 0.452-0.512, BLUE
        Green:img.select('B3'), //0.533-0.590 green
        Red: img.select('B4'),    // 0.636-0.673 μm, RED
        NIR: img.select('B8'),    //  NIR
        SWIR_1: img.select('B11'),    //  SWIR_1
        SWIR_2: img.select('B12'),    //  SWIR_2
    }).rename('Wetness');
    var Brightness=img.expression(
    '(0.3510*Blue+0.3813*Green+0.3437*Red+(0.7196)*NIR+(0.2396) *SWIR_1+(0.1949) *SWIR_2)/10000',
    {
        Blue: img.select('B2'),    // 0.452-0.512, BLUE
        Green:img.select('B3'), //0.533-0.590 green
        Red: img.select('B4'),    // 0.636-0.673 μm, RED
        NIR: img.select('B8'),    //  NIR
        SWIR_1: img.select('B11'),    //  SWIR_1
        SWIR_2: img.select('B12'),    //  SWIR_2
    }).rename('Brightness');
    var SSVI=img.expression(
    '(NIR-Red)/(NIR+Red)*((Blue-Green)/(Green-Red))*((Blue-Green)/(Green-Red))',
    {
        Blue: img.select('B2'),    // 0.452-0.512, BLUE
        Green:img.select('B3'), //0.533-0.590 green
        Red: img.select('B4'),    // 0.636-0.673 μm, RED
        NIR: img.select('B8'),    //  NIR
        SWIR_1: img.select('B11'),    //  SWIR_1
        SWIR_2: img.select('B12'),    //  SWIR_2
    }).rename('SSVI');
    var MSAVI=img.expression(
    '0.5*(2*NIR+1-sqrt((2*NIR+1)*(2*NIR+1)-8*(NIR-Red)))',
    {
        Blue: img.select('B2'),    // 0.452-0.512, BLUE
        Green:img.select('B3'), //0.533-0.590 green
        Red: img.select('B4'),    // 0.636-0.673 μm, RED
        NIR: img.select('B8'),    //  NIR
        SWIR_1: img.select('B11'),    //  SWIR_1
        SWIR_2: img.select('B12'),    //  SWIR_2
    }).rename('MSAVI');
    return NDVI.addBands(EVI).addBands(NDTI).addBands(NDSVI).addBands(SVI).addBands(NGBDI)
               .addBands(YELLOW).addBands(GREEN).addBands(RED).addBands(Greeness).addBands(Wetness).addBands(Brightness).addBands(SSVI).addBands(MSAVI)  
}