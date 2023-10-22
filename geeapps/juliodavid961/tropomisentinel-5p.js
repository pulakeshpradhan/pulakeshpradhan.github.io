var table = ui.import && ui.import("table", "table", {
      "id": "users/juliodavid961/Ecuador_6"
    }) || ee.FeatureCollection("users/juliodavid961/Ecuador_6");
/*
Provincia
*/
var table = ee.FeatureCollection('users/juliodavid961/Ecuador_6')
//print(table)
/* Diccionario de dictrictos*/
var Provincia = {
'AZUAY' : [ 1 ] ,
'BOLIVAR' : [ 2 ] ,
'CAÑAR' : [ 3 ] ,
'COTOPAXI' : [ 4 ] ,
'CHIMBORAZO' : [ 5 ] ,
'EL ORO' : [ 6 ] ,
'ESMERALDAS' : [ 7 ] ,
'GUAYAS' : [ 8 ] ,
'IMBABURA' : [ 9 ] ,
'LOJA' : [ 11 ] ,
'LOS RIOS' : [ 12 ] ,
'MANABI' : [ 13 ] ,
'MORONA SANTIAGO' : [ 14 ] ,
'NAPO' : [ 15 ] ,
'PASTAZA' : [ 16 ] ,
'PICHINCHA' : [ 17 ] ,
'TUNGURAHUA' : [ 18 ] ,
'ZAMORA CHINCHIPE': [ 19 ] ,
'SUCUMBIOS': [ 21 ] ,
'ORELLANA': [ 22 ] ,
'SANTO DOMINGO DE LOS TSACHILAS': [ 23 ] ,
'SANTA ELENA': [ 24 ] ,
 }
 //print(Provincia)
