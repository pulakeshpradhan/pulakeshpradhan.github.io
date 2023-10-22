//limites da propriedade certificada conforme memorial descritivo     
var limites = new ee.FeatureCollection([
  ee.Feature(
    ee.Geometry.Polygon([
[ -58.04305569, -9.234487102 ],
[ -58.04345412, -9.235414454 ],
[ -58.04507244, -9.237326831 ],
[ -58.04728822, -9.239945248 ],
[ -58.04950401, -9.242563664 ],
[ -58.05171046, -9.24517033 ],
[ -58.05391691, -9.247776996 ],
[ -58.05612336, -9.250383662 ],
[ -58.05831984, -9.252978908 ],
[ -58.06051632, -9.255574153 ],
[ -58.0627128, -9.258169399 ],
[ -58.07581444, -9.273649624 ],
[ -58.07651072, -9.274472307 ],
[ -58.07616734, -9.271034064 ],
[ -58.07921761, -9.267254785 ],
[ -58.08019993, -9.269375255 ],
[ -58.08256242, -9.271552692 ],
[ -58.08819032, -9.272411063 ],
[ -58.09024806, -9.270806273 ],
[ -58.09052006, -9.258071259 ],
[ -58.094328, -9.254008369 ],
[ -58.09598085, -9.250620245 ],
[ -58.1004847, -9.246421969 ],
[ -58.1073091, -9.246015097 ],
[ -58.11026172, -9.243554215 ],
[ -58.11200491, -9.24021603 ],
[ -58.1138078, -9.238669368 ],
[ -58.11834063, -9.238731517 ],
[ -58.11971913, -9.235723446 ],
[ -58.12044758, -9.228906696 ],
[ -58.12274025, -9.226458716 ],
[ -58.14321497, -9.222937506 ],
[ -58.14411245, -9.220767852 ],
[ -58.14201533, -9.216508046 ],
[ -58.13269178, -9.215700816 ],
[ -58.13642087, -9.213866834 ],
[ -58.13840206, -9.211896611 ],
[ -58.14080514, -9.206700284 ],
[ -58.14249012, -9.208739132 ],
[ -58.14529091, -9.20736855 ],
[ -58.14584267, -9.20313067 ],
[ -58.14825836, -9.203547511 ],
[ -58.15121351, -9.201180421 ],
[ -58.14222997, -9.192265272 ],
[ -58.12078895, -9.170050252 ],
[ -58.04305569, -9.234487102 ]
]),
    {'value': 1})  ]);
//Adiciona Mapa Limites
Map.addLayer(limites.style({
                color: '750000',
                width: 2,
                fillColor: '75000055',
            }), {},  'Propriedade');
Map.centerObject(limites, 12);
//Limites geográficos de áreas de referência fornecidas por MapBiomas
var TI = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/ESTATISTICAS/COLECAO6/indigenous_land');
//print(TI.limit(5));
Map.addLayer(TI.style({
                color: 'ffff00',
                width: 1,
                fillColor: 'ffff0033',
            }), {}, 'Terras Indígenas', false);
var UCPIF = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/ESTATISTICAS/COLECAO6/federal_conservation_units_integral_protection');
//print(UCPIF.limit(5));
Map.addLayer(UCPIF.style({
                color: '005500',
                width: 1,
                fillColor: '00550033',
            }), {}, 'UCPIF', false);
var UCUSF = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/ESTATISTICAS/COLECAO6/federal_conservation_units_sustainable_use');
//print(UCUSF.limit(5));
Map.addLayer(UCUSF.style({
                color: '558800',
                width: 1,
                fillColor: '55880033',
            }), {}, 'UCUSF', false);   
var UCUSE = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/ESTATISTICAS/COLECAO6/state_conservation_units_sustainable_use');
//print(UCUSE.limit(5));
Map.addLayer(UCUSE.style({
                color: '88ff00',
                width: 1,
                fillColor: '88ff0033',
            }), {}, 'UCUSE', false);  
var UCPIE = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/ESTATISTICAS/COLECAO6/state_conservation_units_integral_protection');
//print(UCPIF.limit(5));
Map.addLayer(UCPIE.style({
                color: '008800',
                width: 1,
                fillColor: '00880033',
            }), {}, 'UCPIE', false);            
var Quilombos = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/ESTATISTICAS/COLECAO6/quilombo');
//print(Quilombos.limit(5));
Map.addLayer(Quilombos.style({
                color: '880055',
                width: 1,
                fillColor: '88005533',
            }), {}, 'Quilombos', false);
var Semiarido = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/ESTATISTICAS/COLECAO6/semiarid');
//print(Semiarido.limit(5));
Map.addLayer(Semiarido.style({
                color: '880000',
                width: 1,
                fillColor: '88000033',
            }), {}, 'Semiárido', false);   
var Mata_Atlantica = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/ESTATISTICAS/COLECAO6/atlantic_forest_law');
//print(Mata_Atlantica.limit(5));
Map.addLayer(Mata_Atlantica.style({
                color: '555555',
                width: 1,
                fillColor: '55555533',
            }), {}, 'Lei da Mata Atlântica', false);             
var Biosfera = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/ESTATISTICAS/COLECAO6/biosphere_reserve');
//print(Biosfera.limit(5));
Map.addLayer(Biosfera.style({
                color: '885500',
                width: 1,
                fillColor: '88550033',
            }), {}, 'Reservas da Biosfera', false);              
