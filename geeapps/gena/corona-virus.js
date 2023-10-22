var cases = ui.import && ui.import("cases", "table", {
      "id": "users/gena/covid19/covid19"
    }) || ee.FeatureCollection("users/gena/covid19/covid19"),
    cases_us = ui.import && ui.import("cases_us", "table", {
      "id": "users/gena/covid19/covid19_us_new"
    }) || ee.FeatureCollection("users/gena/covid19/covid19_us_new");
var gadm = ee.FeatureCollection("users/gena/GADM36")
// var covid19_nl = ee.FeatureCollection('users/gena/covid19/covid19_nl_new')
// throw(0)
var lastUpdateStr = 'Last dashboard update: '
var dateNew = '2020-07-09'
var dateNewUs = '2020-07-08'
// print(cases.filter(ee.Filter.eq('dt', dateNew)))  
var useNRT = true // for daily updates history + NRT (JHU GitHub + ArcGIS layer)
// var useNRT = false // for daily updates only (JHU GitHub)
var layerUpdatedToday = null
// var exportNewLayers = true // for interactive export
var exportNewLayers = false 
// var exportAllLayers = true
var exportAllLayers = false 
var useCloudLayers = true
var casesAggregatedLocal = null
var casesAggregatedAll = null
var showRate = false
var initialized = false
var showAllLayersDebounced = ui.util.debounce(function() {
  initialized = true
  showAllLayers()
}, 1500, ui.root)
// function isToday(date) {
//   return date == '2020-03-07'
//   // var today = formatDate(Date.now())
//   // return isToday = currentDate == today
// }
showAllLayersDebounced()
var style = require('users/gena/packages:style')
var palettes = require('users/gena/packages:palettes')
ui.root.clear()
var map = ui.Map()
var warning = ui.Label({ 
  value: 'Stay Home!', 
  style: { 
    'backgroundColor': '#00000055',
    'border': '1px solid black',
    'color': '#DF3E39',
    'fontSize': '28px',
    'fontWeight': 'bold',
    'padding': '2px',
    'position': 'top-center'
    // 'margin': '3px'
  } 
})
map.add(warning)
// map.addLayer(covid19_nl)
// map.addLayer(cases, {}, 'cases (raw)')
var logo = ui.Label({ 
  value: 'About', 
  targetUrl: 'https://github.com/gena/corona-ee-dashboard', 
  style: { 
    'position': 'bottom-center',
    'backgroundColor': '#f0f0f0aa',
    'color': 'black',
    'fontSize': '10px',
    'fontWeight': 'bold',
    'padding': '3px',
    'margin': '2px'
  } 
})
var redirect = ui.Label({ 
  value: '', 
  targetUrl: '', 
  style: { 
    position: 'bottom-center',
    'backgroundColor': '#f0f0f0ee',
    'color': 'black',
    'fontSize': '9px',
    'fontWeight': 'bold',
    'padding': '2px',
    'position': 'bottom-center',
    shown: false
    // 'margin': '3px'
  } 
})
var panelLinks = ui.Panel([
  // redirect,
  logo
], ui.Panel.Layout.flow('vertical'), { 
      'background-color': '#00000000',
      'position': 'bottom-right'
})
// map.add(panelLinks)
style.SetMapStyleDark(map)
var paletteRecovered = Array.from({ length: 100 }).map(function(x) { return '31a354' })
var paletteDeaths = Array.from({ length: 100 }).map(function(x) { return '000000' })
var paletteConfirmed = Array.from({ length: 100 }).map(function(x) { return 'e31a1c' })
cases = cases.filter(ee.Filter.notNull(['deaths_r']))
print('max conf_r: ', cases.aggregate_max('conf_r'))
// var confirmedMax_r = cases.aggregate_max('conf_r')
var confirmedMax_r = 605
// linear
var layerSelection = ui.Map.Layer(ee.Image(), { color: 'yellow' }, 'selection', false, 0.75)
function hideAllButCurrentMapLayers() {
  // hide all layers except current
  dates.map(function(date) {
    if(date != currentDate) {
      layers[date].layer.setShown(false)
    }
  })
}
map.onChangeCenter(function() {
  if(play) {
    onPlayPause()
  }
  hideAllButCurrentMapLayers()
})
map.onChangeZoom(function(z) {
  print('Zoom: ', map.getZoom())
  if(play) {
    onPlayPause()
  }
  hideAllButCurrentMapLayers()
  showAllLayersDebounced()
})
var dates = null
var datesObj = {}
var currentDate = null
var currentDateIndex = null
var layers = {}
var casesCurrent = null
var labelDate = ui.Label('Loading ...')
var labelRegion = ui.Label('')
var labelRegionExtra = ui.Label('')
var labelConfirmed = ui.Label('', { color: paletteConfirmed[0] })
var labelDeaths = ui.Label('', { color: paletteDeaths[0] })
var labelRecovered = ui.Label('', { color: paletteRecovered[0] })
var tips = [
  'Tip: click on a circle to see a more detailed chart, wash hands and avoid crowded places',
  'Tip: click on Increments checkbox to see the number of cases increasing per day, compare to countries where the virus is contained already',
  'Tip: use log scale to inspect trends - work from home to stop the virus from spreading',
  'Tip: use log scale to inspect trends - work from home to stop the virus from spreading',
  'Tip: click Compare to see how the dynamics look like in different countries'
]
var labelTip = ui.Label('')
var buttonTip = ui.Button('x')
buttonTip.onClick(function() {
  panelTip.style().set({shown: false})
})
var panelTip = ui.Panel({
  widgets: [labelTip, buttonTip], 
  layout: ui.Panel.Layout.flow('horizontal'),
  style: { position: 'top-center' }
})
var labelConfirmedDelta = ui.Label('', { color: paletteConfirmed[0] })
var labelDeathsDelta = ui.Label('', { color: paletteDeaths[0] })
var labelRecoveredDelta = ui.Label('', { color: paletteRecovered[0] })
var labelDeathRate = ui.Label('', { color: 'grey' })
var labelDateUpdated = ui.Label('')
var log = ui.Label('> ')
// merge with US detailed data only when we're not exporting
if (!exportNewLayers && !exportAllLayers) {
 cases = cases_us.merge(cases)
}
cases = cases    
    .filter(ee.Filter.neq('name', 'Recovered US'))
    .filter(ee.Filter.neq('name', 'Diamond Princess'))
    .filter(ee.Filter.neq('name', 'Recovered Canada'))
    .filter(ee.Filter.neq('name', 'Diamond Princess Canada'))
    .filter(ee.Filter.neq('name', 'MS Zaandam'))
    .filter(ee.Filter.neq('name', 'Grand Princess Canada'))
