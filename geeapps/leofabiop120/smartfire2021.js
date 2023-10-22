var Cobertura_2018 = ui.import && ui.import("Cobertura_2018", "image", {
      "id": "users/leofabiop120/GEF-6/Cobertura_gef_6_30x30_gee"
    }) || ee.Image("users/leofabiop120/GEF-6/Cobertura_gef_6_30x30_gee"),
    logo_fao = ui.import && ui.import("logo_fao", "image", {
      "id": "users/leofabiop120/fao"
    }) || ee.Image("users/leofabiop120/fao"),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "b1",
          "b2",
          "b3"
        ],
        "min": 73,
        "max": 255,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["b1","b2","b3"],"min":73,"max":255,"gamma":1},
    logo_conecta = ui.import && ui.import("logo_conecta", "image", {
      "id": "users/leofabiop120/logo_conecta_gee_2"
    }) || ee.Image("users/leofabiop120/logo_conecta_gee_2"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -87.91949820404757,
                14.78898413557412
              ],
              [
                -87.91949820404757,
                13.958884034313348
              ],
              [
                -86.45831656342257,
                13.958884034313348
              ],
              [
                -86.45831656342257,
                14.78898413557412
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
        [[[-87.91949820404757, 14.78898413557412],
          [-87.91949820404757, 13.958884034313348],
          [-86.45831656342257, 13.958884034313348],
          [-86.45831656342257, 14.78898413557412]]], null, false),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "users/leofabiop120/GEF-6/muni_gef_6"
    }) || ee.FeatureCollection("users/leofabiop120/GEF-6/muni_gef_6"),
    table = ui.import && ui.import("table", "table", {
      "id": "users/leofabiop120/GEF-6/Limite_total_gee"
    }) || ee.FeatureCollection("users/leofabiop120/GEF-6/Limite_total_gee"),
    table3 = ui.import && ui.import("table3", "table", {
      "id": "users/leofabiop120/Limite_HN"
    }) || ee.FeatureCollection("users/leofabiop120/Limite_HN"),
    logo_icf = ui.import && ui.import("logo_icf", "image", {
      "id": "users/leofabiop120/logo_icf_gee5"
    }) || ee.Image("users/leofabiop120/logo_icf_gee5");
// *********************************************************************************************************************************************************
//              Sistema integral sobre el monitoreo, evaluación y reporte de los incendios forestal (Smart_Fire Tool) (Version 1.4)
// *********************************************************************************************************************************************************
// 
//  * Proyecto:  FAO / Conecta+
//  *
//  * Propósito:- Mapeo de las cicatrices de incendios forestales 
//  *           - Detección de alertas temprana basado en puntos de calor (FRIMS)
//  *           - Estimación de alerta temprana basado en el índice de detección de flama (FDI) 
//  *           - Monitoreo y evaluacíon de la cobertura forestal mediente el uso de imagenes Sentinel
//  *
//  * Info:     - Sentinel-2 MSI: MultiSpectral Instrument, Level-1C 
//  *           - Sentinel 2 permite detectar anomalías térmicas a una resolución de 10 m, mientras que la excelente resolución de las alertas VIIRS y MODIS es de 375 y 500 m, y faltan incendios activos más pequeños.)
//  *           - Flame Detection Index   https://gofcgold.org/sites/default/files/2019-12/Roma_Redlatif_Nicolas.pdf
//  *           - (Script: https://code.earthengine.google.com/c10b108e056a4e9aaf4418a323758982)
//  *           - FIRMS https://earthdata.nasa.gov/earth-observation-data/near-real-time/firms/about-firms
//  *
//  * Autor:    Fabio Casco
//
//  * Equipo Conecta+/FAO           
//  * Rommel Sarmiento          
//  * Iván Maradiaga
//  * Omar Orellana
//  
//**********************************************************************************************************************************************************
// *********************************************************************************************************************************************************
// Definición en el uso del interfaz  **************************************************************************************
// *********************************************************************************************************************************************************
var studyarea0;
var studyarea1;
var studyarea;
var dropdownPanel;
var admin1Selected;
var admin0Selected;
var admin0Select
var admin1Select
var admin2Select
var admin0Names;
var admin1Names;
var dot;
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
var cantidadDia = 6;
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
var Header = ui.Label('Sistema Inteligente de Monitoreo y Evaluación de Incendios (Smart-Fire)',{fontWeight: 'bold', fontSize: '20px', textAlign: 'center'});
var lbl_subtitulo = ui.Label(
  {
    value: 'Con el objetivo de promover la prevención de los incendios forestales, la presente herramienta pone a dispocisón un Sistema de Monitoreo y Evaluación de IF con la finalidad de brindar información útil y precisa, la cual permitirá a los tomadores de decisión realizar acciones mas oportunas. ',
    style: {  margin: '10px 5px',fontSize: '12px', textAlign: 'justify' }
  });
var linea1 = ui.Label('__________________________________________________________')
var Subheader0 = ui.Label(
  {value: 'Defina los parámetros del mapa:',
    style: { margin: '10px 5px', textAlign: 'justify', color:'#ffffff', 
    backgroundColor: '#454545' , stretch: 'horizontal', fontSize: '15px', padding : '0px 12px'}
  });
