var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                37.07007650222188,
                -1.5837635846855502
              ],
              [
                37.07007650222188,
                -1.6530871114534216
              ],
              [
                37.14492086257344,
                -1.6530871114534216
              ],
              [
                37.14492086257344,
                -1.5837635846855502
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#ffffff",
      "mode": "Geometry",
      "shown": true,
      "locked": true
    }) || 
    /* color: #ffffff */
    /* locked: true */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[37.07007650222188, -1.5837635846855502],
          [37.07007650222188, -1.6530871114534216],
          [37.14492086257344, -1.6530871114534216],
          [37.14492086257344, -1.5837635846855502]]], null, false),
    geometry2 = ui.import && ui.import("geometry2", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            37.10213464891651,
            -1.6100115353208575
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ffc82d",
      "mode": "Geometry",
      "shown": true,
      "locked": true
    }) || 
    /* color: #ffc82d */
    /* locked: true */
    ee.Geometry.Point([37.10213464891651, -1.6100115353208575]);
/* +++++++++++++++++++++++++++++++++++++++++++
S1, S2, phenoCam time series comparison
----------------------------------------------
Author: Yan Cheng 
Email: chenyan2017@gmail.com
Contributors: Dr Anton Vrieling,
Update: 09/12/2020
# Functions
1. Import and filter S1, S2 from GEE repository.
2. Cloud screening for S2.
3. Plot time series of S1-, S2-, (phenoCam)-derived vegetation descrepitors.
    If there is no phenoCam observations, Only S1- and S2-derived observations will be displayed.
4. Export S1, S2, (phenoCam) time series for a given location as a CSV file.
# Logbook of updates
06/12/2020 
feat: Initialize scripts - S1, S2 time series comparison
09/12/2020 
feat: Add phenoCam time series
feat: Display S1, S2, phenoCam time series on the same graph
feat: Export S1, S2, (phenoCam) time series for a given location as a CSV file
chore: Display VH/VV on the map
fix: EVI and EVI2 calculation 1->10000
refactor: EVI and EVI2 functions, using ee.Image.constant()
# TO DO LIST
1. Transcoding using GEE API for Python
++++++++++++++++++++++++++++++++++++++++++++++ */
/* ====== Filter and import datasets====== */
// time span, scale, AOI, POI
// Define time period.
var START_DATE = '2017-01-01';
var END_DATE = '2019-12-31';
// Define scale (unit m)
var SCALE = 50; // S1 and S2 will be resampled to 50x50m
// Define AOI and POI,
// either drawing on the map or importing shapefile from your GEE assets
var AOI = geometry;
var POI = geometry2;
Map.centerObject(AOI, 12);
// Comment or uncomment the following lines not to or to use Kapiti GIS datasets
// Import Kapiti GIS datasets.
// 1. bundary
var KAPITI_SHP = ee.FeatureCollection("users/chengyan2017/Kapiti_Jun18_v2").first().geometry();
// 2. coordinates of phenoCams in Kapiti.
var CAM_A = ee.Geometry.Point(37.13206, -1.59946);
var CAM_B = ee.Geometry.Point(37.13281, -1.59610);
var CAM_C = ee.Geometry.Point(37.13605, -1.63305);
// Define AOI and POI
var AOI = KAPITI_SHP;
var POI = CAM_A;
// Display AOI and POI
Map.addLayer({
  eeObject: AOI, 
  name: 'Kapiti'
});
Map.addLayer({
  eeObject: POI,
  name: 'Camera'
});
Map.centerObject(AOI, 12);
/* ====== Filter and pre-process Sentinel-1 ====== */
// Select S1 IW images in area of interest and time period
var s1 = ee.ImageCollection('COPERNICUS/S1_GRD_FLOAT').
  filterMetadata('instrumentMode', 'equals', 'IW').
  filterBounds(AOI).
  filterDate(START_DATE, END_DATE); 
