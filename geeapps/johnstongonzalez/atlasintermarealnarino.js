// Tidal habitat from NDWI signatures
// Calculates NDWI (McFeeters 1996) and water masks, then substracts et voila!
// High tide
var High_2015 = ee.Image('LANDSAT/LC08/C01/T1/LC08_010058_20150611'); // High tide
var ndwi_H = High_2015.normalizedDifference(['B3', 'B5']); // 
var ndwi_H_Masked = ndwi_H.updateMask(ndwi_H.gte(0.075));    // Mask, greater or equal
// Low tide
var Low_2015 = ee.Image('LANDSAT/LC08/C01/T1/LC08_010058_20150323');  // Low tide
var ndwi_L = Low_2015.normalizedDifference(['B3', 'B5']);             // Calc NDWI
var ndwi_L_Masked = ndwi_L.updateMask(ndwi_L.gte(0.075));              // Mask water
//var mosaic_tidal = ee.ImageCollection([mosaic_H, mosaic_L]).mosaic(); //extract tidal NOT WORKING
// Plot Map
// Vizualization parameters generl
var vizParams = {
  bands: ['B5', 'B4', 'B3'],  min: 5000, max: 15000, gamma: 1.3};   // Viz general
var ndwiViz = {min: -1, max: 1, palette: ['00FFFF', '0000FF']};     // Viz ndwi
// Vizualization parameters  High tide 
var High_RGB = High_2015.visualize({
  bands: ['B5', 'B4', 'B3'], max: 0.5});                            // Viz Landsat  
var ndwi_H_RGB = ndwi_H_Masked.visualize({
  min: .0, max: 1, palette: ['black', 'white']});                   // Viz ndwi mask 
var mosaic_H = ee.ImageCollection([High_RGB, ndwi_H_RGB]).mosaic(); //Not working
// Vizualization parameters Low tide
var Low_RGB = Low_2015.visualize({
  bands: ['B5', 'B4', 'B3'], max: 0.5});                            // Viz param RGB
var ndwi_L_RGB = ndwi_L_Masked.visualize({                     
  min: .0, max: 1, palette: ['black', 'white']});                   // Viz param NDWI
var mosaic_L = ee.ImageCollection([Low_RGB, ndwi_L_RGB]).mosaic();  // Visualize Mosaic
// Plot map
Map.setCenter(-78, 2.65, 11); // Narino Coast, Colombia
// Layers High tide
Map.addLayer(High_2015,     vizParams, 'Marea alta 2015');      //  Plot Image
//Map.addLayer(ndwi_H,        ndwiViz, 'Indice NDWI - marea alta', false);                // Plot ndwi raw
Map.addLayer(ndwi_H_Masked, ndwiViz, 'Agua en marea alta');  // Plot water mask
//Map.addLayer(mosaic_H, {}, 'High mosaic', false);               //Not working
// Layers low tide
//Map.addLayer(ndwi_L, ndwiViz, 'Indice NDWI - marea baja', false);                // Plot NDWI
Map.addLayer(ndwi_L_Masked, ndwiViz, 'Agua en marea baja');         // Plot Water Mask
Map.addLayer(Low_2015, vizParams, 'Marea baja 2015');  // Plot image
// Map.addLayer(mosaic_L, {}, 'Low mosaic', false);              // Plot Mosaic
// Map.addLayer(mosaic_tidal, {}, 'tidal', false);
// Export files
// Comment code below to prevent export the NDWI raster to google drive 
var Narino = ee.Geometry.Rectangle([-78.5, 2.3, -77.95, 2.7], null, false);
Export.image.toDrive({
  image: ndwi_H,
  description: 'ndwi_H',
  scale: 30,
  region: Narino
});
Export.image.toDrive({
  image: ndwi_L,
  description: 'ndwi_L',
  scale: 30,
  region: Narino
});
// mndwi_L
// var mndwi_L = Low_2015.normalizedDifference(['B3', 'B6']);   // Calc NDWI
// var mndwi_L_Masked = mndwi_L.updateMask(ndwi_L.gte(0.05));      // Mask water
// var mndwi_L_RGB = ndwi_L_Masked.visualize({                     // Visualize NDWI
//   min: .5, max: 1, palette: ['black', 'white']
// }); 
// Map.addLayer(mndwi_L, ndwiViz, 'Low MNDWI', false);             // Plot NDWI
// Map.addLayer(mndwi_L_Masked, ndwiViz, 'Low MNDWI masked');      // Plot NDWI Mask