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
    roi = ui.import && ui.import("roi", "table", {
      "id": "users/erollero/HDIChile/maule"
    }) || ee.FeatureCollection("users/erollero/HDIChile/maule"),
    image6 = ui.import && ui.import("image6", "image", {
      "id": "users/erollero/HDIChile/LOSRIOS/fires02"
    }) || ee.Image("users/erollero/HDIChile/LOSRIOS/fires02"),
    image5 = ui.import && ui.import("image5", "image", {
      "id": "users/erollero/HDIChile/LOSRIOS/fires01"
    }) || ee.Image("users/erollero/HDIChile/LOSRIOS/fires01"),
    image7 = ui.import && ui.import("image7", "image", {
      "id": "users/erollero/HDIChile/LOSRIOS/fires03"
    }) || ee.Image("users/erollero/HDIChile/LOSRIOS/fires03"),
    image8 = ui.import && ui.import("image8", "image", {
      "id": "users/erollero/HDIChile/LOSRIOS/fires04"
    }) || ee.Image("users/erollero/HDIChile/LOSRIOS/fires04"),
    image9 = ui.import && ui.import("image9", "image", {
      "id": "users/erollero/HDIChile/LOSRIOS/fires05"
    }) || ee.Image("users/erollero/HDIChile/LOSRIOS/fires05"),
    image26 = ui.import && ui.import("image26", "image", {
      "id": "users/erollero/HDIChile/LOSRIOS/lulcrios"
    }) || ee.Image("users/erollero/HDIChile/LOSRIOS/lulcrios"),
    image29 = ui.import && ui.import("image29", "image", {
      "id": "users/erollero/HDIChile/LOSRIOS/lulclosriosoks2"
    }) || ee.Image("users/erollero/HDIChile/LOSRIOS/lulclosriosoks2"),
    image10 = ui.import && ui.import("image10", "image", {
      "id": "users/erollero/HDIChile/LOSRIOS/fires06"
    }) || ee.Image("users/erollero/HDIChile/LOSRIOS/fires06"),
    image11 = ui.import && ui.import("image11", "image", {
      "id": "users/erollero/HDIChile/LOSRIOS/fires07"
    }) || ee.Image("users/erollero/HDIChile/LOSRIOS/fires07"),
    image12 = ui.import && ui.import("image12", "image", {
      "id": "users/erollero/HDIChile/LOSRIOS/fires08"
    }) || ee.Image("users/erollero/HDIChile/LOSRIOS/fires08"),
    image13 = ui.import && ui.import("image13", "image", {
      "id": "users/erollero/HDIChile/LOSRIOS/fires09"
    }) || ee.Image("users/erollero/HDIChile/LOSRIOS/fires09"),
    image14 = ui.import && ui.import("image14", "image", {
      "id": "users/erollero/HDIChile/LOSRIOS/fires10"
    }) || ee.Image("users/erollero/HDIChile/LOSRIOS/fires10"),
    image15 = ui.import && ui.import("image15", "image", {
      "id": "users/erollero/HDIChile/LOSRIOS/fires11"
    }) || ee.Image("users/erollero/HDIChile/LOSRIOS/fires11"),
    image16 = ui.import && ui.import("image16", "image", {
      "id": "users/erollero/HDIChile/LOSRIOS/fires12"
    }) || ee.Image("users/erollero/HDIChile/LOSRIOS/fires12"),
    image17 = ui.import && ui.import("image17", "image", {
      "id": "users/erollero/HDIChile/LOSRIOS/fires13"
    }) || ee.Image("users/erollero/HDIChile/LOSRIOS/fires13"),
    image18 = ui.import && ui.import("image18", "image", {
      "id": "users/erollero/HDIChile/LOSRIOS/fires14"
    }) || ee.Image("users/erollero/HDIChile/LOSRIOS/fires14"),
    image19 = ui.import && ui.import("image19", "image", {
      "id": "users/erollero/HDIChile/LOSRIOS/fires15"
    }) || ee.Image("users/erollero/HDIChile/LOSRIOS/fires15"),
    image20 = ui.import && ui.import("image20", "image", {
      "id": "users/erollero/HDIChile/LOSRIOS/fires16"
    }) || ee.Image("users/erollero/HDIChile/LOSRIOS/fires16"),
    image21 = ui.import && ui.import("image21", "image", {
      "id": "users/erollero/HDIChile/LOSRIOS/fires17"
    }) || ee.Image("users/erollero/HDIChile/LOSRIOS/fires17"),
    image22 = ui.import && ui.import("image22", "image", {
      "id": "users/erollero/HDIChile/LOSRIOS/fires18"
    }) || ee.Image("users/erollero/HDIChile/LOSRIOS/fires18"),
    image23 = ui.import && ui.import("image23", "image", {
      "id": "users/erollero/HDIChile/LOSRIOS/fires19"
    }) || ee.Image("users/erollero/HDIChile/LOSRIOS/fires19"),
    image24 = ui.import && ui.import("image24", "image", {
      "id": "users/erollero/HDIChile/LOSRIOS/burnedrlagos20"
    }) || ee.Image("users/erollero/HDIChile/LOSRIOS/burnedrlagos20"),
    image4 = ui.import && ui.import("image4", "image", {
      "id": "users/erollero/HDIChile/LOSRIOS/firestotalrios"
    }) || ee.Image("users/erollero/HDIChile/LOSRIOS/firestotalrios"),
    image3 = ui.import && ui.import("image3", "image", {
      "id": "users/erollero/HDIChile/LOSRIOS/Frec0120impok"
    }) || ee.Image("users/erollero/HDIChile/LOSRIOS/Frec0120impok"),
    image = ui.import && ui.import("image", "image", {
      "id": "users/erollero/HDIChile/LOSRIOS/Frec1020impok"
    }) || ee.Image("users/erollero/HDIChile/LOSRIOS/Frec1020impok"),
    table7 = ui.import && ui.import("table7", "table", {
      "id": "users/erollero/HDIChile/LOSRIOS/comlagos"
    }) || ee.FeatureCollection("users/erollero/HDIChile/LOSRIOS/comlagos"),
    redvial = ui.import && ui.import("redvial", "table", {
      "id": "users/erollero/HDIChile/LOSRIOS/rutaslagos"
    }) || ee.FeatureCollection("users/erollero/HDIChile/LOSRIOS/rutaslagos"),
    image25 = ui.import && ui.import("image25", "image", {
      "id": "users/erollero/HDIChile/LOSRIOS/cagualrlagos"
    }) || ee.Image("users/erollero/HDIChile/LOSRIOS/cagualrlagos"),
    image27 = ui.import && ui.import("image27", "image", {
      "id": "users/erollero/HDIChile/Fires2122/fmod22"
    }) || ee.Image("users/erollero/HDIChile/Fires2122/fmod22");
