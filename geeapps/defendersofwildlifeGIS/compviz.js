var image = ui.import && ui.import("image", "image", {
      "id": "users/defendersofwildlifeGIS/LongIsland/parking_deeplab_10k"
    }) || ee.Image("users/defendersofwildlifeGIS/LongIsland/parking_deeplab_10k"),
    table = ui.import && ui.import("table", "table", {
      "id": "users/defendersofwildlifeGIS/LongIsland/towns"
    }) || ee.FeatureCollection("users/defendersofwildlifeGIS/LongIsland/towns"),
    NAIP = ui.import && ui.import("NAIP", "imageCollection", {
      "id": "USDA/NAIP/DOQQ"
    }) || ee.ImageCollection("USDA/NAIP/DOQQ"),
    S2 = ui.import && ui.import("S2", "imageCollection", {
      "id": "COPERNICUS/S2"
    }) || ee.ImageCollection("COPERNICUS/S2"),
    states = ui.import && ui.import("states", "table", {
      "id": "TIGER/2016/States"
    }) || ee.FeatureCollection("TIGER/2016/States"),
    JRC = ui.import && ui.import("JRC", "imageCollection", {
      "id": "JRC/GSW1_1/MonthlyRecurrence"
    }) || ee.ImageCollection("JRC/GSW1_1/MonthlyRecurrence"),
    jrc = ui.import && ui.import("jrc", "image", {
      "id": "JRC/GSW1_1/MonthlyRecurrence/monthly_recurrence_04"
    }) || ee.Image("JRC/GSW1_1/MonthlyRecurrence/monthly_recurrence_04"),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "users/defendersofwildlifeGIS/NC/errors"
    }) || ee.FeatureCollection("users/defendersofwildlifeGIS/NC/errors"),
    image3 = ui.import && ui.import("image3", "image", {
      "id": "users/defendersofwildlifeGIS/NC/raw_unet256_30_summer"
    }) || ee.Image("users/defendersofwildlifeGIS/NC/raw_unet256_30_summer");
