var Boundaries = ui.import && ui.import("Boundaries", "table", {
      "id": "USDOS/LSIB_SIMPLE/2017"
    }) || ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"),
    Poli = ui.import && ui.import("Poli", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.MultiPoint();
// *********************************************************************************************************************************************************
//              Sistema de Análisis y Monitoreo del Clima  (DATA-Clima) (Version 1.1)
// *********************************************************************************************************************************************************
// 
//  * Empresa:  Data-Intelligence International
//  * Componente:  SIG
//  *
//  * Propósito:- Mapeo de diferentes varibales climáticas y topográficas 
//  *           - Escenarios climáticos
//  *           - Análisis de series temporales 
//  * 
//  * Desarrollado por : Fabio Casco 
//  
//**********************************************************************************************************************************************************
// *********************************************************************************************************************************************************
// Definición de variables de interfaz  **************************************************************************************
// *********************************************************************************************************************************************************
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
var panelFechas;
var Subheader2;
var dropdownPanel;
var resultPanel
var Subheader3;
var Subheader4;
var Subheader6;
var admin1Selected;
var admin0Selected;
var admin0Select
var admin1Select
var admin2Select
var admin0Names;
var admin1Names;
var contaminacion;
var lista_contaminacion;
var Contaminacion_select;
var panel_contaminacion;
var notesContainer2;
var timeSeries;
// *********************************************************************************************************************************************************
// Definición en el uso del interfaz  **************************************************************************************
// *********************************************************************************************************************************************************
//---------------------------Calcular las fecha----------------------------//
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
var cantidadDia = 365;
var fechaInicial = Date.now() - valorDia * cantidadDia;
//var Fecha_inicial= "2020-01-28";//ee.Date(fechaInicial,String); 
//var Fecha_final= "2020-01-29";//ee.Date(Date.now(),String);
var Fecha_inicial= formatDate(fechaInicial); 
var Fecha_final= formatDate(Date.now() - 86400000 * 1);
var Date1= ee.Date(Fecha_inicial).format("YYYY-MM-dd").getInfo();
var Date2= ee.Date(Fecha_final)  .format("YYYY-MM-dd").getInfo();
//Fecha del código de Luis
//Filtros por fecha
var Date_inicial=  Date1;
var Date_final=    Date2;
//-------------------------------------------------------Configuración de estilos----------------------------------------------------------//
var colors = {'cyan': '#24C1E0', 'transparent': '#11ffee00', 'gray': '#F8F9FA', 'black': '#000000'};
var TITLE_STYLE = {
  fontWeight: 'bold',
  fontSize: '20px',
  textAlign: 'center',
  padding: '8px',
  color: 'MidnightBlue',
  //fontWeight: 'bold',
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
/*
var panel = ui.Panel();
panel.style({shown: false, backgroundColor: 'rgba(255, 255, 255, 0.8)', fontSize: '11px', fontWeight: '500'}).set({
  width: '300px',
  position: 'bottom-right',
  //border : '1px solid #000000',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  });
*/
var panel = ui.Panel({
  widgets:[],
  style: {width: '20%'}
})
var addToIntro = function() {
//----------------------------------------------------------Etiquetas--------------------------------------------------------------//
 Header = ui.Label('Plataforma de Análisis y Monitoreo de Contaminates Atmosféricos',TITLE_STYLE);
 lbl_subtitulo = ui.Label(
  {
    value: 'Herramienta de analisis para el monitoreo inteligente de Gases Trazas Atmosférico. La herramienta proporciona imágenes de alta resolución casi en tiempo real de las concentraciones de diferentes tipos de gas. ',
    style: {  margin: '10px 5px',fontSize: '10px', textAlign: 'justify' }
  });
 linea1 = ui.Label('___________________________________________')
 Subheader0 = ui.Label(
  {value: 'Definición de Parámetros del Mapa:',
    style: { margin: '10px 5px', textAlign: 'justify', color:'Black', 
    backgroundColor: 'LightGrey' , stretch: 'horizontal', fontSize: '12px', padding : '0px 12px'}//,fontWeight: 'bold'
  });
 Subheader1 = ui.Label(
  {value: '1.Filtro de Fecha para el Mapa:',
    style: { textAlign: 'justify', color:'Gray', stretch: 'horizontal', fontSize: '13px',backgroundColor: 'GhostWhite'}
  });
 Subheader2 = ui.Label(
  {value: '2.Filtro de área de estudio:',
    style: { textAlign: 'justify', color:'Gray', stretch: 'horizontal', fontSize: '13px',backgroundColor: 'GhostWhite'}
  })
 Subheader3 = ui.Label(
  {value: '3.Definición de Variables:',
    style: { textAlign: 'justify', color:'Gray', stretch: 'horizontal', fontSize: '13px',backgroundColor: 'GhostWhite'}
  })
 Subheader6 = ui.Label(
  {value: '4.Seleccione un tipo de Gas:',
    style: { textAlign: 'left', color:'Gray', stretch: 'horizontal', fontSize: '13px',backgroundColor: 'GhostWhite'}
  })
//-------------------Fechas--------------------------//
var label_Start_base_select = ui.Label(
  {value: 'Inicio:',
    style: { textAlign: 'left', color:'Gray', fontSize: '11px'}
  });
var Start_second_select = ui.Textbox({
  value: Date1,
  style: {width : '45px'},
  onChange: function(text) {
    var Start_second = text
  }
});
var label_End_base_select = ui.Label(
  {value: 'Final:',
    style: { textAlign: 'left', color:'Gray', fontSize: '11px'}
  });
var End_second_select = ui.Textbox({
  value: Date2,
  style: {width : '45px', textAlign: 'right'},
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
        widgets: [label_Start_base_select,dateInicio,],
       // style: {width : '250px'},
        layout: ui.Panel.Layout.Flow('horizontal')
      });
 panelFechas2 = ui.Panel({
        widgets: [label_End_base_select, dateFinal],
        //style: {width : '250px'},
        layout: ui.Panel.Layout.Flow('horizontal')
      });
 panelFechas = ui.Panel({
        widgets: [panelFechas1,panelFechas2,],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
//----------------------------------------
//---------------------------
contaminacion  = "N/A"
lista_contaminacion = {"NO2"  :"NO2",
                           "CO"   :"CO",
                           "SO2"  :"SO2",
                           "CH4"  :"CH4",
                           "O3"  :"O3",
                           "N/A"  :"N/A"
}
Contaminacion_select = ui.Select({
  style: {width : '180px', textAlign: 'left'},
  items: Object.keys(lista_contaminacion),
  onChange: function(key) {
    contaminacion = key;
}});
Contaminacion_select.setPlaceholder('N/A');
var label_Contaminacion = ui.Label(
  {value: 'Gas Traza:',
    style: { textAlign: 'left', color:'Gray', stretch: 'horizontal', fontSize: '12px'}
  });
panel_contaminacion = ui.Panel({
        widgets: [label_Contaminacion,Contaminacion_select],
        layout: ui.Panel.Layout.Flow('horizontal')
      })
//-----------------------------------------------------
//-----------------------------------------------------
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
  ui.Label({value:'DATA-Contaminación, es una herramienta de procesamiento inteligente basado en el uso de sensores que proveen servición de monitoreo sobre la contaminación', style: noteStyle}),
  ui.Label({value:'Para su uso adecuado, siga los siguientes pasos', style: noteStyle}),
  ui.Label({value:'1) En el Panel izquierdo: Defina los parámetros del Mapa', style: noteStyle}),
  ui.Label({value:'*El Rango de fechas corresponde al promedio que será calculado en el mapa ', style: noteStyle}),
  ui.Label({value:'2) Luego de definir los parámetros, haga clic en el botón Run (parte superior del visor de mapa)', style: noteStyle}),
  ui.Label({value:'3) Haga clic en Layer, para activar o desactivar las capas', style: noteStyle}),
  ui.Label({value:'4) En el Panel derecho: Encontrará información Estadística del área de estudio seleccionada', style: noteStyle}),
    ui.Label({value:'* Espere a que cargue las estadísticas...', style: noteStyle}),
   // ui.Label({value:'5) Consultar Código Fuente: github', style: noteStyle,targetUrl: 'https://github.com/sigcica/App-Territorios-Ind-genas'}),
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
// Drill-down (Cascading Forms) in Earth Engine
// This script shows how to build hierarchical selection using UI Widgets
var admin0 = ee.FeatureCollection("users/APP_DATA_I/limites/CHL_pais_sim");
var admin1 = ee.FeatureCollection("users/APP_DATA_I/limites/CHL_regiones_sim");
var admin2 = ee.FeatureCollection("users/APP_DATA_I/limites/CHL_comunas_sim");
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
    placeholder: 'Seleccione una Comuna',
  }).setDisabled(true)
 admin2Select = ui.Select({
  placeholder: 'Seleccione una Comuna',
}).setDisabled(true)
dropdownPanel.add(admin0Select)
dropdownPanel.add(admin1Select)
//dropdownPanel.add(admin2Select)
//--------------------------------------Agrgar las etiquetas y funciones al panel-------------------------------------//
//Panel 1: Izquierda
panel.add(Header);
panel.add(lbl_subtitulo);
panel.add(notesContainer1);
panel.add(resetButton);
panel.add(linea1);
panel.add(Subheader0);
panel.add(Subheader1);
panel.add(panelFechas1);
panel.add(panelFechas2);
panel.add(Subheader2);
panel.add(dropdownPanel)
panel.add(resultPanel)
panel.add(Subheader6);
panel.add(panel_contaminacion);
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
    .filter(ee.Filter.eq('Región', admin0Selection))
    .aggregate_array('Comuna')
    .sort()
  // Use evaluate() to not block the UI
  admin1Names.evaluate(function(items){
    admin1Select.setPlaceholder('Seleccione una Comuna')
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
   map.clear();
  var label = ui.Label('Usted seleccionó: ' + result)
 // resultPanel.add(label)
//Mostrará unicamente el país seleccionado
var country = admin1.filterMetadata('Región', 'equals',admin0Value); // Country border polygons of high accuracy
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
 admin0Names = admin1.aggregate_array('Región').sort()
// Fetch the value using evaluate() to not block the UI
admin0Names.evaluate(function(items){
  admin0Select.items().reset(items)
  // Now that we have items, enable the menu
  admin0Select.setDisabled(false)
  // Change placeholder
  admin0Select.setPlaceholder('Seleccione una Región')
})
//Fuente de Datos
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
  ui.Label({value: '• Leer sobre los Datos de NO2.', style: noteStyle, targetUrl: 'https://sentinel.esa.int/web/sentinel/user-guides/sentinel-5p-tropomi'}),
  ui.Label({value: '• Leer sobre los Datos de CO.', style: noteStyle, targetUrl: 'https://sentinel.esa.int/web/sentinel/user-guides/sentinel-5p-tropomi'}),
  ui.Label({value: '• Leer sobre los Datos de SO2.', style: noteStyle, targetUrl: 'https://sentinel.esa.int/web/sentinel/user-guides/sentinel-5p-tropomi'}),
  ui.Label({value: '• Leer sobre los Datos de CH4.', style: noteStyle, targetUrl: 'https://sentinel.esa.int/web/sentinel/user-guides/sentinel-5p-tropomi'}),
  ui.Label({value: '• Leer sobre los Datos de O3.', style: noteStyle, targetUrl: 'https://sentinel.esa.int/web/sentinel/user-guides/sentinel-5p-tropomi'}),
  ui.Label({value: '• Consulte la descripción de los datos en el catálogo de datos de Earth Engine.',
        style: {backgroundColor: 'rgba(0, 0, 0, 0.0)', fontSize: '8px', fontWeight: '500', margin: '8px 8px 8px 8px'},
        targetUrl: 'https://developers.google.com/earth-engine/datasets/catalog/JRC_GSW1_1_YearlyHistory'}),
    ui.Label({value:'Referencia Sugerida', style: noteStyle}),
    ui.Label({value:'DATA-I, 2021. ', style: noteStyle}),
   // ui.Label({value:'Desarrollado por: Fabio Casco', style: noteStyle})
  ],
  style: {shown: false, backgroundColor: 'rgba(255, 255, 255, 0.8)', fontSize: '11px', fontWeight: '500'}
});
// Notes panel container.
notesContainer2 = ui.Panel({widgets: [notesButton2, notesPanel2],
  style: {position: 'bottom-right', padding: '8px',
    backgroundColor: 'rgba(0, 0, 0, 0.2)'}});
panel.widgets().set(16, notesContainer2);
}
//Reset
function resetFunc() {
  // Reset intro panel
  panel.clear()
  addToIntro()
  panel2.clear()
  addToIntro2()
  map.clear()
  AddButton();
  lowerPanel.clear()
  lowerPanel.add(ui.Label("Estadísticas"));
 }
addToIntro()
//Esta opción agrega el panel a lado izquierdo. Si cambiamos el valor a 1, lo pasa al lado derecho 
//ui.root.insert(0,panel);
//Panel 2. Deracha
/*
var panel2 = ui.Panel();
panel2.style({shown: false, backgroundColor: 'rgba(255, 255, 255, 0.8)', fontSize: '11px', fontWeight: '500'}).set({
  width: '400px',
  position: 'bottom-right',
  //border : '1px solid #000000',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  });
*/
var panel2 = ui.Panel({
  widgets:[],
  style: {width: '25%'}
})
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
  //ui.Label('Dar clic en el mapa y espere a cargue los datos.....',noteStyle),
  ui.Label('___________________________________________________________'),
  ]);
