var bound = ui.import && ui.import("bound", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                5.999222295712849,
                50.76493314387701
              ],
              [
                5.874252813290974,
                51.02047224956059
              ],
              [
                5.897598760556599,
                51.06364506442844
              ],
              [
                6.088486211728474,
                51.13349966187327
              ],
              [
                6.076126592587849,
                51.19808576341862
              ],
              [
                6.081619756650349,
                51.247110727297766
              ],
              [
                6.168823736142537,
                51.33127723583177
              ],
              [
                6.225128667783162,
                51.37758879309465
              ],
              [
                6.222382085751912,
                51.45980488930631
              ],
              [
                6.214142339658162,
                51.52393334543188
              ],
              [
                6.126251714658162,
                51.592237629064854
              ],
              [
                6.112518804501912,
                51.66725389381939
              ],
              [
                6.006775396298787,
                51.73023976101969
              ],
              [
                5.898285406064412,
                51.83304135889038
              ],
              [
                5.579681890439412,
                51.9093535030898
              ],
              [
                5.300903814267537,
                51.85085910890178
              ],
              [
                5.196533697080037,
                51.77699679832105
              ],
              [
                4.853210943173787,
                51.75064878486263
              ],
              [
                4.835358159970662,
                51.66895736736548
              ],
              [
                5.152588384580037,
                51.68002838409994
              ],
              [
                5.419006841611287,
                51.68939405383949
              ],
              [
                5.527496831845662,
                51.77104859097203
              ],
              [
                5.833740728330037,
                51.67491902034479
              ],
              [
                5.997162359189412,
                51.55382909208955
              ],
              [
                6.086426275205037,
                51.4846119226041
              ],
              [
                6.021881597470662,
                51.41957173631791
              ],
              [
                5.847473638486287,
                51.249689542255325
              ],
              [
                5.771942632626912,
                51.14987002816589
              ],
              [
                5.663452642392537,
                51.00578432663361
              ],
              [
                5.574188726376912,
                50.839574096789256
              ],
              [
                5.587921636533162,
                50.73017578864673
              ],
              [
                5.780182378720662,
                50.723221220901905
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[5.999222295712849, 50.76493314387701],
          [5.874252813290974, 51.02047224956059],
          [5.897598760556599, 51.06364506442844],
          [6.088486211728474, 51.13349966187327],
          [6.076126592587849, 51.19808576341862],
          [6.081619756650349, 51.247110727297766],
          [6.168823736142537, 51.33127723583177],
          [6.225128667783162, 51.37758879309465],
          [6.222382085751912, 51.45980488930631],
          [6.214142339658162, 51.52393334543188],
          [6.126251714658162, 51.592237629064854],
          [6.112518804501912, 51.66725389381939],
          [6.006775396298787, 51.73023976101969],
          [5.898285406064412, 51.83304135889038],
          [5.579681890439412, 51.9093535030898],
          [5.300903814267537, 51.85085910890178],
          [5.196533697080037, 51.77699679832105],
          [4.853210943173787, 51.75064878486263],
          [4.835358159970662, 51.66895736736548],
          [5.152588384580037, 51.68002838409994],
          [5.419006841611287, 51.68939405383949],
          [5.527496831845662, 51.77104859097203],
          [5.833740728330037, 51.67491902034479],
          [5.997162359189412, 51.55382909208955],
          [6.086426275205037, 51.4846119226041],
          [6.021881597470662, 51.41957173631791],
          [5.847473638486287, 51.249689542255325],
          [5.771942632626912, 51.14987002816589],
          [5.663452642392537, 51.00578432663361],
          [5.574188726376912, 50.839574096789256],
          [5.587921636533162, 50.73017578864673],
          [5.780182378720662, 50.723221220901905]]]),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            5.692178991767167,
            50.869807797641755
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#0b4a8b",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #0b4a8b */ee.Geometry.Point([5.692178991767167, 50.869807797641755]);
Map.centerObject(geometry, 13);
var geometry2 = bound
//////////////////////////
///////////input/////////
/////////////////////////
var StartDate = '2021-06-15';
var EndDate = '2021-08-10';
var dayOfInterest = ee.Date('2021-06-16') // Insert day of interest
var Start_period = ee.Date(StartDate)
var End_period = ee.Date(new Date().getTime())
var CLOUD_FILTER = 60 //Maximum image cloud cover percent allowed in image collection
var CLD_PRB_THRESH = 40 //Cloud probability: values greater than are considered clouds
var NIR_DRK_THRESH = 0.15 //NIR: values less than are considered potential cloud shadow
var CLD_PRJ_DIST = 1 //Maximum distance (km_ to search for cloud shadows from cloud edges)
var BUFFER = 100 //Distance (m) to dilate the edge of cloud-identified objects
var rgbthres = 0.65 //Whiteness threshold (R+G+B = white)
/////////////////////////////////
//selection satellite missions//
////////////////////////////////
var s2 = ee.ImageCollection("COPERNICUS/S2_SR") //BOA
.filterBounds(geometry2)
.filterDate(StartDate, EndDate);
var s2Clouds = ee.ImageCollection('COPERNICUS/S2_CLOUD_PROBABILITY').filterBounds(geometry2).filterDate(StartDate, EndDate);
///////////////////////////////
///////////////////////////////
//part of all the functions///
/////////////////////////////
////////////////////////////
// Give bands new names
// Import functions from other files
var rename_bands = require("users/denisecaljouw/Functions:rename_bands"); // Functions to rename_bands into color names
var general = require("users/denisecaljouw/Functions:general");
var indices = require("users/denisecaljouw/Functions:indices"); //Functions to calculate indices
/////////Join S2 and S2 cloudless probability image collections/////////////
var get_s2_sr_cld_col = function(aoi, start_date, end_date){
    //Import and filter S2 SR.
    var s2_sr_col = (ee.ImageCollection('COPERNICUS/S2_SR')
        .filterBounds(geometry2)
        .filterDate(StartDate, EndDate)
        .filter(ee.Filter.lte('CLOUDY_PIXEL_PERCENTAGE', CLOUD_FILTER)));
  //Import and filter s2cloudless.
    var s2_cloudless_col = (ee.ImageCollection('COPERNICUS/S2_CLOUD_PROBABILITY')
        .filterBounds(geometry2)
        .filterDate(StartDate, EndDate));
  //Join the filtered s2cloudless collection to the SR collection by the 'system:index' property.
    return ee.ImageCollection(ee.Join.saveFirst('s2cloudless').apply({
        'primary': s2_sr_col,
        'secondary': s2_cloudless_col,
        'condition': ee.Filter.equals({
            'leftField': 'system:index',
            'rightField': 'system:index'
        })
    }));
};
/////////Add cloud Bands/////////////
var add_cloud_bands = function(img) { 
  // Get s2cloudless image, subset the probability band.
  var cld_prb = ee.Image(img.get('s2cloudless')).select('probability');
  // Condition s2cloudless by the probability threshold value.
  var is_cloud = cld_prb.gt(CLD_PRB_THRESH).rename('clouds');
  // Add the cloud probability layer and cloud mask as image bands.
  return img.addBands(ee.Image([cld_prb, is_cloud]));
  };
