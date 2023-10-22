var sentinel = ee.ImageCollection("COPERNICUS/S2"),
    dpto = ee.FeatureCollection("users/vportillososa/py_departamentos"),
    true_Color = {"opacity":1,"bands":["B4","B3","B2"],"min":162.4,"max":937.6,"gamma":2.5200000000002},
    NDVI_COLOR = {"opacity":1,"bands":["ndvi_s1"],"palette":["ff3818","ffa02b","35ff27","31681a"]};
////////////////////////////
////// DISEÑO DE CONFIGURACIONES ///////
////////////////////////////
// Fuesntes y Colores //
var colors = {'transparent': '#11ffee00', 'gray': '#F8F9FA'};
var ESTILO_TITULO = {
  fontWeight: '1000',
  fontSize: '20px',
  padding: '2px',
  color: 'red',
  backgroundColor: colors.transparent,
};
var ESTILO_SUBTITULO = {
  fontWeight: '500',
  fontSize: '16px',
  padding: '5px',
  color: 'blue',
  textAlign: 'center',
  //maxWidth: '450px',
  backgroundColor: colors.transparent,
};
var ESTILO_PARRAFO = {
  fontSize: '12px',
  fontWeight: '50',
  color: '#616161',
  padding: '8px',
  maxWidth: '500px',
  backgroundColor: colors.transparent,
};
var ESTILO_BOTON = {
  fontSize: '14px',
  fontWeight: '100',
  color: '#616161',
  padding: '8px',
  backgroundColor: colors.transparent,
};
var ESTILO_SELECTOR = {
  fontSize: '14px',
  fontWeight: '50',
  color: '#616161',
  padding: '2px',
  backgroundColor: colors.transparent,
  width: '80px'
};
var ESTILO_ETIQUETA = {
  fontWeight: '50',
  textAlign: 'center',
  fontSize: '14px',
  padding: '2px',
  backgroundColor: colors.transparent,
};
// Base map styles can help emphasize the data you are trying to display
// I'm not walking through that here, but if you'd like to set up 
// a different base map, go here:
// https://developers.google.com/maps/documentation/javascript/styling 
// You would add it to the map by copying in the style code and adding it to
// the style section of your Map panel.
// A new tab with your style name will show up next to "map" and "satellite" 
////////////////////////
////// ROOT PANEL //////
////////////////////////
// I'm going to demonstrate a "split panel" approach
// This means that we need to make both a "map" panel
// and a side panel - if we did not use "split panel"
// then we can just make a side panel 
// and add things to the map that already exists in the root.
// I think the side panel is nice for exploring around more
// and if you're going to include a graph on the panel.
// I found it to be unusable on mobile since it is not automatically
// responsive and the drag/move response on EE isn't great yet.
// Check out Scripts/User Interface/Mobile UI for good Mobile UI!
// You will need to make panels to hold all of the 
// other "widgets" you are adding (aka drop down menus, text, graphs, etc.)
// I tend to use panels as an organization tactic.
// These are our two  master panels - the side panel & map panel
var infoPanel = ui.Panel({
    layout: ui.Panel.Layout.flow(), 
    style: {
      stretch: 'horizontal',
      height: '100%',
      width: '450px',
      backgroundColor: colors.gray
    }
});
var mappingPanel = ui.Map({
    center: {'lat': -26.5, 'lon': -57, 'zoom': 7.5}
    // style: (if you'd like to add a map style, do so here!)
  });
ui.root.clear() // This is important to do to remove the "normal" GEE map
ui.root.add(ui.SplitPanel(mappingPanel, infoPanel)); // order matters!
//ui.root.add() is where you are adding panels to the EE window 
// Within our info panel, we will have a "Season" panel, where we select
// which seasons to view, a "Vis" panel, and a "Graph" panel. We could technically
// just add all widgets straight to the info panel - and this would be fine -- but 
// this way we can make things look the way we want them to and contain things better
var seasonPanel = ui.Panel({layout: ui.Panel.Layout.flow('horizontal'), 
                            style: {backgroundColor: colors.transparent}});
var indicePanel = ui.Panel({layout: ui.Panel.Layout.flow('horizontal'), 
                            style: {backgroundColor: colors.transparent}});
var indiceFecha = ui.Panel({layout: ui.Panel.Layout.flow('horizontal'), 
                            style: {backgroundColor: colors.transparent}});
