var AOI = ui.import && ui.import("AOI", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            12.48845276926148,
            41.882635595033975
          ]
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -59.08820789008819,
                -23.461780776049473
              ],
              [
                -59.08820789008819,
                -24.625592412737458
              ],
              [
                -57.17658679633819,
                -24.625592412737458
              ],
              [
                -57.17658679633819,
                -23.461780776049473
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry({
      "type": "GeometryCollection",
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            12.48845276926148,
            41.882635595033975
          ]
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -59.08820789008819,
                -23.461780776049473
              ],
              [
                -59.08820789008819,
                -24.625592412737458
              ],
              [
                -57.17658679633819,
                -24.625592412737458
              ],
              [
                -57.17658679633819,
                -23.461780776049473
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "coordinates": []
    });
//UI5 2021 Update
//Web App 2021
// Titulo y descripcion
var titulo = ui.Label(' APP Priorización de Alertas GLAD', {fontSize: '36px', color: 'blue'});
var texto = ui.Label(
    'Ajustes a la metodología de priorización de alertas GLAD, Places to Watch (Wiesse et. al. 2017)',
    {fontSize: '11px'});
var version = ui.Label(
    'App WEB v2.0.20',
    {fontSize: '11px'});
var toolPanel = ui.Panel([titulo,texto,version], 'flow', {width: '340px'});
ui.root.insert(0,toolPanel);
toolPanel.add(ui.Label('Parámetros', {'font-size': '24px'}));
//Selección de área de estudio
toolPanel.add(ui.Label('1. Elegir área de estudio', {'fontWeight': 'bold','font-size': '14px'}));
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
var checkDibujo = ui.Checkbox({label: 'Dibujar Área de Estudio (AOI)', value : false, onChange:function(){return checkRegion.setValue(false),checkDepartamento.setValue(false),checkOtro.setValue(false)}});
toolPanel.add(ui.Panel([checkRegion], ui.Panel.Layout.Flow('horizontal',true)));
toolPanel.add(ui.Panel([layerSelectR], ui.Panel.Layout.Flow('horizontal')));
toolPanel.add(ui.Panel([checkDepartamento], ui.Panel.Layout.Flow('horizontal',true)));
toolPanel.add(ui.Panel([layerSelectD], ui.Panel.Layout.Flow('horizontal')));
toolPanel.add(ui.Panel([checkOtro], ui.Panel.Layout.Flow('horizontal',true)));
var idRegion = ui.Textbox({placeholder:'Introducir ID del Asset'});
toolPanel.add(idRegion);
//toolPanel.add(ui.Panel([checkDibujo], ui.Panel.Layout.Flow('horizontal',true)));
//Seleccion de tamaño de celdas
toolPanel.add(ui.Label('2. Elegir tamaño de celdas', {'fontWeight': 'bold','font-size': '14px'}));
var listaTamaños = ['10', '15', '20', '25','50'];
//Lista de tamaños de celdas
var cellSelect = ui.Select({
  items: listaTamaños,
  value: listaTamaños[0]});
