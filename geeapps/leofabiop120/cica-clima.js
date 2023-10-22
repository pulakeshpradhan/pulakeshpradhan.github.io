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
var cantidadDia = 365;
var fechaInicial = Date.now() - valorDia * cantidadDia;
//var Fecha_inicial= "2020-01-28";//ee.Date(fechaInicial,String); 
//var Fecha_final= "2020-01-29";//ee.Date(Date.now(),String);
var Fecha_inicial= formatDate(fechaInicial); 
var Fecha_final= formatDate(Date.now() - 86400000 * 0);
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
var panel = ui.Panel();
panel.style({shown: false, backgroundColor: 'rgba(255, 255, 255, 0.8)', fontSize: '11px', fontWeight: '500'}).set({
  width: '400px',
  position: 'bottom-right',
  //border : '1px solid #000000',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  });
//----------------------------------------------------------Etiquetas--------------------------------------------------------------//
var Header = ui.Label('Plataforma de Análisis Histórico del Clima en los Territorios Indígenas de Centro América (CICA-CLIMA)',TITLE_STYLE);
var lbl_subtitulo = ui.Label(
  {
    value: 'CICA-Clima es un prototipo de aplicación diseñada para inspirar a las personas a utilizar mejor los datos satelitales para el monitoreo del clima dentro de las áreas de los pueblos indígenas. ',
    style: {  margin: '10px 5px',fontSize: '12px', textAlign: 'justify' }
  });
var linea1 = ui.Label('__________________________________________________________')
var Subheader0 = ui.Label(
  {value: 'Definición de Parámetros del Mapa:',
    style: { margin: '10px 5px', textAlign: 'justify', color:'Black', 
    backgroundColor: 'LightGrey' , stretch: 'horizontal', fontSize: '15px', padding : '0px 12px'}//,fontWeight: 'bold'
  });
var Subheader1 = ui.Label(
  {value: '1.Filtro de Fecha para el Mapa:',
    style: { textAlign: 'justify', color:'Gray', stretch: 'horizontal', fontSize: '15px',backgroundColor: 'GhostWhite'}
  });
var Subheader2 = ui.Label(
  {value: '2.Filtro de área de estudio:',
    style: { textAlign: 'justify', color:'Gray', stretch: 'horizontal', fontSize: '15px',backgroundColor: 'GhostWhite'}
  })
var Subheader3 = ui.Label(
  {value: '3.Definición de Variables:',
    style: { textAlign: 'justify', color:'Gray', stretch: 'horizontal', fontSize: '15px',backgroundColor: 'GhostWhite'}
  })
var Subheader4 = ui.Label(
  {value: 'Variables Meteorológicas​:',
    style: { textAlign: 'justify', color:'gray', stretch: 'horizontal', fontSize: '12px',backgroundColor: 'WhiteSmoke'}
  })
var Subheader5 = ui.Label(
  {value: 'Variables Topográficas​:',
    style: { textAlign: 'justify', color:'gray', stretch: 'horizontal', fontSize: '12px',backgroundColor: 'WhiteSmoke'}
  })
var Subheader6 = ui.Label(
  {value: '4. Escenarios Climáticos Regional:',
    style: { textAlign: 'justify', color:'Gray', stretch: 'horizontal', fontSize: '15px',backgroundColor: 'GhostWhite'}
  })
var lbl_pais_publo_indigine = ui.Label(
  {
    value: '*Al seleccinar un país, se filtrarán los Pueblos Indígenas ',
    style: {  margin: '0px 5px',fontSize: '10px', textAlign: 'justify',  color: 'Teal'}
  });
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
var panelFechas1 = ui.Panel({
        widgets: [label_Start_base_select,dateInicio,],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
var panelFechas2 = ui.Panel({
        widgets: [label_End_base_select, dateFinal],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
//----------------------------------------
var Country_name_select = ui.Select({
  items: [
    {label:'Honduras', value:'Honduras'},
    {label:'Nicaragua', value:'Nicaragua'},
    {label:'Belize', value:'Belize'},
    {label:'Costa Rica', value:'Costa Rica'},
    {label:'Panama', value:'Panama'},
    {label:'Guatemala', value:'Guatemala'},
    {label:'El Salvador', value:'El Salvador'},
    ],
	value: 'Honduras',
  onChange: function(value) {
    var country_names = value
  },
  style: {width: '200px'}
});
//------------------------------------------
//Panel de ETP
var ETP_selection = ui.Checkbox({
  label: 'ETP', 
  value: false,
  onChange: function(value) {
    var ETP_select = value
  }
});
//Panel de TEmp
var Temp_selection = ui.Checkbox({
  label: 'Temperatura', 
  value: false,
  onChange: function(value) {
    var Temp_select = value
  }
});
//Panel de Prec
var Prec_selection = ui.Checkbox({
  label: 'Precipitación', 
  value: false,
  onChange: function(value) {
    var Prec_select = value
  }
});
//Panel de Húmedad Relativa
var HR_selection = ui.Checkbox({
  label: 'Húmedad Relativa', 
  value: false,
  onChange: function(value) {
    var HR_select = value
  }
});
//Panel de Índice de Húmedad
var IH_selection = ui.Checkbox({
  label: 'Índice de Húmedad', 
  value: false,
  onChange: function(value) {
    var IH_select = value
  }
});
//Velocidad del viento
var VV_selection = ui.Checkbox({
  label: 'Velocidad del viento', 
  value: false,
  onChange: function(value) {
    var VV_select = value
  }
});
//Boton de Elevación
var Elevation_selection = ui.Checkbox({
  label: 'Elevación', 
  value: false,
  onChange: function(value) {
    var Elevation_select = value
  }
});
//Boton de Pendiente
var Pendiente_selection = ui.Checkbox({
  label: 'Pendiente', 
  value: false,
  onChange: function(value) {
    var Pendiente_select = value
  }
});
//Escenarios del Clima de los últimos 30 días
var NOAA_selection_30dia = ui.Checkbox({
  label: 'Nubosidad: últimos 30 días', 
  value: false,
  onChange: function(value) {
    var NOAA_select_30dia = value
  }
});
//Escenarios del Clima Hoy
var NOAA_selection_Hoy = ui.Checkbox({
  label: 'Nubosidad: Hoy', 
  value: false,
  onChange: function(value) {
    var NOAA_select_Hoy = value
  }
});
//Escenarios los próximos 6 días
var NOAA_selection_proximos_6dias = ui.Checkbox({
  label: 'Pronóstico de Precpitación: próximos 6 días (mm/hr)', 
  value: false,
  onChange: function(value) {
    var NOAA_select_proximos_6dias = value
  }
});
//Escenarios los próximos 6 días
var NOAA_selection_ultimos_6dias = ui.Checkbox({
  label: 'Dinámica de Precipitación: úlitmos 6 días (mm/hr)', 
  value: false,
  onChange: function(value) {
    var NOAA_select_ultimos_6dias = value
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
var notesButton1 = ui.Button({label: 'Instrucciones', onClick: notesButtonHandler1, style: {margin: '0px'}});
var notesButton2 = ui.Button({label: 'Fuente de Datos', onClick: notesButtonHandler2, style: {margin: '0px'}});
var notesPanel1 = ui.Panel({
  widgets: [
  ui.Label({value:'CICA-Clima, es una herramienta de procesamiento inteligente basado en el uso de sensores que proveen servición de monitoreo del clima', style: noteStyle}),
  ui.Label({value:'Para su uso adecuado, siga los siguientes pasos', style: noteStyle}),
  ui.Label({value:'1) En el Panel izquierdo: Defina los parámetros del Mapa', style: noteStyle}),
  ui.Label({value:'*El Rango de fechas corresponde al promedio que será calculado en el mapa ', style: noteStyle}),
  ui.Label({value:'2) Luego de definir los parámetros, haga clic en el botón Run (parte superior del visor de mapa)', style: noteStyle}),
  ui.Label({value:'3) Haga clic en Layer, para activar o desactivar las capas', style: noteStyle}),
  ui.Label({value:'4) En el Panel derecho: Encontrará información histórica de la última década', style: noteStyle}),
  //ui.Label({value:'5) Seleccione un polígono de interes dentro del mapa', style: noteStyle}),
  ui.Label({value:'* Espere a que cargue las estadísticas...', style: noteStyle}),
  //ui.Label({value:'________________________________________________', style: noteStyle})
  ],
  style: {shown: false, backgroundColor: 'rgba(255, 255, 255, 0.8)', fontSize: '11px', fontWeight: '500'}
});
// Notes panel container.
var notesContainer1 = ui.Panel({widgets: [notesButton1, notesPanel1],
  style: {position: 'bottom-right', padding: '8px',
    backgroundColor: 'rgba(0, 0, 0, 0.2)'}});
var notesPanel2 = ui.Panel({
  widgets: [
  ui.Label({value:'* Fuente y Descripción de Datos', style: noteStyle}),
  ui.Label({value:'________________________________________________', style: noteStyle}),
  ui.Label({value:'* Análisis del Clima en tiempo real: Windy', style: noteStyle, targetUrl:'https://www.windy.com/es/-Mostrar---a%C3%B1adir-m%C3%A1s-capas/overlays?cosc,14.404,-86.716,9'}),
  ui.Label({value: '• Leer sobre los Datos de Precipitación.', style: noteStyle, targetUrl: 'https://chc.ucsb.edu/data/chirps'}),
  ui.Label({value: '• Leer sobre los Datos de Temperatura.', style: noteStyle, targetUrl: 'https://lpdaac.usgs.gov/products/mod11a1v006/'}),
  ui.Label({value: '• Leer sobre los Datos de Evapotranspiración.', style: noteStyle, targetUrl: 'https://lpdaac.usgs.gov/products/mod16a2v006/'}),
  ui.Label({value: '• Leer sobre los Datos de Húmedad Relativa.', style: noteStyle, targetUrl: 'https://disc.gsfc.nasa.gov/datasets/GLDAS_NOAH025_3H_2.1/summary'}),
  ui.Label({value: '• Leer sobre los Datos de Velocidad del Viento.', style: noteStyle, targetUrl: 'https://www.ncdc.noaa.gov/data-access/model-data/model-datasets/global-forcast-system-gfs'}),
  ui.Label({value: '• Leer sobre el Modelo Digital del Terreno.', style: noteStyle, targetUrl: 'https://cmr.earthdata.nasa.gov/search/concepts/C1000000240-LPDAAC_ECS.html'}),
  ui.Label({value: '• Leer sobre los Datos los Escenarios Climáticos.', style: noteStyle, targetUrl: 'https://www.ncdc.noaa.gov/data-access/model-data/model-datasets/global-forcast-system-gfs'}),
  ui.Label({value: '• Consulte la descripción de los datos en el catálogo de datos de Earth Engine.',
        style: {backgroundColor: 'rgba(0, 0, 0, 0.0)', fontSize: '8px', fontWeight: '500', margin: '8px 8px 8px 8px'},
        targetUrl: 'https://developers.google.com/earth-engine/datasets/catalog/JRC_GSW1_1_YearlyHistory'}),
    ui.Label({value:'Referemcia Sugerida', style: noteStyle}),
    ui.Label({value:'GIZ, 2020. ', style: noteStyle}),
    ui.Label({value:'Desarrollado por: Fabio Casco', style: noteStyle})
  ],
  style: {shown: false, backgroundColor: 'rgba(255, 255, 255, 0.8)', fontSize: '11px', fontWeight: '500'}
});
// Notes panel container.
var notesContainer2 = ui.Panel({widgets: [notesButton2, notesPanel2],
  style: {position: 'bottom-right', padding: '8px',
    backgroundColor: 'rgba(0, 0, 0, 0.2)'}});
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
  ui.Label('Dar clic en el mapa y espere a cargue los datos.....',noteStyle),
  ui.Label('____________________________________________'),
  ]);
var linea1 = ui.Label('__________________________________________________________');
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
//panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
var panel_lon_lat = ui.Panel({
        widgets: [lon,lat],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
// Drill-down (Cascading Forms) in Earth Engine
// This script shows how to build hierarchical selection using UI Widgets
var Paises_CA = ee.FeatureCollection("users/leofabiop120/Clima/Paises_CA_gee");                        //Capa con de paises  (7 polígonos)
var Pueblos_Indigenas = ee.FeatureCollection("users/leofabiop120/Clima/Pueblos_Indigenas_gee");        //Capa de PI con nombre de etnia y país (96 polígonos)
var PI_por_pais_gee = ee.FeatureCollection("users/leofabiop120/Clima/PI_por_pais_gee");                //Capa de los PI por país (7 polígonos)
var Pueblos_Indigenas_CA_v2 = ee.FeatureCollection("users/leofabiop120/Clima/Pueblos_Indigenas_CA_v2");//Capa de PI y país explotada (890 polígonos)
// Create a panel to hold the drop-down boxes
var dropdownPanel = ui.Panel();
// Create a panel to hold the result
var resultPanel = ui.Panel();
// Define 3 dropdowns for admin0, admin1 and admin2 names
// Keep them disbled. We will add items later
var admin0Select = ui.Select({
    placeholder: 'Espere por favor..',
  }).setDisabled(true)
var admin1Select = ui.Select({
    placeholder: 'Seleccione un país primero',
  }).setDisabled(true)
var admin2Select = ui.Select({
  placeholder: 'Seleccione un Pueblo Indígena',
}).setDisabled(true)
dropdownPanel.add(admin0Select)
dropdownPanel.add(admin1Select)
//dropdownPanel.add(admin2Select)
//--------------------------------------Agrgar las etiquetas y funciones al panel-------------------------------------//
//Panel 1: Izquierda
panel.add(Header);
//panel.add(lbl_subtitulo);
panel.add(notesContainer1);
panel.add(linea1);
panel.add(Subheader0);
panel.add(Subheader1);
panel.add(panelFechas1);
panel.add(panelFechas2);
panel.add(Subheader2);
//panel.add(Country_name_select);
//panel.add(lbl_pais_publo_indigine);
panel.add(dropdownPanel)
panel.add(resultPanel)
panel.add(Subheader3);
panel.add(Subheader4);
panel.add(ETP_selection);
panel.add(Temp_selection);
panel.add(Prec_selection);
panel.add(HR_selection);
panel.add(VV_selection);
panel.add(Subheader5);
panel.add(Elevation_selection);
panel.add(Pendiente_selection);
panel.add(Subheader6);
panel.add(NOAA_selection_Hoy);
panel.add(NOAA_selection_ultimos_6dias);
panel.add(NOAA_selection_30dia);
panel.add(NOAA_selection_proximos_6dias);
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
  var admin1Names = Pueblos_Indigenas
    .filter(ee.Filter.eq('Pais_1', admin0Selection))
    .aggregate_array('ETNIA_1')
    .sort()
  // Use evaluate() to not block the UI
  admin1Names.evaluate(function(items){
    admin1Select.setPlaceholder('Seleccione PI')
    admin1Select.items().reset(items)
    // Now that we have items, enable the menu
    admin1Select.setDisabled(false)
  })
}
// Define the onChange() function for admin1Select
var admin1Selected = function(admin1Selection) {
 var admin0Value = admin0Select.getValue()
   var admin1Value = admin1Select.getValue()
  //var admin2Value = admin2Select.getValue()
  var result =  admin1Value + ',' + admin0Value
   Map.clear();
  var label = ui.Label('Usted seleccionó: ' + result)
  resultPanel.add(label)
//Mostrará unicamente el país seleccionado
var country = Paises_CA.filterMetadata('Pais', 'equals',admin0Value); // Country border polygons of high accuracy
    studyarea = ee.FeatureCollection([country.geometry()]);       //Luis Usar studyarea para filtrar por país
/*
//var CountiesImage1 = ee.Image().float().paint(studyarea, 0).paint(studyarea, 1, 1)
//Map.addLayer(CountiesImage1, {palette:['000000', 'ffffff']}, "País:"+""+admin0Value, true, 0.8)
Map.addLayer(ee.Image().paint(studyarea,1,1), {'palette': '00FFFF'},"País:"+""+admin0Value);
//Mostrará Los pueblos indígenas del país selccionado
var Etnia_Pais = Pueblos_Indigenas.filterMetadata('Pais_1', 'equals',admin0Value);
//var Etnia_Pais2 = Etnia_Pais.filterMetadata('ETNIA_1', 'not_equals',"Fuera de PI");// Country border polygons of high accuracy
  studyarea2 = Etnia_Pais//ee.FeatureCollection([Etnia_Pais.geometry()]);               //Luis Usar studyarea2 para filtrar por Pueblo Indigena por país
//var CountiesImage2 = ee.Image().float().paint(studyarea2, 0).paint(studyarea2, 1, 1)
//Map.addLayer(CountiesImage2, {palette:['OliveDrab', 'YellowGreen']}, "Pueblos Indígenas de" +" "+admin0Value, true, 0.8)
Map.addLayer(ee.Image().paint(studyarea2,1,1), {'palette': 'red'},"Pueblos Indígenas de" +" "+admin0Value);
//Mostraará unicamente la Etnia Seleccionada
var Etnia = Pueblos_Indigenas_CA_v2.filterMetadata('Pais_1', 'equals',admin0Value);
var Etnia2 = Etnia.filterMetadata('ETNIA_1', 'equals',admin1Value);// Country border polygons of high accuracy
    studyarea3 = ee.FeatureCollection([Etnia2.geometry()]);    //Luis Usar studyarea3 para filtrar por Pueblo Indigena seleccionado
//var CountiesImage3 = ee.Image().float().paint(studyarea3, 0).paint(studyarea3, 1, 1)
//Map.addLayer(CountiesImage3, {palette:['yellow', 'Teal']}, "Pueblo Indígena"+" "+ admin1Value, true, 0.8)
Map.addLayer(ee.Image().paint(studyarea3,1,1), {'palette': 'yellow'},"Pueblo Indígena"+" "+ admin1Value);
Map.centerObject(country);
*/
}
// Register the callback functions
admin0Select.onChange(admin0Selected)
//admin1Select.onChange(admin1Selected)
//admin2Select.onChange(admin2Selected)
// ******************
// Populate the items
// ******************
// Get all country names and sort them
var admin0Names = PI_por_pais_gee.aggregate_array('Pais').sort()
// Fetch the value using evaluate() to not block the UI
admin0Names.evaluate(function(items){
  admin0Select.items().reset(items)
  // Now that we have items, enable the menu
  admin0Select.setDisabled(false)
  // Change placeholder
  admin0Select.setPlaceholder('Seleccione un país')
})
//Esta opción agrega el panel a lado izquierdo. Si cambiamos el valor a 1, lo pasa al lado derecho 
ui.root.insert(0,panel);
var AddButton = function(){
      var button = ui.Button('Run');
      button.style().set({
        position: 'top-center',
        border : '1px solid #000000',
      });
      button.onClick(function(){return runClima()});
      Map.add(button);
//Agragar estilo
//Estilo Oscuro
var style = require('users/gena/packages:style')
//Agregar estilo de mapa Oscuro (Darck)
style.SetMapStyleDark()
//Terrain
//Map.setControlVisibility(true, true, true, true, true).setOptions("TERRAIN");
//Map.style().set('cursor', 'crosshair');
}
AddButton();
//Panel 2. Deracha
var panel2 = ui.Panel();
panel2.style().set('width', '300px');
panel2.add(plotsPanelLabel);
panel2.add(panel_lon_lat);
//Map.add(notesContainer);
Map.add(notesContainer2);
ui.root.insert(2, panel2);
// *********************************************************************************************************************************************************
// Functiones de el script *********************************************************************************************************************************
// *********************************************************************************************************************************************************
var runClima = function(){
admin1Selected();
//Map.clear();
Map.add(notesContainer2);  
AddButton();
    var startDate =        Date_inicial;
    var endDate =          Date_final;
    //var country_names =    Country_name_select.getValue();
    var country_names =   admin0Select.getValue();
    var Etnia_names =     admin1Select.getValue();
    var ETP_select = ETP_selection            .getValue();
    var Temp_select = Temp_selection          .getValue();
    var Prec_select = Prec_selection          .getValue();
    var HR_select = HR_selection              .getValue();
    var IH_select = IH_selection              .getValue();
    var VV_select = VV_selection             .getValue();
    var Elevation_select = Elevation_selection.getValue();
    var Pendiente_select = Pendiente_selection.getValue();
    var NOAA_select_30dia = NOAA_selection_30dia.getValue();
    var NOAA_select_Hoy = NOAA_selection_Hoy.getValue();
    var NOAA_select_proximos_6dias = NOAA_selection_proximos_6dias.getValue();
    var NOAA_select_ultimos_6dias = NOAA_selection_ultimos_6dias.getValue();
//*******************************************ÁREA DE ESTUDIO*******************************************************//
// Area de estudio
var country = ee.FeatureCollection("USDOS/LSIB/2017").filter(ee.Filter.inList('COUNTRY_NA', [country_names])); // Country border polygons of high accuracy
var studyarea = ee.FeatureCollection([country.geometry()]); // The study area is set to above selection
var Paises_CA = ee.FeatureCollection("users/leofabiop120/Clima/Paises_CA_gee");                        //Capa con de paises  (7 polígonos)
var Pueblos_Indigenas = ee.FeatureCollection("users/leofabiop120/Clima/Pueblos_Indigenas_gee");        //Capa de PI con nombre de etnia y país (96 polígonos)
var PI_por_pais_gee = ee.FeatureCollection("users/leofabiop120/Clima/PI_por_pais_gee");                //Capa de los PI por país (7 polígonos)
var Pueblos_Indigenas_CA_v2 = ee.FeatureCollection("users/leofabiop120/Clima/Pueblos_Indigenas_CA_v2");//Capa de PI y país explotada (890 polígonos)
//Mostrará Los pueblos indígenas del país selccionado
var Etnia_Pais = Pueblos_Indigenas.filterMetadata('Pais_1', 'equals',country_names);
studyarea2 = Etnia_Pais//ee.FeatureCollection([Etnia_Pais.geometry()]);               //Luis Usar studyarea2 para filtrar por Pueblo Indigena por país
//Mostraará unicamente la Etnia Seleccionada
var Etnia = Pueblos_Indigenas_CA_v2.filterMetadata('Pais_1', 'equals',country_names);
var Etnia2 = Etnia.filterMetadata('ETNIA_1', 'equals',Etnia_names);// Country border polygons of high accuracy
studyarea3 = ee.FeatureCollection([Etnia2.geometry()]);    //Luis Usar studyarea3 para filtrar por Pueblo Indigena seleccionado
//Filtros por fecha
var Fecha_inicial=  startDate;//"2019-01-01"
var Fecha_final=    endDate;//"2019-12-31"
//*******************************************COLECCIÓN DE DATOS****************************************************//
//Clima
var chirpsdaily =         ee.ImageCollection('UCSB-CHG/CHIRPS/DAILY');  //Resolución :1000, Variable: Precipitación
var modisET =             ee.ImageCollection('MODIS/006/MOD16A2').select('ET');//Resolución: 500, Variable: Evapoytranspiración Potencial
var GLDAS =               ee.ImageCollection('NASA/GLDAS/V021/NOAH/G025/T3H'); //Humedad Relativa, Velocidad del viento 
//Tierra
var Elevaciones =         ee.Image("USGS/SRTMGL1_003");
var Temperatura1d_Modis = ee.ImageCollection('MODIS/006/MOD11A1');      //Resolución: 1000, Variable: Temperautura
var Modis_Terra1d =       ee.ImageCollection('MODIS/006/MOD09GA');  //Resolución: 500, Variable: Índice de Humedad
var NDVI_1d =             ee.ImageCollection('MODIS/MOD09GA_NDVI');     //Resolución: 500,  Variable: Índice de vegetación normalizado
var NOAA =                ee.ImageCollection('NOAA/GFS0P25');
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
//TEMPERATURA MODIS
//Unidad: Grados C
function KtoC(image) {
  var y = image.select('LST_Day_1km');
  var x = y.expression(
  "banda*0.02-273.15",
  {banda:y}).rename('Temp_C');
  return x.copyProperties(image,['system:time_start','system:time_end'])}
//estadisticos Temp
var temperatura_filter = Temperatura1d_Modis.filterDate(Fecha_inicial,Fecha_final).map(KtoC);
var temperaturaEstadisticas = statistics(temperatura_filter);
//PRECIPITACIÓN
//Unidad: mm
var P = chirpsdaily.select('precipitation').filterDate(Fecha_inicial,Fecha_final).sum();//Para Precipitación solo aplica la suma 
var Pclip = P.clip(studyarea3);
//EVAPOTRANSPIRACIÓN POTENCIAL
//Unidad: kg/m^2/8day
var ET = modisET.select("ET");
var ET_filter = ET.filterDate(Fecha_inicial,Fecha_final);
var ET_static=statistics(ET_filter);
//HÍMEDAD RELATIVA
//Unidad: %
var collecion_GLDAS = GLDAS
.filterBounds(studyarea)
.filterDate(Fecha_inicial,Fecha_final);
//Calculo de media y corte
var GLDAS_clip= collecion_GLDAS.mean().clip(studyarea3);
//HÍMEDAD RELATIVA
// function to convert specific humidity to vapor pressure
// specific humidity is unitless [kg/kg] and Ea is in mb
//  Ea = qair * press / (0.378 * qair + 0.622)
// qair is specific humidity
// Ea is vapor pressure in mb
// P is surface pressure from GLDAS
var e = GLDAS_clip.select('Qair_f_inst');
e = e.multiply((GLDAS_clip.select('Psurf_f_inst').divide(100)) // unit correction
        .divide(e.multiply(ee.Image(0.378)).add(ee.Image(0.622)))).rename("Ea");
// get saturated vapor pressure from air temperature
// input air temperature in K
// es in mb
// es = 6.112 * exp((17.67 * temp)/(temp + 243.5))
    var temp = GLDAS_clip.select('Tair_f_inst').subtract(273.15);
    var es = temp.expression('6.112 * exp((17.67 * temp) / (temp + 243.5))',{
      'temp': temp
    }).rename("Es");
// function to calculate RH (La Humedad Relativa solo se expresa en %)
  var rh = e.divide(es)
    .multiply(100);
rh.rename("rh")    
//ELEVACIÓN
//Unidad: Metros solo el nivel del mar (msnm)
var DEM= Elevaciones.clip(studyarea3);
//PENDIENTE
//Unidad: grados 
var Pendiente= ee.Algorithms.Terrain(Elevaciones)
              .select("slope")
              .clip(studyarea);
//RADIACIÓN SOLAR
//Unidad: W/m2
var radiacion= NOAA.filterDate(Fecha_inicial,Fecha_final)
                                  .filter(ee.Filter.eq("forecast_hours", 13));
var Rmedia=radiacion              .select("downward_shortwave_radiation_flux")
                                  .mean()
                                  .clip(studyarea3);
//VELOCIDAD Y DIRECCIÓN  DEL VIENTO 
//Unidad: m/s 
//INDICE DE HUMEDAD O SEQUIA
//CÁLCULO NMDI
function NMDI(image) {
  var resultado = image.expression(
    '(b2 - (b6 -b7)) / (b2 + (b6 -b7))',{
    'b2' : image.select('sur_refl_b02'),
    'b6' : image.select('sur_refl_b06'),
    'b7' : image.select('sur_refl_b07')
  }).rename('NMDI');
  return resultado; }
//var Ima_NMDI = Filtro_NMDI.mean().clip(studyarea);
var NMDI_filter = Modis_Terra1d.filterDate(Fecha_inicial,Fecha_final).map(NMDI);
var NMDI_static = statistics(NMDI_filter);
//***************************************************************VISUALIZACION***************************************************************************//
//Visualuzación de capas
/*
Map.addLayer(ET_static              .select("ET_mediana"),    {min: 100, max: 400, palette:["orange","green","blue" ]},"Evapotranspiración (kg/m^2/8day",false);
Map.addLayer(temperaturaEstadisticas.select("Temp_C_mediana"),{min: 15, max: 45,   palette:["yellow","red"          ]}, "Temperatura (C)",     false);
Map.addLayer(Pclip,            {min: 50, max: 2000,  palette:['ffffff','b7f0ae','21f600','0000FF','FDFF92','FF2700','d600ff'  ]}, "Precipitación (mm)",   false); 
Map.addLayer(rh,               {min: 0, max: 100,  palette:['Red','Yellow','Green']},                                           'Humedad Relativa (%)',false);
Map.addLayer(DEM,              {min: 0, max: 3475, palette:["gray"  ,"black" ]},                                                "Elevación (m.s.n.m)"  ,     false);
Map.addLayer(Pendiente,        {min: 0, max: 30,   palette:["green","yellow","orange","red"]},                                  "Pendiente (Grados)"  ,     false);
Map.addLayer(Rmedia,           {min: 100, max: 500,palette:["yellow","red"]},"Radiación"   ,     false);
Map.addLayer(NMDI_static            .select("NMDI_mediana"),{min: 0,   max: 0.6,    palette: ['green','orange' ]},              'Índice Humedad' , false);
//viento y dirección 
*/
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
if (ETP_select === true){
Map.addLayer(ET_static.select("ET_mediana"),{min: 100, max: 400, palette:["black","DeepSkyBlue","Chartreuse" ]},"Evapotranspiración (kg/m^2/8day",true);
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    backgroundColor: 'grey', color: 'white'
  }
});
// Creates Title for legend
var legendTitle = ui.Label({
  value: 'Evapotranspiración (kg/m^2)',
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
    palette: palette2,
  };
};
// Creates the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis2.palette2),
  style: {stretch: 'horizontal', margin: '0px 8px',backgroundColor: 'grey', maxHeight: '20px'},
});
legend.add(colorBar);
// Creates a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis2.min, {margin: '4px 8px', fontWeight: 'bold', fontSize: '11px', backgroundColor: 'grey',color: 'white'}),
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
Map.add(legend)
}
if (Temp_select === true){
Map.addLayer(temperaturaEstadisticas.select("Temp_C_mediana"),{min: 15, max: 45,   palette:['DeepSkyBlue', 'Yellow', 'Red']}, "Temperatura (C)",true);
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    backgroundColor: 'grey', color: 'white'
  }
});
// Creates Title for legend
var legendTitle = ui.Label({
  value: 'Temperatura (C)',
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
    palette: palette3,
  };
};
// Creates the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis3.palette3),
  style: {stretch: 'horizontal', margin: '0px 8px',backgroundColor: 'grey', maxHeight: '20px'},
});
legend.add(colorBar);
// Creates a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis3.min, {margin: '4px 8px', fontWeight: 'bold', fontSize: '11px', backgroundColor: 'grey',color: 'white'}),
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
Map.add(legend)
}
if (Prec_select === true){
Map.addLayer(Pclip,{min: 50, max: 2000,  palette:['black',"YellowGreen","DarkTurquoise", "DodgerBlue",  'DarkBlue']}, "Precipitación (mm)",true); 
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    backgroundColor: 'grey', color: 'white'
  }
});
// Creates Title for legend
var legendTitle = ui.Label({
  value: 'Precipitación (mm)',
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
Map.add(legend)
}
if (HR_select === true){
Map.addLayer(rh,               {min: 0, max: 100,  palette:['Red','Yellow','Green']},'Húmedad Relativa (%)',true);
}
if (IH_select === true){
Map.addLayer(NMDI_static.select("NMDI_mediana"),{min: 0,   max: 0.6,    palette: ['green','orange' ]},'Índice Humedad', false);
}
if (VV_select === true){
//VELOCIDAD Y DIRECCIÓN  DEL VIENTO 
//Unidad: m/s 
var uv0 = ee.Image(NOAA.select(['u_component_of_wind_10m_above_ground', 'v_component_of_wind_10m_above_ground']).first())
var uv0 = uv0.clip(studyarea3)
var region = studyarea.geometry()
var scale = Map.getScale() * 15
var numPixels = 10000
var samples = uv0.rename(['u', 'v']).sample({
  region: region, 
  scale: scale, 
  numPixels: numPixels, 
  geometries: true
})
var geomUtils = require('users/gena/packages:geometry')
var scaleVector = 0.08
var vectors = samples.map(function(f) {
  var u = ee.Number(f.get('u')).multiply(scaleVector)
  var v = ee.Number(f.get('v')).multiply(scaleVector)
  var origin = f.geometry()
  // translate
  var proj = origin.projection().translate(u, v)
  var end = ee.Geometry.Point(origin.transform(proj).coordinates())
  // construct line
  var geom = ee.Algorithms.GeometryConstructors.LineString([origin, end], null, true)
  return f.setGeometry(geom)
})
var palettes = require('users/gena/packages:palettes')
Map.addLayer(uv0.pow(2).reduce(ee.Reducer.sum()).sqrt(), { palette: palettes.cmocean.Speed[7].reverse(), min: 0, max: 10 }, 'Velocidad Viento (m/s)', true)
Map.addLayer(vectors.style({ color: 'white', width: 1 }), {}, 'Dirección del viento (Línea)',false)
Map.addLayer(samples.style({ pointSize: 1, color: 'red' }), {}, 'Dirección del viento (Punto)', false, 0.7)
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    backgroundColor: 'grey', color: 'white'
  }
});
// Creates Title for legend
var legendTitle = ui.Label({
  value: 'Velocidad del viento (m/s)',
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
    palette: palette6,
  };
};
// Creates the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis6.palette6),
  style: {stretch: 'horizontal', margin: '0px 8px',backgroundColor: 'grey', maxHeight: '20px'},
});
legend.add(colorBar);
// Creates a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis6.min, {margin: '4px 8px', fontWeight: 'bold', fontSize: '11px', backgroundColor: 'grey',color: 'white'}),
    ui.Label(
        ((vis6.max + vis6.min) / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal', fontWeight: 'bold', fontSize: '11px',backgroundColor: 'grey', color: 'white'}),
    ui.Label(vis6.max, {margin: '4px 8px', fontWeight: 'bold', fontSize: '11px',backgroundColor: 'grey', color: 'white'})
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
  value: 'Rangos de Elevación (m.s.n.m)',
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
Map.addLayer(ee.Image().paint(studyarea,1,1), {'palette': '00FFFF'},'País:'+country_names);
Map.addLayer(ee.Image().paint(studyarea2,1,1), {'palette': 'YellowGreen'},"Pueblos Indígenas de" +" "+country_names);
Map.addLayer(ee.Image().paint(studyarea3,1,1), {'palette': 'red'},"Pueblo Indígena"+" "+ Etnia_names);
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
//Precipitación
var GSMaP = ee.ImageCollection("JAXA/GPM_L3/GSMaP/v6/operational")
var CHIRPS= ee.ImageCollection('UCSB-CHG/CHIRPS/PENTAD')
var precip = CHIRPS.filterDate('2010-01-01', '2020-12-31')
  .sort('system:time_start', false)
  .filterBounds(studyarea);
//var precip = GSMaP.filterBounds(studyarea).filterDate(Fecha_1,Fecha_2).select("hourlyPrecipRateGC")
//  .sort('system:time_start', false)
  //.filterBounds(point);
//calculating monthly precipitation for the region
var years = ee.List.sequence(2010, 2020);
var months = ee.List.sequence(1, 12);
var monthlyPrecip =  ee.ImageCollection.fromImages(
  years.map(function (y) {
    return months.map(function(m) {
    // var n=m+1;
     //print(m)
      var w = precip.filter(ee.Filter.calendarRange(y, y, 'year'))
                    .filter(ee.Filter.calendarRange(m, m, 'month'))
                    .sum();
      return w.set('year', y)
              .set('month', m)
              .set('system:time_start', ee.Date.fromYMD(y, m, 1));
    });
  }).flatten()
);
//var monthlyMean = monthlyPrecip.mean().clip(roi);
//Temperatura
var modis = ee.ImageCollection('MODIS/006/MOD11A1');
var modisLST = modis.filterBounds(studyarea)
                    .filterDate('2010-01-01', '2020-12-31')
                    .sort('system:time_start', false)
                    .select('LST_Day_1km');
var modisLST_C =ee.ImageCollection(modisLST).map(function(img) {
  return img.multiply(0.02).subtract(273.15).copyProperties(img,['system:time_start','system:time_end']); 
});
//calculating monthly precipitation for the region
var years = ee.List.sequence(2010, 2020);
var months = ee.List.sequence(1, 12);
var monthly_Temp =  ee.ImageCollection.fromImages(
  years.map(function (y) {
    return months.map(function(m) {
    // var n=m+1;
     //print(m)
      var w = modisLST_C.filter(ee.Filter.calendarRange(y, y, 'year'))
                    .filter(ee.Filter.calendarRange(m, m, 'month'))
                    .mean();
      return w.set('year', y)
              .set('month', m)
              .set('system:time_start', ee.Date.fromYMD(y, m, 1));
    });
  }).flatten()
);
//ETP
var ETP_grafico = ET.filterBounds(studyarea)
                    .filterDate('2010-01-01', '2020-12-31')
                    .sort('system:time_start', false)
                    ;
//calculating monthly precipitation for the region
var years = ee.List.sequence(2010, 2020);
var months = ee.List.sequence(1, 12);
var monthly_etp =  ee.ImageCollection.fromImages(
  years.map(function (y) {
    return months.map(function(m) {
    // var n=m+1;
     //print(m)
      var w = ETP_grafico.filter(ee.Filter.calendarRange(y, y, 'year'))
                    .filter(ee.Filter.calendarRange(m, m, 'month'))
                    .mean();
      return w.set('year', y)
              .set('month', m)
              .set('system:time_start', ee.Date.fromYMD(y, m, 1));
    });
  }).flatten()
);
//------------------------------------------------------------------------------------------------------------//
//*************************************************Agregar inspector******************************************//
//------------------------------------------------------------------------------------------------------------//
var Pueblos_Indigenas = ee.FeatureCollection("users/leofabiop120/Clima/Pueblos_Indigenas_CA").filterMetadata('Pais','equals', country_names); // Country border polygons of high accuracy
//var PI_studyarea = ee.FeatureCollection([country.geometry()]); // The study area is set to above selection
var Counties= Pueblos_Indigenas;
var startdate ="2010-01-01"
var enddate = "2018-12-31"
var chirps = ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY").filterDate(startdate,enddate)
//-------------MONTHLY------------------------
//defines period of interest
var startyear = 2010; 
var endyear = 2018; 
var years = ee.List.sequence(startyear, endyear);
//Precipitación Anual
var precip = chirps.filterDate(startdate, enddate)
  .sort('system:time_start', false)
  .filterBounds(Counties);
//----------ANNUAL--------
//function for calculating the annual precipitation
var annualPrecip = ee.ImageCollection.fromImages(
  years.map(function (year) {
    var annual = precip
        .filter(ee.Filter.calendarRange(year, year, 'year'))
        .sum();
    return annual
        .set('year', year)
        .set('system:time_start', ee.Date.fromYMD(year, 1, 1));
}));
//Temeperatra Anual
var tempe = modisLST_C;
//----------ANNUAL--------
//function for calculating the annual precipitation
var annualTempe = ee.ImageCollection.fromImages(
  years.map(function (year) {
    var annual = tempe
        .filter(ee.Filter.calendarRange(year, year, 'year'))
        .mean();
    return annual
        .set('year', year)
        .set('system:time_start', ee.Date.fromYMD(year, 1, 1));
}));
//ETP anual
var ETP_anual = ETP_grafico;
//----------ANNUAL--------
//function for calculating the annual precipitation
var annualETP = ee.ImageCollection.fromImages(
  years.map(function (year) {
    var annual = ETP_anual
        .filter(ee.Filter.calendarRange(year, year, 'year'))
        .mean();
    return annual
        .set('year', year)
        .set('system:time_start', ee.Date.fromYMD(year, 1, 1));
}));
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
    scale: 3000,
    bestEffort: true,
    maxPixels: 1e12,
    tileScale:16
  })
