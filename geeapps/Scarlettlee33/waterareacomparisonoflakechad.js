var imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "LANDSAT/LC08/C01/T1_SR"
    }) || ee.ImageCollection("LANDSAT/LC08/C01/T1_SR"),
    chadBound = ui.import && ui.import("chadBound", "table", {
      "id": "users/Scarlettlee33/LakeChad/huan_chad_bound"
    }) || ee.FeatureCollection("users/Scarlettlee33/LakeChad/huan_chad_bound"),
    modis = ui.import && ui.import("modis", "imageCollection", {
      "id": "MODIS/006/MOD11A2"
    }) || ee.ImageCollection("MODIS/006/MOD11A2");
// Display a grid of linked maps, each with a different visualization.
// function otsu
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
  // Return the mean value corresponding to the maximum BSS.
  return means.sort(bss).get([-1]);
};
// funtion--otsu to get threshold of water index
// input: feature, image
var thre = function(featureBound, image){
  var histogram = image
  .clip(featureBound)
  .normalizedDifference(['B3','B6'])
  .select(['nd'],['ndwi_hist'])
  .reduceRegion({
    reducer: ee.Reducer.histogram(50), 
    geometry: featureBound, 
    scale: 30,
    bestEffort: true
  });
  return otsu(histogram.get('ndwi_hist'));
} 
// unsupervised classification
var classifiedImg = function(mosaic){
  ///////  unsupervised  /////////////////////////////////////
  // Make the training dataset.
  var training = mosaic.sample({
    region: chadBound.geometry(),
    scale: 1000
  });
  // Instantiate the clusterer and train it.
  var clusterer = ee.Clusterer.wekaKMeans(2).train(training);
  // Cluster the input using the trained clusterer.
  var classified = mosaic.cluster(clusterer).select('cluster');
  return classified.clip(chadBound.geometry());
}
var mod201908 = modis.select('LST_Day_1km')
                     .filterDate('2019-08-01', '2019-08-31')
                     .median()
var mod202002 = modis.select('LST_Day_1km')
                     .filterDate('2020-02-01', '2020-02-28')
                     .median()
/*
 * Image setup
 */
// Function to cloud mask from the pixel_qa band of Landsat 8 SR data.
function maskL8sr(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = 1 << 3;
  var cloudsBitMask = 1 << 5;
  // Get the pixel QA band.
  var qa = image.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
      .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  // Return the masked image, scaled to reflectance, without the QA bands.
  return image.updateMask(mask).divide(10000)
      .select("B[0-9]*")
      .copyProperties(image, ["system:time_start"]);
}
// Create an initial mosiac, which we'll visualize in a few different ways.
var image201908 = imageCollection
    .filterDate('2019-06-01', '2019-08-31')
    .map(maskL8sr)
    .median();
var image202002 = imageCollection
    .filterDate('2020-01-01', '2020-03-31')
    .map(maskL8sr)
    .median();
// Each map has a name and some visualization parameters.
var images = {
  '2019-08': [image201908,mod201908],
  '2020-02': [image202002,mod202002]
};
// Shared visualization parameters for the images.
function getVisualization(bands) {
  return {gamma: 1.3, min: 0, max: 0.3, bands: bands};
}
/*
 * Configure maps, link them in a grid
 */
// Create a map for each visualization option.
var maps = [];
Object.keys(images).forEach(function(name) {
  // Landsat
  var img = images[name][0];
  var map = ui.Map();
  map.add(ui.Label(name,{fontSize:'24px'}));
  map.addLayer(img, getVisualization(['B4', 'B3', 'B2']), name);
  // Modis lst
  var imgMod = images[name][1];
  var lstImg = classifiedImg(imgMod);
  if (name === '2020-02')
    map.addLayer(lstImg.eq(0).selfMask(), {}, 'MODIS-based total inundation area', false)
  // landsat open surface water
  var threshold = thre(chadBound.geometry(),img);
  var waterImg = img.normalizedDifference(['B3','B6']).gte(threshold).clip(chadBound.geometry())
  map.addLayer(waterImg.selfMask(), {palette:['0000ff']}, 'water image by Landsat')
  map.setControlVisibility({all:false, layerList:true});
  maps.push(map);
});
var linker = ui.Map.Linker(maps);
// Enable zooming on the top-left map.
maps[0].setControlVisibility({zoomControl: true});
// Show the scale (e.g. '500m') on the bottom-right map.
maps[1].setControlVisibility({scaleControl: true});
// Create a grid of maps.
var mapGrid = ui.Panel(
    [
      ui.Panel(maps[0], null, {stretch: 'both'}),
      ui.Panel(maps[1], null, {stretch: 'both'})
    ],
    ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'});
// Center the map at an interesting spot in Greece. All
// other maps will align themselves to this parent map.
maps[0].setCenter(13.7, 13.5, 9);
// maps[1].setCenter(13.7, 13.5, 8.5);
/*
 * Add a title and initialize
 */
// Create a title.
var title = ui.Label('Landsat-based open surface water area of Lake Chad in two months', {
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '24px'
});
// Add the maps and title to the ui.root.
ui.root.widgets().reset([title, mapGrid]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));