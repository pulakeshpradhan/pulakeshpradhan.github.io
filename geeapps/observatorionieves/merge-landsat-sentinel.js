var cuenca_aconcagua = ui.import && ui.import("cuenca_aconcagua", "table", {
      "id": "users/observatorionieves/DGA/aconcagua_cuenca"
    }) || ee.FeatureCollection("users/observatorionieves/DGA/aconcagua_cuenca"),
    seccion_ms = ui.import && ui.import("seccion_ms", "table", {
      "id": "users/observatorionieves/DGA/aconcagua_subcuencas_ms"
    }) || ee.FeatureCollection("users/observatorionieves/DGA/aconcagua_subcuencas_ms"),
    subsubcuencas_ms = ui.import && ui.import("subsubcuencas_ms", "table", {
      "id": "users/observatorionieves/DGA/aconcagua_subsubcuencas_ms"
    }) || ee.FeatureCollection("users/observatorionieves/DGA/aconcagua_subsubcuencas_ms"),
    logo_Observatorio = ui.import && ui.import("logo_Observatorio", "image", {
      "id": "users/observatorionieves/Logos/Logo_Observatorio"
    }) || ee.Image("users/observatorionieves/Logos/Logo_Observatorio"),
    logo_Teleamb = ui.import && ui.import("logo_Teleamb", "image", {
      "id": "users/observatorionieves/Logos/Logo_TeleAmb"
    }) || ee.Image("users/observatorionieves/Logos/Logo_TeleAmb");
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Este código genera una unión entre los satelites Landsat 4,5,8 & 9 y Sentinel-2
// Para posterior aplicar un indice NDSI a la colección unida
// Autores: Daniela González, Yael Aguirre, Freddy Saavedra, Valentina Contreras, Ana Hernández.  
// Actualizado 31/05/2022
/////////////////////////////////////////////////
//Map.addLayer(seccion_ms,{},'Seccion ms')
// --------------------------------------------------------------------------------------------//
//                                       LANDSAT 4, 5 , 8 y 9                                  //
// -------------------------------------------------------------------------------------------// 
// Landsat L4, L5, L7, L8 y L9 SR
var l4 = ee.ImageCollection('LANDSAT/LT04/C02/T1_L2').filterBounds(seccion_ms);
//print('Landsat 4', l4);
var l5 = ee.ImageCollection('LANDSAT/LT05/C02/T1_L2').filterBounds(seccion_ms);
//print('Landsat 5',l5);
var l7 = ee.ImageCollection('LANDSAT/LE07/C02/T1_L2').filterBounds(seccion_ms); 
//print('Landsat 7',l7); 
var l8 = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2').filterBounds(seccion_ms);
//print('Landsat 8',l8);
var l9 = ee.ImageCollection('LANDSAT/LC09/C02/T1_L2').filterBounds(seccion_ms);
//print('Landsat 9', l9); 
// change number of bands and select acording sensor: l5 -> TM, l7 -> ETM, l8 -> OLI_TIRS
var selRen457 = function(image) {
  return  image.select(['SR_B1','SR_B2','SR_B3','SR_B4', 'SR_B5','SR_B7','QA_PIXEL'], // old names
                       ['B'    ,'G'    ,'R'    ,'NIR'  ,'SWIR1' ,'SWIR2','pixel_qa']  // new names
                       )};
var selRen89 = function(image) {
  return  image.select(['SR_B2','SR_B3','SR_B4','SR_B5','SR_B6', 'SR_B7','QA_PIXEL'], // old names
                       [   'B' ,  'G'  ,   'R' , 'NIR' ,'SWIR1', 'SWIR2','pixel_qa']  // new names
                       )};            
