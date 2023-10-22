var image2 = ui.import && ui.import("image2", "image", {
      "id": "CGIAR/SRTM90_V4"
    }) || ee.Image("CGIAR/SRTM90_V4"),
    table = ui.import && ui.import("table", "table", {
      "id": "users/dingweic129/p1226t"
    }) || ee.FeatureCollection("users/dingweic129/p1226t"),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "users/dingweic129/namucuot"
    }) || ee.FeatureCollection("users/dingweic129/namucuot"),
    imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "MODIS/006/MOD09A1"
    }) || ee.ImageCollection("MODIS/006/MOD09A1"),
    table3 = ui.import && ui.import("table3", "table", {
      "id": "users/dingweic129/qingzang"
    }) || ee.FeatureCollection("users/dingweic129/qingzang"),
    table4 = ui.import && ui.import("table4", "table", {
      "id": "users/dingweic129/zharinanmucuo"
    }) || ee.FeatureCollection("users/dingweic129/zharinanmucuo");
//print(table)
Map.centerObject(table3,6)
var CaMean=function(image){
  //part 1 peiku snow
  var roi=table
  var input=image.clip(roi);
  var ndsi=input.normalizedDifference(['sur_refl_b04','sur_refl_b06']);
  var snow=ndsi.expression('b1>0.4&&b2>1000&&b4>1100',{
                                  'b1':ndsi.select('nd'),
                                  'b2':input.select('sur_refl_b02'),
                                  'b4':input.select('sur_refl_b04')});
  var self=snow.mask(snow).rename('area');
  var AREA=ee.Image.pixelArea().mask(snow);
  //square
  var stats=AREA.reduceRegion({
    reducer:ee.Reducer.sum(),
    geometry:roi,
    scale:1000,
    maxPixels:1e9
  });
  var va=ee.Number(stats.get('area')).divide(1000000);
  var z=ee.Image.constant(va);
  //part 2 namucuo snow
  var namu=table2
  var namuimg=image.clip(namu);
  var ndsinamu=namuimg.normalizedDifference(['sur_refl_b04','sur_refl_b06']);
  var snownamu=ndsinamu.expression('b1>0.4&&b2>1000&&b4>1100',{
                                  'b1':ndsinamu.select('nd'),
                                  'b2':namuimg.select('sur_refl_b02'),
                                  'b4':namuimg.select('sur_refl_b04')});
  var selfnamu=snownamu.mask(snownamu).rename('area');
  var AREAnamu=ee.Image.pixelArea().mask(snownamu);
  //square
  var statsnamu=AREAnamu.reduceRegion({
    reducer:ee.Reducer.sum(),
    geometry:namu,
    scale:1000,
    maxPixels:1e9
  });
  var vanamu=ee.Number(statsnamu.get('area')).divide(1000000);
 // var znamu=ee.Image.constant(vanamu);
  //square in the same band
  var z1=z
  var z2=z1.where(z1.clip(namu),vanamu)
  //part 3 zharinanmucuo snow
  var zhariroi=table4
  var zhariinput=image.clip(zhariroi);
  var zharindsi=zhariinput.normalizedDifference(['sur_refl_b04','sur_refl_b06']);
  var zharisnow=zharindsi.expression('b1>0.4&&b2>1000&&b4>1100',{
                                  'b1':zharindsi.select('nd'),
                                  'b2':zhariinput.select('sur_refl_b02'),
                                  'b4':zhariinput.select('sur_refl_b04')});
  var zhariself=zharisnow.mask(zharisnow).rename('area');
  var zhariAREA=ee.Image.pixelArea().mask(zharisnow);
  //square
  var zharistats=zhariAREA.reduceRegion({
    reducer:ee.Reducer.sum(),
    geometry:zhariroi,
    scale:1000,
    maxPixels:1e9
  });
  var zhariva=ee.Number(zharistats.get('area')).divide(1000000);
  //var zhariz=ee.Image.constant(zhariva);
  var z3=z2.where(z1.clip(zhariroi),zhariva)
  return image
  //.addBands(self)
  .addBands(z3.clip(table3))
  .float()
 };
var newco=imageCollection.filterDate('2017-1-1','2017-12-31')
    newco=newco.map(CaMean)
  //  Map.addLayer(newco.first().select('constant'),{},'111')
var area=imageCollection.filterDate('2018-7-1','2018-7-30') 
var s=ee.Image('MODIS/006/MOD09A1/2017_01_01')
var area1=s.select(['sur_refl_b01', 'sur_refl_b04', 'sur_refl_b03'])
var trueColorVis = {
  min: -100.0,
  max: 3000.0,
};
var snow=newco.select('constant')
//Map.addLayer(snow,{},'Snow cover')
Map.addLayer(area1,trueColorVis,'true color')
//var ndvi = ee.ImageCollection('LANDSAT/LC8_L1T_8DAY_NDVI')
 //   .filterDate('2014-01-01', '2015-01-01');
