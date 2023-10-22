var dataset = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017');
var ROI=dataset.filter(ee.Filter.eq('country_na','Japan'))
var start='2020-03-01'
var end='2020-04-01'
var composite_bandNames=['Red','Green','Blue','Near Infrared','Short Wave Infrared','QF1']
var VIIRS_bands=['I1', 'M4', 'M3','I2','I3','QF1']
var MODIS_bands=['sur_refl_b01', 'sur_refl_b04', 'sur_refl_b03','sur_refl_b02','sur_refl_b06','state_1km']
var visParams={min:0,max:0.25,bands:['Red','Green','Blue']}
function bitwiseExtract(value, fromBit, toBit) {
  if (toBit === undefined) toBit = fromBit
  var maskSize = ee.Number(1).add(toBit).subtract(fromBit)
  var mask = ee.Number(1).leftShift(maskSize).subtract(1)
  return value.rightShift(fromBit).bitwiseAnd(mask)
}
///////////////Mask clouds by using quality values////////////
var update_CloudMask_MODIS=function(image){
  var qa = image.select('state_1km')
  var cloudState = bitwiseExtract(qa, 0, 1) 
  var cloudShadowState = bitwiseExtract(qa, 2)
  var cirrusState = bitwiseExtract(qa, 8, 9)
  var mask = cloudState.eq(0) 
  .and(cloudShadowState.eq(0))
  .and(cirrusState.eq(0))
  return image.updateMask(mask) 
}
var update_CloudMask_VIIRS=function(image){
  var qa = image.select('QF1')
  var cloudMaskQuality = bitwiseExtract(qa, 0, 1) 
  var cloudMask = bitwiseExtract(qa, 2,3)
  var mask = cloudMaskQuality.eq(3) 
  .and(cloudMask.eq(0))
  return image.updateMask(mask) 
}
var VIIRS=ee.ImageCollection("NOAA/VIIRS/001/VNP09GA")
.filterDate(start,end)
.select(VIIRS_bands)
.map(update_CloudMask_VIIRS)
.map(function(image){
  return image.clip(ROI).multiply(0.0001).rename(composite_bandNames)
});
var MOD09=ee.ImageCollection("MODIS/006/MOD09GA")
.filterDate(start,end)
.select(MODIS_bands)
.map(update_CloudMask_MODIS)
.map(function(image){
  return image.clip(ROI).multiply(0.0001).rename(composite_bandNames)
});
var MYD09=ee.ImageCollection("MODIS/006/MYD09GA")
.filterDate(start,end)
.select(MODIS_bands)
.map(update_CloudMask_MODIS)
.map(function(image){
  return image.clip(ROI).multiply(0.0001).rename(composite_bandNames)
});
/////////////////Merge image collections////////////////
var combined=MOD09.merge(MYD09).merge(VIIRS);
////////////////Add images on the map//////////////////
Map.centerObject(ROI,7)
Map.addLayer(MOD09.median(),visParams,'MOD09')
Map.addLayer(MYD09.median(),visParams,'MYD09')
Map.addLayer(VIIRS.median(),visParams,'VIIRS')
Map.addLayer(combined.median(),visParams,'composite')
/////////////Settings for the UI//////////////////////////////////////////
var mainPanel = ui.Panel({
  style: {width: '300px'}
});
var title = ui.Label({
  value: 'MODIS and VIIRS cloud free composite',
  style: {'fontSize': '24px'}
});
mainPanel.add(title)
var dropdownPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
});
mainPanel.add(dropdownPanel);
var startSelector = ui.Textbox({
  value:'2020-03-01'
  })
var endSelector = ui.Textbox({
  value:'2020-05-01'
  })
var countryName=ui.Textbox({
  value:'Japan'
})
var RedBand=ui.Textbox({
  value:'Red'
})
var GreenBand=ui.Textbox({
  value:'Green'
})
var BlueBand=ui.Textbox({
  value:'Blue'
})
var button = ui.Button('Load')
dropdownPanel.add(ui.Label('Choose the start date'))
dropdownPanel.add(startSelector)
dropdownPanel.add(ui.Label('Choose the end date'))
dropdownPanel.add(endSelector)
dropdownPanel.add(ui.Label('The target country name'))
dropdownPanel.add(countryName)
dropdownPanel.add(ui.Label('You can assign an arbitrary comnibation to RGB.'))
dropdownPanel.add(ui.Label('The available bands are:'))
dropdownPanel.add(ui.Label('[Red, Green, Blue, Near Infrared, Short Wave Infrared]'))
dropdownPanel.add(ui.Label('The band used for red'))
dropdownPanel.add(RedBand)
dropdownPanel.add(ui.Label('The band used for green'))
dropdownPanel.add(GreenBand)
dropdownPanel.add(ui.Label('The band used for blue'))
dropdownPanel.add(BlueBand)
dropdownPanel.add(button)
var loadComposite = function() {
  Map.clear()
  var ROI=dataset.filter(ee.Filter.eq('country_na',countryName.getValue()));
  var start = startSelector.getValue()
  var end = endSelector.getValue()
  var Red=RedBand.getValue()
  var Green=GreenBand.getValue()
  var Blue=BlueBand.getValue()
  Map.centerObject(ROI,7)
  var VIIRS=ee.ImageCollection("NOAA/VIIRS/001/VNP09GA")
  .filterDate(start,end)
  .select(VIIRS_bands)
  .map(update_CloudMask_VIIRS)
  .map(function(image){
    return image.clip(ROI).multiply(0.0001).rename(composite_bandNames)
  });
  var MOD09=ee.ImageCollection("MODIS/006/MOD09GA")
  .filterDate(start,end)
  .select(MODIS_bands)
  .map(update_CloudMask_MODIS)
  .map(function(image){
    return image.clip(ROI).multiply(0.0001).rename(composite_bandNames)
  });
  var MYD09=ee.ImageCollection("MODIS/006/MYD09GA")
  .filterDate(start,end)
  .select(MODIS_bands)
  .map(update_CloudMask_MODIS)
  .map(function(image){
    return image.clip(ROI).multiply(0.0001).rename(composite_bandNames)
  });
  var combined=MOD09.merge(MYD09).merge(VIIRS);
  Map.addLayer(combined.median(),{bands:[Red,Green,Blue],min:0,max:0.25},start+' to '+end+' composite');
}
button.onClick(loadComposite)
ui.root.add(mainPanel);