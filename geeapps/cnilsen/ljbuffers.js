var table = ee.FeatureCollection("RESOLVE/ECOREGIONS/2017"),
    image = ee.Image("users/cnilsen/studyArea2"),
    roads = ee.FeatureCollection("TIGER/2016/Roads"),
    imageCollection = ee.ImageCollection("USDA/NAIP/DOQQ"),
    streams = ee.FeatureCollection("users/cnilsen/wtrcrs_SHP"),
    imageVisParam = {"opacity":0.76,"bands":["nd"],"palette":["ffffff","008000"]},
    imageVisParam2 = {"opacity":0.76,"bands":["nd"],"palette":["e44616","008000"]},
    dtm1 = ee.Image("users/cnilsen/Sammamish/dtm1"),
    dsm1 = ee.Image("users/cnilsen/Sammamish/dsm1"),
    dsm2 = ee.Image("users/cnilsen/Sammamish/dsm2"),
    dtm2 = ee.Image("users/cnilsen/Sammamish/dtm2"),
    geometry = ee.FeatureCollection("users/cnilsen/Sammamish/LJWatershed"),
    imageVisParam3 = {"opacity":1,"bands":["b1"],"min":6.01055908203125,"max":134.46435546875,"palette":["10d860","09af15","147617"]},
    table2 = ee.FeatureCollection("users/cnilsen/Sammamish/bldgRooflines"),
    roofs = ee.Image("users/cnilsen/rooftopsall22"),
    osmWater = ee.FeatureCollection("users/cnilsen/OSM_water"),
    imageVisParam4 = {"opacity":1,"bands":["b1"],"min":1,"max":30,"palette":["ff0000","4a6741","3f5a36","374f2f","304529","22311d"]},
    imageVisParam5 = {"opacity":1,"bands":["nd"],"min":0,"max":0.5724340677261353,"palette":["ffd9d9","52ff27","28620b"]},
    samStreams = ee.FeatureCollection("users/cnilsen/Sammamish/streams"),
    image2 = ee.Image("users/cnilsen/samIndices1m"),
    image3 = ee.Image("users/cnilsen/Sammamish/drainageMap"),
    imageVisParam6 = {"opacity":0.79,"bands":["b1"],"max":10,"palette":["ff843c","96d2a4","6dbc90","4da284","36877a"]},
    imageVisParam7 = {"opacity":0.79,"bands":["b1"],"max":20,"palette":["ff843c","96d2a4","6dbc90","4da284","36877a"]};
//get stream buffer geometry 
Map.addLayer(image3,{},'drainagemap'); 
Map.addLayer(image2,{},'indices');
var bufferBy = function(size) {
  return function(feature) {
    return feature.buffer(size);   
  };
};
// Import rooftops (Microsoft, 2018) and reduce to image using the FID
var roofs_fc = ee.FeatureCollection('users/jrobertson2000/shapefiles/wa_rooftopsMSFT2018');
var intRoofs = roofs_fc.map(function(feature) {
  return feature.set({type: 6})
});
var streambuffer = samStreams.map(bufferBy(100));
//Map.addLayer(bufferedPolys100,{},'buff'); 
//id tree canopy 
var dsm = dsm1.blend(dsm2); 
var dtm = dtm1.blend(dtm2); 
var diff = dsm.subtract(dtm);//.clamp(6,99); 
var trees = diff.mask(diff.gte(10));  
Map.addLayer(trees.mask(roofs.eq(0).mask(diff.gte(10))),imageVisParam3,'diff')
//add roofs 
//Start with Tiger Roads - use cummulative cost map fuzz the edges  
var sources = ee.Image().toByte().paint(roads, 20);
var cost = ee.Image(1)
    .clip(geometry); 
//inverse the cost function 
var cumulativeCost = cost.cumulativeCost(
{
    source: sources,
    maxDistance: 30 
});
var cumulativeCost = ee.Image(1)
    .divide(cumulativeCost)