var biomes = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/biomas');
//print(Biosfera.limit(5));
Map.addLayer(biomes.style({
                color: '885500',
                width: 1,
                fillColor: '88550033',
            }), {}, 'Biomas', false);              
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
// Asset mapbiomas Uso do Solo
var asset = "projects/mapbiomas-workspace/public/collection6/mapbiomas_collection60_integration_v1";
// LULC mapbiomas image
var mapbiomas = ee.Image(asset).selfMask();
//Integração anual (200 a 2022) dos dados de Uso do Solo e carbono
var mapbiomas_2000 = mapbiomas.select('classification_' + 2000);
Map.addLayer(mapbiomas_2000.sldStyle(sld_intervals), {}, 'Mapbiomas uso 2000', false);
 var mapbiomas_reclass_2000 =   mapbiomas_2000.remap([0, 1,	3,	4,	5,	9,	10,	11,	12,	13,	14,	15,	18,	19,	20,	21,	22,	23,	24,	25,	26,	27,	29,	30,	31,	32,	33,	36,	39,	40,	41,	46,	47,	48,	49],
[0,	1,	1,	1,	1,	0,	1,	1,	1,	1,	0,	0,	0,	0,	0,	0,	0,	1,	0,	0,	0,	0,	1,	0,	0,	1,	0,	0,	0,	0,	0,	0,	0,	0, 1]);
Map.addLayer(mapbiomas_reclass_2000, reclass, '2000 rec', false);
var netYearly2000 = ee.ImageCollection("MODIS/006/MOD17A3HGF")
 .filter(ee.Filter.date('2000-01-01', '2000-12-31')).select('Npp');
// Convert T carbono m² para t carbono hectare
var netYearly2000 = netYearly2000.map(function(image) {
  return image.divide(250).set(
      'system:time_start', image.get('system:time_start'));});
