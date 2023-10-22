var bounds = ee.FeatureCollection("users/guilhermecastrol86/semiarido_b20km"),
    semiarido = ee.FeatureCollection("users/jeff/VegetacaoSemiarido");
// Sample Machine 3.0
// Create squares on click and add them to a feature collection
//Autor: Jefferson Souza Fernandes
// load the landsat Image Collection
var ls5 = ee.ImageCollection("LANDSAT/LT05/C01/T1")
  .filterBounds(bounds)
  .filterDate('2011-1-1','2011-12-30')
  .filterMetadata('CLOUD_COVER_LAND', 'less_than',40);
Map.addLayer(ls5,{bands: ['B3', 'B2', 'B1']},'Imagem Landsat');
var checkboxLs = ui.Checkbox('Mostrar Imagens de Satélite', true);
checkboxLs.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(0).setShown(checked);
});
print(checkboxLs);
// Set the default map's cursor to a "crosshair".
Map.style().set('cursor', 'crosshair');
// Add a status panel
var inspector = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal')
});
inspector.add(ui.Label('Selecione a classe para qual deseja coletar amostras'));
Map.add(inspector);
// load AOI bounds, create a checkbox to show or hide it
Map.addLayer(bounds,'', 'AOI', 1);
Map.centerObject(bounds)
var checkboxAOI = ui.Checkbox('Mostrar Limites da AOI', true);
checkboxAOI.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(1).setShown(checked);
});
print(checkboxAOI);
// List of classes options
var tipoVeget = {
  'Cerrado':['Cerrado','333AB0'],
  'Floresta Estacional Decidual':['FlorestaEstacionalDecidual','FFFF00'],
  'Floresta Estacional Semidecidual':['FlorestaEstacionalSemidecidual','99CCFF'],
  'Floresta Ombrófila':['FlorestaOmbrofila','FF0000'],
  'Savana Estépica':['SavanaEstepica','33CC33'],
  'Savana Estépica Arborizada':['SavanaEstepicaArborizada','FFBBFF'],
  'Savana Estépica Florestada':['SavanaEstepicaFlorestada','FF00FF']
};
var classe = 'classe'
// Create a selection menu
var select = ui.Select({
  items: Object.keys(tipoVeget),
  onChange: function(key) {
  //Map.setCenter(places[key][0], places[key][1]); // em vez de setcenter, seria mudar o label da geometria que será criada
  inspector.clear();
  inspector.add(ui.Label('Coletando amostras de '+key, {color: 'red'}));
  var vegPC = ui.Map.Layer(semiarido.filter(ee.Filter.eq('vegt_radam',tipoVeget[key][0])), {color:tipoVeget[key][1]}, 'Veg. Pré-Classificada: '+key);
  Map.layers().set(3,vegPC);
  classe = tipoVeget[key][0];
  }
});
// COLOCAR ESSE INSPECTOR DENTRO DO ONCLICK 
//inspector.clear();
// Set a place holder.
select.setPlaceholder('Escolha a classe da amostra...');
Map.add(select)
// Create an empty FC for samples
var samples = []
var samplesCollection = ee.FeatureCollection(samples) 
// Add this layer to the map
var samplesLayer = ui.Map.Layer(samplesCollection, {color: 'red'}, 'Amostras')
Map.layers().add(samplesLayer)
// create square on click and add to the FC
Map.onClick(function(coords){
    var newcoords = ee.Geometry.Point(coords.lon, coords.lat);
    print(newcoords); // just to visualize
    var point = ee.Geometry.Point(coords.lon, coords.lat);
    var square = ee.Feature(point.buffer(50).bounds()).set('Classe', classe)
    samples.push(square)
    samplesCollection = ee.FeatureCollection(samples) // update the FC
    samplesLayer.setEeObject(samplesCollection)
});
// Add a Finish Button - Click to stop collecting and export FC
var finishButton = ui.Button({
  label: 'Finalizar', 
  onClick: function(){Export.table.toDrive(samplesCollection, 'Amostras')}
  //style
  })
//finishButton.add(finishButton);
Map.add(finishButton);