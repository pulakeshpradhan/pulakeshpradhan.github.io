var refpol1y = 
    /* color: #d63000 */
    /* displayProperties: [
      {
        "type": "polygon"
      },
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry({
      "type": "GeometryCollection",
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -87.50975198566789,
                13.927328097689117
              ],
              [
                -87.73547075808244,
                13.22688387165358
              ],
              [
                -86.98329694455896,
                13.055137615758298
              ],
              [
                -86.75084758033131,
                13.776700135773241
              ]
            ]
          ],
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -17.196928765780513,
                22.27517246325608
              ],
              [
                -17.196928765780513,
                20.356270067384607
              ],
              [
                -12.862822320468013,
                20.356270067384607
              ],
              [
                -12.862822320468013,
                22.27517246325608
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "coordinates": []
    }),
    ROI = ee.FeatureCollection("users/jespavon/Par_merged_barba");
Map.centerObject(ROI,13)
//Map.addLayer(image);
//var roi = image.clip(ROI)
Map.addLayer(ROI)
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
/////////////////////////////////////////////////////////////////////
////////////////////////////////////// The second objetive in the radar 
//////////////////////////////////////////////////////////////////////////////
// PARAMETER VISUALICE
var vizPar = {
    falseColour: {
      bands: ['B8', 'B4', 'B3'],
      min: 200,
      max: 3000,
      gamma: 1.5
  },
    naturalColour: {
      bands: ['B4', 'B3', 'B2'],
      min: 350,
      max: 2500,
      gamma: 1.5
  },
    NDVI: {
      bands: ['NDVI'],
      min: -0.9,
      max: 0.9
  },
    S1: {
      bands: ['VV','VH','VV/VH'],
      min: [1.02,1,1.02],
      max: [1.05,1.012,1.04]
    },
    VH: {
      bands: ['VH'],
      min: 0,
      max: 0.06
    }
};
// PRE-PROCESING THE IMAGE ONLY FILTER LEE
// Refined Lee speckle filter for use with S1 data
var RefinedLee = function RefinedLee(img) {
  // img must be in natural units, i.e. not in dB! Convert 
  img = ee.Image(10.0).pow(img.select(0).divide(10.0))
  // Set up 3x3 kernels 
  var weights3 = ee.List.repeat(ee.List.repeat(1,3),3);
  var kernel3 = ee.Kernel.fixed(3,3, weights3, 1, 1, false);
  var mean3 = img.reduceNeighborhood(ee.Reducer.mean(), kernel3);
  var variance3 = img.reduceNeighborhood(ee.Reducer.variance(), kernel3);
  // Use a sample of the 3x3 windows inside a 7x7 windows to determine gradients and directions
  var sample_weights = ee.List([[0,0,0,0,0,0,0], [0,1,0,1,0,1,0],[0,0,0,0,0,0,0], [0,1,0,1,0,1,0], [0,0,0,0,0,0,0], [0,1,0,1,0,1,0],[0,0,0,0,0,0,0]]);
  var sample_kernel = ee.Kernel.fixed(7,7, sample_weights, 3,3, false);
  // Calculate mean and variance for the sampled windows and store as 9 bands
  var sample_mean = mean3.neighborhoodToBands(sample_kernel); 
  var sample_var = variance3.neighborhoodToBands(sample_kernel);
  // Determine the 4 gradients for the sampled windows
  var gradients = sample_mean.select(1).subtract(sample_mean.select(7)).abs();
  gradients = gradients.addBands(sample_mean.select(6).subtract(sample_mean.select(2)).abs());
  gradients = gradients.addBands(sample_mean.select(3).subtract(sample_mean.select(5)).abs());
  gradients = gradients.addBands(sample_mean.select(0).subtract(sample_mean.select(8)).abs());
  // And find the maximum gradient amongst gradient bands
  var max_gradient = gradients.reduce(ee.Reducer.max());
  // Create a mask for band pixels that are the maximum gradient
  var gradmask = gradients.eq(max_gradient);
  // duplicate gradmask bands: each gradient represents 2 directions
  gradmask = gradmask.addBands(gradmask);
  // Determine the 8 directions
  var directions = sample_mean.select(1).subtract(sample_mean.select(4)).gt(sample_mean.select(4).subtract(sample_mean.select(7))).multiply(1);
  directions = directions.addBands(sample_mean.select(6).subtract(sample_mean.select(4)).gt(sample_mean.select(4).subtract(sample_mean.select(2))).multiply(2));
  directions = directions.addBands(sample_mean.select(3).subtract(sample_mean.select(4)).gt(sample_mean.select(4).subtract(sample_mean.select(5))).multiply(3));
  directions = directions.addBands(sample_mean.select(0).subtract(sample_mean.select(4)).gt(sample_mean.select(4).subtract(sample_mean.select(8))).multiply(4));
  // The next 4 are the not() of the previous 4
  directions = directions.addBands(directions.select(0).not().multiply(5));
  directions = directions.addBands(directions.select(1).not().multiply(6));
  directions = directions.addBands(directions.select(2).not().multiply(7));
  directions = directions.addBands(directions.select(3).not().multiply(8));
  // Mask all values that are not 1-8
  directions = directions.updateMask(gradmask);
  // "collapse" the stack into a singe band image (due to masking, each pixel has just one value (1-8) in it's directional band, and is otherwise masked)
  directions = directions.reduce(ee.Reducer.sum());  
  //var pal = ['ffffff','ff0000','ffff00', '00ff00', '00ffff', '0000ff', 'ff00ff', '000000'];
  //Map.addLayer(directions.reduce(ee.Reducer.sum()), {min:1, max:8, palette: pal}, 'Directions', false);
  var sample_stats = sample_var.divide(sample_mean.multiply(sample_mean));
  // Calculate localNoiseVariance
  var sigmaV = sample_stats.toArray().arraySort().arraySlice(0,0,5).arrayReduce(ee.Reducer.mean(), [0]);
  // Set up the 7*7 kernels for directional statistics
  var rect_weights = ee.List.repeat(ee.List.repeat(0,7),3).cat(ee.List.repeat(ee.List.repeat(1,7),4));
  var diag_weights = ee.List([[1,0,0,0,0,0,0], [1,1,0,0,0,0,0], [1,1,1,0,0,0,0], 
    [1,1,1,1,0,0,0], [1,1,1,1,1,0,0], [1,1,1,1,1,1,0], [1,1,1,1,1,1,1]]);
  var rect_kernel = ee.Kernel.fixed(7,7, rect_weights, 3, 3, false);
  var diag_kernel = ee.Kernel.fixed(7,7, diag_weights, 3, 3, false);
  // Create stacks for mean and variance using the original kernels. Mask with relevant direction.
  var dir_mean = img.reduceNeighborhood(ee.Reducer.mean(), rect_kernel).updateMask(directions.eq(1));
  var dir_var = img.reduceNeighborhood(ee.Reducer.variance(), rect_kernel).updateMask(directions.eq(1));
  dir_mean = dir_mean.addBands(img.reduceNeighborhood(ee.Reducer.mean(), diag_kernel).updateMask(directions.eq(2)));
  dir_var = dir_var.addBands(img.reduceNeighborhood(ee.Reducer.variance(), diag_kernel).updateMask(directions.eq(2)));
  // and add the bands for rotated kernels
  for (var i=1; i<4; i++) {
    dir_mean = dir_mean.addBands(img.reduceNeighborhood(ee.Reducer.mean(), rect_kernel.rotate(i)).updateMask(directions.eq(2*i+1)));
    dir_var = dir_var.addBands(img.reduceNeighborhood(ee.Reducer.variance(), rect_kernel.rotate(i)).updateMask(directions.eq(2*i+1)));
    dir_mean = dir_mean.addBands(img.reduceNeighborhood(ee.Reducer.mean(), diag_kernel.rotate(i)).updateMask(directions.eq(2*i+2)));
    dir_var = dir_var.addBands(img.reduceNeighborhood(ee.Reducer.variance(), diag_kernel.rotate(i)).updateMask(directions.eq(2*i+2)));
  }
  // "collapse" the stack into a single band image (due to masking, each pixel has just one value in it's directional band, and is otherwise masked)
  dir_mean = dir_mean.reduce(ee.Reducer.sum());
  dir_var = dir_var.reduce(ee.Reducer.sum());
  // A finally generate the filtered value
  var varX = dir_var.subtract(dir_mean.multiply(dir_mean).multiply(sigmaV)).divide(sigmaV.add(1.0));
  var b = varX.divide(dir_var);
  var result = dir_mean.add(b.multiply(img.subtract(dir_mean)));
  // Return the result in natural numbers rather than dB, allowing mean reductions etc. 
  return ee.Image(result.arrayFlatten([['sum']]));
  //.log10().multiply(10.0);
};
//Calling functions to pre-process images
function preProcessing(image) {
  var collection = RefinedLee(image);
  return collection;
}
//Setup bounds using the ROI SOY
var bounds = ROI;
//Map.addLayer(bounds,{},'bounds',false);
//Map.centerObject(orig, 11);
//Operate within a yearly window
var start = ee.Date('2019-01-01');
var end = start.advance(1,'year');
var s1 = ee.ImageCollection('COPERNICUS/S1_GRD_FLOAT')
  .filterDate(start, end)
  .filter(ee.Filter.eq('instrumentMode', 'IW'));//Recommended for forestry applications, default mode over land
s1 = s1.filterBounds(bounds)
print('ASCENDING',s1.filterMetadata('orbitProperties_pass','equals','ASCENDING'));
print('DESCENDING',s1.filterMetadata('orbitProperties_pass','equals','DESCENDING'));
s1 = s1.filterMetadata('orbitProperties_pass','equals','DESCENDING')
// Get the VV dual polerisation images, preform the preprocessing on them and copy the timestamp across for future use
var s1 = s1
      .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
      .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
      //.map(erodeGeometry)
      .map(function(i) {
        return ee.Image.cat((
          preProcessing(i.select('VV')).select(['sum'],['VV'])
            .copyProperties(i,['system:time_start'])),
          (preProcessing(i.select('VH')).select(['sum'],['VH'])
            .copyProperties(i,['system:time_start'])))
            //,glcm(i))
      });      
print('Processed images',s1)
//generate a list to map through (monthly will only work for one year at the moment). Bother Conor with this? 
var months = ee.List.sequence(1,12);
//Placeholder so postion 1 does not give Feb instead of Jan
var monthsString = ee.List(['PLACEHOLDER','January','Febuary','March','April','May','June','July','August','September','October','November','December']);
////perform a seperate reduction for each month of imagery, attaching the respective 
//month (int and string) and number of images in the composite
var processedComposites = ee.ImageCollection((months.map(function(m) {
        var filtered = s1.filter(ee.Filter.calendarRange(m, m, 'month'))
        m = ee.Number(m) //have to cast year as a number object before calling int() on it
        var monthString = monthsString.get(m);
        filtered = ee.ImageCollection(filtered)
        .mean()
        .set('numImages',filtered.size())
        .set('month', m)
        .set('monthString', monthString);
        return filtered
      }
)));
//Add indicies
processedComposites = processedComposites.map(function(i){
  return i.addBands(i.normalizedDifference(['VH', 'VV']).rename('ND'))//Add an ND band
  .addBands(((i.select('VV')).divide(i.select('VH'))).rename('VV/VH'))//Add a ratio band
})
print('Monthly composites', processedComposites);
//Get a list of bands from the first composite
var bands = processedComposites.first().bandNames()
//var bands = ['VH','VV/VH']
print(bands)
// var bands = ['VV','VH','VH-VV','VV_div_VH','VH_contrast','VH_diss','VH_idm','VH_asm','VH_ent','VH_savg','VH_corr','VH_var',
// 'VV_contrast','VV_diss','VV_idm','VV_asm','VV_ent','VV_savg','VV_corr','VV_var']
//stop2
// Select the monthly composite to process
var S1T1 = ee.Image(processedComposites.toList(100).get(4));
var S1T2 = ee.Image(processedComposites.toList(100).get(5));
print(S1T1)
// Add the T2 Composite the map
var T2 = ui.Map.Layer(S1T2,vizPar.S1,'loading...');
//Map.layers().add(T2);
var monthT2 = ee.String(S1T2.get('monthString'));
monthT2.evaluate(function(n) {
  T2.setName(n+' Composite');
});
// Add the T1 Composite the map
var T1 = ui.Map.Layer(S1T1,vizPar.S1,'loading...');
var monthT1 = ee.String(S1T1.get('monthString'));
//Map.layers().add(T1);
monthT1.evaluate(function(n) {
  T1.setName(n+' Composite');
});
// The different change
// set date window
var bef = S1T1.select('VV/VH');
var aft = S1T2.select('VV/VH')
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
//Map.addLayer(imgbf, {min: 1.014714247850709, max: 1.0870637939101968,bands: ['p10', 'p50', 'p10']}, 'Before',1);
//Map.addLayer(imgat, {min: 1.0202118818803803, max: 1.0735631126917233, bands: ['p10', 'p50', 'p10']}, 'After',1);
var diff = p10at.subtract(p10bf);
var radius = 25;
var thres = -0.009;
var diff_sm = p10at.focal_median(radius, 'circle', 'meters')
.subtract(p10bf.focal_median(radius, 'circle', 'meters'));
var diff_th = diff_sm.lt(thres);
var clip_diff = diff_th.clip(ROI)
var change = diff_th.updateMask(diff_th.neq(0));
var clip_change = change.clip(ROI)
Map.addLayer(clip_diff, {min: -10, max: 10}, 'Diff',0)
Map.addLayer(clip_change, {palette: 'FFF000'}, 'Changed')
// THE MULTISPECTRAL
var start_date = ee.Date.fromYMD(2019,6,30);
var end_date = ee.Date.fromYMD(2019,9,1);
var Sentinel2 = (ee.ImageCollection('COPERNICUS/S2')
                .filterBounds(ROI)
                .filterDate(ee.Date(start_date),ee.Date(end_date)));
                //.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10)));
// NOT PUT MASK CLOUDS STANDAR BUT CALCULE NDVI
// This function adds a band representing the image timestamp.
var computeNDVI = function(image) {
  return image.normalizedDifference(['B8', 'B4']).rename('NDVI')
    .set({'system:time_start': image.get('system:time_start')})
};
var inputs = Sentinel2.map(computeNDVI)
print (inputs)
var median = inputs.reduce(ee.Reducer.median());
var clip = median.clip(ROI)
Map.addLayer(clip,{},'median')