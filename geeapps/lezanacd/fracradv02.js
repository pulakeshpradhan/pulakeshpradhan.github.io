/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var table = ee.FeatureCollection("users/lezanacd/frac_2220"),
    table2 = ee.FeatureCollection("users/lezanacd/Dptos_22"),
    table3 = ee.FeatureCollection("users/lezanacd/pais2220");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var opacity_frac = {
  Opacity: 80
};
var opacity_rad = {
  Opacity: 80
};
var dpto_style = {width:5, color: '000000', fillColor: ' #ffffff'};
var frac_style =  {width:4, color: '10760B', fillColor: ' #80ff80'};
var rad_style =  {width:3, color: 'CB0312', fillColor: ' #E74C3C'};
/*
Departamentos
*/
print(table2);
/* Diccionario de departamentos*/
var dic_Deptos = {
'007' : [ 'Almirante Brown' ] ,
'014' : [ 'Bermejo' ] ,
'021' : [ 'Comandante Fernandez' ] ,
'028' : [ 'Chacabuco' ] ,
'036' : [ '12 de Octubre' ] ,
'039' : [ '2 de Abril' ] ,
'043' : [ 'Fray J. Sta. Maria de Oro' ] ,
'049' : [ 'General Belgrano' ] ,
'056' : [ 'General Donovan' ] ,
'063' : [ 'General Guemes' ] ,
'070' : [ 'Independencia' ] ,
'077' : [ 'Libertad' ] ,
'084' : [ 'General San Martín' ] ,
'091' : [ 'Maipú' ] ,
'098' : [ 'Mayor L.J. Fontana' ] ,
'105' : [ '9 de Julio' ] ,
'112' : ['O Higgins' ] ,
'119': [ 'Pres. de la Plaza' ] ,
'126': [ '1ro de Mayo' ] ,
'133' : ['Quitilipi'] ,
'140' : [ 'San Fernando' ] ,
'147' : ['San Lorenzo'] ,
'154' : ['Sgto. Cabral'] ,
'161' : ['Tapenagá'] ,
'168' : ['25 de Mayo'] ,
}
print(dic_Deptos);
print(table);
print(table3);
/*======================================
inicio de la app
======================================*/
/*
var select = ui.Select({
  items: Object.keys(Deptos) , 
  placeholder:'Seleccione Departamento', 
  onChange: function(i){
    Map.addLayer(table2.filter(ee.Filter.inList('NOM_DPTO', [i])))
    Map.centerObject(table2.filter(ee.Filter.inList('NOM_DPTO', [i])), 10)
  }
});
print(select);
var nom_dpto = select;
*/
/*======================================
diccionario de objetos
======================================*/
//diccionario de Fracciones
var dic_fraccion ={
 '01': ['01'],
 '02': ['02'],
 '03': ['03'],
 '04': ['04'],
 '05': ['05'],
 '06': ['06'],
 '07': ['07'],
 '08': ['08'],
 '09': ['09'],
 '10': ['10'],
 '11': ['11'],
 '12': ['12'],
 '13': ['13'],
 '14': ['14'],
 '21': ['21'],
 '22': ['22'],
 '23': ['23'],
 '24': ['24'],
 '25': ['25'],
 '27': ['27'],
}
//Diccionario de radios
var dic_radio ={
 '01': ['01'],
 '02': ['02'],
 '03': ['03'],
 '04': ['04'],
 '05': ['05'],
 '06': ['06'],
 '07': ['07'],
 '08': ['08'],
 '09': ['09'],
 '10': ['10'],
 '11': ['11'],
 '12': ['12'],
 '13': ['13'],
 '14': ['14'],
 '15': ['15'],
 '16': ['16'],
 '22': ['22'],
}
var dicobjetos = {
  select:{
    dptos: ui.Select({
    items: Object.keys(dic_Deptos), 
    placeholder:'Seleccione Departamento', 
    onChange: function(k){
    (table2.filter(ee.Filter.inList('NOM_DPTO', [k])))
    //Map.centerObject(table2.filter(ee.Filter.inList('NOM_DPTO', [k])), 10)
    }}),
    label3: ui.Label('Departamentos:', {}),
    frac: ui.Select({
    items: Object.keys(dic_fraccion), 
    placeholder:'Seleccione Fraccion', 
    onChange: function(i){
    (table.filter(ee.Filter.inList('FRAC', [i])))
   //Map.centerObject(table.filter(ee.Filter.inList('FRAC', [i])), 10)
    }}),
    label: ui.Label('Fracciones:', {}),
    rad: ui.Select({
    items: Object.keys(dic_radio),
    placeholder:'Seleccione Radio', 
    onChange: function(j){
    (table3.filter(ee.Filter.inList('RADIO', [j])))
    //Map.centerObject(table3.filter(ee.Filter.inList('RADIO', [j])), 10)
    }}),
    label2: ui.Label('Radio:', {}),
    }
}  
//Objetos del panel
var panelv = ui.Panel({widgets:[
dicobjetos.select.dptos,
dicobjetos.select.frac,
dicobjetos.select.rad], layout: ui.Panel.Layout.Flow('horizontal'), style: {backgroundColor: '00000000'}});
var k = (dicobjetos.select.dptos.getValue());
//var i = (dicobjetos.select.frac.getValue());
/*
-----------------------------------
Boton de departamento
-----------------------------------
*/
var boton = ui.Button({label:'ver depto', onClick:function(b){
  print( dicobjetos.select.dptos.getValue(),dicobjetos.select.frac.getValue(),dicobjetos.select.rad.getValue()),
  k = (dicobjetos.select.dptos.getValue()),
  print(k),
  Map.addLayer(table2.filter(ee.Filter.inList('DEPTO', [k])).style(dpto_style))
  Map.centerObject(table2.filter(ee.Filter.inList('DEPTO', [dicobjetos.select.dptos.getValue()])))
}})
/*
-----------------------------------
Boton de Fraccion
-----------------------------------
*/
var boton2 = ui.Button({label:'ver fraccion', onClick:function(j){
 // print( dicobjetos.select.dptos.getValue(),dicobjetos.select.frac.getValue(),dicobjetos.select.rad.getValue()),
  //Map.clear();
  j = (dicobjetos.select.dptos.getValue()+dicobjetos.select.frac.getValue()),
  print(j),
  Map.addLayer(table.filter(ee.Filter.inList('DEP_FRAC', [j])).style(frac_style),opacity_frac),
  Map.centerObject(table.filter(ee.Filter.inList('DEP_FRAC', [j])), 10)
}})
/*
-----------------------------------
Boton de Radio
-----------------------------------
*/
var boton3 = ui.Button({label:'ver radio', onClick:function(v){
 // print( dicobjetos.select.dptos.getValue(),dicobjetos.select.frac.getValue(),dicobjetos.select.rad.getValue()),
  //Map.clear();
  v = ('22'+dicobjetos.select.dptos.getValue()+dicobjetos.select.frac.getValue()+dicobjetos.select.rad.getValue()),
  print(v),
  Map.addLayer(table3.filter(ee.Filter.inList('LINK', [v])).style(rad_style),opacity_rad),
  Map.centerObject(table3.filter(ee.Filter.inList('LINK', [v])), 10)
}})
/*
-----------------------------------
Boton de limpiar
-----------------------------------
*/
var boton4 = ui.Button({label:'Limpiar', onClick:function(p){
 Map.clear();
 Map.add(panel)
}})
//Panel Principal
var panel = ui.Panel({widgets:[
panelv,  
//dicobjetos.label,
//dicobjetos.label2,
boton, boton2,boton3, boton4], layout: ui.Panel.Layout.Flow('vertical'), style: {backgroundColor: '00005555', position: 'bottom-right'}})
Map.add(panel)
// Create the application title bar.
Map.add(ui.Label(
    'Fracciones y Radios Rurales - Redimensión 2022', {fontWeight: 'bold', fontSize: '20px'}));
// Styling for the legend title.
var LEGEND_TITLE_STYLE = {
  fontSize: '20px',
  fontWeight: 'bold',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '4px',
};
// Styling for the legend footnotes.
var LEGEND_FOOTNOTE_STYLE = {
  fontSize: '10px',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '4px',
};
// Assemble the legend panel.
Map.add(ui.Panel(
    [
      ui.Label(
          'Fuente: Conteo de viviendas: ADRA, MMUVRA 2019-2021 (INDEC)', LEGEND_FOOTNOTE_STYLE),
      ui.Label('Cobertura de Radios del CNPVyH - 2022(Base 2010)', LEGEND_FOOTNOTE_STYLE)
    ],
    ui.Panel.Layout.flow('vertical'),
    {width: '230px', position: 'bottom-left'}));
//Map.addLayer(table2);