////////Add shadow Bands/////////
var add_shadow_bands = function (img) {
    // Identify water pixels from the SCL band.
    var not_water = img.select('SCL').neq(6);
    // Identify dark NIR pixels that are not water (potential cloud shadow pixels).
    var SR_BAND_SCALE = 1e4;
    var dark_pixels = img.select('B8').lt(NIR_DRK_THRESH*SR_BAND_SCALE).multiply(not_water).rename('dark_pixels');
    // Determine the direction to project cloud shadow from clouds (assumes UTM projection).
    var shadow_azimuth = ee.Number(90).subtract(ee.Number(img.get('MEAN_SOLAR_AZIMUTH_ANGLE')));
  // Project shadows from clouds for the distance specified by the CLD_PRJ_DIST input.
    var cld_proj = (img.select('clouds').directionalDistanceTransform(shadow_azimuth, CLD_PRJ_DIST*10)
        .reproject({'crs': img.select(0).projection(), 'scale': 100})
        .select('distance')
        .mask()
        .rename('cloud_transform'));
    // Identify the intersection of dark pixels with cloud shadow projection.
    var shadows = cld_proj.multiply(dark_pixels).rename('shadows');
    // Add dark pixels, cloud projection, and identified shadows as image bands.
    return img.addBands(ee.Image([dark_pixels, cld_proj, shadows]));
};
//////Cloud and shadow masking//////
var add_cld_shdw_mask = function (img){
    // Add cloud component bands.
    var img_cloud = add_cloud_bands(img);
    // Add cloud shadow component bands.
    var img_cloud_shadow = add_shadow_bands(img_cloud);
    // Combine cloud and shadow mask, set cloud and shadow as value 1, else 0.
    var is_cld_shdw = img_cloud_shadow.select('clouds').add(img_cloud_shadow.select('shadows')).gt(0);
    // Remove small cloud-shadow patches and dilate remaining pixels by BUFFER input.
    // 20 m scale is for speed, and assumes clouds don't require 10 m precision.
    var is_cld_shdw = (is_cld_shdw.focal_min(2).focal_max(BUFFER*2/20)
        .reproject({'crs': img.select([0]).projection(), 'scale': 20})
        .rename('cloudmask'));
    // Add the final cloud-shadow mask to the image.
    return img_cloud_shadow.addBands(is_cld_shdw);
};
var apply_cld_shdw_mask = function (img){
    // Subset the cloudmask band and invert it so clouds/shadow are 0, else 1.
    var cld_shdw_band = img.select('cloudmask');
    var mask = cld_shdw_band.not()
    //  Updates an image's mask at all positions where the existing mask is not zero. 
    return img.updateMask(mask);
};
// // Cloud masking with rgb///////////////
var whitenessindex = function(image) {
  var rgb = image.select(['R', 'G', 'B']);
  var rgbexpress = image.expression("b('R') + b('G') + b('B')").rename('RGB');
  return image.addBands(rgbexpress)
};
var maskwhiteness = function(image) {
  var whitenessband = image.select(['RGB'])
  var mask = whitenessband.gte(rgbthres).eq(0)
  return image.updateMask(mask).copyProperties(image).copyProperties(image, ['system:time_start']);
}
////////////////////////////////////////////////////
//apply all the function and filter on bounds etc//
//////////////////////////////////////////////////
//Apply S2cloudless mask
//use function to merge S2 and S2 cloudless
var s2_sr_cld_col_eval  = get_s2_sr_cld_col(geometry2, StartDate, EndDate);
var masks2 = s2_sr_cld_col_eval.map(add_cld_shdw_mask); //add cloud and shadow bands
var masks2 = masks2.map(apply_cld_shdw_mask) //mask cloud and shadows 
// print(masks2)
//Rescale Sentinel-2 data to Landsat range
var masks2 = masks2.map(general.funcRescalecld);
var s2 = s2.map(general.funcRescale);
//Give band new names
var masks2 = rename_bands.renameS2cld(masks2); // to mask function
var s2 = rename_bands.renameS2(s2); //to original s2 data without mask
//Add whiteness index to s2 cloud probability to mask clouds
var whiteness = s2.map(whitenessindex);
var maskwhite = whiteness.map(maskwhiteness);
var masks2 = masks2.map(whitenessindex);
var masks2 = masks2.map(maskwhiteness);
//Make a collection to show the mask bands when using inspector and pixels are masked
var maskbands = s2_sr_cld_col_eval.map(add_cld_shdw_mask); //add cloud and shadow bands
var maskbands = maskbands.map(general.funcRescalecld); //rescale
var maskbands = rename_bands.renameS2cld(maskbands); // to mask function
var maskbands = maskbands.map(whitenessindex)
//Calculate indices
var coll = masks2.map(indices.addGRR);
var coll = coll.map(indices.addNDVI);
var coll = coll.map(indices.addRVI);
var coll = coll.map(indices.addMSR);
// //Give dates 
var dates = coll.map(general.dates).distinct('date').aggregate_array('date');
var max_num = (dates.size().getInfo())
// print(max_num)
// print(max_num-1)
// // Function to compute mean index values for all images in image collection point0
// var NDVImean0 = coll.select('NDVI').map(mean(point0_pol));
// var TimeSeriesNDVImean0 = ui.Chart.image.series(NDVImean0, point0_pol, ee.Reducer.mean(), 15)
// .setOptions({pointSize: 3, linesize: 1 , interpolateNulls: true});
var StartDate1 = '2021-06-15';
var EndDate1 = '2021-06-30';
// var StartDate1 = '2021-07-08';
// var EndDate1 = '2021-07-12';
var before_maas = coll.filterDate(StartDate1, EndDate1).mosaic().clip(geometry2);
var date1 = coll.filterDate(StartDate1, EndDate1).map(general.dates).distinct('date').aggregate_array('date');
var StartDate2 = '2021-07-18';
var EndDate2 = '2021-08-06';
var after_maas = coll.filterDate(StartDate2, EndDate2).mosaic().clip(geometry2);
var date2 = coll.filterDate(StartDate2, EndDate2).map(general.dates).distinct('date').aggregate_array('date');
var diff_maas_ndvi=before_maas.select('NDVI').subtract(after_maas.select('NDVI'))
///////////////////////////
//add MapLayer or Charts//
/////////////////////////
// print(diff_maas_ndvi)
// Map.addLayer(maskbands.filterDate(dayOfInterest, dayOfInterest.advance(1, 'day')), {min:0, max:0.5, bands: ['R', 'G', 'B']},'mask bands')
// Map.addLayer(coll.filterDate(dayOfInterest, dayOfInterest.advance(1, 'day')), {min:0, max:0.5, bands: ['R', 'G', 'B']},'s2 masked')
Map.addLayer(before_maas, {min:0, max:0.5, bands: ['R', 'G', 'B']},(date1.get(0)).getInfo()+' tot '+(date1.get(-1)).getInfo(), false)
Map.addLayer(after_maas, {min:0, max:0.5, bands: ['R', 'G', 'B']},(date2.get(0)).getInfo()+' tot '+(date2.get(-1)).getInfo(), false)
Map.addLayer(diff_maas_ndvi, {min:0, max:0.5, bands: ['NDVI']},'Maas NDVI verschil', false)
// Map.addLayer(s2.filterDate(dayOfInterest, dayOfInterest.advance(1, 'day')), {bands: ['R','G','B'], min:0, max:0.5},'s2 collection original')
// Map.addLayer(maskwhite.filterDate(dayOfInterest, dayOfInterest.advance(1, 'day')), {}, 'only whiteness mask')
// /////////////////////////////////////
// // ///// Debugging below ////////////
// // //////////////////////////////////
// // this creates a slider to slide through the images selected. Adapt (if needed) the range of the slider in line 216
// var image_list = coll.toList(coll.size());
// var showLayer = function(index) {
//   var image = ee.Image(image_list.get(index));
//   // print('image date:' + dates.get(index).getInfo())//.select('date'))//index, ee.Date(image.get('system:time_start')));
//   Map.layers().reset();
//   Map.addLayer({
//     eeObject: image.clip(geometry2),
//     visParams: {min:0, max:0.5, bands: ['R', 'G', 'B']},
//     name: dates.get(index).getInfo()+' RGB beeld slider',//.get('date').aggregate_array('date'), // (image.get('system:time_start').aggregate_array('date')).get(0)+ ' true color',
//     shown: true
//   });
// Map.addLayer(before_maas, {min:0, max:0.5, bands: ['R', 'G', 'B']},(date1.get(0)).getInfo()+' tot '+(date1.get(-1)).getInfo(), false)
// Map.addLayer(after_maas, {min:0, max:0.5, bands: ['R', 'G', 'B']},(date2.get(0)).getInfo()+' tot '+(date2.get(-1)).getInfo(), false)
// Map.addLayer(diff_maas_ndvi, {min:0, max:0.5, bands: ['NDVI']},'Maas NDVI verschil', false)
// };
// // Create a label and slider.
// var slider = ui.Slider({
//   min: 0,
//   max: max_num-1,
//   step: 1,
//   onChange: showLayer,
//   style: {stretch: 'horizontal'}
// });
// var label = ui.Label('Scroll door de data heen ');
// // Create a panel that contains both the slider and the label.
// var panel = ui.Panel({
//   widgets: [label, slider],
//   layout: ui.Panel.Layout.flow('vertical'),
//   style: {
//     position: 'top-center',
//     padding: '7px'
//   }
// });
// // Add the panel to the map.
// Map.add(panel);
// // Set default values on the slider and map.
// slider.setValue(0);