// print(s1);
// Discard S1 images without 'VH or 'VV'
function filterS1Ids(imgCol){
  // define function.
  var first = ee.List(['Null']);
  var addS1Ids = function(img, lis){
                    var previous = ee.Algorithms.If(ee.List(img.bandNames()).containsAll(['VH', 'VV', 'angle']), img.get('system:index'), 'Null');
                  return ee.List(lis).add(previous);
                };
  // get valid ids.              
  var s1Ids = ee.List(imgCol.iterate(addS1Ids, first)).removeAll(ee.List(['Null']));
  // select valid images.
  return imgCol.filter(ee.Filter.inList('system:index', s1Ids));
}
// apply function.
s1 = filterS1Ids(s1);
// Calculate VH/VV for both look angles
// for images without VH or VV band, set ratio value as -3001
s1 = s1.map(function(f){
  return f.addBands(f.select('VH').divide(f.select('VV')).rename('ratio')).float();
});
// Filter to get images from different look angles.
var s1Ascending = s1.filterMetadata('orbitProperties_pass', 'equals', 'ASCENDING');
var s1Descending = s1.filterMetadata('orbitProperties_pass', 'equals', 'DESCENDING');
// print(s1Ascending.first().bandNames());
// Extract time series for a given location and saved as ee.List
var s1AscList = s1Ascending.getRegion(POI, SCALE);
var s1DesList = s1Descending.getRegion(POI, SCALE);
// print(s1AscList);
// Reconstruct list 
function recS1List(lis, band_name){
  var idx = ee.List(lis.get(0)).indexOf(band_name);
  return lis.remove(lis.get(0))
            .map(function(f){
              var date = ee.Date.parse('yyyyMMdd', ee.String(ee.List(f).get(0)).slice(17, 25));
              var val = ee.List(f).get(7);
              return ee.Feature(POI, ee.Dictionary({
                'date': date,
                'val': val,
                'group': band_name
              }));
            });
}
var s1AscVhList = recS1List(s1AscList, 'VH');
var s1AscVvList = recS1List(s1AscList, 'VV');
var s1AscRviList = recS1List(s1AscList, 'ratio');
var s1AscFeaCol = ee.FeatureCollection(s1AscVhList.cat(s1AscVvList).cat(s1AscRviList));
var s1DesVhList = recS1List(s1DesList, 'VH');
var s1DesVvList = recS1List(s1DesList, 'VV');
var s1DesRviList = recS1List(s1DesList, 'ratio');
var s1DesFeaCol = ee.FeatureCollection(s1DesVhList.cat(s1DesVvList).cat(s1DesRviList));
// print(s1AscList);
// Display S1 25 percentile.
// select VH, Descending.
var s1VhDesc = s1Ascending.select('VH');
// create percentiles.
var p25 = s1VhDesc.reduce(ee.Reducer.percentile([25]));
// convert to db.
var p25_db = p25.log10().multiply(10.0);
// display S1 data.
Map.addLayer(p25_db.clip(AOI), {min: [-30], max: [0]}, 'S1 p25', 1);
// Display S1 VH/VV.
var viParams = {min: -1, max: 1, palette: ['blue', 'white', 'green']};
// display one image for demonstration purposes
Map.addLayer(
  s1.sort('system:time_start', false).first().select('ratio').clip(AOI), 
  viParams,
  'S1 ratio', 
  true);
/* ====== Filter and pre-process Sentinel-2 ====== */
// Import and filter Sentinel-2 dataset.
var s2Sr = ee.ImageCollection("COPERNICUS/S2_SR")
          // uncomment it for specific datasets
          // .filterMetadata('SPACECRAFT_NAME', 'equals', 'Sentinel-2B')
          .filterBounds(AOI)
          .filterDate(ee.Date(START_DATE), ee.Date(END_DATE));
// Import and filter Sentinel-2 cloud probabiliry.
var s2Clouds = ee.ImageCollection('COPERNICUS/S2_CLOUD_PROBABILITY')
              // uncomment it for specific datasets
              // .filterMetadata('SPACECRAFT_NAME', 'equals', 'Sentinel-2B');
              .filterBounds(AOI)
              .filterDate(ee.Date(START_DATE), ee.Date(END_DATE));
// print(s2Sr);
// Display images
// set the visParams
var rgbVis = {'bands': ['B4', 'B3', 'B2'], 'min': 0, 'max': 2500, 'gamma': 1.1};
// display original image 
Map.addLayer(
  s2Sr.sort('system:time_start', false).first().clip(AOI), // only display one image in the ImageCollection for demonstration purposes
  rgbVis,
  'S2 SR', 
  true);
