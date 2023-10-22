var Classified2000 = ui.import && ui.import("Classified2000", "image", {
      "id": "users/vctrchirchir/2000"
    }) || ee.Image("users/vctrchirchir/2000"),
    Classified2005 = ui.import && ui.import("Classified2005", "image", {
      "id": "users/vctrchirchir/2005"
    }) || ee.Image("users/vctrchirchir/2005"),
    Classified2010 = ui.import && ui.import("Classified2010", "image", {
      "id": "users/vctrchirchir/2010"
    }) || ee.Image("users/vctrchirchir/2010"),
    Classified2015 = ui.import && ui.import("Classified2015", "image", {
      "id": "users/vctrchirchir/2015"
    }) || ee.Image("users/vctrchirchir/2015"),
    Classified2020 = ui.import && ui.import("Classified2020", "image", {
      "id": "users/vctrchirchir/2020"
    }) || ee.Image("users/vctrchirchir/2020"),
    Kajiado = ui.import && ui.import("Kajiado", "table", {
      "id": "users/vctrchirchir/KNwards"
    }) || ee.FeatureCollection("users/vctrchirchir/KNwards"),
    visparamsLC = ui.import && ui.import("visparamsLC", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "b1"
        ],
        "min": 0,
        "max": 4,
        "palette": [
          "ff0000",
          "008000",
          "87ff8a",
          "feffa1",
          "0000ff"
        ]
      }
    }) || {"opacity":1,"bands":["b1"],"min":0,"max":4,"palette":["ff0000","008000","87ff8a","feffa1","0000ff"]},
    GHSL = ui.import && ui.import("GHSL", "image", {
      "id": "JRC/GHSL/P2016/BUILT_LDSMT_GLOBE_V1"
    }) || ee.Image("JRC/GHSL/P2016/BUILT_LDSMT_GLOBE_V1");
//User Interface
var colors = {'cyan': '#24C1E0', 'transparent': '#11ffee00', 'gray': '#F8F9FA'};
var BORDER_STYLE = '4px solid rgba(97, 97, 97, 0.05)';
var style_title = {
  fontWeight: 'bold',
  fontSize: '36px',
  padding: '11px',
  color: '#61122f',
  backgroundColor: colors.transparent,
};
var style_description={
  fontSize:'16px',
  padding:'11px',
  color:'grey',
  backgroundColor:colors.transparent
};
var style_description3={
  fontSize:'14px',
  padding:'11px',
  color:'grey',
  backgroundColor:colors.transparent
};
var name_description={
  fontSize:'7px',
  padding:'11px',
  color:'grey',
  backgroundColor:colors.transparent
};
//Define land cover for different years
var landcoverKN={
  '2000':'classified 2000',
  '2005':'classified 2005',
  '2010':'classified 2010',
  '2015':'classified 2015',
  '2020':'classified 2020',
};
// Define Wards in Kajiado North
var locations= {
  Olkeri: Kajiado.filter(ee.Filter.inList('iebc_wards',['Olkeri'])),
  Ongata_Rongai: Kajiado.filter(ee.Filter.inList('iebc_wards',['Ongat Rongai'])),
  Nkaimurunya: Kajiado.filter(ee.Filter.inList('iebc_wards',['Nkaimurunya'])),
  Oloolua: Kajiado.filter(ee.Filter.inList('iebc_wards',['Oloolua'])),
  Ngong: Kajiado.filter(ee.Filter.inList('iebc_wards',['Ngong'])),
  Kajiado_Sub_County:Kajiado
};
//Create the button for selecting year
var selectYear=ui.Select({
  placeholder:'Select A Year',
  items:Object.keys(landcoverKN)
});
//Create the button for selecting Regions
var selectRegion=ui.Select({
  placeholder:'Select A Region',
  items:Object.keys(locations),
  onChange:function(key){
    mapPanel.centerObject(locations[key],12)
}
});
// Initialize the UI. 
//Clear the default UI since we're adding our own main and map panels.
ui.root.clear();
var mapPanel = ui.Map();
ui.root.widgets().reset([mapPanel]);
var mainPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical', true),
    style: {
      stretch: 'horizontal',
      height: '60%',
      width: '30%',
      backgroundColor: '#f6b319',
      border: BORDER_STYLE,
      position: 'top-left'
    }
  });
