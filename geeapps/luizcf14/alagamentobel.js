var geometry = /* color: #d63000 */ee.Geometry({
      "type": "GeometryCollection",
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            103.23577880859375,
            0.22247258550188925
          ]
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -48.521624835592434,
                -1.404160647828953
              ],
              [
                -48.53192451820962,
                -1.5249707559842511
              ],
              [
                -48.321810992818996,
                -1.523597950921011
              ],
              [
                -48.30945137367837,
                -1.264809450163044
              ],
              [
                -48.51544502602212,
                -1.2668688839758548
              ]
            ]
          ],
          "geodesic": true,
          "evenOdd": true
        }
      ],
      "coordinates": []
    }),
    dem = ee.Image("JAXA/ALOS/AW3D30_V1_1"),
    imageVisParam = {"opacity":1,"bands":["swir1","nir","red"],"min":0.015599999576807022,"max":0.398499995470047,"gamma":1},
    geometry2 = /* color: #d63000 */ee.Geometry.Polygon(
        [[[-48.49056615334234, -1.313205403058638],
          [-48.48438634377203, -1.350960699128459],
          [-48.48369969826422, -1.3708678018582126],
          [-48.48590982853341, -1.3756943878066603],
          [-48.48811996519487, -1.3777751805529996],
          [-48.49082363231787, -1.3802206463914257],
          [-48.49314107399664, -1.3840819081081766],
          [-48.49417104225836, -1.3942069527187992],
          [-48.49537267189703, -1.4096518520373134],
          [-48.49468602638922, -1.4271559473512874],
          [-48.49502934224125, -1.4316177437111313],
          [-48.49605930627371, -1.4360795398654602],
          [-48.49777592162843, -1.4417425835094264],
          [-48.50086583595953, -1.4460327635276804],
          [-48.503011590736946, -1.4492932832055858],
          [-48.50756061493905, -1.4528970108502115],
          [-48.50910558205328, -1.4621637366658151],
          [-48.50429906349859, -1.4827562997098165],
          [-48.47271337013922, -1.4820698840134034],
          [-48.42739476662359, -1.4717736230910157],
          [-48.403362173850155, -1.460790892383117],
          [-48.37726964455328, -1.456672354505115],
          [-48.35049046974859, -1.4285288119588495],
          [-48.33813085060797, -1.3804780682220177],
          [-48.34705724220953, -1.3111460067216287],
          [-48.38207616310797, -1.2452444439145556],
          [-48.42121495705328, -1.2301417672178252],
          [-48.46516026955328, -1.2356336595989088],
          [-48.48987950783453, -1.2665253412339865],
          [-48.49331273537359, -1.2891790075771568]]]);
//CloudScore originally written by Matt Hancher and adapted for S2 data by Ian Housman
//////////////////////////////////////////////////////////
//User Params
var startYear = 2016;
var endYear = 2017;
var startJulian = 1;
var endJulian = 365;
var cloudThresh =20;//Ranges from 1-100.Lower value will mask more pixels out. Generally 10-30 works well with 20 being used most commonly 
var cloudHeights = ee.List.sequence(500,10000,500);//Height of clouds to use to project cloud shadows
var irSumThresh =0.35;//Sum of IR bands to include as shadows within TDOM and the shadow shift method (lower number masks out less)
var dilatePixels = 3; //Pixels to dilate around clouds
var contractPixels = 2;//Pixels to reduce cloud mask and dark shadows by to reduce inclusion of single-pixel comission errors
//////////////////////////////////////////////////////////
var vizParams = {'min': 0.05,'max': [0.3,0.6,0.35],   'bands':'swir1,nir,red'};
// var vizParams = {bands: ['red', 'green', 'blue'], min: 0, max: 0.3};
//////////////////////////////////////////////////////////////////////////
var rescale = function(img, exp, thresholds) {
    return img.expression(exp, {img: img})
        .subtract(thresholds[0]).divide(thresholds[1] - thresholds[0]);
  };
