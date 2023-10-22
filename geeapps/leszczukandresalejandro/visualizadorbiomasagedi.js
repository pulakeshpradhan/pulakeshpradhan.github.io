var table = ui.import && ui.import("table", "table", {
      "id": "users/leszczukandresalejandro/MNES_Departamentos"
    }) || ee.FeatureCollection("users/leszczukandresalejandro/MNES_Departamentos"),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "projects/ee-leszczukandresalejandro/assets/corredor_verde"
    }) || ee.FeatureCollection("projects/ee-leszczukandresalejandro/assets/corredor_verde"),
    table3 = ui.import && ui.import("table3", "table", {
      "id": "projects/ee-leszczukandresalejandro/assets/Parcelas_INBN2"
    }) || ee.FeatureCollection("projects/ee-leszczukandresalejandro/assets/Parcelas_INBN2"),
    table4 = ui.import && ui.import("table4", "table", {
      "id": "projects/ee-leszczukandresalejandro/assets/SIFIP_2021"
    }) || ee.FeatureCollection("projects/ee-leszczukandresalejandro/assets/SIFIP_2021"),
    table5 = ui.import && ui.import("table5", "table", {
      "id": "projects/ee-leszczukandresalejandro/assets/Catastro_Rural"
    }) || ee.FeatureCollection("projects/ee-leszczukandresalejandro/assets/Catastro_Rural"),
    table6 = ui.import && ui.import("table6", "table", {
      "id": "projects/ee-leszczukandresalejandro/assets/Pueblos_Originarios"
    }) || ee.FeatureCollection("projects/ee-leszczukandresalejandro/assets/Pueblos_Originarios"),
    table7 = ui.import && ui.import("table7", "table", {
      "id": "projects/ee-leszczukandresalejandro/assets/Industrias_2021"
    }) || ee.FeatureCollection("projects/ee-leszczukandresalejandro/assets/Industrias_2021");
// Variables de entrada
// Año de determinación para filtrado de datos 
var year = '2021';
///////////////////////////////////////////////////////////////////////////////////////
// Mapa de MapBiomas Coleccion 2 al 2021
var mapbiomas = ee.Image("projects/mapbiomas_af_trinacional/public/collection2/mapbiomas_atlantic_forest_collection20_integration_v1")
                         .clip(table)
                         .select('classification_'+year);
// Paleta de colores oficial
var palettes = require('users/mapbiomas/modules:Palettes.js');                   
// Parámetros de visualización
var vis = {
    'min': 0,
    'max': 34,
    'palette': palettes.get('classification2')
};
// Mascara de cobertura de bosques nativos
var masked = mapbiomas.updateMask(mapbiomas.eq(3)); 
Map.addLayer(masked, vis, "MapBiomas Col 2 (Bosque Nativo al 2021)", false)
///////////////////////////////////////////////////////////////////////////////////////
// Global Forest Watch 
var gfc2021 = ee.Image("UMD/hansen/global_forest_change_2021_v1_9")
                    .clip(table);
//Map.addLayer(gfc2021.mask(gfc2021), {
//  bands: ['treecover2000'],
//  palette: ['000000', '00FF00'],
//  max: 100
//}, 'Cobertura de bosques segun GWF');                    
//
var treeCover = gfc2021.select(['treecover2000']);
var lossImage = gfc2021.select(['loss']);
var gainImage = gfc2021.select(['gain']);
// Add the tree cover layer in green.
Map.addLayer(treeCover.updateMask(treeCover),
    {palette: ['000000', '00FF00'], max: 100}, 'Global forest watch (GWF) 2021', false);
// Add the loss layer in red.
Map.addLayer(lossImage.updateMask(lossImage),
            {palette: ['FF0000']}, 'GFW Perdida de cobertura árborea al 2021', false);
// Add the gain layer in blue.
Map.addLayer(gainImage.updateMask(gainImage),
            {palette: ['0000FF']}, 'GWF Ganancia de cobertura árborea al 2021', false);
