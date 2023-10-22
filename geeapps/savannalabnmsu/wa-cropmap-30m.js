var crop_image = ui.import && ui.import("crop_image", "image", {
      "id": "users/savannalabnmsu/WASCE30"
    }) || ee.Image("users/savannalabnmsu/WASCE30"),
    admin_wa = ui.import && ui.import("admin_wa", "table", {
      "id": "users/savannalabnmsu/WA_admin_l2"
    }) || ee.FeatureCollection("users/savannalabnmsu/WA_admin_l2"),
    admin_c = ui.import && ui.import("admin_c", "table", {
      "id": "users/savannalabnmsu/WA_C"
    }) || ee.FeatureCollection("users/savannalabnmsu/WA_C");
print(admin_wa)
var selected = ee.FeatureCollection(admin_wa.map(function(f){
  var feat = ee.Algorithms.If(f.containedIn(crop_image.geometry(),10),f)
  return feat
},true)
)
print(selected)
/*function to calc fraction of each class per  zone.
Will be used to generate pie chart on map click*/
function calcFrac(n,zone){//n=integer label for class in class image
  var img = crop_image.unmask(0).clip(zone)
  var mask = img.updateMask(img.neq(n)).multiply(0).unmask(1).select([0],['mask'])//creates class binary (1,0) mask
  return ee.Number(
    mask.reduceRegion({
      reducer:ee.Reducer.mean(),
      geometry:zone,
      scale:500,
      bestEffort:true,
      maxPixels:1e13,
      tileScale:16
    })
              .get('mask')
              )
}
//function to create pie chart
var chrt = require('users/savannalabnmsu/misc:createPieChart.js')
//////////////////////////////////UI ELEMENTS//////////////////////////////////////////////
var mapPanel = ui.Map();
var classValues = [1,2]
var classNames = ['rainfed','irrigated']
var classPalette = ['yellow','blue']
var addClassMap = require('users/savannalabnmsu/misc:addClassMap.js');
addClassMap.addClassMap(
  mapPanel,crop_image.updateMask(crop_image.neq(0)),classValues,classNames,classPalette,'bottom-left','Cropland Classes'
  );
mapPanel.centerObject(crop_image,6)
//overlay admin layers
mapPanel.layers().set(1, ui.Map.Layer(selected.style({color:'000000',width:0.7,fillColor: '00000000'})))
mapPanel.layers().set(2, ui.Map.Layer(admin_c.style({color:'000000',width:2,fillColor: '00000000'})))
//Take all tools off the map except the zoom and mapTypeControl tools.
mapPanel.setControlVisibility(
    {all: false, scaleControl: true, zoomControl: true, mapTypeControl: true});
mapPanel.setOptions('satellite')
mapPanel.style().set('cursor', 'crosshair')
// Add a title and some explanatory text to a tool panel
var header = ui.Label('A High Resolution Cropland Map for the West African Sahel ', {fontSize: '20px', fontWeight: 'bold', color: '#264e36', backgroundColor:'black'});
var toolPanel = ui.Panel([], ui.Panel.Layout.Flow('horizontal',true), {width:'30%', height:'100%',backgroundColor: '#f3e0be'});
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
ui.root.widgets().reset([toolPanel,mapPanel])
var text1 = ui.Label(
    "The West African Sahel Cropland Map (WASC30) is a new 30-meter cropland extent product\n"
    +"for the nominal year of 2015. It is developed using Google Earth Engine resources and locally\n" 
    +"optimized machine learning. Individual random forest models are fitted for 189 grid cells (100 sq.km each)\n"
    +"across five West African Countries: Burkina Faso, Mauritania, Mali, Niger, and Senegal.\n"
    +"Landsat wet and dry season surface reflectance and vegetation indices serve as model predictors,\n" 
    +"while model calibration and evaluation makes use of a high-density, visually interpreted\n" 
    +"sample dataset obtained courtesy of the USGS Rapid Land Cover Mapper (RLCM) program.\n"
    +"The WASC30 product enjoys a regional scale overall accuracy of 90.1% and a cropland class (rainfed and irrigated)\n"
    +"consumer accuracy of 79%, a significant improvement when compared to existing global and regional landcover products.\n"
    +"It is designed  to provide more accurate baseline data for agricultural monitoring and food security applications in the region.",
    {fontSize: '15px', color:'white', backgroundColor:'black'});
var text2 = ui.Label(
  "The WASC30 dataset is developed as part of a doctoral dissertation research project by Kaboro Samasse,\n"
  +"Geomatics Specialist at  IPR/IFRA (Koulikoro, Mali), and doctoral candidate at the Geospatial Sciences Center of Excellence,\n"
  +"South Dakota State University (advised by Prof. Niall Hanan of New Mexico State University). He can be reached at kaboro.samasse@jacks.sdstate.edu with questions/comments.\n",
  {fontSize: '16px', color:'yellow', backgroundColor:'black'})
var text3 = ui.Label(
  "view related publications: ",
  {fontSize: '14px', color:'purple', backgroundColor:'black'}
  ) 