toolPanel.add(cellSelect);
//Seleccion de fechas de análisis
toolPanel.add(ui.Label('3. Elegir fechas de análisis', {'fontWeight': 'bold','font-size': '14px'}));
var dateSelect1 = ui.Textbox({placeholder:'aaaa-mm-dd', value: '2021-01-01'});
var dateSelect2 = ui.Textbox({placeholder:'aaaa-mm-dd', value: '2021-01-31'});
toolPanel.add(dateSelect1);
toolPanel.add(dateSelect2);
//Seleccion de capas de analisis
var encabezado4 = ui.Label('4. Elegir capas de entrada', {'fontWeight': 'bold','font-size': '14px'});
var descripcion4 = ui.Label('En el siguiente apartado se deben dar pesos a las diferentes capas a ser utilizadas en el análisis:', { 'font-size': '12px'});
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
toolPanel.add(encabezado4);
toolPanel.add(descripcion4);
toolPanel.add(PanelTitulosPesos);
toolPanel.add(PanelPesos1);
toolPanel.add(PanelPesos2);
toolPanel.add(PanelPesos7);
toolPanel.add(PanelPesos3);
toolPanel.add(PanelPesos4);
toolPanel.add(PanelPesos5);
toolPanel.add(PanelPesos6);
//Seleccion de Metodologias
var encabezado5 = ui.Label('5. Elegir metodología', {'fontWeight': 'bold', 'font-size': '14px'});
var m1Check = ui.Checkbox('Metodología 1 : Proporción de Áreas', false, 
function(){return m2Check.setValue(false)},false, {margin: '6px'});
var m2Check = ui.Checkbox('Metodología 2 : Sumatoria de Alertas por Celda y Conglomerados', true, 
function(){return m1Check.setValue(false)},false, {margin: '6px'});
toolPanel.add(encabezado5);
toolPanel.add(m1Check);
toolPanel.add(m2Check);
//Seleccion de Numero de celdas prioritarias
toolPanel.add(ui.Label('6. Elegir número de celdas prioritarias', {'fontWeight': 'bold','font-size': '14px'}));
var numPriorSelect = ui.Textbox({value:'10'});
toolPanel.add(numPriorSelect);
//Boton de inicio
var botonInicio = ui.Button({label: 'Ejecutar análisis', onClick: start});
toolPanel.add(botonInicio);
/*
//Descarga de informacion
toolPanel.add(ui.Label('7. Elegir parámetros de descarga', {'fontWeight': 'bold','font-size': '14px'}));
var numeroCeldas = ui.Textbox({placeholder:'Insertar ID de Celda'});
var numeroPlanes = ui.Textbox({placeholder:'Insertar CAT de Catastro Forestal*'});
var idDescarga = ui.Textbox({placeholder:'Introducir ID del Asset'});
var idAOI = ui.Textbox({placeholder:'Introducir nombre del AOI'});
var checkCeldas = ui.Checkbox({label: 'Celda', value : true, onChange:function(){return checkPlanes.setValue(false),checkOtro2.setValue(false),checkDibujo2.setValue(false)}});
var checkPlanes = ui.Checkbox({label: 'Catastro Forestal', value : false, onChange:function(){return checkCeldas.setValue(false),checkOtro2.setValue(false),checkDibujo2.setValue(false)}});
var checkOtro2 = ui.Checkbox({label: 'GEE Asset', value : false, onChange:function(){return checkCeldas.setValue(false),checkPlanes.setValue(false),checkDibujo2.setValue(false)}});
var checkDibujo2 = ui.Checkbox({label: 'AOI', value : false, onChange:function(){return checkCeldas.setValue(false),checkPlanes.setValue(false),checkOtro2.setValue(false)}});
toolPanel.add(ui.Panel([checkCeldas], ui.Panel.Layout.Flow('horizontal',true)));
toolPanel.add(ui.Panel([numeroCeldas], ui.Panel.Layout.Flow('horizontal',true)));
toolPanel.add(ui.Panel([checkPlanes], ui.Panel.Layout.Flow('horizontal',true)));
toolPanel.add(ui.Panel([numeroPlanes], ui.Panel.Layout.Flow('horizontal',true)));
toolPanel.add(ui.Panel([checkOtro2], ui.Panel.Layout.Flow('horizontal',true)));
toolPanel.add(ui.Panel([idDescarga], ui.Panel.Layout.Flow('horizontal',true)));
toolPanel.add(ui.Panel([checkDibujo2], ui.Panel.Layout.Flow('horizontal',true)));
toolPanel.add(ui.Panel([idAOI], ui.Panel.Layout.Flow('horizontal',true)));
var botonDescarga = ui.Button({label: 'Descargar', onClick: downloadCelda});
toolPanel.add(botonDescarga);
*/
//Enlaces complmentarios
var link1= ui.Label(
    'Places to Watch: Identifying High-Priority Forest Disturbance from Near–Real Time Satellite Data', {},
    'https://www.wri.org/publication/places-to-watch');
var link2 = ui.Label(
    'Guía de Usuario', {},
    'https://drive.google.com/file/d/1opzhnCRciEUqnO9dCswYZt37xEg5DtM3/view?usp=sharing');  
var link3 = ui.Label(
    'Reporte Semiautomático', {},
    'https://drive.google.com/drive/folders/1q-Ctfr3Q1rfW0REmEtDRArP4NeAlIZuU?usp=sharing');  
var link4 = ui.Label(
    'Consultas y Discusiones', {},
    'https://groups.google.com/u/0/g/prio-glad-py'); 
var linkPanel = ui.Panel(
    [ui.Label('Para más información', {'fontWeight': 'bold'}), link1, link2, link3,link4]);
