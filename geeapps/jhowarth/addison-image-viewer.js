var image42 = ui.import && ui.import("image42", "image", {
      "id": "users/jhowarth/middCC/Middlebury_1942_Ortho"
    }) || ee.Image("users/jhowarth/middCC/Middlebury_1942_Ortho"),
    image94 = ui.import && ui.import("image94", "image", {
      "id": "users/jhowarth/middCC/Middlebury_1994_mosaic"
    }) || ee.Image("users/jhowarth/middCC/Middlebury_1994_mosaic");
var addyExtent = ee.FeatureCollection('users/jhowarth/addyExtentBuffer');
var naipTools = require('users/jhowarth/modules:naipTools.js');
var stateCode = '50';
var countyName = 'Addison';
var outScale = 1;
var outCRS = 'EPSG:32619';
var extent = naipTools.extent(stateCode, countyName);
print(extent);
var naip = naipTools.loadNAIP(extent);
var yearsNAIP = naipTools.yearsNAIP(naip);
var fourBandNAIP = naipTools.fourBandNAIP(naip);
var yr13 = 2013;
var yr14 = 2014;
var yr18 = 2018;
var yr03 = 2003;
var yr04 = 2004;
var mosaicYr13 = naipTools.yearMosaic(naip, yr13);
var mosaicYr14 = naipTools.yearMosaic(naip, yr14);
var mosaicYr18 = naipTools.yearMosaic(naip, yr18);
var mosaicYr03 = naipTools.yearMosaic(naip, yr03);
var mosaicYr04 = naipTools.yearMosaic(naip, yr04);
// ndvi
var nir = mosaicYr14.select('N');
var red = mosaicYr14.select('R');
// var ndvi = nir.subtract(red).divide(nir.add(red)).rename('NDVI');
// // Display the result.
// var ndviParams = {min: -1.0, max: 1.0, palette: ['blue', 'white', 'green']};
// Map.addLayer(ndvi, ndviParams, 'NDVI image');
// Create a 3-band composite to export.
var visualization = mosaicYr18.visualize({
  bands: ['N', 'R', 'G']
});
// Create a task that you can launch from the Tasks tab.
// Export.image.toDrive({
//   image: visualization,
//   description: 'fc2018',
//   scale: 1,
//   region: addyExtent
// });
var image42bands = image42.select('b1','b2','b3');
var imageVis = {
  min: 0,
  max: 255,
  gamma: 1
};
var fcVis = naipTools.fcVis;
var ncVis = naipTools.ncVis;
Map.setCenter(-73.1833162, 43.941221, 13);
Map.setOptions('SATELLITE');
// Map.addLayer(addyExtent);
Map.addLayer(mosaicYr18, ncVis, String(yr18),1,1);
Map.addLayer(mosaicYr18, fcVis, String(yr18),1,1);
Map.addLayer(mosaicYr14, fcVis, String(yr14),0,1);
Map.addLayer(mosaicYr13, fcVis, String(yr13),0,1);
Map.addLayer(mosaicYr04, ncVis, String(yr04),0,1);
Map.addLayer(mosaicYr03, ncVis, String(yr03),0,1);
Map.addLayer(image94, imageVis, '1994',0,1);
Map.addLayer(image42bands, imageVis, '1942',0,1);
// // explort to drive
// Export.image.toDrive({
//   image: ndvi,
//   description: 'ndvi',
//   scale: 1,
//   region: addyExtent,
//   maxPixels: 1e12
// });