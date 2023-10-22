/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var l8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_RT");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var center = {lon: 77, lat: 20, zoom: 7};
var leftMap = ui.Map(center);
var rightMap = ui.Map(center);
leftMap.setControlVisibility(false); 
rightMap.setControlVisibility(false);
leftMap.setControlVisibility({zoomControl: true}); 
var linker = new ui.Map.Linker([leftMap, rightMap]);
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  orientation: 'horizontal', 
  wipe: true 
});
ui.root.clear();
ui.root.add(splitPanel);
var landsat = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
                  .filterDate('2017-01-01', '2018-01-01')
                  .median();
landsat = landsat.addBands(landsat.normalizedDifference(['B5', 'B4']).rename("NDVI"));
var vis = {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000};
leftMap.addLayer(landsat, vis, "rgb");
var visNDVI = {
  min: 0,
  max: 1,
  palette: 'FFFFFF,CE7E45,DF923D,F1B555,FCD163,99B718,74A901,66A000,529400,' +
      '3E8601,207401,056201,004C00,023B01,012E01,011D01,011301'
};
rightMap.addLayer(landsat.select("NDVI"), visNDVI, 'NDVI');