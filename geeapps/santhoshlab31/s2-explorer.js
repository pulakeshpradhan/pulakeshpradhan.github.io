/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var city = ee.FeatureCollection("users/santhoshlab31/porirua-city-council-wards");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var center = {lon:174.900, lat:-41.139, zoom:11}
var leftMap = ui.Map({center:center})
var rightMap = ui.Map({center:center})
var linker = ui.Map.Linker([leftMap, rightMap])
var splitPanel = ui.SplitPanel({firstPanel:leftMap, secondPanel:rightMap, orientation:'horizontal', wipe:true})
ui.root.clear() // Clears Map
// How to add Layer 
// Map.addLayer(eeObject, visParams, name, shown, opacity)
var dataset = ee.ImageCollection('COPERNICUS/S2_SR') 
var visualization = {
  min: 0.0,
  max: 3000,
  bands: ['B4', 'B3', 'B2'],
};
var ndviVis = {bands:['ndvi'],   min:0, max:1.0, palette: ['white', 'green']}
var mndwiVis = {bands:['mndwi'], min:0, max:0.5, palette: ['white', 'blue']}
var ndbiVis = {bands:['ndbi'],   min:0, max:0.5, palette: ['white', 'grey']}
var bsiVis =  {bands:['bsi'],    min:0, max:0.8, palette: ['white', 'red']}
var aweiVis = {bands:['awei'],   min:0, max:0.7, palette: ['white', 'blue']}
var addIndices = function(image) {
  var ndvi = image.normalizedDifference(['B8', 'B4']).rename(['ndvi']);
  var ndbi = image.normalizedDifference(['B11', 'B8']).rename(['ndbi']);
  var mndwi = image.normalizedDifference(['B3', 'B11']).rename(['mndwi']); 
  return image.addBands(ndvi).addBands(ndbi).addBands(mndwi)
}
{
// Left Map
var leftData = dataset.filter(ee.Filter.date('2020-01-01', '2021-01-01'))
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                  .median();
leftMap.addLayer(leftData.clip(city), visualization, '2020 RGB');
leftData = addIndices(leftData)
}
{
//Right Map
var rightData = dataset.filter(ee.Filter.date('2021-01-01', '2022-01-01'))
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                  .median()
rightMap.addLayer(rightData.clip(city), visualization, '2021 RGB');
}
function computeLeft(){
// Left Map 
var startDate = startDateLeft.getValue()
var endDate = endDateLeft.getValue()
var leftData = dataset.filter(ee.Filter.date(startDate, endDate))
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                  .median();
leftMap.clear()
var name = ee.String(ee.String(startDate).cat('_')).cat(ee.String(endDate))
leftMap.addLayer(leftData.clip(city), visualization, 'RGB');
return leftData
}
function computeIndicesLeft(){
  leftMap.clear()
  var leftData = computeLeft()
  leftData = addIndices(leftData) 
  var boolNdvi =   ndviCheckBoxLeft.getValue()
  var boolNdbi =   ndbiCheckBoxLeft.getValue()
  var boolMndwi =  mndwiCheckBoxLeft.getValue()
  var opacityNdvi = ee.Number(ee.Number(ndviSliderLeft.getValue()).divide(100)).evaluate(function(opacity){
     leftMap.addLayer(leftData.clip(city), ndviVis, 'ndvi', boolNdvi, opacity)})
  var opacityNdbi = ee.Number(ee.Number(ndbiSliderLeft.getValue()).divide(100)).evaluate(function(opacity){
     leftMap.addLayer(leftData.clip(city), ndbiVis, 'ndbi', boolNdbi, opacity)})
  var opacityMndbi = ee.Number(ee.Number(mndwiSliderLeft.getValue()).divide(100)).evaluate(function(opacity){
     leftMap.addLayer(leftData.clip(city), ndbiVis, 'ndbi', boolMndwi, opacity)})
  var histogram = ui.Chart.image.histogram({
  image: leftData.select('ndvi'),
  region: city,
  scale: 30,
  maxPixels:1e13,
  minBucketWidth:0.025
  });
  ndviHistogramLeft.style().set({'shown':true})
  ndviHistogramLeft.add(histogram)
}
function computeRight(){
// Left Map 
var startDate = startDateRight.getValue()
var endDate = endDateRight.getValue()
var rightData = dataset.filter(ee.Filter.date(startDate, endDate))
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                  .median();
rightMap.clear()
var name = ee.String(ee.String(startDate).cat('_')).cat(ee.String(endDate))
rightMap.addLayer(rightData.clip(city), visualization, 'RGB');
return rightData
}
function computeIndicesRight(){
  rightMap.clear()
  var rightData = computeRight()
  rightData = addIndices(rightData) 
  var boolNdvi =   ndviCheckBoxRight.getValue()
  var boolNdbi =   ndbiCheckBoxRight.getValue()
  var boolMndwi =  mndwiCheckBoxRight.getValue()
  var opacityNdvi = ee.Number(ee.Number(ndviSliderRight.getValue()).divide(100)).evaluate(function(opacity){
     rightMap.addLayer(rightData.clip(city), ndviVis, 'ndvi', boolNdvi, opacity)})
  var opacityNdbi = ee.Number(ee.Number(ndbiSliderRight.getValue()).divide(100)).evaluate(function(opacity){
     rightMap.addLayer(rightData.clip(city), ndbiVis, 'ndbi', boolNdbi, opacity)})
  var opacityMndbi = ee.Number(ee.Number(mndwiSliderRight.getValue()).divide(100)).evaluate(function(opacity){
     rightMap.addLayer(rightData.clip(city), ndbiVis, 'ndbi', boolMndwi, opacity)})
  var histogram = ui.Chart.image.histogram({
  image: leftData.select('ndvi'),
  region: city,
  scale: 30,
  maxPixels:1e13,
  minBucketWidth:0.025
  });
  ndviHistogramRight.style().set({'shown':true})
  ndviHistogramRight.add(histogram)
}
// PANEL 
// LEFT PANEL
var leftPanel = ui.Panel({
  style: {width: '350px'}
});
var leftTitle = ui.Label({
  value: 'Left Map controls',
  style: {'fontSize': '18px'}
});
var filterTextLeft = ui.Panel()
var filterLab1Left = ui.Label({value:'Start date', style:{color:'black', width:'150px', fontWeight:'bold'}})
var filterLab2Left = ui.Label({value:'End date',style:{fontWeight:'bold'}})
filterTextLeft.add(filterLab1Left)
filterTextLeft.add(filterLab2Left)
filterTextLeft.setLayout(ui.Panel.Layout.flow('horizontal'))
var filterPanelLeft = ui.Panel(); 
var datePanelLeft = ui.Panel()
var startDateLeft = ui.Textbox({
  placeholder:'YYYY-MM-DD',   
  onChange:function(){
  var date = ee.Number(ee.Date(startDateLeft.getValue()).millis())
  var minDate = ee.Number(ee.Date('2017-05-01').millis())
  var bool = ee.Algorithms.If(date.gte(minDate), false, true)
  filterLab1Left2.setValue('Please Enter Date in yyyy-MM-dd format')
  filterLab1Left2.style().set({color:'#8B0000'})
  if (bool.getInfo()){
    filterLab1Left2.setValue('Entered date is less than 2017-05-01')
    filterLab1Left2.style().set({color:'#8B0000'}) // red
  }else{
    filterLab1Left2.setValue('Please Enter your end date')
    filterLab1Left2.style().set({color:'#006400'}) // green
  }
}
})
var endDateLeft = ui.Textbox({placeholder:'YYYY-MM-DD', onChange:function(){
  var startDate = ee.Number(ee.Date(startDateLeft.getValue()).millis())
  var endDate = ee.Number(ee.Date(endDateLeft.getValue()).millis())
  var diff = endDate.subtract(startDate)
  var bool = ee.Algorithms.If(diff.gte(518400000), false, true)
  filterLab2Left2.setValue('Please Enter Date in yyyy-MM-dd format')
  filterLab2Left2.style().set({color:'#8B0000'})
  if (bool.getInfo()){
    filterLab2Left2.setValue('End Date should be atleast 6 days greate than start date')
    filterLab2Left2.style().set({color:'#8B0000'}) // red
  }else{
    filterLab2Left2.setValue('Please proceed to Load')
    filterLab2Left2.style().set({color:'#006400'}) // green
    loadRGBLeft.setDisabled(false)
    loadIndexLeft.setDisabled(false)
  }
}})
datePanelLeft.add(startDateLeft)
datePanelLeft.add(endDateLeft)
datePanelLeft.setLayout(ui.Panel.Layout.flow('horizontal'))
var filterTextLeft2 = ui.Panel()
var filterLab1Left2 = ui.Label({value:'Start Date should be greater than 2017-03-28', style:{color:'#696969'}})
var filterLab2Left2 = ui.Label({value:'End date should be 6 days greater than start date',style:{color:'#696969'}})
filterTextLeft2.add(filterLab1Left2)
filterTextLeft2.add(filterLab2Left2)
filterTextLeft2.setLayout(ui.Panel.Layout.flow('vertical'))
filterPanelLeft.add(filterTextLeft)
filterPanelLeft.add(datePanelLeft)
filterPanelLeft.add(filterTextLeft2)
var loadPanelLeft = ui.Panel()
var loadRGBLeft = ui.Button({
  label:'Load RGB',
  onClick:function(){computeLeft()},
  disabled:true
  })