var value_results_eleva = ee.Number(mean_value.get('elevation').getInfo());  
var Pendiente= ee.Algorithms.Terrain(SRTM)
              .select("slope")
              //.clip(studyarea);
var mean_value_slope = Pendiente.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: point,
    scale: 3000,
    bestEffort: true,
    maxPixels: 1e12,
    tileScale:16
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
var value_results_slope = ee.Number(mean_value_slope.get('slope').getInfo());
var P = ee.ImageCollection('UCSB-CHG/CHIRPS/DAILY')
.select('precipitation')
.filterDate(Fecha_inicial,Fecha_final)
//.limit(50)
.sum()
.round();
var mean_value_P = P.reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: point,
    scale: 3000,
    bestEffort: true,
    maxPixels: 1e12,
    tileScale:16
  })             
var value_results_P = ee.Number(mean_value_P.get('precipitation').getInfo());  
var P_label = ui.Label(
  {value: "Precipitación media:"+ " "+value_results_P.getInfo()+ " "+"mm",
    style: { margin: '4px 8px', fontSize: '13px', backgroundColor: 'white', color: 'gray'}
  })
//TEMPERATURA MODIS
//Unidad: Grados C
function KtoC(image) {
  var y = image.select('LST_Day_1km');
  var x = y.expression(
  "banda*0.02-273.15",
  {banda:y}).rename('Temp_C');
  return x.copyProperties(image,['system:time_start','system:time_end'])}