//Agregar Animación y grafico segun el área de estudio
var PanelLabel_numerico = ui.Panel([
  //ui.Label('____________________________________________'),
  ui.Label('Reporte General del Área Seleccionada',{fontWeight: 'bold'}),
  //ui.Label('(Análisis los últimos 30 días).....',noteStyle),
  ]);
var addToIntro2 = function() {
var resetButton = ui.Button("Reset panel", resetFunc2);
panel2.clear();
panel2.style().set('width', '400px');
panel2.add(plotsPanelLabel);
//panel2.add(resetButton);
panel2.widgets().set(3, PanelLabel_numerico);
//panel2.style().set({shown: true}); 
//Reset
function resetFunc2() {
  // Reset intro panel
  panel2.clear()
  addToIntro2()
 }
}
addToIntro2()
//ui.root.insert(2, panel2);
///////////////////////////////////////////////////////
var lowerPanel =  ui.Panel({
  widgets: [ui.Label("Estadísticas")], 
  style: {width:'100%', height: '30%', border : '1px solid #000000',}, 
  // layout: 'horizontal'
})
var map = ui.Map({
  style:{width:'100%', height: '70%'}
})
var AddButton = function(){
      var button = ui.Button('Run');
      button.style().set({
        position: 'top-center',
        border : '1px solid #000000',
      });
      button.onClick(function(){return runClima()});
      map.add(button);
//Agragar estilo
//Estilo Oscuro
}
AddButton();
var centerPanel = ui.Panel({
  widgets:[map, lowerPanel],
  style: {width: '55%', height: '100%'},
  layout: ui.Panel.Layout.flow('vertical')
})
var fullUI = ui.Panel({
  widgets: [panel, centerPanel, panel2],
  style:  {width: '100%', height: '100%'},
  layout: ui.Panel.Layout.flow('horizontal')
})
ui.root.clear()
ui.root.add(fullUI)
// *********************************************************************************************************************************************************
// Functiones de el script *********************************************************************************************************************************
// *********************************************************************************************************************************************************
var runClima = function(){
admin1Selected();
//map.clear();
//map.add(notesContainer2);  
AddButton();
    var startDate =        Date_inicial;
    var endDate =          Date_final;
    //var country_names =    Country_name_select.getValue();
    var depa_names =     admin0Select.getValue();
    var muni_names =     admin1Select.getValue();
//*******************************************ÁREA DE ESTUDIO*******************************************************//
// Area de estudio
var studyarea = ee.FeatureCollection("users/APP_DATA_I/limites/CHL_regiones_sim");
var admin1= ee.FeatureCollection("users/APP_DATA_I/limites/CHL_regiones_sim").filterMetadata('Región','equals',depa_names);
var studyarea2 = ee.FeatureCollection([admin1.geometry()]);
var admin2= ee.FeatureCollection("users/APP_DATA_I/limites/CHL_comunas_sim").filterMetadata('Región','equals',depa_names);
admin2= admin2.filterMetadata('Comuna','equals',muni_names);
var studyarea3 = ee.FeatureCollection([admin2.geometry()]);  
if (muni_names === null){
  studyarea3 = studyarea2;
}
var Empresas_Region = ee.FeatureCollection("users/APP_DATA_I/Pruebas/Shp_RETC/Contaminantes")
                                                .filterMetadata("Region","equals",depa_names);
var Empresa_Comuna = Empresas_Region.filterMetadata("Comuna","equals",muni_names);
if (muni_names === null){
  Empresas_Region = Empresa_Comuna;
}
//map.addLayer(Empresa_Comuna,{},"Empresas")
var Sentinel_2 =    ee.ImageCollection('COPERNICUS/S2');
var sentinel5_NO2 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2');
var sentinel5_CO  = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO");
var sentinel5_SO2 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_SO2");
var sentinel5_CH4 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_CH4");
var sentinel5_O3 =  ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_O3");
//---------------------------------------------------------Estimación de NO2-------------------------------------------------------------//
var palette1 = ['black',  'DeepPink'];//NO2 (µmol/m²) multipiclicar 1e6
var vis1 = {
  'min': 50,
  'max': 100,
  'opacity': 0.8,
  'palette': palette1
};
var palette2 = ["black","YellowGreen","Yellow"];//CO (mol/m²)
var vis2 = {
  'min': 0.03,
  'max': 0.04,
  'opacity': 0.8,
  'palette': palette2
};
var palette3 = ['black', 'Indigo', 'Yellow'];//SO2 (µmol/m²) multipiclicar 1e6
var vis3 = {
  'min': -20,
  'max': 300,
  'opacity': 0.8,
  'palette': palette3
};
var palette4 = ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red'];//CH4 (ppbV)
var vis4 = {
  'min': 1800,
  'max': 1900,
  'opacity': 0.8,
  'palette': palette3
};
var palette5 = ['black', 'purple', 'OrangeRed'];//O3 (mol/m²)
var vis5 = {
  'min': 0.1,
  'max': 0.14,
  'opacity': 0.8,
  'palette': palette3
};
var NO2 = sentinel5_NO2.select('NO2_column_number_density')
                   .filterDate(startDate,endDate)
                   .mean()
                   .multiply(1e6);
var CO = sentinel5_CO.select('CO_column_number_density')
                   .filterDate(startDate,endDate)
                   .mean();
                   //.multiply(1e6);
var SO2 = sentinel5_SO2.select('SO2_column_number_density')
                   .filterDate(startDate,endDate)
                   .mean()
                   .multiply(1e6);
var CH4 = sentinel5_CH4.select('CH4_column_volume_mixing_ratio_dry_air')
                   .filterDate(startDate,endDate)
                   .mean();
                   //.multiply(1e6); 
var O3 = sentinel5_O3.select('O3_column_number_density')
                   .filterDate(startDate,endDate)
                   .mean();
                   //.multiply(1e6);                    
//------------------------------------------------Función para alegir el tipo de contaminación y su respectiva leyenda----------------------
//------------------------------------NO2
if (contaminacion === "NO2"){  
map.addLayer(NO2, vis1,  "Nivel de NO2" ,true);
//var BD_paises= ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017");
//map.addLayer(ee.Image().paint(BD_paises,1,2), {'palette': 'white','width':1},'Límites Mundiales',true);
 var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    backgroundColor: 'grey', color: 'white'
  }
});
// Creates Title for legend
var legendTitle = ui.Label({
  value: 'NO2 Column Number Density (µmol/m²)',
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
    palette: palette1,
  };
};
// Creates the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis1.palette1),
  style: {stretch: 'horizontal', margin: '0px 8px',backgroundColor: 'grey', maxHeight: '20px'},
});
legend.add(colorBar);
// Creates a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis1.min, {margin: '4px 8px', fontWeight: 'bold', fontSize: '11px', backgroundColor: 'grey',color: 'white'}),
    ui.Label(
        ((vis1.max + vis1.min) / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal', fontWeight: 'bold', fontSize: '11px',backgroundColor: 'grey', color: 'white'}),
    ui.Label(vis1.max, {margin: '4px 8px', fontWeight: 'bold', fontSize: '11px',backgroundColor: 'grey', color: 'white'})
  ],
  style: {
  backgroundColor: 'grey',
  color: 'white'
  },
  layout: ui.Panel.Layout.flow('horizontal')
});
legend.add(legendLabels);
//map.add(legend)
panel.remove(notesContainer2);
panel.widgets().set(14, legend);
//panel.add(legend);
panel.add(notesContainer2);
}
//------------------------------------CO
if (contaminacion === "CO"){  
 map.addLayer(CO,  vis2,  "Nivel de CO"  ,true);
//var BD_paises= ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017");
//map.addLayer(ee.Image().paint(BD_paises,1,2), {'palette': 'white','width':1},'Límites Mundiales',true);
 legend = ui.Panel({
  style: {
    position: 'bottom-right',
    backgroundColor: 'grey', color: 'white'
  }
});
// Creates Title for legend
 legendTitle = ui.Label({
  value: 'CO Column Number Density (mol/m²)',
  style: {fontWeight: 'bold', fontSize: '13px', backgroundColor: 'grey', color: 'white'}
});
legend.add(legendTitle);
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
 makeColorBarParams = function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette2,
  };
};
// Creates the color bar for the legend.
 colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis2.palette2),
  style: {stretch: 'horizontal', margin: '0px 8px',backgroundColor: 'grey', maxHeight: '20px'},
});
legend.add(colorBar);
// Creates a panel with three numbers for the legend.
 legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis2.min, {margin: '4px 8px', fontWeight: 'bold', fontSize: '11px',backgroundColor: 'grey', color: 'white'}),
    ui.Label(
        ((vis2.max + vis2.min) / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal', fontWeight: 'bold', fontSize: '11px',backgroundColor: 'grey', color: 'white'}),
    ui.Label(vis2.max, {margin: '4px 8px', fontWeight: 'bold', fontSize: '11px',backgroundColor: 'grey', color: 'white'})
  ],
  style: {
  backgroundColor: 'grey',
  color: 'white'
  },
  layout: ui.Panel.Layout.flow('horizontal')
});
legend.add(legendLabels);
//map.add(legend)
panel.widgets().set(14, legend);
panel.remove(notesContainer2);
panel.add(notesContainer2);
}
//------------------------------------SO2
if (contaminacion === "SO2"){  
 map.addLayer(SO2, vis3,  "Nivel de SO2" ,true); 
//var BD_paises= ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017");
//map.addLayer(ee.Image().paint(BD_paises,1,2), {'palette': 'white','width':1},'Límites Mundiales',true);
legend = ui.Panel({
  style: {
    position: 'bottom-right',
    backgroundColor: 'grey', color: 'white'
  }
});
// Creates Title for legend
legendTitle = ui.Label({
  value: 'SO2 Column Number Density (µmol/m²)',
  style: {fontWeight: 'bold', fontSize: '13px', backgroundColor: 'grey', color: 'white'}
});
legend.add(legendTitle);
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
makeColorBarParams = function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette3,
  };
};
// Creates the color bar for the legend.
colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis3.palette3),
  style: {stretch: 'horizontal', margin: '0px 8px',backgroundColor: 'grey', maxHeight: '20px'},
});
legend.add(colorBar);
// Creates a panel with three numbers for the legend.
legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis3.min, {margin: '4px 8px', fontWeight: 'bold', fontSize: '11px', backgroundColor: 'grey', color: 'white'}),
    ui.Label(
        ((vis3.max + vis3.min) / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal', fontWeight: 'bold', fontSize: '11px',backgroundColor: 'grey', color: 'white'}),
    ui.Label(vis3.max, {margin: '4px 8px', fontWeight: 'bold', fontSize: '11px',backgroundColor: 'grey', color: 'white'})
  ],
  style: {
  backgroundColor: 'grey',
  color: 'white'
  },
  layout: ui.Panel.Layout.flow('horizontal')
});
legend.add(legendLabels);
//map.add(legend)
panel.widgets().set(14, legend);
panel.remove(notesContainer2);
panel.add(notesContainer2);  
}
if (contaminacion === "CH4"){  
map.addLayer(CH4, vis4,  "Nivel de CH4" ,true);
//var BD_paises= ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017");
//map.addLayer(ee.Image().paint(BD_paises,1,2), {'palette': 'white','width':1},'Límites Mundiales',true);
legend = ui.Panel({
  style: {
    position: 'bottom-right',
    backgroundColor: 'grey', color: 'white'
  }
});
// Creates Title for legend
legendTitle = ui.Label({
  value: 'CH4 column volume mixing ratio dry air (ppbV)',
  style: {fontWeight: 'bold', fontSize: '13px', backgroundColor: 'grey', color: 'white'}
});
legend.add(legendTitle);
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
makeColorBarParams = function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette4,
  };
};
// Creates the color bar for the legend.
colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis3.palette3),
  style: {stretch: 'horizontal', margin: '0px 8px',backgroundColor: 'grey', maxHeight: '20px'},
});
legend.add(colorBar);
// Creates a panel with three numbers for the legend.
legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis4.min, {margin: '4px 8px', fontWeight: 'bold', fontSize: '11px', backgroundColor: 'grey', color: 'white'}),
    ui.Label(
        ((vis4.max + vis4.min) / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal', fontWeight: 'bold', fontSize: '11px',backgroundColor: 'grey', color: 'white'}),
    ui.Label(vis4.max, {margin: '4px 8px', fontWeight: 'bold', fontSize: '11px',backgroundColor: 'grey', color: 'white'})
  ],
  style: {
  backgroundColor: 'grey',
  color: 'white'
  },
  layout: ui.Panel.Layout.flow('horizontal')
});
legend.add(legendLabels);
//map.add(legend)
panel.widgets().set(14, legend);
panel.remove(notesContainer2);
panel.add(notesContainer2); 
}
if (contaminacion === "O3"){  
map.addLayer(O3, vis5,  "Nivel de Ozono" ,true);
//var BD_paises= ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017");
//map.addLayer(ee.Image().paint(BD_paises,1,2), {'palette': 'white','width':1},'Límites Mundiales',true);
legend = ui.Panel({
  style: {
    position: 'bottom-right',
    backgroundColor: 'grey', color: 'white'
  }
});
// Creates Title for legend
legendTitle = ui.Label({
  value: 'O3 column number density (mol/m²)',
  style: {fontWeight: 'bold', fontSize: '13px', backgroundColor: 'grey', color: 'white'}
});
legend.add(legendTitle);
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
makeColorBarParams = function makeColorBarParams(palette) {
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
colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis3.palette3),
  style: {stretch: 'horizontal', margin: '0px 8px',backgroundColor: 'grey', maxHeight: '20px'},
});
legend.add(colorBar);
// Creates a panel with three numbers for the legend.
legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis5.min, {margin: '4px 8px', fontWeight: 'bold', fontSize: '11px', backgroundColor: 'grey', color: 'white'}),
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
//map.add(legend)
panel.widgets().set(14, legend);
panel.remove(notesContainer2);
panel.add(notesContainer2); 
}
if (contaminacion === "N/A"){  
}
//Filtros por fecha
var Fecha_inicial=  startDate;//"2019-01-01"
var Fecha_final=    endDate;//"2019-12-31"
//*******************************************PROCESAMIENTO DE VARIABLES********************************************//
//FUNCION PARA ESTIMAR ESTADÍSTICAS
function statistics(imageCollection) {
  var imageName = imageCollection.first().bandNames().getInfo()[0]
  var x = imageCollection.median().rename(imageName+ '_mediana')
  var y = imageCollection.mode().rename(imageName+ '_moda')
  var z = imageCollection.min().rename(imageName+ '_min')
  var a = imageCollection.max().rename(imageName+ '_max')
  var resultado = x.addBands(y).addBands(z).addBands(a).clip(studyarea3)
  return resultado
}
//--------------------------------------------*******************----------------------------------------------//
//********************************************VISUALIZAR PAÍS, PI**********************************************//
//--------------------------------------------*******************----------------------------------------------//
map.addLayer(ee.Image().paint(studyarea,1,1), {'palette': 'DarkBlue'},'Límite País',false);
map.addLayer(ee.Image().paint(studyarea2,1,1), {'palette': 'Yellow'},"Límite" +" "+depa_names,false);
map.addLayer(ee.Image().paint(studyarea3,1,1), {'palette': 'red'},"Límite Comuna"+" "+ muni_names);
map.centerObject(studyarea3);
//-------------------------------------------Construir Gráfico de Serie Temporal----------------------------------------------------//
var Fecha_1 = Fecha_inicial;
var Fecha_2 = Fecha_final;
///////////////////////////////////////////
var AOI = studyarea3.geometry().bounds();
panel2.clear();
addToIntro2();
if (contaminacion ==  "NO2"){
//--------------------------------------------------------Grafico de NO2 general---------------------------------------------//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var start = ee.Date(Fecha_1);
var end = ee.Date(Fecha_2);
var NO2 = sentinel5_NO2;
var modC = NO2.map(function(image) {
  return image.multiply(1e6)
    .copyProperties(image, ['system:time_start'])
    .set({date: image.date().format('yyyy-MM-dd * HH-mm-ss')});
});
// create one image per day
function dailyImages_NO2 (images,startdate,enddate){
   startdate = ee.Date(startdate);
   enddate = ee.Date(enddate);
   var originDate = startdate;
   var count = end.difference(startdate, 'day').round();
   var listOfYear = ee.List.sequence(1, count, 1);
   return ee.ImageCollection(listOfYear.map(function(i){
     i = ee.Number(i);
     var date_start = originDate.advance(i.add(-1), 'day');
     var date_end = originDate.advance(i, 'day');
     var meanImage = images.filterDate(date_start,date_end).mean();
     return meanImage
     .set('system:time_start', date_start.format('yyyy-MM-dd'))
     .set('nbands',meanImage.bandNames().size())
   }));
 }
 var imagePerDay = ee.ImageCollection(dailyImages_CH4 (modC,start,end)).filter(ee.Filter.gt('nbands',0));
print("imagePerDay",imagePerDay)
// a bit more sophisticated, print a chart with median, 5%, 95% over geometry
var timeSeries = imagePerDay.sort('system:time_start').map(function(i) {
  var values = i.select('NO2_column_number_density').reduceRegion({
    reducer: ee.Reducer.minMax().combine({ reducer2: ee.Reducer.median(), sharedInputs: true}), 
    geometry: studyarea3, 
    scale: 5000
  })
  return ee.Feature(null, values)
    .set({ 'system:time_start': i.get('system:time_start') })
})
print(timeSeries)
// evaluate values, convert into a data table and print chart
timeSeries.evaluate(function(ts) {
  var dataTable = {
    cols: [{id: 'x', type: 'date'},
           {id: 'y', type: 'number'},
           {id: 'i0', type: 'number', role: 'interval'},
           {id: 'i1', type: 'number', role: 'interval'}]
  };
  var values = ts.features.map(function(f) {
    var p = f.properties
    return [ new Date(p['system:time_start']), 
    p['NO2_column_number_density_median'], 
    p['NO2_column_number_density_min'], 
    p['NO2_column_number_density_max'] ]
  })
  dataTable.rows = values.map(function(row) {
    return { c: row.map(function(o) { return { v: o } }) }
  })
  var options = {  
      title: 'NO2 Column Number Density (µmol/m²)',  
      curveType:'function',  
      series: [{'color': 'LightSlateGrey'}],  
      intervals: { 'style':'area' },  
      //legend: 'none',  
  };  
  //print(ui.Chart(dataTable, 'LineChart', options));
  var chart = ui.Chart(dataTable, 'LineChart', options);
  //panel2.add(chart);
  panel2.widgets().set(2, chart);
})
//----------------------------------------------------------Generar Histograma---------------------------------------------//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var options = {
  title: 'Histograma de NO2 Column Number Density (µmol/m²)',
  vAxis: {
    title: 'Frequency',is3D: true
  },
  bar: {  
    groupWidth: '80%'  // Eliminate horizontal space between bars.
  },
  legend: {
    position: 'none'
  },
  hAxis: {
    title: 'NO2 Column Number Density (µmol/m²)'  // Hide off-zero vertical axes.
  },
  colors: ['gray'],
};
var Data_NO2 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
  .select('NO2_column_number_density')
  .filterDate(Fecha_1,Fecha_2)
  .filterBounds(studyarea3)
  .mean()
  .multiply(1e6);
