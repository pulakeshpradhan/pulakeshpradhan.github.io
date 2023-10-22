var logo_Observatorio = ui.import && ui.import("logo_Observatorio", "image", {
      "id": "users/observatorionieves/Logos/Logo_Observatorio"
    }) || ee.Image("users/observatorionieves/Logos/Logo_Observatorio"),
    logo_TeleAmb = ui.import && ui.import("logo_TeleAmb", "image", {
      "id": "users/observatorionieves/Logos/Logo_Teleamb"
    }) || ee.Image("users/observatorionieves/Logos/Logo_Teleamb"),
    aconcagua_cuenca = ui.import && ui.import("aconcagua_cuenca", "table", {
      "id": "users/observatorionieves/DGA/aconcagua_cuenca"
    }) || ee.FeatureCollection("users/observatorionieves/DGA/aconcagua_cuenca"),
    aconcagua_ms = ui.import && ui.import("aconcagua_ms", "table", {
      "id": "users/observatorionieves/DGA/aconcagua_subsubcuencas_ms"
    }) || ee.FeatureCollection("users/observatorionieves/DGA/aconcagua_subsubcuencas_ms"),
    LC_terra = ui.import && ui.import("LC_terra", "imageCollection", {
      "id": "users/observatorionieves/MODIS/Aconcagua_MODcollection_LC_00"
    }) || ee.ImageCollection("users/observatorionieves/MODIS/Aconcagua_MODcollection_LC_00"),
    LC_aqua = ui.import && ui.import("LC_aqua", "imageCollection", {
      "id": "users/observatorionieves/MODIS/Aconcagua_MYDcollection_LC_00"
    }) || ee.ImageCollection("users/observatorionieves/MODIS/Aconcagua_MYDcollection_LC_00"),
    Step_01 = ui.import && ui.import("Step_01", "imageCollection", {
      "id": "users/observatorionieves/MODIS/Aconcagua_collectionTAC_CR_01"
    }) || ee.ImageCollection("users/observatorionieves/MODIS/Aconcagua_collectionTAC_CR_01"),
    Step_02 = ui.import && ui.import("Step_02", "imageCollection", {
      "id": "users/observatorionieves/MODIS/Aconcagua_collectionTAC_CR_02"
    }) || ee.ImageCollection("users/observatorionieves/MODIS/Aconcagua_collectionTAC_CR_02"),
    Step_03 = ui.import && ui.import("Step_03", "imageCollection", {
      "id": "users/observatorionieves/MODIS/Aconcagua_collectionTAC_CR_03"
    }) || ee.ImageCollection("users/observatorionieves/MODIS/Aconcagua_collectionTAC_CR_03"),
    Step_04 = ui.import && ui.import("Step_04", "imageCollection", {
      "id": "users/observatorionieves/MODIS/Aconcagua_collectionTAC_CR_04"
    }) || ee.ImageCollection("users/observatorionieves/MODIS/Aconcagua_collectionTAC_CR_04"),
    Step_05 = ui.import && ui.import("Step_05", "imageCollection", {
      "id": "users/observatorionieves/MODIS/Aconcagua_collectionTAC_CR_05"
    }) || ee.ImageCollection("users/observatorionieves/MODIS/Aconcagua_collectionTAC_CR_05"),
    Step_06 = ui.import && ui.import("Step_06", "imageCollection", {
      "id": "users/observatorionieves/MODIS/Aconcagua_collectionTAC_CR_06"
    }) || ee.ImageCollection("users/observatorionieves/MODIS/Aconcagua_collectionTAC_CR_06");
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// A través de un panel este código presenta información mensual: 
// Seis pasos de reducción de nubes basado en los autores de Gafurov y Bárdossy
// Selección personalizada por subsubcuencas sección media-superior cuenca del Río Aconcagua
// Autora: Yael Aguirre
// Actualizado 29/09/22
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------------------------------------------------------------------------------
/////////////////////////////// DATOS DE ENTRADA (Asset steps) ////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------------------------------------------------------------------------------
// Importamos los Assets de los pasos CR y filtramos por el año 2009
var LCT  = LC_terra.filterDate('2009-01-01','2010-01-01');
var LCA  = LC_aqua.filterDate('2009-01-01','2010-01-01');
var ST01 = Step_01.filterDate('2009-01-01','2010-01-01');
var ST02 = Step_02.filterDate('2009-01-01','2010-01-01');
var ST03 = Step_03.filterDate('2009-01-01','2010-01-01');
var ST04 = Step_04.filterDate('2009-01-01','2010-01-01');
var ST05 = Step_05.filterDate('2009-01-01','2010-01-01');
var ST06 = Step_06.filterDate('2009-01-01','2010-01-01');
//-----------------------------------------------------------------------------------------------------------------------------------------------------------
///////////////////////////////////////// FUNCIONES ////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------------------------------------------------------------------------------
// Función para Land Cover
var LC = function(image) {
  var cloud = image.select('LandCover_class').eq(0).multiply(100).rename('LC_cloud');
  var snow  = image.select('LandCover_class').eq(100).multiply(100).rename('LC_snow');
  return image.addBands(cloud).addBands(snow);
};
// Función para TAC
var TAC = function(image){
  var cloud = image.select('TAC').eq(0).multiply(100).rename('TAC_cloud');
  var snow = image.select('TAC').eq(100).multiply(100).rename('TAC_snow');
  return image.addBands(cloud).addBands(snow);
};
//-----------------------------------------------------------------------------------------------------------------------------------------------------------
//////////////////////////////////// COLECCIONES ////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------------------------------------------------------------------------------
// Aplicar la función a la colección terra cloud
var Step00_LC_terra_c = LCT.map(LC).select(['LC_cloud'],['Step00_LC_terra_cloud']);
// Aplicar la función a la colección terra snow
var Step00_LC_terra_s = LCT.map(LC).select(['LC_snow'],['Step00_LC_terra_snow']);
// Aplicar la función a la colección aqua cloud
var Step00_LC_aqua_c = LCA.map(LC).select(['LC_cloud'],['Step00_LC_aqua_cloud']);
// Aplicar la función a la colección aqua anow
var Step00_LC_aqua_s = LCA.map(LC).select(['LC_snow'],['Step00_LC_aqua_snow']);
// Aplicar la función a la colección paso 1 cloud
var Step01_c = ST01.map(TAC).select(['TAC_cloud'],['Step01_cloud']);
// Aplicar la función a la colección paso 1 cloud
var Step01_s = ST01.map(TAC).select(['TAC_snow'],['Step01_snow']);
// Aplicar la función a la colección paso 2 cloud
var Step02_c = ST02.map(TAC).select(['TAC_cloud'],['Step02_cloud']);
// Aplicar la función a la colección paso 2 snow
var Step02_s = ST02.map(TAC).select(['TAC_snow'],['Step02_snow']);
// Aplicar la función a la colección paso 3 cloud
var Step03_c = ST03.map(TAC).select(['TAC_cloud'],['Step03_cloud']);
// Aplicar la función a la colección paso 3 snow
var Step03_s = ST03.map(TAC).select(['TAC_snow'],['Step03_snow']);
// Aplicar la función a la colección paso 4 cloud
var Step04_c = ST04.map(TAC).select(['TAC_cloud'],['Step04_cloud']);
// Aplicar la función a la colección paso 4 snow
var Step04_s = ST04.map(TAC).select(['TAC_snow'],['Step04_snow']);
// Aplicar la función a la colección paso 5 cloud
var Step05_c = ST05.map(TAC).select(['TAC_cloud'],['Step05_cloud']);
// Aplicar la función a la colección paso 5 snow
var Step05_s = ST05.map(TAC).select(['TAC_snow'],['Step05_snow']);
// Aplicar la función a la colección paso 6 cloud
var Step06_c = ST06.map(TAC).select(['TAC_cloud'],['Step06_cloud']);
// Aplicar la función a la colección paso 6 snow
var Step06_s = ST06.map(TAC).select(['TAC_snow'],['Step06_snow']);
// Ordena la colección de mayor a menor
var MODISsorted = Step01_s.sort('system:time_start', false).first();
//print('Última imagen actual', MODISsorted);
var currentDate = ee.Date(MODISsorted.get('system:time_start'));
//print('Día actual',currentDate);
// Muestra el día y año más actual
var DOYcurrent = currentDate.getRelative('day', 'year');
//print('DOYcurrent',DOYcurrent);
var YearCurrent = currentDate.get('year');
//print('Yearcurrent',YearCurrent);
// Months time range.
var months = ee.List.sequence(1, 12);
// Red hídrica
var streamflow = ee.FeatureCollection("WWF/HydroSHEDS/v1/FreeFlowingRivers")
                   .filter(ee.Filter.eq('BAS_ID', 3975615))
                   .style({color: "B2B2B3", width: 2.0,});
