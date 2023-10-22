//Agregar utilidades WEB APP
var constantes = require('users/PrioGLADpy/test_2021:tools/constantes');
var funciones = require('users/PrioGLADpy/test_2021:tools/funciones');
//Paneles
var panel1 = ui.Panel({style: {width: '350px'}});
var panel2 = ui.Panel({style: {width: '350px'}});
var map1 = ui.Map();
//Configurar Panel Map
function confMap(mapa){
//Estilos de mapas
var estilosMapa = constantes.mapStyles();
var gris = estilosMapa.gris;
var oscuro = estilosMapa.oscuro;
mapa.clear();
mapa.setOptions('ROADMAP', {'Gris': gris,'Oscuro': oscuro})}
function herramientaDibujos(mapa){
var drawingTools = mapa.drawingTools();
drawingTools.setDrawModes(['polygon']);
drawingTools.setLinked(false);
drawingTools.addLayer([ee.Geometry.Point([-159.90452018696843, 0.2085561506432854])],'aoi');
var dibujos = drawingTools.layers();
return dibujos}
var dibujos = herramientaDibujos(map1);
//Agregar paneles
ui.root.clear();
ui.root.add(panel1);
ui.root.add(map1);
//Interfaz de usuario
function interfaz(panel){
// Titulo y descripcion
var titulo = ui.Label('APP Priorización de Alertas GLAD', {fontSize: '36px', color: 'green'});
var texto = ui.Label(
    'Ajustes a la metodología de priorización de alertas GLAD, Places to Watch',
    {fontSize: '11px'});
var PanelP1 = ui.Panel([titulo, texto], 'flow');
panel.add(PanelP1);
//Parametros
panel.add(ui.Label('Parámetros', {'font-size': '24px'}));
//Selección de área de estudio
var encabezado1 = ui.Label('1. Elegir área de estudio', {'fontWeight': 'bold','font-size': '14px'});
panel.add(encabezado1);
//Lista de Regiones
var listaRegiones = ['Oriental', 'Occidental'];
var listaDepartamentos = ['Concepcion','San Pedro','Cordillera','Guaira','Caaguazu','Caazapa','Itapua','Misiones','Paraguari','Alto Parana',
'Central','Ñeembucu','Amambay','Canindeyu','Presidente Hayes','Alto Paraguay','Boqueron', 'Asuncion'];
var layerSelectR = ui.Select({
  items: listaRegiones,
  value: listaRegiones[0]});
var layerSelectD = ui.Select({
  items: listaDepartamentos,
  value: listaDepartamentos[0]});
var checkRegion = ui.Checkbox({label: 'Regional', value : true, onChange:function(){return checkDepartamento.setValue(false),checkOtro.setValue(false),checkDibujo.setValue(false)}});
var checkDepartamento = ui.Checkbox({label: 'Departamental', value : false, onChange:function(){return checkRegion.setValue(false),checkOtro.setValue(false),checkDibujo.setValue(false)}});
var checkOtro = ui.Checkbox({label: 'GEE Asset', value : false, onChange:function(){return checkRegion.setValue(false),checkDepartamento.setValue(false),checkDibujo.setValue(false)}});
var checkDibujo = ui.Checkbox({label: 'Dibujar Área de Estudio', value : false, onChange:function(){return checkRegion.setValue(false),checkDepartamento.setValue(false),checkOtro.setValue(false)}});
var idRegion = ui.Textbox({placeholder:'Introducir id del asset'});
panel.add(ui.Panel([checkRegion], ui.Panel.Layout.Flow('horizontal',true)));
panel.add(ui.Panel([layerSelectR], ui.Panel.Layout.Flow('horizontal')));
panel.add(ui.Panel([checkDepartamento], ui.Panel.Layout.Flow('horizontal',true)));
panel.add(ui.Panel([layerSelectD], ui.Panel.Layout.Flow('horizontal')));
panel.add(ui.Panel([checkOtro], ui.Panel.Layout.Flow('horizontal',true)));
panel.add(ui.Panel([idRegion], ui.Panel.Layout.Flow('horizontal',true)));
panel.add(ui.Panel([checkDibujo], ui.Panel.Layout.Flow('horizontal',true)));
//Seleccion de tamaño de celdas
panel.add(ui.Label('2. Elegir tamaño de celdas', {'fontWeight': 'bold','font-size': '14px'}));
var listaTamaños = ['10', '15', '20', '25','50'];
//Lista de tamaños de celdas
var cellSelect = ui.Select({
  items: listaTamaños,
  value: listaTamaños[0]});
panel.add(cellSelect);
//Seleccion de fechas de análisis
var encabezado3 = ui.Label('3. Elegir fechas de análisis', {'fontWeight': 'bold','font-size': '14px'});
var dateSelect1 = ui.Textbox({placeholder:'aaaa-mm-dd', value: '2021-03-01'});
var dateSelect2 = ui.Textbox({placeholder:'aaaa-mm-dd', value: '2021-05-01'});
panel.add(encabezado3);
panel.add(dateSelect1);
panel.add(dateSelect2);
//Seleccion de capas de analisis
var encabezado4 = ui.Label('4. Elegir capas de entrada', {'fontWeight': 'bold','font-size': '14px'});
var descripcion4 = ui.Label('En el siguiente apartado se deben dar pesos a las diferentes capas que se usan para el análisis:', { 'font-size': '12px'});
var PanelTitulosPesos = ui.Panel({
    widgets: [
    ui.Label('Nulo', {'fontWeight': 'bold','font-size': '12px'}), 
    ui.Label('Bajo', {'fontWeight': 'bold','font-size': '12px'}),
    ui.Label('Medio', {'fontWeight': 'bold','font-size': '12px'}),
    ui.Label('Alto', {'fontWeight': 'bold','font-size': '12px'}),
    ui.Label('Capa de Entrada', {'fontWeight': 'bold','font-size': '12px'})],
    layout: ui.Panel.Layout.Flow('horizontal')});
  var paramLabel1 = ui.Label('3');
  var boxNulo1 = ui.Checkbox({value:false, onChange:function(){return paramLabel1.setValue('0'),boxBajo1.setValue(false),boxMedio1.setValue(false),boxAlto1.setValue(false)}});
  var boxBajo1  = ui.Checkbox({value:false, onChange: function(){return paramLabel1.setValue('1'),boxNulo1.setValue(false),boxMedio1.setValue(false),boxAlto1.setValue(false)}});
  var boxMedio1  = ui.Checkbox({value:false, onChange: function(){return paramLabel1.setValue('2'),boxNulo1.setValue(false),boxBajo1.setValue(false),boxAlto1.setValue(false)}});
  var boxAlto1  = ui.Checkbox({value:true, onChange: function(){return paramLabel1.setValue('3'),boxNulo1.setValue(false),boxBajo1.setValue(false),boxMedio1.setValue(false)}});
  var param1 = ui.Label('Cobertura Forestal 2018',{'font-size': '12px'});
  var PanelPesos1 = ui.Panel({
    widgets: [boxNulo1, boxBajo1, boxMedio1, boxAlto1, param1],
    layout: ui.Panel.Layout.Flow('horizontal')});
  var paramLabel2 = ui.Label('3');
  var boxNulo2 = ui.Checkbox({value:false, onChange:function(){return paramLabel2.setValue('0'),boxBajo2.setValue(false),boxMedio2.setValue(false),boxAlto2.setValue(false)}});
  var boxBajo2  = ui.Checkbox({value:false, onChange: function(){return paramLabel2.setValue('1'),boxNulo2.setValue(false),boxMedio2.setValue(false),boxAlto2.setValue(false)}});
  var boxMedio2  = ui.Checkbox({value:false, onChange: function(){return paramLabel2.setValue('2'),boxNulo2.setValue(false),boxBajo2.setValue(false),boxAlto2.setValue(false)}});
  var boxAlto2  = ui.Checkbox({value:true, onChange: function(){return paramLabel2.setValue('3'),boxNulo2.setValue(false),boxBajo2.setValue(false),boxMedio2.setValue(false)}});
  var param2 = ui.Label('Áreas Silvestres Protegidas',{'font-size': '12px'});
  var PanelPesos2 = ui.Panel({
    widgets: [boxNulo2, boxBajo2, boxMedio2, boxAlto2, param2],
    layout: ui.Panel.Layout.Flow('horizontal')});
  var paramLabel3 = ui.Label('0');
  var boxNulo3 = ui.Checkbox({value:true, onChange:function(){return paramLabel3.setValue('0'),boxBajo3.setValue(false),boxMedio3.setValue(false),boxAlto3.setValue(false)}});
  var boxBajo3  = ui.Checkbox({value:false, onChange: function(){return paramLabel3.setValue('1'),boxNulo3.setValue(false),boxMedio3.setValue(false),boxAlto3.setValue(false)}});
  var boxMedio3  = ui.Checkbox({value:false, onChange: function(){return paramLabel3.setValue('2'),boxNulo3.setValue(false),boxBajo3.setValue(false),boxAlto3.setValue(false)}});
  var boxAlto3  = ui.Checkbox({value:false, onChange: function(){return paramLabel3.setValue('3'),boxNulo3.setValue(false),boxBajo3.setValue(false),boxMedio3.setValue(false)}});
  var param3 = ui.Label('Plantaciones Forestales',{'font-size': '12px'});
  var PanelPesos3 = ui.Panel({
    widgets: [boxNulo3, boxBajo3, boxMedio3, boxAlto3, param3],
    layout: ui.Panel.Layout.Flow('horizontal')});
  var paramLabel4 = ui.Label('2');
  var boxNulo4 = ui.Checkbox({value:false, onChange:function(){return paramLabel4.setValue('0'),boxBajo4.setValue(false),boxMedio4.setValue(false),boxAlto4.setValue(false)}});
  var boxBajo4  = ui.Checkbox({value:false, onChange: function(){return paramLabel4.setValue('1'),boxNulo4.setValue(false),boxMedio4.setValue(false),boxAlto4.setValue(false)}});
  var boxMedio4  = ui.Checkbox({value:true, onChange: function(){return paramLabel4.setValue('2'),boxNulo4.setValue(false),boxBajo4.setValue(false),boxAlto4.setValue(false)}});
  var boxAlto4  = ui.Checkbox({value:false, onChange: function(){return paramLabel4.setValue('3'),boxNulo4.setValue(false),boxBajo4.setValue(false),boxMedio4.setValue(false)}});
  var param4 = ui.Label('Áreas con Servicios Ambientales',{'font-size': '12px'});
  var PanelPesos4 = ui.Panel({
    widgets: [boxNulo4, boxBajo4, boxMedio4, boxAlto4, param4],
    layout: ui.Panel.Layout.Flow('horizontal')});
  var paramLabel5 = ui.Label('0');
  var boxNulo5 = ui.Checkbox({value:true, onChange:function(){return paramLabel5.setValue('0'),boxBajo5.setValue(false),boxMedio5.setValue(false),boxAlto5.setValue(false)}});
  var boxBajo5  = ui.Checkbox({value:false, onChange: function(){return paramLabel5.setValue('1'),boxNulo5.setValue(false),boxMedio5.setValue(false),boxAlto5.setValue(false)}});
  var boxMedio5  = ui.Checkbox({value:false, onChange: function(){return paramLabel5.setValue('2'),boxNulo5.setValue(false),boxBajo5.setValue(false),boxAlto5.setValue(false)}});
  var boxAlto5  = ui.Checkbox({value:false, onChange: function(){return paramLabel5.setValue('3'),boxNulo5.setValue(false),boxBajo5.setValue(false),boxMedio5.setValue(false)}});
  var param5 = ui.Label('Área Permitida Planes de Uso',{'font-size': '12px'});
  var PanelPesos5 = ui.Panel({
    widgets: [boxNulo5, boxBajo5, boxMedio5, boxAlto5, param5],
    layout: ui.Panel.Layout.Flow('horizontal')});
  var paramLabel6 = ui.Label('3');
  var boxNulo6 = ui.Checkbox({value:false, onChange:function(){return paramLabel6.setValue('0'),boxBajo6.setValue(false),boxMedio6.setValue(false),boxAlto6.setValue(false)}});
  var boxBajo6  = ui.Checkbox({value:false, onChange: function(){return paramLabel6.setValue('1'),boxNulo6.setValue(false),boxMedio6.setValue(false),boxAlto6.setValue(false)}});
  var boxMedio6  = ui.Checkbox({value:false, onChange: function(){return paramLabel6.setValue('2'),boxNulo6.setValue(false),boxBajo6.setValue(false),boxAlto6.setValue(false)}});
  var boxAlto6  = ui.Checkbox({value:true, onChange: function(){return paramLabel6.setValue('3'),boxNulo6.setValue(false),boxBajo6.setValue(false),boxMedio6.setValue(false)}});
  var param6 = ui.Label('Área No Permitida Planes de Uso',{'font-size': '12px'});
  var PanelPesos6 = ui.Panel({
    widgets: [boxNulo6, boxBajo6, boxMedio6, boxAlto6, param6],
    layout: ui.Panel.Layout.Flow('horizontal')});
  var paramLabel7 = ui.Label('2');
  var boxNulo7 = ui.Checkbox({value:false, onChange:function(){return paramLabel7.setValue('0'),boxBajo7.setValue(false),boxMedio7.setValue(false),boxAlto7.setValue(false)}});
  var boxBajo7  = ui.Checkbox({value:false, onChange: function(){return paramLabel7.setValue('1'),boxNulo7.setValue(false),boxMedio7.setValue(false),boxAlto7.setValue(false)}});
  var boxMedio7  = ui.Checkbox({value:true, onChange: function(){return paramLabel7.setValue('2'),boxNulo7.setValue(false),boxBajo7.setValue(false),boxAlto7.setValue(false)}});
  var boxAlto7  = ui.Checkbox({value:false, onChange: function(){return paramLabel7.setValue('3'),boxNulo7.setValue(false),boxBajo7.setValue(false),boxMedio7.setValue(false)}});
  var param7 = ui.Label('Comunidades Indígenas',{'font-size': '12px'});
  var PanelPesos7 = ui.Panel({
    widgets: [boxNulo7, boxBajo7, boxMedio7, boxAlto7, param7],
    layout: ui.Panel.Layout.Flow('horizontal')});
panel.add(encabezado4);
panel.add(descripcion4);
panel.add(PanelTitulosPesos);
panel.add(PanelPesos1);
panel.add(PanelPesos2);
panel.add(PanelPesos7);
panel.add(PanelPesos3);
panel.add(PanelPesos4);
panel.add(PanelPesos5);
panel.add(PanelPesos6);
//Seleccion de Metodologias
var encabezado5 = ui.Label('5. Elegir metodología', {'fontWeight': 'bold', 'font-size': '14px'});
var m1Check = ui.Checkbox('Metodología 1 : Proporción de Áreas', false, 
function(){return m2Check.setValue(false)},false, {margin: '6px'});
var m2Check = ui.Checkbox('Metodología 2 : Sumatoria de Alertas por Celda y Conglomerados', true, 
function(){return m1Check.setValue(false)},false, {margin: '6px'});
panel.add(encabezado5);
panel.add(m1Check);
panel.add(m2Check);
//Seleccion de Numero de celdas prioritarias
var encabezado6 = ui.Label('6. Elegir número de celdas prioritarias', {'fontWeight': 'bold','font-size': '14px'});
var numPriorSelect = ui.Textbox({value:'10'});
panel.add(encabezado6);
panel.add(numPriorSelect);
//Boton de inicio
var botonInicio = ui.Button({label: 'Ejecutar análisis', onClick: triggerStart});
panel.add(botonInicio);
//Descarga de informacion
var encabezado7 = ui.Label('7. Elegir parámetros de descarga', {'fontWeight': 'bold','font-size': '14px'});
var numeroCeldas = ui.Textbox({placeholder:'Insertar id de Celda'});
var numeroPlanes = ui.Textbox({placeholder:'Insertar id de Catastro Forestal'});
var idDescarga = ui.Textbox({placeholder:'Introducir id del asset'});
var idAOI = ui.Textbox({placeholder:'Introducir nombre del AOI'});
var checkCeldas = ui.Checkbox({label: 'Celda', value : true, onChange:function(){return checkPlanes.setValue(false),checkOtro2.setValue(false),checkDibujo2.setValue(false)}});
var checkPlanes = ui.Checkbox({label: 'Catastro Forestal', value : false, onChange:function(){return checkCeldas.setValue(false),checkOtro2.setValue(false),checkDibujo2.setValue(false)}});
var checkOtro2 = ui.Checkbox({label: 'GEE Asset', value : false, onChange:function(){return checkCeldas.setValue(false),checkPlanes.setValue(false),checkDibujo2.setValue(false)}});
var checkDibujo2 = ui.Checkbox({label: 'AOI', value : false, onChange:function(){return checkCeldas.setValue(false),checkPlanes.setValue(false),checkOtro2.setValue(false)}});
/*
panel.add(encabezado7);
panel.add(ui.Panel([checkCeldas], ui.Panel.Layout.Flow('horizontal',true)));
panel.add(ui.Panel([numeroCeldas], ui.Panel.Layout.Flow('horizontal',true)));
panel.add(ui.Panel([checkPlanes], ui.Panel.Layout.Flow('horizontal',true)));
panel.add(ui.Panel([numeroPlanes], ui.Panel.Layout.Flow('horizontal',true)));
panel.add(ui.Panel([checkOtro2], ui.Panel.Layout.Flow('horizontal',true)));
panel.add(ui.Panel([idDescarga], ui.Panel.Layout.Flow('horizontal',true)));
panel.add(ui.Panel([checkDibujo2], ui.Panel.Layout.Flow('horizontal',true)));
panel.add(ui.Panel([idAOI], ui.Panel.Layout.Flow('horizontal',true)));
*/
var botonDescarga = ui.Button({label: 'Descargar', onClick: download});
//panel.add(botonDescarga);
//Enlaces complmentarios
var encabezado8 = ui.Label('Para más información', {'fontWeight': 'bold'});
var link1= ui.Label(
    'Places to Watch: Identifying High-Priority Forest Disturbance from Near–Real Time Satellite Data', {},
    'https://www.wri.org/publication/places-to-watch');
var link2 = ui.Label(
    'Guía de Usuario', {},
    'http://bit.ly/2PNIPC8');  
var link3 = ui.Label(
    'Reporte Semiautomático', {},
    'http://bit.ly/2PNIPC8');
var linkPanel = ui.Panel([encabezado8, link1, link2]);
panel.add(linkPanel);
var outputs = {};
outputs.cellSelect = cellSelect;
outputs.dateSelect1 = dateSelect1;
outputs.dateSelect2 = dateSelect2;
outputs.numPriorSelect = numPriorSelect;
outputs.checkRegion = checkRegion;
outputs.layerSelectR = layerSelectR;
outputs.checkDepartamento = checkDepartamento;
outputs.layerSelectD = layerSelectD;
outputs.checkOtro = checkOtro;
outputs.idRegion = idRegion;
outputs.checkDibujo = checkDibujo;
outputs.paramLabel1 = paramLabel1;
outputs.paramLabel2 = paramLabel2;
outputs.paramLabel3 = paramLabel3;
outputs.paramLabel4 = paramLabel4;
outputs.paramLabel5 = paramLabel5;
outputs.paramLabel6 = paramLabel6;
outputs.paramLabel7 = paramLabel7;
outputs.m1Check = m1Check;
outputs.m2Check = m2Check;
outputs.checkCeldas = checkCeldas;
outputs.checkPlanes = checkPlanes;
outputs.checkOtro2 = checkOtro2;
outputs.checkDibujo2 = checkDibujo2;
outputs.numeroCeldas = numeroCeldas;
outputs.numeroPlanes = numeroPlanes;
outputs.idDescarga = idDescarga;
outputs.idAOI = idAOI;
return(outputs);
}
//Insertar interfaz
var interfazUsuario = interfaz(panel1);
//Inicio de Script
var estado;
function triggerStart(){
  estado = start();
}
//Funcion de Priorizacion de Alertas
function start(){
//Limpieza de mapa y carga de opciones
confMap(map1);
 //Obtencion de campos cargados por el usuario
var checkRegion = interfazUsuario.checkRegion.getValue();
var layerSelectR = interfazUsuario.layerSelectR.getValue();
var checkDepartamento = interfazUsuario.checkDepartamento.getValue();
var layerSelectD = interfazUsuario.layerSelectD.getValue();
var checkOtro = interfazUsuario.checkOtro.getValue();
var idRegion = interfazUsuario.idRegion.getValue();
var checkDibujo = interfazUsuario.checkDibujo.getValue();
var tamanoCelda = interfazUsuario.cellSelect.getValue();
var fecha1 = ee.Date(interfazUsuario.dateSelect1.getValue()); 
var fecha2 = ee.Date(interfazUsuario.dateSelect2.getValue());
var dateSelect1 = interfazUsuario.dateSelect1.getValue();
var dateSelect2 = interfazUsuario.dateSelect2.getValue();
var numCellPrior = ee.Number.parse(interfazUsuario.numPriorSelect.getValue());
var paramLabel1 = interfazUsuario.paramLabel1.getValue();
var paramLabel2 = interfazUsuario.paramLabel2.getValue();
var paramLabel3 = interfazUsuario.paramLabel3.getValue();
var paramLabel4 = interfazUsuario.paramLabel4.getValue();
var paramLabel5 = interfazUsuario.paramLabel5.getValue();
var paramLabel6 = interfazUsuario.paramLabel6.getValue();
var paramLabel7 = interfazUsuario.paramLabel7.getValue();
//Seleccion de Area de Estudio
var areaEstudio,region;
//Funcion seleccion de Area de estudio
if (checkRegion === true ){
  areaEstudio = layerSelectR;
  region = constantes.ParaguayReg.filter(ee.Filter.eq('REG',areaEstudio)).geometry();
} 
  else {if (checkDepartamento === true ){
  areaEstudio = layerSelectD;
  region = constantes.ParaguayDep.filter(ee.Filter.eq('DPTO_DESC',areaEstudio.toUpperCase())).geometry();
}
  else {if (checkOtro === true) {
    areaEstudio = idRegion;
    region = ee.FeatureCollection(areaEstudio);
}
  else {if (checkDibujo === true) {
    areaEstudio = 'Custom';
    var poligono =  dibujos.get(0).getEeObject().geometries().getGeometry(-1);
    region = ee.FeatureCollection(poligono);
    print(region);
  }}}}
//Seleccion de cuadricula
var celdas;
switch (tamanoCelda) {
  case '10':
    celdas = constantes.c10;
    break;
  case '15':
    celdas = constantes.c15;
    break;
  case '20':
    celdas = constantes.c20;
    break;
  case '25':
     celdas = constantes.c25;
    break;
  case '50':
    celdas = constantes.c50;
    break;
}
var grilla = celdas.filterBounds(region);
//Seleccion de Alertas Glad
var glad = ee.ImageCollection('projects/glad/alert/UpdResult');
var date1 = ee.Number(fecha1.getRelative('day','year'));
var date2 = ee.Number(fecha2.getRelative('day','year'));
var dateYear1 = dateSelect1.slice(0,4);
var dateYear2 = dateSelect2.slice(0,4);
var timeNow = ee.Date(Date.now());
var yearNow = timeNow.get('year');
var yearPre = timeNow.advance(-1,'year').get('year');
var yearNowS = ee.String(yearNow).getInfo();
var yearPreS = ee.String(yearPre).getInfo();
var yearNowShort = ee.String(yearNow).slice(2,4).getInfo();
var yearPreShort = ee.String(yearPre).slice(2,4).getInfo();
var bandasPre = ['alertDate' + yearPreShort,'conf'+ yearPreShort];
var bandasAct = ['alertDate'+ yearNowShort,'conf'+ yearNowShort];
var bandasGLAD;
var gladfilter;
var mosaicoLandsatEnero;
var gladLast;
var lastAlerts,lastAlerts2,lastAlerts3,lastAlerts4,lastAlerts5;
var gladRegion = glad.filterBounds(region);
//Seleccion de alertas caso 1(añopre-añopre)
if(dateYear1 === yearPreS && dateYear2 === yearPreS	){
  gladfilter = gladRegion.filterDate(yearNowS +'-01-01',yearNowS +'-01-02');
  bandasGLAD = bandasPre;
  mosaicoLandsatEnero = funciones.landsatMosaic(ee.Date(yearPreS+'-01-01'),region).select(['red','nir','swir1','obsDate']);
  gladLast = gladfilter.sort('system:time_start',false).first();
  lastAlerts = gladLast.select(bandasGLAD[1]).clip(region);
  lastAlerts2 = lastAlerts.selfMask();
  lastAlerts3 = lastAlerts2.where(gladLast.select(bandasGLAD[0]).lt(date1),0);
  lastAlerts4 = lastAlerts3.where(gladLast.select(bandasGLAD[0]).gt(date2),0);
  lastAlerts5 = lastAlerts4.selfMask();
}
//Seleccion de alertas caso 2(añopre-añoActual)
else {
if (dateYear1 === yearPreS && dateYear2 === yearNowS){
  gladfilter = gladRegion.filterDate(fecha1,fecha2);
  bandasGLAD = bandasAct;
  mosaicoLandsatEnero = funciones.landsatMosaic(fecha1,region).select(['red','nir','swir1','obsDate']);
  gladLast = gladfilter.sort('system:time_start',false).first();
  //Seleccion Año Pre
  lastAlerts = gladLast.select(bandasPre[1]).clip(region);
  var lastAlerts2_pre = lastAlerts.selfMask();
  var lastAlerts3_pre = lastAlerts2_pre.where(gladLast.select(bandasPre[0]).lt(date1),0);
  var lastAlerts5_pre = lastAlerts3_pre.selfMask().select([bandasPre[1]],[bandasAct[1]]);
  //Seleccion Año Actual
  lastAlerts = gladLast.select(bandasAct[1]).clip(region);
  var lastAlerts2_act = lastAlerts.selfMask();
  var lastAlerts3_act = lastAlerts2_act.where(gladLast.select(bandasAct[0]).gt(date2),0);
  var lastAlerts5_act = lastAlerts3_act.selfMask();
  //Union
  print(lastAlerts5_pre,lastAlerts5_act);
  lastAlerts2 = ee.ImageCollection.fromImages([lastAlerts2_pre.select([bandasPre[1]],[bandasAct[1]]),lastAlerts2_act]).reduce(ee.Reducer.lastNonNull()).select([bandasAct[1] +'_last'],[bandasAct[1]]);
  lastAlerts5 = ee.ImageCollection.fromImages([lastAlerts5_pre,lastAlerts5_act]).reduce(ee.Reducer.lastNonNull()).select([bandasAct[1] +'_last'],[bandasAct[1]]);
}
//Seleccion de alertas caso 3(añopre-añoActual)
else{
if (dateYear1 === yearNowS && dateYear2 === yearNowS){
  gladfilter = gladRegion.filterDate(fecha1,fecha2);
  bandasGLAD = bandasAct;
  mosaicoLandsatEnero = gladfilter.sort('system:time_start',true).first().select(['red','nir','swir1','obsDate']);
  gladLast = gladfilter.sort('system:time_start',false).first();
  lastAlerts = gladLast.select(bandasGLAD[1]).clip(region);
  lastAlerts2 = lastAlerts.selfMask();
  lastAlerts3 = lastAlerts2.where(gladLast.select(bandasGLAD[0]).lt(date1),0);
  lastAlerts4 = lastAlerts3.where(gladLast.select(bandasGLAD[0]).gt(date2),0);
  lastAlerts5 = lastAlerts4.selfMask();
}}}
var fechaExactaAlertayMosaico = ee.String(dateYear2).cat(ee.String('-')).cat(ee.String(gladLast.get('system:index')).slice(0,5).replace('_','-'));
print(dateYear2,bandasGLAD,gladRegion,gladfilter,fechaExactaAlertayMosaico);
//Imagen Landsat mes anterior
var fecha3 = fecha1.advance(-2,'month');
var fecha4 = fecha1.advance(-1,'day');
var gladfilter2 = gladRegion.filterDate(fecha3,fecha4);
var gladLast2 = gladfilter2.sort('system:time_start',false).first();
//Alertas Firms
var firms = ee.ImageCollection('FIRMS');
var firmsfilter = firms.filterDate(fecha1,fecha2).filterBounds(region);
var fimrsConfidence = function(image) {
    var confidence = image.select('confidence').gt(95);
    var firmsMasked = image.mask(confidence);
    return firmsMasked};
var firmsPeriodo = firmsfilter.map(fimrsConfidence);
var firmsPeriodoclip = firmsPeriodo.max().clip(region);
//Mosaico Sentinel 2 Enero
var fechaSentinel1 = ee.Date(''+dateYear1+'-01-15');
var fechaSentinel2 = fechaSentinel1.advance(-48,'day');
var mosaicoS2enero = ee.Image(funciones.sentinel2mosaic(fechaSentinel2,fechaSentinel1,region));
//Mosaico Sentinel 2 Alerta
var mosaicoS2alerta = ee.Image(funciones.sentinel2mosaic(fecha1,fecha2,region));
//Ajuste de capas
//En este paso se asigna un valor de 0 a todos los pixeles de Paraguay no cubiertos por la capa 
//de interes y un valor de 1 a los lugares que si se encuentran cubiertos
var alertasGlad = lastAlerts5.where(lastAlerts5.gt(0),1);
var areasProtegidas1 = constantes.py.where(constantes.areasProtegidas.eq(1),1);
var coberturaForestal20181 = constantes.py.where(constantes.coberturaForestal2018.eq(1),1);
var plantacionesForestales20181 = constantes.py.where(constantes.plantacionesForestales2018.eq(1),1);
var areasCertificadas1 = constantes.py.where(constantes.areasCertificadas.eq(1),1);
var comunidadesIndigenas1 = constantes.py.where(constantes.comunidadesIndigenas.gt(0),1);
var cp= constantes.unionPlanes.eq(1);
var sp = constantes.unionPlanes.eq(2).or(constantes.unionPlanes.eq(3));
var putsCP1 = constantes.py.where(cp.eq(1),1);
var putsSP1 = constantes.py.where(sp.gte(2),1);
var grilla1 = grilla.map(function(feature){
      return feature.set('score', 0)});
var gillaImage = grilla1.reduceToImage(['score'],ee.Reducer.first());
//var areaSinPUT = py.where(putsCP1.eq(0).and(putsSP1.eq(0)),1);
map1.centerObject(region);
//Funcion de Visualizacion con Minimos y Maximos
function minMaxLayer(image,text) {
  var minMax = image.reduceRegion({
    reducer:ee.Reducer.minMax(),
    geometry:image.geometry().bounds(),
    scale: 1000,
    bestEffort:true,
  }).evaluate(function(minMax) {
    var min = minMax.max_min;
    var max = minMax.max_max;
    if (min < 0) {
      min = 0;
    }
    map1.addLayer(image, {min:min, max:max, palette:'white,yellow,orange,red',opacity: 0.8}, text);
  });
}
//Visualizacion
//Estilos
var visSWNIRRED = {bands: ['nir','swir1','red'], min: [0,0,0], max: [280, 280, 300]};
var visSWNIRRED2 = {bands: ['b4','b5','b3'], min: [0,0,0], max: [200, 200, 200]};
var visSWNIRRED3 = {bands: ['b2','b1','b3'], min: [0,0,0], max: [180, 160, 160]};
//Mosaicos
map1.addLayer(constantes.mosaico1986.clip(region),visSWNIRRED2,'Mosaico Landsat 1986', false);
map1.addLayer(constantes.mosaico2005.clip(region),visSWNIRRED3,'Mosaico Landsat 2005', false);
map1.addLayer(mosaicoLandsatEnero.clip(region), visSWNIRRED, 'Imagen Landsat Enero ' + dateYear1, false);
if (gladfilter2.size().getInfo() === 0) {}
else {map1.addLayer(gladLast2.clip(region),visSWNIRRED, 'Imagen Landsat Mes Anterior Alerta',false)}
map1.addLayer(gladLast.clip(region), visSWNIRRED, 'Imagen Landsat Alerta',false);
map1.addLayer(mosaicoS2enero, {'bands': 'B8,B11,B4',  'min': [0,0,0],'max': [5000,6000,3000]}, 'Imagen Sentinel Enero '+ dateYear1, false);
map1.addLayer(mosaicoS2alerta, {'bands': 'B8,B11,B4',  'min': [0,0,0],'max': [5000,6000,3000]}, 'Imagen Sentinel 2 Alerta', false);
//Alertas
map1.addLayer(lastAlerts2, {min:2, max:3, palette:['ff00ff','purple']}, 'Alertas GLAD '+ dateYear1 + '/' + dateYear2, false);
map1.addLayer(lastAlerts5, {min:2, max:3, palette:['ff00ff','purple']}, 'Alertas GLAD del Periodo');
map1.addLayer(gladLast.updateMask(lastAlerts5).select(bandasGLAD[0]).randomVisualizer(), {}, 'Fechas de Alertas GLAD del Periodo',false);
map1.addLayer(ee.Image().toByte().paint(region,1,2), {'palette': '00FFFF'},'Área de Estudio');
map1.addLayer(ee.Image().toByte().paint(grilla,1,1), {'palette': 'brown'},'Grilla');
//Apoyo
map1.addLayer(constantes.limitesPuts.filterBounds(region),{color:'orange'},'Limites Catastro Forestal PUT',false);
map1.addLayer(constantes.limitesPMF.filterBounds(region),{color:'orange'},'Limites Catastro Forestal PMF',false);
map1.addLayer(constantes.coberturaForestal1986.clip(region), {min:1, max:1, palette:"008100"}, 'Cobertura Forestal 1986',false);
map1.addLayer(firmsPeriodoclip, {}, 'Alertas de incendios FIRMS',false);
//Criterios
map1.addLayer(sp.selfMask().clip(region),{min:1,palette:'green'},'Área No Permitida Planes de Uso', false);
map1.addLayer(cp.selfMask().clip(region),{min:1,palette:'yellow'},'Área Permitida Planes de Uso', false);
map1.addLayer(constantes.areasCertificadas.clip(region), {min:1, max:1, palette:"purple"}, 'Áreas Certificadas Servicios Ambientales',false);
map1.addLayer(constantes.plantacionesForestales2018, {min:0, max:0, palette:"156e2c"}, 'Plantaciones Forestales 2018',false);
map1.addLayer(constantes.comunidadesIndigenas.clip(region), {min:0, max:1, palette:"brown"}, 'Comunidades Indigenas',false);
map1.addLayer(constantes.areasProtegidas.clip(region), {min:1, max:1, palette:"gray"}, 'Áreas Silvestres Protegidas',false);
map1.addLayer(constantes.coberturaForestal2018.clip(region), {min:1, max:1, palette:"00f300"}, 'Cobertura Forestal 2018',false);
//Metodologias
//Parametros establecidos por el usuario
var pesoB2018= ee.Number.parse(paramLabel1);
var pesoASP = ee.Number.parse(paramLabel2);
var pesoPF = ee.Number.parse(paramLabel3);
var pesoSA = ee.Number.parse(paramLabel4);
var pesoPUP = ee.Number.parse(paramLabel5);
var pesoPUNP = ee.Number.parse(paramLabel6);
var pesoCI = ee.Number.parse(paramLabel7);
print('Parámetros establecidos', 
'Área de estudio', areaEstudio, 
'Tamaño de celda', tamanoCelda, 
'Periodo de estudio', fecha1,fecha2,
'Numero de celdas', grilla.size(),
'Pesos', pesoB2018,pesoASP,pesoPF,pesoSA,pesoPUP,pesoPUNP,pesoCI);
//Metodo 1 (Areas proporcionales)
function m1 () {
//Seleccion de cuadricula
var celdasp;
switch (tamanoCelda) {
  case '10':
    celdasp = constantes.c10p;
    break;
  case '15':
    celdasp = constantes.c15p;
    break;
  case '20':
    celdasp = constantes.c20p;
    break;
  case '25':
    celdasp = constantes.c25p;
    break;
  case '50':
     celdasp = constantes.c50p;
    break;
  case '100':
    celdasp = constantes.c100p;
    break;
}
var grillap = celdasp.filterBounds(region);
//Calculo de score
var grillaScore = grillap.map(function(feature){
  var total = ee.Number.parse(feature.get('countpy'));
  var cf18 = ee.Number.parse(feature.get('countcf18'));
  var asp = ee.Number.parse(feature.get('countasp'));
  var pf = ee.Number.parse(feature.get('countpf'));
  var sa = ee.Number.parse(feature.get('countsa'));
  var ci = ee.Number.parse(feature.get('countci'));
  var pup = ee.Number.parse(feature.get('countPUP'));
  var punp = ee.Number.parse(feature.get('countPUNP'));
  //var num = ee.Number((cf18.divide(total).multiply(pesoB2018)).add(sa.divide(total).multiply(pesoSA)).add(asp.divide(total).multiply(pesoASP)).add(pf.divide(total).multiply(pesoPF)));
  var num = ee.Number((cf18.divide(total).multiply(pesoB2018)).add(sa.divide(total).multiply(pesoSA)).add(asp.divide(total).multiply(pesoASP)).add(pf.divide(total).multiply(pesoPF)).add(ci.divide(total).multiply(pesoCI)).add(pup.divide(total).multiply(pesoPUP)).add(punp.divide(total).multiply(pesoPUNP)));
  return feature.set('score', num)});
//Calculo de alertas por cuadrilla
var alertasCuadrilla = alertasGlad.reduceRegions(grillaScore,ee.Reducer.count(),30);
//Multiplicar score x alertas
var cuadrillaPriorizacion = alertasCuadrilla.map(function(feature){
  var score = ee.Number.parse(feature.get('score'));
  var alert = ee.Number.parse(feature.get('count'));
  var num = ee.Number(score.multiply(alert));
  return feature.set('prior', num)}, true);
var priorizacionImage = cuadrillaPriorizacion.reduceToImage(['prior'],ee.Reducer.max()).clip(grillap.geometry().bounds());
//Seleccion de celdas con mayor valor
var celdasMayor = cuadrillaPriorizacion.limit(numCellPrior,'prior', false);
map1.addLayer(celdasMayor,{},'Celdas Prioritarias');
cuadrillaPriorizacion = cuadrillaPriorizacion.select(['id', 'count', 'prior','score'],['name', 'count', 'prior','score']);
var layerName = 'Priorizacion Alertas';
minMaxLayer(priorizacionImage,layerName);
return cuadrillaPriorizacion;
}
//Metodologia 2
function m2 () {
//Calculo de Score
var cluster100k = alertasGlad.reproject("EPSG:4326", null, 30).connectedPixelCount(12).reproject("EPSG:4326", null, 30);
var cluster12a100k = cluster100k.where(cluster100k.lt(12),0).selfMask();
var cluster12a100k1 = cluster12a100k.where(cluster12a100k.gt(0),1);
var cluster12a100k2 = constantes.py.where(cluster12a100k1.eq(1),1);
map1.addLayer(cluster12a100k,{min:1, max:1024, palette: ['black']}, 'Conglomerados mayores a 1 hectárea',false);
var formula = "(0.01*glad + B18*pB18 + asp*pAsp + PF*pPF + SA*pSA+ PUP*pPUP + PUNP*pPUNP + CI*pCI + cluster)";
var referencias =  { 'glad':alertasGlad, 'B18':coberturaForestal20181, 'asp' :areasProtegidas1, 'PF' :plantacionesForestales20181, 'SA' :areasCertificadas1, 'PUP': putsCP1,'PUNP': putsSP1, 'CI': comunidadesIndigenas1, 'cluster':cluster12a100k2,
'pB18':ee.Number.parse(pesoB2018), 'pAsp' :ee.Number.parse(pesoASP), 'pPF' :ee.Number.parse(pesoPF), 'pSA' :ee.Number.parse(pesoSA), 'pPUP' :ee.Number.parse(pesoPUP), 'pPUNP' :ee.Number.parse(pesoPUNP), 'pCI': ee.Number.parse(pesoCI) };
var gladScore = gillaImage.expression(formula,referencias).byte();//.clip(cuadrillaImage.geometry()).select([0],['Score']).float();
//Calculo por cuadrilla
var cuadrillaPriorizacion = gladScore.reduceRegions(grilla,ee.Reducer.sum(),30);
cuadrillaPriorizacion = alertasGlad.reduceRegions(cuadrillaPriorizacion,ee.Reducer.count(),30);
cuadrillaPriorizacion = cuadrillaPriorizacion.select(['name', 'count', 'sum'],['name', 'count', 'prior']);
var priorizacionImage = cuadrillaPriorizacion.reduceToImage(['prior'],ee.Reducer.max()).clip(grilla.geometry().bounds());
//Map.addLayer(cuadrillaPriorizacion,{},'Alertas vector', false);
//Seleccion de celdas con mayor valor
var celdasMayor = cuadrillaPriorizacion.limit(numCellPrior,'prior', false);
map1.addLayer(celdasMayor,{},'Celdas Prioritarias');
var layerName = 'Priorizacion Alertas';
minMaxLayer(priorizacionImage,layerName);
return cuadrillaPriorizacion;
}
var met;
//Seleccion de metodologia
if (interfazUsuario.m1Check.getValue() === true ){
   met = m1();
} else {if (interfazUsuario.m2Check.getValue() === true ){
   met = m2();
}}
//Agregar leyenda
map1.add(funciones.crearLeyenda());
// Crear inspector de celdas.
var inspectorFontsize = '80%'
var inspector = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
    style: {
    position: 'top-right',
    padding: '4px 4px'
  }
});
inspector.add(ui.Label('Información de celdas',{'font-size': inspectorFontsize}));
map1.add(inspector);
map1.style().set('cursor', 'crosshair');
map1.onClick(function(coords) {
//Mostrar mensaje cargando
  inspector.clear();
  inspector.style().set('shown', true);
  inspector.add(ui.Label('Cargando...', {'color': 'gray','font-size': inspectorFontsize}));
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var lon = ee.Number(coords.lon);
  var lat = ee.Number(coords.lat);
  var celdaSeleccionada = ee.Feature(met.filterBounds(point).first());
  var numeroAlertas = celdaSeleccionada.get('count');
  var scoreCelda = celdaSeleccionada.get('score');
  var idCelda = celdaSeleccionada.get('name');
  var prioridadCelda = celdaSeleccionada.get('prior');
  var areaCelda = ee.Image.pixelArea().clip(celdaSeleccionada);
  var stats_area = areaCelda.reduceRegion({
  reducer: ee.Reducer.mean(),
  scale:30,
  geometry: celdaSeleccionada.geometry(),
  maxPixels: 1e12});
  var areaAlertas = ee.Number(numeroAlertas).multiply(ee.Number(stats_area.get('area'))).divide(10000);
  var putSeleccionado = ee.Feature(constantes.limitesPuts.filterBounds(point).first());
  var numeroPut = putSeleccionado.get('CAT');
  var pmfSeleccionado = ee.Feature(constantes.limitesPMF.filterBounds(point).first());
  var numeroPmf = pmfSeleccionado.get('CAT');
  var obsPmf = pmfSeleccionado.get('OBSERVACI');
  var fecha_Alerta = gladLast.select(bandasGLAD[0]).reduceRegion({
  reducer: ee.Reducer.max(),
  scale:30,
  geometry: point,
  maxPixels: 1e12});
  var anhoString = ee.Date.fromYMD(ee.Number.parse(dateYear2), 1, 1);
  var fecha_Alerta2 = ee.Date(anhoString.advance(ee.Number.parse(fecha_Alerta.get(bandasGLAD[0])),'day')).format("yyyy-MM-dd");
//Crear campo con informacion
lon.evaluate(function(result) {
  inspector.clear();
    inspector.add(ui.Label({
      value: 'Longitud: ' + result.toFixed(6),
      style: {'stretch': 'vertical', 'font-size': inspectorFontsize}
    }))}); 
lat.evaluate(function(result) {
    inspector.add(ui.Label({
      value: 'Latitud: ' + result.toFixed(6),
      style: {'stretch': 'vertical', 'font-size': inspectorFontsize}
    }))}); 
idCelda.evaluate(function(result) {
    inspector.add(ui.Label({
      value: 'ID de celda: ' + result,
      style: {'stretch': 'vertical', 'font-size': inspectorFontsize},
    }))});
numeroAlertas.evaluate(function(result) {
    inspector.add(ui.Label({
      value: 'Número de alertas: ' + result.toFixed(0),
      style: {'stretch': 'vertical', 'font-size': inspectorFontsize}
    }))});
if (interfazUsuario.m1Check.getValue() === true ){
scoreCelda.evaluate(function(result) {
    inspector.add(ui.Label({
      value: 'Score de celda: ' + result.toFixed(2),
      style: {'stretch': 'vertical', 'font-size': inspectorFontsize}
    }))})}
else {
  scoreCelda.evaluate(function(result) {
    inspector.add(ui.Label({
      value: 'Score de celda: ' + 'No aplica',
      style: {'stretch': 'vertical', 'font-size': inspectorFontsize}
    }))})}
prioridadCelda.evaluate(function(result) {
    inspector.add(ui.Label({
      value: 'Valor de priorización: ' + result.toFixed(2),
      style: {'stretch': 'vertical', 'font-size': inspectorFontsize}
    }))}); 
areaAlertas.evaluate(function(result) {
    inspector.add(ui.Label({
      value: 'Área de alertas: ' + result.toFixed(2) + ' ha',
      style: {'stretch': 'vertical', 'font-size': inspectorFontsize}
    }))}); 
numeroPut.evaluate(function(result) {
    inspector.add(ui.Label({
      value: 'CAT PUT: ' + result,
      style: {'stretch': 'vertical', 'font-size': inspectorFontsize}
    }))}); 
numeroPmf.evaluate(function(result) {
    inspector.add(ui.Label({
      value: 'CAT PMF: ' + result,
      style: {'stretch': 'vertical', 'font-size': inspectorFontsize}
    }))}); 
obsPmf.evaluate(function(result) {
    inspector.add(ui.Label({
      value: 'OBS PMF: ' + result,
      style: {'stretch': 'vertical', 'font-size': inspectorFontsize}
    }))});
fechaExactaAlertayMosaico.evaluate(function(result) {
    inspector.add(ui.Label({
      value: 'Fecha de última observación: ' + result,
      style: {'stretch': 'vertical', 'font-size': inspectorFontsize}
    }))}); 
fecha_Alerta2.evaluate(function(result) {
    inspector.add(ui.Label({
      value: 'Fecha de detección: ' + result,
      style: {'stretch': 'vertical', 'font-size': inspectorFontsize}
    }))}); 
   });
