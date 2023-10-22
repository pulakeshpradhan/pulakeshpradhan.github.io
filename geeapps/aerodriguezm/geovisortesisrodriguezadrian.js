var Lt8_post = ui.import && ui.import("Lt8_post", "image", {
      "id": "users/aerodriguezm/Tesis/Imagenes_pre_procesadas/Lt8_post"
    }) || ee.Image("users/aerodriguezm/Tesis/Imagenes_pre_procesadas/Lt8_post"),
    Lt8_pre = ui.import && ui.import("Lt8_pre", "image", {
      "id": "users/aerodriguezm/Tesis/Imagenes_pre_procesadas/Lt8_pre"
    }) || ee.Image("users/aerodriguezm/Tesis/Imagenes_pre_procesadas/Lt8_pre"),
    vis_lt8 = ui.import && ui.import("vis_lt8", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "SR_B4",
          "SR_B3",
          "SR_B2"
        ],
        "min": 0.00017937500000000245,
        "max": 0.11614687499999998,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["SR_B4","SR_B3","SR_B2"],"min":0.00017937500000000245,"max":0.11614687499999998,"gamma":1},
    St2_post = ui.import && ui.import("St2_post", "image", {
      "id": "users/aerodriguezm/Tesis/Imagenes_pre_procesadas/st2_post"
    }) || ee.Image("users/aerodriguezm/Tesis/Imagenes_pre_procesadas/st2_post"),
    St2_pre = ui.import && ui.import("St2_pre", "image", {
      "id": "users/aerodriguezm/Tesis/Imagenes_pre_procesadas/st2_pre"
    }) || ee.Image("users/aerodriguezm/Tesis/Imagenes_pre_procesadas/st2_pre"),
    vis_st2 = ui.import && ui.import("vis_st2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B4",
          "B3",
          "B2"
        ],
        "min": 0.0011262794339776691,
        "max": 0.130367194645014,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["B4","B3","B2"],"min":0.0011262794339776691,"max":0.130367194645014,"gamma":1},
    Mod_1_GEE = ui.import && ui.import("Mod_1_GEE", "image", {
      "id": "users/aerodriguezm/Tesis/Modelos_GEE/Mod_1_GEE"
    }) || ee.Image("users/aerodriguezm/Tesis/Modelos_GEE/Mod_1_GEE"),
    Mod_2_GEE = ui.import && ui.import("Mod_2_GEE", "image", {
      "id": "users/aerodriguezm/Tesis/Modelos_GEE/Mod_2_GEE"
    }) || ee.Image("users/aerodriguezm/Tesis/Modelos_GEE/Mod_2_GEE"),
    Mod_3_GEE = ui.import && ui.import("Mod_3_GEE", "image", {
      "id": "users/aerodriguezm/Tesis/Modelos_GEE/Mod_3_GEE"
    }) || ee.Image("users/aerodriguezm/Tesis/Modelos_GEE/Mod_3_GEE"),
    Mod_4_GEE = ui.import && ui.import("Mod_4_GEE", "image", {
      "id": "users/aerodriguezm/Tesis/Modelos_GEE/Mod_4_GEE"
    }) || ee.Image("users/aerodriguezm/Tesis/Modelos_GEE/Mod_4_GEE"),
    Mod_5_GEE = ui.import && ui.import("Mod_5_GEE", "image", {
      "id": "users/aerodriguezm/Tesis/Modelos_GEE/Mod_5_GEE"
    }) || ee.Image("users/aerodriguezm/Tesis/Modelos_GEE/Mod_5_GEE"),
    Mod_6_GEE = ui.import && ui.import("Mod_6_GEE", "image", {
      "id": "users/aerodriguezm/Tesis/Modelos_GEE/Mod_6_GEE"
    }) || ee.Image("users/aerodriguezm/Tesis/Modelos_GEE/Mod_6_GEE"),
    Mod_7_GEE = ui.import && ui.import("Mod_7_GEE", "image", {
      "id": "users/aerodriguezm/Tesis/Modelos_GEE/Mod_7_GEE"
    }) || ee.Image("users/aerodriguezm/Tesis/Modelos_GEE/Mod_7_GEE"),
    Mod_8_GEE = ui.import && ui.import("Mod_8_GEE", "image", {
      "id": "users/aerodriguezm/Tesis/Modelos_GEE/Mod_8_GEE"
    }) || ee.Image("users/aerodriguezm/Tesis/Modelos_GEE/Mod_8_GEE"),
    Mod_1_ENVI = ui.import && ui.import("Mod_1_ENVI", "image", {
      "id": "users/aerodriguezm/Tesis/Modelos_ENVI/Mod_1_ENVI"
    }) || ee.Image("users/aerodriguezm/Tesis/Modelos_ENVI/Mod_1_ENVI"),
    Mod_2_ENVI = ui.import && ui.import("Mod_2_ENVI", "image", {
      "id": "users/aerodriguezm/Tesis/Modelos_ENVI/Mod_2_ENVI"
    }) || ee.Image("users/aerodriguezm/Tesis/Modelos_ENVI/Mod_2_ENVI"),
    Mod_3_ENVI = ui.import && ui.import("Mod_3_ENVI", "image", {
      "id": "users/aerodriguezm/Tesis/Modelos_ENVI/Mod_3_ENVI"
    }) || ee.Image("users/aerodriguezm/Tesis/Modelos_ENVI/Mod_3_ENVI"),
    Mod_4_ENVI = ui.import && ui.import("Mod_4_ENVI", "image", {
      "id": "users/aerodriguezm/Tesis/Modelos_ENVI/Mod_4_ENVI"
    }) || ee.Image("users/aerodriguezm/Tesis/Modelos_ENVI/Mod_4_ENVI"),
    Mod_5_ENVI = ui.import && ui.import("Mod_5_ENVI", "image", {
      "id": "users/aerodriguezm/Tesis/Modelos_ENVI/Mod_5_ENVI"
    }) || ee.Image("users/aerodriguezm/Tesis/Modelos_ENVI/Mod_5_ENVI"),
    Mod_6_ENVI = ui.import && ui.import("Mod_6_ENVI", "image", {
      "id": "users/aerodriguezm/Tesis/Modelos_ENVI/Mod_6_ENVI"
    }) || ee.Image("users/aerodriguezm/Tesis/Modelos_ENVI/Mod_6_ENVI"),
    Mod_7_ENVI = ui.import && ui.import("Mod_7_ENVI", "image", {
      "id": "users/aerodriguezm/Tesis/Modelos_ENVI/Mod_7_ENVI"
    }) || ee.Image("users/aerodriguezm/Tesis/Modelos_ENVI/Mod_7_ENVI"),
    Mod_8_ENVI = ui.import && ui.import("Mod_8_ENVI", "image", {
      "id": "users/aerodriguezm/Tesis/Modelos_ENVI/Mod_8_ENVI"
    }) || ee.Image("users/aerodriguezm/Tesis/Modelos_ENVI/Mod_8_ENVI"),
    Mod_1_QGIS = ui.import && ui.import("Mod_1_QGIS", "image", {
      "id": "users/aerodriguezm/Tesis/Modelos_QGIS/Mod_1_QGIS"
    }) || ee.Image("users/aerodriguezm/Tesis/Modelos_QGIS/Mod_1_QGIS"),
    Mod_2_QGIS = ui.import && ui.import("Mod_2_QGIS", "image", {
      "id": "users/aerodriguezm/Tesis/Modelos_QGIS/Mod_2_QGIS"
    }) || ee.Image("users/aerodriguezm/Tesis/Modelos_QGIS/Mod_2_QGIS"),
    vis_mod_cobertura = ui.import && ui.import("vis_mod_cobertura", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "b1"
        ],
        "min": 1,
        "max": 7,
        "palette": [
          "24ff16",
          "43a337",
          "fff812",
          "977e23",
          "2033bc",
          "66dca1",
          "ff0101"
        ]
      }
    }) || {"opacity":1,"bands":["b1"],"min":1,"max":7,"palette":["24ff16","43a337","fff812","977e23","2033bc","66dca1","ff0101"]},
    area_estudio = ui.import && ui.import("area_estudio", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -78.3293502039053,
                0.16370469122284234
              ],
              [
                -78.3293502039053,
                0.10911653012714106
              ],
              [
                -78.24557945195218,
                0.10911653012714106
              ],
              [
                -78.24557945195218,
                0.16370469122284234
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
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Polygon(
        [[[-78.3293502039053, 0.16370469122284234],
          [-78.3293502039053, 0.10911653012714106],
          [-78.24557945195218, 0.10911653012714106],
          [-78.24557945195218, 0.16370469122284234]]], null, false),
    area_corte = ui.import && ui.import("area_corte", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -78.33973505713519,
                0.17194180899751021
              ],
              [
                -78.33973505713519,
                0.09984423822124326
              ],
              [
                -78.23433497168597,
                0.09984423822124326
              ],
              [
                -78.23433497168597,
                0.17194180899751021
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#2759d6",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #2759d6 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-78.33973505713519, 0.17194180899751021],
          [-78.33973505713519, 0.09984423822124326],
          [-78.23433497168597, 0.09984423822124326],
          [-78.23433497168597, 0.17194180899751021]]], null, false),
    DCBAM_Lt8 = ui.import && ui.import("DCBAM_Lt8", "image", {
      "id": "users/aerodriguezm/Tesis/Deteccion_de_cambios/DCBAM_Lt8"
    }) || ee.Image("users/aerodriguezm/Tesis/Deteccion_de_cambios/DCBAM_Lt8"),
    DCBAM_St2 = ui.import && ui.import("DCBAM_St2", "image", {
      "id": "users/aerodriguezm/Tesis/Deteccion_de_cambios/DCBAM_St2"
    }) || ee.Image("users/aerodriguezm/Tesis/Deteccion_de_cambios/DCBAM_St2"),
    DCBCI_Cob1QGIS_vs_Cob2QGIS = ui.import && ui.import("DCBCI_Cob1QGIS_vs_Cob2QGIS", "image", {
      "id": "users/aerodriguezm/Tesis/Deteccion_de_cambios/DCBCI_Cob1QGIS_vs_Cob2QGIS"
    }) || ee.Image("users/aerodriguezm/Tesis/Deteccion_de_cambios/DCBCI_Cob1QGIS_vs_Cob2QGIS"),
    DCBCI_Cob5ENVI_vs_Cob6ENVI = ui.import && ui.import("DCBCI_Cob5ENVI_vs_Cob6ENVI", "image", {
      "id": "users/aerodriguezm/Tesis/Deteccion_de_cambios/DCBCI_Cob5ENVI_vs_Cob6ENVI"
    }) || ee.Image("users/aerodriguezm/Tesis/Deteccion_de_cambios/DCBCI_Cob5ENVI_vs_Cob6ENVI"),
    DCBCI_Cob5GEE_vs_Cob6GEE = ui.import && ui.import("DCBCI_Cob5GEE_vs_Cob6GEE", "image", {
      "id": "users/aerodriguezm/Tesis/Deteccion_de_cambios/DCBCI_Cob5GEE_vs_Cob6GEE"
    }) || ee.Image("users/aerodriguezm/Tesis/Deteccion_de_cambios/DCBCI_Cob5GEE_vs_Cob6GEE"),
    DCBCI_Cob7GEE_vs_Cob8ENVI = ui.import && ui.import("DCBCI_Cob7GEE_vs_Cob8ENVI", "image", {
      "id": "users/aerodriguezm/Tesis/Deteccion_de_cambios/DCBCI_Cob7GEE_vs_Cob8ENVI"
    }) || ee.Image("users/aerodriguezm/Tesis/Deteccion_de_cambios/DCBCI_Cob7GEE_vs_Cob8ENVI"),
    vis_NBR = ui.import && ui.import("vis_NBR", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "NBR"
        ],
        "min": -0.2,
        "max": 0.8,
        "palette": [
          "ff0000",
          "ffbe08",
          "d8ff02",
          "13ff04"
        ]
      }
    }) || {"opacity":1,"bands":["NBR"],"min":-0.2,"max":0.8,"palette":["ff0000","ffbe08","d8ff02","13ff04"]},
    vis_dNBR = ui.import && ui.import("vis_dNBR", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "NBR"
        ],
        "max": 0.9,
        "min": 0,
        "palette": [
          "0571b0",
          "92c5de",
          "f7f7f7",
          "f4a582",
          "ca0020"
        ]
      }
    }) || {"opacity":1,"bands":["NBR"],"max":0.9,"min":0,"palette":["0571b0","92c5de","f7f7f7","f4a582","ca0020"]},
    vis_mod_cambio = ui.import && ui.import("vis_mod_cambio", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "Cambio_cobertura"
        ],
        "max": 3,
        "min": 0,
        "palette": [
          "b6b6b6",
          "ff0808",
          "ffe358",
          "0bcaa7"
        ]
      }
    }) || {"opacity":1,"bands":["Cambio_cobertura"],"max":3,"min":0,"palette":["b6b6b6","ff0808","ffe358","0bcaa7"]};
