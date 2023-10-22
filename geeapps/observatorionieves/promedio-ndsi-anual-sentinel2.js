var aconcagua_cuenca = ui.import && ui.import("aconcagua_cuenca", "table", {
      "id": "users/observatorionieves/DGA/aconcagua_cuenca"
    }) || ee.FeatureCollection("users/observatorionieves/DGA/aconcagua_cuenca"),
    subsubcuencas_ms = ui.import && ui.import("subsubcuencas_ms", "table", {
      "id": "users/observatorionieves/DGA/aconcagua_subsubcuencas_ms"
    }) || ee.FeatureCollection("users/observatorionieves/DGA/aconcagua_subsubcuencas_ms"),
    logo_Observatorio = ui.import && ui.import("logo_Observatorio", "image", {
      "id": "users/observatorionieves/Logos/Logo_Observatorio"
    }) || ee.Image("users/observatorionieves/Logos/Logo_Observatorio"),
    logo_Teleamb = ui.import && ui.import("logo_Teleamb", "image", {
      "id": "users/observatorionieves/Logos/Logo_TeleAmb"
    }) || ee.Image("users/observatorionieves/Logos/Logo_TeleAmb"),
    snow_yearly = ui.import && ui.import("snow_yearly", "imageCollection", {
      "id": "users/observatorionieves/Sentinel/Snow_Yearly"
    }) || ee.ImageCollection("users/observatorionieves/Sentinel/Snow_Yearly");
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Este código genera una comparación interanual
// Con el promedio anual del Índice Normalizado de Nieve para satelite Sentinel-2
// A través de un Split Panel 
// Actualizado 10/09/21
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------
//////////////////////////// Parámetros de visualización ////////////////////////////
//-----------------------------------------------------------------------------------
var streamflow = ee.FeatureCollection("WWF/HydroSHEDS/v1/FreeFlowingRivers")
                   .filter(ee.Filter.eq('BAS_ID', 3975615))
                   .style({color: "B2B2B3", width: 2.0,});
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
featureCollection: aconcagua_cuenca,
color: 1,
width: 1
});
// Create an empty image into which to paint the features, cast to byte.
var empty2 = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline2 = empty2.paint({
featureCollection: subsubcuencas_ms,
color: 2,
width: 1
});
var colorizedVis = {
  bands: ['snow'],
  min: 0,
  max: 100,
  palette: [ //Paleta obtenida de snowcloudmetrics  https://github.com/SnowCloudMetrics/Earth_Engine_Scripts/blob/master/SnowCloudMetrics_app_ui.txt
            'ffffff', //  0 - 10 Blanco
            'ffffd9', // 10 - 20 Blanco
            'edf8b1', // 20 - 30 Azul              //'ffebbe'
            'c7e9b4', // 30 - 40 Celeste
            '7fcdbb', // 40 - 50 Celeste
            '41b6c4', // 50 - 60 azul claro
            '1d91c0', // 60 - 70 crema pálido     //21d291  //179164
            '225ea8', // 70 - 80 celeste         //14dada
            '253494', // 80 - 90 Azul
            '081d58', // 90- 100 Azul
],
};
function styleImg(img){
  return ee.Image(img
    .visualize(colorizedVis)
    .copyProperties(img, img.propertyNames()));
   // .clip(aconcagua_cuenca);
}
// Demonstrates before/after imagery comparison with a variety of dates.
// Configura los parámetros de visualización 
/*
// Define an NSDI style of discrete intervals to apply to the image.
var nsdi_intervals =
 '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false" >' +
      '<ColorMapEntry color="#ffffff" quantity="0" label="0"/>' +
      '<ColorMapEntry color="#ffffff" quantity="10" label="1-10" />' +
      '<ColorMapEntry color="#ffffd9" quantity="20" label="10-20" />' +
      '<ColorMapEntry color="#edf8b1" quantity="30" label="20-30" />' +
      '<ColorMapEntry color="#c7e9b4" quantity="40" label="30-40" />' +
      '<ColorMapEntry color="#7fcdbb" quantity="50" label="40-50" />' +
      '<ColorMapEntry color="#41b6c4" quantity="60" label="50-60" />' +
      '<ColorMapEntry color="#1d91c0" quantity="70" label="60-70" />' +
      '<ColorMapEntry color="#225ea8" quantity=80" label="70-80" />' +
      '<ColorMapEntry color="#253494" quantity="90" label="80-90" />' +
      '<ColorMapEntry color="#081d58" quantity="100" label="90-100" />' +
    '</ColorMap>' +
  '</RasterSymbolizer>';
function styleImg(img){
  return ee.Image(img
    .visualize(nsdi_intervals)
    .copyProperties(img, img.propertyNames()))
    .clip(aconcagua_cuenca);
}
*/
//---------------------------------------------------------------------------------------------------------------------------------------------------------
///////////////////////////////////////////Paleta de colores/////////////////////////////////////////////////////////////////////////////////////
//----------------------------------------------------------------------------------------------------------------------------------------------------------
// Define various parameters that need global scope.
// =================================================
// Palettes for SCF and SDD
//var palette_scf = 'ffffff,ffffd9,edf8b1,c7e9b4,7fcdbb,41b6c4,1d91c0,225ea8,253494,081d58';
// Create and add SCF/SDD colorbar legends to map.
// ===============================================
var Etiquetas = ['00 - 10','10 - 20','20 - 30','30 - 40','40 - 50','50 - 60','60 - 70','70 - 80','80 - 90','90 - 100'];
// Configuracion del titulo y posicion de la leyenda
var Titulo = ui.Label({
  value: 'Promedio de presencia de nieve (%)', // Titulo de la leyenda
  style: {fontWeight: 'bold', fontSize: '18px', margin: '0px 0px 15px 0px',}}); // Estilo y dimensiones