var visPanel = ui.Panel({style: {backgroundColor: colors.transparent}}); 
var graphPanel = ui.Panel({style: {backgroundColor: colors.transparent}});
// Since we are going to store the season/vis/graph panel within the infoPanel,
// we do not need to add it to the root. 
///////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////
/////// INFO PANEL /////////
////////////////////////////
// To add text, you would add them as individual "ui.Label"
infoPanel.add(ui.Label('PROGRAMA DE INVERSTIGACION Y EXTENSION UNIVERSITARIA - FCA', ESTILO_TITULO));
var app_description = 'Programa de Investigacion y Extension Universitaria "Monitoreo de los humedales del Ñeembucú aplicando sensoramiento remoto y computación en la nube, de la Facultad de Ciencias Aplicadas". ' + 
'Que tiene como objetivo: Utilizar el conjunto de datos aportados por los sensores satelitales para el monitoreo de los humedales del Ñeembucú como herramientas fundamentales'+
'para la toma de decisiones ';
infoPanel.add(ui.Label(app_description, ESTILO_PARRAFO));
////////////////////////////
/////// PANEL DE SELECCION LOCALIDAD ///////
////////////////////////////
// Creamos el Panel de Seleccion de Localidad!
infoPanel.add(seasonPanel);
infoPanel.insert(2, ui.Label('SELECCIONE LA TEMPORALIDAD', ESTILO_SUBTITULO))
var year_list = [
    {label: '2015', value: 2015},
    {label: '2016', value: 2016},
    {label: '2017', value: 2017},
    {label: '2018', value: 2018},
    {label: '2019', value: 2019},
    {label: '2020', value: 2020},
    {label: '2021', value: 2021}
  ];
var month_list = [
    {label: 'Enero (1)', value: 1},
    {label: 'Febrero (2)', value: 2},
    {label: 'Marzo (3)',value: 3},
    {label: 'Abril (4)',value:  4},
    {label: 'Mayo (5)',value:  5},
    {label: 'Junio (6)',value:  6},
    {label: 'Julio (7)',value:  7},
    {label: 'Agosto (8)',value:  8},
    {label: 'Setiembre (9)',value: 9},
    {label: 'Octubre (10)',value: 10},
    {label: 'Noviembre (11)',value: 11},
    {label: 'Deciembre (12)',value: 12}
  ];
var epoca_name = ui.Label('Rango de Tiempo:', ESTILO_ETIQUETA)
var U_epoca_1_start = ui.Select({items: month_list, placeholder: 'Select a month', value: 1, style: ESTILO_SELECTOR})
var U_epoca_1_end = ui.Select({items: month_list, placeholder: 'Select a month', value: 3, style: ESTILO_SELECTOR})
// For more effective organization, I'm making each season have a panel, and then
// lining these up in the seasonPanel in a horizontal flow. 
var epoca_1 = ui.Panel({style: {backgroundColor: colors.transparent}})
epoca_1.add(epoca_name).add(U_epoca_1_start).add(U_epoca_1_end)
seasonPanel.add(epoca_1)
/// Seleccionamos el año! ///
infoPanel.insert(4, ui.Label('Seleccione el Año:', ESTILO_ETIQUETA))
// TODOS LOS VALORES QUE EL "USUARIO" CARGUE TIENE LA "U" COMO PREFIJO
var U_year_selector = ui.Select({items: year_list, placeholder: '2021', value: 2021, style: ESTILO_SELECTOR});
infoPanel.insert(5, U_year_selector);
///////////////////////////////////
/////// PANEL DE VISUALIZACION ///////
///////////////////////////////////
// Creamos el visPanel arriba!
infoPanel.add(visPanel)
var visTitle = ui.Label('VISUALIZACION DE LA IMAGEN', ESTILO_SUBTITULO)
var visText = ui.Label('Elija la composicion de color a visualizar:', ESTILO_ETIQUETA)
// Que opcion proveemos para la opcion ventana drop-downs?
var seasons = [
  {label: 'Epoca', value: 'ndvi_s1'}, // "ndvi_s1" is the value here because that's the "band name" we will call
  ]
