var AOI = ui.import && ui.import("AOI", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -93.05364415636681,
                19.162051316816754
              ],
              [
                -93.05364415636681,
                5.371315636524172
              ],
              [
                -77.38714025011681,
                5.371315636524172
              ],
              [
                -77.38714025011681,
                19.162051316816754
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
    ee.Geometry.Polygon(
        [[[-93.05364415636681, 19.162051316816754],
          [-93.05364415636681, 5.371315636524172],
          [-77.38714025011681, 5.371315636524172],
          [-77.38714025011681, 19.162051316816754]]], null, false),
    Boundaries = ui.import && ui.import("Boundaries", "table", {
      "id": "USDOS/LSIB_SIMPLE/2017"
    }) || ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017");
var studyarea;
var studyarea2;
var studyarea3;
var Header;
var lbl_subtitulo;
var panel_Instruccion_Reset;
var linea1;
var Subheader0;
var Subheader1;
var panelFechas1;
var panelFechas2;
var Subheader2;
var dropdownPanel;
var resultPanel;
var Subheader3;
var Subheader4;
var Subheader5;
var Subheader6;
var Subheader7;
var Subheader8;
var Imagen_Satelital;
var panel_Lista_Imagenes;
var FIRMS_selection;
var GOES_selection;
var Cicatrices_selection;
var Elevation_selection;
var Pendiente_selection;
var panel_Instruccion_Reset;
var admin1Selected;
var admin0Selected;
var admin0Select
var admin1Select
var admin2Select
var admin0Names;
var admin1Names;
//var admin1Value;
// *********************************************************************************************************************************************************
// Definición en el uso del interfaz  **************************************************************************************
// *********************************************************************************************************************************************************
//---------------------------Calcular la fecha de hoy----------------------------//
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    //return [year, month, day].join('-');
    return year + "-" + month + "-" + day;
}
//Fechas
var valorDia =  86400000;
var cantidadDia = 30;
var fechaInicial = Date.now() - valorDia * cantidadDia;
//var Fecha_inicial= "2020-01-28";//ee.Date(fechaInicial,String); 
//var Fecha_final= "2020-01-29";//ee.Date(Date.now(),String);
var Fecha_inicial= formatDate(fechaInicial); 
var Fecha_final= formatDate(Date.now());
var Date1= ee.Date(Fecha_inicial).format("YYYY-MM-dd").getInfo();
var Date2= ee.Date(Fecha_final)  .format("YYYY-MM-dd").getInfo();
//Fecha del código de Luis
//Filtros por fecha
var Date_inicial=  Date1;
var Date_final=    Date2;
//-------------------------------------------------------Configuración de estilos----------------------------------------------------------//
var colors = {'cyan': '#24C1E0', 'transparent': '#11ffee00', 'gray': '#F8F9FA', 'black': '#000000'};
//var noteStyle = {backgroundColor: 'rgba(0, 0, 0, 0.0)', color:'DimGrey', fontSize: '9px', fontWeight: '500', margin: '8px 8px 1px 8px'};
var TITLE_STYLE = {
  fontWeight: 'bold',
  fontSize: '20px',
  textAlign: 'center',
  padding: '8px',
  color: 'MidnightBlue',
  backgroundColor: colors.transparent,
};
var SUBTITLE_STYLE = {
  fontSize: '16px',
  fontWeight: '80',
  color: '#616161',
  padding: '2px',
  backgroundColor: colors.transparent,
};
var PARAGRAPH_STYLE = {
  fontSize: '14px',
  fontWeight: '50',
  color: '#9E9E9E',
  padding: '8px',
  backgroundColor: colors.transparent,
};
var SUBPARAGRAPH_STYLE = {
  fontSize: '13px',
  fontWeight: '50',
  color: '#9E9E9E',
  padding: '2px',
  backgroundColor: colors.transparent,
};
var LABEL_STYLE = {
  fontWeight: '50',
  textAlign: 'center',
  fontSize: '11px',
  backgroundColor: colors.transparent,
};
var THUMBNAIL_WIDTH = 128;
var BORDER_STYLE = '4px solid rgba(97, 97, 97, 0.05)';
//-------------------------------------------------------Panel Principal----------------------------------------------------------//
//Panel 1: Izquierda
var panel = ui.Panel();
panel.style({shown: false, backgroundColor: 'rgba(255, 255, 255, 0.8)', fontSize: '11px', fontWeight: '500'}).set({
  width: '300px',
  position: 'bottom-right',
  //border : '1px solid #000000',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  });
var addToIntro = function() {
//----------------------------------------------------------Etiquetas--------------------------------------------------------------//
 Header = ui.Label('Plataforma de Análisis y Monitoreo de focos de Fuego (DATA-Fuego)',TITLE_STYLE);
 lbl_subtitulo = ui.Label(
  {
    value: 'DATA-Fuego es un prototipo de aplicación diseñada para inspirar a las personas a utilizar mejor los datos satelitales para la detección de focos de incendios forestales.',
    style: {  margin: '10px 5px',fontSize: '12px', textAlign: 'justify' }
  });
 linea1 = ui.Label('__________________________________________________________')
 Subheader0 = ui.Label(
  {value: 'Definición de Parámetros:',
    style: { margin: '10px 5px', textAlign: 'justify', color:'#ffffff', 
    backgroundColor: 'black' , stretch: 'horizontal', fontSize: '15px', padding : '0px 12px'}
  });
 Subheader1 = ui.Label(
  {value: '1.Período de Análisis:',
    style: { textAlign: 'justify', color:'White', stretch: 'horizontal', fontSize: '15px',backgroundColor: 'SlateGrey'}
  });
 Subheader2 = ui.Label(
  {value: '2.Definir área de estudio::',
    style: { textAlign: 'justify', color:'White', stretch: 'horizontal', fontSize: '15px',backgroundColor: 'SlateGrey'}
  })
 Subheader3 = ui.Label(
  {value: '3.Seleccione Un Satélite:',
    style: { textAlign: 'justify', color:'White', stretch: 'horizontal', fontSize: '15px',backgroundColor: 'SlateGrey'}
  })
 Subheader4 = ui.Label(
  {value: '4.Definición de Variables:',
    style: { textAlign: 'justify', color:'White', stretch: 'horizontal', fontSize: '15px',backgroundColor: 'SlateGrey'}
  })
 Subheader5 = ui.Label(
  {value: 'Sistemas de Alertas​:',
    style: { textAlign: 'justify', color:'gray', stretch: 'horizontal', fontSize: '12px',backgroundColor: 'WhiteSmoke'}
  })
 Subheader6 = ui.Label(
  {value: 'Variables Topográficas​:',
    style: { textAlign: 'justify', color:'gray', stretch: 'horizontal', fontSize: '12px',backgroundColor: 'WhiteSmoke'}
  })
 Subheader7 = ui.Label(
  {value: '*Período con mayor frecuencia de incendios: Marzo-Mayo​:',
    style: { textAlign: 'justify', color:'gray', stretch: 'horizontal', fontSize: '9px',backgroundColor: 'WhiteSmoke'}
  })
 Subheader8 = ui.Label(
  {value: '*Dar clic en el mapa para visualizar ocurrencias acumuladas​:',
    style: { textAlign: 'justify', color:'gray', stretch: 'horizontal', fontSize: '12px',backgroundColor: 'WhiteSmoke'}
  })
//-------------------Fechas--------------------------//
var label_Start_base_select = ui.Label('Inicio:');
var Start_second_select = ui.Textbox({
  value: Date1,
  style: {width : '90px'},
  onChange: function(text) {
    var Start_second = text
  }
});
var label_End_base_select = ui.Label('Final:');
var End_second_select = ui.Textbox({
  value: Date2,
  style: {width : '90px', textAlign: 'right'},
  onChange: function(text) {
    var End_second = text
  }
});
//-------------------2:Fechas--------------------------//
// Fecha inicial
var dateInicio = ui.DateSlider({
    style: {
    stretch: 'horizontal', 
    margin: '0px 0px 10px 0px'},  
    //border: '10px solid black',
    //padding: '1px'},
    //Fecha minima que puede ser seleccionada
    start: '2014-01-01',
    //Fecha maxima que puede ser seleccionada, seteada como el dia de hoy.
    end: Date.now(),
    //Fecha en la que aparece al inicio de la ejecucion 2002-01-01
    value: Date1,
    //period: 12,
    onChange:  function(value) {
      //Validacion simple que avisa al usuario que la fecha final es menor que la inicial
      validaFechas()
      //Transforma en una fecha tipo DateTime
      var fecha = ee.Date(dateInicio.getValue()[0]);
      //Setea Fecha_inicial en el valor seleccionado.
      Date_inicial = fecha; 
  } 
  });
//***********************************************************************************************
//  Fecha final
var dateFinal = ui.DateSlider({
    style: {
    stretch: 'horizontal', 
    margin: '0px 10px 10px 15px'},  
    //border: '10px solid black',
    //padding: '1px',
    //Fecha minima que puede ser seleccionada
    start: '2014-06-01',
    //Fecha maxima que puede ser seleccionada, seteada como el dia de hoy.
    end: Date.now(),
    //Fecha en la que aparece al inicio de la ejecucion 2002-01-01
    value: Date.now(),
    //period: 12,
    onChange:  function(value) {
      //Validacion simple que avisa al usuario que la fecha final es menor que la inicial
      validaFechas()
      //Transforma en una fecha tipo DateTime
      var fecha = ee.Date(dateFinal.getValue()[0]);
      //Setea Fecha_final en el valor seleccionado.
      Date_final = fecha;
  } 
  });
//***********************************************************************************************
//   Validador fechas
//  Validacion simple
function validaFechas(){
  //Si la fecha final es menor que la inicial, envia un mensaje al usuario
  if(dateFinal.getValue()[0] <= dateInicio.getValue()[0]){
    //Solo envia un mensaje
    alert("Si la fecha inicial es mayor que la final habrá conflictos");
    //Setea el valor del dateSlider fecha final a la fecha actual, para impedir un error del usuario
    dateFinal.setValue(Date.now());
  }
}
//---------------------------------------------------------//
 panelFechas1 = ui.Panel({
        widgets: [label_Start_base_select,dateInicio],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
 panelFechas2 = ui.Panel({
        widgets: [label_End_base_select, dateFinal],
        layout: ui.Panel.Layout.Flow('horizontal')
      });      
/*
var Etnia_names_select = ui.Select({
  items: [
    {label:'Honduras_Garifuna', value:'Honduras_Garifuna'},
    {label:'Honduras_Garifuna & Isleno', value:'Honduras_Garifuna & Isleno'},
    {label:'Honduras_Garifuna & Mestizo', value:'Honduras_Garifuna & Mestizo'},
    {label:'Honduras_Isleños & Mestizo', value:'Honduras_Isleños & Mestizo'},
    {label:'Honduras_Lenca', value:'Honduras_Lenca'},
    {label:'Honduras_Maya Chorti', value:'Honduras_Maya Chorti'},
    {label:'Honduras_Miskito-Miskitu', value:'Honduras_Miskito-Miskitu'},
    ],
	value: 'Honduras_Garifuna',
  onChange: function(value) {
    var Etnia_names = value
  },
  style: {width: '200px'}
});
*/
//------------------------------------------
//Panel para escoger imagenes 
Imagen_Satelital = "Sentinel-2 False 20 m (nir-swir1-red)"
var listaImagenes = {"Sentinel-2 Natural ( RGB )"  :"Sentinel-2 Natural ( RGB )",
                   "Sentinel-2 False 20 m (nir-swir1-red)"  :"Sentinel-2 False 20 m (nir-swir1-red)",
                   "Sentinel-2 False 10 m (nir-red-green)"  :"Sentinel-2 False 10 m (nir-red-green)",
                   "Landsat-8 Natural (RGB)":"Landsat-8 Natural (RGB)",
                   "Landsat-8 False (nir-swir-red)":"Landsat-8 False (nir-swir-red)"
}
var Lista_Imagenes = ui.Select({
  style: {width : '200px', textAlign: 'right'},
  items: Object.keys(listaImagenes),
  onChange: function(key) {
    Imagen_Satelital = key;
}});
Lista_Imagenes.setPlaceholder('Imagenes Satelital');
var label_Lista_Imaganes = ui.Label(' Imagenes Satelital:');
 panel_Lista_Imagenes = ui.Panel({
        widgets: [Lista_Imagenes],
        layout: ui.Panel.Layout.Flow('horizontal')
      })
//------------------------------------------
//Panel de FIRMS
 FIRMS_selection = ui.Checkbox({
  label: 'Alertas de Fuego', 
  value: false,
  onChange: function(value) {
    var FIRMS_select = value
  }
});
 GOES_selection = ui.Checkbox({
  label: 'Potencia de Radiación del Fuego', 
  value: false,
  onChange: function(value) {
    var GOES_select = value
  }
});
//Panel de Cicatrices
 Cicatrices_selection = ui.Checkbox({
  label: 'Área Quemada', 
  value: false,
  onChange: function(value) {
    var Cicatrices_select = value
  }
});
//Boton de Elevación
Elevation_selection = ui.Checkbox({
  label: 'Elevación', 
  value: false,
  onChange: function(value) {
    var Elevation_select = value
  }
});
//Boton de Pendiente
 Pendiente_selection = ui.Checkbox({
  label: 'Pendiente', 
  value: false,
  onChange: function(value) {
    var Pendiente_select = value
  }
});
//---------------------------
/**
 * @license
 * Copyright 2020 Google LLC.
 * SPDX-License-Identifier: Apache-2.0
 * 
 * @description
 * Earth Engine App collapsible note code snippet from:
 *   https://showcase.earthengine.app/view/jrc-global-surface-water-animation
 */
// Function to handle showing and hiding the notes panel.
var notesShow1 = false;
function notesButtonHandler1() {
  if(notesShow1){
    notesShow1 = false;
    notesPanel1.style().set('shown', false);
    notesPanel1.style().set('width', '83px');
    notesButton1.setLabel('Instrucciones');
  } else {
    notesShow1 = true;
    notesPanel1.style().set('shown', true);
    notesPanel1.style().set('width', '350px');
    notesButton1.setLabel('Ocultar');
  }
}
// Note style.
var noteStyle = {backgroundColor: 'rgba(0, 0, 0, 0.0)', color:'DimGrey', fontSize: '9px', fontWeight: '500', margin: '8px 8px 1px 8px'};
// Show/hide note button.
var notesButton1 = ui.Button({label: 'Instrucciones', onClick: notesButtonHandler1, style: {margin: '0px'}});
var notesPanel1 = ui.Panel({
  widgets: [
  ui.Label({value:'CICA-Fuego, es una herramienta de procesamiento inteligente basado en el uso de sensores que proveen servición para el monitoreo de los incendios dentro de los Pueblos Indigenas', style: noteStyle}),
  ui.Label({value:'Para su uso adecuado, siga los siguientes pasos', style: noteStyle}),
  ui.Label({value:'1) En el Panel izquierdo: Defina los parámetros del Mapa', style: noteStyle}),
  ui.Label({value:'2) Luego de definir los parámetros, haga clic en el botón Run (parte superior del visor de mapa)', style: noteStyle}),
  ui.Label({value:'3) Haga clic en Layer, para activar o desactivar las capas', style: noteStyle}),
  ui.Label({value:'4) En el Panel derecho: Dependiendo de la capa que seleccione, se mostrará un conjunto de estadísticos', style: noteStyle}),
  ui.Label({value:'*Al seleccionar Área Quemada MODIS (Parámetro 4), podrá dar clic en la mapa y visualizar un gráfico de ocurrencia de focos de calor ', style: noteStyle}),
  //ui.Label({value:'4) Seleccione un polígono de interes dentro del mapa', style: noteStyle}),
  ui.Label({value:'* Espere a que cargue las estadísticas...', style: noteStyle}),
  //ui.Label({value:'________________________________________________', style: noteStyle})
  ],
  style: {shown: false, backgroundColor: 'rgba(255, 255, 255, 0.8)', fontSize: '11px', fontWeight: '500'}
});
// Notes panel container.
var notesContainer1 = ui.Panel({widgets: [notesButton1, notesPanel1],
  style: {position: 'bottom-right', padding: '8px',
    backgroundColor: 'rgba(0, 0, 0, 0.2)'}});
var resetButton = ui.Button("Reset panel", resetFunc);
   //panel.add(resetButton);
panel_Instruccion_Reset = ui.Panel({
        widgets: [notesContainer1, resetButton],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
//***********************************************************************************************************************
// Drill-down (Cascading Forms) in Earth Engine
// This script shows how to build hierarchical selection using UI Widgets
var admin00 = ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level0");
var admin0 = admin00.filter(ee.Filter.inList('ADM0_NAME', ['Honduras']));
var admin11= ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level1");
var admin1 = admin11.filter(ee.Filter.inList('ADM0_NAME', ['Honduras']));
var admin22= ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level2");
var admin2 = admin22.filter(ee.Filter.inList('ADM0_NAME', ['Honduras']));
// Create a panel to hold the drop-down boxes
 dropdownPanel = ui.Panel();
// Create a panel to hold the result
var resultPanel = ui.Panel();
// Define 3 dropdowns for admin0, admin1 and admin2 names
// Keep them disbled. We will add items later
 admin0Select = ui.Select({
    placeholder: 'Espere por favor..',
  }).setDisabled(true)
 admin1Select = ui.Select({
    placeholder: 'Seleccione un Municipio',
  }).setDisabled(true)
 admin2Select = ui.Select({
  placeholder: 'Seleccione un Municipio',
}).setDisabled(true)
dropdownPanel.add(admin0Select)
dropdownPanel.add(admin1Select)
//dropdownPanel.add(admin2Select)
//--------------------------------------Agrgar las etiquetas y funciones al panel-------------------------------------//
//Panel 1: Izquierda
panel.add(Header);
panel.add(lbl_subtitulo);
panel.add(panel_Instruccion_Reset);
panel.add(linea1);
panel.add(Subheader0);
panel.add(Subheader1);
panel.add(panelFechas1);
panel.add(panelFechas2);
panel.add(Subheader7);
panel.add(Subheader2);
panel.add(dropdownPanel)
panel.add(resultPanel)
panel.add(Subheader3);
panel.add(panel_Lista_Imagenes);
panel.add(Subheader4);
panel.add(Subheader5);
panel.add(FIRMS_selection);
panel.add(GOES_selection);
panel.add(Cicatrices_selection);
//panel.add(Subheader8);
panel.add(Subheader6);
panel.add(Elevation_selection);
panel.add(Pendiente_selection);
// *************************
// Define callback functions
// *************************
// We need to do this first since the functions need to
// be defined before they are used.
// Define the onChange() function for admin0Select
 var admin0Selected = function(admin0Selection) {
  resultPanel.clear()
  admin1Select.setPlaceholder('Por favor espere..')
  // Now we have admin0 values, fetch admin1 values for that country
  admin1Names = admin2
    .filter(ee.Filter.eq('ADM1_NAME', admin0Selection))
    .aggregate_array('ADM2_NAME')
    .sort()
  // Use evaluate() to not block the UI
  admin1Names.evaluate(function(items){
    admin1Select.setPlaceholder('Seleccione un Municipio')
    admin1Select.items().reset(items)
    // Now that we have items, enable the menu
    admin1Select.setDisabled(false)
  })
}
// Define the onChange() function for admin1Select
 admin1Selected = function(admin1Selection) {
 var admin0Value = admin0Select.getValue()
   var admin1Value = admin1Select.getValue()
  //var admin2Value = admin2Select.getValue()
  var result =  admin1Value + ',' + admin0Value
   Map.clear();
  var label = ui.Label('Usted seleccionó: ' + result)
  resultPanel.add(label)
//Mostrará unicamente el país seleccionado
var country = admin1.filterMetadata('ADM1_NAME', 'equals',admin0Value); // Country border polygons of high accuracy
    studyarea = ee.FeatureCollection([country.geometry()]);       //Luis Usar studyarea para filtrar por país
}
// Register the callback functions
admin0Select.onChange(admin0Selected)
//admin1Select.onChange(admin1Selected)
//admin2Select.onChange(admin2Selected)
// ******************
// Populate the items
// ******************
// Get all country names and sort them
 admin0Names = admin1.aggregate_array('ADM1_NAME').sort()
// Fetch the value using evaluate() to not block the UI
admin0Names.evaluate(function(items){
  admin0Select.items().reset(items)
  // Now that we have items, enable the menu
  admin0Select.setDisabled(false)
  // Change placeholder
  admin0Select.setPlaceholder('Seleccione un Departamento')
})
}
//Reset
function resetFunc() {
  // Reset intro panel
  panel.clear()
  addToIntro()
 }
addToIntro();
//Esta opción agrega el panel a lado izquierdo. Si cambiamos el valor a 1, lo pasa al lado derecho 
ui.root.insert(0,panel);
var AddButton = function(){
      var button = ui.Button('Run');
      button.style().set({
        position: 'top-center',
        border : '1px solid #000000',
      });
      button.onClick(function(){return Run_Fuego()});
      Map.add(button);
//Agragar estilo
//Estilo Oscuro
var baseMap = require('users/tl2581/packages:baseMap.js');
Map.setOptions('Dark', {'Dark': baseMap.darkTheme});
//Terrain
Map.setControlVisibility(true, true, true, true, true).setOptions("TERRAIN");
//Map.style().set('cursor', 'crosshair');
}
AddButton();
//Panel 2. Deracha
var panel2 = ui.Panel();
panel2.style({shown: false, backgroundColor: 'rgba(255, 255, 255, 0.8)', fontSize: '11px', fontWeight: '500'}).set({
  width: '350px',
  position: 'bottom-right',
  //border : '1px solid #000000',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  });
var noteStyle = {backgroundColor: 'rgba(0, 0, 0, 0.0)', color:'DimGrey', fontSize: '9px', fontWeight: '500', margin: '8px 8px 1px 8px'};
// Notes panel.
var Label_Grafico = ui.Label(
  {value: 'Conjunto de Gráficos',
    style: { textAlign: 'justify', color:'White', stretch: 'horizontal', fontSize: '15px',backgroundColor: 'black'}
  })
var Label_Grafico2 = ui.Label(
  {value: 'Análisis desde 2010-2020',
    style: { textAlign: 'justify', color:'black', stretch: 'horizontal', fontSize: '15px',backgroundColor: 'White'}
  })
// plot panel
var plotsPanelLabel = ui.Panel([
  ui.Label('Descripción de Estadísticas',{fontWeight: 'bold'}),
  ui.Label('*Dar clic en el mapa y espere un momento.......',noteStyle),
  ui.Label('____________________________________________________'),
  ]);
//Panel 2. Deracha
var addToIntro2 = function() {
panel2 = ui.Panel();
panel2.style().set('width', '350px');
panel2.add(plotsPanelLabel);
var resetButton = ui.Button("Reset panel", resetFunc2);
    panel2.add(resetButton);
//Reset
function resetFunc2() {
  // Reset intro panel
  panel2.clear()
  addToIntro2()
 }
}
addToIntro2()
ui.root.insert(2, panel2);
var notesShow2 = false;
function notesButtonHandler2() {
  if(notesShow2){
    notesShow2 = false;
    notesPanel2.style().set('shown', false);
    notesPanel2.style().set('width', '83px');
    notesButton2.setLabel('Fuente de Datos');
  } else {
    notesShow2 = true;
    notesPanel2.style().set('shown', true);
    notesPanel2.style().set('width', '350px');
    notesButton2.setLabel('Ocultar');
  }
}
// Note style.
var noteStyle = {backgroundColor: 'rgba(0, 0, 0, 0.0)', color:'DimGrey', fontSize: '9px', fontWeight: '500', margin: '8px 8px 1px 8px'};
// Show/hide note button.
var notesButton2 = ui.Button({label: 'Fuente de Datos', onClick: notesButtonHandler2, style: {margin: '0px'}});
var notesPanel2 = ui.Panel({
  widgets: [
  ui.Label({value:'* Fuente y Descripción de Datos', style: noteStyle}),
  ui.Label({value:'________________________________________________', style: noteStyle}),
  ui.Label({value:'* Consulta de Alertas en Global Forest Fire', style: noteStyle, targetUrl:'https://www.globalforestwatch.org/topics/fires/'}),
  ui.Label({value:'* Consulta de Alertas en CONABIO', style: noteStyle, targetUrl:'http://www.conabio.gob.mx/informacion/gis/'}),
  ui.Label({value:'* Consulta de Alertas en EartMap', style: noteStyle, targetUrl:'https://earthmap.org/?aoi=hn&boundary=level0'}),
  ui.Label({value: '• Leer sobre los Datos de Alertas FIRMS.', style: noteStyle, targetUrl: 'https://earthdata.nasa.gov/earth-observation-data/near-real-time/firms'}),
  ui.Label({value: '• Leer sobre los Datos de Área Quemada de MODIS.', style: noteStyle, targetUrl: 'https://lpdaac.usgs.gov/products/mcd64a1v006/'}),
  ui.Label({value: '• Leer sobre las Alertas GOES 16 y 17.', style: noteStyle, targetUrl: 'https://data.noaa.gov/dataset/dataset/noaa-goes-r-series-advanced-baseline-imager-abi-level-2-fire-hot-spot-characterization-fdc'}),
  //ui.Label({value: '• Leer sobre los Datos de Velocidad del Viento.', style: noteStyle, targetUrl: 'https://www.ncdc.noaa.gov/data-access/model-data/model-datasets/global-forcast-system-gfs'}),
  ui.Label({value: '• Leer sobre el Modelo Digital del Terreno.', style: noteStyle, targetUrl: 'https://cmr.earthdata.nasa.gov/search/concepts/C1000000240-LPDAAC_ECS.html'}),
  ui.Label({value: '• Consulte la descripción de los datos en el catálogo de datos de Earth Engine.',
        style: {backgroundColor: 'rgba(0, 0, 0, 0.0)', fontSize: '8px', fontWeight: '500', margin: '8px 8px 8px 8px'},
        targetUrl: 'https://developers.google.com/earth-engine/datasets/catalog/JRC_GSW1_1_YearlyHistory'}),
    ui.Label({value:'Referemcia Sugerida', style: noteStyle}),
    ui.Label({value:'DATA-i, 2020.', style: noteStyle}),
    ui.Label({value:'Desarrollado por: DATA-I', style: noteStyle})
  ],
  style: {shown: false, backgroundColor: 'rgba(255, 255, 255, 0.8)', fontSize: '11px', fontWeight: '500'}
});
// Notes panel container.
var notesContainer2 = ui.Panel({widgets: [notesButton2, notesPanel2],
  style: {position: 'bottom-right', padding: '8px',
    backgroundColor: 'rgba(0, 0, 0, 0.2)'}});
Map.add(notesContainer2);
// *********************************************************************************************************************************************************
// Functiones de el script *********************************************************************************************************************************
// *********************************************************************************************************************************************************
var Run_Fuego = function(){
admin1Selected();
//Map.clear();
Map.add(notesContainer2);  
AddButton();
    var startDate =        Date_inicial;
    var endDate =          Date_final;
    var depa_names =     admin0Select.getValue();
    var muni_names =     admin1Select.getValue();
    var FIRMS_select = FIRMS_selection          .getValue();
    var GOES_select = GOES_selection            .getValue();
    var Cicatrices_select = Cicatrices_selection.getValue();
    var Elevation_select = Elevation_selection.getValue();
    var Pendiente_select = Pendiente_selection.getValue();
//*******************************************ÁREA DE ESTUDIO*******************************************************//
// Area de estudio
//*******************************************ÁREA DE ESTUDIO*******************************************************//
// Area de estudio
// Area de estudio
var admin00 = ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level0");
var admin0 = admin00.filter(ee.Filter.inList('ADM0_NAME', ['Honduras']));
var studyarea = ee.FeatureCollection([admin0.geometry()]);
var admin11= ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level1");
var admin1 = admin11.filter(ee.Filter.inList('ADM0_NAME', ['Honduras']));
var depa = ee.FeatureCollection(admin1).filter(ee.Filter.inList('ADM1_NAME', [depa_names])); // Country border polygons of high accuracy
studyarea2 = ee.FeatureCollection([depa.geometry()]);
var admin22= ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level2");
var admin2 = admin22.filter(ee.Filter.inList('ADM0_NAME', ['Honduras']));
var depar = ee.FeatureCollection(admin2).filter(ee.Filter.inList('ADM1_NAME', [depa_names]));
var muni = ee.FeatureCollection(depar).filter(ee.Filter.inList('ADM2_NAME', [muni_names]));
studyarea3 = ee.FeatureCollection([muni.geometry()]); 
if (muni_names === null){
  studyarea3 = studyarea2;
}
//Filtros por fecha
var Fecha_inicial=  startDate;//"2019-01-01"
var Fecha_final=    endDate;//"2019-12-31"
//*******************************************COLECCIÓN DE DATOS********************************************//
//Agregar la collección de imagenes con puntos de altos de temperatura
var FIRMS_colection =  ee.ImageCollection('FIRMS');//focos de incendios
var modisdata =        ee.ImageCollection ('MODIS/006/MCD64A1');//cicatrices de incendios
var fire =              ee.ImageCollection('MODIS/006/MCD64A1');//cicatrices de incendios/mensual
var Modis_Terra1d =    ee.ImageCollection('MODIS/006/MOD09GA');    //Indice de área quemada
var NBRT_L8 =          ee.ImageCollection ('LANDSAT/LC8_L1T_ANNUAL_NBRT');//Indice de combustión
var NBRT_L7 =          ee.ImageCollection ("LANDSAT/LE7_L1T_ANNUAL_NBRT");
var NBRT_L5 =          ee.ImageCollection ('LANDSAT/LT5_L1T_ANNUAL_NBRT');
var L8 =               ee.ImageCollection ('LANDSAT/LC08/C01/T1_RT_TOA');
var L7 =               ee.ImageCollection ('LANDSAT/LE07/C01/T1_RT_TOA');
var L5 =               ee.ImageCollection ('LANDSAT/LT05/C01/T1_TOA');
//var GLDAS =               ee.ImageCollection('NASA/GLDAS/V021/NOAH/G025/T3H'); //Humedad Relativa, Velocidad del viento
//Visualización de imagenes satelitales
if (Imagen_Satelital == "Sentinel-2 Natural ( RGB )"){
  var sentinel2 = ee.ImageCollection('COPERNICUS/S2')
                      .filterDate(Fecha_inicial,Fecha_final)
                      .filterBounds(studyarea3)
                      .median()
                      .divide(10000);
sentinel2 = ee.ImageCollection(sentinel2.clip(studyarea3));
var viz = {min: 0,  max: 0.3,
  bands: ['B4', 'B3', 'B2'],}; //Color Natural
Map.addLayer(sentinel2, viz, "Sentinel-2 Natural ( RGB )",false);
}
if (Imagen_Satelital == "Sentinel-2 False 20 m (nir-swir1-red)"){
   sentinel2 = ee.ImageCollection('COPERNICUS/S2')
                      .filterDate(Fecha_inicial,Fecha_final)
                      .filterBounds(studyarea3)
                      .median()
                      .divide(10000);
sentinel2 = ee.ImageCollection(sentinel2.clip(studyarea3));
 viz = {min: 0,  max: 0.3,
  bands: ['B8','B11','B4'],}; //Falso Color
Map.addLayer(sentinel2, viz, "Sentinel-2 False 20 m (nir-swir1-red)",false);
}
if (Imagen_Satelital == "Sentinel-2 False 10 m (nir-red-green)"){
   sentinel2 = ee.ImageCollection('COPERNICUS/S2')
                      .filterDate(Fecha_inicial,Fecha_final)
                      .filterBounds(studyarea3)
                      .median()
                      .divide(10000);
sentinel2 = ee.ImageCollection(sentinel2.clip(studyarea3));
 viz = {min: 0,  max: 0.35,
  bands: ['B8','B4' , 'B3'],}; //Falso Color
Map.addLayer(sentinel2, viz, "Sentinel-2 False 10 m (nir-red-green)",false);
}
if (Imagen_Satelital == "Landsat-8 Natural (RGB)"){
  var landsat8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_RT')
                      .filterDate(Fecha_inicial,Fecha_final)
                      .filterBounds(studyarea3)
                      .mean();
landsat8 = ee.ImageCollection(landsat8.clip(studyarea3));                      
 viz = {min: 0,  max: 30000.0,
  bands: ['B4', 'B3', 'B2'],}; //
Map.addLayer(landsat8, viz, "Landsat-8 Natural (RGB)",false);
}
if (Imagen_Satelital == "Landsat-8 False (nir-swir-red)"){
landsat8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_RT')
                      .filterDate(Fecha_inicial,Fecha_final)
                      .filterBounds(studyarea3)
                      .mean();
landsat8 = ee.ImageCollection(landsat8.clip(studyarea3));                          
 viz = {min: 0,  max: 30000.0,
  bands: ['B5','B6','B4'],}; //
Map.addLayer(landsat8, viz, "Landsat-8 False (nir-swir-red)",false);
}
//*************************************PROCESAMIENTO DE COLECCION FIRMS************************************//
//var auxiliar = FIRMS_colection;
//FILTROS DE LA COLLECCIÓN DE IMAGENES 
var FIRMS =FIRMS_colection
  .select(['T21'])
  .filterDate(Fecha_inicial,Fecha_final)
  .filterBounds(studyarea3);
// Reducir alertas de fuejo de  MODIS  a una imagen binaria única
var FIRMScount  = ee.Image(FIRMS.count()).clip(studyarea3);
var FIRMSbinary = FIRMScount.eq(FIRMScount).rename('FIRMS_binary_alert');
// MODIS fuegos en vector
var project_crs   = ee.Image(FIRMS.first()).projection().crs();
var scale = ee.Image(FIRMS.first()).projection().nominalScale(); 
var FIRMSpoint = FIRMSbinary.reduceToVectors({
  geometry: studyarea3,
  eightConnected:true,
  labelProperty:'modis_fire',
  maxPixels:2e8,
  crs:project_crs,
  scale:scale,
  geometryType: 'centroid',
});
//---------------------------------------------------Alrtas GOES/NOAA-------------------------------------------//
//Créditos: By Christophe Restif & Avi Hoffman, Senior Software Engineers
//Enlace de referencia:https://medium.com/google-earth/how-to-generate-wildfire-boundary-maps-with-earth-engine-b38eadc97a38
//Script Base: 
if(GOES_select === true){
// Region of interest.
var area_of_interest = studyarea3;
// Satellite data.
var goes_16_data = ee.ImageCollection('NOAA/GOES/16/FDCF')
.filterDate(Fecha_inicial,Fecha_final)
.filterBounds(area_of_interest);
var goes_17_data = ee.ImageCollection('NOAA/GOES/17/FDCF')
.filterDate(Fecha_inicial,Fecha_final)
.filterBounds(area_of_interest);
// Conversion from mask codes to confidence values.
var fire_mask_codes = [10, 30, 11, 31, 12, 32, 13, 33, 14, 34, 15, 35];
var confidence_values = [1.0, 1.0, 0.9, 0.9, 0.8, 0.8, 0.5, 0.5, 0.3, 0.3, 0.1, 0.1];
var default_confidence_value = 0;
var map_from_mask_codes_to_confidence_values = function(image) {
return image
.clip(area_of_interest)
.remap(fire_mask_codes, confidence_values, default_confidence_value);
};
var goes_16_confidence = goes_16_data
.select(['Mask'])
.map(map_from_mask_codes_to_confidence_values);
var goes_17_confidence = goes_17_data
.select(['Mask'])
.map(map_from_mask_codes_to_confidence_values);
var goes_16_max_confidence = goes_16_confidence
.reduce(ee.Reducer.max());
var goes_17_max_confidence = goes_17_confidence
.reduce(ee.Reducer.max());
var affected_area_palette = ['black', 'yellow', 'orange', 'red', 'purple'];
//Map.centerObject(area_of_interest, 9);
//Map.addLayer(area_of_interest,{color: 'green'},'Area of interest', true, 0.2);
Map.addLayer(goes_16_max_confidence,{opacity: 0.3, min: 0, max: 1, palette: affected_area_palette},'GOES 16: Confiaza máxima',false);
Map.addLayer(goes_17_max_confidence,{opacity: 0.3, min: 0, max: 1, palette: affected_area_palette},'GOES 17: Confiaza máxima',false);
var combined_confidence = ee.ImageCollection([goes_16_max_confidence,goes_17_max_confidence]).reduce(ee.Reducer.min());
Map.addLayer(combined_confidence,{opacity: 0.3, min: 0, max: 1, palette: affected_area_palette},'Confianza Combinada 16-17',false);
var kernel = ee.Kernel.square(2000, 'meters', true);
var smoothed_confidence = combined_confidence.reduceNeighborhood(
{'reducer':ee.Reducer.mean(),
 'kernel': kernel,
 'optimization': 'boxcar',});
Map.addLayer(smoothed_confidence,{opacity: 0.3, min: 0, max: 1, palette: affected_area_palette},'Confianza Suavizada');
var high_confidence = smoothed_confidence.gt(0.6);
Map.addLayer(high_confidence,{opacity: 0.3, min: 0, max: 1, palette: affected_area_palette},'Confianza Alta',false);
var affected_areas = high_confidence
.reduceToVectors({scale: 200,  // 200 m/pixel
maxPixels: 1e10,
geometry: area_of_interest})
.filter(ee.Filter.eq('label', 1));
var affected_areas_outline = ee.Image().byte()
.paint({featureCollection: affected_areas,
width: 2});
Map.addLayer(affected_areas_outline,{palette: 'purple'},'Polígonos de Cicatrices', false, 0.3);
var smooth = function(feature) {
var max_error_meters = 500;
return ee.Feature(feature).simplify(max_error_meters);};
var affected_areas_smoothed = ee.FeatureCollection(affected_areas)
.map(smooth);
var affected_areas_smoothed_outline = ee.Image().byte()
.paint({featureCollection: affected_areas_smoothed,
width: 2});
Map.addLayer(affected_areas_smoothed_outline,{palette: 'purple'},'Polígonos suvizados', false, 0.3);
}
//*************************************PROCESAMIENTO DE COLECCION MODIS************************************//
//En esta sección se calculan las cicatrices de incendios filtrando por tipo de incendios, por tipo de incertidumbre
// y por rango de fecha
var modisdata2 = ee.ImageCollection('MODIS/006/MCD64A1')
                   .filterDate(Fecha_inicial,Fecha_final)
                   .select('BurnDate','QA');
//Función para calcular cicatrices de incendios de forma anual
var allFires = (function(img) {
  var burndate = img.select('BurnDate');
  var Incertidumbre= img.select("Uncertainty");
  var goodQA = img.select("QA").lte(4); // keep QA values 1-4 (5 is detection over agricultural areas)
  var vali_incertid=Incertidumbre.gt(60).and(burndate.lt(100));
  var validDates = burndate.gt(0).and(burndate.lt(367)); // outside of this range is snow/water/error
  return img.updateMask(validDates.and(goodQA)).gt(0);
});
//map function across MODIS data
var modisFires = modisdata2.map(allFires);
var allBurned = modisFires.reduce(ee.Reducer.anyNonZero());
var allBurned_clip= allBurned.clip(studyarea3);
//*************************************PROCESAMIENTO DE COLECCION MODIS 2************************************//
//En esta sección se calculan los incendios de forma mensual
var fire = ee.ImageCollection('MODIS/006/MCD64A1').select('BurnDate')
function compute(begin, end) {
  var t = begin.millis()
  return fire.filterDate(begin, end).max().rename('fire').clip(studyarea3)
    //.addBands(evi.filterDate(begin, end).mean().divide(1000).rename('evi'))
   // .addBands(precipitation.filterDate(begin, end).mean().rename('precipitation'))
    .set('system:time_start', t)
}
var years = ee.List.sequence(2018, 2018)//Dentro del panel de Botones debe haber una opción para seleccionar el año de intéres
var months = ee.List.sequence(1, 12)
var results = years.map(function(year) {
  return months.map(function(month) {
    var begin = ee.Date.fromYMD(year, month, 1)
    var end = begin.advance(1, 'month')
    return compute(begin, end)
  })
})
results = ee.ImageCollection(results.flatten())
var multiband = ee.Image().select()
var multiband = ee.Image(results.iterate(function(image, result) {
   return ee.Image(result).addBands(image)
}, multiband)) 
var mean_results = results.mean();
var mb = multiband.select(  ['fire',  'fire_1',   'fire_2', 'fire_3', 'fire_4', 'fire_5', 'fire_6', 'fire_7', 'fire_8',    'fire_9',   'fire_10',  'fire_11'],
                            ['enero', 'febrero',  'marzo',  'abril',  'mayo',   'junio',  'julio',  'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']);
print(mb)
//------------------------------------------Visualización de Capas y Leyendas----------------------------------------------------------//
//*****************************************----------------------------------*********************************************************//
//Paletas de color
var palette1 = ['black',"YellowGreen","DarkTurquoise", "DodgerBlue",  'DarkBlue'];//Prec
var vis1 = {
  'min': 50,
  'max': 2000,
  'opacity': 0.8,
  'palette': palette1
};
var palette2 = ["black","DeepSkyBlue","Chartreuse"];//ETP
var vis2 = {
  'min': 100,
  'max': 400,
  'opacity': 0.8,
  'palette': palette2
};
var palette3 = ['DeepSkyBlue', 'Yellow', 'Red'];//Temp
var vis3 = {
  'min': 15,
  'max': 45,
  'opacity': 0.8,
  'palette': palette3
};
var palette4 = ['black', 'Aqua'];//HR
var vis4 = {
  'min': -50,
  'max': 500,
  'opacity': 0.8,
  'palette': palette4
};
var palette5 = ["green","yellow","orange","red"];//Pendiente
var vis5 = {
  'min': 0,
  'max': 45,
  'opacity': 0.8,
  'palette': palette5
};
var palette6 = ["green","yellow"];//Viento
var vis6 = {
  'min': 0,
  'max': 10,
  'opacity': 0.8,
  'palette': palette6
};
var palette7 = ['0f0bff','6babe2','0dffbc','59e213','9d694a','ff3507'];//elevación
var vis7 = {
  'min': -10,
  'max': 3500,
  'opacity': 0.8,
  'palette': palette7
};
if (FIRMS_select === true){
Map.addLayer(FIRMSpoint, {color:    'red'  }, 'Alertas de Calor FIRMS');
}
if (Cicatrices_select === true){
Map.addLayer(allBurned_clip.select(0), {palette:"orange"},'Cicatrices');
}
if (Elevation_select === true){
//Diseño 1
var Dem = ee.Image("USGS/SRTMGL1_003").clip(studyarea3);
//Clasificación de intervalos de altitud//
var Intervalos_DEM =
  '<RasterSymbolizer>' +
    '<ColorMap type="ramp" extended="false" >' +
      '<ColorMapEntry color="#FAFDFB" quantity="0" label="0"/>' +
      '<ColorMapEntry color="#061E84" quantity="100" label="0-500" />' +
      '<ColorMapEntry color="#1BB747" quantity="200" label="500-1000" />' +
      '<ColorMapEntry color="#F0CA0E" quantity="300" label="1500-2000" />' +
      '<ColorMapEntry color="#F07B0E" quantity="400" label="2000-2500" />' +
      '<ColorMapEntry color="#F90B04" quantity="1000" label="2500-3000" />' +
    '</ColorMap>' +
  '</RasterSymbolizer>'
  Map.addLayer(Dem.sldStyle(Intervalos_DEM), {}, 'Intervalos de Elevación',true);
/************************ legend ****************************/
var names = [
  'Elevación: 0',
  'Elevación: 500  - 1000',
  'Elevación: 1000 - 1500',
  'Elevación: 1500 - 2000',
  'Elevación: 2000 - 2500',
  'Elevación: 2500 - 3000',
  ];
var values = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6'
  ];
var elevationPalette = ['FAFDFB','061E84', '1BB747','F0CA0E', 'F07B0E', 'F90B04'];
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    backgroundColor: 'grey', color: 'white',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Intervalos de Elevación (m.s.n.m)',
  style: {fontWeight: 'bold', fontSize: '13px', backgroundColor: 'grey', color: 'white',margin: '0 0 4px 0',padding: '0'}
});
// Add the title to the panel
legend.add(legendTitle);
var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });
  // Create the label filled with the description text.
  var description = ui.Label({
    value: name,
    style: {fontWeight: 'bold', fontSize: '13px', backgroundColor: 'grey', color: 'white',margin: '0 0 4px 6px'}
  });
  // return the panel
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal'),
    style: {fontWeight: 'bold', fontSize: '13px', backgroundColor: 'grey', color: 'white'}
  });
};
// Add color and and names
for (var i = 0; i < 6; i++) {
  legend.add(makeRow(elevationPalette[i], names[i]));
  }  
// Add the legend to the map.
Map.add(legend);
//Diseño 2
// Get image set and Clip to region
var CentAmElev = ee.Image(Dem).clip(studyarea3);
//Genady's hillshade model
function radians(img) { return img.toFloat().multiply(3.1415927).divide(180); }
function hillshade(dem, az, ze) {
  var terrain = ee.call('Terrain', dem);
  var slope = radians(terrain.select(['slope']));
  var aspect = radians(terrain.select(['aspect']));
  var azimuth = radians(ee.Image(az));
  var zenith = radians(ee.Image(ze));
  return azimuth.subtract(aspect).cos().multiply(slope.sin()).multiply(zenith.sin())
      .add(zenith.cos().multiply(slope.cos()));
}
var DEM = ee.Image(CentAmElev);
var Azi = ee.Image(54);
var Zen = ee.Image(45);
//var Hillshade = ee.Terrain.hillshade(DEM,Azi,Zen);
var Hillshade = hillshade(DEM,Azi,Zen);
var oldpalette =  ['0f0bff','6babe2','0dffbc','59e213','9d694a','ff3507'];
//Display images
Map.addLayer(Hillshade, {min:0.4, max:1}, 'Hillshade',true);
Map.addLayer(CentAmElev,   {bands: 'elevation', min: -10, max: 3500, palette: oldpalette, opacity: 0.34},   'Elevación', true);
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    backgroundColor: 'grey', color: 'white'
  }
});
// Creates Title for legend
var legendTitle = ui.Label({
  value: 'Elevación (m.s.n.m)',
  style: {fontWeight: 'bold', fontSize: '13px', backgroundColor: 'grey', color: 'white'}
});
legend.add(legendTitle);
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
var makeColorBarParams = function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette7,
  };
};
// Creates the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis7.palette7),
  style: {stretch: 'horizontal', margin: '0px 8px',backgroundColor: 'grey', maxHeight: '20px'},
});
legend.add(colorBar);
// Creates a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis7.min, {margin: '4px 8px', fontWeight: 'bold', fontSize: '11px', backgroundColor: 'grey',color: 'white'}),
    ui.Label(
        ((vis7.max + vis7.min) / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal', fontWeight: 'bold', fontSize: '11px',backgroundColor: 'grey', color: 'white'}),
    ui.Label(vis7.max, {margin: '4px 8px', fontWeight: 'bold', fontSize: '11px',backgroundColor: 'grey', color: 'white'})
  ],
  style: {
  backgroundColor: 'grey',
  color: 'white'
  },
  layout: ui.Panel.Layout.flow('horizontal')
});
legend.add(legendLabels);
Map.add(legend)
}
if (Pendiente_select === true){
//PENDIENTE
//Unidad: grados 
var Dem = ee.Image("USGS/SRTMGL1_003");
var Pendiente= ee.Algorithms.Terrain(Dem)
              .select("slope")
              .clip(studyarea3);
Map.addLayer(Pendiente,{min: 0, max: 45,palette:["green","yellow","orange","red"]},"Pendiente (Grados)",false);
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    backgroundColor: 'grey', color: 'white'
  }
});
// Creates Title for legend
var legendTitle = ui.Label({
  value: 'Pendiente (Grados)',
  style: {fontWeight: 'bold', fontSize: '13px', backgroundColor: 'grey', color: 'white'}
});
legend.add(legendTitle);
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
var makeColorBarParams = function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette5,
  };
};
// Creates the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis5.palette5),
  style: {stretch: 'horizontal', margin: '0px 8px',backgroundColor: 'grey', maxHeight: '20px'},
});
legend.add(colorBar);
// Creates a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis5.min, {margin: '4px 8px', fontWeight: 'bold', fontSize: '11px', backgroundColor: 'grey',color: 'white'}),
    ui.Label(
        ((vis5.max + vis5.min) / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal', fontWeight: 'bold', fontSize: '11px',backgroundColor: 'grey', color: 'white'}),
    ui.Label(vis5.max, {margin: '4px 8px', fontWeight: 'bold', fontSize: '11px',backgroundColor: 'grey', color: 'white'})
  ],
  style: {
  backgroundColor: 'grey',
  color: 'white'
  },
  layout: ui.Panel.Layout.flow('horizontal')
});
legend.add(legendLabels);
Map.add(legend)
}
//--------------------------------------------*******************----------------------------------------------//
//********************************************VISUALIZAR PAÍS, PI**********************************************//
//--------------------------------------------*******************----------------------------------------------//
Map.addLayer(ee.Image().paint(studyarea,1,1), {'palette': 'DarkBlue'},'Límite HN');
Map.addLayer(ee.Image().paint(studyarea2,1,1), {'palette': 'Yellow'},"Límite Departamento" +" "+depa_names);
Map.addLayer(ee.Image().paint(studyarea3,1,1), {'palette': 'red'},"Límite Municipio"+" "+ muni_names);
Map.centerObject(studyarea3);
//-------------------------------------------Construir Gráfico de Serie Temporal----------------------------------------------------//
var Fecha_1 = "2010-01-01";
var Fecha_2 = Fecha_final;
// Create panels to hold lon/lat values.
/*
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
*/
//var Pueblos_Indigenas = ee.FeatureCollection("users/sigcica/CLIMA/Pueblos_Indigenas_gee_Disolve").filterMetadata('Pais','equals', country_names); // Country border polygons of high accuracy
//var PI_studyarea = ee.FeatureCollection([country.geometry()]); // The study area is set to above selection
var Counties= admin2;
var startdate ="2010-01-01"
var enddate = "2018-12-31"
var chirps = ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY").filterDate(startdate,enddate)
if (FIRMS_select === true){
//crate a chart for yearly precipitation data ,using the geometry, and a reducer for 
//calculating mean precipitation area
    //ANÁLISIS DE ALERTAS FIRMS
//var auxiliar = FIRMS_colection;
//FILTROS DE LA COLLECCIÓN DE IMAGENES 
var FIRMS_colection2 =  ee.ImageCollection('FIRMS');//focos de incendios
var FIRMS2 =FIRMS_colection2
  .select(['T21'])
  .filterDate(Fecha_inicial,Fecha_final)
  .filterBounds(studyarea);
var FIRMS3 =FIRMS_colection2
  .select(['T21'])
  .filterDate(Fecha_inicial,Fecha_final)
  .filterBounds(studyarea2);
var FIRMS4 =FIRMS_colection2
  .select(['T21'])
  .filterDate(Fecha_inicial,Fecha_final)
  .filterBounds(studyarea3);
// Reducir alertas de fuejo de  MODIS  a una imagen binaria única
var FIRMScount2  = ee.Image(FIRMS2.count()).clip(studyarea);
var FIRMScount3  = ee.Image(FIRMS3.count()).clip(studyarea2);
var FIRMScount4  = ee.Image(FIRMS4.count()).clip(studyarea3);
var FIRMSbinary2 = FIRMScount2.eq(FIRMScount2).rename('FIRMS_binary_alert_1');
var FIRMSbinary3 = FIRMScount3.eq(FIRMScount3).rename('FIRMS_binary_alert_2');
var FIRMSbinary4 = FIRMScount4.eq(FIRMScount4).rename('FIRMS_binary_alert_3');
// MODIS fuegos en vector
var project_crs   = ee.Image(FIRMS2.first()).projection().crs();
var scale = ee.Image(FIRMS2.first()).projection().nominalScale(); 
var FIRMSpoint2 = FIRMSbinary2.reduceToVectors({
  geometry: studyarea,
  eightConnected:true,
  labelProperty:'modis_fire',
  maxPixels:1e16,
  crs:project_crs,
  scale:scale,
  geometryType: 'centroid',
  bestEffort: true,
  tileScale : 16
});
var FIRMSpoint3 = FIRMSbinary3.reduceToVectors({
  geometry: studyarea2,
  eightConnected:true,
  labelProperty:'modis_fire',
  maxPixels:1e16,
  crs:project_crs,
  scale:scale,
  geometryType: 'centroid',
  bestEffort: true,
  tileScale : 16
});
var FIRMSpoint4 = FIRMSbinary4.reduceToVectors({
  geometry: studyarea3,
  eightConnected:true,
  labelProperty:'modis_fire',
  maxPixels:1e16,
  crs:project_crs,
  scale:scale,
  geometryType: 'centroid',
  bestEffort: true,
  tileScale : 16
});
    // CONTAR NUMERO DE PUNTOS DE CALOR
var numero_incendios_nacional = ee.FeatureCollection(FIRMSpoint2).filterBounds(studyarea.geometry());
var numero_PI_nacional = ee.FeatureCollection(FIRMSpoint3).filterBounds(studyarea2.geometry());
var numero_PI = ee.FeatureCollection(FIRMSpoint4).filterBounds(studyarea3.geometry());
var cantidad_Nacional = numero_incendios_nacional.size();
var cantidad_PI_Nacional = numero_PI_nacional.size();
var cantidad_PI = numero_PI.size();
var lbl_cantidadFuego1 = ui.Label(
  {
    value: 'Existen ' + cantidad_Nacional.getInfo() + ' puntos de calor a nivel Nacional',
    style: {  margin: '2px 1px', textAlign: 'justify', fontFamily: 'Agency FB', color:'white', 
    backgroundColor: '#454545' , stretch: 'horizontal', fontSize: '15px', padding : '0px 2px'}
  });
//var title = ui.Label('Click to inspect');
lbl_cantidadFuego1.style().set('position', 'bottom-left');
Map.add(lbl_cantidadFuego1);
var lbl_cantidadFuego2 = ui.Label(
  {
    value: 'Existen ' + cantidad_PI_Nacional.getInfo() + ' puntos de calor dentro de: '+ depa_names,
    style: {  margin: '2px 1px', textAlign: 'justify', fontFamily: 'Agency FB', color:'white', 
    backgroundColor: '#454545' , stretch: 'horizontal', fontSize: '15px', padding : '0px 2px'}
  });
//var title = ui.Label('Click to inspect');
lbl_cantidadFuego2.style().set('position', 'bottom-left');
Map.add(lbl_cantidadFuego2)
var lbl_cantidadFuego3 = ui.Label(
  {
    value: 'Existen ' + cantidad_PI.getInfo() + ' puntos de calor dentro de '+ muni_names,
    style: {  margin: '2px 1px', textAlign: 'justify', fontFamily: 'Agency FB', color:'white', 
    backgroundColor: '#454545' , stretch: 'horizontal', fontSize: '15px', padding : '0px 2px'}
  });
//var title = ui.Label('Click to inspect');
lbl_cantidadFuego3.style().set('position', 'bottom-left');
Map.add(lbl_cantidadFuego3)
}
//-------------------------------------------------------
//ANÁLISIS DE FRECUENCIA DE INCENDIOS
var fire_modis = ee.ImageCollection('MODIS/006/MCD64A1')
  .select('BurnDate');
