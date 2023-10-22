Map.setOptions("SATELLITE")
Map.setCenter(-56.19, -25.50, 6)
/////CLASSIFICATION VISUALIZATION
var palettes = require('users/mapbiomas/modules:Palettes.js');
var vis3 = {
    'min': 0,
    'max': 45,
    'palette': palettes.get('chaco')
};
var MapBiomas_Chaco = ee.Image('projects/mapbiomas-chaco/public/collection2/mapbiomas_chaco_collection2_integration_v1').select(0)
Map.addLayer(MapBiomas_Chaco, vis3, "Chaco_2000", true);
var MapBiomas_Chaco2 = ee.Image('projects/mapbiomas-chaco/public/collection2/mapbiomas_chaco_collection2_integration_v1').select(19)
Map.addLayer(MapBiomas_Chaco2, vis3, "Chaco_2019", true);
/////////////////////////////////////////
var tran = MapBiomas_Chaco.multiply(10).add(MapBiomas_Chaco2)
print(tran)
/////CLASSIFICATION VISUALIZATION
var Listaoriginal = [//43,
//63,
//93,
//113,
//123,
153,
193,
//223,
//263,
//363,
//423,
//433,
//443,
//453,
]
var Listaresumida = [//100,
//100,
//200,
//300,
//300,
400,
400,
//500,
//500,
//400,
//300,
//300,
//300,
//100,
]
var Clasificacion = tran.remap(Listaoriginal,Listaresumida)
var vis = {
bands: ["remapped"],
max:400,
min: 400,
opacity: 1,
palette: ["ff0000"]}//1f04ff
Map.addLayer(Clasificacion, vis, "Ganancia de bosque")
/*
var stats_all = MapBiomas_Chaco.reduceRegion({
  reducer: ee.Reducer.frequencyHistogram(),
  geometry: aa,
  scale:30,
  bestEffort:true,
  maxPixels: 1e20});
print('count_all_',stats_all);
*/