// Construye una imagen vacía para utilizarla en el contorno del ROI
var empty = ee.Image().byte();
var outlineC = empty.paint({
    featureCollection: aconcagua_cuenca,
    color: 1,
    width: 1
    });
var outlineSSC = empty.paint({
    featureCollection: aconcagua_ms,
    color: 1,
    width: 1
    });
var umbralNDSI = 40;
// Add colorbars, default hidden.
var SCFpaletteLabels = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
var palette_scf = 'ffffff,ffffd9,edf8b1,c7e9b4,7fcdbb,41b6c4,1d91c0,225ea8,253494,081d58';
var visParams = {
  min: 0.0,
  max: 100.0,
  palette: palette_scf,
};
// Variable para presentarla al inicio en el mapa
var mean = Step06_s.select('Step06_snow').mean().clip(aconcagua_ms);
//---------------------------------------------------------------------------------------------------------------------------------------------------------
//////////////////////////// PARÁMETROS DE VISUALIZACIÓN /////////////////////////////////////////////////////////////////////////////////////
//----------------------------------------------------------------------------------------------------------------------------------------------------------
 Map.addLayer(mean.clip(aconcagua_ms),visParams, 'SCI');
 Map.addLayer(streamflow,{}, 'Red hídrica');
 Map.addLayer(outlineC, {palette: 'FF0000'}, 'Cuenca Río Aconcagua');
 Map.addLayer(outlineSSC,{},' Sección media-superior cuenca del Río Aconcagua');
 Map.setCenter(-70.4381, -32.7502, 8);
 Map.setOptions('Satellite');
