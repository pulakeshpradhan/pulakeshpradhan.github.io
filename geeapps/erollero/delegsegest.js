var table = ui.import && ui.import("table", "table", {
      "id": "users/erollero/Departamentos_INDEC_2015"
    }) || ee.FeatureCollection("users/erollero/Departamentos_INDEC_2015"),
    deleg = ui.import && ui.import("deleg", "table", {
      "id": "users/erollero/Delegaciones_2013_dislv"
    }) || ee.FeatureCollection("users/erollero/Delegaciones_2013_dislv"),
    imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "COPERNICUS/Landcover/100m/Proba-V/Global"
    }) || ee.ImageCollection("COPERNICUS/Landcover/100m/Proba-V/Global");
///////////////////////////////////////////////////////////////////
// This script visualizes the global discrete classification 
// CGLS-LC100 map in collection 2 of the 
// Copernicus Global Land Service 
//
// Please cite as: Buchhorn, M. ; Smets, B. ; Bertels, L. ; Lesiv, M. ;
//                  Tsendbazar, N. - E. ; Herold, M. ; Fritz, S. 
//                  Copernicus Global Land Service: Land Cover 100m: 
//                  epoch 2015: Globe. Dataset of the global component 
//                  of the Copernicus Land Monitoring Service 2019. 
//                  DOI 10.5281/zenodo.3243509
///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// INPUT REQUIRED HERE
// Which level you want to display
// 1: FAO-LCCS base classes
// 2: Additional open/closed forest distinction
// 3: Additional full forest type distinction
// See product PUM: 
// https://land.copernicus.eu/global/sites/cgls.vito.be/files/products/CGLOPS1_PUM_LC100m-V2.0_I2.20.pdf
Map.setCenter(-61.723, -33.284, 5);
var level = 2; // 1, 2 or 3
//////////////////////////////////////////////////////////////////
/////////////////////////// Load the visualisation functions
var functions = require("users/vitorsveg/scripts:functions");
// Select the year you want to visualise (at the moment only 2015)
var image = imageCollection.filterDate('2015-01-01').first();
var imagep = image.clip(table);
// Select the discrete layer
var discrete = imagep.select(['discrete_classification']);
// Specific palette set up for each level
var discrete = functions.choose_palette(discrete,level);
// Add legend
if (level == 1){
  var Palette = functions.legend_discrete_lev1();
} else if (level == 2){
  var Palette = functions.legend_discrete_lev2();
} else if (level == 3){
  var Palette = functions.legend_discrete();
}
// Plot it on the map
Map.addLayer(discrete, {}, 'CGLS-LC100 discrete');
// This example uses the Sentinel-2 QA band to cloud mask
// the collection.  The Sentinel-2 cloud flags are less
// selective, so the collection is also pre-filtered by the
// CLOUDY_PIXEL_PERCENTAGE flag, to use only relatively
// cloud-free granule.
// Function to mask clouds using the Sentinel-2 QA band.
function maskS2clouds(image) {
  var qa = image.select('QA60')
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = ee.Number(2).pow(10).int()
  var cirrusBitMask = ee.Number(2).pow(11).int()
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0))
  // Return the masked and scaled data, without the QA bands.
  return image.updateMask(mask).divide(10000)
      .select("B.*")
      .copyProperties(image, ["system:time_start"])
}
// Map the function over one year of data and take the median.
// Load Sentinel-2 TOA reflectance data.
var collection = ee.ImageCollection('COPERNICUS/S2_SR')
    .filterDate('2019-09-01', '2019-11-30')
    // Pre-filter to get less cloudy granules.
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
    .map(maskS2clouds)
var composite = collection.median()
var imagepais = composite.clip(table);
print(imagepais);
//Map.addLayer(imagepais, {min:0.0300 ,max:0.4601 ,gamma: [0.80, 1.35, 1], bands: ['B8','B11','B4']}, 'RGB');
var desdeFT = ee.FeatureCollection("users/erollero/TOTAL_SEGMENTOS_17Sep19");
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: desdeFT,
  color: 1,
  width: 2
});
Map.addLayer(outline, {palette: 'brown'}, 'Segmentos');
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: table,
  color: 1,
  width: 2
});
Map.addLayer(outline, {palette: 'black'}, 'Deptos');
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: deleg,
  color: 1,
  width: 3
});
Map.addLayer(outline, {palette: 'blue'}, 'Delegaciones');
// Add the maps and title to the ui.root.
//ui.root.widgets().reset([title, mapGrid]);
//ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));
Map.add(ui.Label(
    'Delegaciones, Segmentos y Estratos 2020 ' 
    , {fontWeight: 'bold', fontSize: '24px'}));