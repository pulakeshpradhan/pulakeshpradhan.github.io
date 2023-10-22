var image = ui.import && ui.import("image", "image", {
      "id": "users/erollero/MAPAS/Classilulcaraucania"
    }) || ee.Image("users/erollero/MAPAS/Classilulcaraucania"),
    redvial = ui.import && ui.import("redvial", "table", {
      "id": "users/erollero/HDIChile/rutasaraucania"
    }) || ee.FeatureCollection("users/erollero/HDIChile/rutasaraucania"),
    roi = ui.import && ui.import("roi", "table", {
      "id": "users/erollero/HDIChile/laaraucania"
    }) || ee.FeatureCollection("users/erollero/HDIChile/laaraucania"),
    table = ui.import && ui.import("table", "table", {
      "id": "users/erollero/HDIChile/araucania_utm18s"
    }) || ee.FeatureCollection("users/erollero/HDIChile/araucania_utm18s"),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "users/erollero/HDIChile/areaspobladas"
    }) || ee.FeatureCollection("users/erollero/HDIChile/areaspobladas"),
    table3 = ui.import && ui.import("table3", "table", {
      "id": "users/erollero/HDIChile/burnedareasentinel2020_utm18s"
    }) || ee.FeatureCollection("users/erollero/HDIChile/burnedareasentinel2020_utm18s"),
    image2 = ui.import && ui.import("image2", "image", {
      "id": "users/erollero/HDIChile/burned2019201"
    }) || ee.Image("users/erollero/HDIChile/burned2019201"),
    hotspot = ui.import && ui.import("hotspot", "table", {
      "id": "users/erollero/HDIChile/firesnov19aab20"
    }) || ee.FeatureCollection("users/erollero/HDIChile/firesnov19aab20"),
    table4 = ui.import && ui.import("table4", "table", {
      "id": "users/erollero/HDIChile/firearchive"
    }) || ee.FeatureCollection("users/erollero/HDIChile/firearchive"),
    table5 = ui.import && ui.import("table5", "table", {
      "id": "users/erollero/HDIChile/Chileregiones"
    }) || ee.FeatureCollection("users/erollero/HDIChile/Chileregiones"),
    table6 = ui.import && ui.import("table6", "table", {
      "id": "users/erollero/HDIChile/limiteburned"
    }) || ee.FeatureCollection("users/erollero/HDIChile/limiteburned"),
    image5 = ui.import && ui.import("image5", "image", {
      "id": "users/erollero/burned01"
    }) || ee.Image("users/erollero/burned01"),
    image6 = ui.import && ui.import("image6", "image", {
      "id": "users/erollero/burned02"
    }) || ee.Image("users/erollero/burned02"),
    image7 = ui.import && ui.import("image7", "image", {
      "id": "users/erollero/burned03"
    }) || ee.Image("users/erollero/burned03"),
    image8 = ui.import && ui.import("image8", "image", {
      "id": "users/erollero/burned04"
    }) || ee.Image("users/erollero/burned04"),
    image9 = ui.import && ui.import("image9", "image", {
      "id": "users/erollero/burned05"
    }) || ee.Image("users/erollero/burned05"),
    image10 = ui.import && ui.import("image10", "image", {
      "id": "users/erollero/burned06"
    }) || ee.Image("users/erollero/burned06"),
    image11 = ui.import && ui.import("image11", "image", {
      "id": "users/erollero/burned07"
    }) || ee.Image("users/erollero/burned07"),
    image12 = ui.import && ui.import("image12", "image", {
      "id": "users/erollero/burned08"
    }) || ee.Image("users/erollero/burned08"),
    image13 = ui.import && ui.import("image13", "image", {
      "id": "users/erollero/burned09"
    }) || ee.Image("users/erollero/burned09"),
    image14 = ui.import && ui.import("image14", "image", {
      "id": "users/erollero/burned10"
    }) || ee.Image("users/erollero/burned10"),
    image15 = ui.import && ui.import("image15", "image", {
      "id": "users/erollero/burned11"
    }) || ee.Image("users/erollero/burned11"),
    image16 = ui.import && ui.import("image16", "image", {
      "id": "users/erollero/burned12"
    }) || ee.Image("users/erollero/burned12"),
    image17 = ui.import && ui.import("image17", "image", {
      "id": "users/erollero/burned13"
    }) || ee.Image("users/erollero/burned13"),
    image18 = ui.import && ui.import("image18", "image", {
      "id": "users/erollero/burned14"
    }) || ee.Image("users/erollero/burned14"),
    image19 = ui.import && ui.import("image19", "image", {
      "id": "users/erollero/burned15"
    }) || ee.Image("users/erollero/burned15"),
    image20 = ui.import && ui.import("image20", "image", {
      "id": "users/erollero/burned16"
    }) || ee.Image("users/erollero/burned16"),
    image21 = ui.import && ui.import("image21", "image", {
      "id": "users/erollero/burned17"
    }) || ee.Image("users/erollero/burned17"),
    image22 = ui.import && ui.import("image22", "image", {
      "id": "users/erollero/burned18"
    }) || ee.Image("users/erollero/burned18"),
    image23 = ui.import && ui.import("image23", "image", {
      "id": "users/erollero/burned19"
    }) || ee.Image("users/erollero/burned19"),
    image24 = ui.import && ui.import("image24", "image", {
      "id": "users/erollero/burned2019201"
    }) || ee.Image("users/erollero/burned2019201"),
    image25 = ui.import && ui.import("image25", "image", {
      "id": "users/erollero/occurrence"
    }) || ee.Image("users/erollero/occurrence"),
    table7 = ui.import && ui.import("table7", "table", {
      "id": "users/erollero/HDIChile/intencional2021"
    }) || ee.FeatureCollection("users/erollero/HDIChile/intencional2021"),
    table8 = ui.import && ui.import("table8", "table", {
      "id": "users/erollero/HDIChile/intencional2020"
    }) || ee.FeatureCollection("users/erollero/HDIChile/intencional2020"),
    table9 = ui.import && ui.import("table9", "table", {
      "id": "users/erollero/HDIChile/intencional2019"
    }) || ee.FeatureCollection("users/erollero/HDIChile/intencional2019"),
    table10 = ui.import && ui.import("table10", "table", {
      "id": "users/erollero/HDIChile/intencional2018"
    }) || ee.FeatureCollection("users/erollero/HDIChile/intencional2018"),
    table11 = ui.import && ui.import("table11", "table", {
      "id": "users/erollero/HDIChile/intencional2017"
    }) || ee.FeatureCollection("users/erollero/HDIChile/intencional2017"),
    table12 = ui.import && ui.import("table12", "table", {
      "id": "users/erollero/HDIChile/intencional2016"
    }) || ee.FeatureCollection("users/erollero/HDIChile/intencional2016"),
    image26 = ui.import && ui.import("image26", "image", {
      "id": "users/erollero/HDIChile/faraim201020"
    }) || ee.Image("users/erollero/HDIChile/faraim201020"),
    basegurado = ui.import && ui.import("basegurado", "table", {
      "id": "users/erollero/verdadcampo"
    }) || ee.FeatureCollection("users/erollero/verdadcampo"),
    image29 = ui.import && ui.import("image29", "image", {
      "id": "users/erollero/HDIChile/Fires2122/fmod22"
    }) || ee.Image("users/erollero/HDIChile/Fires2122/fmod22"),
    image4 = ui.import && ui.import("image4", "image", {
      "id": "users/erollero/HDIChile/Fires2122/sumbur2122"
    }) || ee.Image("users/erollero/HDIChile/Fires2122/sumbur2122"),
    image27 = ui.import && ui.import("image27", "image", {
      "id": "users/erollero/HDIChile/Fires2122/frec1021"
    }) || ee.Image("users/erollero/HDIChile/Fires2122/frec1021"),
    image3 = ui.import && ui.import("image3", "image", {
      "id": "users/erollero/HDIChile/Fires2122/frec0021"
    }) || ee.Image("users/erollero/HDIChile/Fires2122/frec0021");