var loadIndexLeft = ui.Button({
  label:'Load Indices',
  onClick:function(){indexPanelLeft.style().set({'shown':true})},
  disabled:true
  })
loadPanelLeft.add(loadRGBLeft)
loadPanelLeft.add(loadIndexLeft)
loadPanelLeft.setLayout(ui.Panel.Layout.flow('horizontal'))
var indexPanelLeft = ui.Panel()
indexPanelLeft.style().set({'shown':false})
var ndviPanelLeft = ui.Panel()
var ndviCheckBoxLeft = ui.Checkbox({label:"ndvi", value:false, disabled:false, onChange:function(){computeIndicesLeft()}})
var ndviSliderLeft = ui.Slider({min:0, max:100, value:100, step:2, disabled:false, onChange:function(){computeIndicesLeft()}})
ndviSliderLeft.style().set({'width':'200px'})
ndviPanelLeft.add(ndviCheckBoxLeft)
ndviPanelLeft.add(ndviSliderLeft)
ndviPanelLeft.setLayout(ui.Panel.Layout.flow('horizontal'))
var ndbiPanelLeft = ui.Panel()
var ndbiCheckBoxLeft = ui.Checkbox({label:"ndbi", value:false, disabled:false, onChange:function(){computeIndicesLeft()}})
var ndbiSliderLeft = ui.Slider({min:0, max:100, value:100, step:2, disabled:false, onChange:function(){computeIndicesLeft()}})
ndbiSliderLeft.style().set({'width':'200px'})
ndbiPanelLeft.add(ndbiCheckBoxLeft)
ndbiPanelLeft.add(ndbiSliderLeft)
ndbiPanelLeft.setLayout(ui.Panel.Layout.flow('horizontal'))
var mndwiPanelLeft = ui.Panel()
var mndwiCheckBoxLeft = ui.Checkbox({label:"mndwi", value:false, disabled:false, onChange:function(){computeIndicesLeft()}})
var mndwiSliderLeft = ui.Slider({min:0, max:100, value:100, step:2, disabled:false, onChange:function(){computeIndicesLeft()}})
mndwiSliderLeft.style().set({'width':'200px'})
mndwiPanelLeft.add(mndwiCheckBoxLeft)
mndwiPanelLeft.add(mndwiSliderLeft)
mndwiPanelLeft.setLayout(ui.Panel.Layout.flow('horizontal'))
indexPanelLeft.add(ndviPanelLeft)
indexPanelLeft.add(ndbiPanelLeft)
indexPanelLeft.add(mndwiPanelLeft)
var ndviHistogramLeft = ui.Panel()
ndviHistogramLeft.style().set({'shown':false})
leftPanel.add(leftTitle)
leftPanel.add(filterPanelLeft)
leftPanel.add(loadPanelLeft)
leftPanel.add(indexPanelLeft)
leftPanel.add(ndviHistogramLeft)
// Right Panel 
var rightPanel = ui.Panel({
  style: {width: '350px'}
});
var rightTitle = ui.Label({
  value: 'Right Map controls',
  style: {'fontSize': '18px'}
});
var filterTextRight = ui.Panel()
var filterLab1Right = ui.Label({value:'Start date', style:{color:'black', width:'150px', fontWeight:'bold'}})
var filterLab2Right = ui.Label({value:'End date',style:{fontWeight:'bold'}})
filterTextRight.add(filterLab1Right)
filterTextRight.add(filterLab2Right)
filterTextRight.setLayout(ui.Panel.Layout.flow('horizontal'))
var filterPanelRight = ui.Panel(); 
var datePanelRight = ui.Panel()
var startDateRight = ui.Textbox({
  placeholder:'YYYY-MM-DD',   
  onChange:function(){
  var date = ee.Number(ee.Date(startDateRight.getValue()).millis())
  var minDate = ee.Number(ee.Date('2017-05-01').millis())
  var bool = ee.Algorithms.If(date.gte(minDate), false, true)
  filterLab1Right2.setValue('Please Enter Date in yyyy-MM-dd format')
  filterLab1Right2.style().set({color:'#8B0000'})
  if (bool.getInfo()){
    filterLab1Right2.setValue('Entered date is less than 2017-05-01')
    filterLab1Right2.style().set({color:'#8B0000'}) // red
  }else{
    filterLab1Right2.setValue('Please Enter your end date')
    filterLab1Right2.style().set({color:'#006400'}) // green
  }
}
})
var endDateRight = ui.Textbox({placeholder:'YYYY-MM-DD', onChange:function(){
  var startDate = ee.Number(ee.Date(startDateRight.getValue()).millis())
  var endDate = ee.Number(ee.Date(endDateRight.getValue()).millis())
  var diff = endDate.subtract(startDate)
  var bool = ee.Algorithms.If(diff.gte(518400000), false, true)
  filterLab2Right2.setValue('Please Enter Date in yyyy-MM-dd format')
  filterLab2Right2.style().set({color:'#8B0000'})
  if (bool.getInfo()){
    filterLab2Right2.setValue('End Date should be atleast 6 days greate than start date')
    filterLab2Right2.style().set({color:'#8B0000'}) // red
  }else{
    filterLab2Right2.setValue('Please proceed to Load')
    filterLab2Right2.style().set({color:'#006400'}) // green
    loadRGBRight.setDisabled(false)
    loadIndexRight.setDisabled(false)
  }
}})
datePanelRight.add(startDateRight)
datePanelRight.add(endDateRight)
datePanelRight.setLayout(ui.Panel.Layout.flow('horizontal'))
var filterTextRight2 = ui.Panel()
var filterLab1Right2 = ui.Label({value:'Start Date should be greater than 2017-03-28', style:{color:'#696969'}})
var filterLab2Right2 = ui.Label({value:'End date should be 6 days greater than start date',style:{color:'#696969'}})
filterTextRight2.add(filterLab1Right2)
filterTextRight2.add(filterLab2Right2)
filterTextRight2.setLayout(ui.Panel.Layout.flow('vertical'))
filterPanelRight.add(filterTextRight)
filterPanelRight.add(datePanelRight)
filterPanelRight.add(filterTextRight2)
var loadPanelRight = ui.Panel()
var loadRGBRight = ui.Button({
  label:'Load RGB',
  onClick:function(){computeRight()},
  disabled:true
  })