/**
Author: Adrian Rodriguez Meza (aerodrguezm@espe.edu.ec)
Este código es gratuito y abierto.
Al usar este código y cualquier dato derivado de él,
acepta citar la siguiente referencia en las publicaciones derivadas de ellos:
Rodríguez, Adrián; 2022.
    Detección de Cambios de Cobertura del Suelo por Incendio Forestal en el Páramo de Mojanda,
    Año 2020, Mediante Análisis de Imágenes Satelitales. Extraido de:
    "https://repositorio.espe.edu.ec/handle/21000/32605"
**/
//Se limpia el mapa base
ui.root.clear();
var mapa_base = ui.Map();
mapa_base.setOptions('ROADMAP');
mapa_base.centerObject(area_estudio, 13);
mapa_base.setControlVisibility({zoomControl: false, drawingToolsControl: true, fullscreenControl: true, layerList: true});
mapa_base.addLayer(area_estudio,{"color":"#000000"},"Area_estudio", 1, 0.5);
//Título del proyecto
var titulo_mapa = ui.Label('Geovisor del proyecto: "Detección de cambios de cobertura del suelo por incendio forestal en el páramo de Mojanda, año 2020, mediante análisis de imágenes satelitales" '
                          , {fontSize: '16px', fontWeight: 'bold', backgroundColor: '#83A5A9', fontFamily: 'Arial'});
var creador = ui.Label('Autor: Adrián Rodríguez', {fontSize: '14px', backgroundColor: '#83A5A9', fontFamily: 'Arial'});
var carrera = ui.Label('Carrera de Ingeniería Geográfica y del Medio Ambiente', {fontSize: '14px', backgroundColor: '#83A5A9', fontFamily: 'Arial'});
var tutor = ui.Label('Tutor: Ing. Eduardo Kirby, MSc.', {fontSize: '12px', backgroundColor: '#83A5A9', fontFamily: 'Arial'});
var fecha = ui.Label('Fecha de actualización: 14/09/2022', {fontSize: '12px', backgroundColor: '#83A5A9', fontFamily: 'Arial'});
//Se crea el panel de capas
var link_publi = 'https://repositorio.espe.edu.ec/handle/21000/32605'
var enlace_publicacion = ui.Label('Clic para ir a la publicación', {fontSize: '12px', backgroundColor: '#FFFFFF', Color: 'blue', padding: '2px', fontFamily: 'Arial'}, link_publi);
var title = ui.Label('Panel de capas', {fontSize: '14px', fontWeight: 'bold', backgroundColor: '#83A5A9', fontFamily: 'Arial'});
//Imagenes base:
var instr1 = ui.Label('1. Imágenes corregidas', {fontSize: '12px', backgroundColor: '#83A5A9', fontFamily: 'Arial'});
var imagenes_base = ui.Select({
  items: ['St2_pre', 'St2_post', 'Lt8_pre', 'Lt8_post'],
  placeholder: 'St2_post',
  value: 'St2_post',
  style: {
    stretch: 'horizontal', 
    fontSize: '12px', 
    fontFamily: 'Arial',
    padding: '3px',
  },
  onChange: function Cambio (pre){
        imagenes_base.setValue(pre);
  },
});
var mostrar1 = ui.Button({
  label: 'Mostrar',
  onClick: mostrar_img1,
  style: {stretch: 'horizontal', fontSize: '12px', fontFamily: 'Arial', padding: '3px'}
});
var descarga1 = ui.Button({
  label: 'Descargar',
  onClick: descarga_img1,
  style: {stretch: 'horizontal', fontSize: '12px', fontFamily: 'Arial', padding: '3px'}
});
var botones1 =ui.Panel([mostrar1, descarga1],ui.Panel.Layout.Flow('horizontal'), {backgroundColor: '#83A5A9', fontSize: '12px', fontFamily: 'Arial'});
//Panel de mensaje 1
var mensaje = ui.Label('Escoja una imágen y presione mostrar o descargar', {fontSize: '12px', backgroundColor: '#FFFFFF', Color: 'blue', padding: '3px', fontFamily: 'Arial'});
var panel_mensaje = ui.Panel([mensaje], 
  null, {position: 'bottom-left', backgroundColor: '#83A5A9', fontFamily: 'Arial'}//, width: '300px' , height: '50px'}
  );
