var poligono = /* color: #d63000 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[-65.9674072265625, -28.15925673358728],
                  [-65.85205078125, -28.90727284801445],
                  [-65.3082275390625, -28.97457326262495],
                  [-64.92919888347387, -28.285100315131874],
                  [-65.24780239909887, -28.009018906040335],
                  [-65.96740689128637, -28.05265798958779]]]),
            {
              "system:index": "0"
            })]);
//collection 1 
var coll_S2_O_d1 = ee.ImageCollection('COPERNICUS/S2')
  .filterDate('2018-05-01', '2018-05-30')
  .filterBounds(poligono)
  .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than' ,10);
  Map.centerObject(poligono);
// Bandas disponibles
// B1	Aerosols	443nm	60m
// B2	Blue	490nm	10m
// B3	Green	560nm	10m
// B4	Red	665nm	10m
// B5	Red Edge 1	705nm	20m
// B6	Red Edge 2	740nm	20m
// B7	Red Edge 3	783nm	20m
// B8	NIR	842nm	10m
// B8a	Red Edge 4	865nm	20m
// B9	Water vapor	940nm	60m
// B10	Cirrus	1375nm	60m
// B11	SWIR 1	1610nm	20m
// B12	SWIR 2	2190nm	20m
// Se escribe una funcion para cambiar el numero de banda por nombre de banda y se aplica a las colecciones
var coll_S2_1 = function(image) {
  return image.select(
  ['B2','B3','B4','B5','B6','B7','B8','B8A','B10', 'B11','B12'],  
  ['BLUE','GREEN', 'RED','RedE1','RedE2','RedE3','NIR','RedE4','Cirrus','SWIR1','SWIR2'])};  
var coll_S2_d1 = coll_S2_1(coll_S2_O_d1)
//Se hace una funcion para calcular NDVI y se mapea en las distintas colecciones
var QBs = function(image) {
var NDVI = image.normalizedDifference(['NIR', 'RED']).rename('NDVI');
var newImage = image
.addBands(NDVI)
return (newImage);
};  
var S2_QB_d1 = coll_S2_d1.map(QBs);
//Se hace el mosaico seleccionando el pixel con mejor NDVI y se corta por el area de interes
var mosaic_SE_QB_d1 = S2_QB_d1.qualityMosaic('NDVI').clip(poligono);
// Se hace el mosaico con la mediana
var mosaic_SE_QB_d1_mediana = S2_QB_d1.median().clip(poligono)
//***********************************
// Una vez elegido el mosaico ---- Calculo todos los indices que quiero
var Index = function(image) {
// en este lugar de la funcion va el calculo
var NDBI = image.normalizedDifference(['SWIR1', 'NIR']).rename('NDBI');
var NDSI = image.normalizedDifference(['SWIR1', 'GREEN']).rename('NDSI');
var UI = image.normalizedDifference(['SWIR2', 'RedE4']).rename('UI');
//en este otro es donde le agrego los resultados que quiero a mi mosaico
var newImage = image
.addBands(NDBI)
.addBands(NDSI)
.addBands(UI)
return (newImage);
};  
//Le aplico la funcion al mosaico
var Mosaico_indices = Index(mosaic_SE_QB_d1);
//********
// Calculo el tasselled cap
var calculateTasseledCap = function (image){
  var b = image.select('BLUE','GREEN', 'RED', 'NIR', 'Cirrus', 'SWIR2');
  var c = image.select('BLUE','GREEN', 'RED', 'NIR', 'SWIR1', 'SWIR2');
  //Coefficients are only for RapidEye Imagery
  var brightness_coefficents = ee.Image([0.3037,0.2793,0.4743,0.5585,0.5082,0.1863])
  var greenness_coefficents = ee.Image([-0.2848,-0.2435,-0.5436,0.7243,0.0840,-0.1800])
  var wetness_coefficents = ee.Image([0.1509,0.1973,0.3279,0.3406,-0.7112,-0.4572])
    var brightness = image.expression(
      '(B * BRIGHTNESS)',
      {
        'B':b,
        'BRIGHTNESS': brightness_coefficents
        }
      );
      var greenness = image.expression(
    '(C * GREENNESS)',
      {
        'C':c,
        'GREENNESS': greenness_coefficents
        }
      );
  var wetness = image.expression(
    '(C * WETNESS)',
      {
        'C':c,
        'WETNESS': wetness_coefficents
        }
      );
  brightness = brightness.reduce(ee.call("Reducer.sum"));
   greenness = greenness.reduce(ee.call("Reducer.sum"));
  wetness = wetness.reduce(ee.call("Reducer.sum"));
  var tasseled_cap = ee.Image(brightness).addBands(greenness).addBands(wetness).rename('brightness','greenness','wetness')
  return tasseled_cap;
};
var Mosaico_taselado = calculateTasseledCap(Mosaico_indices)
var vizParams = {
  bands: ['brightness', 'greenness', 'wetness'],
  min: [-1000, -1000, -1500], max: [5000, 1000, 1000]
};
var Mosaico_indices = Mosaico_indices.addBands(Mosaico_taselado)
//Elijo cualquiera de las bandas de mi mosaico y hago una imagen de 1 banda
var NDBI = Mosaico_indices.select('NDBI')
var NDSI = Mosaico_indices.select('NDSI')
var UI = Mosaico_indices.select('UI')
var brightness = Mosaico_indices.select('brightness')
var greenness = Mosaico_indices.select('greenness')
var wetness = Mosaico_indices.select('wetness')
//Calculo de Maximos y minimos
var minimo = NDSI.reduceRegion({
  reducer: ee.Reducer.min(),
  geometry: poligono.geometry(),
  scale: 10,
  maxPixels: 1e13
})
print(minimo,'NDSI_minimo')
var maximo = NDSI.reduceRegion({
  reducer: ee.Reducer.max(),
  geometry: poligono.geometry(),
  scale: 10,
  maxPixels: 1e13
})
print(maximo,'NDSI_maximo')
var minimo_Brig = brightness.reduceRegion({
  reducer: ee.Reducer.min(),
  geometry: poligono.geometry(),
  scale: 10,
  maxPixels: 1e13
})
print(minimo_Brig,'Brig_minimo')
var maximo_Brig = brightness.reduceRegion({
  reducer: ee.Reducer.max(),
  geometry: poligono.geometry(),
  scale: 10,
  maxPixels: 1e13
})
print(maximo_Brig,'Brig_maximo')
//:::::::::::::::::::::::
var minimo_Green = greenness.reduceRegion({
  reducer: ee.Reducer.min(),
  geometry: poligono.geometry(),
  scale: 10,
  maxPixels: 1e13
})
print(minimo_Green,'greenness_minimo')
var maximo_Green = greenness.reduceRegion({
  reducer: ee.Reducer.max(),
  geometry: poligono.geometry(),
  scale: 10,
  maxPixels: 1e13
})
print(maximo_Green,'greenness_maximo')
var minimo_Wetness = wetness.reduceRegion({
  reducer: ee.Reducer.min(),
  geometry: poligono.geometry(),
  scale: 10,
  maxPixels: 1e13
})
print(minimo_Wetness,'Wetness_minimo')
var maximo_Wetness = wetness.reduceRegion({
  reducer: ee.Reducer.max(),
  geometry: poligono.geometry(),
  scale: 10,
  maxPixels: 1e13
})
print(maximo_Wetness,'Wetness_maximo')
// :::::::::::::
var minimo1 = ee.Number(minimo.get('NDSI'))
var maximo1 = ee.Number(maximo.get('NDSI'))
var minimo_Brig1 = ee.Number(minimo_Brig.get('brightness'))
var maximo_Brig1 = ee.Number(maximo_Brig.get('brightness'))
var minimo_Green1 = ee.Number(minimo_Green.get('greenness'))
var maximo_Green1 = ee.Number(maximo_Green.get('greenness'))
var minimo_wetness1 = ee.Number(minimo_Wetness.get('wetness'))
var maximo_wetness1 = ee.Number(maximo_Wetness.get('wetness'))
var dos = ee.Number(2)
//print (dos,'dos')
/*
print (minimo1,'minimo1')
print (minimo_Brig1,'minimo_Brig1')
print (minimo_Green1,'minimo_Green1')
print (minimo_wetness1,'minimo_wetness1')
*/
var NNDSI = NDSI.subtract(minimo1).divide(maximo1.subtract(minimo1))
//print (NNDSI,'NNDSI')
var Nbrightness = brightness.subtract(minimo_Brig1).divide(maximo_Brig1.subtract(minimo_Brig1))
var RNDSI = NNDSI.divide(Nbrightness).rename('RNDSI')
var Mosaico_indices = Mosaico_indices.addBands(RNDSI)
var Nwetness = wetness.subtract(minimo_wetness1).divide(maximo_wetness1.subtract(minimo_wetness1))
var Ngreenness = greenness.subtract(minimo_Green1).divide(maximo_Green1.subtract(minimo_Green1))
var B1 = Nbrightness.add(Nwetness)
var B2 = Ngreenness.multiply(-1).add(dos)
var B12= B1.divide(B2)
var B3 = Ngreenness.add(dos)
var B13 = B1.divide(B3)
var BCI = B12.divide(B13).rename('BCI')
//print (BCI,'BCI')
var Mosaico_indices = Mosaico_indices.addBands(BCI)
// Se mandan los mosaicos a visualizacion de pantalla
// print (Mosaico_indices)
Map.addLayer (poligono, {}, 'poligono', false);
Map.addLayer (BCI, {min:[1.4],max:[1.84]}, 'BCI', false);
Map.addLayer (NDBI, {}, 'NDBI', false );
Map.addLayer (NDSI, {}, 'NDSI', false );
Map.addLayer (UI, {}, 'UI', false );
Map.addLayer (RNDSI, {min:[0],max:[50]}, 'RNDSI', false);
Map.addLayer (brightness,{}, 'brightness', false );
Map.addLayer (greenness,{}, 'greenness', false );
Map.addLayer (wetness,{}, 'wetness', false);
Map.addLayer (Mosaico_indices, vizParams, 'Mosaico_Tasselled');
Map.addLayer (Mosaico_indices, {bands: ['NIR','RED','GREEN'], min: [900,300,600], max: [4500, 2000, 1700] }, 'Mosaico_indices', false);
Map.addLayer (mosaic_SE_QB_d1_mediana, {bands: ['NIR','RED','GREEN'], min: [900,300,600], max: [4500, 2000, 1700] }, 'mosaico_mediana_1', false );
Map.addLayer (mosaic_SE_QB_d1, {bands: ['NIR','RED','GREEN'], min: [900,300,600], max: [4500, 2000, 1700] }, 'mosaico_Quality_1', false );
//****************
/*Categorizar BCI
//gt (greater than) gte(greater than equal) y a la inversa lt/lte
var BCIcat = BCI.lte(1.4) // todo lo menor a 1.4 sera 1 el resto es 0
var BCIcat = BCIcat.where(BCI.gt(1.4).and(BCI.lte(1.6)),2) // entre 1.4 y 1.6 es 2
var BCIcat = BCIcat.where(BCI.gt(1.6).and(BCI.lte(1.8)),3) // entre 1.6 y 1.8 es 3
var BCIcat = BCIcat.where(BCI.gt(1.8),4) // mayor que 1.8 es 4
var paletaBCI = [
'#ff160b',//categoria 1(rojo)
'#ff9e0d',//categoria 2(naranja)
'#00ffff',//categoria 3(celeste)
'#1bb32d',//categoria 4(verde)
];
Map.addLayer (BCIcat, {min:1,max:4,palette:paletaBCI},'BCIcat')
*/
//*******************
// Clasificacion
/*
var puntosb = [edificado, verde, agua, suelo_desnudo];
var mosaico = Mosaico_indices
var samplesb = mosaico.sampleRegions({
  collection: ee.FeatureCollection(puntosb).flatten(),
  properties: ['clase'],
  scale: 10
});
var trained = ee.Classifier.cart().train(samplesb, 'clase', mosaico.bandNames());
var classified = mosaico.classify(trained);
var paleta = [
'#ff0808',//CLASE 1, Infraestructura (rojo)
'#71bf00',//CLASE 2, vegetacion (verde)
'#00ffff',//CLASE 3, agua (celeste)
'#ffc82d',//CLASE 4, Suelo Desnudo (marron)
];
Map.addLayer (classified, {min:1,max:4,palette:paleta},'classified')
// Reclasificación Construido
var construido = classified.remap([1,2,3,4],[1,0,0,0]);
var pal_construido = [
'#8b867f',//CLASE 0, no construido
'#ff160b',//CLASE 1, construido (rojo)
];
Map.addLayer (construido, {min:0,max:1,palette:pal_construido},'construido', false)
// Calculo de Entorno Construido
var ind_con = construido.reduceNeighborhood({
  reducer: ee.Reducer.mean(),
  kernel: ee.Kernel.circle(500, 'meters'),
})
Map.addLayer(ind_con, {min: 0, max: 1, palette: ['#98ff00', '#d63000']}, 'indice_Construido', false)
// Reclasificación Vegetacion
var vegetacion = classified.remap([1,2,3,4],[0,1,0,0]);
var pal_vegetacion = [
'#8b867f',//CLASE 0, no vegetacion
'#71bf00',//CLASE 1, vegetacion (verde)
];
//Map.addLayer (vegetacion, {min:0,max:1,palette:pal_vegetacion},'vegetacion')
// Calculo de Entorno Vegetacion
var ind_Veg = vegetacion.reduceNeighborhood({
  reducer: ee.Reducer.mean(),
  kernel: ee.Kernel.circle(500, 'meters'),
})
Map.addLayer(ind_Veg, {min: 0, max: 1, palette: ['#ff160b', '#71bf00']}, 'indice_Vegetacion', false)
// Calculo de Entorno BCI
var e_BCI = BCI.reduceNeighborhood({
  reducer: ee.Reducer.mean(),
  kernel: ee.Kernel.circle(500, 'meters'),
})
// Calculo de Entorno NDBI
var e_NDBI = NDBI.reduceNeighborhood({
  reducer: ee.Reducer.mean(),
  kernel: ee.Kernel.circle(500, 'meters'),
})
// Calculo de Entorno UI
var e_UI = UI.reduceNeighborhood({
  reducer: ee.Reducer.mean(),
  kernel: ee.Kernel.circle(500, 'meters'),
})
// Calculo de Entorno RNDSI
var e_RNDSI = RNDSI.reduceNeighborhood({
  reducer: ee.Reducer.mean(),
  kernel: ee.Kernel.circle(500, 'meters'),
})
//Agrego bandas
var indices = ee.Image(ind_con).addBands(ind_Veg).addBands(e_BCI).addBands(e_RNDSI).addBands(e_UI).addBands(e_NDBI).rename('ind_con','ind_Veg','e_BCI','e_RNDSI','e_UI','e_NDBI')
var indicef = indices.toFloat()
Map.addLayer (indicef, {bands: ['ind_con','ind_Veg','e_BCI'], min: [0,0,0], max: [1, 1,1] }, 'indices', false);
//Histograma 
var histogram = ui.Chart.image.histogram({
  image: RNDSI,
  region: poligono,
  scale: 10
});
histogram.setOptions({
  title: 'Histogram RNDSI - Aglomerado "Alta Gracias - Anisacate"',
  fontSize: 20,
  hAxis: {title:'RNDSI'},
  vAxis: {title: 'Frecuencia'},
  series: { 0: {color: 'green'}},
});
print(histogram)
/*
//Elijo cualquiera de las bandas de mi mosaico y hago una imagen de 1 banda
Export.image.toDrive({
  image: construido,
  description: 'construido_AltaGracia_Anisacate',
  scale: 10,
  region: AltaGracia_Anisacate, // usar: AltaGracia_Anisacate Cordoba-- para exportar todo
  maxPixels: 1e13
});
Export.image.toDrive({
  image: ind_con,
  description: 'ind_con_AltaGracia_Anisacate',
  scale: 10,
  region: AltaGracia_Anisacate, // usar: AltaGracia_Anisacate Cordoba-- para exportar todo
  maxPixels: 1e13
});
Export.image.toDrive({
  image: e_BCI,
  description: 'e_bci_AltaGracia_Anisacate',
  scale: 10,
  region: AltaGracia_Anisacate, // usar: AltaGracia_Anisacate Cordoba-- para exportar todo
  maxPixels: 1e13
});
Export.image.toDrive({
  image: e_RNDSI,
  description: 'e_rndsi_AltaGracia_Anisacate',
  scale: 10,
  region: AltaGracia_Anisacate, // usar: AltaGracia_Anisacate Cordoba-- para exportar todo
  maxPixels: 1e13
});
Export.image.toDrive({
  image: e_UI,
  description: 'e_ui_AltaGracia_Anisacate',
  scale: 10,
  region: AltaGracia_Anisacate, // usar: AltaGracia_Anisacate Cordoba-- para exportar todo
  maxPixels: 1e13
});
Export.image.toDrive({
  image: e_NDBI,
  description: 'e_ndbi_AltaGracia_Anisacate',
  scale: 10,
  region: AltaGracia_Anisacate, // usar: AltaGracia_Anisacate Cordoba-- para exportar todo
  maxPixels: 1e13
});
Export.image.toDrive({
  image: ind_Veg,
  description: 'ind_veg_AltaGracia_Anisacate',
  scale: 10,
  region: AltaGracia_Anisacate, // usar: AltaGracia_Anisacate Cordoba-- para exportar todo
  maxPixels: 1e13
});
*/