//estadisticos Temp
var T = ee.ImageCollection('MODIS/006/MOD11A1')
.filterDate(Fecha_inicial,Fecha_final)
.limit(50)
.map(KtoC)
.mean()
.round();
var mean_value_T = T.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: point,
    scale: 10000,
    bestEffort: true,
    maxPixels: 1e12,
    tileScale:16
  })             
var value_results_T = ee.Number(mean_value_T.get('Temp_C').getInfo());  
var T_label = ui.Label(
  {value: "Temperatura media:"+ " "+value_results_T.getInfo()+ " "+"°C",
    style: { margin: '4px 8px', fontSize: '13px', backgroundColor: 'white', color: 'gray'}
  })
//EVAPOTRANSPIRACIÓN POTENCIAL
//Unidad: kg/m^2/8day
var ETp = ee.ImageCollection('MODIS/006/MOD16A2').select('ET').filterDate(Fecha_inicial,Fecha_final).mean().round();
var mean_value_ETP = ETp.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: point,
    scale: 3000,
    bestEffort: true,
    maxPixels: 1e12,
    tileScale:16
  })             
var value_results_ETP = ee.Number(mean_value_ETP.get('ET').getInfo());  
var ETP_label = ui.Label(
  {value: "ETP media:"+ " "+value_results_ETP.getInfo()+ " "+"kg/m²",
    style: { margin: '4px 8px', fontSize: '13px', backgroundColor: 'white', color: 'gray'}
  })
