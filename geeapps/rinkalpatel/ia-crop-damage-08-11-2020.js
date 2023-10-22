var mod09ga = ui.import && ui.import("mod09ga", "imageCollection", {
      "id": "MODIS/006/MOD09GA"
    }) || ee.ImageCollection("MODIS/006/MOD09GA"),
    sentinel2 = ui.import && ui.import("sentinel2", "imageCollection", {
      "id": "COPERNICUS/S2"
    }) || ee.ImageCollection("COPERNICUS/S2"),
    local_myd09ga = ui.import && ui.import("local_myd09ga", "imageCollection", {
      "id": "users/rinkalpatel/mydga_imc"
    }) || ee.ImageCollection("users/rinkalpatel/mydga_imc"),
    local_mod09ga = ui.import && ui.import("local_mod09ga", "imageCollection", {
      "id": "users/rinkalpatel/modga_imc"
    }) || ee.ImageCollection("users/rinkalpatel/modga_imc"),
    myd09ga = ui.import && ui.import("myd09ga", "imageCollection", {
      "id": "MODIS/006/MYD09GA"
    }) || ee.ImageCollection("MODIS/006/MYD09GA"),
    local_myd09gq = ui.import && ui.import("local_myd09gq", "imageCollection", {
      "id": "users/rinkalpatel/mydgq_imc"
    }) || ee.ImageCollection("users/rinkalpatel/mydgq_imc"),
    local_mod09gq = ui.import && ui.import("local_mod09gq", "imageCollection", {
      "id": "users/rinkalpatel/modgq_imc"
    }) || ee.ImageCollection("users/rinkalpatel/modgq_imc"),
    myd09gq = ui.import && ui.import("myd09gq", "imageCollection", {
      "id": "MODIS/006/MYD09GQ"
    }) || ee.ImageCollection("MODIS/006/MYD09GQ"),
    mod09gq = ui.import && ui.import("mod09gq", "imageCollection", {
      "id": "MODIS/006/MOD09GQ"
    }) || ee.ImageCollection("MODIS/006/MOD09GQ"),
    cdl_pred_2020_ia_il_ne = ui.import && ui.import("cdl_pred_2020_ia_il_ne", "image", {
      "id": "users/rinkalpatel/cdl_pred/usa/ia_il_ne_2020"
    }) || ee.Image("users/rinkalpatel/cdl_pred/usa/ia_il_ne_2020"),
    field_boundaries = ui.import && ui.import("field_boundaries", "table", {
      "id": "users/rinkalpatel/onfarm-planting/as-planted-2020-new"
    }) || ee.FeatureCollection("users/rinkalpatel/onfarm-planting/as-planted-2020-new"),
    storm_path = ui.import && ui.import("storm_path", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -95.83275788028593,
                42.62720964106115
              ],
              [
                -95.47718717672666,
                40.91576380247578
              ],
              [
                -88.59042671894885,
                40.86191403943139
              ],
              [
                -88.42042245670746,
                42.356073194476195
              ],
              [
                -90.41431816258029,
                42.768055471538304
              ],
              [
                -92.28940294563414,
                42.904830639483514
              ],
              [
                -93.87680023236037,
                42.82384509206713
              ],
              [
                -94.65599419023492,
                42.771824080956584
              ],
              [
                -95.26736185613488,
                42.70111751514193
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#0b4a8b",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #0b4a8b */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-95.83275788028593, 42.62720964106115],
          [-95.47718717672666, 40.91576380247578],
          [-88.59042671894885, 40.86191403943139],
          [-88.42042245670746, 42.356073194476195],
          [-90.41431816258029, 42.768055471538304],
          [-92.28940294563414, 42.904830639483514],
          [-93.87680023236037, 42.82384509206713],
          [-94.65599419023492, 42.771824080956584],
          [-95.26736185613488, 42.70111751514193]]]),
    S1 = ui.import && ui.import("S1", "imageCollection", {
      "id": "COPERNICUS/S1_GRD"
    }) || ee.ImageCollection("COPERNICUS/S1_GRD"),
    cdl_pred_2020_in = ui.import && ui.import("cdl_pred_2020_in", "image", {
      "id": "users/rinkalpatel/cdl_pred/usa/in_2020"
    }) || ee.Image("users/rinkalpatel/cdl_pred/usa/in_2020"),
    onfarm_2020 = ui.import && ui.import("onfarm_2020", "table", {
      "id": "users/rinkalpatel/onfarm-layers/all_cropzones_2020"
    }) || ee.FeatureCollection("users/rinkalpatel/onfarm-layers/all_cropzones_2020"),
    sar_east = ui.import && ui.import("sar_east", "image", {
      "id": "users/rinkalpatel/derecho_2020/sar/Severity_with_MF_East_modified_wt_cdl"
    }) || ee.Image("users/rinkalpatel/derecho_2020/sar/Severity_with_MF_East_modified_wt_cdl"),
    sar_north = ui.import && ui.import("sar_north", "image", {
      "id": "users/rinkalpatel/derecho_2020/sar/Severity_with_MF_North_modified_wt_cdl"
    }) || ee.Image("users/rinkalpatel/derecho_2020/sar/Severity_with_MF_North_modified_wt_cdl"),
    area_sar_east = ui.import && ui.import("area_sar_east", "table", {
      "id": "users/rinkalpatel/derecho_2020/sar/Area_Severity_with_MF_East_modified_wt_cdl"
    }) || ee.FeatureCollection("users/rinkalpatel/derecho_2020/sar/Area_Severity_with_MF_East_modified_wt_cdl"),
    area_sar_north = ui.import && ui.import("area_sar_north", "table", {
      "id": "users/rinkalpatel/derecho_2020/sar/Area_Severity_with_MF_North_modified_wt_cdl"
    }) || ee.FeatureCollection("users/rinkalpatel/derecho_2020/sar/Area_Severity_with_MF_North_modified_wt_cdl"),
    raster_sar_east = ui.import && ui.import("raster_sar_east", "image", {
      "id": "users/rinkalpatel/derecho_2020/sar/Ratio_image_East"
    }) || ee.Image("users/rinkalpatel/derecho_2020/sar/Ratio_image_East"),
    raster_sar_north = ui.import && ui.import("raster_sar_north", "image", {
      "id": "users/rinkalpatel/derecho_2020/sar/Ratio_image_North"
    }) || ee.Image("users/rinkalpatel/derecho_2020/sar/Ratio_image_North"),
    usa = ui.import && ui.import("usa", "table", {
      "id": "users/rinkalpatel/admin_boundaries/usa_bd_l2"
    }) || ee.FeatureCollection("users/rinkalpatel/admin_boundaries/usa_bd_l2"),
    raster_sar_top = ui.import && ui.import("raster_sar_top", "image", {
      "id": "users/rinkalpatel/derecho_2020/sar/Ratio_image_Top"
    }) || ee.Image("users/rinkalpatel/derecho_2020/sar/Ratio_image_Top"),
    raster_sar_bottom = ui.import && ui.import("raster_sar_bottom", "image", {
      "id": "users/rinkalpatel/derecho_2020/sar/Ratio_image_Bottom"
    }) || ee.Image("users/rinkalpatel/derecho_2020/sar/Ratio_image_Bottom"),
    pred_yield_2020 = ui.import && ui.import("pred_yield_2020", "imageCollection", {
      "id": "users/rinkalpatel/in-season-yield-pred/sangzi/corn"
    }) || ee.ImageCollection("users/rinkalpatel/in-season-yield-pred/sangzi/corn");
