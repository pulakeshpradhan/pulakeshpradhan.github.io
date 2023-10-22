var logo_Teleamb = ui.import && ui.import("logo_Teleamb", "image", {
      "id": "users/observatorionieves/Logos/Logo_TeleAmb"
    }) || ee.Image("users/observatorionieves/Logos/Logo_TeleAmb"),
    logo_Observatorio = ui.import && ui.import("logo_Observatorio", "image", {
      "id": "users/observatorionieves/Logos/Logo_Observatorio"
    }) || ee.Image("users/observatorionieves/Logos/Logo_Observatorio"),
    zona_central_cuencas_ms = ui.import && ui.import("zona_central_cuencas_ms", "table", {
      "id": "users/observatorionieves/Cuencas/cuencas_zona_central_ms"
    }) || ee.FeatureCollection("users/observatorionieves/Cuencas/cuencas_zona_central_ms"),
    zona_central_cuencas = ui.import && ui.import("zona_central_cuencas", "table", {
      "id": "users/observatorionieves/Cuencas/cuencas_zona_central"
    }) || ee.FeatureCollection("users/observatorionieves/Cuencas/cuencas_zona_central");
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Este código genera un promedio por DOY (Día del Año) 
// Con el promedio mensual del Índice Normalizado de Nieve
// A través de un Widgets
// Producto MOD10A1 colección 6 de MODIS
// Cuenca Petorca, La Ligua, Aconcagua, Maipo, Rapel, Mataquito y Maule
// Autores: Daniela González & Yael Aguirre 
// Actualizado 24/07/21
//-----------------------------------------------------------------------------------------------------------------------------------------------------------
////////////////////////////////////DATOS DE ENTRADA (Data input)///////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------------------------------------------------------------------------------
// Rango de días
var days = ee.List.sequence(1, 365);
// Colección original Terra
var MODIScollection = ee.ImageCollection('MODIS/006/MOD10A1').select('NDSI_Snow_Cover'); 
// Ordena la colección de mayor a menor
var MODISsorted = MODIScollection.sort('system:time_start', false).first();
// print('Última imagen actual', MODISsorted);
var currentDate = ee.Date(MODISsorted.get('system:time_start'));
 // print('Día actual',currentDate);
// Muestra el día y año más actual
var DOYcurrent = currentDate.getRelative('day', 'year');
// print('DOYcurrent',DOYcurrent);
var YearCurrent = currentDate.get('year');
// print('Yearcurrent',YearCurrent);
//-----------------------------------------------------------------------------------------------------------------------------------------------------------
//////////////////////////////////COLECCIÓN DE IMÁGENES////////////////////////////////////////////////////////////////////////////////////// 
////////////////////////////////HISTÓRICA, ACTUAL Y NODATA/////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------------------------------------------------------------------------------
// Colecciones de imágenes con valores NDSI binarios
////Colección histórica 2000 - 2020
var hist = MODIScollection.select(['NDSI_Snow_Cover'],['NDSI_historic'])
                          .filterDate('2000-01-01', '2021-12-31')
                          .map(function(image){return image.clip(zona_central_cuencas_ms)});
// print('Colección histórica (Primera imagen)', hist.first());   
/// Colección actual 2021
var current = MODIScollection.select(['NDSI_Snow_Cover'],['NDSI_current'])
                        .filter(ee.Filter.calendarRange(YearCurrent, YearCurrent,'year'))
                        .map(function(image){return image.clip(zona_central_cuencas_ms)});
// Lista de secuencia para generar UI slider
var daysDoyCurrent = ee.List.sequence(1, DOYcurrent);
// print('Lista de secuencia', days2);
// Cantidad de imágenes por colección
//print('Total imágenes colección NDSI histórica:', hist.size());
//print('Total imágenes colección NDSI actual:', current.size());
//-----------------------------------------------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////FUNCIONES//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////PROMEDIO///////////////////////////////////////////
//-----------------------------------------------------------------------------------------------------------------------------------------------------------
//----------------Calcular promedio NDSI DOY a colección histórica------------------------ //
var byDOYhistorico = ee.ImageCollection.fromImages(
  days.map(function(d) {
    return hist
    .filter(ee.Filter.calendarRange(d, d, 'DAY_OF_YEAR'))
    .mean()
    .set('DAY_OF_YEAR', d);
    }).flatten());
 print('Colección histórica con NDSI por DOY', byDOYhistorico);
