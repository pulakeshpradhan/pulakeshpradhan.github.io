var logo_Observatorio = ui.import && ui.import("logo_Observatorio", "image", {
      "id": "users/observatorionieves/Logos/Logo_Observatorio"
    }) || ee.Image("users/observatorionieves/Logos/Logo_Observatorio"),
    logo_Teleamb = ui.import && ui.import("logo_Teleamb", "image", {
      "id": "users/observatorionieves/Logos/Logo_TeleAmb"
    }) || ee.Image("users/observatorionieves/Logos/Logo_TeleAmb"),
    aconcagua_cuenca = ui.import && ui.import("aconcagua_cuenca", "table", {
      "id": "users/observatorionieves/DGA/aconcagua_cuenca"
    }) || ee.FeatureCollection("users/observatorionieves/DGA/aconcagua_cuenca"),
    aconcagua_ms = ui.import && ui.import("aconcagua_ms", "table", {
      "id": "users/observatorionieves/DGA/aconcagua_subsubcuencas_ms"
    }) || ee.FeatureCollection("users/observatorionieves/DGA/aconcagua_subsubcuencas_ms");
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// A través de un panel este código presenta información anual y mensual: 
// 1) Valor promedio del Indice Normalizado de Nieve (NDSI),
// 2) Promedio del área cubierta de nieve (SCA)
// 3) Promedio de "no datos" productos de la presencia de nubes, ángulo de visión, saturación del sensor, etc.
// Selección personalizada por subsubcuencas sección media-superior cuenca del Río Aconcagua
// Producto MOD10A1 colección 6 de MODIS
// Autora: Yael Aguirre
// Actualizado 13/10/21
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------------------------------------------------------------------------------
/////////////////////////////// DATOS DE ENTRADA (Data input) ////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------------------------------------------------------------------------------
// Colección original MODIS Terra
var MODcollection = ee.ImageCollection('MODIS/006/MOD10A1')
                      .select('NDSI_Snow_Cover','Snow_Albedo_Daily_Tile_Class')
                      .filterDate('2000-01-01', '2020-12-31');
// Asset NDSI anual
var MODIS_yearly  = ee.ImageCollection('users/observatorionieves/MODIS/MOD10A1_Snow_Yearly');
// Variable para presentarla al inicio del codigo
var NDSImean = MODIS_yearly.select('NDSI_Snow_Cover').mean().clip(aconcagua_ms);
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
// Time ranges
var years = ee.List.sequence(2000, 2020);
var months = ee.List.sequence(1, 12);
var umbralNDSI = 40;
// Add colorbars, default hidden.
var SCFpaletteLabels = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
var palette_scf = 'ffffff,ffffd9,edf8b1,c7e9b4,7fcdbb,41b6c4,1d91c0,225ea8,253494,081d58';
var visParams = {
  min: 0.0,
  max: 100.0,
  palette: palette_scf,
};
//---------------------------------------------------------------------------------------------------------------------------------------------------------
//////////////////////////// PARÁMETROS DE VISUALIZACIÓN /////////////////////////////////////////////////////////////////////////////////////
//----------------------------------------------------------------------------------------------------------------------------------------------------------
 Map.addLayer(outlineC, {palette: 'FF0000'}, 'Cuenca Río Aconcagua');
 Map.addLayer(NDSImean,visParams, 'NDSI promedio');
 Map.addLayer(outlineSSC,{},' Sección media-superior cuenca del Río Aconcagua');
 Map.addLayer(streamflow,{}, 'Red hídrica');
 Map.setCenter(-70.4381, -32.7502, 10);
 Map.setOptions('Satellite');