var separador = ee.String(',');
var parametros =  ee.String(dateSelect1).cat(separador)
.cat(dateSelect2).cat(separador)
.cat(tamanoCelda).cat(separador)
.cat(paramLabel1).cat(separador)
.cat(paramLabel2).cat(separador)
.cat(paramLabel3).cat(separador)
.cat(paramLabel4).cat(separador)
.cat(paramLabel5).cat(separador)
.cat(paramLabel6).cat(separador)
.cat(paramLabel7).cat(separador)
.cat(fechaExactaAlertayMosaico);
var outputs = {};
outputs.celdas = grilla;
outputs.gladEnero = mosaicoLandsatEnero;
outputs.gladAlerta = gladLast;
outputs.sentinelEnero2019 = mosaicoS2enero;
outputs.sentinelAlerta = mosaicoS2alerta;
outputs.alertasGLAD = lastAlerts5;
outputs.params = parametros;
return(outputs);
}
//Descarga de datos
function download(){
var outputs = estado;
var celdas = outputs.celdas;  
var gladAlerta = outputs.gladAlerta;  
var gladEnero = outputs.gladEnero;  
var sentinelEnero = outputs.sentinelEnero2019;  
var sentinelAlerta = outputs.sentinelAlerta;  
var alertasGLAD = outputs.alertasGLAD;
var parametros = outputs.params;
var limitesPuts = constantes.limitesPuts;
var limitesPMF = constantes.limitesPMF;
var puts = limitesPuts.merge(limitesPMF);
var numeroDescarga,poligono,areaDescarga,tipoDato;
if (interfazUsuario.checkCeldas.getValue() === true ){
  numeroDescarga = interfazUsuario.numeroCeldas.getValue();
  poligono = celdas;
  areaDescarga = poligono.filter(ee.Filter.eq('name', ee.Number.parse(numeroDescarga)));
  tipoDato = 'Celda';
}
  else {if (interfazUsuario.checkPlanes.getValue() === true ){
  numeroDescarga = interfazUsuario.numeroPlanes.getValue();
  poligono = puts;
  areaDescarga = poligono.filter(ee.Filter.eq('CAT',numeroDescarga));
  tipoDato = 'CAT';
} 
  else {if (interfazUsuario.checkOtro2.getValue() === true){
  numeroDescarga = interfazUsuario.idDescarga.getValue();
  areaDescarga = ee.FeatureCollection(numeroDescarga);
  numeroDescarga = numeroDescarga.split('/');
  numeroDescarga = numeroDescarga[numeroDescarga.length -1];
  tipoDato = 'Asset';
}
  else {if (interfazUsuario.checkDibujo2.getValue() === true){
  var poligono2 = dibujos.get(0).getEeObject().geometries().getGeometry(-1);
  areaDescarga = ee.FeatureCollection(poligono2);
  tipoDato = 'AOI';
  numeroDescarga =interfazUsuario.idAOI.getValue();
}
}}}
print('Seccion Descargas',tipoDato,poligono,numeroDescarga,areaDescarga);
//map1.centerObject(areaDescarga)
var mosaicoLandsat1 = gladEnero.select(['red','nir','swir1','obsDate']).clip(areaDescarga);
var mosaicoLandsat2 = gladAlerta.select(['red','nir','swir1','obsDate']).clip(areaDescarga);
var mosaicoSentinel21  = sentinelEnero.select(['B4','B8','B11'],['red','nir','swir1']).clip(areaDescarga);
var mosaicoSentinel22 = sentinelAlerta.select(['B4','B8','B11'],['red','nir','swir1']).clip(areaDescarga);
//Generar alertas vectoriales y centroides
var cluster100k = alertasGLAD.clip(areaDescarga).reproject("EPSG:32721", null, 30).connectedPixelCount(12).reproject("EPSG:32721", null, 30);
var cluster12a100k = cluster100k.where(cluster100k.lt(12),0).selfMask();
var alertaVector = cluster12a100k.reduceToVectors({ geometry:areaDescarga.geometry(), scale:30, geometryType:'polygon',labelProperty: "label", maxPixels: 1e13});
var getCentroid = function(feature) {
  var centroid = feature.geometry().centroid(10);
  return ee.Feature(centroid).set({areaHa: feature.geometry().area(10).divide(100 * 100)});
};
var centroidAlerta = alertaVector.map(getCentroid).limit(15,'areaHa',false);
var centroidAlerta2 = ee.Image.pixelCoordinates("EPSG:32721").sampleRegions({'collection':centroidAlerta, 'geometries':true});
map1.addLayer(centroidAlerta2,{},'Centroides',false);
var numCentroid = centroidAlerta2.size();
var centroidAlertaID = centroidAlerta2.toList(numCentroid).zip(ee.List.sequence(1, numCentroid)).map(function(list) {
  list = ee.List(list);
  return ee.Feature(list.get(0)).set('NRO', list.get(1));
});
centroidAlertaID = ee.FeatureCollection(centroidAlertaID).select(['NRO','x','y'],['NRO','X','Y']);
var getAreaID = function(featureCollection) {
  var area= featureCollection.map(function(feature){return ee.Feature(feature).set({areaHa: feature.geometry().area(10).divide(100 * 100)})}).limit(15,'areaHa',false);
  var areIDsize = area.size();
  var areID = area.toList(numCentroid).zip(ee.List.sequence(1, areIDsize)).map(function(list) {
  list = ee.List(list);
  return ee.Feature(list.get(0)).set('NRO', list.get(1));
});
  return ee.FeatureCollection(areID);
};
alertaVector = getAreaID(alertaVector);
//Poligono
var regionesD = constantes.ParaguayReg.filterBounds(areaDescarga);
var departamentosD = constantes.ParaguayDep.filterBounds(areaDescarga);
var distritosD = constantes.ParaguayDis.filterBounds(areaDescarga);
function getDesc (featureCollection,propertyName) {
  var vacio = ee.String('');
  var separador = ee.String(', ');
  var resultado = featureCollection.iterate (
    function(producto2,result){
    return ee.String(result).cat(separador).cat(producto2.getString(propertyName))},vacio);
  return ee.String(resultado).slice(2).toUpperCase();
}
var alertasGladArea= alertasGLAD.gt(0).clip(areaDescarga);
var areaImagePoly = alertasGladArea.multiply(ee.Image.pixelArea().divide(10000).clip(areaDescarga));
var stats_areaPoly = areaImagePoly.reduceRegion({
  reducer: ee.Reducer.sum(),
  scale:30,
  geometry: areaDescarga.geometry(),
  maxPixels: 1e12
});
var areaDes = ee.Number(stats_areaPoly.getNumber('conf21')).format('%.2f');
//Obtener atributos
var deptosString = getDesc(departamentosD,'DPTO_DESC');
var distritosString = getDesc(distritosD,'DIST_DESC');
var date1 = ee.String(parametros.split(',').get(0));
var date2 = ee.String(parametros.split(',').get(1));
var cellSize = ee.String(parametros.split(',').get(2));
var p1 = ee.String(parametros.split(',').get(3));
var p2 = ee.String(parametros.split(',').get(4));
var p3 = ee.String(parametros.split(',').get(5));
var p4 = ee.String(parametros.split(',').get(6));
var p5 = ee.String(parametros.split(',').get(7));
var p6 = ee.String(parametros.split(',').get(8));
var p7 = ee.String(parametros.split(',').get(9));
var fAlerta = ee.String(parametros.split(',').get(10));
//Agregar atributos a poligono
var setAtributos = function(feature) {
  return ee.Feature(feature)
.set({Deptos: deptosString})
.set({Distritos: distritosString.slice(0,253)})
.set({Distritos2: distritosString.slice(253,506)})
.set({Distritos3: distritosString.slice(506,759)})
.set({AreaDes: areaDes})
.set({Date1: date1})
.set({Date2: date2})
.set({SizeCell: cellSize})
.set({pCF18: p1})
.set({pASP: p2})
.set({pPF: p3})
.set({pSA: p4})
.set({pAPPUT: p5})
.set({pANPPUT: p6})
.set({pCI: p7})
.set({fechaAlerta: fAlerta})
.set({tipoArea: ee.String(tipoDato)})
.set({idDato: ee.String(numeroDescarga)})
};
var areaDescarga2 = ee.FeatureCollection(areaDescarga).map(setAtributos);
print('Productos descarga',areaDescarga,mosaicoLandsat1,mosaicoLandsat2,mosaicoSentinel21,mosaicoSentinel22,alertasGLAD,areaDescarga2,centroidAlertaID,alertaVector);
//Generar tareas para descarga
  Export.image.toDrive({
  "image": mosaicoLandsat1.addBands(mosaicoLandsat2).toInt16(),
  "description": 'MosaicoL8_'+tipoDato+'_'+numeroDescarga,
  "folder":'PrioGLAD',
  "scale": 30,
  "maxPixels": 1e13,
  "region": areaDescarga.geometry()});
  Export.image.toDrive({
  "image": mosaicoSentinel21.addBands(mosaicoSentinel22).toInt16(),
  "description": 'MosaicoS2_'+tipoDato+'_'+numeroDescarga,
  "folder":'PrioGLAD',
  "scale": 10,
  "maxPixels": 1e13,
  "region": areaDescarga.geometry()});
  Export.image.toDrive({
  "image": alertasGLAD,
  "description": 'AlertasGlad_'+tipoDato+'_'+numeroDescarga,
  "folder":'PrioGLAD',
  "scale": 30,
  "maxPixels": 1e13,
  "region": areaDescarga.geometry()});
  Export.table.toDrive({
  "collection": areaDescarga2,
  "description": 'Poly_'+tipoDato+'_'+numeroDescarga,
  "folder":'PrioGLAD',
  "fileFormat": "SHP"});
  Export.table.toDrive({
  "collection": centroidAlertaID,
  "description": 'Centroide_'+tipoDato+'_'+numeroDescarga,
  "folder":'PrioGLAD',
  "fileFormat": "SHP"});
  Export.table.toDrive({
  "collection": alertaVector,
  "description": 'AlertaVector_'+tipoDato+'_'+numeroDescarga,
  "folder":'PrioGLAD',
  "fileFormat": "SHP"});
}