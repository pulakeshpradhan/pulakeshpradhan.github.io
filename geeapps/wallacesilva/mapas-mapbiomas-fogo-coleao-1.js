var oceans = ui.import && ui.import("oceans", "table", {
      "id": "users/veraarruda/oceans"
    }) || ee.FeatureCollection("users/veraarruda/oceans"),
    biomas = ui.import && ui.import("biomas", "table", {
      "id": "projects/mapbiomas-workspace/AUXILIAR/biomas_IBGE_250mil"
    }) || ee.FeatureCollection("projects/mapbiomas-workspace/AUXILIAR/biomas_IBGE_250mil"),
    brasil = ui.import && ui.import("brasil", "table", {
      "id": "projects/mapbiomas-workspace/AUXILIAR/brasil_2km"
    }) || ee.FeatureCollection("projects/mapbiomas-workspace/AUXILIAR/brasil_2km"),
    cerrado = ui.import && ui.import("cerrado", "table", {
      "id": "users/geomapeamentoipam/AUXILIAR/cerrado_250mil"
    }) || ee.FeatureCollection("users/geomapeamentoipam/AUXILIAR/cerrado_250mil"),
    estados = ui.import && ui.import("estados", "table", {
      "id": "projects/mapbiomas-workspace/AUXILIAR/estados-2017--"
    }) || ee.FeatureCollection("projects/mapbiomas-workspace/AUXILIAR/estados-2017--");
Map.centerObject(cerrado);
var brasilLimit = ee.Image(1).paint(brasil);
var offBrasil  = brasilLimit.updateMask(brasilLimit.eq(1));
// Map.addLayer(offBrasil, {palette: 'ffffff'}, 'off Brasil',true);
var inBrasil  = brasilLimit.updateMask(brasilLimit.neq(1));
Map.addLayer(inBrasil, {palette: 'ffffff'}, 'in Brasil branco',false);
Map.addLayer(inBrasil, {palette: 'd0d0d0'}, 'in Brasil cinza muito claro',false);
Map.addLayer(inBrasil, {palette: 'b0b0b0'}, 'in Brasil cinza claro',false);
Map.addLayer(inBrasil, {palette: '808080'}, 'in Brasil cinza',false);
Map.addLayer(inBrasil, {palette: '404040'}, 'in Brasil cinza escuro',true);
Map.addLayer(inBrasil, {palette: '202020'}, 'in Brasil preto muito escuro',false);
Map.addLayer(inBrasil, {palette: '000000'}, 'in Brasil preto',false);
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
var acumulado = 'projects/mapbiomas-workspace/FOGO1/PROCESSADO/mapbiomas-fire-collection1-accumulated-burned-coverage-2';
acumulado = ee.Image(acumulado);
// acumulado.bandNames().getInfo().forEach(function(bandName){
//   Map.addLayer(acumulado,{bands:bandName, palette:'red'},bandName,false);
// });
Map.addLayer(acumulado,{bands:['fire_accumulated_1985_2020'],palette:['red']},'Fogo acumulado 2020',false);
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
var annual = 'projects/mapbiomas-workspace/FOGO1/PROCESSADO/mapbiomas-fire-collection1-annual-burned-area-2';
annual = ee.Image(annual);
Map.addLayer(annual,{bands:['burned_area_2020'],palette:['red']},'Área Queimada 2020',false);
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
var monthy = 'projects/mapbiomas-workspace/FOGO1/PROCESSADO/mapbiomas-fire-collection1-monthly-burned-coverage-2';
monthy = ee.Image(monthy).divide(100).int();
Map.addLayer(monthy,{
  bands:['burned_coverage_2020'],
    min:1,
    max:12,
    palette:[
      'a900ff', '6f02ff', '020aff', '0675ff', '06ffff', 'ffee00', 'ff7700', 'ff0800', 'c20202', '0aa602', '0cff00'
      ]},'Área Queimada Mensal 2020',false);
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
var Mapp = require('users/joaovsiqueira1/packages:Mapp.js');
Map.setOptions({
    'styles': {
      'Dark': Mapp.getStyle('Dark')
    }
  });
var image = ee.ImageCollection('projects/mapbiomas-workspace/FOGO1/monthly-coverage-collection-1-v9').mosaic();
var frequence = 'projects/mapbiomas-workspace/FOGO1/PROCESSADO/mapbiomas-fire-collection1-fire-frequency-2';
frequence = ee.Image(frequence).divide(100).int();
var frequence_params = {
  bands:['fire_frequency_1985_' + 2020],
  palette:['ffffff','F8D71F','DAA118','BD6C12','9F360B','810004','4D0709'],
  min:0,
  max:36
};
Map.addLayer(frequence,frequence_params,'Frequencia');
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
var blank = ee.Image(0).mask(0);
var outline_bioma = blank.paint(biomas, '617375', 1.5);
Map.addLayer(outline_bioma, {'palette':'030303'}, 'Biomas preto', false);
Map.addLayer(outline_bioma, {'palette':'ffffff'}, 'Biomas branco', true);
var outline_cerrado = blank.paint(cerrado, '617375', 2);
//Map.addLayer(outline_cerrado, {'palette':'000000'}, 'Cerrado', false);
var outline_estados = blank.paint(estados, '617375', 1.5);
Map.addLayer(outline_estados, {'palette':'030303'}, 'Estados preto', false);
Map.addLayer(outline_estados, {'palette':'ffffff'}, 'Estados branco', false);
Map.addLayer(offBrasil, {palette: 'ffffff'}, 'off Brasil',true);
var biomes = biomas.aggregate_array('Bioma').getInfo();
biomes.forEach(function(biome){
  var offbiome = biomas.filter(ee.Filter.eq('Bioma',biome));
  offbiome = ee.Image(1).paint(offbiome);
  offbiome = offbiome.updateMask(offbiome.eq(1));
  Map.addLayer(offbiome,{palette:['ffffff']},'off ' + biome, false);
});