//FALTA DEFINIR PARA CANAL DE COLOR LAS BANDAS INCLUSIVE PARA EL NDVI ESALA DE GRISES
//Each Color's Panel
//var redPanel = ui.Panel({style: {backgroundColor: colors.transparent}})
//var red_band_label = ui.Label('Red', LABEL_STYLE)
//var U_red_band = ui.Select({items: seasons, style: SELECT_STYLE, placeholder: 'Season 1', value: 'ndvi_s1'})
//redPanel.add(red_band_label).add(U_red_band)
//var greenPanel = ui.Panel({style: {backgroundColor: colors.transparent}})
//var green_band_label = ui.Label('Green', LABEL_STYLE)
//var U_green_band = ui.Select({items: seasons, style: SELECT_STYLE, placeholder: 'Season 2', value: 'ndvi_s2'})
//greenPanel.add(green_band_label).add(U_green_band)
//var bluePanel = ui.Panel({style: {backgroundColor: colors.transparent}})
//var blue_band_label = ui.Label('Blue', LABEL_STYLE)
//var U_blue_band = ui.Select({items: seasons, style: SELECT_STYLE, placeholder: 'Season 3', value: 'ndvi_s3'})
//bluePanel.add(blue_band_label).add(U_blue_band)
var grayPanel = ui.Panel({style: {backgroundColor: colors.transparent}})
var gray_band_label = ui.Label('Escala de Grises', ESTILO_ETIQUETA)
var U_gray_band = ui.Select({items: seasons, style: ESTILO_SELECTOR, placeholder: 'Season 1', value: 'ndvi_s1'})
grayPanel.add(gray_band_label)//.add(U_gray_band)
var colorPanel = ui.Panel({style: {backgroundColor: colors.transparent}})
var color_band_label = ui.Label('Composicion Color RGB "Color Natural..."', ESTILO_ETIQUETA)
var U_color_band = ui.Select({items: seasons, style: ESTILO_SELECTOR, placeholder: 'Season 1', value: 'ndvi_s1'})
colorPanel.add(color_band_label)//.add(U_color_band)
// Panel de composicion de las imagenes
var RGBPanel = ui.Panel({layout: ui.Panel.Layout.flow('horizontal'), style: {backgroundColor: colors.transparent}})
var GrayPanel = ui.Panel({layout: ui.Panel.Layout.flow('horizontal'), style: {backgroundColor: colors.transparent}})
RGBPanel.add(colorPanel)//.add(greenPanel).add(bluePanel)
GrayPanel.add(grayPanel)
// Panel para alojar la opcion de color
var visColors = ui.Panel({layout: ui.Panel.Layout.flow('horizontal'), style: {backgroundColor: colors.transparent, padding: '4px'}})
// Linea que activa el panel RGB por defecto
visColors.add(RGBPanel)
// Opcion para que el Usuario seleccione RGB o Ndvi
var U_Vis_Selector = ui.Select({
  items: [
    {label: 'RGB', value: 1},
    {label: 'Ndvi', value: 2},
  ],
  placeholder: 'RGB',
  value: 1, 
  style: ESTILO_SELECTOR
})
U_Vis_Selector.onChange(function(x) {
  if (x == 1) {
    visColors.clear()
    visColors.add(RGBPanel)
  }
  else {
    visColors.clear()
    visColors.add(GrayPanel)
  }
})
// Panel Visible completado! 
visPanel.add(visTitle).add(visText).add(U_Vis_Selector).add(visColors)
/////////////////////////////////////
/////// CONSTRUCCION DEL PANEL COMPOSICION ///////
/////////////////////////////////////
// Ahora necesitamos proveer el codigo con la informacion para la construccion de la composicion   
// a color de todos las opciones que hemos creado
// Hacemos el panel para alojar los botones (para el proposito del diseño)
var buttonHold = ui.Panel({layout: ui.Panel.Layout.flow('horizontal'), style: {backgroundColor: colors.transparent, textAlign: 'center', stretch: 'both', padding: '4px'}})
infoPanel.add(buttonHold)
// Agregamos los botones de Ejecutar y Reset
var runButton = ui.Button({label: 'Mostrar Composicion', style: {width: '125px', maxWidth: '250px', color: '#616161'}});
var clearButton = ui.Button({label: 'Borrar Composicion', style: {width: '125px', maxWidth: '250px', color: '#616161'}});
buttonHold.add(runButton).add(clearButton);
/////////////////////////////////////////////////////////
// Agreagamos la funcion onMapClick: para agregar la Opcion Punto de interes al Mapa //
/////////////////////////////////////////////////////////
mappingPanel.add(ui.Label('Click en el Mapa para el punto de Interes, y crear la Imagen.'))
mappingPanel.style().set('cursor', 'crosshair')
mappingPanel.onClick(function(coords) {
  var point = ee.Geometry.Point(coords.lon, coords.lat)
  var point_layer = ui.Map.Layer(point, {}, 'Punto Interes')
  mappingPanel.setCenter(coords.lon, coords.lat)
  var layers = mappingPanel.layers()
  var names = []
  layers.forEach(function(x) {
    var lay_name = x.getName()
    names.push(lay_name)
  })
  var index = names.indexOf('POI')
  if (index > -1) {
    var layer_POI = layers.get(index)
    mappingPanel.remove(layer_POI)
    mappingPanel.add(point_layer)
  }
  else {
    mappingPanel.add(point_layer)
  }
});
// Funciones para el procesamiento de las imagenes con LANDSAT 8
function addNDVI(img) {
  var ndvi = img.normalizedDifference(['B5', 'B4']).rename(['ndvi']); 
  var img_ndvi = img.addBands(ndvi); 
  return img_ndvi
}
function cloudMask(img){ 
  var cloudShadowBitMask = (1 << 3); 
  var cloudsBitMask = (1 << 5);
  var qa = img.select('pixel_qa'); 
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0) 
                .and(qa.bitwiseAnd(cloudsBitMask).eq(0))
  return img.updateMask(mask)
}
var landsat8_SR = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
//////////////////////////////////////////
// Agreagamos el boton Limpiar con la funcion onClick //
//////////////////////////////////////////
var clearMap = clearButton.onClick(function() {
  var layers = mappingPanel.layers()
  layers.forEach(function(x) {
    mappingPanel.remove(x) 
  })
});
////////////////////////////////////////////////////////////
// Agregamos el boton Ejecutar con la funcion: Construir la composicion //
////////////////////////////////////////////////////////////
var buildComposite = runButton.onClick(function() {
  var center = mappingPanel.getCenter()
  var L8_Region = landsat8_SR.filterBounds(center)
  var s1s = U_epoca_1_start.getValue()
  //var s2s = U_season_2_start.getValue()
  //var s3s = U_season_3_start.getValue()
  var s1e = U_epoca_1_end.getValue()
  //var s2e = U_season_2_end.getValue()
  //var s3e = U_season_3_end.getValue()
  var year = U_year_selector.getValue()
  //var red_band = U_red_band.getValue()
  //var green_band = U_green_band.getValue()
  //var blue_band = U_blue_band.getValue()
  var gray_band = U_gray_band.getValue()
  var vis_value = U_Vis_Selector.getValue()
  var L8_year = L8_Region.filter(ee.Filter.calendarRange({start: year, field: 'year'}))
  //var visParams = {bands: ['B4', 'B3', 'B2'], max: 0.3};
//Map.addLayer(scene, visParams, 'true-color composite');
  var L8_processed = L8_year.map(addNDVI).map(cloudMask)
  var epoca_1 = L8_processed.filter(ee.Filter.calendarRange(s1s, s1e, 'month')).median().select('B4', 'B3', 'B2');//.rename('ndvi_s1');
  var epoca_2 = L8_processed.filter(ee.Filter.calendarRange(s1s, s1e, 'month')).median().select('ndvi').rename('ndvi_s1');
  //var season_3 = L8_processed.filter(ee.Filter.calendarRange(s3s, s3e, 'month')).median().select('ndvi').rename('ndvi_s3');
  var composite = ee.Image.cat([epoca_1],[epoca_2]);
  if (vis_value == 1) {
    var comp = ui.Map.Layer(composite, true_Color, 'RGB Color Natural')
    mappingPanel.add(comp)
  }
  else {
    var comp1 = ui.Map.Layer(composite, NDVI_COLOR, 'Ndvi')//, 'RGB de NDVI')//, {bands: [gray_band], min: minSlider.getValue(), max: maxSlider.getValue()}, gray_band)
    mappingPanel.add(comp1)
  }
});
/*
//////////////////////////////////
/////// PANEL DE SELECCION DE INDICES ///////
///////////////////////////////////
// Creamos el Paneles de la coleccion de Configuracion de Color o NDVI!
infoPanel.add(visPanel)
infoPanel.add(indicePanel);
infoPanel.insert(4, ui.Label('SELECCIONE EL INDICE O COMBINACION DE COLOR', ESTILO_SUBTITULO))
infoPanel.insert(5, ui.Label('Seleccione la combinacion de bandas a mostrar, o seleccione los indices espectrales:', ESTILO_ETIQUETA))
//var visTitle = ui.Label('SELECCIONE EL INDICE O COMBINACION DE COLOR', ESTILO_SUBTITULO)
//var visText = ui.Label('Seleccione la combinacion de bandas a mostrar, o seleccione los indices espectrales:', ESTILO_ETIQUETA)
/// Seleccionamos la coleccion de Configuracion de Color o NDVI///
// Dando la opcion de elegir entre RGB o otros Indices
var indices = {
    Color_Verdadero : 'Color Verdadero',
    NDVI : 'ndvi',
    NDBI : 'ndbi',
    NDWI : 'ndwi',
}
 var indices = ui.Select ({
    placeholder : 'Seleccione Indice/Color Verdadero',
    items : Object.keys (indices),
});
visPanel.add(indices);
//var rangePanel = ui.Panel({layout: ui.Panel.Layout.flow('horizontal'), style: {backgroundColor: colors.transparent, padding: '4px'}})
//var U_year_selector = ui.Select({items: year_list, placeholder: '2018', value: 2018, style: SELECT_STYLE});
//infoPanel.insert(5, U_year_selector);
//////////////////////////////////
/////// PANEL DE SELECCION DE FECHAS ///////
///////////////////////////////////
// Creamos el Paneles de la coleccion de Configuracion de Color o NDVI!
//infoPanel.add(visPanel)
infoPanel.add(indiceFecha);
infoPanel.insert(6, ui.Label('SELECCIONE LA FECHA DE IMAGEN A MOSTRAR', ESTILO_SUBTITULO))
infoPanel.insert(7, ui.Label('Se muestran las imagenes con menor cobertura nubosa:', ESTILO_ETIQUETA))
var start = ee.Image (sentinel.first()).date().get('year').format();
var now = Date.now();
var end = ee.Date (now).format ();
//function calculoIndice (a,b){
 // return (a.subtract(b).divide(a.add(b)));
//} 
var RangeDate = ee.DateRange(start,end).evaluate(function(range){
  var dateSlider = ui.DateSlider({
    start : range ['dates'][0],  
    end : range ['dates'][1],
    value : range ['dates'][1],
    period : 15,
    onChange: do_the_task
  });
print (dateSlider.setValue(now));
})
var do_the_task = function(range){
  var roi = localidad [seleclocalidad.getValue()];
  var data = sentinel.filterDate (range.start(),range.end()).filterBounds(roi).filterMetadata('CLOUDY_PIXEL_PERCENTAGE','less_than',10).mean();
  var datac = data.clip (roi);   
  var RED = data.select('B4')
  var NIR = data.select('B8')
  var NDVI = NIR.subtract(RED).divide (NIR.add(RED))
  var NDVIc= NDVI.clip (roi)
switch (indices.getValue()){
    case'Color_Verdadero':
      Map.clear();
      Map.addLayer (datac, true_Color, 'Color_Verdadero' + seleclocalidad.getValue());     
      break;
   case 'NDVI':
      Map.clear ();
      Map.addLayer(NDVIc,Ndvi,"NDVI" + seleclocalidad.getValue());
      break;
  }
};
indiceFecha.add(do_the_task); 
//print (seleclocalidad)
//print (indices)
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////
///////// RGB Explainer ///////////
///////////////////////////////////
var RGB_png = ee.Image('users/ballasia/RGB_black_bg');
var RGB_description = 'La composicion RGB, composicion de color aditivo, el valor mas elevado se presenta en tonos mas claros -- ' +
'el color Blanco representa la composicion de los tres colores en su maxima valores (R, G, & B). In this case, that would mean ' +
'that NDVI is very high for all three seasons. This also applies to combining colors: if Season 1 is Red and ' + 
'Season 2 is blue, then an NDVI that is high in Season 1 & 2 but not Season 3 will show as magenta.'
var RGB_Desc_Panel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal', true), 
  style: {maxWidth: '500px', padding: '8px', backgroundColor: colors.transparent}
  });
var RGB_thumb = ui.Thumbnail({image: RGB_png, style: {width: '150px', padding: '8px', backgroundColor: colors.transparent}})
var RGB_label = ui.Label({value: RGB_description, style: {
  fontSize: '14px',
  fontWeight: '50',
  color: '#616161',
  padding: '8px',
  backgroundColor: colors.transparent,
  stretch: 'horizontal'
}
})
infoPanel.add(RGB_Desc_Panel.add(RGB_label).add(RGB_thumb));
*/