//---------------------------------------------------------------------------------------------------------------------------------
////////////////////////////////////////FEATURES///////////////////////////////////////////////////////////////////////////////////
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
//------------------------------------------------------------------------------------------------------------------------------------------
//////////////////////////////// Funciones /////////////////////////////////////////////////////////////////////////////////////
//------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------NODATA-------------------------------------------------------------------------------------------------------//
// Una función que reclasifica los valores de píxel del producto MOD10A1 y MYD10A1:
// INFORMACIÓN VÁLIDA
// Clase               Valor original del píxel    Valor reclasificado 
// 1) land                    (125)                      0
// 2) inland water            (137)                      0 
// 3) ocean                   (139)                      0
// 4) shadowing               (251)                      0
// 5) brd                     (253)                      0
// NO INFORMACIÓN (NODATA)
// Clase               Valor original del píxel    Valor reclasificado 
// 6)  no decision            (101)                     100
// 7)  night                  (111)                     100
// 8)  cloud                  (150)                     100
// 9)  cloudSnow              (151)                     100  
// 10) missing                (250)                     100
// 11) landmask               (252)                     100
// 12) nonproduc              (254)                     100
var ReclassifyModis = function(img) {
  var nodata = img.remap([101, 111, 125, 137, 139, 150, 151, 250, 251, 252, 253, 254],   // Valores originales de pixeles del producto de nieve MODIS 
                         [100, 100,   0,   0,   0, 100, 100, 100,   0, 100,   0, 100],   // Valores reclasificados: 100--cloud/no decision/ missing etc; 0-- land/ocean/inland water 
                          null,                        // All other MODIS snow product pixel values (0, 1, 11, 50, 254, 255)
                          'Snow_Albedo_Daily_Tile_Class').rename('nodata'); // La banda que se quiere reclasificar 
  var snow = img.select('NDSI_Snow_Cover').gte(0).multiply(0).rename('snow');
  var imageTemp = ee.Image.cat([nodata, snow]); // hace una imagen con dos bandas
  var nodata_data = imageTemp.reduce(ee.Reducer.max()).rename('nodata_data'); // reduce a una imagen de una banda sacando el max entre ellas
 return img.addBands(nodata_data);
}; 
var MODcollectionND = MODcollection.map(ReclassifyModis);
//-----------------------------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////// FUNCIONES /////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////  BINARIA /////////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------------------------------------------------------------
// Función para identificar y establecer los valores binarios de nieves (MOD10A1)
var snowMask = function(image){
  var snow = image.select('NDSI_Snow_Cover').gte(umbralNDSI).multiply(100).rename('Snow_Cover_Area');
  return image.addBands(snow);
};
//-----------------------------------------------------------------------------------------------------------------------------------------
//////////////////////////////////// REDUCCIÓN DE DATOS ///////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------------------------------------------------------------
// Aplicar máscara de nieve %
var SnowCollection = MODcollectionND.map(snowMask).select('NDSI_Snow_Cover','Snow_Cover_Area','nodata_data');
// Daily NDSI                    
var deca01 = SnowCollection.filterDate("2000-01-01","2010-01-01");
var deca02 = SnowCollection.filterDate("2010-01-01","2020-12-31");
// Monthly NDSI
var NDSIbyMonth = ee.ImageCollection.fromImages(
  months.map(function(m) {
    return SnowCollection
    .filter(ee.Filter.calendarRange(m, m, 'month'))
    .mean()
    .set('month', m)
    .set('system:time_start', ee.Date.fromYMD(m, 1, 1).millis());
  }).flatten());
print('NDSIbyMonth', NDSIbyMonth);
// Year/month NDSI
var NDSIbyMonthYear = ee.ImageCollection.fromImages(
  years.map(function(y) {
    return months.map(function (m) {
      return SnowCollection
        .filter(ee.Filter.calendarRange(y, y, 'year'))
        .filter(ee.Filter.calendarRange(m, m, 'month'))
        .mean()
        .set('month', m)
        .set('year', y)
        .set('system:time_start', ee.Date.fromYMD(y, m, 1).millis());
  });
}).flatten());
// Yearly NDSI
var NDSIbyYear = ee.ImageCollection.fromImages(
  years.map(function(y) {
    return SnowCollection
    .filter(ee.Filter.calendarRange(y, y, 'year'))
    .mean()
    .set('year', y)
    .set('system:time_start', ee.Date.fromYMD(y, 1, 1).millis());
  }).flatten());
