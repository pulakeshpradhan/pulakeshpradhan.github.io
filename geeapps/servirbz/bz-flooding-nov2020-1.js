////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Displays last 2 Sentinel-1 images
// Domain: Belize
// Last update: 9 Nov. 2020
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var c = require('users/servirbz/packages:bz/bz');
var r = require('users/servirbz/packages:img_recent');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var t1_date = "2020-10-14";
var t2_date = "2020-10-26";
var t3_date = "2020-11-07";
//var ctr = ee.Geometry.Point([-88.204, 17.5005]);
//var ctr = ee.Geometry.Point([-88.5967, 18.1423]);
var ctr = ee.Geometry.Point([-88.7139, 17.3335]);
var roi = c.bz;
var mask = ee.Image('UMD/hansen/global_forest_change_2015').select('datamask').eq(1);
var pal_multi = {min:0.0096,max:0.0721,gamma:10, bands: ["VH_1","VH","VH"]};
//////
var s1 = ee.ImageCollection("COPERNICUS/S1_GRD_FLOAT").filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'))
    //.filter(ee.Filter.eq('relativeOrbitNumber_start', 128)).filter(ee.Filter.inList('sliceNumber', [3,4]))
    .filter(ee.Filter.eq('relativeOrbitNumber_start', 63)).filter(ee.Filter.inList('sliceNumber', [5,6]))
    .select(['VH']).filterBounds(roi); // MODIFY GEOGRAPHY *FOR VISUALIZATION* HERE
var s1_t3 = s1.filterDate(t3_date, ee.Date(t3_date).advance(1, 'day')).median().updateMask(c.msk);
var s1_t2 = s1.filterDate(t2_date, ee.Date(t2_date).advance(1, 'day')).median().updateMask(c.msk);
var s1_t1 = s1.filterDate(t1_date, ee.Date(t1_date).advance(1, 'day')).median().updateMask(c.msk);
var s1_t2_ = s1_t2.reduceNeighborhood({reducer:ee.Reducer.median(),kernel:ee.Kernel.square(3)}).select(['VH_median'],['VH']);
var s1_t3_ = s1_t3.reduceNeighborhood({reducer:ee.Reducer.median(),kernel:ee.Kernel.square(3)}).select(['VH_median'],['VH']);
var image = ee.Image.cat([s1_t3, s1_t2]);
///////
var change_3x3 = s1_t2_.divide(s1_t3_).log10()
                .reduceNeighborhood({reducer:ee.Reducer.median(),kernel:ee.Kernel.square(1)}).updateMask(mask);
var s1_diff = change_3x3.gte(0.2).mask(change_3x3.gte(0.2));
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function x(img) {return img.median().clip(roi)} // Convert collection to single image via median
// Mask clouds using the method Rogier Westerhoff (code shared on 18 July 2019)
// source: https://code.earthengine.google.com/5efd72f8fac413ac45bfb29079bd7e53
var mskS2 = function(img){
  var cloudProb = img.select('MSK_CLDPRB');
  var scl = img.select('SCL'); // 3 = cloud shadow
  var shadow = scl.eq(3);
  var mask = cloudProb.lt(5).or(shadow).eq(1);
  return img.updateMask(mask).select(['B1','B2','B3','B4','B5','B7']);};
