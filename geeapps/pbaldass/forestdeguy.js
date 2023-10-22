var regiones = ee.FeatureCollection("users/pbaldass/Eco-regionesREDD_wgs84");
var blank = ee.Image(0).mask(0);
var outline = blank.paint(regiones, 'AA0000', 1); 
var visPar = {'palette':'red','opacity': 0.6};
Map.addLayer(outline, visPar, "regiones", true);
var FD2000_2009 = ee.Image("users/pbaldass/forest_degradation_UY_2000-2009")
var FD2010_2018 = ee.Image("users/pbaldass/forest_degradation_UY_2010-2018")
var PVclass = {"opacity":1,"bands":["classification"],"min":0,"max":1,"palette":["#eaeaea","ff7707"]}
Map.setOptions("SATELLITE")
Map.setCenter(-56.0619, -32.71, 7);
Map.addLayer(FD2000_2009, PVclass, "Degradación 2000-2009")
Map.addLayer(FD2010_2018, PVclass, "Degradación 2010-2018")
//////////////////////LEYENDA///////////////////////////////  
var colors = [
              "white",//0
              "orange",//1
               ];
var names = [
              "No degradado",
              "Degradado",
            ];
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create and add the legend title.
var legendTitle = ui.Label({
  value: 'Resultados preliminares - Degradacion de Bosques UY',
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
      backgroundColor: color,
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
//////////////////
var colores = [
              "white",//0
              "white",//1
               ];
var names = [
              "Degradado 2000-2009: 17.88%",
              "Degradado 2010-2018: 11.92%"
            ];
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
// Create and add the legend title.
var legendTitle = ui.Label({
    value: 'Matriz 2000-2010',
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
      backgroundColor: color,
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
legend.add(makeRow(colores[i], names[i]));
}
Map.add(legend)