//---------------Calcular NDSI DOY colección actual--------------------------- ///
var byDOYcurrent = ee.ImageCollection.fromImages(
  days.map(function(d) {
    return current
    .filter(ee.Filter.calendarRange(d, d, 'DAY_OF_YEAR'))
    .mean()
    .set('DAY_OF_YEAR', d);
    }).flatten());
 print('Colección actual con NDSI por DOY', byDOYcurrent); 
//---------------Calcular NDSI DOY colección actual---------------------------------------------------------
//----------------para utilizarlo dentro del UI slider---------------------------------------------------------
var byDOYcurrent2 = ee.ImageCollection.fromImages(
 daysDoyCurrent.map(function(d) {
    return current
    .filter(ee.Filter.calendarRange(d, d, 'DAY_OF_YEAR'))
    .mean()
    .set('DAY_OF_YEAR', d);
    }).flatten());
// print('Colección actual con NDSI por DOY UI Slider', byDOYcurrent2);  //.sort('DAY_OF_YEAR', false).first()); 
//----------------------------------------------------------------------------------------------///
//////////////////////////////////UNIONES////////////////////////////////////////////////////////////
//----------------------------------------------------------------------------------------------///
// Join: Colección Actual y Colección Historica//
var filter = ee.Filter.equals({
  leftField: 'DAY_OF_YEAR',
  rightField: 'DAY_OF_YEAR'
});
// Definir un inner join.
var InnerJoin = ee.Join.inner('primary', 'secondary');
// Aplicar el Inner Join
// El apply (primary, secondary, condition) Une dos colecciones 
var InnerJoinDOYH_DOYC = InnerJoin.apply({
  primary: byDOYhistorico, 
  secondary:byDOYcurrent, 
  condition: filter
});
// print('Inner Join DOY historico y actual unidos', InnerJoinDOYH_DOYC); //se imprime como una FeatureCollection///
var JoinColHC = ee.ImageCollection(InnerJoinDOYH_DOYC.map(function(feature) {
  return ee.Image.cat(feature.get('primary'), feature.get('secondary'));
}));
//print( "Unión colección NDSI histórica y actual", JoinColHC); //Se imprime como una ImageCollection Con NDSI historico y actual 
                                                              //esta coleccion sirve para el grafico de evolucion de NDSI
// Unión de colección actual con histórica para creación de slider // 
// Aplicar el Inner Join
// El apply (primary, secondary, condition) Une dos colecciones 
var JoinCurrentdoy_historicdoy = InnerJoin.apply({
  primary: byDOYcurrent2, 
  secondary:byDOYhistorico, 
  condition: filter
});
var JoinColcurrent_hist = ee.ImageCollection(JoinCurrentdoy_historicdoy.map(function(feature) {
  return ee.Image.cat(feature.get('primary'), feature.get('secondary'));
}));
//print( "Unión colección NDSI actual e histórica", JoinColcurrent_hist);
//---------------------------------------------------------------------------------------------------------------------------------------------------------
//////////////////////////////////Diferencia entre bandas ///////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////ANOMALÍA////////////////////////////////////////////////////////////////////////////////////////////
//----------------------------------------------------------------------------------------------------------------------------------------------------------
// Componer una función para calcular la anomalía
var ModisBandasAnomaly = function(img) {
  var bandsAnomaly = img.select('NDSI_current').subtract(img.select('NDSI_historic'))
  .rename('Anomaly');
  return img.addBands(bandsAnomaly);
};
// Aplicar función de anomalía a la colección con NDSI actual e histórico
var MODcollection3bands = JoinColcurrent_hist.map(ModisBandasAnomaly);
print('Colección con 3 bandas: NDSI histórico, NDSI actual y anomalía', MODcollection3bands);
// Colección SOLO ANOMALIA
var MODcollection1bands = JoinColcurrent_hist.map(ModisBandasAnomaly).select('Anomaly');
//print('Colección con Anomalía', MODcollection1bands);
//---------------------------------------------------------------------------------------------------------------------------------------------------------
/////////////////////////Parámetros de visualización dentro del mapa/////////////////////////////////////////////////////////////////////////////////////
//----------------------------------------------------------------------------------------------------------------------------------------------------------
var streamflow = ee.FeatureCollection("WWF/HydroSHEDS/v1/FreeFlowingRivers")
                   .filter(ee.Filter.bounds(zona_central_cuencas_ms))
                   .style({color: "B2B2B3", width: 1.0,});
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
// C = Cuenca
var outlineC = empty.paint({
    featureCollection: zona_central_cuencas,
    color: 1,
    width: 1
    });
