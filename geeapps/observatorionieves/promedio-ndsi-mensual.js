var aconcagua_cuenca = ui.import && ui.import("aconcagua_cuenca", "table", {
      "id": "users/observatorionieves/DGA/aconcagua_cuenca"
    }) || ee.FeatureCollection("users/observatorionieves/DGA/aconcagua_cuenca"),
    subsubcuencas_ms = ui.import && ui.import("subsubcuencas_ms", "table", {
      "id": "users/observatorionieves/DGA/aconcagua_subsubcuencas_ms"
    }) || ee.FeatureCollection("users/observatorionieves/DGA/aconcagua_subsubcuencas_ms"),
    MOD10A1_monthly = ui.import && ui.import("MOD10A1_monthly", "imageCollection", {
      "id": "users/observatorionieves/MODIS/MOD10A1_Snow_Monthly"
    }) || ee.ImageCollection("users/observatorionieves/MODIS/MOD10A1_Snow_Monthly"),
    MYD10A1_monthly = ui.import && ui.import("MYD10A1_monthly", "imageCollection", {
      "id": "users/observatorionieves/MODIS/MYD10A1_Snow_Monthly"
    }) || ee.ImageCollection("users/observatorionieves/MODIS/MYD10A1_Snow_Monthly"),
    logo_Teleamb = ui.import && ui.import("logo_Teleamb", "image", {
      "id": "users/observatorionieves/Logos/Logo_TeleAmb"
    }) || ee.Image("users/observatorionieves/Logos/Logo_TeleAmb"),
    logo_Observatorio = ui.import && ui.import("logo_Observatorio", "image", {
      "id": "users/observatorionieves/Logos/Logo_Observatorio"
    }) || ee.Image("users/observatorionieves/Logos/Logo_Observatorio");
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Este código genera una comparación estacional 
// Con el promedio mensual del Índice Normalizado de Nieve
// A través de un Split Panel
// Producto MOD10A1 y MYD10A1 colección 6 de MODIS
// Autor Yael Aguirre & Freddy Saavedra
// Actualizado 16/06/21
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
// Demonstrates before/after imagery comparison with a variety of dates.
// Configura los parámetros de visualización 
var colorizedVis = {
  bands: ['NDSI_Snow_Cover'],
  min: 0.0,
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
      '<ColorMapEntry color="#225ea8" quantity="80" label="70-80" />' +
      '<ColorMapEntry color="#253494" quantity="90" label="80-90" />' +
      '<ColorMapEntry color="#081d58" quantity="100" label="90-100" />' +
    '</ColorMap>' +
  '</RasterSymbolizer>';
function styleImg(img){
  return ee.Image(img
    .visualize(colorizedVis)
    .copyProperties(img, img.propertyNames()))
    .clip(aconcagua_cuenca);
}
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
var Terra = MOD10A1_monthly.select(['NDSI_Snow_Cover'],['NDSI_Terra']);
var Aqua = MYD10A1_monthly.select(['NDSI_Snow_Cover'],['NDSI_Aqua']);
//Define rango de años a trabajar
var months = ee.List.sequence(1, 12);
// Imagenes MODIS promedio mensual TERRA
var eneroT      = ee.Image('users/observatorionieves/MODIS/MOD10A1_Snow_Monthly/01');
var febreroT    = ee.Image('users/observatorionieves/MODIS/MOD10A1_Snow_Monthly/02');
var marzoT      = ee.Image('users/observatorionieves/MODIS/MOD10A1_Snow_Monthly/03');
var abrilT      = ee.Image('users/observatorionieves/MODIS/MOD10A1_Snow_Monthly/04');
var mayoT       = ee.Image('users/observatorionieves/MODIS/MOD10A1_Snow_Monthly/05');
var junioT      = ee.Image('users/observatorionieves/MODIS/MOD10A1_Snow_Monthly/06');
var julioT      = ee.Image('users/observatorionieves/MODIS/MOD10A1_Snow_Monthly/07');
var agostoT     = ee.Image('users/observatorionieves/MODIS/MOD10A1_Snow_Monthly/08');
var septiembreT = ee.Image('users/observatorionieves/MODIS/MOD10A1_Snow_Monthly/09');
var octubreT    = ee.Image('users/observatorionieves/MODIS/MOD10A1_Snow_Monthly/10');
var noviembreT  = ee.Image('users/observatorionieves/MODIS/MOD10A1_Snow_Monthly/11');
var diciembreT  = ee.Image('users/observatorionieves/MODIS/MOD10A1_Snow_Monthly/12');
// AQUA
var eneroA      = ee.Image('users/observatorionieves/MODIS/MYD10A1_Snow_Monthly/01');
var febreroA    = ee.Image('users/observatorionieves/MODIS/MYD10A1_Snow_Monthly/02');
var marzoA      = ee.Image('users/observatorionieves/MODIS/MYD10A1_Snow_Monthly/03');
var abrilA      = ee.Image('users/observatorionieves/MODIS/MYD10A1_Snow_Monthly/04');
var mayoA       = ee.Image('users/observatorionieves/MODIS/MYD10A1_Snow_Monthly/05');
var junioA      = ee.Image('users/observatorionieves/MODIS/MYD10A1_Snow_Monthly/06');
var julioA      = ee.Image('users/observatorionieves/MODIS/MYD10A1_Snow_Monthly/07');
var agostoA     = ee.Image('users/observatorionieves/MODIS/MYD10A1_Snow_Monthly/08');
var septiembreA = ee.Image('users/observatorionieves/MODIS/MYD10A1_Snow_Monthly/09');
var octubreA    = ee.Image('users/observatorionieves/MODIS/MYD10A1_Snow_Monthly/10');
var noviembreA  = ee.Image('users/observatorionieves/MODIS/MYD10A1_Snow_Monthly/11');
var diciembreA  = ee.Image('users/observatorionieves/MODIS/MYD10A1_Snow_Monthly/12');
var outImage = eneroT;
//////////////////////////////////////////////////////////////////////////////////////////////
// Define an inner join.
var innerJoin = ee.Join.inner();
// Specify an equals filter for image timestamps.
var filterTimeEq = ee.Filter.equals({
  leftField: 'month',
  rightField: 'month'
});
// Apply the join.
var innerJoinedMODIS = innerJoin.apply(Terra, Aqua, filterTimeEq);
// Map a function to merge the results in the output FeatureCollection.
var joinedTA = ee.ImageCollection(innerJoinedMODIS.map(function(feature) {
  return ee.Image.cat(feature.get('primary'), feature.get('secondary'));
}));
//-----------------------------------------------------------------------------------------------------------------------------------------------------------
///////////////////////////////////////////Gráficos//////////////////////////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------------------------------------------------------------------------------
// Serie de tiempo mensual /Timelapses 2000-2020 
var chartbyMonth = 
  ui.Chart.image.series({
    imageCollection: joinedTA,
    region: subsubcuencas_ms,
    reducer: ee.Reducer.mean(),
    scale: 500,
    xProperty:'month'
  }).setOptions({
    title: 'Promedio mensual NDSI sobre las subcuencas media y alta del Rio Aconcagua, usando MOD10A1 (Terra) y MYD10A1 (Aqua). 2000-2021',
    curveType: 'function',
    vAxis: {title:'Promedio (%)'},
    hAxis: {title:'Meses'}, 
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
//panelMonth.add(chartbyMonth);
//Map.add(chartbyMonth);
//------------------------------------------------------------------------------------------------------------------------------------------
///////////////////////////////////////////////// Split panel //////////////////////////////////////////////////////////////////////////////
//------------------------------------------------------------------------------------------------------------------------------------------
// Create the left map
var leftMap = ui.Map();
leftMap.setControlVisibility(false);
leftMap.setOptions('Satellite');
leftMap.addLayer(outImage.clip(aconcagua_cuenca).sldStyle(nsdi_intervals));
leftMap.addLayer(outline);
leftMap.addLayer(outline2);
leftMap.addLayer(streamflow);
// Create the right map
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
rightMap.setOptions('Satellite');
rightMap.addLayer(outImage.clip(aconcagua_cuenca).sldStyle(nsdi_intervals));
rightMap.addLayer(outline);
rightMap.addLayer(outline2);
rightMap.addLayer(streamflow);
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
//------------------------------------------------------------------------------------------------------------------------------------------
///////////////////////////////////////////////// Image selectors /////////////////////////////////////////////////////////////////////////
//------------------------------------------------------------------------------------------------------------------------------------------
var month = 1;
var product = 1;
var months = {
  Enero       : [1,'Enero'],
  Febrero     : [2,'Febrero'],
  Marzo       : [3,'Marzo'],
  Abril       : [4,'Abril'],
  Mayo        : [5,'Mayo'],
  Junio       : [6,'Junio'],
  Julio       : [7,'Julio'],
  Agosto      : [8,'Agosto'],
  Septiembre  : [9,'Septiembre'],
  Octubre     : [10,'Octubre'],
  Noviembre   : [11,'Noviembre'],
  Diciembre   : [12,'Diciembre'],
};
var products = {
  Terra       : [1,'Terra: MOD10A1'],
  Aqua        : [2,'Aqua: MYD10A1'],
};
var addLayerRight = function(month,product) {
  ////rightMap.remove(outImage);
    if (month == 1) {
        if(product == 1){
          var outImage = eneroT;
        }else {
          var outImage = eneroA;
        }
    } else if (month == 2) {
        if(product == 1){
          var outImage = febreroT;
        }else {
          var outImage = febreroA;
        }
    } else if (month == 3) {
        if(product == 1){
          var outImage = marzoT;
        }else {
          var outImage = marzoA;
        }
    } else if (month == 4) {
        if(product == 1){
          var outImage = abrilT;
        }else {
          var outImage = abrilA;
        }
    } else if (month == 5) {
        if(product == 1){
          var outImage = mayoT;
        }else {
          var outImage = mayoA;
        }
    } else if (month == 6) {
        if(product == 1){
          var outImage = junioT;
        }else {
          var outImage = junioA;
        }
    } else if (month == 7) {
        if(product == 1){
          var outImage = julioT;
        }else {
          var outImage = julioA;
        }
    } else if (month == 8) {
        if(product == 1){
          var outImage = agostoT;
        }else {
          var outImage = agostoA;
        }
    } else if (month == 9) {
        if(product == 1){
          var outImage = septiembreT;
        }else {
          var outImage = septiembreA;
        }  
    } else if (month == 10) {
        if(product == 1){
          var outImage = octubreT;
        }else {
          var outImage = octubreA;
        }
    } else if (month == 11) {
        if(product == 1){
          var outImage = noviembreT;
        }else {
          var outImage = noviembreA;
        }
    } else {
        if(product == 1){
          var outImage = diciembreT;
        }else {
          var outImage = diciembreA;
        }
    }
  rightMap.addLayer(outImage.clip(aconcagua_cuenca).sldStyle(nsdi_intervals));
  rightMap.addLayer(outline);
  rightMap.addLayer(outline2);
  rightMap.addLayer(streamflow);
};
var selectMonthRight = ui.Select({
  items: Object.keys(months),
    value: 'Enero',
    onChange: function(key) {
      month = months[key][0];
      addLayerRight(month,product);
  }
});
var selectProductRight = ui.Select({
  items: Object.keys(products),
    value: 'Terra',
    onChange: function(key) {
      product = products[key][0];
      addLayerRight(month,product);
  }
});
var inspectorRightLabel = ui.Label('Seleccione satélite y mes');
var inspectorRight = ui.Panel({
  widgets: [inspectorRightLabel,selectProductRight, selectMonthRight],
  style: {position: 'top-right'}
});
var addLayerLeft = function(month,product) {
  ////leftMap.remove(outImage);
    if (month == 1) {
        if(product == 1){
          var outImage = eneroT;
        }else {
          var outImage = eneroA;
        }
    } else if (month == 2) {
        if(product == 1){
          var outImage = febreroT;
        }else {
          var outImage = febreroA;
        }
    } else if (month == 3) {
        if(product == 1){
          var outImage = marzoT;
        }else {
          var outImage = marzoA;
        }
    } else if (month == 4) {
        if(product == 1){
          var outImage = abrilT;
        }else {
          var outImage = abrilA;
        }
    } else if (month == 5) {
        if(product == 1){
          var outImage = mayoT;
        }else {
          var outImage = mayoA;
        }
    } else if (month == 6) {
        if(product == 1){
          var outImage = junioT;
        }else {
          var outImage = junioA;
        }
    } else if (month == 7) {
        if(product == 1){
          var outImage = julioT;
        }else {
          var outImage = julioA;
        }
    } else if (month == 8) {
        if(product == 1){
          var outImage = agostoT;
        }else {
          var outImage = agostoA;
        }
    } else if (month == 9) {
        if(product == 1){
          var outImage = septiembreT;
        }else {
          var outImage = septiembreA;
        }  
    } else if (month == 10) {
        if(product == 1){
          var outImage = octubreT;
        }else {
          var outImage = octubreA;
        }
    } else if (month == 11) {
        if(product == 1){
          var outImage = noviembreT;
        }else {
          var outImage = noviembreA;
        }
    } else {
        if(product == 1){
          var outImage = diciembreT;
        }else {
          var outImage = diciembreA;
        }
    }
  leftMap.addLayer(outImage.clip(aconcagua_cuenca).sldStyle(nsdi_intervals));
  leftMap.addLayer(outline);
  leftMap.addLayer(outline2);
  leftMap.addLayer(streamflow);
};
var selectMonthLeft = ui.Select({
  items: Object.keys(months),
    value: 'Enero',
    onChange: function(key) {
      month = months[key][0];
      addLayerLeft(month,product);
  }
});
var selectProductLeft = ui.Select({
  items: Object.keys(products),
    value: 'Terra',
    onChange: function(key) {
      product = products[key][0];
      addLayerLeft(month,product);
  }
});
var inspectorLeftLabel = ui.Label('Seleccione satélite y mes');
var inspectorLeft = ui.Panel({
  widgets: [inspectorLeftLabel, selectProductLeft, selectMonthLeft],
  style: {position: 'top-left'}
});
leftMap.add(inspectorLeft);
rightMap.add(inspectorRight);
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
var subtitle = ui.Label('En base a imágenes satelitales diarias de los producto de nieves MOD10A1 (Terra) y MYD10A1 (Aqua) obtenidas del sensor MODIS,'+
  ' se establece una comparación estacional entre los distintos meses del año sobre la cuenca del Río Aconcagua'+
  ' mediante un panel divisorio. La información es recopilada a partir de los valores del promedio mensual del Indice Normalizado de Nieve (NDSI). '+
  ' Esta interfaz de usuario le permite seleccionar los meses de interés a analizar, desplegando el panel divisorio donde se visualizará el resultado dentro del mapa.', {});
// Define link para thumbnail
var link = ui.Label('Observatorio Satelital de Nieves', {},'http://observatorionieves.cl/');
// Logo Observatorio 
var logo_observatorio = ui.Thumbnail({image:logo_Observatorio,params:{dimensions: '250x114', bands:['b1','b2','b3'],min:0,max:255}, style:{width:'250px',height:'114px',padding :'0'}});
// Logo TeleAmb
var logo_teleamb = ui.Thumbnail({image:logo_Teleamb,params:{dimensions: '300x93', bands:['b1','b2','b3'],min:0,max:255}, style:{width:'300px',height:'93px',padding :'0'}});
panel.add(logo_observatorio);
panel.add(link);
panel.add(intro);
panel.add(subtitle);
panel.add(Leyenda);
panel.add(chartbyMonth);
panel.add(logo_teleamb);