Map.centerObject(roi, 9);
Map.setOptions("HYBRID")
/////////////Altura de Copa//////////////gedi
var gedi = ee.Image('users/potapovpeter/GEDI_V27/GEDI_SAM_v27');
print(gedi);
var gedia = gedi.clip(table6);
var gedimk = gedia.updateMask(gedia.gte(5));
var paleta8=['#004d00'];
Map.addLayer(gedimk, {min: 5, max: 500, palette: paleta8}, 'Tree Cover > 5 meters', false);
// Create and define visualization parameters and display USO del Suelo LULC Araucania//////////
var paleta6 =['#996600','#006600','#8080ff','#00e600','#a3c2c2','#ccffcc','#62fff4'];
var imglpMasked = image.updateMask(image.gt(0));
Map.addLayer(imglpMasked, {min: 1, max: 7, palette: paleta6, opacity: (0.65)}, 'USO del Suelo');
/**************Generar una máscara del resto de las clases no implantadas 1,3,5,6,7 ***********************/
var bimplantado = image.eq(2).or(image.eq(4))
var pbimplantado = image.updateMask(bimplantado);
var maskfores = bimplantado.eq(1);
var masknoforest = bimplantado.eq(0);
var paleta7=['#0000b3'];
var imglpMasked25 = image25.updateMask(image25.gt(0));
Map.addLayer(imglpMasked25, {min: 1, max: 100, palette: paleta7}, 'Recursos Hídricos');
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: table2,
  color: 1,
  width: 3
});
Map.addLayer(outline, {palette: 'Cyan'}, 'Areas Pobladas');
// Create and define visualization parameters and display Pehuajo
var paleta7=['#ffff00'];
var imglpMasked5 = image5.updateMask(image5.gt(0));
Map.addLayer(imglpMasked5, {min: 1, max: 366, palette: paleta7}, 'Area Quemada 2001', false);
// Create and define visualization parameters and display Pehuajo
var paleta7=['#ffff00'];
var imglpMasked6 = image6.updateMask(image6.gt(0));
Map.addLayer(imglpMasked6, {min: 1, max: 366, palette: paleta7}, 'Area Quemada 2002', false);
// Create and define visualization parameters and display Pehuajo
var paleta7=['#ffff00'];
var imglpMasked7 = image7.updateMask(image7.gt(0));
Map.addLayer(imglpMasked7, {min: 1, max: 366, palette: paleta7}, 'Area Quemada 2003', false);
// Create and define visualization parameters and display Pehuajo
var paleta7=['#ffff00'];
var imglpMasked8 = image8.updateMask(image8.gt(0));
Map.addLayer(imglpMasked8, {min: 1, max: 366, palette: paleta7}, 'Area Quemada 2004', false);
// Create and define visualization parameters and display Pehuajo
var paleta7=['#ffff00'];
var imglpMasked9 = image9.updateMask(image9.gt(0));
Map.addLayer(imglpMasked9, {min: 1, max: 366, palette: paleta7}, 'Area Quemada 2005', false);
// Create and define visualization parameters and display Pehuajo
var paleta7=['#ffff00'];
var imglpMasked10 = image10.updateMask(image10.gt(0));
Map.addLayer(imglpMasked10, {min: 1, max: 366, palette: paleta7}, 'Area Quemada 2006', false);
// Create and define visualization parameters and display Pehuajo
var paleta7=['#ffff00'];
var imglpMasked11 = image11.updateMask(image11.gt(0));
Map.addLayer(imglpMasked11, {min: 1, max: 366, palette: paleta7}, 'Area Quemada 2007', false);
// Create and define visualization parameters and display Pehuajo
var paleta7=['#ffff00'];
var imglpMasked12 = image12.updateMask(image12.gt(0));
Map.addLayer(imglpMasked12, {min: 1, max: 366, palette: paleta7}, 'Area Quemada 2008', false);
var imglpMasked13 = image13.updateMask(image13.gt(0));
Map.addLayer(imglpMasked13, {min: 1, max: 366, palette: paleta7}, 'Area Quemada 2009', false);
var imglpMasked14 = image14.updateMask(image14.gt(0));
Map.addLayer(imglpMasked14, {min: 1, max: 366, palette: paleta7}, 'Area Quemada 2010', false);
var imp14 = imglpMasked14.updateMask(maskfores);
var paleta71=['#ff3399'];
//Map.addLayer(imp14, {min: 1, max: 366, palette: paleta71}, 'Fires Implantada 2010', false);
var imglpMasked15 = image15.updateMask(image15.gt(0));
Map.addLayer(imglpMasked15, {min: 1, max: 366, palette: paleta7}, 'Area Quemada 2011', false);
var imp15 = imglpMasked15.updateMask(maskfores);
var paleta71=['#ff3399'];
//Map.addLayer(imp15, {min: 1, max: 366, palette: paleta71}, 'Fires Implantada 2011', false);
var imglpMasked16 = image16.updateMask(image16.gt(0));
Map.addLayer(imglpMasked16, {min: 1, max: 366, palette: paleta7}, 'Area Quemada 2012', false);
var imp16 = imglpMasked16.updateMask(maskfores);
var paleta71=['#ff3399'];
//Map.addLayer(imp16, {min: 1, max: 366, palette: paleta71}, 'Fires Implantada 2012', false);
var imglpMasked17 = image17.updateMask(image17.gt(0));
Map.addLayer(imglpMasked17, {min: 1, max: 366, palette: paleta7}, 'Area Quemada 2013', false);
var imp17 = imglpMasked17.updateMask(maskfores);
var paleta71=['#ff3399'];
//Map.addLayer(imp17, {min: 1, max: 366, palette: paleta71}, 'Fires Implantada 2013', false);
var imglpMasked18 = image18.updateMask(image18.gt(0));
Map.addLayer(imglpMasked18, {min: 1, max: 366, palette: paleta7}, 'Area Quemada 2014', false);
var imp18 = imglpMasked18.updateMask(maskfores);
var paleta71=['#ff3399'];
//Map.addLayer(imp18, {min: 1, max: 366, palette: paleta71}, 'Fires Implantada 2014', false);
var imglpMasked19 = image19.updateMask(image19.gt(0));
Map.addLayer(imglpMasked19, {min: 1, max: 366, palette: paleta7}, 'Area Quemada 2015', false);
var imp19 = imglpMasked19.updateMask(maskfores);
var paleta71=['#ff3399'];
//Map.addLayer(imp19, {min: 1, max: 366, palette: paleta71}, 'Fires Implantada 2015', false);
var imglpMasked20 = image20.updateMask(image20.gt(0));
Map.addLayer(imglpMasked20, {min: 1, max: 366, palette: paleta7}, 'Area Quemada 2016', false);
var imp20 = imglpMasked20.updateMask(maskfores);
var paleta71=['#ff3399'];
//Map.addLayer(imp20, {min: 1, max: 366, palette: paleta71}, 'Fires Implantada 2016', false);
var imglpMasked21 = image21.updateMask(image21.gt(0));
Map.addLayer(imglpMasked21, {min: 1, max: 366, palette: paleta7}, 'Area Quemada 2017', false);
var imp21 = imglpMasked21.updateMask(maskfores);
var paleta71=['#ff3399'];
//Map.addLayer(imp21, {min: 1, max: 366, palette: paleta71}, 'Fires Implantada 2017', false);
var imglpMasked22 = image22.updateMask(image22.gt(0));
Map.addLayer(imglpMasked22, {min: 1, max: 366, palette: paleta7}, 'Area Quemada 2018', false);
var imp22 = imglpMasked22.updateMask(maskfores);
var paleta71=['#ff3399'];
//Map.addLayer(imp22, {min: 1, max: 366, palette: paleta71}, 'Fires Implantada 2018', false);
var imglpMasked23 = image23.updateMask(image23.gt(0));
Map.addLayer(imglpMasked23, {min: 1, max: 366, palette: paleta7}, 'Area Quemada 2019', false);
//var imp23 = imglpMasked23.updateMask(maskfores);
//var paleta71=['#ff3399'];
//Map.addLayer(imp23, {min: 1, max: 366, palette: paleta71}, 'Fires Implantada 2019', false);
Map.addLayer(image24, {min: 1, max: 366, palette: paleta7}, 'Area Quemada 2020', false);
//var imp24 = image24.updateMask(maskfores);
//var paleta71=['#ff3399'];
//Map.addLayer(imp24, {min: 1, max: 366, palette: paleta71}, 'Fires Implantada 2020', false);
// Create and define visualization parameters and display Pehuajo
var paleta7=['#ffff00'];
var imglpMasked29 = image29.updateMask(image29.gt(0).clip(roi));
Map.addLayer(imglpMasked29, {min: 1, max: 706, palette: paleta7}, 'Area Quemada 2021', false);
// Create and define visualization parameters and display Pehuajo
var paleta8 =['#ffff00','#ff9933','#ff4d4d','#b30000','#4d0000'];
var imglpMaskeda = image4.updateMask(image.gt(0));
Map.addLayer(imglpMaskeda, {min: 1, max: 5, palette: paleta8}, 'Frecuencia Quemado Total 2000-2021', false);
/************Total quemado implantado 2010 - 2020*********************************/
// Create and define visualization parameters and display Pehuajo
var paleta8 =['#ffff00','#ff9933','#ff4d4d','#b30000','#4d0000'];
var imglpMaskeda = image3.updateMask(image.gt(0));
Map.addLayer(imglpMaskeda, {min: 1, max: 5, palette: paleta8}, 'Frecuencia Quemado Implantado 2000-2021', false);
/*
// Create and define visualization parameters and display Pehuajo
var paleta8 =['#ffff00','#ff9933','#ff4d4d','#b30000','#4d0000'];
var imglpMaskeda = image26.updateMask(image26.gt(0));
Map.addLayer(imglpMaskeda, {min: 1, max: 5, palette: paleta8}, 'Frecuencia Quemado Implantado 2010-2020');
*/
// Create and define visualization parameters and display Pehuajo
var paleta8 =['#ffff00','#ff9933','#ff4d4d','#b30000','#4d0000'];
var imglpMaskeda = image27.updateMask(image27.gt(0));
Map.addLayer(imglpMaskeda, {min: 1, max: 5, palette: paleta8}, 'Frecuencia Quemado Implantado 2010-2021');
Map.addLayer(table7.draw ({color: 'black', pointRadius: 5, strokeWidth: 5}), {}, 'Intencionales 2021', false);
Map.addLayer(table8.draw ({color: 'black', pointRadius: 5, strokeWidth: 5}), {}, 'Intencionales 2020', false);
Map.addLayer(table9.draw ({color: 'black', pointRadius: 5, strokeWidth: 5}), {}, 'Intencionales 2019', false);
Map.addLayer(table10.draw ({color: 'black', pointRadius: 5, strokeWidth: 5}), {}, 'Intencionales 2018', false);
Map.addLayer(table11.draw ({color: 'black', pointRadius: 5, strokeWidth: 5}), {}, 'Intencionales 2017', false);
Map.addLayer(table12.draw ({color: 'black', pointRadius: 5, strokeWidth: 5}), {}, 'Intencionales 2016', false);
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: redvial,
  color: 1,
  width: 1
});
Map.addLayer(outline, {palette: 'white'}, 'RedVial', false);
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: table,
  color: 1,
  width: 2
});
Map.addLayer(outline, {palette: 'black'}, 'Comunas');
/*
var hotspoint = ee.FeatureCollection(table4);
print(hotspoint);
Map.addLayer(hotspoint, {'color':'yellow'}, 'Hotspot VIIRS 1Nov19 al 30Abr20');
*/
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: table5,
  color: 1,
  width: 3
});
//Map.addLayer(outline, {palette: 'blue'}, 'Regiones');
// Add the maps and title to the ui.root.
//ui.root.widgets().reset([title, mapGrid]);
//ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));
Map.add(ui.Label(
    'Región de La Araucanía - Frecuencia de Area Quemada en B. Implantado 2000-2010-2021' 
    , {fontWeight: 'bold', fontSize: '17px', position:'top-center'}));
