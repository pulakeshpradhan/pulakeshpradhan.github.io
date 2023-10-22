var S2 = ui.import && ui.import("S2", "imageCollection", {
      "id": "COPERNICUS/S2_SR"
    }) || ee.ImageCollection("COPERNICUS/S2_SR"),
    S2_cloudProb = ui.import && ui.import("S2_cloudProb", "imageCollection", {
      "id": "COPERNICUS/S2_CLOUD_PROBABILITY"
    }) || ee.ImageCollection("COPERNICUS/S2_CLOUD_PROBABILITY"),
    NL_simple = ui.import && ui.import("NL_simple", "table", {
      "id": "users/arjenhaag/NL_simple"
    }) || ee.FeatureCollection("users/arjenhaag/NL_simple"),
    countries = ui.import && ui.import("countries", "table", {
      "id": "FAO/GAUL_SIMPLIFIED_500m/2015/level0"
    }) || ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level0"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                5.053572924980987,
                52.652525764801744
              ],
              [
                4.984221728691924,
                52.64377730510454
              ],
              [
                5.002022262504076,
                52.4923154003647
              ],
              [
                4.766159530570482,
                52.43353643537487
              ],
              [
                4.771688336739408,
                52.39760927810758
              ],
              [
                4.840317245414232,
                52.348681304247336
              ],
              [
                5.052147384574388,
                52.347632690466206
              ],
              [
                5.073090072562669,
                52.36252067506372
              ],
              [
                5.077209945609544,
                52.38851019852789
              ],
              [
                5.092214608841643,
                52.416672568297486
              ],
              [
                5.115560556107268,
                52.4265131552316
              ],
              [
                5.139593148880706,
                52.45183732721217
              ],
              [
                5.149206185990081,
                52.47024576571174
              ],
              [
                5.137876535111174,
                52.48571963185814
              ],
              [
                5.119680429154143,
                52.49888904037959
              ],
              [
                5.099767709427581,
                52.50703955511665
              ],
              [
                5.097364450150237,
                52.518322388560954
              ],
              [
                5.104917550736174,
                52.529393463872914
              ],
              [
                5.109724069290862,
                52.54150578285747
              ],
              [
                5.112470651322112,
                52.55799822213621
              ],
              [
                5.120367074661956,
                52.570728650177244
              ],
              [
                5.12144793165886,
                52.584351877785785
              ],
              [
                5.121104608904954,
                52.59332077833777
              ],
              [
                5.1150964607115945,
                52.604998455243326
              ],
              [
                5.106170069110032,
                52.61114883682052
              ],
              [
                5.096385370623704,
                52.61312928430827
              ],
              [
                5.092437158953782,
                52.6180279011478
              ],
              [
                5.079219232928391,
                52.62157123975896
              ],
              [
                5.075442682635423,
                52.62626051161876
              ],
              [
                5.08024920119011,
                52.63584590394734
              ],
              [
                5.086772333514329,
                52.635325012669675
              ],
              [
                5.090892206561204,
                52.63813775189185
              ],
              [
                5.0876306403990945,
                52.64209611554602
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#00ffff",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #00ffff */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[5.053572924980987, 52.652525764801744],
          [4.984221728691924, 52.64377730510454],
          [5.002022262504076, 52.4923154003647],
          [4.766159530570482, 52.43353643537487],
          [4.771688336739408, 52.39760927810758],
          [4.840317245414232, 52.348681304247336],
          [5.052147384574388, 52.347632690466206],
          [5.073090072562669, 52.36252067506372],
          [5.077209945609544, 52.38851019852789],
          [5.092214608841643, 52.416672568297486],
          [5.115560556107268, 52.4265131552316],
          [5.139593148880706, 52.45183732721217],
          [5.149206185990081, 52.47024576571174],
          [5.137876535111174, 52.48571963185814],
          [5.119680429154143, 52.49888904037959],
          [5.099767709427581, 52.50703955511665],
          [5.097364450150237, 52.518322388560954],
          [5.104917550736174, 52.529393463872914],
          [5.109724069290862, 52.54150578285747],
          [5.112470651322112, 52.55799822213621],
          [5.120367074661956, 52.570728650177244],
          [5.12144793165886, 52.584351877785785],
          [5.121104608904954, 52.59332077833777],
          [5.1150964607115945, 52.604998455243326],
          [5.106170069110032, 52.61114883682052],
          [5.096385370623704, 52.61312928430827],
          [5.092437158953782, 52.6180279011478],
          [5.079219232928391, 52.62157123975896],
          [5.075442682635423, 52.62626051161876],
          [5.08024920119011, 52.63584590394734],
          [5.086772333514329, 52.635325012669675],
          [5.090892206561204, 52.63813775189185],
          [5.0876306403990945, 52.64209611554602]]]),
    geometry2 = ui.import && ui.import("geometry2", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                5.38495624522882,
                53.099167586444054
              ],
              [
                5.362296943471008,
                53.086178685526484
              ],
              [
                5.343414192006164,
                53.0760734962361
              ],
              [
                5.33277118663507,
                53.08102327309317
              ],
              [
                5.321441535756164,
                53.079373410705095
              ],
              [
                5.2864226148577265,
                53.06472811110495
              ],
              [
                5.2026518629046015,
                53.02324046040618
              ],
              [
                5.196815376088195,
                53.01828404234546
              ],
              [
                5.10205829601007,
                52.96806823440037
              ],
              [
                5.028381403184841,
                52.939301212484004
              ],
              [
                5.051727350450466,
                52.91467225586027
              ],
              [
                5.106658991075466,
                52.8400791499429
              ],
              [
                5.092926080919216,
                52.77283562032024
              ],
              [
                5.136184747911403,
                52.73377008006545
              ],
              [
                5.195236261583278,
                52.729612109731825
              ],
              [
                5.281066950059841,
                52.73418585528864
              ],
              [
                5.427322443223903,
                52.85873945531518
              ],
              [
                5.456848200059841,
                53.00236188496698
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#00ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #00ff00 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[5.38495624522882, 53.099167586444054],
          [5.362296943471008, 53.086178685526484],
          [5.343414192006164, 53.0760734962361],
          [5.33277118663507, 53.08102327309317],
          [5.321441535756164, 53.079373410705095],
          [5.2864226148577265, 53.06472811110495],
          [5.2026518629046015, 53.02324046040618],
          [5.196815376088195, 53.01828404234546],
          [5.10205829601007, 52.96806823440037],
          [5.028381403184841, 52.939301212484004],
          [5.051727350450466, 52.91467225586027],
          [5.106658991075466, 52.8400791499429],
          [5.092926080919216, 52.77283562032024],
          [5.136184747911403, 52.73377008006545],
          [5.195236261583278, 52.729612109731825],
          [5.281066950059841, 52.73418585528864],
          [5.427322443223903, 52.85873945531518],
          [5.456848200059841, 53.00236188496698]]]),
    geometry3 = ui.import && ui.import("geometry3", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                4.048913048812337,
                51.9905098104592
              ],
              [
                4.000847863265462,
                51.99135546408019
              ],
              [
                3.972008751937337,
                51.98416689924108
              ],
              [
                3.954155968734212,
                51.96470970274261
              ],
              [
                3.9575891962732745,
                51.945244056076135
              ],
              [
                3.970635460921712,
                51.92280576708343
              ],
              [
                3.9809351435388995,
                51.906711030170136
              ],
              [
                4.002221154281087,
                51.90967628361164
              ],
              [
                4.025567101546712,
                51.91518266346728
              ],
              [
                4.039300011702962,
                51.91475911975752
              ],
              [
                4.0344934931482745,
                51.901203611507995
              ],
              [
                4.047539757796712,
                51.89315309262335
              ],
              [
                4.099724816390462,
                51.932121135974484
              ],
              [
                4.134057091781087,
                51.977400137062084
              ],
              [
                4.106591271468587,
                51.98712703627131
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#0000ff",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #0000ff */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[4.048913048812337, 51.9905098104592],
          [4.000847863265462, 51.99135546408019],
          [3.972008751937337, 51.98416689924108],
          [3.954155968734212, 51.96470970274261],
          [3.9575891962732745, 51.945244056076135],
          [3.970635460921712, 51.92280576708343],
          [3.9809351435388995, 51.906711030170136],
          [4.002221154281087, 51.90967628361164],
          [4.025567101546712, 51.91518266346728],
          [4.039300011702962, 51.91475911975752],
          [4.0344934931482745, 51.901203611507995],
          [4.047539757796712, 51.89315309262335],
          [4.099724816390462, 51.932121135974484],
          [4.134057091781087, 51.977400137062084],
          [4.106591271468587, 51.98712703627131]]]),
    geometry4 = ui.import && ui.import("geometry4", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                5.44382546032562,
                52.990611661814356
              ],
              [
                5.07303688610687,
                52.81500677290519
              ],
              [
                4.98514626110687,
                52.617016651214215
              ],
              [
                4.97141335095062,
                52.42147717663769
              ],
              [
                5.00711891735687,
                52.315825983488224
              ],
              [
                5.31473610485687,
                52.22843138269883
              ],
              [
                5.46305153454437,
                52.2990327099512
              ],
              [
                5.76242897595062,
                52.50681933581244
              ],
              [
                5.91898415173187,
                52.56696127947814
              ],
              [
                5.86130592907562,
                52.81168663010627
              ],
              [
                5.74869606579437,
                52.993918122703064
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ff9999",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #ff9999 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[5.44382546032562, 52.990611661814356],
          [5.07303688610687, 52.81500677290519],
          [4.98514626110687, 52.617016651214215],
          [4.97141335095062, 52.42147717663769],
          [5.00711891735687, 52.315825983488224],
          [5.31473610485687, 52.22843138269883],
          [5.46305153454437, 52.2990327099512],
          [5.76242897595062, 52.50681933581244],
          [5.91898415173187, 52.56696127947814],
          [5.86130592907562, 52.81168663010627],
          [5.74869606579437, 52.993918122703064]]]),
    geometry5 = ui.import && ui.import("geometry5", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                4.071126867022099,
                51.90423405948228
              ],
              [
                3.994222570147099,
                51.885589812465234
              ],
              [
                3.870626378740849,
                51.79734861934249
              ],
              [
                3.829427648272099,
                51.75996372902412
              ],
              [
                3.804708409990849,
                51.72084640171271
              ],
              [
                3.705831456865849,
                51.67828915052343
              ],
              [
                3.692098546709599,
                51.64932735449349
              ],
              [
                3.661886144365849,
                51.6220522801808
              ],
              [
                3.656392980303349,
                51.58281561986609
              ],
              [
                3.538289952959599,
                51.46661321095418
              ],
              [
                3.499837804522099,
                51.389551445255506
              ],
              [
                3.689351964678349,
                51.28144654496498
              ],
              [
                4.106832433428349,
                51.27801046792146
              ],
              [
                4.201589513506474,
                51.34754094127901
              ],
              [
                4.202938479305578,
                51.38356325715736
              ],
              [
                4.304586339678349,
                51.389551445255535
              ],
              [
                4.323812413897099,
                51.46832421863088
              ],
              [
                4.551778722490849,
                51.65784745157801
              ],
              [
                4.667135167803349,
                51.704679361090356
              ],
              [
                4.646535802568974,
                51.74125966719595
              ],
              [
                4.312826085772099,
                51.8448845992991
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#99ff99",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #99ff99 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[4.071126867022099, 51.90423405948228],
          [3.994222570147099, 51.885589812465234],
          [3.870626378740849, 51.79734861934249],
          [3.829427648272099, 51.75996372902412],
          [3.804708409990849, 51.72084640171271],
          [3.705831456865849, 51.67828915052343],
          [3.692098546709599, 51.64932735449349],
          [3.661886144365849, 51.6220522801808],
          [3.656392980303349, 51.58281561986609],
          [3.538289952959599, 51.46661321095418],
          [3.499837804522099, 51.389551445255506],
          [3.689351964678349, 51.28144654496498],
          [4.106832433428349, 51.27801046792146],
          [4.201589513506474, 51.34754094127901],
          [4.202938479305578, 51.38356325715736],
          [4.304586339678349, 51.389551445255535],
          [4.323812413897099, 51.46832421863088],
          [4.551778722490849, 51.65784745157801],
          [4.667135167803349, 51.704679361090356],
          [4.646535802568974, 51.74125966719595],
          [4.312826085772099, 51.8448845992991]]]),
    geometry6 = ui.import && ui.import("geometry6", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                4.913874786793855,
                51.44877226921822
              ],
              [
                4.91198651164737,
                51.4345414737077
              ],
              [
                4.92898098796573,
                51.424159826380844
              ],
              [
                4.951811951100495,
                51.427156832739755
              ],
              [
                4.961768310963777,
                51.45315831203183
              ],
              [
                4.946662109791902,
                51.46011093103381
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#9999ff",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #9999ff */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[4.913874786793855, 51.44877226921822],
          [4.91198651164737, 51.4345414737077],
          [4.92898098796573, 51.424159826380844],
          [4.951811951100495, 51.427156832739755],
          [4.961768310963777, 51.45315831203183],
          [4.946662109791902, 51.46011093103381]]]);
