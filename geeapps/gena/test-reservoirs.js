var reservoirPoints = ee.FeatureCollection("users/gena/eo-reservoirs/waterbodies-points-reservoirs"),
    reservoirs = ee.FeatureCollection("users/gena/eo-reservoirs/waterbodies-reservoirs"),
    reservoirs_intersect = ee.FeatureCollection("users/gena/eo-reservoirs/waterbodies-reservoirs_intersect"),
    table = ee.FeatureCollection("users/gena/eo-reservoirs/waterbodies-reservoirs-missing-5ha-filtered"),
    table2 = ee.FeatureCollection("users/gena/eo-reservoirs/waterbodies-reservoirs-missing-5ha"),
    reservoirsOsm = ee.FeatureCollection("users/gena/eo-reservoirs/reservoirs-osm"),
    reservoirs_ = ee.FeatureCollection("users/gena/eo-reservoirs/waterbodies-reservoirs_"),
    resultsRaw = ee.FeatureCollection("users/gena/eo-reservoirs/reservoirs-area-raw"),
    resultsMonthly = ee.FeatureCollection("users/gena/eo-reservoirs/reservoirs-area-monthly-with-fid"),
    dams = ee.FeatureCollection("users/gena/eo-reservoirs/dams-all"),
    damsNoReservoir = ee.FeatureCollection("users/gena/eo-reservoirs/dams-all-noreservoir"),
    damsNoReservoirBuffer = ee.FeatureCollection("users/gena/eo-reservoirs/dams-all-noreservoir-buffer");
