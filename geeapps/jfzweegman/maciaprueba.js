// Adds two charts next to the map to interactively display a	
// time-series of NDVI and reflectance for each click on the map.	
// Agrego vector desde Fusion Table	
var potreros = ee.FeatureCollection('projects/ee-jfzweegman/assets/Lotes_Macia');	
//Se define fecha de fin como la fecha de hoy
var fechafin= ee.Date(Date.now());
//var fechaini = ('2017-07-01')	;
//Se define fecha de inicio como la fecha final menos x cantidad de días. Se puede modificar ese número para variar el período
var fechaini = fechafin.advance(-1200,'day')	;
//Imprimir en la consola fechaini y fechafin
print (fechaini)	;
print (fechafin)	;
// Filrar colección de interes	
var S2 = ee.ImageCollection('COPERNICUS/S2_SR')	
//.filterDate('2020-01-01', '2020-12-01')	
    .filterDate(fechaini, fechafin)	//filtra por fechas inicio y fin
    .filterBounds(potreros)	//seleciona por los potreros
.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 1));	//filtra por porcentaje de nubes
print(S2);//imprime en la consola
////////////////////////////////////////////////////////////	
// CALCULO PPNA	
////////////////////////////////////////////////////////////	
//Se define la funcción add_q para seleccionar banda de calidad QA60 y MSK_CLDPRB < 1. Se renombra como q
var add_q = function(image) {	
var q = image.select(['QA60']).lt(1).multiply(image.select(['MSK_CLDPRB']).lt(1)).rename('q');	
  return image.addBands(q)	;
}	;
//se aplica la función en la variable NDVIl
var NDVIl = S2.map(add_q)	;
print('l',NDVIl)	;
//se define la función addNDVI para calcular NDVI y aplicar la máscara de calidad	
var addNDVI = function(image) {	
var ndvi = image.normalizedDifference(['B8', 'B4']).rename('NDVI'); //cálculo de NDVI
  var m = ndvi.updateMask(image.select(['q'])); //aplica máscara de calidad
  return image.addBands(m); //agrega la banda m que tiene el NDVI
}	;
//aplico la función addNDVI en la variable NDVIm
var NDVIm = NDVIl.map(addNDVI).select(['NDVI','q']); //selecciona únicamente bandas NDDVI y q
print('m',NDVIm);
//Función para agregar la fecha a la colección	
var addDate = function(image){	
  var doy = image.date().getRelative('day', 'year');	
var doyBand = ee.Image.constant(doy).uint16().rename('doy');	
  return image.addBands(doyBand);	
}	;
//Aplico la función para agregar fecha
var NDVIn = NDVIm.map(addDate);	
print('n',NDVIn);	
//Función para cálcular PAR	
var addPAR = function(image){	
var f = image.expression('15.402168 - 0.000000011*(x**4) + 0.000007543*(x**3) - 0.001310832*(x**2) + 0.009646584*x', {	
      'x': image.select('doy')	
  }).rename('PAR');
  return image.addBands(f);	
}	;
//Aplico la función para cálculo de PAR
var NDVIo = NDVIn.map(addPAR);
print('o',NDVIo);
//Función para cálcular fPAR	
var addfPAR = function(image){	
//var f = image.expression('min(max((1+NDVI)/(1-NDVI)/9.916077458,0),0.95)', {	
var f = image.expression('min(max(0.07*exp(2.81*NDVI),0),0.95)', {	
      'NDVI': image.select('NDVI')	
  }).rename('fPAR')	;
  return image.addBands(f)	;
}	;
//Aplico función fPAR
var NDVIp = NDVIo.map(addfPAR)	;
print('p',NDVIp)	;
//Función para calcular PPNA
var addPPNA = function(image){	
var f = image.expression('((PAR*fPAR*0.34)-0.29)*10', {	
      'fPAR': image.select('fPAR'),	
      'PAR': image.select('PAR')	
  }).rename('PPNA');	
  return image.addBands(f);	
};	
//Aplico función addPPNA
var NDVIq = NDVIp.map(addPPNA)	;
print('q',NDVIq);	
////////////////////////////////////////////////////////////	
// MAPA y GRAFICO	
////////////////////////////////////////////////////////////	
var vis = {bands: 'NDVI', min: 0, max: 1, palette: [	
'FFFFFF', 'CE7E45', 'FCD163', '66A000', '207401',	
'056201', '004C00', '023B01', '012E01', '011301'	
]}	
//Map.addLayer(ndvi_collection, vis, 'NDVI')	
Map.addLayer(NDVIq, {bands:'q'}, 'q',false)	//cargo en el mapa la banda q de NDVIq
Map.addLayer(NDVIq, vis, 'ndvi',false)	//cargo en el mapa la banda NDVI de NDVIq
Map.centerObject(potreros)	//centro el mapa en los potreros
var empty = ee.Image().byte()	
var outline = empty.paint({	
  featureCollection: potreros,	
color: 1,	
width: 3	
})	
Map.addLayer(outline, {palette: 'FF0000'}, 'Potreros')	//cargo en el mapa los potreros
// Create a panel to hold our widgets.	
var panel = ui.Panel()	
panel.style().set('width', '600px')	
// Create an intro panel with labels.	
var intro = ui.Panel([	
  ui.Label({	
value: 'Predio de Don Juan - Prueba PILOTO- PPNA estimada mediante SENTINEL2',	
style: {fontSize: '20px', fontWeight: 'bold'}	
  }),	
])	
panel.add(intro)	
var tempTimeSeries = ui.Chart.image.seriesByRegion(	
NDVIq,potreros, ee.Reducer.mean(), 'PPNA', 1, 'system:time_start', 'Nombre')	
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
NDVIq,potreros, ee.Reducer.mean(), 'q', 1, 'system:time_start', 'Nombre')	
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