var evi_modis = ee.ImageCollection('MODIS/006/MOD13Q1')
.select('EVI');
var precipitation_chirps = ee.ImageCollection('UCSB-CHG/CHIRPS/PENTAD')
  .select('precipitation');
//var precip = GSMaP.filterBounds(studyarea).filterDate(Fecha_1,Fecha_2).select("hourlyPrecipRateGC")
//  .sort('system:time_start', false)
  //.filterBounds(point);
// Register a callback on the default map to be invoked when the map is clicked.
Map.onClick(function(coords) {
  var lon = ui.Label();
  var lat = ui.Label();
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
var location = 'lon: ' + coords.lon.toFixed(4) + ' ' +
                 'lat: ' + coords.lat.toFixed(4);
  // Add a red dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'FF0000'}, 'Point');
  //Map.layers().set(10, dot);
var latLabel = ui.Label({
    value: 'Latitude: ' + Math.round(coords.lat * 1000) / 1000,
    style: {margin: '4px 8px', fontSize: '13px', backgroundColor: 'white', color: 'black'}
    });
 var lonLabel = ui.Label({
    value: 'Longitude: ' + Math.round(coords.lon * 1000) / 1000,
    style: {margin: '4px 8px', fontSize: '13px', backgroundColor: 'white', color: 'black'}
    });  
var SRTM = ee.Image("USGS/SRTMGL1_003");
var mean_value = SRTM.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: point,
    scale: 100
  })