// CDL for masking
//var cdl_pred_2020 = ee.ImageCollection([cdl_pred_2020_ia_il_ne,cdl_pred_2020_in]).mosaic()
// Initialize Geometry
var state1 = 'Iowa'
var extent1 = ee.FeatureCollection(usa).filter(ee.Filter.stringStartsWith('NAME_1',state1))
var state2 = 'Illinois'
var extent2 = ee.FeatureCollection(usa).filter(ee.Filter.stringStartsWith('NAME_1',state2))
var state3 = 'Nebraska'
var extent3 = ee.FeatureCollection(usa).filter(ee.Filter.stringStartsWith('NAME_1',state3))
var state4 = 'Indiana'
var extent4 = ee.FeatureCollection(usa).filter(ee.Filter.stringStartsWith('NAME_1',state4))
var extent = extent1.merge(extent2).merge(extent3).merge(extent4)
// Initialize Palettes
var palettes = require('users/gena/packages:palettes');
var GnYlRd = palettes.colorbrewer.RdYlGn[9].reverse();
var ngeParams = {min:0,max:0.4,palette:GnYlRd}
var eviParams =  { min: 0, max: 1,
                     palette: [
                      'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
                      '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
                      '012E01', '011D01', '011301'
                      ]
                  }
var modis = ee.ImageCollection('MODIS/006/MOD13A1').first().select('EVI');
var modisProjection = modis.projection();
var landsat = ee.ImageCollection("LANDSAT/LO08/C01/T1_RT").first().select('B1')
var landsatProjection = landsat.projection();
// Functions
var get_cdl = function(extent,cdl_year) {
  var cdl = ee.ImageCollection('USDA/NASS/CDL')
                  .filter(ee.Filter.date(cdl_year+'-01-01',cdl_year+'-12-31'))
                  .first().select('cropland').clip(extent);
  cdl = cdl.updateMask(cdl.eq(1).or(cdl.eq(5)))
  return cdl
}
var boxcar = ee.Kernel.circle({
  radius: 1, units: 'pixels', magnitude: 1
});
var stackCollection = function(collection) {
    //var first = ee.Image(collection.first());
    var first = ee.Image([]);
    var appendBands = function(image, previous) {
      return ee.Image(previous).addBands(image);
    };
    return ee.Image(collection.iterate(appendBands, first));
};
var remove_modis_clouds = function(scene) {
    var img = ee.Image(scene)
    var mask = img.expression("(state%8) == 0 ? 1 : 0",{'state':img.select('state')}).eq(1)
    return scene.updateMask(mask);
};
var calculateEVI = function(scene) {
    var img = ee.Image(scene)
    var dateString = ee.Date(img.get('system:time_start')).format('yyyy-MM-dd');
    var evi = img.expression('(2.5 * (NIR - RED)) / (NIR + 2.4 * RED + 10000)', {
        'NIR': img.select('b02'),
        'RED': img.select('b01')});
    var mask = img.expression("(state%8) == 0 ? 1 : 0",{'state':img.select('state')}).eq(1)
    evi = evi.updateMask(mask);
    evi = evi.set('system:time_start',scene.get('system:time_start'))
    evi = evi.rename('evi')
    return evi;
};
var get_RGB = function(start,end,extent){
  var convert_int = function(scene){
    return scene.toUint32()
  }
  // GEE Collection 
  var myd09ga_gee = ee.ImageCollection("MODIS/006/MYD09GA")
              .select(['sur_refl_b01','sur_refl_b04','sur_refl_b03','state_1km'],['red','green','blue','state'])
              .filterDate(start,end).filterBounds(extent)
              .map(convert_int)
  // Uploaded by Self - Near-Real-Time images
  var myd09ga_rt = local_myd09ga.select(['b2','b5','b4','b1'],['red','green','blue','state'])
              .filterDate(start,end)
              .filterBounds(extent)
              .map(convert_int)
  // Combine
  var myd09ga_merge = ee.ImageCollection(myd09ga_gee.merge(myd09ga_rt)).map(remove_modis_clouds)
  return myd09ga_merge
}
var get_EVI = function(start,end,extent){
  // Default on GEE
  var mod09gq_gee = ee.ImageCollection("MODIS/006/MOD09GQ").select(['sur_refl_b01', 'sur_refl_b02'],['b01', 'b02'])
              .filterDate(start,end)
              .filterBounds(extent);
  var mod09ga_gee = ee.ImageCollection("MODIS/006/MOD09GA").select(['state_1km'],['state'])
              .filterDate(start,end)
              .filterBounds(extent);
  var myd09gq_gee = ee.ImageCollection("MODIS/006/MYD09GQ").select(['sur_refl_b01', 'sur_refl_b02'],['b01', 'b02'])
              .filterDate(start,end)
              .filterBounds(extent);
  var myd09ga_gee = ee.ImageCollection("MODIS/006/MYD09GA").select(['state_1km'],['state'])
              .filterDate(start,end)
              .filterBounds(extent);
  // Uploaded by Self - Near-Real-Time images
  var mod09gq_rt = local_mod09gq.select(['b1', 'b2'],['b01', 'b02'])
              .filterDate(start,end)
              .filterBounds(extent);
  var mod09ga_rt = local_mod09ga.select(['b1'],['state'])
              .filterDate(start,end)
              .filterBounds(extent);
  var myd09gq_rt = local_myd09gq.select(['b1', 'b2'],['b01', 'b02'])
              .filterDate(start,end)
              .filterBounds(extent);
  var myd09ga_rt = local_myd09ga.select(['b1'],['state'])
              .filterDate(start,end)
              .filterBounds(extent);
  // Combine
  var mod09gq_merge = mod09gq_gee.merge(mod09gq_rt)
  var mod09ga_merge = mod09ga_gee.merge(mod09ga_rt)
  var myd09gq_merge = myd09gq_gee.merge(myd09gq_rt)
  var myd09ga_merge = myd09ga_gee.merge(myd09ga_rt)
  var innerJoin = ee.Join.inner();
  var filterTimeEq = ee.Filter.equals({
    leftField: 'system:time_start',
    rightField: 'system:time_start'
  });
  // Combine GQ + GA
  var joined_mod = innerJoin.apply(mod09gq_merge,mod09ga_merge,filterTimeEq);
  var mod09qs = joined_mod.map(function(feature) {
    return ee.Image.cat(feature.get('primary'), feature.get('secondary'));
  });
  var joined_myd = innerJoin.apply(myd09gq_merge,myd09ga_merge,filterTimeEq);
  var myd09qs = joined_myd.map(function(feature) {
    return ee.Image.cat(feature.get('primary'), feature.get('secondary'));
  });
  // Mask and Calculate EVI
  var modEVI = mod09qs.map(calculateEVI);
  var mydEVI = myd09qs.map(calculateEVI);
  // Combine 
  var mod_evi_collection = ee.ImageCollection(modEVI.merge(mydEVI))
  //return mod_evi_collection
  return ee.ImageCollection(mydEVI)
}
var clean_S2_collection_left = function(scene) {
  var img = ee.Image(scene)
  var dateString = ee.Date(img.get('system:time_start')).format('yyyy-MM-dd');
  //var evi = img.expression('(2.5 * (NIR - RED)) / (NIR + 2.4 * RED + 10000)', {
  var evi = img.expression('(NIR - RED) / (NIR + RED)', {
      'RED': img.select('B4'),
      'NIR': img.select('B8')});
  var cloud_high_mask = img.expression("(state%9) == 0 ? 1 : 0",{'state':img.select('QA60')}).eq(1);
  var cloud_med_mask = img.expression("(state%8) == 0 ? 1 : 0",{'state':img.select('QA60')}).eq(1);
  var shadow_mask = img.expression("(state%3) == 0 ? 1 : 0",{'state':img.select('QA60')}).eq(1);
  //img = img.updateMask(cloud_high_mask);
  //img = img.updateMask(cloud_med_mask);
  //img = img.updateMask(shadow_mask);
  //var evi_msk = evi.gt(0.2)
  //var red_msk = img.select('B4').lt(1500)
  //var nir_msk = img.select('B8').gt(3000)
  //img= img.updateMask(nir_msk).updateMask(red_msk)
  var wvp_ratio = img.expression('(NIR-WVP)/(NIR+WVP)',{
                'NIR':img.select('B8'),
                'WVP':img.select('WVP')})
  //var red_msk = img.select('B4').gt(100)
  //var green_msk = img.select('B3').gt(100)
  //var blue_msk = img.select('B2').gt(100)
  //img= img.updateMask(red_msk).updateMask(green_msk).updateMask(blue_msk)
  img = img.updateMask(wvp_ratio.gt(0))
  return img ;
};
var clean_S2_collection_right = function(scene) {
  var img = ee.Image(scene)
  var dateString = ee.Date(img.get('system:time_start')).format('yyyy-MM-dd');
  //var evi = img.expression('(2.5 * (NIR - RED)) / (NIR + 2.4 * RED + 10000)', {
  var evi = img.expression('(NIR - RED) / (NIR + RED)', {
      'RED': img.select('B4'),
      'NIR': img.select('B8')});
  var cloud_high_mask = img.expression("(state%9) == 0 ? 1 : 0",{'state':img.select('QA60')}).eq(1);
  var cloud_med_mask = img.expression("(state%8) == 0 ? 1 : 0",{'state':img.select('QA60')}).eq(1);
  var shadow_mask = img.expression("(state%3) == 0 ? 1 : 0",{'state':img.select('QA60')}).eq(1);
  //img = img.updateMask(cloud_high_mask);
  //img = img.updateMask(cloud_med_mask);
  //img = img.updateMask(shadow_mask);
  //var evi_msk = evi.gt(0.2)
  var wvp_ratio = img.expression('(NIR-WVP)/(NIR+WVP)',{
                'NIR':img.select('B8'),
                'WVP':img.select('WVP')})
  //var red_msk = img.select('B4').gt(100)
  //var green_msk = img.select('B3').gt(100)
  //var blue_msk = img.select('B2').gt(100)
  //img= img.updateMask(red_msk).updateMask(green_msk).updateMask(blue_msk)
  img = img.updateMask(wvp_ratio.gt(0))
  return img ;
};
var filterSpeckles = function(img) {
  var vv = img.select('VV') //select the VV polarization band
  var vv_smoothed = vv.focal_median(10,'square','meters').rename('VV_Filtered') //Apply a focal median filter
  return img.addBands(vv_smoothed) // Add filtered VV band to original image
}
//////////////////////////
// Initialize
// Create composites
var start_1 = '2020-07-10'
var end_1 = '2020-08-10'
var start_2 = '2020-08-12'
var end_2 = '2020-08-30'
// CDL
var cdl_pred_2020 = get_cdl(extent,2018)
// Split Screen Setup
var left_map = ui.Map();
var right_map = ui.Map();
var left_title = ui.Label('Before 2020-08-11');
left_title.style().set('position', 'top-left');
left_map.add(left_title)
var right_title = ui.Label('After 2020-08-11');
right_title.style().set('position', 'top-right');
right_map.add(right_title)
//////////////////////
// MODIS 
var rgb_viz = {min:0, max:1000,bands:['red','green','blue']};
var evi_1 = get_EVI(start_1,end_1,extent).max().clip(extent).updateMask(cdl_pred_2020).convolve(boxcar)
var evi_2 = get_EVI(start_2,end_2,extent).max().clip(extent).updateMask(cdl_pred_2020).convolve(boxcar)
var rgb_1 = get_RGB(start_1,end_1,extent).min().clip(extent).updateMask(cdl_pred_2020).convolve(boxcar)
var rgb_2 = get_RGB(start_2,end_2,extent).min().clip(extent).updateMask(cdl_pred_2020).convolve(boxcar)
// Create some form of index - NGE
var nge_1 = rgb_1.expression('(2*G - R - B) / (2*G + R + B)', {
      'R': rgb_1.select('red'),
      'G': rgb_1.select('green'),
      'B': rgb_1.select('blue')}).rename('before')
