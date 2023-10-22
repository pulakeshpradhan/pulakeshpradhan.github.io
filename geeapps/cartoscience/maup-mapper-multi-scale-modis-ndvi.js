/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MAUP/MTUP Mapper: NDVI
// Author(s): Brad G. Peter, Department of Geography, University of Alabama
// Acknowledgments: Thanks to Michael G. Evans for assistance with QC/QA. 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Input options ----------------------------------------------------------------------------------------------------------------
var lcType = 40 // agriculture
var startYear = 2001
var endYear = 2020
// Layer loading ----------------------------------------------------------------------------------------------------------------
/*
var countries = ee.FeatureCollection('FAO/GAUL/2015/level0')
var countryList = countries.sort('ADM0_NAME').aggregate_array('ADM0_NAME').getInfo()
countryList = countryList.filter(function(item, index) {
  return countryList.indexOf(item) >= index
})
*/
var countryCodes = {
  'Cambodia': 44,
  'Indonesia': 116,
  'Lao PDR': 139,
  'Myanmar': 171,
  'Philippines': 196,
  'Thailand': 240,
  'Vietnam': 264,
  'Burundi': 43,
  'Kenya': 133,
  'Malawi': 152,
  'Mozambique': 170,
  'Rwanda': 205,
  'Uganda': 253,
  'Tanzania': 257,
  'Zambia': 270,
  'Zimbabwe': 271
}
var ic = ee.ImageCollection('MODIS/006/MOD13Q1').select('NDVI')
var lulc = ee.ImageCollection('COPERNICUS/Landcover/100m/Proba-V-C3/Global').select('discrete_classification')
var ag = lulc.mode().eq(lcType)
var water = ee.Image('JRC/GSW1_1/GlobalSurfaceWater').select('occurrence').gt(0).mask().remap([0,1],[1,0])
var lc = ag.add(water).eq(2)
var years = ee.List.sequence(startYear,endYear)
var res = 250
var colors = ['crimson','coral','burlywood','cornsilk','darkseagreen','olivedrab','darkgreen']
// Display settings -------------------------------------------------------------------------------------------------------------
var leftMap = ui.Map()
var rightMap = ui.Map()
var linker = ui.Map.Linker([leftMap, rightMap])
leftMap.setControlVisibility({zoomControl: false})
rightMap.setControlVisibility({zoomControl: false})
var hollow_L1 = {color: 'white', width: 0.3, fillColor: '00000000'}
var hollow_L2 = {color: 'white', width: 0.3, fillColor: '00000000'}
var hollowC = {color: 'e8e8e8', width: 4, fillColor: '00000000'}
var hollowS = {color: 'black', width: 1.5, fillColor: '00000000'}
var title = ui.Label('MAUP/MTUP Mapper: Multi-Scale MODIS NDVI', 
  {fontSize: '15px', fontWeight: '700', margin: '13px 6px 5px 15px', color: 'e8e8e8', backgroundColor: '303030'})
var sub = ui.Label('Annual average NDVI (NASA-MOD13Q1) on agricultural land (CGLS-LC100) by administrative level (FAO-GAUL)', 
  {fontSize: '12px', margin: '0px 15px 0px 15px', color: 'e8e8e8', backgroundColor: '303030'})
var creator = ui.Label('Created by Brad G. Peter, Department of Geography, University of Alabama © CartoScience 2021', 
  {fontSize: '12px', margin: '0px 0px 0px 15px', color: 'e8e8e8', backgroundColor: '303030'})
var disclaimer = ui.Label('Currently displaying select countries in Southeast Asia and Sub-Saharan Africa', 
  {fontSize: '12px', margin: '0px 0px 0px 15px', color: 'e8e8e8', backgroundColor: '303030'})
var webLink = ui.Label('cartoscience.com', 
  {fontSize: '12px', margin: '0 0 0 4px', color: 'e8e8e8', backgroundColor: '303030'},
  'https://cartoscience.com')
var avail = ui.Label('Associated Harvard Dataverse publication:', 
  {fontSize: '12px', margin: '0px 0px 0px 15px', color: 'e8e8e8', backgroundColor: '303030'})
var doi = ui.Label('https://doi.org/10.7910/DVN/M4ZGXP', 
  {fontSize: '12px', margin: '0 0 0 4px', color: 'e8e8e8', backgroundColor: '303030'},
  'https://doi.org/10.7910/DVN/M4ZGXP')