var relative_humidity = ee.ImageCollection("NOAA/GFS0P25")
.select('relative_humidity_2m_above_ground')
.filterDate("2020-11-10","2020-11-19")
.limit(50)
.mean()
.round();
var mean_value_RH = relative_humidity.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: point,
    scale: 3000,
    bestEffort: true,
    maxPixels: 1e12,
    tileScale:16
  })             
var value_results_RH = ee.Number(mean_value_RH.get('relative_humidity_2m_above_ground').getInfo());
var RH_label = ui.Label(
  {value: "Húmedad Relativa media:"+ " "+value_results_RH.getInfo()+ " "+"%",
    style: { margin: '4px 8px', fontSize: '13px', backgroundColor: 'white', color: 'gray'}
  })
//VELOCIDAD Y DIRECCIÓN  DEL VIENTO 
//Unidad: m/s 
var uv0 = ee.Image(ee.ImageCollection('NOAA/GFS0P25')
.select(['u_component_of_wind_10m_above_ground', 'v_component_of_wind_10m_above_ground'])
.limit(50)
.first())
var wind = uv0.pow(2).reduce(ee.Reducer.sum()).sqrt().rename("wind").round();
var mean_value_wind = wind.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: point,
    scale: 3000,
    bestEffort: true,
    maxPixels: 1e12,
    tileScale:16
  })             