// Leyenda
var legend = ui.Panel({style: {position: 'bottom-right', padding: '8px 15px'}});
var loading = ui.Label('', {margin: '2px 0 4px 0'});
legend.add(loading);
var title = ui.Label('Referencias Uso del Suelo', {fontWeight: 'bold', fontSize: '16px', color: 'green'});
var descr = ui.Label("Color - COBERTURA ",{fontWeight: 'bold', fontSize: '14px', color: 'black'});
legend.add(title);
legend.add(descr);
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
    style: {margin: '0 0 4px 6px'}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
legend.add(makeRow('996600', 'Bosque_Nativo'));
legend.add(makeRow('006600', 'Plantacion_Densa'));
legend.add(makeRow('8080ff', 'Cultivos'));
legend.add(makeRow('00e600', 'Plantacion_baja_Densidad'));
legend.add(makeRow('a3c2c2', 'No_Vegetado'));
legend.add(makeRow('ccffcc', 'Praderas_Pastizales'));
legend.add(makeRow('0000b3', 'Recursos Hídricos'));
legend.add(makeRow('62fff4', 'URBANO'));
Map.add(legend);
// Leyenda
var legend = ui.Panel({style: {position: 'bottom-left', padding: '8px 15px'}});
var loading = ui.Label('', {margin: '2px 0 4px 0'});
legend.add(loading);
var title = ui.Label('Referencias Frecuencia', {fontWeight: 'bold', fontSize: '17px', color: 'green'});
var descr = ui.Label("Color - Año/s de QUEMADO ",{fontWeight: 'bold', fontSize: '16px', color: 'black'});
legend.add(title);
legend.add(descr);
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
    style: {margin: '0 0 4px 6px'}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
