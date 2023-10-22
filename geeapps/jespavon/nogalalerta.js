var imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "NDVI"
        ],
        "min": 0.11652591745283125,
        "max": 0.7085475307144886,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["NDVI"],"min":0.11652591745283125,"max":0.7085475307144886,"gamma":1},
    imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "NDVI"
        ],
        "min": 0.08234947373738705,
        "max": 0.6163983040159999,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["NDVI"],"min":0.08234947373738705,"max":0.6163983040159999,"gamma":1},
    ROI = ui.import && ui.import("ROI", "table", {
      "id": "users/jespavon/nogal"
    }) || ee.FeatureCollection("users/jespavon/nogal");
Map.centerObject(ROI,13)
//Map.addLayer(image);
//var roi = image.clip(ROI)
//Map.addLayer(ROI)
/*
var radar = ee.ImageCollection('COPERNICUS/S1_GRD_FLOAT')
  .filterDate('2018-06-01', '2018-09-01') /// testing low interval
  .filter(ee.Filter.eq('instrumentMode','IW')) //SELECTION MODE ADQUISATION
  .filter(ee.Filter.eq('orbitProperties_pass','DESCENDING')) //SELECTION DE ORBIT
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
  .filterBounds(ROI)
// Create a funtion to clip each image to the feature collection
var clipFeature = function(image) {
  return image.clip(ROI);
};
var radarclip= radar.map(clipFeature);
// This field contains UNIX time in milliseconds.
var timeField = 'system:time_start';
// Function to perform angle correction
var toGamma0 = function (image) {
var vh = image.select('VH').subtract(image.select('angle')
.multiply(Math.PI/180.0).cos().log10().multiply(10.0));
image = image.addBands(vh.rename('VH_gamma'));
var vv = image.select('VV').subtract(image.select('angle')
.multiply(Math.PI/180.0).cos().log10().multiply(10.0));
image = image.addBands(vv.rename('VV_gamma'));
return image;
};
// Apply gamma correction
var radarclip = radarclip.map(toGamma0);
// define function to calculate a spectral index to segment with LT
var segIndex = function(img) {
    var index = img.expression(
  '(VV-VH) / (VV+VH)',
  {
    VH: ee.Image(10.0).pow(img.select('VH_gamma').divide(10.0)),
    VV: ee.Image(10.0).pow(img.select('VV_gamma').divide(10.0))
  })                     
                .set('system:time_start', img.get('system:time_start')); // ...set the output system:time_start metadata to the input image time_start otherwise it is null
  img = img.addBands(index.rename('RGI'));                                    // ...name the band
  return img;
};
// Apply RGI
var radarclip = radarclip.map(segIndex);
print(radarclip);
// Function to create boxcar 3 x 3 pixel filter
var boxcar = ee.Kernel.square(
  {
radius: 3, units: 'pixels', normalize: true
});
// Function to apply boxcar filter
var fltr = function(image) 
{
return image.convolve(boxcar);
};
var radarclip = radarclip.map(fltr).select("RGI");  // to exclude/include boxcar filter
print(radarclip);
//SELECTION OF ONE IMAGEN RGI
function getImageByIndex(radarclip, index) {
  return ee.Image(radarclip.toList(1, index).get(0))
}
var RGI_TEST = getImageByIndex(radarclip,1);
//Map.addLayer(RGI_TEST,'RGI');
//var reducer1 = radarclip.reduce(ee.Reducer.sampleVariance());
var visParams2 = {min:-1,max:1,
  palette:['#d73027','#fc8d59','#fee08b','#ffffbf','#d9ef8b','#91cf60','#1a9850']};
var skewness = radarclip.reduce(ee.Reducer.skew()); // green high dist/white no-dist/red regrowth
Map.addLayer(skewness,visParams2,"Skewness");
//Map.addLayer(reducer1,"reducer1")
Map.centerObject(ROI,13);
*/
/*
// Load the Sentinel-1 ImageCollection
var s1 =  ee.ImageCollection('COPERNICUS/S1_GRD_FLOAT')
.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
.filter(ee.Filter.eq('instrumentMode', 'IW'))
//.filterDate('2018-05-01', '2018-06-30')
//.filterDate('2015-01-01', '2018-07-31')
.filterDate('2018-06-01', '2018-09-1')
.filterBounds(ROI)
.select(["VV"]);
Map.centerObject(ROI,13);
Map.addLayer(ROI,{color: 'pink'}, 'ROI');
//Map.setCenter(9.2171, 45.1807);
//My thresholds
var min_inf = -25;
var min_sup = -15;
var max_inf = -10;
var max_sup = -2;
var minimum = s1.reduce(ee.Reducer.min()).select('VV_min'); 
var maximum = s1.reduce(ee.Reducer.max()).select('VV_max');
print(maximum)
//var s1_maxmonth = s1.map(function(img) { 
//  return img.select('VV').eq(0).toInt().multiply(img.select('month'))})
var s1_maxmonth = s1.map(function(img) { 
  return img.select('VV').updateMask(img.select('VV').
    eq(maximum)).divide(maximum).multiply(img.date().get('month'))
})
print(s1_maxmonth)
var s1_maxmonthroi=s1_maxmonth.sum()
var clip_s1 = s1_maxmonthroi.clip(ROI)
var clip1 = s1_maxmonthroi.clip()
Map.addLayer(clip_s1, {}, 'max month');
// remove the mountains from the data
var hydrosheds = ee.Image('WWF/HydroSHEDS/03VFDEM');
var terrain = ee.Algorithms.Terrain(hydrosheds);
var slope = terrain.select('slope');
// create mask with paddy fields: returns 1 iff min_inf<minimum<min_sup and max_inf<maximum<max_sup
var paddies = minimum.gte(min_inf).and(minimum.lte(min_sup)).and(maximum.gte(max_inf).and(maximum.lte(max_sup)));
// remove all slopes greater than 3 degrees
var paddies = paddies.updateMask(slope.lt(3)).clip(ROI);
Map.addLayer(paddies.updateMask(paddies), {palette:"0000FF"},'Junly 2018-Changes- color', 1);
*/
// THE MULTISPECTRAL
var start_date = ee.Date.fromYMD(2019,7,15);
var end_date = ee.Date.fromYMD(2019,8,05);
var Sentinel2 = (ee.ImageCollection('COPERNICUS/S2')
                .filterBounds(ROI)
                .filterDate(ee.Date(start_date),ee.Date(end_date))
                .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20)));
