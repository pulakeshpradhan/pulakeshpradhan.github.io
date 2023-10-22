/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var dataset = ee.ImageCollection("MODIS/006/MOD13Q1");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var dateModule = require('users/teledeteccio/modules:DateModule.js');
var showVegetationLayer = function(year) {
  Map.layers().reset();
  dataset.filter(ee.Date.fromYMD(year, 1, 1));
  var ndvi = dataset.select('NDVI');
  var ndviVis = {
    min: 0.0,
    max: 8000.0,
    palette: [
      'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
      '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
      '012E01', '011D01', '011301'
    ],
  };
  Map.addLayer(ndvi, ndviVis, 'NDVI');
};
var dateRange = dateModule.dateRange('Vegetación para el año:', showVegetationLayer);
Map.add(dateRange);
Map.setCenter(6.746, 46.529, 2);
showVegetationLayer(2019);