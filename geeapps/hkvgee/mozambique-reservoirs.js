var countries = ui.import && ui.import("countries", "table", {
      "id": "USDOS/LSIB_SIMPLE/2017"
    }) || ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017");
var assets = require('users/gena/packages:assets')  
var style = require('users/gena/packages:style')
var animation = require('users/gena/packages:animation')
var palettes = require('users/gena/packages:palettes')
var charting = require('users/gena/packages:charting')
var reservoirs = require('users/hkvgee/Reservoirs:reservoirs.js')
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
  App.addCloudLayer('map-tiles/catchments-l3','basin level 3', false, 0.5, 10)
  App.addCloudLayer('map-tiles/catchments-l4','basin level 4', false, 0.5, 10)
  App.addCloudLayer('map-tiles/catchments-l5','basin level 5', false, 0.5, 10)
  Map.addLayer(waterOccurrence.mask(waterOccurrence.multiply(2).multiply(land)), {min: 0, max: 1, palette: palette}, 'water occurrence', false)
  App.addCloudLayer('map-tiles/reservoirs-all','reservoirs-all', true, 0.65, 10)
  App.addCloudLayer('map-tiles/rivers-large','rivers-large', true, 0.75, 10)
  App.addCloudLayer('map-tiles/rivers','rivers', true, 0.35, 10)
  App.addCloudLayer('map-tiles/dams','dams', true, 0.85, 10)
  App.addCloudLayer('map-tiles/country-mask-mz','country-mask-mz', true, 0.35, 7) 
  // add analysis reservoirs (Mozambique)  
  var reservoirsRgb = App.reservoirs.style({ color: '#ef6548', fillColor: '#ef654822', width: 2 })
  Map.addLayer(reservoirsRgb, {}, 'reservoirs (analysis)')
  Map.centerObject(App.reservoirs)
  App.reservoirNames = ee.List(App.reservoirs.aggregate_array('name'))
  // add UI elements
  App.addPanel()
  var panel = ui.Panel({
    style: {
      width: '400px',
      shown: true
    },
    widgets: [
      ui.Label('Click on any reservoir on the map to obtain area time series. Red boundary around a reservoir indicates local data is available.')
    ]
  });
  var clear = Map.onClick(function() {
    panel.style().set('shown', false);
    Map.unlisten(clear);
  });
  Map.add(panel);
  // events
  Map.onClick(function(pt) {
    App.panelChartArea.clear()
    App.panelChartLevel.clear()
    App.panelChartStorage.clear()
    App.panelChartFilling.clear()
    App.panelChartLevelHistorical.clear()
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
// App.addCloudLayer = function(name, visibility, opacity, maxZoom) {
//   var layer = ui.Map.CloudStorageLayer({
//     bucket: 'reservoir-monitor', 
//     path: 'map-tiles/' + name, 
//     maxZoom: maxZoom, 
//     name: name, 
//     shown: visibility, 
//     opacity: opacity
//   })
//   Map.layers().add(layer)  
// }
App.addCloudLayer = function(path, name, visibility, opacity, maxZoom) {
  var layer = ui.Map.CloudStorageLayer({
    bucket: 'reservoir-monitor', 
    path: path, 
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
  App.panelChartStorage.clear()
  App.panelChartFilling.clear()
  App.panelChartLevelHistorical.clear()
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
  App.updateChartStorage(reservoir)
  App.updateChartFilling(reservoir)
  App.updateChartLevelHistorical(reservoir)
  App.updateChartRegression(reservoir)
  // update selection
  App.selectionLayer.setEeObject(ee.FeatureCollection([reservoir]).style({
    color: 'ffff00', fillColor: 'ffff0022', width: 2
  }))
  App.log.clear()
}
App.updateChartAreaGlobal = function(reservoir) {
  App.log.info('Updating chart ...')
  reservoirs.getChartDataAreaGlobal(reservoir, function(data) {
    // update widgets
    App.panelChartArea.clear()
    App.panelChartArea.add(App.labelArea)
    var title = 'Surface water area (km²)'
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
  reservoirs.getChartDataArea(reservoir, function(data) {
    var chart = ui.Chart.feature.byFeature(data, 'date', ['area'])
    var title = 'Surface water area (m²)'
    chart = chart.setOptions({
      title: title,
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
  })
}
App.updateChartLevel = function(reservoir) {
  var data = reservoirs.getChartDataLevel(reservoir, function(data) {
    if(data == null) {
      App.panelChartLevel.clear()
      App.panelChartLevel.add(App.labelLevel)
      App.panelChartLevel.add(ui.Label('No historical water level data available'))
      return
    }
    var chart = ui.Chart.feature.byFeature(data, 'date', ['level'])
    var title = 'Water level (m)'
    chart = chart.setOptions({
      title: title,
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
  })
}
App.updateChartStorage = function(reservoir) {
  var data = reservoirs.getChartDataStorage(reservoir, function(data) {
    if(data == null) {
      App.panelChartStorage.clear()
      App.panelChartStorage.add(App.labelStorage)
      App.panelChartStorage.add(ui.Label('No storage volume data available'))
      return
    } 
    var chart = ui.Chart.feature.byFeature(data, 'date', ['volume', 'maxcapacity'])
    var title = 'Storage Volume (Mm3)'
    chart = chart.setOptions({
      title: title,
      pointSize: 0,
      lineWidth: 2,
      yAxis: { title: 'Storage Volume (Mm3)' },
      xAxis: { title: 'Date' },
      legend: 'none'
    })
    // update widgets
    App.panelChartStorage.clear()
    App.panelChartStorage.add(App.labelStorage)
    App.panelChartStorage.add(chart)
  })
}
App.updateChartFilling = function(reservoir) {
  var data = reservoirs.getChartDataStorage(reservoir, function(data) {
    if(data == null) {
      App.panelChartFilling.clear()
      App.panelChartFilling.add(App.labelFilling)
      App.panelChartFilling.add(ui.Label('No filling percentage data available'))
      return
    } 
    var chart = ui.Chart.feature.byFeature(data, 'date', ['filling'])
    var title = 'Filling Percentage (%)'
    chart = chart.setOptions({
      title: title,
      pointSize: 0,
      lineWidth: 2,
      yAxis: { title: 'Filling Percentage (%)' },
      xAxis: { title: 'Date' },
      legend: 'none'
    })
    // update widgets
    App.panelChartFilling.clear()
    App.panelChartFilling.add(App.labelFilling)
    App.panelChartFilling.add(chart)
  })
}
App.updateChartLevelHistorical = function(reservoir) {
  var data = reservoirs.getChartDataLevelHistorical(reservoir, function(data) {
    if(data == null) {
      App.panelChartLevelHistorical.clear()
      App.panelChartLevelHistorical.add(App.labelLevelHistorical)
      App.panelChartLevelHistorical.add(ui.Label('No water level data available'))
      return
    } 
    var chart = ui.Chart.feature.byFeature(data, 'DATE', ['WATERLEVEL'])
    var title = 'Water level (m)'
    chart = chart.setOptions({
      title: title,
      pointSize: 1,
      lineWidth: 1,
      yAxis: { title: 'Water level (m)' },
      xAxis: { title: 'Date' },
      legend: 'none'
    })
    // update widgets
    App.panelChartLevelHistorical.clear()
    App.panelChartLevelHistorical.add(App.labelLevelHistorical)
    App.panelChartLevelHistorical.add(chart)
  })
}
App.updateChartRegression = function(reservoir) {
  var data = reservoirs.getChartDataRegression(reservoir, function(data) {
    if(data == null) {
      App.panelChartRegression.clear()
      App.panelChartRegression.add(App.labelRegression)
      App.panelChartRegression.add(ui.Label('No water level data available'))
      return
    }
    var chart = ui.Chart.feature.byFeature(data, 'area', ['level'])
    var title = 'Regression analysis'
    chart = chart.setOptions({
      title: title,
      pointSize: 1,
      lineWidth: 0,
      vAxis: {title: 'Water level (m)'},
      hAxis: {title: 'Water area (m²)'},
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
  })
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
    App.labelArea = ui.Label('Satellite Derived Water Area', { fontWeight: 'bold' })
    var chartArea = ui.Label('', { height: '200px' })
    App.panelChartArea = ui.Panel([App.labelArea, chartArea])
    App.labelLevel = ui.Label('Water Level from Regression', { fontWeight: 'bold' })
    var chartLevel = ui.Label('', { height: '200px' })
    App.panelChartLevel = ui.Panel([App.labelLevel, chartLevel])
    App.labelStorage = ui.Label('Storage Volume', { fontWeight: 'bold' })
    var chartStorage = ui.Label('', { height: '200px' })
    App.panelChartStorage = ui.Panel([App.labelStorage, chartStorage])
    App.labelFilling = ui.Label('Filling Percentage', { fontWeight: 'bold' })
    var chartFilling = ui.Label('', { height: '200px' })
    App.panelChartFilling = ui.Panel([App.labelFilling, chartFilling])
    App.labelLevelHistorical = ui.Label('Water Level from In-Situ Measurements', { fontWeight: 'bold' })
    var chartLevelHistorical = ui.Label('', { height: '200px' })
    App.panelChartLevelHistorical = ui.Panel({'widgets': [App.labelLevelHistorical, chartLevelHistorical], 'style':{'shown':false, width: '285px'}})
    App.labelRegression = ui.Label('Regression Water Level - Area', { fontWeight: 'bold' })
    var chartRegression = ui.Label('', { height: '200px' })
    App.panelChartRegression = ui.Panel({'widgets': [App.labelRegression, chartRegression], 'style':{'shown':false, width: '285px'}})
    function createPanelCharts() {
        return ui.Panel([
          App.panelChartArea, App.panelChartLevel, App.panelChartStorage, App.panelChartFilling, App.panelChartLevelHistorical, App.panelChartRegression
        ])
       }
    var buttonHistorical = ui.Button({
      label: 'More charts',
      onClick: function(){
        var current_vis_LevelHistorical = App.panelChartRegression.style().get('shown')
        var current_vis_Regression = App.panelChartRegression.style().get('shown')
        App.panelChartLevelHistorical.style().set({'shown':!current_vis_LevelHistorical})
        App.panelChartRegression.style().set({'shown':!current_vis_Regression})
      }
    })
    panelButtons.add(buttonHistorical)
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