var l4s = l4.map(selRen457).sort('DATE_ACQUIRED');
var l5s = l5.map(selRen457).sort('DATE_ACQUIRED');
var l8s = l8.map(selRen89).sort('DATE_ACQUIRED');
var l9s = l9.map(selRen89).sort('DATE_ACQUIRED'); 
// Unión de colecciones L4, L5, L8 y L9
var collectionLandsat = l4s.merge(l5s).merge(l8s).merge(l9s).sort('DATE_ACQUIRED'); // Dato de adquisición
//print('Colección unida Landsat 4, 5, 8 y 9 ', collectionLandsat);
// Colección Landsat filtrada por path y row 
var clandsatPR = collectionLandsat
//.filter(ee.Filter.eq('WRS_PATH', 233))
//.filter(ee.Filter.eq('WRS_ROW', 83));
/*
.filter(ee.Filter.or(
    ee.Filter.and(ee.Filter.eq('WRS_PATH', 233),         
                  ee.Filter.eq('WRS_ROW', 83)),
    ee.Filter.and(ee.Filter.eq('WRS_PATH', 233), 
                  ee.Filter.eq('WRS_ROW', 82))))
*/                  
//print('Colección Landsat por Path y Row', clandsatPR)
// --------------------------------------------------------------------------------------------//
//                                       SENTINEL - 2 /                                        //
// -------------------------------------------------------------------------------------------//
var se2 = ee.ImageCollection('COPERNICUS/S2_SR').filterBounds(seccion_ms);
//print('Sentinel 2', se2);
// --------------------------------------------------------------------------------------------//
//                                 Proceso de unión colecciones                               //
// -------------------------------------------------------------------------------------------// 
// Selección de fechas para la colección, cambio de nombre de bandas y creación de mascara de nubes 
var start = '1980-01-01';
var end = '2022-12-31';
var filter = ee.Filter.and(
  ee.Filter.date(start, end),
  ee.Filter.bounds(seccion_ms)
);
//Colección Landsat
var L = clandsatPR
  .filter(filter)
  .map(function (image) {
    var qa = image.select('pixel_qa');
    image = image.select(
      [ 'B'  ,   'G'  ,   'R', 'NIR', 'SWIR1','SWIR2'],
      ['blue', 'green', 'red', 'nir', 'swir1','swir2']
    );
    return image
      .updateMask(
        qa.bitwiseAnd(5).or(qa.bitwiseAnd(7).or(qa.bitwiseAnd(8)))
      )
      .int16(); // Same data type
  });
//Colección Sentinel - 2
var s2 = ee.ImageCollection('COPERNICUS/S2_SR')
  .filter(filter)
  .map(function (image) {
    var qa = image.select(['QA60']);
    var clouds = qa.bitwiseAnd(1<<10).or(qa.bitwiseAnd(1<<11)); 
    image = image.select(
      [ 'B2' , 'B3'   , 'B4' , 'B8' , 'B11'  , 'B12' ],
      ['blue', 'green', 'red', 'nir', 'swir1', 'swir2']  
    );
    return image
      .updateMask(
        clouds.not()
      )
      .int16(); // Same data type
  });
//merge colecciones 
var fusion = L.merge(s2);
//print('Colección Landsat - Sentinel 2',fusion)
//Orden de imágenes desde la más actual a la más antigua
var cls = fusion.sort('system:time_start', false);
print('Collection LS:',cls);
//Visualización de la primera imagen para cada una de las colecciones
var visParams = {bands:'red,green,blue', min: 0, max: 3000};
Map.addLayer(L.first(), visParams, 'Landsat ');
Map.addLayer(s2.first(), visParams, 'S2 ');
//Map.addLayer(fusion.first(), visParams, 'fusion');
//Map.addLayer(seccion_ms,{},'Sección ms')
// --------------------------------------------------------------------------------------------//
//                                 Aplicación de indice NDSI                                  //
// -------------------------------------------------------------------------------------------//
// NDSI                  
var ndsi_LS = function (img) {               
  var NDSI =img.normalizedDifference(['green','swir1']).rename("NDSI")
  .gte(0.4).multiply(100).rename('NDSI')
  .clip(seccion_ms);
  return img.addBands(NDSI);
  };
