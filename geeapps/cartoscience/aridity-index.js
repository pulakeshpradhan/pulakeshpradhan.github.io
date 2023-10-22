var startDate = 2016
var endDate = 2020
var loc = ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level0").filterMetadata('ADM0_NAME','equals','United States of America')
var USbasins = ee.FeatureCollection("USGS/WBD/2017/HUC06")
var CHIRPS = ee.ImageCollection("UCSB-CHG/CHIRPS/PENTAD").select('precipitation')
var modis = ee.ImageCollection("MODIS/006/MOD16A2")
var modisPET = modis.select('PET')
var modisET = modis.select('ET')
var basemap = {
  'basemap': [
    {
      featureType: 'water',
      stylers: [
        { color: '#434343' }
      ]
    }
  ]
}
var years = ee.List.sequence(startDate,endDate)
var months = ee.List.sequence(1,12)
var monthly = ee.ImageCollection.fromImages(
  years.map(function (y) {
    return months.map(function(m) {
      var date = ee.Date.fromYMD(y,m,1)
      var mPET = modisPET
        .filter(ee.Filter.calendarRange(y,y,'year'))
        .filter(ee.Filter.calendarRange(m,m,'month'))
        .sum().multiply(0.1)
      var mET = modisET
        .filter(ee.Filter.calendarRange(y,y,'year'))
        .filter(ee.Filter.calendarRange(m,m,'month'))
        .sum().multiply(0.1)
      var mRF = CHIRPS
        .filter(ee.Filter.calendarRange(y,y,'year'))
        .filter(ee.Filter.calendarRange(m,m,'month'))
        .sum()
      var eratio = mET.divide(mRF).rename('E Ratio')
      var dius = mPET.divide(mRF).rename('AI')
      return mPET.addBands(mET).addBands(mRF).addBands(eratio).addBands(dius)
        .set('year',y)
        .set('month',m)
        .set('millis',date.millis())
        .set('header',ee.String(ee.Number(y).toInt())
          .cat(ee.String('-'))
          .cat(ee.Number(m).toInt()))
    })
  }).flatten()
)
var monthlyMedian = monthly.median().select('AI')
var palette = ['#9C77F6','#62C6ED','#e8e8e8','#FFA736','#ff4949']
var vis = {min: 0, max: 20, palette: palette}
var latitudes = ee.FeatureCollection([
  ee.Geometry.LineString([[-180,50],[180,50]], null, false), 
  ee.Geometry.LineString([[-180,-50],[180,-50]], null, false)
])
var mapPanel = ui.Map()
var layers = mapPanel.layers()
mapPanel.layers().set(0, ui.Map.Layer(latitudes.style({color: 'white', width: 3}),{},'CHIRPS extent'))
mapPanel.layers().set(1, ui.Map.Layer(monthlyMedian.clip(USbasins),vis,'Aridity index'))
mapPanel.layers().set(2, ui.Map.Layer())
mapPanel.layers().set(3, ui.Map.Layer(USbasins.style({color: 'e8e8e8', width: 0.5, fillColor: '00000000'}),{},'U.S. Basins (HUC6)'))
mapPanel.layers().set(4, ui.Map.Layer())
mapPanel.setOptions('basemap',basemap)
var inspectorPanel = ui.Panel({style: {width: '20%'}})
var intro = ui.Panel([
  ui.Label({
    value: 'Aridity Index Mapper: Timeseries Inspector of the Conterminous United States Basins ',
    style: {fontSize: '18px', fontWeight: 'bold'}
  }),
  ui.Label({
    value: 'Created by Fitsume Wolkeba and Brad G. Peter, University of Alabama.',
    style: {fontSize: '12px'}
  }),
  ui.Label('Click a location to see basin-scale Aridity Index timeseries.')
]);
inspectorPanel.add(intro)
var Bname = ui.Label()
inspectorPanel.add(ui.Panel([Bname], ui.Panel.Layout.flow('horizontal')))
inspectorPanel.add(ui.Label('[Chart]'))
inspectorPanel.add(ui.Label('[Legend]'))
var zoomBox = ui.Map().setControlVisibility(false)
  .setOptions('basemap',basemap)