var value_results_wind = ee.Number(mean_value_wind.get('wind').getInfo());  
var wind_label = ui.Label(
  {value: "Velocidad del Viento media:"+ " "+value_results_wind.getInfo()+ " "+"m/s",
    style: { margin: '4px 8px', fontSize: '13px', backgroundColor: 'white', color: 'gray'}
  })
    //-----------------------------------------------------------------
    //CHART MONTHLY PRECIPITACIÓN
    // Precipitación
var Preci_Chart = ui.Chart.image.series({
   imageCollection: monthlyPrecip,
   region: point,
   reducer: ee.Reducer.mean(),
   scale: 3000,
   xProperty: 'system:time_start'
});
Preci_Chart .setOptions({
  title: "Precipitación media mensual ",
  hAxis: {title: 'Fecha', format: 'MMM-YY'},
  vAxis: {title: 'Precipitación (mm)'},
  colors: ['MediumBlue'],
  pointSize: 3,
}).setChartType('ColumnChart');
//-----------------------------------------------------------------
    //CHART MONTHLY TEMPERATURE
var Temp_Chart = ui.Chart.image.series({
  imageCollection: monthly_Temp,
   region: point,
   reducer: ee.Reducer.mean(),
  scale: 3000,
  xProperty: 'system:time_start'
});
  Temp_Chart.setChartType("ColumnChart").setOptions({
    title: 'Temperatura superficial media mensual',
    curveType:'function',  
    vAxis: {title: 'Grados °C'},
    hAxis: {title: 'Fecha', format: 'MMM-YY'},
    lineWidth: 3,
     colors: ['Tomato'],
     });
