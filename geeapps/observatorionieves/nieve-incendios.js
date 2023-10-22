var MOD10A1 = ui.import && ui.import("MOD10A1", "imageCollection", {
      "id": "MODIS/006/MOD10A1"
    }) || ee.ImageCollection("MODIS/006/MOD10A1"),
    MYD10A1 = ui.import && ui.import("MYD10A1", "imageCollection", {
      "id": "MODIS/006/MYD10A1"
    }) || ee.ImageCollection("MODIS/006/MYD10A1"),
    Zonacentral = ui.import && ui.import("Zonacentral", "table", {
      "id": "users/observatorionieves/Cuencas/cuencas_zona_central_ms"
    }) || ee.FeatureCollection("users/observatorionieves/Cuencas/cuencas_zona_central_ms"),
    logo_Observatorio = ui.import && ui.import("logo_Observatorio", "image", {
      "id": "users/observatorionieves/Logos/Logo_Observatorio"
    }) || ee.Image("users/observatorionieves/Logos/Logo_Observatorio"),
    logo_Teleamb = ui.import && ui.import("logo_Teleamb", "image", {
      "id": "users/observatorionieves/Logos/Logo_TeleAmb"
    }) || ee.Image("users/observatorionieves/Logos/Logo_TeleAmb"),
    if2015 = ui.import && ui.import("if2015", "table", {
      "id": "users/observatorionieves/IF_2015"
    }) || ee.FeatureCollection("users/observatorionieves/IF_2015"),
    if2016 = ui.import && ui.import("if2016", "table", {
      "id": "users/observatorionieves/IF_2016"
    }) || ee.FeatureCollection("users/observatorionieves/IF_2016"),
    if2017 = ui.import && ui.import("if2017", "table", {
      "id": "users/observatorionieves/IF_2017"
    }) || ee.FeatureCollection("users/observatorionieves/IF_2017");
//////////////////////////////////////////////////////////////////////////////////////////////////////
///                                  Codigo Frecuencia Nieves, incendios                      ///////
///                                  Zona centro sur de los Andes - Chile                     //////
//////////////////////////////////////////////////////////////////////////////////////////////////// 
//--------------------------------------------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////     DATOS DE NIEVE    /////////////////////////////
//--------------------------------------------------------------------------------------------------
//--------------------------------------------COLECCIONES ------------------------------------------
//Map.addLayer(Zonacentral,{},'Zona central Chile')
// Colección con datos de nieveMODIS Terra
var MOD10A1select = MOD10A1
                      .select(['NDSI_Snow_Cover'])
                      .map(function(image){return image.clip(Zonacentral)});
print('Total imágenes Terra:', MOD10A1select.size());
// Colección con datos de nieves Aqua
var MYD10A1select = MYD10A1
                      .select(['NDSI_Snow_Cover']) 
                      .map(function(image){return image.clip(Zonacentral)});
print('Total imágenes Aqua:', MYD10A1select.size());
// Umbral NDSI para transformar a valores binarios
var umbralNDSI = 40;
//-------------------------------------------------------------------------------------------------------------
//////////////////////////////// Funciones ////////////////////////////////////////////////////////////////////
//-------------------------------------------------------------------------------------------------------------
///binario
var ReclassifyModis = function(img) {
  var snow = img.select('NDSI_Snow_Cover').gte(umbralNDSI).multiply(100).rename('snow');
  return img.addBands(snow);
}; 
// Aplicar reclasificación a la colección TERRA
var MODcollectionLC = MOD10A1select.map(ReclassifyModis);
// Aplicar reclasificación a la colección AQUA
var MYDcollectionLC = MYD10A1select.map(ReclassifyModis);
///////////////////////////////////////////////////////////////////////////////////////////
/////////------------------------- Unión datos MODIS ------------------------/////////////
//////////////////////////////////////////////////////////////////////////////////////////
// Cambiar nombres a las bandas Terra
var MODcolLC = MODcollectionLC.select(['NDSI_Snow_Cover',
                                       'snow'],
                                      ['NDSI_T',
                                       'snow_binario_T']);
// print('Colección Terra', MODcollectionLC.first());
// Cambiar nombres a las bandas Aqua
var MYDcolLC = MYDcollectionLC.select(['NDSI_Snow_Cover',
                                      'snow'],
                                      ['NDSI_A',
                                       'snow_binario_A'
                                       ]);