var Histograma_NO2=  ui.Chart.image.histogram(Data_NO2, studyarea3, 1000, null, null, 100).setOptions(options);
//----------------------------------------------------Generar Grafico doble---------------------------------------------//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var start = '2019-01-01'
var end = '2021-12-01'
var collectionNO2 = sentinel5_NO2.select('NO2_column_number_density')
                   .filterDate(start,end)
                   .filter(ee.Filter.calendarRange(60, 364, 'day_of_year'));
var collectionNO2Chart = ui.Chart.image.doySeriesByYear(collectionNO2, 'NO2_column_number_density', studyarea3, ee.Reducer.min(),500);
// Customize the chart.
 collectionNO2Chart.setOptions({
    title: 'Calidad del Aire: NO2 Column Number Density (mol/m²)',
    vAxis: {title: 'NO2 Column Number Density (mol/m²)'},
    hAxis: {title: 'Días del Año', /*format: 'MMM-YY',*/ gridlines: {count: 2}},
    curveType:'function',
    series: {
    0: { pointSize: 2, lineWidth: 1, color: 'LightBlue' },
    1: { pointSize: 2, lineWidth: 1, color: 'grey' }
  },
    legend: {position: 'right'},
  });
//----------------------------------------------------Grafico de Población vs NO2-----------------------------------------//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// The GHSL global population density dataset for 2015.
var ghslPop = ee.Image('JRC/GHSL/P2016/POP_GPW_GLOBE_V1/2015');
var Data_NO2 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_NO2")
var filtered = Data_NO2.filterBounds(studyarea3)
.filterDate(Fecha_1,Fecha_2)
.map(function(image){return image.clip(studyarea3)});
var NO2 = filtered.select("tropospheric_NO2_column_number_density").mean().multiply(1e6);
// combine two images
var image = ghslPop.addBands(NO2)
// sample N points from the 2-band image
var scale = Map.getScale()
var values = image.sample({ region: studyarea3, scale: scale, numPixels: 2000, geometries: true}) 
var chart_Pob_NO2 = ui.Chart.feature.byFeature(values, 'population_count', ['tropospheric_NO2_column_number_density'])
  .setChartType('ScatterChart')
  .setOptions({ pointSize: 2, pointColor: 'red', width: 500, height: 500, titleX: 'Densidad Poblacional, [m]', titleY: 'tropospheric_NO2_column_number_density (µmol/m²)' })