//-----------------------------------------------------------------
    //CHART MONTHLY etp
var ETP_Chart = ui.Chart.image.series({
   imageCollection: monthly_etp,
   region: point,
   reducer: ee.Reducer.mean(),
   scale: 3000,
   xProperty: 'system:time_start'
});
ETP_Chart .setOptions({
  title: "ETP media mensual",
  hAxis: {title: 'Fecha', format: 'MMM-YY'},
  vAxis: {title: 'ETP kg/m²'},
  colors: ['YellowGreen'],
  pointSize: 3,
}).setChartType('ColumnChart');
    //-----------------------------------------------------------------
    //CHART ANNUAL PRECIPITACIÓN
    var Anualchart1 = ui.Chart.image.series(annualPrecip , point, ee.Reducer.mean(), 2500)
    .setOptions({
      title: "Precipitación media anual ",
      hAxis: {title: 'Fecha'},
      vAxis: {title: 'Precipitation (mm)'},
      colors: ['Aqua']
    })
    .setChartType('ColumnChart');
    //CHART ANNUAL TEMPERATURA
    var Anualchart2 = ui.Chart.image.series(annualTempe , point, ee.Reducer.mean(), 2500)
    .setOptions({
      title: "Temperatura media anual ",
      hAxis: {title: 'Fecha'},
      vAxis: {title: 'Temeperatura (C)'},
      colors: ['Crimson']
    })
    .setChartType('ColumnChart');
    //CHART ANNUAL ETP
    var Anualchart3 = ui.Chart.image.series(annualETP , point, ee.Reducer.mean(), 2500)
    .setOptions({
      title: "ETP media anual ",
      hAxis: {title: 'Fecha'},
      vAxis: {title: 'ETP (kg/m^2)'},
      colors: ['YellowGreen']
    })
    .setChartType('ColumnChart');
var PanelLabel = ui.Panel([
  ui.Label('Análisis Histórico de la última Década',{fontWeight: 'bold'}),
  //ui.Label('Dar clic en el mapa y espere a cargue los datos.....',noteStyle),
  ui.Label('____________________________________________'),
  ]);
var PanelLabel1 = ui.Panel([
  //ui.Label('Análisis Histórico de la última Década',{fontWeight: 'bold'}),
  ui.Label('Datos Mensuales',noteStyle),
 // ui.Label('____________________________________________'),
  ]);
  var PanelLabel2 = ui.Panel([
  //ui.Label('Análisis Histórico de la última Década',{fontWeight: 'bold'}),
  ui.Label('Datos Anuales',noteStyle),
 // ui.Label('____________________________________________'),
  ]);
