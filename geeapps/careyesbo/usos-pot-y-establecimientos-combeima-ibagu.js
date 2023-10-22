/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var Proteccion1 = ee.FeatureCollection("users/careyesbo/POTIBAGUE_ABASTACIMIENTOHIDRICORURAL"),
    Proteccion2 = ee.FeatureCollection("users/careyesbo/POTIBAGUE_ACC"),
    Produccion1 = ee.FeatureCollection("users/careyesbo/POTIBAGUE_AGROPECUARIAALTA"),
    Produccion2 = ee.FeatureCollection("users/careyesbo/POTIBAGUE_AGROPECUARIABAJA"),
    Proteccion3 = ee.FeatureCollection("users/careyesbo/POTIBAGUE_ALTAFRAGILIDADAMBIENTAL"),
    Amenaza1 = ee.FeatureCollection("users/careyesbo/POTIBAGUE_ALTACONTAMINACIONHIDRICA"),
    Proteccion4 = ee.FeatureCollection("users/careyesbo/POTIBAGUE_BMFPP"),
    Restringido = ee.FeatureCollection("users/careyesbo/POTIBAGUE_CENTROSPOBLADOS"),
    Proteccion5 = ee.FeatureCollection("users/careyesbo/POTIBAGUE_EROPC"),
    Amenaza2 = ee.FeatureCollection("users/careyesbo/POTIBAGUE_FLUJOESCOMBROS"),
    Proteccion6 = ee.FeatureCollection("users/careyesbo/POTIBAGUE_SIMAP"),
    Urbano = ee.FeatureCollection("users/careyesbo/POTIBAGUE_SUELOURBANO"),
    Produccion3 = ee.FeatureCollection("users/careyesbo/POTIBAGUE_TURISMO"),
    Proteccion7 = ee.FeatureCollection("users/careyesbo/POTIBAGUE_ZMI"),
    Combeima = ee.FeatureCollection("users/careyesbo/POTIBAGUE_CUENCACOMBEIMALIMITESPA"),
    Corregimientos = ee.FeatureCollection("users/careyesbo/POTIBAGUE_CORREGIMIENTOS"),
    Establecimientos = ee.FeatureCollection("users/careyesbo/INFRAESTRUCTURA_CUENCA_COMBEIMA");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
//Visualizar mapa base
var snazzy = require("users/aazuspan/snazzy:styles");   
snazzy.addStyle("https://snazzymaps.com/style/42346/for-beautiful-maps-to-hang-on-your-wall", "MapaBase");  //Change link!
//Capas Usos
Map.addLayer(Proteccion1.style({fillColor: 'green',color: '00000000'}));
Map.addLayer(Proteccion2.style({fillColor: 'green',color: '00000000'}));
Map.addLayer(Produccion1.style({fillColor: 'yellow',color: '00000000'}));
Map.addLayer(Produccion2.style({fillColor: 'yellow',color: '00000000'}));
Map.addLayer(Proteccion3.style({fillColor: 'green',color: '00000000'}));
Map.addLayer(Amenaza1.style({fillColor: 'red',color: '00000000'}));
Map.addLayer(Proteccion4.style({fillColor: 'green',color: '00000000'}));
Map.addLayer(Proteccion5.style({fillColor: 'green',color: '00000000'}));
Map.addLayer(Amenaza2.style({fillColor: 'red',color: '00000000'}));
Map.addLayer(Proteccion6.style({fillColor: 'green',color: '00000000'}));
Map.addLayer(Urbano.style({fillColor: 'gray',color: '00000000'}));
Map.addLayer(Produccion3.style({fillColor: 'yellow',color: '00000000'}));
Map.addLayer(Proteccion7.style({fillColor: 'green',color: '00000000'}));
Map.addLayer(Restringido.style({fillColor: 'gray',color: '00000000'}));
//Limites
Map.addLayer(Combeima.style({fillColor: '00000000',color: '585858'}));
Map.addLayer(Corregimientos.style({fillColor: 'white',color: '585858'}));
Map.addLayer(Establecimientos.draw('blue'));
// Etiqueta de Titulo.
Map.add(ui.Label(
    'Usos del suelo y establecimientos Combeima',
    {fontWeight: 'bold', fontSize: '18px'}));
//Leyenda
var panel = ui.Panel();
// Make legends
var makeRow = function(color, name) {
  // Make a row of a legend
  var colorBox = ui.Label({
    style: {
      backgroundColor: color,
      padding: '7px',
      margin: '0 0 px 0'
    }
  });
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 3px 3px'}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
// Legend
var legend = ui.Panel({style: {shown: false, width: '2px'}});
legend.style().set({position: 'bottom-right' });
var legendMaps = ui.Panel({style: {shown: true, width: '200px'}});
legendMaps.style().set({position: 'bottom-right'})
legendMaps.style().set('backgroundColor', 'FFFFFF') 
//legendMaps.add(ui.Label('Año disturbio'));
legendMaps.add(makeRow('blue', 'Establecimientos'));
legendMaps.add(makeRow('green', 'Conservacion ambiental'));
legendMaps.add(makeRow('yellow', 'Suelo de produccion'));
legendMaps.add(makeRow('red', 'Amenaza y riesgo'));
legendMaps.add(makeRow('gray', 'Urbano y centro poblado'));
Map.add(legend)
Map.add(legendMaps)
//Zoom a Ibague
Map.centerObject(Combeima,10);