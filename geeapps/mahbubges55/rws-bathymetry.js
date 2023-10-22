var ahn = ui.import && ui.import("ahn", "image", {
      "id": "AHN/AHN2_05M_RUW"
    }) || ee.Image("AHN/AHN2_05M_RUW"),
    depthProxyIntertidal = ui.import && ui.import("depthProxyIntertidal", "imageCollection", {
      "id": "users/gena/eo-bathymetry/depth-intertidal-uncalibrated"
    }) || ee.ImageCollection("users/gena/eo-bathymetry/depth-intertidal-uncalibrated"),
    depthProxySubtidal = ui.import && ui.import("depthProxySubtidal", "imageCollection", {
      "id": "users/gena/eo-bathymetry/depth-subtidal-uncalibrated"
    }) || ee.ImageCollection("users/gena/eo-bathymetry/depth-subtidal-uncalibrated"),
    depthProxySubtidalDynamic = ui.import && ui.import("depthProxySubtidalDynamic", "imageCollection", {
      "id": "projects/deltares-rws/eo-bathymetry/depth-uncalibrated-nl-2019-v3"
    }) || ee.ImageCollection("projects/deltares-rws/eo-bathymetry/depth-uncalibrated-nl-2019-v3"),
    jarkusGrid = ui.import && ui.import("jarkusGrid", "imageCollection", {
      "id": "projects/deltares-rws/eo-bathymetry/jarkus"
    }) || ee.ImageCollection("projects/deltares-rws/eo-bathymetry/jarkus"),
    vaklodingen = ui.import && ui.import("vaklodingen", "imageCollection", {
      "id": "projects/deltares-rws/eo-bathymetry/vaklodingen-anual"
    }) || ee.ImageCollection("projects/deltares-rws/eo-bathymetry/vaklodingen-anual");