var Npp2000 = netYearly2000.mean().multiply(mapbiomas_reclass_2000)
Map.addLayer(Npp2000, PsnNetVis, 'NPP_2000', false);
var mapbiomas_2001 = mapbiomas.select('classification_' + 2001);
Map.addLayer(mapbiomas_2001.sldStyle(sld_intervals), {}, 'Mapbiomas uso 2001', false);
 var mapbiomas_reclass_2001 =   mapbiomas_2001.remap([0, 1, 3, 4, 5, 9, 10, 11, 12, 13, 14, 15, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 32, 33, 36, 39, 40, 41, 46, 47, 48, 49],
[0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
Map.addLayer(mapbiomas_reclass_2001, reclass, '2001 rec', false);
var netYearly2001 = ee.ImageCollection("MODIS/006/MOD17A3HGF")
 .filter(ee.Filter.date('2001-01-01', '2001-12-31')).select('Npp');
// Convert T carbono m² para t carbono hectare
var netYearly2001 = netYearly2001.map(function(image) {
  return image.divide(250).set(
      'system:time_start', image.get('system:time_start'));});
var Npp2001 = netYearly2001.mean().multiply(mapbiomas_reclass_2001)
Map.addLayer(Npp2001, PsnNetVis, 'NPP_2001', false);
var mapbiomas_2002 = mapbiomas.select('classification_' + 2002);
Map.addLayer(mapbiomas_2002.sldStyle(sld_intervals), {}, 'Mapbiomas uso 2002', false);
 var mapbiomas_reclass_2002 =   mapbiomas_2002.remap([0, 1, 3, 4, 5, 9, 10, 11, 12, 13, 14, 15, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 32, 33, 36, 39, 40, 41, 46, 47, 48, 49],
[0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
Map.addLayer(mapbiomas_reclass_2002, reclass, '2002 rec', false);
var netYearly2002 = ee.ImageCollection("MODIS/006/MOD17A3HGF")
 .filter(ee.Filter.date('2002-01-01', '2002-12-31')).select('Npp');
// Convert T carbono m² para t carbono hectare
var netYearly2002 = netYearly2002.map(function(image) {
  return image.divide(250).set(
      'system:time_start', image.get('system:time_start'));});
var Npp2002 = netYearly2002.mean().multiply(mapbiomas_reclass_2002)
Map.addLayer(Npp2002, PsnNetVis, 'NPP_2002', false);
var mapbiomas_2003 = mapbiomas.select('classification_' + 2003);
Map.addLayer(mapbiomas_2003.sldStyle(sld_intervals), {}, 'Mapbiomas uso 2003', false);
 var mapbiomas_reclass_2003 =   mapbiomas_2003.remap([0, 1, 3, 4, 5, 9, 10, 11, 12, 13, 14, 15, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 32, 33, 36, 39, 40, 41, 46, 47, 48, 49],
[0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
Map.addLayer(mapbiomas_reclass_2003, reclass, '2003 rec', false);
var netYearly2003 = ee.ImageCollection("MODIS/006/MOD17A3HGF")
 .filter(ee.Filter.date('2003-01-01', '2003-12-31')).select('Npp');
// Convert T carbono m² para t carbono hectare
var netYearly2003 = netYearly2003.map(function(image) {
  return image.divide(250).set(
      'system:time_start', image.get('system:time_start'));});
var Npp2003 = netYearly2003.mean().multiply(mapbiomas_reclass_2003)
Map.addLayer(Npp2003, PsnNetVis, 'NPP_2003', false);
var mapbiomas_2004 = mapbiomas.select('classification_' + 2004);
Map.addLayer(mapbiomas_2004.sldStyle(sld_intervals), {}, 'Mapbiomas uso 2004', false);
 var mapbiomas_reclass_2004 =   mapbiomas_2004.remap([0, 1, 3, 4, 5, 9, 10, 11, 12, 13, 14, 15, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 32, 33, 36, 39, 40, 41, 46, 47, 48, 49],
[0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
Map.addLayer(mapbiomas_reclass_2004, reclass, '2004 rec', false);
var netYearly2004 = ee.ImageCollection("MODIS/006/MOD17A3HGF")
 .filter(ee.Filter.date('2004-01-01', '2004-12-31')).select('Npp');
// Convert T carbono m² para t carbono hectare
var netYearly2004 = netYearly2004.map(function(image) {
  return image.divide(250).set(
      'system:time_start', image.get('system:time_start'));});
var Npp2004 = netYearly2004.mean().multiply(mapbiomas_reclass_2004)
Map.addLayer(Npp2004, PsnNetVis, 'NPP_2004', false);
var mapbiomas_2005 = mapbiomas.select('classification_' + 2005);
Map.addLayer(mapbiomas_2005.sldStyle(sld_intervals), {}, 'Mapbiomas uso 2005', false);
 var mapbiomas_reclass_2005 =   mapbiomas_2005.remap([0, 1, 3, 4, 5, 9, 10, 11, 12, 13, 14, 15, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 32, 33, 36, 39, 40, 41, 46, 47, 48, 49],
[0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
Map.addLayer(mapbiomas_reclass_2005, reclass, '2005 rec', false);
var netYearly2005 = ee.ImageCollection("MODIS/006/MOD17A3HGF")
 .filter(ee.Filter.date('2005-01-01', '2005-12-31')).select('Npp');
// Convert T carbono m² para t carbono hectare
var netYearly2005 = netYearly2005.map(function(image) {
  return image.divide(250).set(
      'system:time_start', image.get('system:time_start'));});
var Npp2005 = netYearly2005.mean().multiply(mapbiomas_reclass_2005)
Map.addLayer(Npp2005, PsnNetVis, 'NPP_2005', false);
var mapbiomas_2006 = mapbiomas.select('classification_' + 2006);
Map.addLayer(mapbiomas_2006.sldStyle(sld_intervals), {}, 'Mapbiomas uso 2006', false);
 var mapbiomas_reclass_2006 =   mapbiomas_2006.remap([0, 1, 3, 4, 5, 9, 10, 11, 12, 13, 14, 15, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 32, 33, 36, 39, 40, 41, 46, 47, 48, 49],
[0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
Map.addLayer(mapbiomas_reclass_2006, reclass, '2006 rec', false);
var netYearly2006 = ee.ImageCollection("MODIS/006/MOD17A3HGF")
 .filter(ee.Filter.date('2006-01-01', '2006-12-31')).select('Npp');
// Convert T carbono m² para t carbono hectare
var netYearly2006 = netYearly2006.map(function(image) {
  return image.divide(250).set(
      'system:time_start', image.get('system:time_start'));});
var Npp2006 = netYearly2006.mean().multiply(mapbiomas_reclass_2006)
Map.addLayer(Npp2006, PsnNetVis, 'NPP_2006', false);
var mapbiomas_2007 = mapbiomas.select('classification_' + 2007);
Map.addLayer(mapbiomas_2007.sldStyle(sld_intervals), {}, 'Mapbiomas uso 2007', false);
 var mapbiomas_reclass_2007 =   mapbiomas_2007.remap([0, 1, 3, 4, 5, 9, 10, 11, 12, 13, 14, 15, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 32, 33, 36, 39, 40, 41, 46, 47, 48, 49],
[0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
Map.addLayer(mapbiomas_reclass_2007, reclass, '2007 rec', false);
var netYearly2007 = ee.ImageCollection("MODIS/006/MOD17A3HGF")
 .filter(ee.Filter.date('2007-01-01', '2007-12-31')).select('Npp');
// Convert T carbono m² para t carbono hectare
var netYearly2007 = netYearly2007.map(function(image) {
  return image.divide(250).set(
      'system:time_start', image.get('system:time_start'));});
var Npp2007 = netYearly2007.mean().multiply(mapbiomas_reclass_2007)
Map.addLayer(Npp2007, PsnNetVis, 'NPP_2007', false);
var mapbiomas_2008 = mapbiomas.select('classification_' + 2008);
Map.addLayer(mapbiomas_2008.sldStyle(sld_intervals), {}, 'Mapbiomas uso 2008', false);
 var mapbiomas_reclass_2008 =   mapbiomas_2008.remap([0, 1, 3, 4, 5, 9, 10, 11, 12, 13, 14, 15, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 32, 33, 36, 39, 40, 41, 46, 47, 48, 49],
[0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
Map.addLayer(mapbiomas_reclass_2008, reclass, '2008 rec', false);
var netYearly2008 = ee.ImageCollection("MODIS/006/MOD17A3HGF")
 .filter(ee.Filter.date('2008-01-01', '2008-12-31')).select('Npp');
// Convert T carbono m² para t carbono hectare
var netYearly2008 = netYearly2008.map(function(image) {
  return image.divide(250).set(
      'system:time_start', image.get('system:time_start'));});
var Npp2008 = netYearly2008.mean().multiply(mapbiomas_reclass_2008)
Map.addLayer(Npp2008, PsnNetVis, 'NPP_2008', false);
var mapbiomas_2009 = mapbiomas.select('classification_' + 2009);
Map.addLayer(mapbiomas_2009.sldStyle(sld_intervals), {}, 'Mapbiomas uso 2009', false);
 var mapbiomas_reclass_2009 =   mapbiomas_2009.remap([0, 1, 3, 4, 5, 9, 10, 11, 12, 13, 14, 15, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 32, 33, 36, 39, 40, 41, 46, 47, 48, 49],
[0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
Map.addLayer(mapbiomas_reclass_2009, reclass, '2009 rec', false);
var netYearly2009 = ee.ImageCollection("MODIS/006/MOD17A3HGF")
 .filter(ee.Filter.date('2009-01-01', '2009-12-31')).select('Npp');
// Convert T carbono m² para t carbono hectare
var netYearly2009 = netYearly2009.map(function(image) {
  return image.divide(250).set(
      'system:time_start', image.get('system:time_start'));});
var Npp2009 = netYearly2009.mean().multiply(mapbiomas_reclass_2009)
Map.addLayer(Npp2009, PsnNetVis, 'NPP_2009', false);
var mapbiomas_2010 = mapbiomas.select('classification_' + 2010);
Map.addLayer(mapbiomas_2010.sldStyle(sld_intervals), {}, 'Mapbiomas uso 2010', false);
 var mapbiomas_reclass_2010 =   mapbiomas_2010.remap([0, 1, 3, 4, 5, 9, 10, 11, 12, 13, 14, 15, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 32, 33, 36, 39, 40, 41, 46, 47, 48, 49],
[0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
Map.addLayer(mapbiomas_reclass_2010, reclass, '2010 rec', false);
var netYearly2010 = ee.ImageCollection("MODIS/006/MOD17A3HGF")
 .filter(ee.Filter.date('2010-01-01', '2010-12-31')).select('Npp');
// Convert T carbono m² para t carbono hectare
var netYearly2010 = netYearly2010.map(function(image) {
  return image.divide(250).set(
      'system:time_start', image.get('system:time_start'));});
var Npp2010 = netYearly2010.mean().multiply(mapbiomas_reclass_2010)
Map.addLayer(Npp2010, PsnNetVis, 'NPP_2010', false);
var mapbiomas_2011 = mapbiomas.select('classification_' + 2011);
Map.addLayer(mapbiomas_2011.sldStyle(sld_intervals), {}, 'Mapbiomas uso 2011', false);
 var mapbiomas_reclass_2011 =   mapbiomas_2011.remap([0, 1, 3, 4, 5, 9, 10, 11, 12, 13, 14, 15, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 32, 33, 36, 39, 40, 41, 46, 47, 48, 49],
[0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
Map.addLayer(mapbiomas_reclass_2011, reclass, '2011 rec', false);
var netYearly2011 = ee.ImageCollection("MODIS/006/MOD17A3HGF")
 .filter(ee.Filter.date('2011-01-01', '2011-12-31')).select('Npp');
// Convert T carbono m² para t carbono hectare
var netYearly2011 = netYearly2011.map(function(image) {
  return image.divide(250).set(
      'system:time_start', image.get('system:time_start'));});
var Npp2011 = netYearly2011.mean().multiply(mapbiomas_reclass_2011)
Map.addLayer(Npp2011, PsnNetVis, 'NPP_2011', false);
var mapbiomas_2012 = mapbiomas.select('classification_' + 2012);
Map.addLayer(mapbiomas_2012.sldStyle(sld_intervals), {}, 'Mapbiomas uso 2012', false);
 var mapbiomas_reclass_2012 =   mapbiomas_2012.remap([0, 1, 3, 4, 5, 9, 10, 11, 12, 13, 14, 15, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 32, 33, 36, 39, 40, 41, 46, 47, 48, 49],
[0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
Map.addLayer(mapbiomas_reclass_2012, reclass, '2012 rec', false);
var netYearly2012 = ee.ImageCollection("MODIS/006/MOD17A3HGF")
 .filter(ee.Filter.date('2012-01-01', '2012-12-31')).select('Npp');
// Convert T carbono m² para t carbono hectare
var netYearly2012 = netYearly2012.map(function(image) {
  return image.divide(250).set(
      'system:time_start', image.get('system:time_start'));});
var Npp2012 = netYearly2012.mean().multiply(mapbiomas_reclass_2012)
Map.addLayer(Npp2012, PsnNetVis, 'NPP_2012', false);
var mapbiomas_2013 = mapbiomas.select('classification_' + 2013);
Map.addLayer(mapbiomas_2013.sldStyle(sld_intervals), {}, 'Mapbiomas uso 2013', false);
 var mapbiomas_reclass_2013 =   mapbiomas_2013.remap([0, 1, 3, 4, 5, 9, 10, 11, 12, 13, 14, 15, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 32, 33, 36, 39, 40, 41, 46, 47, 48, 49],
[0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
Map.addLayer(mapbiomas_reclass_2013, reclass, '2013 rec', false);
var netYearly2013 = ee.ImageCollection("MODIS/006/MOD17A3HGF")
 .filter(ee.Filter.date('2013-01-01', '2013-12-31')).select('Npp');
// Convert T carbono m² para t carbono hectare
var netYearly2013 = netYearly2013.map(function(image) {
  return image.divide(250).set(
      'system:time_start', image.get('system:time_start'));});
var Npp2013 = netYearly2013.mean().multiply(mapbiomas_reclass_2013)
Map.addLayer(Npp2013, PsnNetVis, 'NPP_2013', false);
var mapbiomas_2014 = mapbiomas.select('classification_' + 2014);
Map.addLayer(mapbiomas_2014.sldStyle(sld_intervals), {}, 'Mapbiomas uso 2014', false);
 var mapbiomas_reclass_2014 =   mapbiomas_2014.remap([0, 1, 3, 4, 5, 9, 10, 11, 12, 13, 14, 15, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 32, 33, 36, 39, 40, 41, 46, 47, 48, 49],
[0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
Map.addLayer(mapbiomas_reclass_2014, reclass, '2014 rec', false);
var netYearly2014 = ee.ImageCollection("MODIS/006/MOD17A3HGF")
 .filter(ee.Filter.date('2014-01-01', '2014-12-31')).select('Npp');
// Convert T carbono m² para t carbono hectare
var netYearly2014 = netYearly2014.map(function(image) {
  return image.divide(250).set(
      'system:time_start', image.get('system:time_start'));});
var Npp2014 = netYearly2014.mean().multiply(mapbiomas_reclass_2014)
Map.addLayer(Npp2014, PsnNetVis, 'NPP_2014', false);
var mapbiomas_2015 = mapbiomas.select('classification_' + 2015);
Map.addLayer(mapbiomas_2015.sldStyle(sld_intervals), {}, 'Mapbiomas uso 2015', false);
 var mapbiomas_reclass_2015 =   mapbiomas_2015.remap([0, 1, 3, 4, 5, 9, 10, 11, 12, 13, 14, 15, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 32, 33, 36, 39, 40, 41, 46, 47, 48, 49],
[0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
Map.addLayer(mapbiomas_reclass_2015, reclass, '2015 rec', false);
var netYearly2015 = ee.ImageCollection("MODIS/006/MOD17A3HGF")
 .filter(ee.Filter.date('2015-01-01', '2015-12-31')).select('Npp');
// Convert T carbono m² para t carbono hectare
var netYearly2015 = netYearly2015.map(function(image) {
  return image.divide(250).set(
      'system:time_start', image.get('system:time_start'));});
var Npp2015 = netYearly2015.mean().multiply(mapbiomas_reclass_2015)
Map.addLayer(Npp2015, PsnNetVis, 'NPP_2015', false);
var mapbiomas_2016 = mapbiomas.select('classification_' + 2016);
Map.addLayer(mapbiomas_2016.sldStyle(sld_intervals), {}, 'Mapbiomas uso 2016', false);
 var mapbiomas_reclass_2016 =   mapbiomas_2016.remap([0, 1, 3, 4, 5, 9, 10, 11, 12, 13, 14, 15, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 32, 33, 36, 39, 40, 41, 46, 47, 48, 49],
[0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
Map.addLayer(mapbiomas_reclass_2016, reclass, '2016 rec', false);
var netYearly2016 = ee.ImageCollection("MODIS/006/MOD17A3HGF")
 .filter(ee.Filter.date('2016-01-01', '2016-12-31')).select('Npp');
// Convert T carbono m² para t carbono hectare
var netYearly2016 = netYearly2016.map(function(image) {
  return image.divide(250).set(
      'system:time_start', image.get('system:time_start'));});
var Npp2016 = netYearly2016.mean().multiply(mapbiomas_reclass_2016)
Map.addLayer(Npp2016, PsnNetVis, 'NPP_2016', false);
var mapbiomas_2017 = mapbiomas.select('classification_' + 2017);
Map.addLayer(mapbiomas_2017.sldStyle(sld_intervals), {}, 'Mapbiomas uso 2017', false);
 var mapbiomas_reclass_2017 =   mapbiomas_2017.remap([0, 1, 3, 4, 5, 9, 10, 11, 12, 13, 14, 15, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 32, 33, 36, 39, 40, 41, 46, 47, 48, 49],
[0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
Map.addLayer(mapbiomas_reclass_2017, reclass, '2017 rec', false);
var netYearly2017 = ee.ImageCollection("MODIS/006/MOD17A3HGF")
 .filter(ee.Filter.date('2017-01-01', '2017-12-31')).select('Npp');
// Convert T carbono m² para t carbono hectare
var netYearly2017 = netYearly2017.map(function(image) {
  return image.divide(250).set(
      'system:time_start', image.get('system:time_start'));});
var Npp2017 = netYearly2017.mean().multiply(mapbiomas_reclass_2017)
Map.addLayer(Npp2017, PsnNetVis, 'NPP_2017', false);
var mapbiomas_2018 = mapbiomas.select('classification_' + 2018);
Map.addLayer(mapbiomas_2018.sldStyle(sld_intervals), {}, 'Mapbiomas uso 2018', false);
 var mapbiomas_reclass_2018 =   mapbiomas_2018.remap([0, 1, 3, 4, 5, 9, 10, 11, 12, 13, 14, 15, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 32, 33, 36, 39, 40, 41, 46, 47, 48, 49],
[0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
Map.addLayer(mapbiomas_reclass_2018, reclass, '2018 rec', false);
var netYearly2018 = ee.ImageCollection("MODIS/006/MOD17A3HGF")
 .filter(ee.Filter.date('2018-01-01', '2018-12-31')).select('Npp');
// Convert T carbono m² para t carbono hectare
var netYearly2018 = netYearly2018.map(function(image) {
  return image.divide(250).set(
      'system:time_start', image.get('system:time_start'));});
var Npp2018 = netYearly2018.mean().multiply(mapbiomas_reclass_2018)
Map.addLayer(Npp2018, PsnNetVis, 'NPP_2018', false);
var mapbiomas_2019 = mapbiomas.select('classification_' + 2019);
Map.addLayer(mapbiomas_2019.sldStyle(sld_intervals), {}, 'Mapbiomas uso 2019', false);
 var mapbiomas_reclass_2019 =   mapbiomas_2019.remap([0, 1, 3, 4, 5, 9, 10, 11, 12, 13, 14, 15, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 32, 33, 36, 39, 40, 41, 46, 47, 48, 49],
[0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
Map.addLayer(mapbiomas_reclass_2019, reclass, '2019 rec', false);
var netYearly2019 = ee.ImageCollection("MODIS/006/MOD17A3HGF")
 .filter(ee.Filter.date('2019-01-01', '2019-12-31')).select('Npp');
// Convert T carbono m² para t carbono hectare
var netYearly2019 = netYearly2019.map(function(image) {
  return image.divide(250).set(
      'system:time_start', image.get('system:time_start'));});
var Npp2019 = netYearly2019.mean().multiply(mapbiomas_reclass_2019)
Map.addLayer(Npp2019, PsnNetVis, 'NPP_2019', false);
var mapbiomas_2020 = mapbiomas.select('classification_' + 2020);
Map.addLayer(mapbiomas_2020.sldStyle(sld_intervals), {}, 'Mapbiomas uso 2020', false);
 var mapbiomas_reclass_2020 =   mapbiomas_2020.remap([0, 1, 3, 4, 5, 9, 10, 11, 12, 13, 14, 15, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 32, 33, 36, 39, 40, 41, 46, 47, 48, 49],
[0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
Map.addLayer(mapbiomas_reclass_2020, reclass, '2020 rec', false);
var netYearly2020 = ee.ImageCollection("MODIS/006/MOD17A3HGF")
 .filter(ee.Filter.date('2020-01-01', '2020-12-31')).select('Npp');
// Convert T carbono m² para t carbono hectare
var netYearly2020 = netYearly2020.map(function(image) {
  return image.divide(250).set(
      'system:time_start', image.get('system:time_start'));});
var Npp2020 = netYearly2020.mean().multiply(mapbiomas_reclass_2020)
Map.addLayer(Npp2020, PsnNetVis, 'NPP_2020', false);
//Buffer limites
var limites1 = limites.map(function(feature){
  return feature.buffer(3000);
});
//Total de Carbono em área de vegetação preservada
var Npp = ee.ImageCollection(Npp2020).merge(Npp2019).merge(Npp2018).merge(Npp2017).merge(Npp2016).merge(Npp2015).merge(Npp2014).merge(Npp2013).merge(Npp2012).merge(Npp2011).merge(Npp2010).merge(Npp2009).merge(Npp2008).merge(Npp2007).merge(Npp2006).merge(Npp2005).merge(Npp2004).merge(Npp2003).merge(Npp2002).merge(Npp2001).merge(Npp2000).sum().clip(limites)
//Total de carbono para linha de base
var base1 = ee.ImageCollection((netYearly2020).min()).merge((netYearly2019).min()).merge((netYearly2018).min()).merge((netYearly2017).min()).merge((netYearly2016).min()).merge((netYearly2015).min()).merge((netYearly2014).min()).merge((netYearly2013).min()).merge((netYearly2012).min()).merge((netYearly2011).min()).merge((netYearly2010).min()).merge((netYearly2009).min()).merge((netYearly2008).min()).merge((netYearly2007).min()).merge((netYearly2006).min()).merge((netYearly2005).min()).merge((netYearly2004).min()).merge((netYearly2003).min()).merge((netYearly2002).min()).merge((netYearly2001).min()).merge((netYearly2000).min()).sum();
Map.addLayer(base1,PsnNetVis1, 'Linha de Base', false);
//Total de Carbono para referência
//var referencia1 = ee.ImageCollection((netYearly2020).max()).merge((netYearly2019).max()).merge((netYearly2018).max()).merge((netYearly2017).max()).merge((netYearly2016).max()).merge((netYearly2015).max()).merge((netYearly2014).max()).merge((netYearly2013).max()).merge((netYearly2012).max()).merge((netYearly2011).max()).merge((netYearly2010).max()).merge((netYearly2009).max()).merge((netYearly2008).max()).merge((netYearly2007).max()).merge((netYearly2006).max()).merge((netYearly2005).max()).merge((netYearly2004).max()).merge((netYearly2003).max()).merge((netYearly2002).max()).merge((netYearly2001).max()).merge((netYearly2000).max()).max().clip(limites1);
// Cálculo da Linha de Base.
var meanDictionary = base1.reduceRegion({
  reducer: ee.Reducer.max(),
  geometry: limites1,
  scale: 500,
  maxPixels: 1e9
});
var meanDictionary1 = base1.reduceRegion({
  reducer: ee.Reducer.min(),
  geometry: limites1,
  scale: 500,
  maxPixels: 1e9
});
var referencia1 = ee.Number(ee.Number(
  meanDictionary.get('Npp')))
var base = ee.Number(ee.Number(
  meanDictionary1.get('Npp')))
var prop = ee.Number(ee.Number(
  meanDictionary1.get('Npp')).divide(ee.Number(
  meanDictionary.get('Npp')))).add(-1).multiply(-100)
//print(prop)
//Map.addLayer(referencia1,PsnNetVis1, 'Referencia', false);
//Soma de anos com Carbono em vegetação preservada
var mapbiomas = mapbiomas_reclass_2020.add(mapbiomas_reclass_2019).add(mapbiomas_reclass_2018).add(mapbiomas_reclass_2017).add(mapbiomas_reclass_2016).add(mapbiomas_reclass_2016).add(mapbiomas_reclass_2015).add(mapbiomas_reclass_2014).add(mapbiomas_reclass_2013).add(mapbiomas_reclass_2012).add(mapbiomas_reclass_2011).add(mapbiomas_reclass_2010).add(mapbiomas_reclass_2009).add(mapbiomas_reclass_2008).add(mapbiomas_reclass_2007).add(mapbiomas_reclass_2006).add(mapbiomas_reclass_2005).add(mapbiomas_reclass_2004).add(mapbiomas_reclass_2003).add(mapbiomas_reclass_2002).add(mapbiomas_reclass_2001).add(mapbiomas_reclass_2000)
Map.addLayer(mapbiomas,PsnNetVis3, 'Mapbiomas anos', false);
//Área com carbono em vegetação preservada
var Nppgt =Npp.gte(1)
Map.addLayer(Npp, PsnNetVis1, 'NPP');
//Valor adicional por Biomas
var biomes = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/biomas');
//print(Biosfera.limit(5));
Map.addLayer(biomes.style({
                color: '885500',
                width: 1,
                fillColor: '88550033',
            }), {}, 'Biomas', false);              
var biomes_reduced = biomes.reduceToImage(['featureid'], 'mode');
var biomesremap = biomes_reduced .remap([1,2,3,4,5,6],
           [0.01,0.10,0.02,0.08,0.04,0.06,]);
var Parametros_Biomas = {
  min: 0.01,
  max: 0.10,
  palette: [
"#FFFF00",
"#FFD700",
"#EEDD82",
"#DAA520",
"#B8860B",
"#BC8F8F",
  ]};
Map.addLayer(biomesremap, Parametros_Biomas,'Biomas', false);   
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
  max: 2020,
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
                  .filter(ee.Filter.date('2000-01-01', '2020-12-31')).select('Gpp');
// Conversão de t de carbono por m² para t de carbono hectares
var dataset = dataset.map(function(image) {
  return image.divide(250).set(
      'system:time_start', image.get('system:time_start'));
});
var gpp = dataset.max().clip(limites).multiply(Nppgt);
var gpp2 = dataset.max().multiply(Nppgt)
//Dados da produção liquida anual de carbono para o gráfico
var netYearly = ee.ImageCollection("MODIS/006/MOD17A3HGF")
 .filter(ee.Filter.date('2000-01-01', '2020-12-31')).select('Npp');
// Convert pressure levels from Pa to hPa - Example for surface pressure
var netYearly = netYearly.map(function(image) {
  return image.divide(250).set(
      'system:time_start', image.get('system:time_start'));
});
//delimitação do Projeto para cáculo de área
var npp3 = netYearly.max().clip(limites)
//Cálculo do valor final de carbono pela adicionalidade
var tc12 = (Npp.add(gpp2)).multiply((prop).divide(100))
//Transformação de t de carbono para t de CO²
var tco2e = tc12.multiply(3.67)
//Adicional de Terra Indígena
var PI = tco2e.multiply(0.0);
//Adicional Reserva da Biosfera
var RBio = tco2e.multiply(0.0);
//Adicional Semiárido
var semiarido = tco2e.multiply(0);
//Adicional Reservatorios
var reservatorio = tco2e.multiply(0)
//Adicional Biomas
var biomass = tco2e.multiply(biomesremap)
//Adicional Total
var c121 = PI.add(RBio).add(semiarido).add(reservatorio).add(biomass)
//Total de CO²e
var c12 = tco2e.add(c121)
//Percentagem Adicionall
var percentagem = (c121.divide(tco2e)).multiply(100);
//Total de CO²e em Dllar
var U$D = c12.multiply(10)
//Total de CO²e em Reais
var R$ = U$D.multiply(4.7)
//Paleta de cores carbono
var gppVis = {
  min: 0.0,
  max: 6000.0,
  palette: ['bbe029', '0a9501', '074b03'],
};
var PsnNetVis = {
  min: 0.0,
  max: 15000.0,
  palette: ['bbe029', '0a9501', '074b03'],
};
var PsnNetVis1 = {
  min: 0.0,
  max: 100.0,
  palette: ['bbe029', '0a9501', '074b03'],
};
var Vis = {
  min: 0.0,
  max: 600.0,
  palette: ['bbe029', '0a9501', '074b03'],
};
var table = ee.FeatureCollection(limites);
//Paineis Legendas
var legendarea = ui.Panel([ui.Label('Calculando área de floresta')]);
var legendarea2 = ui.Panel([ui.Label('Calculando área da propriedade')]);
//Calculo de áreas
var area_pxa = Npp.gte(1).multiply(ee.Image.pixelArea()) 
                    .reduceRegion(ee.Reducer.sum(),table,30,null,null,false,1e13)
                    .get('Npp')
                  //  print ('Área usando o ee.Image.pixelArea', ee.Number(area_pxa).divide(1e6))
  var area_pxa2 =  ee.Number(area_pxa).divide(1e4)
  // Request the value from the server.
  area_pxa2.evaluate(function(result) {
    // When the server returns the value, show it.
    legendarea.widgets().set(0, ui.Label({
      value: 'Área de floresta íntegra comprovada em hectares: ' + result.toFixed(2),
    }));
});
//Maneira correta de calcular áreas
var area_pxa4 = npp3.gte(1).multiply(ee.Image.pixelArea()) 
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
// Create an empty panel in which to arrange widgets.
// The layout is vertical flow by default.
var panel = ui.Panel({layout: ui.Panel.Layout.flow('vertical'),style: {width: '60%', height: '100%'}})
    .add(ui.Label('Análise de dados espacializada para calcular montante de carbono florestal para o período de 2000 a 2020: PROJETO MANEJO'));
// Create an inspector panel with a horizontal layout.
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
var sampledPoint1w = Npp.reduceRegion(ee.Reducer.sum(), limites, 500);
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
      value: 't Carbono na Linha de Base: ' + result.toFixed(2),      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint6w = referencia1;
  var computedValue6w = referencia1;
  // Request the value from the server and use the results in a function.
  computedValue6w.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector0015.widgets().set(3, ui.Label({
      value: 't Carbono de Referência: ' + result.toFixed(2),      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint7w = prop;
  var computedValue7w = prop;
  // Request the value from the server and use the results in a function.
  computedValue7w.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector0016.widgets().set(3, ui.Label({
      value: 'Adicionalidade de carbono em %: ' + result.toFixed(2),      style: {stretch: 'horizontal'}
    }));
  });
var sampledPoint2w = tc12.reduceRegion(ee.Reducer.sum(), limites, 500);
  var computedValue2w = sampledPoint2w.get('Npp');
  // Request the value from the server and use the results in a function.
  computedValue2w.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector002.widgets().set(3, ui.Label({
      value: 'Safras em Toneladas de Carbono total (NPP+GPP): ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint222w = tco2e.reduceRegion(ee.Reducer.sum(), limites, 500);
  var computedValue222w = sampledPoint222w.get('Npp');
  // Request the value from the server and use the results in a function.
  computedValue222w.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector0013.widgets().set(3, ui.Label({
      value: 'Safras em Toneladas de Carbono total (NPP+GPP) x 3.67 = tCO2e (Toneladas de Dióxido de Carbono equivalente): ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint25w = PI.reduceRegion(ee.Reducer.sum(), limites, 500);
  var computedValue25w = sampledPoint25w.get('Npp');
  // Request the value from the server and use the results in a function.
  computedValue25w.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector005.widgets().set(3, ui.Label({
      value: 'Ganho Adicional TI 50% do total (NPP+GPP): ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint26w = percentagem.reduceRegion(ee.Reducer.max(), limites, 500);
  var computedValue26w = sampledPoint26w.get('Npp');
  // Request the value from the server and use the results in a function.
  computedValue26w.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector006.widgets().set(3, ui.Label({
      value: 'Percentagem Ganho Adicional total (%): ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint27w = RBio.reduceRegion(ee.Reducer.sum(), limites, 500);
  var computedValue27w = sampledPoint27w.get('Npp');
  // Request the value from the server and use the results in a function.
  computedValue27w.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector007.widgets().set(3, ui.Label({
      value: 'Ganho Adicional Res. Biosfera 5% do total (NPP+GPP): ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint28w = semiarido.reduceRegion(ee.Reducer.sum(), limites, 500);
  var computedValue28w = sampledPoint28w.get('Npp');
  // Request the value from the server and use the results in a function.
  computedValue28w.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector008.widgets().set(3, ui.Label({
      value: 'Ganho Adicional Semiárido 10% do total (NPP+GPP): ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint29w = reservatorio.reduceRegion(ee.Reducer.sum(), limites, 500);
  var computedValue29w = sampledPoint29w.get('Npp');
  // Request the value from the server and use the results in a function.
  computedValue29w.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector009.widgets().set(3, ui.Label({
      value: 'Ganho Adicional Zona Influência Reservatorios 15% do total (NPP+GPP): ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint210w = biomass.reduceRegion(ee.Reducer.sum(), limites, 500);
  var computedValue210w = sampledPoint210w.get('Npp');
  // Request the value from the server and use the results in a function.
  computedValue210w.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector0010.widgets().set(3, ui.Label({
      value: 'Ganho Adicional biomas do total (NPP+GPP): ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint211w = c121.reduceRegion(ee.Reducer.sum(), limites, 500);
  var computedValue211w = sampledPoint211w.get('Npp');
  // Request the value from the server and use the results in a function.
  computedValue211w.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector0011.widgets().set(3, ui.Label({
      value: 'Ganho Adicional total de Carbono: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint212w = c12.reduceRegion(ee.Reducer.sum(), limites, 500);
  var computedValue212w = sampledPoint212w.get('Npp');
  // Request the value from the server and use the results in a function.
  computedValue212w.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector0012.widgets().set(3, ui.Label({
      value: 'Ganho Adicional total mais (NPP+GPP): ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint3w = U$D.reduceRegion(ee.Reducer.sum(), limites, 500);
  var computedValue3w = sampledPoint3w.get('Npp');
  // Request the value from the server and use the results in a function.
  computedValue3w.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector003.widgets().set(3, ui.Label({
      value: 'Total em Dollares das Safras em Toneladas (U$D 10,00 a t) de dióxido de carbono equivalente (CO2e = C x 3,67) total (NPP+GPP): U$' + result.toFixed(2),      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint4w = R$.reduceRegion(ee.Reducer.sum(), limites, 500);
  var computedValue4w = sampledPoint4w.get('Npp');
  // Request the value from the server and use the results in a function.
  computedValue4w.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector004.widgets().set(3, ui.Label({
      value: 'Total em Reais das Safras em Toneladas (U$D10,00 a t) e (1U$D a R$4,70) de dióxido de carbono equivalente (CO2e = C x 3,67) total (NPP+GPP): R$' + result.toFixed(2),      style: {stretch: 'horizontal'}
    }));
  });
// ---------------------------------------------------------------
// Visualize Data in a Chart
// ---------------------------------------------------------------
// Chart annual time series of carbon
var chart20 = ui.Chart.image.series({
    imageCollection: netYearly, 
    region: limites, 
    reducer: ee.Reducer.sum(),
    scale: 716
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
    .add(ui.Label('Fontes: Dados carbono da NASA LP DAAC at the USGS EROS Center - Produtividade Primária Bruta (GPP) do satélite MODIS MOD17A2H V6 é um composto cumulativo de 8 dias com resolução de 500 m. O produto é baseado no conceito de eficiência de uso de radiação e pode ser potencialmente usado como entradas para modelos de dados para calcular a energia terrestre, carbono, processos do ciclo da água e biogeoquímica da vegetação; O produto MOD17A3HGF V6 fornece informações sobre a produtividade primária líquida (NPP) anual com resolução de pixel de 500 m. NPP anual é derivado da soma de todos os produtos de fotossíntese líquida (PSN) de 8 dias (MOD17A2H) de um determinado ano. O valor PSN é a diferença da Produtividade Primária Bruta (GPP) e da Respiração de Manutenção (MR) (GPP-MR); Dados uso do solo e limites áreas protegidas do https://mapbiomas.org/ Coleção 6 (1985-2020) e Histórico de desmatamento do https://mapbiomas.org/metodo-desmatamento (2000-2019).' )); 
panel.widgets().set(1, legendarea2).set(2, legendarea).set(3, inspector0014).set(4, inspector0015).set(5, inspector0016).set(6, inspector00).set(7, inspector001).set(8, inspector002).set(9, inspector0013).set(10, inspector005).set(11, inspector007).set(12, inspector008).set(13, inspector009).set(14, inspector0010).set(15, inspector0011).set(16, inspector006).set(17, inspector0012).set(18, inspector003).set(19, inspector004).set(20, chart20).set(21, legend).set(22, panel2);
//});
// Add the panel to the ui.root.
ui.root.add(panel);