// NOT PUT MASK CLOUDS STANDAR BUT CALCULE NDVI
// This function adds a band representing the image timestamp.
var computeNDVI = function(image) {
  return image.normalizedDifference(['B8', 'B4']).rename('NDVI')
    .set({'system:time_start': image.get('system:time_start')})
};
var inputs = Sentinel2.map(computeNDVI)
//print (inputs)
var inputs2 = inputs.select('NDVI')
//print('NDVI',inputs2)
//var median = inputs.reduce(ee.Reducer.median());
//var clip = median.clip(ROI)
//Map.addLayer(median,{},'median')
function getImageByIndex(inputs2, index) {
  return ee.Image(inputs2.toList(1, index).get(0))
}
var before = getImageByIndex(inputs2,0);
var after = getImageByIndex(inputs2,2);
var before_clip = before.clip(ROI)
Map.addLayer(before_clip,imageVisParam,'before')
var after_clip = after.clip(ROI)
Map.addLayer(after_clip,imageVisParam2,'after')
/////////////////////////////////////////////////////////////////////
////////////////////////////////////// The second objetive in the radar 
//////////////////////////////////////////////////////////////////////////////
// The different change
// set date window
var bef = before_clip
var aft = after_clip
//Map.addLayer(bef);
//Map.addLayer(aft);
var p90bf = bef.reduce(ee.Reducer.percentile([90]));
var p50bf = bef.reduce(ee.Reducer.percentile([50])); 
var p10bf = bef.reduce(ee.Reducer.percentile([10]));
var p90at = aft.reduce(ee.Reducer.percentile([90]));
var p50at = aft.reduce(ee.Reducer.percentile([50])); 
var p10at = aft.reduce(ee.Reducer.percentile([10]));
var imgbf = p90bf.addBands(p50bf).addBands(p10bf);
var imgat = p90at.addBands(p50at).addBands(p10at);
var imgbf_clip = imgbf.clip(ROI)
var imgat_clip = imgat.clip(ROI)
//Map.addLayer(imgbf_clip, {min: 1.014714247850709, max: 1.0870637939101968,bands: ['p10', 'p50', 'p10']}, 'Before',1);
//Map.addLayer(imgat_clip, {min: 1.0202118818803803, max: 1.0735631126917233, bands: ['p10', 'p50', 'p10']}, 'After',1);
//var diff = p90at.subtract(p90bf)
var diff = p90bf.subtract(p90at)
var radius = 2;
var thres = -0.19;
var diff_sm = diff.focal_median(radius, 'circle', 'meters')
.subtract(p90at.focal_median(radius, 'circle', 'meters'));
var diff_th = diff_sm.lt(thres);
//var clip_diff = diff_th.clip(ROI)
var change = diff_th.updateMask(diff_th.neq(1));
//var clip_change = change.clip(ROI)
//Map.addLayer(diff_th, {min: -1, max: 1}, 'Diff',0)
Map.addLayer(change, {palette: 'FFF000'}, 'Changed')