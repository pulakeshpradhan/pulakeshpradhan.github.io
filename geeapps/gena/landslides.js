var demALOS = ui.import && ui.import("demALOS", "image", {
      "id": "JAXA/ALOS/AW3D30_V1_1"
    }) || ee.Image("JAXA/ALOS/AW3D30_V1_1"),
    demNED = ui.import && ui.import("demNED", "image", {
      "id": "USGS/NED"
    }) || ee.Image("USGS/NED"),
    demSRTM30 = ui.import && ui.import("demSRTM30", "image", {
      "id": "USGS/SRTMGL1_003"
    }) || ee.Image("USGS/SRTMGL1_003");
var labelConfirmed = ui.Label('Confirmed indices: 29, 32, 36, 38, 42, 43, 46, 48, 55, 69, 154, 297, 314')
var startIndex = 82
//var startIndex = 0
 /*
  - [x] Download landslide database from https://data.nasa.gov/Earth-Science/Global-Landslide-Catalog-Export/rthp-tcrg
  - [x] Allow inspection of (average) images before / after the event
  - [ ] Implement comparison as a slider (before / after)
  - [~] Add S1 images to the UI
  - [ ] Check look angle
  - [ ] Detect edges and displacement of edges in average images before / after the eveng
  - [ ] Detect edges in every image (after median scpeckle noise filter or more expensive one) and look for temporal patterns in displacement
  - [ ] If this works, how do these anomalies match with the event date??
  - [ ] Add NDWI, NDMI, ... to the UI
  - [ ] Compute statistics using raw optical satellite imagery
  - [ ] Compute statistics using raw SAR satellite imagery
 */ 
var animation = require('users/gena/packages:animation')
var assets = require('users/gena/packages:assets')
var palettes = require('users/gena/packages:palettes')
var style = require('users/gena/packages:style')
var utils = require('users/gena/packages:utils')
style.SetMapStyleDark(Map, true)
// var events = ee.FeatureCollection('ft:1v0aybnT-87aRDuNuFfACAQpEC4zCdf1U5dO3ezQ0', 'latitude')
var events = ee.FeatureCollection('users/gena/landslides').sort('event_id')
// show only large landslides
var eventsLarge = events.filter(ee.Filter
  .inList('landslid_2', ['very_large', 'catastrophic', 'large']))
  .filter(ee.Filter.gt('event_date', '2016-01-01'))
// print('Number of large land slides: ', eventsLarge.size())
var ids = eventsLarge.aggregate_array('event_id')
Map.onClick(function(pt) {
  pt = ee.Geometry.Point([pt.lon, pt.lat])
  var id = eventsLarge.filterBounds(pt.buffer(Map.getScale() * 5)).first().get('event_id')
  var index = ids.indexOf(id)
  print(index)
  show(index.getInfo())
})
Map.style().set({cursor: 'crosshair'})
// add readable date/time
eventsLarge = eventsLarge
  .map(function(f) {
    var t = ee.Date(f.get('event_date'))
    return f
      .set({t: t})
      .set({event_date: t.millis() })
      .set({'system:time_start': t.millis() })
  })
print('Number of large land slides: ', eventsLarge.size())
// eventsLarge = eventsLarge.filterDate('2014-06-01', '2020-01-01')
print('Number of large land slides (after 2014-06-01: ', eventsLarge.size())
// eventsLarge = eventsLarge.filter(ee.Filter.gt('event_date', ee.Date('2013-06-01').millis().getInfo()))
// print('Number of large land slides (after 2013): ', eventsLarge.size())
var index = startIndex
// add control for landslide inspection
function onNext() {
  index = index + 1
  show(index)
}
function onPrevious() {
  index = index - 1
  show(index)
}
function onTextIndexChanged(i) {
  // EE bug, changing visibility triggers event
  if(typeof(i) === 'boolean') {
    return
  }
  index = parseInt(i)
  show(index)
}
// location selection controls
var buttonNext = ui.Button('>', onNext)
var buttonPrevious = ui.Button('<', onPrevious)
var textIndex = ui.Textbox('', 0, onTextIndexChanged)
var labelCount = ui.Label('')
var labelSelection = ui.Label('Select landslide:')
labelSelection.style().set({ fontWeight: 'bold' })
var panelSelection = ui.Panel([ui.Label('Loading ...')])
  .setLayout(ui.Panel.Layout.Flow('horizontal'))
