/******************************************************************************
 * Purpos : Comparison of 2 periods Sentinel-2 data
 * DataSet : Google Earthe Engine Sentinel-2 data Catalog
 *           https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_S2_SR
 * Auther : FutureBase R.Yamaguchi
 * update : 2023-01-17
 *****************************************************************************/
var lastEdit = '2023-01-17'
// Initial map Location
Map.setCenter(137.225691, 36.973971,8);
/*****  MAPS SETTING. *****/
// Create map panels.
var leftMap = ui.Map();
var rightMap = ui.Map();
// Configure UI controls for both maps.
leftMap.setControlVisibility({fullscreenControl:false});
rightMap.setControlVisibility({fullscreenControl:false});
leftMap.setCenter(137.225691, 36.973971,8);
rightMap.setCenter(137.225691, 36.973971,8);
// Link them together.
var linker = new ui.Map.Linker([leftMap, rightMap]);
// Create a split panel with the two maps.
var splitPanel = ui.SplitPanel({
    firstPanel: leftMap,
    secondPanel: rightMap,
    orientation: 'horizontal',
    wipe: true
});
// Add these to the interface.
ui.root.widgets().reset([splitPanel]);
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
/*                          */
/**** LANDSAT DISPLAY Function*******/
/*                          */
// Applies scaling factors.
/***
function applyScaleFactors89(image) {
  var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2);
  var thermalBands = image.select('ST_B.*').multiply(0.00341802).add(149.0);
  return image.addBands(opticalBands, null, true)
              .addBands(thermalBands, null, true);
}
// Applies scaling factors.
function applyScaleFactors75(image) {
  var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2);
  var thermalBand = image.select('ST_B6').multiply(0.00341802).add(149.0);
  return image.addBands(opticalBands, null, true)
              .addBands(thermalBand, null, true);
}
// Cloud mask
function prepSrL8(image) {
  // Develop masks for unwanted pixels (fill, cloud, cloud shadow).
  var qaMask = image.select('QA_PIXEL').bitwiseAnd(parseInt('11111', 2)).eq(0);
  var saturationMask = image.select('QA_RADSAT').eq(0);
  // Apply the scaling factors to the appropriate bands.
  var getFactorImg = function(factorNames) {
    var factorList = image.toDictionary().select(factorNames).values();
    return ee.Image.constant(factorList);
  };
  var scaleImg = getFactorImg([
    'REFLECTANCE_MULT_BAND_.|TEMPERATURE_MULT_BAND_ST_B10']);
  var offsetImg = getFactorImg([
    'REFLECTANCE_ADD_BAND_.|TEMPERATURE_ADD_BAND_ST_B10']);
  var scaled = image.select('SR_B.|ST_B10').multiply(scaleImg).add(offsetImg);
  // Replace original bands with scaled bands and apply masks.
  return image.addBands(scaled, null, true)
    .updateMask(qaMask).updateMask(saturationMask);
}
****/
//
// ** Sentinel-2 cloud masking
//
function cloudMasking(image){
  var qa = image.select('QA60');
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask)
}
//====================================================================================
// SCL-based masking.
//====================================================================================
// Function for the SCL-based masking.
function getSCLmask (image) {
  　var visParamsLOSS = {palette:['Black','Red'],min:0,max:1};
  　var visParams = {bands: 'B8,B4,B3', min:0, max:3000};
    // Define SCL band.
    var scl = image.select('SCL');
    var outputBands = ['B2','B3','B4','B8','B11','B12'];
    // Generate SCL-based mask image.
    var define_SCLmask = scl.eq(4).or(scl.eq(5));
    var apply_SCLmask = image.updateMask(define_SCLmask);
    // Return the masked image.
    var output_masked = apply_SCLmask;
  　//Map.addLayer(output_masked, visParamsLOSS, 'output_masked', true);
  　//Map.addLayer(scl.clip(targetArea),visParams,'scl', true);
    return output_masked
return output_masked.select(outputBands);
}
//====================================================================================
// STEPWISE Version 2 cloud masking.
//====================================================================================
// Function for STEPWISE cloud masking.
function getSTEPWISE_v2 (image) {
  // General parameters.
  var input = ee.Image(image);
  var tCloud_v2 = 5;
  var outputBands = ['B2','B3','B4','B8','B11','B12'];
  // Function for the SCL-based masking.
  function getSCLmask (image) {
    // Define SCL band.
    var scl = image.select('SCL');
    // Generate SCL-based mask image.
    var define_SCLmask = scl.eq(4).or(scl.eq(5));
    var apply_SCLmask = image.updateMask(define_SCLmask);
    // Return the masked image.
    var output_masked = apply_SCLmask;
  return output_masked;
  }
  // Function for the Sentinel-2 cloud scoring.
  function getCLOUDSCORE_v2 (image) {
  // General parameters.
  var tCloud = tCloud_v2; // Lesser the number, Lesser the cloud (0-100).
  // A mapping from a common name to the sensor-specific bands.
  var s2_BANDS = [ 'B1', 'B2',   'B3',    'B4',  'B8',  'B11',   'B12'];
  var STD_NAMES = ['cb', 'blue', 'green', 'red', 'nir', 'swir1', 'swir2'];
  // Convert band names and rescale reflectance to 0-1.
  var s2_image = image.select(s2_BANDS, STD_NAMES).divide(10000);
  // Compute a cloud score.  This expects the input image to have the common
  // band names: ["red", "blue", etc], so it can work across sensors.
  var cloudScore = function(img) {
    // A helper to apply an expression and linearly rescale the output.
    var rescale = function(img, exp, thresholds) {
                  return img.expression(exp, {img: img})
                            .subtract(thresholds[0])
                            .divide(thresholds[1] - thresholds[0]);
                  };
    // Compute several indicators of cloudyness and take the minimum of them.
    var score = ee.Image(1);
    var blueScore = ee.Image(0);
    // Clouds are reasonably bright in the blue band.
    //Use .max as a pseudo OR conditional
    blueScore = blueScore.max(rescale(img, 'img.blue', [0.1, 0.5]));
    blueScore = blueScore.max(rescale(img, 'img.cb', [0.1, 0.5]));
    // blueScore = blueScore.max(rescale(img, 'img.cirrus', [0.1, 0.3]));
    score = score.min(blueScore);
    // Clouds are reasonably bright in all visible bands.
    score = score.min(rescale(img, 'img.red + img.green + img.blue', [0.2, 0.8]));
    // Clouds are reasonably bright in all infrared bands.
    score = score.min(rescale(img, 'img.nir + img.swir1 + img.swir2', [0.3, 0.8]));
    // However, clouds are not snow.
    var ndsi =  img.normalizedDifference(['green', 'swir1']);
    score=score.min(rescale(ndsi, 'img', [0.8, 0.6]));
  return score.multiply(100).byte();
  };
  // Generate the cloud score band.
  var applyCloudScore = cloudScore(s2_image.select(STD_NAMES));
  var cloudScoreBand = ee.Image(applyCloudScore).select([0], ['cloud_score']);
  // Apply the tCloud and mask image.
  var applyThreshold = cloudScoreBand.gt(tCloud);
  var maskedImage = image.updateMask(applyThreshold.not());
return maskedImage.addBands(cloudScoreBand.select('cloud_score'));
}
  // Function for the Cloud Shift Method.
  function getCLOUDSHIFT (image){
    // General parameters.
    var cloudThresh = tCloud_v2; // Lesser the number, Lesser the cloud (0-100).
    var cloudHeights = ee.List.sequence(500,10000,500); // Height of clouds to use to project cloud shadows.
    var irSumThresh = 4000; //0.4
    var contractPixels = 1.5;
    var dilatePixels = 3.5;
    // contractPixels: The radius of the number of pixels to contract (negative buffer) clouds and cloud
    //    shadows by.  Intended to eliminate smaller cloud patches that are likely errors
    // (1.5 results in a -1 pixel buffer)(0.5 results in a -0 pixel buffer)
    // (1.5 or 2.5 generally is sufficient) (SEPAL used 1.5 as default)
    // dilatePixels: The radius of the number of pixels to dilate (buffer) clouds and cloud
    //    shadows by.  Intended to include edges of clouds/cloud shadows that are often missed
    // (1.5 results in a 1 pixel buffer)(0.5 results in a 0 pixel buffer)
    // (2.5 or 3.5 generally is sufficient) (SEPAL used 3.5 as default)
    // Get cloud-mask band from cloud-score method.
    var cloudFreeCLOUDSCOREimage = ee.Image(image);
    var cloudMask = cloudFreeCLOUDSCOREimage.select(['cloud_score']).gt(cloudThresh).focal_min(contractPixels).focal_max(dilatePixels);
    // Derive output image by applying the cloud-shadow projection function.
    var imageOut = projectShadows(cloudMask,image,cloudHeights);
    // Sub-function for the cloud-shadow projection.
    function projectShadows(cloudMask,image,cloudHeights,yMult){
    if(yMult === undefined || yMult === null){
      yMult = ee.Algorithms.If(ee.Algorithms.IsEqual(image.select([3]).projection(), ee.Projection("EPSG:4326")),1,-1);
    }
    var meanAzimuth = image.get('MEAN_SOLAR_AZIMUTH_ANGLE');
    var meanZenith = image.get('MEAN_SOLAR_ZENITH_ANGLE');
    //Find dark pixels
    var darkPixels = image.select(['B8','B11','B12']).reduce(ee.Reducer.sum()).lt(irSumThresh)
      .focal_min(contractPixels).focal_max(dilatePixels);//.gte(1);
    //Get scale of image
    var nominalScale = cloudMask.projection().nominalScale();
    //Find where cloud shadows should be based on solar geometry
    //Convert to radians
    var azR =ee.Number(meanAzimuth).add(180).multiply(Math.PI).divide(180.0);
    var zenR  =ee.Number(meanZenith).multiply(Math.PI).divide(180.0);
    //Find the shadows
    var shadows = cloudHeights.map(function(cloudHeight){
      cloudHeight = ee.Number(cloudHeight);
      var shadowCastedDistance = zenR.tan().multiply(cloudHeight);//Distance shadow is cast
      var x = azR.sin().multiply(shadowCastedDistance).divide(nominalScale);//X distance of shadow
      var y = azR.cos().multiply(shadowCastedDistance).divide(nominalScale).multiply(yMult);//Y distance of shadow
      // print(x,y)
      return cloudMask.changeProj(cloudMask.projection(), cloudMask.projection().translate(x, y));
    });
    var shadowMask = ee.ImageCollection.fromImages(shadows).max();
    //Create shadow mask
    shadowMask = shadowMask.and(cloudMask.not());
    shadowMask = shadowMask.and(darkPixels).focal_min(contractPixels).focal_max(dilatePixels);
    // Map.addLayer(cloudMask.updateMask(cloudMask),{'min':1,'max':1,'palette':'88F'},'Cloud mask');
    // Map.addLayer(shadowMask.updateMask(shadowMask),{'min':1,'max':1,'palette':'880'},'Shadow mask');
    var cloudShadowMask = shadowMask.or(cloudMask);
    image = image.updateMask(cloudShadowMask.not()).addBands(shadowMask.rename(['cloudShadowMask']));
    return image;
  }
  return imageOut;
  }
  var visParams = {bands: 'B4,B3,B2', min:0, max:3000};
  // Apply STEPWISE cloud masking.
  var STEPWISE_v2_STEP1 = getSCLmask(input);
  var STEPWISE_v2_STEP2 = getCLOUDSCORE_v2(STEPWISE_v2_STEP1);
  var STEPWISE_v2_STEP3 = getCLOUDSHIFT(STEPWISE_v2_STEP2);
  var STEPWISE_v2_STEP4 = STEPWISE_v2_STEP3.select(0).gt(0);
  var STEPWISE_v2_STEP5 = STEPWISE_v2_STEP4; // Values: 1 = cloud free pixels.
  // Derive NDVI, NDWI, and NBR.
  var aNDVI = STEPWISE_v2_STEP3.normalizedDifference(['B8','B4']);
  var aNDWI = STEPWISE_v2_STEP3.normalizedDifference(['B8','B11']);
  var aNBR = STEPWISE_v2_STEP3.normalizedDifference(['B8','B12']);
  // Return the masked and scaled data.
  var output = STEPWISE_v2_STEP3.select(outputBands)
                                .addBands(STEPWISE_v2_STEP5.select([0], ['STEPWISEcloudmask']))
                                .addBands(aNDVI.select([0], ['ndvi']))
                                .addBands(aNDWI.select([0], ['ndwi']))
                                .addBands(aNBR.select([0], ['nbr']));
return output;
}
// Sentinel-2 image data draw to MAP.
// init map layer condition.
var leftInfo = ui.Panel();
var rightInfo = ui.Panel();
var comparisonSentinel2 = function() { // Draw LANDSAT Data to MAP
  // param data get from UI
  var point = leftMap.getCenter();
  //print(point);
  //var xyJ = point.coordinates();
  //var xcooodinate = ee.Number(xyJ.get(0))
  //var ycooodinate = ee.Number(xyJ.get(1))
  //  left side
  //var lefLandsat = filterSentinel2Type1.TARGET_SENTINEL2.getValue();
  var leftStartTime = filterTime1.START_DATE.getValue();
  var leftEndTime = filterTime1.END_DATE.getValue();
  // right side
  //var rightLandsat = filterSentinel2Type2.TARGET_SENTINEL2.getValue();
  var rightStartTime = filterTime2.START_DATE.getValue();
  var rightEndTime = filterTime2.END_DATE.getValue();
  /***
  var makeRectangle = function(x, y, xDistance, yDistance, proj){
                        var geometry =
                        ee.Geometry.Rectangle(
                        [point[0] - xDistance,
                         point[1] - yDistance,
                         point[0] + xDistance,
                         point[1] + yDistance], proj, false);
                        return geometry
                     }
  ***/
  // Define a function that will make a rectangle from a center point
  // based on x and y extension distance and projection parameters.
  function makeRectangle(point, xRadius, yRadius, proj) {
                     //var pointMeters = point.transform(proj, 0.001);
                     var coords = point.coordinates();
                     var minX = ee.Number(coords.get(0)).subtract(xRadius);
                     var minY = ee.Number(coords.get(1)).subtract(yRadius);
                     var maxX = ee.Number(coords.get(0)).add(xRadius);
                     var maxY = ee.Number(coords.get(1)).add(yRadius);
                     var rect = ee.Geometry.Rectangle([minX, minY, maxX, maxY], proj, false);
                     return rect;
                   }
  //print(point)
  var xDistance = 0.3;
  var yDistance = 0.3;
  var rectangle = makeRectangle(point, xDistance, yDistance,'EPSG:4326')
  print(rectangle);
  leftMap.centerObject(point,10) // 2022-07-04
  //leftMap.setCenter(Map.getCenter())
  //rightMap.setCenter(Map.getCenter())
  // Target data information.
  leftMap.remove(leftInfo);
  leftInfo = ui.Panel({
    // Change word from "REFERENCE" to "BEFORE" on 2021.01.04
    widgets:[ui.Label(leftStartTime+' to '+ leftEndTime,{fontSize:'24px',margin:'0px'})],
    layout:'flow',
    style:{textAlign:'left',position:'bottom-left',border:'5px solid black',margin:'0px'}
  })
  leftMap.add(leftInfo);
  rightMap.remove(rightInfo);
  rightInfo = ui.Panel({
    // Change word from "TARGET" to "AFTER" on 2021.01.04
    widgets:[ui.Label(rightStartTime +' to '+ rightEndTime,{fontSize:'24px',margin:'0px'})],
    layout:'flow',
    style:{textAlign:'right',position:'bottom-right',border:'5px solid black',margin:'0px'}
  });
  rightMap.add(rightInfo);
  // Draw left map 2022/07/01
/***
  switch(lefLandsat) {
    case 'LANDSAT1':
      initial_startDate = ee.Date('1972-07-26');
      initial_endDate = ee.Date('1978-01-06');
      filterTime2.START_DATE.setValue(initial_startDate.format('yyyy-MM-dd').getInfo());
      filterTime2.END_DATE.setValue(initial_endDate.format('yyyy-MM-dd').getInfo());
    break;
    case 'LANDSAT2':
      initial_startDate = ee.Date('1975-01-31');
      initial_endDate = ee.Date('1982-02-03');
      filterTime2.START_DATE.setValue(initial_startDate.format('yyyy-MM-dd').getInfo());
      filterTime2.END_DATE.setValue(initial_endDate.format('yyyy-MM-dd').getInfo());
    break;
    case 'LANDSAT3':
      initial_startDate = ee.Date('1978-06-03');
      initial_endDate = ee.Date('1983-02-23');
      filterTime2.START_DATE.setValue(initial_startDate.format('yyyy-MM-dd').getInfo());
      filterTime2.END_DATE.setValue(initial_endDate.format('yyyy-MM-dd').getInfo());
    break;
    case 'LANDSAT4':
      var dataset1 = ee.ImageCollection('LANDSAT/LT04/C02/T1_L2').filterDate(leftStartTime, leftEndTime).filterBounds(point);
      dataset1 = dataset1.map(prepSrL8).median();
      var visualization = {
                           bands: ['SR_B3', 'SR_B2', 'SR_B1'],
                           min: 0.0,
                           max: 0.3,
                         };
    break;
    case 'LANDSAT5':
      var dataset1 = ee.ImageCollection('LANDSAT/LT05/C02/T1_L2').filterDate(leftStartTime, leftEndTime).filterBounds(point);
      dataset1 = dataset1.map(prepSrL8).median();
      var visualization = {
                            bands: ['SR_B3', 'SR_B2', 'SR_B1'],
                            min: 0.0,
                            max: 0.3,
                          };
    break;
    case 'LANDSAT7':
      var dataset1 = ee.ImageCollection('LANDSAT/LE07/C02/T1_L2').filterDate(leftStartTime, leftEndTime).filterBounds(point);
      dataset1 = dataset1.map(prepSrL8).median();
      var visualization = {
                            bands: ['SR_B3', 'SR_B2', 'SR_B1'],
                            min: 0.0,
                            max: 0.3,
                          };
    break;
    case 'LANDSAT8':
      var dataset1 = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2').filterDate(leftStartTime, leftEndTime).filterBounds(point);
      dataset1 = dataset1.map(prepSrL8).median();
      var visualization = {
                           bands: ['SR_B4', 'SR_B3', 'SR_B2'],
                           min: 0.0,
                           max: 0.3,
                          };
    break;
    case 'LANDSAT9':
      var dataset1 = ee.ImageCollection('LANDSAT/LC09/C02/T1_L2').filterDate(leftStartTime, leftEndTime).filterBounds(point);
      dataset1 = dataset1.map(prepSrL8).median();
      var visualization = {
                       bands: ['SR_B4', 'SR_B3', 'SR_B2'],
                       min: 0.0,
                       max: 0.3,
                      };
    break;
  }
****/
  print(leftStartTime);
  print(leftEndTime);
  var dataset1 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED').filterDate(leftStartTime, leftEndTime).filterBounds(rectangle);
  dataset1 = dataset1.map(getSTEPWISE_v2).median();
  print(dataset1);
  var visualization = {
                   bands: ['B4', 'B3', 'B2'],
                   min: 0.0,
                   max: 3000.0,
                  };
  leftMap.addLayer(dataset1, visualization, 'Sentinel-2 Preor', true);
  // Draw right map 2022/07/01
/****
  switch(rightLandsat) {
    case 'LANDSAT1':
      initial_startDate = ee.Date('1972-07-26');
      initial_endDate = ee.Date('1978-01-06');
      filterTime2.START_DATE.setValue(initial_startDate.format('yyyy-MM-dd').getInfo());
      filterTime2.END_DATE.setValue(initial_endDate.format('yyyy-MM-dd').getInfo());
    break;
    case 'LANDSAT2':
      initial_startDate = ee.Date('1975-01-31');
      initial_endDate = ee.Date('1982-02-03');
      filterTime2.START_DATE.setValue(initial_startDate.format('yyyy-MM-dd').getInfo());
      filterTime2.END_DATE.setValue(initial_endDate.format('yyyy-MM-dd').getInfo());
    break;
    case 'LANDSAT3':
      initial_startDate = ee.Date('1978-06-03');
      initial_endDate = ee.Date('1983-02-23');
      filterTime2.START_DATE.setValue(initial_startDate.format('yyyy-MM-dd').getInfo());
      filterTime2.END_DATE.setValue(initial_endDate.format('yyyy-MM-dd').getInfo());
    break;
    case 'LANDSAT4':
      var dataset2 = ee.ImageCollection('LANDSAT/LT04/C02/T1_L2').filterDate(rightStartTime, rightEndTime).filterBounds(point);
      dataset2 = dataset2.map(prepSrL8).median();
      var visualization = {
                           bands: ['SR_B3', 'SR_B2', 'SR_B1'],
                           min: 0.0,
                           max: 0.3,
                         };
      break;
    case 'LANDSAT5':
      var dataset2 = ee.ImageCollection('LANDSAT/LT05/C02/T1_L2').filterDate(rightStartTime, rightEndTime).filterBounds(point);
      dataset2 = dataset2.map(prepSrL8).median();
      var visualization = {
                            bands: ['SR_B3', 'SR_B2', 'SR_B1'],
                            min: 0.0,
                            max: 0.3,
                          };
      break;
    case 'LANDSAT7':
      var dataset2 = ee.ImageCollection('LANDSAT/LE07/C02/T1_L2').filterDate(rightStartTime, rightEndTime).filterBounds(point);
      dataset2 = dataset2.map(prepSrL8).median();
      var visualization = {
                           bands: ['SR_B4', 'SR_B3', 'SR_B2'],
                           min: 0.0,
                           max: 0.3,
                          };
    break;
    case 'LANDSAT8':
      var dataset2 = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2').filterDate(rightStartTime, rightEndTime).filterBounds(point);
      dataset2 = dataset2.map(prepSrL8).median();
      var visualization = {
                         bands: ['SR_B4', 'SR_B3', 'SR_B2'],
                         min: 0.0,
                         max: 0.3,
                        };
    break;
    case 'LANDSAT9':
      var dataset2 = ee.ImageCollection('LANDSAT/LC09/C02/T1_L2').filterDate(rightStartTime, rightEndTime).filterBounds(point);
      dataset2 = dataset2.map(prepSrL8).median();
      var visualization = {
                         bands: ['SR_B4', 'SR_B3', 'SR_B2'],
                         min: 0.0,
                         max: 0.3,
                        };
    break;
  }
****/
  var dataset2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED').filterDate(rightStartTime, rightEndTime).filterBounds(rectangle);
  dataset2 = dataset2.map(getSTEPWISE_v2).median();
  print(dataset2);
  var visualization2 = {
                   bands: ['B4', 'B3', 'B2'],
                   min: 0.0,
                   max: 3000.0,
                  };
  rightMap.addLayer(dataset2, visualization2, 'Sentinel-2 after', true);
  //ui.root.widgets().insert(0,mainPanel);
}
// Function for Apply button.
var getOutput = function () {
  // Remove input commands panel.
  //ui.root.remove(mainPanel);
  // Call functions.
  //var point2 = Map.getCenter();
  //print(point2);
  comparisonSentinel2();
};
//+++++++++++ Main Panel ++++++++++++++++++++/
// Configure UI controls for Sentinel-2 processing.
// Add time filter .
var initial_startDate = ee.Date('2017-03-27');
var initial_endDate = ee.Date('2017-12-31');
Map.setControlVisibility({fullscreenControl:true});
// Add a title and some explanatory text to the main panel.
var header = ui.Label({
                     value: 'Comparison of 2 periods Sentinel-2 data',
                     style: {fontWeight: 'bold', fontSize: '16px', margin: '10px 8px'}});