//Índice de calcinación normalizado
var instr2 = ui.Label('2. Índice de calcinación normalizado (NBR)', {fontSize: '12px', backgroundColor: '#83A5A9', fontFamily: 'Arial'});
var NBR_select = ui.Select({
  items: ['1. NBR_St2pre', '2. NBR_St2post', '3. dNBR_St2', '4. NBR_Lt8pre', '5. NBR_Lt8post', '6. dNBR_Lt8'],
  placeholder: '2. NBR_St2post',
  value: '2. NBR_St2post',
  style: {stretch: 'horizontal', fontSize: '12px', fontFamily: 'Arial', padding: '3px'},
  onChange: function Cambio (pre) {
        NBR_select.setValue(pre);
  },
});
var mostrar2 = ui.Button({
  label: 'Mostrar',
  onClick: mostrar_img2,
  style: {stretch: 'horizontal', fontSize: '12px', fontFamily: 'Arial', padding: '3px'}
});
var descarga2 = ui.Button({
  label: 'Descargar',
  onClick: descarga_img2,
  style: {stretch: 'horizontal', fontSize: '12px', fontFamily: 'Arial', padding: '3px'}
});
var botones2 =ui.Panel([mostrar2, descarga2],ui.Panel.Layout.Flow('horizontal'), {backgroundColor: '#83A5A9', fontSize: '12px', fontFamily: 'Arial'});
//Panel de mensaje 2
var mensaje2 = ui.Label('Escoja una opción y presione mostrar o descargar', {fontSize: '12px', backgroundColor: '#FFFFFF', Color: 'blue', padding: '3px', fontFamily: 'Arial'});
var panel_mensaje2 = ui.Panel([mensaje2], 
  null, {position: 'bottom-left', backgroundColor: '#83A5A9', fontFamily: 'Arial'}
);
{
//Cobertura en GEE:
var instr3 = ui.Label('3. Coberturas del suelo', {fontSize: '12px', backgroundColor: '#83A5A9', fontFamily: 'Arial'});
var instr3_1 = ui.Label('3.1. Generadas en GEE: (1 - 4 USC), (5 - 8 SC)', {fontSize: '12px', backgroundColor: '#83A5A9', fontFamily: 'Arial'});
var cobertura_GEE = ui.Select({
  items: ['1. Cob_St2pre_USC_GEE', '2. Cob_St2post_USC_GEE', '3. Cob_Lt8pre_USC_GEE', '4. Cob_Lt8post_USC_GEE',
          '5. Cob_St2pre_SC_GEE', '6. Cob_St2post_SC_GEE', '7. Cob_Lt8pre_SC_GEE', '8. Cob_Lt8post_SC_GEE'],
  placeholder: '5. Cob_St2pre_SC_GEE',
  value: '5. Cob_St2pre_SC_GEE',
  style: {stretch: 'horizontal', fontSize: '12px', fontFamily: 'Arial', padding: '3px'},
  onChange: function Cambio (pre) {
        cobertura_GEE.setValue(pre);
  },
});
var mostrar3 = ui.Button({
  label: 'Mostrar',
  onClick: mostrar_img3,
  style: {stretch: 'horizontal', fontSize: '12px', fontFamily: 'Arial', padding: '3px'}
});
var descarga3 = ui.Button({
  label: 'Descargar',
  onClick: descarga_img3,
  style: {stretch: 'horizontal', fontSize: '12px', fontFamily: 'Arial', padding: '3px'}
});
var botones3 =ui.Panel([mostrar3, descarga3],ui.Panel.Layout.Flow('horizontal'), {backgroundColor: '#83A5A9', fontSize: '12px', fontFamily: 'Arial'});
//Panel de mensaje 3
var mensaje3 = ui.Label('Escoja una cobertura y presione mostrar o descargar', {fontSize: '12px', backgroundColor: '#FFFFFF', Color: 'blue', padding: '3px', fontFamily: 'Arial'});
var panel_mensaje3 = ui.Panel([mensaje3], 
  null, {position: 'bottom-left', backgroundColor: '#83A5A9', fontFamily: 'Arial'}
);
//Cobertura en ENVI:
var instr4 = ui.Label('3.2. Generadas en ENVI: (1 - 4 USC), (5 - 8 SC)', {fontSize: '12px', backgroundColor: '#83A5A9', fontFamily: 'Arial'});
var cobertura_ENVI = ui.Select({
  items: ['1. Cob_St2pre_USC_ENVI', '2. Cob_St2post_USC_ENVI', '3. Cob_Lt8pre_USC_ENVI', '4. Cob_Lt8post_USC_ENVI',
          '5. Cob_St2pre_SC_ENVI', '6. Cob_St2post_SC_ENVI', '7. Cob_Lt8pre_SC_ENVI', '8. Cob_Lt8post_SC_ENVI'],
  placeholder: '5. Cob_St2pre_SC_ENVI',
  value: '5. Cob_St2pre_SC_ENVI',
  style: {stretch: 'horizontal', fontSize: '12px', fontFamily: 'Arial', padding: '3px'},
  onChange: function Cambio (pre) {
        cobertura_ENVI.setValue(pre);
  },
});
var mostrar4 = ui.Button({
  label: 'Mostrar',
  onClick: mostrar_img4,
  style: {stretch: 'horizontal', fontSize: '12px', fontFamily: 'Arial', padding: '3px'}
});
var descarga4 = ui.Button({
  label: 'Descargar',
  onClick: descarga_img4,
  style: {stretch: 'horizontal', fontSize: '12px', fontFamily: 'Arial', padding: '3px'}
});
var botones4 =ui.Panel([mostrar4, descarga4],ui.Panel.Layout.Flow('horizontal'), {backgroundColor: '#83A5A9', fontSize: '12px', fontFamily: 'Arial'});
//Panel de mensaje 3
var mensaje4 = ui.Label('Escoja una cobertura y presione mostrar o descargar', {fontSize: '12px', backgroundColor: '#FFFFFF', Color: 'blue', padding: '3px', fontFamily: 'Arial'});
var panel_mensaje4 = ui.Panel([mensaje4], 
  null, {position: 'bottom-left', backgroundColor: '#83A5A9', fontFamily: 'Arial'}
);
//Cobertura en QGIS:
var instr5 = ui.Label('3.2. Generadas mediante Interpretación/Digitalización.', {fontSize: '12px', backgroundColor: '#83A5A9', fontFamily: 'Arial'});
var cobertura_QGIS = ui.Select({
  items: ['1. Cob_pre_incendio', '2. Cob_post_incendio'],
  placeholder: '2. Cob_post_incendio',
  value: '2. Cob_post_incendio',
  style: {stretch: 'horizontal', fontSize: '12px', fontFamily: 'Arial', padding: '3px'},
  onChange: function Cambio (pre) {
        cobertura_QGIS.setValue(pre);
  },
});
var mostrar5 = ui.Button({
  label: 'Mostrar',
  onClick: mostrar_img5,
  style: {stretch: 'horizontal', fontSize: '12px', fontFamily: 'Arial', padding: '3px'}
});
var descarga5 = ui.Button({
  label: 'Descargar',
  onClick: descarga_img5,
  style: {stretch: 'horizontal', fontSize: '12px', fontFamily: 'Arial', padding: '3px'}
});
var botones5 =ui.Panel([mostrar5, descarga5],ui.Panel.Layout.Flow('horizontal'), {backgroundColor: '#83A5A9', fontSize: '12px', fontFamily: 'Arial'});
//Panel de mensaje 3
var mensaje5 = ui.Label('Escoja una cobertura y presione mostrar o descargar', {fontSize: '12px', backgroundColor: '#FFFFFF', Color: 'blue', padding: '3px', fontFamily: 'Arial'});
var panel_mensaje5 = ui.Panel([mensaje5], 
  null, {position: 'bottom-left', backgroundColor: '#83A5A9', fontFamily: 'Arial'}
);
}
//Imágenes de cambio
var instr6 = ui.Label('4. Imágenes de cambio', {fontSize: '12px', backgroundColor: '#83A5A9', fontFamily: 'Arial'});
//Detección de cambio basada en algebra de mapas (DCBAM)
var instr6_1 = ui.Label('4.1 Detección de cambios basada en algebra de mapas (DCBAM)', {fontSize: '12px', backgroundColor: '#83A5A9', fontFamily: 'Arial'});
var cambio_DCBAM = ui.Select({
  items: ['1. DCBAM_St2', '2. DCBAM_Lt8'],
  placeholder: '1. DCBAM_St2',
  value: '1. DCBAM_St2',
  style: {stretch: 'horizontal', fontSize: '12px', fontFamily: 'Arial', padding: '3px'},
  onChange: function Cambio (pre) {
        cambio_DCBAM.setValue(pre);
  },
});
var mostrar6 = ui.Button({
  label: 'Mostrar',
  onClick: mostrar_img6,
  style: {stretch: 'horizontal', fontSize: '12px', fontFamily: 'Arial', padding: '3px'}
});
var descarga6 = ui.Button({
  label: 'Descargar',
  onClick: descarga_img6,
  style: {stretch: 'horizontal', fontSize: '12px', fontFamily: 'Arial', padding: '3px'}
});
var botones6 =ui.Panel([mostrar6, descarga6],ui.Panel.Layout.Flow('horizontal'), {backgroundColor: '#83A5A9', fontSize: '12px', fontFamily: 'Arial'});
var mensaje6 = ui.Label('Escoja una imagen de cambio y presione mostrar o descargar', {fontSize: '12px', backgroundColor: '#FFFFFF', Color: 'blue', padding: '3px', fontFamily: 'Arial'});
var panel_mensaje6 = ui.Panel([mensaje6], 
  null, {position: 'bottom-left', backgroundColor: '#83A5A9', fontFamily: 'Arial'}
);
//Detección de cambio basada en clasificación de imágenes (DCBCI)
var instr7 = ui.Label('4.2 Detección de cambios basada en clasificación de imágenes (DCBCI)', {fontSize: '12px', backgroundColor: '#83A5A9', fontFamily: 'Arial'});
var cambio_DCBCI = ui.Select({
  items: ['1. Cob_pre_I/D_vs_Cob_post_I/D', '2. Cob_5GEE_vs_Cob_6GEE', '3. Cob_5ENVI_vs_Cob_6ENVI', '4. Cob_7GEE_vs_Cob_8ENVI'],
  placeholder: '1. Cob_pre_I/D_vs_Cob_post_I/D',
  value: '1. Cob_pre_I/D_vs_Cob_post_I/D',
  style: {stretch: 'horizontal', fontSize: '12px', fontFamily: 'Arial', padding: '3px'},
  onChange: function Cambio (pre) {
        cambio_DCBCI.setValue(pre);
  },
});
var mostrar7 = ui.Button({
  label: 'Mostrar',
  onClick: mostrar_img7,
  style: {stretch: 'horizontal', fontSize: '12px', fontFamily: 'Arial', padding: '3px'}
});
var descarga7 = ui.Button({
  label: 'Descargar',
  onClick: descarga_img7,
  style: {stretch: 'horizontal', fontSize: '12px', fontFamily: 'Arial', padding: '3px'}
});
var botones7 =ui.Panel([mostrar7, descarga7],ui.Panel.Layout.Flow('horizontal'), {backgroundColor: '#83A5A9', fontSize: '12px', fontFamily: 'Arial'});
var mensaje7 = ui.Label('Escoja una imagen de cambio y presione mostrar o descargar', {fontSize: '12px', backgroundColor: '#FFFFFF', Color: 'blue', padding: '3px', fontFamily: 'Arial'});
var panel_mensaje7 = ui.Panel([mensaje7], 
  null, {position: 'bottom-left', backgroundColor: '#83A5A9', fontFamily: 'Arial'}
);
var boton_limpiar = ui.Button({
  label: 'Limpiar pantalla',
  onClick: limpia_pantalla,
  style: {stretch: 'horizontal', fontSize: '12px', fontFamily: 'Arial', padding: '3px'}
});
//Panel de instrucciones
var Intr_panel = ui.Panel([
    titulo_mapa,
    creador,
    carrera,
    tutor,
    fecha,
    enlace_publicacion,
    title,
    instr1,
    imagenes_base,
    botones1,
    panel_mensaje,
    instr2,
    NBR_select,
    botones2,
    panel_mensaje2, 
    instr3,
    instr3_1,
    cobertura_GEE,
    botones3,
    panel_mensaje3,
    instr4,
    cobertura_ENVI,
    botones4,
    panel_mensaje4,
    instr5,
    cobertura_QGIS,
    botones5,
    panel_mensaje5,
    instr6,
    instr6_1,
    cambio_DCBAM,
    botones6,
    panel_mensaje6,
    instr7,
    cambio_DCBCI,
    botones7,
    panel_mensaje7,
    boton_limpiar
  ], 
  null, {position: 'middle-left', width: '300px' , height: '475px', backgroundColor: '#83A5A9', fontFamily: 'Arial'}
);
//Se concatena el mapa base con el panel de capas
var splitPanel = ui.SplitPanel({
  firstPanel: Intr_panel,
  secondPanel: mapa_base,
  orientation: 'horizontal',
  wipe: false,
});
//Se muestra el resultado en pantalla.
ui.root.add(splitPanel);
//Panel para la Leyenda
var titulo_leyenda_cob = ui.Label({
    value: 'Cobertura del suelo', // Titulo de la leyenda
    style: {fontWeight: 'bold', fontSize: '10px', margin: '0px 0px 15px 0px',}}); // Estilo y dimensiones