//print(panelSelection)  
// refresh controls
var checkboxClip = ui.Checkbox('Clip', true)
var buttonRefresh = ui.Button('Refresh', function() { show(index) })
var panelRefresh = ui.Panel([buttonRefresh, checkboxClip])
  .setLayout(ui.Panel.Layout.Flow('horizontal'))
var labelImagesSelection = ui.Label('Select satellite sensor type and missions:')
labelImagesSelection.style().set({ fontWeight: 'bold' })
var selectSensorType = ui.Select({ items: ['optical', 'radar'], value: 'optical'})
// optical satellite missions to check
var missionsOptical = [ 'S2',  'L8',  'L7',  'L5', 'L4' ]
var missionOpticalCheckboxes = missionsOptical.map(function(o) {
  var checked = o === 'S2' /*|| o === 'L8'*/ // only recent
  return ui.Checkbox(o, checked)
})
var panelMissionsOptical = ui.Panel(missionOpticalCheckboxes)
  .setLayout(ui.Panel.Layout.Flow('horizontal'))
// radar setallite missions to check
var radarASC = ui.Checkbox('S1 ASCENDING', true)
var radarDSC = ui.Checkbox('S1 DESCENDING', false)
var panelMissionsRadar = ui.Panel([radarASC, radarDSC])
  .setLayout(ui.Panel.Layout.Flow('horizontal'))
panelMissionsRadar.style().set({ shown: false })  
// sensor type selection (optical / radar)  
selectSensorType.onChange(function(sensorType) {
  panelMissionsOptical.style().set({ shown: sensorType === 'optical' })
  panelMissionsRadar.style().set({ shown: sensorType === 'radar' })
  print('Switching sensor type to ' + sensorType)
  reset()
  show(index)
})  
var panelSensorType = ui.Panel([panelMissionsRadar, panelMissionsOptical, panelRefresh])
var animationPanel = null
// selected location controls
var eventDate = ui.Label('')
var eventTitle = ui.Label('')
var eventDescription = ui.Label('')
var eventTrigger = ui.Label('')
var eventSize = ui.Label('')
var panelLocationInfo = ui.Panel([eventDate, eventTitle, eventDescription, eventTrigger, eventSize])
//print(panelLocationInfo)
var panelMain = ui.Panel([labelSelection, panelSelection, panelLocationInfo, labelImagesSelection, selectSensorType, panelSensorType, labelCount])
  .setLayout(ui.Panel.Layout.Flow('vertical'))
panelMain.style().set({
  position: 'bottom-left',
  width: '450px',
  height: '600px'
})
Map.widgets().add(panelMain)
// labelConfirmed.style().set({
//   position: 'bottom-right',
//   width: '450px',
//   height: '50px'
// })
// Map.widgets().add(labelConfirmed)
// client-side array, for speed reasons
var eventsArray = []
// load all locations
eventsLarge.limit(50).evaluate(function(eventsLarge) {
  eventsArray = eventsLarge
  panelSelection.widgets().reset([buttonPrevious, buttonNext, textIndex])
  show(startIndex)
})
// load all locations (slow)
eventsLarge.evaluate(function(eventsLarge) {
  eventsArray = eventsLarge
})
// add map layers
var imageBefore = ee.Image()
var imageAfter = ee.Image()
var vis = { min: 0.05, max: 0.35 }
var layerBefore = ui.Map.Layer(imageBefore, {}, 'before event', false)
var layerAfter = ui.Map.Layer(imageAfter, {}, 'after event', false)
var layerBounds = ui.Map.Layer(ee.Image(), {}, 'bounds')
Map.layers().add(layerBefore)
Map.layers().add(layerAfter)
Map.layers().add(layerBounds)
Map.addLayer(events.style({color: '00ffff', width: 0, pointSize: 1}), {}, 'landslides (all)', true)
Map.addLayer(eventsLarge.style({color: '000000', fillColor: 'd03200', width: 1, pointSize: 5}), {}, 'landslides (>large)')
function reset() {
  // Map.widgets().remove(animationPanel)
  if(animationPanel) {
    animationPanel.clear()
    animationPanel = null
  }
  var layerCount = Map.layers().length()
  var staticLayerCount = 5
  if(layerCount > 5) {
    for(var i=staticLayerCount; i<layerCount; i++) {
      var l = Map.layers().get(staticLayerCount)
      l.setShown(false)
      Map.layers().remove(l)
    }
  }
  labelCount.setValue('')
}
/***
 * Disables main operational controls, needed for async operations. Once operation is finished - call enableControls()
 */