var version = ui.Label({
                     value: ' version ('+lastEdit+')',
                     style: {fontSize:'12px',color:'Red',margin:'0px 8px'}});
var mainPanel = ui.Panel([header, version], 'flow', {width:'350',padding:'8px',border:'5px solid black'});
ui.root.widgets().insert(0,mainPanel);
/***
// Legend LANDSAT data
var landsat_legend_panel = ui.Panel({
     widgets: [
      ui.Label({value : 'LANDSAT SERIES START DATE END DATE',
               style : {fontWeight: 'bold', fontSize:'14px',color:'Blue',margin:'0px 8px'}
               }),
      //ui.Label({value : 'LANDSAT 1　　　1972-07-26 1978-01-06',
      //         style : {fontWeight: 'bold', fontSize:'14px',color:'Black',margin:'0px 8px'}
      //         }),
      //ui.Label({value : 'LANDSAT 2　　　1975-01-31 1982-02-03',
      //         style : {fontWeight: 'bold', fontSize:'14px',color:'Black',margin:'0px 8px'}
      //         }),
      //ui.Label({value : 'LANDSAT 3　　　1978-06-03 1983-02-23',
      //         style : {fontWeight: 'bold', fontSize:'14px',color:'Black',margin:'0px 8px'}
      //         }),
      ui.Label({value : 'LANDSAT 4　　　1982-08-22 1993-06-24',
               style : {fontWeight: 'bold', fontSize:'14px',color:'Black',margin:'0px 8px'}
               }),
      ui.Label({value : 'LANDSAT 5　　　1984-03-16 2012-05-05',
               style : {fontWeight: 'bold', fontSize:'14px',color:'Black',margin:'0px 8px'}
               }),
      ui.Label({value : 'LANDSAT 7　　　1999-05-28 2022-04-06',
               style : {fontWeight: 'bold', fontSize:'14px',color:'Black',margin:'0px 8px'}
               }),
      ui.Label({value : 'LANDSAT 8　　　2013-03-18 Present',
               style : {fontWeight: 'bold', fontSize:'14px',color:'Black',margin:'0px 8px'}
               }),
      ui.Label({value : 'LANDSAT 9　　　2021-10-31 Present',
               style : {fontWeight: 'bold', fontSize:'14px',color:'Black',margin:'0px 8px'}
               }),
     ]
});
landsat_legend_panel.style().set({border: '5px solid darkgray'});
mainPanel.add(landsat_legend_panel);
****/
// Select LANDSAT type
// Add target area filter.
//var targetLANDSAT_list = ['LANDSAT9', 'LANDSAT8', 'LANDSAT7', 'LANDSAT5', 'LANDSAT4', 'LANDSAT3', 'LANDSAT2', 'LANDSAT1'];
//var targetLANDSAT_list1 = ['LANDSAT4', 'LANDSAT5', 'LANDSAT7', 'LANDSAT8', 'LANDSAT9'];
//var targetLANDSAT_list2 = ['LANDSAT9', 'LANDSAT8', 'LANDSAT7', 'LANDSAT5', 'LANDSAT4'];
/***
var filterLandsatType1 = {
    TARGET_LANDSAT: ui.Select({
      items: targetLANDSAT_list1,
      placeholder:  'Select LANDSAT...',
      onChange: function(value) { // SET date term
        switch(value) {
          case 'LANDSAT1':
            initial_startDate = ee.Date('1972-07-26');
            initial_endDate = ee.Date('1978-01-06');
            filterTime1.START_DATE.setValue(initial_startDate.format('yyyy-MM-dd').getInfo());
            filterTime1.END_DATE.setValue(initial_endDate.format('yyyy-MM-dd').getInfo());
          break;
          case 'LANDSAT2':
            initial_startDate = ee.Date('1975-01-31');
            initial_endDate = ee.Date('1982-02-03');
            filterTime1.START_DATE.setValue(initial_startDate.format('yyyy-MM-dd').getInfo());
            filterTime1.END_DATE.setValue(initial_endDate.format('yyyy-MM-dd').getInfo());
          break;
          case 'LANDSAT3':
            initial_startDate = ee.Date('1978-06-03');
            initial_endDate = ee.Date('1983-02-23');
            filterTime1.START_DATE.setValue(initial_startDate.format('yyyy-MM-dd').getInfo());
            filterTime1.END_DATE.setValue(initial_endDate.format('yyyy-MM-dd').getInfo());
          break;
          case 'LANDSAT4':
            initial_startDate = ee.Date('1982-08-22');
            initial_endDate = ee.Date('1993-06-24');
            filterTime1.START_DATE.setValue(initial_startDate.format('yyyy-MM-dd').getInfo());
            filterTime1.END_DATE.setValue(initial_endDate.format('yyyy-MM-dd').getInfo());
          break;
          case 'LANDSAT5':
            initial_startDate = ee.Date('1984-03-16');
            initial_endDate = ee.Date('2012-05-05');
            filterTime1.START_DATE.setValue(initial_startDate.format('yyyy-MM-dd').getInfo());
            filterTime1.END_DATE.setValue(initial_endDate.format('yyyy-MM-dd').getInfo());
          break;
          case 'LANDSAT7':
            initial_startDate = ee.Date('1999-05-28');
            initial_endDate = ee.Date('2022-04-06');
            filterTime1.START_DATE.setValue(initial_startDate.format('yyyy-MM-dd').getInfo());
            filterTime1.END_DATE.setValue(initial_endDate.format('yyyy-MM-dd').getInfo());
          break;
          case 'LANDSAT8':
            initial_startDate = ee.Date('2013-03-18');
            initial_endDate = ee.Date('2022-04-06');
            filterTime1.START_DATE.setValue(initial_startDate.format('yyyy-MM-dd').getInfo());
            filterTime1.END_DATE.setValue(ee.Date(Date.now()).format('yyyy-MM-dd').getInfo());
          break;
          case 'LANDSAT9':
            initial_startDate = ee.Date('2021-10-31');
            initial_endDate = ee.Date('2022-04-06');
            filterTime1.START_DATE.setValue(initial_startDate.format('yyyy-MM-dd').getInfo());
            filterTime1.END_DATE.setValue(ee.Date(Date.now()).format('yyyy-MM-dd').getInfo());
          break;
        }
      }
    })
  };
  var filterTargetLANDSAT_panel1 = ui.Panel({
      widgets: [
        ui.Label('① Select a first LANDSAT', {fontWeight: 'bold'}),
        ui.Panel([
          ui.Label('LANDSAT Type:'), filterLandsatType1.TARGET_LANDSAT
        ], ui.Panel.Layout.flow('horizontal')),
      ]
    });
  mainPanel.add(filterTargetLANDSAT_panel1);
****/
var text = ui.Label('Fill in Target Term Start and End.' ,{fontWeight: 'bold',color:'Gray'});
// STRAT and END
var filterTime1 = {
     START_DATE: ui.Textbox({
       placeholder: 'YYYY-MM-DD',
       value: initial_startDate.format('yyyy-MM-dd').getInfo(),
       style: {width:'90px',margin:'0px'}
     }),
     END_DATE: ui.Textbox({
       placeholder: 'YYYY-MM-DD',
       value: initial_endDate.format('yyyy-MM-dd').getInfo(),
       style: {width:'90px',margin:'0px'}
     }),
   };