function exportReservoirPointsWithFid() {
  var r = reservoirPoints.map(function(f) {
    return ee.Feature(f.geometry()).set({ 
      filename: f.get('filename'),
      fid: ee.Number(ee.String(ee.String(f.get('filename')).split('[_.]').get(2)).replace("^0+", ""))
    })
  })
  Export.table.toAsset({
    collection: r, 
    description: 'reservoir-points-with-fid', 
    assetId: 'users/gena/eo-reservoirs/waterbodies-points-reservoirs-with-fid'
  })
}
// exportReservoirPointsWithFid()
// throw(0)
function intersectionFiddling() {
  print('reservoirPoints', reservoirPoints.size())
  print('reservoirs', reservoirs_intersect.size())
  print('reservoirs__', reservoirs.size())
  print('reservoirs_', reservoirs_.size())
  print('table', table.size())
  print('table2', table2.size())
  print('reservoirsOsm', reservoirsOsm.size())
  // reservoirs 5ha intersecting with points and not with current reservoirs database
  var missing = table2 // .filterBounds(reservoirPoints.geometry())
  var spatialFilter = ee.Filter.intersects({
    leftField: '.geo',
    rightField: '.geo',
    maxError: 100
  });
  var saveAllJoin = ee.Join.inverted();
  var reservoirPointsEmpty = reservoirPoints.map(function(f) {
    return f.set({ count: reservoirs.filterBounds(f.geometry()).size() })
  }).filter(ee.Filter.eq('count', 0))
  print('points without reservoir: ', reservoirPointsEmpty.size())
  // missing = missing.filterBounds(Map.getBounds(true))
  // reservoirs_intersect = reservoirs.filterBounds(Map.getBounds(true))
  var intersectJoined = saveAllJoin.apply(missing, reservoirs, spatialFilter);
  print('missing', intersectJoined.size())
  Map.addLayer(intersectJoined, { color: 'red' }, 'missing')
  Export.table.toAsset({ collection: missing.merge(reservoirs), description: 'reservoirs_missing', assetId: 'users/gena/eo-reservoirs/waterbodies-reservoirs-new-2019-11' })
  // intersectJoined = intersectJoined.map(function(f) {
  //   var count = ee.List(f.get('intersections')).size();
  //   return f.set('count', count);
  // });
  intersectJoined = ee.FeatureCollection(intersectJoined).filter(ee.Filter.eq('count', 0))
  Map.addLayer(intersectJoined, { color: 'pink' })
  print('missing reservoirs', intersectJoined.size())
}
// intersectionFiddling()
Map.setOptions('SATELLITE')
var reservoirsLayer = ui.Map.Layer(reservoirs.style({ color: '00ffff', width: 1, fillColor: '00ffff33' }), {}, 'reservoirs', false)
Map.layers().add(reservoirsLayer)
Map.addLayer(reservoirPoints.style({ color: '00ffff', width: 1, pointSize: 1 }), { }, 'reservoirs processed')
Map.addLayer(table.style({ color: '00ffff', width: 1, pointSize: 1 }), { }, '5ha 2', false)
Map.addLayer(table2.style({ color: 'ff00ff', width: 1, pointSize: 1 }), { }, '5ha 1', false)
Map.addLayer(reservoirsOsm.style({ color: 'ff00ff', width: 1, pointSize: 1 }), { }, 'OSM', false)
var selectionLayer = ui.Map.Layer(ee.Feature(null), { color: 'red'}, 'selection', true, 0.5)
Map.layers().add(selectionLayer)
var selectionReservoirLayer = ui.Map.Layer(ee.Feature(null), { color: 'yellow'}, 'selection (reservoir)', true, 0.5)
Map.layers().add(selectionReservoirLayer)
var chartPanel = ui.Panel([ui.Label('Click on a reservoir point to see area time series')], null, {
  width: '600px', height: '310px',
  position: 'bottom-left'
})
Map.add(chartPanel)
var minZoom = 7
if(Map.getZoom() >= minZoom) {
  reservoirsLayer.setShown(true)
}
var loading = false
function showResults(filename, reservoir, onDone) {
  var table = 
  {
    cols: [
      {id: 't', type: 'date', role: 'domain'},
      {id: 'area', type: 'number', role: 'data'},
      {id: 'area_raw', type: 'number', role: 'data'}
    ],
    rows: []
  }
  filename = ee.String(filename).slice(0, -8).cat('.csv')
  var logMessages = ''
  function log(message) {
    logMessages = logMessages + message + ' ... '
    chartPanel.widgets().reset([ui.Label(logMessages)])
  }
  function updateMonthly() {
    var path = ee.String('gs://hydro-engine-waterbodies/time-series-monthly-csv/').cat(filename)
    path.evaluate(function(path) {
      // log(path)
      log('fit')
      var timeSeries = ee.Blob(path)
      timeSeries.string().evaluate(function (s) {
        var rows = s.split('\n').slice(1).slice(0, -1)
        rows = rows.map(function(row) {
          var o = row.split(',')
          return { c: [{v: new Date(Date.parse(o[0]))}, {v: parseFloat(o[1]) / 1000000 }, { v: null }] }
        })
        table.rows = rows
        updateRaw()
      })
    })
  }
  function updateRaw() {
    var path = ee.String('gs://hydro-engine-waterbodies/time-series-raw-csv/').cat(filename)
    path.evaluate(function(path) {
      log('raw')
      var timeSeries = ee.Blob(path)
      timeSeries.string().evaluate(function (s) {
        var rows = s.split('\n').slice(1).slice(0, -1)
        rows = rows.map(function(row) {
          var o = row.split(',')
          return { c: [{v: new Date(Date.parse(o[0]))}, { v: null }, {v: parseFloat(o[1]) / 1000000 }] }
        })
        table.rows = table.rows.concat(rows)
        updateChart()
      })
    })
  }
  function updateChart() {
    var chart = ui.Chart(table)
      .setOptions({
        chartArea: {width: '80%', height: '80%'},
        width: '500px', height: '240px',
        vAxis: { viewWindow: { min: 0 } },
        series: {
          0: { title: 'fit', lineWidth: 1, pointSize: 0, color: 'blue'},
          1: { title: 'raw', lineWidth: 0, pointSize: 1, color: 'red', dataOpacity: 0.3 }
        }
      })
    chart.setSeriesNames(['fit', 'raw'])
    var widgets = chartPanel.widgets()
    widgets.reset([])
    widgets.add(ui.Label('Loading title ...'))
    widgets.add(chart)
    reservoir.geometry().area(10).evaluate(function(area) {
      if(isNaN(area)) {
        return
      }
      area = (area / 1000000).toFixed(2)
      chartPanel.widgets().set(0, ui.Label('Area: ' + area + ' km²'))
    })
    onDone()
  }
  log('Loading')  
  updateMonthly() // trigger async calls
  // Promise is still buggy
  // var Promise = require('users/gena/packages:promise').Promise
  // // query monthly data
  // var getDataFit = new Promise(function(resolve, reject) {
  //   var path = ee.String('gs://hydro-engine-waterbodies/time-series-monthly-csv/').cat(filename)
  //   path.evaluate(function(path) {
  //     var timeSeries = ee.Blob(path)
  //     timeSeries.string().evaluate(function (s) {
  //       var rows = s.split('\n').slice(1).slice(0, -1)
  //       rows = rows.map(function(row) {
  //         var o = row.split(',')
  //         return { c: [{v: new Date(Date.parse(o[0]))}, {v: parseFloat(o[1]) / 1000000 }, { v: null }] }
  //       })
  //       table.rows = rows
  //       resolve()
  //     })
  //   })
  // })
  // // query RAW data
  // var getDataRaw = new Promise(function(resolve, reject) {
  //   var path = ee.String('gs://hydro-engine-waterbodies/time-series-raw-csv/').cat(filename)
  //   path.evaluate(function(path) {
  //     var timeSeries = ee.Blob(path)
  //     timeSeries.string().evaluate(function (s) {
  //       var rows = s.split('\n').slice(1).slice(0, -1)
  //       rows = rows.map(function(row) {
  //         var o = row.split(',')
  //         return { c: [{v: new Date(Date.parse(o[0]))}, { v: null }, {v: parseFloat(o[1]) / 1000000 }] }
  //       })
  //       table.rows = table.rows.concat(rows)
  //       resolve()
  //     })
  //   })
  // }) 
  // chartPanel.widgets().reset([ui.Label('Loading ...')])
  // Promise.sequence([getDataFit, getDataRaw]).then(function() {
  //   updateChart()
  //   onDone()
  // })
}
function showFitFromCSV(filename) {
  if(loading) {
    return
  }
  loading = true
  chartPanel.widgets().reset([ui.Label('Loading ...')])
  var pathMonthly = ee.String('gs://hydro-engine-waterbodies/time-series-monthly-csv/').cat(ee.String(filename).slice(0, -8).cat('.csv'))
  pathMonthly.evaluate(function(path) {
    var timeSeries = ee.Blob(path)
    timeSeries.string().evaluate(function (s) {
      var rows = s.split('\n').slice(1).slice(0, -1)
      var table = 
      {
        cols: [
          {id: 't', type: 'date'},
          {id: 'area', type: 'number'}
        ],
        rows: rows.map(function(row) {
          var o = row.split(',')
          return { c: [{v: new Date(Date.parse(o[0]))}, {v: parseFloat(o[1]) / 1000000 }] }
        })
      }
      var chart = ui.Chart(table)
        .setOptions({
          chartArea: {width: '80%', height: '80%'},
          width: '500px', height: '240px',
          vAxis: { viewWindow: { min: 0 } },
          series: {
            0: { lineWidth: 1, pointSize: 0, color: 'blue'}
          }
        })
      chartPanel.widgets().reset([chart])
      loading = false
    })
  })
}
Map.onChangeZoom(function(zoom) {
  if(zoom > minZoom) {
    if(!reservoirsLayer.getShown()) {
      reservoirsLayer.setShown(true)
    }
  } else {
    if(reservoirsLayer.getShown()) {
      reservoirsLayer.setShown(false)
    }
  }
})
var waterbodyPointSelected = ui.Map.Layer(ee.Image(), { color: 'yellow' }, 'waterbody point selected')
Map.layers().add(waterbodyPointSelected)
Map.onClick(function(pt) {
  if(Map.getZoom() < minZoom) {
    chartPanel.widgets().reset([ui.Label('Please zoom in to visualize time series, zoom level is too coarse, it is ' + Map.getZoom() + ', but should be at least ' + minZoom)])
    return
  }
  pt = ee.Geometry.Point([pt.lon, pt.lat]).buffer(Map.getScale() * 10)
  selectionLayer.setEeObject(pt)
  var selectedReservoir = reservoirs.filterBounds(pt)
  selectionReservoirLayer.setEeObject(selectedReservoir)
  var aoi = selectedReservoir.geometry().union(pt)
  // use FID  
  var reservoirPoint = reservoirPoints.filterBounds(aoi).first()
  var fid = reservoirPoint.get('fid')
  var results = resultsMonthly.filter(ee.Filter.eq('fid', ee.Number.parse(fid)))
  waterbodyPointSelected.setEeObject(ee.Feature(reservoirPoint))
  // use coords
  // var results = resultsMonthly.filterBounds(aoi)
  function showFitAndRaw() {  
    results = results.map(function(f) {
        return ee.Feature(f.geometry()).set({ 
          area_fit: f.get('area'),
          time: f.get('time'),
        })
    })
    results = results.merge(resultsRaw.filterBounds(aoi))
    var chart = ui.Chart.feature.byFeature(results, 'time', ['area', 'area_fit'])
      .setOptions({
        chartArea: {width: '80%', height: '80%'},
        width: '500px', height: '210px',
        vAxis: { viewWindow: { min: 0 } },
        series: {
          0: { lineWidth: 0, pointSize: 1, color: 'red', dataOpacity: 0.3 },
          1: { lineWidth: 2, pointSize: 0, color: 'black'},
        }
      })
    chartPanel.widgets().reset([chart])
  }
  function showFit() {
    var chart = ui.Chart.feature.byFeature(results, 'time', ['area'])
      .setOptions({
        chartArea: {width: '80%', height: '80%'},
        width: '500px', height: '210px',
        vAxis: { viewWindow: { min: 0 } },
        series: {
          0: { lineWidth: 1, pointSize: 0, color: 'blue'}
        }
      })
    chartPanel.widgets().reset([chart])
  }
  if(loading) {
    return
  }
  loading = true
  // showFitAndRaw()
  // showFit()
  // showFitFromCSV(reservoirPoint.get('filename'))
  showResults(reservoirPoint.get('filename'), selectedReservoir, function() {   
    // after done
    loading = false
  })
})
// Map.style().set({ cursor: 'crosshair' })
// print('dams', dams.size())
// print('dams (no reservoir)', damsNoReservoir.size())
// print('dams (no reservoir buffer)', damsNoReservoirBuffer.size())
// Map.addLayer(dams.style({ color: 'feb24c', fillColor: 'feb24c', pointSize: 1}), {}, 'dams')
// Map.addLayer(damsNoReservoirBuffer.style({ color: 'feb24c', fillColor: 'feb24c', pointSize: 1}), {}, 'dams (no reservoir)', false)