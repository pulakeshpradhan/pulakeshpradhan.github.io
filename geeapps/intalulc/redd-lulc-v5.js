/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var lulc = ee.ImageCollection("users/intalulc/REDD/lulc-6-clases-fe-v3");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var palette = ["#fff104","#97cc23","#decb20","#a98837","#d133ff","#ffc2f6","#ff93a0","#c2d3ff","#007e07","#137c03","#48b15c","#9fffa4","#d5ffab","#6c673b","#ffbfaf","#f1ffaf","#b6fff0","#58b6ff","#ba8d4f","#e5ffc6","#e3ffd0","#0000ff"];
var lulc = ee.Image("users/intalulc/REDD/lulc-final-4Y-v2")
Map.addLayer(lulc.select("classification_2000"), {min:0,max:21, palette:palette}, "Mapa " + 2000 , false)  
Map.addLayer(lulc.select("classification_2005"), {min:0,max:21, palette:palette}, "Mapa " + 2005 , false)  
Map.addLayer(lulc.select("classification_2010"), {min:0,max:21, palette:palette}, "Mapa " + 2010 , false)  
Map.addLayer(lulc.select("classification_2016"), {min:0,max:21, palette:palette}, "Mapa " + 2016 , false)  
var lulc = ee.Image("users/intalulc/REDD/lulc-final-eei-4Y-v2")
Map.addLayer(lulc.select("classification_2000"), {min:0,max:21, palette:palette}, "Mapa (eei)" + 2000 , false)  
Map.addLayer(lulc.select("classification_2005"), {min:0,max:21, palette:palette}, "Mapa (eei)" + 2005, false )  
Map.addLayer(lulc.select("classification_2010"), {min:0,max:21, palette:palette}, "Mapa (eei)" + 2010 , false)  
Map.addLayer(lulc.select("classification_2016"), {min:0,max:21, palette:palette}, "Mapa (eei)" + 2016, false )  
var trans = ee.Image("users/intalulc/REDD/transiciones-final-sin-eei-v2")
var dest = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63]
var origen = [1001,1004,1007,1009,1010,1015,1017,1021,4001,4004,4007,4009,4010,4015,4017,4021,7001,7004,7007,7009,7010,7015,7017,7021,9001,9004,9007,9009,9010,9015,9017,9021,10001,10004,10007,10009,10010,10015,10017,10021,15001,15004,15007,15009,15010,15015,15017,15021,17001,17004,17007,17009,17010,17015,17017,17021,21001,21004,21007,21009,21010,21015,21017,21021]
var palette_tr = ["#d7d5d5","#a2b6b0","#a2b6b0","#6a3d9a","#a2b6b0","#a2b6b0","#a2b6b0","#a2b6b0","#a2b6b0","#d7d5d5","#a2b6b0","#a2b6b0","#a2b6b0","#a2b6b0","#a2b6b0","#a2b6b0","#a2b6b0","#a2b6b0","#d7d5d5","#6a3d9a","#a2b6b0","#a2b6b0","#a2b6b0","#a2b6b0","#e31a1c","#e31a1c","#e31a1c","#d7d5d5","#e31a1c","#e31a1c","#e31a1c","#e31a1c","#a2b6b0","#a2b6b0","#a2b6b0","#6a3d9a","#d7d5d5","#a2b6b0","#a2b6b0","#a2b6b0","#a2b6b0","#a2b6b0","#a2b6b0","#6a3d9a","#a2b6b0","#d7d5d5","#a2b6b0","#a2b6b0","#a2b6b0","#a2b6b0","#a2b6b0","#6a3d9a","#a2b6b0","#a2b6b0","#d7d5d5","#a2b6b0","#a2b6b0","#a2b6b0","#a2b6b0","#6a3d9a","#a2b6b0","#a2b6b0","#a2b6b0","#d7d5d5"]
Map.addLayer(trans.select("tr2000_2005").remap(origen, dest), {min:0,max:63, palette:palette_tr}, "TR 00-05" , false)  
Map.addLayer(trans.select("tr2005_2010").remap(origen, dest), {min:0,max:63, palette:palette_tr}, "TR 05-10" ,false)  
Map.addLayer(trans.select("tr2010_2016").remap(origen, dest), {min:0,max:63, palette:palette_tr}, "TR 10-16" ,false)  
var trans = ee.Image("users/veron/LULC_Uru_final/transiciones-final-eei-v2")
var pal_tr = ["bfbcb4","red"]
Map.addLayer(trans.select("tr2000_2005").remap(origen, dest), {min:0,max:63, palette:palette_tr}, "TR 00-05 (eei)" , false)  
Map.addLayer(trans.select("tr2005_2010").remap(origen, dest), {min:0,max:63, palette:palette_tr}, "TR 05-10 (eei)" ,false)  
Map.addLayer(trans.select("tr2010_2016").remap(origen, dest), {min:0,max:63, palette:palette_tr}, "TR 10-16 (eei)" ,false)  
Map.setOptions("HYBRID")
Map.centerObject(lulc)
// Leyenda
var legend = ui.Panel({style: {position: 'bottom-right', padding: '8px 15px'}});
var loading = ui.Label('', {margin: '2px 0 4px 0'});
legend.add(loading);
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
var titulo = ui.Label({
    value: "Mapas de Uso y Cobertura",
    style: {margin: '0 10px 4px 16px', fontSize: "24px", fontWeight: "bold"}
  });
var titulo2 = ui.Label({
    value: "Transiciones",
    style: {margin: '0 10px 4px 16px', fontSize: "24px", fontWeight: "bold"}
  });
var subtitulo = ui.Label({
    value: "Años: 2000, 2005, 2010 y 2016",
    style: {margin: '1px 16px 16px 16px', fontSize: "14px"}
  });
var compo = ui.Label({
    value: "REDD Uruguay - Componente 1",
    style: {margin: '1px 16px 16px 16px', fontSize: "14px"}
  });
legend.add(titulo)
legend.add(subtitulo)
legend.add(compo)
legend.add(makeRow('137c03', 'Bosque Nativos (9)'));
legend.add(makeRow('48b15c', 'EEI (10)'));
legend.add(makeRow('97cc23', 'Forestaciones (1)'));
legend.add(makeRow('d133ff', 'Agricultura (4)'));
legend.add(makeRow('c2d3ff', 'Pasturas/Pastizales (7)'));
legend.add(makeRow('58b6ff', 'Humedales (17)'));
legend.add(makeRow('f1ffaf', 'Asentamientos/Otras tierras (20)'));
legend.add(makeRow('0000ff', 'Cursos y Cuerpos de Agua (21)'));
legend.add(titulo2)
legend.add(makeRow('d7d5d5', 'Estables'));
legend.add(makeRow('e31a1c', 'Bosque Nativo a Otras'));
legend.add(makeRow('6a3d9a', 'Otras a Bosque Nativo'));
legend.add(makeRow('a2b6b0', 'Otras transiciones'));
Map.add(legend);