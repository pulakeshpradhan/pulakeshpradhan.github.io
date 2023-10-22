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
//////////////////////////
///////////input/////////
/////////////////////////
var StartDate = '2021-06-01';
var EndDate = '2021-08-06';
var dayOfInterest = ee.Date('2021-07-25') // Insert day of interest
// select Landsat 8 data, import and filter 
/////////////////////////////////
//selection satellite missions//
///////////////////////////////
// select Landsat 8 data, import and filter 
var l8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR")
.filterBounds(bound)
.filterDate(StartDate, EndDate);
var l8toa = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA")
.filterBounds(bound)
.filterDate(StartDate, EndDate);
//////////////////////////////
//part of all the functions//
/////////////////////////////
// Import functions from other files
var rename_bands = require("users/denisecaljouw/Functions:rename_bands"); // Using function to rename_bands into color names
var indices = require("users/denisecaljouw/Functions:indices"); //Functions to calculate indices
var general = require("users/denisecaljouw/Functions:general");
//////////////////////////////////
//////// Mask shadows L8/////////
////////////////////////////////
function shadowbands(image) {
//give cloud value 0 or 1
  var cloudScore = ee.Algorithms.Landsat.simpleCloudScore(image).select('cloud');
  var cloudMask = cloudScore.gt(30).reproject(ee.Projection('EPSG:4289').atScale(30));
  var sunElevation = image.get('SUN_ELEVATION');
  var sunAzimuth = ee.Number(image.get('SUN_AZIMUTH'));
  var cloudshadows = general.computeCloudShadowMask(sunElevation,sunAzimuth,cloudMask);
  // remove dark pixels
  var irSumThresh = 0.5;//Sum of IR bands to include as shadows within TDOM and the shadow shift method (lower number masks out less)
  var darkPixels = image.select(['B5','B6','B7']).reduce(ee.Reducer.sum()).lt(irSumThresh)
  // .focal_min(contractPixels).focal_max(dilatePixels)
  //now return only cloud shadows
  return cloudshadows.mask(cloudshadows.and(darkPixels)).copyProperties(image).copyProperties(image, ['system:time_start']);
  }
var l8shadowbands = l8toa.map(shadowbands)
////////////////////////////////////////////////////
//apply all the function and filter on bounds etc//
//////////////////////////////////////////////////
//Give band new names
// ////////////////////////////////////////////////////////////////
// /////////Join BOA and TOA cloudshadow+darkpixels band////////////
// ////////////////////////////////////////////////////////////////
var merge_toa_boa = function(StartDate, EndDate){
    //Import TOA
    var shadowbands = l8shadowbands
        .filterDate(StartDate, EndDate)
  //Import l8 original collection to calculate indices with
    var l8boa = l8
    .filterDate(StartDate, EndDate);
  //Join the filtered s2cloudless collection to the SR collection by the 'system:index' property.
    return ee.ImageCollection(ee.Join.saveFirst('merged').apply({
        'primary': l8boa,
        'secondary': shadowbands,
        'condition': ee.Filter.equals({
            'leftField': 'system:index',
            'rightField': 'system:index'
        })
    }));
};
var l8mergedtoaboa  = merge_toa_boa(StartDate, EndDate);
/////////Add Shadowbands to BOA/////////////
var add_shadow_band_boa = function(img) { 
  // Get merged image, subset the probability band.
  var shadow = ee.Image(img.get('merged')).select('cloud');
  // Add the shadows as image bands.
  return img.addBands(ee.Image([shadow]));
  };
var l8complete = l8mergedtoaboa.map(add_shadow_band_boa)
// /////////Mask shadows by using shadowbands/////////////
var unmask_nonclouds = function(img) { 
  //Unmask the masked shadows and give a value of 2 (= not cloud shadow). Masked shadow value of 1. 
  var imgunmask = img.select('cloud').unmask(2)
  return img.unmask(imgunmask)
  };
//Mask pixels with value 1. Then all shadows are masked. + CLOUD MASKING FUNCTION
var mask_shadows_and_clouds = function(img) { 
  // If the cloud bit (5) is set
  // Or the cloud shadow bit is set (3)
  // Or there is snow (4)
  var cloudShadowBitMask = (1 << 3);
  var cloudConfidence = ( 1 << 7)
  var cloudsBitMask = (1 << 5);
  var snowBitmask = (1 << 4);
  // Get the pixel QA band.
  var qa = img.select('pixel_qa');
  //Create a mask which masks pixels with value 1 (cloud shadow) and only keeps pixels with value 2
  var maskCloudShadow = img.select('cloud').eq(2)
  var maskClouds = (qa.bitwiseAnd(cloudsBitMask)).and(qa.bitwiseAnd(cloudConfidence)).or(qa.bitwiseAnd(cloudShadowBitMask)).or(qa.bitwiseAnd(snowBitmask)).eq(0)
  var imgmask1 = img.updateMask(maskCloudShadow);
  return imgmask1.updateMask(maskClouds) //creates a mask image that masks all pixels that equals 1 (= cloud shadow) or with the predefined bits
  };
var l8_unmask_nonclouds= l8complete.map(unmask_nonclouds);
var l8completemasked = l8_unmask_nonclouds.map(mask_shadows_and_clouds);
//Calculate indices
var l8masked = rename_bands.renameL8boa(l8completemasked);
var coll = l8masked.map(indices.addGRR);
var coll = coll.map(indices.addNDVI);
var coll = coll.map(indices.addRVI);
var coll = coll.map(indices.addMSR);
print(coll, 'Collectie')
// Map.addLayer(l8completemasked.filterDate(dayOfInterest, dayOfInterest.advance(1, 'day')), {bands: ['B2','B3','B4'], min:0, max:2500}, 'l8completemasked');
var StartDate1 = '2021-06-25';
var EndDate1 = '2021-07-01';
var before_maas = coll.filterDate(StartDate1, EndDate1).mosaic().clip(bound);
var StartDate2 = '2021-07-18';
var EndDate2 = '2021-07-26';
var after_maas = coll.filterDate(StartDate2, EndDate2).mosaic().clip(bound);
var diff_maas_ndvi=before_maas.select('NDVI').subtract(after_maas.select('NDVI'))
///////////////////////////
//add MapLayer or Charts//
/////////////////////////
print(diff_maas_ndvi)
// Map.addLayer(maskbands.filterDate(dayOfInterest, dayOfInterest.advance(1, 'day')), {min:0, max:0.5, bands: ['R', 'G', 'B']},'mask bands')
// Map.addLayer(coll.filterDate(dayOfInterest, dayOfInterest.advance(1, 'day')), {min:0, max:0.5, bands: ['R', 'G', 'B']},'s2 masked')
Map.addLayer(before_maas, {min:0, max:2500, bands: ['R', 'G', 'B']},'25-6', false)
Map.addLayer(after_maas, {min:0, max:2500, bands: ['R', 'G', 'B']},'18-7 tot 26-7', false)
Map.addLayer(diff_maas_ndvi, {min:0, max:0.5, bands: ['NDVI']},'Maas NDVI verschil', false)
// Map.addLayer(s2.filterDate(dayOfInterest, dayOfInterest.advance(1, 'day')), {bands: ['R','G','B'], min:0, max:0.5},'s2 collection original')
// Map.addLayer(maskwhite.filterDate(dayOfInterest, dayOfInterest.advance(1, 'day')), {}, 'only whiteness mask')