//Map.addLayer(ndvi.median(), {min: 0, max: 1, palette: ['99c199', '006400']}, 'NDVI');
//print(u1)
//var layer=ui.Map.Layer(table)
//Map.layers().set(0,layer)
//var str='peikucuo'
var panel=ui.Panel({
  layout:ui.Panel.Layout.flow('vertical'),
  style:{width:'400px'}
})
var str='佩枯错'
//print(str)
var str1='那木错'
var str2='扎日南木错'
var str3='青藏高原'
var str4='塔若错'
var str5='当惹雍错'
var str6='昂孜错'
var str7='格仁错'
var str8='色领错'
var str9='昂拉仁错'
var str10='达则错'
var str11='青海湖'
// Create the title label.
var title = ui.Label({
  value:'积雪提取系统',
  style:{fontSize:'30px',fontWeight:'bold'}                   
});
title.style().set('position', 'top-right');
//青藏高原湖泊
var i2000=ee.Image('JRC/GSW1_1/YearlyHistory/2000').clip(table3)
var i2001=ee.Image('JRC/GSW1_1/YearlyHistory/2001').clip(table3)
var i2002=ee.Image('JRC/GSW1_1/YearlyHistory/2002').clip(table3)
var i2003=ee.Image('JRC/GSW1_1/YearlyHistory/2003').clip(table3)
var i2004=ee.Image('JRC/GSW1_1/YearlyHistory/2004').clip(table3)
var i2005=ee.Image('JRC/GSW1_1/YearlyHistory/2005').clip(table3)
var i2006=ee.Image('JRC/GSW1_1/YearlyHistory/2006').clip(table3)
var i2007=ee.Image('JRC/GSW1_1/YearlyHistory/2007').clip(table3)
var i2008=ee.Image('JRC/GSW1_1/YearlyHistory/2008').clip(table3)
var i2009=ee.Image('JRC/GSW1_1/YearlyHistory/2009').clip(table3)
var i2010=ee.Image('JRC/GSW1_1/YearlyHistory/2010').clip(table3)
var i2011=ee.Image('JRC/GSW1_1/YearlyHistory/2011').clip(table3)
var i2012=ee.Image('JRC/GSW1_1/YearlyHistory/2012').clip(table3)
var i2013=ee.Image('JRC/GSW1_1/YearlyHistory/2013').clip(table3)
var i2014=ee.Image('JRC/GSW1_1/YearlyHistory/2014').clip(table3)
var i2015=ee.Image('JRC/GSW1_1/YearlyHistory/2015').clip(table3)
var i2016=ee.Image('JRC/GSW1_1/YearlyHistory/2016').clip(table3)
var i2017=ee.Image('JRC/GSW1_1/YearlyHistory/2017').clip(table3)
//Map.addLayer(i2010,{},'true')
var s1=ui.Select({
  items:
  [{label:'青藏高原',value:table3},
    {label:'佩枯错流域',value:table},
  {label:'那木错流域',value:table2},
  {label:'扎日南木错',value:table4},
  {label:'当惹雍错',value:table4},
  {label:'昂孜错',value:table4},
  {label:'格仁错',value:table4},
  {label:'色领错',value:table4},
  {label:'昂拉仁错',value:table4},
  {label:'达则错',value:table4},
  {label:'青海湖',value:table4},
  ],
  placeholder:'典型流域积雪提取',
  disabled:false,
  style:{fontSize:'60px',fontWeight:'bold'},
  //value:str,
  onChange:function(value){
    var layer=ui.Map.Layer(value);
    Map.layers().set(1,layer)
    Map.centerObject(table3,5)
  }
})
//s1.style().set('position','middle-right')
//chart
// Define a DataTable using a JavaScript literal.
var dataTable = {
  cols: [{id: 'name', label: 'area(✖10000km2)', type: 'string'},
         {id: 'year', label: 'area', type: 'number'}],
  rows: [{c: [{v: '2000'}, {v: 24.0973}]},
         {c: [{v: '2001'}, {v: 26.0252}]},
         {c: [{v: '2002'}, {v: 26.8935}]},
         {c: [{v: '2003'}, {v: 25.7861}]},
         {c: [{v: '2004'}, {v: 26.8909}]},
         {c: [{v: '2005'}, {v: 27.6040}]},
         {c: [{v: '2006'}, {v: 28.0086}]},
         {c: [{v: '2007'}, {v: 27.4340}]},
         {c: [{v: '2008'}, {v: 27.9229}]},
         {c: [{v: '2009'}, {v: 28.7194}]},
         {c: [{v: '2010'}, {v: 28.8654}]},
         {c: [{v: '2011'}, {v: 29.0243}]},
         {c: [{v: '2012'}, {v: 26.5494}]},
         {c: [{v: '2013'}, {v: 29.1935}]},
         {c: [{v: '2014'}, {v: 30.7427}]},
         {c: [{v: '2015'}, {v: 28.9977}]},
         {c: [{v: '2016'}, {v: 37.2683}]},
         {c: [{v: '2017'}, {v: 38.3355}]},
         {c: [{v: '2018'}, {v: 38.3655}]}
         ]
};
240973.92675472033
260252.5869132375
268935.9225649282
257861.2897931515
268909.7955686522
276040.17477090395
280086.3007332003
274340.2451533917
279229.69355140615
287194.8787798478
288654.7124277088
290243.0235454733
265494.951054424
291935.11565910367
307427.04916651326
289977.5609457147
372683.9131881851
383355.9781808718
383655.83065373875
    // Define a dictionary of customization options.
