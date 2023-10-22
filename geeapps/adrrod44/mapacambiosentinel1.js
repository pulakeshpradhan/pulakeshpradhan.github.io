var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -79.81163942741557,
                -1.3353680925844817
              ],
              [
                -79.92424929069682,
                -1.7142615053184993
              ],
              [
                -79.96544802116557,
                -1.950346618542748
              ],
              [
                -79.91326296257182,
                -2.098569433985312
              ],
              [
                -79.77318727897807,
                -2.128761280234596
              ],
              [
                -79.65783083366557,
                -1.9723064021050232
              ],
              [
                -79.57543337272807,
                -1.8021107443245892
              ],
              [
                -79.57543337272807,
                -1.5714979853841031
              ],
              [
                -79.52050173210307,
                -1.3051637113152952
              ],
              [
                -79.63036501335307,
                -1.2529916576203848
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-79.81163942741557, -1.3353680925844817],
          [-79.92424929069682, -1.7142615053184993],
          [-79.96544802116557, -1.950346618542748],
          [-79.91326296257182, -2.098569433985312],
          [-79.77318727897807, -2.128761280234596],
          [-79.65783083366557, -1.9723064021050232],
          [-79.57543337272807, -1.8021107443245892],
          [-79.57543337272807, -1.5714979853841031],
          [-79.52050173210307, -1.3051637113152952],
          [-79.63036501335307, -1.2529916576203848]]]),
    nxcantones = ui.import && ui.import("nxcantones", "table", {
      "id": "users/adrrod44/Almanaque/nxcantones"
    }) || ee.FeatureCollection("users/adrrod44/Almanaque/nxcantones"),
    subcuencas = ui.import && ui.import("subcuencas", "table", {
      "id": "users/adrrod44/Almanaque/CH_Subcuencas"
    }) || ee.FeatureCollection("users/adrrod44/Almanaque/CH_Subcuencas"),
    Vis_rgb = ui.import && ui.import("Vis_rgb", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B4",
          "B3",
          "B2"
        ],
        "min": 321.38,
        "max": 2547.62,
        "gamma": 1.292
      }
    }) || {"opacity":1,"bands":["B4","B3","B2"],"min":321.38,"max":2547.62,"gamma":1.292},
    CH_Subcuencas = ui.import && ui.import("CH_Subcuencas", "table", {
      "id": "users/adrrod44/Almanaque/CH_Subcuencas"
    }) || ee.FeatureCollection("users/adrrod44/Almanaque/CH_Subcuencas");
/**
Author: Adrian Rodriguez Meza (adr.rod44@gmail.com)
Este código es gratuito y abierto.
Al usar este código y cualquier dato derivado de él,
acepta citar la siguiente referencia en las publicaciones derivadas de ellos:
Rodríguez, Adrián; 2020. 
    Detección de cambios sobre la superficie terrestre utilizando imágenes Radar banda C y
    el procesamiento en la nube.;
    "https://code.earthengine.google.com/17c37b1af0f131f84afc7774962ab7c3"
Bibliography:
    -- Appliedsciences.nasa.gov. 2020. Introducción Al Radar De Apertura Sintética | 
        NASA Applied Sciences. [online] Available at:
        https://appliedsciences.nasa.gov/join-mission/training/spanish/introduccion-al-radar-de-apertura-sintetica [Accessed 25 November 2020].
    -- Appliedsciences.nasa.gov. 2020. Mapeo Y Monitoreo De Los Bosques Con Datos SAR |
        NASA Applied Sciences. [online] Available at:
        https://appliedsciences.nasa.gov/join-mission/training/spanish/mapeo-y-monitoreo-de-los-bosques-con-datos-sar [Accessed 25 November 2020].
    -- PhD. Minerva Singh, Bestselling Udemy Instructor & Data Scientist(Cambridge Uni)
        https://www.udemy.com/share/101Z4GCUMcdl5bRHQ=/
**/
//se añade el segundo mapa:
var Map_1 = ui.Map();
var SWIPE = ui.Map.Linker([ui.root.widgets().get(0), Map_1]);
var SWIPE2 = ui.SplitPanel({
  firstPanel: SWIPE.get(0),
  secondPanel: SWIPE.get(1),
  orientation: 'horizontal', // Cambio a horizontal o vertical
  wipe: true,
  style: {stretch: 'both'}});