var nge_2 = rgb_2.expression('(2*G - R - B) / (2*G + R + B)', {
      'R': rgb_2.select('red'),
      'G': rgb_2.select('green'),
      'B': rgb_2.select('blue')}).rename('after')
var modis_nge = ee.Image.cat(nge_1,nge_2)
var diff_nge = modis_nge.expression('(before-after)/(before+after)',{
                'before':modis_nge.select('before'),
                'after':modis_nge.select('after')})
left_map.addLayer(rgb_1,rgb_viz,'RBG : Before 2020-08-11',1);
left_map.addLayer(evi_1,eviParams,'EVI : Before 2020-08-11',0);
//left_map.addLayer(nge_1,eviParams,'NGE : Before 2020-08-11',0);
right_map.addLayer(rgb_2,rgb_viz,'RGB : After 2020-08-11',1)
right_map.addLayer(evi_2,eviParams,'EVI : After 2020-08-11',0);
//right_map.addLayer(nge_2,eviParams,'NGE : After 2020-08-11',0);
var mod_evi_thresh = 0.35
var mod_nge_thresh = 0.35
var final_modis_mask = diff_nge.gte(mod_nge_thresh).updateMask(evi_2.lt(mod_evi_thresh))
diff_nge = diff_nge.updateMask(final_modis_mask).convolve(boxcar)
right_map.addLayer(diff_nge,ngeParams,'NGE-diff : MODIS',0)
///////////////////
/// Sentinel-2
var s2rgbVis = {min:[0,0,0],max:[1500,1500,1500],bands: ['B4', 'B3', 'B2'],};
var s2mask = require('users/fitoprincipe/geetools:cloud_masks').sentinel2;
var s2_left = ee.ImageCollection("COPERNICUS/S2_SR")
  .filterBounds(extent)
  .filterDate(start_1,end_1)
  //.map(s2mask())
  .map(clean_S2_collection_left);