/////
var pal_s2_false = {bands: ['B5', 'B4', 'B3'], min: 100, max: 4000}; // palette for visualizing false color Sentinel-2 data
var fro_s2 = ['B2','B3','B4','B8','B11','B12','QA60','SCL','MSK_CLDPRB']; // S2 bands: blue, green, red, NIR, SWIR1, SWIR2, QA
var to = ['B1','B2','B3','B4','B5','B7','QA60','SCL','MSK_CLDPRB']; // renames S2 bands to familiar Landsat-7 nomenclature
var s2 = ee.ImageCollection('COPERNICUS/S2_SR').select(fro_s2,to); // Sentinel-2 surface reflectance data
//var s2_20200524 = s2.filterDate('2020-05-24T00:00','2020-05-24T23:59').filterBounds(roi).map(mskS2);
//var s2_20200608 = s2.filterDate('2020-06-08T00:00','2020-06-08T23:59').filterBounds(roi).map(mskS2);
var s2_20200524 = s2.filterDate('2020-05-24T00:00','2020-05-24T23:59').filterBounds(roi);
var s2_20200608 = s2.filterDate('2020-06-08T00:00','2020-06-08T23:59').filterBounds(roi);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var map1 = ui.Map();
map1.setOptions('HYBRID');
map1.centerObject(ctr,10);
map1.setControlVisibility({mapTypeControl: false});
map1.add(ui.Label("pre: 2020-10-26", {color: "lightseagreen"}));
map1.addLayer(image, pal_multi, "S1 VH pre & post", false);
map1.addLayer(image, {min:0.0132,max:0.0804, bands: ["VH_1"]}, "S1_VH_2020-10-26", true);
map1.addLayer(image, {min:0.0132,max:0.0804, bands: ["VH"]}, "S1_VH_2020-11-07", false);
//map1.addLayer(x(s2_20200524), pal_s2_false, 'S2_2020-05-24_false', true);
//map1.addLayer(x(s2_20200608), pal_s2_false, 'S2_2020-06-08_false', false);
map1.addLayer(c.pa_cam.clip(roi), {palette: "yellow"},"Prot. areas", false);
map1.addLayer(c.bnds_w1.clip(roi),{palette: "blue"},"Int'l borders", true);
var map2 = ui.Map();
map2.setOptions('HYBRID');
map2.centerObject(ctr,10);
map2.setControlVisibility({mapTypeControl: false});
map2.add(ui.Label("post:  " + t3_date, {color: "blue"}));
map2.addLayer(image, pal_multi, "S1 VH pre & post", false);
map2.addLayer(image, {min:0.0132,max:0.0804, bands: ["VH_1"]}, "S1_VH_2020-10-26", false);
map2.addLayer(image, {min:0.0132,max:0.0804, bands: ["VH"]}, "S1_VH_2020-11-07", true);
//map2.addLayer(x(s2_20200524), pal_s2_false, 'S2_2020-05-24_false', false);
//map2.addLayer(x(s2_20200608), pal_s2_false, 'S2_2020-06-08_false', true);
map2.addLayer(c.pa_cam.clip(roi), {palette: "yellow"},"Prot. areas", false);
map2.addLayer(c.bnds_w1.clip(roi),{palette: "blue"},"Int'l borders", true);
var map3 = ui.Map();
map3.setOptions('HYBRID');
map3.centerObject(ctr,10);
map3.setControlVisibility({mapTypeControl: false});
map3.add(ui.Label("pre & post", {color: "red"}));
map3.addLayer(image, pal_multi, "S1 VH pre & post", true);
map3.addLayer(image, {min:0.0132,max:0.0804, bands: ["VH_1"]}, "S1_VH_2020-10-26", false);
map3.addLayer(image, {min:0.0132,max:0.0804, bands: ["VH"]}, "S1_VH_2020-11-07", false);
//map3.addLayer(x(s2_20200524), pal_s2_false, 'S2_2020-05-24_false', false);
//map3.addLayer(x(s2_20200608), pal_s2_false, 'S2_2020-06-08_false', false);
map3.addLayer(s1_diff, {palette: ['mediumblue']}, 'S1_change_2020-10-26_2020-11-07_blue', false);
map3.addLayer(s1_diff, {palette: ['red']}, 'S1_change_2020-10-26_2020-11-07_red', true);
map3.addLayer(c.pa_cam.clip(roi), {palette: "teal"},"Prot. areas", false);
map3.addLayer(c.bnds_w1.clip(roi),{palette: "gray"},"Int'l borders", true);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var title = ui.Label('Satellite-based mapping of flooding in Belize during Tropical Storm Eta (7 Nov. 2020)', {stretch:'horizontal',textAlign:'center',fontWeight:'bold',fontSize:'24px'});
var subtitle = ui.Label("right panel: changed areas (including potentially flooded areas) depicted in RED", {stretch:'horizontal',textAlign:'center',fontSize:'16px', color: "red"});
var credits = ui.Label('credit: contains modified European Space Agency / Copernicus Sentinel data', {stretch:'horizontal',textAlign:'center',fontSize:'14px'});
var linker = ui.Map.Linker([map1, map2, map3]);
var mapGrid = ui.Panel([map1, map2, map3], ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'});
ui.root.widgets().reset([title, credits, subtitle, mapGrid]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
var folder = 'x_tmp_gee_outputs';
Export.image.toDrive({image:image.float(), description:'export_drv', folder: folder, 
fileNamePrefix: 'bz_s1_dsc_20200527_20200608_30m', crs: 'EPSG:32616', region: roi, maxPixels: 100000000000}); 
*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////