ui.root.widgets().reset([SWIPE2]);
var lista_filtros = ee.Filter.listContains("DPA_DESCAN", "DAULE", "DPA_DESCAN", "SANTA LUCIA");
var DAULE = nxcantones.filter(ee.Filter.eq("DPA_DESCAN", "DAULE"));
    DAULE = DAULE.toList(2,0);
var SANTA_LUCIA = nxcantones.filter(ee.Filter.eq("DPA_DESCAN", "SANTA LUCIA"));
    SANTA_LUCIA = SANTA_LUCIA.toList(2,0);
var PALESTINA = nxcantones.filter(ee.Filter.eq("DPA_DESCAN", "PALESTINA"));
    PALESTINA = PALESTINA.toList(2,0);
var VINCES = nxcantones.filter(ee.Filter.eq("DPA_DESCAN", "VINCES"));
    VINCES = VINCES.toList(2,0);
var SALITRE = nxcantones.filter(ee.Filter.eq("DPA_DESCAN", "SALITRE"));
    SALITRE = SALITRE.toList(2,0);
var cantones = DAULE.cat(SANTA_LUCIA).cat(PALESTINA).cat(VINCES).cat(SALITRE);
    cantones = ee.FeatureCollection(cantones);
var Cuenca_Guayas = CH_Subcuencas.filter(ee.Filter.eq("Nombre_cue", "RIO GUAYAS"));
var DRENAJES_MENORES = Cuenca_Guayas.filter(ee.Filter.eq("Nombre_sub", "DRENAJES MENORES"));
    DRENAJES_MENORES = DRENAJES_MENORES.toList(2,0);
var RIO_MACUL = Cuenca_Guayas.filter(ee.Filter.eq("Nombre_sub", "RIO MACUL"));
    RIO_MACUL = RIO_MACUL.toList(2,0);
var area_estudio = DRENAJES_MENORES.cat(RIO_MACUL);
    area_estudio = ee.FeatureCollection(area_estudio);
var roi = area_estudio;
//Se crea un titulo
var title = ui.Label('Mapa de Cambio 2021');
title.style().set({
  position: 'top-left',
  fontWeight: 'bold'
});
Map.add(title);
var title = ui.Label('Mapa de Cambio 2022');
title.style().set({
  position: 'top-right',
  fontWeight: 'bold'
});
Map_1.add(title);
//Se PALESTINAtra el Mapa
Map.centerObject(roi, 10);
Map_1.centerObject(roi, 10);
//Funcion para cortar
var corte = function(img){
  var img_corte = img.clip(roi);
  return img_corte; 
};
//Variables inicializadoras
var Tiempo_1_1 = ee.Filter.date('2021-12-15', '2021-12-31');
var Tiempo_1_2 = ee.Filter.date('2022-01-01', '2022-01-15');
var Tiempo_1_3 = ee.Filter.date('2022-01-15', '2022-01-31');
var Tiempo_2_1 = ee.Filter.date('2022-01-01', '2022-01-15');
var Tiempo_2_2 = ee.Filter.date('2022-01-15', '2022-01-31');
var Tiempo_2_3 = ee.Filter.date('2022-02-01', '2022-02-15');
//Polarización VV
//Se carga la colección y se corta
var radar = ee.ImageCollection('COPERNICUS/S1_GRD')
            .filterBounds (roi);
    radar = radar.map(corte);
//filtro de polarización
var imgVV = radar
        .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
        .filter(ee.Filter.eq('instrumentMode', 'IW'))
        .select('VV');
//Filtro de la órbita
var desc_VV = imgVV.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'));
var asc_VV = imgVV.filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'));
//Se forma una imagen temporal
    //Descendente