var s2_right = ee.ImageCollection("COPERNICUS/S2_SR")
  .filterBounds(extent)
  .filterDate(start_2,end_2)
  //.map(s2mask())
  .map(clean_S2_collection_right);
s2_left = s2_left.min().clip(extent).updateMask(cdl_pred_2020)
s2_right = s2_right.min().clip(extent).updateMask(cdl_pred_2020)
var s2_evi_left = s2_left.expression('(2.5 * (NIR - RED)) / (NIR + 2.4 * RED + 10000)', {
                    'RED': s2_left.select('B4'),
                    'NIR': s2_left.select('B8')})
var s2_nge_left = s2_left.expression(
                  '(green-red)/(green+red)',{
                  'green' : s2_left.select('B3'), 
                  'red' : s2_left.select('B4')
                  }).rename('before')
var s2_evi_right = s2_right.expression('(2.5 * (NIR - RED)) / (NIR + 2.4 * RED + 10000)', {
                    'RED': s2_right.select('B4'),
                    'NIR': s2_right.select('B8')})
var s2_nge_right = s2_right.expression(
                  '(green-red)/(green+red)',{
                  'green' : s2_right.select('B3'), 
                  'red' : s2_right.select('B4')
                  }).rename('after')
var s2_nge = ee.Image.cat(s2_nge_left,s2_nge_right)
var s2_diff_nge = s2_nge.expression('(before-after)/(before+after)',{
                'before':s2_nge.select('before'),
                'after':s2_nge.select('after')})