//Map.addLayer(cumulativeCost,
//{}, 'cost', 0);
//import NAIP this takes all images collected in the last four years
var bands = ["R", "G", "B", "N"]; 
var img = imageCollection
    .filterDate('2017-01-01', '2019-01-01')
    .filterBounds(geometry);
//Map NDVI over the image collection 
var withNDVI = img.map(
    function (image)
    {
        var ndvi = image.normalizedDifference(['N', 'R'])
            .rename('NDVI');
        return image.addBands(ndvi);
    }
);
//Map.addLayer(withNDVI,
//{}, 'withNDVI', 0);
//take the maximum NDVI value 
var maxNDVI = withNDVI.select('NDVI')
    .max();
//Map.addLayer(maxNDVI,
//{}, 'maxNDVI', 0);
//add NAIP 
Map.addLayer(img,
{
    gamma: 0.8
}, "RGBN", false)
var img = img.mean(); //mean of two years in each band
img = ee.Image(img)
    .divide(255)
    .select(bands); //normalizes NAIP
//Map.addLayer(img,
//{}, 'mean', false);
// Apply a softening.
var kernel = ee.Kernel.gaussian(3)
img = img.convolve(kernel)
//Map.addLayer(img,
//{
//    gamma: 0.8
//}, "RGBN blur", false)
// Compute spectralGradients.
var gradient3 = ee.Image.cat(
    img.spectralGradient('sam'),
    img.spectralGradient('sid'),
    img.spectralGradient('sed'))
//Map.addLayer(gradient3,
//{
//    min: [0.1, 0.1, 0.01],
//    max: [0.3, 0.3, 0.1]
//}, "gradient3", false)
var gradient = img.spectralErosion()
    .spectralGradient('emd')
//Map.addLayer(gradient,
//{
 //   min: 0,
//    max: 0.3
//}, "emd", false)
//var img = img.clip(geometry); 
//--------begin segmentation 
// define seeds 
var seeds = ee.Algorithms.Image.Segmentation.seedGrid(24, 'square');
//var ndvi = img.normalizedDifference(["N", "R"])
var ndvi = maxNDVI;
var ndviGradient = ndvi.gradient()
    .pow(2)
    .reduce('sum')
    .sqrt()
//Map.addLayer(ndviGradient,
//{}, 'grad', 0);
var img = ee.Image.cat(diff, img)//, ndviGradient)
   // .clip(geometry); //.addBands(gradient3)
var snic = ee.Algorithms.Image.Segmentation.SNIC(
    {
        image: img,
        size: 24,
        compactness: 1,
        connectivity: 8,
        neighborhoodSize: 48,
        seeds: seeds
    })
    .select(
  ["R_mean", "G_mean", "B_mean", "N_mean", "clusters", "b1_mean"],
  ["R", "G", "B", "N", "clusters","b1_mean"]);