var casesSortDate = cases.sort('dt', false)
function updateInfoBox(date) {
  var confirmedTotal = casesAggregatedLocal.confirmed[date]
  var recoveredTotal = casesAggregatedLocal.recovered[date]
  var deathsTotal = casesAggregatedLocal.deaths[date]
  labelDate.setValue(date)
  labelRegion.setValue(casesAggregatedLocal.region)
  if(typeof(confirmedTotal) === 'undefined') {
    labelConfirmed.setValue('CONFIRMED: 0')
    labelRecovered.setValue('RECOVERED: 0')
    labelDeaths.setValue('DEATHS: 0')
    labelConfirmedDelta.setValue('')
    labelRecoveredDelta.setValue('')
    labelDeathsDelta.setValue('')
    labelDeathRate.setValue('RATE: 0%')
    return
  }
  labelConfirmed.setValue('CONFIRMED: ' + confirmedTotal)
  labelRecovered.setValue('RECOVERED: ' + recoveredTotal)
  labelDeaths.setValue('DEATHS: ' + deathsTotal)
  if(date !== dates[0]) {
    var datePrev = dates[currentDateIndex-1]
    if(datePrev in casesAggregatedLocal.confirmed) {
      var confirmedTotalPrev = casesAggregatedLocal.confirmed[datePrev]
      var recoveredTotalPrev = casesAggregatedLocal.recovered[datePrev]
      var deathsTotalPrev = casesAggregatedLocal.deaths[datePrev]
    } else {
      var confirmedTotalPrev = 0
      var recoveredTotalPrev = 0
      var deathsTotalPrev = 0
    }
    labelConfirmedDelta.setValue('+' + (confirmedTotal - confirmedTotalPrev))
    labelRecoveredDelta.setValue('+' + (recoveredTotal - recoveredTotalPrev))
    labelDeathsDelta.setValue('+' + (deathsTotal - deathsTotalPrev))
    // no updates yet (confirmed and recovered are the same as previous day and last day) TODO: make more robust!
    if(casesAggregatedLocal.dt_reported && currentDateIndex == dates.length-1 && casesAggregatedLocal.dt_reported != currentDate) {
      labelConfirmed.setValue('CONFIRMED:')
      labelRecovered.setValue('RECOVERED:')
      labelDeaths.setValue('DEATHS:')
      labelConfirmedDelta.setValue('updates pending')
      labelRecoveredDelta.setValue('updates pending')
      labelDeathsDelta.setValue('updates pending')
    }
  }
  if(deathsTotal) {
    var minRate = Math.round(deathsTotal / confirmedTotal * 1000) / 10
    if(recoveredTotal) {
      var maxRate = Math.round(deathsTotal / (deathsTotal + recoveredTotal) * 1000) / 10
      labelDeathRate.setValue('RATE: ' + minRate/* + '-' + maxRate*/ + '%')
    } else {
      labelDeathRate.setValue('RATE: ' + minRate + '%')
    }
  } else {
    labelDeathRate.setValue('RATE: 0%')
  }
}
function clearInfoBox() {
  labelRegion.setValue("Loading ...")
  labelConfirmed.setValue('')
  labelRecovered.setValue('')
  labelDeaths.setValue('')
  labelDeathRate.setValue('')
}
function updateMap() {
  if(!dates) {
    throw('error, no dates')
  }
  var date = currentDate
  if(!date) {
    return
  }
  dates.map(function(d) { 
    if(d !== currentDate) {
      layers[d].layer.setOpacity(0) 
    }
  })
  var layer = layers[date].layer
  layer.setOpacity(1)
  layer.setShown(true)
  showAllLayersDebounced()
  if(layers[date].loaded) {
    return
  }  
  layers[date].loaded = true
}
function showInfo(date) {
  clearInfoBox()
  // update global stats
  if(casesAggregatedLocal !== null) {
    updateInfoBox(date)
  }
}
function showAllLayers(count) {
  if(dates == null) {
    return
  }
  if(typeof(count) === 'undefined') {
    count = 10
  }
  // make all layers visible 
  var iMin = Math.max(0, currentDateIndex-count)
  var iMax = Math.min(currentDateIndex+count, dates.length-1)
  dates.slice(iMin, iMax).map(function(d) { 
    if(!layers[d].layer.getShown()) {
      layers[d].layer.setShown(true) 
    }
  })
}
function showMap() {
  var date = currentDate
  if(!date) {
    return
  }
  // filter to current date
  casesCurrent = cases.filter(ee.Filter.eq('dt', currentDate))
  // update map
  updateMap()
  if(initialized) {
    showAllLayersDebounced()
  }
}
var blob = ee.Blob('gs://deltares-video-map/corona-virus/covid19_aggregated.json')
blob.string().evaluate(function(str) {
  if(casesAggregatedLocal != null) {
    return // loaded
  }
  casesAggregatedLocal = JSON.parse(str)
  casesAggregatedLocal.region = "Global"
  casesAggregatedAll = casesAggregatedLocal
  // initialize dates and layers
  dates = Object.keys(casesAggregatedLocal.confirmed)
  dates.map(function(d) { 
    datesObj[d] = new Date(Date.parse(d))
  })
  dates.map(function(date) {
    var opacity = date == dates[dates.length - 1] ? 1 : 0
    var shown = date == dates[dates.length - 1] ? true : false
    var layer = ui.Map.CloudStorageLayer({
      bucket: 'deltares-video-map', 
      path: 'corona-virus/v8/corona-virus-' + date, 
      maxZoom: 8, 
      name: 'corona-virus-' + date, 
      shown: shown, 
      opacity: opacity
    })
    layers[date] = {
      layer: layer,
      loaded: false
    }
    map.layers().add(layer)
  })
  map.layers().add(layerSelection)
  if(useNRT) {
    var updatedToday = cases.filter(ee.Filter.eq('dt_reporte', dateNew))
    // locations are broken in NRT - fixing
    // updatedToday = updatedToday.map(function(f) {
    //   var last = cases.sort('dt').filter(ee.Filter.eq('name', f.get('name'))).first()
    //   return ee.Algorithms.If(ee.Algorithms.IsEqual(last, null), f, f.setGeometry(last.geometry()))
    // })
    layerUpdatedToday = ui.Map.Layer(updatedToday.style({ pointSize: 2, width: 0, fillColor: 'ffffff' }), {}, 'updated today', true, 0.6)
    // map.layers().add(layerUpdatedToday)
  }
  // initialize
  currentDateIndex = dates.length-1
  currentDate = dates[currentDateIndex]
  initGui()
  updateInfoBox(currentDate)
  showInfo(currentDate)
  showMap()
  labelDateUpdated.setValue(lastUpdateStr + casesAggregatedLocal.update_time[dates[0]])
  if(exportAllLayers) {
    exportAll()
  }
  initCompareGui()
})
map.style().set({ cursor: 'crosshair' })
map.setCenter(-5, 15, 3)
var chart = null
var table = null
var tableCols = [
      {id: 't', type: 'date'},
      // {id: 'a1', type: 'string', role: 'annotation'},
      // {id: 'a2', type: 'string', role: 'annotationText'},
      {id: 'confirmed', type: 'number', label: 'confirmed'},
      {id: 'recovered', type: 'number', label: 'recovered'},
      {id: 'deaths', type: 'number', label: 'deaths'},
      {id: 'selection', type: 'number', label: 'selection'},
    ]
