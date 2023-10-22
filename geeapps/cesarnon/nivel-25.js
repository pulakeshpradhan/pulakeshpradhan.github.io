var Done = ee.Image("users/cesarnon/Nivel_25_03_dic_2018_30m"),
    Cordoba = ee.FeatureCollection("users/cesarnon/datos_cba_2017/Cordoba_limite");
var color = ['009800', '65d92b','c94ed0','fb90e1','9d9d9d','ebebeb','e2e2e2',
'5970a1','acdee9','0000ff','cd3411','e56549','ffab98','000000','f1f1a6','d8d894',
'bebe82','86865c','f7fa41','07eb98','adde8f', '84371d', 'a8583d','b07a67']
Map.addLayer (Done.clip(Cordoba),{min:1, max:24, palette: color},'Nivel25')
Map.centerObject(Done, 7)
// Create the panel for the legend items.
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create and add the legend title.
var legendTitle = ui.Label({
  value: 'Mapa Cobertura Nivel 2.5',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend.add(legendTitle);
//var loading = ui.Label('Loading legend...', {margin: '2px 0 4px 0'});
//legend.add(loading);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      // Use padding to give the box height and width.
      padding: '6px',
      margin: '0 0 3px 0'
          }
  });
  // Create the label filled with the description text.
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 2px 4px'}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
var names = ['Monte','Arbustales y matorrales','Pastizal natural'
,'Pastizal natural con rocas o suelo desnudo','Rocas','Suelo desnudo','Salina',
'Cuerpos de agua','Zonas anegables','Cursos de agua','Zona urbana consolidada',
'Zona urbana en proceso de consolidacion','Zona urbana sin consolidar',
'Infraestructura vial', 'Actividades invernales','Actividades estivales',
'Actividades anuales (doble ciclo)','Sin actividad significativa',
'Cultivos anuales irrigados','Pasturas implantadas','Pasturas naturales manejadas',
'Plantaciones forestales maderables','Plantaciones perennes (frutales) de secano',
'Plantaciones perennes (frutales) irrigadas']
var color = ['009800', '65d92b','c94ed0','fb90e1','9d9d9d','ebebeb','e2e2e2',
'5970a1','acdee9','0000ff','cd3411','e56549','ffab98','000000','f1f1a6','d8d894',
'bebe82','86865c','f7fa41','07eb98','adde8f', '84371d', 'a8583d','b07a67']
for (var i = 0; i < names.length; i++) {
    legend.add(makeRow(color[i], names[i]));
  }
Map.add(legend);