//var snic = snic.clip(geometry); 
//var snic = snic.clip(PugetSound)
var clusters = snic.select("clusters")
//Map.addLayer(snic,
//{}, 'snic', 0);
//Map.addLayer(clusters.randomVisualizer(),
//{}, "clusters", 0)
var snicNDVI = snic.normalizedDifference(["N", "R"]);
//Map.addLayer(snicNDVI.mask(diff.gt(4)),imageVisParam5,'snicNDVI'); 
//calculate histogram for thresholding
var histogram = snicNDVI.reduceRegion(
{
    reducer: ee.Reducer.histogram(255)
        .combine('mean', null, true)
        .combine('variance', null, true),
    geometry: geometry,
    scale: 10,
    bestEffort: true
});
//print(Chart.image.histogram(snicNDVI, 30));
//implement otsu thresholding  
var otsu = function(histogram) {
  var counts = ee.Array(ee.Dictionary(histogram).get('histogram'));
  var means = ee.Array(ee.Dictionary(histogram).get('bucketMeans'));
  var size = means.length().get([0]);
  var total = counts.reduce(ee.Reducer.sum(), [0]).get([0]);
  var sum = means.multiply(counts).reduce(ee.Reducer.sum(), [0]).get([0]);
  var mean = sum.divide(total);
  var indices = ee.List.sequence(1, size);
  // Compute between sum of squares, where each mean partitions the data.
  var bss = indices.map(function(i) {
    var aCounts = counts.slice(0, 0, i);
    var aCount = aCounts.reduce(ee.Reducer.sum(), [0]).get([0]);
    var aMeans = means.slice(0, 0, i);
    var aMean = aMeans.multiply(aCounts)
        .reduce(ee.Reducer.sum(), [0]).get([0])
        .divide(aCount);
    var bCount = total.subtract(aCount);
    var bMean = sum.subtract(aCount.multiply(aMean)).divide(bCount);
    return aCount.multiply(aMean.subtract(mean).pow(2)).add(
           bCount.multiply(bMean.subtract(mean).pow(2)));
  });
  //print(ui.Chart.array.values(ee.Array(bss), 0, means));
  // Return the mean value corresponding to the maximum BSS.
  return means.sort(bss).get([-1]);
};
//var hist = snicNDVI.reduceRegion(ee.Reducer.histogram(),geometry); 
//print(histogram); 
var threshold = otsu(histogram.get('nd_histogram')).max(0);
print(threshold); 
//classify veg/non veg
//Map.centerObject(geometry,10)
var nonveg = snicNDVI.lte(threshold);
var veg = snicNDVI.gt(threshold);
//Map.addLayer(veg.mask(veg),{palette:'green',min:0,max:1},'veg'); 
Map.addLayer(streams,{},'streams',0)
//var buffer = streams.buffer(91.4);
var vegBuffer = diff.clip(streambuffer); 
Map.addLayer(vegBuffer,imageVisParam7,'vegBuffer',0)
//Map.addLayer(dtm1,{},'dtm1');
var clusters = snic.select("clusters")
var treeH = diff.addBands(clusters).reduceConnectedComponents(ee.Reducer.mean(), "clusters", 256); 
Map.addLayer(treeH.clip(streambuffer),imageVisParam4,'treeH'); 
//get s2 data 
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
function maskS2snow(image) {
  var snow = image.select('MSK_SNWPRB');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = snow.gt(0.5);
  return image.updateMask(mask).divide(10000);
}
// Map the function over one year of data and take the median.
// Load Sentinel-2 TOA reflectance data.
var dataset = ee.ImageCollection('COPERNICUS/S2_SR')
                 // .filterDate('2018-01-01', '2019-06-30')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
                  .filter(ee.Filter.lt('SNOW_ICE_PERCENTAGE',5))
                  .map(maskS2clouds);
//calculate ndvi 
var ndvi = img.normalizedDifference(['N','R']);  
Map.addLayer(ndvi.addBands(diff),{},'ndvi'); 
//trees = green and high
var trees = ndvi.gt(0.1).and(diff.gt(2)); 
Map.addLayer(trees,{},'trees'); 
//roofs = not green and low
var roofs = ndvi.lte(0.1).and(diff.gt(2));
var roads = ndvi.lte(0.1).and(diff.lte(2));
var grass = ndvi.gt(0.1).and(diff.lte(2));
var lc = ee.Image.cat(trees,roofs,roads,grass); 
Map.addLayer(lc,{},'lc'); 
var seeds = ee.Algorithms.Image.Segmentation.seedGrid(24, 'hex');
var snicLidar = ee.Algorithms.Image.Segmentation.SNIC(
    {
        image: lc,
        size: 24,
        compactness: 1,
        connectivity: 8,
        neighborhoodSize: 48,
        seeds: seeds
    })
    ;
Map.addLayer(snicLidar,{},'sniclidar')
Map.addLayer(samStreams,{},'samStreams');