// snow in NL
// See also (S3 example from ESA): https://www.esa.int/ESA_Multimedia/Images/2021/02/Netherlands_in_white
// S2 cloud masking: https://developers.google.com/earth-engine/tutorials/community/sentinel-2-s2cloudless
// ---------------------------------------------------------------------------------------------------- //
// Parameters
// ---------------------------------------------------------------------------------------------------- //
var CLD_PRB_THRESH = 70;  // default 50 (set higher to get less fully masked pixels in mosaic)
var NIR_DRK_THRESH = 0.15;
var CLD_PRJ_DIST = 1;
var BUFFER = 50;
var visParams_S2 = {bands:['B4','B3','B2'], min:0, max:7000, gamma:1.5};
// var NL = countries.filter(ee.Filter.eq('ADM0_NAME', 'Netherlands'));
// NL = NL.geometry().union(geometry).union(geometry2).union(geometry3).union(geometry4).union(geometry5).union(geometry6);
// NL = NL.buffer(1000);
// NL = ee.FeatureCollection(ee.Feature(NL).set({
//   source: 'FAO_GAUL',
//   GEE_source: "FAO/GAUL_SIMPLIFIED_500m/2015/level0",
//   country: 'Netherlands',
//   buffer: 1000
// }));
var NL = NL_simple;
// ---------------------------------------------------------------------------------------------------- //
// Functions
// ---------------------------------------------------------------------------------------------------- //
// get relevant images
function getImgs(ic) {
  ic = ic.filterBounds(NL)
         .filterDate('2021-02-09', '2021-02-16')
         .sort('system:time_start');
  return ic;
}
// cloud masking functions
function add_cloud_bands(img) {
  // Get s2cloudless image, subset the probability band.
  var cld_prb = ee.Image(img.get('s2cloudless')).select('probability');
  // Condition s2cloudless by the probability threshold value.
  var is_cloud = cld_prb.gt(CLD_PRB_THRESH).rename('clouds');
  // Add the cloud probability layer and cloud mask as image bands.
  return img.addBands(ee.Image([cld_prb, is_cloud]));
}
function add_shadow_bands(img) {
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
}
function add_cld_shdw_mask(img) {
  // Add cloud component bands.
  var img_cloud = add_cloud_bands(img);
  // Add cloud shadow component bands.
  var img_cloud_shadow = add_shadow_bands(img_cloud);
  // Combine cloud and shadow mask, set cloud and shadow as value 1, else 0.
  var is_cld_shdw = img_cloud_shadow.select('clouds').add(img_cloud_shadow.select('shadows')).gt(0);
  // Remove small cloud-shadow patches and dilate remaining pixels by BUFFER input.
  // 20 m scale is for speed, and assumes clouds don't require 10 m precision.
  is_cld_shdw = (is_cld_shdw.focal_min(2).focal_max(BUFFER*2/20)
      .reproject({'crs': img.select([0]).projection(), 'scale': 20})
      .rename('cloudmask'));
  // Add the final cloud-shadow mask to the image.
  // return img_cloud_shadow.addBands(is_cld_shdw);
  // return img_cloud.addBands(is_cld_shdw);
  // return img.addBands(is_cld_shdw);
  return img.addBands(img_cloud.select('clouds').gt(0).rename('cloudmask')); // SIMPLE, ONLY CLOUDS, NO SHADOWS
}
function apply_cld_shdw_mask(img) {
  // Subset the cloudmask band and invert it so clouds/shadow are 0, else 1.
  var not_cld_shdw = img.select('cloudmask').not();
  // Subset reflectance bands and update their masks, return the result.
  return img.select('B.*').updateMask(not_cld_shdw);
}
// Daily mosaics
/*
This function helps avoid redundent observations in MGRS overlap areas and edge artifacts for shadow masking,
by creating a single mosaic image for each day.
Originally written by Ian Housman.
Link(s):
- https://code.earthengine.google.com/e0d01bf7a4a61efb5380b960a15e700f
- https://code.earthengine.google.com/948497d2c8e8a64034d38562b21e06db
*/
var dailyMosaics = function(imgs){
  // Helper function to find unique values of a field in a collection
  function uniqueValues(collection,field){
    var values = ee.Dictionary(collection.reduceColumns(ee.Reducer.frequencyHistogram(),[field]).get('histogram')).keys();
    return values;
  }
  // Simplify date to exclude time of day
  imgs = imgs.map(function(img){
    var d = ee.Date(img.get('system:time_start'));
    var day = d.get('day');
    var m = d.get('month');
    var y = d.get('year');
    var simpleDate = ee.Date.fromYMD(y,m,day);
    return img.set('simpleTime',simpleDate.millis());
  });
  // Find the unique days
  var days = uniqueValues(imgs,'simpleTime');
  // Map over unique days to create a new image collection
  imgs = days.map(function(d){
    d = ee.Number.parse(d);
    d = ee.Date(d);
    var t = imgs.filterDate(d,d.advance(1,'day'));
    // merge all image footprints
    var fps   = ee.List(t.aggregate_array('system:footprint'));
    var geoms = ee.FeatureCollection(fps.map(function(i) {
      return ee.Feature(ee.Geometry.LinearRing(ee.Geometry(i).coordinates()));
    }));
    var fp = geoms.geometry().bounds();
    // get single image (to copy all properties from)
    var f = ee.Image(t.first());
    // create mosaic and set properties
    t = t.mosaic();
    t = t.set('date',d.format('YYYY-MM-dd'));
    t = t.set('system:time_start',d.millis());
    t = t.set('system:footprint', fp);
    t = t.copyProperties(f);
    return t;
  });
  imgs = ee.ImageCollection.fromImages(imgs);
  return imgs;
};
function showImgs(ic, name) {
  Map.addLayer(ic.filterDate('2021-02-09'), visParams_S2, 'Sentinel-2' + name + ' Feb 9', false);
  Map.addLayer(ic.filterDate('2021-02-11'), visParams_S2, 'Sentinel-2' + name + ' Feb 11', false);
  Map.addLayer(ic.filterDate('2021-02-12'), visParams_S2, 'Sentinel-2' + name + ' Feb 12', false);
  Map.addLayer(ic.filterDate('2021-02-14'), visParams_S2, 'Sentinel-2' + name + ' Feb 14', false);
}
var switchLanguage = function() {
  panel_EN.style().set('shown', !panel_EN.style().get('shown'));
  panel_NL.style().set('shown', !panel_NL.style().get('shown'));
};
var closePanel = function() {
  Map.remove(panel_NL);
  Map.remove(panel_EN);
};
// ---------------------------------------------------------------------------------------------------- //
// Processing
// ---------------------------------------------------------------------------------------------------- //
S2 = getImgs(S2);
S2_cloudProb = getImgs(S2_cloudProb);
// join S2 and S2 cloudProb
S2 = ee.ImageCollection(ee.Join.saveFirst('s2cloudless').apply({
  'primary': S2,
  'secondary': S2_cloudProb,
  'condition': ee.Filter.equals({
    'leftField': 'system:index',
    'rightField': 'system:index'
  })
}));
// add cloud bands
S2 = S2.map(add_cld_shdw_mask);
// get daily mosaics
S2 = dailyMosaics(S2);
// print('S2 daily images:', S2.size());
// apply cloud masking
var S2_masked = S2.map(apply_cld_shdw_mask);
// ---------------------------------------------------------------------------------------------------- //
// Map
// ---------------------------------------------------------------------------------------------------- //
Map.centerObject(NL);
Map.setOptions({mapTypeId:'SATELLITE'});
Map.setControlVisibility({drawingToolsControl:false});
// Map.addLayer(S2_masked.median(), visParams_S2, 'Sentinel-2 mosaic', false);
Map.addLayer(S2_masked.median().clipToCollection(NL), visParams_S2, 'Sentinel-2 mosaic', true);
showImgs(S2, '');
// showImgs(S2_masked, ' (cloud masked)');
Map.addLayer(ee.Image().byte().paint(NL,0,2), {}, 'Nederland', false);
// ---------------------------------------------------------------------------------------------------- //
// UI
// ---------------------------------------------------------------------------------------------------- //
// padding/margin = 1 (all), 2 (top/bottom,right/left), 3 (top,right/left,bottom), 4 (top,right,bottom,left)
var panel_NL = ui.Panel({
  widgets: [
    ui.Label('Nederland in de sneeuw', {width:'285px', textAlign:'center', fontWeight:'bold', padding:'0px'}),
    ui.Label('Sentinel-2 composiet gecreerd uit individuele beelden van 9 t/m 14 februari 2021. Wolken zijn uitgefilterd', {width:'285px', fontSize:'12px', padding:'0px', margin:'0px 0px 0px 7px'}),
    ui.Panel([
      ui.Label('door gebruik van', {fontSize:'12px', padding:'0px', margin:'0px 0px 0px 25px'}),
      ui.Label('s2cloudless', {fontSize:'12px', padding:'0px', margin:'0px 0px 0px 3px'}, "https://github.com/sentinel-hub/sentinel2-cloud-detector"),
      ui.Label('van', {fontSize:'12px', padding:'0px', margin:'0px 0px 0px 3px'}),
      ui.Label('Sentinel Hub', {fontSize:'12px', padding:'0px', margin:'0px 0px 0px 3px'}, "https://www.sentinel-hub.com/"),
    ], ui.Panel.Layout.flow('horizontal'), {width:'285px'}),
    ui.Panel([
      ui.Label('geimplementeerd in', {fontSize:'12px', padding:'0px', margin:'0px 0px 0px 40px'}),
      ui.Label('Google Earth Engine', {fontSize:'12px', padding:'0px', margin:'0px 0px 0px 3px'}, "https://earthengine.google.com/#"),
      ui.Label('.', {fontSize:'12px', padding:'0px', margin:'0px 0px 0px 0px'}),
    ], ui.Panel.Layout.flow('horizontal'), {width:'285px'}),
    ui.Label("Meer kaartlagen te activeren via de 'Layers' knop.", {width:'285px', fontSize:'12px', padding:'0px'}),
    ui.Label('Contains modified Copernicus Sentinel data [2021]', {width:'285px', fontSize:'12px', padding:'0px'}),
    ui.Panel([
      ui.Button('English', switchLanguage, false, {width:'100px', padding:'0px', margin:'4px 0px 4px 35px'}),
      ui.Button('Sluiten', closePanel, false, {width:'100px', padding:'0px', margin:'4px 0px 4px 35px'})
    ], ui.Panel.Layout.flow('horizontal'), {width:'285px'})
  ],
  // layout:,
  style: {width:'320px', textAlign:'center', position:'top-center'}
});
var panel_EN = ui.Panel({
  widgets: [
    ui.Label('Netherlands in the snow', {width:'285px', textAlign:'center', fontWeight:'bold', padding:'0px'}),
    ui.Label('Sentinel-2 composite created from individual images of 9-14 February 2021. Clouds have been filtered out', {width:'285px', fontSize:'12px', padding:'0px', margin:'0px 0px 0px 7px'}),
    ui.Panel([
      ui.Label('through use of', {fontSize:'12px', padding:'0px', margin:'0px 0px 0px 35px'}),
      ui.Label('s2cloudless', {fontSize:'12px', padding:'0px', margin:'0px 0px 0px 3px'}, "https://github.com/sentinel-hub/sentinel2-cloud-detector"),
      ui.Label('of', {fontSize:'12px', padding:'0px', margin:'0px 0px 0px 3px'}),
      ui.Label('Sentinel Hub', {fontSize:'12px', padding:'0px', margin:'0px 0px 0px 3px'}, "https://www.sentinel-hub.com/"),
    ], ui.Panel.Layout.flow('horizontal'), {width:'285px'}),
    ui.Panel([
      ui.Label('implemented in', {fontSize:'12px', padding:'0px', margin:'0px 0px 0px 45px'}),
      ui.Label('Google Earth Engine', {fontSize:'12px', padding:'0px', margin:'0px 0px 0px 3px'}, "https://earthengine.google.com/#"),
      ui.Label('.', {fontSize:'12px', padding:'0px', margin:'0px 0px 0px 0px'}),
    ], ui.Panel.Layout.flow('horizontal'), {width:'285px'}),
    ui.Label("More datasets can be activated at the 'Layers' button.", {width:'285px', fontSize:'12px', padding:'0px'}),
    ui.Label('Contains modified Copernicus Sentinel data [2021]', {width:'285px', fontSize:'12px', padding:'0px'}),
    ui.Panel([
      ui.Button('Nederlands', switchLanguage, false, {width:'100px', padding:'0px', margin:'4px 0px 4px 35px'}),
      ui.Button('Close', closePanel, false, {width:'100px', padding:'0px', margin:'4px 0px 4px 35px'})
    ], ui.Panel.Layout.flow('horizontal'), {width:'285px'})
  ],
  // layout:,
  style: {width:'320px', textAlign:'center', position:'top-center', shown:false}
});
Map.add(panel_NL);
Map.add(panel_EN);