// Cloud mask.
// Parameters
var MAX_CLOUD_PROB = 65; // max cloud probability, percentage
var NIR_DRK_THRESH = 0.15; // parameters used for classify cloud shadows
var CLD_PRJ_DIST = 1; // parameters used for classify cloud shadows
var BUFFER = 50; // in meters, used in cloud-shaow mask
var RES = 10; // resolution step, in meters 
// Define cloud mask component functions
function addCloudBands(img) {
  // get s2cloudless image, subset the probability band.
  var cldPrb = ee.Image(img.get('s2cloudMask')).select('probability').rename('cloud_prob');
  // condition s2cloudless by the probability threshold value.
  var isCloud = cldPrb.gt(MAX_CLOUD_PROB).rename('clouds');
  // add the cloud probability layer and cloud mask as image bands.
  return img.addBands(ee.Image([cldPrb, isCloud]));
}
//Define cloud shadow component functions
function addShadowBands(img){
  // identify water pixels from the SCL band.
  var notWater = img.select('SCL').neq(ee.Number(6));
  // identify dark NIR pixels that are not water (potential cloud shadow pixels).
  var SR_BAND_SCALE = 1e4;
  var darkPixels = img.select('B8')
                  .lt(ee.Number(NIR_DRK_THRESH).multiply(ee.Number(SR_BAND_SCALE)))
                  .multiply(notWater)
                  .rename('dark_pixels');
  // determine the direction to project cloud shadow from clouds (assumes UTM projection).
  var shadowAzimuth = ee.Number(90).subtract(ee.Number(img.get('MEAN_SOLAR_AZIMUTH_ANGLE')));
  // project shadows from clouds for the distance specified by the CLD_PRJ_DIST input.
  var cldProj = img.select('clouds').directionalDistanceTransform(shadowAzimuth, ee.Number(CLD_PRJ_DIST).multiply(ee.Number(10)))
                .reproject({'crs': img.select(0).projection(), 'scale': 20})
                .select('distance')
                .mask()
                .rename('cloud_transform');
  // identify the intersection of dark pixels with cloud shadow projection.
  var shadows = cldProj.multiply(darkPixels).rename('shadows');
  // add dark pixels, cloud projection, and identified shadows as image bands.
  return img.addBands(ee.Image([darkPixels, cldProj, shadows]));
}
// Add final cloud-shadow mask
function addCldShdwMask(img) {
  // add cloud component bands.
  var imgCloud = addCloudBands(img);
  // add cloud shadow component bands.
  var imgCloudShadow = addShadowBands(imgCloud);
  // combine cloud and shadow mask, set cloud and shadow as value 1, else 0.
  var isCldShdw = imgCloudShadow.select('clouds')
                  .add(imgCloudShadow.select('shadows')).gt(ee.Number(0));
  // remove small cloud-shadow patches and dilate remaining pixels by BUFFER input.
  // 20 m scale is for speed, and assumes clouds don't require 10 m precision.
  isCldShdw = isCldShdw.focal_min(ee.Number(2)).focal_max(ee.Number(BUFFER)
              .multiply(ee.Number(2/20)))
              .reproject({'crs': img.select([0]).projection(), 'scale': 20})
              .rename('cloud_shadow_mask');
  // add the final cloud-shadow mask to the original image.
  return imgCloudShadow.addBands(isCldShdw);
}
// Apply cloud and cloud shadow mask
function applyCldShdwMask(img) {
  // subset the cloud_shadow_mask band and invert it so clouds/shadow are 0, else 1.
  var notCldShdw = img.select('cloud_shadow_mask').not();
  // subset reflectance bands and update their masks, return the result.
  return img.select('B.*').updateMask(notCldShdw);
}
// Join the filtered s2cloudless collection to the SR collection by the 'system:index' property.
var s2SrWithCloudProb = ee.ImageCollection(ee.Join.saveFirst('s2cloudMask').apply({
  primary: s2Sr,
  secondary: s2Clouds,
  condition:
      ee.Filter.equals({leftField: 'system:index', rightField: 'system:index'})
}));
// print(s2SrWithCloudProb.first());
// Apply cloud and cloud shadow screening functions
var s2SrWithCldShdwMask = s2SrWithCloudProb.map(addCldShdwMask);
var s2SrCloudless = s2SrWithCldShdwMask.map(applyCldShdwMask);
// Display images
// set the visParams
var rgbVis = {'bands': ['B4', 'B3', 'B2'], 'min': 0, 'max': 2500, 'gamma': 1.1};
// display one image after cloud screening for demonstration purposes
Map.addLayer(
  s2SrCloudless.sort('system:time_start', false).first().clip(AOI), // only display one image in the ImageCollection for demonstration purposes
  rgbVis,
  'S2 SR masked at ' + MAX_CLOUD_PROB + '%', 
  true);