var value_results_eleva = ee.Number(mean_value.get('elevation').getInfo());  
var Pendiente= ee.Algorithms.Terrain(SRTM)
              .select("slope")
              //.clip(studyarea);
var mean_value_slope = Pendiente.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: point,
    scale: 100
  })             
var value_results_slope = ee.Number(mean_value_slope.get('slope').getInfo());  
var Elevacion_label = ui.Label(
  {value: "Elevación:"+ " "+value_results_eleva.getInfo()+ " "+"m.s.n.m",
    style: { margin: '4px 8px', fontSize: '13px', backgroundColor: 'white', color: 'gray'}
  })
var slope_label = ui.Label(
  {value: "Pendiente:"+ " "+value_results_slope.getInfo()+ " "+"Grados",
    style: { margin: '4px 8px', fontSize: '13px', backgroundColor: 'white', color: 'gray'}
  })
panel2.clear()
panel2.add(plotsPanelLabel);
panel2.widgets().set(3, latLabel);
panel2.widgets().set(4, lonLabel);
panel2.widgets().set(5, Elevacion_label); 
panel2.widgets().set(6, slope_label);
//panel2.add(Elevacion_label);
//panel2.add(slope_label); 
panel2.style().set({shown: true});
  //-----------------------------------------------------
if (Cicatrices_select === true){
//ANÁLISIS DE FRECUENCIA DE INCENDIOS
var fire_modis = ee.ImageCollection('MODIS/006/MCD64A1')
  .select('BurnDate');
var evi_modis = ee.ImageCollection('MODIS/006/MOD13Q1')
.select('EVI');
var precipitation_chirps = ee.ImageCollection('UCSB-CHG/CHIRPS/PENTAD')
  .select('precipitation');
function compute2(begin, end) {
  var t = begin.millis()
  return fire_modis.filterDate(begin, end).sum().gte(1).rename('fire').clip(point)//.divide(10)
    //.addBands(evi_modis.filterDate(begin, end).mean().divide(1000).rename('evi').clip(studyarea))
    //.addBands(precipitation_chirps.filterDate(begin, end).mean().rename('precipitation'))
    .set('system:time_start', t)
}
var years2 = ee.List.sequence(2001, 2019)
var months2 = ee.List.sequence(1, 12)
var results2 = years2.map(function(year) {
  return months2.map(function(month) {
    var begin = ee.Date.fromYMD(year, month, 1)
    var end = begin.advance(1, 'month')
    return compute2(begin, end)
  })
})
results2 = ee.ImageCollection(results2.flatten())
//Add Chart EVI vs fire
  var EVI_Fire_Chart = ui.Chart.image.series({
  imageCollection: results2,
  region: point,
  reducer: ee.Reducer.sum(),
  scale: 1000,
  xProperty: 'system:time_start'
});
EVI_Fire_Chart
    .setChartType('LineChart')
    .setOptions({
    title: 'Frecuencia acumulada de focos de calor',
    //curveType:'function',  
    vAxis: {title: 'Ocurrencia'},
    hAxis: {title: 'Fecha', format: 'Y'},
    lineWidth: 2,
    series: {0: {color: 'red'}},
    interpolateNulls: false,
    colors: ['red']
     });
EVI_Fire_Chart.setSeriesNames(['fire']); //,'GNDVI','NBRI','NDWI','NDSI'
panel2.widgets().set(7, EVI_Fire_Chart);
}
});
//-----------------------------------Agregar etiquedas el mapa---------------------------------------------------//
//**********************************-------------------------****************************************************//
//Base de datos que deseamos visulizar sus etiquetas
var lmopi = admin2//
var list = ee.FeatureCollection(lmopi) 
var label = new ui.Label({
  value: 'Clic para ver las Propiedades',
  style: {fontWeight: 'bold', fontSize: '13px', backgroundColor: 'grey', color: 'white'}
});
var inspector = ui.Panel({
  style: {
    position: 'bottom-center',
    backgroundColor: 'grey', color: 'white'
  }
});
inspector.add(label)
function updateText(strings) {
  var labels = strings.map(function(s) {
    return ui.Label({
  value: s,
  style: {fontWeight: 'bold', fontSize: '13px', backgroundColor: 'grey', color: 'white'}
})
  })
  inspector.widgets().reset(labels)
}
// add a map layer to show selection
var selectionLayer = ui.Map.Layer(ee.Image(), { color: 'blue' }, 'Click')
Map.layers().add(selectionLayer)
function inspect(coords) {
  var point = ee.Geometry.Point([coords.lon, coords.lat]);
  // generated search geometry and update it
  var scale = Map.getScale()
  var searchRadius = 3
  var selection = point.buffer(scale * searchRadius, scale)
  selectionLayer.setEeObject(selection)
  // find the nearest feature (use 10 screen pixels as a search buffer)
  var nearestFeature = list.filterBounds(selection).first()
  // server -> client
  nearestFeature.evaluate(function(f) {
    if(f === null) {
      updateText(['No features found'])
      return
    }
    updateText([
      'Departamento: ' + f.properties.ADM1_NAME,
      'Municipio: ' + f.properties.ADM2_NAME
    ])
  })
}
//Map.addLayer(list)
Map.add(inspector);
Map.onClick(inspect)
Map.style().set({ cursor: 'crosshair' })
};//Fin de rumclima