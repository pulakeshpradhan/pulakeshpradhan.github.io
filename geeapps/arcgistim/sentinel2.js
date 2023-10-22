/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var table = ee.FeatureCollection("users/arcgistim/counties/turkana");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
Map.addLayer(table)
//Import GEE Feature Collection 
var geometry = ee.FeatureCollection("users/arcgistim/counties/turkana");
// Create image collection of S-2 imagery 
var S2 = ee.ImageCollection('COPERNICUS/S2')
//filter start and end date
.filterDate('2020-02-01', '2020-02-28')
//filter according to drawn boundary
.filterBounds(geometry);
///////////////display raw surface reflectance//////
var inBands = ee.List(['QA60','B1','B2','B3','B4','B5','B6','B7','B8','B8A','B9','B11','B12']);
var outBands = ee.List(['QA60','cb','blue','green','red','re1','re2','re3','nir','re4','waterVapor','swir1','swir2']);
var CloudCoverMax = 30;
var startDate = "2020-02-01";
var endDate = "2020-02-28";
var studyArea = geometry;
// Get Sentinel-2 data
var s2 = ee.ImageCollection('COPERNICUS/S2_SR')
           .filterDate(startDate,endDate)
           .filterBounds(studyArea)
           .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',CloudCoverMax))
           .filter(ee.Filter.lt('CLOUD_COVERAGE_ASSESSMENT',CloudCoverMax));
// scale the data 
var scaleData = function scaleBands(img){
  var prop = img.toDictionary();
  var myImg = img.select(['B1','B2','B3','B4','B5','B6','B7','B8','B8A','B9','B11','B12']).divide(10000);
      myImg = myImg.addBands(img.select(['QA60'])).set(prop).copyProperties(img,['system:time_start','system:footprint']);
  return ee.Image(myImg);
};
var sentinel2 = s2.map(scaleData).select(inBands,outBands);
Map.addLayer(sentinel2.median().clip(geometry),{min:0,max:0.6,bands:"swir1,nir,red"}, "surface reflectance");
/////////end of displaying surface reflectance/////////
// Function to mask cloud from built-in quality band
// information on cloud
var maskcloud1 = function(image) {
var QA60 = image.select(['QA60']);
return image.updateMask(QA60.lt(1));
};
var S2 = S2.map(maskcloud1);
// Function to calculate and add an NDVI band
var addNDVI = function(image) {
return image.addBands(image.normalizedDifference(['B8', 'B4']));
};
var addNDMI = function(image) {
return image.addBands(image.normalizedDifference(['B8','B11']));
};
// Add NDVI band to image collection
var S2 = S2.map(addNDVI);
// Extract NDVI band and create NDVI median composite image
var NDVI = S2.select(['nd']);
var NDVImed = NDVI.median(); //I just changed the name of this variable ;)
// Create palettes for display of NDVI
var ndvi_pal = ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
               '74A901', '66A000', '529400', '3E8601', '207401', '056201',
               '004C00', '023B01', '012E01', '011D01', '011301'];
// Create a time series chart.
var plotNDVI = ui.Chart.image.seriesByRegion(S2, geometry,ee.Reducer.mean(),
'nd',500,'system:time_start', 'system:index')
              .setChartType('LineChart').setOptions({
                title: 'NDVI short-term time series',
                hAxis: {title: 'Date'},
                vAxis: {title: 'NDVI'}
});
// Add NDMI band to image collection
var S2 = S2.map(addNDMI);
// Extract NDMI band and create NDMI median composite image
var NDMI = S2.select(['nd']);
var NDMImed = NDMI.median(); //I just changed the name of this variable ;)
// Create palettes for display of NDSI
var ndmi_pal = ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
               '74A901', '66A000', '529400', '3E8601', '207401', '056201',
               '004C00', '023B01', '012E01', '011D01', '011301'];
// Create a time series chart.
var plotNDMI = ui.Chart.image.seriesByRegion(S2, geometry,ee.Reducer.mean(),
'nd',500,'system:time_start', 'system:index')
              .setChartType('LineChart').setOptions({
                title: 'NDMI short-term time series',
                hAxis: {title: 'Date'},
                vAxis: {title: 'NDMI'}
});
// Display.
print(plotNDVI);
// Display NDVI results on map
Map.addLayer(NDVImed.clip(geometry), {min:-0.5, max:0.9, palette: ndvi_pal}, 'NDVI');
// Display.
print(plotNDMI);
// Display NDMI results on map
Map.addLayer(NDMImed.clip(geometry), {min:-0.5, max:0.9, palette: ndmi_pal}, 'NDMI');
// Export the ndvi image only to drive.
//Export.image.toAsset({
  //image: NDVImed,
  //description: 'ndvi',
  //assetId: 'tanariverNDVI',
  //scale: 30,
  //region: geometry,
  //pyramidingPolicy: {
    //'b4_mean': 'mean',
    //'b4_sample': 'sample',
    //'b4_max': 'max'
  //}
//});
var AOI = ee.FeatureCollection("users/arcgistim/counties/turkana");
var coefficients = ee.Array([
  [0.3037  , 0.2793   , 0.4743   , 0.5585 ,0.5082  , 0.1863],  //brightness
  [-0.2848 , - 0.2435 , - 0.5436 , 0.7243 , 0.084  , 0.18  ],  //greenness
  [0.1509  , 0.1973   , 0.3279   , 0.3406 , 0.7112 , 0.4572]])  //wetness
var startDate = ee.Date.fromYMD(2020,2,1);
var endDate = ee.Date.fromYMD(2020,3,31);
var S2 = ee.ImageCollection("COPERNICUS/S2").filterDate(startDate,endDate).filterBounds(AOI).filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than', 0.1)
var img = ee.Image(S2.median()).clip(AOI).divide(10000);
var viz = {min:0,max:0.2,bands:"B4,B3,B2"};
Map.addLayer(img,viz,"AOI");
var img_TSC = img.select(['B2', 'B3', 'B4', 'B8', 'B11', 'B12']);
var arrayImage1D = img_TSC.toArray();
var arrayImage2D = arrayImage1D.toArray(1);
var componentsImage = ee.Image(coefficients)
  .matrixMultiply(arrayImage2D)
  .arrayProject([0])
  .arrayFlatten(
    [['brightness', 'greenness', 'wetness']]);
var vizParams = {
  bands: ['brightness', 'greenness', 'wetness'],
  min: 0, max: [0.5, 0.1, 0.1]
};
Map.centerObject(AOI);
Map.addLayer(componentsImage, vizParams, 'components');