// NDSI a colección
var NDSI_LS = cls.map(ndsi_LS).select('NDSI');
print("Coleccion NDSI", NDSI_LS);
//Map.addLayer(NDSI_LS.first(),{},'Imagen NDSI'); 
// --------------------------------------------------------------------------------------------//
//                                 Graficos                                                   //
// -------------------------------------------------------------------------------------------//
/// Graficos NDSI 
//// ** Gráfico Anual ** ////
// Años //
var years = ee.List.sequence(1986, 2022);
//////  Calcular promedio anual  ///////
var byYear = ee.ImageCollection.fromImages(
  years.map(function(y) {
    return NDSI_LS
    .filter(ee.Filter.calendarRange(y, y, 'year'))
    .mean()
    .set('year', y)
    .clip(seccion_ms);
  }).flatten());
//print(byYear); 
//Trazar series de tiempo completo 
var chartyear = 
  ui.Chart.image.series({
    imageCollection: byYear,
    region: seccion_ms,
    reducer: ee.Reducer.mean(),
    scale: 40,
    xProperty:'year'
  }).setOptions({
    title: 'Cobertura de nieve, promedio anual 1984 - 2022 en la cuenca del Rio Aconcagua, utilizando datos Landsat y Sentinel-2',
    vAxis: {title:'Cobertura Nieve (%)'},
    hAxis: {title:'Años',format:0},
    curveType: 'function',
  }); 
//** Grafico mensual ** // 
///////// -- Gráfico Mensual -- //////////////
/// Meses ////
var months = ee.List.sequence(1, 12);
//Calcular NDSI promedio mensual
var bymonth = ee.ImageCollection.fromImages(
  months.map(function(m) {
    return NDSI_LS                           
    .filter(ee.Filter.calendarRange(m, m, 'month'))
    .mean()
    .set('month', m)
    .clip(seccion_ms);
  }).flatten());     //convierte una coleccion de caracteristicas
//print(bymonth);
//Trazar series de tiempo completo 1984-2020
var chartmonths = 
  ui.Chart.image.series({
    imageCollection: bymonth,
    region: seccion_ms,
    reducer: ee.Reducer.mean(),
    scale: 30,
    xProperty:'month'
  }).setOptions({
    title: 'Cobertura de nieve, promedio mensual entre 1984 - 2022 en la cuenca del Rio Aconcagua, utilizando datos Landsat y Sentinel-2',
    vAxis: {title:'Cobertura Nieve (%)'},
    hAxis: {title:'Meses'}, 
    curveType: 'function',
  });
// --------------------------------------------------------------------------------------------//
//                           Visualizador                                               //
// -------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------------------------------
////////////////////////// DATOS DE ENTRADA (Data input)///////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------------------------------------------------------------------------------
// Rango de días
var days = ee.List.sequence(1, 365);
// Colección original Terra
var LScollection = NDSI_LS.select('NDSI'); 
// Ordena la colección de mayor a menor
var LSsorted = LScollection.sort('system:time_start', false).first();
//print('Última imagen actual', LSsorted);
var currentDate = ee.Date(LSsorted.get('system:time_start'));
//print('Día actual',currentDate);
// Muestra el día y año más actual
var DOYcurrent = currentDate.getRelative('day', 'year');
//print('DOYcurrent',DOYcurrent);
var YearCurrent = currentDate.get('year');
//print('Yearcurrent',YearCurrent);
//-----------------------------------------------------------------------------------------------------------------------------------------------------------
///////////////////////////////  COLECCIÓN DE IMÁGENES ////////////////////////////////////////////////////////////////////////////////////// 
/////////////////////////////      HISTÓRICA, ACTUAL  /////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------------------------------------------------------------------------------
// Colecciones de imágenes con valores NDSI binarios
////Colección histórica 1984 - 2021
var hist = LScollection.select(['NDSI'],['NDSI_historic'])
                          .filterDate('1984-01-01','2021-12-31')
                          .filterBounds(cuenca_aconcagua)
                          .map(function(image){return image.clip(subsubcuencas_ms)});
//print('Colección histórica (Primera imagen)', hist.first());   
/// Colección actual 2022
var current = LScollection.select(['NDSI'],['NDSI_current'])
              .filterDate('2022-01-01','2022-12-31')
              //.filter(ee.Filter.calendarRange(YearCurrent, YearCurrent,'year'))
              .map(function(image){return image.clip(subsubcuencas_ms)});
