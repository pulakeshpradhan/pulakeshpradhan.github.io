var table = ui.import && ui.import("table", "table", {
      "id": "users/erollero/Departamentos_INDEC_2015"
    }) || ee.FeatureCollection("users/erollero/Departamentos_INDEC_2015"),
    deleg = ui.import && ui.import("deleg", "table", {
      "id": "users/erollero/Delegaciones_2013_dislv"
    }) || ee.FeatureCollection("users/erollero/Delegaciones_2013_dislv"),
    imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "COPERNICUS/Landcover/100m/Proba-V/Global"
    }) || ee.ImageCollection("COPERNICUS/Landcover/100m/Proba-V/Global"),
    imagelp = ui.import && ui.import("imagelp", "image", {
      "id": "users/erollero/PARANA/clasificacionlpaz"
    }) || ee.Image("users/erollero/PARANA/clasificacionlpaz"),
    image1 = ui.import && ui.import("image1", "image", {
      "id": "users/erollero/PARANA/clasiConcordia9x8"
    }) || ee.Image("users/erollero/PARANA/clasiConcordia9x8"),
    image2 = ui.import && ui.import("image2", "image", {
      "id": "users/erollero/TALA/clasificacionERIOS9x8"
    }) || ee.Image("users/erollero/TALA/clasificacionERIOS9x8"),
    image3 = ui.import && ui.import("image3", "image", {
      "id": "users/erollero/TALA/clasgualex"
    }) || ee.Image("users/erollero/TALA/clasgualex");
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
Map.setCenter(-59.6454, -31.727, 10);
/*
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
*/
/*
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
    .filterDate('2019-09-01', '2019-11-10')
    // Pre-filter to get less cloudy granules.
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
    .map(maskS2clouds)
var composite = collection.median()
var imagepais = composite.clip(table);
print(imagepais);
Map.addLayer(imagepais, {min:0.0300 ,max:0.4601 ,gamma: [0.80, 1.35, 1], bands: ['B8','B11','B4']}, 'RGB');
*/
// Load an image.
// Create and define visualization parameters and display LA PAZ
var paleta =['#bfbf77','#bfbf77','#e9ffbf','#e9ffbf','#ff6766','#bfbf77','#a57000','#bfbf77','#7eb1b2','#92cc92','#bfbf77'];
var imglpMasked = imagelp.updateMask(imagelp.gt(0));
Map.addLayer(imglpMasked, {min: 1, max: 11, palette: paleta}, 'LaPaz');              
// Create and define visualization parameters and display GUALEGUAYCHU
var paleta1 =['#bfbf77','#bfbf77','#e9ffbf','#bfbf77','#e9ffbf','#e9ffbf','#a57000','#bfbf77','#7eb1b2','#92cc92'];
var imglpMasked = image3.updateMask(image3.gt(0));
Map.addLayer(imglpMasked, {min: 1, max: 10, palette: paleta1}, 'Gualeguaychu');
// Create and define visualization parameters and display CONCORDIA
var paleta2 =['#bfbf77','#bfbf77','#e9ffbf','#e9ffbf','#ff6766','#bfbf77','#a57000','#bfbf77','#7eb1b2','#92cc92','#e9ffbf'];
var imglpMasked = image1.updateMask(image1.gt(0));
Map.addLayer(imglpMasked, {min: 1, max: 11, palette: paleta2}, 'Concordia');
// Create and define visualization parameters and display DIAMANTE
var paleta3 =['#bfbf77','#bfbf77','#e9ffbf','#e9ffbf','#ff6766','#bfbf77','#a57000','#bfbf77','#7eb1b2','#92cc92','#e9ffbf'];
var imglpMasked = image2.updateMask(image2.gt(0));
Map.addLayer(imglpMasked, {min: 1, max: 11, palette: paleta3}, 'Diamante');
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: table,
  color: 1,
  width: 2
});
Map.addLayer(outline, {palette: 'black'}, 'Deptos');
// Add the maps and title to the ui.root.
//ui.root.widgets().reset([title, mapGrid]);
//ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));
Map.add(ui.Label(
    'Mapa de Coberturas Cosecha Fina 19/20 ' 
    , {fontWeight: 'bold', fontSize: '24px'}));
// Leyenda
var legend = ui.Panel({style: {position: 'bottom-right', padding: '8px 15px'}});
var loading = ui.Label('', {margin: '2px 0 4px 0'});
legend.add(loading);
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
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
legend.add(makeRow('a57000', 'Cereales de Invierno'));
legend.add(makeRow('a40000', 'Legumbres'));
legend.add(makeRow('b17eff', 'Caña de Azucar'));
legend.add(makeRow('bfbf77', 'Barbechos y Rastrojos'));
legend.add(makeRow('e9ffbf', 'Recursos Forrajeros'));
legend.add(makeRow('ff6766', 'Lino'));
legend.add(makeRow('d1ff00', 'Colza'));
legend.add(makeRow('7eb1b2', 'Bajos'));
legend.add(makeRow('92cc92', 'Monte'));
Map.add(legend);