var s2_evi_thresh = 0.35
var s2_nge_thresh = 0.35
var final_s2_mask = s2_diff_nge.gt(s2_nge_thresh).updateMask(s2_evi_right.lt(s2_evi_thresh))
                    //.updateMask(evi_2.lt(mod_evi_thresh))
//s2_diff_nge = s2_diff_nge.updateMask(final_s2_mask).convolve(boxcar)
s2_diff_nge = s2_diff_nge.convolve(boxcar)
left_map.addLayer(s2_left,s2rgbVis,'Sentinel-2 : RGB',1);
left_map.addLayer(s2_evi_left,eviParams,'EVI-Before : S2',0)
right_map.addLayer(s2_right,s2rgbVis,'Sentinel-2 : RGB',1);
right_map.addLayer(s2_diff_nge,ngeParams,'NGE-diff : S2',0)
right_map.addLayer(s2_evi_right,eviParams,'EVI-After : S2',0)
////////////////////
// SAR
var rinkal_thresh = 0.09
var sarParams = {min:0.05,max:0.2,palette:GnYlRd}
var sar_left = S1.filterDate(start_1,end_1).filterBounds(extent)
          .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
          .filter(ee.Filter.eq('instrumentMode', 'IW'))
          .select('VV')
          .filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'))
          .map(function(image){
            var edge = image.lt(-40.0);
            var maskedImage = image.mask().and(edge.not());
            return image.updateMask(maskedImage);})
          .map(filterSpeckles)