// SB = Subcuenca
var outlineSB = empty.paint({ 
    featureCollection: zona_central_cuencas_ms, 
    color: 1,
    width: 1
    });
Map.setCenter(-70.8394, -33.4874, 7);
Map.setOptions('Satellite');
//-----------------------------------------------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////GRÁFICOS/////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------------------------------------------------------------------------------
// DOyYtime serie 2000-2020 
var chartDOY = 
  ui.Chart.image.series({
    imageCollection: JoinColHC, 
    region: zona_central_cuencas_ms,
    reducer: ee.Reducer.mean(),
    scale: 500,
    xProperty:'DAY_OF_YEAR'
  }).setSeriesNames(["NDSI actual", "NDSI histórico"])
    .setOptions({
    title: 'Promedio NDSI por día del año en la sección media y superior de las cuencas de la zona central del país, usando MOD10A1. 2000-2021',
    curveType: 'function',
    vAxis: {title:'Promedio (%)'},
    hAxis: {title:'Día del año'},
 }); 
//////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// Interface UI - panel ///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------------------------------------------------------------------------------
///////////////////////////////////////// Create UI Panels/////////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------------------------------------------------------------------------------
var panel = ui.Panel({style: {width:'25.0%'}});
ui.root.insert(0,panel);
// Introduction 
var intro = ui.Label('Observatorio Satelital de Nieves', 
  {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
);
var description = ui.Label('A partir de la información histórica disponible del producto de nieves del sensor MODIS (MOD10A1)'+
' se calcula el promedio del Índice Normalizado de Nieve (NDSI) para cada día del año (DOY, Day Of Year) en el periodo 2000-2020 correspondiente a la sección media-superior de las cuencas de la zona central.'+
' Esta información se compara con el estado actual y se presenta en un gráfico de la actual temporada.'+
' La interfaz presente en el mapa permite recorrer y observar la desviación desde el promedio (anomalía) para cada DOY hasta la última imagen más actual disponible.', {});
///////////////////////////////////////Area dropdown selection /////////////////////////////////////////////////////////
// Define link para thumbnail
var link = ui.Label('Observatorio Satelital de Nieve', {},'http://observatorionieves.cl/');
// Logo TeleAmb
var logo_teleamb = ui.Thumbnail({image:logo_Teleamb,params:{dimensions: '300x93', bands:['b1','b2','b3'],min:0,max:255}, style:{width:'300px',height:'93px',padding :'0'}});
//Logo Observatorio 
var logo_observatorio = ui.Thumbnail({image:logo_Observatorio,params:{dimensions: '250x114', bands:['b1','b2','b3'],min:0,max:255}, style:{width:'250px',height:'114px',padding :'0'}});
//-----------------------------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////////////// Create labeled colorbar legend ///////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------------------------------------------------------------
// Create and add SCF/SDD colorbar legends to map.
// ===============================================
var Etiquetas = ['-100 - -80','-80 - -60','-60 - 40','-40 - -20', '-20 - -10', '-10 - -5', '-5 - 00',' 00 - 5', '5 - 10' , '10 - 20', '20 - 40', '40 - 60', '60 - 80', '80 - 100'];  
// Configuracion del titulo y posicion de la leyenda
var Titulo = ui.Label({
  value: 'Anomalía (%)', // Titulo de la leyenda
  style: {fontWeight: 'bold', fontSize: '18px', margin: '0px 0px 15px 0px',}}); // Estilo y dimensiones
var Leyenda = ui.Panel({
  style: {position: 'bottom-left', padding: '10px 20px'}}); // Posicion, altura y anchura
Leyenda.add(Titulo);
// Configuracion de la simbologia
var Simbologia = ['ff2300', 'ff7e33', 'ffb631', 'fff704','1cff0e', '1bce84','ffffff','ffffff','1ee9e9', '41b6c4','1d91c0','225ea8','253494','081d58']; 
                 //rojo, naranjo, mostaza, amarillo, verde, verde agua, blanco, blanco, celeste claro, celeste, azul,  azul eléctrico, azul oscuro
var Simbolos = function(simbolo, texto) {
var TextoLeyenda = ui.Label({
  value: texto,
  style: {margin: '6px 0px 10px 15px'}}); // Posicion en la separacion de los textos
var CajaLeyenda = ui.Label({
  style: {backgroundColor: '#' + simbolo,
  padding: '15px', // TamaÃ±o del simbolo
  margin: '0px 0px 6px 60px'}}); // Posicion en la separacion de los simbolos
// Representacion de leyenda en el visor
return ui.Panel({
  widgets: [CajaLeyenda, TextoLeyenda],
  layout: ui.Panel.Layout.Flow('horizontal')});};
for (var i = 0; i < 14; i++) {Leyenda.add(Simbolos(Simbologia[i], Etiquetas[i]));} 
panel.add(logo_observatorio);
panel.add(link);
panel.add(intro);
panel.add(description);
panel.add(Leyenda);
panel.add(chartDOY);
panel.add(logo_teleamb);
//------------------------------------------------------------------------------------------------------------------------------------
/////////////////// Select images from a collection with a silder/////////////////////////////////////////////////////////////////////
//-------------------------------------------------------------------------------------------------------------------------------------
// DOY actual para utilizarlo dentro del UI Slider
var maximo = DOYcurrent.getInfo();
// print('DOY actual', maximo);
var fecha = MODISsorted.date().format('YYYY-MM-dd');
// print('fecha', fecha);
var labelDate = ee.String("Última imagen disponible: ").cat(fecha);
// A helper function to show the image for a given year on the default map.
var showLayer = function(day) {
  Map.layers().reset();
// Agregar colección con NDSI histórico, actual y anomalia 
var CurrentStateDOY = ee.Image(MODcollection3bands .filter(ee.Filter.eq('DAY_OF_YEAR', day)).first());
     //// Primera banda NDSI_current 
   Map.addLayer({
    eeObject: ee.Image(CurrentStateDOY.select('NDSI_current')), 
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
///// Segunda banda NDSI_HISTORIC   
  Map.addLayer({
    eeObject: ee.Image(CurrentStateDOY.select('NDSI_historic')), 
    visParams: {
     min: 0, 
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
    name: 'NDSI histórico'
  });
///// Tercera banda ANOMALIA 
  Map.addLayer({
    eeObject: ee.Image(CurrentStateDOY.select('Anomaly')), 
    visParams: {
     min: -100, 
     max: 100,
     palette:Simbologia
    },
    name: 'Anomalía'
  });
   Map.addLayer(outlineSB, {palette: '000000'}, 'SubSubcuencas sección media-superior zona central de Chile');
   Map.addLayer(streamflow,{}, 'Red hídrica');  
   Map.addLayer(outlineC, {palette: 'FF0000'}, 'Cuencas zona central de Chile');
  };
// Create a label and slider.
var label = ui.Label(labelDate.getInfo());
var label3 = ui.Label('Día del año (DOY)');
var slider = ui.Slider({
  min: 1,
  max: maximo,
  value: maximo,
  step: 1,
  onChange: showLayer,
  style: {stretch: 'horizontal'}
});
var button1 = ui.Button({
  label: '<<<',
  onClick: function() {
  var numero = (slider.getValue()) - 1;
  slider.setValue(numero);
//  print(numero);
  showLayer(numero);
  }
});
var button2 = ui.Button({
  label: '>>>',
  onClick: function() {
  var numero = (slider.getValue()) + 1;
 if (numero >= maximo) {
    numero = maximo;
}
  slider.setValue(numero);
 // print(numero);
  showLayer(numero);
  }
});
// Create a panel that contains both the slider and the label.
var panel = ui.Panel({
  widgets: [label, label3, slider, button1, button2],
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left', //top-left
    padding: '10px' //7px
  }
});
// Add the panel to the map.
Map.add(panel);
// Set default values on the slider and map.
slider.setValue(2000);
showLayer(DOYcurrent);