var roi1 = table5.filterMetadata("REGION","equals","La Araucanía");
var roi2 = table5.filterMetadata("REGION","equals","Los Lagos");
var roi3 = table5.filterMetadata("REGION","equals","Los Ríos");
var roi = (roi3).merge(roi2);
Map.setCenter(-73.0599, -40.6824, 8);
Map.setOptions("HYBRID")
/////////////Altura de Copa//////////////gedi
/////////////Altura de Copa//////////////gedi
var gedi = ee.Image('users/potapovpeter/GEDI_V27/GEDI_SAM_v27');
print(gedi);
var gedia = gedi.clip(roi);
var gedimk = gedia.updateMask(gedia.gte(4));
var paleta8=['#004d00'];
Map.addLayer(gedimk, {min: 4, max: 500, palette: paleta8}, 'Tree Cover > 4 meters', false);
// Create and define visualization parameters and display Pehuajo
var paleta6 =['#996600','#006600','#8080ff','#0a8a0a','#a3c2c2','#ccffcc','#a3c2c2'];
var imglpMasked2 = image26.updateMask(image26.gt(0));
Map.addLayer(imglpMasked2, {min: 1, max: 7, palette: paleta6, opacity: (0.85)}, 'USO del Suelo Los Rios');
var imglpMasked3 = image29.clip(roi2).updateMask(image29.gt(0));
Map.addLayer(imglpMasked3, {min: 1, max: 7, palette: paleta6, opacity: (0.85)}, 'USO del Suelo Los Lagos');
var paleta7=['#0000b3'];
var imglpMasked25 = image25.updateMask(image25.gt(0));
Map.addLayer(imglpMasked25, {min: 1, max: 100, palette: paleta7}, 'Recursos Hídricos');
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
// Create and define visualization parameters and display Pehuajo
var paleta7=['#ffff00'];
var imglpMasked27 = image27.updateMask(image27.gt(0).clip(roi));
Map.addLayer(imglpMasked27, {min: 1, max: 706, palette: paleta7}, 'Area Quemada 2021', false);
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
  featureCollection: table2,
  color: 1,
  width: 2
});
Map.addLayer(outline, {palette: 'Cyan'}, 'Areas Pobladas');
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: redvial,
  color: 0.85,
  width: 0.5
});
Map.addLayer(outline, {palette: 'white'}, 'RedVial', false);
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: table7,
  color: 1,
  width: 1
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
  featureCollection: roi,
  color: 1,
  width: 3
});
Map.addLayer(outline, {palette: 'black'}, 'Regiones');
// Add the maps and title to the ui.root.
//ui.root.widgets().reset([title, mapGrid]);
//ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));
Map.add(ui.Label(
    'Región Los Ríos y Los Lagos - Frecuencia de Quemado en B. Implantado 2001-2010-2021' 
    , {fontWeight: 'bold', fontSize: '15px', position:'top-center'}));
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
  Ancud: [-73.700630, -41.980810],
  Calbuco: [-73.229095, -41.649407],
  Chaitén: [-72.663121, -42.738722],
  Corral: [-73.366314, -40.005804],
  Fresia: [-73.634454, -41.148089],
  LaUnión: [-73.266539, -40.200043],
  Lanco: [-72.609066, -39.509084],
  LosLagos: [-72.591818, -39.798551],
  LosMuermos: [-73.618503, -41.400761],
  Mariquina: [-73.076204, -39.510486],
  Osorno: [-73.26264, -40.572927]
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