//---------------------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////// ENTIDADES ///////////////////////////////////////////////////////////////////////////////////
//---------------------------------------------------------------------------------------------------------------------------------
// Define subsubwatershed subsubcuencas aconcagua ms 
var ssc05400 = aconcagua_ms.filter(ee.Filter.eq('COD_SSUBC', '05400')); //05400, Rio Juncal antes junta Estero Juncalillo
var ssc05401 = aconcagua_ms.filter(ee.Filter.eq('COD_SSUBC', '05401')); //05401, Rio Juncal Antes Junta Estero Juncalillo y Junta Rio Blanco
var ssc05402 = aconcagua_ms.filter(ee.Filter.eq('COD_SSUBC', '05402')); //05402, Rio Blanco
var ssc05403 = aconcagua_ms.filter(ee.Filter.eq('COD_SSUBC', '05403')); //05403, Rio Aconcagua entre Rio Blanco y Rio Colorado
var ssc05404 = aconcagua_ms.filter(ee.Filter.eq('COD_SSUBC', '05404')); //05404, Rio Colorado antes junta Estero Riecillos
var ssc05405 = aconcagua_ms.filter(ee.Filter.eq('COD_SSUBC', '05405')); //05405, Estero Riecillos
var ssc05406 = aconcagua_ms.filter(ee.Filter.eq('COD_SSUBC', '05406')); //05406, Rio Colorado Entre Estero Riecillos y Rio Aconcagua
var ssc05410 = aconcagua_ms.filter(ee.Filter.eq('COD_SSUBC', '05410')); //05410, Rio Aconcagua entre Rio Colorado y Rio Putaendo
var ssc05411 = aconcagua_ms.filter(ee.Filter.eq('COD_SSUBC', '05411')); //05411, Estero Pocuro
var ssc05412 = aconcagua_ms.filter(ee.Filter.eq('COD_SSUBC', '05412')); //05412, Rio Putaendo bajo junta Rio Hidalgo
var ssc05413 = aconcagua_ms.filter(ee.Filter.eq('COD_SSUBC', '05413')); //05413, Rio Putaendo Entre Rio Hidalgo y Bajo Junta Estero Chalaco
var ssc05414 = aconcagua_ms.filter(ee.Filter.eq('COD_SSUBC', '05414')); //05414, Rio Putaendo Entre Estero Chalaco y Rio Aconcagua
var ssc05415 = aconcagua_ms.filter(ee.Filter.eq('COD_SSUBC', '05415')); //05415, Estero Quilpué
var ssc05416 = aconcagua_ms.filter(ee.Filter.eq('COD_SSUBC', '05416')); //05416, Estero Seco
//---------------------------------------------------------------------------------------------------------------------------------
////////////////////////////////////////  REDUCCIÓN MENSUAL ///////////////////////////////////////////////////////////////////////////////////
//---------------------------------------------------------------------------------------------------------------------------------
// Step00 terra cloud monthly 
var Step00_LC_terra_cloudByMonth = ee.ImageCollection.fromImages(
  months.map(function(m) {
    return Step00_LC_terra_c
    .filter(ee.Filter.calendarRange(m, m, 'month'))
    .mean()
    .set('month', m);
  }).flatten());
// Step00 terra snow monthly 
var Step00_LC_terra_snowByMonth = ee.ImageCollection.fromImages(
  months.map(function(m) {
    return Step00_LC_terra_s
    .filter(ee.Filter.calendarRange(m, m, 'month'))
    .mean()
    .set('month', m);
  }).flatten());
// Step00 aqua cloud monthly 
var Step00_LC_aqua_cloudByMonth = ee.ImageCollection.fromImages(
  months.map(function(m) {
    return Step00_LC_aqua_c
    .filter(ee.Filter.calendarRange(m, m, 'month'))
    .mean()
    .set('month', m);
  }).flatten());
// Step00 aqua snow monthly 
var Step00_LC_aqua_snowByMonth = ee.ImageCollection.fromImages(
  months.map(function(m) {
    return Step00_LC_aqua_s
    .filter(ee.Filter.calendarRange(m, m, 'month'))
    .mean()
    .set('month', m);
  }).flatten());
// Step01 cloud monthly 
var Step01_TAC_cloudByMonth = ee.ImageCollection.fromImages(
  months.map(function(m) {
    return Step01_c
    .filter(ee.Filter.calendarRange(m, m, 'month'))
    .mean()
    .set('month', m);
  }).flatten());
// Step01 snow monthly
var Step01_TAC_snowByMonth = ee.ImageCollection.fromImages(
  months.map(function(m) {
    return Step01_s
    .filter(ee.Filter.calendarRange(m, m, 'month'))
    .mean()
    .set('month', m);
  }).flatten());
