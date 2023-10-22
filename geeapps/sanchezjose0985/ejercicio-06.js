//Introducción a la modelación de Riesgos o Susceptibilidad a Incendios Forestales
//En el siguiente enlace se puede consultar un caso de esdudio:
//https://www.tandfonline.com/doi/full/10.1080/19475705.2016.1278404
//Taller GEE
//Introduccion a la odelacion de riesgos o susceptibilidad a incendios forestales
//Entradasde informacion para el modelo de incendios
var Panama = ee.FeatureCollection("ft:1YBckFpGA306ZcR_Dw8M9nkTSPCQ-6nzfYfYG1jjB");
var incendios_hist = ee.FeatureCollection  ("ft:1TLo6CdVkCWPKpL1gDMjEEh6K8G3wDi_Z5c2-NTht").filterMetadata('Meses', 'equals', 'Marzo'); //incendios valores 1
var incendios_alea = ee.FeatureCollection ("ft:1TLo6CdVkCWPKpL1gDMjEEh6K8G3wDi_Z5c2-NTht").filterMetadata('Meses', 'equals', 'random');//muestras no incend valores 0
var Prox_carreteras = ee.Image("users/omarorellanahn/proxim_carreteras");
var Prox_rios = ee.Image("users/omarorellanahn/proxim_rios");
var Prox_urbano = ee.Image("users/omarorellanahn/proxim_urbano");
var Reflectancia = ee.ImageCollection('MODIS/006/MOD09A1'); //Sequia
var NDVI_colleccion = ee.ImageCollection('MODIS/006/MOD13A1');
var Temperatura = ee.ImageCollection('MODIS/006/MOD11A2');
var Elevaciones = ee.Image("USGS/SRTMGL1_003"); //DTM
//var Precipitacion_diaria = ee.ImageCollection('UCSB-CHG/CHIRPS/DAILY');
var Precipitacion_diaria = ee.ImageCollection('JAXA/GPM_L3/GSMaP/v6/operational');
var Radiacion_coleccion = ee.ImageCollection('NOAA/GFS0P25');
var FIRMS_colection = ee.ImageCollection('FIRMS');
//Filtro por fecha
//filtro por mes
var inicio_mes="2018-03-01"
var final_mes="2018-03-31"
//Procesamiento de capas (capas)
//elevacion
var DEM = Elevaciones.clip(Panama);
//Pendiente
var Pendiente= ee.Algorithms.Terrain(Elevaciones).select("slope").clip(Panama);
//Temperatura de la superficie
var Temp_LST_Day_K=Temperatura.select("LST_Day_1km"); //Temperatura en unidades kelvin
//filtro para temperatura por fecha para Panama
var Filtro_Temperatura=ee.ImageCollection(Temp_LST_Day_K.filterDate(inicio_mes,final_mes));
//calcular media de la tempratura
var Media_Temperatura=Filtro_Temperatura.mean().clip(Panama).rename("grados k");
//calculo del NDVI Indice de vegetacion diferencial normalizado
var modisNDVI =NDVI_colleccion.select("NDVI","SummaryQA")
                              .filterDate(inicio_mes,final_mes)
                              .map(function(image){return image.multiply(0.0001).clip(Panama)}); //para retornar a imagen
//Enmascarar NDVI por Nube
var MaskCloud=function(image){var quality=image.select("SummaryQA");var mask=quality.eq(3).not();return image.updateMask(mask)};
var NDVI_mask=modisNDVI.map(MaskCloud).select("NDVI").min();
//Precipitacion
var Precipitacion_fecha=Precipitacion_diaria.filterDate(inicio_mes,final_mes)
                                            .select("hourlyPrecipRateGC");