var sar_right = S1.filterDate(start_2,end_2).filterBounds(extent)
          .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
          .filter(ee.Filter.eq('instrumentMode', 'IW'))
          .select('VV')
          .filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'))
          .map(function(image){
            var edge = image.lt(-40.0);
            var maskedImage = image.mask().and(edge.not());
            return image.updateMask(maskedImage);})
          .map(filterSpeckles)
sar_left = sar_left.mean().select('VV_Filtered').clip(extent).updateMask(cdl_pred_2020).convolve(boxcar)
sar_right = sar_right.mean().select('VV_Filtered').clip(extent).updateMask(cdl_pred_2020).convolve(boxcar)
left_map.addLayer(sar_left,{},'Sar Left',0)
right_map.addLayer(sar_right,{},'Sar Right',0)
var descChange = ee.Image.cat(sar_left,sar_right)
var sar_diff = descChange.expression('((before-after)/(before+after))', {
                                      'after': descChange.select('VV_Filtered_1'),
                                      'before': descChange.select('VV_Filtered')})
var final_structure_damage_mask = sar_diff.abs().gt(rinkal_thresh)  
var final_structure_damage = sar_diff.abs().updateMask(final_structure_damage_mask)
var final_complete_damage_mask = s2_evi_left.gt(0.5).updateMask(s2_evi_right.lt(0.3))
var final_complete_damage = s2_diff_nge.updateMask(final_complete_damage_mask)
right_map.addLayer(final_structure_damage,sarParams,'NDVV-Crop-Structure-Damage',0)
right_map.addLayer(final_complete_damage,ngeParams,'Complete-Crop-Damage',1)
//////////////////////
// Niyi
var niyi_thresh = 1.5
var niyisarParams = {min:1,max:2.5,palette:GnYlRd} // Niyi
var niyi_east = raster_sar_east.updateMask(raster_sar_east.gt(niyi_thresh)).updateMask(cdl_pred_2020)
//right_map.addLayer(niyi_east,niyisarParams,'Damage-Intensity-SAR-East',0)
var niyi_north = raster_sar_north.updateMask(raster_sar_north.gt(niyi_thresh)).updateMask(cdl_pred_2020)
//right_map.addLayer(niyi_north,niyisarParams,'Damage-Intensity-SAR-North',0)
var niyi_top = raster_sar_top.updateMask(raster_sar_top.gt(niyi_thresh)).updateMask(cdl_pred_2020)
//right_map.addLayer(niyi_top,niyisarParams,'Damage-Intensity-SAR-Top',0)
var niyi_bottom = raster_sar_bottom.updateMask(raster_sar_bottom.gt(niyi_thresh)).updateMask(cdl_pred_2020)
//right_map.addLayer(niyi_bottom,niyisarParams,'Damage-Intensity-SAR-Bottom',0)
var niyi_final_structure_damage = ee.ImageCollection([niyi_east,niyi_north,niyi_top,niyi_bottom])
                                  .reduce(ee.Reducer.max())
