////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Script for visualizing Planet / NICFI monthly and bi-annual mosaics for LATIN AMERICA & CARIBBEAN
// Last updated: 25 March 2022
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
NOTICE: By accessing this script, you agree to the following licensing agreement from Planet,
including the clause that "all use must be non-commercial or not in the primary pursuit of profit."
https://assets.planet.com/docs/Planet_ParticipantLicenseAgreement_NICFI.pdf
To access the Planet data for your own use, including downloading or other use in Google Earth Engine, please refer to:
https://www.planet.com/nicfi/
The imagery included here are a subset of the Americas imagery, which can be accessed from the following:
https://code.earthengine.google.com/?scriptPath=Examples%3ADatasets%2Fprojects_planet-nicfi_assets_basemaps_americas
*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var a = require('users/bzgeo/examples:_ancillary/mes');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var pal_ps = {min:100,max:1575,bands:['R','G','B']};
var ps_2016_05 = ee.Image('projects/sica/compil_imagenes/opticas/planet/sv_san_salvador_planetscope_q2016_05');
var ps_2016_11 = ee.Image('projects/sica/compil_imagenes/opticas/planet/sv_san_salvador_planetscope_q2016_11');
var ps_2017_05 = ee.Image('projects/sica/compil_imagenes/opticas/planet/sv_san_salvador_planetscope_q2017_05');
var ps_2017_11 = ee.Image('projects/sica/compil_imagenes/opticas/planet/sv_san_salvador_planetscope_q2017_11');
var ps_2018_05 = ee.Image('projects/sica/compil_imagenes/opticas/planet/sv_san_salvador_planetscope_q2018_05');
var ps_2018_11 = ee.Image('projects/sica/compil_imagenes/opticas/planet/sv_san_salvador_planetscope_q2018_11');
var ps_2019_05 = ee.Image('projects/sica/compil_imagenes/opticas/planet/sv_san_salvador_planetscope_q2019_05');
var ps_2019_11 = ee.Image('projects/sica/compil_imagenes/opticas/planet/sv_san_salvador_planetscope_q2019_11');
var ps_2020_05 = ee.Image('projects/sica/compil_imagenes/opticas/planet/sv_san_salvador_planetscope_q2020_05');
var ps_2020_08 = ee.Image('projects/sica/compil_imagenes/opticas/planet/sv_san_salvador_planetscope_q2020_08');
/////
var ps_2020_09 = ee.Image('projects/sica/compil_imagenes/opticas/planet/sv_san_salvador_planetscope_2020_09');
var ps_2020_10 = ee.Image('projects/sica/compil_imagenes/opticas/planet/sv_san_salvador_planetscope_2020_10');
var ps_2020_11 = ee.Image('projects/sica/compil_imagenes/opticas/planet/sv_san_salvador_planetscope_2020_11');
var ps_2020_12 = ee.Image('projects/sica/compil_imagenes/opticas/planet/sv_san_salvador_planetscope_2020_12');
var ps_2021_01 = ee.Image('projects/sica/compil_imagenes/opticas/planet/sv_san_salvador_planetscope_2021_01');
var ps_2021_02 = ee.Image('projects/sica/compil_imagenes/opticas/planet/sv_san_salvador_planetscope_2021_02');
var ps_2021_03 = ee.Image('projects/sica/compil_imagenes/opticas/planet/sv_san_salvador_planetscope_2021_03');
var ps_2021_04 = ee.Image('projects/sica/compil_imagenes/opticas/planet/sv_san_salvador_planetscope_2021_04');
var ps_2021_05 = ee.Image('projects/sica/compil_imagenes/opticas/planet/sv_san_salvador_planetscope_2021_05');
var ps_2021_06 = ee.Image('projects/sica/compil_imagenes/opticas/planet/sv_san_salvador_planetscope_2021_06');
var ps_2021_07 = ee.Image('projects/sica/compil_imagenes/opticas/planet/sv_san_salvador_planetscope_2021_07');
var ps_2021_08 = ee.Image('projects/sica/compil_imagenes/opticas/planet/sv_san_salvador_planetscope_2021_08');
var ps_2021_09 = ee.Image('projects/sica/compil_imagenes/opticas/planet/sv_san_salvador_planetscope_2021_09');
var ps_2021_10 = ee.Image('projects/sica/compil_imagenes/opticas/planet/sv_san_salvador_planetscope_2021_10');
var ps_2021_11 = ee.Image('projects/sica/compil_imagenes/opticas/planet/sv_san_salvador_planetscope_2021_11');
var ps_2021_12 = ee.Image('projects/sica/compil_imagenes/opticas/planet/sv_san_salvador_planetscope_2021_12');
var ps_2022_01 = ee.Image('projects/sica/compil_imagenes/opticas/planet/sv_san_salvador_planetscope_2022_01');
var ps_2022_02 = ee.Image('projects/sica/compil_imagenes/opticas/planet/sv_san_salvador_planetscope_2022_02');
//var ps_2022_03 = ee.Image('projects/sica/compil_imagenes/opticas/planet/sv_san_salvador_planetscope_2022_0');
var images_ps = {
  '2015-12_a_2016-05': ps_2016_05.visualize(pal_ps),
  '2016-06_a_2016-11': ps_2016_11.visualize(pal_ps),
  '2016-12_a_2017-05': ps_2017_05.visualize(pal_ps),
  '2017-06_a_2017-11': ps_2017_11.visualize(pal_ps),
  '2017-12_a_2018-05': ps_2018_05.visualize(pal_ps),
  '2018-06_a_2018-11': ps_2018_11.visualize(pal_ps),
  '2018-12_a_2019-05': ps_2019_05.visualize(pal_ps),
  '2019-06_a_2019-11': ps_2019_11.visualize(pal_ps),
  '2019-12_a_2020-05': ps_2020_05.visualize(pal_ps),
  '2020-06_a_2020-08': ps_2020_08.visualize(pal_ps),
  '2020-09': ps_2020_09.visualize(pal_ps),
  '2020-10': ps_2020_10.visualize(pal_ps),
  '2020-11': ps_2020_11.visualize(pal_ps),
  '2020-12': ps_2020_12.visualize(pal_ps),
  '2021-01': ps_2021_01.visualize(pal_ps),
  '2021-02': ps_2021_02.visualize(pal_ps),
  '2021-03': ps_2021_03.visualize(pal_ps),
  '2021-04': ps_2021_04.visualize(pal_ps),
  '2021-05': ps_2021_05.visualize(pal_ps),
  '2021-06': ps_2021_06.visualize(pal_ps),
  '2021-07': ps_2021_07.visualize(pal_ps),
  '2021-08': ps_2021_08.visualize(pal_ps),
  '2021-09': ps_2021_09.visualize(pal_ps),
  '2021-10': ps_2021_10.visualize(pal_ps),
  '2021-11': ps_2021_11.visualize(pal_ps),
  '2021-12': ps_2021_12.visualize(pal_ps),
  '2022-01': ps_2022_01.visualize(pal_ps),
  '2022-02': ps_2022_02.visualize(pal_ps),
  //'2022-03': ps_2022_03.visualize(pal_ps),
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var title = ui.Label("Observatorio Urbano de San Salvador: Visor de imágenes Planet", {stretch:'horizontal',textAlign:'center',fontWeight:'bold',fontSize:'24px', color: 'gray'});
var descr = ui.Label("instrucciones: deslice las imágenes y cambie las fechas para compararlas", {stretch:'horizontal',textAlign:'center',fontSize: '14px', color: 'red'});
var credits = ui.Label("créditos: imágenes © 2022 Planet Labs PBC", {stretch:'horizontal',textAlign:'center',fontSize: '12px', color: 'gray'});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PART 1: SET UP LEFT AND RIGHT PANEL WINDOWS
// CREATE LEFT MAP
var leftMap = ui.Map();
leftMap.setOptions('SATELLITE');
leftMap.setControlVisibility(true);
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Escoge imagen para visualizar');
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images_ps[selection],{},"Imágenes Planet"));
    mapToChange.layers().set(1, ui.Map.Layer(a.pa_mes_ln,{palette: "yellow"},"Áreas protegidas", false));
    //mapToChange.layers().set(2, ui.Map.Layer(a.bnds_intl_ln2,{palette: "white"},"Fronteras internacionales", true));
    }