// Add the app title to the side panel
  var titleLabel = ui.Label('LANDCOVER VISUALIZER IN KAJIADO NORTH', style_title);
  var description= ui.Label('This web app will visualizes Landcover for wards in Kajiado North Sub-county in Kenya.Select the period and region required to add it to the map',style_description)
  var description2=ui.Label('It will display landcover maps from 2000-2020 at interval of five years and uses Landsat Imagery and supervised classification using CART algorithm',style_description)
  var description3=ui.Label('Charts showing the land cover Areas in Square Kilometres can also be added by selecting year, region and clicking add chart',style_description)
  mainPanel.add(titleLabel);
  mainPanel.add(description);
  mainPanel.add(description2);
  mainPanel.add(description3);
  mainPanel.add(selectYear);
  mainPanel.add(selectRegion);
// Use a SplitPanel so it's possible to resize the two panels.
var splitPanel = ui.SplitPanel({
  firstPanel: mainPanel,
  secondPanel: mapPanel,
  orientation: 'horizontal',
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in root.
ui.root.widgets().reset([splitPanel]);
var taskOlkeri=function(){
  var roi=locations[selectRegion.getValue()]
  switch(selectYear.getValue()){
      case '2000':
        mapPanel.addLayer(Classified2000.clip(roi),visparamsLC,'Landcover for Olkeri in 2000')
        break;
      case '2005':
        mapPanel.addLayer(Classified2005.clip(roi),visparamsLC,'Landcover for Olkeri in 2005')
        break;
      case '2010':
        mapPanel.addLayer(Classified2010.clip(roi),visparamsLC,'Landcover for Olkeri in 2010')
        break;
      case '2015':
        mapPanel.addLayer(Classified2015.clip(roi),visparamsLC,'Landcover for Olkeri in 2015')
        break;
      case '2020':
        mapPanel.addLayer(Classified2020.clip(roi),visparamsLC,'Landcover for Olkeri in 2020')
        break;
  }
};
var taskOngata_Rongai=function(){
  var roi=locations[selectRegion.getValue()]
  switch(selectYear.getValue()){
      case '2000':
        mapPanel.addLayer(Classified2000.clip(roi),visparamsLC,'Landcover for Ongata Rongai in 2000')
        break;
      case '2005':
        mapPanel.addLayer(Classified2005.clip(roi),visparamsLC,'Landcover for Ongata Rongai in 2005')
        break;
      case '2010':
        mapPanel.addLayer(Classified2010.clip(roi),visparamsLC,'Landcover for Ongata Rongai in 2010')
        break;
      case '2015':
        mapPanel.addLayer(Classified2015.clip(roi),visparamsLC,'Landcover for Ongata Rongai in 2015')
        break;
      case '2020':
        mapPanel.addLayer(Classified2020.clip(roi),visparamsLC,'Landcover for Ongata Rongai in 2020')
        break;
  }
};
var taskNkaimurunya=function(){
  var roi=locations[selectRegion.getValue()]
  switch(selectYear.getValue()){
      case '2000':
        mapPanel.addLayer(Classified2000.clip(roi),visparamsLC,'Landcover for Nkaimurunya in 2000')
        break;
      case '2005':
        mapPanel.addLayer(Classified2005.clip(roi),visparamsLC,'Landcover for Nkaimurunya in 2005')
        break;
      case '2010':
        mapPanel.addLayer(Classified2010.clip(roi),visparamsLC,'Landcover for Nkaimurunya in 2010')
        break;
      case '2015':
        mapPanel.addLayer(Classified2015.clip(roi),visparamsLC,'Landcover for Nkaimurunya in 2015')
        break;
      case '2020':
        mapPanel.addLayer(Classified2020.clip(roi),visparamsLC,'Landcover for Nkaimurunya in 2020')
        break;
  }
};
var taskNgong=function(){
  var roi=locations[selectRegion.getValue()]
  switch(selectYear.getValue()){
      case '2000':
        mapPanel.addLayer(Classified2000.clip(roi),visparamsLC,'Landcover for Ngong in 2000')
        break;
      case '2005':
        mapPanel.addLayer(Classified2005.clip(roi),visparamsLC,'Landcover for Ngong in 2005')
        break;
      case '2010':
        mapPanel.addLayer(Classified2010.clip(roi),visparamsLC,'Landcover for Ngong in 2010')
        break;
      case '2015':
        mapPanel.addLayer(Classified2015.clip(roi),visparamsLC,'Landcover for Ngong in 2015')
        break;
      case '2020':
        mapPanel.addLayer(Classified2020.clip(roi),visparamsLC,'Landcover for Ngong in 2020')
        break;
  }
};
var taskKajiado_Sub_County=function(){
  var roi=locations[selectRegion.getValue()]
  switch(selectYear.getValue()){
      case '2000':
        mapPanel.addLayer(Classified2000.clip(roi),visparamsLC,'Landcover for Kajiado Sub County in 2000')
        break;
      case '2005':
        mapPanel.addLayer(Classified2005.clip(roi),visparamsLC,'Landcover for Kajiado Sub County in 2005')
        break;
      case '2010':
        mapPanel.addLayer(Classified2010.clip(roi),visparamsLC,'Landcover for Kajiado Sub County in 2010')
        break;
      case '2015':
        mapPanel.addLayer(Classified2015.clip(roi),visparamsLC,'Landcover for Kajiado Sub County in 2015')
        break;
      case '2020':
        mapPanel.addLayer(Classified2020.clip(roi),visparamsLC,'Landcover for Kajiado Sub County in 2020')
        break;
  }
};
var task_final=function(){
  mapPanel.remove(legend)
  mapPanel.add(legend);
  var roi=locations[selectRegion.getValue()]
  switch(selectRegion.getValue()){
      case 'Olkeri':
      mapPanel.centerObject(roi,12)
        taskOlkeri()
        break;
      case 'Ongata_Rongai':
      mapPanel.centerObject(roi,13)
        taskOngata_Rongai()
        break;
      case 'Nkaimurunya':
      mapPanel.centerObject(roi,13)
        taskNkaimurunya()
        break;
      case 'Ngong':
      mapPanel.centerObject(roi,13)
        taskNgong()
        break;
      case 'Kajiado_Sub_County':
      mapPanel.centerObject(roi,12)
        taskKajiado_Sub_County()
        break;
  }
};
//adding Land cover charts
var classLab=['BuiltUp','Forest','Vegetation','BareLand','Water']
var clrs=['red','green','#87ff8a','#feffa1','blue']
var funcBuiltUp=function(a,b,c){
  var urban=a.eq(0);
  mapPanel.addLayer(urban,{min:0,max:1,palette:['grey','red']},'Built Up for '+b+' in '+c);
}
var func_Chart=function(a,b,c){
mapPanel.clear();
  var chart=ui.Chart.image.byClass({image:ee.Image.pixelArea().multiply(1e-6).addBands(a.rename('classified')),
  classBand:'classified', region:Kajiado.geometry(),
  reducer:ee.Reducer.sum(),
  scale:30,
  classLabels:classLab
});
chart.setOptions({
  title:b+' Land Cover Chart '+c,
  vAxis:{title:'Area in km²'},
  colors:clrs,
  position: 'top-right'
  // style:{
  //   height:'200px',
  //   width:'800px'
  // }
})
return chart
}
// Create a panel to hold the chart.
var panel = ui.Panel();
panel.style().set({
  width: '800px',
  height:'300px',
  position: 'bottom-right'
});
// mapPanel.add(panel)
//Tasks for charts
var taskOlkeri_C=function(){
  var roi=locations[selectRegion.getValue()]
  var roiName=selectRegion.getValue()
  var yearC=selectYear.getValue()
  switch(selectYear.getValue()){
      case '2000':
      panel.clear()
      panel.add(func_Chart(Classified2000.clip(roi),roiName,yearC))
      mapPanel.add(panel)
      mapPanel.addLayer(Classified2000.clip(roi),visparamsLC,'Landcover for '+ roiName+ ' in 2000')
        break;
      case '2005':
      panel.clear()
      panel.add(func_Chart(Classified2005.clip(roi),roiName,yearC))
      mapPanel.add(panel)
      mapPanel.addLayer(Classified2005.clip(roi),visparamsLC,'Landcover for '+ roiName+ ' in 2005')
        break;
      case '2010':
      panel.clear()
      panel.add(func_Chart(Classified2010.clip(roi),roiName,yearC))
      mapPanel.add(panel)
      mapPanel.addLayer(Classified2010.clip(roi),visparamsLC,'Landcover for '+ roiName+ ' in 2010')
        break;
      case '2015':
      panel.clear()
      panel.add(func_Chart(Classified2015.clip(roi),roiName,yearC))
      mapPanel.add(panel)
      mapPanel.addLayer(Classified2015.clip(roi),visparamsLC,'Landcover for '+ roiName+ ' in 2015')
        break;
      case '2020':
      panel.clear()
      panel.add(func_Chart(Classified2020.clip(roi),roiName,yearC))
      mapPanel.add(panel)
      mapPanel.addLayer(Classified2020.clip(roi),visparamsLC,'Landcover for '+ roiName+ ' in 2020')
        break;
  }
};
//Tasks for charts
var taskBuiltUP=function(){
  var roi=locations[selectRegion.getValue()]
  var roiName=selectRegion.getValue()
  var yearC=selectYear.getValue()
   mapPanel.remove(legend2)
   mapPanel.add(legend2)
  switch(selectYear.getValue()){
      case '2000':
     funcBuiltUp(Classified2000.clip(roi),roiName,yearC)
        break;
      case '2005':
      funcBuiltUp(Classified2005.clip(roi),roiName,yearC)
        break;
      case '2010':
      funcBuiltUp(Classified2010.clip(roi),roiName,yearC)
        break;
      case '2015':
      funcBuiltUp(Classified2015.clip(roi),roiName,yearC)
        break;
      case '2020':
      funcBuiltUp(Classified2020.clip(roi),roiName,yearC)
        break;
  }
};
var Runbutton = ui.Button({
  label: 'Add Landcover Map',
  onClick: task_final
});
mainPanel.add(Runbutton);
var Chartbutton2 = ui.Button({
  label: 'Add Landcover Chart',
  onClick: taskOlkeri_C
});
mainPanel.add(Chartbutton2);
var Builtbutton= ui.Button({
  label: 'Add Built-Up Map',
  onClick: taskBuiltUP
});
mainPanel.add(Builtbutton);
//add a panel
var legend=ui.Panel({
  style:{
    position:'bottom-right',
    padding:'5px'
  }
});
var legend2=ui.Panel({
  style:{
    position:'bottom-right',
    padding:'5px'
  }
});
//add a title
var title=ui.Label({
  value:'Legend',
  style:{
    fontSize:'16px',
    fontWeight:'bold',
    margin:'0px',
    position:'bottom-right',
  }
});
//add title to panel
legend.add(title);
legend2.add(title)
//construct a legend
var colours=['red','green','#87ff8a','#feffa1','blue'];
var lc_classes=['Built Up Areas','Forested Areas','Vegetation','Bare Ground','Water'];
//function for making a legend
var list_legend=function(color,description){
  var c=ui.Label({
    style:{
      backgroundColor:color,
      padding:'10px',
      margin:'2px'
    }
  });
  var lc=ui.Label({
    value:description,
    style:{
      padding:'10px',
      margin:'2px'
    }
  });
  return ui.Panel({
    widgets:[c,lc],
    layout:ui.Panel.Layout.Flow('horizontal')
  });
};
var coloursB=['#ff0000','#808080',];
var lc_classesB=['Built Up Areas','Non-Built Up']
for (var b=0;b<5;b++){
  legend.add(list_legend(colours[b],lc_classes[b]));
}
for (var a=0;a<2;a++){
  legend2.add(list_legend(coloursB[a],lc_classesB[a]));
}
//create a clear button and add it to the Main Panel
var Clearbutton = ui.Button({
  label: 'Clear Map',
  onClick: function() {
    mapPanel.clear();
    legend.clear()
  }
});
mainPanel.add(Clearbutton);
 var descriptionGHSL= ui.Label('The Global Human Settlement Layer (GHSL) a project supported by the European Commission provides a dataset for built up areas, to view the built up foot print select ward and the period you want to display',style_description)
 mainPanel.add(descriptionGHSL)
 //define epochs
 var PeriodKN={
  '1975':'built-up up to 1975 epoch',
  '1975-1990':'Built-up from 1975 to 1990 epochs',
  '1990-2000':'Built-up from 1990 to 2000 epochs',
  '2000-2015':'Built-up from 2000 to 2014 epochs',
};
//Create the button for selecting period
var selectPeriod=ui.Select({
  placeholder:'Select A Period',
  items:Object.keys(PeriodKN)
});
//Create the button for selecting Regions
var selectRegion2=ui.Select({
  placeholder:'Select A Region',
  items:Object.keys(locations)
});
mainPanel.add(selectPeriod);
mainPanel.add(selectRegion2);
var taskOlkeri2=function(){
  var roi=locations[selectRegion2.getValue()]
  switch(selectPeriod.getValue()){
      case '1975':
        var subset = GHSL.select("built").eq(6).selfMask();
        mapPanel.addLayer(roi,{},'Olkeri')
        mapPanel.addLayer(subset.clip(roi),{palette:'red'},'Built Up before 1975')
        break;
      case '1975-1990':
        var subset = GHSL.select("built").eq(5).selfMask();
        mapPanel.addLayer(roi,{},'Olkeri')
        mapPanel.addLayer(subset.clip(roi),{palette:'red'},'Built up between 1975-1999')
        break;
      case '1990-2000':
        var subset = GHSL.select("built").eq(4).selfMask();
        mapPanel.addLayer(roi,{},'Olkeri')
        mapPanel.addLayer(subset.clip(roi),{palette:'red'},'Built up between 1990-2000')
        break;
      case '2000-2015':
        var subset = GHSL.select("built").eq(3).selfMask();
        mapPanel.addLayer(roi,{},'Olkeri')
        mapPanel.addLayer(subset.clip(roi),{palette:'red'},'Built up between 2000-2015')
        break;
  }
};
var taskOngata_Rongai2=function(){
  var roi=locations[selectRegion2.getValue()]
  switch(selectPeriod.getValue()){
      case '1975':
        var subset = GHSL.select("built").eq(6).selfMask();
        mapPanel.addLayer(roi,{},'Ongata Rongai')
        mapPanel.addLayer(subset.clip(roi),{palette:'red'},'Built Up before 1975')
        break;
      case '1975-1990':
        var subset = GHSL.select("built").eq(5).selfMask();
        mapPanel.addLayer(roi,{},'Ongata Rongai')
        mapPanel.addLayer(subset.clip(roi),{palette:'red'},'Built up between 1975-1999')
        break;
      case '1990-2000':
        var subset = GHSL.select("built").eq(4).selfMask();
        mapPanel.addLayer(roi,{},'Ongata Rongai')
        mapPanel.addLayer(subset.clip(roi),{palette:'red'},'Built up between 1990-2000')
        break;
      case '2000-2015':
        var subset = GHSL.select("built").eq(3).selfMask();
        mapPanel.addLayer(roi,{},'Ongata Rongai')
        mapPanel.addLayer(subset.clip(roi),{palette:'red'},'Built up between 2000-2015')
        break;
  }
};
var oloolua2=function(){
  var roi=locations[selectRegion2.getValue()]
  switch(selectPeriod.getValue()){
      case '1975':
        var subset = GHSL.select("built").eq(6).selfMask();
        mapPanel.addLayer(roi,{},'Oloolua')
        mapPanel.addLayer(subset.clip(roi),{palette:'red'},'Built Up before 1975')
        break;
      case '1975-1990':
        var subset = GHSL.select("built").eq(5).selfMask();
        mapPanel.addLayer(roi,{},'Oloolua')
        mapPanel.addLayer(subset.clip(roi),{palette:'red'},'Built up between 1975-1999')
        break;
      case '1990-2000':
        var subset = GHSL.select("built").eq(4).selfMask();
        mapPanel.addLayer(roi,{},'Oloolua')
        mapPanel.addLayer(subset.clip(roi),{palette:'red'},'Built up between 1990-2000')
        break;
      case '2000-2015':
        var subset = GHSL.select("built").eq(3).selfMask();
        mapPanel.addLayer(roi,{},'Oloolua')
        mapPanel.addLayer(subset.clip(roi),{palette:'red'},'Built up between 2000-2015')
        break;
  }
};
var taskNkaimurunya2=function(){
  var roi=locations[selectRegion2.getValue()]
  switch(selectPeriod.getValue()){
      case '1975':
        var subset = GHSL.select("built").eq(6).selfMask();
        mapPanel.addLayer(roi,{},'Nkaimurunya2')
        mapPanel.addLayer(subset.clip(roi),{palette:'red'},'Built Up before 1975')
        break;
      case '1975-1990':
        var subset = GHSL.select("built").eq(5).selfMask();
        mapPanel.addLayer(roi,{},'Nkaimurunya2')
        mapPanel.addLayer(subset.clip(roi),{palette:'red'},'Built up between 1975-1990')
        break;
      case '1990-2000':
        var subset = GHSL.select("built").eq(4).selfMask();
        mapPanel.addLayer(roi,{},'Nkaimurunya2')
        mapPanel.addLayer(subset.clip(roi),{palette:'red'},'Built up between 1990-2000')
        break;
      case '2000-2015':
        var subset = GHSL.select("built").eq(3).selfMask();
        mapPanel.addLayer(roi,{},'Nkaimurunya2')
        mapPanel.addLayer(subset.clip(roi),{palette:'red'},'Built up between 2000-2015')
        break;
  }
};
var Ngong2=function(){
  var roi=locations[selectRegion2.getValue()]
  switch(selectPeriod.getValue()){
      case '1975':
        var subset = GHSL.select("built").eq(6).selfMask();
        mapPanel.addLayer(roi,{},'Ngong')
        mapPanel.addLayer(subset.clip(roi),{palette:'red'},'Built Up before 1975')
        break;
      case '1975-1990':
        var subset = GHSL.select("built").eq(5).selfMask();
        mapPanel.addLayer(roi,{},'Ngong')
        mapPanel.addLayer(subset.clip(roi),{palette:'red'},'Built up between 1975-1999')
        break;
      case '1990-2000':
        var subset = GHSL.select("built").eq(4).selfMask();
        mapPanel.addLayer(roi,{},'Ngong')
        mapPanel.addLayer(subset.clip(roi),{palette:'red'},'Built up between 1990-2000')
        break;
      case '2000-2015':
        var subset = GHSL.select("built").eq(3).selfMask();
        mapPanel.addLayer(roi,{},'Ngong')
        mapPanel.addLayer(subset.clip(roi),{palette:'red'},'Built up between 2000-2015')
        break;
  }
};
var taskKajiado_Sub_County2=function(){
  var roi=locations[selectRegion2.getValue()]
  switch(selectPeriod.getValue()){
      case '1975':
        var subset = GHSL.select("built").eq(6).selfMask();
        mapPanel.addLayer(roi,{palette:'grey'},'Kajiado Sub County')
        mapPanel.addLayer(subset.clip(roi),{palette:'red'},'Built Up before 1975')
        break;
      case '1975-1990':
        var subset = GHSL.select("built").eq(5).selfMask();
        mapPanel.addLayer(roi,{palette:'grey'},'Kajiado Sub County')
        mapPanel.addLayer(subset.clip(roi),{palette:'red'},'Built up between 1975-1999')
        break;
      case '1990-2000':
        var subset = GHSL.select("built").eq(4).selfMask();
        mapPanel.addLayer(roi,{palette:'grey'},'Kajiado Sub County')
        mapPanel.addLayer(subset.clip(roi),{palette:'red'},'Built up between 1990-2000')
        break;
      case '2000-2015':
        var subset = GHSL.select("built").eq(3).selfMask();
        mapPanel.addLayer(roi,{palette:'grey'},'Kajiado Sub County')
        mapPanel.addLayer(subset.clip(roi),{palette:'red'},'Built up between 2000-2015')
        break;
  }
};
var task_final2=function(){
  var roi=locations[selectRegion2.getValue()]
  switch(selectRegion2.getValue()){
      case 'Olkeri':
      mapPanel.centerObject(roi,12)
        taskOlkeri2()
        break;
      case 'Ongata_Rongai':
      mapPanel.centerObject(roi,13)
        taskOngata_Rongai2()
        break;
      case 'Nkaimurunya':
      mapPanel.centerObject(roi,13)
        taskNkaimurunya2()
        break;
      case 'Ngong':
      mapPanel.centerObject(roi,13)
        taskNgong2()
        break;
      case 'Kajiado_Sub_County':
      mapPanel.centerObject(roi,12)
        taskKajiado_Sub_County2()
        break;
  }
};
var Runbutton2 = ui.Button({
  label: 'Add Map',
  onClick: task_final2
});
mainPanel.add(Runbutton2);
//create a clear button and add it to the Main Panel
var Clearbutton2 = ui.Button({
  label: 'Clear Map',
  onClick: function() {
    mapPanel.clear();
    legend.clear()
  }
});
mainPanel.add(Clearbutton2);