//print(chart);
var imageSelect = ui.Label({value: "Cargando...."});
panel2.widgets().set(4, imageSelect);
panel2.widgets().set(5, Histograma_NO2);
panel2.widgets().set(6, collectionNO2Chart);
panel2.widgets().set(7, chart_Pob_NO2);
}
if (contaminacion ==  "SO2"){
//--------------------------------------------------------Grafico de SO2 general---------------------------------------------//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var start = ee.Date(Fecha_1);
var end = ee.Date(Fecha_2);
var SO2 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_SO2");
var modL = SO2.filterDate(start,end).select('SO2_column_number_density');
var modC = modL.map(function(image) {
  return image.multiply(1e6)
    .copyProperties(image, ['system:time_start'])
    .set({date: image.date().format('yyyy-MM-dd * HH-mm-ss')});
});
// create one image per day
function dailyImages_SO2 (images,startdate,enddate){
   startdate = ee.Date(startdate);
   enddate = ee.Date(enddate);
   var originDate = startdate;
   var count = end.difference(startdate, 'day').round();
   var listOfYear = ee.List.sequence(1, count, 1);
   return ee.ImageCollection(listOfYear.map(function(i){
     i = ee.Number(i);
     var date_start = originDate.advance(i.add(-1), 'day');
     var date_end = originDate.advance(i, 'day');
     var meanImage = images.filterDate(date_start,date_end).mean();
     return meanImage
     .set('system:time_start', date_start.format('yyyy-MM-dd'))
     .set('nbands',meanImage.bandNames().size())
   }));
 }
 var imagePerDay = ee.ImageCollection(dailyImages_CH4 (modC,start,end)).filter(ee.Filter.gt('nbands',0));
print("imagePerDay",imagePerDay)
// a bit more sophisticated, print a chart with median, 5%, 95% over geometry
var timeSeries = imagePerDay.sort('system:time_start').map(function(i) {
  var values = i.select('SO2_column_number_density').reduceRegion({
    reducer: ee.Reducer.minMax().combine({ reducer2: ee.Reducer.median(), sharedInputs: true}), 
    geometry: studyarea3, 
    scale: 5000
  })
  return ee.Feature(null, values)
    .set({ 'system:time_start': i.get('system:time_start') })
})
print(timeSeries)
// evaluate values, convert into a data table and print chart
timeSeries.evaluate(function(ts) {
  var dataTable = {
    cols: [{id: 'x', type: 'date'},
           {id: 'y', type: 'number'},
           {id: 'i0', type: 'number', role: 'interval'},
           {id: 'i1', type: 'number', role: 'interval'}]
  };
  var values = ts.features.map(function(f) {
    var p = f.properties
    return [ new Date(p['system:time_start']), 
    p['SO2_column_number_density_median'], 
    p['SO2_column_number_density_min'], 
    p['SO2_column_number_density_max'] ]
  })
  dataTable.rows = values.map(function(row) {
    return { c: row.map(function(o) { return { v: o } }) }
  })
  var options = {  
      title: 'SO2 Column Number Density (µmol/m²)',  
      curveType:'function',  
      series: [{'color': 'LightSlateGrey'}],  
      intervals: { 'style':'area' },  
      //legend: 'none',  
  };  
  //print(ui.Chart(dataTable, 'LineChart', options));
  var chart = ui.Chart(dataTable, 'LineChart', options);
  //panel2.add(chart);
  panel2.widgets().set(2, chart);
})
//----------------------------------------------------------Generar Histograma---------------------------------------------//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var options = {
  title: 'Histograma de SO2 Column Number Density (µmol/m²)',
  vAxis: {
    title: 'Frequency',is3D: true
  },
  bar: {  
    groupWidth: '80%'  // Eliminate horizontal space between bars.
  },
  legend: {
    position: 'none'
  },
  hAxis: {
    title: 'SO2 Column Number Density (µmol/m²)'  // Hide off-zero vertical axes.
  },
  colors: ['gray'],
};
var Data_SO2 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_SO2')
  .select('SO2_column_number_density')
  .filterDate(Fecha_1,Fecha_2)
  .filterBounds(studyarea3)
  .mean()
  .multiply(1e6);