function disableControls() {
  buttonNext.setDisabled(true)
  buttonPrevious.setDisabled(true)
  textIndex.setDisabled(true)
  buttonRefresh.setDisabled(true)
  selectSensorType.setDisabled(true)
}
/***
 * Enables controls
 */
function enableControls() {
    buttonNext.setDisabled(false)
    buttonPrevious.setDisabled(false)
    textIndex.setDisabled(false)
    buttonRefresh.setDisabled(false)
    selectSensorType.setDisabled(false)
}
function animate(images, bounds) {
  disableControls()
  images.size().evaluate(function(size) {
    if(size == 0) { // no images
      enableControls()
      return
    }
    if(checkboxClip.getValue()) {
      images = images.map(function(i) { return i.clip(bounds) })
    }
    // should not be required
    if(animationPanel) {
      animationPanel.clear()
      animationPanel = null
    }
    var a = animation.animate(images, { maxFrames: 100, label: 'label' })
    animationPanel = a
    a.then(function() {
      enableControls()
    })
  })
}
/***
 * Gets list of optical missions to use
 */
function getMissionsOptical() {
  var m = []
  missionsOptical.map(function(o) {
    var checkbox = missionOpticalCheckboxes[missionsOptical.indexOf(o)]
    if(checkbox.getValue()) {
      m.push(o)
    }
  })
  return m
}
/***
 * Generates composite image given dates and bounds
 */
function updateOpticalImages(bounds, t) {
  var start = t.advance(-6, 'month')
  var stop = t.advance(6, 'month')
  var missionsOptical = getMissionsOptical()
  var images = assets.getImages(bounds, {
    filter: ee.Filter.date(start, stop),
    resample: true,
    missions: missionsOptical
  })
  images = assets.getMostlyCleanImages(images, bounds, {
      scale: Map.getScale() * 10, 
      // how much should we deviate from cloud frequency when filtering images, use negative value to allow more (cloudy) images
      cloudFrequencyThresholdDelta: 0.15,
      // percentile and band used for cloudness, usually enough to choose one like green    
      scorePercentile: 95,
      qualityBand: 'green',
    })
  t = t.advance(-1, 'day')
  var T = 4
  var start = t.advance(-T, 'month')
  var stop = t.advance(T, 'month')
  var imagesAnimation = images.filterDate(start, stop).sort('system:time_start')
    .map(function(i) {
      return i
        .select(['swir', 'nir', 'green'])
        .visualize(vis)
        .set({'system:time_start': i.get('system:time_start')})
        .set({ label: i.date().format() })
    })
  animate(imagesAnimation, bounds)
  var imagesBefore = images.filterDate(start, t)
  var imagesAfter = images.filterDate(t, stop)
  var count = ee.String('Image count, ').cat(imagesBefore.size().format('before (4m): %d ')).cat(imagesAfter.size().format('after (4m): %d'))
  count.evaluate(function(count) {
    labelCount.setValue(count)
  })
  // var imageBefore = ee.Image(imagesBefore.sort('system:time_start', false).reduce(ee.Reducer.firstNonNull()))
  // var imageAfter = ee.Image(imagesAfter.sort('system:time_start', true).reduce(ee.Reducer.firstNonNull()))
  var imageBefore = imagesBefore.mean()
  var imageAfter = imagesAfter.mean()
  return {
    before: imageBefore.visualize(vis),
    after: imageAfter.visualize(vis)
  }
}
/***
 * Converts to natural from dB
 */
function toNatural(i) {
  return ee.Image(ee.Image.constant(10.0).pow(i.divide(10.0))
    .copyProperties(i)
    .copyProperties(i, ['system:time_start']));
}
function resample(image) {
  return image.resample('bilinear')
}
/***
 * Clip an image by displacing a mask (fast).
 */
function shrink(image, size) {
  var mask = image.mask().select(0)
  size = ee.Number(size)
  var displacement = ee.Image.constant([size, size]).reproject(mask.projection())
  var mode = 'nearest_neighbor'
  var output_mask = mask.displace(displacement, mode).and(mask.displace(displacement.multiply(-1), mode))
  return image.updateMask(output_mask)
}
/***
 * Generates composite image given dates and bounds
 */