var options = {
  title: 'Lake area dynamics over Tibetan Plateau',
  vAxis: {title: 'area(✖10000km2)'},
  legend: {position: 'top'},
  hAxis: {
    title: 'year',
    logScale: true
  },
  lineWidth:1,
  pointSize:3,
};
    // Make a BarChart from the table and the options.
var chart1 = new ui.Chart(dataTable, 'LineChart', options);
// Print the chart to display it in the console.
// Create the title label.
var title1 = ui.Label({
  value:'青藏高原湖泊提取',
  style:{fontSize:'15px',fontWeight:'bold'}                   
});
var s2=ui.Select({
  items:
  [
   {label:'2000年青藏高原湖泊面积',value:i2000},
    {label:'2001年青藏高原湖泊面积',value:i2001},
  {label:'2002年青藏高原湖泊面积',value:i2002},
  {label:'2003年青藏高原湖泊面积',value:i2003},
  {label:'2004年青藏高原湖泊面积',value:i2004},
  {label:'2005年青藏高原湖泊面积',value:i2005},
  {label:'2006年青藏高原湖泊面积',value:i2006},
  {label:'2007年青藏高原湖泊面积',value:i2007},
  {label:'2008年青藏高原湖泊面积',value:i2008},
  {label:'2009年青藏高原湖泊面积',value:i2009},
  {label:'2010年青藏高原湖泊面积',value:i2010},
  {label:'2011年青藏高原湖泊面积',value:i2011},
  {label:'2012年青藏高原湖泊面积',value:i2012},
  {label:'2013年青藏高原湖泊面积',value:i2013},
  {label:'2014年青藏高原湖泊面积',value:i2014},
  {label:'2015年青藏高原湖泊面积',value:i2015},
  {label:'2016年青藏高原湖泊面积',value:i2016},
  {label:'2017年青藏高原湖泊面积',value:i2017},
  ],
  placeholder:'流域湖泊提取',
  disabled:false,
  style:{fontSize:'60px',fontWeight:'bold'},
  //value:str,
  onChange:function(value){
    var layer=ui.Map.Layer(value);
    Map.layers().set(1,layer)
    Map.centerObject(table3,5)
  }
})
// Create the title label.
var title2 = ui.Label({
  value:'其他功能',
  style:{fontSize:'15px',fontWeight:'bold'}                   
});
var s3=ui.Select({
  items:
  [{label:'青藏高原湖泊面积',value:chart1},
  ],
  placeholder:'功能选项',
  disabled:false,
  style:{fontSize:'60px',fontWeight:'bold'},
  //value:str,
  onChange:function(value){
    value.style().set(
      {
        position:'bottom-right',
        width:'500px',
        height:'300px'
      })
   // var layer=ui.Map.Layer(value);
    Map.add(value)
   // Map.layers().set(1,layer)
    Map.centerObject(table3,5)
  }
})
//var u1=ui.Map();
// Set a callback function for when the user clicks the map.
// Set a callback function for when the user clicks the map.
Map.onClick(function(coords) {
  // Create or update the location label (the second widget in the panel)
  var location = 'lon: ' + coords.lon.toFixed(2) + ' ' +
                 'lat: ' + coords.lat.toFixed(2);
  panel.widgets().set(2, ui.Label(location));
  // Add a red dot to the map where the user clicked.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  Map.layers().set(3, ui.Map.Layer(point, {color: 'FF0000'}));
   // Create a chart of NDVI over time.
  var chart = ui.Chart.image.series(snow, point, ee.Reducer.min(), 200)
      .setOptions({
        title: 'Snow Cover Area Over Time',
        vAxis: {title: 'Snow Cover Area'},
        lineWidth: 1,
        pointSize: 3,
      });
  // Add (or replace) the third widget in the panel by
  // manipulating the widgets list.
  chart.style().set(
      {
        position:'bottom-right',
        width:'500px',
        height:'300px'
      })
   // var layer=ui.Map.Layer(value);
    Map.add(chart)
  //panel.widgets().set(4, chart);
});
panel.add(title)
panel.add(s1)
panel.add(title1)
panel.add(s2)
panel.add(title2)
panel.add(s3)
//map.add(ui.Label('Click the map to compute a mosaic at that location'));
//u1.add(panel)
//ui.root.clear()
ui.root.add(panel)