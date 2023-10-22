var table = ui.import && ui.import("table", "table", {
      "id": "users/juliodavid961/Ecuador_6"
    }) || ee.FeatureCollection("users/juliodavid961/Ecuador_6");
/*
Provincia
*/
var table = ee.FeatureCollection('users/juliodavid961/Ecuador_6')
print(table)
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
 var select = ui.Select({
   items: Object.keys(Provincia) , 
   placeholder:'Seleccione Provincia', 
   onChange: function(i){
    Map.addLayer(table.filter(ee.Filter.inList('DPA_DESPRO', [i])))
     Map.centerObject(table.filter(ee.Filter.inList('DPA_DESPRO', [i])), 10 )
     print (i)
   }
 })
print(select)
/*=================
Diccionario de Widgets
=======================*/
var bandas = {
"CO_column_number_density": [], 
"NO2_column_number_density": [], 
"O3_column_number_density": [],
}
var dicobjetos = {
  Sliderfecha:ui.DateSlider({start:'2018-08-01', end:'2020-12-31', period: 15, onChange:function(){}}),
  select:{
    b1: ui.Select({items: Object.keys(bandas), placeholder: 'Seleccione Banda', onChange:function(){}}),
    b2: ui.Select({items: Object.keys(Provincia), placeholder: 'Seleccione Provincia', onChange:function(i){
    Map.addLayer(table.filter(ee.Filter.inList('DPA_DESPRO', [i])))
     Map.centerObject(table.filter(ee.Filter.inList('DPA_DESPRO', [i])), 10 )
     print (i)
   }}),
  }
  //label: ui.Label('Min: ', {}),
  //slider:ui.Slider({min: 500, max:5000, step: 100, onChange: function(){}}),
}
var panelv = ui.Panel({widgets:[
dicobjetos.select.b1,
dicobjetos.select.b2
], layout: ui.Panel.Layout.Flow('horizontal'), style: {backgroundColor: '00000000'}})
var boton = ui.Button({label:'Aplicar', onClick:function(b){
var aux = dicobjetos.select.b1.getValue()
 if(aux == "CO_column_number_density") {print()
   var CO = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_CO')
  .filterDate(ee.Date(dicobjetos.Sliderfecha.getValue()[0]).format('YYYY-MM-dd'), ee.Date(dicobjetos.Sliderfecha.getValue()[1]).format('YYYY-MM-dd')) 
  var layer = ui.Map.Layer(CO, {bands: [dicobjetos.select.b1.getValue()]
    }, 'Sentinel 5P')
  //var provincia_seleccionada = select.getValue()
  //var pro_1 = (table.filter(ee.Filter.inList(provincia_seleccionada, )))
  //var pro_2 = (table.filter(ee.Filter.inList(provincia_seleccionada, )))
   //print (pro_2)
        var SentinelCO = CO
        .select('CO_column_number_density')
        .filterBounds (table);
        var COData = ee.Image(SentinelCO.median());
        var COClip = COData.clip (table);
        Map.addLayer (COClip, {
        max: 0.05, 
        min: 0.0, 
        palette: ["black", "blue", "purple", "cyan", "green", "yellow", "red"]}, 
        'CO');
        //Export.image.toDrive({
        //image: COClip.select("CO_column_number_density"),
        //description: 'CO_GUAMANI_2018_08_',
        //scale: 1100,
        //region: provincia_seleccionada });
 } else if(aux == "NO2_column_number_density") {print()
   var NO2 = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_NO2')
  .filterDate(ee.Date(dicobjetos.Sliderfecha.getValue()[0]).format('YYYY-MM-dd'), ee.Date(dicobjetos.Sliderfecha.getValue()[1]).format('YYYY-MM-dd')) 
  var layer = ui.Map.Layer(NO2, {bands: [dicobjetos.select.b1.getValue()]
    }, 'Sentinel 5P')
  //var provincia_seleccionada = select.getValue()
  //var pro_1 = (table.filter(ee.Filter.inList(provincia_seleccionada, )))
  //var pro_2 = (table.filter(ee.Filter.inList(provincia_seleccionada, )))
   //print (pro_2)
 var SentinelNO2Total = NO2
  .select('NO2_column_number_density')
  .filterBounds (table);
var NO2TotalData = ee.Image(SentinelNO2Total.median());
var NO2TotalClip = NO2TotalData.clip (table);
Map.addLayer (NO2TotalClip, {
  max: 0.0002, 
  min: 0.0, 
  palette: ["black", "blue", "purple", "cyan", "green", "yellow", "red"]}, 
  'NO2 Total');
} else if(aux == "O3_column_number_density") {print()
   var O3 = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_O3')
  .filterDate(ee.Date(dicobjetos.Sliderfecha.getValue()[0]).format('YYYY-MM-dd'), ee.Date(dicobjetos.Sliderfecha.getValue()[1]).format('YYYY-MM-dd')) 
  var layer = ui.Map.Layer(O3, {bands: [dicobjetos.select.b1.getValue()]
    }, 'Sentinel 5P')
  //var provincia_seleccionada = select.getValue()
  //var pro_1 = (table.filter(ee.Filter.inList(provincia_seleccionada, )))
  //var pro_2 = (table.filter(ee.Filter.inList(provincia_seleccionada, )))
   //print (pro_2)
 var SentinelO3Total = O3
  .select('O3_column_number_density')
  .filterBounds (table);
var O3TotalData = ee.Image(SentinelO3Total.median());
var O3TotalClip = O3TotalData.clip (table);
Map.addLayer (O3TotalClip, {
  max: 0.05, 
  min: 0, 
  palette: ["black", "blue", "purple", "cyan", "green", "yellow", "red"]}, 
  'O3 Total');   
}}})
/*PANEL PRINCIPAL*/
var panel = ui.Panel({widgets:[
dicobjetos.Sliderfecha,panelv, 
boton], layout: ui.Panel.Layout.Flow('vertical'), style: {backgroundColor: '00005555'}})
Map.add(panel)