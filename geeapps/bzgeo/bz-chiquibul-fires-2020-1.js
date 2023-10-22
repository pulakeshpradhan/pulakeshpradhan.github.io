/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Differenced Normalized Burn Ratio example: BELIZE
// eac0021@uah.edu
// Last updated: 29 May 2020
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PART 1: VARIOUS FUNCTIONS FOR PROCESSING THE IMAGERY USED HERE
// Convert collection to single image via median
function x(img) {return img.median().clip(roi)}
// Mask clouds using the method Rogier Westerhoff (code shared on 18 July 2019)
// source: https://code.earthengine.google.com/5efd72f8fac413ac45bfb29079bd7e53
var mskS2 = function(img){
  var cloudProb = img.select('MSK_CLDPRB');
  var scl = img.select('SCL'); // 3 = cloud shadow
  var shadow = scl.eq(3);
  var mask = cloudProb.lt(5).or(shadow).eq(1);
  return img.updateMask(mask).select(['B1','B2','B3','B4','B5','B7']);};
// Normalized Burn Ratio (NBR)
// Background reading:
// http://un-spider.org/advisory-support/recommended-practices/recommended-practice-burn-severity/in-detail/normalized-burn-ratio
function nbr(img) {return img.median().normalizedDifference(["B4","B5"])}
// Differenced Normalized Burn Ratio (DNBR)
function dnbr(img1, img2) {return nbr(img1).subtract(nbr(img2)).clip(roi2)}
function dnbr_3x3(img1, img2) {
var nbr1 = img1.median().normalizedDifference(["B4","B5"]).reduceNeighborhood({reducer: ee.Reducer.mean(),kernel: ee.Kernel.square(3)});
var nbr2 = img2.median().normalizedDifference(["B4","B5"]).reduceNeighborhood({reducer: ee.Reducer.mean(),kernel: ee.Kernel.square(3)});
var dnbr = nbr1.subtract(nbr2).clip(roi);
var dnbr_ = dnbr.mask(dnbr.gte(0.27));
return dnbr_.select(["nd_mean"],["nd"]);}
function dnbr_(img1, img2) {return dnbr(img1, img2).mask(dnbr(img1,img2).gte(0.2))}
// Burn scar area estimation
function area_scar(img,res,aoi, src) {
  var stat = ee.Number(img.select('nd').mask().multiply(ee.Image.pixelArea()).reduceRegion({
  geometry: aoi.geometry(), reducer: ee.Reducer.sum(),scale: res, maxPixels: 1e18}).get('nd')).divide(10000);
print('est. burned area: ', stat, 'hectares','source:',src);}
function area_scar2(img,res,aoi, src) {
  var stat = ee.Number(img.select('nd_mean').mask().multiply(ee.Image.pixelArea()).reduceRegion({
  geometry: aoi.geometry(), reducer: ee.Reducer.sum(),scale: res, maxPixels: 1e18}).get('nd_mean')).divide(10000);
print('est. burned area: ', stat, 'hectares','source:',src);}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PART 2: LOAD DATA
// Select spectral bands for analysis
var fro_s2 = ['B2','B3','B4','B8','B11','B12','QA60','SCL','MSK_CLDPRB']; // S2 bands: blue, green, red, NIR, SWIR1, SWIR2, QA
var to = ['B1','B2','B3','B4','B5','B7','QA60','SCL','MSK_CLDPRB']; // renames S2 bands to familiar Landsat-7 nomenclature
var fro_ = ['sur_refl_b03','sur_refl_b04','sur_refl_b01','sur_refl_b02','sur_refl_b06','sur_refl_b07']; // orig. MODIS bands
var to_ = ['B1','B2','B3','B4','B5','B7']; // renames MODIS bands to familiar Landsat-7 nomenclature
// Load image collections
var s2 = ee.ImageCollection('COPERNICUS/S2_SR').select(fro_s2,to); // Sentinel-2 surface reflectance data
var mod09 = ee.ImageCollection("MODIS/006/MOD09GA").select(fro_,to_); // MODIS-Terra surface reflectance data
// Load other data, specify geographic domain
var roi = ee.Geometry.Rectangle(-87.70, 15.73, -89.30, 18.60); // Rectangular Region of Interest (ROI)
var roi2 = ee.FeatureCollection("users/servirbz/aoi/lac/cam/bz/bz_bounds_swbd"); // Belize polygon boundaries
var bz_fcd = ee.FeatureCollection("users/servirbz/compil_ecosys/_prot_areas/bz_prot_areas_fcd1"); // Western Chiquibul ROI
var bnds = ee.Image().byte().paint({featureCollection:"users/servirbz/aoi/lac/cam/cam_borders_ln",width:1}); // C. America line boundaries
var pa = ee.Image().byte().paint({featureCollection:ee.FeatureCollection('WCMC/WDPA/current/polygons').filterBounds(roi),width:1}); // Belize protected areas
var msk = ee.Image('UMD/hansen/global_forest_change_2015').select('datamask').eq(1); // water mask
var ctr = ee.Geometry.Point(-89.0283, 16.8941);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PART 3: PALETTES + VISUALIZATION DETAILS
var pal_s2_false = {bands: ['B5', 'B4', 'B3'], min: 100, max: 4000}; // palette for visualizing false color Sentinel-2 data
var pal_mod_false = {min:100,max:4500, bands:['B5','B4','B3']}; // palette for visualizing false color MODIS imagery
var pal_dnbr = {min: -0.5, max: 1.3, palette: ['limegreen','lime','silver','yellow','orange','red','purple']}; // DNBR palette (1)
var pal_dnbr2 = {min: 0.2, max: 1.3, palette: ['red']}; // DNBR palette (2)
var pal_dnbr3 = {min: 0.1, max: 1.3, palette: ['orange']}; // DNBR palette (3)
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PART 4: EXTRACT DATA
// Extract Sentinel-2 datasets
var s2_20190420 = s2.filterDate('2019-04-20T00:00','2019-04-20T23:59').filterBounds(roi);
var s2_20190505 = s2.filterDate('2019-05-05T00:00','2019-05-05T23:59').filterBounds(roi);
var s2_20200224 = s2.filterDate('2020-02-24T00:00','2020-02-24T23:59').filterBounds(roi);
var s2_20200409 = s2.filterDate('2020-04-09T00:00','2020-04-09T23:59').filterBounds(roi);
var s2_20200424 = s2.filterDate('2020-04-24T00:00','2020-04-24T23:59').filterBounds(roi);
var s2_20200524 = s2.filterDate('2020-05-24T00:00','2020-05-24T23:59').filterBounds(roi);
var s2_20200524_ = s2.filterDate('2020-05-24T00:00','2020-05-24T23:59').filterBounds(roi).map(mskS2); // cloud-masked S2
// Extract MODIS datasets
var mod09_20200224 = mod09.filterDate("2020-02-24T00:00","2020-02-24T23:59");
var mod09_20200525 = mod09.filterDate("2020-05-25T00:00","2020-05-25T23:59");
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PART 5: ADD DATA TO THE MAP VIEWER BELOW
Map.setOptions('SATELLITE');
Map.centerObject(ctr,12);
Map.addLayer(x(mod09_20200224),pal_mod_false, "MOD09_2020-02-24", false);
Map.addLayer(x(mod09_20200525),pal_mod_false, "MOD09_2020-05-25", false);
Map.addLayer(dnbr(mod09_20200224, mod09_20200525).clip(bz_fcd), pal_dnbr, 'DNBR_MODIS_2020_0224_0525', false);
Map.addLayer(dnbr_(mod09_20200224, mod09_20200525).clip(bz_fcd), pal_dnbr3, 'DNBR_MODIS_2020_0224_0525_', false);
Map.addLayer(x(s2_20190420), pal_s2_false, 'S2_2019-04-20_false', false); // 20 Apr 2019
Map.addLayer(x(s2_20190505), pal_s2_false, 'S2_2019-05-05_false', false); // 05 May 2019
Map.addLayer(x(s2_20200224), pal_s2_false, 'S2_2020-02-24_false', false); // 24 Feb 2020
Map.addLayer(x(s2_20200409), pal_s2_false, 'S2_2020-04-09_false', false); // 09 Apr 2020
Map.addLayer(x(s2_20200424), pal_s2_false, 'S2_2020-04-24_false', false); // 24 Apr 2020
Map.addLayer(x(s2_20200524), pal_s2_false, 'S2_2020-05-24_false', true);  // 24 May 2020
Map.addLayer(dnbr(s2_20200224, s2_20200524_).clip(bz_fcd), pal_dnbr, 'DNBR_S2_2020_0224_0524', false); // DNBR data
//Map.addLayer(dnbr_(s2_20200224, s2_20200524_).clip(bz_fcd), pal_dnbr2, 'DNBR_S2_2020_0224_0524_', true); // thresholded DNBR data
Map.addLayer(dnbr_3x3(s2_20200224, s2_20200524_).clip(bz_fcd), pal_dnbr2, 'DNBR_S2_2020_0224_0524_flt', true); // thresholded DNBR data
Map.addLayer(pa.clip(roi),{palette: "yellow"},"Protected areas", true); // adds protected areas outlines in yellow
Map.addLayer(bnds.clip(roi),{palette: "black"},"Int'l Borders", true); // adds country borders w/ black outline
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//print(dnbr_(s2_20200224, s2_20200524_));
area_scar(dnbr_(mod09_20200224, mod09_20200525),500, bz_fcd, "MODIS");
//area_scar(dnbr_(s2_20200224, s2_20200524_), 20, bz_fcd, "Sentinel-2");
area_scar(dnbr_3x3(s2_20200224, s2_20200524_),20, bz_fcd, "Sentinel-2 (filtered)");
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//print(dnbr_(s2_20200224, s2_20200524_));
//var folder = 'x_tmp_gee_outputs'; // folder in your Google Drive where imagery will be saved to
//Export.image.toDrive({image:dnbr_(s2_20200224, s2_20200524_).float().clip(bz_fcd), description:'export_drv', folder: folder, fileNamePrefix: 'bz_s2_dnbr_20200224_20200524_20m', crs: 'EPSG:4326', region: bz_fcd, maxPixels: 100000000000}); 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////