toolPanel.add(linkPanel);
Map.setCenter(-57.6160399213382,-24.055037600053165, 6);
//Funciones
function start(){
Map.clear();
 //User input
var tamanoCelda = cellSelect.getValue();
var fecha1 = ee.Date(dateSelect1.getValue()); 
var fecha2 = ee.Date(dateSelect2.getValue());
var numCellPrior = ee.Number.parse(numPriorSelect.getValue());
//Seleccion de Area de Estudio
var Paraguay = ee.FeatureCollection("users/joseserafinig/P2W/RegionesPy");
var ParaguayD = ee.FeatureCollection("users/joseserafinig/PY/DepartamentosParaguay2012");
var areaEstudio,region;
if (checkRegion.getValue() === true ){
  areaEstudio = layerSelectR.getValue();
  region = Paraguay.filter(ee.Filter.eq('REG',areaEstudio)).geometry();
} else {if (checkDepartamento.getValue() === true ){
  areaEstudio = layerSelectD.getValue();
  region = ParaguayD.filter(ee.Filter.eq('DPTO_DESC',areaEstudio.toUpperCase())).geometry();
}
  else {if (checkOtro.getValue() === true) {
    areaEstudio = idRegion.getValue();
    region = ee.FeatureCollection(areaEstudio)
  }
  else {if (checkDibujo.getValue() === true) {
    areaEstudio = 'Custom'
    var poligono = AOI.geometries().getGeometry(-1);
    region = ee.FeatureCollection(poligono)
    print(region)
  }}
  }
}
//Seleccion de cuadricula
var c10 = ee.FeatureCollection("users/joseserafinig/P2W/c10k");
var c15 = ee.FeatureCollection("users/joseserafinig/P2W/c15k");
var c20 = ee.FeatureCollection("users/joseserafinig/P2W/c20k");
var c25 = ee.FeatureCollection("users/joseserafinig/P2W/c25k");
var c50 = ee.FeatureCollection("users/joseserafinig/P2W/c50k");
var c100 = ee.FeatureCollection("users/joseserafinig/P2W/c100k");
var celdas;
switch (tamanoCelda) {
  case '10':
    celdas = c10;
    break;
  case '15':
    celdas = c15;
    break;
  case '20':
    celdas = c20;
    break;
  case '25':
     celdas = c25;
    break;
  case '50':
    celdas = c50;
    break;
}
var grilla = celdas.filterBounds(region);
//Funciones para generar mosaicos Landsat y Sentinel 2
function maskcloudBand(image) {
  var qa = image.select('cfmask');
  var maskCloudsShadow = qa.bitwiseAnd(8).eq(0).and(                                 // include shadow
                         qa.bitwiseAnd(32).eq(0));                                   // include clouds
    maskCloudsShadow = maskCloudsShadow.focal_max(4);
  var mask2 = image.mask().reduce(ee.Reducer.min());
  var resultado = image
  .updateMask(maskCloudsShadow).updateMask(mask2);
  return resultado}
function indexBand(image) {
  var id = ee.String(image.get('LANDSAT_ID'));
  var idSatelite= id.slice(3,4);
  var idFecha = id.slice(17,25);
  var idPathRow = id.slice(10,16);
  var index = ee.Number.parse(ee.String(idFecha));
  var index2 = ee.Number.parse(ee.String(idPathRow));
  var resultado = ee.Image(index).int32().clip(image.geometry()).rename('index');
  var resultado2 = ee.Image(index2).int32().clip(image.geometry()).rename('pathrow');
  return image.addBands(resultado).addBands(resultado2);
}
function landsatMosaic (date, region) {
  var date1_2 = date.advance(-48,'day');
  var Landsat8t1 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR');
  var filtro = Landsat8t1
  .filterDate(date1_2,date)
  .filterBounds(region)
  .filterMetadata('CLOUD_COVER_LAND','less_than', 80).select(
  ['B2', 'B3', 'B4', 'B5', 'B6', 'B7','pixel_qa'],  
  ['blue', 'green', 'red', 'nir', 'swir1', 'swir2','cfmask']);
  var idColeccion = filtro.map(indexBand)
  var sinNubesColeccion = idColeccion.map(maskcloudBand);
  var bandas1 = ['blue_first','green_first','red_first','nir_first','swir1_first','swir2_first','index_first','pathrow_first'];
  var bandas2 = ['blue','green','red','nir','swir1','swir2','index','pathrow'];
  var coleccionLast = sinNubesColeccion.sort('system:time_start',false).reduce(ee.Reducer.firstNonNull()).select(bandas1,bandas2);
  var mosaico = coleccionLast.select(['red','nir','swir1']).divide(10000).multiply(255).toUint8()
  var resultado = mosaico.addBands(coleccionLast.select(['index'],['obsDate']))
  return resultado
}
//Seleccion de Alertas Glad
var glad = ee.ImageCollection('projects/glad/alert/UpdResult');
var date1 = ee.Number(fecha1.getRelative('day','year'));
var date2 = ee.Number(fecha2.getRelative('day','year'));
var dateYear1 = dateSelect1.getValue().slice(0,4);
var dateYear2 = dateSelect2.getValue().slice(0,4);
var bandas2019 = ['alertDate20','conf20'];
var bandas2020 = ['alertDate21','conf21'];
var bandasGLAD;
var gladfilter;
var mosaicoLandsatEnero;
var gladLast;
var lastAlerts,lastAlerts2,lastAlerts3,lastAlerts4,lastAlerts5;
var gladRegion = glad.filterBounds(region);
//Sumar 2020 si la fecha 2 es mayor a 2020-01-01
//Funcion seleccion de alertas
if(dateYear1 === '2020' && dateYear2 === '2020'	) {
  gladfilter = gladRegion.filterDate('2021-01-01','2021-01-02');
  bandasGLAD = bandas2019;
  mosaicoLandsatEnero = landsatMosaic(ee.Date('2019-12-31'),region).select(['red','nir','swir1','obsDate']);
  gladLast = gladfilter.sort('system:time_start',false).first();
  lastAlerts = gladLast.select(bandasGLAD[1]).clip(region);
  lastAlerts2 = lastAlerts.selfMask();
  lastAlerts3 = lastAlerts2.where(gladLast.select(bandasGLAD[0]).lt(date1),0);
  lastAlerts4 = lastAlerts3.where(gladLast.select(bandasGLAD[0]).gt(date2),0);
  lastAlerts5 = lastAlerts4.selfMask();
}
else {if (dateYear1 === '2020' && dateYear2 === '2021'){
  bandasGLAD = bandas2020;
  gladfilter = gladRegion.filterDate(fecha1,fecha2);
  mosaicoLandsatEnero = landsatMosaic(fecha1,region).select(['red','nir','swir1','obsDate']);
  //Seleccion 2019
  gladLast = gladfilter.sort('system:time_start',false).first();
  lastAlerts = gladLast.select(bandas2019[1]).clip(region);
  var lastAlerts2_2019 = lastAlerts.selfMask();
  lastAlerts3 = lastAlerts2_2019.where(gladLast.select(bandas2019[0]).lt(date1),0);
  var lastAlerts5_2019 = lastAlerts3.selfMask().select(['conf20'],['conf21']);
  //Seleccion 2020
  lastAlerts = gladLast.select(bandas2020[1]).clip(region);
  var lastAlerts2_2020 = lastAlerts.selfMask();
  lastAlerts3 = lastAlerts2_2020.where(gladLast.select(bandas2020[0]).gt(date2),0);
  var lastAlerts5_2020 = lastAlerts3.selfMask();
  print(lastAlerts5_2019,lastAlerts5_2020);
  lastAlerts2 = ee.ImageCollection.fromImages([lastAlerts2_2019.select(['conf20'],['conf21']),lastAlerts2_2020]).reduce(ee.Reducer.lastNonNull()).select(['conf21_last'],['conf21']);
  lastAlerts5 = ee.ImageCollection.fromImages([lastAlerts5_2019,lastAlerts5_2020]).reduce(ee.Reducer.lastNonNull()).select(['conf21_last'],['conf21']);
}
else{
  //dates 2020
  gladfilter = gladRegion.filterDate(fecha1,fecha2);
  bandasGLAD = bandas2020;
  mosaicoLandsatEnero = gladfilter.sort('system:time_start',true).first().select(['red','nir','swir1','obsDate']);
  gladLast = gladfilter.sort('system:time_start',false).first();
  lastAlerts = gladLast.select(bandasGLAD[1]).clip(region);
  lastAlerts2 = lastAlerts.selfMask();
  lastAlerts3 = lastAlerts2.where(gladLast.select(bandasGLAD[0]).lt(date1),0);
  lastAlerts4 = lastAlerts3.where(gladLast.select(bandasGLAD[0]).gt(date2),0);
  lastAlerts5 = lastAlerts4.selfMask();
}}
var fechaExactaAlertayMosaico = ee.String(dateYear1).cat(ee.String('-')).cat(ee.String(gladLast.get('system:index')).slice(0,5).replace('_','-'));
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
//Imagenes Sentinel
var maskClouds = function(image){
var cloudProb = image.select('MSK_CLDPRB');
var scl = image.select('SCL'); 
var shadow = scl.eq(3); // 3 = cloud shadow
var cirrus = scl.eq(10); // 10 = cirrus
var mask = cloudProb.lt(5).and((cirrus).neq(1)).and((shadow).neq(1));
return image.updateMask(mask).addBands(image.metadata('system:time_start').rename('fecha'));
};
var sentinel2 = ee.ImageCollection('COPERNICUS/S2_SR');
//Mosaico Sentinel 2 Enero
var fechaSentinel1 = ee.Date(''+dateYear1+'-01-15');
var fechaSentinel2 = fechaSentinel1.advance(-48,'day');
var fs2019 = sentinel2.filterBounds(region)
                    .filterDate(fechaSentinel2, fechaSentinel1)
                    .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than', 40);
var ms2019 = fs2019.map(maskClouds);
var m2017s2019 = ms2019.median();
var cs2019 = m2017s2019.clip(region);
//Mosaico Sentinel 2 Alerta
var fs2 = sentinel2.filterBounds(region)
                    .filterDate(fecha1, fecha2)
                    .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than', 40);
var ms2 = fs2.map(maskClouds);
var m2017s2 = ms2.median();
var cs2 = m2017s2.clip(region);
//Capas
var py = ee.Image("users/joseserafinig/PY/Paraguay0");
var areasProtegidas = ee.Image("users/joseserafinig/P2W/aspMADES");
var coberturaForestal2018 = ee.Image("users/joseserafinig/P2W/CF_2018");
var coberturaForestal1986 = ee.Image("users/joseserafinig/P2W/CF86_Nac");
var plantacionesForestales2018 = ee.Image("users/joseserafinig/P2W/Plant_Ftal_2018");
var areasCertificadas = ee.Image('users/joseserafinig/P2W/AreasCertificadasSA');
var comunidadesIndigenas = ee.Image("users/joseserafinig/P2W/comunidadesIndigenas");
var mosaico1986occ = ee.Image('users/kpich90/mosaico86_occidental');
var mosaico1986or = ee.Image('users/kpich90/mosaico86_oriental');
var mosaico1986 = ee.ImageCollection.fromImages([mosaico1986occ,mosaico1986or]).max().selfMask();
var mosaico2005occ = ee.Image('users/kpich90/mosaico05_occ');
var mosaico2005or = ee.Image('users/kpich90/mosaico05_ori');
var mosaico2005 = ee.ImageCollection.fromImages([mosaico2005occ,mosaico2005or]).max().selfMask();
var visSWNIRRED2 = {bands: ['b4','b5','b3'], min: [0,0,0], max: [200, 200, 200]};
var visSWNIRRED3 = {bands: ['b2','b1','b3'], min: [0,0,0], max: [180, 160, 160]};
var cat1 = ee.Image('users/joseserafinig/PUTS2/ALTER_PUT_1998_preliminar');
var cat2 = ee.Image('users/joseserafinig/PUTS2/ALTER_PUT_1999_preliminar');
var cat3 = ee.Image('users/joseserafinig/PUTS2/ALTER_PUT_2000_preliminar');
var cat4 = ee.Image('users/joseserafinig/PUTS2/ALTER_PUT_2001_preliminar');
var cat5 = ee.Image('users/joseserafinig/PUTS2/ALTER_PUT_2002_preliminar');
var cat6 = ee.Image('users/joseserafinig/PUTS2/ALTER_PUT_2003_preliminar');
var cat7 = ee.Image('users/joseserafinig/PUTS2/ALTER_PUT_2004_preliminar');
var cat8 = ee.Image('users/joseserafinig/PUTS2/ALTER_PUT_2005_preliminar');
var cat9 = ee.Image('users/joseserafinig/PUTS2/ALTER_PUT_2006_preliminar');
var cat10 = ee.Image('users/joseserafinig/PUTS2/ALTER_PUT_2007_preliminar');
var cat11 = ee.Image('users/joseserafinig/PUTS2/ALTER_PUT_2008_preliminar');
var cat12 = ee.Image('users/joseserafinig/PUTS2/ALTER_PUT_2009_preliminar');
var cat13 = ee.Image('users/joseserafinig/PUTS2/ALTER_PUT_2010_preliminar');
var cat14 = ee.Image('users/joseserafinig/PUTS2/ALTER_PUT_2011_preliminar');
var cat15 = ee.Image('users/joseserafinig/PUTS2/ALTER_PUT_2012_preliminar');
var cat16 = ee.Image('users/joseserafinig/PUTS2/ALTER_PUT_2013_preliminar');
var cat17 = ee.Image('users/joseserafinig/PUTS2/ALTER_PUT_2014_preliminar');
var cat18 = ee.Image('users/joseserafinig/PUTS2/ALTER_PUT_2015');
var cat19 = ee.Image('users/joseserafinig/PUTS2/ALTER_PUT_2016');
var cat20 = ee.Image('users/joseserafinig/PUTS2/ALTER_PUT_2017');
var cat21 = ee.Image('users/joseserafinig/PUTS2/ALTER_PUT_2018');
var cat22 = ee.Image('users/joseserafinig/PUTS2/ALTER_PUT_2019');
var planes = ee.ImageCollection.fromImages([cat1,cat2,cat3,cat4,cat5,cat6,cat7,cat8,cat9,cat10,cat11,cat12,cat13,cat14,cat15,cat16,cat17,cat18,cat19,cat20,cat21,cat22]);
var unionPlanes = planes.reduce(ee.Reducer.lastNonNull());
var cp= unionPlanes.eq(1);
var sp = unionPlanes.eq(2).or(unionPlanes.eq(3));
var limitesPuts = ee.FeatureCollection('users/joseserafinig/P2W/LimitesCat19982019');
var limitesPMF = ee.FeatureCollection('users/joseserafinig/P2W/LIM_PMF');
//Ajuste de capas
var alertasGlad = lastAlerts5.where(lastAlerts5.gt(0),1);
var areasProtegidas1 = py.where(areasProtegidas.eq(1),1);
var coberturaForestal20181 = py.where(coberturaForestal2018.eq(1),1);
var plantacionesForestales20181 = py.where(plantacionesForestales2018.eq(1),1);
var areasCertificadas1 = py.where(areasCertificadas.eq(1),1);
var comunidadesIndigenas1 = py.where(comunidadesIndigenas.gt(0),1);
var putsCP1 = py.where(cp.eq(1),1);
var putsSP1 = py.where(sp.gte(2),1);
var grilla1 = grilla.map(function(feature){
      return feature.set('score', 0)});
var gillaImage = grilla1.reduceToImage(['score'],ee.Reducer.first());
//var areaSinPUT = py.where(putsCP1.eq(0).and(putsSP1.eq(0)),1);
//Funcion condicional
var conditional = function(a,b) {
  return ee.Algorithms.If(ee.Algorithms.IsEqual(a,b), true, false)};
Map.centerObject(region);
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
    Map.addLayer(image, {min:min, max:max, palette:'white,yellow,orange,red',opacity: 0.8}, text);
  });
}
//Visualizacion
//Mosaicos
var visSWNIRRED = {bands: ['nir','swir1','red'], min: [0,0,0], max: [280, 280, 300]};
Map.addLayer(mosaico1986.clip(region),visSWNIRRED2,'Mosaico Landsat 1986', false);
Map.addLayer(mosaico2005.clip(region),visSWNIRRED3,'Mosaico Landsat 2005', false);
Map.addLayer(mosaicoLandsatEnero.clip(region), visSWNIRRED, 'Imagen Landsat Enero ' + dateYear1, false);
  if(conditional(gladfilter2.size(), 0).getInfo()) {
  }
  else {
 Map.addLayer(gladLast2.clip(region), visSWNIRRED, 'Imagen Landsat Mes Anterior Alerta',false);
  }