panel2.widgets().set(3, latLabel);
panel2.widgets().set(4, lonLabel);
panel2.widgets().set(5, Elevacion_label); 
panel2.widgets().set(6, slope_label);
panel2.widgets().set(7, P_label);
panel2.widgets().set(8, T_label);
panel2.widgets().set(9, ETP_label);
panel2.widgets().set(10, RH_label);
panel2.widgets().set(11, wind_label);
panel2.widgets().set(12, PanelLabel);
panel2.widgets().set(13, PanelLabel1);
panel2.widgets().set(14, Preci_Chart);
panel2.widgets().set(15, Temp_Chart);
panel2.widgets().set(16, ETP_Chart);
panel2.widgets().set(17, PanelLabel2);
panel2.widgets().set(18, Anualchart1); 
panel2.widgets().set(19, Anualchart2);
panel2.widgets().set(20, Anualchart3);
panel2.style().set({shown: true});  
});
//Animaciones del clima
//Animaciones del clima
if (NOAA_select_30dia === true){
/**
 * @license
 * Copyright 2020 Google LLC.
 * SPDX-License-Identifier: Apache-2.0
 * 
 * @description
 * Generate a GOES time-lapse video showing the view from near 10am PT for a
 * given number of days. Note that there is a limitation on the total number
 * of pixels composing an animation; adjust observation duration, max video
 * dimension, and geometry region as necessary to meet size constraint.
 */
// #############################################################################
// ### USER INPUTS ###
// #############################################################################
// Define GOES collection ID.
//var GOES_ID = 'NOAA/GOES/17/MCMIPC'; //EEUU
var GOES_ID ="NOAA/GOES/17/MCMIPF"; //A.C
var Hora= ("T10:00:00")
// Define observation start and end time. 
var START_TIME = Date2+Hora;
var N_DAYS = 30;
var TIME_ZONE = 'America/Los_Angeles';
// Define video parameters.
var VID_PARAMS = {
  dimensions: 512, // Max dim.
  region: studyarea.geometry(),  // Edit geometry import using Code Editor drawing tools.
  framesPerSecond: 1,
  crs: 'EPSG:3857',
};
// #############################################################################
// Band aliases.
var BLUE = 'CMI_C01';
var RED = 'CMI_C02';
var VEGGIE = 'CMI_C03';
var GREEN = 'GREEN';
// 16 pairs of CMI and DQF followed by Bah 2018 synthetic green.
// Band numbers in the EE asset, 0-based.
var NUM_BANDS = 33;
// Skipping the interleaved DQF bands.
var BLUE_BAND_INDEX = (1 - 1) * 2;
var RED_BAND_INDEX = (2 - 1) * 2;
var VEGGIE_BAND_INDEX = (3 - 1) * 2;
var GREEN_BAND_INDEX = NUM_BANDS - 1;
// Visualization params.
var GOES_RGB_VIS = {
  bands: [RED, GREEN, BLUE],
  min: 0,
  max: 0.38,
  gamma: 1.3,
};
// Function to scale the imagery and get green vis band.
var applyScaleAndOffset = function(image) {
  image = ee.Image(image);
  var bands = new Array(NUM_BANDS);
  for (var i = 1; i < 17; i++) {
    var bandName = 'CMI_C' + (100 + i + '').slice(-2);
    var offset = ee.Number(image.get(bandName + '_offset'));
    var scale =  ee.Number(image.get(bandName + '_scale'));
    bands[(i-1) * 2] = image.select(bandName).multiply(scale).add(offset);
    var dqfName = 'DQF_C' + (100 + i + '').slice(-2);
    bands[(i-1) * 2 + 1] = image.select(dqfName);
  }
  // Bah, Gunshor, Schmit, Generation of GOES-16 True Color Imagery without a
  // Green Band, 2018. https://doi.org/10.1029/2018EA000379
  // Green = 0.45 * Red + 0.10 * NIR + 0.45 * Blue
  var green1 = bands[RED_BAND_INDEX].multiply(0.45);
  var green2 = bands[VEGGIE_BAND_INDEX].multiply(0.10);
  var green3 = bands[BLUE_BAND_INDEX].multiply(0.45);
  var green = green1.add(green2).add(green3);
  bands[GREEN_BAND_INDEX] = green.rename(GREEN);
  return ee.Image(ee.Image(bands).copyProperties(image, image.propertyNames()));
};
// Paint state features to an image.
var statesOutline = ee.Image().byte()
  .paint({featureCollection: country.geometry(), color: 1, width: 2})
  .visualize({palette: '000000', opacity: 0.6});
// Define a function to overlay the state line image.
var applyVis = function(image) {
  return image.resample('bicubic')
    .reproject({crs: 'EPSG:4326', scale:1000})
    .visualize(GOES_RGB_VIS)
    .blend(statesOutline);
};
// Assemble the collection.
var nDays = ee.List.sequence(0, N_DAYS - 1, 1);
var visList = nDays.map(function(i) {
  var startDate = ee.Date(START_TIME, TIME_ZONE)
    .advance(ee.Number(i).multiply(-1), 'day');
  var endDate = startDate.advance(8, 'hour');
  var img = ee.ImageCollection(GOES_ID)
    .filterDate(startDate, endDate).first();
  img = applyScaleAndOffset(img);
  img = applyVis(img);
  return img;
});
var visCol = ee.ImageCollection.fromImages(visList);
print('N Frames Clima 30 días:', visCol.size());
// Render the video.
var Clima_30dia = ui.Thumbnail( {
              image: (visCol),
              params: VID_PARAMS,
              style: {
                      position: 'top-right',
                      fontFamily:'Century Gothic',
                      width: '500px'}});
Map.add(Clima_30dia)
}
if (NOAA_select_Hoy === true){
/**
 * @license
 * Copyright 2020 Google LLC.
 * SPDX-License-Identifier: Apache-2.0
 * 
 * @description
 * Generate a GOES-17 time-lapse video of cumulative fire pixels (yellow),
 * active fires pixels (orange), and smoke. Note that there is a limitation
 * on the total number of pixels composing an animation; adjust observation
 * duration, max video dimension, and geometry region as necessary to meet
 * size constraint.
 */
// #############################################################################
// ### USER INPUTS ###
// #############################################################################
var Hora1 = "T08:00:00"
var Hora2 = "T19:00:00"
// Define observation start and end time. 
var START_TIME = Date2+Hora1;
var END_TIME = Date2+Hora2;
var TIME_ZONE = 'America/Los_Angeles';
// Add outline.
var OUTLINE = country;
// Define video parameters.
var VID_PARAMS = {
  dimensions: 350, // Max dim.
  region: studyarea.geometry(),  // Edit geometry import using Code Editor drawing tools.
  framesPerSecond: 10,
  crs: 'EPSG:4326',
};
// #############################################################################
// Band aliases.
var BLUE = 'CMI_C01';
var RED = 'CMI_C02';
var VEGGIE = 'CMI_C03';
var GREEN = 'GREEN';
// 16 pairs of CMI and DQF followed by Bah 2018 synthetic green.
// Band numbers in the EE asset, 0-based.
var NUM_BANDS = 33;
// Skipping the interleaved DQF bands.
var BLUE_BAND_INDEX = (1 - 1) * 2;
var RED_BAND_INDEX = (2 - 1) * 2;
var VEGGIE_BAND_INDEX = (3 - 1) * 2;
var GREEN_BAND_INDEX = NUM_BANDS - 1;
// Visualization params.
var GOES_RGB_VIS = {
  bands: [RED, GREEN, BLUE],
  min: 0,
  max: 0.42,
  gamma: 1.3,
};
// Function to scale the imagery and get green vis band.
var applyScaleAndOffset = function(image) {
  image = ee.Image(image);
  var bands = new Array(NUM_BANDS);
  for (var i = 1; i < 17; i++) {
    var bandName = 'CMI_C' + (100 + i + '').slice(-2);
    var offset = ee.Number(image.get(bandName + '_offset'));
    var scale =  ee.Number(image.get(bandName + '_scale'));
    bands[(i-1) * 2] = image.select(bandName).multiply(scale).add(offset);
    var dqfName = 'DQF_C' + (100 + i + '').slice(-2);
    bands[(i-1) * 2 + 1] = image.select(dqfName);
  }
  // Bah, Gunshor, Schmit, Generation of GOES-16 True Color Imagery without a
  // Green Band, 2018. https://doi.org/10.1029/2018EA000379
  // Green = 0.45 * Red + 0.10 * NIR + 0.45 * Blue
  var green1 = bands[RED_BAND_INDEX].multiply(0.45);
  var green2 = bands[VEGGIE_BAND_INDEX].multiply(0.10);
  var green3 = bands[BLUE_BAND_INDEX].multiply(0.45);
  var green = green1.add(green2).add(green3);
  bands[GREEN_BAND_INDEX] = green.rename(GREEN);
  return ee.Image(ee.Image(bands).copyProperties(image, image.propertyNames()));
};
// Paint state features to an image.
var outlineVis = ee.Image().byte()
  .paint({featureCollection: OUTLINE, color: 1, width: 1})
  .visualize({palette: 'FFFFFF', opacity: 0.5});
// Function to make cumulative fire image.
var cumulativeFire = function(currectTime) {
  var imgs = fire.filterDate(START_TIME, currectTime)
    .map(function(img) {
      return img.select('DQF').eq(0).selfMask();
    });
  return imgs.mosaic().visualize({palette: 'yellow', opacity: 0.6});
};
// Function to overlay the state line image.
var applyVis = function(image) {
  // Fire visualization.
  var endDate = image.date().advance(30, 'second');
  var startDate = endDate.advance(-2, 'hour');
  var fireImg = fire.filterDate(startDate, endDate)
    .sort('system:time_start', false).first();
  var currentFireVis = fireImg.select('DQF').eq(0).selfMask()
    .visualize({palette: 'red', opacity: 0.4});
  var cumulativeFireVis = cumulativeFire(endDate);
  // Put it all together.
  return image.resample('bicubic')
    .reproject({crs: VID_PARAMS.crs, scale:1000})
    .visualize(GOES_RGB_VIS)
    .blend(cumulativeFireVis)
    .blend(currentFireVis)
    .blend(outlineVis)
    .set('system:time_start', image.get('system:time_start'));
};
// Get collections.
//var vis = ee.ImageCollection('NOAA/GOES/17/MCMIPC')//EEUU
var vis =ee.ImageCollection("NOAA/GOES/17/MCMIPF") //A.C
  .filterDate(ee.Date(START_TIME, TIME_ZONE), ee.Date(END_TIME, TIME_ZONE)); 
//var fire = ee.ImageCollection('NOAA/GOES/17/FDCC');//EUU
var fire =ee.ImageCollection("NOAA/GOES/17/FDCF");//A.C
// Assemble the visualization collection.
var col = vis
  .map(applyScaleAndOffset)
  .map(applyVis)
  .sort('system:time_start');
// Render the video.
print('N Frames Clima Hoy:', col.size());
var Clima_Hoy = ui.Thumbnail( {
              image: (col),
              params: VID_PARAMS,
              style: {
                      position: 'top-right',
                      fontFamily:'Century Gothic',
                      width: '500px'}});
Map.add(Clima_Hoy)
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Pronosticos los próximos 6 días 
if (NOAA_select_proximos_6dias === true){
//RAINFALL FORECAST
var Collection_V= ee.ImageCollection("NOAA/GFS0P25");
var text = require('users/gena/packages:text'); 
var pt = text.getLocation(AOI, 'left', '90%', '5%');
var centralAmCol = Boundaries;
var centralAmAoi = AOI;
var empty = ee.Image().byte();
var centralAmOutline = empty
  .paint({featureCollection: centralAmCol, color: 1, width: 1})
  .visualize({palette: 'ffffff'});
var today      = ee.Date(new Date().toISOString().split('T')[0]);
var Filter_RFF = Collection_V.select('total_precipitation_surface')
                             .filterDate(today.advance(-1, 'day'), today.advance(6, 'day'))
                             .sort('system:time_start', false);
var Forecasts =  ee.ImageCollection([1,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57,60,63,66,69,72,
                                    75,78,81,84,87,90,93,96,99,102,105,108,111,114,117,120,123,126,129,132,135,
                                    138,141,144].map(Vorhersage));
function Vorhersage(hours) {
  var image = Filter_RFF
    .filterMetadata('forecast_hours', 'equals', hours)
    .first();
  var date = image.date().advance(hours, 'hours');
  return image
    .set('date', date.format())}
var ForvisArgs = {
  min: 0,
  max: 100,
  palette: ['000000','000096','0064ff', '00b4ff', '33db80', '9beb4a','ffeb00', 'ffb300', 'ff6400', 'eb1e00', 'af0000']};
var ForprepFilVis = Forecasts.map(function(img) {
  return img.visualize(ForvisArgs);
});
var Fortext = 'Forecast';
var ForprepColOutline = ForprepFilVis.map(function(img) {
  var scale = 2500;
  var textVis = {fontType: 'Arial', fontSize: 32, textColor: 'ffffff', outlineColor: '000000', outlineWidth: 2.5, outlineOpacity: 0.6 };
  var label = text.draw(img.get('system:index'), pt, scale, textVis);
  return img.blend(centralAmOutline).unmask(0).blend(label);
});
var ForThumbnail = {
  dimensions: 550,
  region: centralAmAoi,
  framesPerSecond: 4.5,
  crs: 'EPSG:3857'
};
var ForAnimation = ui.Thumbnail( {
              image: (ForprepColOutline),
              params: ForThumbnail,
              style: {
                      position: 'top-right',
                      fontFamily:'Century Gothic',
                      width: '500px'}});
Map.add(ForAnimation)
}
if (NOAA_select_ultimos_6dias === true){
var Collection_VIII= ee.ImageCollection("JAXA/GPM_L3/GSMaP/v6/operational");
var text = require('users/gena/packages:text'); 
var centralAmCol = Boundaries;
var centralAmAoi = AOI;
var today      = ee.Date(new Date().toISOString().split('T')[0]);
var prepFil = Collection_VIII.filterDate(today.advance(-1, 'week'), today)
                           .limit(50)
                           .select('hourlyPrecipRate');
var visArgs = {
  min: 0.0,
  max: 14.0,
  palette: ['000000','000096','0064ff', '00b4ff', '33db80', '9beb4a',
  'ffeb00', 'ffb300', 'ff6400', 'eb1e00', 'af0000']};
var prepFilVis = prepFil.map(function(img) {
  return img.visualize(visArgs);
});
var pt = text.getLocation(centralAmAoi, 'right', '2%', '35%');
var empty = ee.Image().byte();
var centralAmOutline = empty
  .paint({featureCollection: centralAmCol, color: 1, width: 1})
  .visualize({palette: 'ffffff'});
//NUEVO-----------------------------------------------------------------------------//
var text = require('users/gena/packages:text')
var style = require('users/gena/packages:style')
var palette = ['000000','000096','0064ff', '00b4ff', '33db80', '9beb4a','ffeb00', 'ffb300', 'ff6400', 'eb1e00', 'af0000']
var scale = 2500 // TODO: compute scale from region width / 600 instead of fixing
var textProperties = { fontSize: 32, textColor: 'ffffff' }
// gradient bar
var labels = ee.List.sequence(8, 20, 6)
var pt1 = text.getLocation(AOI, 'left', '90%', '5%')
var pt2 = text.getLocation(AOI, 'right', '85%', '35%')
var rect = ee.Geometry.Rectangle([pt1, pt2], 'EPSG:4326', false)
var gradientBar = style.GradientBar.draw(rect, {
  min: 8, max: 20, palette: palette, labels: labels, 
  format: '%d', text: textProperties, scale: scale
})
//-----------------------------------------------------------------------------------
var prepColOutline = prepFilVis.map(function(img) {
  var scale = 2500;
  var textVis = {fontType: 'Arial', fontSize: 32, textColor: 'ffffff', outlineColor: '000000', outlineWidth: 2.5, outlineOpacity: 0.6 };
  var label = text.draw(img.get('system:index'), pt, scale, textVis);
  //var label = text.draw(img.date().format('YYYY-MM-dd'), pt, scale, textProperties)
  return img.blend(centralAmOutline).unmask(0).blend(label).blend(gradientBar);
});
var Thumbnail = {
  dimensions: 550,
  region: centralAmAoi,
  framesPerSecond: 7,
  crs: 'EPSG:3857'
};
var Animation = ui.Thumbnail( {
              image: (prepColOutline),
              params: Thumbnail,
              style: {
                      position: 'bottom-right',
                      fontFamily:'Century Gothic',
                      width: '500px'}}); 
Map.add(Animation, Thumbnail);
}
//-----------------------------------Agregar etiquedas el mapa---------------------------------------------------//
//**********************************-------------------------****************************************************//
//Base de datos que deseamos visulizar sus etiquetas
var lmopi = Pueblos_Indigenas//
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
var selectionLayer = ui.Map.Layer(ee.Image(), { color: 'feb24c' }, 'Click')
Map.layers().add(selectionLayer)
function inspect(coords) {
  var point = ee.Geometry.Point([coords.lon, coords.lat]);
  // generated search geometry and update it
  var scale = Map.getScale()
  var searchRadius = 5
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
      'País: ' + f.properties.Pais,
      'Pueblo Indígena: ' + f.properties.ETNIA_1
    ])
  })
}
//Map.addLayer(list)
Map.add(inspector);
Map.onClick(inspect)
Map.style().set({ cursor: 'crosshair' })
};//Fin de rumclima