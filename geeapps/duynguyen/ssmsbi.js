var table = ui.import && ui.import("table", "table", {
      "id": "users/duynguyen/2020/SM_HLNUG_field_boundary_crops_2018_selected"
    }) || ee.FeatureCollection("users/duynguyen/2020/SM_HLNUG_field_boundary_crops_2018_selected"),
    geometry = ui.import && ui.import("geometry", "table", {
      "id": "users/duynguyen/2020/SM_HLNUG"
    }) || ee.FeatureCollection("users/duynguyen/2020/SM_HLNUG");
// 1. Import required modules
var import_S1 = require("users/duynguyen/sbi_ssm_2020:import_S1_module");
var speckle_filter_S1 = require("users/duynguyen/sbi_ssm_2020:speckle_filter_S1_module");
// 2. Import Corine Land Cover 2012 map --> will be used as a mask
var corine = ee.ImageCollection('COPERNICUS/CORINE/V18_5_1/100m').first();
var corine_clip = corine.clip(geometry)
var agri_mask = corine_clip.select('landcover').gte(11).and(corine.lte(13))
// 3. Setup Visualization & Searching Params
var paletteSSM = ['c4c3d0','832803','AC3802','E8661A','FDD998','E9EFD9','CDE5F9','84B7F4','3769D3','1B2773'];
var ssmVis = {
  min: 0,
  max: 100,
  palette: paletteSSM
};
// 4. Setup input geometry
var selected_aoi = geometry;
// 5. Setup input time range (60 --> 275)
var startDate = "2014-01-01";
var endDate = "2021-01-01";
var start = ee.Date('2014-01-01');
var finish = ee.Date('2021-01-01');
// Difference in days between start and finish
var diff = finish.difference(start, 'day');
// Make a list of all dates
var range = ee.List.sequence(0, diff.subtract(1))
.map(function(day){return start.advance(day,'day')});
// 6. Loading the Sentinel-1 images
// 6.1. Loading the Sentinel-1 images
var s1 = import_S1.importData(selected_aoi, startDate, endDate);
print("Found ", s1.size(), "images");
print("Getting images: within time range & relative obit range");
var s1 = s1.filter(ee.Filter.inList('relativeOrbitNumber_start', [15, 66]))
print("Found ", s1.size(), "images");
print("Sorting data by time_start");
var s1 = s1.sort('system:time_start', false);
// 6.2. Clip (imageCollection) by study area
var s1_clip = s1.map(function(image) { return image.clip(selected_aoi); });
var s1_clip_vv = s1_clip.select(0)
// 7.START PROCESSING DATA WITHOUT SPECKE-FILTER
// 7.1. Single-time-denoise images
var s1_clip_vv_fil = s1_clip.map( function(img){ 
  var id  = img.id();
  var dateString = ee.Date(img.get('system:time_start')).format('dd-MM-yyyy');
  img = img.select('VV').rename(dateString);
  return speckle_filter_S1.toRefinedLee_Despeckle(img).copyProperties(img,['system:time_start','system:time_end']); });
// 7.2. Compute dry and wet reference
var dry_ref = s1_clip_vv.reduce(ee.Reducer.percentile([5]));
var wet_ref = s1_clip_vv.reduce(ee.Reducer.percentile([95]));
// 7.3. Compute sensitivity = wet_ref - dry_ref
var sensitivity = wet_ref.subtract(dry_ref).select('VV_p95').rename('sensitivity');
// 7.4. Compute soil moisture for selected image
// 7.2. Compute soil moisture for selected image (need to change!)
var s1_clip_vv_fil = s1_clip_vv_fil.filterDate('2019-03-20','2019-03-21').median();
var ssm = s1_clip_vv_fil.subtract(dry_ref).divide(sensitivity).multiply(100).select('sum');
// 7.3. Mask Surface Soil Moisure Using CLC-2012
var ssm_mask = agri_mask.multiply(ssm);
print("Soil moisture with mask");
print (ssm_mask)
// Create zones using an expression, display.
var ssm_mask_f = ssm_mask.expression(
    "(b('landcover') >= 100) ? 100" +
      ": (b('landcover') <= 0) ? 0" +
          ": b('landcover')"
);
// 8. Export Surface Soil moisture product (need to change)
Export.image.toDrive({
  image: ssm_mask_f,
  description: 'ssm_2019-03-20_single_mask_f',
  scale: 10,
  fileFormat: 'GeoTIFF',
  maxPixels: 1e13,
  region: geometry
});
// 9. Add Maps for viewing purpose
Map.addLayer(ssm.select(0), ssmVis,'s1_single_ssm');
Map.addLayer(ssm_mask.select(0), ssmVis,'s1_single_ssm_mask');
Map.addLayer(ssm_mask_f.select(0), ssmVis,'s1_single_ssm_mask_final');