var desc_VV_Tiempo_1_1 = desc_VV.filter(Tiempo_1_1);
print("desc_VV_Tiempo_1_1", desc_VV_Tiempo_1_1);
var desc_VV_Tiempo_1_2 = desc_VV.filter(Tiempo_1_2);
print("desc_VV_Tiempo_1_2", desc_VV_Tiempo_1_2);
var desc_VV_Tiempo_1_3 = desc_VV.filter(Tiempo_1_3);
print("desc_VV_Tiempo_1_3", desc_VV_Tiempo_1_3);
var descChange_VV_1 = ee.Image.cat(
        desc_VV_Tiempo_1_3.mean().rename('Tiempo_1_3'),
        desc_VV_Tiempo_1_2.mean().rename('Tiempo_1_2'),
        desc_VV_Tiempo_1_1.mean().rename('Tiempo_1_1'));
    descChange_VV_1 = descChange_VV_1.multiply(-1);
var desc_VV_Tiempo_2_1 = desc_VV.filter(Tiempo_2_1);
print("desc_VV_Tiempo_2_1", desc_VV_Tiempo_2_1);
var desc_VV_Tiempo_2_2 = desc_VV.filter(Tiempo_2_2);
print("desc_VV_Tiempo_2_2", desc_VV_Tiempo_2_2);
var desc_VV_Tiempo_2_3 = desc_VV.filter(Tiempo_2_3);
print("desc_VV_Tiempo_2_3", desc_VV_Tiempo_2_3);
var descChange_VV_2 = ee.Image.cat(
        desc_VV_Tiempo_2_3.mean().rename('Tiempo_2_3'),
        desc_VV_Tiempo_2_2.mean().rename('Tiempo_2_2'),
        desc_VV_Tiempo_2_1.mean().rename('Tiempo_2_1'));
    descChange_VV_2 = descChange_VV_2.multiply(-1);
    //Ascendente
var asc_VV_Tiempo_1_1 = asc_VV.filter(Tiempo_1_1);
print("asc_VV_Tiempo_1_1", asc_VV_Tiempo_1_1);
var asc_VV_Tiempo_1_2 = asc_VV.filter(Tiempo_1_2);
print("asc_VV_Tiempo_1_2", asc_VV_Tiempo_1_2);
var asc_VV_Tiempo_1_3 = asc_VV.filter(Tiempo_1_3);
print("asc_VV_Tiempo_1_3", asc_VV_Tiempo_1_3);
var ascChange_VV_1 = ee.Image.cat(
        asc_VV_Tiempo_1_3.mean().rename('Tiempo_1_3'),
        asc_VV_Tiempo_1_2.mean().rename('Tiempo_1_2'),
        asc_VV_Tiempo_1_1.mean().rename('Tiempo_1_1'));
    ascChange_VV_1 = ascChange_VV_1.multiply(-1);
var asc_VV_Tiempo_2_1 = asc_VV.filter(Tiempo_2_1);
print("asc_VV_Tiempo_2_1", asc_VV_Tiempo_2_1);
var asc_VV_Tiempo_2_2 = asc_VV.filter(Tiempo_2_2);
print("asc_VV_Tiempo_2_2", asc_VV_Tiempo_2_2);
var asc_VV_Tiempo_2_3 = asc_VV.filter(Tiempo_2_3);
print("asc_VV_Tiempo_2_3", asc_VV_Tiempo_2_3);
var ascChange_VV_2 = ee.Image.cat(
        asc_VV_Tiempo_2_3.mean().rename('Tiempo_2_3'),
        asc_VV_Tiempo_2_2.mean().rename('Tiempo_2_2'),
        asc_VV_Tiempo_2_1.mean().rename('Tiempo_2_1'));
    ascChange_VV_2 = ascChange_VV_2.multiply(-1);
  //polarizacion VH
var imgVH = radar
        .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
        .filter(ee.Filter.eq('instrumentMode', 'IW'))
        .select('VH');
var desc_VH = imgVH.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'));
var asc_VH = imgVH.filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'));
    //Descendente
