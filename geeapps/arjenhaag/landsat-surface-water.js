var ExampleImage_AmuDarya = ee.Image("users/arjenhaag/SurfaceWaterTool/SurfaceWaterTool_Example_AmuDarya"),
    ExampleImage_AmuDarya_small = ee.Image("users/arjenhaag/SurfaceWaterTool/SurfaceWaterTool_Example_AmuDarya_small"),
    ExampleImage_AmuDarya2 = ee.Image("users/arjenhaag/SurfaceWaterTool/SurfaceWaterTool_Example_AmuDarya2"),
    ExampleImage_AmuDarya2_small = ee.Image("users/arjenhaag/SurfaceWaterTool/SurfaceWaterTool_Example_AmuDarya2_small"),
    ExampleImage_LakeFolsom = ee.Image("users/arjenhaag/SurfaceWaterTool/SurfaceWaterTool_Example_LakeFolsom"),
    ExampleImage_LakeFolsom_small = ee.Image("users/arjenhaag/SurfaceWaterTool/SurfaceWaterTool_Example_LakeFolsom_small"),
    ExampleImage_NigerInnerDelta = ee.Image("users/arjenhaag/SurfaceWaterTool/SurfaceWaterTool_Example_NigerInnerDelta"),
    ExampleImage_NigerInnerDelta_small = ee.Image("users/arjenhaag/SurfaceWaterTool/SurfaceWaterTool_Example_NigerInnerDelta_small"),
    ExampleImage_PhnomPenh = ee.Image("users/arjenhaag/SurfaceWaterTool/SurfaceWaterTool_Example_PhnomPenh"),
    ExampleImage_PhnomPenh2 = ee.Image("users/arjenhaag/SurfaceWaterTool/SurfaceWaterTool_Example_PhnomPenh2"),
    ExampleImage_Ucayali = ee.Image("users/arjenhaag/SurfaceWaterTool/SurfaceWaterTool_Example_Ucayali"),
    ExampleImage_Ucayali_small = ee.Image("users/arjenhaag/SurfaceWaterTool/SurfaceWaterTool_Example_Ucayali_small"),
    ExampleImage_ShamkirReservoir = ee.Image("users/arjenhaag/SurfaceWaterTool/SurfaceWaterTool_Example_ShamkirReservoir"),
    ExampleImage_ShamkirReservoir_small = ee.Image("users/arjenhaag/SurfaceWaterTool/SurfaceWaterTool_Example_ShamkirReservoir_small"),
    ExampleImage_ShamkirReservoir_small2 = ee.Image("users/arjenhaag/SurfaceWaterTool/SurfaceWaterTool_Example_ShamkirReservoir_small2"),
    ExampleImage_ShwegyinReservoir = ee.Image("users/arjenhaag/SurfaceWaterTool/SurfaceWaterTool_Example_ShwegyinReservoir"),
    ExampleImage_ShwegyinReservoir_small = ee.Image("users/arjenhaag/SurfaceWaterTool/SurfaceWaterTool_Example_ShwegyinReservoir_small"),
    Examples_metadata = ee.FeatureCollection("ft:1ZcvW6q5t4yTRNbtBgt93mspDzMtwQAmW2tSUcOSH"),
    HAND = ee.Image("users/gena/GlobalHAND/30m/hand-5000");
// Landsat Surface Water Tool
/*
Author: Arjen Haag (Deltares)
Version: 1.0 (December 2016)
Contributions:
- overall:                Gennaddi Donchyts, Jaap Schellekens, Hessel Winsemius (Deltares)
- cloud busting function: Ian Housman and Carson Stam
- defringing function:    Bonnie Ruefenacht (RedCastle Resources, Inc.)
This tool builds on the work by Gennadii Donchyts and others (see reference below) by utilizing percentiles
to obtain a single mosaic image from the full stack of Landsat satellite images. From this, the (Modified)
Normalized Difference Water Index [(M)NDWI] is calculated, over which a threshold is applied to classify pixels
as water. To reduce the effect of vegetation and (hill)shadows, masks using NDVI and HAND are applied on the
result. Optionally, defringe and/or cloud busting functions can be run over all images before the percentile
reduction occurs.
The tool has a number of additional options, such as 'splitting up' the defined time period, to asses changes
in  surface water over time. It is also possible to calculate results based on monthly values. Additional output
can be created if desired, such as data quality graphs (showing cloud cover, images per month and images per
satellite), calculated water surface area (either permanent and temporary for a single time period, or permanent
water over time if multiple periods are activated). These are not active by default to reduce the memory load.
A simplified version of this tool has been deployed online for the SERVIR-Mekong project,
which can be accessed without a Google Earth Engine account. See also:
- web application: http://surface-water.adpc.net/
- project page:    https://servir.adpc.net/tools/surface-water-mapping-tool
- GitHub page:     https://github.com/Servir-Mekong/SurfaceWaterTool
Reference:
Gennadii Donchyts, Jaap Schellekens, Hessel Winsemius, Elmar Eisemann and Nick van de Giesen (2016)
30 m Resolution Surface Water Mask Including Estimation of Positional and Thematic Differences Using Landsat 8, 
SRTM and OpenStreetMap: A Case Study in the Murray-Darling Basin, Australia. Remote Sensing, 8(5), 386.
*/
// -------------------------------------------------------------------------------------------------------- //
// Imports / constants
// -------------------------------------------------------------------------------------------------------- //
// default values for input parameters
var default_startdate    = '2015-01-01';
var default_enddate      = '2015-12-31';
var default_timeslice    = 1;
var default_do_months    = false;
var default_pcnt_perm    = 40;
var default_pcnt_temp    = 8;
var default_water_thresh = 0.3;
var default_ndvi_thresh  = 0.5;
var default_hand_thresh  = 50;
var default_cloud_thresh = -1;
var default_defringe     = false;
// default values for other controls
var default_quickscan_info = true;
var default_console_info   = false;
var default_area_calc      = false;
var default_cloudbust_test = false;
var default_prev_update    = false;
// Landsat band names
var LC457_BANDS = ['B1',    'B1',   'B2',    'B3',  'B4',  'B5',    'B7'];
var LC8_BANDS   = ['B1',    'B2',   'B3',    'B4',  'B5',  'B6',    'B7'];
var STD_NAMES   = ['blue2', 'blue', 'green', 'red', 'nir', 'swir1', 'swir2'];
// assign large (positive!) HAND value to value found in strange horizontal lines (-99999), so it is masked unless user specifies a very large threshold
// var HAND = HAND.where(HAND.lt(0), 1000);
// visual parameters for percentile layers
var pcnt_viz_params = {min:0.06, max:0.5, gamma:1.5};
// colour rendering for water layers
var water_style = '\
<RasterSymbolizer>\
  <ColorMap extended="true" >\
    <ColorMapEntry color="#ffffff" quantity="0.0" label="-1"/>\
    <ColorMapEntry color="#9999ff" quantity="1.0" label="-1"/>\
    <ColorMapEntry color="#00008b" quantity="2.0" label="-1"/>\
  </ColorMap>\
</RasterSymbolizer>';
var water_slices_colours_list = ['1f78b4', '33a02c', 'e31a1c', 'a6cee3', 'ff7f00', 'b2df8a',
                                 '6a3d9a', 'fb9a99', 'b15928', 'fdbf6f', 'cab2d6', 'c8c454'];
var months_palette = ['ffffff', 'c8c454', 'cab2d6', 'fdbf6f', 'b15928', 'fb9a99', '6a3d9a',
                      'b2df8a', 'ff7f00', 'a6cee3', 'e31a1c', '33a02c', '1f78b4'];
// milliseconds per day
var millisPerDay = 86400000;
// list of monthly indices/names
var list_months_index = ee.List.sequence(1, 12);
var list_months_short = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var list_months_long  = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                          'August', 'September', 'October', 'November', 'December'];
// initial location
// var initial_geometry = ee.Geometry.Polygon(
var geometry = ee.Geometry.Polygon(
        [[[104.6942138671875, 12.023203053704641], [104.50469970703125, 11.193221105730306],
          [105.41107177734375, 11.187832381788969],[105.55801391601562, 12.024546215925072]]]);
