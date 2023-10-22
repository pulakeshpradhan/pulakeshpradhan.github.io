// Mask Awan Sentinel-2
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0));
  // Return the masked and scaled data, without the QA bands.
  return image.updateMask(mask).divide(10000)
  //return image.updateMask(mask)    
      .select("B.*")
      .copyProperties(image, ["system:time_start"]);
}
function addBands_S2(image){
  var ndvi = image.normalizedDifference(['B8','B4']).rename('NDVI');
  var ndwi = image.normalizedDifference(['B3', 'B12']).rename('NDWI');
  var ndbi = image.normalizedDifference(['B8','B11']).rename('NDBI');
  var ILT = image.select('B11').divide(image.select('B8')).rename('ILT');
  var evi = image.expression(
  "(RED <= 0 || NIR <= 0 || BLUE <= 0 )? -1.1 : " +
  "(RED < NIR || BLUE < RED) ? 2.5*((NIR-RED)/(L+NIR+6*RED-7.5*BLUE))" + 
  ":1.5*((NIR-RED)/(L/2+NIR+RED))"
  ,{NIR: image.select('B8'),RED: image.select('B4'),BLUE: image.select('B2'),L : 1}).rename('EVI');
 var Msk = ndvi.expression("(evi <= -1.0 || evi >= 1.0) ? 0:1",{evi : ndvi.select('NDVI')});
  evi = evi.updateMask(Msk); ndvi = ndvi.updateMask(Msk);ndwi = ndwi.updateMask(Msk);
  ndbi = ndbi.updateMask(Msk); ILT = ILT.updateMask(Msk);
  return image.addBands(evi).addBands(ndvi).addBands(ndwi).addBands(ndbi)
  .addBands(ILT).toFloat();
}
function addBands_S2_Sc(image){
  // Index ndvi,ndbi,evi,ndwi direscale 1000
  var ndvi = image.normalizedDifference(['B8','B4']).rename('NDVI');
  var ndwi = image.normalizedDifference(['B3', 'B12']).rename('NDWI');
  var ndbi = image.normalizedDifference(['B8','B11']).rename('NDBI');
  var ILT = image.select('B6').divide(image.select('B5')).rename('ILT');
  var evi = image.expression(
    "(Red <= 0 || Nir <= 0 || Blue <= 0 )? -1.1 : " +
    "(RED < NIR || BLUE < RED) ? 2.5*((NIR-RED)/(L+NIR+6*RED-7.5*BLUE)):1.5*((NIR-RED)/(L/2+NIR+RED))"
    ,{NIR: image.select('B8'),RED: image.select('B4'),BLUE: image.select('B2'),L : 10000}).rename('EVI');
 var Msk = ndvi.expression("(evi <= -1.0 || evi >= 1.0) ? 0:1",{evi : ndvi.select('NDVI')});
  evi = evi.updateMask(Msk); ndvi = ndvi.updateMask(Msk);ndwi = ndwi.updateMask(Msk);
  ndbi = ndbi.updateMask(Msk); ILT = ILT.updateMask(Msk);
  return image.addBands(evi).addBands(ndvi).addBands(ndwi).addBands(ndbi)
  .addBands(ILT).toFloat();
}
/////
//var roi = ee.FeatureCollection('users/wrilapan/sumsel_aoi');
var roi = ee.FeatureCollection('users/starmizi/sumsel_prov');
Map.centerObject(roi, 10);
var bounds = roi.geometry().bounds();
var filterBounds = ee.Filter.bounds(bounds);
var currentYear = new Date().getFullYear();
var selectedYear = '2019';
var filterDate = ee.Filter.date(selectedYear + '-01-01', selectedYear + '-12-31');
var dataset = ee.ImageCollection("COPERNICUS/S2_SR")
                        .select(['B4', 'B3', 'B2', 'B8', 'QA60'])
                        .filter(filterBounds)
                        .filter(filterDate)
                        // Pre-filter to get less cloudy granules.
                        //.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
                        .map(maskS2clouds)
                        .median().clip(roi);