function updateRadarImages(bounds, t) {
  var start = t.advance(-6, 'month')
  var stop = t.advance(6, 'month')
  var band1 = 'VH'
  var band2 = 'VV'  
  var mode = 'IW'
  // var band1 = 'HH'
  // var band2 = 'HV'  
  // var mode = 'IW'
  // var band1 = 'HH'
  // var band2 = 'HV'  
  // var mode = 'SM'
  var images = ee.ImageCollection("COPERNICUS/S1_GRD")
    .filterDate(start, stop)
    .filterBounds(bounds)
    .sort('system:time_start')
  images = images
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', band1))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', band2))
  // median
  var min = -20, max = -5
  var min = 0, max = 0.25
  var bandNames = ee.Image(images.first()).bandNames()
  // Filter to get images collected in interferometric wide swath mode.
  images  = images
    .filter(ee.Filter.eq('instrumentMode', mode))
  var images_asc = images
    .filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'))
  var images_desc = images  
    .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
  if(radarASC.getValue() && !radarDSC.getValue()) {
    images = images_asc
  } else if(!radarASC.getValue() && radarDSC.getValue()) {
    images = images_desc
  }
  // visualize  
  images = images.map(function(i) {
    i = shrink(i, 5000)
    var date = i.date().format('YYYY-MM-dd')
    var maskPixelCount = ee.List(i.select(0).mask().reduceRegion(ee.Reducer.sum(), bounds, Map.getScale() * 50).values()).get(0)
    var image = toNatural(i)
    return image
      .set('system:time_start', i.get('system:time_start'))
      .set({maskPixelCount: maskPixelCount})
  }).filter(ee.Filter.gt('maskPixelCount', 10))
  t = t.advance(-1, 'day')
  var T = 4
  var start = t.advance(-T, 'month')
  var stop = t.advance(T, 'month')
  var imagesBefore = images.filterDate(start, t)
  var imagesAfter = images.filterDate(t, stop)
  var min = 0.03, max = [0.2, 0.6, 0.2]
  var imagesRGB = images.map(function(i) {
      return i.visualize({min: min, max: max, bands: [band2, band2, band1], gamma: 1.6})
        //.set({label: i.get('S1TBX_SAR_Processing_version')})
        .set({label: i.date().format('YYYY-MM-dd')})
  })
  animate(imagesRGB, bounds)
  var count = ee.String('Image count, ').cat(imagesBefore.size().format('before (4m): %d ')).cat(imagesAfter.size().format('after (4m): %d'))
  count.evaluate(function(count) {
    labelCount.setValue(count)
  })
  // var imageBefore = ee.Image(imagesBefore.sort('system:time_start', false).reduce(ee.Reducer.firstNonNull()))
  // var imageAfter = ee.Image(imagesAfter.sort('system:time_start', true).reduce(ee.Reducer.firstNonNull()))
  var imageBefore = imagesBefore.mean()
  var imageAfter = imagesAfter.mean()
  return {
    before: imageBefore.visualize({min: min, max: max, bands: [band2, band2, band1], gamma: 1.6}),
    after: imageAfter.visualize({min: min, max: max, bands: [band2, band2, band1], gamma: 1.6})
  }
}
function formatDate(date) {
  return date.toString() + ' / ' 
    + (date.getYear() + 1900).toString() + '-' + utils.pad(date.getMonth().toString(), 2) + '-' + utils.pad(date.getDay().toString(), 2)
}
/***
 * Selects locations
 */
function show(index) {
  textIndex.setValue(index, false)
  labelCount.setValue('updating ...')
  // eventDate.setValue('Date: updating ...')
  // eventTitle.setValue('Title: updating ...')
  // eventDescription.setValue('Description: updating ...')
  // eventTrigger.setValue('Trigger: updating ...')
  // eventSize.setValue('Size: updating ...')
  if(animationPanel) {
    reset()
  }
  // var location = eventsArray.features[index]
  var location = eventsLarge.toList(1, index).get(0).getInfo()
  Map.setCenter(location.geometry.coordinates[0], location.geometry.coordinates[1], 14)
  eventDate.setValue('Date: ' + formatDate(new Date(location.properties.event_date)))
  eventTitle.setValue('Title: ' + location.properties.event_titl)
  eventDescription.setValue('Description: ' + location.properties.event_desc)
  eventTrigger.setValue('Trigger: ' + location.properties.landslid_1)
  eventSize.setValue('Size: ' + location.properties.landslid_2)
  var t = ee.Date(ee.Number(location.properties.event_date))
  var bounds = ee.Feature(location).geometry().buffer(3000)
  layerBounds.setEeObject(ee.Image().paint(bounds, 1, 2).visualize({palette: ['ffffff']}))
  var composites = selectSensorType.getValue() === 'optical' 
    ? updateOpticalImages(bounds, t) 
    : updateRadarImages(bounds, t) 
  layerBefore.setEeObject(composites.before)
  layerAfter.setEeObject(composites.after)
}