var Histograma_SO2=  ui.Chart.image.histogram(Data_SO2, studyarea3, 1000, null, null, null).setOptions(options);
//----------------------------------------------------Generar Grafico doble---------------------------------------------//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var start = '2019-01-01'
var end = '2021-12-01'
var collectionSO2 = CO.select('SO2_column_number_density')
                   .filterDate(start,end)
                   .filter(ee.Filter.calendarRange(60, 364, 'day_of_year'));
var collectionSO2Chart = ui.Chart.image.doySeriesByYear(collectionSO2, 'SO2_column_number_density', studyarea3, ee.Reducer.mean(),500);
// Customize the chart.
 collectionSO2Chart.setOptions({
    title: 'Calidad del Aire: SO2 Column Number Density (mol/m²)',
    vAxis: {title: 'SO2 Column Number Density (mol/m²)'},
    hAxis: {title: 'Días del Año', /*format: 'MMM-YY',*/ gridlines: {count: 2}},
    curveType:'function',
    series: {
    0: { pointSize: 2, lineWidth: 1, color: 'LightBlue' },
    1: { pointSize: 2, lineWidth: 1, color: 'grey' }
  },
    legend: {position: 'right'},
  });
//----------------------------------------------------Grafico de Población vs SO2-----------------------------------------//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// The GHSL global population density dataset for 2015.
var ghslPop = ee.Image('JRC/GHSL/P2016/POP_GPW_GLOBE_V1/2015');
var Data_SO2 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_SO2")
var filtered = Data_SO2.filterBounds(studyarea3)
.filterDate(Fecha_1,Fecha_2)
.map(function(image){return image.clip(studyarea3)});
var SO2 = filtered.select("SO2_column_number_density").mean().multiply(1e6);
// combine two images
var image = ghslPop.addBands(SO2)
// sample N points from the 2-band image
var scale = Map.getScale()
var values = image.sample({ region: studyarea3, scale: scale, numPixels: 2000, geometries: true}) 
var chart_Pob_SO2 = ui.Chart.feature.byFeature(values, 'population_count', ['SO2_column_number_density'])
  .setChartType('ScatterChart')
  .setOptions({ 
    pointSize: 2, 
    pointColor: 'red', 
    width: 500, 
    height: 500, 
    titleX: 'Densidad Poblacional, [m]', 
    titleY: 'SO2_column_number_density (µmol/m²)' })
//print(chart);
var imageSelect = ui.Label({value: "Cargando...."});
panel2.widgets().set(4, imageSelect);
panel2.widgets().set(5, Histograma_SO2);
panel2.widgets().set(6, collectionSO2Chart);
panel2.widgets().set(7, chart_Pob_SO2);
}
if (contaminacion ==  "CO") {
//--------------------------------------------------------Grafico de CO general---------------------------------------------//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var start = ee.Date(Fecha_1);
var end = ee.Date(Fecha_2);
var CO = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO");
var modL = CO.filterDate(start,end).select('CO_column_number_density');
var modC = modL.map(function(image) {
  return image//.multiply(1e6)
    .copyProperties(image, ['system:time_start'])
    .set({date: image.date().format('yyyy-MM-dd * HH-mm-ss')});
});
// create one image per day
function dailyImages (images,startdate,enddate){
   startdate = ee.Date(startdate);
   enddate = ee.Date(enddate);
   var originDate = startdate;
   var count = end.difference(startdate, 'day').round();
   var listOfYear = ee.List.sequence(1, count, 1);
   return ee.ImageCollection(listOfYear.map(function(i){
     i = ee.Number(i);
     var date_start = originDate.advance(i.add(-1), 'day');
     var date_end = originDate.advance(i, 'day');
     var meanImage = images.filterDate(date_start,date_end).mean();
     return meanImage
     .set('system:time_start', date_start.format('yyyy-MM-dd'))
     .set('nbands',meanImage.bandNames().size())
   }));
 }
 var imagePerDay = ee.ImageCollection(dailyImages_CH4 (modC,start,end)).filter(ee.Filter.gt('nbands',0));
print("imagePerDay",imagePerDay)
// a bit more sophisticated, print a chart with median, 5%, 95% over geometry
var timeSeries = imagePerDay.sort('system:time_start').map(function(i) {
  var values = i.select('CO_column_number_density').reduceRegion({
    reducer: ee.Reducer.minMax().combine({ reducer2: ee.Reducer.median(), sharedInputs: true}), 
    geometry: studyarea3, 
    scale: 5000
  })
  return ee.Feature(null, values)
    .set({ 'system:time_start': i.get('system:time_start') })
})
print(timeSeries)
// evaluate values, convert into a data table and print chart
timeSeries.evaluate(function(ts) {
  var dataTable = {
    cols: [{id: 'x', type: 'date'},
           {id: 'y', type: 'number'},
           {id: 'i0', type: 'number', role: 'interval'},
           {id: 'i1', type: 'number', role: 'interval'}]
  };
  var values = ts.features.map(function(f) {
    var p = f.properties
    return [ new Date(p['system:time_start']), 
    p['CO_column_number_density_median'], 
    p['CO_column_number_density_min'], 
    p['CO_column_number_density_max'] ]
  })
  dataTable.rows = values.map(function(row) {
    return { c: row.map(function(o) { return { v: o } }) }
  })
  var options = {  
      title: 'CO Column Number Density (mol/m²)',  
      curveType:'function',  
      series: [{'color': 'LightSlateGrey'}],  
      intervals: { 'style':'area' },  
      //legend: 'none',  
  };  
  //print(ui.Chart(dataTable, 'LineChart', options));
  var chart = ui.Chart(dataTable, 'LineChart', options);
  //panel2.add(chart);
  panel2.widgets().set(2, chart);
})
//----------------------------------------------------------Generar Histograma---------------------------------------------//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var options = {
  title: 'Histograma de CO Column Number Density (mol/m²)',
  vAxis: {
    title: 'Frequency',is3D: true
  },
  bar: {  
    groupWidth: '80%'  // Eliminate horizontal space between bars.
  },
  legend: {
    position: 'none'
  },
  hAxis: {
    title: 'CO Column Number Density (mol/m²)'  // Hide off-zero vertical axes.
  },
  colors: ['gray'],
};
var Data_CO = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_CO')
  .select('CO_column_number_density')
  .filterDate(Fecha_1,Fecha_2)
  .filterBounds(studyarea3)
  .mean()
  //.multiply(1e6);
var Histograma_CO=  ui.Chart.image.histogram(Data_CO, studyarea3, 1000, null, null, null).setOptions(options);
//----------------------------------------------------Generar Grafico doble---------------------------------------------//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var start = '2019-01-01'
var end = '2021-12-01'
var collectionCO = sentinel5_CO.select('CO_column_number_density')
                   .filterDate(start,end)
                   .filter(ee.Filter.calendarRange(60, 364, 'day_of_year'));