var Leyenda = ui.Panel({
  style: {position: 'bottom-left', padding: '10px 20px'}}); // Posicion, altura y anchura
Leyenda.add(Titulo);
// Configuracion de la simbologia
var Simbologia = ['ffffff','ffffd9','edf8b1','c7e9b4','7fcdbb','41b6c4','1d91c0','225ea8','253494','081d58'];
var Simbolos = function(simbolo, texto) {
var TextoLeyenda = ui.Label({
  value: texto,
  style: {margin: '6px 0px 10px 15px'}}); // Posicion en la separacion de los textos
var CajaLeyenda = ui.Label({
  style: {backgroundColor: '#' + simbolo,
  padding: '15px', // TamaÃ±o del simbolo
  margin: '0px 0px 6px 60px'}}); // Posicion en la separacion de los simbolos
//Representacion de leyenda en el visor
return ui.Panel({
  widgets: [CajaLeyenda, TextoLeyenda],
  layout: ui.Panel.Layout.Flow('horizontal')});};
for (var i = 0; i < 10; i++) {Leyenda.add(Simbolos(Simbologia[i], Etiquetas[i]));} 
//-----------------------------------------------------------------------------------------------------------------------------------------------------------
///////////////////////////////////////////Datos de entrada (Data input)/////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------------------------------------------------------------------------------
//Declaro las variables para cada panel
print('Colección de imágenes anuales', snow_yearly);
var images = {
  '2016'       : styleImg(ee.Image('users/observatorionieves/Sentinel/Snow_Yearly/Sentinel_Snow_Yearly_2016')),
  '2017'       : styleImg(ee.Image('users/observatorionieves/Sentinel/Snow_Yearly/Sentinel_Snow_Yearly_2017')),
  '2018'       : styleImg(ee.Image('users/observatorionieves/Sentinel/Snow_Yearly/Sentinel_Snow_Yearly_2018')),
  '2019'       : styleImg(ee.Image('users/observatorionieves/Sentinel/Snow_Yearly/Sentinel_Snow_Yearly_2019')),
  '2020'       : styleImg(ee.Image('users/observatorionieves/Sentinel/Snow_Yearly/Sentinel_Snow_Yearly_2020')),
};
var sentinel = ee.Image('users/observatorionieves/Sentinel/Snow_Yearly/2016');
//------------------------------------------------------------------------------------------------------------------------------------------
///////////////////////////////////////////////// Split panel //////////////////////////////////////////////////////////////////////////////
//------------------------------------------------------------------------------------------------------------------------------------------
// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.setControlVisibility(false);
leftMap.setOptions('Satellite');
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
//leftMap.addLayer(enero.sldStyle(nsdi_intervals));
leftMap.addLayer(outline);
leftMap.addLayer(outline2);
leftMap.addLayer(streamflow); 
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
var rightSelector = addLayerSelector(rightMap, 1, 'top-right');
rightMap.setOptions('Satellite');
//rightMap.addLayer(enero.sldStyle(nsdi_intervals));
rightMap.addLayer(outline);
rightMap.addLayer(outline2);
rightMap.addLayer(streamflow);
//---------------------------------------------------------------------------------------------------------------------------------------------------------
///////////////////////////////////////////  Selector de imágenes /////////////////////////////////////////////////////////////////////////////////////
//----------------------------------------------------------------------------------------------------------------------------------------------------------
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Seleccione un año');
//var label2 = ui.Checkbox('Terra (MOD10A1)').setValue(false); //false = unchecked
 // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection]));
  }