right_map.addLayer(niyi_final_structure_damage,niyisarParams,'Ratio-Crop-Structure-Damage',1)
//////////////////
// Wind Speed
var ws_derecho = ee.ImageCollection('NOAA/NWS/RTMA')
                  .filter(ee.Filter.date('2020-08-10', '2020-08-12'));
var windSpeed = ws_derecho.select('WIND').reduce(ee.Reducer.max()).clip(extent);
var windSpeedVis = {
  min: 3.0,
  max: 20.0,
  palette: ['001137', '01abab', 'e7eb05', '620500'],
};
right_map.addLayer(windSpeed, windSpeedVis, 'Max Wind Speed : [08-10,08-12]',0);
// OnFarm Fields
//right_map.addLayer(onfarm_2020.filterBounds(extent),{},'Fields-2020',0)
////////////////////////
/////////////////////////
var linker = ui.Map.Linker([ui.root.widgets().get(0),left_map,right_map]);
var splitPanel = ui.SplitPanel({
  firstPanel: linker.get(1),
  secondPanel: linker.get(2),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
//
ui.root.widgets().reset([splitPanel]);
var coords=ee.Geometry(extent.getInfo()['features'][0]['geometry']).centroid().getInfo()['coordinates']
linker.get(0).setCenter(coords[0],coords[1], 3);
//////////////////////////////
// Reduce to county estimates
// IA/IL
var reduced_extent = extent1.merge(extent2)
var null_geometry = function(feature){
    return feature.setGeometry(null)
}
// Total and county valid acres
var valid_crop_area = cdl_pred_2020.updateMask(s2_evi_left.gt(0.35)).clip(storm_path)
var area = ee.Image.pixelArea();
var cropArea = valid_crop_area.gt(0).reproject({crs: modisProjection})
                .reduceResolution({reducer: ee.Reducer.mean()})
                .multiply(area).multiply(0.000247105).rename('cropArea')
var cropAcres = cropArea.reduceRegion({
    reducer: ee.Reducer.sum(), 
    geometry: storm_path, 
    scale: 250,
});
print(cropAcres)
var countycropAcres = cropArea.reduceRegions(reduced_extent,ee.Reducer.sum(),250);
print(countycropAcres)
// Total and County Damage
var final_damage = ee.ImageCollection([final_structure_damage.select(['VV_Filtered'],['b1']),
                    niyi_final_structure_damage.select(['b1_max'],['b1']),
                    final_complete_damage.select(['before'],['b1'])])
                   .reduce(ee.Reducer.max()) // niyi + rinkal
                   .clip(storm_path)
var area = ee.Image.pixelArea();
var damageArea = final_damage.gt(0).reproject({crs: modisProjection})
                .reduceResolution({reducer: ee.Reducer.mean()})
                .multiply(area).multiply(0.000247105).rename('damageArea');
var damageAcres = damageArea.reduceRegion({
    reducer: ee.Reducer.sum(), 
    geometry: storm_path, 
    scale: 250,
});
print(damageAcres)
var countydamageAcres = damageArea.reduceRegions(reduced_extent,ee.Reducer.sum(),250);
print(countydamageAcres)
// Limit counties by damage
// 5k acres
var max_damage_acres = 10000
var storm_area = countydamageAcres.filter(ee.Filter.notNull(['sum'])).filter(ee.Filter.gt('sum',max_damage_acres))
var crop_area = countycropAcres.filterBounds(storm_area)
print(crop_area)
print(storm_area)
right_map.addLayer(storm_path,{},'derecho-2020-path',0)
right_map.addLayer(storm_area,{},'storm-damaged counties (>='+max_damage_acres/1000+'k acres)',0)
//right_map.addLayer(crop_area,{},'crop-area counties (>='+max_damage_acres/1000+'k acres)',0)
///////////////////////////////
// Crop Production Estimates
var palettes = require('users/gena/packages:palettes');
var viridis = palettes.matplotlib.viridis[7].reverse();
var corn_yld_params = {min:100,max:250,palette:viridis}
var yld_start_date = '2020-08-22'
var yld_end_date = '2020-08-23'
var valid_yld = function(img){
      img = img.updateMask(img.select(['b1']).gt(0))
      return(img)
}
var inseason_yld = pred_yield_2020.select(['b1']).filterDate(yld_start_date,yld_end_date)
                   .map(valid_yld).reduce(ee.Reducer.mean()).clip(storm_path)
var nan_mask = inseason_yld.gt(0)
inseason_yld = inseason_yld.updateMask(nan_mask)
//var crop_histogram_before = valid_crop_area.reproject({crs: modisProjection}).
//                     reduceRegion({geometry:storm_path,reducer: ee.Reducer.frequencyHistogram(),scale: 250})
//print(crop_histogram_before)
var county_corn_cdl = valid_crop_area.updateMask(valid_crop_area.eq(1))
//right_map.addLayer(county_corn_cdl,{},'Corn-CDL-2020',0)
//right_map.addLayer(inseason_yld,corn_yld_params,'In-season-Yield-2020',0)
// Yield per county
var county_corn_yield=inseason_yld.reproject({crs: modisProjection})
                      .reduceResolution({reducer: ee.Reducer.mean()})
                      .reduceRegions(reduced_extent,ee.Reducer.mean())
print(county_corn_yield)
// Corn area per county
var county_corn_area = county_corn_cdl.gt(0).reproject({crs: modisProjection})
                .reduceResolution({reducer: ee.Reducer.mean()})
                .multiply(area).multiply(0.000247105).rename('cornArea');
var cornAcres = county_corn_area.reduceRegion({
    reducer: ee.Reducer.sum(), 
    geometry: storm_path, 
    scale: 250,
});
print(cornAcres)
var countycornAcres = county_corn_area.reduceRegions(storm_area,ee.Reducer.sum(),250);
// County corn damage area
var county_corn_damage_area = county_corn_cdl.updateMask(final_damage).gt(0).reproject({crs: modisProjection})
                      .reduceResolution({reducer: ee.Reducer.mean()})
                      .multiply(area).multiply(0.000247105).rename('cornDamageArea');
var corndamageAcres = county_corn_damage_area.reduceRegion({
    reducer: ee.Reducer.sum(), 
    geometry: storm_path, 
    scale: 250,
});
print(corndamageAcres)
var countycorndamageAcres = county_corn_damage_area.reduceRegions(storm_area,ee.Reducer.sum(),250)
                            .filter(ee.Filter.gt('sum',0));
print(countycorndamageAcres)
//////////////////////////////
// Export asset
var gcbucket='glr-gee'
var prefix='users/rinkalpatel/yield-modeling/united-states/derecho-2020'
var filename1=prefix+'/county_damaged_acres'
var filename2=prefix+'/county_total_acres'
var filename3=prefix+'/county_corn_average_yield'
var filename4=prefix+'/county_corn_all_acres'
var filename5=prefix+'/county_corn_damage_acres'
var variety_props_count = ['GID_1','GID_2','sum']
var variety_props_mean = ['GID_1','GID_2','mean']
Export.table.toCloudStorage({
    collection: storm_area,
    description:'storm_export',
    bucket: gcbucket,
    fileNamePrefix: filename1,
    fileFormat: 'CSV',
    selectors: variety_props_count
});
Export.table.toCloudStorage({
    collection: crop_area,
    description:'crop_export',
    bucket: gcbucket,
    fileNamePrefix: filename2,
    fileFormat: 'CSV',
    selectors: variety_props_count
});
Export.table.toCloudStorage({
    collection: county_corn_yield,
    description:'corn_yld_export',
    bucket: gcbucket,
    fileNamePrefix: filename3,
    fileFormat: 'CSV',
    selectors: variety_props_mean
});
Export.table.toCloudStorage({
    collection: countycornAcres,
    description:'corn_corn_acres_export',
    bucket: gcbucket,
    fileNamePrefix: filename4,
    fileFormat: 'CSV',
    selectors: variety_props_count
});
Export.table.toCloudStorage({
    collection: countycorndamageAcres,
    description:'corn_damage_acres_export',
    bucket: gcbucket,
    fileNamePrefix: filename5,
    fileFormat: 'CSV',
    selectors: variety_props_count
});