Map.addLayer(gladLast.clip(region), visSWNIRRED, 'Imagen Landsat Alerta',false);
Map.addLayer(cs2019, {'bands': 'B8,B11,B4',  'min': [0,0,0],'max': [5000,6000,3000]}, 'Imagen Sentinel Enero '+ dateYear1, false);
Map.addLayer(cs2, {'bands': 'B8,B11,B4',  'min': [0,0,0],'max': [5000,6000,3000]}, 'Imagen Sentinel 2 Alerta', false);
//Alertas
Map.addLayer(lastAlerts2, {min:2, max:3, palette:['ff00ff','purple']}, 'Alertas GLAD '+ dateYear1 + '/' + dateYear2, false);
Map.addLayer(lastAlerts5, {min:2, max:3, palette:['ff00ff','purple']}, 'Alertas GLAD del Periodo');
Map.addLayer(gladLast.updateMask(lastAlerts5).select(bandasGLAD[0]).randomVisualizer(), {}, 'Fechas de Alertas GLAD del Periodo',false);
Map.addLayer(ee.Image().toByte().paint(region,1,2), {'palette': '00FFFF'},'Área de Estudio');
Map.addLayer(ee.Image().toByte().paint(grilla,1,1), {'palette': 'brown'},'Grilla');
//Apoyo
Map.addLayer(limitesPuts.filterBounds(region),{color:'orange'},'Limites Catastro Forestal PUT',false);
Map.addLayer(limitesPMF.filterBounds(region),{color:'orange'},'Limites Catastro Forestal PMF',false);
Map.addLayer(coberturaForestal1986.clip(region), {min:1, max:1, palette:"008100"}, 'Cobertura Forestal 1986',false);
Map.addLayer(firmsPeriodoclip, {}, 'Alertas de incendios FIRMS',false);
//Criterios
Map.addLayer(sp.selfMask().clip(region),{min:1,palette:'green'},'Área No Permitida Planes de Uso', false);
Map.addLayer(cp.selfMask().clip(region),{min:1,palette:'yellow'},'Área Permitida Planes de Uso', false);
Map.addLayer(areasCertificadas.clip(region), {min:1, max:1, palette:"purple"}, 'Áreas Certificadas Servicios Ambientales',false);
Map.addLayer(plantacionesForestales2018, {min:0, max:0, palette:"156e2c"}, 'Plantaciones Forestales 2018',false);
Map.addLayer(comunidadesIndigenas.clip(region), {min:0, max:1, palette:"brown"}, 'Comunidades Indigenas',false);
Map.addLayer(areasProtegidas.clip(region), {min:1, max:1, palette:"gray"}, 'Áreas Silvestres Protegidas',false);
Map.addLayer(coberturaForestal2018.clip(region), {min:1, max:1, palette:"00f300"}, 'Cobertura Forestal 2018',false);
//Metodologias
//User Input
var pesoB2018= ee.Number.parse(paramLabel1.getValue());
var pesoASP = ee.Number.parse(paramLabel2.getValue());
var pesoPF = ee.Number.parse(paramLabel3.getValue());
var pesoSA = ee.Number.parse(paramLabel4.getValue());
var pesoPUP = ee.Number.parse(paramLabel5.getValue());
var pesoPUNP = ee.Number.parse(paramLabel6.getValue());
var pesoCI = ee.Number.parse(paramLabel7.getValue());
print('Parámetros establecidos', 
'Área de estudio', areaEstudio, 
'Tamaño de celda', tamanoCelda, 
'Periodo de estudio', fecha1,fecha2,
'Numero de celdas', grilla.size(),
'Pesos', pesoB2018,pesoASP,pesoPF,pesoSA,pesoPUP,pesoPUNP,pesoCI);
//Metodo 1 (Areas proporcionales)
function m1 () {
//Seleccion de cuadricula
var c10p = ee.FeatureCollection("users/joseserafinig/P2W/c10kp");
var c15p = ee.FeatureCollection("users/joseserafinig/P2W/c15kp");
var c20p = ee.FeatureCollection("users/joseserafinig/P2W/c20kp");
var c25p = ee.FeatureCollection("users/joseserafinig/P2W/c25kp");
var c50p = ee.FeatureCollection("users/joseserafinig/P2W/c50kp");
var c100p = ee.FeatureCollection("users/joseserafinig/P2W/c100kp");
var celdasp;
switch (tamanoCelda) {
  case '10':
    celdasp = c10p;
    break;
  case '15':
    celdasp = c15p;
    break;
  case '20':
    celdasp = c20p;
    break;
  case '25':
    celdasp = c25p;
    break;
  case '50':
     celdasp = c50p;
    break;
  case '100':
    celdasp = c100p;
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
//Map.addLayer(cuadrillaPriorizacion,{},'Alertas vector', false);
//Seleccion de celdas con mayor valor
var celdasMayor = cuadrillaPriorizacion.limit(numCellPrior,'prior', false);
Map.addLayer(celdasMayor,{},'Celdas Prioritarias');
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
var cluster12a100k2 = py.where(cluster12a100k1.eq(1),1);
Map.addLayer(cluster12a100k,{min:1, max:1024, palette: ['black']}, 'Conglomerados mayores a 1 hectárea',false)
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
Map.addLayer(celdasMayor,{},'Celdas Prioritarias');
var layerName = 'Priorizacion Alertas';
minMaxLayer(priorizacionImage,layerName);
return cuadrillaPriorizacion;
}
var met;
//Seleccion de metodologia
if (m1Check.getValue() === true ){
   met = m1();
} else {if (m2Check.getValue() === true ){
   met = m2();
}}
//Generar leyenda
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
var legendTitle = ui.Label({
  value: 'Leyenda',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend.add(legendTitle);
var layerTitle = ui.Label({
  value: 'Priorización Alertas',
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend.add(layerTitle);
var loading = ui.Label('Cargando leyenda...', {margin: '2px 0 4px 0'});
legend.add(loading);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });
  // Create the label filled with the description text.
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px'}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
//Generar colores y nombres.
  var palette = ['red','orange','yellow','white'];
  var names = ['Alta','Media','Baja','Muy Baja'];
  loading.style().set('shown', false);
  for (var i = 0; i < names.length; i++) {
    legend.add(makeRow(palette[i], names[i]));
  }
var layerTitle2 = ui.Label({
  value: 'Alertas GLAD',
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend.add(layerTitle2);
  var palette2 = ['ff00ff','purple'];
  var names2 = ['Posible','Confirmada'];
  loading.style().set('shown', false);
  for (var j = 0; j < names2.length; j++) {
    legend.add(makeRow(palette2[j], names2[j]));
  }
Map.add(legend);
// Crear inspector de celdas.
var inspector = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
    style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
inspector.add(ui.Label('Información de celdas',{'font-size': '12px'}));
Map.add(inspector);
Map.style().set('cursor', 'crosshair');
Map.onClick(function(coords) {
//Mostrar mensaje cargando
  inspector.clear();
  inspector.style().set('shown', true);
  inspector.add(ui.Label('Cargando...', {'color': 'gray','font-size': '12px'}));
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
  var putSeleccionado = ee.Feature(limitesPuts.filterBounds(point).first());
  var numeroPut = putSeleccionado.get('CAT');
  var pmfSeleccionado = ee.Feature(limitesPMF.filterBounds(point).first());
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
      style: {'stretch': 'vertical', 'font-size': '12px'}
    }))}); 
lat.evaluate(function(result) {
    inspector.add(ui.Label({
      value: 'Latitud: ' + result.toFixed(6),
      style: {'stretch': 'vertical', 'font-size': '12px'}
    }))}); 
idCelda.evaluate(function(result) {
    inspector.add(ui.Label({
      value: 'ID de celda: ' + result,
      style: {'stretch': 'vertical', 'font-size': '12px'},
    }))});
numeroAlertas.evaluate(function(result) {
    inspector.add(ui.Label({
      value: 'Número de alertas: ' + result.toFixed(0),
      style: {'stretch': 'vertical', 'font-size': '12px'}
    }))});
scoreCelda.evaluate(function(result) {
    inspector.add(ui.Label({
      value: 'Score de celda: ' + result.toFixed(2),
      style: {'stretch': 'vertical', 'font-size': '12px'}
    }))}); 
prioridadCelda.evaluate(function(result) {
    inspector.add(ui.Label({
      value: 'Valor de priorización: ' + result.toFixed(2),
      style: {'stretch': 'vertical', 'font-size': '12px'}
    }))}); 
areaAlertas.evaluate(function(result) {
    inspector.add(ui.Label({
      value: 'Área de alertas: ' + result.toFixed(2) + ' ha',
      style: {'stretch': 'vertical', 'font-size': '12px'}
    }))}); 
numeroPut.evaluate(function(result) {
    inspector.add(ui.Label({
      value: 'CAT PUT: ' + result,
      style: {'stretch': 'vertical', 'font-size': '12px'}
    }))}); 
numeroPmf.evaluate(function(result) {
    inspector.add(ui.Label({
      value: 'CAT PMF: ' + result,
      style: {'stretch': 'vertical', 'font-size': '12px'}
    }))}); 
obsPmf.evaluate(function(result) {
    inspector.add(ui.Label({
      value: 'OBS PMF: ' + result,
      style: {'stretch': 'vertical', 'font-size': '12px'}
    }))});
fechaExactaAlertayMosaico.evaluate(function(result) {
    inspector.add(ui.Label({
      value: 'Fecha de última observación: ' + result,
      style: {'stretch': 'vertical', 'font-size': '12px'}
    }))}); 
fecha_Alerta2.evaluate(function(result) {
    inspector.add(ui.Label({
      value: 'Fecha de detección: ' + result,
      style: {'stretch': 'vertical', 'font-size': '12px'}
    }))}); 
    /*    // Agregar boton para esconder panel.
    inspector.add(ui.Button({
      label: 'Cerrar',
      onClick: function() {
        inspector.style().set('shown', false);
      }
    }));*/
  });