///////////////////////////////////////////////////////////////////////////////////////
// Datos de Biomasas de GEDI 4B
var l4b = ee.Image('LARSE/GEDI/GEDI04_B_002').clip(table)
Map.addLayer(
    l4b.select('MU'),
    {min: 0, max: 300, palette: '440154,414387,2a788e,23a884,7ad151,fde725'},
    'Biomasa promedio GEDI',0);
/*Map.addLayer(
    l4b.select('SE'),
    {min: 10, max: 50, palette: '000004,3b0f6f,8c2981,dd4a69,fe9f6d,fcfdbf'},
    'Standard Error');
*/
///////////////////////////////////////////////////////////////////////////////////////
// Generate 50 random points with the region.
//var randomPoints = ee.FeatureCollection.randomPoints(
//    {region: table, points: 5000, seed: 0, maxError: 1});
//Map.addLayer(randomPoints, {color: 'black'}, 'Random points');
//
Map.addLayer(table2,{},"Corredor Verde", false)
///////////////////////////////////////////////////////////////////////////////////////
// Parcelas de inventario de bosque nativo 2
// Función para convertir puntos en capa buffer de 30 m de ancho
var width = 17.3; 
var region = table3.map(function(f) {
  return f.buffer(width); 
});
Map.addLayer(region,{},"Parcelas INBN2 superficie", false)
Map.addLayer(table3,{},"Parcelas INBN2 coordenadas", false)
///////////////////////////////////////////////////////////////////////////////////////
Map.addLayer(table4,{},"Plantaciones forestales 2020", false)
///////////////////////////////////////////////////////////////////////////////////////
Map.addLayer(table5,{},"Catastro Rural", false)
///////////////////////////////////////////////////////////////////////////////////////
Map.addLayer(table6,{},"Pueblos originarios", false)
///////////////////////////////////////////////////////////////////////////////////////
Map.addLayer(table7,{color: 'red'},"Censo de industrias 2021", false)
///////////////////////////////////////////////////////////////////////////////////////
// Crea un botón y añádelo al panel de widgets en el mapa
var button = ui.Button('Biomasa GEDI');
Map.add(button);
// Define la función que se ejecutará al hacer clic en el botón
function imprimirBiomasa(coords) {
  var punto = ee.Geometry.Point(coords.lon, coords.lat);
  var valorBiomasa = l4b.reduceRegion({
    reducer: ee.Reducer.first(),
    geometry: punto,
    scale: 1000
  }).get('MU').getInfo();
  button.setLabel('Valor de Biomasa: ' + valorBiomasa.toFixed(2)  + ' Mg/ha');
}
//Map.setCursor('crosshair');
// Asigna la función anterior al botón para que se ejecute al hacer clic
button.onClick(function() {
  Map.onClick(imprimirBiomasa);
});
/* 13) EXPORTAR RESULTADOS AL DRIVE */
//// Export a cloud-optimized GeoTIFF.
//Export.image.toDrive({
//  image: l4b.select('MU'),
//  description: 'Biomas_GEDI30',
//  crs: 'EPSG:4326',
//  region: table,
//  fileFormat: 'GeoTIFF',
//  scale: 30,
//  maxPixels: 1e13,
//  formatOptions: {
//    cloudOptimized: true
//  }
//});
// Crea una etiqueta
var etiqueta = ui.Label('Authors: Leszczuk Andrés, Korth Silvia');
// Crea un panel de la interfaz de usuario y agrega la etiqueta a él
var panel = ui.Panel({
  widgets: [etiqueta],
  style: {
    position: 'bottom-left',
    color: 'red',
    backgroundColor: 'white',
    fontSize: '5px'
  }
});
// Agrega el panel a la interfaz de usuario del mapa
Map.add(panel);
Map.setCenter(-54, -27, 8)