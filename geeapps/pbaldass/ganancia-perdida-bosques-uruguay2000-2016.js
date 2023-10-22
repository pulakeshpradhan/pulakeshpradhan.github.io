var ROU = ee.FeatureCollection("users/deabelle/Uruguay_LULC_2020/limite_oficial_Uruguay")
Map.centerObject(ROU, 7);
var blank = ee.Image(0).mask(0);
var outline = blank.paint(ROU, 'AA0000', 2); 
var visPar = {'palette':'#f20a0a','opacity': 0.6};
Map.addLayer(outline, visPar, "Uruguay", true);
Map.setOptions("SATELLITE")
//Map.setCenter(-56.05, -32.8, 7)
var transicionesLULC = ee.Image("users/intalulc/REDD/transiciones-final-sin-eei-v2")
print(transicionesLULC, "transiciones LULC")
var tran = transicionesLULC.select(0);
/*
  // Calculating the counts of each class
var stats_all = tran.reduceRegion({
  reducer: ee.Reducer.frequencyHistogram(),
  geometry: ROU,
  scale:30,
  maxPixels: 1e13});
print('count_all_',stats_all);
*/
var Listaoriginal = [1001,1004,1007,1009,1015,1021,15001,15004,15007,15009,15015,15021,17009,
                     17017,17021,21001,21004,21007,21009,21015,21017,21021,3009,4001,4004,4007,
                     4015,4021,7001,7004,7007,7009,7015,7021,9001,9004,9007,9009,9015,9017,9021,
                     1017,1020,4009,4017,4020,7017,7020,9020,15017,15020,17001,17004,17007,17015,17020,21020]
var Listaresumida = [1,2,2,3,2,2,2,2,2,3,1,2,3,1,2,2,2,2,3,2,2,1,3,2,1,2,2,2,2,2,1,3,2,2,4,4,4,1,4,4,4,2,2,3,2,2,2,2,4,2,2,2,2,2,2,2,2]
var Clasificacion = tran.remap(Listaoriginal,Listaresumida)  
var mask = Clasificacion.gt(2)
var clasifi2 = Clasificacion.updateMask(mask)
var imageVisParam = {
bands: ["remapped"],
min: 3,
opacity: 1,
palette: ["1271ff","fd0404"]}  
Map.addLayer(clasifi2, imageVisParam, "transiciones_bosque_2000-2005")
//////////////////
var tran1 = transicionesLULC.select(1);
var Clasificacion1 = tran1.remap(Listaoriginal,Listaresumida)  
var mask1 = Clasificacion1.gt(2)
var clasifi3 = Clasificacion1.updateMask(mask1)
Map.addLayer(clasifi3, imageVisParam, "transiciones_bosque_2005-2010")
/////////////////////
var tran2 = transicionesLULC.select(2);
var Clasificacion2 = tran2.remap(Listaoriginal,Listaresumida)  
var mask2 = Clasificacion2.gt(2)
var clasifi4 = Clasificacion2.updateMask(mask2)
Map.addLayer(clasifi4, imageVisParam, "transiciones_bosque_2010-2016")
/////////////////////////////
var legend1 = ui.Panel({
  style: {
    position: 'top-center',
    padding: '8px 15px'
  }
});
// Create and add the legend title.
var legendTitle1 = ui.Label({
  value: "Transición de coberturas 2000-2016",
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend1.add(legendTitle1);
Map.add(legend1)
///////////////////////////////////////
//////////////////////LEYENDA///////////////////////////////  
var colors = [
              //"ffffff",//1
              //"d278e2",//2
              "1271ff",//"1b894c",//3
              "ff1004",//4
               ];
var names = [
              //"Sin transición",
              //"Transiciones entre coberturas No Bosque",
              "Transición hacia bosque (ganancia)",
              "Transición de bosque a otra cobertura (pérdida)",
               ];
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
// Create and add the legend title.
var legendTitle = ui.Label({
  value: 'References',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend.add(legendTitle);
// var loading = ui.Label('Legend:', {margin: '2px 0 4px 0'});
// legend.add(loading);
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
for (var i = 0; i < names.length; i++){
legend.add(makeRow(colors[i], names[i]));
}
Map.add(legend)