var collectionCOChart = ui.Chart.image.doySeriesByYear(collectionCO, 'CO_column_number_density', studyarea3, ee.Reducer.mean(),500);
// Customize the chart.
 collectionCOChart.setOptions({
    title: 'Calidad del Aire: CO Column Number Density (mol/m²)',
    vAxis: {title: 'CO Column Number Density (mol/m²)'},
    hAxis: {title: 'Días del Año', /*format: 'MMM-YY',*/ gridlines: {count: 2}},
    curveType:'function',
    series: {
    0: { pointSize: 2, lineWidth: 1, color: 'LightBlue' },
    1: { pointSize: 2, lineWidth: 1, color: 'grey' }
  },
    legend: {position: 'right'},
  });
//----------------------------------------------------Grafico de Población vs CO-----------------------------------------//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// The GHSL global population density dataset for 2015.
var ghslPop = ee.Image('JRC/GHSL/P2016/POP_GPW_GLOBE_V1/2015');
var Data_CO = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO")
var filtered = Data_CO.filterBounds(studyarea3)
.filterDate(Fecha_1,Fecha_2)
.map(function(image){return image.clip(studyarea3)});
var CO = filtered.select("CO_column_number_density").mean()//.multiply(1e6);
// combine two images
var image = ghslPop.addBands(CO)
// sample N points from the 2-band image
var scale = Map.getScale()
var values = image.sample({ region: studyarea3, scale: scale, numPixels: 2000, geometries: true}) 
var chart_Pob_CO = ui.Chart.feature.byFeature(values, 'population_count', ['CO_column_number_density'])
  .setChartType('ScatterChart')
  .setOptions({ 
    pointSize: 2, 
    pointColor: 'red', 
    width: 500, 
    height: 500, 
    titleX: 'Densidad Poblacional, [m]', 
    titleY: 'CO_column_number_density (mol/m²)' })
//print(chart);
var imageSelect = ui.Label({value: "Cargando...."});
panel2.widgets().set(4, imageSelect);
panel2.widgets().set(5, Histograma_CO);
panel2.widgets().set(6, collectionCOChart);
panel2.widgets().set(7, chart_Pob_CO);
}
if (contaminacion == "CH4") {
//--------------------------------------------------------Grafico de CH4 general---------------------------------------------//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Collection
var CH4 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_CH4");
var studyarea3 = studyarea3;
print(studyarea3)
//Date
var start = ee.Date(Fecha_1);
var end = ee.Date(Fecha_2);
//var dateRange = ee.DateRange(start, start.advance(3, 'month'));
print("Date Tes",start,end)
//Filter Collection
var modL = CH4.filterBounds(studyarea3)
              .filterDate(start,end)
              .select('CH4_column_volume_mixing_ratio_dry_air');
print("Collection Tes",modL)
var modC = modL.map(function(image) {
  return image//.multiply(1e6)
    .copyProperties(image, ['system:time_start'])
    .set({date: image.date().format('yyyy-MM-dd * HH-mm-ss')});
});
// create one image per day
function dailyImages_CH4 (images,startdate,enddate){
   startdate = ee.Date(startdate);
   enddate = ee.Date(enddate);
   var originDate = startdate;
   var count = end.difference(startdate, 'day').round();
   var listOfYear = ee.List.sequence(1, count, 1);
   return ee.ImageCollection(listOfYear.map(function(i){
     i = ee.Number(i);
     var date_start = originDate.advance(i.add(-1), 'day');
     var date_end = originDate.advance(i, 'day');
     var meanImage = images.filterDate(date_start,date_end).mean();
     return meanImage
     .set('system:time_start', date_start.format('yyyy-MM-dd'))
     .set('nbands',meanImage.bandNames().size())
   }));
 }
 var imagePerDay = ee.ImageCollection(dailyImages_CH4 (modC,start,end)).filter(ee.Filter.gt('nbands',0));
print("imagePerDay",imagePerDay)
// a bit more sophisticated, print a chart with median, 5%, 95% over geometry
var timeSeries = imagePerDay.sort('system:time_start').map(function(i) {
  var values = i.select('CH4_column_volume_mixing_ratio_dry_air').reduceRegion({
    reducer: ee.Reducer.minMax().combine({ reducer2: ee.Reducer.median(), sharedInputs: true}), 
    geometry: studyarea3, 
    scale: 5000,
    bestEffort: true,
    tileScale :16
  })
  return ee.Feature(null, values)
    .set({ 'system:time_start': i.get('system:time_start') })
})
print("TimeSeries",timeSeries)
// evaluate values, convert into a data table and print chart
var timeSeries= timeSeries.evaluate(function(ts) {
  var dataTable = {
    cols: [{id: 'x', type: 'date'},
           {id: 'y', type: 'number'},
           {id: 'i0', type: 'number', role: 'interval'},
           {id: 'i1', type: 'number', role: 'interval'}]
  };
  var values = ts.features.map(function(f) {
    var p = f.properties
    return [ new Date(p['system:time_start']), 
    p['CH4_column_volume_mixing_ratio_dry_air_median'], 
    p['CH4_column_volume_mixing_ratio_dry_air_min'], 
    p['CH4_column_volume_mixing_ratio_dry_air_max'] ]
  })
  dataTable.rows = values.map(function(row) {
    return { c: row.map(function(o) { return { v: o } }) }
  })
  var options = {  
      title: 'CH4_column_volume_mixing_ratio_dry_air',  
      curveType:'function',  
      series: [{'color': 'LightSlateGrey'}],  
      intervals: { 'style':'area' },  
      //legend: 'none',  
  };  
  //print(ui.Chart(dataTable, 'LineChart', options));
  var chart = ui.Chart(dataTable, 'LineChart', options);
  panel2.widgets().set(2, chart);
})
//----------------------------------------------------------Generar Histograma---------------------------------------------//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var options = {
  title: 'Histograma de CH4_column_volume_mixing_ratio_dry_air (ppbV)',
  vAxis: {
    title: 'Frequency',is3D: true
  },
  bar: {  
    groupWidth: '80%'  // Eliminate horizontal space between bars.
  },
  legend: {
    position: 'none'
  },
  hAxis: {
    title: 'CH4_column_volume_mixing_ratio_dry_air (ppbV)'  // Hide off-zero vertical axes.
  },
  colors: ['gray'],
};
var Data_CH4 = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_CH4')
  .select('CH4_column_volume_mixing_ratio_dry_air')
  .filterDate(Fecha_1,Fecha_2)
  .filterBounds(studyarea3)
  .mean()
  //.multiply(1e6);
var Histograma_CH4=  ui.Chart.image.histogram(Data_CH4, studyarea3, 1000, null, null, null).setOptions(options);
//----------------------------------------------------Generar Grafico doble---------------------------------------------//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var start = '2020-01-01'
var end = '2021-12-01'
var collectionCH4 = sentinel5_CH4.select('CH4_column_volume_mixing_ratio_dry_air')
                   .filterDate(start,end)
                   .filter(ee.Filter.calendarRange(60, 364, 'day_of_year'));
var collectionCH4Chart = ui.Chart.image.doySeriesByYear(collectionCH4, 'CH4_column_volume_mixing_ratio_dry_air', studyarea3, ee.Reducer.mean(),500);
// Customize the chart.
 collectionCH4Chart.setOptions({
    title: 'Calidad del Aire: CH4_column_volume_mixing_ratio_dry_air (ppbV)',
    vAxis: {title: 'CH4_column_volume_mixing_ratio_dry_air (ppbV)'},
    hAxis: {title: 'Días del Año', /*format: 'MMM-YY',*/ gridlines: {count: 2}},
    curveType:'function',
    series: {
    0: { pointSize: 2, lineWidth: 1, color: 'LightBlue' },
    1: { pointSize: 2, lineWidth: 1, color: 'grey' }
  },
    legend: {position: 'right'},
  });
//----------------------------------------------------Grafico de Población vs CH4-----------------------------------------//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// The GHSL global population density dataset for 2015.
var ghslPop = ee.Image('JRC/GHSL/P2016/POP_GPW_GLOBE_V1/2015');
var Data_CH4 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_CH4")
var filtered = Data_CH4.filterBounds(studyarea3)
.filterDate(Fecha_1,Fecha_2)
.map(function(image){return image.clip(studyarea3)});
var CH4 = filtered.select("CH4_column_volume_mixing_ratio_dry_air").mean()//.multiply(1e6);
// combine two images
var image = ghslPop.addBands(CH4)
// sample N points from the 2-band image
var scale = Map.getScale()
var values = image.sample({ region: studyarea3, scale: scale, numPixels: 2000, geometries: true}) 
var chart_Pob_CH4 = ui.Chart.feature.byFeature(values, 'population_count', ['CH4_column_volume_mixing_ratio_dry_air'])
  .setChartType('ScatterChart')
  .setOptions({ 
    pointSize: 2, 
    pointColor: 'red', 
    width: 500, 
    height: 500, 
    titleX: 'Densidad Poblacional, [m]', 
    titleY: 'CH4_column_volume_mixing_ratio_dry_air (ppbV)' })
