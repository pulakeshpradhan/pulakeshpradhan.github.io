var table = ee.FeatureCollection("users/alaminu53/Lekki");
Map.centerObject(table,10);
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 2;
  var cirrusBitMask = 1 << 2;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
var dataset = ee.ImageCollection("COPERNICUS/S2")
                  .filterDate('2020-01-01', '2020-01-06')
                  .filterBounds(table)
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',100))
                  .map(maskS2clouds)
var visualization = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
};
var dataset1 = ee.ImageCollection("COPERNICUS/S2")
                  .filterDate('2020-03-26', '2020-04-10')
                  .filterBounds(table)
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',100))
                  ;
var visualization1 = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
};
//print(dataset)
//Map.addLayer(dataset.min(), visualization, 'RGB');
var median = dataset.min();
// Load a table of state boundaries and filter.
var fc = ee.FeatureCollection(table);
var clipped1 = median.clipToCollection(fc);
//var ndvi = clipped1.normalizedDifference(['B8', 'B4']);
Map.addLayer(clipped1, visualization, 'RGB');
// NDBI = (SWIR-NIR/SWIR+NIR) FOR NDBI
var NDBI = clipped1.expression(
  "(SWIR - NIR)/(SWIR + NIR)",
  {
    NIR: clipped1.select("B8"),   //NIR
   SWIR: clipped1.select("B12"),   //SWIR
     });
var vizParams = {
  min: 0.2896710962009691,
  max: -0.8317653544580726,
  palette: ['ff0000','ff0000','ff0000','ff0000','ffffff','ffffff','ffffff','ffffff','ffffff','ffffff']
}; 
var median1 = dataset1.min();
// Load a table of state boundaries and filter.
var fc1 = ee.FeatureCollection(table);
var clipped2 = median1.clipToCollection(fc1);
//var ndvi = clipped1.normalizedDifference(['B8', 'B4']);
var imageVisParam = {"opacity":1,"bands":["B4","B3","B2"],"min":565,"max":3226,"gamma":1};
Map.addLayer(clipped2, imageVisParam, 'RGB',false);
// NDBI = (SWIR-NIR/SWIR+NIR) FOR NDBI
var NDBI1 = clipped2.expression(
  "(SWIR - NIR)/(SWIR + NIR)",
  {
    NIR: clipped2.select("B8"),   //NIR
   SWIR: clipped2.select("B12"),   //SWIR
     });
var vizParams1 = {
  min: 0.2896710962009691,
  max: -0.8317653544580726,
  palette: ['ff0000','ff0000','ff0000','ff0000','ffffff','ffffff','ffffff','ffffff','ffffff','ffffff']
}; 
var stack1 = NDBI.select('B12')
var stack2 = NDBI1.select('B12')
var dif = NDBI1.select('B12').subtract(NDBI.select('B12'));
//.divide(NDBI1.select('B12').add(NDBI.select('B12')));
var imageVisParam1 = {"opacity":1,"bands":["B12"],"min":-0.32528233528137207,"max":0.7090950012207031,"palette":["ffffff","ffffff","ffffff","ffffff","ff0000","ff0c00","ff0000"]};
Map.addLayer(dif,imageVisParam1,'Month diff',false);
print(stack1,stack2);
//var Subimage = subimage.expression('NDBI1'-'NDBI');
//Map.addLayer(NDBI,vizParams, "NDBI");
//Map.addLayer(NDBI1,vizParams1, "NDBI2");
//Map.setControlVisibility();
var Map1 = ui.Map();
var imageVisParam = {"opacity":1,"bands":["B4","B3","B2"],"min":593,"max":3547,"gamma":1};
//Map.addLayer(clipped2, visualization, 'MARCH');
Map.addLayer(clipped1, visualization, 'JANUARY',false);
  var Map2 = ui.Map();
Map2.addLayer(clipped2, imageVisParam, 'MARCH');
Map2.addLayer(dif,imageVisParam1,'Month diff');
 // Set up the maps and control widgets
// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.setControlVisibility(true);
var leftSelector = addLayerSelector(leftMap, 1, 'center');
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.setControlVisibility(true);
var rightSelector = addLayerSelector(rightMap, 1, 'down-right');
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Choose an image to visualize');
}
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(dataset[selection]));
  }
var linker = ui.Map.Linker([ui.root.widgets().get(0), Map2]);
var splitPanel = ui.SplitPanel({
  firstPanel: linker.get(0),
  secondPanel: linker.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
// Create a title.
var title = ui.Label('January & March 2020 Sentinel-2 Comparison', {
  stretch: 'horizontal',
  textAlign: 'below',
  fontWeight: 'bold',
  fontSize: '15px'
});
// Add the maps and title to the ui.root.
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));
ui.root.widgets().reset([splitPanel,title]);
linker.get(0).setCenter(3.96306, 6.46478, 15);
  Export.image.toDrive({
  image: NDBI,
  description: "Lekki_NDBI",
  scale: 10,
  region: table,
  crs: 'EPSG:4326',
   fileFormat: 'GeoTIFF',
  formatOptions: {
    cloudOptimized: true
  }
});