var creds = ui.Panel({
  widgets: [creator, webLink],
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {backgroundColor: '303030'}
})
var dataverse = ui.Panel({
  widgets: [avail,doi],
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {backgroundColor: '303030'}
})
var slider = ui.Slider({
  min: startYear,
  max: endYear,
  step: 1,
  style: {
    stretch: 'horizontal', 
    width: '200px',
    fontSize: '14px',
    margin: '10px 0 0 10px',
    backgroundColor: '303030',
    color: 'e8e8e8'
  }
})
var select = ui.Select({items: Object.keys(countryCodes), value: 'Vietnam', onChange: runMapper,
  style: {
    margin: '0 0 0 15px'
  }
})
var text = ui.Panel({
  widgets: [title, sub, creds, disclaimer, dataverse],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {backgroundColor: '303030'}
})
var selectors = ui.Panel({
  widgets: [select,slider],
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {backgroundColor: '303030'}
})
// Create legend
function ColorBar(palette) {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 1],
      dimensions: '150x5',
      format: 'png',
      palette: palette,
    },
    style: {
      stretch: 'horizontal', 
      margin: '5px 0 0 0'
    },
  })
}
var valStyle = {
  margin: '0 5px 5px 5px', 
  fontSize: '14px', 
  backgroundColor: '303030', 
  color: 'e8e8e8'
};
var val0 = ui.Label('', valStyle)
var val100 = ui.Label('', valStyle)
var legend =  ui.Panel({
  widgets: [val0, ColorBar(colors), val100],
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    backgroundColor:'303030', 
    margin: '10px 0 0 0'
  }
})
var legendElements = ui.Panel({
  widgets: [selectors,legend],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {backgroundColor: '303030', margin: '36px 0 0 10px'}
})
var topPanel = ui.Panel({
  widgets: [text, legendElements],
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {backgroundColor: '303030', height: '105px', margin: '0 0 0 0', width: '100%'}
})
var strip = ui.Panel({
  style: {backgroundColor: 'c4c4c4', height: '1px'}
})
var mapPanel = ui.Panel({
  widgets: [leftMap, rightMap],
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {stretch: 'both'}
})
var rootPanel = ui.Panel({
  widgets: [topPanel, strip, mapPanel],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {stretch: 'both'}
})
var leftLabel = ui.Label('Select a point to chart regional time-series',{fontSize: '12.25px', margin: '0 0 7px 0', color:'303030'})
var leftChart = ui.Panel({
  widgets: leftLabel,
  style: {
    width: '250px',
    position: 'top-left',
    margin: '-100px',
    border: '1px solid #6C6C6C'
  }
})
var detailsButton = ui.Button('Resources »', null, false, {margin: '0'})
var closeButton = ui.Button('« Close', null, false, {margin: '0'})
var smallFont = {
  fontSize: '12px',
  margin: '5px 0 0 0'
}
var faoLink1 = ui.Label('FAO-GAUL Level 1',{fontSize: '12px', margin: '9px 0 0 0'},'https://developers.google.com/earth-engine/datasets/catalog/FAO_GAUL_2015_level1')
var faoLink2 = ui.Label('FAO-GAUL Level 2',smallFont,'https://developers.google.com/earth-engine/datasets/catalog/FAO_GAUL_2015_level2')
var agLink = ui.Label('Land-Use/Land-Cover—CGLS-LC100',smallFont,'https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_Landcover_100m_Proba-V-C3_Global')
var ndviLink = ui.Label('MODIS NDVI—MOD13Q1.006',smallFont,'https://developers.google.com/earth-engine/datasets/catalog/MODIS_006_MOD13Q1')
var maupLink = ui.Label('Modifiable Areal Unit Problem (MAUP)',smallFont,'https://gistbok.ucgis.org/bok-topics/problems-scale-and-zoning')
var mtupLink = ui.Label('Modifiable Temporal Unit Problem (MTUP)',smallFont,'https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0100465')
var blankPanel = ui.Panel()
var resourcesPanel = ui.Panel({
  widgets: [faoLink1,faoLink2,agLink,ndviLink,maupLink,mtupLink],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '227px'}
})
blankPanel.add(detailsButton)
detailsButton.onClick(function() {
  if (blankPanel.widgets().length() < 2) {
    blankPanel.clear()
    blankPanel.add(closeButton)
    blankPanel.add(resourcesPanel)
  }
})
closeButton.onClick(function() {
  blankPanel.clear()
  blankPanel.add(detailsButton)
})
var label_L1 = ui.Panel({
  widgets: ui.Label('FAO-GAUL Level 1',{fontSize: '12px', margin: '-4px', color:'blue'}),
  style: {
    position: 'top-left',
    border: '1px solid #6C6C6C'
  }
})
var label_L2 = ui.Panel({
  widgets: ui.Label('FAO-GAUL Level 2',{fontSize: '12px', margin: '-4px', color:'red'}),
  style: {
    position: 'top-left',
    border: '1px solid #6C6C6C'
  }
})
ui.root.clear()
ui.root.add(rootPanel)
ui.root.setLayout('absolute')
leftMap.add(label_L1)
leftMap.add(leftChart)
rightMap.add(label_L2)
leftMap.setOptions('HYBRID').style().set('cursor', 'crosshair')
rightMap.setOptions('HYBRID').style().set('cursor', 'crosshair')
runMapper()
function runMapper() {
  leftMap.unlisten()
  rightMap.unlisten()
  slider.setValue(startYear)
  if (leftMap.layers().length() > 1) {
    leftMap.layers().get(1).set('shown', false)
    rightMap.layers().get(1).set('shown', false)
  }
  legend.widgets().set(0,ui.Label('',valStyle))
  legend.widgets().set(2,ui.Label('Loading values...',valStyle))
  if (leftMap.layers().length() > 4) {
    leftMap.remove(leftMap.layers().get(4))
    rightMap.remove(rightMap.layers().get(4))
    leftMap.remove(leftMap.layers().get(4))
    rightMap.remove(rightMap.layers().get(4))
  }
  leftChart.widgets().reset()
  leftChart.widgets().set(0,leftLabel)
  leftChart.widgets().set(1,ui.Panel())
  leftChart.widgets().set(2,ui.Panel())
  leftChart.widgets().set(3,ui.Panel())
  leftChart.widgets().set(4,blankPanel)
  rightMap.widgets().reset()
  var countryCode = countryCodes[select.getValue()]
  var country = ee.FeatureCollection('FAO/GAUL/2015/level'+0).filterMetadata('ADM0_CODE','equals',countryCode)
  var fc_L1 = ee.FeatureCollection('FAO/GAUL/2015/level'+1).filterMetadata('ADM0_CODE','equals',countryCode)
  var fc_L2 = ee.FeatureCollection('FAO/GAUL/2015/level'+2).filterMetadata('ADM0_CODE','equals',countryCode)
  leftMap.centerObject(country)
  var annual = ee.ImageCollection(years.map(function(y) {
    return ic.filter(ee.Filter.calendarRange(y,y,'year'))
      .mean().updateMask(lc.eq(1)).clip(country).multiply(0.0001)
      .set('year',ee.Number(y).toInt())
  }))
  var annualMin = annual.min()
  var annualMax = annual.max()
  var percMin = annualMin.reduceRegion({
    reducer: ee.Reducer.percentile([10]),
    geometry: country,
    scale: res*5,
    maxPixels: 1e13
  }).get('NDVI')
  var percMax = annualMax.reduceRegion({
    reducer: ee.Reducer.percentile([90]),
    geometry: country,
    scale: res*5,
    maxPixels: 1e13
  }).get('NDVI')
  var zonal_L1 = zonalStat(fc_L1)
  var zonal_L2 = zonalStat(fc_L2)
  var list_L1 = zonal_L1.toList(zonal_L1.size())
  var list_L2 = zonal_L2.toList(zonal_L2.size())
  var merge = zonal_L1.combine(zonal_L2)
  function zonalStat(fc) {
    return annual.map(function(i) {
      var year = i.get('year')
      return i.reduceRegions({
        collection: fc,
        reducer: ee.Reducer.mean(),
        scale: res
      }).reduceToImage({
          properties: ['mean'],
          reducer: ee.Reducer.first()
      }).rename('NDVI').set('year',year)
    })
  }
  leftMap.layers().set(0, ui.Map.Layer(country.style(hollowC),{},select.getValue()))
  rightMap.layers().set(0, ui.Map.Layer(country.style(hollowC),{},select.getValue()))
  leftMap.layers().set(1, ui.Map.Layer(country.style(hollowC),{},'Layer loading...',false))
  rightMap.layers().set(1, ui.Map.Layer(country.style(hollowC),{},'Layer loading...',false))
  percMin.evaluate(function(result_min) {
    percMax.evaluate(function(result_max) {
      var style = {min: result_min, max: result_max, palette: colors}
      legend.widgets().set(0,ui.Label(result_min.toFixed(1),valStyle))
      legend.widgets().set(2,ui.Label(result_max.toFixed(1),valStyle))
      leftMap.layers().set(1, ui.Map.Layer(ee.Image(list_L1.get(0)),style,'MODIS NDVI '+startYear))
      rightMap.layers().set(1, ui.Map.Layer(ee.Image(list_L2.get(0)),style,'MODIS NDVI '+startYear))
      slider.onChange(function() {
        var yearVal = slider.getValue()
        var val = yearVal-startYear
        leftMap.layers().set(1, ui.Map.Layer(ee.Image(list_L1.get(val)),style,'MODIS NDVI '+yearVal))
        rightMap.layers().set(1, ui.Map.Layer(ee.Image(list_L2.get(val)),style,'MODIS NDVI '+yearVal))  
      })
    })
  })
  function pickLocation(location) {
    leftChart.widgets().set(0,ui.Label('Time-series NDVI',{fontSize: '14px', fontWeight: 'bold', color: '303030', margin: '0 0 5px 0'}))
    var chartOptions = {
      fontSize: 10,
      height: '200px',
      format: 'short',
      margin: '0 0 0 0',
      hAxis: {format: '0000', textStyle: {fontSize: 11, color: '303030'}, gridlines: {count:4}},
      vAxis: {textStyle: {fontSize: 10, color: '303030'}, gridlines: {}},
      trendlines: {0: {color: 'blue', lineWidth: 0.5, visibleInLegend: false},
                   1: {color: 'red', lineWidth: 0.5, visibleInLegend: false}
      },
      series: {0: {color: 'blue', lineWidth: 0.8},
               1: {color: 'red', lineWidth: 0.8}
      },
      legend: {position:'none'}
    }
    leftChart.widgets().set(1,ui.Label('Loading...',{fontSize: '13px',color:'9C9C9C', margin: '0'}))
    leftChart.widgets().set(2,ui.Label('',{fontSize: '13px',color:'9C9C9C', margin: '0'}))
    var pLat = location.lat
    var pLon = location.lon
    var point = ee.Geometry.Point([pLon,pLat])
    var selection_L1 = fc_L1.filterBounds(point)
    var selection_L2 = fc_L2.filterBounds(point)
    var zone_L1_name = ee.Feature(selection_L1.first()).get('ADM1_NAME')
    var zone_L2_name = ee.Feature(selection_L2.first()).get('ADM2_NAME')
    leftChart.widgets().set(3,ui.Chart.image.series({
      imageCollection: merge,
      region: point,
      scale: res,
      xProperty: 'year'
    }).setOptions(chartOptions))
    zone_L1_name.evaluate(function(result_L1) {
      zone_L2_name.evaluate(function(result_L2) {
        leftChart.widgets().set(1,ui.Label(result_L1+' (L1)',{fontSize: '13px', color: 'blue', margin: '0 0 5px 0'}))
        leftChart.widgets().set(2,ui.Label(result_L2+' (L2)',{fontSize: '13px', color: 'red', margin: '0'}))
      })
    })
    //leftMap.centerObject(selection_L1)
    leftMap.layers().set(4, ui.Map.Layer(selection_L1.style(hollowS),{},'Selected area'))
    rightMap.layers().set(4, ui.Map.Layer(selection_L2.style(hollowS),{},'Selected area'))
    leftMap.layers().set(5, ui.Map.Layer(point,{color: 'blue', opacity: 0.6},'Selected point'))
    rightMap.layers().set(5, ui.Map.Layer(point,{color: 'red', opacity: 0.6},'Selected point'))
  }
  leftMap.onClick(pickLocation)
  rightMap.onClick(pickLocation)
  leftMap.layers().set(2, ui.Map.Layer(fc_L2.style(hollow_L2),{opacity:0.6},'FAO-GAUL-L2',false))
  rightMap.layers().set(2, ui.Map.Layer(fc_L2.style(hollow_L2),{opacity:0.6},'FAO-GAUL-L2'))
  leftMap.layers().set(3, ui.Map.Layer(fc_L1.style(hollow_L1),{opacity:0.6},'FAO-GAUL-L1'))
  rightMap.layers().set(3, ui.Map.Layer(fc_L1.style(hollow_L1),{opacity:0.6},'FAO-GAUL-L1',false))
}