// Lista de secuencia para generar UI slider
var daysDoyCurrent = ee.List.sequence(1, DOYcurrent);
// print('Lista de secuencia', days2);
// Cantidad de imágenes por colección
//print('Total imágenes colección NDSI histórica:', hist.size()); //2333 al 31/05/2022
//print('Total imágenes colección NDSI actual:', current.size());
//-----------------------------------------------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////FUNCIONES//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////PROMEDIO///////////////////////////////////////////
//-----------------------------------------------------------------------------------------------------------------------------------------------------------
/// Meses ////
var months = ee.List.sequence(1, 12);
//Calcular NDSI promedio mensual
var byDOYhistorico = ee.ImageCollection.fromImages(
  months.map(function(m) {
    return hist                          
    .filter(ee.Filter.calendarRange(m, m, 'month'))
    .mean()
    .set('month', m)
    .clip(seccion_ms);
  }).flatten()); 
print('Colección histórica con NDSI por mes', byDOYhistorico);
//---------------Calcular NDSI DOY colección actual--------------------------- ///
var byDOYcurrent = ee.ImageCollection.fromImages(
  months.map(function(m) {
    return current
    .filter(ee.Filter.calendarRange(m, m, 'month'))
    .mean()
    .set('month', m)
    .clip(seccion_ms);
  }).flatten()); 
print('Colección actual con NDSI por mes 2', byDOYcurrent); 
//---------------Calcular NDSI DOY colección actual---------------------------------------------------------
//----------------para utilizarlo dentro del UI slider---------------------------------------------------------
var byDOYcurrent2 = ee.ImageCollection.fromImages(
 months.map(function(m) {
    return current
    .filter(ee.Filter.calendarRange(m, m, 'month'))
    .mean()
    .set('month', m);
    }).flatten());
print('Colección actual con NDSI por DOY UI Slider', byDOYcurrent2);  //.sort('DAY_OF_YEAR', false).first()); 
//----------------------------------------------------------------------------------------------///
//////////////////////////////////////////UNIONES////////////////////////////////////////////////////////////
//----------------------------------------------------------------------------------------------///
// Join: Colección Actual y Colección Historica//
var filter = ee.Filter.equals({
  leftField: 'month',
  rightField: 'month'
});
// Definir un inner join.
var InnerJoin = ee.Join.inner('primary', 'secondary');
// Aplicar el Inner Join
// El apply (primary, secondary, condition) Une dos colecciones 
var InnerJoinMH_MC = InnerJoin.apply({
  primary: byDOYhistorico, 
  secondary:byDOYcurrent, 
  condition: filter
});
var JoinColHC = ee.ImageCollection(InnerJoinMH_MC.map(function(feature) {
  return ee.Image.cat(feature.get('primary'), feature.get('secondary'));
}));
print( "Unión colección NDSI histórica y actual 1", JoinColHC); //Se imprime como una ImageCollection Con NDSI historico y actual 
                                                              //esta coleccion sirve para el grafico de evolucion de NDSI
//---------------------------------------------------------------------------------------------------------------------------------------------------------
///////////////////////// PARÁMETROS DE VISUALIZACIÓN /////////////////////////////////////////////////////////////////////////////////////
//----------------------------------------------------------------------------------------------------------------------------------------------------------
var streamflow = ee.FeatureCollection("WWF/HydroSHEDS/v1/FreeFlowingRivers")
                   .filter(ee.Filter.eq('BAS_ID', 3975615))
                   .style({color: "B2B2B3", width: 2.0,});
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
// C = Cuenca
var outlineC = empty.paint({
    featureCollection: cuenca_aconcagua,
    color: 1,
    width: 1
    });
// SB = Subcuenca
var outlineSB = empty.paint({ 
    featureCollection: subsubcuencas_ms,
    color: 1,
    width: 1
    });