var select = ui.Select({
  items: Object.keys(images),
  onChange: updateMap});
  select.setValue(Object.keys(images)[defaultValue], true);
var controlPanel =
      ui.Panel({widgets: [label, select], style: {position: position}});
//  mapToChange.add(controlPanel);
//Map.add(controlPanel);
  mapToChange.add(controlPanel); //Sin interacción
//controlPanel.clear();
}
// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
leftMap.setCenter(-70.8484, -32.839, 9);
rightMap.setCenter(-70.8484, -32.839, 9);
//-----------------------------------------------------------------------------------------------------------------------------------------------------------
///////////////////////////////////////////Gráficos//////////////////////////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------------------------------------------------------------------------------
// Serie de tiempo mensual /Timelapses 2000-2020 
var chartbyMonth = 
  ui.Chart.image.series({
    imageCollection: snow_yearly,
    region: subsubcuencas_ms,
    reducer: ee.Reducer.mean(),
    scale: 500,
    xProperty:'year'
  }).setSeriesNames(["NDSI Sentinel-2"])
    .setOptions({
    title: 'Promedio anual NDSI sobre las subcuencas media y alta del Rio Aconcagua, usando Sentinel-2, 2016-2020',
    vAxis: {title:'Promedio (%)'},
    hAxis: {title:'Años',format:0},
    curveType: 'function',
}); 
//------------------------------------------------------------------------------------------------------------------------------------------
///////////////////////////////////////////UI Gráficos/////////////////////////////////////////////////////////////////////////////////////
//------------------------------------------------------------------------------------------------------------------------------------------
var panelMonth = ui.Panel();
panelMonth.style().set({
  width: '400px',
  position: 'middle-right'
});
Map.add(panelMonth);
panelMonth.clear();
//---------------------------------------------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////////////////////Widget Panel/////////////////////////////////////////////////////////////////////////////////////
//---------------------------------------------------------------------------------------------------------------------------------------------------------
//Spacer object//
var spacer = ui.Label('           ');
// Create UI Panels
var panel = ui.Panel({style: {width:'25.0%'}});
ui.root.insert(0,panel);
// Introduction 
var intro = ui.Label('Observatorio Satelital de Nieves', 
  {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
);
var subtitle = ui.Label('A partir de imágenes satelitales del producto Sentinel-2'+
  ' se establece una comparación interanual entre los distintos años sobre la cuenca del Río Aconcagua'+
  ' mediante un panel divisorio. La información es recopilada a partir de los valores del promedio anual del Indice Normalizado de Nieve (NDSI). '+
  ' Esta interfaz de usuario le permite seleccionar los años de interés a analizar, desplegando el panel divisorio donde se visualizará el resultado dentro del mapa.', {});
// Define link para thumbnail
var link = ui.Label('Observatorio Satelital de Nieve', {},'http://observatorionieves.cl/');
// Logo observatorio  
var logo_observatorio = ui.Thumbnail({image:logo_Observatorio,params:{dimensions: '250x114', bands:['b1','b2','b3'],min:0,max:255}, style:{width:'250px',height:'114px',padding :'0'}});
// Logo Teleamb 
var logo_teleamb = ui.Thumbnail({image:logo_Teleamb,params:{dimensions: '300x93', bands:['b1','b2','b3'],min:0,max:255}, style:{width:'300px',height:'93px',padding :'0'}});
panel.add(logo_observatorio);
panel.add(link);
panel.add(intro);
panel.add(subtitle);
panel.add(Leyenda);
panel.add(chartbyMonth);
panel.add(logo_teleamb);