print('NDSIbyYear', NDSIbyYear);
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
    Map.addLayer(NDSImean.clip(ROI),visParams, 'NDSI promedio');
    Map.addLayer(streamflow,{}, 'Red hídrica');
    Map.centerObject(ROI,11);
    Map.addLayer(outlineSSC,{},'Subsubcuencas cuenca del Río Aconcagua');
    Map.addLayer(outlineC, {palette: 'FF0000'}, 'Cuenca Río Aconcagua');
//-----------------------------------------------------------------------------------------------------------------------------------------
/////////////////////////////////////// GRÁFICOS ///////////////////////////////////////////////////////////////////
//----------------------------------------------------------------------------------------------------------------------------------------- 
// Daily time serie 2000-2010
var chartDaily01 = 
  ui.Chart.image.series({
    imageCollection: deca01,
    region: ROI,
    reducer: ee.Reducer.mean(),
    scale: 500,
  }).setOptions({
    title: 'NDSI diario usando MOD10A1. 2000-2010',
    vAxis: {title:'Promedio (%)'},
    hAxis: {title:'Tiempo'}, 
});
// Daily time serie 2011-2020 
var chartDaily02 = 
  ui.Chart.image.series({
    imageCollection: deca02,
    region: ROI,
    reducer: ee.Reducer.mean(),
    scale: 500,
  }).setOptions({
    title: 'NDSI diario usando MOD10A1. 2010-2020',
    vAxis: {title:'Promedio (%)'},
    hAxis: {title:'Tiempo'}, 
});
// Monthly time serie 2000-2020 subsubcuencas personalizado
var chartMonth =
  ui.Chart.image.series({
    imageCollection: NDSIbyMonth,
    region: ROI,
    reducer: ee.Reducer.mean(),
    scale: 500,
    xProperty:'month'
  }).setOptions({
    title: 'Promedios mensuales NDSI, Snow Cover Area y Nodata (nubes) usando MOD10A1. 2000-2020',
    curveType: 'function',
    vAxis: {title:'Promedio (%)'},
    hAxis: {title:'Tiempo'}, 
});
// Year/month time serie 2000-2020 subsubcuencas personalizado
var chartYearMonth = 
  ui.Chart.image.series({
    imageCollection: NDSIbyMonthYear,
    region: ROI,
    reducer: ee.Reducer.mean(),
    scale: 500,
  }).setOptions({
    title: 'Promedios mensuales por año NDSI, Snow Cover Area y Nodata (nubes) usando MOD10A1. 2000-2020',
    curveType: 'function',
    vAxis: {title:'Promedio (%)'},
    hAxis: {title:'Tiempo'}, 
});
// Yearly time serie 2000-2020 subsubcuencas personalizado
var chartYear =
  ui.Chart.image.series({
    imageCollection: NDSIbyYear,
    region: ROI,
    reducer: ee.Reducer.mean(),
    scale: 500,
  }).setOptions({
    title: 'Promedios anuales NDSI, Snow Cover Area y Nodata (nubes) usando MOD10A1. 2000-2020',
    curveType: 'function',
    vAxis: {title:'Promedio (%)'},
    hAxis: {title:'Tiempo'}, 
});
//Agregar al panel secundario
    panel.clear();
    panel.add(logo_observatorio);
    panel.add(link);
    panel.add(intro);
    panel.add(description);
    panel.add(placeLabel);
    panel.add(place);
    panel.add(chartDaily01);    
    panel.add(chartDaily02);
    panel.add(chartMonth);
    panel.add(chartYearMonth);
    panel.add(chartYear);
    panel.add(placeLabel_M);
    panel.add(panel_monthly);
    panel.add(description2);
    panel.add(placeLabel_Y);
    panel.add(panel_yearly);
    panel.add(description3);
    panel.add(logo_teleamb);
    Map.add(makeLegend('Frecuencia de nieve', SCFpaletteLabels, palette_scf, 0, 1, 'bottom-left'));
}
});
// Set a place holder.
place.setPlaceholder('Seleccione SubSubcuencas');
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
var description = ui.Label('A partir de imágenes diarias del sensor satelital MODIS (MOD10A1)'+
  ' se determina la variabilidad espacio temporal de nieves sobre la sección media-superior de la cuenca del Río Aconcagua.'+
  ' Se presenta la información del valor promedio del Indice Normalizado de Nieve (NDSI),'+
  ' el promedio del área cubierta de nieve (SCA) considerando un NDSI>40 y el promedio de "no datos" producto'+
  ' de la presencia de nubes, ángulo de visión, saturación del sensor entre otros.'+
  ' El periodo de medición comprende desde el 2000-2020, entregando información a una escala anual y mensual.' +
  ' Puede personalizar su búsqueda seleccionando las sub-subcuencas de su área de interés.', {});