////////////////////////////////////////
////////////////////////////////////////
// Cloud masking algorithm for Sentinel2
//Built on ideas from Landsat cloudScore algorithm
//Currently in beta and may need tweaking for individual study areas
function sentinelCloudScore(img) {
  // Compute several indicators of cloudyness and take the minimum of them.
  var score = ee.Image(1);
  var blueCirrusScore = ee.Image(0);
  // Clouds are reasonably bright in the blue or cirrus bands.
  //Use .max as a pseudo OR conditional
  blueCirrusScore = blueCirrusScore.max(rescale(img, 'img.blue', [0.1, 0.5]));
  blueCirrusScore = blueCirrusScore.max(rescale(img, 'img.cb', [0.1, 0.5]));
  blueCirrusScore = blueCirrusScore.max(rescale(img, 'img.cirrus', [0.1, 0.3]));
  // var reSum = rescale(img,'(img.re1+img.re2+img.re3)/3',[0.5, 0.7])
  // Map.addLayer(blueCirrusScore,{'min':0,'max':1})
  score = score.min(blueCirrusScore);
  // Clouds are reasonably bright in all visible bands.
  score = score.min(rescale(img, 'img.red + img.green + img.blue', [0.2, 0.8]));
  // Clouds are reasonably bright in all infrared bands.
  score = score.min(
      rescale(img, 'img.nir + img.swir1 + img.swir2', [0.3, 0.8]));
  // However, clouds are not snow.
  var ndsi =  img.normalizedDifference(['green', 'swir1']);
  score=score.min(rescale(ndsi, 'img', [0.8, 0.6]));
  score = score.multiply(100).byte();
  return img.addBands(score.rename('cloudScore'));
}
//////////////////////////////////////////////////////////////////////////
// Function to mask clouds using the Sentinel-2 QA band.
function maskS2clouds(image) {
  var qa = image.select('QA60').int16();
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = Math.pow(2, 10);
  var cirrusBitMask = Math.pow(2, 11);
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0));
  // Return the masked and scaled data.
  return image.updateMask(mask);
}
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//Function for finding dark outliers in time series
//Masks pixels that are dark, and dark outliers
function simpleTDOM2(c){
  var shadowSumBands = ['nir','swir1'];
  var irSumThresh = 0.4;
  var zShadowThresh = -1.2;
  //Get some pixel-wise stats for the time series
  var irStdDev = c.select(shadowSumBands).reduce(ee.Reducer.stdDev());
  var irMean = c.select(shadowSumBands).mean();
  var bandNames = ee.Image(c.first()).bandNames();
  print('bandNames',bandNames);
  //Mask out dark dark outliers
  c = c.map(function(img){
    var z = img.select(shadowSumBands).subtract(irMean).divide(irStdDev);
    var irSum = img.select(shadowSumBands).reduce(ee.Reducer.sum());
    var m = z.lt(zShadowThresh).reduce(ee.Reducer.sum()).eq(2).and(irSum.lt(irSumThresh)).not();
    return img.updateMask(img.mask().and(m));
  });
  return c.select(bandNames);
}
////////////////////////////////////////////////////////
/////////////////////////////////////////////
/***
 * Implementation of Basic cloud shadow shift
 * 
 * Author: Gennadii Donchyts
 * License: Apache 2.0
 */