Map.setCenter(-70.4381, -32.7502, 10);
Map.setOptions('Satellite');
//-----------------------------------------------------------------------------------------------------------------------------------------------------------
///////////////////////////////////// GRÁFICOS ////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// INTERFAZ DE USUARIO/ ///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------------------------------------------------------------------------------
//////////////////////////////////// PANELES UI /////////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------------------------------------------------------------------------------
var panel = ui.Panel({style: {width:'25.0%'}});
ui.root.insert(0,panel);
// Introduction 
var intro = ui.Label('Observatorio Satelital de Nieves', 
  {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
);
var description = ui.Label('La información que se presenta corresponde a la unión del Satelite Landsat con el Satelite Sentinel - 2, '+
' para ello en primera instancia se unificaron los datos de todos los programas Landsat , es decir, Landsat 4, 5, 7 , 8 y 9, luego de'+
' esto se generó un merge y unificación con los datos Sentinel-2.' +
' Posterior a la unión de ambas colecciones de imágenes se calculo el Índice Normalizado de Nieve (NDSI) promediando los datos de manera anual'+
' obteniendo información desde el año 1984, también se genero un promedio mensual para el indice NDSI.'+
' La información obtenida se puede observar en los graficos al costado izquierdo de la pantalla.', {});
/////////////////////////////////////// LOGOS /////////////////////////////////////////////////////////
// Define link para thumbnail
var link = ui.Label('Observatorio Satelital de Nieve', {},'http://observatorionieves.cl/');
// Logo Observatorio 
var logo_observatorio = ui.Thumbnail({image:logo_Observatorio,params:{dimensions: '250x114', bands:['b1','b2','b3'],min:0,max:255}, style:{width:'250px',height:'114px',padding :'0'}});
// Logo TeleAmb
var logo_teleamb = ui.Thumbnail({image:logo_Teleamb,params:{dimensions: '300x93', bands:['b1','b2','b3'],min:0,max:255}, style:{width:'300px',height:'93px',padding :'0'}});
// Agregar capas al panel
panel.add(logo_observatorio);
panel.add(link);
panel.add(intro);
panel.add(description);
//panel.add(Leyenda);
//panel.add(Leyenda2);
panel.add(chartyear);
panel.add(chartmonths)
panel.add(logo_teleamb);
// Agregar colección con NDSI histórico, actual y anomalia 
var imgraficos = ee.Image(JoinColHC.select('NDSI_historic').first());
var CurrentState  = ee.Image(JoinColHC.select('NDSI_current').first());
  ///// Primera banda NDSI historic 
  Map.addLayer({
    eeObject: ee.Image(imgraficos.select('NDSI_historic')), 
    visParams: {
    min: 0.0, 
     max: 100,
    palette:['ffffff', //  0 - 10 Blanco
            'ffffd9', // 10 - 20 Blanco
            'edf8b1', // 20 - 30 Azul              
            'c7e9b4', // 30 - 40 Celeste
            '7fcdbb', // 40 - 50 Celeste
            '41b6c4', // 50 - 60 azul claro
            '1d91c0', // 60 - 70 crema pálido     
            '225ea8', // 70 - 80 celeste         
            '253494', // 80 - 90 Azul
            '081d58']
    },
    name: 'NDSI_historic'
  });
  //// Segunda banda NDSI_current 
   Map.addLayer({
    eeObject: ee.Image(CurrentState.select('NDSI_current')), 
    visParams: {
     min: 0.0, 
     max: 100,
    palette:['ffffff', //  0 - 10 Blanco
            'ffffd9', // 10 - 20 Blanco
            'edf8b1', // 20 - 30 Azul              
            'c7e9b4', // 30 - 40 Celeste
            '7fcdbb', // 40 - 50 Celeste
            '41b6c4', // 50 - 60 azul claro
            '1d91c0', // 60 - 70 crema pálido     
            '225ea8', // 70 - 80 celeste         
            '253494', // 80 - 90 Azul
            '081d58']
    },
    name:'NDSI actual' //String(day)
  });
   Map.addLayer(outlineSB, {palette: '000000'}, 'SubSubcuencas Río Aconcagua');
   Map.addLayer(outlineC, {palette: 'FF0000'}, 'Cuenca Río Aconcagua');
   Map.addLayer(streamflow,{}, 'Red hídrica');