// Step02 cloud monthly 
var Step02_TAC_cloudByMonth = ee.ImageCollection.fromImages(
  months.map(function(m) {
    return Step02_c
    .filter(ee.Filter.calendarRange(m, m, 'month'))
    .mean()
    .set('month', m);
  }).flatten());
// Step02 snow monthly
var Step02_TAC_snowByMonth = ee.ImageCollection.fromImages(
  months.map(function(m) {
    return Step02_s
    .filter(ee.Filter.calendarRange(m, m, 'month'))
    .mean()
    .set('month', m);
  }).flatten());
// Step3 cloud monthly 
var Step03_TAC_cloudByMonth = ee.ImageCollection.fromImages(
  months.map(function(m) {
    return Step03_c
    .filter(ee.Filter.calendarRange(m, m, 'month'))
    .mean()
    .set('month', m);
  }).flatten());
// Step03 snow monthly
var Step03_TAC_snowByMonth = ee.ImageCollection.fromImages(
  months.map(function(m) {
    return Step03_s
    .filter(ee.Filter.calendarRange(m, m, 'month'))
    .mean()
    .set('month', m);
  }).flatten());
// Step04 cloud monthly 
var Step04_TAC_cloudByMonth = ee.ImageCollection.fromImages(
  months.map(function(m) {
    return Step04_c
    .filter(ee.Filter.calendarRange(m, m, 'month'))
    .mean()
    .set('month', m);
  }).flatten());
// Step04 snow monthly
var Step04_TAC_snowByMonth = ee.ImageCollection.fromImages(
  months.map(function(m) {
    return Step04_s
    .filter(ee.Filter.calendarRange(m, m, 'month'))
    .mean()
    .set('month', m);
  }).flatten());
  // Step05 cloud monthly 
var Step05_TAC_cloudByMonth = ee.ImageCollection.fromImages(
  months.map(function(m) {
    return Step05_c
    .filter(ee.Filter.calendarRange(m, m, 'month'))
    .mean()
    .set('month', m);
  }).flatten());
// Step05 snow monthly
var Step05_TAC_snowByMonth = ee.ImageCollection.fromImages(
  months.map(function(m) {
    return Step05_s
    .filter(ee.Filter.calendarRange(m, m, 'month'))
    .mean()
    .set('month', m);
  }).flatten());
// Step06 cloud monthly 
var Step06_TAC_cloudByMonth = ee.ImageCollection.fromImages(
  months.map(function(m) {
    return Step06_c
    .filter(ee.Filter.calendarRange(m, m, 'month'))
    .mean()
    .set('month', m);
  }).flatten());
// GB06 snow monthly
var Step06_TAC_snowByMonth = ee.ImageCollection.fromImages(
  months.map(function(m) {
    return Step06_s
    .filter(ee.Filter.calendarRange(m, m, 'month'))
    .mean()
    .set('month', m);
  }).flatten());