var text4 = ui.Label(
  "Samasse et al., 2020",
  {fontSize: '14px', color:'purple', backgroundColor:'black'},
  'https://www.mdpi.com/2072-4292/12/9/1436/htm'
  ) 
var text5 = ui.Label(
  "Samasse et al., 2018",
  {fontSize: '14px', color:'purple', backgroundColor:'black'},
  'https://www.mdpi.com/2072-4292/10/11/1785'
  )
var text6 = ui.Label(
  "Data Download: coming soon",
   {fontSize: '16px', color:'lightblue', backgroundColor:'black',fontWeight:'bold'})
//Create an opacity slider panel and add to map UI
var opacitySlider = ui.Slider({
  min: 0,
  max: 1,
  value: 1,
  step: 0.01,
  style:{width:'200px', stretch:'horizontal'}
});
opacitySlider.onSlide(function(value) {
  mapPanel.layers().get(0).setOpacity(value);
  });
var sliderpanel = ui.Panel(
  [ui.Label(
    'Adjust Map Transparency',
    {fontSize: '16px', fontWeight:'bold', color:'grey', backgroundColor:'ffffff00'}),
    opacitySlider],
    'flow',
    {backgroundColor:'ffffff00',position:'bottom-left'});
mapPanel.add(sliderpanel)
//create panel to hold body of info and add to toolPanel
var body = ui.Panel(
    [header,text1,text2,text3,text4,text5,text6], 'flow', {height: '65%', width:'100%', backgroundColor:'black'});
toolPanel.add(body);
//create panel to hold chart and add to toolPanel
var chart_pan = ui.Panel();
chart_pan.style().set({
width: '100%',
height:'35%',
backgroundColor:'#f3e0be'
});
toolPanel.add(chart_pan);
chart_pan.widgets().set(0,ui.Label('Division/Department: ',{backgroundColor:'#f3e0be'}))
chart_pan.widgets().set(1,ui.Label('Country: ',{backgroundColor:'#f3e0be'}))
chart_pan.widgets().set(2,ui.Label('Area: ',{backgroundColor:'#f3e0be'}))
var click_label
  = ui.Panel({style: {position:'bottom-center', backgroundColor:'white', width:'200px' }})
  .add(ui.Label('Click on an administrative zone to summarize cropland area statistics',
   {fontSize: '14px', backgroundColor:'white'}));
mapPanel.add(click_label)
///////////function to display location chart on map click////////////////////////////////////////////////
mapPanel.onClick(function(coords) {
    //clear all chart panels of previous content
    chart_pan.widgets().set(0,ui.Label('Division/Department: Loading...',{backgroundColor:'#f3e0be'}))
    chart_pan.widgets().set(1,ui.Label('Country: Loading...',{backgroundColor:'#f3e0be'}))
    chart_pan.widgets().set(2,ui.Label('Area: Loading...',{backgroundColor:'#f3e0be'}))
    //select polygon grid cell intersecting with clicked point 
    var point = ee.Geometry.Point(coords.lon, coords.lat);
    point.evaluate(function(result){
    var selectedZone = selected.filterBounds(result)
    var name_d = selectedZone.first().get('admin2Name').getInfo()//name of district
    var name_c = selectedZone.first().get('admin0Name').getInfo()//name of country
    var area_string = ee.String('Area: ')
                  .cat(ee.Number(ee.Feature(selectedZone.first()).area()).divide(1000000).format('%.2f'))
                  .cat(' sq.Km').getInfo()
    // highlight selected grid cell
    var lab1 = ui.Label('Division/Department: '+name_d,{backgroundColor:'#f3e0be'})
    var lab2 = ui.Label('Country: '+name_c,{backgroundColor:'#f3e0be'})
    var lab3 = ui.Label(area_string,{backgroundColor:'#f3e0be'})
    mapPanel.layers().set(3, ui.Map.Layer(selectedZone.style({color: 'FF0000',fillColor: 'FF000000'})));
    //center and zoom into selected grid cell
    mapPanel.centerObject(selectedZone,8);
    var nc_fr = calcFrac(0,selectedZone).multiply(100)//non-crop fraction
    var rf_fr = calcFrac(1,selectedZone).multiply(100)//rainfed fraction
    var irr_fr = calcFrac(2,selectedZone).multiply(100)//irrigated fraction
    var names = ee.List([
                  ee.String('non-crop:').cat(nc_fr.format('%.2f')).cat('%').getInfo(),
                  ee.String('rainfed:').cat(rf_fr.format('%.2f')).cat('%').getInfo(),
                  ee.String('irrigated:').cat(irr_fr.format('%.2f')).cat('%').getInfo()
                  ]).getInfo()
    var values = ee.List([nc_fr,rf_fr,irr_fr]).getInfo()
    var palette  = ee.List(['grey','yellow','blue']).getInfo()
    var pieChart = chrt.createPieChart(names,values,palette,3)
    chart_pan.widgets().set(0,lab1)
    chart_pan.widgets().set(1,lab2)
    chart_pan.widgets().set(2,lab3)
    chart_pan.widgets().set(3,pieChart) 
    })
});