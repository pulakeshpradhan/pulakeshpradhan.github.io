var countries = ui.import && ui.import("countries", "table", {
      "id": "USDOS/LSIB_SIMPLE/2017"
    }) || ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017");
var assets = require('users/gena/packages:assets')  
var style = require('users/gena/packages:style')
var animation = require('users/gena/packages:animation')
var palettes = require('users/gena/packages:palettes')
var charting = require('users/gena/packages:charting')
var reservoirs = require('users/arjenhaag/HydroPC_Mozambique:app/reservoirs.js')
function App() { }
App.run = function() {
  // setup map styles
  style.SetMapStyleDark() // adds dark style option
  Map.setOptions('HYBRID')
  Map.style().set('cursor', 'crosshair')
  App.reservoirs = reservoirs.getFeatures()
  App.labelLog = ui.Label()
  App.labelLog.style().set({ shown: false, position: 'bottom-center' })
  App.log = {}
  App.log.info = function(message) {
    App.labelLog.setValue(message)
    App.labelLog.style().set({ shown: true })
  }
  App.log.clear = function() {
    App.labelLog.style().set({ shown: false })
  }
  Map.add(App.labelLog)
  // global reservoirs
  App.reservoirsAll = ee.FeatureCollection("users/gena/eo-reservoirs/reservoirs-all-and-points")
  // add base map layers  
  var waterOccurrence = ee.Image("JRC/GSW1_0/GlobalSurfaceWater") 
    .select('occurrence')
    .divide(100)
    .unmask(0)
    .resample('bicubic')
  var palette = ["ffffcc","ffeda0","fed976","feb24c","fd8d3c","fc4e2a","e31a1c","bd0026","800026"].reverse().slice(1)
  var land = ee.Image("users/gena/land_polygons_image").mask();
  App.addCloudLayer('catchments-l3', false, 0.5, 10)
  App.addCloudLayer('catchments-l4', false, 0.5, 10)
  App.addCloudLayer('catchments-l5', false, 0.5, 10)
  Map.addLayer(waterOccurrence.mask(waterOccurrence.multiply(2).multiply(land)), {min: 0, max: 1, palette: palette}, 'water occurrence', false)
  App.addCloudLayer('reservoirs-all', true, 0.65, 10)
  App.addCloudLayer('rivers-large', true, 0.75, 10)
  App.addCloudLayer('rivers', true, 0.35, 10)
  App.addCloudLayer('dams', true, 0.85, 10)
  App.addCloudLayer('country-mask-mz', true, 0.35, 7) 
  // add analysis reservoirs (Mozambique)  
  var reservoirsRgb = App.reservoirs.style({ color: '#ef6548', fillColor: '#ef654822', width: 2 })
  Map.addLayer(reservoirsRgb, {}, 'reservoirs (analysis)')
  Map.centerObject(App.reservoirs)
  App.reservoirNames = ee.List(App.reservoirs.aggregate_array('name'))
  // add UI elements
  App.addPanel()
  // events
  Map.onClick(function(pt) {
    App.panelChartArea.clear()
    App.panelChartLevel.clear()
    App.panelChartRegression.clear()
    App.log.info('Selecting reservoir ...')
    pt = ee.Geometry.Point([pt.lon, pt.lat])
    var selection = App.reservoirs.filterBounds(pt).limit(1)
    selection.evaluate(function(s) {
      if(s.features.length) {
        App.log.info('Found Mozambique reservoir, getting data ...')
        var name = s.features[0].properties.name
        App.selectReservoirByName(name, false)
        App.selectReservoir.setValue(name, false)
      } else {
        App.log.info('Querying reservoir info from global database ...')
        // no reservoir found for current Mozambique project, try to search in global reservoirs dB
        var selection = App.reservoirsAll.filterBounds(pt).limit(1)
        selection.evaluate(function(s) {
          if(s.features.length) {
            App.log.info('Found reservoir in global database, getting data ...')
            App.selectReservoirFromGlobal(s.features[0])
            App.selectReservoir.setValue(null, false)
          } else {
            App.log.info('No reservoir found at clicked point')
          }
        })
      }
    })
  })
  // selection
  App.selectionLayer = ui.Map.Layer(ee.Image(), {}, 'selection')
  Map.layers().add(App.selectionLayer)
}
App.addCloudLayer = function(name, visibility, opacity, maxZoom) {
  var layer = ui.Map.CloudStorageLayer({
    bucket: 'reservoir-monitor', 
    path: 'map-tiles/' + name, 
    maxZoom: maxZoom, 
    name: name, 
    shown: visibility, 
    opacity: opacity
  })
  Map.layers().add(layer)  
}
/***
 * Selects reservoir from global database
 */