//---------------------------------------------------------------------------------------------------------------------------------
//////////////////////////// UNIONES Terra + Aqua ////////////////////////////////////////////////////////////////////
//------------------------------------------------------------------------------------------------------------------------------
// Definir una unión entre Terra y Aqua 
var innerJoin = ee.Join.inner();
// Especifique un filtro igual para las marcas de tiempo de las imágenes
var filterTimeEq = ee.Filter.equals({
  leftField: 'month',
  rightField: 'month'
});
// Aplicar unión
var join_TAC_cloud_T_A_Step00 = innerJoin.apply(Step00_LC_terra_cloudByMonth, Step00_LC_aqua_cloudByMonth, filterTimeEq);
// Asignar una función para fusionar los resultados en la FeatureCollection de salida  
var joined_LC_cloud_T_A_Step00 = ee.ImageCollection(join_TAC_cloud_T_A_Step00.map(function(feature) {
  return ee.Image.cat(feature.get('primary'), feature.get('secondary'));
}));
//---------------------------------------------------------------------------------------------------------------------------------
//////////////////////////// INNER JOIN TAC CLOUD MONTHLY Step00 y Step01 ////////////////////////////////////////////////////////////////////
//------------------------------------------------------------------------------------------------------------------------------
// Aplicar unión
var join_TAC_cloud_Step00_Step01 = innerJoin.apply(joined_LC_cloud_T_A_Step00, Step01_TAC_cloudByMonth, filterTimeEq);
// Asignar una función para fusionar los resultados en la FeatureCollection de salida  
var joined_TAC_cloud_Step00_Step01 = ee.ImageCollection(join_TAC_cloud_Step00_Step01.map(function(feature) {
  return ee.Image.cat(feature.get('primary'), feature.get('secondary'));
}));
//---------------------------------------------------------------------------------------------------------------------------------
////////////////////////////// UNIONES CLOUD MONTHLY Step01 y Step02 ////////////////////////////////////////////////////////////////////
//------------------------------------------------------------------------------------------------------------------------------
// Aplicar unión
var join_TAC_cloud_Step01_Step02 = innerJoin.apply(joined_TAC_cloud_Step00_Step01, Step02_TAC_cloudByMonth, filterTimeEq);
// Asignar una función para fusionar los resultados en la FeatureCollection de salida  
var joined_TAC_cloud_Step01_Step02 = ee.ImageCollection(join_TAC_cloud_Step01_Step02.map(function(feature) {
  return ee.Image.cat(feature.get('primary'), feature.get('secondary'));
}));
//---------------------------------------------------------------------------------------------------------------------------------
////////////////////////////// UNIONES TAC CLOUD MONTHLY Step01, Step02 y Step03 ////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------------------------------------------------
// Aplicar unión
var join_TAC_cloud_Step01_Step02_Step03 = innerJoin.apply(joined_TAC_cloud_Step01_Step02, Step03_TAC_cloudByMonth, filterTimeEq);
// Asignar una función para fusionar los resultados en la FeatureCollection de salida  
var joined_TAC_cloud_Step01_Step02_Step03 = ee.ImageCollection(join_TAC_cloud_Step01_Step02_Step03.map(function(feature) {
  return ee.Image.cat(feature.get('primary'), feature.get('secondary'));
}));
//---------------------------------------------------------------------------------------------------------------------------------
////////////////////////////// UNIONES TAC CLOUD MONTHLY Step01, Step02, Step03 y Step04 ////////////////////////////////////////////////////////////////////
//------------------------------------------------------------------------------------------------------------------------------
// Aplicar unión
var join_TAC_cloud_Step01_Step02_Step03_Step04 = innerJoin.apply(joined_TAC_cloud_Step01_Step02_Step03, Step04_TAC_cloudByMonth, filterTimeEq);
// Asignar una función para fusionar los resultados en la FeatureCollection de salida  
var joined_TAC_cloud_Step01_Step02_Step03_Step04 = ee.ImageCollection(join_TAC_cloud_Step01_Step02_Step03_Step04.map(function(feature) {
  return ee.Image.cat(feature.get('primary'), feature.get('secondary'));
}));
//---------------------------------------------------------------------------------------------------------------------------------
////////////////////////////// UNIONES TAC CLOUD MONTHLY Step01, Step02, Step03, Step04 y Step05 ////////////////////////////////////////////////////////////////////
//------------------------------------------------------------------------------------------------------------------------------
// Aplicar unión
var join_TAC_cloud_Step01_Step02_Step03_Step04_Step05 = innerJoin.apply(joined_TAC_cloud_Step01_Step02_Step03_Step04, Step05_TAC_cloudByMonth, filterTimeEq);
// Asignar una función para fusionar los resultados en la FeatureCollection de salida  
var joined_TAC_cloud_Step01_Step02_Step03_Step04_Step05 = ee.ImageCollection(join_TAC_cloud_Step01_Step02_Step03_Step04_Step05.map(function(feature) {
  return ee.Image.cat(feature.get('primary'), feature.get('secondary'));
}));
// print('Colección TAC cloud Step01, Step02, Step03, Step04 y Step05:', joined_TAC_cloud_Step01_Step02_Step03_Step04_Step05.first());
//---------------------------------------------------------------------------------------------------------------------------------
////////////////////////////// UNIONES TAC CLOUD MONTHLY Step01, Step02, Step03, Step04, Step05 y Step06 ////////////////////////////////////////////////////////////////////
//------------------------------------------------------------------------------------------------------------------------------
// Aplicar unión
var join_TAC_cloud_Step01_Step02_Step03_Step04_Step05_Step06 = innerJoin.apply(joined_TAC_cloud_Step01_Step02_Step03_Step04_Step05, Step06_TAC_cloudByMonth, filterTimeEq);
// Asignar una función para fusionar los resultados en la FeatureCollection de salida  
var All_steps_cloud = ee.ImageCollection(join_TAC_cloud_Step01_Step02_Step03_Step04_Step05_Step06.map(function(feature) {
  return ee.Image.cat(feature.get('primary'), feature.get('secondary'));
}));
//---------------------------------------------------------------------------------------------------------------------------------
//////////////////////////// UNIONES TAC SNOW MONTHLY Step00 Terra + Aqua ////////////////////////////////////////////////////////////////////
//------------------------------------------------------------------------------------------------------------------------------
// Aplicar unión
var join_TAC_snow_T_A_Step00 = innerJoin.apply(Step00_LC_terra_snowByMonth, Step00_LC_aqua_snowByMonth, filterTimeEq);
// Asignar una función para fusionar los resultados en la FeatureCollection de salida  
var joined_LC_snow_T_A_Step00 = ee.ImageCollection(join_TAC_snow_T_A_Step00.map(function(feature) {
  return ee.Image.cat(feature.get('primary'), feature.get('secondary'));
}));
//---------------------------------------------------------------------------------------------------------------------------------
////////////////////////////////////// UNIONES TAC SNOW MONTHLY Step00 y Step01  ////////////////////////////////////////////////////////////////////
//------------------------------------------------------------------------------------------------------------------------------
// Aplicar unión
var join_TAC_snow_Step00_GB01 = innerJoin.apply(joined_LC_snow_T_A_Step00, Step01_TAC_snowByMonth, filterTimeEq);
// Asignar una función para fusionar los resultados en la FeatureCollection de salida  
var joined_TAC_snow_Step00_Step01 = ee.ImageCollection(join_TAC_snow_Step00_GB01.map(function(feature) {
  return ee.Image.cat(feature.get('primary'), feature.get('secondary'));
}));
//---------------------------------------------------------------------------------------------------------------------------------
////////////////////////////// UNIONES TAC SNOW MONTHLY Step01, Step01 y Step02 ////////////////////////////////////////////////////////////////////
//------------------------------------------------------------------------------------------------------------------------------
// Aplicar unión
var join_TAC_snow_Step00_Step01_Step02 = innerJoin.apply(joined_TAC_snow_Step00_Step01, Step02_TAC_snowByMonth, filterTimeEq);
// Asignar una función para fusionar los resultados en la FeatureCollection de salida  
var joined_TAC_snow_Step00_Step01_Step02 = ee.ImageCollection(join_TAC_snow_Step00_Step01_Step02.map(function(feature) {
  return ee.Image.cat(feature.get('primary'), feature.get('secondary'));
}));
//---------------------------------------------------------------------------------------------------------------------------------
////////////////////////////// UNIONES TAC SNOW MONTHLY Step01, Step02, Step03 y Step04 ////////////////////////////////////////////////////////////////////
//------------------------------------------------------------------------------------------------------------------------------
// Aplicar unión
var join_TAC_snow_Step00_Step01_Step02_Step03 = innerJoin.apply(joined_TAC_snow_Step00_Step01_Step02, Step03_TAC_snowByMonth, filterTimeEq);
// Asignar una función para fusionar los resultados en la FeatureCollection de salida  
var joined_TAC_snow_Step00_Step01_Step02_Step03 = ee.ImageCollection(join_TAC_snow_Step00_Step01_Step02_Step03.map(function(feature) {
  return ee.Image.cat(feature.get('primary'), feature.get('secondary'));
}));
//---------------------------------------------------------------------------------------------------------------------------------
////////////////////////////// UNIONES TAC SNOW MONTHLY Step00, Step01, Step02, Step03 y Step04////////////////////////////////////////////////////////////////////
//------------------------------------------------------------------------------------------------------------------------------
// Aplicar unión
var join_TAC_snow_Step00_Step01_Step02_Step03_Step04 = innerJoin.apply(joined_TAC_snow_Step00_Step01_Step02_Step03, Step04_TAC_snowByMonth, filterTimeEq);
// Asignar una función para fusionar los resultados en la FeatureCollection de salida  
var joined_TAC_snow_Step00_Step01_Step02_Step03_Step04 = ee.ImageCollection(join_TAC_snow_Step00_Step01_Step02_Step03_Step04.map(function(feature) {
  return ee.Image.cat(feature.get('primary'), feature.get('secondary'));
}));
//---------------------------------------------------------------------------------------------------------------------------------
////////////////////////////// UNIONES TAC SNOW MONTHLY Step00, Step01, Step02, Step03, Step04 y Step05////////////////////////////////////////////////////////////////////
//------------------------------------------------------------------------------------------------------------------------------
// Aplicar unión
var join_TAC_snow_Step00_Step01_Step02_Step03_Step04_Step05 = innerJoin.apply(joined_TAC_snow_Step00_Step01_Step02_Step03_Step04, Step05_TAC_snowByMonth, filterTimeEq);
// Asignar una función para fusionar los resultados en la FeatureCollection de salida  
var joined_TAC_snow_Step00_Step01_Step02_Step03_Step04_Step05 = ee.ImageCollection(join_TAC_snow_Step00_Step01_Step02_Step03_Step04_Step05.map(function(feature) {
  return ee.Image.cat(feature.get('primary'), feature.get('secondary'));
}));
//---------------------------------------------------------------------------------------------------------------------------------
////////////////////////////// UNIONES TAC SNOW MONTHLY Step01, Step02, Step03, Step04, Step05 y Step06 ////////////////////////////////////////////////////////////////////
//------------------------------------------------------------------------------------------------------------------------------
// Aplicar unión
var join_TAC_snow_Step01_Step02_Step03_Step04_Step05_Step06 = innerJoin.apply(joined_TAC_snow_Step00_Step01_Step02_Step03_Step04_Step05, Step06_TAC_snowByMonth, filterTimeEq);
// Asignar una función para fusionar los resultados en la FeatureCollection de salida  
var All_steps_snow = ee.ImageCollection(join_TAC_snow_Step01_Step02_Step03_Step04_Step05_Step06.map(function(feature) {
  return ee.Image.cat(feature.get('primary'), feature.get('secondary'));
}));
//-----------------------------------------------------------------------------------------------------------------------------------------
//////////////////////////////////// INTERFAZ DE USUARIO ///////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------------------------------------------------------------
var places = {
  'Juncal Juncalillo' : [ssc05400,'Rio Juncal antes junta Estero Juncalillo'],
  'Juncal Blanco'     : [ssc05401,'Rio Juncal Antes Junta Estero Juncalillo y Junta Rio Blanco'],
  'Rio Blanco'        : [ssc05402,'Rio Blanco'],
  'Aconcagua Colorado': [ssc05403,'Rio Aconcagua entre Rio Blanco y Rio Colorado'],
  'Rio Colorado'      : [ssc05404,'Rio Colorado antes junta Estero Riecillos'],
  'Estero Riecillos'  : [ssc05405,'Estero Riecillos'],
  'Colorado Riecillo' : [ssc05406,'Rio Colorado Entre Estero Riecillos y Rio Aconcagua'],
  'Aconcagua Putaendo': [ssc05410,'Rio Aconcagua entre Rio Colorado y Rio Putaendo'],
  'Estero Pocuro'     : [ssc05411,'Estero Pocuro'],
  'Putaendo Hidalgo'  : [ssc05412,'Rio Putaendo bajo junta Rio Hidalgo'],
  'Putaendo Chalaco'  : [ssc05413,'Rio Putaendo Entre Rio Hidalgo y Bajo Junta Estero Chalaco'],
  'Putaendo Aconcagua': [ssc05414,'Rio Putaendo Entre Estero Chalaco y Rio Aconcagua'],
  'Estero Seco'       : [ssc05415,'Estero Seco'],
  'Estero Quilpue'    : [ssc05416,'Estero Quilpue'],
};
//---------------------------------------------------------------------------------------------------------------------------------
var place = ui.Select({
  items: Object.keys(places),
  onChange: function(key) {
  Map.clear();
    var ROI = places[key][0];
    var streamflow = ee.FeatureCollection("WWF/HydroSHEDS/v1/FreeFlowingRivers")
                       .filter(ee.Filter.bounds(ROI))
                       .style({color: "B2B2B3", width: 2.0,});
    Map.addLayer(mean.clip(ROI),visParams, 'SCI');
    Map.addLayer(streamflow,{}, 'Red hídrica');
    Map.centerObject(ROI,10);
    Map.addLayer(outlineSSC,{},'Subsubcuencas cuenca del Río Aconcagua');
    Map.addLayer(outlineC, {palette: 'FF0000'}, 'Cuenca Río Aconcagua');
//-----------------------------------------------------------------------------------------------------------------------------------------
/////////////////////////////////// GRÁFICOS PERSONALIZADOS POR SUB-SUBCUENCAS ///////////////////////////////////////////////////////////////////
//----------------------------------------------------------------------------------------------------------------------------------------- 
var chart_TAC_cloud_M =
  ui.Chart.image.series({
    imageCollection: All_steps_cloud,
    region: ROI,
    reducer: ee.Reducer.mean(),
    scale: 500,
    xProperty:'month'
  }).setSeriesNames(['Step 0 Terra', 'Step 0 Aqua', 'Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Step 6' ])
  .setOptions({
    title: 'Cloud Cover Area (CCA) by cloud reduction steps, Aconcagua sub basins',
    vAxis: {title:' CCA (%)'},
    hAxis: {title:'Months'}, 
    series: {0: {color: 'cyan'  , type: 'line'},
             1: {color: 'blue'  , type: 'line'},
             2: {color: 'red'   , type: 'line'},
             3: {color: 'green', type: 'line'},
             4: {color: 'orange', type: 'line'},
             5: {color: 'purple', type: 'line'},   
             6: {color: 'gray'  , type: 'line'}, 
             7: {color: 'yellow' , type: 'line'
             }}
});
var chart_TAC_snow_M =
  ui.Chart.image.series({
    imageCollection: All_steps_snow,
    region: ROI,
    reducer: ee.Reducer.mean(),
    scale: 500,
    xProperty:'month'
  }).setSeriesNames(['Step 0 Terra', 'Step 0 Aqua', 'Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Step 6'])
  .setOptions({
    title: 'Snow Cover Area (SCA) by cloud reduction steps, Aconcagua sub basins',
    vAxis: {title:'SCA (%)'},
    hAxis: {title:'Months'},
    series: {0: {color: 'cyan'  , type: 'line'},
             1: {color: 'blue'  , type: 'line'},
             2: {color: 'red'   , type: 'line'},
             3: {color: 'green', type: 'line'},
             4: {color: 'orange', type: 'line'},
             5: {color: 'purple', type: 'line'},   
             6: {color: 'gray'  , type: 'line'}, 
             7: {color: 'yellow' , type: 'line'
             }}
});
// Agregar al panel secundario
    panel.clear();
    panel.add(logo_observatorio);
    panel.add(link);
    panel.add(intro);
    panel.add(description);
    panel.add(placeLabel);
    panel.add(place);
    panel.add(chart_TAC_cloud_M);    
    panel.add(chart_TAC_snow_M);
    panel.add(logo_teleamb);
  Map.add(makeLegend('Frecuency of snow', SCFpaletteLabels, palette_scf, 0, 1, 'bottom-left'));
}
});
// Set a place holder.
place.setPlaceholder('Select Sub-basins');
//-----------------------------------------------------------------------------------------------------------------------------------------
/////////////////////////////////////// WIDGET PANEL ////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------------------------------------------------------------
// Create UI Panels
var panel = ui.Panel({style: {width:'25.0%'}});
ui.root.insert(0,panel);
// Introduction 
var intro = ui.Label('Observatorio Satelital de Nieves', 
  {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
);
var description = ui.Label('From the information available for the snow product of the MODIS-Terra sensor (MOD10A1) and the MODIS-Aqua sensor (MYD10A1), '+
' a series of consecutive methodological steps proposed by the authors Gafurov & Bardossy (2009) are generated, which allow generating a reduction of cloud cover for the upper part of the Aconcagua River basin.'+
' The available information allows to generate a visual comparison between the different applied steps.'+
' The interface present in the map allows observing the monthly compound for the year 2009 at different units of analysis.', {});
var placeLabel = ui.Label('1) Select area of interest', 
  {fontWeight: 'bold', fontSize: '18px', margin: '10px 5px'}
);
////////////////////////////// PANEL INICIAL ///////////////////////////////////////////////////////////////////
// Definir link para thumbnail
var link = ui.Label('Observatorio Satelital de Nieves', {},'http://observatorionieves.cl/');
// Logo Observatorio 
var logo_observatorio = ui.Thumbnail({image:logo_Observatorio,params:{dimensions: '250x114', bands:['b1','b2','b3'],min:0,max:255}, style:{width:'250px',height:'114px',padding :'0'}});
// Logo Teleamb 
var logo_teleamb = ui.Thumbnail({image:logo_TeleAmb,params:{dimensions: '400x200', bands:['b1','b2','b3'],min:0,max:255}, style:{width:'250px',height:'114px',padding :'0'}});
//------------------------------------------------------------------------------------------------------------------------------------------
////////////////////////////// GRÁFICOS MENSUALES SECCIÓN MEDIA-SUPERIOR /////////////////////////////////////////////////////////////////////////////////////
//------------------------------------------------------------------------------------------------------------------------------------------
var chart_TAC_cloud_M_ms =
  ui.Chart.image.series({
    imageCollection: All_steps_cloud,
    region: aconcagua_ms,
    reducer: ee.Reducer.mean(),
    scale: 500,
    xProperty:'month'
  }).setSeriesNames(['Step 0 Terra', 'Step 0 Aqua', 'Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Step 6'])
  .setOptions({
    title: 'Cloud Cover Area (CCA) by cloud redution steps, Aconcagua Basin',
    vAxis: {title:'CCA (%)'},
    hAxis: {title:'Months'}, 
    series: {0: {color: 'cyan'  , type: 'line'},
             1: {color: 'blue'  , type: 'line'},
             2: {color: 'red'   , type: 'line'},
             3: {color: 'green', type: 'line'},
             4: {color: 'orange', type: 'line'},
             5: {color: 'purple', type: 'line'},   
             6: {color: 'gray'  , type: 'line'}, 
             7: {color: 'yellow' , type: 'line'
             }}
});
var chart_TAC_snow_M_ms =
  ui.Chart.image.series({
    imageCollection: All_steps_snow,
    region: aconcagua_ms,
    reducer: ee.Reducer.mean(),
    scale: 500,
    xProperty:'month'
  }).setSeriesNames(['Step 0 Terra', 'Step 0 Aqua', 'Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Step 6'])
  .setOptions({
    title: 'Snow Cover Area (SCA) by cloud redution steps, Aconcagua Basin',
    vAxis: {title:'SCA (%)'},
    hAxis: {title:'Months'},
    series: {0: {color: 'cyan'  , type: 'line'},
             1: {color: 'blue'  , type: 'line'},
             2: {color: 'red'   , type: 'line'},
             3: {color: 'green', type: 'line'},
             4: {color: 'orange', type: 'line'},
             5: {color: 'purple', type: 'line'},   
             6: {color: 'gray'  , type: 'line'}, 
             7: {color: 'yellow' , type: 'line'
             }}
});
// Agregar al panel principal
  panel.add(logo_observatorio);
  panel.add(link);
  panel.add(intro);
  panel.add(description);
  panel.add(chart_TAC_cloud_M_ms);
  panel.add(chart_TAC_snow_M_ms);
  panel.add(placeLabel);
  panel.add(place);
  panel.add(logo_teleamb);
//-----------------------------------------------------------------------------------------------------------------------------------------
////////////////////////////////// Create labeled colorbar legend ///////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------------------------------------------------------------
// Create colorbar.
function makeColorBar(palette, min, max) {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '200x15',
      format: 'png',
      min: min,
      max: max,
      palette: palette,
    },
    style: {stretch: 'horizontal', margin: '0px 0px', position: 'bottom-left'},
  });
}
function makeLegend(title, labels, palette, min, max, position) {
  var labelPanel = ui.Panel();
  for (var i = 0; i < labels.length; i++) {
    var label = ui.Label({
      value: labels[i],
      style: {
        maxWidth: '35px',
        margin: '4px 4px',
        position: 'bottom-left'
      }
    });
    labelPanel.add(label);
  }
  labelPanel.setLayout(ui.Panel.Layout.flow('horizontal'));
  var titleLabel = ui.Label({
    value: title,
    style: {
      fontSize: '14px',
      fontWeight: 'bold',
      position: 'top-center'
    }
  });
  return ui.Panel({
    widgets: [titleLabel, makeColorBar(palette, min, max), labelPanel],
    style: {position: position}
  });
}