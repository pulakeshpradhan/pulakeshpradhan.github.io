var imageGallery = require('users/gena/packages:gallery')
var animation = require('users/gena/packages:animation')
var style = require('users/gena/packages:style')
var assets = require('users/gena/packages:assets')
var palettes = require('users/gena/packages:palettes')
// var version = 'v3'
// var PATH_MAP_TILES = 'map-tiles-gfw-' + version
// Developemnt paths
// var PATH_COUNTRIES = 'users/gena/eo-forests/radd_countries'
// var PATH_HUMID_FOREST = 'users/gena/eo-forests/radd_tropicalforest'
// var PATH_ALERT = 'users/gena/eo-forests/radd_alert_20210220'
// var PATH_ALERT300 = 'users/gena/eo-forests/radd_alert_20210220-300m'
var PATH_COUNTRIES = 'projects/radar-wur/raddalert/app/merged/radd_merged_countries_v20221201'
var PATH_HUMID_FOREST = 'projects/radar-wur/raddalert/app/merged/radd_merged_primaryhumidtropicalforest_baseline_v20221201'
//var PATH_ALERT = getLastAlertImageName()
var PATH_ALERT =  ee.Image(ee.ImageCollection('projects/radar-wur/raddalert/v1').filterMetadata('layer','contains','alert')
                            .filterMetadata('geography','equals','africa')
                            .sort('system:time_end', false).first());
var PATH_ALERT2 =  ee.Image(ee.ImageCollection('projects/radar-wur/raddalert/v1').filterMetadata('layer','contains','alert')
                            .filterMetadata('geography','equals','sa')
                            .sort('system:time_end', false).first());
var PATH_ALERT3 =  ee.Image(ee.ImageCollection('projects/radar-wur/raddalert/v1').filterMetadata('layer','contains','alert')
                            .filterMetadata('geography','equals','asia')
                            .sort('system:time_end', false).first());
var PATH_ALERT4 =  ee.Image(ee.ImageCollection('projects/radar-wur/raddalert/v1').filterMetadata('layer','contains','alert')
                            .filterMetadata('geography','equals','ca')
                            .sort('system:time_end', false).first());
