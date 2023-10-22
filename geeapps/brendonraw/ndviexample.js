var table = ee.FeatureCollection("users/brendonraw/NDVIPoly");
var table_bounds = function(image) {
  // Crop by table extension
  return image.clip(table);
};
var geometry = ee.Geometry.Rectangle(22,-25,26,-29);
var geometry_bounds = function(image) {
  // Crop by table extension
  return image.clip(geometry);
};
var dataset = ee.ImageCollection('MODIS/006/MOD13Q1')
                  .filterDate('2018-01-01', '2018-02-01');
var ndvi = dataset.select('NDVI');
var ndviClipped = ndvi.map(geometry_bounds);
var ndviVis = {
  min: 0.0,
  max: 8000.0,
  palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ],
};
var rainbowVis = {
  min: 0.0,
  max: 6000.0,
  palette: [
    'FF0000', 'F0FF00', '22FF00', '2200FF', '7C00FF'
  ],
};
var table_vis = {
  opacity: 1.0
}
Map.setCenter(24.553057, -26.245508, 8);
Map.addLayer(ndviClipped, rainbowVis, 'NDVI');
Map.addLayer(table.style({color:'red',width:1,fillColor:'FFFFFF00'}) ,table_vis,0,true,1);