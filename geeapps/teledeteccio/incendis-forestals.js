/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var dataset = ee.ImageCollection("MODIS/006/MCD64A1");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var dateModule = require('users/teledeteccio/modules:DateModule.js');
var showFiresLayer = function(year) {
  Map.layers().reset();
  dataset.filter(ee.Date.fromYMD(year, 1, 1));
  var burnedArea = dataset.select('BurnDate');
  var burnedAreaVis = {
    min: 30.0,
    max: 341.0,
    palette: ['4e0400', '951003', 'c61503', 'ff1901'],
  };
  Map.addLayer(burnedArea, burnedAreaVis, 'Burned Area');
};
var dateRange = dateModule.dateRange('Incendios en el año:', showFiresLayer);
Map.add(dateRange);
Map.setCenter(9.06, 10.75, 4);
showFiresLayer(2019);