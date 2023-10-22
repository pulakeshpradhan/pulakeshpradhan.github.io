var table2 = ui.import && ui.import("table2", "table", {
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
    image27 = ui.import && ui.import("image27", "image", {
      "id": "users/erollero/lulcmauleOK"
    }) || ee.Image("users/erollero/lulcmauleOK"),
    roi = ui.import && ui.import("roi", "table", {
      "id": "users/erollero/HDIChile/maule"
    }) || ee.FeatureCollection("users/erollero/HDIChile/maule"),
    image5 = ui.import && ui.import("image5", "image", {
      "id": "users/erollero/HDIChile/MAULE/burmaule01"
    }) || ee.Image("users/erollero/HDIChile/MAULE/burmaule01"),
    image6 = ui.import && ui.import("image6", "image", {
      "id": "users/erollero/HDIChile/MAULE/burmaule02"
    }) || ee.Image("users/erollero/HDIChile/MAULE/burmaule02"),
    image7 = ui.import && ui.import("image7", "image", {
      "id": "users/erollero/HDIChile/MAULE/burmaule03"
    }) || ee.Image("users/erollero/HDIChile/MAULE/burmaule03"),
    image8 = ui.import && ui.import("image8", "image", {
      "id": "users/erollero/HDIChile/MAULE/burmaule04"
    }) || ee.Image("users/erollero/HDIChile/MAULE/burmaule04"),
    image9 = ui.import && ui.import("image9", "image", {
      "id": "users/erollero/HDIChile/MAULE/burmaule05"
    }) || ee.Image("users/erollero/HDIChile/MAULE/burmaule05"),
    image10 = ui.import && ui.import("image10", "image", {
      "id": "users/erollero/HDIChile/MAULE/burmaule06"
    }) || ee.Image("users/erollero/HDIChile/MAULE/burmaule06"),
    image11 = ui.import && ui.import("image11", "image", {
      "id": "users/erollero/HDIChile/MAULE/burmaule07"
    }) || ee.Image("users/erollero/HDIChile/MAULE/burmaule07"),
    image12 = ui.import && ui.import("image12", "image", {
      "id": "users/erollero/HDIChile/MAULE/burmaule08"
    }) || ee.Image("users/erollero/HDIChile/MAULE/burmaule08"),
    image13 = ui.import && ui.import("image13", "image", {
      "id": "users/erollero/HDIChile/MAULE/burmaule09"
    }) || ee.Image("users/erollero/HDIChile/MAULE/burmaule09"),
    image14 = ui.import && ui.import("image14", "image", {
      "id": "users/erollero/HDIChile/MAULE/burmaule10"
    }) || ee.Image("users/erollero/HDIChile/MAULE/burmaule10"),
    image15 = ui.import && ui.import("image15", "image", {
      "id": "users/erollero/HDIChile/MAULE/burmaule11"
    }) || ee.Image("users/erollero/HDIChile/MAULE/burmaule11"),
    image16 = ui.import && ui.import("image16", "image", {
      "id": "users/erollero/HDIChile/MAULE/burmaule12"
    }) || ee.Image("users/erollero/HDIChile/MAULE/burmaule12"),
    image17 = ui.import && ui.import("image17", "image", {
      "id": "users/erollero/HDIChile/MAULE/burmaule13"
    }) || ee.Image("users/erollero/HDIChile/MAULE/burmaule13"),
    image18 = ui.import && ui.import("image18", "image", {
      "id": "users/erollero/HDIChile/MAULE/burmaule14"
    }) || ee.Image("users/erollero/HDIChile/MAULE/burmaule14"),
    image19 = ui.import && ui.import("image19", "image", {
      "id": "users/erollero/HDIChile/MAULE/burmaule15"
    }) || ee.Image("users/erollero/HDIChile/MAULE/burmaule15"),
    image20 = ui.import && ui.import("image20", "image", {
      "id": "users/erollero/HDIChile/MAULE/burmaule16"
    }) || ee.Image("users/erollero/HDIChile/MAULE/burmaule16"),
    image21 = ui.import && ui.import("image21", "image", {
      "id": "users/erollero/HDIChile/MAULE/burmaule17"
    }) || ee.Image("users/erollero/HDIChile/MAULE/burmaule17"),
    image22 = ui.import && ui.import("image22", "image", {
      "id": "users/erollero/HDIChile/MAULE/burmaule18"
    }) || ee.Image("users/erollero/HDIChile/MAULE/burmaule18"),
    image23 = ui.import && ui.import("image23", "image", {
      "id": "users/erollero/HDIChile/MAULE/burmaule19"
    }) || ee.Image("users/erollero/HDIChile/MAULE/burmaule19"),
    table = ui.import && ui.import("table", "table", {
      "id": "users/erollero/HDIChile/MAULE/comunasmaule"
    }) || ee.FeatureCollection("users/erollero/HDIChile/MAULE/comunasmaule"),
    image25 = ui.import && ui.import("image25", "image", {
      "id": "users/erollero/HDIChile/MAULE/hidromaule"
    }) || ee.Image("users/erollero/HDIChile/MAULE/hidromaule"),
    redvial = ui.import && ui.import("redvial", "table", {
      "id": "users/erollero/HDIChile/MAULE/redvialmaule"
    }) || ee.FeatureCollection("users/erollero/HDIChile/MAULE/redvialmaule"),
    image24 = ui.import && ui.import("image24", "image", {
      "id": "users/erollero/HDIChile/MAULE/maule20sum"
    }) || ee.Image("users/erollero/HDIChile/MAULE/maule20sum"),
    image26 = ui.import && ui.import("image26", "image", {
      "id": "users/erollero/HDIChile/MAULE/Mod41maule22"
    }) || ee.Image("users/erollero/HDIChile/MAULE/Mod41maule22"),
    image4 = ui.import && ui.import("image4", "image", {
      "id": "users/erollero/HDIChile/MAULE/burtot0021"
    }) || ee.Image("users/erollero/HDIChile/MAULE/burtot0021"),
    image3 = ui.import && ui.import("image3", "image", {
      "id": "users/erollero/HDIChile/MAULE/frecmaule0021"
    }) || ee.Image("users/erollero/HDIChile/MAULE/frecmaule0021"),
    image = ui.import && ui.import("image", "image", {
      "id": "users/erollero/HDIChile/MAULE/frecmaule1021"
    }) || ee.Image("users/erollero/HDIChile/MAULE/frecmaule1021");
Map.centerObject(roi, 9);
Map.setOptions("HYBRID")
/////////////Altura de Copa//////////////gedi
/////////////Altura de Copa//////////////gedi
var gedi = ee.Image('users/potapovpeter/GEDI_V27/GEDI_SAM_v27');
print(gedi);
var gedia = gedi.clip(table6);
var gedimk = gedia.updateMask(gedia.gte(4));
var paleta8=['#004d00'];
Map.addLayer(gedimk, {min: 5, max: 500, palette: paleta8}, 'Tree Cover > 5 meters', false);
// Create and define visualization parameters and display Pehuajo
var paleta6 =['#996600','#006600','#8080ff','#0a8a0a','#a3c2c2','#ccffcc','#a3c2c2'];
var imglpMasked = image27.updateMask(image27.gt(0));
Map.addLayer(imglpMasked, {min: 1, max: 7, palette: paleta6, opacity: (0.85)}, 'USO del Suelo rf');
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
var imglpMasked15 = image15.updateMask(image15.gt(0));
Map.addLayer(imglpMasked15, {min: 1, max: 366, palette: paleta7}, 'Area Quemada 2011', false);
var imglpMasked16 = image16.updateMask(image16.gt(0));
Map.addLayer(imglpMasked16, {min: 1, max: 366, palette: paleta7}, 'Area Quemada 2012', false);
var imglpMasked17 = image17.updateMask(image17.gt(0));
Map.addLayer(imglpMasked17, {min: 1, max: 366, palette: paleta7}, 'Area Quemada 2013', false);
var imglpMasked18 = image18.updateMask(image18.gt(0));
Map.addLayer(imglpMasked18, {min: 1, max: 366, palette: paleta7}, 'Area Quemada 2014', false);
var imglpMasked19 = image19.updateMask(image19.gt(0));
Map.addLayer(imglpMasked19, {min: 1, max: 366, palette: paleta7}, 'Area Quemada 2015', false);
var imglpMasked20 = image20.updateMask(image20.gt(0));
Map.addLayer(imglpMasked20, {min: 1, max: 366, palette: paleta7}, 'Area Quemada 2016', false);
var imglpMasked21 = image21.updateMask(image21.gt(0));
Map.addLayer(imglpMasked21, {min: 1, max: 366, palette: paleta7}, 'Area Quemada 2017', false);
var imglpMasked22 = image22.updateMask(image22.gt(0));
Map.addLayer(imglpMasked22, {min: 1, max: 366, palette: paleta7}, 'Area Quemada 2018', false);
var imglpMasked23 = image23.updateMask(image23.gt(0));
Map.addLayer(imglpMasked23, {min: 1, max: 366, palette: paleta7}, 'Area Quemada 2019', false);
var imglpMasked24 = image24.updateMask(image24.gt(0));
Map.addLayer(imglpMasked24, {min: 1, max: 366, palette: paleta7}, 'Area Quemada 2020', false);
var imglpMasked26 = image26.updateMask(image26.gt(0));
Map.addLayer(imglpMasked26, {min: 1, max: 366, palette: paleta7}, 'Area Quemada 2021', false);
// Create and define visualization parameters and display Pehuajo
var paleta8 =['#ffff00','#ff9933','#ff4d4d','#b30000','#4d0000'];
var imglpMaskeda = image4.updateMask(image4.gt(0));
Map.addLayer(imglpMaskeda, {min: 1, max: 5, palette: paleta8}, 'Frecuencia Quemado Total 2000-2021', false);
// Create and define visualization parameters and display Pehuajo
var paleta8 =['#ffff00','#ff9933','#ff4d4d','#b30000','#4d0000'];
var imglpMaskeda = image3.updateMask(image3.gt(0));
Map.addLayer(imglpMaskeda, {min: 1, max: 5, palette: paleta8}, 'Frecuencia Quemado Implantado 2000-2021', false);
// Create and define visualization parameters and display Pehuajo
var paleta8 =['#ffff00','#ff9933','#ff4d4d','#b30000','#4d0000'];
var imglpMaskeda = image.updateMask(image.gt(0));
Map.addLayer(imglpMaskeda, {min: 1, max: 5, palette: paleta8}, 'Frecuencia Quemado Implantado 2010-2021');
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
    'Región del Maule - Frecuencia de Quemado en B. Implantado 2001-2010-2021' 
    , {fontWeight: 'bold', fontSize: '18px', position:'top-center'}));
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
legend.add(makeRow('0a8a0a', 'Plantacion_baja_Densidad'));
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
  var sample = image.sample(point).first().get('b1');
  label.setValue('[loading]');  // Before the server-side operation kicks off
  sample.evaluate(updateLabel);  // Asynchronously trigger the label udpate
};
Map.add(label);
Map.onClick(clickHandler);
Map.style().set('cursor', 'crosshair');
var places = {
  Cauquenes: [-72.287921, -35.965975],
  Chanco: [-72.498593, -35.697222],
  Colbún: [-71.372279, -35.739678],
  Constitución: [-72.287780, -35.353178],
  Curepto: [-72.003611, -35.110203],
  Curicó: [-71.038551, -35.161491],
  Empedrado: [-72.289784, -35.597458],
  Hualañé: [-71.676570, -34.983585],
  Licantén: [-72.111141, -34.975970],
  Linares: [-71.378215, -35.934071],
  Longaví: [-71.496828, -36.127387]
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
  var location = 'lon: ' + coords.lon.toFixed(3) + ' ' +
                 'lat: ' + coords.lat.toFixed(3);
  panel.widgets().set(1, ui.Label(location));
  // Add (or replace) the third widget in the panel by
  // manipulating the widgets list.
});
// Add the panel to the ui.root.
ui.root.add(panel);