var S2 = ui.import && ui.import("S2", "imageCollection", {
      "id": "COPERNICUS/S2_SR"
    }) || ee.ImageCollection("COPERNICUS/S2_SR"),
    GPD_APD_Bff_1km = ui.import && ui.import("GPD_APD_Bff_1km", "table", {
      "id": "users/renankami/GPD_APD_Bff_1_km"
    }) || ee.FeatureCollection("users/renankami/GPD_APD_Bff_1_km");
var S2 = ee.ImageCollection("COPERNICUS/S2_SR");
var GPD_APD_Bff_1km = ee.FeatureCollection("users/renankami/GPD_APD_Bff_1_km");
// 1) SET TIME FRAME - TEMPORAL WINDOW - EX ANTE
var prefire_start = '2021-07-01';   
var prefire_end = '2021-07-30';
// 2) SET TIME FRAME - TEMPORAL WINDOW - EX POST
var postfire_start = '2021-09-01';
var postfire_end = '2021-09-21';
// 3) SHOW IN CONSOLE WINDOW START / END DATE
print(ee.String('Search imagery Sentinel 2A period: ').cat(prefire_end).cat(' and ').cat(postfire_end));
// 4) ADD STUDY AREA BOUDARIES WITH SHAPEFILE
var area = ee.FeatureCollection(GPD_APD_Bff_1km);
// 5) SET STUDY AREA AS CENTER IN A WINDOW VISUALIZATION
Map.centerObject(area);
// 6) SELECTED SENTINEL IMAGES SELECTED ABOVE
var imagery = ee.ImageCollection(S2);
// 7) TIME AND AREA FILTERS TO SEARCH IMAGES - LESS 10% CLOUD COVER - 
var prefireImCol = ee.ImageCollection(imagery
    .filterDate(prefire_start, prefire_end)
    .filterBounds(area))
    //.sort("CLOUDY_PIXEL_PERCENTAGE")
    .filterMetadata ('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 10);
    //.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20));
// 8) SELECT IMAGES OVERLAPING IN STUDY AREA - LESS 10% CLOUD COVER
var postfireImCol = ee.ImageCollection(imagery
    .filterDate(postfire_start, postfire_end)
    .filterBounds(area))
    //.sort("CLOUDY_PIXEL_PERCENTAGE")
    .filterMetadata ('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 10);
    //.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20));
// 9) LIST IMAGERY WITH CLOUD FREE SCENES WITH LESS 10% CLOUD COVER
print(prefireImCol);
print(postfireImCol);
// 10) APPLY A CLOUD MASK
// 10.1) MASK 1 = CLOUDS, CIRRUS & QA BANDS 
function maskS2sr(image) {
  var cloudBitMask = ee.Number(2).pow(10).int();  // Bits 10 - clouds 
  var cirrusBitMask = ee.Number(2).pow(11).int(); // Bits 11 - cirrus
  var qa = image.select('QA60'); // Get the pixel QA band.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0) // All flags should be set to zero, indicating clear conditions
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask)
      .copyProperties(image, ["system:time_start"]);
}
// IMAGERY WITH THE FIRST CLOUD MASK - STEP 1
var prefire_CM_ImCol_1 = prefireImCol.map(maskS2sr);
var postfire_CM_ImCol_1 = postfireImCol.map(maskS2sr);
// 10.2) MASK 2 = SCENE CLASSIFICATION (SCL) BAND
  function mask_scl_band(image) {
    var scl = image.select('SCL');
    var mask = scl.eq(1).eq(0) // saturated or defective
               .and(scl.eq(2).eq(0)) // dark area pixels
               .and(scl.eq(3).eq(0)) // cloud shadows
               //.and(scl.eq(5).eq(0)) // bare soils
               .and(scl.eq(6).eq(0)) // water
               //.and(scl.eq(7).eq(0)) // unclassified
               .and(scl.eq(8).eq(0)) // clouds medium probability
               .and(scl.eq(9).eq(0)) // clouds high probability
               .and(scl.eq(10).eq(0)) // cirrus
               .and(scl.eq(11).eq(0)); // snow/ice
    return image.updateMask(mask)
        .copyProperties(image, ["system:time_start"]);
  }
// IMAGERY WITH THE SECOND STEP OF CLOUD, NOISY AND WATER MASK - STEP 2
var prefire_CM_ImCol = prefire_CM_ImCol_1.map(mask_scl_band);
var postfire_CM_ImCol = postfire_CM_ImCol_1.map(mask_scl_band);
// 11) MOSAIC AND CLIP IMAGERY TO STUDY AREA WITHOUT CLOUDS, WATER AND NOISY
var pre_cm_mos = prefire_CM_ImCol.mosaic().clip(area);
var post_cm_mos = postfire_CM_ImCol.mosaic().clip(area);
// 12) FALSE COLOR WITHOUT CLOUDS
// STANDARD PARAMETERS IN IMAGERY HISTOGRAM
var vis = {bands: ['B4', 'B8', 'B3'], 'gain': '0.12, 0.08, 0.1'};
//var vis_post = {bands: ['B4', 'B8', 'B3'], 'gain': '0.115, 0.6, 0.1'};
// 13) ADD LAYER SHAPEFILE APD - GPD and raster imagery
Map.addLayer(pre_cm_mos, vis,'Julho 2021 - S2 - Falsa Cor');
Map.addLayer(post_cm_mos, vis,'Setembro 2021 - S2 - Falsa Cor');
var styling_A = {color: 'blue', fillColor: '00000000'};
Map.addLayer(GPD_APD_Bff_1km.style(styling_A),["XXXXXXXX"]);
// 14) MOSAIC S2 FALSE COMPOSITE EX ANTE 2021 - JULHO / SETEMBRO
var mosaic_2021_JUL = pre_cm_mos.select(['B2', 'B3', 'B4','B8', 'B11', 'B12']);
var mosaic_2021_SET = post_cm_mos.select(['B2', 'B3', 'B4','B8', 'B11', 'B12']);
/*
// 15) EXPORT IMAGERY
Export.image.toDrive({image: mosaic_2021_JUL, scale: 20, description: 'S2_mosaic_2021_JUL', fileNamePrefix: 'S2_mosaic_2021_JUL',
region: GPD_APD_Bff_1km, maxPixels: 1e12});
Export.image.toDrive({image: mosaic_2021_SET, scale: 20, description: 'S2_mosaic_2021_SET', fileNamePrefix: 'S2_mosaic_2021_SET',
region: GPD_APD_Bff_1km, maxPixels: 1e12});
*/