var panelAll = null    
var panelCompare = null
var panelPrevNext = null
var switchToRate = null
var switchLogScale = null
var switchCompare = null
var sliderDates = null
var labelCoffee = null
var isLog = false
function updateChartOptions() {
  if(chart == null || panelAll == null) {
    return
  }
  var w = 250
  var h = 200
  // checl for mobile
  var mapBounds = map.getBounds()
  // hack in label styling as well
  var screenWidth = (mapBounds[2] - mapBounds[0]) * 111139 / map.getScale()
  if(screenWidth <= 800) {
    w = 100
    h = 100
    labelDate.style().set({'fontSize': '10px'})
    labelRegion.style().set({'fontSize': '10px'})
    labelConfirmed.style().set({'fontSize': '10px'})
    labelRecovered.style().set({'fontSize': '10px'})
    labelDeaths.style().set({'fontSize': '10px'})
    labelConfirmedDelta.style().set({'fontSize': '7px'})
    labelRecoveredDelta.style().set({'fontSize': '7px'})
    labelDeathsDelta.style().set({'fontSize': '7px'})
    labelDeathRate.style().set({'fontSize': '10px'})
    labelCoffee.style().set({fontSize: '10px'})
    switchToRate.style().set({'fontSize': '10px'})
    switchLogScale.style().set({'fontSize': '10px'})
    switchCompare.style().set({'fontSize': '10px'})
    buttonPlayPause.style().set({shown: false})
    panelAll.style().set({width: '220px'})
    sliderDates.style().set({shown: false})
  } else {
    labelDate.style().set({'fontSize': '28px'})
    labelRegion.style().set({'fontSize': '22px'})
    labelConfirmed.style().set({'fontSize': '22px'})
    labelRecovered.style().set({'fontSize': '22px'})
    labelDeaths.style().set({'fontSize': '22px'})
    labelConfirmedDelta.style().set({'fontSize': '14px'})
    labelRecoveredDelta.style().set({'fontSize': '14px'})
    labelDeathsDelta.style().set({'fontSize': '14px'})
    labelDeathRate.style().set({'fontSize': '22px'})
    panelAll.style().set({width: '340px'})
    switchToRate.style().set({'fontSize': '14px'})
    switchLogScale.style().set({'fontSize': '14px'})
    switchCompare.style().set({'fontSize': '14px'})
    labelCoffee.style().set({fontSize: '13px'})
    buttonPlayPause.style().set({shown: true})
    sliderDates.style().set({shown: true})
  }
  var scaleType = null
  if(isLog) {
    var scaleType = 'log'
  } 
  var title = casesAggregatedLocal.region
  chart.setOptions({
    title: title,
    legend: { position: 'none' },
    backgroundColor: { fill: "#FDFEFE" },
    pointSize: 2,
    lineWidth: 1,
    vAxis: { scaleType: scaleType },
    colors: ['#e31a1c', '#31a354', 'grey', 'yellow'],
    width: w,
    height: h,
    annotations: { style: 'line' },
    series: {
      3: {
        color: '#000000',
        lineWidth: 0,
        pointsVisible: true,
        pointSize: 8,
        dataOpacity: 0.5
      }
    }
  })
}    
function updateChartGlobal() {
  table = 
  {
    cols: tableCols,
    rows: []
  }
  if(!showRate) {
    table.rows = dates.map(function(d, i) {
      var selection = (d === currentDate) ? casesAggregatedLocal.confirmed[d] : null 
      var casesConfirmed = casesAggregatedLocal.confirmed[d]
      var casesRecovered = casesAggregatedLocal.recovered[d]
      var casesDeaths = casesAggregatedLocal.deaths[d]
      if(d == dates[dates.length-1] && casesConfirmed == casesAggregatedLocal.confirmed[dPrev] && casesAggregatedLocal.confirmed[dPrev] != 0) {
        var dPrev = dates[i-1]
        casesConfirmed = null
        casesRecovered = null
        casesDeaths = null
      }
      return {
        c: [
          {v: datesObj[d] },
          {v: casesConfirmed},  
          {v: casesRecovered},
          {v: casesDeaths},
          {v: selection },
        ] 
      }
    })
  } else {
    table.rows = dates.slice(1).map(function(d, i) {
      var dPrev = dates[i] // i starts from 0 bu in sliced array
      var selection = (d === currentDate) ? (casesAggregatedLocal.confirmed[d] - casesAggregatedLocal.confirmed[dPrev]) : null 
      var rateConfirmed = casesAggregatedLocal.confirmed[d] - casesAggregatedLocal.confirmed[dPrev]
      var rateDeaths = casesAggregatedLocal.deaths[d] - casesAggregatedLocal.deaths[dPrev]
      var rateRecovered = casesAggregatedLocal.recovered[d] - casesAggregatedLocal.recovered[dPrev]
      if(d == dates[dates.length-1] && casesAggregatedLocal.confirmed[d] == casesAggregatedLocal.confirmed[dPrev] && casesAggregatedLocal.confirmed[d] != 0) {
        rateConfirmed = null
        rateRecovered = null
        rateDeaths = null
      }
      return {
        c: [
          {v: datesObj[d] },
          {v: rateConfirmed },
          {v: rateRecovered },
          {v: rateDeaths },
          {v: selection },
        ] 
      }
    })
  }
  chart.setDataTable(table)
  updateChartOptions()  
  chart.onClick(function(o) {
    var date = formatDate(o)
    sliderDates.setValue(dates.indexOf(date), true)
  })
}
var updateChartGlobalThrottled = ui.util.throttle(function() { 
  updateChartGlobal() 
}, 500, chart)
var timeout = null
var play = false
var timeStep = 150
var textPlay = '▶'
var textPause = '⏸'
var buttonStyle = { 
  padding: 0,  margin: '3px', fontSize: '12px', fontWeight: 'bold',
}
var buttonPlayPause = ui.Button(textPlay, onPlayPause, false, buttonStyle)
function nextFrame() { 
  if(currentDateIndex == dates.length) {
    currentDateIndex = 0
  }
  sliderDates.setValue(currentDateIndex, true)
  currentDateIndex += 1
  if(play) {
    if(currentDateIndex == dates.length) {
      ui.util.setTimeout(nextFrame, timeStep * 10)
    } else {
      ui.util.setTimeout(nextFrame, timeStep)
    }
  }
}
function onPlayPause() {
  if(!play && !timeout) {
    currentDateIndex = 0
    showAllLayers(50)
    timeout = ui.util.setTimeout(nextFrame, timeStep)
    play = true
    buttonPlayPause.setLabel(textPause)
  } else {
    ui.util.clearTimeout(timeout)
    timeout = null
    play = false
    buttonPlayPause.setLabel(textPlay)
  }
}
function onCompare() {
  if(panelCompare == null) {
    return
  }
  panelCompare.style().set({ shown: switchCompare.getValue() })
  updateComparisonGui()
}
function initGui() {
  var labelInfo = ui.Label('Info', { fontWeight: 'bold' })
  sliderDates = ui.Slider({
    min: 0, 
    max: dates.length-1, 
    value: dates.length-1,
    step: 1,
    style: { 
      width: '280px',
      'background-color': '#00000022'
    }
  })
  sliderDates.onSlide(function(i) {
    currentDateIndex = i
    currentDate = dates[i]
    showInfo(currentDate)
    updateMap()
    updateChartGlobalThrottled()
    labelDate.setValue(currentDate)
    if(useNRT) {
      if(currentDateIndex === dates.length-1) {
        // layerUpdatedToday.setOpacity(0.6)
      } else {
        // layerUpdatedToday.setOpacity(0)
      }
    }
  })
  // chart
  var table = { cols: tableCols, rows: [] }
  // add chart
  chart = ui.Chart(table).setOptions({ 
    legend: { position: 'none' },
    backgroundColor: { fill: "#FDFEFE" },
    pointSize: 2,
    lineWidth: 1,
    colors: ['#e31a1c', '#31a354', 'grey'],
    width: 400,
    annotations: { style: 'line' }
  })
  var labelChart = ui.Label('Dynamics', { fontWeight: 'bold' })
  var panelChart = ui.Panel({ 
    widgets: [
      // labelChart, 
      chart
    ], 
    style: {
      position: 'middle-left',
      'background-color': '#00000000',
      width: 400,
      margin: 0,
      padding: 0
    }
  })
  updateChartGlobal()
  labelDate.style().set({
    'backgroundColor': '#00000022',
    'color': 'white',
    'fontSize': '28px',
    // 'fontWeight': 'bold',
    'position': 'bottom-center'
  })
  labelDateUpdated.style().set({
    'backgroundColor': '#00000022',
    'color': 'white',
    'fontSize': '10px',
    // 'fontWeight': 'bold',
    'position': 'bottom-center'
  })
  log.style().set({
    'backgroundColor': '#00000022',
    'color': 'white',
    'fontSize': '10px',
    // 'fontWeight': 'bold',
    'position': 'bottom-center'
  })
  labelRegion.style().set({
    'backgroundColor': '#00000022',
    'color': 'white',
    'fontSize': '24px',
    'fontWeight': 'bold',
    'position': 'bottom-center'
  })
  labelConfirmed.style().set({
    'backgroundColor': '#00000022',
    // 'color': 'white',
    'fontSize': '24px',
    'fontWeight': 'bold',
    'position': 'bottom-center'
  })
  labelRecovered.style().set({
    'backgroundColor': '#00000022',
    // 'color': 'white',
    'fontSize': '24px',
    'fontWeight': 'bold',
    'position': 'bottom-center'
  })
  labelDeaths.style().set({
    'backgroundColor': '#00000022',
    'color': 'grey',
    'fontSize': '24px',
    'fontWeight': 'bold',
    'position': 'bottom-center'
  })
    labelConfirmedDelta.style().set({
    'backgroundColor': '#00000022',
    // 'color': 'white',
    'fontSize': '14px',
    'fontWeight': 'bold',
    'position': 'bottom-center'
  })
  labelRecoveredDelta.style().set({
    'backgroundColor': '#00000022',
    // 'color': 'white',
    'fontSize': '14px',
    'fontWeight': 'bold',
    'position': 'bottom-center'
  })
  labelDeathsDelta.style().set({
    'backgroundColor': '#00000022',
    'color': 'grey',
    'fontSize': '14px',
    'fontWeight': 'bold',
    'position': 'bottom-center'
  })
  labelDeathRate.style().set({
    'backgroundColor': '#00000022',
    'color': 'grey',
    'fontSize': '24px',
    'fontWeight': 'bold',
    'position': 'bottom-center',
  })
  function onShowRate() {
    showRate = switchToRate.getValue()
    updateChartGlobal()
  }
  function onLogScale() {
    isLog = switchLogScale.getValue()
    updateChartGlobal()
  }
  switchToRate = ui.Checkbox({
    label: 'Increments', 
    value: false, 
    onChange: onShowRate,
    style: {
      // margin: 0, 
      // padding: 0, 
      fontSize: '14px',
      'background-color': '#00000000',
      position: 'middle-right',
      color: 'ffffff'
    }
  })
  switchLogScale = ui.Checkbox({
    label: 'Log', 
    value: false, 
    onChange: onLogScale,
    style: {
      fontSize: '14px',
      'background-color': '#00000000',
      position: 'middle-right',
      color: 'ffffff'
    }
  })
  switchCompare = ui.Checkbox({
    label: 'Compare', 
    value: false, 
    onChange: onCompare,
    style: {
      fontSize: '14px',
      'background-color': '#00000000',
      position: 'middle-right',
      color: 'ffffff'
    }
  })
  switchCompare.setDisabled(true)
  var panelSwitches = ui.Panel({
    widgets: [switchToRate, switchLogScale, switchCompare],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: { 
      // margin: 0, padding: 0, 
      'background-color': '#00000055' },
  })
  var buttonPrev = ui.Button({ 
    label: '<', 
    onClick: function() {
      var index = sliderDates.getValue() - 1
      if(index >= 0) { 
        sliderDates.setValue(index, true)
      }
    }, 
    style: buttonStyle
  })
  var buttonNext = ui.Button({
    label: '>', 
    onClick: function() {
      var index = sliderDates.getValue() + 1
      if(index < dates.length) { 
        sliderDates.setValue(index, true)
      }
    }, 
    style: buttonStyle
  })
  panelPrevNext = ui.Panel({
    widgets: [buttonPrev, buttonNext, buttonPlayPause],
    layout: ui.Panel.Layout.flow('horizontal'), 
    style: { margin: '5px', padding: 0, 'background-color': '#00000000', height: '35px' } 
  })
  var panelDateAndSlider = ui.Panel({
    widgets: [
      labelDate,
      // ui.Panel({ 
      //   widgets: [labelDate, panelPrevNext], 
      //   layout: ui.Panel.Layout.flow('horizontal'), 
      //   style: { padding: 0, margin: 0, 'background-color': '#00000000' } 
      // }),
      panelPrevNext,
      sliderDates,
      labelDateUpdated,
      // log
    ],
    style: { position: 'bottom-center', 'background-color': '#00000000' }
  })
  // map.add(panelDateAndSlider)
  labelCoffee = ui.Label('☕ Buy me a coffee', {
    fontSize: '13px',
    margin: '3px',
    'background-color': '#00000000',
    fontFamily: 'Comic Sans MS'
  }, 'https://www.buymeacoffee.com/Eq378D1')
  var panelCoffee = ui.Panel([labelCoffee], null, { 
    margin: '0px', 
    padding: '0px', 
    position: 'bottom-center',
    'background-color': '#f0f0f0aa',
    border: '1px solid black',
  })
  map.add(panelCoffee)
  panelAll = ui.Panel({
    widgets: [
      ui.Panel({ widgets: [labelRegion, redirect], layout: ui.Panel.Layout.flow('horizontal'), style: { margin: 0, 'backgroundColor': '#00000000' } }),
      ui.Panel({ widgets: [labelConfirmed, labelConfirmedDelta], layout: ui.Panel.Layout.flow('horizontal'), style: { margin: 0, 'backgroundColor': '#00000000' } }),
      ui.Panel({ widgets: [labelRecovered, labelRecoveredDelta], layout: ui.Panel.Layout.flow('horizontal'), style: { margin: 0, 'backgroundColor': '#00000000'  } }),
      ui.Panel({ widgets: [labelDeaths, labelDeathsDelta], layout: ui.Panel.Layout.flow('horizontal'), style: { margin: 0, 'backgroundColor': '#00000000'  } }),
      // labelConfirmed
      // labelRecovered, 
      // labelDeaths, 
      labelDeathRate, 
      panelChart,
      panelSwitches,
      panelDateAndSlider,
      panelLinks
    ],
    style: { 
      position: 'bottom-left', 
      'background-color': '#00000033',
      border: '1px solid black',
      width: '340px'
    }
  })
  map.add(panelAll)
  // map.add(panelChart)
  // map.add(labelDate)
  updateChartOptions()
}
ui.root.add(map)
function formatDate(date, includeTime) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hour = d.getHours().toString(),
        minute = d.getMinutes().toString();
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    if(includeTime) {
      if (hour.length < 2)
          hour = '0' + hour;
      if (minute.length < 2) 
          minute = '0' + minute;
    }
    var s = [year, month, day].join('-')
    if(includeTime) {
      s = s + ' ' + hour + ':' + minute;
    }
    return s
}
var maintenance = ui.Label({ 
  value: 'Updates are delayed due to maintenance at Johns Hopkins University, stay tuned ...', 
})
var maintenanceURL = ui.Label({ 
  value: 'https://github.com/CSSEGISandData/COVID-19/issues/597', 
  targetUrl: 'https://github.com/CSSEGISandData/COVID-19/issues/597'
})
var close = ui.Button('Close')
var maintenancePanel = ui.Panel([
  maintenance, maintenanceURL, close
])
close.onClick(function() { maintenancePanel.style().set({ shown: false })})
// map.add(maintenancePanel)
map.onChangeBounds(function(bounds) {
  updateChartOptions()
})
// ref: http://stackoverflow.com/a/1293163/2343
// This will parse a delimited string into an array of
// arrays. The default delimiter is the comma, but this
// can be overriden in the second argument.
function CSVToArray( strData, strDelimiter ){
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");
    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
        );
    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];
    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;
    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec( strData )){
        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[ 1 ];
        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
            ){
            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push( [] );
        }
        var strMatchedValue;
        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[ 2 ]){
            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                "\""
                );
        } else {
            // We found a non-quoted value.
            strMatchedValue = arrMatches[ 3 ];
        }
        // Now that we have our value string, let's add
        // it to the data array.
        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }
    // Return the parsed data.
    return( arrData );
}
Map.addLayer(ee.Image(1), { palette: ['000000']}, 'black', true, 0.25)
// Update procedure:
//
// FOR DAILY:
//
// 0. Pull recent changes in D:\src\CSSEGISandData\COVID-19\
// 1. Run script 01-pull-and-convert.cmd
// FOR NRT:
//
// 1. Run script 01-pull-and-convert-nrt.cmd
// 3. Run script 02-upload-assets.cmd, resulting in an updated users/gena/covid19/covid19_new asset
// 4. Remove old tiles and manually export raster tiles for new date, uncomment exportNew() below
// 5. Once tiles exported, run script 03-update-metainfo.cmd to update the app meta-info
if(exportNewLayers || exportAllLayers) {
  // var blob = ee.Blob('gs://deltares-video-map/covid19_region_map.csv')
  // var strRegional = blob.string().getInfo()
}
function render(features, regional, dt, opt_opacity, opt_opacityLine) {
    var opacity = opt_opacity || 0.5
    var opacityLine = opt_opacityLine || 1
    // large aggregated
    var imageConfirmed = style.Feature.linear(features.filter(ee.Filter.gt('confirmed', 0)), 'conf_r',
        { palette: paletteConfirmed, pointSizeMin: 1, pointSizeMax: 40, width: 1, opacityLine: opacityLine, opacity: opacity, valueMin: 1, valueMax: confirmedMax_r })  
    var imageDeathsAndRecovered = style.Feature.linear(features.filter(ee.Filter.gt('recovered', 0)), 'dr_r',
        { palette: paletteRecovered, pointSizeMin: 1, pointSizeMax: 40, width: 1, opacityLine: opacityLine, opacity: opacity, valueMin: 1, valueMax: confirmedMax_r })  
    var imageDeaths = style.Feature.linear(features.filter(ee.Filter.gt('deaths', 0)), 'deaths_r',
        { palette: paletteDeaths, pointSizeMin: 1, pointSizeMax: 40, width: 1, opacityLine: opacityLine, opacity: opacity, valueMin: 1, valueMax: confirmedMax_r })  
  if(regional) {
    // local regions
    var tableAT = ee.FeatureCollection("users/gena/covid19/areas/country_areas_AT"),
        tableDE = ee.FeatureCollection("users/gena/covid19/areas/country_areas_DE"),
        tableFR = ee.FeatureCollection("users/gena/covid19/areas/country_areas_FR").filter(ee.Filter.neq('original', 'Metropolis')),
        tableIT = ee.FeatureCollection("users/gena/covid19/areas/country_areas_IT"),
        tableNL = ee.FeatureCollection("users/gena/covid19/areas/country_areas_NL"),
        tableUK = ee.FeatureCollection("users/gena/covid19/areas/country_areas_UK")
    var featuresRegional = tableAT.merge(tableDE).merge(tableFR).merge(tableIT).merge(tableNL).merge(tableUK)
    var data = CSVToArray(strRegional, ',')
    function show(featuresValue) {
      // print(ee.List(featuresValue.aggregate_array('name')).zip(featuresValue.aggregate_array('value')))
      // Use an equals filter to define how the collections match.
      var filter = ee.Filter.equals({
        leftField: 'original',
        rightField: 'name'
      });
      // Create the join.
      var join = ee.Join.saveFirst({
        matchKey: 'match'
      });
      // Apply the join.
      var results = join.apply(featuresRegional, featuresValue, filter).map(function(f) {
        return f.set({ value: ee.Feature(f.get('match')).get('value') })
      })
      results = results.filter(ee.Filter.neq('value', ''))
      results = results.map(function(f) {
        return f.set({ value: ee.Number.parse(f.get('value')) })
      })
      results = results.map(function(f) {
        return f.centroid().set({ value_r: ee.Number(f.get('value')).sqrt() })
      })
      // points
      var r = '#ef3b2c'
      var p = [r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r]
      var imageConfirmed = style.Feature.linear(results, 'value_r',
          { palette: p, pointSizeMin: 1, pointSizeMax: 40, width: 1, opacity: 0.25, opacityLine: 0.5, valueMin: 1, valueMax: confirmedMax_r })  
      // polygons
      // var imageConfirmed = style.Feature.linear(results, 'value', { 
      //       palette: palettes.cb.RdPu[9],
      //       width: 0, opacity: 0.75, valueMin: 1, valueMax: 1500,
      // })
      return imageConfirmed
    }  
    var dateIndex = data[0].length-1
    for(var i=0; i<data[0].length; i++) {
      if(data[0][i] == dt) {
        dateIndex = i
        break
      }
    }
    var date = data[0][dateIndex]
    print(date, dateIndex)
    var featuresValue = []  
    print(data)
    for(var i=2; i<data.length-1; i++) {
      var name = data[i][1]
      var value = data[i][dateIndex]
      value = ee.String(value).replace('1 to 4', '4')
      featuresValue.push(ee.Feature(null, { name: name, value: value }))
    }
    featuresValue = ee.FeatureCollection(featuresValue)
    var image = show(featuresValue)
    var imageFeatures = featuresRegional.style({color: '15151577', width: 1, fillColor: '15151555'})
    return imageFeatures.blend(image).blend(imageConfirmed).blend(imageDeathsAndRecovered).blend(imageDeaths)
  } else {
    return imageConfirmed.blend(imageDeathsAndRecovered).blend(imageDeaths)
  }
}
function exportTiles(image, date, subDir, minZoom, maxZoom) {
  var name = 'corona-virus-' + date
  var path = name
  if(subDir) {
    path = subDir + '/' + path
  }
  Export.map.toCloudStorage({
    image: image, 
    description: name + '-' + minZoom + '-' + maxZoom, 
    bucket: 'deltares-video-map', 
    fileFormat: 'auto', 
    path: 'corona-virus/' + path, 
    writePublicTiles: false, 
    minZoom: minZoom, 
    maxZoom: maxZoom, 
    skipEmptyTiles: true, 
    mapsApiKey: 'AIzaSyDItV6jEwI7jdCEqLWL4zO-ZzPvKC4193E',
    region: ee.Geometry.Polygon([[180,73],[0,73],[-180,73],[-180,-53],[0,-53],[180,-53],[180,73]], 'EPSG:4326', false)
    // bucketCorsUris: ['https://code.earthengine.google.com', 'https://gena.users.earthengine.app']
  })
  // Export.map.toCloudStorage({
  //   image: image, 
  //   description: name + '-6-8', 
  //   bucket: 'deltares-video-map', 
  //   fileFormat: 'auto', 
  //   path: 'corona-virus/' + name, 
  //   writePublicTiles: false, 
  //   minZoom: 5, 
  //   maxZoom: 11, 
  //   skipEmptyTiles: true, 
  //   mapsApiKey: 'AIzaSyDItV6jEwI7jdCEqLWL4zO-ZzPvKC4193E',
  //   region: ee.Geometry.Polygon([[180,85],[0,85],[-180,85],[-180,-85],[0,-85],[180,-85],[180,85]], 'EPSG:4326', false)
  //   // bucketCorsUris: ['https://code.earthengine.google.com', 'https://gena.users.earthengine.app']
  // })
  // Export.map.toCloudStorage({
  //   image: image, 
  //   description: name + '-9-11', 
  //   bucket: 'deltares-video-map', 
  //   fileFormat: 'auto', 
  //   path: 'corona-virus/' + name, 
  //   writePublicTiles: false, 
  //   minZoom: 5, 
  //   maxZoom: 11, 
  //   skipEmptyTiles: true, 
  //   mapsApiKey: 'AIzaSyDItV6jEwI7jdCEqLWL4zO-ZzPvKC4193E',
  //   region: ee.Geometry.Polygon([[180,85],[0,85],[-180,85],[-180,-85],[0,-85],[180,-85],[180,85]], 'EPSG:4326', false)
  //   // bucketCorsUris: ['https://code.earthengine.google.com', 'https://gena.users.earthengine.app']
  // })
}
function exportNew() {
  var casesAll = ee.FeatureCollection("users/gena/covid19/covid19_new")
    .filter(ee.Filter.neq('name', 'Recovered US'))
    .filter(ee.Filter.neq('name', 'Diamond Princess'))
    .filter(ee.Filter.neq('name', 'Recovered Canada'))
    .filter(ee.Filter.neq('name', 'Diamond Princess Canada'))
    .filter(ee.Filter.neq('name', 'MS Zaandam'))
    .filter(ee.Filter.neq('name', 'Grand Princess Canada'))
  // var casesAll = cases
  var casesNew = casesAll.filter(ee.Filter.eq('dt', dateNew))
  // fix broken geometry, use from previous time step
  var regional = false
  var image = render(casesNew, regional, dateNew)
  var cases_us_New = cases_us.filter(ee.Filter.eq('dt', dateNewUs)).filter(ee.Filter.gt('confirmed', 0))
  var image_us_New = render(cases_us_New, regional, dateNew, 0.4, 0.1)
  var adm = gadm.filterBounds(cases_us_New.geometry()).style({color: '15151577', width: 1, fillColor: '15151555'})
  image = adm.blend(image_us_New).blend(image)
  exportTiles(image, dateNew, 'v8', 0, 8)
  map.addLayer(image, {}, 'corona-virus-' + dateNew)
}
function testAddExportedTiles() {
  var layer = ui.Map.CloudStorageLayer({
    bucket: 'deltares-video-map', 
    path: 'corona-virus/corona-virus-' + dateNew, 
    maxZoom: 6, 
    name: 'corona-virus-' + dateNew, 
    shown: true, 
    opacity: 1
  })
  map.layers().add(layer)
}
if(exportNewLayers) {
  exportNew()
}
map.onClick(function(pt) {
  // hide comparison if map is clicked
  if(switchCompare.getValue()) {
    switchCompare.setValue(false, true)
  }
  redirect.setValue('')
  redirect.setUrl('')
  log.setValue('> Querying features ...')
  layerSelection.setShown(true)
  labelConfirmed.setValue('CONFIRMED: ...')
  labelRecovered.setValue('RECOVERED: ...')
  labelDeaths.setValue('DEATHS: ...')
  labelRegionExtra.setValue('')
  labelConfirmedDelta.setValue('')
  labelRecoveredDelta.setValue('')
  labelDeathsDelta.setValue('')
  labelDeathRate.setValue('RATE: ...')
  pt = ee.Geometry.Point([pt.lon, pt.lat])
  var ptBuffer = pt.buffer(map.getScale() * 10)
  var selection = casesSortDate.filterBounds(ptBuffer)
  // find nearest
  selection = selection.map(function(f) {
    return f.set({ distance: f.centroid().distance(pt) })
  }).sort('distance')
  selection = selection.limit(1)
  // select GADM only if we've selected from cases_us
  var selectionUS = gadm.filterBounds(cases_us.filterBounds(selection.geometry()).geometry())
  layerSelection.setEeObject(selection.merge(selectionUS).style({ color: 'ffff00', fillColor: 'ffff0010'}))
  var prev = null
  selection = selection.first()
  if(currentDate != dates[0]) {
    var selectionAll = cases.filter(ee.Filter.eq('name', selection.get('name')))
    var datePrev = dates[currentDateIndex-1]
    prev = selectionAll.filter(ee.Filter.eq('dt', datePrev)).first()
    log.setValue('> Querying time series ...')
    selectionAll.evaluate(function(all) {
      var d = {
        confirmed: {},
        recovered: {},
        deaths: {},
        region: all.features[0].properties.name,
        dt_reported: all.features[all.features.length-1].properties.dt_reporte
      }
      all.features.map(function(f) {
        d.confirmed[f.properties.dt] = f.properties.confirmed
        d.recovered[f.properties.dt] = f.properties.recovered
        d.deaths[f.properties.dt] = f.properties.deaths
      })
      casesAggregatedLocal = d
      if(chart !== null) {
        log.setValue('> Updating chart ...')
        updateChartGlobal()
      }
      log.setValue('> Updating info ...')
      updateInfoBox(currentDate)
      log.setValue('> ')
    })
  }
  selection.evaluate(function(f) {
    if(f == null) {
      log.setValue('> Resetting to global data ...')
      casesAggregatedLocal = casesAggregatedAll
      updateInfoBox(currentDate)
      updateChartGlobal()
      log.setValue('> ')
    } else {
/*      if(f.properties.name === 'Netherlands') {
        redirect.setValue('Zoom In')
        redirect.setUrl('https://gena.users.earthengine.app/view/corona-virus-nl')
        redirect.style().set({shown: true})
      } else*/ {
        redirect.setValue('')
        redirect.setUrl('')
        redirect.style().set({shown: false})
      }
    }
  })
})
// testAddExportedTiles()
function exportAll() {
  dates.map(function(dt) {
    var casesDate = cases.filter(ee.Filter.eq('dt', dt))
    var regional = false
    var image = render(casesDate, regional, dt)
    // US data
    var cases_us_New = cases_us.filter(ee.Filter.eq('dt', dt)).filter(ee.Filter.gt('confirmed', 0))
    var image_us_New = render(cases_us_New, regional, dt, 0.4, 0.1)
    var adm = gadm.filterBounds(cases_us_New.geometry()).style({color: '15151577', width: 1, fillColor: '15151555'})
    image = adm.blend(image_us_New).blend(image)
    exportTiles(image, dt, 'v8', 0, 8)
  })
}
var compareGuiInitialized = false
var updateComparisonGui = null
function initCompareGui() {
  cases = cases.sort('t')
  var casesChart = cases
  if(useNRT) {
    // casesChart = cases
    // casesChart = cases.filter(ee.Filter.or(
    //   ee.Filter.eq('dt_reporte', ''),
    //   ee.Filter.eq('dt_reporte', dates[dates.length-1])
    //   )
    // )
  }
  var casesGroupped = casesChart.reduceColumns({
      selectors: ['name', 'confirmed', 'recovered', 'deaths', 'province' ],
      reducer: ee.Reducer.toList().repeat(4)
      .group({
        groupField: 0,
        groupName: 'name'
      })
  })
  var tableOptions = {
    deaths: {
      threshold: 10, // min number of cases
      variableIndex: 2, // deaths
      variableName: 'deaths',
      minValue: 0
    },
    recovered: {
      threshold: 10, // min number of cases
      variableIndex: 1, // deaths
      variableName: 'recovered',
      minValue: 500,
          minValueSteps: 25
    },
    confirmed: {
      threshold: 100, // min number of cases
      variableIndex: 0, // confirmed
      variableName: 'confirmed',
      minValue: 10, // should reach minValue within minValueSteps
      minValueSteps: 20 // number of steps where we're above given threshold
    }
  }
  function getPlotTable(data, options, onlyHubei) {
    var plotData = []
    data.groups.map(function(countryData) {
      // Keep only Hubei
      if (onlyHubei && countryData.name.indexOf('China') !== -1 && countryData.name.indexOf('Hubei') === -1) {
        return
      }
      var d = countryData.list[options.variableIndex]
      var index = -1;
      for (var i = 0; i < d.length; ++i) {
          if (d[i] >= options.threshold) {
              index = i
              break;
          }
      }
      // limit if value has N steps but did not reach M within N steps
      var include = true
      // if(index != -1 && minValue && countryData.list[variableIndex].slice(index).length >= minValueSteps) {
      //   if(countryData.list[variableIndex].slice(index)[minValueSteps] < minValue) {
      //     include = false
      //   }
      // }
      // add country data
      if(index != -1 && include) {
        plotData.push({
          name: countryData.name,
          confirmed: countryData.list[0].slice(index),
          recovered: countryData.list[1].slice(index),
          deaths: countryData.list[2].slice(index)
        })
      }
    })
    var rowCount = plotData.reduce(function(total, current) {
      return Math.max(current.confirmed.length, total)
    }, 0)
    // generate columns
    var cols = [
      { id: 'days', type: 'number' }
    ]
    plotData.map(function(d) {
      cols.push({
        label: d.name,
        type: 'number'
      })
    })
    var rows = []
    for(var i=0; i<rowCount; i++)
    {
      var c = []
      c.push({v: i})
      for(var j=0; j<plotData.length; j++) {
        var d = plotData[j][options.variableName]
        if(i >= d.length) {
          c.push({v: null})
        } else {
          c.push({v: d[i] })
        }
      }
      rows.push({c: c})
    }
    // convert to DataTable
    return { cols: cols, rows: rows }
  }
  function showComparison(data) {
    // EE bug, called twice?!?
    if(compareGuiInitialized) {
      return
    }
    compareGuiInitialized = true
    var checkboxOnlyHubei = ui.Checkbox('Limit to Hubei only for China', true) 
    var sliderMaxDays = ui.Checkbox('Days forward', true) 
    var currentVariable = 'confirmed'
    var chartOptions = { 
      title: currentVariable + ' cases per country, day 0 is when the number of cases reached ' + tableOptions[currentVariable].threshold,
      fontSize: 11,
      chartArea: { height: '80%', width: '90%'},
      // legend: { position: 'right', textStyle: {fontSize: 11}},
      pointSize: 2,
      lineWidth: 1,
      height: 530,
      hAxis: {
        viewWindow: { min: 0, max: 60 }
      },
      vAxis: { scaleType: 'none' },
    }
    checkboxOnlyHubei.onChange(function() {
      updateChart(currentVariable)
    })
    function updateChart(variable) {
      var table = getPlotTable(data, tableOptions[variable], checkboxOnlyHubei.getValue())
      var chart = ui.Chart(table).setChartType('ScatterChart').setOptions(chartOptions)
      panelChart.clear()
      panelChart.widgets().add(chart)
      updateComparisonGui = function() { updateChart(variable) }
    }
    var checkboxLog = ui.Checkbox('Log', false) 
    var selectVariable = ui.Select({ 
      items: Object.keys(tableOptions),
      value: 'confirmed',
      style: { padding: 0, margin: 0 }
    })
    checkboxLog.onChange(function onLogScale() {
      if(checkboxLog.getValue()) {
        chartOptions.vAxis = { scaleType: 'log' }
      } else {
        chartOptions.vAxis = { scaleType: 'none' }
      }
      updateChart(currentVariable)
    })
    selectVariable.onChange(function(v) {
      chartOptions.title = v + ' cases per country, day 0 is when the number of cases reached ' + tableOptions[v].threshold
      currentVariable = v
      updateChart(currentVariable)    
    })
    var choices = ui.Panel({ 
      widgets: [selectVariable, checkboxLog, checkboxOnlyHubei], 
      layout: ui.Panel.Layout.flow('horizontal') 
    })
    var panelChart = ui.Panel([])
    updateChart(currentVariable)
    panelCompare = ui.Panel({
      widgets: [panelChart, choices],
      style: {
        width: '800px',
        height: '600px',
        shown: false
        // position: 'bottom-right'
      }
    })
    map.add(panelCompare)
    switchCompare.setDisabled(false)
  }
  casesGroupped.evaluate(function(casesGroupped) {
    showComparison(casesGroupped)
  })
}