//print(chart);
var imageSelect = ui.Label({value: "Cargando...."});
panel2.widgets().set(4, imageSelect);
panel2.widgets().set(5, Histograma_CH4);
panel2.widgets().set(6, collectionCH4Chart);
panel2.widgets().set(7, chart_Pob_CH4);
}
if (contaminacion ==  "O3") {
//--------------------------------------------------------Grafico de O3 general---------------------------------------------//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var start = ee.Date(Fecha_1);
var end = ee.Date(Fecha_2);
var O3 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_O3");
var modL = O3.filterDate(start,end).select('O3_column_number_density');
var modC = modL.map(function(image) {
  return image//.multiply(1e6)
    .copyProperties(image, ['system:time_start'])
    .set({date: image.date().format('yyyy-MM-dd * HH-mm-ss')});
});
// create one image per day
function dailyImages (images,startdate,enddate){
   startdate = ee.Date(startdate);
   enddate = ee.Date(enddate);
   var originDate = startdate;
   var count = end.difference(startdate, 'day').round();
   var listOfYear = ee.List.sequence(1, count, 1);
   return ee.ImageCollection(listOfYear.map(function(i){
     i = ee.Number(i);
     var date_start = originDate.advance(i.add(-1), 'day');
     var date_end = originDate.advance(i, 'day');
     var meanImage = images.filterDate(date_start,date_end).mean();
     return meanImage
     .set('system:time_start', date_start.format('yyyy-MM-dd'))
     .set('nbands',meanImage.bandNames().size())
   }));
 }
 var imagePerDay = ee.ImageCollection(dailyImages_CH4 (modC,start,end)).filter(ee.Filter.gt('nbands',0));
print("imagePerDay",imagePerDay)
// a bit more sophisticated, print a chart with median, 5%, 95% over geometry
var timeSeries = imagePerDay.sort('system:time_start').map(function(i) {
  var values = i.select('O3_column_number_density').reduceRegion({
    reducer: ee.Reducer.minMax().combine({ reducer2: ee.Reducer.median(), sharedInputs: true}), 
    geometry: studyarea3, 
    scale: 5000
  })
  return ee.Feature(null, values)
    .set({ 'system:time_start': i.get('system:time_start') })
})
print(timeSeries)
// evaluate values, convert into a data table and print chart
timeSeries.evaluate(function(ts) {
  var dataTable = {
    cols: [{id: 'x', type: 'date'},
           {id: 'y', type: 'number'},
           {id: 'i0', type: 'number', role: 'interval'},
           {id: 'i1', type: 'number', role: 'interval'}]
  };
  var values = ts.features.map(function(f) {
    var p = f.properties
    return [ new Date(p['system:time_start']), 
    p['O3_column_number_density_median'], 
    p['O3_column_number_density_min'], 
    p['O3_column_number_density_max'] ]
  })
  dataTable.rows = values.map(function(row) {
    return { c: row.map(function(o) { return { v: o } }) }
  })
  var options = {  
      title: 'O3 Column Number Density (mol/m²)',  
      curveType:'function',  
      series: [{'color': 'LightSlateGrey'}],  
      intervals: { 'style':'area' },  
      //legend: 'none',  
  };  
  //print(ui.Chart(dataTable, 'LineChart', options));
  var chart = ui.Chart(dataTable, 'LineChart', options);
  //panel2.add(chart);
  panel2.widgets().set(2, chart);
})
//----------------------------------------------------------Generar Histograma---------------------------------------------//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var options = {
  title: 'Histograma de O3 Column Number Density (mol/m²)',
  vAxis: {
    title: 'Frequency',is3D: true
  },
  bar: {  
    groupWidth: '80%'  // Eliminate horizontal space between bars.
  },
  legend: {
    position: 'none'
  },
  hAxis: {
    title: 'O3 Column Number Density (mol/m²)'  // Hide off-zero vertical axes.
  },
  colors: ['gray'],
};
var Data_O3 = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_O3')
  .select('O3_column_number_density')
  .filterDate(Fecha_1,Fecha_2)
  .filterBounds(studyarea3)
  .mean()
  //.multiply(1e6);
var Histograma_O3=  ui.Chart.image.histogram(Data_O3, studyarea3, 1000, null, null, null).setOptions(options);
//----------------------------------------------------Generar Grafico doble---------------------------------------------//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var start = '2020-01-01'
var end = '2021-12-01'
var collectionO3 = sentinel5_O3.select('O3_column_number_density')
                   .filterDate(start,end)
                   .filter(ee.Filter.calendarRange(60, 364, 'day_of_year'));
var collectionO3Chart = ui.Chart.image.doySeriesByYear(collectionO3, 'O3_column_number_density', studyarea3, ee.Reducer.mean(),500);
// Customize the chart.
 collectionO3Chart.setOptions({
    title: 'Calidad del Aire: O3 Column Number Density (mol/m²)',
    vAxis: {title: 'O3 Column Number Density (mol/m²)'},
    hAxis: {title: 'Días del Año', /*format: 'MMM-YY',*/ gridlines: {count: 2}},
    curveType:'function',
    series: {
    0: { pointSize: 2, lineWidth: 1, color: 'LightBlue' },
    1: { pointSize: 2, lineWidth: 1, color: 'grey' }
  },
    legend: {position: 'right'},
  });
//----------------------------------------------------Grafico de Población vs CO-----------------------------------------//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// The GHSL global population density dataset for 2015.
var ghslPop = ee.Image('JRC/GHSL/P2016/POP_GPW_GLOBE_V1/2015');
var Data_O3 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_O3")
var filtered = Data_O3.filterBounds(studyarea3)
.filterDate(Fecha_1,Fecha_2)
.map(function(image){return image.clip(studyarea3)});
var O3 = filtered.select("O3_column_number_density").mean()//.multiply(1e6);
// combine two images
var image = ghslPop.addBands(O3)
// sample N points from the 2-band image
var scale = Map.getScale()
var values = image.sample({ region: studyarea3, scale: scale, numPixels: 2000, geometries: true}) 
var chart_Pob_O3 = ui.Chart.feature.byFeature(values, 'population_count', ['O3_column_number_density'])
  .setChartType('ScatterChart')
  .setOptions({ 
    pointSize: 2, 
    pointColor: 'red', 
    width: 500, 
    height: 500, 
    titleX: 'Densidad Poblacional, [m]', 
    titleY: 'O3_column_number_density (mol/m²)' })
//print(chart);
var imageSelect = ui.Label({value: "Cargando...."});
panel2.widgets().set(4, imageSelect);
panel2.widgets().set(5, Histograma_O3);
panel2.widgets().set(6, collectionO3Chart);
panel2.widgets().set(7, chart_Pob_O3);
}
//Panel inferior
lowerPanel.clear();
lowerPanel.add(ui.Label("Estadísticas: Dar clic en el mapa y espere a cargue los datos"));
//Gráficas Dinámicas
var drawingTools = map.drawingTools();
drawingTools.setShown(true);
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
}
var dummyGeometry =
    ui.Map.GeometryLayer({geometries: null, name: 'Poli', color: '23cba7'});