//var PATH_ALERT300 = PATH_ALERT + '-300m'
//var PATH_ALERT300 = 'projects/radar-wur/raddalert/app/merged/radd_merged_alert_2019_20211014_v20211017-300m'
var PATH_ALERT300 = 'projects/radar-wur/raddalert/app/merged/radd_merged_alert_2019_20221125_v20221201-300m'
// var isTestApp = false
var isTestApp = false
// var exportMaps = true // use when updating map tiles
var exportMaps = false
var regionGlobal = ee.Geometry.Polygon([[180,85],[0,85],[-180,85],[-180,-85],[0,-85],[180,-85],[180,85]], 'EPSG:4326', false)
Map.setControlVisibility({
  all: false,
  fullscreenControl: true,
  scaleControl: true,
  zoomControl: true,
  mapTypeControl: true,
  layerList: isTestApp
  /*, layerList, zoomControl, scaleControl, mapTypeControl, fullscreenControl, drawingToolsControl*/
})
var maxZoom = 10
//mosaic images
var img_list = [ee.Image(PATH_ALERT),ee.Image(PATH_ALERT2),ee.Image(PATH_ALERT3),ee.Image(PATH_ALERT4)]
var coll = ee.ImageCollection.fromImages(img_list)
var mos = coll.mosaic()
var image = ee.Image(mos)
var image300 = ee.Image(PATH_ALERT300)
// var items = ee.data.listAssets('projects/radar-wur/raddalert/app')
// var folderItems = items.assets.filter(function(s) {
//   return s.id.indexOf('africa_alert') != -1
// })
// var imageId = folderItems[folderItems.length-1].id
// var imageName = imageId.split('/')[4]
// var image = ee.Image(imageId)
var startDate = ee.Date(PATH_ALERT.get('system:time_start')).format('YYYY-MM-dd').getInfo()
/*
var stopDate = ee.Date(PATH_ALERT.get('system:time_end')).format('YYYY-MM-dd').getInfo()
var stopDate2 = ee.Date(PATH_ALERT2.get('system:time_end')).format('YYYY-MM-dd').getInfo()
var stopDate3 = ee.Date(PATH_ALERT3.get('system:time_end')).format('YYYY-MM-dd').getInfo()
var stopDate4 = ee.Date(PATH_ALERT4.get('system:time_end')).format('YYYY-MM-dd').getInfo()
//print(stopDate)
if(stopDate2 >= stopDate){var stopDate = stopDate2}
if(stopDate3 >= stopDate){var stopDate = stopDate3}
if(stopDate4 >= stopDate){var stopDate = stopDate4}
print(stopDate)
*/
var stopDate = ee.Date(Date.now()).format('YYYY-MM-dd').getInfo()
print(stopDate)
var resamplingMode = 'bilinear'
// var resamplingMode = 'bicubic'
var land = ee.Image("users/gena/land_polygons_image").mask()
function exportMap(i, name, region, fileFormat, minZoom, maxZoom, shown, opacity) {
  if(!exportMaps) {
    // create cloud layer
    var cloudLayer = ui.Map.CloudStorageLayer({
      bucket: 'reservoir-monitor', 
      path: PATH_MAP_TILES + '/' + name + '-' + minZoom + '-' + maxZoom, 
      maxZoom: maxZoom, 
      suffix: '.png',
      name: name,
      shown: shown,
      opacity: opacity
    })
    return cloudLayer
  }
  Export.map.toCloudStorage({
    image: i, 
    description: 'map-tiles-' + name, 
    bucket: 'reservoir-monitor', 
    fileFormat: fileFormat, 
    path: PATH_MAP_TILES + '/' + name + '-' + minZoom + '-' + maxZoom, 
    writePublicTiles: false, 
    minZoom: minZoom, 
    maxZoom: maxZoom, 
    skipEmptyTiles: true, 
    mapsApiKey: 'AIzaSyDItV6jEwI7jdCEqLWL4zO-ZzPvKC4193E',
    region: region
    // region: ee.Geometry.Polygon([[180,85],[0,85],[-180,85],[-180,-85],[0,-85],[180,-85],[180,85]], 'EPSG:4326', false)
    // bucketCorsUris: ['https://code.earthengine.google.com', 'https://gena.users.earthengine.app']
  })
}
// Countries AOI layer
var countriesRADD = ee.FeatureCollection(PATH_COUNTRIES)
var countriesRADDImage = ee.Image(1).paint(countriesRADD, 0).selfMask()
//var countriesRADDImage = ee.Image('projects/radar-wur/raddalert/app/merged/radd_merged_countries_image-50m').visualize({ palette: ['000000'] })
var countriesRADDLayer = ui.Map.Layer(countriesRADDImage, {}, 'countries', true, 0.5)
// countriesRADDLayer = exportMap(countriesRADDImage, 'countries', regionGlobal, 'png', 0, 11, true, 0.5)
Map.layers().add(countriesRADDLayer)
function getLastAlertImageName() {
  // get the latest image from RADD alerts folder
  var i = ee.data.listAssets('projects/radar-wur/raddalert/app/merged')
  var folderItems = i.assets.filter(function(s) {
    return s.id.indexOf('radd_merged_alert') != -1 && s.id.indexOf('-300m') == -1
  })
  var imageAssetId = folderItems[folderItems.length-1].id
  return imageAssetId
}
function toDateFromYYJJJ(v) {
  v = ee.Number(v)
  var year = v.divide(1000).floor().add(2000)
  var doy = v.mod(1000)
  return ee.Date.fromYMD(year, 1, 1).advance(doy, 'day')
}
function toDateFromMillis(v) {
  return ee.Date(ee.Number(v))
}
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    return [year, month, day].join('-');
}
function App() { }
App.run = function() {
  App.setMapStyle()
  App.addMapLayers()
  App.addPanel()
  App.subscribeEvents()
}
App.subscribeEvents = function() {
  Map.onClick(function(pt) {
    if(Map.getZoom() < maxZoom) {
      App.log.setValue('Zoom-in at least to level 10 to query alert info, current zoom level: ' + Map.getZoom())
      App.log.style().set({ shown: true })
      ui.util.setTimeout(function () {
        App.log.style().set({ shown: false })  
      }, 3000)
      return
    }
    // query alert and date at clicked point
    App.log.setValue('Quering alert info, please wait ...')
    App.log.style().set({ shown: true })
    App.layerClicked.setEeObject(ee.Image())
    App.clickedPixelLayer.setEeObject(ee.Image())
    App.panelShowReferenceImages.style().set({ shown: false })
    // App.buttonShowReferenceImages.setshow(false)
    App.layerImageClicked.setEeObject(ee.Image())
    App.panelTimeLapse.widgets().reset([])
    App.panelTimeLapse.style().set({ shown: false })
    App.removeReferenceImagesMap()    
    App.showClickedPointInfo(pt)
  })
  function onZoomChanged(zoom) {
    if(zoom >= maxZoom) {
      Map.style().set('cursor', 'crosshair')
      if(App.layerAlert300.getShown()) {
        App.layerAlert300.setShown(false)
        App.layerAlert.setShown(true)
        App.layerAlert.setOpacity(App.layerAlert300.getOpacity())
      }
      // switch Alert date to fine zoom level
      App.alertDateZoomWarning.style().set({ shown: false })
      App.alertClickZoomWarning.style().set({ shown: false })
      App.mapLayerAlertDate.controls.map(function(w) {
        w.setDisabled(false)
      })
      // App.layerAlertDate300.setShown(false)
      App.layerAlertDate.setShown(App.mapLayerAlertDate.controls[0].getValue()) // checked
      App.currentAlertLayer = App.layerAlert
      App.currentAlertDateLayer = App.layerAlertDate
    } else {
      Map.style().set('cursor', 'hand')
      if(App.layerAlert.getShown()) {
        App.layerAlert300.setShown(true)
        App.layerAlert.setShown(false)
        App.layerAlert300.setOpacity(App.layerAlert.getOpacity())
      }
      // switch Alert date to coarse zoom level
      App.alertDateZoomWarning.style().set({ shown: true })
      App.alertClickZoomWarning.style().set({ shown: true })
      App.mapLayerAlertDate.controls.map(function(w) {
        w.setDisabled(true)
    })
      App.layerAlertDate.setShown(false)
      App.currentAlertLayer = App.layerAlert300
    }
  }
  Map.onChangeZoom(onZoomChanged)
  onZoomChanged(Map.getZoom())
}
App.removeReferenceImagesMap = function() {
  App.layerClicked.setShown(false)
  if(App.insetMap != null) {
    App.insetMap.clear()
    App.panelTimeLapse.widgets().reset([])
    App.panelTimeLapse.style().set({ shown: false })
    App.insetMap = null
  }
}
App.setMapStyle = function() {
  App.insetMap = null
  // App.paletteAlert = palettes.cb.YlOrRd[9].slice(0).reverse().slice(1)
  App.paletteAlert = ['EA7E7D']
  App.paletteAlertDate = palettes.cb.YlOrRd[9].slice(0) //.reverse()
  // App.paletteAlert = ['de615f']
  // set GLAD map style
  // Map.setOptions('Dark', {Dark: [
  //   // {"featureType":"all","elementType":"labels","stylers":[{"visibility":"off"}]},
  //   {"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#AAAAAA"},{"lightness":40}]},
  //   {"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},
  //   {"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},
  //   {"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":40}]},
  //   {"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},
  //   {"featureType":"landscape.natural.landcover","elementType":"geometry","stylers":[{"color":"#DDDDDD"},{"lightness":0}]},
  //   {"featureType":"landscape.natural","elementType":"geometry","stylers":[{"lightness":-50},{"saturation":-90}]},
  //   {"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#9a9a9a"}]},
  //   {"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":35}]},
  //   {"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},
  //   {"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},
  //   {"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},
  //   {"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},
  //   {"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},
  //   {"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":12}]}
  // ]})
  style.SetMapStyleDark()
  Map.setOptions('HYBRID')
  // Map.centerObject(image, 4)
  // Map.setCenter(18, -5, 5)
  Map.setCenter(30, -10, 3)
}
App.addPanel = function() {
  App.log = ui.Label('', {
      shown: false,
      backgroundColor: '#00000066',
      color: 'ffffff',
      fontSize: '11px',
      position: 'top-center',
      margin: '2px', 
      padding: '0px'
  })
  Map.widgets().add(App.log)
  var titleMain = ui.Label({ value: 'RADD forest disturbance alert', style: { fontSize: '20px', fontWeight: 'bold', margin: '6px 0px 0px 6px' }})
  if(isTestApp) {
    titleMain.setValue('RADD forest disturbance alert (TEST)')
  }
  var textPaperName = ui.Panel([
    ui.Label({ 
      value: "Reiche J, Mullissa A, Slagter B, Gou Y, Tsendbazar N-E,\nOdongo-Braun C, Vollrath A, Weisse MJ, Stolle F, Pickens A,\nDonchyts G, Clinton N, Gorelick N, and Herold M (2021).", 
      style: { whiteSpace: 'pre', fontSize: '12px', margin: '8px 0px 0px 8px' } 
    }),
    ui.Label({
      value: "https://doi.org/10.1088/1748-9326/abd0a8", 
      style: { fontSize: '12px', margin: '0px 0px 0px 8px' }, 
      targetUrl: "https://doi.org/10.1088/1748-9326/abd0a8" 
    })
  ], ui.Panel.Layout.flow('vertical'))
  var textPaperInfo = ui.Label({
    value: 'Radar satellite imagery from the European Space Agency’s Sentinel-1 mission is used to map new disturbances in primary humid tropical forest at 10 m spatial scale and in near real-time. Sentinel-1’s cloud-penetrating radar provides gap-free observations for the tropics consistently every 6 to 12 days. This enables the rapid detection of small-scale forest disturbances, such as subsistence agriculture and selective logging. A new forest disturbance alert is triggered based on a single observation from the latest Sentinel-1 image. Subsequent observations are used to increase confidence and confirm or reject the alert. RADD (Radar for Detecting Deforestation) alerts are operational for the pan-tropics (50 countries), and are available at the Global Forest Watch platform.',
    style: { fontSize: '13px' }
  })
  var textUrlGFW = ui.Panel([
    ui.Label('Global Forest Watch:', { fontSize: '12px', margin: '0px', padding: '0px' }), 
    ui.Label('https://www.globalforestwatch.org', { fontSize: '12px', margin: '0px 0px 0px 0px', padding: '0px 0px 0px 4px' }, 'https://www.globalforestwatch.org')
  ], ui.Panel.Layout.flow('horizontal'), { margin: '0px', padding: '0px 0px 0px 8px' })
  var textUrlWebsite = ui.Panel([
    ui.Label('Website and data access:', { fontSize: '12px', margin: '0px', padding: '0px' }), 
    ui.Label('http://radd-alert.wur.nl', { fontSize: '12px', margin: '0px 0px 0px 0px', padding: '0px 0px 0px 4px' }, 'http://radd-alert.wur.nl')
  ], ui.Panel.Layout.flow('horizontal'), { margin: '0px', padding: '4px 0px 0px 8px' })
  function addLayerControls(layerPanel, shown, opacity, getLayer, url) {
    var layerShownCheckbox = ui.Checkbox('', shown, function(s) {
      getLayer().setShown(s)
    })
    var layerOpacitySlider = ui.Slider(0, 1, opacity, 0.05)
    // layerShownCheckbox.style().set({ position: 'top-right' })
    // layerOpacitySlider.style().set({ position: 'top-right' })
    layerOpacitySlider.onSlide(function(v) {
      getLayer().setOpacity(v)
    })
    layerShownCheckbox.style().set({ margin: '2px', padding: '0px', border: '0px' })
    layerOpacitySlider.style().set({ margin: '0px', padding: '0px', border: '0px', width: '50px' })
    var layerControls = ui.Panel([layerShownCheckbox, layerOpacitySlider], ui.Panel.Layout.flow('horizontal'))
    layerControls.style().set({ position: 'top-right', margin: '0px 0px 0px 0px', padding: '0px' })
    if(url) {
      var infoBox = ui.Label('ℹ️', { margin: '0px', padding: '0px 4px 0px 0px' }, url)
      layerControls.widgets().insert(0, infoBox)
    }
    layerPanel.widgets().add(layerControls)
    layerPanel.controls = [layerShownCheckbox, layerOpacitySlider]
  }
  // === Alert Date
  function createAlertDateLegend() {
    // Creates a color bar thumbnail image for use in legend from the given color
    // palette.
    function makeColorBarParams() {
      return {
        bbox: [0, 0, 1, 0.1],
        dimensions: '184x17',
        format: 'png'
      };
    }
    // Create the color bar for the legend.
    var colorBar = ui.Thumbnail({
      image: ee.Image.pixelLonLat().select(0).visualize({ min: 0, max: 1, palette: App.paletteAlertDate })
        // .blend(ee.FeatureCollection([ 
        //   ee.Geometry.Rectangle([0, 0.001, 0.5, 0.1], null, false),
        //   ee.Geometry.Rectangle([0.5, 0.001, 0.99, 0.1], null, false) 
        // ]).style({ color: '00000055', width: 1, fillColor: '00000000' }))
        ,
        // ,
      params: makeColorBarParams(),
      style: { stretch: 'horizontal', margin: '0px 8px 0px 0px', padding: '0px', maxHeight: '32px', width: '184px' },
    });
    // Create a panel with three numbers for the legend.
    var legendLabels = ui.Panel({
      widgets: [
        ui.Label(startDate, {margin: '4px 8px 0px 0px', fontSize: '13px' }),
        ui.Label(stopDate, {margin: '4px 45px', fontSize: '13px'})
      ],
      layout: ui.Panel.Layout.flow('horizontal'),
      style: { margin: '0px', padding: '0px' }
    });
    return ui.Panel([colorBar, legendLabels], null, {
      margin: '0px 0px 24px 0px', position: 'bottom-left', width: '250px', padding: '8px 0px 0px 8px'
    });
  }
  App.alertDateZoomWarning = ui.Label('enabled at fine zoom', { margin: '0px 0px 0px 8px', position: 'top-left', padding: '0px', color: 'grey', fontSize: '11px'})
  App.alertDateLegend = createAlertDateLegend()
  App.alertDateTitle = ui.Panel([
    ui.Label('Alert date', { fontWeight: 'bold', position: 'top-left', margin: '0px 0px 0px 12px' }),
    App.alertDateZoomWarning
  ], ui.Panel.Layout.flow('horizontal'), { margin: '10px 0px 0px 0px' })
  var mapLayerAlertDate = ui.Panel([
    App.alertDateTitle,
    App.alertDateLegend,
    ui.Label('Africa - starting from 2019-01-01; Other geographies - starting from 2020-01-01', { 
      margin: '0px 0px 0px 0px', 
      position: 'bottom-left', 
      padding: '0px', 
      color: 'grey', 
      fontSize: '11px', 
    }),
    // ui.Label('Asia-Pacific - starting from 2020-01-01', { 
    //   margin: '0px 0px 0px 0px', 
    //   position: 'bottom-left', 
    //   padding: '0px', 
    //   color: 'grey', 
    //   fontSize: '11px', 
    // })
  ], ui.Panel.Layout.absolute(), { height: '112px', border: '1px solid black', margin: '6px 0px 0px 6px', padding: '0px'})  
  addLayerControls(mapLayerAlertDate, true, 1, function() { return App.currentAlertDateLayer })
  App.mapLayerAlertDate = mapLayerAlertDate
  App.mapLayerAlertDate.controls.map(function(w) {
    w.setDisabled(true)
  })
  // === Alert
  function createLegendItem(color, text, smallText) {
    var color = ui.Label({style: { backgroundColor: '#' + color, padding: '8px', margin: '0 0 4px 8px', border: '1px solid black' } });
    var description = ui.Label({ value: text, style: { margin: '0 0 4px 6px', fontSize: '13px' } });
    var descriptionSmall = ui.Label({ value: smallText, style: { margin: '0px 0px 0px 4px', padding: '0px', color: 'grey', fontSize: '11px'} });
    return ui.Panel({
      widgets: [color, description, descriptionSmall],
      layout: ui.Panel.Layout.Flow('horizontal'),
      style: { margin: '0px', padding: '0px', border: '0px' }
    });
  }
  function createAlertLegend() {
    var legend = ui.Panel([
      createLegendItem(App.paletteAlert, 'High confidence', 'confirmed'),
      createLegendItem('00ffffaa', 'Low confidence', 'unconfirmed')
    ])
    legend.style().set({ stretch:'horizontal', margin: '0px', padding: '0px', border: '0px' })
    return legend
  }
  var mapLayerLegend = createAlertLegend()
  mapLayerLegend.style().set({ position: 'bottom-left' })
  var mapLayerAlert = ui.Panel([
    ui.Label('Alert confidence', { fontWeight: 'bold', position: 'top-left', margin: '0px 0px 0px 0px', padding: '0px 0px 0px 2px', border: '0px'  }),
    mapLayerLegend,
  ], ui.Panel.Layout.absolute(), { height: '90px', border: '1px solid black', margin: '6px 0px 0px 6px' })  
  addLayerControls(mapLayerAlert, true, 1, function() { return App.currentAlertLayer })
  // === Forest Baseline
  var mapLayerForestBaseline = ui.Panel([
    ui.Label('Primary humid tropical forest', { fontWeight: 'bold', position: 'top-left', margin: '0px', padding: '0px', border: '0px'  }),
    ui.Label('Primary humid tropical forest mask 2001 from Turubanova et al (2018) with annual (Africa: 2001 - 2018; Other geographies: 2001 - 2019) forest loss (Hansen et al 2013) and mangroves (Bunting et al 2018) removed.', { 
      margin: '0px 0px 0px 0px', 
      position: 'bottom-left', 
      padding: '0px', 
      color: 'grey', 
      fontSize: '11px', 
      width: '350px' 
    })
  ], ui.Panel.Layout.absolute(), { height: '84px', border: '1px solid black', margin: '6px 0px 0px 6px' })  
  addLayerControls(mapLayerForestBaseline, true, 0.5, function() { return App.forestBaselineLayer }, 'https://glad.umd.edu/dataset/primary-forest-humid-tropics')
  // === Landsat 2019
  var mapLayerLandsat2019 = ui.Panel([
    ui.Label('Landsat 2019', { fontWeight: 'bold', position: 'top-left', margin: '0px', padding: '0px', border: '0px'  })
  ], ui.Panel.Layout.absolute(), { height: '40px', border: '1px solid black', margin: '6px 0px 0px 6px' })  
  addLayerControls(mapLayerLandsat2019, false, 1, function() { return App.layerLandsat2019 })
  // === Landsat 2018
  var mapLayerLandsat2018 = ui.Panel([
    ui.Label('Landsat 2018', { fontWeight: 'bold', position: 'top-left', margin: '0px', padding: '0px', border: '0px'  })
  ], ui.Panel.Layout.absolute(), { height: '40px', border: '1px solid black', margin: '6px 0px 0px 6px' })  
  addLayerControls(mapLayerLandsat2018, false, 1, function() { return App.layerLandsat2018 })
  // // === Basemap
  // var checkboxBasemapSatellite = ui.Checkbox({ label: 'Satellite', value: true, style: { margin: '0px 10px 0px 0px', padding: '0px', border: '0px' }  })
  // var checkboxBasemapLandsat2018 = ui.Checkbox({ label: 'Landsat 2018', style: { margin: '0px 10px 0px 0px', padding: '0px', border: '0px' }  })
  // var checkboxBasemapLandsat2019 = ui.Checkbox({ label: 'Landsat 2019', style: { margin: '0px 10px 0px 0px', padding: '0px', border: '0px' }  })
  // // TODO: add event handlers for basemap checkboxes
  // var mapLayerBasemap = ui.Panel([
  //   ui.Label('Basemap', { fontWeight: 'bold', position: 'top-left', margin: '0px', padding: '0px', border: '0px'  }),
  //   ui.Panel([
  //     checkboxBasemapSatellite,
  //     checkboxBasemapLandsat2018,
  //     checkboxBasemapLandsat2019
  //   ], ui.Panel.Layout.flow('horizontal'), { position: 'bottom-left', margin: '0px', padding: '0px', border: '0px'   })
  // ], ui.Panel.Layout.absolute(), { height: '70px', border: '1px solid black', margin: '6px 0px 0px 6px' })  
  // === Disturbance area analysis
  // var titleAnalysis = ui.Label({ value: 'Disturbance alert analysis', style: { fontSize: '16px', fontWeight: 'bold', margin: '16px 0px 0px 6px' }})
  // var panelTimeSeriesChart = ui.Panel([ui.Label('Click on alert for details', { margin: '0px', padding: '6px 8px 6px 8px', color: 'grey', fontSize: '11px' })])
  App.alertClickZoomWarning = ui.Label('enabled at fine zoom', { margin: '0px 0px 0px 0px', position: 'top-left', padding: '0px', color: 'grey', fontSize: '11px'})
  var panelTimeSeriesChart = ui.Panel([
    ui.Label('Click on alert for details', { margin: '0px', padding: '6px 4px 6px 8px', fontSize: '11px', fontWeight: 'bold' }),
    App.alertClickZoomWarning
  ], ui.Panel.Layout.flow('horizontal'), { margin: '4px 0px 0px 0px'})
  var panelClickedPointInfo = ui.Panel([])
  var panelTimeLapse = ui.Panel([])
  // reference images panel
  var buttonShowReferenceImages = ui.Button({ label: 'Show Sentinel-2 images', style: { margin: '6px 0px 0px 6px' } })
  var labelShowReferenceImages = ui.Label({ 
    value: '+ / - three month around alert date. Sentinel-2 imagery is useful for visually referencing larger-scale changes (e.g. smallholder agriculture), but is often limited when visual referencing small-scale changes (e.g. selective logging).', 
    style: { margin: '0px 6px 6px 6px', padding: '4px 0px 0px 0px', fontSize: '11px', color: 'grey' } 
  })
  buttonShowReferenceImages.onClick(function() { App.showReferenceImages() })
  var checkboxShowLandsat8 = ui.Checkbox({ label: 'Landsat 8', value: false, style: { margin: '12px 6px 6px 6px', fontSize: '12px'  } })
  var checkboxShowSentinel2 = ui.Checkbox({ label: 'Sentinel 2', value: true, style: { margin: '12px 6px 0px 6px', fontSize: '12px'  } })
  var panelShowReferenceImages = ui.Panel([
    buttonShowReferenceImages,
    labelShowReferenceImages,
    // labelShowReferenceImagesS2
    // checkboxShowLandsat8,
    // checkboxShowSentinel2
  ], ui.Panel.Layout.flow('vertical'), { margin: '0px 0px 0px 0px' })
  panelShowReferenceImages.style().set({ shown: false })
  var labelAcknowledgement2 = ui.Label({
    value: 'Wageningen University, in collaboration with World Resources Institute‘s Global Forest Watch program, Google, European Space Agency, University of Maryland and Deltares',
    style: {
      // 'backgroundColor': '#00000066',
      'color': 'grey',
      'fontSize': '11px',
      // 'fontWeight': 'bold',
      // position: 'bottom-center',
      padding: '0px 0px 0px 15px',
      margin: '0px 0px 0px 0px',
      height: '36px',
      // width: '432px'
    }
  })
  var labelAcknowledgement = ui.Label({
    value: 'Wageningen University, Laboratory of Geo-Information Science and Remote Sensing ©2021',
    style: {
      'backgroundColor': '#00000066',
      'color': 'white',
      'fontSize': '12px',
      // 'fontWeight': 'bold',
      padding: '0px 0px 0px 0px',
      margin: '0px 0px 12px 0px'
    }
  })
  Map.add(ui.Panel({ widgets: [labelAcknowledgement], style: { padding: '0px 0px 0px 0px', margin: '0px 0px 0px 0px',  position: 'bottom-center', 'backgroundColor': '#00000000' } }))
  var exampleLocationDescription = ui.Label('', { 
    margin: '0px', 
    padding: '0px 0px 0px 8px ', 
    color: 'grey', 
    fontSize: '11px', 
    height: '4px' 
  })
  App.switchingLocation = false
  function onExampleLocationSelected(value) {
    App.removeReferenceImagesMap()
    App.switchingLocation = true
    exampleLocations.forEach(function(l) {
      if(l.name == value) {
        exampleLocationDescription.setValue(l.description)
        exampleLocationDescription.style().set({ height: l.height })
        Map.setCenter(l.center[0], l.center[1], l.zoom)
        // Activate / Deactivate alert date layer
        /*
        if(l.name != 'Africa') {
          App.layerAlertDate.setShown(true)
          App.mapLayerAlertDate.controls[0].setValue(true)
        } else {
          App.layerAlertDate.setShown(false)
          App.mapLayerAlertDate.controls[0].setValue(false)
        }
        */
        return
      }
    })
    App.switchingLocation = false
  }
  var exampleLocations = [
    {
      name: "South America",
      center: [-60, -10],
      zoom: 5, 
      height: '4px',
      description: ''
    },
     {
      name: "Central America",
      center: [-90, 18],
      zoom: 5, 
      height: '4px',
      description: ''
    },
    {
      name: "Africa",
      center: [18, -5],
      zoom: 5, 
      height: '4px',
      description: ''
    },
      {
      name: "Asia",
      center: [120, 0],
      zoom: 5, 
      height: '4px',
      description: ''
    },
    {
      name: 'Selective logging in Gabon',
      center: [11.1307, -0.8789],
      zoom: 12,
      height: '80px',
      description: 'Accessed via the main road, a new logging road cuts into intact primary forest, where commercially valuable trees are selectively logged. Tree logging accounts for up to 60% of deforestation in Gabon, with the majority being considered unsustainable and/or illegal (Tyukavina et al 2018, Science Advances; Umunay et al 2019, Forest Ecology and Management).'
    },
    {
      name: 'Selective logging in the Central African Republic',
      center: [16.031, 3.9562],
      zoom: 13,
      height: '66px',
      description: 'Industrial selective logging with logging road developments followed by selective logging of commercially valuable trees in the surroundings. The majority of logging activities in the Congo Basin is considered unsustainable and/or illegal (Umunay et al 2019, Forest Ecology and Management).'
    },
    {
      name: 'Smallholder agriculture in the Democratic Republic of Congo',
      center: [23.896, 0.5210],
      zoom: 11,
      height: '84px',
      description: 'Small-scale clearing for rotational agriculture by smallholder farmers at the edges of intact primary forest. Smallholder agriculture accounts for more than 90% of deforestation in the Democratic Republic of Congo. With an expected fivefold population growth by 2100 remaining primary forest is under great pressure (Tyukavina et al 2018, Science Advances).'
    },
    {
      name: 'Protected forest loss in Ghana',
      center: [-2.143, 6.6503],
      zoom: 12,
      height: '66px',
      description: 'Illegal Deforestation in the protected Tano-Offin forest reserve. deforestation of remaining intact primary forest in Ghana has strongly increased over the past years, mainly driven by expansion of cocoa and oil palm plantations, timber logging and mining (Acheampong et al 2019, Scientific African).'
    },
    {
      name: 'Mining in the Republic of the Congo',
      center: [14.297, 1.8190],
      zoom: 13,
      height: '36px',
      description: 'Large-scale open-pit mining. The Republic of the Congo is a major producer of cobalt, copper, diamond, tantalum, tin, and gold.'
    },
    {
      name: 'Logging in Madagascar',
      center: [47.403, -20.97],
      zoom: 13,
      height: '66px',
      description: 'Large-scale logging for timber in Madagascar. The majority of the logging operations in Madagascar are considered illegal and threaten the remaining intact primary forest (Allnutt et al 2013, Tropical Conservation Science).'
    },
     {
      name: 'Selective logging in Papua New Guinea',
      center: [141.76, -3.532],
      zoom: 12,
      height: '40px',
      description: 'Logging road developments followed by selective logging of commercially valuable trees in the surroundings.'
    },
     {
      name: 'Large-scale clearings in Borneo',
      center: [110.173, -0.516],
      zoom: 13,
      height: '40px',
      description: 'Large-scale forest clearings in Borneo for expansion of commodity plantations.'
    },
     {
      name: 'Selective logging in Suriname',
      center: [-56.331, 4.819],
      zoom: 12,
      height: '40px',
      description: 'Logging road developments followed by selective logging of commercially valuable trees in the surroundings.'
    },
     {
      name: 'Mining in Para, Brazil',
      center: [-57.52, -5.189],
      zoom: 12,
      height: '40px',
      description: 'Large-scale alluvial open-pit gold mining. The state of Para, Brazil is a major producer of gold.'
    },
     {
      name: 'Agricultural expansion in Peru',
      center: [-74.911, -8.877],
      zoom: 12,
      height: '40px',
      description: 'Large-scale logging for agricultural expansion in Peru.'
    },
     {
      name: 'Agricultural expansion in Mexico',
      center: [-90.33, 18.12],
      zoom: 12,
      height: '40px',
      description: 'Logging for agricultural expansion in Mexico.'
    },
     {
      name: 'Large-scale hurricane damage (Eta, 2020) in Nicaragua',
      center: [-84.7, 14.4],
      zoom: 11,
      height: '40px',
      description: 'Logging for agricultural expansion in Mexico.'
    }
  ]  
  var comboBoxExampleLocations = ui.Select({
    items: exampleLocations.map(function(o) { return o.name }), 
    value: null /*exampleLocations[0].name*/, 
    placeholder: 'Zoom to example location',
    onChange: onExampleLocationSelected, 
    style: { margin: '0px', padding: '6px 0px 0px 6px' }
  })
  /*
  var comboBoxExampleLocations =  ui.Panel([
    ui.Select(exampleLocations.map(function(o) { return o.name }), '', exampleLocations[0].name, onExampleLocationSelected), 
    // exampleLocationDescription,
  ], ui.Panel.Layout.flow('horizontal'), { margin: '0px', padding: '0px'})
  */
  // var exampleLocationInfo = ui.Label('African countries with tropical forest (whole map).', { margin: '0px 0px 0px 8px', position: 'bottom-left', padding: '0px', color: 'grey', fontSize: '11px', width: '330px' })
  var widgetsMain = [
    titleMain,
    textPaperName,
    textPaperInfo,
    textUrlGFW,
    textUrlWebsite,
    mapLayerAlertDate,
    mapLayerAlert,
    mapLayerForestBaseline,
    // mapLayerBasemap,
    ui.Panel([
      comboBoxExampleLocations,
      // exampleLocationInfo
      exampleLocationDescription
    ], ui.Panel.Layout.flow('vertical'), { border: '1px solid #D3D3D3', margin: '6px 0px 0px 6px', padding: '0px' }),
    ui.Panel([
      panelClickedPointInfo,
      panelTimeSeriesChart,
      panelShowReferenceImages,
    ], ui.Panel.Layout.flow('vertical'), { border: '1px solid #D3D3D3', margin: '6px 0px 0px 6px', padding: '0px' }),
  ]
  if(isTestApp) {
    widgetsMain.splice(8, 0, mapLayerLandsat2019)
    widgetsMain.splice(8, 0, mapLayerLandsat2018)
  }
  var panel = ui.Panel([
    ui.Panel(widgetsMain, ui.Panel.Layout.flow('vertical'), { stretch: 'vertical',  margin: '0px 6px 0px 6px', padding: '0px 0px 0px 0px'/*, stretch: 'vertical'*/ }),
    labelAcknowledgement2
  ], ui.Panel.Layout.flow('vertical'), { stretch: 'vertical', margin: '0px 0px 0px -7px', padding: '0px 0px 0px 0px' }) 
  panelTimeLapse.style().set({ width: '500px', 'height': '500px', position: 'bottom-right', 'background-color': '00000000', shown: false })
  Map.add(panelTimeLapse)
  panel.style().set({ width: '450px' })
  ui.root.insert(0, panel)
  // save widgets to be modified by the App  
  App.panelTimeSeriesChart = panelTimeSeriesChart
  App.panelTimeLapse = panelTimeLapse
  App.panelClickedPointInfo = panelClickedPointInfo
  App.buttonShowReferenceImages = buttonShowReferenceImages
  App.panelShowReferenceImages = panelShowReferenceImages
  App.checkboxShowLandsat8 = checkboxShowLandsat8
  App.checkboxShowSentinel2 = checkboxShowSentinel2
  // Map.onChangeCenter(function() {
  //   if(comboBoxExampleLocations.getValue() && !App.switchingLocation) {
  //     if(comboBoxExampleLocations.getValue() != 'Africa') {
  //       return // no changes when specific location is selected
  //     }
  //     comboBoxExampleLocations.setValue(null, false)
  //     exampleLocationDescription.style().set({ height: '0px' })
  //   }
  // })
}
App.addMapLayers = function() {
  App.insetMap = null // inset map control used to show images
  // 2018
  var landsat2018 = ui.Map.Layer(ee.Image("UMD/hansen/global_forest_change_2018_v1_6").updateMask(land), { bands: ['last_b70','last_b50','last_b30'], min: 10, max: 120 },'Landsat 2018', false)
  Map.layers().add(landsat2018)
  App.layerLandsat2018 = landsat2018
  // 2019
  var landsat2019 = ui.Map.Layer(ee.Image("UMD/hansen/global_forest_change_2019_v1_7").updateMask(land), { bands: ['last_b70', 'last_b50', 'last_b30'], min: 10, max: 120 },'Landsat 2019', false)
  Map.layers().add(landsat2019)
  App.layerLandsat2019 = landsat2019
  // Forest Baseline Map
  var forestBaseline = ee.Image(PATH_HUMID_FOREST)
  var forestBaselineLayer = ui.Map.Layer(forestBaseline, { palette: ['000000'] }, 'forest (baseline)', true, 0.5)
  // forestBaselineLayer = exportMap(forestBaseline.visualize({ palette: ['000000'] }), 'forest-baseline', regionGlobal, 'png', 0, 12, false, 0.5)
  Map.layers().add(forestBaselineLayer)
  App.forestBaselineLayer = forestBaselineLayer
  // Alert layers
  var confirmed300 = image300.select('Alert_confirmed_sum') //.resample(resamplingMode)
  var blackOpacity = 0.2
  // var black = ee.Image(1)
  //   .updateMask(land)
  //   .visualize({ palette: ['black'], opacity: blackOpacity })
  var black = ee.Image(PATH_HUMID_FOREST)
    .visualize({ palette: ['black'], opacity: blackOpacity })
  var alert300mRgb = ee.ImageCollection([
    black, 
    // 300m
    confirmed300.updateMask(confirmed300.unitScale(0, 150)).visualize({ min: 0, max: 1, palette: App.paletteAlert })
    // 10m
    // image.select('Alert').unmask(0, false)/*.resample(resamplingMode)*/.eq(3).focal_mean(1).selfMask().visualize({ min: 0, max: 1, palette: App.paletteAlert })
  ]).mosaic()
  var layerAlert300 = ui.Map.Layer(alert300mRgb, {}, 'alert 300m')
  // caching  
  // layerAlert300 = exportMap(alert300mRgb, 'alert-300m', regionGlobal, 'auto', 0, maxZoom, true, 1)
  Map.layers().add(layerAlert300)
  var alertConfirmedRgb = image.select('Alert').unmask(0, false)/*.resample(resamplingMode)*/.eq(3).selfMask().visualize({ min: 0, max: 1, palette: App.paletteAlert })
  var alertUnconfirmedRgb = image.select('Alert').unmask(0, false)/*.resample(resamplingMode)*/.eq(2).selfMask().visualize({ min: 0, max: 1, palette: ['00ffff'], opacity: 0.75 })
  var alertRgb = ee.ImageCollection([
    // black, 
    alertConfirmedRgb,
    alertUnconfirmedRgb
  ]).mosaic()
  // Alert
  var layerAlert = ui.Map.Layer(alertRgb, {}, 'alert', true)
  // caching  
  // layerAlert = exportMap(alertRgb, 'alert', regionGlobal, 'png', 10, 14, true, 1)
  // var layerAlert = ui.Map.CloudStorageLayer({
  //   bucket: 'reservoir-monitor', 
  //   path: PATH_MAP_TILES + '/alert-10-14', 
  //   suffix: '.png',
  //   maxZoom: 14, 
  //   name: 'alert',
  //   shown: true
  // })
  Map.layers().add(layerAlert)
  // Alert date 
  // convert YYJJJ to Millis
  var date = image.select('Date') // YYJJJ
  var year = date.divide(1000).floor().add(2000)
  var doy = date.mod(1000)
  var daysSinceEpoch = year.subtract(1970).multiply(365).add(doy)
  var millis = daysSinceEpoch.multiply(86400).multiply(1000)
  var alertDateRgb = millis.selfMask().visualize({ min: new Date(2019, 0, 1, 1).getTime(), max: new Date(2021, 0, 1, 1).getTime(), palette: App.paletteAlertDate })
  App.layerAlertDate = ui.Map.Layer(alertDateRgb, {}, 'alert date', false)
  Map.layers().add(App.layerAlertDate)
  // alert date (300m)
  // 300m date is buggy
  // var layerAlertDate300 = ui.Map.Layer(image300.select('Millis_confirmed_mean').selfMask(), {
  //   min: new Date(2019, 0, 1, 1).getTime(),
  //   max: new Date(2021, 0, 1, 1).getTime(),
  //   palette: App.paletteAlertDate 
  // }, 'alert date 300m', false)
  var layerAlertDate300 = ui.Map.Layer(millis.selfMask(), {
    min: new Date(2019, 0, 1, 1).getTime(),
    max: new Date(2021, 0, 1, 1).getTime(),
    palette: App.paletteAlertDate
  }, 'alert date 300m', false)
  // NOT AGGREGATED PROPERLY YET
  // exportMap(millis.selfMask().visualize({
  //   min: new Date(2019, 0, 1, 1).getTime(),
  //   max: new Date(2021, 0, 1, 1).getTime(),
  //   palette: palettes.cb.YlOrRd[9].slice(0) 
  // }), 'alert-date')
  // App.layerAlertDate300 = ui.Map.CloudStorageLayer({
  //   bucket: 'reservoir-monitor', 
  //   path: PATH_MAP_TILES + '/alert-date-10-14', 
  //   maxZoom: 14, 
  //   name: 'alert date 300m',
  //   shown: false
  // })
  // Map.layers().add(layerAlertDate300)
  // Store layers in the App
  // App.layerAlertDate300 = App.layerAlertDate300
  App.layerAlert300 = layerAlert300
  App.layerAlert = layerAlert
  App.currentForestBaselineLayer = forestBaselineLayer
  App.currentAlertLayer = layerAlert300
  // clicked layer
  App.layerClicked = ui.Map.Layer(ee.Image(), {}, 'clicked AOI', false)
  Map.layers().add(App.layerClicked)
  // clicked pixel  
  App.clickedPixelLayer = ui.Map.Layer(ee.Image(), { color: '00ffff' }, 'clicked pixel')
  Map.layers().add(App.clickedPixelLayer)
  // clicked image layer
  App.layerImageClicked = ui.Map.Layer(ee.Image(), {}, 'clicked image', false)
  Map.layers().add(App.layerImageClicked)
}
App.showClickedPointInfo = function(pt) {
  var aoi = ee.Geometry.Point([pt.lon, pt.lat])
  aoi = aoi.buffer(Map.getScale() * 3)
  var info = image.addBands(ee.Image.pixelLonLat().mask(image.select('Alert').mask())).sample({
    region: aoi, 
    scale: 10, 
    numPixels: 100, 
    seed: 42, 
    dropNulls: true, 
    geometries: true
  })
  // earliest date
  info = info.sort('Date').limit(1)
  App.panelClickedPointInfo.widgets().reset([ui.Label('Quering alert info ...', { margin: '0px', padding: '8px ', color: 'grey', fontSize: '11px' })])
  App.panelTimeSeriesChart.widgets().reset([])
  var lonlat = parseFloat(pt.lon).toFixed(3) + ', ' + parseFloat(pt.lat).toFixed(3)
  info.evaluate(function(info) {
    if(info == undefined) {
      return  // EE BUG?
    }
    if(info.features.length === 0) {
      App.clickedPoint = null
      App.alertDate = null
      App.panelShowReferenceImages.style().set({ shown: false })
      var message = 'No alert found at location (lon, lat): ' + lonlat
      App.panelClickedPointInfo.widgets().reset([
        ui.Label(message, { margin: '0px', padding: '8px', color: 'grey', fontSize: '11px' })
      ])
      App.log.setValue(message)
      ui.util.setTimeout(function () {
        App.log.style().set({ shown: false })  
      }, 3000)
    } else {
      info = info.features[0].properties
      // convert YYJJJ to JavaScript date
      var year = Math.round(info.Date / 1000) + 2000
      var date = new Date(year, 0, 1, 1)
      var days = info.Date % 1000
      date = new Date(date.getTime() +  days * 24 * 3600000)
      App.alertDate = date
      App.panelShowReferenceImages.style().set({ shown: true })
      App.clickedPoint = [info.longitude, info.latitude]
      var lonlat2 = parseFloat(info.longitude).toFixed(3) + ', ' + parseFloat(info.latitude).toFixed(3)
      App.panelClickedPointInfo.widgets().reset([
        ui.Label('Date: ' + formatDate(App.alertDate), { margin: '6px 0px 0px 6px', fontSize: '12px' }),
        // ui.Label('Area: ' + info.Area, { margin: '6px 0px 0px 6px' }),
        ui.Label('Coordinates (lon, lat): ' + lonlat2, { margin: '6px 0px 0px 6px', fontSize: '12px' }),
        ui.Panel([
          ui.Label('Confidence: ', { margin: '6px 0px 0px 6px', fontSize: '12px' }), 
          ui.Label(info.Alert === 3 ? 'high confidence (confirmed)' : 'low confidence (unconfirmed)', { 
            // fontWeight: 'bold', 
            'background-color': info.Alert === 3 ? App.paletteAlert[0] + '55' : '00ffff55',
            margin: '6px 0px 0px 6px', fontSize: '12px' 
          })
        ], ui.Panel.Layout.flow('horizontal'))
      ])
      if(isTestApp) {
        App.panelClickedPointInfo.widgets().insert(3, ui.Label('Map zoom: ' + Map.getZoom(), { margin: '6px 0px 0px 6px', fontSize: '12px' }))
        App.panelClickedPointInfo.widgets().insert(3, ui.Label('Map center: ' + Map.getCenter().coordinates().getInfo()[0].toString().slice(0, 6) + ', ' + Map.getCenter().coordinates().getInfo()[1].toString().slice(0, 6), { margin: '6px 0px 0px 6px', fontSize: '12px' }))
      }
      App.log.setValue('')
      App.log.style().set({ shown: false })  
    }
    App.showTimeSeriesChart(App.clickedPoint)
  })  
}
App.showTimeSeriesChart = function(pt) {
  if(pt == null) {
    return
  }
  App.panelShowReferenceImages.style().set({ shown: true })
  var scale = Map.getScale()
  var center = ee.Geometry.Point(pt)
  scale = Math.min(19.093, scale)
  var bounds = center.buffer(scale * 120).bounds(scale)
  // remember clicked parameters
  // App.alertPoint = pt
  App.alertBounds = bounds
  App.alertScale = scale
  App.alertZoom = Map.getZoom()
  App.clickedPixelLayer.setEeObject(ee.FeatureCollection([center]).style({ color: '00ffff', fillColor: '00ffff44', pointSize: 5, width: 2 }))
  App.layerClicked.setEeObject(ee.FeatureCollection([bounds]).style({ width: 2, color: '00ffff', fillColor: '00ffff11' }))
  // aoi dates
  var alertDate = image.select('Date') // YYJJJ
  var dates = ee.List(alertDate.reduceRegion({reducer: ee.Reducer.toList(), geometry: bounds, scale: scale, tileScale: 4 }).values().get(0)).map(toDateFromYYJJJ)
  // var alertMillis = image.select('Millis')
  // var dates = ee.List(alertMillis.reduceRegion({reducer: ee.Reducer.toList(), geometry: bounds, scale: scale, tileScale: 4 }).values().get(0)).map(toDateFromMillis)
  var datesUnique = dates.distinct()
  var count = datesUnique.map(function(d) { return dates.filter(ee.Filter.eq('item', d)).size().multiply(10*10) })
  var chart = ui.Chart.array.values(count, 0, datesUnique.map(function(t) { return ee.Date(t).millis() }))
  chart.setOptions({
    pointSize: 1
  })
  // App.panelTimeSeriesChart.widgets().reset([
  //   ui.Label("Disturbed area time series", { fontWeight: 'bold' }),
  //   ui.Panel([chart])
  // ])
  // App.layerClicked.setShown(true)
}
App.showReferenceImages = function() {
  App.removeReferenceImagesMap()
  // App.buttonShowReferenceImages.setDisabled(true)
  var t = ee.Date(App.alertDate)
  // s1
  // var s1 = ee.ImageCollection('COPERNICUS/S1_GRD') 
  //   .filter(ee.Filter.eq('instrumentMode', 'IW')) // EW or IW for Salvbard
  //   .filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'))
  //   .filter(ee.Filter.intersects('.geo', bounds))
  //   .select('VH')
  // var s1Before = s1      
  //   .filterDate(t.advance(-2, 'month'), t)
  //   .median()
  // var s1After = s1      
  //   .filterDate(t, t.advance(2, 'month'))
  //   .median()
  // App.layerImageClicked.setEeObject(ee.Image([s1After, s1Before, s1Before]).visualize({ min: -30, max: -10}).clip(bounds))
  // s2
  // var s2 = ee.ImageCollection('COPERNICUS/S2')
  //   .filterDate(t.advance(-1, 'month'), t.advance(1, 'month'))
  //   .filter(ee.Filter.intersects('.geo', pt))
  //   .select(['B12', 'B8', 'B4'])
  var pt = App.clickedPoint
  var center = ee.Geometry.Point(pt)
  var bounds = App.alertBounds
  var scale = App.alertScale
  var zoom = App.alertZoom
  var missions = []
  if(App.checkboxShowSentinel2.getValue()) {
    missions.push('S2')
  }
  if(App.checkboxShowLandsat8.getValue()) {
    missions.push('L8')
  }
  var images = assets.getImages(center, {
    filter: ee.Filter.date(t.advance(-3, 'month'), t.advance(3, 'month')),
    // filterMasked: true,
    // filterMaskedFraction: 0.5,
    // s2MergeByTime: false,
    scale: scale * 20,
    missions: missions
  })
  // print(images.aggregate_array('system:time_start'))
  images = assets.getMostlyCleanImages(images, bounds, { 
    scale: scale * 20 
  })
  images = images.map(function(i) { 
    return i.set({ label: i.date().format('YYYY-MM-dd').cat(' ').cat(i.get('MISSION')) })
  })
  images = images.sort('system:time_start')
  // var images = ee.ImageCollection('COPERNICUS/S2')
  //   .filterBounds(center)
  //   .filterDate(t.advance(-1, 'month'), t.advance(6, 'month'))
  // print(images.size())      
  // // App.layerImageClicked.setEeObject(s2.visualize({ min: 300, max: 4000, gamma: 1.4 }).clip(bounds2))
  // var options = {proj: 'EPSG:3857', flipX: false, flipY: true }
  // var rows = 3, columns = 4
  // var coords = ee.List(bounds.coordinates().get(0))
  // var ll = ee.List(coords.get(0))
  // var ur = ee.List(coords.get(2))
  // var w = ee.Number(ur.get(0)).subtract(ll.get(0))
  // var h = ee.Number(ur.get(1)).subtract(ll.get(1))
  // var ll2x = ur.get(0)
  // var ll2y = ee.Number(ll.get(1))
  // var ur2x = ee.Number(ur.get(0)).add(w)
  // var ur2y = ur.get(1)
  // var boundsGallery = ee.Geometry.Rectangle([[ll2x, ll2y], [ur2x, ur2y]], 'EPSG:4326', false).bounds(scale, 'EPSG:4326')
  // var gallery = imageGallery.draw(images, boundsGallery, rows, columns, scale, options)
  // App.layerImageClicked.setEeObject(gallery.visualize({ min: 0.04, max: 0.3, gamma: 1.4 }))
  var mapZoom = Math.max(14, zoom + 1)
  // animate images    
  var map = ui.Map({ lat: pt[1], lon: pt[0], zoom: mapZoom }, false, { height: '480px', width: '480px', position: 'middle-right'})
  // add close button
  var closeMapButton = ui.Button('Close')
  closeMapButton.style().set({ margin: '0px', padding: '0px', textAlign: 'left', position: 'bottom-right' })
  map.add(closeMapButton)
  closeMapButton.onClick(function() {
    App.removeReferenceImagesMap()
  })
  App.insetMap = map
  map.setOptions('SATELLITE')
  map.centerObject(bounds)
  map.setControlVisibility({all: false,/*, layerList: true*/ scaleControl: true})
  map.setLocked(true)
  // todo show progress    
  // map.onTileLoaded(function(v) {
  //   // var lectTilesPercent = .map(function())
  // })
  App.panelTimeLapse.widgets().reset([map])
  App.panelTimeLapse.style().set({ shown: true })
  App.layerClicked.setShown(true)
  var vis = { min: 0.05, max: 0.5, gamma: 1.3 }
  // var vis = { min: 5, max: 4500, bands: ['B12', 'B8', 'B4'] }
  var a = animation.animate(images, { 
    vis: vis,
    map: map, 
    compact: true, 
    hidePlay: true, 
    maxFrames: 50, 
    width: '350px',
    label: 'label',
    // preloadCount: 1
  })
  a.then(function() {
    // map.addLayer(ee.FeatureCollection([bounds]).style({ width: 2, color: '00ffff', fillColor: '00ffff11' }), {}, 'bounds')
    // var edges = ee.Algorithms.CannyEdgeDetector(image.select('Alert').unmask(0, false).resample(resamplingMode), 0.1)
    // map.addLayer(edges.selfMask(), { palette: ['fd8d3c'], min: 0, max: 1 }, 'alert', true, 0.5)
    a.panel.style().set({ 'background-color': '#00000022' })
    a.panel.widgets().get(0).style().set({ 'background-color': '#00000000' })
    a.panel.widgets().get(1).style().set({ 'background-color': '#00000000' })
    a.panel.widgets().get(2).style().set({ 'background-color': '#00000000' })
    a.panel.widgets().get(0).style().set({ 'color': '#000000' })
    a.panel.widgets().get(1).style().set({ 'color': '#000000' })
    a.panel.widgets().get(1).style().set({ fontSize: 0 })
    a.panel.widgets().get(2).style().set({ 'color': '#ffffff' })
    // change properties of the main panel of animation controls
    // print(a.panel)
    // a.panel.widgets().reset([])
  })
  // App.layerImageClicked.setShown(true)
}
App.run()