var generateChart = function (coords) {
  var location =[coords.lon, coords.lat]
  var zone = USbasins.filterBounds(ee.Geometry.Point(location))
  var zoneID = ee.Feature(zone.first()).get('huc6').getInfo()
  var name1 = ee.Feature(zone.first()).get('name').getInfo()
  var area = USbasins.filterMetadata('huc6','equals',zoneID)
  var areaStyle = {color: '#303030', width: 1.5, fillColor: '00000000'}
  Bname.setValue('Basin: ' + name1 + ' (HUC6: '+zoneID+')')
  var point = ee.Geometry.Point(coords.lon, coords.lat)
  var dot = ui.Map.Layer(point, {color: '000000'}, 'Selected location')
  var basin = ui.Map.Layer(area.style(areaStyle),{},name1 + ' (HUC6: '+zoneID+')')
  var clipped = monthlyMedian.clip(area)
  var minmax = clipped.reduceRegion({reducer: ee.Reducer.percentile([5,95]), scale: 500, geometry: area})
  var minVal = minmax.get('AI_p5').getInfo().toFixed(2)
  var maxVal = minmax.get('AI_p95').getInfo().toFixed(2)
  ui.Map.Layer(area.style(areaStyle),{min:minVal,max:maxVal,palette:palette})
  zoomBox.centerObject(area)
  zoomPanel.widgets().get(2).widgets().get(0).set('value',minVal)
  zoomPanel.widgets().get(2).widgets().get(1).set('value',maxVal)
  zoomBox.layers().set(0, ui.Map.Layer(clipped,{min:minVal,max:maxVal,palette:palette}))
  zoomBox.layers().set(1, ui.Map.Layer(point))
  zoomBox.layers().set(2, ui.Map.Layer(area.style(areaStyle)))
  mapPanel.layers().set(2, dot)
  mapPanel.layers().set(4, basin)
  mapPanel.setCenter(-96.532, 38.364, 5)
  var zonalChart = ui.Chart.image.series(monthly.select(['ET','PET']), area, ee.Reducer.mean(), 500,'millis')
  zonalChart.setOptions({
    title: 'Evapotranspiration (kg/m^2/8day)',
    vAxes: {0:{title: 'ET'},1:{title:'PET'}},
    hAxis: {title: 'Time'},
    series: {
      0: {
        color: '9C77F6',
        lineWidth: 1,
        pointsVisible: true,
        pointSize: 2,
        targetAxisIndex:0
      },
      1: {color: '62C6ED',targetAxisIndex:1}
    },
    legend: {position: 'right'},
  })
  inspectorPanel.widgets().set(2, zonalChart)
  var zonalChart2 = ui.Chart.image.series(monthly.select(['E Ratio','AI']), area, ee.Reducer.mean(), 500,'millis')
  zonalChart2.setOptions({
    title: 'Aridity Index',
    vAxes: {0:{title: 'AI'},1:{title:'E Ratio'}},
    hAxis: {title: 'Time'},
    series: {
      0: {
        color: 'ff4949',
        lineWidth: 1,
        pointsVisible: true,
        pointSize: 2,
        targetAxisIndex:0
      },
      1: {color: 'FFA736',targetAxisIndex:1}
    },
    legend: {position: 'right'},
  })
  inspectorPanel.widgets().set(3, zonalChart2)
}
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    palette: palette
  }
}
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', maxHeight: '10px'},
})
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis.min, {margin: '4px 8px'}),
    ui.Label(
        (vis.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vis.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
})
var legendTitle = ui.Label({
  value: 'Median Aridity Index (AI); Hyper-arid (AI > 20), Arid (5 < AI ≤ 20), Semiarid (2 < AI ≤5), Dry sub-humid (1.5 < AI ≤2) and Humid (AI < 1.5)',
  style: {fontWeight: 'bold'}
})
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels])
inspectorPanel.widgets().set(4, legendPanel)
// Zoom  ----------------------------------------------------------
var zoomColorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', maxHeight: '10px'},
})
var zoomLegendLabels = ui.Panel({
  widgets: [
    ui.Label(10, {margin: '4px 8px'}),
    ui.Label(20, {margin: '4px 200px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
})
var zoomPanel = ui.Panel({
  widgets: [zoomBox,zoomColorBar,zoomLegendLabels],
  style: {
    position: 'bottom-right',
    height: '300px',
    width: '300px',
  }
})
mapPanel.add(zoomPanel)
mapPanel.onClick(generateChart)
mapPanel.style().set('cursor', 'crosshair')
var initialPoint = ee.Geometry.Point(-87.5717250676596,33.20516238188057)
ui.root.clear()
ui.root.add(ui.SplitPanel(inspectorPanel, mapPanel))
generateChart({
  lon: -87.5717250676596,
  lat: 33.20516238188057
})