var Subheader1 = ui.Label(
  {value: '1.Período de Análisis:',
    style: { textAlign: 'justify', color:'White', stretch: 'horizontal', fontSize: '15px',backgroundColor: 'Silver'}
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
var panelFechas = ui.Panel({
        widgets: [label_Start_base_select,dateInicio,label_End_base_select, dateFinal],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
var label_RFname_select = ui.Label({value: '2.Definir área de estudio:',
    style: {  textAlign: 'justify', color:'White', stretch: 'horizontal', fontSize: '15px',backgroundColor: 'Silver'}
  });
var RFname_select = ui.Select({
  items: [
    {label:'R.F El Pacifico', value:'R.F El Pacifico'},
    {label:'R.F. Fco. Morazan', value:'R.F. Fco. Morazan'},
    {label:'R.F. Occidente', value:'R.F. Occidente'},
    {label:'R.F. Comayagua', value:'R.F. Comayagua'},
    {label:'R.F. El paraiso', value:'R.F. El paraiso'},
    {label:'R.F. Yoro', value:'R.F. Yoro'},
    {label:'R.F. La mosquitia', value:'R.F. La mosquitia'},
    {label:'R.F Atlantida', value:'R.F Atlantida'},
    {label:'R.F. Nor Este De Olancho', value:'R.F. Nor Este De Olancho'},
    {label:'R.F. Olancho', value:'R.F. Olancho'},
    {label:'R.F. Nor Occidente', value:'R.F. Nor Occidente'},
    {label:'R.F. Bisofera Del Rio Platano', value:'R.F. Bisofera Del Rio Platano'},
    ],
	value: 'R.F. Fco. Morazan',
  onChange: function(value) {
    var RFname = value
  },
  style: {width: '200px'}
});
var AOI_selection = ui.Checkbox({
  label: 'Use un polígono AOI',  
  value: false,
  onChange: function(value) {
    var AOI_selection = value
  }
});
var Asset_selection = ui.Checkbox({
  label: 'Use un archivo Shapefile del Asset',  
  value: false,
  onChange: function(value) {
    var Asset_selection = value
  }
});
var Gef_selection = ui.Checkbox({
  label: 'Área de estudio GEF-6',  
  value: false,
  onChange: function(value) {
    var Gef_selection = value
  }
});
var Subheader2 = ui.Label(
  {value: '3.Definir Párametros de FDI :',
    style: {  textAlign: 'justify', color:'White', stretch: 'horizontal', fontSize: '15px',backgroundColor: 'WhiteSmoke'}
  });
var label_FDI = ui.Label(' Índice de Flama (FDI):');
var FDI_select = ui.Textbox({
  value: 2,
  style: {width : '90px', textAlign: 'right'},
  onChange: function(text) {
    var FDI = text
  }
});
var panelFDI = ui.Panel({
        widgets: [label_FDI,FDI_select],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
var Subheader3 = ui.Label(
  {value: '3.Definir Párametros de Modelo :',
    style: {  textAlign: 'justify', color:'White', stretch: 'horizontal', fontSize: '15px',backgroundColor: 'Silver'}
  });
var lbl_modelo_1 = ui.Label(
  {
    value: 'Modelos 1 : Modelación de incendios basado en clasificaciones ',
    style: {  margin: '0px 5px',fontSize: '10px', textAlign: 'justify',  color: 'LightGrey'}
  });
var lbl_modelo_2 = ui.Label(
  {
    value: 'Modelos 2 : Estimación de incendios con base a umbrales espectrales',
    style: {  margin: '0px 5px',fontSize: '10px', textAlign: 'justify',  color: 'LightGrey'}
  });
var Subheader4 = ui.Label(
  {value: '4.Filtros de calidad de datos :',
    style: {  textAlign: 'justify', color:'White', stretch: 'horizontal', fontSize: '15px',backgroundColor: 'Silver'}
  });
var Subheader5 = ui.Label(
  {value: '5.Mascara :',
    style: {  textAlign: 'justify', color:'White', stretch: 'horizontal', fontSize: '15px',backgroundColor: 'Silver'}
  });
var Subheader6 = ui.Label(
  {value: '6.Parámetros de Visualización :',
    style: {  textAlign: 'justify', color:'White', stretch: 'horizontal', fontSize: '15px',backgroundColor: 'Silver'}
  });
var Subheader7 = ui.Label(
  {value: 'Análisis y Procesamiento :',
    style: {  textAlign: 'justify', color:'DarkGrey', stretch: 'horizontal', fontSize: '11px',backgroundColor: 'Azure'}
  });
var Subheader8 = ui.Label(
  {value: 'Combinanción de Bandas :',
    style: {  textAlign: 'justify', color:'DarkGrey', stretch: 'horizontal', fontSize: '11px',backgroundColor: 'Azure'}
  });
  var Subheader9 = ui.Label(
  {value: 'BD Bajo Regimen Forestal :',
    style: {  textAlign: 'justify', color:'DarkGrey', stretch: 'horizontal', fontSize: '11px',backgroundColor: 'Azure'}
  });
  var Subheader10 = ui.Label(
  {value: 'BD de Alertas :',
    style: {  textAlign: 'justify', color:'DarkGrey', stretch: 'horizontal', fontSize: '11px',backgroundColor: 'Azure'}
  });
 var Subheader11 = ui.Label(
  {value: 'Niveles de Contaminación :',
    style: {  textAlign: 'justify', color:'DarkGrey', stretch: 'horizontal', fontSize: '11px',backgroundColor: 'Azure'}
  });
var linea2 = ui.Label('__________________________________________________________')
var Subheader12 = ui.Label(
  {value: 'Opciones para Exportar:',
    style: {margin: '10px 5px', textAlign: 'justify', color:'#ffffff', 
    backgroundColor: '#454545' , stretch: 'horizontal', fontSize: '15px', padding : '0px 12px'}
  });  
//Panel de Indice de severidad y S2 sin nubes
var IS_selection = ui.Checkbox({
  label: 'Índice de Severidad', 
  value: false,
  onChange: function(value) {
    var IS_select = value
  }
});
var S2_sin_nubes_selection = ui.Checkbox({
  label: 'Imagen sin nubes', 
  value: false,
  onChange: function(value) {
    var S2_sin_nubes_select = value
  }
});
var panel_IS_S2_sinNubes = ui.Panel({
        widgets: [IS_selection,S2_sin_nubes_selection],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
//Panel de Mapa Forestal y Organizaciones de Apoyo
var Mapa_Forestal_selection = ui.Checkbox({
  label: 'Mapa Cobertura F..', 
  value: false,
  onChange: function(value) {
    var Mapa_Forestal_select = value
  }
});
var Org_Apoyo_selection = ui.Checkbox({
  label: 'Organizaciones de Apoyo', 
  value: false,
  onChange: function(value) {
    var Org_Apoyo_select = value
  }
});
var panel_MapaForest_Org_Apoyo = ui.Panel({
        widgets: [Mapa_Forestal_selection,Org_Apoyo_selection],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
//Panel de AP y Microcuencas
var AP_selection = ui.Checkbox({
  label: 'Áreas Protegidas...', 
  value: false,
  onChange: function(value) {
    var AP_select = value
  }
});
var Microcuencas_selection = ui.Checkbox({
  label: 'Microcuencas', 
  value: false,
  onChange: function(value) {
    var Microcuencas_select = value
  }
});
var panel_AP_Micro = ui.Panel({
        widgets: [AP_selection,Microcuencas_selection],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
//Panel de Alertas FDI y FIRMS
var Alertas_FDI_selection = ui.Checkbox({
  label: 'Alertas FDI.............', 
  value: false,
  onChange: function(value) {
    var Alertas_FDI_select = value
  }
});
var Alertas_FIRMS_selection = ui.Checkbox({
  label: 'Alertas FIRMS', 
  value: false,
  onChange: function(value) {
    var Alertas_FIRMS_select = value
  }
});
var panel_Alertas_FDI_FIRMS = ui.Panel({
        widgets: [Alertas_FDI_selection,Alertas_FIRMS_selection],
        layout: ui.Panel.Layout.Flow('horizontal')
      });   
//Panel Alertas MODIS y GOES
var burnedArea_frequency_selection = ui.Checkbox({
  label: 'Análisis de Frecuencia AQ', 
  value: false,
  onChange: function(value) {
    var burnedArea_frequency_select = value
  }
});
var GOES_selection = ui.Checkbox({
  label: 'Alertas GOES', 
  value: false,
  onChange: function(value) {
    var GOES_select = value
  }
});
var panel_Alertas_MODIS_GOES = ui.Panel({
        widgets: [burnedArea_frequency_selection,GOES_selection],
        layout: ui.Panel.Layout.Flow('horizontal')
      });   
//*********************************************************************
var Imagen_sin_nubes_selection = ui.Checkbox({
  label: 'Filtro de Nube', 
  value: false,
  onChange: function(value) {
    var Imagen_sin_nubes_selection = value
  }
});
var Neighborhood_selection = ui.Checkbox({
  label: 'Filtro Neighborhood', 
  value: false,
  onChange: function(value) {
    var Neighborhood_selection = value
  }
});
var BNB_VS_selection = ui.Checkbox({
  label: 'Mascara de Bosque y vs', 
  value: false,
  onChange: function(value) {
    var BNB_VS_selection = value
  }
});
var panel_Filtro_nube_Neig = ui.Panel({
        widgets: [Imagen_sin_nubes_selection,Neighborhood_selection],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
//*********************************************************************
var export_selection_S2 = ui.Checkbox({
  label: 'Exporta Escena S2 con Nubes', 
  value: false,
  onChange: function(value) {
    var export_select_S2 = value
  }
});
/*
var export_selection_S2_Nubes = ui.Checkbox({
  label: 'Exporta Escena S2 sin Nubes', 
  value: false,
  onChange: function(value) {
    var export_select_S2_Nubes = value
  }
});
*/
var export_selection_AlertasFDI = ui.Checkbox({
  label: 'Exportar Alertas FDI', 
  value: false,
  onChange: function(value) {
    var export_select_AlertasFDI = value
  }
});
var export_selection_AlertasFIRMS = ui.Checkbox({
  label: 'Exportar Alertas FIRMS', 
  value: false,
  onChange: function(value) {
    var export_select_AlertasFIRMS = value
  }
}); 
var export_selection_Cicatrices1 = ui.Checkbox({
  label: 'Exportar Cicatrices', 
  value: false,
  onChange: function(value) {
    var export_select_cicatrices1 = value
  }
});
/*
var export_selection_Cicatrices2 = ui.Checkbox({
  label: 'Exportar Cicatrices M2', 
  value: false,
  onChange: function(value) {
    var export_select_cicatrices2 = value
  }
});
*/
//**********************************************************************
var linea3 = ui.Label('__________________________________________________________')
logo_fao = logo_fao.visualize(imageVisParam);
var logo = ui.Thumbnail({
  image: logo_fao,
  style: {height: '55px', width: '210px'}
});
logo_conecta = logo_conecta.visualize(imageVisParam);
var logo2 = ui.Thumbnail({
  image: logo_conecta,
  style: {height: '60px', width: '130px'}
});
var panel_logos = ui.Panel({
        widgets: [logo,logo2],
        layout: ui.Panel.Layout.Flow('horizontal')
      })
logo_icf = logo_icf.visualize(imageVisParam);
var logo3 = ui.Thumbnail({
  image: logo_icf,
  style: {height: '55px', width: '210px'}
});
//-------------------------------------------------
var Modelo = "Modelo 1: Clasificación"
var listaModelo = {"Modelo 1: Clasificación"  :"Modelo 1: Clasificación",
                   "Modelo 2: Ubral Espectral"  :"Modelo 2: Ubral Espectral"
}
var modelo_incendio = ui.Select({
  style: {width : '200px', textAlign: 'right'},
  items: Object.keys(listaModelo),
  onChange: function(key) {
    Modelo = key;
}});
modelo_incendio.setPlaceholder('Modelo de Incendio');
var label_modelo = ui.Label(' Modelo de Incendios:');
var panel_modelo = ui.Panel({
        widgets: [modelo_incendio],
        layout: ui.Panel.Layout.Flow('horizontal')
      })
var contaminacion  = "N/A"
var lista_contaminacion = {"NO2"  :"NO2",
                           "CO"   :"CO",
                           "SO2"  :"SO2",
                           "N/A"  :"N/A"
}
var Contaminacion_select = ui.Select({
  style: {width : '200px', textAlign: 'right'},
  items: Object.keys(lista_contaminacion),
  onChange: function(key) {
    contaminacion = key;
}});
Contaminacion_select.setPlaceholder('N/A');
var label_Contaminacion = ui.Label('Contaminación:');
var panel_contaminacion = ui.Panel({
        widgets: [label_Contaminacion,Contaminacion_select],
        layout: ui.Panel.Layout.Flow('horizontal')
      })
//-----------------------------------------------------
//----------------------------------------------------
var Combinacion_Banda = "Incendio"
var lista_combinacion = {"Incendio"  :"Incendio",
                           "Incendio 2"   :"Incendio 2",
                           "Vegetacion"  :"Vegetacion",
                           "Agricultura"  :"Agricultura",
                           "Color Natural"  :"Color Natural"
}
var Combinacion_select = ui.Select({
  style: {width : '200px', textAlign: 'right'},
  items: Object.keys(lista_combinacion),
  onChange: function(key) {
    Combinacion_Banda = key;
}});
Combinacion_select.setPlaceholder('Incendio');
var label_Combinacion = ui.Label('Combinación   :  ');
var panel_combinacion = ui.Panel({
        widgets: [label_Combinacion,Combinacion_select],
        layout: ui.Panel.Layout.Flow('horizontal')
      })
//----------------------------------------------------
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
var notesShow = false;
function notesButtonHandler() {
  if(notesShow){
    notesShow = false;
    notesPanel.style().set('shown', false);
    notesPanel.style().set('width', '83px');
    notesButton.setLabel('Ver Nota');
  } else {
    notesShow = true;
    notesPanel.style().set('shown', true);
    notesPanel.style().set('width', '290px');
    notesButton.setLabel('Ocultar Nota');
  }
}
// Note style.
var noteStyle = {backgroundColor: 'rgba(0, 0, 0, 0.0)', fontSize: '8px', fontWeight: '500', margin: '8px 8px 1px 8px'};
// Show/hide note button.
var notesButton = ui.Button({label: 'Ver Nota', onClick: notesButtonHandler, style: {margin: '0px'}});
// Notes panel.
var notesPanel = ui.Panel({
  widgets: [
  ui.Label({value:'Smart-Fire, es una herramienta interactiva y dinámica para la evaluación y el monitoreo de los incendios', style: noteStyle}),
  ui.Label({value:'Para su uso adecuado, siga los siguientes pasos', style: noteStyle}),
  ui.Label({value:'1) Defina los parámetros del Mapa', style: noteStyle}),
  ui.Label({value:'2) Haga click en el botón RUN FIRE', style: noteStyle}),
  ui.Label({value:'3) Haga click en Layer, para visualizar las capas', style: noteStyle}),
  ui.Label({value:'4) Haga clic en un punto en el mapa para inspeccionar', style: noteStyle}),
  ui.Label({value:'* Espere a que cargue la información en el panel', style: noteStyle}),
  ui.Label({value:'________________________________________________', style: noteStyle}),
  ui.Label({value:'* Análisis del Clima en tiempo real: Windy', style: noteStyle, targetUrl:'https://www.windy.com/es/-Mostrar---a%C3%B1adir-m%C3%A1s-capas/overlays?cosc,14.404,-86.716,9'}),
  ui.Label({value:'* Descripción de datos nacionales: Geportal ICF', style: noteStyle, targetUrl: 'http://geoportal.icf.gob.hn/'}),
  ui.Label({value: '• Leer sobre European Union/ESA/Copernicus.', style: noteStyle, targetUrl: 'https://earth.esa.int/web/sentinel/user-guides/sentinel-2-msi/product-types/level-1c'}),
  ui.Label({value: '• Leer sobre NASA/LANCE/EOSDIS.', style: noteStyle, targetUrl: 'https://earthdata.nasa.gov/earth-observation-data/near-real-time/firms'}),
  ui.Label({value: '• Leer sobre NASA LP DAAC at the USGS EROS Center.', style: noteStyle, targetUrl: 'https://lpdaac.usgs.gov/products/mod14a2v006/'}),
  ui.Label({value: '• Leer sobre NOAA.', style: noteStyle, targetUrl: 'https://data.noaa.gov/dataset/dataset/noaa-goes-r-series-advanced-baseline-imager-abi-level-2-fire-hot-spot-characterization-fdc'}),
  ui.Label({value: '• Consulte la descripción de los datos en el catálogo de datos de Earth Engine.',
        style: {backgroundColor: 'rgba(0, 0, 0, 0.0)', fontSize: '8px', fontWeight: '500', margin: '8px 8px 8px 8px'},
        targetUrl: 'https://developers.google.com/earth-engine/datasets/catalog/JRC_GSW1_1_YearlyHistory'}),
    ui.Label({value:'Referemcia Sugerida', style: noteStyle}),
    ui.Label({value:'Casco, F.; Orellana, O.; Sarmiento, R.; Maradiaga, I. 2020. Sistema Inteligente de Monitoreo y Evaluación de Incendios. Proyecto GEF  6 de Honduras “Paisajes agroforestales y manejo forestal sostenible que generen beneficios ambientales y económicos a nivel global y local. Conecta+/FAO. Ciudad de Tegucigalpa, Honduras.', style: noteStyle}),
    ui.Label({value:'Si desea reportar una emergencia, llamar al 911', style: noteStyle})
  ],
  style: {shown: false, backgroundColor: 'rgba(255, 255, 255, 0.8)', fontSize: '11px', fontWeight: '500'}
});
// Notes panel container.
var notesContainer = ui.Panel({widgets: [notesButton, notesPanel],
  style: {position: 'bottom-left', padding: '8px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'}});
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
//panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
var panel_lon_lat = ui.Panel({
        widgets: [lon,lat],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
//****************
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
panel.add(panel_logos);
panel.add(Header);
panel.add(lbl_subtitulo);
panel.add(linea1);
panel.add(Subheader0);
panel.add(Subheader1);
panel.add(panelFechas);
panel.add(label_RFname_select);
panel.add(dropdownPanel);
//panel.add(RFname_select);
//panel.add(AOI_selection);
//panel.add(Asset_selection);
//panel.add(Gef_selection);
panel.add(Subheader3);
panel.add(panel_modelo);
panel.add(lbl_modelo_1);
panel.add(lbl_modelo_2);
panel.add(Subheader4);
panel.add(panel_Filtro_nube_Neig);
panel.add(Subheader5);
panel.add(BNB_VS_selection);
panel.add(Subheader6);
panel.add(Subheader7);
panel.add(panel_IS_S2_sinNubes);
panel.add(Subheader8);
panel.add(panel_combinacion);
panel.add(Subheader9);
panel.add(panel_MapaForest_Org_Apoyo);
panel.add(panel_AP_Micro);
panel.add(Subheader10);
panel.add(panel_Alertas_FDI_FIRMS);
panel.add(panel_Alertas_MODIS_GOES);
//panel.add(Subheader11);
//panel.add(panel_contaminacion);
//panel.add(linea2)
//panel.add(Subheader12);
//panel.add(export_selection_S2);
//panel.add(export_selection_S2_Nubes);
//panel.add(export_selection_AlertasFDI);
//panel.add(export_selection_AlertasFIRMS);
//panel.add(export_selection_Cicatrices1);
//panel.add(export_selection_Cicatrices2);
//panel.add(linea3)
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
//Esta opción agrega el panel a lado izquierdo. Si cambiamos el valor a 1, lo pasa al lado derecho 
ui.root.insert(0,panel);
var AddButton = function(){
      var button = ui.Button('Run Fire');
      button.style().set({
        position: 'top-center',
        border : '1px solid #000000',
      });
      button.onClick(function(){return runSmartFire()});
      Map.add(button);
//Agragar estilo
//Estilo Oscuro
var style = require('users/gena/packages:style')
//Agregar estilo de mapa Oscuro (Darck)
style.SetMapStyleDark()
//Terrain
Map.setControlVisibility(true, true, true, true, true).setOptions("TERRAIN");
Map.style().set('cursor', 'crosshair');
}
AddButton();
//Panel 2. Deracha
var panel2 = ui.Panel();
panel2.style().set('width', '300px');
panel2.add(logo3)
panel2.add(notesContainer);
panel2.add(panel_lon_lat);
//panel2.add(Label_Grafico);
ui.root.insert(2, panel2);
// *********************************************************************************************************************************************************
// Functiones de el script *********************************************************************************************************************************
// *********************************************************************************************************************************************************
var runSmartFire = function(){
    Map.clear();
    AddButton();
    var startDate =        Date_inicial;//Start_second_select //.getValue();
    var endDate =          Date_final;//End_second_select   //.getValue();
   // var RFname =           RFname_select       .getValue();
   // var AOI_select =       AOI_selection       .getValue();
   // var Asset_select =     Asset_selection     .getValue();
   // var Gef_select =       Gef_selection       .getValue();
    var depa_names =     admin0Select.getValue();
    var muni_names =     admin1Select.getValue();
    var FDI_threshold =    FDI_select          .getValue();
    var IS_select = IS_selection                       .getValue();
    var S2_sin_nubes_select = S2_sin_nubes_selection   .getValue();
    var Mapa_Forestal_select = Mapa_Forestal_selection .getValue();
    var AP_select = AP_selection                       .getValue();
    var Microcuencas_select = Microcuencas_selection   .getValue();
    var Org_Apoyo_select = Org_Apoyo_selection         .getValue();
    var Alertas_FDI_select = Alertas_FDI_selection     .getValue();
    var Alertas_FIRMS_select = Alertas_FIRMS_selection .getValue();
    var burnedArea_frequency_select = burnedArea_frequency_selection .getValue();
    var GOES_select = GOES_selection .getValue();
    var Imagen_sin_nubes_select = Imagen_sin_nubes_selection .getValue();
    var Neighborhood_select = Neighborhood_selection .getValue();
    var BNB_VS_select = BNB_VS_selection .getValue();
    var export_select_S2 = export_selection_S2         .getValue();
   // var export_select_S2_Nubes = export_selection_S2_Nubes        .getValue();
    var export_select_AlertasFDI = export_selection_AlertasFDI    .getValue();
    var export_select_AlertasFIRMS = export_selection_AlertasFIRMS.getValue();
    var export_select_cicatrices1 = export_selection_Cicatrices1  .getValue();
    //var export_select_cicatrices2 = export_selection_Cicatrices2    .getValue();
    //var urlpoint = urlpoint  .getValue();
//var polygonAreas = require("users/leofabiop120/Smart_Fire:polygonAreas");
addDrawPolygonButton( Map, {position : "top-right"}, true, true ); 
//--------------------------------------------DEFINIR PÁRAMETROS--------------------------------------------//
//**********************************************************************************************************//
/*
    var Regiones_Forestales = ee.FeatureCollection("users/leofabiop120/GEF-6/Regiones_forestales_corregido2").filterMetadata('ZPC_HN','equals',RFname); // Country border polygons of high accuracy
    var studyarea = ee.FeatureCollection([Regiones_Forestales.geometry()]); // The study area is set to above selection
  if (AOI_select === true){
      var AOI = geometry;//.dissolve();
     studyarea =  ee.FeatureCollection([AOI]);
      RFname = 'Polygon';
    }
  if (Asset_select === true){
      var Asset = table;
       studyarea = table;
      RFname = 'Asset';
      Map.addLayer (studyarea,{},'Asset',false);
    }   
    if (Gef_select === true){
      Asset = table2;
      studyarea = table2;
      RFname = 'Gef_6';
      Map.addLayer (studyarea,{},'Gef_6',false);
    }   
*/
// Area de estudio
var admin00 = ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level0");
var admin0 = admin00.filter(ee.Filter.inList('ADM0_NAME', ['Honduras']));
var studyarea0 = ee.FeatureCollection([admin0.geometry()]);
var admin11= ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level1");
var admin1 = admin11.filter(ee.Filter.inList('ADM0_NAME', ['Honduras']));
var depa = ee.FeatureCollection(admin1).filter(ee.Filter.inList('ADM1_NAME', [depa_names])); // Country border polygons of high accuracy
studyarea1 = ee.FeatureCollection([depa.geometry()]);
var admin22= ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level2");
var admin2 = admin22.filter(ee.Filter.inList('ADM0_NAME', ['Honduras']));
var depar = ee.FeatureCollection(admin2).filter(ee.Filter.inList('ADM1_NAME', [depa_names]));
var muni = ee.FeatureCollection(depar).filter(ee.Filter.inList('ADM2_NAME', [muni_names]));
studyarea = ee.FeatureCollection([muni.geometry()]); 
if (muni_names === null){
  studyarea = studyarea1;
}
//Colecciones de Datos
var FIRMS =            ee.ImageCollection('FIRMS');//focos de incendios
var Sentinel_2 =       ee.ImageCollection('COPERNICUS/S2');
var sentinel1_NO2 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
var sentinel1_CO  = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO")
var sentinel1_SO2 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_SO2")
//Base de Datos ICF
var AP = ee.FeatureCollection("users/leofabiop120/AP_gee");                         // Areas Protegidas ICF
var MC = ee.FeatureCollection("users/leofabiop120/microcuencas_declaradas_111019"); // Microcuencas Declaradas ICF
var Mapa_Forestal_2018 = ee.Image("users/leofabiop120/mapa_forestal_2018_30x30_gee")// Mapa Forestal 2018
var Mapa_BNB_VS_2018 = ee.Image("users/leofabiop120/GEF-6/BNB_vegetacion_sec_2018_reclass").eq(1);// Mapa de Bosque y Vegetación Secundaria
Mapa_BNB_VS_2018.mask(Mapa_BNB_VS_2018);
var organizacion = ee.FeatureCollection("users/leofabiop120/Organizaciones_gee");   //Bomberos, Militares y Oficinas Locales de ICF
//--------------------------------------------------FUNCIONES------------------------------------------------//
//**********************************************************************************************************//
//Funcion fecha
function fechaLugar(imagecollection) {
  var filtro = imagecollection
  .filterDate(startDate,endDate);
  var lugar = filtro
  .filterBounds(studyarea)
  return lugar}
//Función para corregir nubes
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).clip(studyarea)//.divide(10000)
  .copyProperties(image, ['system:time_start']);
}
// Obtener rango de fecha de la colección
//var Rango = S2_modelar.filterBounds(studyarea).reduceColumns(ee.Reducer.minMax(), ["system:time_start"])
//print('Rango de Fechas Consultadas: ', ee.Date(Rango.get('min')), ee.Date(Rango.get('max')))
//Obtener una lista de la colección de las imagenes que vamos a utilizar
/*
var scene_ids = function(coll) {
    return coll.toList(coll.size(), 0).map(function(im) {
    return ee.String(ee.Image(im).id()).slice(0);
    });
  };
print("Lista de Imagenes", scene_ids(S2_modelar));
*/
//******************************-------------Enmascaramiento de Nubes y Sombras------------*******************************************//
//******************************-----------------------------------------------------------*******************************************//
//Mosaico Con Nubes
//Filtro para Modelar
var S2_filtrado = fechaLugar(Sentinel_2);
var S2_mosaic = S2_filtrado.mosaic();
var S2_clip = ee.ImageCollection(S2_mosaic.clip(studyarea));
var image1= S2_clip.median()
//Mosaico sin nubes para modelar
var masks = require('users/fitoprincipe/geetools:cloud_masks')
//var S2_sin_nubes_modelar = S2_clip.map(masks.hollstein_S2()) //Este Método quita bien las nubes y sombras
var S2_sin_nubes_modelar = S2_clip.map(maskS2clouds)         //Este Método quita bien solo las nubes
var S2_Col = ee.ImageCollection(S2_sin_nubes_modelar);
var S2_sin_nubes_2 = S2_Col//.map(masks.hollstein_S2())
var S2_sin_nubes_3 = S2_Col.map(masks.hollstein_S2())
var image2= S2_sin_nubes_2.mosaic()
var image3= S2_sin_nubes_3.mosaic()
var Imagen_select =  image1;
if (Imagen_sin_nubes_select === true){
    Imagen_select = image3;
}
//******************************-----------------------------Calculo de FDI----------------*******************************************//
//******************************-----------------------------------------------------------*******************************************//
//Calculo de Flame Detection Index (FDI) con la imagen con nubes
var FDI = image1.expression(
  "SWIR2/Redge",{
    "SWIR2":image1.select("B12"),
    "Redge":image1.select("B5")
  }).rename('FDI').gt(2.5);
//Emascaramiento de FDI y renombramiento de banda
var onlyFDI = FDI.updateMask(FDI.eq(1)).rename('onlyFDI');
//Calculo de área quemada según FDI
var area = onlyFDI.multiply(ee.Image.pixelArea().divide(10000));
var stats_fire1 = area.reduceRegion({reducer: ee.Reducer.sum(),geometry: studyarea, scale: 30, bestEffort : true, maxPixels: 1e13, tileScale: 16});
//print('Área: Fuegos Activos FDI (Ha): ', stats_fire1.get('onlyFDI'));
// Reducir Area_Estudioas de fuejo de  S2  a una imagen binaria única
var S2count  = ee.Image(onlyFDI).clip(studyarea);
var S2binary = S2count .eq(S2count).rename('S2_binary_Area_Estudio');
//¨Proiedades de proyección y escala
//Para extraer parametros de escala y crs
var S2__B5_B12 =S2_filtrado.select(['B5','B12'])
var project_crs   = ee.Image(S2__B5_B12.first()).projection().crs();
var scale = ee.Image(S2__B5_B12.first()).projection().nominalScale(); 
//Función para calcular centroides
function vector_point (image) {
var S2point = image.reduceToVectors({
  geometry: studyarea,
  eightConnected:true,
  labelProperty:'S2_fire',
  maxPixels:1e12,
  crs:project_crs,
  scale:scale,
  geometryType: 'centroid',
});
  return S2point
}
//Aplicar Funciones
var S2point =vector_point(S2binary);
//Imprimir valores en la Console sobre las alertas por tipo de Cobertura
var numero_alertas_FDI=S2point.geometry()
print('Alertas FDI', numero_alertas_FDI.coordinates().length());
//******************************--------------PROCESAMIENTO DE COLECCION FIRMS-------------*******************************************//
//******************************-----------------------------------------------------------*******************************************//
//FILTROS DE LA COLLECCIÓN DE IMAGENES 
var FIRMS1 =fechaLugar(FIRMS).select(['T21']);
// Reducir alertas de fuejo de  MODIS  a una imagen binaria única
var FIRMScount  = ee.Image(FIRMS1.count()).clip(studyarea);
var FIRMSbinary = FIRMScount.eq(FIRMScount).rename('FIRMS_binary_alert');
// MODIS fuegos en vector
var FIRMSpoint = FIRMSbinary.reduceToVectors({
  geometry: studyarea,
  eightConnected:true,
  labelProperty:'modis_fire',
  maxPixels:1e12,
  crs:project_crs,
  scale:scale,
  geometryType: 'centroid',
});
var numero_alertas_FIRMS = FIRMSpoint.geometry();
print('Alertas FIRMS', numero_alertas_FIRMS.coordinates().length());
//******************************************----------Calculo de area de incendios----------------**************************************//
//Calculo de área quemada según FDI
/*
var area_fire = fire.multiply(ee.Image.pixelArea().divide(10000));
var stats_fire2 = area_fire.reduceRegion({reducer: ee.Reducer.sum(),geometry: studyarea, scale: 30, tileScale: 16, maxPixels: 1e13});
print('Área de Incendio Modelada: ', stats_fire2.get('Fire'));
*/
//------------------------------------------------Función para alegir el tipo de contaminación y su respectiva leyenada----------------------
//Visualización y combinación de bandas
if (Combinacion_Banda === "Incendio"){
  var FalsoColor = {min: 500.0,  max: 3000.0,
  bands: ['B11', 'B8', 'B2']}; //Composición RGB 11,8,2 (SWIR,NIR,BLUE)
  Map.addLayer(image1, FalsoColor, "Sentinel 2"       ,true);
}
if (Combinacion_Banda === "Incendio 2"){
  FalsoColor = {min: 500.0,  max: 3000.0,
  bands: ["B12", "B8", "B4"]}; 
  Map.addLayer(image1, FalsoColor, "Sentinel 2"       ,true);
}
if (Combinacion_Banda === "Vegetacion"){
  FalsoColor = {min: 500.0,  max: 3000.0,
  bands: ['B8', 'B11', 'B4']}; //Infrarojos
  Map.addLayer(image1, FalsoColor, "Sentinel 2"       ,true);
}
if (Combinacion_Banda === "Agricultura"){
  FalsoColor = {min: 500.0,  max: 3000.0,
  bands: ['B11', 'B8A', 'B2']}; //
  Map.addLayer(image1, FalsoColor, "Sentinel 2"       ,true);
}
if (Combinacion_Banda === "Color Natural"){
  FalsoColor = {min: 500.0,  max: 3000.0,
  bands: ['B4', 'B3', 'B2'],}; //
  Map.addLayer(image1, FalsoColor, "Sentinel 2"       ,true);
}
if (S2_sin_nubes_select === true){ 
Map.addLayer(image3, FalsoColor, "Sentinel 2 Sin Nubes"       ,false);
}
//******************************-----------------------INDICE DE SEVERIDAD A INCENDIOS----------------*******************************************//
//******************************-----------------------------------------------------------*******************************************//
//Créditos: ONU-SPAIDER 
//Enlace: http://www.un-spider.org/es/asesoria/practicas-recomendadas/practica-recomendada-mapeo-gravedad-quemaduras/paso-a-paso/google-earth-engine
//Script de referencia: https://code.earthengine.google.com/cc63b2ca1adc69b891a6ce6c946e4158
if (IS_select === true){ 
//Fecha Pre-Incendio
var startDate_Pre = "2020-01-01";
var endDate_Pre = "2020-01-06";
//Fecha-Post-Incendios
var startDate_Post = startDate;
var endDate_Post = endDate;
//Colección de datos Sentinel 2  
var Pre_Incendio = ee.ImageCollection('COPERNICUS/S2') // Mejor respuesta visual con productos de nivel 2A frente 1C
   .filterDate(startDate_Pre, endDate_Pre)
   //.map(maskS2clouds);
var mosaic_Pre_Incendio = Pre_Incendio.mosaic().clip(studyarea);
var Post_Incendio = ee.ImageCollection('COPERNICUS/S2') // Mejor respuesta visual con productos de nivel 2A frente 1C
   .filterDate(startDate_Post, endDate_Post)
   //.map(maskS2clouds);
var mosaic_Post_Incendio = Post_Incendio.mosaic().clip(studyarea); // Mejor respuesta visual frente a .median()
//////////// INDICE NBR ////////////
var NBR_Post_Incendio= mosaic_Post_Incendio.normalizedDifference (['B8','B12']); // Basado en NBR=(NIR–SWIR)/(NIR+SWIR)
var NBR_Pre_Incendio= mosaic_Pre_Incendio.normalizedDifference (['B8','B12']); // Basado en NBR=(NIR–SWIR)/(NIR+SWIR)
var IndiceSeveridad = NBR_Pre_Incendio.subtract(NBR_Post_Incendio); // Diferencia entre momentos temporales
IndiceSeveridad = IndiceSeveridad.multiply(1000);
//----------------- Producto de severidad del incendio - Clasificación ----------------------
// Define un estilo SLD de intervalos discretos para aplicar a la imagen (paleta de color).
var sld_intervals =
  '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false" >' +
      '<ColorMapEntry color="#ffffff" quantity="-500" label="-500"/>' +
      '<ColorMapEntry color="#7a8737" quantity="-250" label="-250" />' +
      '<ColorMapEntry color="#acbe4d" quantity="-100" label="-100" />' +
      '<ColorMapEntry color="#0ae042" quantity="100" label="100" />' +
      '<ColorMapEntry color="#fff70b" quantity="270" label="270" />' +
      '<ColorMapEntry color="#ffaf38" quantity="440" label="440" />' +
      '<ColorMapEntry color="#ff641b" quantity="660" label="660" />' +
      '<ColorMapEntry color="#FF0000" quantity="2000" label="2000" />' +
    '</ColorMap>' +
  '</RasterSymbolizer>';
// Agregua la imagen al mapa utilizando la rampa de color como los intervalo definidos.
Map.addLayer(IndiceSeveridad.sldStyle(sld_intervals), {}, 'Índice de Severidad');
// Separa el resultado en 8 clases de severidad del incendio.
var thresholds = ee.Image([-1000, -251, -101, 99, 269, 439, 659, 2000]);
var classified = IndiceSeveridad.lt(thresholds).reduce('sum').toInt();
//==========================================================================================
//                                    AGREGAR UNA LEYENDA INDIDICE SEVERIDAD
// establece la posición del recuadro de leyenda.
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }});
// Crea un título de leyenda.
var legendTitle = ui.Label({
  value: 'Clases del dNBR',
  style: {fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }});
// Agregua el título al recuadro.
legend.add(legendTitle);
// Crea y estiliza 1 fila de la leyenda.
var makeRow = function(color, name) {
      // Crea la etiqueta que en realidad es el cuadro de color.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Usa (padding) para rellenoar y dar la altura y el ancho de la caja.
          padding: '8px',
          margin: '0 0 4px 0'
        }});
      // Crea la etiqueta llena con el texto descriptivo.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // devuelve el panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      })};
//  Paleta de colores
var palette =['7a8737', 'acbe4d', '0ae042', 'fff70b', 'ffaf38', 'ff641b', 'FF0000', 'ffffff'];
// Nombre de la leyenda
var names = ['Nuevo rebrote, Alto','Nuevo rebrote, Bajo','No quemado', 'Baja Severidad',
'Moderda-Baja Severidad', 'Moderada-Alta Severidad', 'Alta Severidad', 'NA'];
// Agregua color y nombres
for (var i = 0; i < 8; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// Agrega la leyenda al mapa (también se puede imprimir la leyenda en la consola)
Map.add(legend);
}
//---------------------------------------------------------------------------------------------------------------------//
//------------------------------------------Clasificación de Incendios-------------------------------------------------//
//Nombrar las bandas de los sensores para luego renombrarlas en cada uno de ellos
//var bandas = (['Blue', 'Green', 'Red','NIR', 'SWIR 1', 'SWIR 2'])
var bandas = ['B2', 'B3', 'B4','B5','B6', 'B7', 'B8','B8A','B9', 'B11','B12'];
var Mosaico_Sentinel_modelado = Imagen_select;
//Agregar Índices espectrales al mosaico
var addIndices = require("users/leofabiop120/GEF-6:addIndices");
//var Area_Estudio     = addIndices(Mosaico_Sentinel_base);
var Stack_Modelado = addIndices.addIndices(Mosaico_Sentinel_modelado);
if(Modelo == "Modelo 2: Ubral Espectral"){
//Modelo 1: Script desarrollado por Omar
var NDWI = Imagen_select.expression(
  '(NIR-SWIR)/(NIR+SWIR)',{
    'NIR': Imagen_select.select('B8'),
    'SWIR': Imagen_select.select('B11')
  }).rename('NDWI');
//Reclasificación de NDWI
var clas_NDWI = NDWI.expression (
  "(NDWI < 0.01)? 1\
  :2"
  , {'NDWI' :NDWI.select('NDWI')});
var clas_NDWI_1 = clas_NDWI.eq(1);
var clas_NDWI_2 = clas_NDWI_1.mask(clas_NDWI_1);
//------------------------------------------------
// Calculo diferencia 11 y 12
var B1112 = Imagen_select.expression(
  '(SWIR1-SWIR2)',{
    'SWIR1': Imagen_select.select('B11'),
    'SWIR2': Imagen_select.select('B12')
  }).divide(1000).rename('B11_12');
//Reclasificación de NDV12_16
var clas_IF = B1112.expression (
  "(B11_12 < -0.15)? 1\
  :(B11_12 >0.38)? 3\
  :2"
  , {'B11_12' :B1112.select('B11_12')})
  .mask(Imagen_select.select('B1')).updateMask(clas_NDWI_2);
var clas_IF_1 = clas_IF.eq(2);
var clas_IF_2 = clas_IF_1.updateMask(clas_IF_1);
var IF1112 = clas_IF_2.updateMask(clas_IF_2.eq(1)).rename('IF');
var FDI_umbral = 2;
var FDI_cal = Imagen_select.expression(
  "SWIR2/Redge", {Redge: Imagen_select.select("B5"), SWIR2: Imagen_select.select("B12")})
  .rename('FDI').gt(FDI_umbral);
var FDI_final = FDI_cal.updateMask(FDI_cal.eq(1)).rename('IF');
var cicatres_total = ee.ImageCollection.fromImages([IF1112,FDI_final]).mosaic();
var mask_fire_true = ee.Image("users/leofabiop120/GEF-6/Mapa_fire").eq(1);
var fire = cicatres_total.updateMask(mask_fire_true).rename('Fire');
//-----------------------------------------------
if(BNB_VS_select === true){
var fire = fire.updateMask(Mapa_BNB_VS_2018);
}
if(Neighborhood_select === true){
var fire = fire.reduceNeighborhood({
    reducer: ee.Reducer.mode(),
    kernel: ee.Kernel.circle(4),
  });
}
Map.addLayer(fire,{min:1, max:1, palette: "red"}, "Cicatrices Modelo 2", false);
}
if(Modelo == "Modelo 1: Clasificación"){
// Modelo 1: Desarrollado por Fabio
var classifier1 = require("users/leofabiop120/GEF-6:Muestre_Clasificacion_Fire");// Imagenes Claras libres de nubes
var classifier2 = require("users/leofabiop120/GEF-6:Muestre_Clasificacion_Fire_v2");// Imagenes contaminadas
var classifier3 = require("users/leofabiop120/GEF-6:Muestre_Clasificacion_Fire_V3");// Imagenes mas contaminadas
var classified_modelado1 = Stack_Modelado.classify(classifier1);
var classified_modelado2 = Stack_Modelado.classify(classifier2);
var classified_modelado3 = Stack_Modelado.classify(classifier3);
var fire1 = classified_modelado1.eq(1)
var fire2 = classified_modelado2.eq(1)
var fire3 = classified_modelado3.eq(1)
fire1 =fire1.updateMask(fire1).rename('Fire');
fire2 =fire2.updateMask(fire2).rename('Fire');
fire3 =fire3.updateMask(fire3).rename('Fire');
//Mascara de incendios falsos
mask_fire_true = ee.Image("users/leofabiop120/GEF-6/Mapa_fire").eq(1);
var fire_total = ee.ImageCollection.fromImages([fire1,fire2,fire3]).mosaic();
fire=fire_total.updateMask(mask_fire_true).rename('Fire');
if(BNB_VS_select === true){
var fire = fire.updateMask(Mapa_BNB_VS_2018);
}
if(Neighborhood_select === true){
var fire = fire.reduceNeighborhood({
    reducer: ee.Reducer.mode(),
    kernel: ee.Kernel.circle(4),
  });
}
Map.addLayer(fire,{min:1, max:1, palette: "red"}, "Cicatrices Modelo 1", false);
}
fire = fire;
///// Convertir las cicatrices a vector
var fire_to_vector = fire.updateMask(fire).reduceToVectors({
  geometry: studyarea,
  crs: null,
  scale: 100,
  geometryType: 'polygon',
  eightConnected: true,
  labelProperty: 'Area',
  crsTransform: null,
  bestEffort: true,
  tileScale:16,
  maxPixels:  1e12,
  reducer: ee.Reducer.countEvery()});
/*
var urlpoint=ee.FeatureCollection(fire_to_vector).getDownloadURL('kml', 0, 'test.kml');
print(urlpoint);
var Descarga_Button = ui.Label({value:'Descargar KML Fire',targetUrl: urlpoint});
panel.add(Descarga_Button);
*/
// /Set up colors
var colors = {'cyan': '#24C1E0', 'transparent': 'rgba(255, 255, 255, 0.8)', 'gray': '#F8F9FA'};
// Create download button panel
var downloadPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical', true),
  style: {width: '125px',
  backgroundColor: colors.transparent,
  position: 'top-right',
  shown: true
  },
});
// Add it to map
Map.add(downloadPanel)
// Set up styles
var TITLE_STYLE = {
  fontWeight: '100',
  fontSize: '10px',
  padding: '6px',
  color: '#616161',
  stretch: 'horizontal',
  //style: {position: 'top-left'},
  backgroundColor: colors.transparent,
};
// Add title to panel
var downloadTitle = ui.Label('Descargar Cicatriz', TITLE_STYLE);
downloadPanel.add(downloadTitle);
// Create download link once KML export is populated, set to shown:false
var urlGeom = ui.Label('Descargar KML', {shown: false});
downloadPanel.add(urlGeom);
// Download function
var exportData = function() {
  print("Exporting data...");
  //Set up download arguments
  var downloadArgsGeom = {
    format: 'kml',
    filename: 'Cicatriz_Incendio'
  };
  // Handle user digitzed geometries
  //var features = []; // reset features to empty array
    var urlpoint=ee.FeatureCollection(fire_to_vector)//.getDownloadURL('kml', 0, 'test.kml');
    //var features = Map.drawingTools().toFeatureCollection()
    var exportGeom = ee.FeatureCollection(urlpoint);
    urlGeom.setUrl(exportGeom.getDownloadURL(downloadArgsGeom));
    urlGeom.style().set({shown: true});
}
// Add download button to panel
var exportDataButton = ui.Button('Link Descarga');
exportDataButton.onClick(exportData);
downloadPanel.add(exportDataButton);
//Visualizar herramienta de Comparación
// Create download button panel
var ComaparePanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical', true),
  style: {width: '125px',
  backgroundColor: colors.transparent,
  position: 'top-right',
  shown: true
  },
});
var Label_Comapare = ui.Button ("Ver Comparativo")
function rederigir () {
  window.open('https://leofabiop120.users.earthengine.app/view/emergencycomparehn2');
  //location.href ="https://leofabiop120.users.earthengine.app/view/emergencycomparehn";
}
Label_Comapare.onClick(rederigir)
//Map.add(boton)
//var Label_Comapare = ui.Label({value:'Ver Comparativo',style:TITLE_STYLE, targetUrl: 'https://leofabiop120.users.earthengine.app/view/emergencycomparehn'});
ComaparePanel.add(Label_Comapare)
Map.add(ComaparePanel)
//-----------------------Cicatrices de incendios de MODIS (Frecuencia de Incendios)--------------------------------//
//Créditos: Zander Venter
//Enlace de referencia: https://zsv.co.za/
//Scrip base: https://zandersamuel.users.earthengine.app/view/fire-inspector
if(burnedArea_frequency_select === true){
var datasetModis = ee.ImageCollection('MODIS/006/MCD64A1')
                  .filter(ee.Filter.date('2000-01-01', endDate))//startDate,endDate
                  .map(function(image) {
      return image.clip(studyarea);
    });
var burnedArea = datasetModis.select('BurnDate');
//Leyenda
var palette0 = ['Red', 'Chartreuse'];
var vis0 = {
  'min': 30,
  'max': 365,
  'opacity': 0.8,
  'palette': palette0
};
 var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    backgroundColor: 'grey', color: 'white'
  }
});
// Creates Title for legend
var legendTitle = ui.Label({
  value: "Frecuencia de Incendios entre 2000-2019 MODIS",
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
    palette: palette0,
  };
};
// Creates the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis0.palette1),
  style: {stretch: 'horizontal', margin: '0px 8px',backgroundColor: 'grey', maxHeight: '20px'},
});
legend.add(colorBar);
// Creates a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis0.min, {margin: '4px 8px', fontWeight: 'bold', fontSize: '11px', backgroundColor: 'grey',color: 'white'}),
    ui.Label(
        ((vis0.max + vis0.min) / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal', fontWeight: 'bold', fontSize: '11px',backgroundColor: 'grey', color: 'white'}),
    ui.Label(vis0.max, {margin: '4px 8px', fontWeight: 'bold', fontSize: '11px',backgroundColor: 'grey', color: 'white'})
  ],
  style: {
  backgroundColor: 'grey',
  color: 'white'
  },
  layout: ui.Panel.Layout.flow('horizontal')
});
legend.add(legendLabels);
Map.add(legend)
Map.addLayer(burnedArea, vis0, 'Frecuencia Área Quemada');
}
//---------------------------------------------------Alrtas GOES/NOAA-------------------------------------------//
//Créditos: By Christophe Restif & Avi Hoffman, Senior Software Engineers
//Enlace de referencia:https://medium.com/google-earth/how-to-generate-wildfire-boundary-maps-with-earth-engine-b38eadc97a38
//Script Base: 
if(GOES_select === true){
// Region of interest.
var area_of_interest = studyarea;
// Satellite data.
var goes_16_data = ee.ImageCollection('NOAA/GOES/16/FDCF')
.filterDate(startDate, endDate)
.filterBounds(area_of_interest);
var goes_17_data = ee.ImageCollection('NOAA/GOES/17/FDCF')
.filterDate(startDate, endDate)
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
//---------------------------------------------------------Estimación de NO2-------------------------------------------------------------//
var palette1 = ['black',  'DeepPink'];
var vis1 = {
  'min': 50,
  'max': 100,
  'opacity': 0.8,
  'palette': palette1
};
var palette2 = ["black","green", "yellow", "red"];
var vis2 = {
  'min': 0,
  'max': 0.06,
  'opacity': 0.8,
  'palette': palette2
};
var palette3 = ['black', 'Indigo', 'Yellow'];
var vis3 = {
  'min': -50,
  'max': 500,
  'opacity': 0.8,
  'palette': palette3
};
var NO2 = sentinel1_NO2.select('NO2_column_number_density')
                   .filterDate(startDate,endDate)
                   .mean()
                   .multiply(1e6);
var CO = sentinel1_CO.select('CO_column_number_density')
                   .filterDate(startDate,endDate)
                   .mean()
                   //.multiply(1e6);
var SO2 = sentinel1_SO2.select('SO2_column_number_density')
                   .filterDate(startDate,endDate)
                   .mean()
                   .multiply(1e6);
//------------------------------------------------Función para alegir el tipo de contaminación y su respectiva leyenada----------------------
//------------------------------------NO2
if (contaminacion === "NO2"){  
 Map.addLayer(NO2, vis1,  "Nivel de NO2" ,true);
var BD_paises= ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017");
Map.addLayer(ee.Image().paint(BD_paises,1,2), {'palette': 'white','width':1},'Límites Mundiales',true);
 var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    backgroundColor: 'grey', color: 'white'
  }
});
// Creates Title for legend
var legendTitle = ui.Label({
  value: 'NO2 Column Number Density (µmol/m2)',
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
//------------------------------------CO
if (contaminacion === "CO"){  
 Map.addLayer(CO,  vis2,  "Nivel de CO"  ,true);
var BD_paises= ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017");
Map.addLayer(ee.Image().paint(BD_paises,1,2), {'palette': 'white','width':1},'Límites Mundiales',true);
 legend = ui.Panel({
  style: {
    position: 'bottom-right',
    backgroundColor: 'grey', color: 'white'
  }
});
// Creates Title for legend
 legendTitle = ui.Label({
  value: 'NO2 Column Number Density (mol/m2)',
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
Map.add(legend)
}
//------------------------------------SO2
if (contaminacion === "SO2"){  
 Map.addLayer(SO2, vis3,  "Nivel de SO2" ,true); 
var BD_paises= ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017");
Map.addLayer(ee.Image().paint(BD_paises,1,2), {'palette': 'white','width':1},'Límites Mundiales',true);
legend = ui.Panel({
  style: {
    position: 'bottom-right',
    backgroundColor: 'grey', color: 'white'
  }
});
// Creates Title for legend
legendTitle = ui.Label({
  value: 'NO2 Column Number Density (µmol/m2)',
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
Map.add(legend)
}
if (contaminacion === "N/A"){  
}
//******************************************----------Visualización de Capas----------------**************************************//
if (Mapa_Forestal_select === true){
var Paleta_color_Mapas =["green", "LIGHTYELLOW", "LIGHTCYAN"];
Map.addLayer(Mapa_Forestal_2018.clip(studyarea), {min:1, max:3, opacity: 0.7,palette: Paleta_color_Mapas}, "Mapa Forestal 2018", false);
//*******************-----------------------------Add Leyend Mapa de Cobertura-----------------------------******************************//
//Add legend
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
var colors=["green", "yellow"];
var names= ["Bosque","No Bosque"];
var legend = ui.Panel({style: {position: 'bottom-left'}});
legend.add(ui.Label({
  value: "Cobertura",
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0px'
  }
}));
var entry;
for (var x = 0; x<2; x++){
  entry = [
    ui.Label({style:{color:colors[x],margin: '0 0 4px 0'}, value: '██'}),
    ui.Label({
      value: names[x],
      style: {
        margin: '0 0 4px 4px'
      }
    })
  ];
  legend.add(ui.Panel(entry, ui.Panel.Layout.Flow('horizontal')))
}
Map.add(legend);
}
if (AP_select === true){
Map.addLayer(ee.Image().paint(AP,1,2), {'palette': 'green','width':1},'Área Protegidas',false);
}
if (Microcuencas_select === true){
Map.addLayer(ee.Image().paint(MC,1,2), {'palette': 'blue','width':1}, 'Microcuencas',false);
}
if (Org_Apoyo_select === true){
var color_org = {opacity: 0.2, color:"blue",'width':10};
Map.addLayer(organizacion,color_org,"Organizaciones de Apoyo",false);
}
if (Alertas_FDI_select === true){
Map.addLayer(S2point,    {color:    'red'  }, 'Alertas FDI'   ,false);
}
if (Alertas_FIRMS_select === true){
Map.addLayer(FIRMSpoint, {color:    'red'  }, 'Alertas de Calor FIRMS',false);
}
//Map.addLayer(onlyFDI,    {palette: 'red'     }, 'FDI'           ,false);
Map.centerObject(studyarea);
//------------------------------------------------------Descargar Datos ------------------------------------------------------------//
if (export_select_S2 === true){  
Export.image.toDrive
({image: image1.select(['B11', 'B8', 'B2']),
 description: 'Mosaico_Con_Nubes',
 fileNamePrefix: 'Mosaico_Con_Nubes',
 scale:10,
 region: studyarea,//.geometry().bounds().getInfo(),
 maxPixels: 1e12,});
}
/*
if (export_select_S2_Nubes === true){
Export.image.toDrive
({image: image3.select(['B11', 'B8', 'B2']),
 description: 'Mosaico_Con_Nubes',
 fileNamePrefix: 'Mosaico_Con_Nubes',
 scale:10,
 region: studyarea,//.geometry().bounds().getInfo() ,
 maxPixels: 1e12,});
}
*/
if (export_select_cicatrices1 === true){
Export.image.toDrive
({image: fire,
 description: 'Cicatrices',
 fileNamePrefix: 'Cicatrices',
 scale:10,
 region: studyarea.geometry().bounds(),//.getInfo(),
 maxPixels: 1e12,});
}
/*
if (export_select_cicatrices2 === true){
Export.image.toDrive
({image: fire,
 description: 'Cicatrices_M2',
 fileNamePrefix: 'Cicatrices_M2',
 scale:10,
 region: studyarea.geometry(),//.bounds().getInfo(),
 maxPixels: 1e15,});
}
*/
if (export_select_AlertasFDI === true){
 Export.table.toDrive({
  collection: ee.FeatureCollection(S2point),
  description:'Alertas_FDI',
  //region: studyarea.geometry().bounds().getInfo(),
  //folder:'' ,
  //fileNamePrefix:'',
  fileFormat: 'shp'
});
}
if (export_select_AlertasFIRMS === true){
//Descarga Alerta de calor FIRMS 
  Export.table.toDrive({
  collection:FIRMSpoint,
  description:'Alertas_de_Calor_FIRMS',
  //region: studyarea.geometry().bounds().getInfo(),
  //folder:'',
  //fileNamePrefix:'',
  fileFormat:'SHP' 
});
}
var CoordenadaXY = require('users/leofabiop120/Data_Intelligence:export_salud');
CoordenadaXY.buscardor_Coord()
//-------------------------------------------Construir Gráfico de Serie Temporal----------------------------------------------------//
var Fecha_1 = "2019-01-01";
var Fecha_2 = Fecha_final;
//Colecciones de Datos
var dataset = ee.ImageCollection('COPERNICUS/S2')
                  .filterDate(Fecha_1,Fecha_2)
                  // Pre-filter to get less cloudy granules.
                  .filterBounds(studyarea)
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
                  .select('B2','B3','B4','B8','B11','B12','QA60')
                  .map(maskS2clouds);
function toNdfi(img) {
  var gv = [500, 900, 400, 6100, 3000, 1000]
  var shade = [0, 0, 0, 0, 0, 0]
  var npv = [1400, 1700, 2200, 3000, 5500, 3000]
  var soil = [2000, 3000, 3400, 5800, 6000, 5800]
  var cloud = [9000, 9600, 8000, 7800, 7200, 6500]
  var unmixed = img
    .select(['B2', 'B3', 'B4', 'B8', 'B11','B12'])
    .unmix({
      endmembers: [gv, shade, npv, soil, cloud],
      sumToOne: true,
      nonNegative: true
    })
    .rename(['gv', 'shade', 'npv', 'soil', 'cloud'])
  return unmixed
    .expression(
      '((i.gv / (1 - i.shade)) - (i.npv + i.soil)) / ((i.gv / (1 - i.shade)) + i.npv + i.soil)',
      {i: unmixed}
    ) 
    //.multiply(10000)
    .rename('NDFI')
}
var chart = dataset.map(function(img) {
  return img.select()
  .addBands(img.normalizedDifference(['B8', 'B4']).rename('NDVI'))
  .addBands(img.normalizedDifference(['B8', 'B12']).rename('NBRI'))
 /* .addBands(img.normalizedDifference(['B8', 'B11']).rename('NDMI'))
  .addBands(img.normalizedDifference(['B8', 'B3' ]).rename('GNDVI'))
  .addBands(img.normalizedDifference(['B8', 'B12']).rename('NBRI'))
  .addBands(img.normalizedDifference(['B3', 'B8' ]).rename('NDWI'))
  .addBands(img.normalizedDifference(['B3', 'B11']).rename('NDSI'))
  .addBands(img.normalizedDifference(['B3', 'B4' ]).rename('NDGI'))
 .addBands(toNdfi(img))  */
});
// Create panels to hold lon/lat values.
/*
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
*/
//Precipitación
var GSMaP = ee.ImageCollection("JAXA/GPM_L3/GSMaP/v6/operational")
var CHIRPS= ee.ImageCollection('UCSB-CHG/CHIRPS/PENTAD')
var precip = CHIRPS.filterDate('2019-01-01', '2020-12-31')
  .sort('system:time_start', false)
  .filterBounds(studyarea);
//var precip = GSMaP.filterBounds(studyarea).filterDate(Fecha_1,Fecha_2).select("hourlyPrecipRateGC")
//  .sort('system:time_start', false)
  //.filterBounds(studyarea);
//calculating monthly precipitation for the region
var years = ee.List.sequence(2019, 2020);
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
var modisLSTday = ee.ImageCollection("MODIS/006/MOD11A1").filterBounds(studyarea).filterDate(Fecha_1,Fecha_2).select('LST_Day_1km');
var modLSTday =ee.ImageCollection(modisLSTday).map(function(img) {
  return img.multiply(0.02).subtract(273.15).copyProperties(img,['system:time_start','system:time_end']); 
});
//Niveles de No2
// Register a callback on the default map to be invoked when the map is clicked.
Map.onClick(function(coords) {
function HacerClick(coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  try {
  Map.remove(dot);
} catch (error) {
  print(error);
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
}
  // Add a red dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  dot = ui.Map.Layer(point, {color: 'FF0000'}, 'Point');
  Map.layers().set(10, dot);
  // Create an NDVI chart.
  var indexChart = ui.Chart.image.series({
  imageCollection: chart,
   region: point,
reducer: ee.Reducer.mean(),
  scale: 300
});
  indexChart.setOptions({
    title: 'Tendencia de índices',
    curveType:'function',  
    vAxis: {title: 'Índices de vegetación'},
    hAxis: {title: 'Fecha', format: 'MMM-YY'},
    lineWidth: 3,
     colors: ['green', 'YELLOWGREEN'],
     });
  indexChart.setSeriesNames(['NDVI','NBRI']); //,'GNDVI','NBRI','NDWI','NDSI'
  panel2.widgets().set(2, indexChart);
// Precipitación
var Preci_Chart = ui.Chart.image.series({
   imageCollection: monthlyPrecip,
   region: point,
   reducer: ee.Reducer.mean(),
   scale: 3000,
   xProperty: 'system:time_start'
});
Preci_Chart .setOptions({
  title: "Precipitación media por mes del año ",
  hAxis: {title: 'Fecha', format: 'MMM-YY'},
  vAxis: {title: 'Precipitación (mm)'},
  colors: ['DARKTURQUOISE'],
  pointSize: 3,
}).setChartType('ColumnChart');
panel2.widgets().set(1, Preci_Chart);
//Temperatura
var Temp_Chart = ui.Chart.image.series({
  imageCollection: modLSTday,
   region: point,
   reducer: ee.Reducer.mean(),
  scale: 1000,
  xProperty: 'system:time_start'
});
  Temp_Chart.setOptions({
    title: 'Temperatura Superficial',
    curveType:'function',  
    vAxis: {title: 'Grados C'},
    hAxis: {title: 'Fecha', format: 'MMM-YY'},
    lineWidth: 3,
     colors: ['red'],
     });
  panel2.widgets().set(3, Temp_Chart);
  //Niveles de NO2
var values = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_NO2")
 .filterBounds(studyarea)
 .filterDate(Fecha_1,Fecha_2)
  .map(function(i) { 
    var values = i.reduceRegion({ reducer: ee.Reducer.mean(), geometry: point, scale: 10000 })
    var t = i.date().millis()
    return ee.Feature(null, values).set({ t: t })
  })
var sentinel5P01 = values.filter(ee.Filter.notNull(['NO2_column_number_density']))
sentinel5P01 = sentinel5P01.map(function(f) {
  return f.set({ NO2_column_number_density: ee.Number(f.get('NO2_column_number_density')).multiply(1e6) })
})
var NO2_Chart = ui.Chart.feature.byFeature(sentinel5P01, 't', ['NO2_column_number_density']);
  NO2_Chart.setOptions({
    title: 'Análisis de serie temporal de NO2',
    curveType:'function',  
    vAxis: {title: 'NO2 Column Number Density (µmol/m2)'},
    hAxis: {title: 'Fecha', format: 'MMM-YY'},
    lineWidth: 3,
     colors: ['Indigo'],
     });
  panel2.widgets().set(4, NO2_Chart);
//Gráfico de EVI vs Fire
if(burnedArea_frequency_select === true){
var fire_modis = ee.ImageCollection('MODIS/006/MCD64A1')
  .select('BurnDate');
var evi_modis = ee.ImageCollection('MODIS/006/MOD13Q1')
.select('EVI');
var precipitation_chirps = ee.ImageCollection('UCSB-CHG/CHIRPS/PENTAD')
  .select('precipitation');
function compute(begin, end) {
  var t = begin.millis()
  return fire_modis.filterDate(begin, end).sum().gte(1).rename('fire').clip(studyarea)//.divide(10)
    .addBands(evi_modis.filterDate(begin, end).mean().divide(1000).rename('evi').clip(studyarea))
    //.addBands(precipitation_chirps.filterDate(begin, end).mean().rename('precipitation'))
    .set('system:time_start', t)
}
var years = ee.List.sequence(2001, 2019)
var months = ee.List.sequence(1, 12)
var results = years.map(function(year) {
  return months.map(function(month) {
    var begin = ee.Date.fromYMD(year, month, 1)
    var end = begin.advance(1, 'month')
    return compute(begin, end)
  })
})
results = ee.ImageCollection(results.flatten())
print(results)
//Add Chart EVI vs fire
  var EVI_Fire_Chart = ui.Chart.image.series({
  imageCollection: results,
  region: point,
  reducer: ee.Reducer.sum(),
  scale: 500,
  xProperty: 'system:time_start'
});
EVI_Fire_Chart
    .setChartType('LineChart')
    .setOptions({
    title: 'Dinámica de EVI vs Fire',
    //curveType:'function',  
    vAxis: {title: 'EVI'},
    hAxis: {title: 'Fecha', format: 'Y'},
    lineWidth: 2,
    series: {0: {color: 'green'}},
    interpolateNulls: false,
    colors: ['green', 'red']
     });
EVI_Fire_Chart.setSeriesNames(["evi",'fire']); //,'GNDVI','NBRI','NDWI','NDSI'
panel2.widgets().set(5, EVI_Fire_Chart);
}
};//Fin de Map.onclick
if (MapClickOff) {
  print("Hola")
}
else {
  HacerClick(coords)
}
});
};
var MapClickOff= false;
var polygonPresent = false;
var drawingMode = false;
var polygonCoords;
var currentMap;
var drawButton;
var areaLabel;
var doanloadLabel;
var measurePanel;
var layerGeometry;
var _showArea;
var _showDownloadLink;
var zIndex;
var showAreaData = ui.util.debounce(   
      function( coordArray ){
        areaLabel.style({shown: true});
        ee.Geometry.Polygon( coordArray ).area().divide(10000).format("%(,.2f").getInfo( function(area) {
          areaLabel.setValue( "Area en Ha: " + area );
        });
     },
      1000,
      currentMap
    );
var showDownloadLink = ui.util.debounce(   
      function( coordArray ){
        doanloadLabel.style({shown: true});
        doanloadLabel.setUrl(
          ee.FeatureCollection([
              ee.Feature( ee.Geometry.Polygon( coordArray ) ),
              ee.Feature( ee.Geometry.LineString( coordArray ) )
            ] 
          ).getDownloadURL({ format: "kml", filename :"Poligono_Incendio"})
        );
     },
      1000,
      currentMap
    );    
var hideAreaData = function(){
  areaLabel.style({shown: false});
};
var handleClickOnMap = function( coords ){
  if(drawingMode ){
    polygonCoords.push(  [ coords.lon, coords.lat ] );
    var geom;
    if(polygonCoords.length == 1){
      geom = ee.Geometry.Point(  [ coords.lon,coords.lat ] );
    }else {
      var closeIt = polygonCoords.slice(0);
      if( closeIt.length > 2 ){
        closeIt.push( closeIt[0]);
        geom = ee.Geometry.LineString( closeIt );
        if( _showArea ){
          showAreaData( closeIt );
        }
        if( _showDownloadLink ){
          showDownloadLink( closeIt );
        }
      }else{
        geom = ee.Geometry.LineString( closeIt );
      }
    }
    var layers= currentMap.layers();
    if( polygonPresent ){
      layerGeometry = ui.Map.Layer( geom,{}, "Poligono"  );
      currentMap.layers().set(zIndex,  layerGeometry );
    }else{
      polygonPresent = true;
      layerGeometry = ui.Map.Layer( geom,{}, "Poligono"  );
      zIndex = currentMap.layers().length();
      currentMap.layers().insert(zIndex, layerGeometry);
    }
  }
};
var manageDrawing = function(){
  MapClickOff = !MapClickOff;
  if( !drawingMode ){
    drawingMode = true;
    polygonCoords = [];
    currentMap.style().set('cursor', 'crosshair');
    drawButton.setLabel( "Reset" );
  }else{
    drawingMode = false;
    polygonPresent = false;
    polygonCoords = [];
    currentMap.layers().remove( layerGeometry );
    currentMap.style().set('cursor', 'crosshair');
    drawButton.setLabel( "Estimar Área" );
    areaLabel.setValue("Área");
    hideAreaData();
  }
};
// This is the public function of the class
// you need to set the Map to which the panel must be added, the style of the panel, and if yu want to show area measurement and the download link
var addDrawPolygonButton = function( map, style, showArea, showDownloadLink ){
  currentMap = map;
  _showArea = showArea;
  _showDownloadLink = showDownloadLink;
  var comps = [];
  drawButton = ui.Button({ label : "Estimar Área", style : {}, onClick : manageDrawing  } );
  comps.push( drawButton);
  if( _showArea ){
    areaLabel = ui.Label({ value : "Área", style : { shown:true }  } );
    comps.push( areaLabel );
  }
  if( _showDownloadLink ){
    doanloadLabel = ui.Label({ value : "Descargar KML", style : { shown:true }, targetUrl : "http://www.openforis.org"  } );
    comps.push( doanloadLabel );
  }
  measurePanel = ui.Panel({ widgets : comps, style : style});
  map.add(  measurePanel );
  map.onClick( handleClickOnMap );
};