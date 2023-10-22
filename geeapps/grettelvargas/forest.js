var meso = ui.import && ui.import("meso", "table", {
      "id": "users/grettelvargas/Mesoamerica"
    }) || ee.FeatureCollection("users/grettelvargas/Mesoamerica"),
    dep = ui.import && ui.import("dep", "table", {
      "id": "users/grettelvargas/Guatemala_dept"
    }) || ee.FeatureCollection("users/grettelvargas/Guatemala_dept");
//Coleccion de codigos
// Precipitación media anual y mensual usando CHIRPS.
// El propósito de esta Unidad es permitir que el usuario pueda:
// 1) Delimita un área de interés usando una geometría / punto
// 2) Construir funciones
// 3) Crear gráficos
// 4) Crear subtítulos
// ********************* DEFINICIÓN DEL TIEMPO DE ANÁLISIS - AÑO X Y AÑO X + 1 ********* /
Map.setOptions('SATELLITE')
var startyear = 2000;
var endyear = 2010;
// CREAR LISTA DE MESES PARA USAR EN FUNCIONES
var months = ee.List.sequence(1,12);
// ESTABLECER INICIO Y FIN
var startdate = ee.Date.fromYMD(startyear,1,1);
var enddate = ee.Date.fromYMD(endyear,12,31);
// CREAR LISTA PARA AÑOS VARIABLES
var years = ee.List.sequence(startyear,endyear);
// DEFINICIÓN DEL ÁREA DE ESTUDIO
//Para el analisis de las sub cuencas de dos o mas cuencas 
//activar este texto activar la alternativa 1
//Para el analisis de las sub cuencas de una cuenca
//activar este texto activar la alternativa 2
//alternativa 1
//var area_estudio = ee.FeatureCollection('users/') 
//.filter(ee.Filter.or(
//ee.Filter.eq('Subcuenca1','Abiseo'), 
//ee.Filter.eq('Subcuenca1','Breo'),
//ee.Filter.eq('Subcuenca1','Verde'),
//ee.Filter.eq('Subcuenca1','Jalache')
//))
//alternativa 2
//var area_estudio = ee.FeatureCollection('users/') 
//.filter(ee.Filter.eq('Subcuenca1','Abiseo'))
var empty = ee.Image().byte();
var outline = empty.paint({
  featureCollection: meso,
  color: 1,
  width: 2
});
Map.addLayer(outline, {palette: '#000000'}, 'Paises',1);
//////////////////////////// COLECCIÓN DE IMÁGENES PARA PRECIPITACIÓN - SATÉLITE CHIRPS /
///// 1981 A 2020 .....
var P = ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY")
        .select('precipitation')
        .filterDate(startdate, enddate)
        //.sort('system:time_start', false)
        .filterBounds(dep);
// ****************************** CÁLCULO ANUAL DE PRECIPITACIÓN ******************************** /
var precipitacao_anual_acum = ee.ImageCollection.fromImages(
  years.map(function (year) {
    var annual = P.filter(ee.Filter.calendarRange(year, year, 'year'))
        .sum()
        .clip(dep);
    return annual
        .set('year', year)
        .set('system:time_start', ee.Date.fromYMD(year, 1, 1));
}));
// ****************************** Tabla de precipitación anual ************************************ /
var chartP_anual = ui.Chart.image.seriesByRegion({
    imageCollection: precipitacao_anual_acum,
    regions: dep, 
    reducer: ee.Reducer.mean(), 
    band: 'precipitation', 
    scale: 2500, 
    xProperty: 'system:time_start', 
    seriesProperty: 'Nombre'})
    .setOptions({
      title: 'Precipitación anual acumulada por cuenca hidrográfica usando CHIRPS',
      hAxis: {title: 'Intervalo de tiempo'},
      vAxis: {title: 'P (mm)'}}
      )
    .setChartType('ColumnChart');  
print(chartP_anual)
/**************************************ADICIONANDO LAYERS*******************************/
var VisAnual = {opacity:1,
            bands:["precipitation"],
            min:954.00,
            max:2038.00,
            palette:['cyan','darkblue','orange','Magenta','DarkMagenta','DeepPink']};
Map.addLayer(precipitacao_anual_acum, VisAnual, 'CHIRPS de precipitación anual',1);
// *************************** CÁLCULO DE PRECIPITACIÓN MENSUAL ********************************** /
var precipitacao_mensal_acum =  ee.ImageCollection.fromImages(  // DEVUELVE LA IMAGEN PARA LA COLECCIÓN
  years.map(function (ano) { // APLICAR LA FUNCIÓN MAP (LOOP) A LA VARIABLE AÑOS
  return months.map(function(mes){ // devuelve la variable meses con la siguiente función P:  
  var pre_month = P.filter(ee.Filter.calendarRange(ano, ano, 'year'))  //filtro por año,
           .filter(ee.Filter.calendarRange(mes, mes, 'month')) //  filtro por mes
           .sum() //SUM - AGREGAR TODOS LOS VALORES DE COLECCIÓN DEL MES 
           .clip(dep);
  return pre_month.set('year', ano) // RANGO DE AÑOS = Y
           .set('month', mes) // RANGO DE MES = m
           .set('date', ee.Date.fromYMD(ano,mes,1)) // FECHA ES LA FECHA QUE VIENE DEL AÑO, MES Y 1 DÍA 1.
           .set('system:time_start',ee.Date.fromYMD(ano,mes,1)); // RANGO DE COLECCIONES TIME_START DEL SISTEMA
            }); 
          }).flatten()
          ); /// COLECCIONES APILADAS
