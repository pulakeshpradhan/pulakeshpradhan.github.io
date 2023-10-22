// Limites municipales y de estanques piscicolas 
var estanques = ee.FeatureCollection("users/ivarzambrana/Estanques");
var Limites = ee.FeatureCollection("users/ivarzambrana/LimitesMunicipales");
// cargar imagen satelital de Planet para Junio del 2023
var specificImageJUN = ee.Image('projects/planet-nicfi/assets/basemaps/americas/planet_medres_normalized_analytic_2023-06_mosaic');
var RBG = {bands:["R","G","B"], min:177, max:924};
// Función para calcular NDWI
var NDWI = specificImageJUN.normalizedDifference(["G","N"]);
//pintar las capas para su visualizacion
var empty = ee.Image().byte();
var outline = empty.paint({
  featureCollection: estanques,
  color: 1,
  width: 3
});
var LimitesMunicipales = empty.paint({
  featureCollection: Limites,
  color: 1,
  width: 3
});
// Añade la imagen y capas al mapa
Map.addLayer(NDWI,  {min: -0.804, max: 0, palette: ["adefff","0265ff"]}, "NDWI Junio-2023");
Map.addLayer(specificImageJUN,RBG,"Imagen Planet Junio-2023");
Map.addLayer(outline, {palette: 'FF0000'},"Estanques piscicolas");
Map.addLayer(LimitesMunicipales,{palette: '000000'},"Limites Municipales");
// centrar el mapa
Map.setCenter(-64.9138, -16.8323,10);