var desc_VH_Tiempo_1_1 = desc_VH.filter(Tiempo_1_1);
print("desc_VH_Tiempo_1_1", desc_VH_Tiempo_1_1);
var desc_VH_Tiempo_1_2 = desc_VH.filter(Tiempo_1_2);
print("desc_VH_Tiempo_1_2", desc_VH_Tiempo_1_2);
var desc_VH_Tiempo_1_3 = desc_VH.filter(Tiempo_1_3);
print("desc_VH_Tiempo_1_3", desc_VH_Tiempo_1_3);
var descChange_VH_1 = ee.Image.cat(
        desc_VH_Tiempo_1_3.mean().rename('Tiempo_1_3'),
        desc_VH_Tiempo_1_2.mean().rename('Tiempo_1_2'),
        desc_VH_Tiempo_1_1.mean().rename('Tiempo_1_1'));
    descChange_VH_1 = descChange_VH_1.multiply(-1);
var desc_VH_Tiempo_2_1 = desc_VH.filter(Tiempo_2_1);
print("desc_VH_Tiempo_2_1", desc_VH_Tiempo_2_1);
var desc_VH_Tiempo_2_2 = desc_VH.filter(Tiempo_2_2);
print("desc_VH_Tiempo_2_2", desc_VH_Tiempo_2_2);
var desc_VH_Tiempo_2_3 = desc_VH.filter(Tiempo_2_3);
print("desc_VH_Tiempo_2_3", desc_VH_Tiempo_2_3);
var descChange_VH_2 = ee.Image.cat(
        desc_VH_Tiempo_2_3.mean().rename('Tiempo_2_3'),
        desc_VH_Tiempo_2_2.mean().rename('Tiempo_2_2'),
        desc_VH_Tiempo_2_1.mean().rename('Tiempo_2_1'));
    descChange_VH_2 = descChange_VH_2.multiply(-1);
    //Ascendente
var asc_VH_Tiempo_1_1 = asc_VH.filter(Tiempo_1_1);
print("asc_VH_Tiempo_1_1", asc_VH_Tiempo_1_1);
var asc_VH_Tiempo_1_2 = asc_VH.filter(Tiempo_1_2);
print("asc_VH_Tiempo_1_2", asc_VH_Tiempo_1_2);
var asc_VH_Tiempo_1_3 = asc_VH.filter(Tiempo_1_3);
print("asc_VH_Tiempo_1_3", asc_VH_Tiempo_1_3);
var ascChange_VH_1 = ee.Image.cat(
        asc_VH_Tiempo_1_3.mean().rename('Tiempo_1_3'),
        asc_VH_Tiempo_1_2.mean().rename('Tiempo_1_2'),
        asc_VH_Tiempo_1_1.mean().rename('Tiempo_1_1'));
    ascChange_VH_1 = ascChange_VH_1.multiply(-1);
var asc_VH_Tiempo_2_1 = asc_VH.filter(Tiempo_2_1);
print("asc_VH_Tiempo_2_1", asc_VH_Tiempo_2_1);
var asc_VH_Tiempo_2_2 = asc_VH.filter(Tiempo_2_2);
print("asc_VH_Tiempo_2_2", asc_VH_Tiempo_2_2);
var asc_VH_Tiempo_2_3 = asc_VH.filter(Tiempo_2_3);
print("asc_VH_Tiempo_2_3", asc_VH_Tiempo_2_3);
var ascChange_VH_2 = ee.Image.cat(
        asc_VH_Tiempo_2_3.mean().rename('Tiempo_2_3'),
        asc_VH_Tiempo_2_2.mean().rename('Tiempo_2_2'),
        asc_VH_Tiempo_2_1.mean().rename('Tiempo_2_1'));
    ascChange_VH_2 = ascChange_VH_2.multiply(-2);
