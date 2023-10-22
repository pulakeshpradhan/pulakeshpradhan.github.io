Map.setOptions("SATELLITE")
Map.setCenter(-61.00, -34.6,10)
//
var gruesa =ee.Image("users/epbaldass/classified_correct_gruesa20_junin")
var paleta =['#d10000',"#fcb127","#fcf51d","#43beca",'#035f1b', "#4cd15c", '#ca6767', '#8d8910',"#614029","#0c1fff","#51fff7"];
Map.addLayer(gruesa,{min: 1, max: 11, palette: paleta},'gruesa');
var fina = ee.Image("users/epbaldass/classified_correct_fina20_junin")
var paleta2 =["#edfc08",'#ff702c', "#909200", '#d10000', '#035f1b', "#4cd15c","#0c1fff","#51fff7", "#614029"];
Map.addLayer(fina,{min: 1, max: 9, palette: paleta2},'fina');
//////////////////////LEYENDA///////////////////////////////  
var colors = [
              "#d10000",//1
              "#fcb127",//2
              "#fcf51d",//3
              "#43beca",//4
              "#035f1b",//5
              "#4cd15c",//6
              "#ca6767",//7
              "#8d8910",//8
              "#614029",//10
              "#0c1fff",//11
              "#51fff7",//12
              ];
var names = [
              "Maiz 1era",
              "Maíz tardío",
              "Soja 1era",
              "Barbecho/rastrojo",
              "Pasturas",
              "Pastizal natural",
              "Otros cultivos",
              "Soja 2da",
              "Cobertura leñosa",
              "Agua",
              "Urbano"
            ];
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px',
    width: '200px'
  }
});
// Create and add the legend title.
var legendTitle = ui.Label({
  value: "Leyenda gruesa 2021",
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
/////////
var colors2 = [
              "edfc08",//1
              "ff702c",//2
              "909200",//3
              "d10000",//4
              "035f1b",//5
              "4cd15c",//6
              "0c1fff",//7
              "51fff7",//8
              "614029",//9
              ];
var names2 = [
              "Trigo",
              "Cebada",
              "Avena",
              "Rastrojo/barbecho",
              "Pastura",
              "Pastizal Natural",
              "Agua",
              "Urbano",
              "Cobertura leñosa"
            ];
var legend2 = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px',
    width: '200px'
  }
});
// Create and add the legend title.
var legendTitle2 = ui.Label({
  value: "Leyenda fina 2020",
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend2.add(legendTitle2);
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
for (var i = 0; i < names2.length; i++){
legend2.add(makeRow(colors2[i], names2[i]));
}
Map.add(legend2)