// /*======================================
// inicio de la app
// ======================================*/
 /*var select = ui.Select({
   items: Object.keys(Provincia) , 
   placeholder:'Seleccione Provincia', 
   onChange: function(i){
    Map.addLayer(table.filter(ee.Filter.inList('DPA_DESPRO', [i])))
     Map.centerObject(table.filter(ee.Filter.inList('DPA_DESPRO', [i])), 10 )
     print (i)
   }
 })
print(select)*/
/*=================
Diccionario de Widgets
=======================*/
var bandas = {
"CO_column_number_density": [], 
"NO2_column_number_density": [], 
"O3_column_number_density": [],
}
var dicobjetos = {
  Sliderfecha:ui.DateSlider({start:'2018-08-01', end:ee.Date(Date.now()), period: 15, onChange:function(){}}),
  select:{
    b1: ui.Select({items: Object.keys(bandas), placeholder: 'Seleccione Banda', onChange:function(){}}),
    b2: ui.Select({items: Object.keys(Provincia), placeholder: 'Seleccione Provincia', onChange:function(i){
    Map.addLayer(table.filter(ee.Filter.inList('DPA_DESPRO', [i])))
    Map.centerObject(table.filter(ee.Filter.inList('DPA_DESPRO', [i])), 7 )
   }}),
  }
  //label: ui.Label('Min: ', {}),
  //slider:ui.Slider({min: 500, max:5000, step: 100, onChange: function(){}}),
}
var panelv = ui.Panel({widgets:[
dicobjetos.select.b1,
dicobjetos.select.b2
], layout: ui.Panel.Layout.Flow('horizontal'), 
  style: {backgroundColor: '00000000'}
})
var panel_3 = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '200px',
    margin: '4px 0px 53px 82px'
  }
  });
  var boton = ui.Button({label:'Aplicar', onClick:function(b){
  var aux = dicobjetos.select.b1.getValue()
  var prov_s = dicobjetos.select.b2.getValue()
  var Etiquetas,Titulo,Simbologia,TextoLeyenda,CajaLeyenda,i,Leyenda,Simbolos
  var layer,COData,COClip,panel_2
  panel_3.clear()
 if(aux == "CO_column_number_density") {print()
    var CO = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_CO')
  .filterDate(ee.Date(dicobjetos.Sliderfecha.getValue()[0]).format('YYYY-MM-dd'), ee.Date(dicobjetos.Sliderfecha.getValue()[1]).format('YYYY-MM-dd')) 
  layer = ui.Map.Layer(CO, {bands: [dicobjetos.select.b1.getValue()]
    }, 'Sentinel 5P')
  var puntos_CO = ee.FeatureCollection('users/juliodavid961/Ecuador_6')
  .filter(ee.Filter.eq('DPA_DESPRO', prov_s))  // Exactly the same as above.
  .first()
  .geometry();
  var SentinelCO = CO
  .select('CO_column_number_density')
  .filterBounds (puntos_CO);
  COData = ee.Image(SentinelCO.median());
  COClip = COData.clip (puntos_CO);
    Map.addLayer (COClip, {
    max: 0.05, 
    min: 0.0, 
    palette: ["black", "blue", "purple", "cyan", "green", "yellow", "red"]}, 
    'CO');
  // Descripcion del etiquetado de elementos de la leyenda
  Etiquetas = [
  '0 - 0.0125',
  '0.0150 - 0.0175',
  '0.02 - 0.0225',
  '0.0250 - 0.275',
  '0.03 - 0.325',
  '0.0350 - 0.375',
  '0.04 - 0.05',];
  Titulo = ui.Label({
  value: 'Niveles de CO (mol/m2)', // Titulo de la leyenda
  style: {fontWeight: 'bold', fontSize: '1em', margin: '0px 0px 0px 0px',}});
  panel_3.add(Titulo);
  // Configuracion de la simbologia
  Simbologia = ["black", "blue", "purple", "cyan", "green", "yellow", "red"];
  Simbolos = function(simbolo, texto) {
  TextoLeyenda = ui.Label({
    value: texto,
    style: {margin: '1px 0px 2px 3px'}}); // Posicion en la separacion de los textos
  CajaLeyenda = ui.Label({
    style: {backgroundColor: simbolo,
    padding: '10px', // Tamaño del simbolo
    margin: '0px 0px 0px 0px'}}); // Posicion en la separacion de los simbolos
  //Representacion de leyenda en el visor
  return ui.Panel({
    widgets: [CajaLeyenda, TextoLeyenda],
    layout: ui.Panel.Layout.Flow('horizontal')});};
  for (i = 0; i < 7; i++) {panel_3.add(Simbolos(Simbologia[i], Etiquetas[i]));} 
  Map.centerObject (COClip, 10);
 } else if(aux == "NO2_column_number_density") {
    var NO2 = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_NO2')
  .filterDate(ee.Date(dicobjetos.Sliderfecha.getValue()[0]).format('YYYY-MM-dd'), ee.Date(dicobjetos.Sliderfecha.getValue()[1]).format('YYYY-MM-dd')) 
  layer = ui.Map.Layer(NO2, {bands: [dicobjetos.select.b1.getValue()]
    }, 'Sentinel 5P')
  var puntos_NO2 = ee.FeatureCollection('users/juliodavid961/Ecuador_6')
  .filter(ee.Filter.eq('DPA_DESPRO', prov_s))  // Exactly the same as above.
  .first()
  .geometry();
  var SentinelNO2Total = NO2
  .select('NO2_column_number_density')
  .filterBounds (puntos_NO2);
  COData = ee.Image(SentinelNO2Total.median());
  COClip = COData.clip (puntos_NO2);
    Map.addLayer (COClip, {
      max: 0.0002, 
      min: 0.0, 
      palette: ["black", "blue", "purple", "cyan", "green", "yellow", "red"]}, 
      'NO2 Total');
  // Descripcion del etiquetado de elementos de la leyenda en base a maximos y minimos 
  Etiquetas = [
  '0 - 0.000125',
  '0.000130 - 0.000135',
  '0.000140 - 0.000145',
  '0.000150 - 0.000155',
  '0.000160 - 0.000165',
  '0.000170 - 0.000175',
  '0.000180 - 0.0002',];
  // Configuracion del titulo y posicion de la leyenda
  Titulo = ui.Label({
    value: 'Niveles de NO2 (mol/m2)', // Titulo de la leyenda
    style: {fontWeight: 'bold', fontSize: '1em', margin: '0px 0px 0px 0px',}}); // Estilo y dimensiones
  //Leyenda = ui.Panel({
    //style: {position: 'bottom-left'}}); // Posicion, altura y anchura*/
  panel_3.add(Titulo);
  // Configuracion de la simbologia
  Simbologia = ["black", "blue", "purple", "cyan", "green", "yellow", "red"];
  Simbolos = function(simbolo, texto) {
  TextoLeyenda = ui.Label({
    value: texto,
    style: {margin: '1px 0px 2px 3px'}}); // Posicion en la separacion de los textos
  CajaLeyenda = ui.Label({
    style: {backgroundColor: simbolo,
    padding: '10px', // Tamaño del simbolo
    margin: '0px 0px 0px 0px'}}); // Posicion en la separacion de los simbolos
  //Representacion de leyenda en el visor
  return ui.Panel({
    widgets: [CajaLeyenda, TextoLeyenda],
    layout: ui.Panel.Layout.Flow('horizontal')});};
  for (i = 0; i < 7; i++){panel_3.add(Simbolos(Simbologia[i], Etiquetas[i]));} 
  Map.centerObject (COClip, 10);
} else if(aux == "O3_column_number_density") {print()
  var O3 = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_O3')
  .filterDate(ee.Date(dicobjetos.Sliderfecha.getValue()[0]).format('YYYY-MM-dd'), ee.Date(dicobjetos.Sliderfecha.getValue()[1]).format('YYYY-MM-dd')) 
  layer = ui.Map.Layer(O3, {bands: [dicobjetos.select.b1.getValue()]
    }, 'Sentinel 5P')
  var puntos_O3 = ee.FeatureCollection('users/juliodavid961/Ecuador_6')
  .filter(ee.Filter.eq('DPA_DESPRO', prov_s))  // Exactly the same as above.
  .first()
  .geometry();
  var SentinelO3Total = O3
  .select('O3_column_number_density')
  .filterBounds (puntos_O3);
  COData = ee.Image(SentinelO3Total.median());
  COClip = COData.clip (puntos_O3);
    Map.addLayer (COClip, {
      max: 0.05, 
      min: 0, 
      palette: ["black", "blue", "purple", "cyan", "green", "yellow", "red"]}, 
      'O3 Total');  
  // Descripcion del etiquetado de elementos de la leyenda
  Etiquetas = [
  '0 - 0.0125 m',
  '0.0150 - 0.0175',
  '0.02 - 0.0225',
  '0.0250 - 0.275',
  '0.03 - 0.325',
  '0.0350 - 0.375',
  '0.04 - 0.05',];
  // Configuracion del titulo y posicion de la leyenda
  Titulo = ui.Label({
    value: 'Niveles de O3 (mol/m2)', // Titulo de la leyenda
    style: {fontWeight: 'bold', fontSize: '1em', margin: '0px 0px 0px 0px',}}); // Estilo y dimensiones
  /*Leyenda = ui.Panel({
    style: {position: 'bottom-left'}}); // Posicion, altura y anchura*/
  panel_3.add(Titulo);
  // Configuracion de la simbologia
  Simbologia = ["black", "blue", "purple", "cyan", "green", "yellow", "red"];
  Simbolos = function(simbolo, texto) {
  TextoLeyenda = ui.Label({
    value: texto,
    style: {margin: '1px 0px 2px 3px'}}); // Posicion en la separacion de los textos
  CajaLeyenda = ui.Label({
    style: {backgroundColor: simbolo,
    padding: '10px', // Tamaño del simbolo
    margin: '0px 0px 0px 0px'}}); // Posicion en la separacion de los simbolos
  //Representacion de leyenda en el visor
  return ui.Panel({
    widgets: [CajaLeyenda, TextoLeyenda],
    layout: ui.Panel.Layout.Flow('horizontal')});};
  for (i = 0; i < 7; i++) {panel_3.add(Simbolos(Simbologia[i], Etiquetas[i]));} 
  Map.centerObject (COClip, 10);
}
}
})
/*PANEL PRINCIPAL*/
var panel = ui.Panel({widgets:[
dicobjetos.Sliderfecha,panelv, 
boton,panel_3], layout: ui.Panel.Layout.Flow('vertical'), style: {backgroundColor: '00005555',position:'bottom-left'}})
Map.add(panel)