Map.addLayer(ascChange_VV_1, {min: -5, max: 25}, 'Multi-T Mean ASC VV 1', 0);
Map.addLayer(descChange_VV_1, {min: -5, max: 25}, 'Multi-T Mean DESC  VV 1', 1);
Map.addLayer(ascChange_VH_1, {min: -5, max: 25}, 'Multi-T Mean ASC VH 1', 0);
Map.addLayer(descChange_VH_1, {min: -5, max: 25}, 'Multi-T Mean DESC  VH 1', 0);
Map_1.addLayer(ascChange_VV_2, {min: -5, max: 25}, 'Multi-T Mean ASC VV 2', 0);
Map_1.addLayer(descChange_VV_2, {min: -5, max: 25}, 'Multi-T Mean DESC  VV 2', 1);
Map_1.addLayer(ascChange_VH_2, {min: -5, max: 25}, 'Multi-T Mean ASC VH 2', 0);
Map_1.addLayer(descChange_VH_2, {min: -5, max: 25}, 'Multi-T Mean DESC  VH 2', 0);
/***Imagen optica Sentinel 2
var img_list = [];
    img_list[1] = ee.Image('COPERNICUS/S2_SR/20200723T155231_20200723T155227_T17MPU');
    img_list[2] = ee.Image('COPERNICUS/S2_SR/20200723T155231_20200723T155227_T17MNU');
    img_list[3] = ee.Image('COPERNICUS/S2_SR/20200723T155231_20200723T155227_T17MPT');
    img_list[4] = ee.Image('COPERNICUS/S2_SR/20200723T155231_20200723T155227_T17MNT');
    img_list[5] = ee.Image('COPERNICUS/S2_SR/20200814T153619_20200814T153738_T17MPT');
var img_col = ee.ImageCollection(img_list);
print(img_col);
var img_col_corte = img_col.map(corte);
var img_col_mosaic = img_col_corte.mean();
Map.addLayer(img_col_mosaic,Vis_rgb,'img_col_mosaic');***/
/**Detector de bordes Cany
var canny = ee.Algorithms.CannyEdgeDetector({
  image: descChange_VH, threshold: 10, sigma: 1
});
Map.addLayer(canny,{},'cany'); **/
var EA010_CULTIVO_PERIODO1_2020_A = ee.FeatureCollection("users/adrrod44/cultivos/EA010_CULTIVO_PERIODO1_2020_A");
var arroz = EA010_CULTIVO_PERIODO1_2020_A.filter(ee.Filter.eq("ncu", "ARROZ"));
var soya = EA010_CULTIVO_PERIODO1_2020_A.filter(ee.Filter.eq("ncu", "SOYA"));
var maiz = EA010_CULTIVO_PERIODO1_2020_A.filter(ee.Filter.eq("ncu", "MAIZ AMARILLO DURO"));
Map.addLayer(arroz,{color: 'red'},'ARROZ_PERIODO1_2020_A', 0, 0.5);
Map.addLayer(soya,{color: 'blue'},'SOYA_PERIODO1_2020_A', 0, 0.5);
Map.addLayer(maiz,{color: 'green'},'MAIZ_AMARILLO_PERIODO1_2020_A', 0, 0.5);
var EA010_CULTIVO_BANANO_2020_A = ee.FeatureCollection("users/adrrod44/cultivos/EA010_CULTIVO_BANANO_2020_A");
Map.addLayer(EA010_CULTIVO_BANANO_2020_A, {color: 'yellow'},'BANANO_PERIODO_2020_A', 0, 0.5);
var EA010_CULTIVO_CANA_AZUCAR_INDUSTRIAL_2020_A = ee.FeatureCollection("users/adrrod44/cultivos/EA010_CULTIVO_CANA_AZUCAR_INDUSTRIAL_2020_A");
Map.addLayer(EA010_CULTIVO_CANA_AZUCAR_INDUSTRIAL_2020_A, {color: 'CYAN'},'CAÑA_AZUCAR_PERIODO_2020_A', 0, 0.5);
var EA010_CULTIVO_PALMA_ACEITERA_2020_A = ee.FeatureCollection("users/adrrod44/cultivos/EA010_CULTIVO_PALMA_ACEITERA_2020_A");
Map.addLayer(EA010_CULTIVO_PALMA_ACEITERA_2020_A, {color: 'BROWN'},'PALMA_ACEITERA_PERIODO_2020_A', 0, 0.5);
Map.addLayer(area_estudio, {lineType: 'dashed'}, 'area_estudio', 0, 0.5);