// -------------------------------------------------------------------------------------------------------- //
// Functions
// -------------------------------------------------------------------------------------------------------- //
// filter images
function filterImages(image_collection, bounds, dates) {
  return image_collection. filterBounds(bounds).filterDate(dates[0], dates[1].advance(1, 'day'));
}
// merge permanent water layers from time slices into single image
function mergeWaterSlices(water_slices, nr_slices) {
  // iterate function to incrementally update image
  function updateImageIterate(index, img) {
    var prev_img = ee.Image(img);
    var curr_img = ee.Image(water_slices.get(index));
    var new_img  = prev_img.where(curr_img.unmask(0).eq(2), ee.Number(index).add(1));
    return new_img;
  }
  // construct input for iterate function
  var index_list          = ee.List.sequence(1, nr_slices-1);
  var first_img           = ee.Image(water_slices.get(0)).unmask(0).eq(2);
  // call iterate function and return updated single image
  var merged_water_slices = index_list.iterate(updateImageIterate, first_img);
  return ee.Image(merged_water_slices).clip(geometry);
}
// get properties from image (map over list of images to return list)
function getProperty(ic, property) {
  return ic.toList(ic.size()).map(function(img) {
    // check for specific properties that might need some editing
    if (property == 'DATE_ACQUIRED') {
      // return ee.Date(ee.Image(img).get(property));
      return ee.Date(ee.Image(img).get(property)).millis();
    } else if (property == 'SPACECRAFT_ID') {
      var temp_spacecraft_id = ee.String(ee.Image(img).get(property));
      temp_spacecraft_id = temp_spacecraft_id.replace('Landsat', 'LANDSAT_');
      return temp_spacecraft_id;
    // otherwise, just return the property as is
    } else {
      return ee.Image(img).get(property);
    }
  });
}
// cloud busting
// (https://code.earthengine.google.com/63f075a9e212f6ed4770af44be18a4fe, Ian Housman and Carson Stam)
// adapted to be able to use within another function with ICs and/or cloud thresholds only defined there:
function bustCloudsIC(ic, cloud_thresh) {
  return ic.map(function(img) {
    var t = img;
    var cs = ee.Algorithms.Landsat.simpleCloudScore(img).select('cloud');
    var out = img.mask(img.mask().and(cs.lt(ee.Number(cloud_thresh))));
    return out.copyProperties(t);
	});
}
// adapted to only calculate cloud mask (for cloud busting test/example)
function cloudMask(img, cloudmask_threshold) {
  var cs = ee.Algorithms.Landsat.simpleCloudScore(img).select('cloud');
  return cs.gt(ee.Number(cloudmask_threshold));
}
// cloud busting test functions
function cloudBustTestStart(cloudbust_test_img, id, threshold) {
  var cloudbust_test_img_id = id;
  // print('cloudbust_test_img:', cloudbust_test_img);
  var cloudbust_test_img_before = null;  // initialize variable outside of if/else to get rid of code editor warnings
  if (cloudbust_test_img_id == 'LANDSAT_8') {
    cloudbust_test_img_before = cloudbust_test_img.select(LC8_BANDS, STD_NAMES);
  } else {
    cloudbust_test_img_before = cloudbust_test_img.select(LC457_BANDS, STD_NAMES);
  }
  cloudbust_test_img_before    = cloudbust_test_img_before.select(['swir1', 'nir', 'green']);
  var cloudbust_test_img_mask  = cloudMask(cloudbust_test_img, threshold);
  var cloudbust_test_img_after = cloudbust_test_img_before.updateMask(cloudbust_test_img_mask.eq(0));
  Map.layers().reset();
  Map.centerObject(cloudbust_test_img, 9);
  Map.addLayer(cloudbust_test_img_before, {min:0.06, max:0.5}, 'image before cloud busting', true);
  Map.addLayer(cloudbust_test_img_mask.updateMask(cloudbust_test_img_mask), {palette:'ff0000'}, 'cloud mask', true);
  Map.addLayer(cloudbust_test_img_after, {min:0.06, max:0.5}, 'image after cloud busting', false);
}
var cloudBustTestChangeSlider = function(value) {
  var curr_img     = ee.Image(Map.layers().get(0).getEeObject());
  var curr_img_id  = curr_img.getInfo().id;
  var curr_img_raw = ee.Image(curr_img_id);
  var new_mask     = cloudMask(curr_img_raw, value);
  var new_img      = curr_img.updateMask(new_mask.eq(0));
  Map.layers().set(1, ui.Map.Layer(new_mask.updateMask(new_mask), {palette:'ff0000'}, 'cloud mask', true));
  Map.layers().set(2, ui.Map.Layer(new_img, {min:0.06, max:0.5}, 'image after cloud busting', false));
};
// defringe Landsat 5 and/or 7
// Defringe algorithm credits:
// Author:
// Bonnie Ruefenacht, PhD
// Senior Specialist
// RedCastle Resources, Inc.
// Working onsite at: 
// USDA Forest Service 
// Remote Sensing Applications Center (RSAC) 
// 2222 West 2300 South
// Salt Lake City, UT 84119
// Office: (801) 975-3828 
// Mobile: (801) 694-9215
// Email: bruefenacht@fs.fed.us
// RSAC FS Intranet website: http://fsweb.rsac.fs.fed.us/
// RSAC FS Internet website: http://www.fs.fed.us/eng/rsac/
// Purpose: Remove the fringes of landsat 5 and 7 scenes.
//
// Kernel for masking fringes found in L5 and L7 imagery
var k = ee.Kernel.fixed(41, 41, 
[[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]);
var fringeCountThreshold = 279;  // Define number of non null observations for pixel to not be classified as a fringe
function defringeLandsat(img) {
  var m   = img.mask().reduce(ee.Reducer.min());
  var sum = m.reduceNeighborhood(ee.Reducer.sum(), k, 'kernel');
  sum = sum.gte(fringeCountThreshold);
  img = img.mask(img.mask().and(sum));
  return img;
}
// update of tool with user-specified input parameters
function SurfaceWaterToolResults(inputParams) {
  // get input params
  var time_start   = ee.Date(inputParams.date_start);
  var time_end     = ee.Date(inputParams.date_end);
  var time_slice   = parseFloat(inputParams.time_slice);
  var do_months    = inputParams.do_months;
  var defringe     = inputParams.defringe;
  var pcnt_perm    = parseFloat(inputParams.pcnt_perm);
  var pcnt_temp    = parseFloat(inputParams.pctn_temp);
  var water_thresh = parseFloat(inputParams.water_thresh);
  var ndvi_thresh  = parseFloat(inputParams.veg_thresh);
  var hand_thresh  = parseFloat(inputParams.hand_thresh);
  var cloud_thresh = parseFloat(inputParams.cloud_thresh);
  // create date range for image filtering
  var date_range = [time_start, time_end];
  // filter Landsat image collections
  var images_l4 = filterImages(ee.ImageCollection('LANDSAT/LT4_L1T_TOA'), geometry, [date_range[0], date_range[1]]);
  var images_l5 = filterImages(ee.ImageCollection('LANDSAT/LT5_L1T_TOA'), geometry, [date_range[0], date_range[1]]);
  var images_l7 = filterImages(ee.ImageCollection('LANDSAT/LE7_L1T_TOA'), geometry, [date_range[0], date_range[1]]);
  var images_l8 = filterImages(ee.ImageCollection('LANDSAT/LC8_L1T_TOA'), geometry, [date_range[0], date_range[1]]);
  if (cloud_thresh > 0) {
   images_l4 = bustCloudsIC(images_l4, cloud_thresh);
   images_l5 = bustCloudsIC(images_l5, cloud_thresh);
   images_l7 = bustCloudsIC(images_l7, cloud_thresh);
   images_l8 = bustCloudsIC(images_l8, cloud_thresh);
  }
  var cloud_bust_test_img = null;
  if (inputParams.do_cloud_test === true) {
    // get a cloud busting example image (cloud busting function requires original band names, so merge before renaming)
    // first try to get a LC8 image (highest quality), otherwise just get the first image that fits the specified criteria
    cloud_bust_test_img = ee.Image(images_l8.filterMetadata('CLOUD_COVER', 'greater_than', 20).filterMetadata('CLOUD_COVER', 'less_than', 80).first());
    cloud_bust_test_img = ee.Image(ee.Algorithms.If(cloud_bust_test_img, cloud_bust_test_img, ee.Image(ee.ImageCollection(images_l4.merge(images_l5).merge(images_l7)).filterMetadata('CLOUD_COVER', 'greater_than', 20).filterMetadata('CLOUD_COVER', 'less_than', 80).first())));
    // print('cloud_bust_test_img:', cloud_bust_test_img);
  }
  // rename bands to common names that are the same for the different satellites
  images_l4 = images_l4.select(LC457_BANDS, STD_NAMES);
  images_l5 = images_l5.select(LC457_BANDS, STD_NAMES);
  images_l7 = images_l7.select(LC457_BANDS, STD_NAMES);
  images_l8 = images_l8.select(LC8_BANDS, STD_NAMES);
  // apply defringing of L5/L7
  if (defringe === true) {
    images_l5 = images_l5.map(defringeLandsat);
    images_l7 = images_l7.map(defringeLandsat);
	}
  // merge image collections
  var images = ee.ImageCollection(images_l4.merge(images_l5).merge(images_l7).merge(images_l8));
  // print(images);
  // get merged collection info (dates, cloud cover)
  var images_date_sorted = images.sort('DATE_ACQUIRED');
  var satellites_list    = getProperty(images_date_sorted, 'SPACECRAFT_ID');
  var dates_list         = getProperty(images_date_sorted, 'DATE_ACQUIRED');
  var cloud_list         = getProperty(images_date_sorted, 'CLOUD_COVER');
  // print('satellites:', satellites_list);
  // print('dates:', dates_list);
  // print('cloud cover:', cloud_list);
  var total_area      = null;
  var total_count     = null;
  var cloudcover_mean = null;
  var cloudcover_std  = null;
  if (inputParams.do_quickscan === true) {
    total_area      = ee.Number(geometry.area(ee.ErrorMargin(100, 'meters'))).divide(1e6).format('%.0f');
    total_count     = images.size();
    cloudcover_mean = ee.Number(cloud_list.reduce(ee.Reducer.mean())).format('%.2f');
    cloudcover_std  = ee.Number(cloud_list.reduce(ee.Reducer.stdDev())).format('%.2f');
  }
  // print(cloudcover_mean);
  // print(cloudcover_std);
  var cloud_chart = null;
  var dates_chart = null;
  var sats_chart  = null;
  if (inputParams.do_graphs === true) {
    cloud_chart = ui.Chart.array.values(cloud_list, 0, dates_list)
      .setChartType('ScatterChart')  // first need to set a different type before LineChart can be set...?!
      .setChartType('LineChart')
      .setSeriesNames([''])
      .setOptions({title: 'Cloud cover from stored metadata',
                   hAxis: {title: ''},
                   vAxis: {title: 'Cloud cover (%)'}
      });
    // print(cloud_chart);
    var dates_months = dates_list.map(function(date) {
      return ee.Date(date).getRelative('month', 'year');
    });
    // var dates_hist = dates_months.reduce(ee.Reducer.frequencyHistogram());
    var dates_hist = dates_months.reduce(ee.Reducer.fixedHistogram(0, 12, 12));
    dates_hist     = ee.Array(dates_hist).transpose().toList().get(1);
    // print(dates_months);
    // print(dates_hist);
    dates_chart = ui.Chart.array.values(dates_hist, 0, list_months_short)
      .setChartType('ColumnChart')  // first need to set a different type before LineChart can be set...?!
      .setChartType('LineChart')
      .setSeriesNames([''])
      .setOptions({title: 'Number of images per month',
                   hAxis: {title: ''},
                   vAxis: {title: 'Nr of images'}
      });
    // print(dates_chart);
    var satellites_hist   = ee.Dictionary(satellites_list.reduce(ee.Reducer.frequencyHistogram()));
    // print(satellites_hist);
    sats_chart = ui.Chart.array.values(satellites_hist.values(), 0, satellites_hist.keys())
      .setChartType('ColumnChart')
      .setSeriesNames([''])
      .setOptions({title: 'Number of images per satellite',
                  hAxis: {title: ''},
                  vAxis: {title: 'Nr of images'}
      });
    // print(sats_chart);
  }
  // get image count of merged collection
  var count  = images.select([0], ['value']).count().clip(geometry);
  // get HAND for study area and obtain mask
  var HAND_area = HAND.clip(geometry);
  var HAND_mask = HAND_area.gt(hand_thresh);
  // run algorithm
  var resultsAlgorithm    = SurfaceWaterAlgorithm(images, pcnt_perm, pcnt_temp, water_thresh, ndvi_thresh, HAND_mask);
  var prcnt_img_permanent = resultsAlgorithm.pcnt_perm;
  var prcnt_img_temporary = resultsAlgorithm.pcnt_temp;
  var MNDWI_permanent     = resultsAlgorithm.mndwi_perm;
  var MNDWI_temporary     = resultsAlgorithm.mndwi_temp;
  var NDVI_permanent_pcnt = resultsAlgorithm.ndvi_perm;
  var NDVI_temporary_pcnt = resultsAlgorithm.ndvi_temp;
  var NDVI_mask_permanent = resultsAlgorithm.mask_ndvi_perm;
  var NDVI_mask_temporary = resultsAlgorithm.mask_ndvi_temp;
  var water_complete      = resultsAlgorithm.water;
  // calculate water surface area
  var panel_area_combined = null;
  if (inputParams.do_area_calc === true && time_slice == 1 && do_months === false) {
    var area_perm       = calcAreaSingleImg(water_complete.eq(2));
    var area_temp       = calcAreaSingleImg(water_complete.eq(1));
    var label_area      = ui.Label('Water surface area in km2:');//, {fontWeight:'bold'});
    var panel_area_perm = ui.Panel([ui.Label('Permanent water: '), ui.Label(area_perm.format('%.1f').getInfo())],
                          ui.Panel.Layout.flow('horizontal'));
    var panel_area_temp = ui.Panel([ui.Label('Temporary water: '), ui.Label(area_temp.format('%.1f').getInfo())],
                          ui.Panel.Layout.flow('horizontal'));
    panel_area_combined = ui.Panel([label_area, panel_area_perm, panel_area_temp]);
  }
  // run algorithm for each time slice or month
  var water_slices       = ee.List([null]);
  var area_slices_chart  = null;
  var temp_images        = null;  // initialize variable outside of if-statement to get rid of code editor warnings
  var temp_results       = null;  // initialize variable outside of if-statement to get rid of code editor warnings
  var nr_slices          = null;  // initialize variable outside of if-statement to get rid of code editor warnings
  if (time_slice > 1 || do_months === true) {
    if (time_slice > 1) {
      // specify nr of slices (to be used later on to merge separate image to single image)
      nr_slices       = time_slice;
      // get number of days within each time slice
      var slices_days = time_end.difference(time_start, 'day').divide(time_slice);
      slices_days     = slices_days.int();
      // set first time slice and update through an iterate function
      var time_slices_first = ee.List([ee.List([time_start, time_start.advance(slices_days, 'day')])]);
      var updateTimeSlices = function(value, list) {
        var curr_list  = ee.List(list);
        var index      = curr_list.length();
        var temp_start = ee.Date(ee.List(curr_list.get(index.subtract(1))).get(1)).advance(1, 'day');
        var temp_end   = temp_start.advance(slices_days, 'day');
        temp_end       = ee.Date(temp_end.millis().min(time_end.millis()));
        return curr_list.add(ee.List([temp_start, temp_end]));
      };
      var time_slices = ee.List(ee.List.sequence(1, time_slice-1).iterate(updateTimeSlices, time_slices_first));
      // print('Time slices:', time_slices);
      // get water masks by mapping over time slices list
      var getTimeSlicesWater = function(i) {
        temp_images    = images.filterDate(ee.Date(ee.List(i).get(0)), ee.Date(ee.List(i).get(1)).advance(1, 'day'));
        temp_results   = SurfaceWaterAlgorithm(temp_images, pcnt_perm, pcnt_temp, water_thresh, ndvi_thresh, HAND_mask);
        return temp_results.water;
      };
      water_slices = time_slices.map(getTimeSlicesWater);
      // adjust legend
      adjustLegend(Date.parse(inputParams.date_start), Date.parse(inputParams.date_end), time_slice, false);
    } else if (do_months === true) {
      // specify nr of slices (to be used later on to merge separate image to single image)
      nr_slices = 12;
      // get monthly images through mapping over calendarRange filter
      var getMonthlyWater = function(month_index) {
        temp_images  = images.filter(ee.Filter.calendarRange(month_index, month_index, 'month'));
        temp_results = SurfaceWaterAlgorithm(temp_images, pcnt_perm, pcnt_temp, water_thresh, ndvi_thresh, HAND_mask);
        return temp_results.water;
      };
      water_slices = list_months_index.map(getMonthlyWater);
      // adjust legend
      adjustLegend(null, null, null, true);
    }
    // print('Water slices:', water_slices);
    // calculate water surface area for each time slice or month (commented out temporary water to save memory)
    var area_slices_labels = null;  // initialize variable outside of if-statement to get rid of code editor warnings
    if (inputParams.do_area_calc === true) {
      var area_slices   = calcAreaSlices(water_slices);
      area_slices_chart = constructWaterAreaGraph(area_slices, time_slice);
    }
  } else {
    // adjust legend
    legend_add.clear();
  }
  // merge separate image of each time slice into single image
  var water_slices_merged = mergeWaterSlices(water_slices, nr_slices);
  return {
    'total_area': total_area,
    'count_total': total_count,
    'cloudcover_mean': cloudcover_mean,
    'cloudcover_std': cloudcover_std,
    'cloud_chart': cloud_chart,
    'dates_chart': dates_chart,
    'sats_chart': sats_chart,
    'cloudbust_test': cloud_bust_test_img,
    'count': count,
    'hand_area': HAND_area,
    'pcnt_perm': prcnt_img_permanent,
    'pcnt_temp': prcnt_img_temporary,
    'mndwi_perm': MNDWI_permanent,
    'mndwi_temp': MNDWI_temporary,
    'ndvi_perm': NDVI_permanent_pcnt,
    'ndvi_temp': NDVI_temporary_pcnt,
    'mask_hand': HAND_mask.updateMask(HAND_mask),
    'mask_ndvi_perm': NDVI_mask_permanent.updateMask(NDVI_mask_permanent),
    'mask_ndvi_temp': NDVI_mask_temporary.updateMask(NDVI_mask_temporary),
    'water': water_complete.updateMask(water_complete),
    'water_slices': water_slices,
    'water_slices_merged': water_slices_merged,
    'panel_area': panel_area_combined,
    'chart_area': area_slices_chart
  };
}
// surface water detection algorithm
function SurfaceWaterAlgorithm(images, pcnt_perm, pcnt_temp, water_thresh, ndvi_thresh, HAND_mask) {
  // calculate percentile images
  var prcnt_img_permanent = images.reduce(ee.Reducer.percentile([pcnt_perm])).rename(STD_NAMES).clip(geometry);
  var prcnt_img_temporary = images.reduce(ee.Reducer.percentile([pcnt_temp])).rename(STD_NAMES).clip(geometry);
  // MNDWI
  var MNDWI_permanent = prcnt_img_permanent.normalizedDifference(['green', 'swir1']);
  var MNDWI_temporary = prcnt_img_temporary.normalizedDifference(['green', 'swir1']);
  // water
  var water_permanent = MNDWI_permanent.gt(water_thresh);
  var water_temporary = MNDWI_temporary.gt(water_thresh);
  // get NDVI masks
  var NDVI_permanent_pcnt = prcnt_img_permanent.normalizedDifference(['nir', 'red']);
  var NDVI_temporary_pcnt = prcnt_img_temporary.normalizedDifference(['nir', 'red']);
  var NDVI_mask_permanent = NDVI_permanent_pcnt.gt(ndvi_thresh);
  var NDVI_mask_temporary = NDVI_temporary_pcnt.gt(ndvi_thresh);
  // combined NDVI and HAND masks
  var NDVI_and_HAND_mask_permanent = NDVI_mask_permanent.add(HAND_mask);
  var NDVI_and_HAND_mask_temporary = NDVI_mask_temporary.add(HAND_mask);
  // apply NDVI and HAND masks
  var water_permanent_NDVImasked = water_permanent.eq(1).and(NDVI_mask_permanent.eq(0));
  var water_permanent_HANDmasked = water_permanent.eq(1).and(HAND_mask.eq(0));
  var water_permanent_masked     = water_permanent.eq(1).and(NDVI_and_HAND_mask_permanent.eq(0));
  var water_temporary_NDVImasked     = water_temporary.eq(1).and(NDVI_mask_temporary.eq(0));
  var water_temporary_HANDmasked     = water_temporary.eq(1).and(HAND_mask.eq(0));
  var water_temporary_masked         = water_temporary.eq(1).and(NDVI_and_HAND_mask_temporary.eq(0));
  // single image with permanent and temporary water
  // var water_complete = water_permanent.add(water_temporary);
  var water_complete = water_permanent_masked.add(water_temporary_masked);
  return {
    'pcnt_perm': prcnt_img_permanent,
    'pcnt_temp': prcnt_img_temporary,
    'mndwi_perm': MNDWI_permanent,
    'mndwi_temp': MNDWI_temporary,
    'ndvi_perm': NDVI_permanent_pcnt,
    'ndvi_temp': NDVI_temporary_pcnt,
    'mask_ndvi_perm': NDVI_mask_permanent,//.updateMask(NDVI_mask_permanent),
    'mask_ndvi_temp': NDVI_mask_temporary,//.updateMask(NDVI_mask_temporary),
    'water': water_complete.updateMask(water_complete)
  };
}
// functions to calculate total surface area of water layers:
// reducer used to obtain area
function applyReducerForArea(img) {
  // apply reducer
  var calc_area = img.reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: geometry,
    scale: 30,
    // crs: ,
    // crsTransform: ,
    bestEffort: true,
    // maxPixels: 1e12,
    // tileScale:
  });
  // convert to m2 and then to km2
  // NOTE: assumes each pixel is 30x30 m = 900 m2!
  return ee.Number(calc_area.get('nd')).multiply(900).divide(1e6);
}
// calculate water surface area for a single image
function calcAreaSingleImg(img) {
  return applyReducerForArea(img);
}
// calculate total area for each time slices (commented out temporary water to save memory)
function calcAreaSlices(list_imgs) {
  var getPermWaterArea = function (img) {
    return applyReducerForArea(ee.Image(img).eq(2));
  };
  // var getTempWaterArea = function (img) {
  //   return applyReducerForArea(ee.Image(img).eq(1));
  // };
  var list_areas_perm = list_imgs.map(getPermWaterArea);
  // var list_areas_temp = list_imgs.map(getTempWaterArea);
  // return {'areas_temp':list_areas_temp, 'areas_perm':list_areas_perm};
  return {'areas_perm':list_areas_perm};
}
// get input parameters from UI
function getInputParameters() {
  var params_list   = input.widgets();
  var date_start    = params_list.get(1).widgets().get(1).getValue();
  var date_end      = params_list.get(2).widgets().get(1).getValue();
  var time_slice    = params_list.get(3).widgets().get(1).getValue();
  var do_months     = params_list.get(4).widgets().get(1).getValue();
  var pcnt_perm     = params_list.get(5).widgets().get(1).getValue();
  var pctn_temp     = params_list.get(6).widgets().get(1).getValue();
  var water_thresh  = params_list.get(7).widgets().get(1).getValue();
  var veg_thresh    = params_list.get(8).widgets().get(1).getValue();
  var hand_thresh   = params_list.get(9).widgets().get(1).getValue();
  var cloud_thresh  = params_list.get(10).widgets().get(1).getValue();
  var defringe      = params_list.get(11).widgets().get(1).getValue();
  var do_quickscan  = params_list.get(13).widgets().get(1).getValue();
  var do_graphs     = params_list.get(14).widgets().get(1).getValue();
  var do_area_calc  = params_list.get(15).widgets().get(1).getValue();
  var do_cloud_test = params_list.get(16).widgets().get(1).getValue();
  var store_prev    = params_list.get(17).widgets().get(1).getValue();
  return {
    'date_start': date_start,
    'date_end': date_end,
    'time_slice': time_slice,
    'do_months': do_months,
    'pcnt_perm': pcnt_perm,
    'pctn_temp': pctn_temp,
    'water_thresh': water_thresh,
    'veg_thresh': veg_thresh,
    'hand_thresh': hand_thresh,
    'cloud_thresh': cloud_thresh,
    'defringe': defringe,
    'do_quickscan': do_quickscan,
    'do_graphs': do_graphs,
    'do_area_calc': do_area_calc,
    'do_cloud_test': do_cloud_test,
    'store_prev': store_prev
  };
}
// set input parameter values in UI
function setInputParametersFromDict(inputParamsDict) {
  var params_list = input.widgets();
  // params_list.get(1).widgets().get(1).setValue(ee.Date(inputParamsDict.date_start).format('YYYY-MM-dd').getInfo());
  // params_list.get(2).widgets().get(1).setValue(ee.Date(inputParamsDict.date_end).format('YYYY-MM-dd').getInfo());
  params_list.get(1).widgets().get(1).setValue(new Date(inputParamsDict.date_start).toISOString().substr(0,10));
  params_list.get(2).widgets().get(1).setValue(new Date(inputParamsDict.date_end).toISOString().substr(0,10));
  params_list.get(3).widgets().get(1).setValue(inputParamsDict.time_slice);
  params_list.get(4).widgets().get(1).setValue(Boolean(inputParamsDict.do_months));
  params_list.get(5).widgets().get(1).setValue(inputParamsDict.pcnt_perm);
  params_list.get(6).widgets().get(1).setValue(inputParamsDict.pcnt_temp);
  params_list.get(7).widgets().get(1).setValue(inputParamsDict.water_thresh);
  params_list.get(8).widgets().get(1).setValue(inputParamsDict.veg_thresh);
  params_list.get(9).widgets().get(1).setValue(inputParamsDict.hand_thresh);
  params_list.get(10).widgets().get(1).setValue(inputParamsDict.cloud_thresh);
  params_list.get(11).widgets().get(1).setValue(Boolean(inputParamsDict.defringe));
  params_list.get(13).widgets().get(1).setValue(Boolean(inputParamsDict.do_quickscan));
  params_list.get(14).widgets().get(1).setValue(Boolean(inputParamsDict.do_graphs));
  params_list.get(15).widgets().get(1).setValue(Boolean(inputParamsDict.do_area_calc));
  params_list.get(16).widgets().get(1).setValue(Boolean(inputParamsDict.do_cloud_test));
  // params_list.get(17).widgets().get(1).setValue(Boolean(inputParamsDict.store_prev));  // currently not stored in metadata file
  params_list.get(17).widgets().get(1).setValue(default_prev_update);
}
// reset input parameters to default values defined at top of script
function resetParamsToDefault() {
  var params_list = input.widgets();
  params_list.get(1).widgets().get(1).setValue(default_startdate);
  params_list.get(2).widgets().get(1).setValue(default_enddate);
  params_list.get(3).widgets().get(1).setValue(default_timeslice);
  params_list.get(4).widgets().get(1).setValue(default_do_months);
  params_list.get(5).widgets().get(1).setValue(default_pcnt_perm);
  params_list.get(6).widgets().get(1).setValue(default_pcnt_temp);
  params_list.get(7).widgets().get(1).setValue(default_water_thresh);
  params_list.get(8).widgets().get(1).setValue(default_ndvi_thresh);
  params_list.get(9).widgets().get(1).setValue(default_hand_thresh);
  params_list.get(10).widgets().get(1).setValue(default_cloud_thresh);
  params_list.get(11).widgets().get(1).setValue(default_defringe);
  params_list.get(13).widgets().get(1).setValue(default_quickscan_info);
  params_list.get(14).widgets().get(1).setValue(default_console_info);
  params_list.get(15).widgets().get(1).setValue(default_area_calc);
  params_list.get(16).widgets().get(1).setValue(default_cloudbust_test);
  params_list.get(17).widgets().get(1).setValue(default_prev_update);
}
// adjust additional legend for time sliced water layer in UI
// (date_start and date_end should be in milliseconds since epoch)
function adjustLegend(temp_date_start, temp_date_end, temp_time_slice, show_months) {
  var l=0;  // variable to loop over for different legend entries
  legend_add.clear();
  if (show_months === true) {
    legend_add.add(ui.Label({value: 'Legend (permanent water - monthly data):', style: {fontWeight: 'bold'}}));
    for (l=0; l<12; l++) {
      legend_add.add(ui.Panel({widgets:[
        ui.Label({
          style: {
            backgroundColor: '#' + water_slices_colours_list[11 - l],
            padding: '8px',
            margin: '0 0 4px 8px'
          }
        }),
        ui.Label({value: list_months_long[l], style: {margin: '0 0 4px 6px'}})
      ], layout: ui.Panel.Layout.Flow('horizontal')}));
    }
  } else {
    var slices_millis = (temp_date_end - temp_date_start) / temp_time_slice;
    slices_millis     = parseInt((slices_millis/millisPerDay), 10) * millisPerDay;  // round to whole days
    var time_slices   = [[temp_date_start, temp_date_start + slices_millis]];
    for (var t=1; t<temp_time_slice; t++) {
      var temp_start = time_slices[t-1][1] + millisPerDay;
      var temp_end   = temp_start + slices_millis;
      temp_end       = Math.min(temp_end, temp_date_end);
      time_slices.push([temp_start, temp_end]);
    }
    legend_add.add(ui.Label({value: 'Legend (permanent water - time slices):', style: {fontWeight: 'bold'}}));
    for (l=0; l<temp_time_slice; l++) {
      legend_add.add(ui.Panel({widgets:[
        ui.Label({
          style: {
            backgroundColor: '#' + water_slices_colours_list[(temp_time_slice-1) - l],
            padding: '8px',
            margin: '0 0 4px 8px'
          }
        }),
        ui.Label({
          value: new Date(time_slices[l][0]).toISOString().substr(0,10) + ' - ' + new Date(time_slices[l][1]).toISOString().substr(0,10),
          style: {margin: '0 0 4px 6px'}
        })], layout: ui.Panel.Layout.Flow('horizontal')}));
    }
  }
}
// construct water surface area graph
// (only permanent water, temporary water commented out to save memory)
function constructWaterAreaGraph(chart_data, time_slice) {
  // data
  var area_slices_array = ee.Array(chart_data.areas_perm);
  // var area_slices_array = ee.Array.cat([ee.Array(chart_data.areas_perm), ee.Array(chart_data.areas_temp)], 1);
  // labels
  var area_slices_labels  = null; // initialize variable outside of if/else to get rid of code editor warnings
  var area_slices_x_label = null; // initialize variable outside of if/else to get rid of code editor warnings
  var area_slices_title = 'Calculated water surface area';
  if (time_slice > 1) {
    area_slices_labels  = ee.List.sequence(1, time_slice);
    area_slices_x_label = 'Time slice index (see legend for actual time period)';
    area_slices_title  += ' over time';
  } else {
    area_slices_labels  = list_months_short;
    area_slices_x_label = 'Month';
    area_slices_title  += ' per month';
  }
  // chart
  var area_slices_chart = ui.Chart.array.values(area_slices_array, 0, area_slices_labels)
        .setChartType('ScatterChart')  // first need to set a different type before LineChart can be set...?!
        .setChartType('LineChart')
        .setSeriesNames([''])
        // .setSeriesNames(['permanent', 'temporary'])
        .setOptions({title: area_slices_title,
                     hAxis: {title: area_slices_x_label},
                     vAxis: {title: 'Surface area (km2)'}
        });
  return area_slices_chart;
}
// construct single example UI panel
function constructExamplePanel(temp_img_thumb, temp_img_map, temp_zoom, temp_name, name_add, temp_width, temp_margin) {
  var temp_example_panel = ui.Panel({widgets:[
    ui.Panel({widgets:[
      ui.Thumbnail({
        image: temp_img_thumb,
        params: {},
        onClick: function() {
          clearUI();
          // get Feature from FeatureCollection
          var temp_fc = ee.Feature(Examples_metadata.filterMetadata('name', 'equals', temp_name).first());
          // adjust input parameters
          var temp_params = temp_fc.toDictionary().getInfo();
          setInputParametersFromDict(temp_params);
          // adjust legend
          legend_add.clear();
          if (temp_params.adj_legend == 1) {
            if (temp_params.time_slice > 1) {
              adjustLegend(temp_params.date_start, temp_params.date_end, temp_params.time_slice, false);
            } else if (temp_params.do_months == 1) {
              adjustLegend(null, null, null, true);
            }
          }
          // set active geometry
          geometry = temp_fc.geometry();
          // adjust map
          Map.centerObject(geometry, temp_zoom);
          Map.layers().reset();
          Map.addLayer(ee.Image().byte().paint(geometry, 1000), {}, 'background', true);
          Map.layers().get(0).setOpacity(0.5);
          Map.addLayer(temp_img_map, {}, 'Example ' + temp_name.split(/(?=[A-Z])/).join(" ") + name_add);
          Map.addLayer(ee.Image().byte().paint(geometry, 0, 2), {}, 'bounds', false);
          // adjust quick-scan info panel
          panel_quickscan.style().set('shown', true);
          panel_quickscan.widgets().get(1).widgets().get(1).setValue(temp_params.size_area);
          panel_quickscan.widgets().get(2).widgets().get(1).setValue(temp_params.nr_images);
          panel_quickscan.widgets().get(3).widgets().get(1).setValue(temp_params.cloudcover_mean);
          // panel_quickscan.widgets().get(4).widgets().get(1).setValue(temp_params.cloudcover_std);
          panel_quickscan.style().set('shown', true);
          // create water surface area graph
          if (temp_params.do_area_calc == 1) {
            var area_slices_array = {'areas_perm': ee.List(temp_params.water_area_calc.split(',').map(Number))};
            var area_slices_chart = constructWaterAreaGraph(area_slices_array, temp_params.time_slice);
            panel_area_calc.style().set('shown', true);
            panel_area_calc.add(area_slices_chart);
          }
        },
        style: {width: temp_width}
      })],
      style: {backgroundColor: '#f6f6f6', height: '76px'}}),
    ui.Label({value: temp_name.split(/(?=[A-Z])/).join(" ") + ' ' + name_add, style: {fontSize: '10px', margin: temp_margin, backgroundColor: '#f6f6f6'}})
  ], style: {backgroundColor: '#f6f6f6', width: '90px'}});
  return temp_example_panel;
}
// add placeholder or title label to UI panel
function addPlaceholderLabel(panel, label) {
  panel.add(ui.Label({
    value: label,
    style: {fontSize: '12px', fontWeight: '100'}
  }));
}
function addTitleLabel(panel, label) {
  panel.add(ui.Label({
    value: label,
    style: {fontSize: '14px', fontWeight: 'bold'}
  }));
}
// reset UI panels
function clearUI() {
  // clear UI panels
  panel_area_calc.clear();
  panel_quality_graphs.clear();
  panel_quickscan.style().set('shown', false);
  panel_area_calc.style().set('shown', false);
  panel_cloud_test.style().set('shown', false);
  // add placeholder tags to relevant UI elements
  addPlaceholderLabel(panel_quality_graphs, '');
}
// update all elements of the tool
function SurfaceWaterToolUpdate(inputParams, results) {
  // clean up the UI
  clearUI();
  // check if cloud busting test should be activated (overrides everything else)
  if (inputParams.do_cloud_test === true) {
    var cloudbust_test_sat_id = results.cloudbust_test.get('SPACECRAFT_ID').getInfo();
    cloudbust_test_slider.setValue(0);
    panel_cloud_test.style().set('shown', true);
    cloudBustTestStart(results.cloudbust_test, cloudbust_test_sat_id, 100);
  // otherwise, start the regular update of the tool
  } else {
    // hide cloud busting test ui (in case it was activated during previous update)
    panel_cloud_test.style().set('shown', false);
    // set quickscan info
    if (inputParams.do_quickscan === true) {
      panel_quickscan.style().set('shown', true);
      panel_quickscan.widgets().get(1).widgets().get(1).setValue(results.total_area.getInfo()); 
      panel_quickscan.widgets().get(2).widgets().get(1).setValue(results.count_total.getInfo());
      panel_quickscan.widgets().get(3).widgets().get(1).setValue(results.cloudcover_mean.getInfo());
      // panel_quickscan.widgets().get(4).widgets().get(1).setValue(results.cloudcover_std.getInfo());
    }
    // set data quality graphs in console
    if (inputParams.do_graphs === true) {
      panel_quality_graphs.clear();
      addTitleLabel(panel_quality_graphs, 'Data quality graphs:');
      panel_quality_graphs.add(results.cloud_chart);
      panel_quality_graphs.add(results.dates_chart);
      panel_quality_graphs.add(results.sats_chart);
    }
    // set water surface area calculation panel
    if (inputParams.do_area_calc === true) {
      if (inputParams.time_slice == 1 && inputParams.do_months === false) {
        panel_area_calc.add(results.panel_area);
      }
      panel_area_calc.style().set('shown', true);
    } else {
      panel_area_calc.style().set('shown', false);
    }
    // get water layer calculated during previous update (if any)
    var previous_water_layer = null;
    if (inputParams.store_prev === true) {
      var list_previous_layers = Map.layers().getJsArray();
      for (var l=0; l<list_previous_layers.length; l++) {
        if (list_previous_layers[l].get('name') == 'water (time slices merged)') {
          previous_water_layer = Map.layers().get(l);
        } else if (list_previous_layers[l].get('name') == 'water (months merged)') {
          previous_water_layer = Map.layers().get(l);
        } else if (list_previous_layers[l].get('name') == 'water') {
          previous_water_layer = Map.layers().get(l);
        }
      }
    }
    // reset all map layers
    Map.layers().reset();
    // add geometry layers (background and extent)
    Map.addLayer(ee.Image().byte().paint(geometry, 1000), {}, 'background', true);
    Map.layers().get(0).setOpacity(0.5);
    Map.addLayer(ee.Image().byte().paint(geometry, 0, 3), {}, 'bounds', false);
    // add water layer from previous update (if any)
    if (previous_water_layer !== null) {
      Map.addLayer(previous_water_layer.get('eeObject'), previous_water_layer.get('visParams'), previous_water_layer.get('name') + ' [update -1]', false);
    }
    // add other layers
    // Map.addLayer(results.hand_area, {}, 'HAND', false);
    // Map.addLayer(results.count, {min:0, max:75, palette:['000000', 'ffffff']}, 'count', false);
    Map.addLayer(results.pcnt_perm.select(['swir1', 'nir', 'green']), pcnt_viz_params, 'percentile (permanent)', false);
    Map.addLayer(results.pcnt_temp.select(['swir1', 'nir', 'green']), pcnt_viz_params, 'percentile (temporary)', false);
    Map.addLayer(results.mndwi_perm, {min:-1, max:1}, 'MNDWI (permanent)', false);
    Map.addLayer(results.mndwi_temp, {min:-1, max:1}, 'MNDWI (temporary)', false);
    // Map.addLayer(results.ndvi_perm, {min:-1, max:1}, 'NDVI (permanent)', false);
    // Map.addLayer(results.ndvi_temp, {min:-1, max:1}, 'NDVI (temporary)', false);
    Map.addLayer(results.mask_hand, {palette:['000000']}, 'mask (HAND)', false);
    Map.addLayer(results.mask_ndvi_perm, {palette:['000000']}, 'mask (NDVI, permanent)', false);
    Map.addLayer(results.mask_ndvi_temp, {palette:['000000']}, 'mask (NDVI, temporary)', false);
    Map.addLayer(results.water.sldStyle(water_style), {}, 'water', false);
    // time slices or monthly data
    if (inputParams.time_slice > 1 || inputParams.do_months === true) {
      var i=0; // initialize variable outside of if/else to get rid of code editor warnings
      if (inputParams.do_months === true) {
        for (i=0; i<12; i++) {
          Map.addLayer(ee.Image(results.water_slices.get(i)).sldStyle(water_style), {}, 'water (' + list_months_long[i] + ')', false);
        }
        Map.addLayer(results.water_slices_merged.updateMask(results.water_slices_merged), {palette: months_palette}, 'water (months merged)', true);
      } else if (inputParams.time_slice > 1) {
        var temp_palette = ['ffffff'];
        for (i=0; i<inputParams.time_slice; i++) {
          temp_palette.push(water_slices_colours_list[(inputParams.time_slice - 1) - i]);
          Map.addLayer(ee.Image(results.water_slices.get(i)).sldStyle(water_style), {}, 'water (time slice ' + i + ')', false);
        }
        Map.addLayer(results.water_slices_merged.updateMask(results.water_slices_merged), {palette: temp_palette}, 'water (time slices merged)', true);
      }
      if (inputParams.do_area_calc === true) {
        panel_area_calc.add(results.chart_area);
      }
    } else {
      // show standard water layer if not using time slices or months
      Map.layers().get(Map.layers().length()-1).setShown(true);
    }
    // set cursor to default
    Map.style().set('cursor', 'hand');
    // remove any onClick function from map
    Map.unlisten();
  }
}
// -------------------------------------------------------------------------------------------------------- //
// User Interface
// -------------------------------------------------------------------------------------------------------- //
// intro with descriptions
var intro = ui.Panel([
  // title
  ui.Label({
    value: 'Landsat Surface Water Tool',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  // intro text
  ui.Label({
    value: "Change the input parameters below and press the 'Update map' button to visualize new results.\
            Check out the examples to get a quick idea of what is possible.\
            You drag the map to change the study area.",
    style: {fontSize: '12px', padding: '0px  0px 0px 0px'}
  }),
  // extra text
  ui.Label({
    value: "Version: 1.0 (December 2016)",
    style: {fontSize: '11px', padding: '0px  0px 0px 0px'}
  }),
  // button to toggle the examples panel
  ui.Button({label: 'Show/hide examples', onClick: function() {
    if (examplesUI.style().get('shown') === false) {
      examplesUI.style().set('shown', true);
    } else {
      examplesUI.style().set('shown', false);
    }
  }})
]);
// raster symbolizers for some examples
var example_symbolizer_5timeslices = '\
<RasterSymbolizer>\
  <ColorMap extended="true" >\
    <ColorMapEntry color="#ffffff" quantity="0.0" label="-1"/>\
    <ColorMapEntry color="#ff7f00" quantity="1.0" label="-1"/>\
    <ColorMapEntry color="#a6cee3" quantity="2.0" label="-1"/>\
    <ColorMapEntry color="#e31a1c" quantity="3.0" label="-1"/>\
    <ColorMapEntry color="#33a02c" quantity="4.0" label="-1"/>\
    <ColorMapEntry color="#1f78b4" quantity="5.0" label="-1"/>\
  </ColorMap>\
</RasterSymbolizer>';
var example_symbolizer_12timeslices = '\
<RasterSymbolizer>\
  <ColorMap extended="true" >\
    <ColorMapEntry color="#ffffff" quantity="0.0" label="-1"/>\
    <ColorMapEntry color="#c8c454" quantity="1.0" label="-1"/>\
    <ColorMapEntry color="#cab2d6" quantity="2.0" label="-1"/>\
    <ColorMapEntry color="#fdbf6f" quantity="3.0" label="-1"/>\
    <ColorMapEntry color="#b15928" quantity="4.0" label="-1"/>\
    <ColorMapEntry color="#fb9a99" quantity="5.0" label="-1"/>\
    <ColorMapEntry color="#6a3d9a" quantity="6.0" label="-1"/>\
    <ColorMapEntry color="#b2df8a" quantity="7.0" label="-1"/>\
    <ColorMapEntry color="#ff7f00" quantity="8.0" label="-1"/>\
    <ColorMapEntry color="#a6cee3" quantity="9.0" label="-1"/>\
    <ColorMapEntry color="#e31a1c" quantity="10.0" label="-1"/>\
    <ColorMapEntry color="#33a02c" quantity="11.0" label="-1"/>\
    <ColorMapEntry color="#1f78b4" quantity="12.0" label="-1"/>\
  </ColorMap>\
</RasterSymbolizer>';
// example panel UI on screen
var examplesUI = ui.Panel({widgets:[
  ui.Label({value: 'Example locations:', style: {fontWeight: 'bold', margin: '0px 0px 0px 7px'}}),
  ui.Label({value: 'Click on a thumbnail to load a pre-calculated image and any relevant charts.\
                    Study area and input parameters are automatically changed to those that were used to derive the image.', 
            style: {fontSize: '11px'}}),
  ui.Panel([
    // Mekong River / Phnom Penh (Cambodia)
    constructExamplePanel(ExampleImage_PhnomPenh.sldStyle(water_style), 
      ExampleImage_PhnomPenh.updateMask(ExampleImage_PhnomPenh).sldStyle(water_style),
      10,
      'MekongRiver',
      '',
      '75px',
      '0px 0px 2px 15px'),
    // Niger Inner Delta (Mali)
    constructExamplePanel(ExampleImage_NigerInnerDelta_small.sldStyle(water_style), 
      ExampleImage_NigerInnerDelta.updateMask(ExampleImage_NigerInnerDelta).sldStyle(water_style),
      10,
      'NigerInnerDelta',
      '',
      '64px',
      '0px 0px 2px 3px'),
    // Ucayali (Peru)
    constructExamplePanel(ExampleImage_Ucayali_small.sldStyle(example_symbolizer_5timeslices), 
      ExampleImage_Ucayali.updateMask(ExampleImage_Ucayali).sldStyle(example_symbolizer_5timeslices),
      12,
      'Ucayali',
      'River',
      '65px',
      '0px 0px 2px 12px'),
    // Amu Darya (Afghanistian / Tajikistan)
    constructExamplePanel(ExampleImage_AmuDarya_small.sldStyle(example_symbolizer_5timeslices), 
      ExampleImage_AmuDarya.updateMask(ExampleImage_AmuDarya).sldStyle(example_symbolizer_5timeslices),
      11,
      'AmuDarya',
      'River',
      '66px',
      '0px 0px 2px 5px'),
    // Amu Darya 2 (Afghanistian / Tajikistan)
    constructExamplePanel(ExampleImage_AmuDarya2_small.sldStyle(example_symbolizer_5timeslices), 
      ExampleImage_AmuDarya2.updateMask(ExampleImage_AmuDarya2).sldStyle(example_symbolizer_5timeslices),
      12,
      'AmuDaryaRiver2',
      '',
      '64px',
      '0px 0px 2px 0px'),
    // Shwegyin Reservoir (Myanmar)
    constructExamplePanel(ExampleImage_ShwegyinReservoir_small.sldStyle(water_style), 
      ExampleImage_ShwegyinReservoir.updateMask(ExampleImage_ShwegyinReservoir).sldStyle(water_style),
      12,
      'ShwegyinReservoir',
      '',
      '62px',
      '0px 0px 2px 0px'),
    // Lake Folsom (California, USA)
    constructExamplePanel(ExampleImage_LakeFolsom_small.sldStyle(example_symbolizer_5timeslices), 
      ExampleImage_LakeFolsom.updateMask(ExampleImage_LakeFolsom).sldStyle(example_symbolizer_5timeslices),
      12,
      'LakeFolsom',
      '',
      '70px',
      '0px 0px 2px 15px'),
    // Shamkir Reservoir (Azerbaijan)
    constructExamplePanel(ExampleImage_ShamkirReservoir_small2.sldStyle(example_symbolizer_12timeslices), 
      ExampleImage_ShamkirReservoir.updateMask(ExampleImage_ShamkirReservoir).sldStyle(example_symbolizer_12timeslices),
      12,
      'ShamkirReservoir',
      '',
      '70px',
      '0px 0px 2px 5px')
  ], ui.Panel.Layout.Flow('horizontal')),
], style: {position: 'bottom-center', width: '400px', margin: '0px 0px 0px 0px', shown: false}});
Map.add(examplesUI);
// legend for water classes (uses padding to give the box height and width)
var legend = ui.Panel({widgets:[
  ui.Label({value: 'Legend (water):', style: {fontWeight: 'bold'}}),
  ui.Panel({widgets:[
    ui.Label({
      style: {
        backgroundColor: '#00008b',
        padding: '8px',
        margin: '0 0 4px 8px'
      }
    }),
    ui.Label({
      value: 'Permanent',
      style: {margin: '0 0 4px 6px'}
    })], layout: ui.Panel.Layout.Flow('horizontal')}),
  ui.Panel({widgets:[
    ui.Label({
      style: {
        backgroundColor: '#9999ff',
        padding: '8px',
        margin: '0 0 4px 8px'
      }
    }),
    ui.Label({
      value: 'Temporary',
      style: {margin: '0 0 4px 6px'}
    })], layout: ui.Panel.Layout.Flow('horizontal')})
  ], style:{margin: '0px 0px 10px 0px'}
});
// additional legend for time slices, to be updated dynamically
var legend_add = ui.Panel();
// control of input parameters
var input_time_slices_ui = ui.Textbox({value:default_timeslice, style:{margin:'0px 26px', width:'50px'},
  'onChange': function(value) {
    if (value > 1) {
      input_monthly_avg_ui.setValue(false);
      // input_monthly_avg_ui.setDisabled(true);
    } else {
      // input_monthly_avg_ui.setDisabled(false);
    }
  }
});
var input_monthly_avg_ui = ui.Checkbox({value:default_do_months, style:{margin:'7px 0px 0px 29px'},
  'onChange': function(value) {
    if (value) {
      input_time_slices_ui.setValue(1);
      input_time_slices_ui.setDisabled(true);
    } else {
      input_time_slices_ui.setDisabled(false);
    }
  }
});
var input_label_explain_area = ui.Label({value: "* This option activates the calculation of water surface area. When only a single\
      time period is chosen, it will print the total permanent and temporary water surface area to the console. When\
      multiple time periods are chosen (time slices or monthly averages), a graph with permanent water over time is shown\
      instead. These calculations are computationally intensive: it may take a while to load and can only be used if the \
      study area is not too large and/or the time period not too long, otherwise it will result in an 'out of memory' error.",
      style: {fontSize: '10px'}});
var input = ui.Panel([
  ui.Label({value: 'Parameters:', style: {fontWeight: 'bold'}}),
  ui.Panel([ui.Label('Start date:'), ui.Textbox({value:default_startdate, style:{margin:'0px 28px', width:'100px'}})], 
           ui.Panel.Layout.flow('horizontal')),
  ui.Panel([ui.Label('End date:'), ui.Textbox({value:default_enddate, style:{margin:'0px 35px', width:'100px'}})], 
           ui.Panel.Layout.flow('horizontal')),
  ui.Panel([ui.Label('Time period slices:'), input_time_slices_ui], ui.Panel.Layout.flow('horizontal')),
  ui.Panel([ui.Label('Monthly averages:'), input_monthly_avg_ui], ui.Panel.Layout.flow('horizontal')),
  ui.Panel([ui.Label('Percentile permanent:'), ui.Textbox({value:default_pcnt_perm, style:{margin:'0px 7px', width:'50px'}})], 
           ui.Panel.Layout.flow('horizontal')),
  ui.Panel([ui.Label('Percentile temporary:'), ui.Textbox({value:default_pcnt_temp, style:{margin:'0px 10px', width:'50px'}})], 
           ui.Panel.Layout.flow('horizontal')),
  ui.Panel([ui.Label('Water index threshold:'), ui.Textbox({value:default_water_thresh, style:{margin:'0px 4px', width:'50px'}})], 
           ui.Panel.Layout.flow('horizontal')),
  ui.Panel([ui.Label('NDVI threshold:'), ui.Textbox({value:default_ndvi_thresh, style:{margin:'0px 46px', width:'50px'}})], 
           ui.Panel.Layout.flow('horizontal')),
  ui.Panel([ui.Label('HAND threshold:'), ui.Textbox({value:default_hand_thresh, style:{margin:'0px 38px', width:'50px'}})], 
           ui.Panel.Layout.flow('horizontal')),
  ui.Panel([ui.Label('Cloud busting:'), ui.Textbox({value:default_cloud_thresh, style:{margin:'0px 53px', width:'50px'}})], 
           ui.Panel.Layout.flow('horizontal')),
  ui.Panel([ui.Label('Defringe L5/L7:'), ui.Checkbox({value:default_defringe, style:{margin:'7px 0px 0px 45px'}})], 
           ui.Panel.Layout.flow('horizontal')),
  ui.Label({value: 'Other controls:', style: {fontWeight: 'bold'}}),
  ui.Panel([ui.Label('Quick-scan info:'), ui.Checkbox({value:default_quickscan_info, style:{margin:'7px 0px 0px 41px'}})], 
           ui.Panel.Layout.flow('horizontal')),
  ui.Panel([ui.Label('Data quality graphs:'), ui.Checkbox({value:default_console_info, style:{margin:'7px 0px 0px 18px'}})], 
           ui.Panel.Layout.flow('horizontal')),
  ui.Panel([ui.Label('Calculate water area*:'), ui.Checkbox({value:default_area_calc, style:{margin:'7px 0px 0px 4px'}})], 
           ui.Panel.Layout.flow('horizontal')),
  ui.Panel([ui.Label('Cloud busting test:'), ui.Checkbox({value:default_cloudbust_test, style:{margin:'7px 0px 0px 24px'}})], 
           ui.Panel.Layout.flow('horizontal')),
  ui.Panel([ui.Label('Store previous update:'), ui.Checkbox({value:default_prev_update, style:{margin:'7px 0px 0px 2px'}})], 
           ui.Panel.Layout.flow('horizontal')),
  input_label_explain_area
]);
// buttons to reset parameters or update the map
var resetAndUpdateButtons = ui.Panel([
  ui.Button('Reset parameters', resetParamsToDefault),
  ui.Button('Update map', function() {
    var inputParams = getInputParameters();
    var results     = SurfaceWaterToolResults(inputParams);
    SurfaceWaterToolUpdate(inputParams, results);
  })
], ui.Panel.Layout.flow('horizontal'));
// panel for data quality graphs
var panel_quality_graphs = ui.Panel();
// Panel combining all UI elements for the ui.root
var panel = ui.Panel({
  widgets: [intro, legend, legend_add, input, resetAndUpdateButtons, panel_quality_graphs],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: 'top-left',
    width: '380px'
  }
});
// add the panel to the ui.root
ui.root.insert(0, panel);
// UI element with 'quick scan info', visualized on the map
var panel_quickscan = ui.Panel({widgets:[
  ui.Label({value: 'Quick-scan info', style: {fontWeight: 'bold', fontSize: '12px'}}),
  ui.Panel([ui.Label({value: 'Size of area [km2]:', style: {fontSize: '10px'}}),
            ui.Label({value: '', style: {fontSize: '10px'}})], 
            ui.Panel.Layout.flow('horizontal')),
  ui.Panel([ui.Label({value: 'Total image count:', style: {fontSize: '10px'}}),
            ui.Label({value: '', style: {fontSize: '10px'}})], 
            ui.Panel.Layout.flow('horizontal')),
  ui.Panel([ui.Label({value: 'Cloud cover mean:', style: {fontSize: '10px'}}),
            ui.Label({value: '', style: {fontSize: '10px'}})], 
            ui.Panel.Layout.flow('horizontal'))
  // ui.Panel([ui.Label({value: 'Cloud cover stDev:', style: {fontSize: '10px'}}),
  //           ui.Label({value: '', style: {fontSize: '10px'}})], 
  //           ui.Panel.Layout.flow('horizontal'))
  ], style: {position: 'bottom-left', shown: false}
});
Map.add(panel_quickscan);
// UI elements for water surface area graphs
var panel_area_calc = ui.Panel({style: {position: 'bottom-right', shown: false}});//, width: '432px'}});
Map.add(panel_area_calc);
// UI element for cloud busting example
var cloudbust_test_slider = ui.Slider({min:0, max:100, step:10, onChange: cloudBustTestChangeSlider, style: {stretch : 'horizontal'}});
var panel_cloud_test = ui.Panel({widgets:[
  ui.Label({value: 'Move the slider to check the effect of different cloud busting thresholds', style: {fontSize: '11px'}}),
  cloudbust_test_slider
  ], style: {position: 'top-center', shown: false}
});
Map.add(panel_cloud_test);
// -------------------------------------------------------------------------------------------------------- //
// Initialization
// -------------------------------------------------------------------------------------------------------- //
// // check for geometry
// if (geometry) {
//   // do nothing
// } else {
//   var geometry = initial_geometry;
// }
// center map on geometry
Map.centerObject(geometry, 10);
// calculate initial results based on default parameters
var inputParams = getInputParameters();
var results     = SurfaceWaterToolResults(inputParams);
// show initial results
SurfaceWaterToolUpdate(inputParams, results);