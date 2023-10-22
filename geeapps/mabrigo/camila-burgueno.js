// Adds two charts next to the map to interactively display a	
// time-series of NDVI and reflectance for each click on the map.	
// Agrego vector desde Fusion Table	
var potreros = ee.FeatureCollection('users/gervasiopineiro/GyC/AbayubaRibas')	
var fechafin= ee.Date(Date.now())	
//var fechaini = ('2017-07-01')	
var fechaini = fechafin.advance(-800,'day')	
print (fechaini)	
print (fechafin)	
// Filter collection to dates of interest.	
var S2 = ee.ImageCollection('COPERNICUS/S2_SR')	
//.filterDate('2017-01-01', '2020-12-01')	
    .filterDate(fechaini, fechafin)	
    .filterBounds(potreros)	
.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 50))	
print(S2)	
/*	
// Create two collections	
var rgb = S2.select(['TCI_R', 'TCI_G', 'TCI_B'])	
var ndvi_collection = S2	
.map(function(image) {return image.addBands(image.normalizedDifference(["B8", "B4"]))})	
    .select(['nd'],['ndvi'])	
print(ndvi_collection)	
*/	
////////////////////////////////////////////////////////////	
// CALCULO PPNA	
////////////////////////////////////////////////////////////	
var add_q = function(image) {	
var q = image.select(['QA60']).lt(1).multiply(image.select(['MSK_CLDPRB']).lt(1)).rename('q')	
  return image.addBands(q)	
}	
var NDVIl = S2.map(add_q)	
print('l',NDVIl)	
var addNDVI = function(image) {	
var ndvi = image.normalizedDifference(['B8', 'B4']).rename('NDVI')	
  var m = ndvi.updateMask(image.select(['q']))	
  return image.addBands(m)	
}	
var NDVIm = NDVIl.map(addNDVI).select(['NDVI','q'])	
print('m',NDVIm)	
var addDate = function(image){	
  var doy = image.date().getRelative('day', 'year')	
var doyBand = ee.Image.constant(doy).uint16().rename('doy')	
  return image.addBands(doyBand)	
}	
var NDVIn = NDVIm.map(addDate)	
print('n',NDVIn)	
var addPAR = function(image){	
var f = image.expression('15.402168 - 0.000000011*(x**4) + 0.000007543*(x**3) - 0.001310832*(x**2) + 0.009646584*x', {	
      'x': image.select('doy')	
  }).rename('PAR')	 
  return image.addBands(f)	
}	
var NDVIo = NDVIn.map(addPAR)	
print('o',NDVIo)	
var addfPAR = function(image){	
//var f = image.expression('min(max((1+NDVI)/(1-NDVI)/9.916077458,0),0.95)', {	
var f = image.expression('min(max(0.07*exp(2.81*NDVI),0),0.95)', {	
      'NDVI': image.select('NDVI')	
  }).rename('fPAR')	
  return image.addBands(f)	
}	
var NDVIp = NDVIo.map(addfPAR)	
print('p',NDVIp)	
var addPPNA = function(image){	
var f = image.expression('((PAR*fPAR*0.34)-0.29)*10', {	
      'fPAR': image.select('fPAR'),	
      'PAR': image.select('PAR')	
  }).rename('PPNA')	
  return image.addBands(f)	
}	
var NDVIq = NDVIp.map(addPPNA)	
print('q',NDVIq)	
////////////////////////////////////////////////////////////	
// MAPA y GRAFICO	
////////////////////////////////////////////////////////////	
var vis = {bands: 'NDVI', min: 0, max: 1, palette: [	
'FFFFFF', 'CE7E45', 'FCD163', '66A000', '207401',	
'056201', '004C00', '023B01', '012E01', '011301'	
]}	
//Map.addLayer(ndvi_collection, vis, 'NDVI')	
Map.addLayer(NDVIq, {bands:'q'}, 'q')	
Map.addLayer(NDVIq, vis, 'ndvi')	
Map.centerObject(potreros)	
var empty = ee.Image().byte()	
var outline = empty.paint({	
  featureCollection: potreros,	
color: 1,	
width: 3	
})	
Map.addLayer(outline, {palette: 'FF0000'}, 'Potreros')	
// Create a panel to hold our widgets.	
var panel = ui.Panel()	
panel.style().set('width', '600px')	
// Create an intro panel with labels.	
var intro = ui.Panel([	
  ui.Label({	
value: 'Predio de Abayuba Ribas - PPNA estimada mediante SENTINEL2',	
style: {fontSize: '20px', fontWeight: 'bold'}	
  }),	
])	
panel.add(intro)	
var tempTimeSeries = ui.Chart.image.seriesByRegion(	
NDVIq,potreros, ee.Reducer.mean(), 'PPNA', 1, 'system:time_start', 'LOTE')	
          .setOptions({	
          title: 'PPNA',	
          vAxis: {title: 'PPNA (kg/ha/d)'},	
lineWidth: 1,	
pointSize: 4,	
          series: {	
1: {color: 'FF0000'}, // pix1	
2: {color: '00FF00'}, // pix1	
3: {color: '0000FF'}, // pix4	
}})	
//print(tempTimeSeries)	
panel.widgets().set(2, tempTimeSeries)	
var tempTimeSeries = ui.Chart.image.seriesByRegion(	
NDVIq,potreros, ee.Reducer.mean(), 'q', 1, 'system:time_start', 'LOTE')	
          .setOptions({	
          title: 'Calidad',	
          vAxis: {title: 'Pixeles sin nubes (%)'},	
lineWidth: 1,	
pointSize: 4,	
          series: {	
1: {color: 'FF0000'}, // pix1	
2: {color: '00FF00'}, // pix1	
3: {color: '0000FF'}, // pix4	
}})	
//print(tempTimeSeries)	
panel.widgets().set(4, tempTimeSeries)	
// Create panels to hold lon/lat values.	
var lon = ui.Label()	
var lat = ui.Label()	
//panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')))	
Map.onClick(function(coords) {	
  // Update the lon/lat panel with values from the click event.	
lon.setValue('lon: ' + coords.lon.toFixed(2)),	
lat.setValue('lat: ' + coords.lat.toFixed(2))	
  // Add a red dot for the point clicked on.	
  var point = ee.Geometry.Point(coords.lon, coords.lat)	
  // Create an NDVI chart.	
var ndviChart = ui.Chart.image.series(NDVIq.select(['PPNA']), point, ee.Reducer.mean(), 30)	
  ndviChart.setOptions({	
title: 'PPNA del punto ' + coords.lon.toFixed(2) + ' ' +  coords.lat.toFixed(2),	
    vAxis: {title: 'PPNA (kg/ha/d)'},	
hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},	
  })	
panel.widgets().set(3, ndviChart)	
})	
Map.style().set('cursor', 'crosshair')	
// Add the panel to the ui.root.	
ui.root.insert(0, panel)