//////////////////// FUNCIÓN PARA INSERTAR GRÁFICO DE SERIE POR REGIÓN O SUB CUENCA /////////////////////// 
var chartP = ui.Chart.image.seriesByRegion({
    imageCollection: precipitacao_mensal_acum,
    regions: dep, 
    reducer: ee.Reducer.mean(), 
    band: 'precipitation', 
    scale: 2500, 
    xProperty: 'system:time_start', 
    seriesProperty: 'Nombre'})
    .setOptions({
      title: 'Precipitación mensual acumulada por cuenca hidrográfica usando CHIRPS',
      hAxis: {title: 'Intervalo de tiempo'},
      vAxis: {title: 'P (mm)'}}
      )
    .setChartType('ColumnChart');  
print(chartP)
/**************************************ADICIONANDO LAYERS*******************************/
var Vis = {opacity:1,
            bands:["precipitation"],
            min:60.00,
            max:165.00,
            palette:['red','orange','yellow','green','cyan','blue','darkblue']};
Map.addLayer(precipitacao_mensal_acum, Vis, 'CHIRPS de precipitación mensual',1);
// ************************************* CREANDO LEYENDA *********************************** /
// vista previa del color del panel
// crear parámetros de visualización
var VisP = {
  min:960.00, 
  max:2055.00,
  palette:['cyan','darkblue','orange','Magenta','DarkMagenta','DeepPink']};
// definir la posición del panel
var legend = ui.Panel({
style: {
position: 'bottom-right', //posición
padding: '8px 15px' //Llenar
}
});
// Creando el título de la leyenda
var legendTitle = ui.Label({
value: 'Precipitación (mm/año)',
style: {
fontWeight: 'bold', //espesor de la fuente
fontSize: '12px', //tamaño da fuente
margin: '0 0 4px 0', //margen
padding: '0' //llenar
}
});
// Agrega el título al panel
legend.add(legendTitle);
// crea la imagen del título
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((VisP.max-VisP.min)/100.0).add(VisP.min);
var legendImage = gradient.visualize(VisP);
// crea texto en la parte superior del título
var panel = ui.Panel({
widgets: [
ui.Label(VisP['max'])
],
});
legend.add(panel);
// crear miniatura de imagen
var thumbnail = ui.Thumbnail({
image: legendImage,
params: {bbox:'0,0,10,100', dimensions:'10x200'},
style: {padding: '1px', position: 'bottom-center'}
});
// adicione a miniatura una leyenda
legend.add(thumbnail);
// crea texto en la parte superior del título
var panel = ui.Panel({
widgets: [
ui.Label(VisP['min'])
],
});
legend.add(panel);
Map.add(legend)
// ********************************* Leyenda Mensual ************************************** /
// vista previa del color del panel
// crear parámetros de visualización
var VisP = {
  min:0, 
  max:400,
  palette:['red','orange','yellow','green','cyan','blue','darkblue']};
// definir la posición del panel
var legend = ui.Panel({
style: {
position: 'bottom-left', //posición
padding: '8px 15px' //llenar 
}
});
// Creando el título de la leyenda
var legendTitle = ui.Label({
value: 'Precipitación (mm/mes)',
style: {
fontWeight: 'bold', //grosor de fuente
fontSize: '12px', //tamaño de fuente
margin: '0 0 4px 0', //margen
padding: '0' //llenar
}
});
// Adicione o título ao painel
legend.add(legendTitle);
// crea la imagen del título
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((VisP.max-VisP.min)/100.0).add(VisP.min);
var legendImage = gradient.visualize(VisP);
// crea texto en la parte superior del título
var panel = ui.Panel({
widgets: [
ui.Label(VisP['max'])
],
});
legend.add(panel);
// crear miniatura de imagen
var thumbnail = ui.Thumbnail({
image: legendImage,
params: {bbox:'0,0,10,100', dimensions:'10x200'},
style: {padding: '1px', position: 'bottom-center'}
});
// agrega la miniatura al título
legend.add(thumbnail);
// crea texto en la parte superior del título
var panel = ui.Panel({
widgets: [
ui.Label(VisP['min'])
],
});
legend.add(panel);
Map.add(legend)
var outline1 = empty.paint({
  featureCollection: dep,
  color: 1,
  width: 2
});
Map.addLayer(outline1, {palette: '#000000'}, 'Guatemala',1);
Map.centerObject(dep,7)