initial_startDate = ee.Date('2017-03-28');
initial_endDate = ee.Date('2017-12-31');
filterTime1.START_DATE.setValue(initial_startDate.format('yyyy-MM-dd').getInfo());
filterTime1.END_DATE.setValue(initial_endDate.format('yyyy-MM-dd').getInfo());
var filterTime_panel1 = ui.Panel({
     widgets: [
       ui.Label('① Enter Start and End Date', {fontWeight: 'bold'}),
       ui.Panel([
         ui.Label('Start date :'), filterTime1.START_DATE
       ], ui.Panel.Layout.flow('horizontal')),
       ui.Panel([
         ui.Label('End date  :'), filterTime1.END_DATE
       ], ui.Panel.Layout.flow('horizontal')),]});
mainPanel.add(filterTime_panel1);
var separator = ui.Label('++++++++++++++++++++++++++++++++++++++' ,{fontWeight: 'bold',color:'Gray'});
mainPanel.add(separator);
/***
var filterLandsatType2 = {
    TARGET_LANDSAT: ui.Select({
      items: targetLANDSAT_list2,
      placeholder:  'Select LANDSAT...',
      onChange: function(value) { // SET date term
        switch(value) {
          case 'LANDSAT1':
            initial_startDate = ee.Date('1972-07-26');
            initial_endDate = ee.Date('1978-01-06');
            filterTime2.START_DATE.setValue(initial_startDate.format('yyyy-MM-dd').getInfo());
            filterTime2.END_DATE.setValue(initial_endDate.format('yyyy-MM-dd').getInfo());
          break;
          case 'LANDSAT2':
            initial_startDate = ee.Date('1975-01-31');
            initial_endDate = ee.Date('1982-02-03');
            filterTime2.START_DATE.setValue(initial_startDate.format('yyyy-MM-dd').getInfo());
            filterTime2.END_DATE.setValue(initial_endDate.format('yyyy-MM-dd').getInfo());
          break;
          case 'LANDSAT3':
            initial_startDate = ee.Date('1978-06-03');
            initial_endDate = ee.Date('1983-02-23');
            filterTime2.START_DATE.setValue(initial_startDate.format('yyyy-MM-dd').getInfo());
            filterTime2.END_DATE.setValue(initial_endDate.format('yyyy-MM-dd').getInfo());
          break;
          case 'LANDSAT4':
            initial_startDate = ee.Date('1982-08-22');
            initial_endDate = ee.Date('1933-06-24');
            filterTime2.START_DATE.setValue(initial_startDate.format('yyyy-MM-dd').getInfo());
            filterTime2.END_DATE.setValue(initial_endDate.format('yyyy-MM-dd').getInfo());
          break;
          case 'LANDSAT5':
            initial_startDate = ee.Date('1984-03-16');
            initial_endDate = ee.Date('2012-05-05');
            filterTime2.START_DATE.setValue(initial_startDate.format('yyyy-MM-dd').getInfo());
            filterTime2.END_DATE.setValue(initial_endDate.format('yyyy-MM-dd').getInfo());
          break;
          case 'LANDSAT7':
            initial_startDate = ee.Date('1999-05-28');
            initial_endDate = ee.Date('2022-04-06');
            filterTime2.START_DATE.setValue(initial_startDate.format('yyyy-MM-dd').getInfo());
            filterTime2.END_DATE.setValue(initial_endDate.format('yyyy-MM-dd').getInfo());
          break;
          case 'LANDSAT8':
            initial_startDate = ee.Date('2013-03-18');
            initial_endDate = ee.Date('2022-04-06');
            filterTime2.START_DATE.setValue(initial_startDate.format('yyyy-MM-dd').getInfo());
            filterTime2.END_DATE.setValue(ee.Date(Date.now()).format('yyyy-MM-dd').getInfo());
          break;
          case 'LANDSAT9':
            initial_startDate = ee.Date('2021-10-31');
            initial_endDate = ee.Date('2022-04-06');
            filterTime2.START_DATE.setValue(initial_startDate.format('yyyy-MM-dd').getInfo());
            filterTime2.END_DATE.setValue(ee.Date(Date.now()).format('yyyy-MM-dd').getInfo());
          break;
        }
      }
    })
  };
  var filterTargetLANDSAT_panel2 = ui.Panel({
      widgets: [
        ui.Label('③ Select a second LANDSAT', {fontWeight: 'bold'}),
        ui.Panel([
          ui.Label('LANDSAT Type:'), filterLandsatType2.TARGET_LANDSAT
        ], ui.Panel.Layout.flow('horizontal')),
      ]
    });
  mainPanel.add(filterTargetLANDSAT_panel2);
var text = ui.Label('Fill in Target Term Start and End.' ,{fontWeight: 'bold',color:'Gray'});
****/
// Add time filter .
//var initial_startDate = ee.Date('2019-01-01');
//var initial_endDate = ee.Date('2019-12-31');
// STRAT and END
var filterTime2 = {
     START_DATE: ui.Textbox({
       placeholder: 'YYYY-MM-DD',
       value: initial_startDate.format('yyyy-MM-dd').getInfo(),
       style: {width:'90px',margin:'0px'}
     }),
     END_DATE: ui.Textbox({
       placeholder: 'YYYY-MM-DD',
       value: initial_endDate.format('yyyy-MM-dd').getInfo(),
       style: {width:'90px',margin:'0px'}
     }),
   };