// Band math.
// Define EVI2 function
function evi2(img) {
  var nir = img.select('B8');
  var red = img.select('B4');
  return ee.Image.constant(2.5).multiply(nir.subtract(red))
           .divide(nir.add(ee.Image.constant(2.4).multiply(red)).add(ee.Image.constant(10000)))
           .rename('EVI2').float();
}
// Define NDVI function
function ndvi(img) {
  return img.normalizedDifference(['B8', 'B4']).rename('NDVI').float();
}
// Define EVI function
function evi(img) {
  var nir = img.select('B8');
  var red = img.select('B4');
  var blue = img.select('B2');
  return ee.Image.constant(2.5).multiply(nir.subtract(red))
            .divide(nir.add(ee.Image.constant(6).multiply(red))
            .subtract(ee.Image.constant(7).multiply(blue)).add(ee.Image.constant(10000)))
            .rename('EVI').float();
}
// Add bands to S2 SR after cloud-shadow mask
var s2SrMaskVis = s2SrCloudless.map(function(f){
  return f.addBands(ee.Image([ndvi(f), evi(f), evi2(f)]));
});
// print(s2SrMaskVis.first());
// Extract time series for a given location and saved as ee.List
var s2SrMaskVisList = s2SrMaskVis.getRegion(POI, SCALE);
// print(s2SrMaskVisList);
// Reconstruct list 
// date, NDVI, EVI, EVI2
function recS2List(lis, band_name){
  var ind = ee.List(lis.get(0)).indexOf(band_name);
  return lis.remove(lis.get(0))
            .map(function(f){
              var date = ee.Date.parse('yyyyMMdd', ee.String(ee.List(f).get(0)).slice(0, 8));
              return ee.Feature(POI, ee.Dictionary({
                'date': date, 
                'val': ee.List(f).get(ind), 
                'group': ee.String(band_name)
              }));
            });
}
var s2NdviList = recS2List(s2SrMaskVisList, 'NDVI');
var s2EviList = recS2List(s2SrMaskVisList, 'EVI');
var s2Evi2List = recS2List(s2SrMaskVisList, 'EVI2');
var s2VisFeaCol = ee.FeatureCollection(s2NdviList.cat(s2EviList).cat(s2Evi2List));
// print(s2VisList);
// Display VIs
var viParams = {min: -1, max: 1, palette: ['blue', 'white', 'green']};
// EVI2
Map.addLayer(
  s2SrMaskVis.sort('system:time_start', false).first().select('EVI2').clip(AOI), // only display one image in the ImageCollection for demonstration purposes
  viParams,
  'EVI2', 
  true);
// NDVI
Map.addLayer(
  s2SrMaskVis.sort('system:time_start', false).first().select('NDVI').clip(AOI), // only display one image in the ImageCollection for demonstration purposes
  viParams,
  'NDVI', 
  true);
// EVI
Map.addLayer(
  s2SrMaskVis.sort('system:time_start', false).first().select('EVI').clip(AOI), // only display one image in the ImageCollection for demonstration purposes
  viParams,
  'EVI', 
  true);