var loadIndexRight = ui.Button({
  label:'Load Indices',
  onClick:function(){indexPanelRight.style().set({'shown':true})},
  disabled:true
  })
loadPanelRight.add(loadRGBRight)
loadPanelRight.add(loadIndexRight)
loadPanelRight.setLayout(ui.Panel.Layout.flow('horizontal'))
var indexPanelRight = ui.Panel()
indexPanelRight.style().set({'shown':false})
var ndviPanelRight = ui.Panel()
var ndviCheckBoxRight = ui.Checkbox({label:"ndvi", value:false, disabled:false, onChange:function(){computeIndicesRight()}})
var ndviSliderRight = ui.Slider({min:0, max:100, value:100, step:2, disabled:false, onChange:function(){computeIndicesRight()}})
ndviSliderRight.style().set({'width':'200px'})
ndviPanelRight.add(ndviCheckBoxRight)
ndviPanelRight.add(ndviSliderRight)
ndviPanelRight.setLayout(ui.Panel.Layout.flow('horizontal'))
var ndbiPanelRight = ui.Panel()
var ndbiCheckBoxRight = ui.Checkbox({label:"ndbi", value:false, disabled:false, onChange:function(){computeIndicesRight()}})
var ndbiSliderRight = ui.Slider({min:0, max:100, value:100, step:2, disabled:false, onChange:function(){computeIndicesRight()}})
ndbiSliderRight.style().set({'width':'200px'})
ndbiPanelRight.add(ndbiCheckBoxRight)
ndbiPanelRight.add(ndbiSliderRight)
ndbiPanelRight.setLayout(ui.Panel.Layout.flow('horizontal'))
var mndwiPanelRight = ui.Panel()
var mndwiCheckBoxRight = ui.Checkbox({label:"mndwi", value:false, disabled:false, onChange:function(){computeIndicesRight()}})
var mndwiSliderRight = ui.Slider({min:0, max:100, value:100, step:2, disabled:false, onChange:function(){computeIndicesRight()}})
mndwiSliderRight.style().set({'width':'200px'})
mndwiPanelRight.add(mndwiCheckBoxRight)
mndwiPanelRight.add(mndwiSliderRight)
mndwiPanelRight.setLayout(ui.Panel.Layout.flow('horizontal'))
indexPanelRight.add(ndviPanelRight)
indexPanelRight.add(ndbiPanelRight)
indexPanelRight.add(mndwiPanelRight)
var ndviHistogramRight = ui.Panel()
ndviHistogramRight.style().set({'shown':false})
rightPanel.add(rightTitle)
rightPanel.add(filterPanelRight)
rightPanel.add(loadPanelRight)
rightPanel.add(indexPanelRight)
rightPanel.add(ndviHistogramRight)
// Root Add 
var top = ui.Panel()
var dummy = ui.Label({
  value:" ",
  style:{width:'350px'}})