var rgbVis = {
  min: 0.0,
  max: 0.4,
  bands: ['B4', 'B3', 'B2'],
};
Map.addLayer(dataset, rgbVis, 'RGB');
// Apply a softening.
var kernel = ee.Kernel.gaussian(3)
dataset = dataset.convolve(kernel)
Map.addLayer(dataset, {gamma: 0.8}, "RGBN blur", false)
// Run SNIC on the regular square grid.
var snic = ee.Algorithms.Image.Segmentation.SNIC({
  image: dataset, 
  size: 3,
  compactness: 0,
  connectivity: 8,
  neighborhoodSize:6,
  seeds: ee.Algorithms.Image.Segmentation.seedGrid(32)
}).select(['clusters', 'B4_mean', 'B3_mean', 'B2_mean', 'B8_mean'], ['clusters', 'B4', 'B3', 'B2', 'NIR']);
var clusters = snic.select('clusters');
Map.addLayer(clusters.randomVisualizer(), {}, 'clusters', false);
Map.addLayer(snic.randomVisualizer(), {}, 'means');
/*
Export.image.toDrive({ 
  image: dataset.multiply(10000).toUint16(), 
  description: 'S2_Mos_Med_'+ selectedYear +'_SumSel', 
  scale: 10,
  maxPixels: 1e13,
  region: roi
});
Export.image.toDrive({ 
  image: clusters.multiply(10000).toUint16(), 
  description: 'cluster_'+ selectedYear +'_SumSel', 
  scale: 10,
  maxPixels: 1e13,
  region: roi
});
Export.image.toDrive({ 
  image: snic.multiply(10000).toUint16(), 
  description: 'means_'+ selectedYear +'_SumSel', 
  scale: 10,
  maxPixels: 1e13,
  region: roi
});
*/
// Compute per-cluster stdDev.
var stdDev = dataset.addBands(clusters).reduceConnectedComponents(ee.Reducer.stdDev(), 'clusters', 256)
Map.addLayer(stdDev, {min:0, max:0.1}, 'StdDev', false)
// Area, Perimeter, Width and Height
var area = ee.Image.pixelArea().addBands(clusters).reduceConnectedComponents(ee.Reducer.sum(), 'clusters', 256)
Map.addLayer(area, {min:50000, max: 500000}, 'Cluster Area', false)
var minMax = clusters.reduceNeighborhood(ee.Reducer.minMax(), ee.Kernel.square(1));
var perimeterPixels = minMax.select(0).neq(minMax.select(1)).rename('perimeter');
Map.addLayer(perimeterPixels, {min: 0, max: 1}, 'perimeterPixels');
var perimeter = perimeterPixels.addBands(clusters)
    .reduceConnectedComponents(ee.Reducer.sum(), 'clusters', 256);
Map.addLayer(perimeter, {min: 100, max: 400}, 'Perimeter size', false);
var sizes = ee.Image.pixelLonLat().addBands(clusters).reduceConnectedComponents(ee.Reducer.minMax(), 'clusters', 256)
var width = sizes.select('longitude_max').subtract(sizes.select('longitude_min')).rename('width')
var height = sizes.select('latitude_max').subtract(sizes.select('latitude_min')).rename('height')
Map.addLayer(width, {min:0, max:0.02}, 'Cluster width', false)
Map.addLayer(height, {min:0, max:0.02}, 'Cluster height', false)
var objectPropertiesImage = ee.Image.cat([
  snic.select(['B4', 'B3', 'B2', 'B8']),
  stdDev,
  area,
  perimeter,
  width,
  height
]).float();
//var training = objectPropertiesImage.addBands(cdl2016.select('cropland'))
//    .updateMask(seeds)
//    .sample(geometry, 5);
//var classifier = ee.Classifier.randomForest(10).train(training, 'cropland')
//Map.addLayer(objectPropertiesImage.classify(classifier), {min:0, max:254}, 'Classified objects')