function projectShadows(cloudMask,image,cloudHeights,yMult){
  if(yMult === undefined || yMult === null){
    yMult = ee.Algorithms.If(ee.Algorithms.IsEqual(image.select([3]).projection(), ee.Projection("EPSG:4326")),1,-1);
  }
  var meanAzimuth = image.get('MEAN_SOLAR_AZIMUTH_ANGLE');
  var meanZenith = image.get('MEAN_SOLAR_ZENITH_ANGLE');
  ///////////////////////////////////////////////////////
  // print('a',meanAzimuth);
  // print('z',meanZenith)
  //Find dark pixels
  var darkPixels = image.select(['nir','swir1','swir2']).reduce(ee.Reducer.sum()).lt(irSumThresh)
    .focal_min(contractPixels).focal_max(dilatePixels)
  ;//.gte(1);
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
//////////////////////////////////////////////////////
//Function to bust clouds from S2 image
function bustClouds(img){
  img = sentinelCloudScore(img);
  img = img.updateMask(img.select(['cloudScore']).gt(cloudThresh).focal_min(contractPixels).focal_max(dilatePixels).not());
  return img;
}
//////////////////////////////////////////////////////
//Function for wrapping the entire process to be applied across collection
function wrapIt(img){
  img = sentinelCloudScore(img);
  var cloudMask = img.select(['cloudScore']).gt(cloudThresh)
    .focal_min(contractPixels).focal_max(dilatePixels)
  img = projectShadows(cloudMask,img,cloudHeights);
  return img;
}
//////////////////////////////////////////////////////
//Function to find unique values of a field in a collection
function uniqueValues(collection,field){
    var values  =ee.Dictionary(collection.reduceColumns(ee.Reducer.frequencyHistogram(),[field]).get('histogram')).keys();
    return values;
  }
//////////////////////////////////////////////////////
//Function to simplify data into daily mosaics
function dailyMosaics(imgs){
  //Simplify date to exclude time of day
  imgs = imgs.map(function(img){
  var d = ee.Date(img.get('system:time_start'));
  var day = d.get('day');
  var m = d.get('month');
  var y = d.get('year');
  var simpleDate = ee.Date.fromYMD(y,m,day);
  return img.set('simpleTime',simpleDate.millis());
  });
  //Find the unique days
  var days = uniqueValues(imgs,'simpleTime');
  imgs = days.map(function(d){
    d = ee.Number.parse(d);
    d = ee.Date(d);
    var t = imgs.filterDate(d,d.advance(1,'day'));
    var f = ee.Image(t.first());
    t = t.mosaic();
    t = t.set('system:time_start',d.millis());
    t = t.copyProperties(f);
    return t;
    });
    imgs = ee.ImageCollection.fromImages(imgs);
    return imgs;
}
//////////////////////////////////////////////////////
function getS2(geometry){
  //Get some s2 data
  var s2s = ee.ImageCollection('COPERNICUS/S2')
                    .filter(ee.Filter.calendarRange(startYear,endYear,'year'))
                    .filter(ee.Filter.calendarRange(startJulian,endJulian))
                    .filterBounds(geometry)
                    .map(function(img){
                      var t = img.select([ 'B1','B2','B3','B4','B5','B6','B7','B8','B8A', 'B9','B10', 'B11','B12']).divide(10000);//Rescale to 0-1
                      t = t.addBands(img.select(['QA60']));
                      var out = t.copyProperties(img).copyProperties(img,['system:time_start']);
                    return out;
                      })
                      .select(['QA60', 'B1','B2','B3','B4','B5','B6','B7','B8','B8A', 'B9','B10', 'B11','B12'],['QA60','cb', 'blue', 'green', 'red', 're1','re2','re3','nir', 'nir2', 'waterVapor', 'cirrus','swir1', 'swir2']);
  //Convert to daily mosaics to avoid redundent observations in MGRS overlap areas and edge artifacts for shadow masking
  s2s = dailyMosaics(s2s);
return s2s
}
//////////////////////////////////////////////////
//Optional- View S2 daily mosaics
// days.getInfo().map(function(d){
//   var ds = new Date(parseInt(d))
//   d = ee.Date(ee.Number.parse(d))
//   print(ds)
//   var s2sT = ee.Image(s2s.filterDate(d,d.advance(1,'minute')).first());
//   Map.addLayer(s2sT,vizParams,ds,false);
// })
/////////////////////////////////////////////////////
var s2s = getS2(geometry);
// //Look at individual image
// var s2 = ee.Image(s2s.first());
// Map.addLayer(s2,vizParams,'Before Masking',false);
// var yMult = ee.Algorithms.If(ee.Algorithms.IsEqual(s2.select([3]).projection(), ee.Projection("EPSG:4326")),1,-1);
// print(yMult)
// s2 = sentinelCloudScore(s2);
// var cloudScore = s2.select('cloudScore');
// Map.addLayer(cloudScore,{'min':0,'max':100},'CloudScore',false);
// var s2CloudMasked  = bustClouds(s2);
// Map.addLayer(s2CloudMasked,vizParams,'After CloudScore Masking',false);
// var s2CloudShadowMasked = wrapIt(s2);
// Map.addLayer(s2CloudShadowMasked,vizParams,'After CloudScore and Shadow Masking',false);
// var s2MaskedQA = maskS2clouds(s2) ;
// print(s2)
// Map.addLayer(s2MaskedQA,vizParams,'After QA Masking',false);
// var s2TDOMMasked = ee.Image(simpleTDOM2(s2s.map(bustClouds)).first());
// Map.addLayer(s2TDOMMasked,vizParams,'After CloudScore and TDOM Masking',false);
/////////////////////////////////////////////
//Look at mosaics
//Get the raw mosaic and median
//Bust clouds using BQA method 
var s2MaskedQA = s2s.map(maskS2clouds);
//Bust clouds using cloudScore method
var s2sMosaic = s2s.map(bustClouds);
//Bust clouds using cloudScore and shadows using TDOM
var s2TDOM = simpleTDOM2(s2sMosaic);
//Bust clouds using cloudScore and shadows using shadow shift method
var s2sMosaicCloudsProjectedDark = s2s.map(wrapIt)
Map.addLayer(s2sMosaicCloudsProjectedDark.median(), imageVisParam, 'Sentinel 2 ',false);
Map.centerObject(geometry2,11)
var med = dem.select('MED');
Map.addLayer(ee.Image(1).mask(med.lte(4).and(med.gte(2))).clip(geometry2),{palette:['#fffa62']},'Water Level - Sucetibilidade de Alagamento',true)
//Map.addLayer(ee.Image(1).mask(med.lt(2)),{palette:['#fffa62']},'Water Level')