var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            106.2138327000811,
            35.417701102798944
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([106.2138327000811, 35.417701102798944]),
    froestPoints = ui.import && ui.import("froestPoints", "table", {
      "id": "users/StrongSun/froest"
    }) || ee.FeatureCollection("users/StrongSun/froest"),
    grassPoints = ui.import && ui.import("grassPoints", "table", {
      "id": "users/StrongSun/grassLand"
    }) || ee.FeatureCollection("users/StrongSun/grassLand");
//Aunthor:Zhang Yangjian
//institute: university of Chinese Academy of Science
//create a year panel
var createYearPanel = function(){
  var yearSectionLabel = ui.Label('Define Year Range',{fontWeight: 'bold'});
  var startYearLabel = ui.Label('Start Year:');
  var startYearslider = ui.Slider({min:1982, max:2020, value:2000, step:1});
  startYearslider.style().set({stretch:'horizontal'});
  var endYearLabel = ui.Label('End Year:');
  var endYearslider = ui.Slider({min:1982, max:2020, value:2020, step:1});
  endYearslider.style().set({width:'200px',position:'bottom-right'});
  var Panel= ui.Panel(
    [
      yearSectionLabel,
      ui.Panel([startYearLabel, startYearslider], ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'}), //
      ui.Panel([endYearLabel  , endYearslider], ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'})
    ]
  );
  Panel.style().set({width:'400px'});
  return Panel
};
//creat Lon and Lat Panel
var lon_lat_panel=function()
{
  var lonLabel=ui.Label('Lon:')
  var latLabel=ui.Label('Lat:')
  var lon=ui.Textbox()
  lon.style().set('width','65px')
  var lat=ui.Textbox()
  lat.style().set('width','65px')
  var panelA=ui.Panel([lonLabel,lon],ui.Panel.Layout.flow('horizontal'))
  var panelB=ui.Panel([latLabel,lat],ui.Panel.Layout.flow('horizontal'))
  var label1=ui.Label('Set the Lon,Lat,composite days and scale',{fontWeight:'bold',fontSize:18})
  var day_label=ui.Label('composite days of MODIS timeseries:')
  var day_txt=ui.Label('8')
  day_txt.style().set('width','65px')
  var day_panel=ui.Panel([day_label,day_txt],ui.Panel.Layout.flow('horizontal'))
  var scale_label=ui.Label('MODIS scale:')
  //set the width for textBox
  var scale_txt=ui.Textbox().setValue('250')
  scale_txt.style().set('width','65px')
  var scale_label2=ui.Label('Landsat scale:')
  //set the width for textBox
  var scale_txt2=ui.Textbox().setValue('30')
  scale_txt2.style().set('width','65px')
  var scale_panel=ui.Panel([scale_label,scale_txt],ui.Panel.Layout.flow('horizontal'))
  var scale_panel2=ui.Panel([scale_label2,scale_txt2],ui.Panel.Layout.flow('horizontal'))
  var panel=ui.Panel([label1,panelA,panelB,day_panel,scale_panel,scale_panel2],ui.Panel.Layout.flow('vertical'))
  panel.style().set('width','400px')
  return panel
}
//create check metrics panel
var creat_check_metric_panel=function()
{
  //set the select label
  var metrics_label=ui.Label('Metrics',{fontWeight:'bold',fontSize:18})
  var check_box1=ui.Checkbox({label:'NDVI',value:1})
  var check_box2=ui.Checkbox({label:'Red',value:1})
  var check_box3=ui.Checkbox({label:'Near',value:1})
  var panelC=ui.Panel([metrics_label,check_box1,check_box2,check_box3],ui.Panel.Layout.flow('horizontal'))
  panelC.style().set({width:'400px'})
  return panelC
}
//create submit Button
var create_submit_Button=function()
{
 var submit_Button=ui.Button({label:'submit',style:{stretch:'horizontal'}})
 return submit_Button
}
var yearPanel=createYearPanel()
var lon_lat_panel=lon_lat_panel()
var check_panel=creat_check_metric_panel()
var submit_btn=create_submit_Button()
var mapPanel=ui.Panel([yearPanel,lon_lat_panel,check_panel,submit_btn],ui.Panel.Layout.flow('vertical'))
var reprePanel=ui.Panel([ui.Label('MODIS and Landsat Time-series view',{fontWeight:'bold',fontSize:18})],ui.Panel.Layout.flow('vertical'))
reprePanel.style().set({width:'400px'})
ui.root.setLayout(ui.Panel.Layout.absolute());
var mapTypes = {
  HYBRID: 'HYBRID',
  ROADMAP: 'ROADMAP',
  SATELLITE: 'SATELLITE',
  TERRAIN: 'TERRAIN'
};
var map1=new ui.Map()
map1.setOptions({mapTypeId: mapTypes.ROADMAP})
map1.centerObject(geometry,10)
map1.addLayer(grassPoints,{},'grassPoints')
map1.addLayer(froestPoints,{},'froestPoints')
mapPanel.widgets().get(1).widgets().get(1).widgets().get(1).setValue(106.21)
mapPanel.widgets().get(1).widgets().get(2).widgets().get(1).setValue(35.42)
//Map click
map1.onClick(function(coords)
{
  var lon=coords.lon
  var lat=coords.lat
  print(lon.toFixed(),lat)
  var point=ee.Geometry.Point(lon,lat)
  map1.addLayer(point, {color: 'FF0000'}, 'clicked location')
  mapPanel.widgets().get(1).widgets().get(1).widgets().get(1).setValue(lon)
  mapPanel.widgets().get(1).widgets().get(2).widgets().get(1).setValue(lat)
  map1.centerObject(point,10)
})
//Creat charts and generate Landsat NDVI and MODIS NDVI
var creat_charts=require('users/StrongSun/View_MODIS_Landsat_NDVI_Timeseries:Landsat_MODIS_TimeSeries_Visualize')
var generateNDVI=require('users/StrongSun/View_MODIS_Landsat_NDVI_Timeseries:generateNDVI')
submit_btn.onClick(function()
{
  //get the point
  var lon=parseFloat(mapPanel.widgets().get(1).widgets().get(1).widgets().get(1).getValue())
  var lat=parseFloat(mapPanel.widgets().get(1).widgets().get(2).widgets().get(1).getValue())
  print(lon,lat)
  var point=ee.Geometry.Point(lon,lat)
  print(point)
  map1.addLayer(point)
  map1.centerObject(point,10)
  //get the start_date and end_date
  var startDate=ee.Date(mapPanel.widgets().get(0).widgets().get(1).widgets().get(1).getValue().toString()+'-01-01')
  var endDate=ee.Date(mapPanel.widgets().get(0).widgets().get(2).widgets().get(1).getValue().toString()+'-12-31')
  //get LandsatNDVI and MODIS NDVI
  var LandsatNDVI=ee.ImageCollection(generateNDVI.getLandstNDVI(startDate,endDate,point))
  var MODISNDVI=ee.ImageCollection(generateNDVI.getMODISNDVI(startDate,endDate,point))
  //print(LandsatNDVI)
  //print(MODISNDVI)
  //get the composite days
  var kernelSize1=parseInt(mapPanel.widgets().get(1).widgets().get(4).widgets().get(1).getValue())
  var kernelSize2=parseInt(mapPanel.widgets().get(1).widgets().get(5).widgets().get(1).getValue())
  print(kernelSize1,kernelSize2)
  //get the charts
  var charts=creat_charts.generate_Landsat_Modis_chart(point,kernelSize2,kernelSize1,LandsatNDVI,MODISNDVI)
  //print(charts)
  //get the metric choice
  var ndvi_choice=mapPanel.widgets().get(2).widgets().get(1).getValue()
  var red_choice=mapPanel.widgets().get(2).widgets().get(2).getValue()
  var near_choice=mapPanel.widgets().get(2).widgets().get(3).getValue()
  //print('ndvi_choice',ndvi_choice,'red_choice',red_choice,'near_choice',near_choice)
  reprePanel.clear()
  //add the charts
  if(ndvi_choice==1)
  {
    reprePanel.widgets().set(0,charts[0])
    reprePanel.widgets().set(1,charts[3])
  }
  if(red_choice==1)
  {
    reprePanel.widgets().set(2,charts[1])
    reprePanel.widgets().set(3,charts[4])
  }
  if(near_choice==1)
  {
    reprePanel.widgets().set(4,charts[2])
    reprePanel.widgets().set(5,charts[5])
  }
}
)
ui.root.widgets().reset([mapPanel,map1,reprePanel]);
ui.root.setLayout(ui.Panel.Layout.Flow('horizontal'));