var select = ui.Select({items: Object.keys(images_ps), onChange: updateMap});
  select.setValue(Object.keys(images_ps)[defaultValue], true);
var controlPanel = ui.Panel({widgets: [label, select], style: {position: position}});
  mapToChange.add(controlPanel);
}
// CREATE RIGHT MAP
var rightMap = ui.Map();
rightMap.setOptions('HYBRID');
rightMap.setControlVisibility(true);
var rightSelector = addLayerSelector2(rightMap, 27, 'top-right');
function addLayerSelector2(mapToChange, defaultValue, position) {
  var label = ui.Label('Escoge imagen para visualizar');
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images_ps[selection],{},"Imágenes Planet"));
    mapToChange.layers().set(1, ui.Map.Layer(a.pa_mes_ln,{palette: "yellow"},"Áreas protegidas", false));
    //mapToChange.layers().set(2, ui.Map.Layer(a.bnds_intl_ln2,{palette: "white"},"Fronteras internacionales", true));
    }
var select = ui.Select({items: Object.keys(images_ps), onChange: updateMap});
  select.setValue(Object.keys(images_ps)[defaultValue], true);
var controlPanel = ui.Panel({widgets: [label, select], style: {position: position}});
  mapToChange.add(controlPanel);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PART 2: INITIATE THE SPLIT PANEL
var splitPanel = ui.SplitPanel({firstPanel:leftMap, secondPanel:rightMap, wipe:true, style:{stretch: 'both'}});
ui.root.widgets().reset([title, descr, credits, splitPanel]);
//ui.root.widgets().reset([splitPanel]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));
var linker = ui.Map.Linker([leftMap, rightMap]);
leftMap.setCenter(-89.19461, 13.70406,13);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////