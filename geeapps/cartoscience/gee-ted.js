var image = ui.import && ui.import("image", "image", {
      "id": "users/cartoscience/Vector-Suit/GEE-TED_Kenya_2016-2017"
    }) || ee.Image("users/cartoscience/Vector-Suit/GEE-TED_Kenya_2016-2017");
var basemap = {
  'Basemap': [
    {
      featureType: 'water',
      stylers: [
        { color: '#3b3b3b' }
      ]
    },
    {
      featureType: 'landscape',
      stylers: [
        { color: '#303030' }
      ]
    },
    {
      featureType: 'administrative',
      stylers: [
        { visibility: 'off' }
      ]
    },
    {
      featureType: 'administrative.country',
      elementType: 'labels',
      stylers: [
        { visibility: 'on' }
      ]
    },
    {
      featureType: 'administrative.country',
      elementType: 'geometry',
      stylers: [
        { visibility: 'on' }
      ]
    },
    {
      featureType: 'road',
      stylers: [
        { visibility: 'off' }
      ]
    },
    {
      featureType: 'poi',
      stylers: [
        { visibility: 'off' }
      ]
    },
    {
      featureType: 'transit',
      stylers: [
        { visibility: 'off' }
      ]
    }
  ]
}
image = image.rename('tsetse-prob')
var water = ee.Image('JRC/GSW1_1/GlobalSurfaceWater').select('occurrence')
var zones = ee.FeatureCollection("FAO/GAUL/2015/level2")
  .filterMetadata('ADM0_NAME', 'equals', 'Kenya')
var zones_L1 = ee.FeatureCollection("FAO/GAUL/2015/level1")
  .filterMetadata('ADM0_NAME', 'equals', 'Kenya')
var kenya = ee.FeatureCollection("FAO/GAUL/2015/level0")
  .filterMetadata('ADM0_NAME', 'equals', 'Kenya')
var withZero = ee.Image(0).where(image,image).rename('tsetse-prob')
var background = image.mask().clip(kenya).multiply(0).rename('background')
var hollow = {color: 'white', width: 1, fillColor: '00000000'}
var tColors = ['202020','919191','fffa5c','ffb42b','ff3a0e','ab0000']
Map.addLayer(background, {palette:'202020'}, 'Background layer')
Map.addLayer(water,{min:0, max:100, palette: ["3b3b3b"]}, 'JRC Water') 
Map.addLayer(image,{min:0, max:100, palette: tColors}, 'Tsetse probability (2016-2017)') 
Map.addLayer(zones.style(hollow),{opacity: 0.3},'Zones (FAO GAUL L2)')
Map.centerObject(zones).setOptions('Basemap', basemap)
function ColorBar(palette) {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '100x5',
      format: 'png',
      palette: tColors
    },
    style: {stretch: 'horizontal', margin: '0px 8px'},
  })
}
var style = {
  min: 0,
  max: 100,
  palette: tColors
}
function makeLegend() {
  var labelPanel = ui.Panel(
      [
        ui.Label('0', {margin: '4px 8px', fontSize: '11px', color: '202020'}),
        ui.Label('100%', {margin: '4px 225px', fontSize: '11px', color: '202020'})
      ],
      ui.Panel.Layout.flow('horizontal'))
  return ui.Panel([ColorBar(style.tColors), labelPanel])
}
var title = ui.Label('GEE-TED: A tsetse ecological distribution model for Google Earth Engine',
  {fontSize: '20px', fontWeight:'bold'})
var label = ui.Label('Click a subregion to generate a tsetse probability histogram')
var legendLabel = ui.Label('Tsetse probability (2016-2017)', {fontSize: '11px', fontWeight:'bold'})
var cite = ui.Label('Peter, Brad; Messina, Joseph, 2022, "GEE-TED: A tsetse ecological distribution model for Google Earth Engine", ' 
  + 'https://doi.org/10.7910/DVN/6JR87X, Harvard Dataverse, V1.',
  {fontSize: '10px'})
var panel = ui.Panel([title, cite, legendLabel, makeLegend(), label], ui.Panel.Layout.flow('vertical'), {width: '300px', position:'bottom-left'})
Map.add(panel)
var chartOptions = {
  colors: ['black'],
  vAxis: {
    format: 'scientific'
  }
}
function pickRegion(location) {
  var coords = [location.lon, location.lat]
  var zone = zones.filterBounds(ee.Geometry.Point(coords))
  var name = ee.Feature(zone.first()).get('ADM2_NAME').getInfo()
  var zone_L1 = zones_L1.filterBounds(ee.Geometry.Point(coords))
  var name_L1 = ee.Feature(zone_L1.first()).get('ADM1_NAME').getInfo()
  var area = zones.filterMetadata('ADM2_NAME', 'equals', name)
  var areaStyle = {color: 'white', width: 2, fillColor: '00000000'}
  Map.layers().set(4, ui.Map.Layer(area.style(areaStyle), {}, 'Selected zone: '+name))
  panel.widgets().set(4,ui.Label(name+', '+name_L1, {fontWeight:'bold'}))
  var histogram 
  if (name == 'Wajir' || name == 'Mandera') {
    histogram = ui.Label('Zero tsetse probability in this zone', {fontSize: '11px'})
  } else {
    histogram = ui.Chart.image.histogram({
      image: withZero.rename('Tsetse-Probability'),
      region: area,
      scale: 250,
      maxPixels: 1e13,
      minBucketWidth: 10
    }).setOptions(chartOptions)
  }
  panel.widgets().set(5, histogram)
  // Map.centerObject(area)
}
Map.onClick(pickRegion)