var topStyle = {
  stretch: 'horizontal',
  textAlign: 'center',
  fontSize: '18px',
  backgroundColor:'#F5F5F5'
}
var title = ui.Label('Sentinel 2 Data vizualization', topStyle);
title.style().set({fontWeight: 'bold'})
var creatorPanel = ui.Panel()
var creator = ui.Label({
  value:'Creator:',
  style:{
  fontSize: '16px',
  backgroundColor:'#F5F5F5'
}
});
creator.style().set({fontWeight: 'left'})
var linkedIn = ui.Label({
  value:'Santhosh M',
  style:{
  fontSize: '16px',
  backgroundColor:'#F5F5F5',
  color:'blue'
},
  targetUrl:'https://www.linkedin.com/in/santhoshmanikandan/'})
linkedIn.style().set({fontWeight: 'left'}) 
creatorPanel.add(creator)
creatorPanel.add(linkedIn)
creatorPanel.style().set({width:'350px'})
creatorPanel.style().set({'backgroundColor':'#F5F5F5'})
creatorPanel.setLayout(ui.Panel.Layout.Flow('horizontal'));
top.add(dummy)
top.add(title)
top.add(creatorPanel)
top.style().set({'backgroundColor':'#F5F5F5'})
top.setLayout(ui.Panel.Layout.Flow('horizontal'));
var allPanel = ui.Panel()
allPanel.add(leftPanel);
allPanel.add(splitPanel);  
allPanel.add(rightPanel);
allPanel.setLayout(ui.Panel.Layout.Flow('horizontal'));
allPanel.style().set({'stretch':'vertical'})
ui.root.widgets().reset([top, allPanel]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));