/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var dataset = ee.Image("UMD/hansen/global_forest_change_2021_v1_9"),
    Cuenca = 
    /* color: #009999 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-75.55899819654555, 4.730242146389433],
          [-75.55899819654555, 4.2209373796763305],
          [-74.92728432935805, 4.2209373796763305],
          [-74.92728432935805, 4.730242146389433]]], null, false),
    feature = ee.FeatureCollection("projects/sat-io/open-datasets/MSBuildings/Colombia"),
    corregimientos = ee.FeatureCollection("users/careyesbo/POTIBAGUE_CORREGIMIENTOS"),
    cuencacomb = ee.FeatureCollection("users/careyesbo/POTIBAGUE_CUENCACOMBEIMALIMITESPA"),
    Urbano = ee.FeatureCollection("users/careyesbo/POTIBAGUE_SUELOURBANO"),
    treeCoverVisParam = {"bands":["treecover2000"],"min":0,"max":100,"palette":["white","green"]};
/***** End of imports. If edited, may not auto-convert in the playground. *****/
//Visualizar mapa base
var snazzy = require("users/aazuspan/snazzy:styles");   
snazzy.addStyle("https://snazzymaps.com/style/42346/for-beautiful-maps-to-hang-on-your-wall", "MapaBase");  //Change link!
//Recorte para Ibague
feature= feature.map(function(f) {
  return f.intersection(Cuenca, 1); //1 refers to the maxError argument
});
dataset= dataset.clip(Cuenca);
//Capas
Map.addLayer(dataset, treeCoverVisParam, 'tree cover');
Map.addLayer(feature.style({fillColor: '00000000',color: '6E6E6E'}), {}, 'Edificios')
Map.addLayer(corregimientos.style({fillColor: '00000000',color: '61380B'}),{},"Corregimientos");
Map.addLayer(cuencacomb.style({fillColor: '00000000',color: 'B18904'}),{},"CuencaCombeima");
Map.addLayer(Urbano.style({fillColor: '00000000',color: 'B43104'}),{},"Suelo Urbano");
// Etiqueta de Titulo.
Map.add(ui.Label(
    'Construcciones y cubierta  arbórea Ibagué',
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
var legendMaps = ui.Panel({style: {shown: true, width: '170px'}});
legendMaps.style().set({position: 'bottom-right'})
legendMaps.style().set('backgroundColor', 'FFFFFF') 
//legendMaps.add(ui.Label('Año disturbio'));
legendMaps.add(makeRow('298A08', 'Cubierta arbórea'));
legendMaps.add(makeRow('6E6E6E', 'Construcciones'));
legendMaps.add(makeRow('B18904', 'Cuenca Combeima'));
legendMaps.add(makeRow('61380B', 'Corregimientos'));
legendMaps.add(makeRow('B43104', 'Suelo Urbano'));
Map.add(legend)
Map.add(legendMaps)
//Zoom a Ibague
Map.centerObject(corregimientos,10);