var placeLabel = ui.Label('1) Seleccione área de interés', 
  {fontWeight: 'bold', fontSize: '18px', margin: '10px 5px'}
);
////////////////////////////// PANEL INICIAL ///////////////////////////////////////////////////////////////////
// Definir link para thumbnail
var link = ui.Label('Observatorio Satelital de Nieve', {},'http://observatorionieves.cl/');
// Logo Observatorio 
var logo_observatorio = ui.Thumbnail({image:logo_Observatorio,params:{dimensions: '250x114', bands:['b1','b2','b3'],min:0,max:255}, style:{width:'250px',height:'114px',padding :'0'}});
// Logo Teleamb 
var logo_teleamb = ui.Thumbnail({image:logo_Teleamb,params:{dimensions: '300x93', bands:['b1','b2','b3'],min:0,max:255}, style:{width:'300px',height:'93px',padding :'0'}});
// Descripción
var placeLabel_M = ui.Label('2) Exporte análisis mensual', 
  {fontWeight: 'bold', fontSize: '18px', margin: '10px 5px'}
);
var description2 = ui.Label('Sección media-superior de la cuenca del Río Aconcagua');
var placeLabel_Y = ui.Label('3) Exporte análisis anual', 
  {fontWeight: 'bold', fontSize: '18px', margin: '10px 5px'}
);
var description3 = ui.Label('Sección media-superior de la cuenca del Río Aconcagua');
//------------------------------------------------------------------------------------------------------------------------------------------
//////////////////////////////// EXPORTAR A GOOGLE DRIVE /////////////////////////////////////////////////////////////////////////////////////
//------------------------------------------------------------------------------------------------------------------------------------------
// Llamar al repositorio
var batch = require('users/fitoprincipe/geetools:batch');
// Colección mensual
function downloadImgM() {
// Exportar ImageCollection a Google Drive
batch.Download.ImageCollection.toDrive(NDSIbyMonth, 'MODIS_NDSI_Monthly',  //Coleccion de imagenes, carpeta drive
  {name:'{month}',
  scale: 500,
  region: aconcagua_ms.getInfo()['geometry'] // or geometry.getInfo()
});
}
// Colección mensual
function downloadImgM() {
// Exportar ImageCollection a Google Drive
batch.Download.ImageCollection.toDrive(NDSIbyMonth, 'MODIS_NDSI_Monthly',  //Coleccion de imagenes, carpeta drive
  {name:'{month}',
  scale: 500,
  region: aconcagua_ms.getInfo()['geometry'] // or geometry.getInfo()
});
}
// Colección anual
function downloadImgY() {
// Exportar ImageCollection a Google Drive
batch.Download.ImageCollection.toDrive(NDSIbyYear, 'MODIS_NDSI_Yearly', //Coleccion de imagenes, carpeta drive
{name:'{year}', 
 scale: 500,
 region: aconcagua_ms.getInfo()['geometry'] // or geometry.getInfo()
});
}
// Agregar elementos al mapa (mensual)
var downloadButton = ui.Button('Download NDSI Monthly', downloadImgM);
var panel_monthly = ui.Panel([downloadButton]);
// Agregar elementos al mapa (anual)
var downloadButton2 = ui.Button('Download NDSI Yearly', downloadImgY);
var panel_yearly = ui.Panel([downloadButton2]);
//------------------------------------------------------------------------------------------------------------------------------------------
///////////////////////////////GRÁFICOS SECCIÓN MEDIA-SUPERIOR /////////////////////////////////////////////////////////////////////////////////////
//------------------------------------------------------------------------------------------------------------------------------------------
// Daily time serie 2000-2010 sección media-superior completa
var chartDaily01_ms = 
  ui.Chart.image.series({
    imageCollection: deca01,
    region: aconcagua_ms,
    reducer: ee.Reducer.mean(),
    scale: 500,
  }).setOptions({
    title: 'NDSI diario usando MOD10A1. 2000-2010',
    vAxis: {title:'Promedio (%)'},
    hAxis: {title:'Tiempo'}, 
});
// Daily time serie 2011-2020  sección media-superior completa
var chartDaily02_ms = 
  ui.Chart.image.series({
    imageCollection: deca02,
    region: aconcagua_ms,
    reducer: ee.Reducer.mean(),
    scale: 500,
  }).setOptions({
    title: 'NDSI diario usando MOD10A1. 2010-2020',
    vAxis: {title:'Promedio (%)'},
    hAxis: {title:'Tiempo'}, 
});
// Monthly time serie 2000-2020 sección media-superior completa
var chartMonth_ms =
  ui.Chart.image.series({
    imageCollection: NDSIbyMonth,
    region: aconcagua_ms,
    reducer: ee.Reducer.mean(),
    scale: 500,
    xProperty:'month'
  }).setOptions({
    title: 'Promedios mensuales NDSI, Snow Cover Area y Nodata (nubes) sección media-superior cuenca del Río Aconcagua usando MOD10A1. 2000-2020',
    curveType: 'function',
    vAxis: {title:'Promedio (%)'},
    hAxis: {title:'Tiempo'}, 
});
// Year/month time serie 2000-2020 sección media-superior completa
var chartYearMonth_ms = 
  ui.Chart.image.series({
    imageCollection: NDSIbyMonthYear,
    region: aconcagua_ms,
    reducer: ee.Reducer.mean(),
    scale: 500,
  }).setOptions({
    title: 'Promedios mensuales por año NDSI, Snow Cover Area y Nodata (nubes) sección media-superior cuenca del Río Aconcagua usando MOD10A1. 2000-2020',
    curveType: 'function',
    vAxis: {title:'Promedio (%)'},
    hAxis: {title:'Tiempo'}, 
});
// Yearly time serie 2000-2020 sección media-superior completa 
var chartYear_ms =
  ui.Chart.image.series({
    imageCollection: NDSIbyYear,
    region: aconcagua_ms,
    reducer: ee.Reducer.mean(),
    scale: 500,
  }).setOptions({
    title: 'Promedios anuales NDSI, Snowcover y Nodata (nubes) sección media-superior cuenca del Río Aconcagua usando MOD10A1. 2000-2020',
    curveType: 'function',
    vAxis: {title:'Promedio (%)'},
    hAxis: {title:'Tiempo'}, 
});
// Agregar al panel principal
panel.add(logo_observatorio);
panel.add(link);
panel.add(intro);
panel.add(description);
panel.add(chartDaily01_ms);    
panel.add(chartDaily02_ms);
panel.add(chartMonth_ms);
panel.add(chartYearMonth_ms);
panel.add(chartYear_ms);
panel.add(placeLabel);
panel.add(place);
panel.add(placeLabel_M);
panel.add(description2);
panel.add(panel_monthly);
panel.add(placeLabel_Y);
panel.add(description3);
panel.add(panel_yearly);
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