// print('Colección Aqua', MYDcollectionLC.first());
//----------------------------UNIÓN DE COLECCIONES TA-------------------------------------------------------------------------------------------------------//
// Definir una unión entre Terra y Aqua 
var innerJoin = ee.Join.inner();
// Especifique un filtro igual para las marcas de tiempo de las imágenes
var filterTimeEq = ee.Filter.equals({
  leftField: 'system:time_start',
  rightField: 'system:time_start'
});
// Aplicar unión
var innerJoinedMODISBND = innerJoin.apply(MODcolLC, MYDcolLC, filterTimeEq);
// Asignar una función para fusionar los resultados en la FeatureCollection de salida  
var joinedMODISTALC = ee.ImageCollection(innerJoinedMODISBND.map(function(feature) {
  return ee.Image.cat(feature.get('primary'), feature.get('secondary'));
}));
var MODcollection = joinedMODISTALC
                    .filter(ee.Filter.calendarRange(2002,2022,'year'))
                    .map(function(image){return image.clip(Zonacentral)})
                    .select('snow_binario_T','snow_binario_A');
// Overall SCI mean
var SCImean = MODcollection.mean();
print('Frecuencia de nieves', SCImean);
// Define RGB visualization parameters.
var visParams = {
  min: 0.0,
  max: 100.0,
  palette: [
            'fffff0', //  0 - 10
            'ffffb4', // 10 - 20
            'ffebbe', // 20 - 30
            'ffd37f', // 30 - 40
            'ffaa00', // 40 - 50
            'ff9800', // 50 - 60
            '70a800', // 60 - 70
            '00a884', // 70 - 80
            '0084a8', // 80 - 90
            '004c99'  // 90 - 100
 ],
};
//Map.addLayer(SCImean.clip(Zonacentral).select('snow_binario_T'), visParams,'SCI mean Binary T');
//Map.addLayer(SCImean.clip(Zonacentral).select('snow_binario_A'), visParams,'SCI mean Binary A');
//--------------------------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////     DATOS DE INCENDIOS    ///////////////////////////
//--------------------------------------------------------------------------------------------------
var dataset = ee.ImageCollection('MODIS/006/MCD64A1')
              .filter(ee.Filter.date('2000-01-01', '2022-12-31'));
var burnedArea = dataset.select('BurnDate').map(function(image){return image.clip(Zonacentral)});
var burnedAreaMean = burnedArea.mean();
print('Áreas quemadas MODIS monthly',burnedAreaMean);
var burnedAreaVis = {
  min: 30.0,
  max: 341.0,
  palette: ['4e0400', '951003', 'c61503', 'ff1901'],
};
//Map.addLayer(burnedAreaMean, burnedAreaVis, 'Burned Area MODIS monthly'); 
// --------------------------------------------------------------------------------------------------------//
//////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// INTERFAZ DE USUARIO/ ///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//---------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------------------
///////////////////////// PARÁMETROS DE VISUALIZACIÓN ////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------------------------------
var streamflow = ee.FeatureCollection("WWF/HydroSHEDS/v1/FreeFlowingRivers")
                   .filter(ee.Filter.eq('BAS_ID', 3975615))
                   .style({color: "B2B2B3", width: 2.0,});
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
// SB = Subcuenca
var outlineSB = empty.paint({ 
    featureCollection: Zonacentral,
    color: 1,
    width: 1
    });