function clearGeometry() {
  var layers = drawingTools.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
function drawRectangle() {
  clearGeometry();
  drawingTools.setShape('rectangle');
  drawingTools.draw();
}
function drawPolygon() {
  clearGeometry();
  drawingTools.setShape('polygon');
  drawingTools.draw();
}
function drawPoint() {
  clearGeometry();
  drawingTools.setShape('point');
  drawingTools.draw();
}
drawingTools.layers().add(dummyGeometry);
var chartPanel = ui.Panel({
  style:
      {height: '235px', width: '600px', position: 'bottom-right', shown: false}
});
function Graficas_dinamicas() {
  // Make the chart panel visible the first time a geometry is drawn.
  if (!chartPanel.style().get('shown')) {
    chartPanel.style().set('shown', true);
  }
  // Get the drawn geometry; it will define the reduction region.
  var point = drawingTools.layers().get(0).getEeObject();
  // Set the drawing mode back to null; turns drawing off.
  drawingTools.setShape(null);
  // Reduction scale is based on map scale to avoid memory/timeout errors.
  var mapScale = map.getScale();
  var scale = mapScale > 5000 ? mapScale * 2 : 5000;
if (contaminacion === "NO2"){ 
var NO2 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2");
var start = ee.Date(Fecha_1);
var end = ee.Date(Fecha_2);
//var dateRange = ee.DateRange(start, start.advance(3, 'month'));
var modL = NO2.filterDate(start,end).select('NO2_column_number_density');
//var modL = NO2.filterDate(dateRange).select('NO2_column_number_density');
var modC = modL.map(function(image) {
  return image.multiply(1e6)
    .copyProperties(image, ['system:time_start'])
    .set({date: image.date().format('yyyy-MM-dd * HH-mm-ss')});
});
// create one image per day
function dailyImages (images,startdate,enddate){
   startdate = ee.Date(startdate);
   enddate = ee.Date(enddate);
   var originDate = startdate;
   var count = end.difference(startdate, 'day').round();
   var listOfYear = ee.List.sequence(1, count, 1);
   return ee.ImageCollection(listOfYear.map(function(i){
     i = ee.Number(i);
     var date_start = originDate.advance(i.add(-1), 'day');
     var date_end = originDate.advance(i, 'day');
     var meanImage = images.filterDate(date_start,date_end).mean();
     return meanImage
     .set('system:time_start', date_start.format('yyyy-MM-dd'))
   }));
 }
 var imagePerDay = ee.ImageCollection(dailyImages (modC,start,end));
 print(imagePerDay)
// Chart the time-series
var Chart_NO2 = ui.Chart.image.series({
  imageCollection: imagePerDay,
  region: point,
  reducer: ee.Reducer.mean(),
  scale:1000,
   xProperty: 'system:time_start'})
  .setChartType('LineChart')
  .setOptions({
    title: 'Movimiento medio de la densidad de columnas verticales de NO2 a nivel del suelo',
    crosshair: { trigger: "both", orientation: "both" },
    trendlines: { 0: {type:'polynomial', showR2: true, lineWidth:1, pointSize: 0, color:'orange', visibleInLegend: true}},
    curveType: 'function',
    fontName:'Century Gothic',
    lineWidth: 0.7,
    // pointSize: 1,
     series: { 0: {color: 'DeepPink'}},
     vAxis : {title : 'NO2 Column Number Density (µmol/m²)'},
     hAxis : {title : 'Date'},
  });
lowerPanel.widgets().reset([Chart_NO2]); 
}
if (contaminacion === "SO2"){ 
var SO2 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_SO2");
var start = ee.Date(Fecha_1);
var end = ee.Date(Fecha_2);
//var dateRange = ee.DateRange(start, start.advance(3, 'month'));
var modL = SO2.filterDate(start,end).select('SO2_column_number_density');
var modC = modL.map(function(image) {
  return image.multiply(1e6)
    .copyProperties(image, ['system:time_start'])
    .set({date: image.date().format('yyyy-MM-dd * HH-mm-ss')});
});
// create one image per day
function dailyImages (images,startdate,enddate){
   startdate = ee.Date(startdate);
   enddate = ee.Date(enddate);
   var originDate = startdate;
   var count = end.difference(startdate, 'day').round();
   var listOfYear = ee.List.sequence(1, count, 1);
   return ee.ImageCollection(listOfYear.map(function(i){
     i = ee.Number(i);
     var date_start = originDate.advance(i.add(-1), 'day');
     var date_end = originDate.advance(i, 'day');
     var meanImage = images.filterDate(date_start,date_end).mean();
     return meanImage
     .set('system:time_start', date_start.format('MMM-YY'))
   }));
 }
 var imagePerDay = ee.ImageCollection(dailyImages (modC,start,end));
 print(imagePerDay)
// Chart the time-series
var Chart_SO2 = ui.Chart.image.series({
  imageCollection: imagePerDay,
  region: point,
  reducer: ee.Reducer.mean(),
  scale:1000,
   xProperty: 'system:time_start'})
  .setOptions({
    title: 'Movimiento medio de la densidad de columnas verticales de SO2 a nivel del suelo',
    curveType:'function',
    hAxis : {title : 'Date'},
    lineWidth : 1,
    colors: ['SlateGray'],
    //pointSize : 3 ,
    //trend_no2 : {1:{color:'DeepPink'}},
     vAxis : {title : 'SO2 (µmol/m²)'}});
lowerPanel.widgets().reset([Chart_SO2]); 
} 
if (contaminacion === "CO") { 
var CO = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO");
var start = ee.Date(Fecha_1);
var end = ee.Date(Fecha_2);
//var dateRange = ee.DateRange(start, start.advance(3, 'month'));
var modL = CO.filterDate(start,end).select('CO_column_number_density');
var modC = modL.map(function(image) {
  return image//.multiply(1e6)
    .copyProperties(image, ['system:time_start'])
    .set({date: image.date().format('yyyy-MM-dd * HH-mm-ss')});
});
// create one image per day
function dailyImages (images,startdate,enddate){
   startdate = ee.Date(startdate);
   enddate = ee.Date(enddate);
   var originDate = startdate;
   var count = end.difference(startdate, 'day').round();
   var listOfYear = ee.List.sequence(1, count, 1);
   return ee.ImageCollection(listOfYear.map(function(i){
     i = ee.Number(i);
     var date_start = originDate.advance(i.add(-1), 'day');
     var date_end = originDate.advance(i, 'day');
     var meanImage = images.filterDate(date_start,date_end).mean();
     return meanImage
     .set('system:time_start', date_start.format('MMM-YY'))
   }));
 }
 var imagePerDay = ee.ImageCollection(dailyImages (modC,start,end));
 print(imagePerDay)
// Chart the time-series
var Chart_CO = ui.Chart.image.series({
  imageCollection: imagePerDay,
  region: point,
  reducer: ee.Reducer.mean(),
  scale:1000,
   xProperty: 'system:time_start'})
  .setOptions({
    title: 'Movimiento medio de la densidad de columnas verticales de CO a nivel del suelo',
    curveType:'function',
    hAxis : {title : 'Date'},
    lineWidth : 1,
    colors: ['Chartreuse'],
    //pointSize : 3 ,
    //trend_no2 : {1:{color:'DeepPink'}},
     vAxis : {title : 'CO (mol/m²)'}});
lowerPanel.widgets().reset([Chart_CO]); 
}
if (contaminacion === "CH4") { 
var CH4 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_CH4");
var start = ee.Date(Fecha_1);
var end = ee.Date(Fecha_2);
//var dateRange = ee.DateRange(start, start.advance(3, 'month'));
var modL = CH4.filterDate(start,end).select('CH4_column_volume_mixing_ratio_dry_air');
var modC = modL.map(function(image) {
  return image//.multiply(1e6)
    .copyProperties(image, ['system:time_start'])
    .set({date: image.date().format('yyyy-MM-dd * HH-mm-ss')});
});
// create one image per day
function dailyImages (images,startdate,enddate){
   startdate = ee.Date(startdate);
   enddate = ee.Date(enddate);
   var originDate = startdate;
   var count = end.difference(startdate, 'day').round();
   var listOfYear = ee.List.sequence(1, count, 1);
   return ee.ImageCollection(listOfYear.map(function(i){
     i = ee.Number(i);
     var date_start = originDate.advance(i.add(-1), 'day');
     var date_end = originDate.advance(i, 'day');
     var meanImage = images.filterDate(date_start,date_end).mean();
     return meanImage
     .set('system:time_start', date_start.format('MMM-YY'))
   }));
 }
 var imagePerDay = ee.ImageCollection(dailyImages (modC,start,end));
 print(imagePerDay)
// Chart the time-series
var Chart_CH4 = ui.Chart.image.series({
  imageCollection: imagePerDay,
  region: point,
  reducer: ee.Reducer.mean(),
  scale:1000,
   xProperty: 'system:time_start'})
  .setOptions({
    title: 'Movimiento medio de la densidad de columnas verticales de CH4 a nivel del suelo',
    curveType:'function',
    hAxis : {title : 'Date'},
    lineWidth : 1,
    colors: ['MediumOrchid'],
    //pointSize : 3 ,
    //trend_no2 : {1:{color:'DeepPink'}},
     vAxis : {title : 'CH4 (ppbV)'}});
lowerPanel.widgets().reset([Chart_CH4]); 
}
if (contaminacion === "O3") { 
var O3 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_O3");
var start = ee.Date(Fecha_1);
var end = ee.Date(Fecha_2);
//var dateRange = ee.DateRange(start, start.advance(3, 'month'));
var modL = O3.filterDate(start,end).select('O3_column_number_density');
var modC = modL.map(function(image) {
  return image//.multiply(1e6)
    .copyProperties(image, ['system:time_start'])
    .set({date: image.date().format('yyyy-MM-dd * HH-mm-ss')});
});
// create one image per day
function dailyImages (images,startdate,enddate){
   startdate = ee.Date(startdate);
   enddate = ee.Date(enddate);
   var originDate = startdate;
   var count = end.difference(startdate, 'day').round();
   var listOfYear = ee.List.sequence(1, count, 1);
   return ee.ImageCollection(listOfYear.map(function(i){
     i = ee.Number(i);
     var date_start = originDate.advance(i.add(-1), 'day');
     var date_end = originDate.advance(i, 'day');
     var meanImage = images.filterDate(date_start,date_end).mean();
     return meanImage
     .set('system:time_start', date_start.format('MMM-YY'))
   }));
 }
 var imagePerDay = ee.ImageCollection(dailyImages (modC,start,end));
 print(imagePerDay)
// Chart the time-series
var Chart_CO = ui.Chart.image.series({
  imageCollection: imagePerDay,
  region: point,
  reducer: ee.Reducer.mean(),
  scale:1000,
   xProperty: 'system:time_start'})
  .setOptions({
    title: 'Movimiento medio de la densidad de columnas verticales de O3 a nivel del suelo',
    curveType:'function',
    hAxis : {title : 'Date'},
    lineWidth : 1,
    colors: ['OrangeRed'],
    //pointSize : 3 ,
    //trend_no2 : {1:{color:'DeepPink'}},
     vAxis : {title : 'O3 (mol/m²)'}});
lowerPanel.widgets().reset([Chart_CO]); 
}
}
drawingTools.onDraw(ui.util.debounce(Graficas_dinamicas, 500));
drawingTools.onEdit(ui.util.debounce(Graficas_dinamicas, 500));
var symbol = {
  rectangle: '⬛',
  polygon: '🔺',
  point: '📍',
};
var controlPanel = ui.Panel({
  widgets: [
    ui.Button({
      label: symbol.rectangle + ' Rectangle',
      onClick: drawRectangle,
      style: {stretch: 'horizontal'}
    }),
    ui.Button({
      label: symbol.polygon + ' Polygon',
      onClick: drawPolygon,
      style: {stretch: 'horizontal'}
    }),
    ui.Button({
      label: symbol.point + ' Point',
      onClick: drawPoint,
      style: {stretch: 'horizontal'}
    }),
  ],
  style: {position: 'bottom-left'},
  layout: null,
});
map.add(controlPanel);
//lowerPanel.add(chartPanel);
};//Fin de rum