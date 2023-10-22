var geometry = ui.import && ui.import("geometry", "table", {
      "id": "projects/ee-afotesfaye12/assets/Janamora"
    }) || ee.FeatureCollection("projects/ee-afotesfaye12/assets/Janamora"),
    table = ui.import && ui.import("table", "table", {
      "id": "projects/ee-afotesfaye12/assets/Janamora"
    }) || ee.FeatureCollection("projects/ee-afotesfaye12/assets/Janamora");
/*             Example 5: Visualization of NDVI, SAVI and EVI
// Display a grid of linked maps, each with a different visualization.
// Example by Genadii Donchyts https://groups.google.com/d/msg/google-earth-engine-developers/goApVJyVhM0/UbJsGLr6EwAJ
-------------------------------------------------------------------------
*/
var cpt = require("users/ambarja/ee-cptcity:cptcity");
var spectral = require("users/dmlmont/spectral:spectral");
// ACCESS THE COMPLETE LIST OF CPTCITY COLOR PALETTES
print("CPTCITY COLOR PALETTES", cpt.pal);
//var geometry = ee.Geometry.Point([-79.385628,-6.225130]).buffer(1000);
//var geometry = ANP.filter(ee.Filter.eq("anp_nomb","Cerros de Amotape"));
// CHECK THE REQUIRED BANDS FOR NDVI, GNDVI and SeLI
print('Required bands for NDVI',spectral.indices.NDVI.bands);
print('Required bands for SAVI',spectral.indices.SAVI.bands);
print('Required bands for EVI',spectral.indices.EVI.bands);
// DATASET TO USE: SENTINEL-2 SR
var dataset = 'COPERNICUS/S2_SR';
// FUNCTION TO MAP OVER AN IMAGE COLLECTION
function addIndices(img) {
  // REQUIRED PARAMETERS ACCORDING TO THE REQUIRED BANDS
  var parameters = {
  "N": img.select("B8"),
  "R": img.select("B4"),
  "g":2.5,
  "C1": 6,
  "C2": 7.5,
  "B": 1,
  "L": 0.5, // Default Canopy Background for SAVI
  };
  // SCALE THE IMAGE
  img = spectral.scale(img,dataset);
  // COMPUTE THE NDVI, GNDVI and SeLI
  return spectral.computeIndex(img,["NDVI","SAVI","EVI"],parameters);
}
var S2 = ee.ImageCollection(dataset)
  .filterBounds(geometry)
  .filterDate('2018-01-01','2021-01-01')
  .filterMetadata ('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 20)
  .map(addIndices)
  .median();
var S2 = S2.clip(geometry); 
print(S2)
var NAMES = [
  'Natural color (B4/B3/B2)',
  'NDVI',
  'SAVI',
  'EVI'
];
var VIS_PARAMS = [
  {max: 0.2, min: 0.0, gamma: 1.0, bands: ['B4','B3','B2']},
  {"min":0,"max":1,"bands":"NDVI",palette:cpt.pal.grass_ndvi},
  {"min":0,"max":1,"bands":"SAVI",palette:cpt.pal.oc_ndvi},
  {"min":0,"max":1,"bands":"EVI",palette:cpt.pal.h5_summer.reverse()}
];
// Create a map for each visualization option..
var maps = [];
NAMES.forEach(function(name, index) {
  var map = ui.Map();
  map.add(ui.Label(name));
  map.addLayer(S2, VIS_PARAMS[index], name);
  map.setControlVisibility(false);
  maps.push(map);
});
var linker = ui.Map.Linker(maps);
// Enable zooming on the top-left map.
maps[0].setControlVisibility({zoomControl: true});
// Show the scale (e.g. '500m') on the bottom-right map.
maps[3].setControlVisibility({scaleControl: true});
var vis_params_1 = {"min":0,"max":1,"bands":"NDVI",palette:cpt.pal.grass_ndvi};
var vis_params_2 = {"min":0,"max":1,"bands":"SAVI",palette:cpt.pal.oc_ndvi};
var vis_params_3 = {"min":0,"max":1,"bands":"EVI",palette:cpt.pal.h5_summer};
function ColorBar(palette) {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '200x20',
      format: 'png',
      min: 0,
      max: 1,
      palette: palette,
    },
    style: {stretch: 'horizontal', margin: '0px 8px'},
  });
}
function makeLegend(low, mid, high, palette) {
  var labelPanel = ui.Panel(
      [
        ui.Label(low, {margin: '4px 8px'}),
        ui.Label(mid, {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label(high, {margin: '4px 8px'})
      ],
      ui.Panel.Layout.flow('horizontal'));
  return ui.Panel([ColorBar(palette), labelPanel]);
}
var legend_1 = makeLegend(0 , 'Normalized difference vegetation index(NDVI)', 1, vis_params_1.palette);
legend_1.style().set({
  position: 'bottom-right'
});
var legend_2 = makeLegend(0 , 'Soil-Adjusted Vegetation Index (SAVI)', 1 , vis_params_2.palette);
legend_2.style().set({
  position: 'bottom-right'
});
var legend_3 = makeLegend( 0 , 'Enhanced vegetation index(EVI)', 1 , vis_params_3.palette);
legend_3.style().set({
  position: 'bottom-right'
});
//maps[0].add(legend_0);
maps[1].add(legend_1);
maps[2].add(legend_2);
maps[3].add(legend_3);
// Create a title.
var title = ui.Label('Using Sentinel 2 imagery for Janamora Watershed', {
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '24px'
});
// Create a grid of maps.
var mapGrid = ui.Panel([
    ui.Panel([maps[0], maps[1]], null, {stretch: 'both'}),
    ui.Panel([maps[2], maps[3]], null, {stretch: 'both'})
  ],
  ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'}
);
// Add the maps and title to the ui.root.
ui.root.widgets().reset([title, mapGrid]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));
// Center the maps.
maps[0].setCenter(38.125, 13.0236, 10);