initial_startDate = ee.Date(Date.now());
initial_endDate = ee.Date(Date.now());
filterTime2.START_DATE.setValue(initial_startDate.format('yyyy-MM-dd').getInfo());
filterTime2.END_DATE.setValue(ee.Date(Date.now()).format('yyyy-MM-dd').getInfo());
var filterTime_panel2 = ui.Panel({
     widgets: [
       ui.Label('② Enter Start and End Date', {fontWeight: 'bold'}),
       ui.Panel([
         ui.Label('Start date:'), filterTime2.START_DATE
       ], ui.Panel.Layout.flow('horizontal')),
       ui.Panel([
         ui.Label('End date  :'), filterTime2.END_DATE
       ], ui.Panel.Layout.flow('horizontal')),]});
mainPanel.add(filterTime_panel2);
/********** SECTION D : Apply button configuration. **********/
// Add apply button.
var applyButton = {
    clickRun: ui.Button({
      label: 'Apply',
      style: {border: '1px solid black',
              height: '30px',
              width: '100px',
      },
      onClick: getOutput,
  }),
};
var applyButton_panel = ui.Panel({
    widgets:[
      ui.Panel([
        ui.Label(' Click "Apply" button to run the system', {fontWeight: 'bold'}),
        applyButton.clickRun,
      ]),
    ]
  });
mainPanel.add(applyButton_panel);