var Leyenda = ui.Panel({style: {position: 'bottom-right', padding: '10px 15px'}});
mapa_base.add(Leyenda);
//Función para unir los símbolos
var Simbolos = function(simbolo, texto) {
  var TextoLeyenda = ui.Label({
    value: texto,
    style: {margin: '3px 0px 5px 7px', fontSize: '8px'}}); // Posición en la separacion de los textos
  var CajaLeyenda = ui.Label({
    style: {backgroundColor: '#' + simbolo,
    padding: '8px', // Tamaño del simbolo
    margin: '0px 0px 3px 0px'}}); // Posición en la separacion de los simbolos
  //Representacion de leyenda en el visor
  return ui.Panel({widgets: [CajaLeyenda, TextoLeyenda],layout: ui.Panel.Layout.Flow('horizontal')});
};
//Leyenda cambio de cobertura
var titulo_leyenda_cambio = ui.Label({
    value: 'Cambio de cobertura', // Titulo de la leyenda
    style: {fontWeight: 'bold', fontSize: '10px', margin: '0px 0px 15px 0px',}}); // Estilo y dimensiones
//Funciones
var n_capas = 0;
var n_img = [];
//Función para mostrar las imágenes base
function mostrar_img1 () {
  var i = 0;
  var capas_mapa = [];
  while (i <= n_capas) {
    capas_mapa[i] = mapa_base.layers().get(i).get('name');
    i ++; //Aumenta el valor de i en 1
  }
  print(capas_mapa);
  var evaluador = true;
  for (var capa in capas_mapa) {
    n_img = imagenes_base.getValue();
    if (capas_mapa[capa] == n_img) {
      evaluador = false;
    }
  }
  n_capas++;
  if (evaluador) {
    Leyenda.clear();
    n_img = imagenes_base.getValue();
    switch (n_img) {
      case "St2_pre":
        mapa_base.addLayer(St2_pre, vis_st2, 'St2_pre');
      break;
      case "St2_post":
        mapa_base.addLayer(St2_post, vis_st2, 'St2_post');
      break;
      case "Lt8_pre":
        mapa_base.addLayer(Lt8_pre, vis_lt8, 'Lt8_pre');
      break;
      case "Lt8_post":
        mapa_base.addLayer(Lt8_post, vis_lt8, 'Lt8_post');
      break;
    }
    panel_mensaje.clear();
    var texto = 'Imágen satelital '+n_img+' añadida';
    mensaje = ui.Label(texto, {fontSize: '12px', backgroundColor: '#FFFFFF', Color: 'blue', padding: '3px', fontFamily: 'Arial'});
    panel_mensaje = panel_mensaje.add(mensaje);
  } else {
    panel_mensaje.clear();
    mensaje = ui.Label('Capa ya añadida', {fontSize: '12px', backgroundColor: '#FFFFFF', Color: 'blue', padding: '3px', fontFamily: 'Arial'});
    panel_mensaje = panel_mensaje.add(mensaje);
    n_capas--;
  }
}
//Función para la descarga de imágenes base
var link = [];
var bands_St2 = [
              {id: 'B1', scale: 60},
              {id: 'B2', scale: 10},
              {id: 'B3', scale: 10},
              {id: 'B4', scale: 10},
              {id: 'B5', scale: 20},
              {id: 'B6', scale: 20},
              {id: 'B7', scale: 20},
              {id: 'B8', scale: 10},
              {id: 'B8A', scale: 20},
              {id: 'B9', scale: 60},
              {id: 'B11', scale: 20},
              {id: 'B12', scale: 20},
              {id: 'NBR', scale: 20}
              ];