App.selectReservoirFromGlobal = function(reservoir) {
  // update selection
  App.selectionLayer.setEeObject(ee.FeatureCollection([reservoir]).style({
    color: 'ffff00', fillColor: 'ffff0022', width: 2
  }))
  // show reservoir data
  App.panelCharts.style().set({ shown: true })
  // no water level and regression charts
  App.panelChartLevel.clear()
  App.panelChartRegression.clear()
  // update area chart
  App.updateChartAreaGlobal(reservoir)
}
/***
 * Select reservoir by name (from predifined Mozambique reservoirs only)
 */
App.selectReservoirByName = function(name, zoomToReservoir) {
  App.selectedReservoir = App.reservoirs.filter(ee.Filter.eq('name', name)).first()
  var reservoir = App.selectedReservoir
  // zooms to reservoir if needed
  if(zoomToReservoir) {
    Map.centerObject(reservoir)
    Map.setZoom(Map.getZoom() - 1)
  }
  // show reservoir data
  App.panelCharts.style().set({ shown: true })
  // update charts
  App.updateChartArea(reservoir)
  App.updateChartLevel(reservoir)
  App.updateChartRegression(reservoir)
  // update selection
  App.selectionLayer.setEeObject(ee.FeatureCollection([reservoir]).style({
    color: 'ffff00', fillColor: 'ffff0022', width: 2
  }))
  App.log.clear()
}
App.updateChartAreaGlobal = function(reservoir) {
  App.log.info('Updating chart ...')
  var data = reservoirs.getChartDataAreaGlobal(reservoir, function(data) {
    // update widgets
    App.panelChartArea.clear()
    App.panelChartArea.add(App.labelArea)
    var title = 'Area(t), km^2'
    // add reservoir name
    if(reservoir.properties.name) {
      title += ', ' + reservoir.properties.name
    }
    if(reservoir.properties.Lake_name) {
      title += ', ' + reservoir.properties.Lake_name
    }
    // update chart    
    var chart = ui.Chart.array.values(data.values, 0, data.times)
      .setOptions({
        title: title, 
        pointSize: 1, 
        lineWidth: 0.25, 
        legend: { 
          position: 'none' 
        },
    })
    App.panelChartArea.add(chart)
    App.log.clear()
  })
}
App.updateChartArea = function(reservoir) {
  var data = reservoirs.getChartDataArea(reservoir)
  var chart = ui.Chart.feature.byFeature(data, 'date', ['area'])
  chart = chart.setOptions({
    pointSize: 1,
    lineWidth: 1,
    yAxis: { title: 'Surface water area (m²)' },
    xAxis: { title: 'Date' },
    legend: 'none'
  })
  // update widgets
  App.panelChartArea.clear()
  App.panelChartArea.add(App.labelArea)
  App.panelChartArea.add(chart)
}
App.updateChartLevel = function(reservoir) {
  var data = reservoirs.getChartDataLevel(reservoir)
  if(data == null) {
    App.panelChartLevel.clear()
    App.panelChartLevel.add(App.labelLevel)
    App.panelChartLevel.add(ui.Label('No water level data available'))
    return
  }
  var chart = ui.Chart.feature.byFeature(data, 'system:time_start', ['WATERLEVEL'])
  chart = chart.setOptions({
    pointSize: 1,
    lineWidth: 1,
    yAxis: { title: 'Water level (m)' },
    xAxis: { title: 'Date' },
    legend: 'none',
    series: {
      0: { title: 'water level' }
    }
  })
  // update widgets
  App.panelChartLevel.clear()
  App.panelChartLevel.add(App.labelLevel)
  App.panelChartLevel.add(chart)
}
App.updateChartRegression = function(reservoir) {
  var data = reservoirs.getChartDataRegression(reservoir)
  if(data == null) {
    App.panelChartRegression.clear()
    App.panelChartRegression.add(App.labelRegression)
    App.panelChartRegression.add(ui.Label('No water level data available'))
    return
  }
  var chart = ui.Chart.feature.byFeature(data, 'area', ['level'])
  chart = chart.setOptions({
    pointSize: 1,
    lineWidth: 0,
    yAxis: { title: 'Water level (m)' },
    xAxis: { title: 'Water area (m²)' },
    legend: 'none',
     trendlines: { 
       0: { 
         type: 'linear',
         visibleInLegend: true,
         color: 'red',
         opacity: 0.5,
         lineWidth: 1,
         pointSize: 0,
         showR2: true
       } 
     }
    })
  // update widgets
  App.panelChartRegression.clear()
  App.panelChartRegression.add(App.labelRegression)
  App.panelChartRegression.add(chart)
}
App.addPanel = function() {
  function onShowAll() {
    App.panelCharts.style().set({ shown: false })
    App.selectReservoir.setValue('Select reservoir ...', false)
  }
  // main panel
  function createMainPanel() {
    var widgets = []
    App.selectReservoir = ui.Select({
      items: [],
      onChange: function(name) { App.selectReservoirByName(name, true) }
    });
    App.reservoirNames.evaluate(function(names) {
      App.selectReservoir.items().reset(['Select reservoir ...'].concat(names))
      App.selectReservoir.setPlaceholder('Select reservoir ...')
    })
    App.selectReservoir.setPlaceholder('Loading ...');
    widgets.push(App.selectReservoir)
    // add button to show all reservoirs
    var buttonAll = ui.Button('Zoom to all', function() {
      Map.centerObject(App.reservoirs) 
      onShowAll()
      App.selectionLayer.setEeObject(ee.Image())
    })
    widgets.push(buttonAll)
    var panelButtons = ui.Panel(widgets, ui.Panel.Layout.flow('horizontal'))
    App.labelArea = ui.Label('Water Area', { fontWeight: 'bold' })
    var chartArea = ui.Label('', { height: '200px' })
    App.panelChartArea = ui.Panel([App.labelArea, chartArea])
    App.labelLevel = ui.Label('Water Level', { fontWeight: 'bold' })
    var chartLevel = ui.Label('', { height: '200px' })
    App.panelChartLevel = ui.Panel([App.labelLevel, chartLevel])
    App.labelRegression = ui.Label('Regression', { fontWeight: 'bold' })
    var chartRegression = ui.Label('', { height: '200px' })
    App.panelChartRegression = ui.Panel([App.labelRegression, chartRegression])    
    function createPanelCharts() {
      return ui.Panel([
        App.panelChartArea, App.panelChartLevel, App.panelChartRegression
      ])
    }
    App.panelCharts = createPanelCharts()
    App.panelCharts.style().set({ shown: false })
    var infoLabel = ui.Label('Mozambique Reservoirs Analysis Tool', { fontSize: '16px' })
    var infoPanel = ui.Panel([infoLabel])
    // add panel
    var panel = ui.Panel([infoPanel, panelButtons, App.panelCharts])
    return panel
  }
  var mainPanel = createMainPanel()
  ui.root.insert(0, mainPanel)
}
App.run()