Map.setCenter(-70.4381, -32.7502, 7);
Map.setOptions('Satellite');
//-----------------------------------------------------------------------------------------------------------------------------------------------------------
//////////////////////////////////// PANELES UI /////////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------------------------------------------------------------------------------
var panel = ui.Panel({style: {width:'25.0%'}});
ui.root.insert(0,panel);
// Introduccion 
var intro = ui.Label('Observatorio Satelital de Nieves', 
  {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
);
var description = ui.Label('Información de frecuencia de nieves, con información de areas quemadas mensuales, ambos productos pertenecientes al sensor MODIS'+
' para la zona central de chile, información desde el año 2000 hasta la actualidad', {});
/////////////////////////////////////// LOGOS /////////////////////////////////////////////////////////
// Define link para thumbnail
var link = ui.Label('Observatorio Satelital de Nieve', {},'http://observatorionieves.cl/');
// Logo Observatorio 
var logo_observatorio = ui.Thumbnail({image:logo_Observatorio,params:{dimensions: '250x114', bands:['b1','b2','b3'],min:0,max:255}, style:{width:'250px',height:'114px',padding :'0'}});
// Logo TeleAmb
var logo_teleamb = ui.Thumbnail({image:logo_Teleamb,params:{dimensions: '300x93', bands:['b1','b2','b3'],min:0,max:255}, style:{width:'300px',height:'93px',padding :'0'}});
//----------------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////// LEYENDA ////////////////////////////////////////////////////////////////////////////
//--------------------------------------------------------------------------------------------------------------------------
// Creación de leyenda y colores
// ===============================================
var Etiquetas = ['0 - 10','10 - 20','20 - 30','30 - 40', '40 - 50', '50 - 60', '60 - 70',' 70 - 80', '80 - 90' , '90 - 100'] 
// Configuracion del titulo y posicion de la leyenda
var Titulo = ui.Label({
  value: 'Frecuencia nieve', // Titulo de la leyenda
  style: {fontWeight: 'bold', fontSize: '18px', margin: '0px 0px 15px 0px',}}); // Estilo y dimensiones
var Leyenda = ui.Panel({
  style: {position: 'bottom-left', padding: '8px 8px'}}); // Posicion, altura y anchura
Leyenda.add(Titulo);
// Configuracion de la simbologia de la anomalía
var Simbologia = ['fffff0','ffffb4','ffebbe','ffd37f','ffaa00','ff9800','70a800','00a884','0084a8','004c99']; 
var Simbolos = function(simbolo, texto) {
var TextoLeyenda = ui.Label({
  value: texto,
  style: {margin: '6px 0px 10px 15px'}}); // Posicion en la separacion de los textos
var CajaLeyenda = ui.Label({
  style: {backgroundColor: '#' + simbolo,
  padding: '10px', // Tamaño del simbolo
  margin: '0px 0px 6px 60px'}}); // Posicion en la separacion de los simbolos
// Representacion de leyenda en el visor
return ui.Panel({
  widgets: [CajaLeyenda, TextoLeyenda],
  layout: ui.Panel.Layout.Flow('horizontal')});};
for (var i = 0; i < 10; i++) {Leyenda.add(Simbolos(Simbologia[i], Etiquetas[i]));} 
// Agregar capas al panel
panel.add(logo_observatorio);
panel.add(link);
panel.add(intro);
panel.add(description);
panel.add(Leyenda);
panel.add(logo_teleamb);
////////////////////////////////// agregar bandas //////////////
  ///// NDSI TERRA 
  Map.addLayer({
    eeObject: ee.Image(SCImean.select('snow_binario_T')),
    visParams: {
    min: 0, 
    max: 100,
    palette: ['fffff0','ffffb4','ffebbe','ffd37f','ffaa00','ff9800','70a800','00a884','0084a8','004c99']
    },
    name:'Snow Terra'
  });
///// NDSI AQUA
  Map.addLayer({
    eeObject: ee.Image(SCImean.select('snow_binario_A')), 
    visParams: {
     min: 0, 
     max: 100,
     palette: ['fffff0','ffffb4','ffebbe','ffd37f','ffaa00','ff9800','70a800','00a884','0084a8','004c99']
    },
    name:'Snow Aqua'
  });
  //// Segunda banda NDSI_current 
   Map.addLayer({
    eeObject: ee.Image(burnedAreaMean.select('BurnDate')), 
    visParams: {
     min: 0, 
    max: 365,
    palette: ['4e0400', '951003', 'c61503', 'ff1901']
    },
    name:'Burn date' //String(day)
  });
 /* ///// Catastro agricola   
  Map.addLayer({
    eeObject: ee.Image(.select('')), 
    visParams: {
     min: 0, 
    max: 100,
     },
    name: Catastro agricola
  });
 */
Map.addLayer(outlineSB, {palette: '000000'}, 'SubSubcuencas');
Map.addLayer(streamflow,{}, 'Red hídrica');