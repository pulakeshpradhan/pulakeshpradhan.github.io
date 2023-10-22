// Nome do Projeto
var Projeto = 'Fazendas GLEBA BETA - Parcela 1 - PI'
// Ano inicio Projeto
var ano_inicio = 2000
// Ano fim Projeto
var ano_fim = 2021
// Data inicio Projeto
var inicio = ano_inicio +'-01-01'
// Data fim Projeto
var fim = ano_fim +'-12-31' 
//Distância do Buffer adicinalidade
var distancia = 45000
//Valor do Dolar
var dolar = 5.17
//Duração do Projeto em anos
var anos = ano_fim - ano_inicio +1;
//limites da propriedade certificada conforme memorial descritivo SIGEF-INCRA    
var limites = ee.Geometry.Polygon(
        [[
[	-42.7231037429086911	,	-8.3467876047333558	],
[	-42.7265386099999986	,	-8.3943650000000005	],
[	-42.7969969399999997	,	-8.4417211099999996	],
[	-42.8102527799999990	,	-8.4260927799999994	],
[	-42.8181011100000006	,	-8.4232150000000008	],
[	-42.8261489096469177	,	-8.4088445167672745	],
]]);
// Buffer da adicionalidade
var poly_outer = limites.buffer(distancia);
var limites1 = poly_outer.difference(limites);
Map.centerObject(poly_outer);
Map.addLayer(limites, {color:'red'}, 'Limites Propiedade', false);
Map.addLayer(poly_outer, {color:'blue'}, 'poly_outer (blue)', false);
Map.addLayer(limites1, {color:'green'}, 'Buffer Propriedade');
//Limites geográficos de áreas de referência fornecidas por MapBiomas
var TI = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/ESTATISTICAS/COLECAO6/indigenous_land');
//print(TI.limit(5));
Map.addLayer(TI.style({
                color: 'ffff00',
                width: 1,
                fillColor: 'ffff0033',
            }), {}, 'Terras Indígenas', false);
      var TIimage = TI.map(function(feature) {
  return feature.set('n', 0.5)
}).reduceToImage({
    'properties': ['n'],
    'reducer': ee.Reducer.first()
});
Map.addLayer(TIimage, {min: 0, max: 1}, 'TIimage', false);      
var UCPIF = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/ESTATISTICAS/COLECAO6/federal_conservation_units_integral_protection');
//print(UCPIF.limit(5));
Map.addLayer(UCPIF.style({
                color: '005500',
                width: 1,
                fillColor: '00550033',
            }), {}, 'UCPIF', false);
   var UCPIFimage = UCPIF.map(function(feature1) {
  return feature1.set('n', 0.25)
}).reduceToImage({
    'properties': ['n'],
    'reducer': ee.Reducer.first()
});
Map.addLayer(UCPIFimage, {min: 0, max: 1}, 'UCPIFimage', false);               
var UCUSF = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/ESTATISTICAS/COLECAO6/federal_conservation_units_sustainable_use');
//print(UCUSF.limit(5));
Map.addLayer(UCUSF.style({
                color: '558800',
                width: 1,
                fillColor: '55880033',
            }), {}, 'UCUSF', false);   
     var UCUSFimage = UCUSF.map(function(feature1) {
  return feature1.set('n', 0.15)
}).reduceToImage({
    'properties': ['n'],
    'reducer': ee.Reducer.first()
});
Map.addLayer(UCUSFimage, {min: 0, max: 1}, 'UCUSFimage', false);           
var UCUSE = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/ESTATISTICAS/COLECAO6/state_conservation_units_sustainable_use');
//print(UCUSE.limit(5));
Map.addLayer(UCUSE.style({
                color: '88ff00',
                width: 1,
                fillColor: '88ff0033',
            }), {}, 'UCUSE', false);  
       var UCUSEimage = UCUSE.map(function(feature1) {
  return feature1.set('n', 0.15)
}).reduceToImage({
    'properties': ['n'],
    'reducer': ee.Reducer.first()
});
Map.addLayer(UCUSEimage, {min: 0, max: 1}, 'UCUSEimage', false);              
var UCPIE = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/ESTATISTICAS/COLECAO6/state_conservation_units_integral_protection');
//print(UCPIF.limit(5));
Map.addLayer(UCPIE.style({
                color: '008800',
                width: 1,
                fillColor: '00880033',
            }), {}, 'UCPIE', false);    
         var UCPIEimage = UCPIE.map(function(feature1) {
  return feature1.set('n', 0.25)
}).reduceToImage({
    'properties': ['n'],
    'reducer': ee.Reducer.first()
});
Map.addLayer(UCPIEimage, {min: 0, max: 1}, 'UCPIEimage', false);           
var Quilombos = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/ESTATISTICAS/COLECAO6/quilombo');
//print(Quilombos.limit(5));
Map.addLayer(Quilombos.style({
                color: '880055',
                width: 1,
                fillColor: '88005533',
            }), {}, 'Quilombos', false);
           var Quilombosimage = Quilombos.map(function(feature1) {
  return feature1.set('n', 0.20)
}).reduceToImage({
    'properties': ['n'],
    'reducer': ee.Reducer.first()
});
Map.addLayer(Quilombosimage, {min: 0, max: 1}, 'Quilombosimage', false);           
var Semiarido = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/ESTATISTICAS/COLECAO6/semiarid');
//print(Semiarido.limit(5));
Map.addLayer(Semiarido.style({
                color: '880000',
                width: 1,
                fillColor: '88000033',
            }), {}, 'Semiárido', false);   
  var Semiaridoimage = Semiarido.map(function(feature1) {
  return feature1.set('n', 0.15)
}).reduceToImage({
    'properties': ['n'],
    'reducer': ee.Reducer.first()
});
Map.addLayer(Semiaridoimage, {min: 0, max: 1}, 'Semiaridoimage', false);  
var Mata_Atlantica = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/ESTATISTICAS/COLECAO6/atlantic_forest_law');
//print(Mata_Atlantica.limit(5));
Map.addLayer(Mata_Atlantica.style({
                color: '555555',
                width: 1,
                fillColor: '55555533',
            }), {}, 'Lei da Mata Atlântica', false);     
   var Mata_Atlanticaimage = Mata_Atlantica.map(function(feature1) {
  return feature1.set('n', 0.15)
}).reduceToImage({
    'properties': ['n'],
    'reducer': ee.Reducer.first()
});
Map.addLayer(Mata_Atlanticaimage, {min: 0, max: 1}, 'Mata_Atlanticaimage', false);  
var Biosfera = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/ESTATISTICAS/COLECAO6/biosphere_reserve');
//print(Biosfera.limit(5));
Map.addLayer(Biosfera.style({
                color: '885500',
                width: 1,
                fillColor: '88550033',
            }), {}, 'Reservas da Biosfera', false);              
  var Biosferaimage = Biosfera.map(function(feature1) {
  return feature1.set('n', 0.10)
}).reduceToImage({
    'properties': ['n'],
    'reducer': ee.Reducer.first()
});
Map.addLayer(Biosferaimage, {min: 0, max: 1}, 'Biosferaimage', false);  
var biomes = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/biomas');
//print(Biosfera.limit(5));
Map.addLayer(biomes.style({
                color: '885500',
                width: 1,
                fillColor: '88550033',
            }), {}, 'Biomas', false);  
 var biomesimage = biomes.map(function(feature1) {
  return feature1.set('n', 0.001)
}).reduceToImage({
    'properties': ['n'],
    'reducer': ee.Reducer.first()
});
Map.addLayer(biomesimage, {min: 0, max: 1}, 'biomes1image', false);  
var UHE = ee.FeatureCollection("users/gustavoirgang/BR_UHE_maximorum_Buffer_Mult");
//print(Biosfera.limit(5));
Map.addLayer(UHE.style({
                color: '885500',
                width: 1,
                fillColor: '88550033',
            }), {}, 'Reservas da Biosfera', false);              
  var UHEimage = UHE.map(function(feature1) {
  return feature1.set('n', 0.20)
}).reduceToImage({
    'properties': ['n'],
    'reducer': ee.Reducer.first()
});
Map.addLayer(UHEimage, {min: 0, max: 1}, 'UHEimage', false);  
var biomes_reduced = biomes.reduceToImage(['featureid'], 'mode');
var biomesremap = biomes_reduced .remap([1,2,3,4,5,6],
           [0.009,0.099,0.019,0.079,0.039,0.059,]);
