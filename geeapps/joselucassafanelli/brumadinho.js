/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var visElevation = {"opacity":1,"bands":["elevation"],"min":705.3767115788887,"max":889.2762963541647,"palette":["5a7dff","1f6e30","a39537","a12d21"]};
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// Author: Jose Lucas Safanelli (jose.lucas.safanelli@usp.br)
// Defining the bounding box of the dam collapse
var retenv = ee.Geometry.Rectangle({coords: [-44.10,-20.10,-44.225,-20.175],
                                       geodesic: false});
// Selecting the Sentinel-2 images before and after the dam collapse
// ID 20190122T131241_20190122T131239_T23KNT'
var img_before = ee.Image('COPERNICUS/S2/20190122T131241_20190122T131239_T23KNT').clip(retenv);
// ID 20190127T131249_20190127T131243_T23KNT
var img_after = ee.Image('COPERNICUS/S2/20190127T131249_20190127T131243_T23KNT').clip(retenv);
// Defining DEM
var demSRTM = ee.Image('USGS/SRTMGL1_003').clip(retenv);
// Define a low-pass kernel.
var gaussianFilter = ee.Kernel.gaussian({
  radius: 1, sigma: 1, units: 'pixels', normalize: true
});
// Smooth the image by convolving with the boxcar kernel.
var demSRTM = demSRTM.convolve(gaussianFilter);
// Dam location
var dam_location = ee.Geometry.Point({coords: [-44.1210689, -20.1194273]});
// Visualization parameters
var rgbVis = {min: 0, max: 3000, bands: ['B4', 'B3', 'B2'],};
// Defining two map objects
var map1 = ui.Map();
map1.addLayer(img_before, rgbVis, 'Brumadinho 22 jan 2019');
map1.addLayer(dam_location, {color: 'yellow'}, 'Dam collapse');
map1.setCenter(-44.16,-20.135, 14);
var map2 = ui.Map();
map2.addLayer(demSRTM, visElevation, 'Elevation');
map2.addLayer(img_after, rgbVis, 'Brumadinho 27 jan 2019');
map2.addLayer(dam_location, {color: 'yellow'}, 'Dam collapse');
map2.setCenter(-44.16,-20.135, 14);
// Linking the two maps
var linker = ui.Map.Linker([map1,map2]);
// Creating a split panel
var split_panel = ui.SplitPanel({
  firstPanel: map1,
  secondPanel: map2,
  wipe: true,
});
// Centering the maps
map1.setCenter(-44.16,-20.135, 14);
// Adding the split panel to the UI
ui.root.widgets().reset([split_panel]);