var separador = ee.String(',')
var parametros =  ee.String(dateSelect1.getValue()).cat(separador)
.cat(dateSelect2.getValue()).cat(separador)
.cat(cellSelect.getValue()).cat(separador)
.cat(paramLabel1.getValue()).cat(separador)
.cat(paramLabel2.getValue()).cat(separador)
.cat(paramLabel3.getValue()).cat(separador)
.cat(paramLabel4.getValue()).cat(separador)
.cat(paramLabel5.getValue()).cat(separador)
.cat(paramLabel6.getValue()).cat(separador)
.cat(paramLabel7.getValue()).cat(separador)
.cat(fechaExactaAlertayMosaico);
var outputs = {};
outputs.celdas = grilla;
outputs.gladEnero = mosaicoLandsatEnero;
outputs.gladAlerta = gladLast;
outputs.sentinelEnero2019 = cs2019;
outputs.sentinelAlerta = cs2;
outputs.alertasGLAD = lastAlerts5;
outputs.params = parametros;
return(outputs);
}
//Descarga de datos
function downloadCelda() {
var outputs = start();
var celdas = outputs.celdas;  
var gladAlerta = outputs.gladAlerta;  
var gladEnero = outputs.gladEnero;  
var sentinelEnero = outputs.sentinelEnero2019;  
var sentinelAlerta = outputs.sentinelAlerta;  
var alertasGLAD = outputs.alertasGLAD;
var parametros = outputs.params;
var limitesPuts = ee.FeatureCollection('users/joseserafinig/P2W/LimitesCat19982019');
var limitesPMF = ee.FeatureCollection('users/joseserafinig/P2W/LIM_PMF');
var puts = limitesPuts.merge(limitesPMF);
var numeroDescarga,poligono,areaDescarga,tipoDato;
if (checkCeldas.getValue() === true ){
  numeroDescarga =numeroCeldas.getValue();
  poligono = celdas;
  areaDescarga = poligono.filter(ee.Filter.eq('name', ee.Number.parse(numeroDescarga)));
  tipoDato = 'Celda';
}
  else {if (checkPlanes.getValue() === true ){
  numeroDescarga = numeroPlanes.getValue();
  poligono = puts;
  areaDescarga = poligono.filter(ee.Filter.eq('CAT',numeroDescarga));
    tipoDato = 'CAT';
} else { if (checkOtro2.getValue() === true){
  numeroDescarga = idDescarga.getValue();
  areaDescarga = ee.FeatureCollection(numeroDescarga);
  numeroDescarga = numeroDescarga.split('/');
  numeroDescarga = numeroDescarga[numeroDescarga.length -1];
  tipoDato = 'Asset';
  }
  else {
  var poligono2 = AOI.geometries().getGeometry(-1);
  areaDescarga = ee.FeatureCollection(poligono2);
  tipoDato = 'AOI';
  numeroDescarga =idAOI.getValue();
  }
}}
print('Seccion Descargas',tipoDato,poligono,numeroDescarga,areaDescarga)
Map.centerObject(areaDescarga)
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
Map.addLayer(centroidAlerta2,{},'Centroides',false);
var numCentroid = centroidAlerta2.size();
var centroidAlertaID = centroidAlerta2.toList(numCentroid).zip(ee.List.sequence(1, numCentroid)).map(function(list) {
  list = ee.List(list);
  return ee.Feature(list.get(0)).set('NRO', list.get(1));
});
centroidAlertaID = ee.FeatureCollection(centroidAlertaID).select(['NRO','x','y'],['NRO','X','Y'])
var getAreaID = function(featureCollection) {
  var area= featureCollection.map(function(feature){return ee.Feature(feature).set({areaHa: feature.geometry().area(10).divide(100 * 100)})}).limit(15,'areaHa',false);
  var areIDsize = area.size();
  var areID = area.toList(numCentroid).zip(ee.List.sequence(1, areIDsize)).map(function(list) {
  list = ee.List(list);
  return ee.Feature(list.get(0)).set('NRO', list.get(1));
})
  return ee.FeatureCollection(areID);
};
alertaVector = getAreaID(alertaVector)
//Poligono
var ParaguayR = ee.FeatureCollection("users/joseserafinig/P2W/RegionesPy");
var ParaguayD = ee.FeatureCollection("users/joseserafinig/PY/DepartamentosParaguay2012");
var ParaguayDis = ee.FeatureCollection("users/joseserafinig/P2W/DISTRITOS_PARAGUAY_2012");
var regionesD = ParaguayR.filterBounds(areaDescarga);
var departamentosD = ParaguayD.filterBounds(areaDescarga);
var distritosD = ParaguayDis.filterBounds(areaDescarga);
function getDesc (featureCollection,propertyName) {
  var vacio = ee.String('');
  var separador = ee.String(', ');
  var resultado = featureCollection.iterate (
    function(producto2,result){
    return ee.String(result).cat(separador).cat(producto2.getString(propertyName))},vacio
    )
  return ee.String(resultado).slice(2).toUpperCase();
}
var alertasGladArea= alertasGLAD.gt(0).clip(areaDescarga)
var areaImagePoly = alertasGladArea.multiply(ee.Image.pixelArea().divide(10000).clip(areaDescarga));
var stats_areaPoly = areaImagePoly.reduceRegion({
  reducer: ee.Reducer.sum(),
  scale:30,
  geometry: areaDescarga.geometry(),
  maxPixels: 1e12
});
var areaDes = ee.Number(stats_areaPoly.getNumber('conf21')).format('%.2f');
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
  return ee.Feature(feature).set({Deptos: deptosString})
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
var areaDescarga2 = areaDescarga.map(setAtributos);
print('Productos descarga',areaDescarga,mosaicoLandsat1,mosaicoLandsat2,mosaicoSentinel21,mosaicoSentinel22,alertasGLAD,areaDescarga2,centroidAlertaID,alertaVector);
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
//calc area
/*
// Crear inspector de celdas.
var inspector2 = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
    style: {
    position: 'top-right',
    padding: '8px 15px'
  }
});
inspector2.add(ui.Label('Calculo de areas',{'font-size': '12px'}));
Map.add(inspector2);
var labelArea = ui.Label('.... hectáreas');
var botonCalcular = ui.Button({label: 'Calcular área', onClick: calcularArea});
var botonLimpiar = ui.Button({label: 'Borrar', onClick: inspector2.clear()});
var PanelCalcArea = ui.Panel({
    widgets: [botonCalcular, botonLimpiar],
    layout: ui.Panel.Layout.Flow('horizontal')});
inspector2.add(PanelCalcArea);
function calcularArea () {
  inspector2.clear();
  inspector2.style().set('shown', true);
  inspector2.add(ui.Label('Cargando...', {'color': 'gray','font-size': '12px'}));
  var geometria = poligono.filterBounds(region);
  var geometria2 = geometria.reduceToImage(['c'], ee.Reducer.max());
  var areaImage = geometria.multiply(ee.Image.pixelArea().divide(10000));
  var stats_area = areaImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  scale:10,
  geometry: region.geometry(),
  maxPixels: 1e12
});
var area = ee.Number(stats_area.get('max'));
area.evaluate(function(result) {
    inspector2.clear();
    inspector2.add(ui.Label({
      value: result.format('%,.2f') + ' hectáreas',
      style: {'stretch': 'vertical', 'font-size': '12px'},
    }))
  var botonCalcular = ui.Button({label: 'Calcular área', onClick: calcularArea});
  var botonLimpiar = ui.Button({label: 'Borrar', onClick: inspector2.clear()});
  var PanelCalcArea = ui.Panel({
    widgets: [botonCalcular, botonLimpiar],
    layout: ui.Panel.Layout.Flow('horizontal')});
   inspector2.add(PanelCalcArea);
});
}
*/
//revisar aoi