legend.add(makeRow('ffff00', '1 (un) año'));
legend.add(makeRow('ff9933', '2 (dos) años'));
legend.add(makeRow('ff4d4d', '3 (tres) años'));
legend.add(makeRow('b30000', '4 (cuatro) años'));
legend.add(makeRow('4d0000', '5 + (cinco) años o más'));
var paleta = ['#ffff00','#ff9933','#ff4d4d','#b30000','#4d0000'];
//var cobertura = ['Ningún cambio-0','Permanente-1','Nueva Permanente-2','Perdida Permanente-3','Estacional-4','Nueva Estacional-5','Perdida Estacional-6','Estacional a Permanente-7','Permanente a Estacional-8','Permanente Efimera-9','Efímera Estacional-10'];
Map.add(legend);
/** Custom Inspector functionality for EE Apps. */
// @author mdewitt@google.com 
var label = ui.Label('Click to inspect...',{fontWeight: 'bold', fontSize: '19px', color: 'red',position:'bottom-left'});
/** Takes a JavaScript value and updates the label. */
function updateLabel(b1) {
  label.setValue('Frecuencia: ' + b1  + ' año/s de quemado 2010/21',{fontWeight: 'bold', fontSize: '18px', color: 'black'});
}
/** Samples the image at the clicked point and updates our label. */
var clickHandler = function(click) {
  var point = ee.Geometry.Point([click.lon, click.lat]);
  var sample = image27.sample(point).first().get('b1');
  label.setValue('[loading]');  // Before the server-side operation kicks off
  sample.evaluate(updateLabel);  // Asynchronously trigger the label udpate
};
Map.add(label);
Map.onClick(clickHandler);
Map.style().set('cursor', 'crosshair');
var places = {
  Angol: [-72.764173, -37.749775],
  Carahue: [-73.310968, -38.581242],
  Cholchol: [-72.904866, -38.579279],
  Collipulli: [-72.148916, -38.035864],
  Cunco: [-72.07301, -38.964058],
  Curacautín: [-71.80164, -38.41903],
  Curarrehue: [-71.557158, -39.378594],
  Ercilla: [-72.414958, -38.06508],
  Freire: [-72.584038, -38.921145],
  Galvarino: [-72.78317, -38.43752],
  Traiguén: [-72.66806, -38.213184]
};
var select = ui.Select({
  items: Object.keys(places),
  onChange: function(key) {
    Map.setCenter(places[key][0], places[key][1], 12);
  }
});
// Set a place holder.
select.setPlaceholder('Comuna...');
Map.add(select);
/***********************Set Lat Long*******************************************/
var lon = ui.Textbox({
  value: 1.0,
  placeholder: 'Longitud',
  onChange: function(value) {
    // set value with a dedicated method
    lon.setValue(value);
    return(value);
  }
});
lon.style().set('position', 'bottom-center');
Map.add(lon);
var lat = ui.Textbox({
   value: 1.0,
  placeholder: 'Latitud',
  onChange: function(value) {
    // set value with a dedicated method
    lat.setValue(value);
    return(value);
  }
});
lat.style().set('position', 'bottom-center');
Map.add(lat);
var Lo;
var La;
var button = ui.Button({
  label: 'Go to Location',
  style: {position: 'bottom-center'},
  onClick: function() {
    // you don't have to convert it into EE objects since you are
    // working on the client side
    Lo = parseFloat(lon.getValue());
    La = parseFloat(lat.getValue());
    Map.setCenter(Lo, La, 17);
}
});
Map.add(button);
////////////////////////////////////////////////////////////////////////////////////////
// Create an empty panel in which to arrange widgets.
// The layout is vertical flow by default.
var panel = ui.Panel({style: {position: 'top-right', width: "110px", height: '100px', backgroundColor:'#FF0000',stretch: 'both'}})
    .add(ui.Label('Click on the map'));
// Set a callback function for when the user clicks the map.
Map.onClick(function(coords) {
  // Create or update the location label (the second widget in the panel)
  var location = 'lon: ' + coords.lon.toFixed(5) + ' ' +
                 'lat: ' + coords.lat.toFixed(5);
  panel.widgets().set(1, ui.Label(location));
})
/*
  var lon = ui.Label()
  var lat = ui.Label()
  var point = ee.Geometry.Point(coords.lon, coords.lat)
  var dot = ui.Map.Layer (point, {color:"001a33"}, "Last Click");
  Map.layers().set(1,dot)
})
 Map.style().set("cursor","crosshair")
*/ 
  // Add (or replace) the third widget in the panel by
  // manipulating the widgets list.
// Add the panel to the ui.root.
ui.root.add(panel);
/*
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: basegurado,
  color: 1,
  width: 1
});
//Map.addLayer(outline, {palette: 'white'}, 'BAsegurado', false);
*/