var bands_Lt8 = [
      {id: 'SR_B1', scale: 30},
      {id: 'SR_B2', scale: 30},
      {id: 'SR_B3', scale: 30},
      {id: 'SR_B4', scale: 30},
      {id: 'SR_B5', scale: 30},
      {id: 'SR_B6', scale: 30},
      {id: 'SR_B7', scale: 30},
      {id: 'SR_QA_AEROSOL', scale: 30},
      {id: 'NBR', scale: 30}
    ];          
function descarga_img1 () {
  panel_mensaje.clear();
  var desc = 'URL_descarga';
  n_img = imagenes_base.getValue();
  switch (n_img) {
      case "St2_pre":
        link = St2_pre.getDownloadURL({
            name: 'COPERNICUS_S2_SR_20200322T153621_20200322T153615_T17NQA_MOJANDA',
            bands: bands_St2,
            region: area_estudio
        });
      break;
      case "St2_post":
        link = St2_post.getDownloadURL({
            name: 'COPERNICUS_S2_SR_20200824T153619_20200824T154230_T17NQA_MOJANDA',
            bands: bands_St2,
            region: area_estudio
        });
      break;
      case "Lt8_pre":
       link = Lt8_pre.getDownloadURL({
            name: 'LANDSAT_LC08_C02_T1_L2_LC08_010060_20190825_MOJANDA',
            bands: bands_Lt8,
            region: area_estudio
        });
      break;
      case "Lt8_post":
       link = Lt8_post.getDownloadURL({
            name: 'LANDSAT_LC08_C02_T1_L2_LC08_010060_20200811_MOJANDA',
            bands: bands_Lt8,
            region: area_estudio
        });
      break;
    }
    mensaje = ui.Label('Clic para descargar '+n_img, {fontSize: '12px', backgroundColor: '#FFFFFF', Color: 'blue', padding: '3px', fontFamily: 'Arial'}, link);
    panel_mensaje = panel_mensaje.add(mensaje);
}
//Función para el NBR
var nbr_St2_pre = St2_pre.select('NBR').clip(area_estudio);
var nbr_St2_post = St2_post.select('NBR').clip(area_estudio);
var dnbr_St2 = nbr_St2_pre.subtract(nbr_St2_post);
var nbr_Lt8_pre = Lt8_pre.select('NBR').clip(area_estudio);
var nbr_Lt8_post = Lt8_post.select('NBR').clip(area_estudio);
var dnbr_Lt8 = nbr_Lt8_pre.subtract(nbr_Lt8_post);
var activador_leyenda = false;
//Función para crear una leyenda
var leyenda_barra = function (vis_param, titulo) {
  //Función para crear una barra de colores
  var makeColorBarParams = function (palette) {
      return {
        bbox: [0, 0, 1, 0.1],
        dimensions: '100x8',
        format: 'png',
        min: 0,
        max: 1,
        palette: palette,
      };
  };
  //Se crea la barra de colores
  var Barra_color = ui.Thumbnail({
    //Se crea una imagen que contiene los valores de lat y long por pixel
    image: ee.Image.pixelLonLat().select(0),
    params: makeColorBarParams(vis_param.palette),
    style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '100px', width: '300px'},
  });
  //Se crean los niveles de la leyenda
  var legendLabels = ui.Panel({
    widgets: [
      ui.Label(vis_param.min, {margin: '4px 5px'}),
      ui.Label(
        ((vis_param.max + vis_param.min) / 3).toFixed(2),
        {margin: '4px 5px', textAlign: 'center', stretch: 'horizontal'}),
      ui.Label(
        (((vis_param.max + vis_param.min) / 3)*2).toFixed(2),
        {margin: '4px 5px', textAlign: 'center', stretch: 'horizontal'}),      
      ui.Label(vis_param.max, {margin: '4px 8px'})
    ],
    layout: ui.Panel.Layout.flow('horizontal')
  });
  //Se crea el título de la Leyenda
  var legendTitle = ui.Label({
    value: titulo,
    style: {
      fontWeight: 'bold',
      margin: '4px 8px'
      //width: '200px',
      //height : '10px'
    }
  });
  //Se crea la leyenda
  var legendPanel = ui.Panel(legendTitle).add(Barra_color).add(legendLabels);
  legendPanel.style().set({
    //height: '95px',
    //width: '200px',
    position: 'bottom-right'
  });
  return legendPanel;
};
function mostrar_img2 () {
  var i = 0;
  var capas_mapa = [];
  while (i <= n_capas) {
    capas_mapa[i] = mapa_base.layers().get(i).get('name');
    i ++; //Aumenta el valor de i en 1
  }
  var evaluador = true;
  for (var capa in capas_mapa) {
    n_img = NBR_select.getValue();
    print (n_img);
    if (capas_mapa[capa] == n_img) {
      evaluador = false;
    }
  }
  n_capas++;
  if (evaluador) {
    n_img = NBR_select.getValue();
    var barra_l = [];
    switch (n_img) {
    case "1. NBR_St2pre":
      Leyenda.clear();
      barra_l = leyenda_barra (vis_NBR, 'NBR');
      Leyenda.add(barra_l);
      mapa_base.addLayer(nbr_St2_pre, vis_NBR, '1. NBR_St2pre');
      break;
    case "2. NBR_St2post":
      Leyenda.clear();
      barra_l = leyenda_barra (vis_NBR, 'NBR');
      Leyenda.add(barra_l);
      mapa_base.addLayer(nbr_St2_post, vis_NBR, '2. NBR_St2post');
      break;
    case "3. dNBR_St2":
      Leyenda.clear();
      barra_l = leyenda_barra (vis_dNBR, 'dNBR');
      Leyenda.add(barra_l);
      mapa_base.addLayer(dnbr_St2, vis_dNBR, '3. dNBR_St2');
      break;
    case "4. NBR_Lt8pre":
      Leyenda.clear();
      barra_l = leyenda_barra (vis_NBR, 'NBR');
      Leyenda.add(barra_l);
      mapa_base.addLayer(nbr_Lt8_pre, vis_NBR, '4. NBR_Lt8pre');
      break;
    case "5. NBR_Lt8post":
      Leyenda.clear();
      barra_l = leyenda_barra (vis_NBR, 'NBR');
      Leyenda.add(barra_l);
      mapa_base.addLayer(nbr_Lt8_post, vis_NBR, '5. NBR_Lt8post');
      break;
    case "6. dNBR_Lt8":
      Leyenda.clear();
      barra_l = leyenda_barra (vis_dNBR, 'dNBR');
      Leyenda.add(barra_l);
      mapa_base.addLayer(dnbr_Lt8, vis_dNBR, '6. dNBR_Lt8');
      break;
    }
    panel_mensaje2.clear();
    var texto = 'Imagen '+n_img+' añadida';
    mensaje = ui.Label(texto, {fontSize: '12px', backgroundColor: '#FFFFFF', Color: 'blue', padding: '3px', fontFamily: 'Arial'});
    panel_mensaje2 = panel_mensaje2.add(mensaje);
  } else {
    panel_mensaje2.clear();
    mensaje = ui.Label('Imagen ya añadida', {fontSize: '12px', backgroundColor: '#FFFFFF', Color: 'blue', padding: '3px', fontFamily: 'Arial'});
    panel_mensaje2 = panel_mensaje2.add(mensaje);
    n_capas--;
  }
}
//Función para descargar NBR
var link2 = [];
function descarga_img2 () {
  panel_mensaje2.clear();
  var desc = 'URL_descarga';
  n_img = NBR_select.getValue();
  print (n_img);
  switch (n_img) {
      case "1. NBR_St2pre":
        link3 = nbr_St2_pre.getDownloadURL({
            name: 'NBR_St2pre_MOJANDA',
            region: area_estudio
        });
      break;
      case "2. NBR_St2post":
        link3 = nbr_St2_post.getDownloadURL({
            name: 'NBR_St2post_MOJANDA',
            region: area_estudio
        });
      break;
      case "3. dNBR_St2":
        link3 = dnbr_St2.getDownloadURL({
            name: 'dNBR_St2_MOJANDA',
            region: area_estudio
        });
      break;
      case "4. NBR_Lt8pre":
        link3 = nbr_lt8_pre.getDownloadURL({
            name: 'NBR_Lt8pre_MOJANDA',
            region: area_estudio
        });
      break;
      case "5. NBR_Lt8post":
        link3 = nbr_lt8_post.getDownloadURL({
            name: 'NBR_Lt8post_MOJANDA',
            region: area_estudio
        });
      break;
      case "6. dNBR_Lt8":
        link3 = dnbr_Lt8.getDownloadURL({
            name: 'dNBR_Lt8_MOJANDA',
            region: area_estudio
        });
      break;
    }
    print(link2);
    mensaje2 = ui.Label('Clic para descargar '+n_img, {fontSize: '12px', backgroundColor: '#FFFFFF', Color: 'blue', padding: '3px', fontFamily: 'Arial'}, link3);
    panel_mensaje2 = panel_mensaje2.add(mensaje2);
}
//Función para mostrar las coberturas generadas en GEE.
var activador_leyenda = false;
function mostrar_img3 () {
  var i = 0;
  var capas_mapa = [];
  while (i <= n_capas) {
    capas_mapa[i] = mapa_base.layers().get(i).get('name');
    i ++; //Aumenta el valor de i en 1
  }
  var evaluador = true;
  for (var capa in capas_mapa) {
    n_img = cobertura_GEE.getValue();
    if (capas_mapa[capa] == n_img) {
      evaluador = false;
    }
  }
  n_capas++;
  if (evaluador) {
    //Leyenda
    Leyenda.clear();
    Leyenda.add(titulo_leyenda_cob);
    var Etiquetas = [
      'Áreas agrícolas o agropecuarias heterogéneas',
      "Bosques",
      "Páramo",
      "Espacios abiertos con poca o ninguna vegetación",
      "Lago o laguna",
      "Humedal de Páramo",
      "Áreas quemadas"];
    var Simbologia = ['0df229', '57953e', 'fff812', '977e23', '2033bc', '66dca1', 'ff0101'];
    for (var p = 0; p < 7; p++) {
      Leyenda.add(Simbolos(Simbologia[p], Etiquetas[p]));
    }
    n_img = cobertura_GEE.getValue();
    switch (n_img) {
    case "1. Cob_St2pre_USC_GEE":
      mapa_base.addLayer(Mod_1_GEE, vis_mod_cobertura, '1. Cob_St2pre_USC_GEE');
      break;
    case "2. Cob_St2post_USC_GEE":
      mapa_base.addLayer(Mod_2_GEE, vis_mod_cobertura, '2. Cob_St2post_USC_GEE');
      break;
    case "3. Cob_Lt8pre_USC_GEE":
      mapa_base.addLayer(Mod_3_GEE, vis_mod_cobertura, '3. Cob_Lt8pre_USC_GEE');
      break;
    case "4. Cob_Lt8post_USC_GEE":
      mapa_base.addLayer(Mod_4_GEE, vis_mod_cobertura, '4. Cob_Lt8post_USC_GEE');
      break;
    case "5. Cob_St2pre_SC_GEE":
      mapa_base.addLayer(Mod_5_GEE, vis_mod_cobertura, '5. Cob_St2pre_SC_GEE');
      break;
    case "6. Cob_St2post_SC_GEE":
      mapa_base.addLayer(Mod_6_GEE, vis_mod_cobertura, '6. Cob_St2post_SC_GEE');
      break;
    case "7. Cob_Lt8pre_SC_GEE":
      mapa_base.addLayer(Mod_7_GEE, vis_mod_cobertura, '7. Cob_Lt8pre_SC_GEE');
      break;
    case "8. Cob_Lt8post_SC_GEE":
      mapa_base.addLayer(Mod_8_GEE, vis_mod_cobertura, '8. Cob_Lt8post_SC_GEE');
      break;
    }
    panel_mensaje3.clear();
    var texto = 'Cobertura '+n_img+' añadida';
    mensaje = ui.Label(texto, {fontSize: '12px', backgroundColor: '#FFFFFF', Color: 'blue', padding: '3px', fontFamily: 'Arial'});
    panel_mensaje3 = panel_mensaje3.add(mensaje);
  } else {
    panel_mensaje3.clear();
    mensaje = ui.Label('Capa ya añadida', {fontSize: '12px', backgroundColor: '#FFFFFF', Color: 'blue', padding: '3px', fontFamily: 'Arial'});
    panel_mensaje3 = panel_mensaje3.add(mensaje);
    n_capas--;
  }
}
//Función para descargar Coberturas GEE
var link3 = [];
function descarga_img3 () {
  panel_mensaje3.clear();
  var desc = 'URL_descarga';
  n_img = cobertura_GEE.getValue();
  print (n_img);
  switch (n_img) {
      case "1. Cob_St2pre_USC_GEE":
        link3 = Mod_1_GEE.getDownloadURL({
            name: 'Cob_St2pre_USC_GEE_MOJANDA',
            region: area_estudio
        });
      break;
      case "2. Cob_St2post_USC_GEE":
        link3 = Mod_2_GEE.getDownloadURL({
            name: 'Cob_St2post_USC_GEE_MOJANDA',
            region: area_estudio
        });
      break;
      case "3. Cob_Lt8pre_USC_GEE":
        link3 = Mod_3_GEE.getDownloadURL({
            name: 'Cob_Lt8pre_USC_GEE_MOJANDA',
            region: area_estudio
        });
      break;
      case "4. Cob_Lt8post_USC_GEE":
        link3 = Mod_4_GEE.getDownloadURL({
            name: 'Cob_Lt8post_USC_GEE',
            region: area_estudio
        });
      break;
      case "5. Cob_St2pre_SC_GEE":
        link3 = Mod_5_GEE.getDownloadURL({
            name: 'Cob_St2pre_SC_GEE_MOJANDA',
            region: area_estudio
        });
      break;
      case "6. Cob_St2post_SC_GEE":
        link3 = Mod_6_GEE.getDownloadURL({
            name: 'Cob_St2post_SC_GEE_MOJANDA',
            region: area_estudio
        });
      break;
      case "7. Cob_Lt8pre_SC_GEE":
        link3 = Mod_7_GEE.getDownloadURL({
            name: 'Cob_Lt8pre_SC_GEE_MOJANDA',
            region: area_estudio
        });
      break;
      case "8. Cob_Lt8post_SC_GEE":
        link3 = Mod_8_GEE.getDownloadURL({
            name: 'Cob_Lt8post_SC_GEE',
            region: area_estudio
        });
      break;
    }
    print(link3);
    mensaje3 = ui.Label('Clic para descargar '+n_img, {fontSize: '12px', backgroundColor: '#FFFFFF', Color: 'blue', padding: '3px', fontFamily: 'Arial'}, link3);
    panel_mensaje3 = panel_mensaje3.add(mensaje3);
}
//Función para mostrar las coberturas generadas en ENVI.
var activador_leyenda = false;
function mostrar_img4 () {
  var i = 0;
  var capas_mapa = [];
  while (i <= n_capas) {
    capas_mapa[i] = mapa_base.layers().get(i).get('name');
    i ++; //Aumenta el valor de i en 1
  }
  var evaluador = true;
  for (var capa in capas_mapa) {
    n_img = cobertura_ENVI.getValue();
    if (capas_mapa[capa] == n_img) {
      evaluador = false;
    }
  }
  n_capas++;
  if (evaluador) {
    //Leyenda
    Leyenda.clear();
    Leyenda.add(titulo_leyenda_cob);
    var Etiquetas = [
      'Áreas agrícolas o agropecuarias heterogéneas',
      "Bosques",
      "Páramo",
      "Espacios abiertos con poca o ninguna vegetación",
      "Lago o laguna",
      "Humedal de Páramo",
      "Áreas quemadas"];
    var Simbologia = ['0df229', '57953e', 'fff812', '977e23', '2033bc', '66dca1', 'ff0101'];
    for (var p = 0; p < 7; p++) {
      Leyenda.add(Simbolos(Simbologia[p], Etiquetas[p]));
    }
    n_img = cobertura_ENVI.getValue();
    switch (n_img) {
    case "1. Cob_St2pre_USC_ENVI":
      mapa_base.addLayer(Mod_1_ENVI, vis_mod_cobertura, '1. Cob_St2pre_USC_ENVI');
      break;
    case "2. Cob_St2post_USC_ENVI":
      mapa_base.addLayer(Mod_2_ENVI, vis_mod_cobertura, '2. Cob_St2post_USC_ENVI');
      break;
    case "3. Cob_Lt8pre_USC_ENVI":
      mapa_base.addLayer(Mod_3_ENVI, vis_mod_cobertura, '3. Cob_Lt8pre_USC_ENVI');
      break;
    case "4. Cob_Lt8post_USC_ENVI":
      mapa_base.addLayer(Mod_4_ENVI, vis_mod_cobertura, '4. Cob_Lt8post_USC_ENVI');
      break;
    case "5. Cob_St2pre_SC_ENVI":
      mapa_base.addLayer(Mod_5_ENVI, vis_mod_cobertura, '5. Cob_St2pre_SC_ENVI');
      break;
    case "6. Cob_St2post_SC_ENVI":
      mapa_base.addLayer(Mod_6_ENVI, vis_mod_cobertura, '6. Cob_St2post_SC_ENVI');
      break;
    case "7. Cob_Lt8pre_SC_ENVI":
      mapa_base.addLayer(Mod_7_ENVI, vis_mod_cobertura, '7. Cob_Lt8pre_SC_ENVI');
      break;
    case "8. Cob_Lt8post_SC_ENVI":
      mapa_base.addLayer(Mod_8_ENVI, vis_mod_cobertura, '8. Cob_Lt8post_SC_ENVI');
      break;
    }
    panel_mensaje4.clear();
    var texto = 'Cobertura '+n_img+' añadida';
    mensaje = ui.Label(texto, {fontSize: '12px', backgroundColor: '#FFFFFF', Color: 'blue', padding: '3px', fontFamily: 'Arial'});
    panel_mensaje4 = panel_mensaje4.add(mensaje);
  } else {
    panel_mensaje4.clear();
    mensaje = ui.Label('Capa ya añadida', {fontSize: '12px', backgroundColor: '#FFFFFF', Color: 'blue', padding: '3px', fontFamily: 'Arial'});
    panel_mensaje4 = panel_mensaje4.add(mensaje);
    n_capas--;
  }
}
//Función para descargar Coberturas ENVI
var link4 = [];
function descarga_img4 () {
  panel_mensaje4.clear();
  var desc = 'URL_descarga';
  n_img = cobertura_ENVI.getValue();
  print (n_img);
  switch (n_img) {
      case "1. Cob_St2pre_USC_ENVI":
        link4 = Mod_1_ENVI.getDownloadURL({
            name: 'Cob_St2pre_USC_ENVI_MOJANDA',
            region: area_estudio
        });
      break;
      case "2. Cob_St2post_USC_ENVI":
        link4 = Mod_2_ENVI.getDownloadURL({
            name: 'Cob_St2post_USC_ENVI_MOJANDA',
            region: area_estudio
        });
      break;
      case "3. Cob_Lt8pre_USC_ENVI":
        link4 = Mod_3_ENVI.getDownloadURL({
            name: 'Cob_Lt8pre_USC_ENVI_MOJANDA',
            region: area_estudio
        });
      break;
      case "4. Cob_Lt8post_USC_ENVI":
        link4 = Mod_4_ENVI.getDownloadURL({
            name: 'Cob_Lt8post_USC_ENVI',
            region: area_estudio
        });
      break;
      case "5. Cob_St2pre_SC_ENVI":
        link4 = Mod_5_ENVI.getDownloadURL({
            name: 'Cob_St2pre_SC_ENVI_MOJANDA',
            region: area_estudio
        });
      break;
      case "6. Cob_St2post_SC_ENVI":
        link4 = Mod_6_ENVI.getDownloadURL({
            name: 'Cob_St2post_SC_ENVI_MOJANDA',
            region: area_estudio
        });
      break;
      case "7. Cob_Lt8pre_SC_ENVI":
        link4 = Mod_7_ENVI.getDownloadURL({
            name: 'Cob_Lt8pre_SC_ENVI_MOJANDA',
            region: area_estudio
        });
      break;
      case "8. Cob_Lt8post_SC_ENVI":
        link4 = Mod_8_ENVI.getDownloadURL({
            name: 'Cob_Lt8post_SC_ENVI',
            region: area_estudio
        });
      break;
    }
    print(link4);
    mensaje4 = ui.Label('Clic para descargar '+n_img, {fontSize: '12px', backgroundColor: '#FFFFFF', Color: 'blue', padding: '3px', fontFamily: 'Arial'}, link4);
    panel_mensaje4 = panel_mensaje4.add(mensaje4);
}
//Función para mostrar las coberturas generadas mediante interpretación/digitalización.
var activador_leyenda = false;
function mostrar_img5 () {
  var i = 0;
  var capas_mapa = [];
  while (i <= n_capas) {
    capas_mapa[i] = mapa_base.layers().get(i).get('name');
    i ++; //Aumenta el valor de i en 1
  }
  var evaluador = true;
  for (var capa in capas_mapa) {
    n_img = cobertura_QGIS.getValue();
    if (capas_mapa[capa] == n_img) {
      evaluador = false;
    }
  }
  n_capas++;
  if (evaluador) {
    //Leyenda
    Leyenda.clear();
    Leyenda.add(titulo_leyenda_cob);
    var Etiquetas = [
      'Áreas agrícolas o agropecuarias heterogéneas',
      "Bosques",
      "Páramo",
      "Espacios abiertos con poca o ninguna vegetación",
      "Lago o laguna",
      "Humedal de Páramo",
      "Áreas quemadas"];
    var Simbologia = ['0df229', '57953e', 'fff812', '977e23', '2033bc', '66dca1', 'ff0101'];
    for (var p = 0; p < 7; p++) {
      Leyenda.add(Simbolos(Simbologia[p], Etiquetas[p]));
    }
    n_img = cobertura_QGIS.getValue();
    switch (n_img) {
      case "1. Cob_pre_incendio":
        mapa_base.addLayer(Mod_1_QGIS, vis_mod_cobertura, '1. Cob_pre_incendio');
      break;
      case "2. Cob_post_incendio":
        mapa_base.addLayer(Mod_2_QGIS, vis_mod_cobertura, '2. Cob_post_incendio');
      break;
    }
    panel_mensaje5.clear();
    var texto = 'Cobertura '+n_img+' añadida';
    mensaje = ui.Label(texto, {fontSize: '12px', backgroundColor: '#FFFFFF', Color: 'blue', padding: '3px', fontFamily: 'Arial'});
    panel_mensaje5 = panel_mensaje5.add(mensaje);
  } else {
    panel_mensaje5.clear();
    mensaje = ui.Label('Capa ya añadida', {fontSize: '12px', backgroundColor: '#FFFFFF', Color: 'blue', padding: '3px', fontFamily: 'Arial'});
    panel_mensaje5 = panel_mensaje5.add(mensaje);
    n_capas--;
  }
}
//Función para descargar Coberturas generadas mediante interpretación/digitalización.
var link5 = [];
function descarga_img5 () {
  var desc_Mod1_QGIS = Mod_1_QGIS.clip(area_estudio);
  var desc_Mod2_QGIS = Mod_2_QGIS.clip(area_estudio);
  panel_mensaje5.clear();
  var desc = 'URL_descarga';
  n_img = cobertura_QGIS.getValue();
  print (n_img);
  switch (n_img) {
    case "1. Cob_pre_incendio":
      link5 = Mod_1_QGIS.toInt().getDownloadURL({
        name: 'Cob_pre_incendio_I_D',
        region: area_estudio,
        scale: 2.5,
        units: 'meters',
      });
    break;
    case "2. Cob_post_incendio":
      link5 = Mod_2_QGIS.toInt().getDownloadURL({
          name: 'Cob_post_incendio_I_D',
          region: area_estudio,
          scale: 2.5,
          units: 'meters',
      });
  }
  mensaje5 = ui.Label('Clic para descargar '+n_img, {fontSize: '12px', backgroundColor: '#FFFFFF', Color: 'blue', padding: '3px', fontFamily: 'Arial'}, link5);
  panel_mensaje5 = panel_mensaje5.add(mensaje5);
}
//Función para mostrar las imágenes de cambio generadas a traves de DCBAM
var activador_leyenda = false;
function mostrar_img6 () {
  var i = 0;
  var capas_mapa = [];
  while (i <= n_capas) {
    capas_mapa[i] = mapa_base.layers().get(i).get('name');
    i ++; //Aumenta el valor de i en 1
  }
  var evaluador = true;
  for (var capa in capas_mapa) {
    n_img = cambio_DCBAM.getValue();
    if (capas_mapa[capa] == n_img) {
      evaluador = false;
    }
  }
  n_capas++;
  if (evaluador) {
    //Leyenda
    Leyenda.clear();
    Leyenda.add(titulo_leyenda_cambio);
    var Etiquetas = [
      'Sin cambio', 
      'Incendio forestal',
      'Actividad agrícola',
      'Otros cambios'
      ];
    var Simbologia = ["b6b6b6","ff0808","ffe358","0bcaa7"];
    for (var p = 0; p < 4; p++) {
      Leyenda.add(Simbolos(Simbologia[p], Etiquetas[p]));
    }
    n_img = cambio_DCBAM.getValue();
    switch (n_img) {
      case "1. DCBAM_St2":
        mapa_base.addLayer(DCBAM_St2, vis_mod_cambio, '1. DCBAM_St2');
      break;
      case "2. DCBAM_Lt8":
        mapa_base.addLayer(DCBAM_Lt8, vis_mod_cambio, '2. DCBAM_Lt8');
      break;
    }
    panel_mensaje6.clear();
    print('funciona');
    var texto = 'Imagen de cambio '+n_img+' añadida';
    mensaje = ui.Label(texto, {fontSize: '12px', backgroundColor: '#FFFFFF', Color: 'blue', padding: '3px', fontFamily: 'Arial'});
    panel_mensaje6 = panel_mensaje6.add(mensaje);
  } else {
    print('funciona');
    panel_mensaje6.clear();
    mensaje = ui.Label('Capa ya añadida', {fontSize: '12px', backgroundColor: '#FFFFFF', Color: 'blue', padding: '3px', fontFamily: 'Arial'});
    panel_mensaje6 = panel_mensaje6.add(mensaje);
    n_capas--;
  }
}
//Función para descargar  las imágenes de cambio generadas a traves de DCBAM
var link6 = [];
function descarga_img6 () {
  var desc_DCBAM_St2 = DCBAM_St2.clip(area_estudio);
  var desc_DCBAM_Lt8 = DCBAM_Lt8.clip(area_estudio);
  panel_mensaje6.clear();
  var desc = 'URL_descarga';
  n_img = cambio_DCBAM.getValue();
  print (n_img);
  switch (n_img) {
    case "1. DCBAM_St2":
      link6 = DCBAM_St2.getDownloadURL({
        name: 'DCBAM_St2',
        region: area_estudio,
        scale: 10,
        units: 'meters',
      });
    break;
    case "2. DCBAM_Lt8":
      link6 = DCBAM_Lt8.getDownloadURL({
          name: 'DCBAM_Lt8',
          region: area_estudio,
          scale: 30,
          units: 'meters',
      });
  }
  print(link6);
  mensaje6 = ui.Label('Clic para descargar '+n_img, {fontSize: '12px', backgroundColor: '#FFFFFF', Color: 'blue', padding: '3px', fontFamily: 'Arial'}, link6);
  panel_mensaje6 = panel_mensaje6.add(mensaje6);
}
//Función para mostrar las imágenes de cambio generadas a traves de DCBCI
var activador_leyenda = false;
function mostrar_img7 () {
  var i = 0;
  var capas_mapa = [];
  while (i <= n_capas) {
    capas_mapa[i] = mapa_base.layers().get(i).get('name');
    i ++; //Aumenta el valor de i en 1
  }
  var evaluador = true;
  for (var capa in capas_mapa) {
    n_img = cambio_DCBCI.getValue();
    if (capas_mapa[capa] == n_img) {
      evaluador = false;
    }
  }
  n_capas++;
  if (evaluador) {
    //Leyenda
    Leyenda.clear();
    Leyenda.add(titulo_leyenda_cambio);
    var Etiquetas = [
      'Sin cambio', 
      'Incendio forestal',
      'Actividad agrícola',
      'Otros cambios'
      ];
    var Simbologia = ["b6b6b6","ff0808", "ffe358","0bcaa7"];
    for (var p = 0; p < 4; p++) {
      Leyenda.add(Simbolos(Simbologia[p], Etiquetas[p]));
    }
    n_img = cambio_DCBCI.getValue();
    switch (n_img) {
      case "1. Cob_pre_I/D_vs_Cob_post_I/D":
        mapa_base.addLayer(DCBCI_Cob1QGIS_vs_Cob2QGIS, vis_mod_cambio, '1. Cob_pre_I/D_vs_Cob_post_I/D');
      break;
      case "2. Cob_5GEE_vs_Cob_6GEE":
        mapa_base.addLayer(DCBCI_Cob5GEE_vs_Cob6GEE, vis_mod_cambio, '2. Cob_5GEE_vs_Cob_6GEE');
      break;
      case "3. Cob_5ENVI_vs_Cob_6ENVI":
        mapa_base.addLayer(DCBCI_Cob5ENVI_vs_Cob6ENVI, vis_mod_cambio, '3. Cob_5ENVI_vs_Cob_6ENVI');
      break;
      case "4. Cob_7GEE_vs_Cob_8ENVI":
        mapa_base.addLayer(DCBCI_Cob7GEE_vs_Cob8ENVI, vis_mod_cambio, '4. Cob_7GEE_vs_Cob_8ENVI');
      break;
    }
    panel_mensaje7.clear();
    print('funciona');
    var texto = 'Imagen de cambio '+n_img+' añadida';
    mensaje = ui.Label(texto, {fontSize: '12px', backgroundColor: '#FFFFFF', Color: 'blue', padding: '3px', fontFamily: 'Arial'});
    panel_mensaje7 = panel_mensaje7.add(mensaje);
  } else {
    print('funciona');
    panel_mensaje7.clear();
    mensaje = ui.Label('Capa ya añadida', {fontSize: '12px', backgroundColor: '#FFFFFF', Color: 'blue', padding: '3px', fontFamily: 'Arial'});
    panel_mensaje7 = panel_mensaje7.add(mensaje);
    n_capas--;
  }
}
//Función para descargar  las imágenes de cambio generadas a traves de DCBCI
var link7 = [];
function descarga_img7 () {
  var desc_DCBAM_St2 = DCBAM_St2.clip(area_estudio);
  var desc_DCBAM_Lt8 = DCBAM_Lt8.clip(area_estudio);
  panel_mensaje7.clear();
  var desc = 'URL_descarga';
  n_img = cambio_DCBCI.getValue();
  print (n_img);
  switch (n_img) {
    case "1. Cob_pre_I/D_vs_Cob_post_I/D":
      link7 = DCBCI_Cob1QGIS_vs_Cob2QGIS.getDownloadURL({
        name: 'DCBCI_Cob1QGIS_vs_Cob2QGIS',
        region: area_estudio,
        scale: 2.5,
        units: 'meters',
      });
    break;
    case "2. Cob_5GEE_vs_Cob_6GEE":
      link7 = DCBCI_Cob5GEE_vs_Cob6GEE.getDownloadURL({
          name: 'DCBCI_Cob5GEE_vs_Cob6GEE',
          region: area_estudio,
          scale: 10,
          units: 'meters',
      });
    break;
    case "3. Cob_5ENVI_vs_Cob_6ENVI":
      link7 = DCBCI_Cob5ENVI_vs_Cob6ENVI.getDownloadURL({
        name: 'DCBCI_Cob5ENVI_vs_Cob6ENVI',
        region: area_estudio,
        scale: 10,
        units: 'meters',
      });
    break;
    case "4. Cob_7GEE_vs_Cob_8ENVI":
      link7 = DCBCI_Cob7GEE_vs_Cob8ENVI.getDownloadURL({
          name: 'DCBCI_Cob7GEE_vs_Cob8ENVI',
          region: area_estudio,
          scale: 30,
          units: 'meters',
      });
    break;
  }
  print(link7);
  mensaje7 = ui.Label('Clic para descargar '+n_img, {fontSize: '12px', backgroundColor: '#FFFFFF', Color: 'blue', padding: '3px', fontFamily: 'Arial'}, link7);
  panel_mensaje7 = panel_mensaje7.add(mensaje7);
}
//Función para limpiar la pantalla
function limpia_pantalla () {
  mapa_base.clear();
  mapa_base.addLayer(area_estudio,{"color":"#000000"},"Area_estudio", 1, 0.5);
  n_capas = 0;
  mapa_base.add(Leyenda.clear());
}