var PSA = ee.ImageCollection([UHEimage, Mata_Atlanticaimage, Biosferaimage, Semiaridoimage, Quilombosimage, TIimage, UCPIFimage, UCUSFimage, UCUSEimage, UCPIEimage, biomesimage]).sum().add(biomesremap).clip(limites);
Map.addLayer(PSA, {min: 0, max: 1}, 'PSA');             
//Paleta de cores Uso do Solo
var sld_intervals =
'<RasterSymbolizer>' +
 ' <ColorMap  type="intervals" extended="false" >' +
'<ColorMapEntry color="#129912" quantity="1" label="1. Floresta"/>' +
'<ColorMapEntry color="#006400" quantity="3" label="3. Formação Florestal"/>' +
'<ColorMapEntry color="#00ff00" quantity="4" label="4. Formação Savânica"/>' +
'<ColorMapEntry color="#687537" quantity="5" label="5. Mangue"/>' +
'<ColorMapEntry color="#6b9932" quantity="49" label="49. Restinga Arborizada (beta)"/>' +
'<ColorMapEntry color="#BBFCAC" quantity="10" label="10. Formação Natural não Florestal"/>' +
'<ColorMapEntry color="#45C2A5" quantity="11" label="11. Campo Alagado e Área Pantanosa"/>' +
'<ColorMapEntry color="#B8AF4F" quantity="12" label="12. Formação Campestre"/>' +
'<ColorMapEntry color="#968c46" quantity="32" label="32. Apicum"/>' +
'<ColorMapEntry color="#665a3a" quantity="29" label="29. Afloramento Rochoso"/>' +
'<ColorMapEntry color="#f1c232" quantity="13" label="13. Outras Formações não Florestais"/>' +
'<ColorMapEntry color="#FFFFB2" quantity="14" label="14. Agropecuária"/>' +
'<ColorMapEntry color="#FFD966" quantity="15" label="15. Pastagem"/>' +
'<ColorMapEntry color="#E974ED" quantity="18" label="18. Agricultura"/>' +
'<ColorMapEntry color="#D5A6BD" quantity="19" label="19. Lavoura Temporária"/>' +
'<ColorMapEntry color="#e075ad" quantity="39" label="39. Soja"/>' +
'<ColorMapEntry color="#C27BA0" quantity="20" label="20. Cana"/>' +
'<ColorMapEntry color="#982c9e" quantity="40" label="40. Arroz (beta)"/>' +
'<ColorMapEntry color="#e787f8" quantity="41" label="41. Outras Lavouras Temporárias"/>' +
'<ColorMapEntry color="#f3b4f1" quantity="36" label="36. Lavoura Perene"/>' +
'<ColorMapEntry color="#cca0d4" quantity="46" label="46. Café (beta)"/>' +
'<ColorMapEntry color="#d082de" quantity="47" label="47. Citrus (beta)"/>' +
'<ColorMapEntry color="#cd49e4" quantity="48" label="48. Outras Lavouras Perenes"/>' +
'<ColorMapEntry color="#ad4413" quantity="9" label="9. Silvicultura"/>' +
'<ColorMapEntry color="#fff3bf" quantity="21" label="21. Mosaico de Agricultura e Pastagem"/>' +
'<ColorMapEntry color="#EA9999" quantity="22" label="22. Área não Vegetada"/>' +
'<ColorMapEntry color="#DD7E6B" quantity="23" label="23. Praia, Duna e Areal"/>' +
'<ColorMapEntry color="#aa0000" quantity="24" label="24. Área Urbanizada"/>' +
'<ColorMapEntry color="#af2a2a" quantity="30" label="30. Mineração"/>' +
'<ColorMapEntry color="#ff3d3d" quantity="25" label="25. Outras Áreas não Vegetadas"/>' +
'<ColorMapEntry color="#0000FF" quantity="26" label="26. Corpo Dágua"/>' +
'<ColorMapEntry color="#0000FF" quantity="33" label="33. Rio, Lago e Oceano"/>' +
'<ColorMapEntry color="#02106f" quantity="31" label="31. Aquicultura"/>' +
'<ColorMapEntry color="#D5D5E5" quantity="27" label="27. Não Observado"/>' +
'</ColorMap>' +
'</RasterSymbolizer>';
var reclass  = {
  min: 0,
  max: 1,
  palette: [
"#000000",
"#00FF00"
]};
//Paletas de cores carbono
var PsnNetVis = {
  min: 0.0,
  max: 80.0,
  palette: ['FFFFFF', '0a9501', '074b03'],
};
var PsnNetVis3 = {
  min: 0.0,
  max: 21.0,
  palette: ['FFFFFF', '0a9501', '074b03'],
};
var PsnNetVis1 = {
  min: 0.0,
  max: 700.0,
  palette: ['FFFFFF', '0a9501', '074b03'],
};
var PsnGPP = {
  min: 0.0,
  max: 200.0,
  palette: ['FFFFFF', '0a9501', '074b03'],
};
// Asset mapbiomas Uso do Solo
var asset = "projects/mapbiomas-workspace/public/collection7/mapbiomas_collection70_integration_v2";
// LULC mapbiomas image
var mapbiomas = ee.Image(asset).selfMask();
//Integração anual (2000 a 2022) dos dados de Uso do Solo e carbono
var mapbiomas_2021 = mapbiomas.select('classification_' + 2021);
Map.addLayer(mapbiomas_2021.sldStyle(sld_intervals), {}, 'Mapbiomas uso 2021', false);
 var mapbiomas_reclass_2021 =   mapbiomas_2021.remap([0, 1, 3, 4, 5, 9, 10, 11, 12, 13, 14, 15, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 32, 33, 36, 39, 40, 41, 46, 47, 48, 49],
[0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
Map.addLayer(mapbiomas_reclass_2021, reclass, '2021 rec', false);
var netYearlyes = ee.ImageCollection("MODIS/006/MOD17A3HGF")
 .filter(ee.Filter.date(inicio, fim)).select('Npp');
// Convert T carbono m² para t carbono hectare
var netYearlyes = netYearlyes.map(function(image) {
  return image.divide(325).set(
      'system:time_start', image.get('system:time_start'));});
var NppYearlyes = netYearlyes.sum().multiply(mapbiomas_reclass_2021)
var Npp1 = NppYearlyes
  //Calculo de áreas p adicionalidade
  var table = ee.FeatureCollection(limites);
  var table1 = ee.FeatureCollection(limites1);
  //Dados da produção liquida anual de carbono para o gráfico
var netYearly = ee.ImageCollection("MODIS/006/MOD17A3HGF")
 .filter(ee.Filter.date(inicio, fim)).select('Npp');
// Convert pressure levels from Pa to hPa - Example for surface pressure
var netYearly = netYearly.map(function(image) {
  return image.divide(325).set(
      'system:time_start', image.get('system:time_start'));
});
//delimitação do Projeto para cáculo de área adicionalidade
var Npp3 = netYearly.mean()
Map.addLayer(Npp3,PsnNetVis1, 'Linha de Base', false);
  var area_pxa_base1 = Npp3.gte(1).multiply(ee.Image.pixelArea()) 
                    .reduceRegion(ee.Reducer.sum(),table,30,null,null,false,1e13)
                    .get('Npp')
//print(area_pxa_base1)                    
var area_pxa_base = Npp1.gte(1).multiply(ee.Image.pixelArea()) 
                    .reduceRegion(ee.Reducer.sum(),table,30,null,null,false,1e13)
                    .get('Npp')
//print(area_pxa_base)                     
                  //  print ('Área usando o ee.Image.pixelArea', ee.Number(area_pxa).divide(1e6))
  var area_pxa2_base =  ee.Number(((ee.Number(area_pxa_base1).divide(1e4)).subtract(ee.Number(area_pxa_base).divide(1e4))).divide(ee.Number(area_pxa_base1).divide(1e4))).multiply(100)
//print(area_pxa2_base)
   //Calculo de áreas
var area_pxa_ref1 = Npp3.gte(1).multiply(ee.Image.pixelArea()) 
                    .reduceRegion(ee.Reducer.sum(),table1,30,null,null,false,1e13)
                    .get('Npp')
var area_pxa_ref = Npp1.gte(1).multiply(ee.Image.pixelArea()) 
                    .reduceRegion(ee.Reducer.sum(),table1,30,null,null,false,1e13)
                    .get('Npp')
                  //  print ('Área usando o ee.Image.pixelArea', ee.Number(area_pxa).divide(1e6))
  var area_pxa2_ref =  ee.Number(((ee.Number(area_pxa_ref1).divide(1e4)).subtract(ee.Number(area_pxa_ref).divide(1e4))).divide(ee.Number(area_pxa_ref1).divide(1e4))).multiply(100)
//print(area_pxa2_ref)
var referencia1 = ee.Number(area_pxa2_ref)
var base = ee.Number(area_pxa2_base)
var prop = ee.Number(ee.Number(area_pxa2_ref).subtract(ee.Number(area_pxa2_base)))
//print(prop)
//Soma de anos com Carbono em vegetação preservada
var mapbiomas =  mapbiomas_reclass_2021
Map.addLayer(mapbiomas,PsnNetVis3, 'Mapbiomas anos', false);
//Área com carbono em vegetação preservada
var Nppgt =(Npp1.gte(1)).clip(limites)
Map.addLayer(NppYearlyes.clip(limites), PsnNetVis1, 'NPP');
var mapp = require('users/joaovsiqueira1/packages:Mapp.js');
 Map.setOptions({
                'styles': {
                    'Night': mapp.getStyle('Night')
                }
            });
 // Coleção MapBiomas Desmatamento
var MapBiomas_imagem = (ee.Image('projects/mapbiomas-workspace/public/collection5/mapbiomas_collection50_deforestation_primary_vegetation_v1'));
var bandas = MapBiomas_imagem.bandNames();
var MapBiomas_colecao = ee.ImageCollection.fromImages(bandas.map(function(name){
  var Band_name = ee.String(name);
  var year_image = ee.Number.parse(Band_name.replace('deforestation_pv',''));
  return MapBiomas_imagem.select(Band_name)
                  .rename('Desmatamento')
                  ;
}));
var sld_intervals =
'<RasterSymbolizer>' +
 ' <ColorMap  type="intervals" extended="false" >' +
'<ColorMapEntrycolor="#FFFF00"quantity="1985"label="1985"/>'+
'<ColorMapEntrycolor="#FFD700"quantity="1986"label="1986"/>'+
'<ColorMapEntrycolor="#EEDD82"quantity="1987"label="1987"/>'+
'<ColorMapEntrycolor="#DAA520"quantity="1988"label="1988"/>'+
'<ColorMapEntrycolor="#B8860B"quantity="1989"label="1989"/>'+
'<ColorMapEntrycolor="#BC8F8F"quantity="1990"label="1990"/>'+
'<ColorMapEntrycolor="#CD5C5C"quantity="1991"label="1991"/>'+
'<ColorMapEntrycolor="#8B4513"quantity="1992"label="1992"/>'+
'<ColorMapEntrycolor="#A0522D"quantity="1993"label="1993"/>'+
'<ColorMapEntrycolor="#CD853F"quantity="1994"label="1994"/>'+
'<ColorMapEntrycolor="#DEB887"quantity="1995"label="1995"/>'+
'<ColorMapEntrycolor="#F5F5DC"quantity="1996"label="1996"/>'+
'<ColorMapEntrycolor="#F5DEB3"quantity="1997"label="1997"/>'+
'<ColorMapEntrycolor="#F4A460"quantity="1998"label="1998"/>'+
'<ColorMapEntrycolor="#D2B48C"quantity="1999"label="1999"/>'+
'<ColorMapEntrycolor="#D2691E"quantity="2000"label="2000"/>'+
'<ColorMapEntrycolor="#B22222"quantity="2001"label="2001"/>'+
'<ColorMapEntrycolor="#A52A2A"quantity="2002"label="2002"/>'+
'<ColorMapEntrycolor="#E9967A"quantity="2003"label="2003"/>'+
'<ColorMapEntrycolor="#FA8072"quantity="2004"label="2004"/>'+
'<ColorMapEntrycolor="#FFA07A"quantity="2005"label="2005"/>'+
'<ColorMapEntrycolor="#FFA500"quantity="2006"label="2006"/>'+
'<ColorMapEntrycolor="#FF8C00"quantity="2007"label="2007"/>'+
'<ColorMapEntrycolor="#FF7F50"quantity="2008"label="2008"/>'+
'<ColorMapEntrycolor="#F08080"quantity="2009"label="2009"/>'+
'<ColorMapEntrycolor="#FF6347"quantity="2010"label="2010"/>'+
'<ColorMapEntrycolor="#FF4500"quantity="2011"label="2011"/>'+
'<ColorMapEntrycolor="#FF0000"quantity="2012"label="2012"/>'+
'<ColorMapEntrycolor="#FF69B4"quantity="2013"label="2013"/>'+
'<ColorMapEntrycolor="#FF1493"quantity="2014"label="2014"/>'+
'<ColorMapEntrycolor="#FFC0CB"quantity="2015"label="2015"/>'+
'<ColorMapEntrycolor="#FFB6C1"quantity="2016"label="2016"/>'+
'<ColorMapEntrycolor="#DB7093"quantity="2017"label="2017"/>'+
'<ColorMapEntrycolor="#B03060"quantity="2018"label="2018"/>'+
'<ColorMapEntrycolor="#C71585"quantity="2019"label="2019"/>'+
'<ColorMapEntrycolor="#D02090"quantity="2020"label="2020"/>'+
'</ColorMap>' +
'</RasterSymbolizer>';
var Parametros_MapBiomas = {
  min: 2000,
  max: 2021,
  palette: [
"#FFFF00",
"#FFD700",
"#EEDD82",
"#DAA520",
"#B8860B",
"#BC8F8F",
"#CD5C5C",
"#8B4513",
"#A0522D",
"#CD853F",
"#DEB887",
"#F5F5DC",
"#F5DEB3",
"#F4A460",
"#D2B48C",
"#D2691E",
"#B22222",
"#A52A2A",
"#E9967A",
"#FA8072",
"#FFA07A",
"#FFA500",
"#FF8C00",
"#FF7F50",
"#F08080",
"#FF6347",
"#FF4500",
"#FF0000",
"#FF69B4",
"#FF1493",
"#FFC0CB",
"#FFB6C1",
"#DB7093",
"#B03060",
"#C71585",
"#D02090",
  ]};
Map.addLayer(MapBiomas_colecao.sum(), Parametros_MapBiomas,'Desmatamento MapBiomas', false);       
//Carbono da produção Bruta anual
var dataset = ee.ImageCollection('MODIS/006/MOD17A2H')
                  .filter(ee.Filter.date(inicio, fim)).select('Gpp');
// Conversão de t de carbono por m² para t de carbono hectares
var dataset = dataset.map(function(image) {
  return image.multiply(8).set(
      'system:time_start', image.get('system:time_start'));
});
var gpp = dataset.mean().clip(limites).multiply(Nppgt);
var gpp2 = dataset.mean().multiply(Nppgt)
Map.addLayer(gpp2, PsnGPP, 'gpp2');
//Cálculo do valor final de carbono pela adicionalidade
var tc12 = (NppYearlyes.add(gpp2)).multiply((prop).divide(100))
//Transformação de t de carbono para t de CO²
var tco2e = tc12.multiply(3.67)
//Adicional Biomas
var bioma = tco2e.multiply(PSA)
//Total de CO²e
var c12 = tco2e.add(bioma)
//Percentagem Adicionall
var percentagem = (bioma.divide(tco2e)).multiply(100);
//Total de CO²e em Dollar
var U$D = c12.multiply(10)
//Total de CO²e em Reais
var R$ = U$D.multiply(dolar)
//Paineis Legendas
var legendarea = ui.Panel([ui.Label('Calculando área íntegra da propriedade')]);
var legendarea2 = ui.Panel([ui.Label('Calculando área total da propriedade')]);
//Calculo de áreas
var area_pxa = Nppgt.gte(1).multiply(ee.Image.pixelArea()) 
                    .reduceRegion(ee.Reducer.sum(),table,30,null,null,false,1e13)
                    .get('Npp')
                  //  print ('Área usando o ee.Image.pixelArea', ee.Number(area_pxa).divide(1e6))
  var area_pxa2 =  ee.Number(area_pxa).divide(1e4)
  // Request the value from the server.
  area_pxa2.evaluate(function(result) {
    // When the server returns the value, show it.
    legendarea.widgets().set(0, ui.Label({
      value: 'Área nativa íntegra comprovada em hectares: ' + result.toFixed(2),
    }));
});
//Maneira correta de calcular áreas
var area_pxa4 = Npp3.gte(1).multiply(ee.Image.pixelArea()) 
                    .reduceRegion(ee.Reducer.sum(),table,30,null,null,false,1e13)
                    .get('Npp')
                  //  print ('Área usando o ee.Image.pixelArea', ee.Number(area_pxa).divide(1e6))
  var area_pxa3 =  ee.Number(area_pxa4).divide(1e4)
  // Request the value from the server.
  area_pxa3.evaluate(function(result) {
    // When the server returns the value, show it.
    legendarea2.widgets().set(0, ui.Label({
      value: 'Área da propriedade em hectares: ' + result.toFixed(2),
    }));
});  
  //Toneladas de carbono por hectares
var area_pxa22 =  ee.Number(area_pxa).divide(1e4)
var tCha_area = area_pxa22
//print(tCha_area)
var tCha_carbonoB = (gpp2)
//print(tCha_carbonoB)
var tChaB = tCha_carbonoB.divide(area_pxa22)
//print(tChaB)
var tCha_carbonoL = (NppYearlyes)
 // print(tCha_carbonoL)
var tChaL = (tCha_carbonoL).divide(area_pxa22)
//print(tChaL)
var tChaLano = (tCha_carbonoL).divide(area_pxa22).divide(anos)
var tCha_carbonoT = (NppYearlyes.add(gpp2))
 // print(tCha_carbonoT)
var tChaT = (tCha_carbonoT).divide(area_pxa22)
//print(tChaT)
// Create an empty panel in which to arrange widgets.
// The layout is vertical flow by default.
var panel = ui.Panel({layout: ui.Panel.Layout.flow('vertical'),style: {width: '60%', height: '100%'}})
    .add(ui.Label('EXTRATO C12d DOS SERVIÇOS AMBIENTAIS EM VEGETAÇÃO NATIVA PARA  O PERÍODO DE: ' + ano_inicio +' a ' + ano_fim +', TOTALIZANDO: ' + anos + ' ANOS COMPROVADOS DE CONTRIBUIÇÕES PELO PROJETO:  '
    + Projeto));
// Create an inspector panel with a horizontal layout.
var inspector0tChaLanos = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
  }
});
var inspector0tChaB = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
  }
});
var inspector0tChaL = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
  }
});
var inspector0tChaT = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
  }
});
var inspector0 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
  }
});
// Add a label to the panel.
inspector0.add(ui.Label('Acumulados'));
var inspector00 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
  }
});
var inspector001 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
  }
});
var inspector002 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
  }
});
var inspector003 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
  }
});
var inspector004 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
  }
});
var inspector005 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
  }
});
var inspector006 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
  }
});
var inspector007 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
  }
});
var inspector008 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
  }
});
var inspector009 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
  }
});
var inspector0010 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
  }
});
var inspector0011 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
  }
});
var inspector0012 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
  }
});
var inspector0013 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
  }
});
var inspector0014 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
  }
});
var inspector0015 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
  }
});
var inspector0016 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
  }
});
var sampledPoint0wtChaLanos = tChaLano.reduceRegion(ee.Reducer.sum(), limites, 500);
  var computedValue0wtChaLanos = sampledPoint0wtChaLanos.get('Npp');
  // Request the value from the server and use the results in a function.
  computedValue0wtChaLanos.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector0tChaLanos.widgets().set(3, ui.Label({
      value: 'Toneladas de carbono p.p. Líquida (Npp) por hectare ano: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
var sampledPoint0wtChaL = tChaL.reduceRegion(ee.Reducer.sum(), limites, 500);
  var computedValue0wtChaL = sampledPoint0wtChaL.get('Npp');
  // Request the value from the server and use the results in a function.
  computedValue0wtChaL.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector0tChaL.widgets().set(3, ui.Label({
      value: 'Toneladas de carbono p.p. Líquida (Npp) por hectare: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
var sampledPoint0wtChaB = tChaB.reduceRegion(ee.Reducer.sum(), limites, 500);
  var computedValue0wtChaB = sampledPoint0wtChaB.get('Gpp');
  // Request the value from the server and use the results in a function.
  computedValue0wtChaB.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector0tChaB.widgets().set(3, ui.Label({
      value: 'Toneladas de carbono p.p. Bruta (Gpp) por hectare: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
var sampledPoint0wtChaT = tChaT.reduceRegion(ee.Reducer.sum(), limites, 500);
  var computedValue0wtChaT = sampledPoint0wtChaT.get('Npp');
  // Request the value from the server and use the results in a function.
  computedValue0wtChaT.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector0tChaT.widgets().set(3, ui.Label({
      value: 'Toneladas de carbono p.p. Total (Gpp+Npp) por hectare: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
var sampledPoint0w = gpp2.reduceRegion(ee.Reducer.sum(), limites, 500);
  var computedValue0w = sampledPoint0w.get('Gpp');
  // Request the value from the server and use the results in a function.
  computedValue0w.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector00.widgets().set(3, ui.Label({
      value: 'Produtividade primária bruta em Toneladas de carbono (GPP): ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
var sampledPoint1w = NppYearlyes.reduceRegion(ee.Reducer.sum(), limites, 500);
  var computedValue1w = sampledPoint1w.get('Npp');
  // Request the value from the server and use the results in a function.
  computedValue1w.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector001.widgets().set(3, ui.Label({
      value: 'Produtividade primária líquida em Toneladas de carbono (NPP): ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint5w = base;
  var computedValue5w = base;
  // Request the value from the server and use the results in a function.
  computedValue5w.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector0014.widgets().set(3, ui.Label({
      value: '% de área alterada de Referência da propriedade: ' + result.toFixed(2),      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint6w = referencia1;
  var computedValue6w = referencia1;
  // Request the value from the server and use the results in a function.
  computedValue6w.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector0015.widgets().set(3, ui.Label({
      value: '% de área alterada na Linha de Base '+ distancia + ' metros no entorno da propriedade: ' + result.toFixed(2),      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint7w = prop;
  var computedValue7w = prop;
  // Request the value from the server and use the results in a function.
  computedValue7w.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector0016.widgets().set(3, ui.Label({
      value: 'Adicionalidade igual a diferença entre as % de referência e de base: ' + result.toFixed(2),      style: {stretch: 'horizontal'}
    }));
  });
var sampledPoint2w = tc12.reduceRegion(ee.Reducer.sum(), limites, 500);
  var computedValue2w = sampledPoint2w.get('Npp');
  // Request the value from the server and use the results in a function.
  computedValue2w.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector002.widgets().set(3, ui.Label({
      value: 'Safras em Toneladas de Carbono total (NPP+GPP) x ADICINALIDADE: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint222w = tco2e.reduceRegion(ee.Reducer.sum(), limites, 500);
  var computedValue222w = sampledPoint222w.get('Npp');
  // Request the value from the server and use the results in a function.
  computedValue222w.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector0013.widgets().set(3, ui.Label({
      value: 'Safras em tCO2eq (Toneladas de Dióxido de Carbono equivalente) = (NPP+GPP) x 3.67: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint26w = percentagem.reduceRegion(ee.Reducer.mean(), limites, 500);
  var computedValue26w = sampledPoint26w.get('Npp');
  // Request the value from the server and use the results in a function.
  computedValue26w.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector006.widgets().set(3, ui.Label({
      value: 'Percentagem Ganho Adicional total (%): ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint210w = bioma.reduceRegion(ee.Reducer.sum(), limites, 500);
  var computedValue210w = sampledPoint210w.get('Npp');
  // Request the value from the server and use the results in a function.
  computedValue210w.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector0010.widgets().set(3, ui.Label({
      value: 'Ganho Adicional PSA do total Safras em tCO2eq: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint212w = c12.reduceRegion(ee.Reducer.sum(), limites, 500);
  var computedValue212w = sampledPoint212w.get('Npp');
  // Request the value from the server and use the results in a function.
  computedValue212w.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector0012.widgets().set(3, ui.Label({
      value: 'Ganho Adicional total mais do total Safras em tCO2eq: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint3w = U$D.reduceRegion(ee.Reducer.sum(), limites, 500);
  var computedValue3w = sampledPoint3w.get('Npp');
  // Request the value from the server and use the results in a function.
  computedValue3w.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector003.widgets().set(3, ui.Label({
      value: 'Valor Sugerido em Dolares das Safras a tCO2eq = U$D10,00: U$' + result.toFixed(2),      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint4w = R$.reduceRegion(ee.Reducer.sum(), limites, 500);
  var computedValue4w = sampledPoint4w.get('Npp');
  // Request the value from the server and use the results in a function.
  computedValue4w.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector004.widgets().set(3, ui.Label({
      value: 'Valor Sugerido em Reais das Safras (U$D10,00 a t) e (1U$D a R$' + dolar +' ) de tCO2eq: R$' + result.toFixed(2),      style: {stretch: 'horizontal'}
    }));
  });
// ---------------------------------------------------------------
// Visualize Data in a Chart
// ---------------------------------------------------------------
// Chart annual time series of carbon
var chart20 = ui.Chart.image.series({
    imageCollection: netYearlyes, 
    region: limites, 
    reducer: ee.Reducer.sum(),
    scale: 500
}).setOptions({
          title: 'Gráfico dos dados de Produtividade primária líquida em Toneladas de carbono (NPP) por ano',
          vAxis: {title: 'toneladas'},
          hAxis: {title: 'Datas: dados totalizados anualmente'},
          series: {
          // Gives each series an axis name that matches the Y-axis below.
          0: {axis: 'Produtividade primária bruta'},
           },
})
//print(chart2)
var chart0 = ui.Chart.image.series({
  imageCollection: netYearlyes,
  region: limites,
  reducer: ee.Reducer.sum(), 
  scale: 500,
}).setOptions({
          title: 'Contagem de horas por dia com potencial de desenvolvimento de Geada Leve',
          //curveType:'function',
          series: {
          // Gives each series an axis name that matches the Y-axis below.
          0: {axis:  'temperature_2m_above_ground' , setChartType:'ColumnChart', color: 'red'}
          },
          vAxis: {title: 'Horas por dia'},
        legend: 'true',
        trendlines: {
      0: {
        type: 'polynomial',
        degree: 7,
        color: 'red',
        visibleInLegend: false,
     }        },
        hAxis: {
        title: '5 dias de previsão (120h)',
                },
}).setSeriesNames(['Umidade relativa']).setChartType('Table');
//print(chart0)
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
var legendTitle = ui.Label({
  value: ('Uso do Solo 2020'),
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend.add(legendTitle);
panel.add(legend); 
// Creates and styles 1 row of the legend.
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
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Palette with the colors
var palette =['129912','006400','00ff00','687537','6b9932','BBFCAC','45C2A5','B8AF4F','968c46','665a3a','f1c232','FFFFB2','FFD966','E974ED','D5A6BD','e075ad','C27BA0','982c9e','e787f8','f3b4f1','cca0d4','d082de','cd49e4','ad4413','fff3bf','EA9999','DD7E6B','aa0000','af2a2a','ff3d3d','0000FF','0000FF','02106f','D5D5E5'];
// name of the legend
var names = ['1. Floresta',  '3. Formação Florestal',  '4. Formação Savânica',  '5. Mangue',  '49. Restinga Arborizada',  '10. Formação Natural não Florestal',  '11. Campo Alagado e Área Pantanosa',  '12. Formação Campestre',  '32. Apicum',  '29. Afloramento Rochoso',  '13. Outras Formações não Florestais',  '14. Agropecuária',  '15. Pastagem',  '18. Agricultura',  '19. Lavoura Temporária',  '39. Soja',  '20. Cana',  '40. Arroz',  '41. Outras Lavouras Temporárias',  '36. Lavoura Perene',  '46. Café (beta)',  '47. Citrus',  '48. Outras Lavouras Perenes',  '9. Silvicultura',  '21. Mosaico de Agricultura e Pastagem',  '22. Área não Vegetada',  '23. Praia, Duna e Areal',  '24. Área Urbanizada',  '30. Mineração',  '25. Outras Áreas não Vegetadas',  '26. Corpo Dágua',  '33. Rio, Lago e Oceano',  '31. Aquicultura',  '27. Não Observado'];
var numes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34];  
// Add color and and names
for (var i = 0; i < 18; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)
//Map.add(legend);
 var panel2 = ui.Panel({style: {width: '100%'}})
    .add(ui.Label('Fontes: Dados carbono da NASA LP DAAC at the USGS EROS Center - Produtividade Primária Bruta (GPP) do satélite MODIS MOD17A2H V6 é um composto cumulativo de 8 dias com resolução de 500 m. O produto é baseado no conceito de eficiência de uso de radiação e pode ser potencialmente usado como entradas para modelos de dados para calcular a energia terrestre, carbono, processos do ciclo da água e biogeoquímica da vegetação; O produto MOD17A3HGF V6 fornece informações sobre a produtividade primária líquida (NPP) anual com resolução de pixel de 500 m. NPP anual é derivado da soma de todos os produtos de fotossíntese líquida (PSN) de 8 dias (MOD17A2H) de um determinado ano. O valor PSN é a diferença da Produtividade Primária Bruta (GPP) e da Respiração de Manutenção (MR) (GPP-MR); Dados uso do solo e limites áreas protegidas do https://mapbiomas.org/ Coleção 7 (1985-2021) e Histórico de desmatamento do https://mapbiomas.org/metodo-desmatamento (2000-2019).' )); 
panel.widgets().set(1, legendarea2).set(2, legendarea).set(3, inspector0014).set(4, inspector0015).set(5, inspector0016).set(6, inspector00).set(7, inspector001).set(8, inspector0tChaB).set(9, inspector0tChaL).set(10, inspector0tChaLanos).set(11, inspector0tChaT).set(12, inspector002).set(13, inspector0013).set(14, inspector007).set(15, inspector0010).set(16, inspector0011).set(17, inspector006).set(18, inspector0012).set(19, inspector003).set(20, inspector004).set(21, chart20).set(22, chart0).set(23, legend).set(24, panel2);
//});
// Add the panel to the ui.root.
ui.root.add(panel);