var pantanal2 = ui.import && ui.import("pantanal2", "table", {
      "id": "users/blfaria/pantanal"
    }) || ee.FeatureCollection("users/blfaria/pantanal"),
    pantanal = ui.import && ui.import("pantanal", "table", {
      "id": "users/blfaria/santuario"
    }) || ee.FeatureCollection("users/blfaria/santuario"),
    onca = ui.import && ui.import("onca", "table", {
      "id": "users/blfaria/oncas_pantanal_"
    }) || ee.FeatureCollection("users/blfaria/oncas_pantanal_");
//var tools = require('users/fitoprincipe/geetools:MCD64A1');
var batch = require('users/fitoprincipe/geetools:batch');
Map.addLayer(pantanal2,{palette: ['']}, 'Pantanal');
//var styling2 = {color: 'green', fillColor: 'green'}; 
//Map.addLayer(pantanal.style(styling2));
//Map.addLayer(pantanal,
  //          {palette: ['2ca25f']}, 'Santuary');
var dataset = ee.ImageCollection('FIRMS').select('T21')
var years = ee.List.sequence(2010,2020)
var maps = ee.ImageCollection(years.map(function(year){
  var startDate = ee.Date.fromYMD(year,1,1)
  var endDate = ee.Date.fromYMD(year,9,30)
  var myImg = dataset.filter(ee.Filter.date(startDate,endDate)).max().gt(100).set("system:time_start",startDate)
  return myImg
}))
var chart = ui.Chart.image.seriesByRegion({imageCollection:maps, 
                              regions:pantanal2, 
                              reducer:ee.Reducer.count(),
                              scale:1000}).setOptions({title: 'Fire count',
                                                        lineWidth: 3,
                                                        pointSize: 5});
Map.addLayer(maps.max().clip(pantanal2), {min:0,max:1,palette:['red']}, 'Fires');
//print(chart)
print(maps);
var styling = {color: 'yellow', fillColor: 'black'}; 
//Map.addLayer(table.style(styling))
Map.addLayer(onca.style(styling),{},'onças');
// Export a cloud-optimized GeoTIFF.
/*
batch.Download.ImageCollection.toDrive(maps, 'FIRMS', {
 region: region,
  scale: 1000,// or geometry.getInfo()
})
*/
/*****************************************CRIANDO PAINEL PARA OS GRÁFICOS***************************************/
var panel = ui.Panel();
panel.style().set('width', '380px');
var intro = ui.Panel([
ui.Label({
    value: 'Fogo no Pantanal',
    style: {fontSize: '20px', fontWeight: 'bold'}}),
ui.Label('Neste painel são apresentados os gráficos de eventos de fogo no Pantanal,'),
ui.Label('Autor: Christhian Santana Cunha - christhianscunha@gmail.com'),
]);
panel.add(intro);
/******************************** FUNÇÃO PARA INSERIR GRÁFICO DE SÉRIES POR REGIÃO ******************************/  
panel.widgets().set(2, chart)
ui.root.insert(0, panel);
Map.centerObject(pantanal,10)