/* ====== Filter and pre-process phenoCam ====== */
// Import CSV.
var aFeaCol = ee.FeatureCollection("users/chengyan2017/phenoCam_Kapiti/KE01_timeseries_manualSelection2017_90p");
var bFeaCol = ee.FeatureCollection("users/chengyan2017/phenoCam_Kapiti/KE02_timeseries_manualSelection2017_90p");
var cFeaCol = ee.FeatureCollection("users/chengyan2017/phenoCam_Kapiti/KE03_timeseries_manualSelection2018_90p");
// print(aFeaCol.first());
// Define data reorgnizaiton function.
function prep(fc, poi, field, roi_name) {
  // select rows (features) based on the time span.
  fc = fc.filter(ee.Filter.gte('date', ee.Date(START_DATE)))
        .filter(ee.Filter.lte('date', ee.Date(END_DATE)));
  // select rows (features) with valid GCC values (not equal to -99).
  fc = fc.filter(ee.Filter.neq(ee.String(field), -99));
  // update geometry and date for each row (feature), and rename selected field.
  fc = fc.map(function(f){
            return ee.Feature(
              poi,
              ee.Dictionary.fromLists(
                ee.List(['date', 'GCC', 'roi_name']), 
                ee.List([
                  ee.Date.parse('MM/dd/YY', f.get('date')), 
                  f.get(field),
                  ee.String(roi_name)
                  ])));
          });
  return fc;
}
// Apply the function.
var aFeaCol1 = prep(aFeaCol, CAM_A, 'gcc_roi1', 'GCC_A1');
// print(aFeaCol1);
var aFeaCol2 = prep(aFeaCol, CAM_A, 'gcc_roi2', 'GCC_A2');
var bFeaCol1 = prep(bFeaCol, CAM_B, 'gcc_roi1', 'GCC_B1');
var bFeaCol2 = prep(bFeaCol, CAM_B, 'gcc_roi2', 'GCC_B2');
var cFeaCol1 = prep(cFeaCol, CAM_C, 'gcc_roi1', 'GCC_C1');
var cFeaCol2 = prep(cFeaCol, CAM_C, 'gcc_roi2', 'GCC_C2');
var cFeaCol3 = prep(cFeaCol, CAM_C, 'gcc_roi3', 'GCC_C3');
// Combine feature collections for the same camera site.
var aFeaColComb = ee.FeatureCollection([aFeaCol1,aFeaCol2]).flatten();
var bFeaColComb = ee.FeatureCollection([bFeaCol1,bFeaCol2]).flatten();
var cFeaColComb = ee.FeatureCollection([cFeaCol1,cFeaCol2,cFeaCol3]).flatten();
// print(cFeaColComb);
// Extract time series for a given location and saved as ee.List
function feaColToList(fc){
  return fc.map(function(f){
    return ee.Feature(POI, ee.Dictionary({
      'date': ee.Feature(f).get('date'),
      'val': ee.Feature(f).get('GCC'),
      'group': ee.Feature(f).get('roi_name')
    }));
  });
}
var aFeaColCombList = feaColToList(aFeaColComb);
// print(aFeaColCombList);
var bFeaColCombList = feaColToList(bFeaColComb);
var cFeaColCombList = feaColToList(cFeaColComb);
var camAllList = ee.List([aFeaColCombList, bFeaColCombList, cFeaColCombList]);
/* ====== Plot time series ====== */
// Identify if it is user-defined POI 
// or it is one of the phenoCame location.
var whichCam = ee.List([CAM_A, CAM_B, CAM_C])
                .map(function(f){
                  return ee.List(ee.Feature(f).contains(POI));
                }).indexOf(true);
var camFeaCal = ee.Algorithms.If(
                ee.Algorithms.IsEqual(whichCam, -1), 
                null,
                camAllList.get(ee.Number(whichCam))
              );
// print(camFeaCal);
// Combine time series from S1, S2, and phenoCam.
var allFeaCol = ee.FeatureCollection([camFeaCal, s2VisFeaCol, s1AscFeaCol, s1DesFeaCol]).flatten();
// print(allFeaCol);
// Display time series.
var Chart1 = ui.Chart.feature.groups(allFeaCol, 'date', 'val', 'group')
              .setOptions({
                title: 'S1-, S2-, (PhenoCam)-derived vegetation descriptors'
              });
print(Chart1);
/* ====== Export time series ====== */
// Export the time-series FeatureCollection as a csv.
// define file name and path, etc..
var DRIVE_FOLDER = 'GoogleEarthEngine';
var POI_NAME = 'kapitiCamA';
var FILE_FORMAT = 'CSV';
var TASK_NAME_PREFIX = 'VIsTimeSeries';
var SELECTORS = 'date, EVI2, NDVI, EVI'; // in case you only need a subset of the VIs
// define funtion.
function exportFeaCol(fc) {
  // file name format -> prefix_startDate_endDate_poiName.csv
  var taskNameFix = ee.String(TASK_NAME_PREFIX).cat('_').cat(START_DATE).cat('_').cat(END_DATE).cat('_').getInfo();
  var taskName = taskNameFix + POI_NAME;
  var fileName = taskName;
  Export.table.toDrive({
    collection: fc, 
    description: taskName,
    folder: DRIVE_FOLDER,
    fileNamePrefix: fileName,
    fileFormat: FILE_FORMAT,
    selectors: SELECTORS,
  });
  return ee.String('File name: ').cat(taskName);
}
// Comment or uncomment not to or to export time series for a given location to CSV file
// Define what to export.
// camFeaCal -> phenoCame
// s2VisFeaCol -> S2
// s1AscFeaCol -> S1 Ascending
// s1DesFeaCol -> S1 Descending
var fcToExport = ee.FeatureCollection([camFeaCal, s2VisFeaCol, s1AscFeaCol, s1DesFeaCol]).flatten();
// print(toExportFc);
print(exportFeaCol(fcToExport));