// Acumulado de la precipitacion mensual
var sumaP=Precipitacion_fecha.sum().clip(Panama);
//calcular el indice de sequia o de humedad (NMDI)
var FiltroNMDI=Reflectancia.filterDate(inicio_mes,final_mes).filterBounds(Panama);
print(FiltroNMDI);
var ima_NMDI=ee.Image("MODIS/006/MOD09A1/2018_03_30").clip(Panama);
var NMDI=ima_NMDI.expression("(b2-(b6-b7))/(b2+(b6-b7))",{"b2":ima_NMDI.select("sur_refl_b02"),
"b6":ima_NMDI.select("sur_refl_b06"),
"b7":ima_NMDI.select("sur_refl_b07")}).rename("NMDI");
//Radiacion
var radiacion=Radiacion_coleccion.filterDate(inicio_mes,final_mes).filter(ee.Filter.eq("forecast_hours",13));
var Rmedia=radiacion.select("downward_shortwave_radiation_flux").mean().clip(Panama);
//1.Proceso de modelacion a riesgo a incendios
//1.1. Mosaico de todas las capas
var Mosaicos_capas=Prox_carreteras.addBands(Prox_rios)
                                  .addBands(Prox_urbano)
                                  .addBands(DEM)
                                  .addBands(Pendiente)
                                  .addBands(Media_Temperatura)
                                  .addBands(NDVI_mask)
                                  .addBands(sumaP)
                                  .addBands(NMDI)
                                  .addBands(Rmedia);
//1.2. Nombramiento y separacion de bandas
var Nombre_Bandas=Mosaicos_capas.bandNames();
//1.3. Unir las muestras
var Muestras=incendios_hist.randomColumn().merge(incendios_alea.randomColumn());
//1.4. Regiones de entrenamiento
var Regiones_entrenamiento=Mosaicos_capas.reduceRegions({collection:Muestras,reducer:"mean",scale:10000});
//1.4.1. Excluir valores nulos de las capas
Regiones_entrenamiento=Regiones_entrenamiento.filter(
                                              ee.Filter.and(
                                              ee.Filter.neq("NDVI",null),
                                              ee.Filter.neq("b1",null)));
//1.5. Entrenar con un clasificador
var clasificador=ee.Classifier.randomForest(50).train(Regiones_entrenamiento,"Ocurrencia",Nombre_Bandas).setOutputMode("PROBABILITY");
//1.6. Hacer la modelacion
var clasificacion=Mosaicos_capas.classify(clasificador);
//Visualizacion de capas base
Map.addLayer(Prox_carreteras,{min: 0, max: 20000, palette: ["red","green"]},"Carreteras",false);
Map.addLayer(Prox_rios,{min: 0, max: 20000, palette: ["blue","green"]},"Rios",false);
Map.addLayer(Prox_urbano,{min: 0, max: 20000, palette: ["red","yellow"]},"Poblados",false);
// Visualizacion de variables calculadas
Map.addLayer(DEM,{min: 0, max: 3475, palette: ["gray","black"]},"Elevaciones",false);
Map.addLayer(Pendiente,{min: 0, max: 30, palette: ["yellow","purple"]},"Pendientes",false);
Map.addLayer(Media_Temperatura,{min: 14500, max: 15000, palette: ["blue","red"]},"Temperatura media",false);
Map.addLayer(NDVI_mask,{min: 0, max: 1, palette: ["green","red"]},"NDVI",false);
Map.addLayer(sumaP,{min: 0, max: 30, palette: ["red","blue"]},"Precipitacion",false);
Map.addLayer(NMDI,{min: 0, max: 1, palette: ["red","blue"]},"NMDI",false);
Map.addLayer(Rmedia,{min: 100, max: 500, palette: ["yellow","red"]},"Radiacion Media",false);
//1.7 Visualizacion de Riesgo incendios
Map.addLayer(clasificacion,{min: 0, max: 1, palette: ["green","yellow","red"]},"Riesgo de Incendio",false);
//Descargar Mosaicos//
/*Export.image.toDrive
({image: clasificacion,
 description: 'Riesgo de Incendio',
 fileNamePrefix: 'Riesgo de Incendio',
 scale:500,
 maxPixels: 1e12,});*/