function App() { 
}
App.run = function() {
  App.initialize()
  App.addLayers()
  App.createUI()
}
App.initialize = function() {
  App.corrChartPanel = null
  App.corrPoint = null
  App.layerObjects = {
    'AHN3': null, 
    'SDB (intertidal)': null, 
    'SDB (subtidal)': null, 
    'SDB (subtidal, dynamic)': null, 
    'Vaklodingen': null, 
    'Jarkus Grids': null
  }
  // used when we need to name images by layers
  App.layerObjectVariables = {
    'AHN3': 'AHN3', 
    'SDB (intertidal)': 'SDB_intertidal', 
    'SDB (subtidal)': 'SDB_subtidal', 
    'SDB (subtidal, dynamic)': 'SDB_subtidal_dynamic', 
    'Vaklodingen': 'Vaklodingen', 
    'Jarkus Grids': 'Jarkus_Grids'
  }
  App.layerNames = Object.keys(App.layerObjects)
  App.firstLayerName = null
  App.firstLayerName = null
  App.dateStart = '2011-01-01' 
  // these are equidistant (3 month) times covering the whole time window (intersection of all dynamic layers)
  // used for the time slider
  App.times = ee.List.sequence(0, 12 * 8, 3).map(function(m) {
    return ee.Date(App.dateStart).advance(m, 'month').format('YYYY-MM-dd')
  }).getInfo()
  App.layersSDBsub = []
  App.layersVaklodingen = []
  App.layersJarkusGrids = []
  App.currentLayerSDBsub = null
  App.currentLayerVaklodingen = null
  App.currentLayerJarkusGrids = null
  App.timesJarkusGrids = []
  App.timesVaklodingen = []
  App.timesSDBsub = []
  App.currentTimeSDBsub = 0
  App.currentTimeVaklodingen = 0
  App.currentTimeJarkusGrids = 0
  App.currentTime = 0
}
App.addLayers = function() {
  // add dynamic layers and times
  // Jarkus Grids layers
  App.timesJarkusGrids = ee.List.sequence(0, 12 * 8, 12).map(function(m) {
    return ee.Date(App.dateStart).advance(m, 'month').format('YYYY-MM-dd')
  }).getInfo()
  // Example layer: https://code.earthengine.google.com/54edb9c3351aea89816fe9d93a6257e3
  // eo-bathymetry-rws
  // Jarkus-HS-rws-v0
  App.timesJarkusGrids.map(function(time) {
    var layer = ui.Map.CloudStorageLayer({
      bucket: 'eo-bathymetry-rws', 
      path: 'Jarkus-HS-rws-v0/' + time, 
      maxZoom: 13,
      suffix: '.png',
      name: 'JarkusGrid-' + time, 
      shown: false, 
      opacity: 0
    })
    layer.time = time
    App.layersJarkusGrids.push(layer)
    Map.layers().add(layer)  
  })
  // Vaklodingen layers
  App.timesVaklodingen = ee.List.sequence(0, 12 * 8, 12).map(function(m) {
    return ee.Date(App.dateStart).advance(m, 'month').format('YYYY-MM-dd')
  }).getInfo()
  App.timesVaklodingen.map(function(time) {
    var layer = ui.Map.CloudStorageLayer({
      bucket: 'eo-bathymetry-rws', 
      path: 'Vaklodingen-HS-rws-v0/' + time, 
      maxZoom: 13,
      suffix: '.png',
      name: 'Vaklodingen-' + time, 
      shown: false, 
      opacity: 0
    })
    layer.time = time
    App.layersVaklodingen.push(layer)
    Map.layers().add(layer)  
  })
  // SDB Subtidal layers
  App.timesSDBsub = ee.List.sequence(12 * 4, 12 * 8, 3).map(function(m) {
    return ee.Date(App.dateStart).advance(m, 'month').format('YYYY-MM-dd')
  }).getInfo()
  App.timesSDBsub.forEach(function(time, i) {
    var layer = ui.Map.CloudStorageLayer({
      bucket: 'eo-bathymetry', 
      path: 'sdb-rgb-v3.3/' + time, 
      maxZoom: 13,
      suffix: '.png',
      name: 'SDBsub-' + time, 
      shown: false, 
      opacity: 0
    })
    App.layersSDBsub.push(layer)
    Map.layers().add(layer)  
  })
  // TODO: extend this to multiple dynamic layers (currentLayerSDBSub, currentLayerJarkusGridss)
  App.currentLayerSDBsub = App.layersSDBsub[0]
  App.currentLayerSDBsub.setOpacity(1)
  App.currentLayerSDBsub.setShown(true)
  App.currentTimeSDBsub = 0
  // vaklodingen currentl yaers
  App.currentLayerVaklodingen = App.layersVaklodingen[4]
  App.currentLayerVaklodingen.setOpacity(1)
  App.currentTimeVaklodingen = 4
  // fixing Jarkus Grid current layer
  App.currentLayerJarkusGrids = App.layersJarkusGrids[4]
  App.currentLayerJarkusGrids.setOpacity(1)
  App.currentTimeJarkusGrids = 4
  // initial slider index
  App.currentTime = 15
  // Setup images used during analysis
  // current dyanmic bathymetry image
  var image = depthProxySubtidalDynamic.filterDate(App.timesSDBsub[App.currentTimeSDBsub]).mosaic()
  var water = image.select('water').gt(0)
  App.layerObjects['SDB (subtidal, dynamic)'] = image.select('green').updateMask(water)
  var imageVaklodingen = vaklodingen.filterDate(App.timesVaklodingen[App.currentTimeVaklodingen]).first()
  App.layerObjects['Vaklodingen'] = imageVaklodingen
  var imageJarkus = jarkusGrid.filterDate(App.timesJarkusGrids[App.currentTimeJarkusGrids]).first()
  App.layerObjects['Jarkus Grids'] = imageJarkus
  // add static layers
  App.layerSubtidal = ui.Map.Layer (invDepthHill, {}, 'SDB(subtidal, static)', false)
  Map.layers().add(App.layerSubtidal)
  App.layerObjects['SDB (subtidal)'] = depthProxySubtidal.mosaic()
  App.layerIntertidal = ui.Map.Layer (intertidal3d.mosaic(), {}, 'SDB(intertidal, static)', false)
  Map.layers().add(App.layerIntertidal)
  // cleaned-up image for intertidal zone
  var ndwiMin = -0.1
  var ndwiMax = 0.14
  var ndwi = ee.ImageCollection('users/gena/eo-bathymetry/depth-intertidal-uncalibrated').map(function(i) { 
    return i
      .where(i.lt(ndwiMin), ndwiMin)
      .unitScale(ndwiMin, ndwiMax) 
  })
  ndwi =  ndwi.mosaic()
  var ndwiMask = ndwi.gt(0.05) // probably non-water
  var intertidalZone = ndwiMask
  App.layerObjects['SDB (intertidal)'] = ee.Image(1).subtract(intertidalScaled.mosaic()).updateMask(intertidalZone)
  var palettes = require('users/gena/packages:palettes')
  App.palette = palettes.colorbrewer.BrBG[11];
  App.layerAHN3 = ui.Map.Layer(ee.Terrain.hillshade(ahn.multiply(4), 315-180, 25), { min:90, max: 130 , palette: App.palette}, 'AHN3', false)
  Map.layers().add(App.layerAHN3)
  App.layerObjects['AHN3'] = ahn
  App.correlationImageLayer = ui.Map.Layer(ee.Image(), {}, 'correlation image', false)
  Map.layers().add(App.correlationImageLayer)
  App.aoiLayer = ui.Map.Layer(null, {}, 'aoi');
  Map.layers().add(App.aoiLayer); // adding aioLayer to all the created mapLayer
}
App.createUI = function() {
  // create map layer UI controls
  function createLayerUI(name, shown, color, onChangeShown, onChangeOpacity, controls, style) {
    var layerPanel = ui.Panel([
      ui.Label(name, { color: color, margin: '0px 0px 0px 0px', padding: '0px', position: 'top-left' })
    ], ui.Panel.Layout.absolute(), { height: '40px', border: '1px solid black', width: '305px', margin: '2px 0px 0px 10px' }) 
    // add layer controls    
    var layerShownCheckbox = ui.Checkbox('', shown, function(s) {
      onChangeShown(s)
    })
    var layerOpacitySlider = ui.Slider(0, 1, 1, 0.05)
    layerOpacitySlider.onSlide(function(v) {
      onChangeOpacity(v)
    })
    layerShownCheckbox.style().set({ margin: '0px', padding: '0px', border: '0px' })
    layerOpacitySlider.style().set({ margin: '0px', padding: '0px', border: '0px', width: '50px' })
    var layerControls = ui.Panel([
      layerShownCheckbox, 
      layerOpacitySlider
    ], ui.Panel.Layout.flow('horizontal'))
    layerControls.style().set({ position: 'top-right', margin: '0px 0px 0px 0px', padding: '0px' })
    if(controls) {
      controls.map(function(c) {
        layerPanel.widgets().add(c)
      })
    }
    if(style) {
      layerPanel.style().set(style)
    }
    layerPanel.widgets().add(layerControls)
    return layerPanel 
  }
  // animation controls panel
  App.timeSlider = ui.Slider({
    min: 1, 
    max: App.times.length, 
    value: 17,
    step: 1,
    style: { width: '260px', margin: '0px', padding: '0px'}
  })
  App.timeSliderLabel = ui.Label(App.times[0])
  var playPauseButton = App.createPlayer()
  // Fill times chart
  var timesJarkus = ee.ImageCollection('projects/deltares-rws/eo-bathymetry/jarkus')
    .filterDate(App.dateStart, '2021-01-01').map(function(i) {
      return i.set({ v: 1, s: 'Jarkus grids', yAxis: { viewWindowMode:'explicit', viewWindow: { min: 0, max: 3 } } })
    })
  var timesVaklodingen = ee.ImageCollection('projects/deltares-rws/eo-bathymetry/vaklodingen-anual') 
    .filterDate('2011-01-01', '3000-01-01').map(function(i) {
      return i.set({v: 2, s: 'Vaklodingen'})
    })
  var timesSDBsubtidal = ee.ImageCollection('projects/deltares-rws/eo-bathymetry/depth-uncalibrated-nl-2019-v3')
    .filterDate(App.dateStart, '2021-01-01')
    .filter(ee.Filter.eq('tx', 260))
    .filter(ee.Filter.eq('ty', 169))
    .map(function(i) {
      return i.set({v: 3, s: 'SDB'})
    })
  var features = timesSDBsubtidal.merge(timesJarkus).merge(timesVaklodingen)
  // var chartTimes = ui.Chart.feature.groups(features, 'system:time_start', 'v', 's').setOptions({
  //   lineWidth: 0,
  //   pointSize: 2
  // })
  var table = 
  {
    cols: [
      {id: 't', type: 'date'},
      {id: 'Jarkus', type: 'number'},
      {id: 'Lodingen', type: 'number'},
      {id: 'SDB', type: 'number'}
    ],
    rows: [
    ]
  };
  var chartTimes = ui.Chart(table) .setOptions({ 
    legend: { position: 'none' },
    lineWidth: 1,
    pointSize: 2,
    // width: '200px',
    // chartArea: {
    //   width: '100%',
    //   height: '100%'
    // },
    vAxis: { viewWindow: { min: 0, max: 4 } },
    series: {
      0: {type: 'point', lineWidth: 0},
      1: {type: 'point', lineWidth: 0},
      2: {type: 'point', lineWidth: 0},
      3: {type: 'line', pointSize: 0, lineWidth: 2, color: 'black'} 
    }
  })
  features.evaluate(function(features) {
    /***
     * Updates chart randomly
     */
    function updateChart(t) {
      var rows = features.features.map(function(r) {
        var row = { c: [
          {v: new Date(r.properties['system:time_start']) },
          {v: null },
          {v: null },
          {v: null },
          {v: null },
        ]}
        var v = r.properties['v']
        var s = r.properties['s']
        row.c[v].v = v
        return row
      })
      rows = rows.concat([
        { c: [{v: t }, {v: null }, {v: null }, {v: null }, {v: 0 }]},
        { c: [{v: t }, {v: null }, {v: null }, {v: null }, {v: 4 }]}
      ])
      var table2 = 
      {
        cols: [
          {id: 't', type: 'date'},
          {id: 'Jarkus', type: 'number'},
          {id: 'Lodingen', type: 'number'},
          {id: 'SDB', type: 'number'},
          {id: 'cursor', type: 'number'}
        ],
        rows: rows
      };
      chartTimes.setDataTable(table2)
    }
    App.updateChart = updateChart
    updateChart(new Date(new Date(Date.parse('2015-03-01'))))
    // slider event handlers
    App.timeSlider.onSlide(function(v) {
      updateChart(new Date(Date.parse(App.times[v-1])))
    })
    App.timeSlider.onSlide(App.onTimeChange)
    App.timeSlider.onChange(function(v) {
      // update dynamic map layer image
      var image = depthProxySubtidalDynamic.filterDate(App.timesSDBsub[App.currentTimeSDBsub]).mosaic()
      var water = image.select('water').gt(0)
      App.layerObjects['SDB (subtidal, dynamic)'] = image.select('green').updateMask(water)
      var imageVaklodingen = vaklodingen.filterDate(App.timesVaklodingen[App.currentTimeVaklodingen]).first()
      App.layerObjects['Vaklodingen'] = imageVaklodingen
      var imageJarkus = jarkusGrid.filterDate(App.timesJarkusGrids[App.currentTimeJarkusGrids]).first()
      App.layerObjects['Jarkus Grids'] = imageJarkus
      // update correlation image layer (if selected)
      App.updateCorrelationLayer(true)
    })
  })
  // Analysis Panel  
  function createCorrelationLayerLegend() {
    // Creates a color bar thumbnail image for use in legend from the given color palette.
    function makeColorBarParams(palette) {
      return {
        bbox: [0, 0, 1, 0.1],
        dimensions: '100x8',
        format: 'png',
        min: 0,
        max: 1,
        palette: palette,
      };
    }
    // Create the color bar for the legend.
    var colorBar = ui.Thumbnail({
      image: ee.Image.pixelLonLat().select(0),
      params: makeColorBarParams(paletteCorrelation),
      style: {stretch: 'horizontal', margin: '0px 0px', maxHeight: '15px'},
    });
    // Create a panel with three numbers for the legend.
    var legendLabels = ui.Panel({
      widgets: [
        ui.Label(-1, {margin: '4px 8px'}),
        ui.Label(0, {margin: '4px 60px'}),
        ui.Label(1, {margin: '4px 8px', stretch: 'horizontal', textAlign: 'right'}),
      ],
      layout: ui.Panel.Layout.flow('horizontal')
    });
    return ui.Panel([colorBar, legendLabels], null, {margin: '0px', padding: '0px', position: 'bottom-left', width: '200px'});
  }
  var selectFirstLayerCombo = ui.Select({ items: App.layerNames, placeholder: 'Select layer ...', value: App.layerNames[0]})
  var selectSecondLayerCombo = ui.Select({ items: App.layerNames, placeholder: 'Select layer ...', value: App.layerNames[1]})
  App.selectFirstLayerCombo = selectFirstLayerCombo
  App.selectSecondLayerCombo = selectSecondLayerCombo
  App.selectFirstLayerCombo.setDisabled(true)
  App.selectSecondLayerCombo.setDisabled(true)
  selectFirstLayerCombo.onChange(function(layerName) {
    App.updateCorrelationLayer()
  })
  selectSecondLayerCombo.onChange(function(layerName) {
    App.updateCorrelationLayer()
  })
  var legend = createCorrelationLayerLegend()
  legend.style().set({ margin: '0px', position: 'bottom-left'})
  var correlationMapLayerUI = createLayerUI('AHN3 vs SDB (intertidal)', false, 'black', function(shown) { 
    App.correlationImageLayer.setShown(shown) 
    App.updateCorrelationLayer()
    App.selectFirstLayerCombo.setDisabled(!shown)
    App.selectSecondLayerCombo.setDisabled(!shown)
    Map.style().set('cursor', shown ? 'crosshair' : 'hand')
    // hide / show correlation chart and click AOI layer
    if(App.corrChartPanel) {
      App.corrChartPanel.style().set({ shown: shown })
      App.aoiLayer.setShown(shown)
    }
  }, function(opacity) { 
    App.correlationImageLayer.setOpacity(opacity) 
  }, [
    legend
  ], { height: '100px'})
  var panelAnalysis = ui.Panel({
    widgets: [
      ui.Label('Analysis', { fontWeight: 'bold' }),
      ui.Label('Spearmans correlation for two selected layers:'),
      ui.Panel([
        selectFirstLayerCombo,
        selectSecondLayerCombo
        ], ui.Panel.Layout.flow('horizontal')
        ),
      correlationMapLayerUI,
      // ui.Label('Click on the map to show scatter plot for selected layers'),
    ], 
    style: { width: '320px'},
    layout: ui.Panel.Layout.flow('vertical')
  })
  // Map Layers Panel
  var layerControlsAHN3 = createLayerUI('AHN3', false, 'black', function(shown) { App.layerAHN3.setShown(shown) }, function(opacity) { App.layerAHN3.setOpacity(opacity) })
  var layerControlsSDBIntertidal = createLayerUI('SDB (intertidal)', false, 'black', function(shown) { App.layerIntertidal.setShown(shown) }, function(opacity) { App.layerIntertidal.setOpacity(opacity) })
  var layerControlsSDBSubtidal = createLayerUI('SDB (subtidal)', false, 'black', function(shown) { App.layerSubtidal.setShown(shown) }, function(opacity) { App.layerSubtidal.setOpacity(opacity) })
  var layerControlsSDBSubtidalDynamic = createLayerUI('SDB (subtidal, dynamic)', true, 'orange', 
    function(shown) { 
      if(App.currentLayerSDBsub != null) {
        App.currentLayerSDBsub.setOpacity(0)
      }
      App.currentLayerSDBsub = App.layersSDBsub[App.currentTimeSDBsub]
      App.currentLayerSDBsub.setOpacity(1)
      App.currentLayerSDBsub.setShown(shown) 
      // hide all dynamic layers
      if(!shown) {
        App.layersSDBsub.map(function(l) {
          if(l.getShown()) {
            l.setShown(false)
          }
        })
      } else {
        showCurrentDynamicMapLayersDebounce()
      }
    }, 
    function(opacity) { 
      App.currentLayerSDBsub.setOpacity(opacity) 
    }
  )
  var layerControlsVaklodingen = createLayerUI('Vaklodingen', false, 'red', 
    function(shown) { 
     if(App.currentLayerVaklodingen != null) {
        App.currentLayerVaklodingen.setOpacity(0)
      }
      App.currentLayerVaklodingen = App.layersVaklodingen[App.currentTimeVaklodingen]
      App.currentLayerVaklodingen.setOpacity(1)
      App.currentLayerVaklodingen.setShown(shown)
      // hide all dynamic layers
      if(!shown) {
        App.layersVaklodingen.map(function(l) {
          if(l.getShown()) {
            l.setShown(false)
          }
        })
      } else {
        showCurrentDynamicMapLayersDebounce()
      }
    }, 
    function(opacity) {
      App.currentLayerVaklodingen.setOpacity(opacity)
    }
  )
  var layerControlsJarkus = createLayerUI('Jarkus Grids', false, 'blue', 
    function(shown) {
      if(App.currentLayerJarkusGrids != null) {
        App.currentLayerJarkusGrids.setOpacity(0)
      }
      App.currentLayerJarkusGrids = App.layersJarkusGrids[App.currentTimeJarkusGrids]
      App.currentLayerJarkusGrids.setOpacity(1)
      App.currentLayerJarkusGrids.setShown(shown) 
      // hide all dynamic layers
      if(!shown) {
        App.layersJarkusGrids.map(function(l) {
          if(l.getShown()) {
            l.setShown(false)
          }
        })
      } else {
        showCurrentDynamicMapLayersDebounce()
      }
      }, 
    function(opacity) {
      App.currentLayerJarkusGrids.setOpacity(opacity)
    }
  )
  var panelControls = ui.Panel({
    widgets: [
      ui.Label('Map Layers', { fontWeight: 'bold' }),
      layerControlsAHN3,
      layerControlsSDBIntertidal,
      layerControlsSDBSubtidal,
      layerControlsSDBSubtidalDynamic,
      layerControlsVaklodingen,
      layerControlsJarkus,
      // time series controls
      chartTimes,
      ui.Panel({
        widgets: [App.timeSlider],
        layout: ui.Panel.Layout.flow('horizontal'),
        style: { padding: '0px 0px 0px 55px', width: '100%'}
      }),
      ui.Panel({
        widgets: [App.timeSliderLabel],
        layout: ui.Panel.Layout.flow('horizontal')
      }),
      ui.Panel({
        widgets: [playPauseButton],
        layout: ui.Panel.Layout.flow('horizontal')
      }),
    ], 
    style: { width: '320px'},
    layout: ui.Panel.Layout.flow('vertical')
  })
  // Side bar panel
  var panelSide = ui.Panel({
    widgets: [
      ui.Label('Rijkswaterstaat Satellite Bathymetry', { fontSize: '16px', fontWeight: 'bold' }),
      // ui.Label('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin luctus, ex ut lobortis rhoncus, ex ante faucibus ipsum, lacinia mattis metus quam ut elit. Aenean quis est aliquet, sagittis nunc placerat, porta justo. In aliquam ex ut nibh euismod, vel efficitur ante fermentum. Curabitur bibendum nibh et massa ornare, a fermentum turpis consectetur. Nunc sed tortor sed odio accumsan ullamcorper in in metus.'),
      panelAnalysis,
      panelControls
      ],
    style: { width: '340px' }
  })
  ui.root.insert(0, panelSide)
}
App.updateCorrelationLayer = function(forceRefresh) {
  // take first layer name > image
  var firstLayerName = App.selectFirstLayerCombo.getValue()
  var secondLayerName = App.selectSecondLayerCombo.getValue()
  if(App.firstLayerName == firstLayerName && App.secondLayerName == secondLayerName && !forceRefresh) {
    return // no need to update, selection is the same
  }
  App.firstLayerName = firstLayerName
  App.secondLayerName = secondLayerName
  var layerObjectFirst = App.layerObjects[firstLayerName]
  var layerObjectSecond = App.layerObjects[secondLayerName]
  var image = layerObjectFirst.rename(App.layerObjectVariables[firstLayerName]).addBands(layerObjectSecond.rename(App.layerObjectVariables[secondLayerName]))
  App.corrInputImage = image
  // update correlation chart if it's visible
  App.clearCorrelationChart()
  if(App.corrPoint) {
    onMapClickShowCorrelationChart(App.corrPoint)
  }
  // keep to be used for e.g. Map.onClick > Show chart  
  App.corrFirstImage = layerObjectFirst
  App.corrSecondImage = layerObjectSecond
  var corr = image.reduceNeighborhood({
    reducer: ee.Reducer.spearmansCorrelation(), 
    kernel: ee.Kernel.circle(5)
  })
  corr = corr.select('correlation')
  corr = corr.updateMask(corr.abs().unitScale(0, 0.25))
  corr = ee.Image(1).visualize({ palette: ['black'], opacity: 0.25 }).blend(
    corr.visualize({ min: -1, max: 1, palette: paletteCorrelation })
  )
  App.correlationImageLayer.setEeObject(corr)
}
App.clearCorrelationChart = function() {
  if(!App.corrChartPanel) {
    return // nothing to clear
  }
  // remove chart
  Map.remove(App.corrChartPanel)
  App.corrChartPanel = null
  // hide click AOI
  App.aoiLayer.setEeObject(ee.Image())
  App.aoiLayer.setShown(false)
}
var showCurrentDynamicLayers = function() {
  if(App.currentLayerSDBsub.getShown()) {
    App.layersSDBsub.map(function(l) {
      if(!l.getShown()) {
        l.setShown(true)
      }
    })
  }
  if(App.currentLayerVaklodingen.getShown()) {
    App.layersVaklodingen.map(function(l) {
      if(!l.getShown()) {
        l.setShown(true)
      }
    })
  }
  if(App.currentLayerJarkusGrids.getShown()) {
    App.layersJarkusGrids.map(function(l) {
      if(!l.getShown()) {
        l.setShown(true)
      }
    })
  }
}
var hideCurrentDynamicLayers = function() {
  if(App.currentLayerSDBsub.getShown()) {
    App.layersSDBsub.map(function(l) {
      if(l.getShown() && l !== App.currentLayerSDBsub) {
        l.setShown(false)
      }
    })
  }
  if(App.currentLayerVaklodingen.getShown()) {
    App.layersVaklodingen.map(function(l) {
      if(l.getShown() && l !== App.currentLayerVaklodingen) {
        l.setShown(false)
      }
    })
  }
  if(App.currentLayerJarkusGrids.getShown()) {
    App.layersJarkusGrids.map(function(l) {
      if(l.getShown() && l !== App.currentLayerJarkusGrids) {
        l.setShown(false)
      }
    })
  }
}
var showCurrentDynamicMapLayersDebounce = function() {} // ui.util.debounce(showCurrentDynamicLayers, 3000)
var showCurrentDynamicMapLayersThrottle = ui.util.debounce(showCurrentDynamicLayers, 300)
var hideCurrentDynamicMapLayersThrottle = ui.util.debounce(hideCurrentDynamicLayers, 300)
App.onTimeChange = function(time, forceSliderChange) {
  // times:               * * * * * * * * * * * * * * * 
  // times SDBsub                       * * * * * * * 
  // times Vaklodingen    *     *    [*-----] *
  // times Jarkus         *     *    [*-----] *    *    *
  //
  //                                     ^
  App.currentTime = time-1
  // convert global time index to dynami layer indices
  for(var i=0; i<App.timesJarkusGrids.length; i++) {
    if(App.timesJarkusGrids[i] > App.times[App.currentTime]) {
      break
    }
    App.currentTimeJarkusGrids = i
  }
  for(var i=0; i<App.timesVaklodingen.length; i++) {
    if(App.timesVaklodingen[i] > App.times[App.currentTime]) {
      break
    }
    App.currentTimeVaklodingen = i
  }
  for(var i=0; i<App.timesSDBsub.length; i++) {
    if(App.timesSDBsub[i] > App.times[App.currentTime]) {
      break
    }
    App.currentTimeSDBsub = i
  }
  // swap visibility for current layer and previous layer
  if (App.currentLayerJarkusGrids.getShown()) {
    var o = App.currentLayerJarkusGrids.getOpacity()
    App.currentLayerJarkusGrids.setOpacity(0)
    App.currentLayerJarkusGrids = App.layersJarkusGrids[App.currentTimeJarkusGrids]
    App.currentLayerJarkusGrids.setShown(true)
    App.currentLayerJarkusGrids.setOpacity(o)
  }
  if (App.currentLayerVaklodingen.getShown()) {
    var o = App.currentLayerVaklodingen.getOpacity()
    App.currentLayerVaklodingen.setOpacity(0)
    App.currentLayerVaklodingen = App.layersVaklodingen[App.currentTimeVaklodingen]
    App.currentLayerVaklodingen.setShown(true)
    App.currentLayerVaklodingen.setOpacity(o)
  }
  if (App.currentLayerSDBsub.getShown()) {
    var o = App.currentLayerSDBsub.getOpacity()
    App.currentLayerSDBsub.setOpacity(0)
    App.currentLayerSDBsub = App.layersSDBsub[App.currentTimeSDBsub]
    App.currentLayerSDBsub.setShown(true)
    App.currentLayerSDBsub.setOpacity(o)
  }
  showCurrentDynamicMapLayersThrottle()
  App.timeSliderLabel.setValue(App.times[time-1])
  if(forceSliderChange) {
    App.timeSlider.setValue(time, false)
    App.updateChart(new Date(Date.parse(App.times[time-1])))
  }
}
App.createPlayer = function() {
  var timeout = null
  var play = false
  var timeStep = 100
  var textPlay = '▶'
  var textPause = '⏸'
  var buttonStyle = { 
    padding: 0,  margin: '3px', fontSize: '12px', fontWeight: 'bold',
  }
  var buttonPlayPause = ui.Button(textPlay, onPlayPause, false, buttonStyle)
  function nextFrame() { 
    if(App.currentTime == App.times.length) {
      App.currentTime = 0
    }
    //slider.setValue(App.currentTime, true)
    App.onTimeChange(App.currentTime+1, true)
    App.currentTime += 1
    if(play) {
      if(App.currentTime == App.times.length) {
        ui.util.setTimeout(nextFrame, timeStep * 5)
      } else {
        ui.util.setTimeout(nextFrame, timeStep)
      }
    }
  }
  function onPlayPause() {
    if(!play && !timeout) {
      App.currentTime = 0
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
  return buttonPlayPause
}
// ====================================================================================================== 
Map.setOptions('HYBRID')
Map.setControlVisibility({
  // all, 
  // layerList: false, 
  // zoomControl, scaleControl, mapTypeControl, fullscreenControl, drawingToolsControl
})
Map.setCenter(6.0415, 53.467, 12)
var palette = ["f7fbff","deebf7","c6dbef","9ecae1","6baed6","4292c6","2171b5","08519c","08306b"].slice(2).reverse()
var palettes = require('users/gena/packages:palettes')
var paletteCorrelation = palettes.crameri.roma[50].slice(0).reverse()
var min = -25, max = 5 
//  hillshade perameter
var weight = 1.3
var exaggregation = 2000
var azimuth = 315
var elevation = 45
var shadows = false
/***
 * Clips and elevations image using a given range of values
 */
function elevation(img, exp, thresholds) {
  return img.expression(exp, {img: img}).subtract(thresholds[0]).divide(thresholds[1] - thresholds[0]);
};
/***
 * Computes radians image
 */
function radians(img) { 
  return img.toFloat().multiply(3.1415927).divide(180);
}
/***
 * Computes hillshade
 */
function hillshade(az, ze, slope, aspect) {
  var azimuth = radians(ee.Image.constant(az));
  // Generates an image containing a constant value everywhere.
  var zenith = radians(ee.Image.constant(ze));
  return azimuth.subtract(aspect).cos().multiply(slope.sin()).multiply(zenith.sin()).add(zenith.cos().multiply(slope.cos()));
}
/***
 * Styles RGB image using hillshading, mixes RGB and hillshade using HSV<->RGB transform
 */
function hillshadeRGB(image, elevation, weight, height_multiplier, azimuth, zenith, castShadows) {
  weight = weight || 1.5
  height_multiplier = height_multiplier || 5
  azimuth = azimuth || 0
  zenith = zenith || 45
  var hsv = image.unitScale(0, 255).rgbToHsv();
  var z = elevation.multiply(ee.Image.constant(height_multiplier)) 
  var terrain = ee.Algorithms.Terrain(z)
  var slope = radians(terrain.select(['slope']));
  var aspect = radians(terrain.select(['aspect'])).resample('bicubic');
  var hs = hillshade(azimuth, zenith, slope, aspect).resample('bicubic');
  if(castShadows) {
    var hysteresis = true
    var neighborhoodSize = 100
    var hillShadow = ee.Algorithms.HillShadow(z, azimuth, zenith, neighborhoodSize, hysteresis).float().not()
    hillShadow = hillShadow.focal_mode(3)
    hillShadow = hillShadow.convolve(ee.Kernel.gaussian(5, 3))
    hillShadow = hillShadow.multiply(0.4)
    hs = ee.ImageCollection.fromImages([
      hs.rename('shadow'), 
      hillShadow.mask(hillShadow).rename('shadow')
    ]).mosaic()
  }
  var intensity = hs.multiply(ee.Image.constant(weight)).multiply(hsv.select('value'));
  var huesat = hsv.select('hue', 'saturation');
  return ee.Image.cat(huesat, intensity).hsvToRgb();
}
/***
 * Convert sub-tidal bathymetry image into depth (simple regression fit model)
 * 
 * @images - SDB depth proxy
 */
function estimateDepth(images, hillshade) { 
  return images.map(function(i) {
    var a = [-6.3242, 33.965, -72.483, 74.831, -29.659]
    var z = i.pow(4).multiply(a[0]).add(i.pow(3).multiply(a[1])).add(i.pow(2).multiply(a[2])).add(i.multiply(a[3])).add(a[4])
    if(!hillshade) {
      return z.visualize({min:min, max:max, palette: palette})
    } 
    var rgb = hillshadeRGB(
        z.visualize({min:min, max:max, palette: palette}),  
        i, 
        weight, exaggregation, azimuth, elevation, shadows)
    return rgb
  })
}
var invDepth = estimateDepth(depthProxySubtidal, false).mosaic() 
var invDepthHill = estimateDepth(depthProxySubtidal, true).mosaic() 
// Intertidal data preparation
var ndwiMin = -0.1
var ndwiMax = 0.15
var intertidalScaled = depthProxyIntertidal.map(function(i) { 
  return i
    .where(i.lt(ndwiMin), ndwiMin)
    .unitScale(ndwiMin, ndwiMax) 
})
var intertidal3d = intertidalScaled.map(function(i) {
  return hillshadeRGB(i.visualize({min:0, max:1, palette: palette.reverse()}), i, 1.5, 1000, azimuth-180, elevation)
})
// Start the App
App.run()
/***
 * Event handler for map move / zoom
 */
Map.onChangeBounds(function() {
  hideCurrentDynamicMapLayersThrottle() // hide when moving
  showCurrentDynamicMapLayersDebounce() // show at the end
})
/***
 * Event handler for map click
 */
function onMapClickShowCorrelationChart(pt) {
  if(App.corrInputImage == null || !App.correlationImageLayer.getShown()) {
    return // nothing to show
  }
  if (App.corrChartPanel) {
    App.clearCorrelationChart()
  } 
  App.corrPoint = pt
  pt = ee.Geometry.Point([pt.lon, pt.lat])
  // update selected point (AOI) layer
  var samplingArea = pt.buffer(Map.getScale() * 15)
  App.aoiLayer.setEeObject(ee.FeatureCollection([samplingArea]).style({
    color: '00ffff', 
    width: 2, 
    fillColor: '00ffff55'
  }))
  App.aoiLayer.setShown(true)
  var sample = App.corrInputImage.sample({
    region: samplingArea, 
    scale: Map.getScale() / 2,
    numPixels: 3000,
    geometries: true
  })
  var panel = ui.Panel([])
  panel.style().set({ position: 'bottom-right', width: '300px', height: '500px' })
  // linear regression
  var coefs = sample.map(function(f) { return f.set({ c: 1 })}).reduceColumns(ee.Reducer.robustLinearRegression(2, 1), ['c',App.layerObjectVariables[App.firstLayerName], App.layerObjectVariables[App.secondLayerName]])
  var residuals = ee.Array(coefs.get('residuals')).toList().get(0)
  coefs = ee.List(ee.Array(coefs.get('coefficients')).transpose(0).toList().get(0))
  var intercept = ee.Number(coefs.get(0))
  var slope = ee.Number(coefs.get(1))
  var mean = sample.reduceColumns(ee.Reducer.mean(), [App.layerObjectVariables[App.firstLayerName]]).get('mean')
  // compute residuals manually 
  sample = sample.map(function(f) {
    var y = ee.Number(f.get(App.layerObjectVariables[App.secondLayerName]))
    var y_hat = slope.multiply(f.get(App.layerObjectVariables[App.firstLayerName])).add(intercept)
    return f.set({ 
      residual: y_hat.subtract(y),
      tot: y.subtract(mean).pow(2),
      res: y.subtract(y_hat).pow(2),
    })
  })
  var ssTot = ee.Number(sample.reduceColumns(ee.Reducer.sum(), ['tot']).values().get(0))
  var ssRes = ee.Number(sample.reduceColumns(ee.Reducer.sum(), ['res']).values().get(0))
  var r2 = ee.Number(1).subtract(ssRes.divide(ssTot))
  var rmse = ssRes.divide(sample.size()).sqrt()
  var chartOptions = {
    lineWidth: 0,
    pointSize: 1,
    dataOpacity: 0.3,
    width: '500px',
    height: '300px',
    // legend: { position: 'right', alignment: 'start' },
    trendlines: { 0: { type: 'linear', showR2: true, visibleInLegend: true, color: 'red', pointSize: 0, lineWidth: 3 } },
    title: ''
  }
  // show chart
  var chart1 = ui.Chart.feature.byFeature({
    features: sample, 
    xProperty: App.layerObjectVariables[App.secondLayerName], 
    yProperties: [App.layerObjectVariables[App.firstLayerName]],
  }).setOptions(chartOptions)
  var chart2 = ui.Chart.feature.byFeature({
    features: sample, 
    xProperty: App.layerObjectVariables[App.secondLayerName], 
    yProperties: ['residual'],
  }).setOptions({
    lineWidth: 0,
    pointSize: 1,
    dataOpacity: 0.3,
    width: '500px',
    height: '100px',
    legend: { position: 'right', alignment: 'start' },
    vAxis: { viewWindow: { min: -2, max: 2 } },
    series: {
      0: { color: 'red' }
    }
  })
  ee.List([rmse, r2]).evaluate(function(o) {
    // EE bug
    if(typeof(o) === 'undefined') {
      return
    }
    chartOptions.title = 'depth ~ estimate, OLS RMSE: ' + o[0].toFixed(3) + ', r2: ' + o[1].toFixed(3)
    chart1.setOptions(chartOptions)
  })
  panel.clear()
  panel.widgets().add(chart1)
  panel.widgets().add(chart2)
  // Add a button to hide the Panel.
  panel.add(ui.Button({
    label: 'Close',
    onClick: function() {
      App.clearCorrelationChart()
    }
  }));
  Map.add(panel)
  App.corrChartPanel = panel
} 
Map.onClick(onMapClickShowCorrelationChart)
// upload Jarkus lines and add as a layer 
// chart along profiles: https://code.earthengine.google.com/?scriptPath=users%2Fgena%2Fpackages%3Autils-test-profile
Map.setControlVisibility({
  all: false,
  fullscreenControl: true,
  scaleControl: true,
  zoomControl: true,
  mapTypeControl: true,
  layerList: true
  /*, layerList, zoomControl, scaleControl, mapTypeControl, fullscreenControl, drawingToolsControl*/
})