var nc = states.filter(ee.Filter.eq('NAME', 'North Carolina'))
var huntington = table.filterMetadata('TOWN', 'equals', 'Huntington')
var empty = ee.Image().byte()
var huntImg = empty.paint({
  featureCollection: huntington,
  color: 'black',
  width: 2
})
var ncImg = empty.paint({
  featureCollection: nc,
  color: 'black',
  width: 2
})
var lotImg = image.clip(huntington).select('class_id').eq(1).updateMask(image.select('class_id').eq(1))
//var solarMax = solar.aggregate_max('area')
var lots = lotImg.reduceToVectors({
  scale: 1,
  maxPixels: 1e13,
  eightConnected: false
}).map(function(ft){
  return ft.set('area', ft.area(5).divide(4046.86))
})
//var lotsMax = lots.aggregate_max('area')
// Prepare S2 imagery basemap for solar panels
function maskS2clouds(image){
  var qa = image.select('QA60')
 // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10
  var cirrusBitMask = 1 << 11
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(qa.bitwiseAnd(cirrusBitMask).eq(0))
  return image.updateMask(mask).divide(10000)
}
// The image input data is a cloud-masked median composite.
var s2 = S2.filterDate('2019-06-01', '2019-08-31')
.filterBounds(nc)
.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
.map(maskS2clouds)
.median()
.select(['B8', 'B4', 'B3', 'B2'])
var ndvi = s2.normalizedDifference(['B8', 'B4']).lte(0.5)
// Create solar array features
var water = jrc.select('monthly_recurrence').gte(20).focal_max(2, 'square', 'pixels')
var solarImg = image3.where(water, ee.Image(0)).gte(0.99)
solarImg = solarImg.updateMask(solarImg.gte(0.99))
var solar = solarImg.reduceToVectors({
  scale: 10,
  maxPixels: 1e13,
  eightConnected: true
}).map(function(ft){
  return ft.set('area', ft.area(5).divide(4046.86))
}).filterMetadata('area', 'greater_than', 1)
// Prepare NAIP imagery for parking lot basemap
var naip = NAIP.filterDate('2017-01-01', '2017-12-31').median();
var leftMap = ui.Map()
var rightMap = ui.Map()
leftMap.addLayer(naip, {'bands':['R', "G", 'B'], 'min':20, 'max':200}, 'NAIP')
leftMap.addLayer(huntImg, {}, 'Huntington')
rightMap.addLayer(naip, {'bands':['R', "G", 'B'], 'min':20, 'max':200}, 'NAIP')
rightMap.addLayer(huntImg, {}, 'Huntington')
rightMap.addLayer(lots, {'color':'#ff08f7'}, 'Parking Lots')
//rightMap.addLayer(lotImg, {'bands': 'probability', 'min': 0, 'max': 0.5, 'palette':'#ff08f7'}, 'Parking Lots')
var linked = ui.Map.Linker([leftMap, rightMap])
var split = ui.SplitPanel({
  firstPanel: leftMap.setCenter(-73.3845, 40.847, 11),
  secondPanel: rightMap,
  orientation: 'horizontal',
  wipe: true
})
function switchView(string){
  if (string == 'Parking (LI)'){
    slider.setMax(50).setStep(0.1).setValue(0)
    leftMap.clear()
    rightMap.clear()
    leftMap.addLayer(naip, {'bands':['R', "G", 'B'], 'min':20, 'max':200}, 'NAIP')
    leftMap.addLayer(huntImg, {}, 'Huntington')
    rightMap.addLayer(naip, {'bands':['R', "G", 'B'], 'min':20, 'max':200}, 'NAIP')
    rightMap.addLayer(huntImg, {}, 'Huntington')
    rightMap.addLayer(lots, {'color':'#ff08f7'}, 'Parking Lots')
    leftMap.add(panel)
    rightMap.add(sliderPanel)
    leftMap.setCenter(-73.3845, 40.847, 11)
  }else if (string == 'Solar (NC)'){
    slider.setMax(1000).setValue(0)
    leftMap.clear()
    rightMap.clear()
    leftMap.addLayer(s2, {'bands':['B4', "B3", 'B2'], 'min':0.05, 'max':0.13}, 'Sentinel 2')
    leftMap.addLayer(ncImg, {}, 'North Carolina')
    rightMap.addLayer(s2, {'bands':['B4', "B3", 'B2'], 'min':0.05, 'max':0.13}, "Sentinel 2 (Aug '19)")
    rightMap.addLayer(ncImg, {}, 'North Carolina')
    rightMap.addLayer(solar, {'color':'#ff8202'}, 'Solar Arrays')
    leftMap.add(panel)
    rightMap.add(sliderPanel)
    leftMap.setCenter(-78.6265, 35.784, 8)
  }
}
var selector = ui.Select({
  items:['Parking (LI)', 'Solar (NC)'],
  placeholder: 'Choose Parking or Solar',
  onChange: switchView,
  value: 'Parking (LI)',
  style: {
  'font-size' : '12px',
  'text-align' : 'center',
  'position' : 'bottom-center',
  'width' : '150px'
  }
})
var title = ui.Label({
  value: 'Find solar panels in North Carolina, or parking lots in Huntington, NY',
  style: {
  'font-weight': 'bold',
  'font-size' : '14px',
  'text-align' : 'center',
  'position' : 'top-center',
  'width' : '250px',
  'stretch':'horizontal'
  }
})
var panel = ui.Panel({
  widgets: [title, selector],
  style: {
    'border' : '1.5px solid black',
    'text-align' : 'center',
    'position' : 'top-left',
    'width' : '300px',
    'height' : '125px'
  },
  layout: ui.Panel.Layout.flow('vertical', true)
});
function filter_size(value){
  var bigSolar = solar.filterMetadata('area', 'greater_than', value)
  var bigLots = lots.filterMetadata('area', 'greater_than', value)
  var test = selector.getValue()
  if(test == 'Solar (NC)'){
    rightMap.remove(rightMap.layers().get(2))
    rightMap.addLayer(bigSolar, {'color':'#ff8202'}, 'Solar Arrays')
  }else if(test == 'Parking (LI)'){
    rightMap.remove(rightMap.layers().get(2))
    rightMap.addLayer(bigLots, {'color':'#ff08f7'}, 'Parking Lots')
  }
}
var slider = ui.Slider({
  min: 0,
  max: 20,
  step: 0.1,
  value: 0,
  onChange: filter_size,
  style: {
    'font-size' : '12px',
    'text-align' : 'center',
    'position' : 'top-center',
    'width' : '150px'
  }
})
var sliderTitle = ui.Label({
  value: 'Filter results by size (ac)',
  style: {
  'font-weight': 'bold',
  'font-size' : '14px',
  'text-align' : 'center',
  'position' : 'top-center',
  'width' : '200px',
  'stretch':'horizontal'
  }
})
var sliderPanel = ui.Panel({
  widgets: [sliderTitle, slider],
  style: {
    'border' : '1.5px solid black',
    'text-align' : 'center',
    'position' : 'bottom-right',
    'width' : '250px',
    'height' : '100px'
  },
  layout: ui.Panel.Layout.flow('vertical', true)
});
/*
var tools = ui.Map.DrawingTools();
var statPanel = ui.Panel({
  style: {
    'border' : '1.5px solid black',
    'text-align' : 'center',
    'position' : 'bottom-right',
    'width' : '300px',
    'height' : '125px'
  }
})
tools.onDraw(function(){
  statPanel.clear()
  geom = tools.layers()
  panels = solar.filterBounds(geom.get(0))
  lots = lots.filterBounds(geom.get(0))
  panelStats = panels.reduceColumns({
    reducer: ee.Reducer.sum().combine(ee.Reducer.count(), '', true),
    selectors: ['area']
  })
  lotStats = lots.reduceColumns({
    reduer: ee.Reducer.sum().combine(ee.Reducer.count(), '', true),
    selectors: ['area']
  })
  stat
  if (seletor.getValue == 'Solar (NC)'){
    statPanel.add(ui.Label({
      value: panelStats.get('count') + ' solar arrays covering' + panelStats.get('sum') + ' acres'
      })
      )
    rightMap.add(statPanel)
  }else{
    statPanel.add(ui.Label({
      value: lotStats.get('count') + ' parking lots covering' + panelStats.get('sum') + ' acres'
      })
      )
    rightMap.add(statPanel)
  }
})
*/
leftMap.add(panel)
rightMap.add(sliderPanel)
ui.root.clear()
ui.root.add(split);