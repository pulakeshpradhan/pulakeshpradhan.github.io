var table = ui.import && ui.import("table", "table", {
      "id": "users/ravindra1364/o_basin"
    }) || ee.FeatureCollection("users/ravindra1364/o_basin");
function maskS2clouds(image) {   var qa = image.select('QA60')
Map.setCenter(81.1891607595137,26.06141966900158);
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;   var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions. Sentinel 2C/S_MNDWI
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(qa.bitwiseAnd(cirrusBitMask).eq(0)) 
  // Return the masked and scaled data, without the QA bands.
  return image.updateMask(mask).divide(10000)       .select("B.*")       .copyProperties(image, ["system:time_start"]) } // Map the function over one year of data and take the median.
///////////////////////// Load Sentinel-2 TOA reflectance data. for '2016-01-01', '2016-04-30'
var collection, composite, mndwi; var polygon=table;  
collection = ee.ImageCollection('COPERNICUS/S2').filterDate('2016-10-01', '2016-12-30').filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20)).map(maskS2clouds);
composite = collection.median(); var aoi=composite.clip(table);  mndwi = aoi.normalizedDifference(['B3', 'B11']).rename('MNDWI');
Map.addLayer(mndwi, {min: 0, max: 1, palette: ['black','grey','navy','blue','violet','cyan','orange','yellow', 'green', 'black']},'Pre Mon 2016 MNDWI');
var histogram = mndwi.select('MNDWI').reduceRegion({   reducer: ee.Reducer.histogram(255, 2)      
.combine('mean', null, true)       .combine('variance', null, true),    geometry: polygon,    scale: 30,   bestEffort: true });
////////////////////
//print(histogram);
//print(Chart.image.histogram(mndwi.select('MNDWI'), polygon, 30));
/////////////////////////////
var otsu = function(histogram) {  var counts = ee.Array(ee.Dictionary(histogram).get('histogram')); 
var means = ee.Array(ee.Dictionary(histogram).get('bucketMeans'));  
var size = means.length().get([0]);
  var total = counts.reduce(ee.Reducer.sum(), [0]).get([0]);  
  var sum = means.multiply(counts).reduce(ee.Reducer.sum(), [0]).get([0]);
  var mean = sum.divide(total);   var indices = ee.List.sequence(1, size);
  var bss = indices.map(function(i) {     var aCounts = counts.slice(0, 0, i);  
  var aCount = aCounts.reduce(ee.Reducer.sum(), [0]).get([0]);    
  var aMeans = means.slice(0, 0, i);
    var aMean = aMeans.multiply(aCounts)         .reduce(ee.Reducer.sum(), [0]).get([0])         .divide(aCount);
    var bCount = total.subtract(aCount);
    var bMean = sum.subtract(aCount.multiply(aMean)).divide(bCount);  
    return aCount.multiply(aMean.subtract(mean).pow(2)).add(            bCount.multiply(bMean.subtract(mean).pow(2)));   });
  //  print(ui.Chart.array.values(ee.Array(bss), 0, means));
  return means.sort(bss).get([-1]); };  
var threshold = otsu(histogram.get('MNDWI_histogram')); //print('PRE 2016', threshold);
//
collection = ee.ImageCollection('COPERNICUS/S2').filterDate('2017-01-01', '2017-05-30').filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20)).map(maskS2clouds);
composite = collection.median(); var aoi=composite.clip(table);  mndwi = aoi.normalizedDifference(['B3', 'B11']).rename('MNDWI');
Map.addLayer(mndwi, {min: 0.4, max: 1, palette: ['black','cyan','blue' ,'yellow', '#171cd6','green', '#08d664','cyan', 'white']}, 'Pre Mon 2017 MNDWI');
var histogram = mndwi.select('MNDWI').reduceRegion({   reducer: ee.Reducer.histogram(255, 2)   
.combine('mean', null, true)       .combine('variance', null, true),    geometry: polygon,    scale: 30,   bestEffort: true });
/////////////////////////////////////////////////////////////////////////////////////////
var otsu = function(histogram) {
  var counts = ee.Array(ee.Dictionary(histogram).get('histogram')); 
  var means = ee.Array(ee.Dictionary(histogram).get('bucketMeans')); 
  var size = means.length().get([0]);
  var total = counts.reduce(ee.Reducer.sum(), [0]).get([0]);
  var sum = means.multiply(counts).reduce(ee.Reducer.sum(), [0]).get([0]);
  var mean = sum.divide(total);   var indices = ee.List.sequence(1, size);
  var bss = indices.map(function(i) {     var aCounts = counts.slice(0, 0, i);     var aCount = aCounts.reduce(ee.Reducer.sum(), [0]).get([0]);     var aMeans = means.slice(0, 0, i);
    var aMean = aMeans.multiply(aCounts)         .reduce(ee.Reducer.sum(), [0]).get([0])         .divide(aCount);     var bCount = total.subtract(aCount);
    var bMean = sum.subtract(aCount.multiply(aMean)).divide(bCount);     return aCount.multiply(aMean.subtract(mean).pow(2)).add(            bCount.multiply(bMean.subtract(mean).pow(2)));   });
  ///  print(ui.Chart.array.values(ee.Array(bss), 0, means));
  return means.sort(bss).get([-1]); };  
var threshold = otsu(histogram.get('MNDWI_histogram')); //print('PRE 2017', threshold);
//
collection = ee.ImageCollection('COPERNICUS/S2').filterDate('2018-01-01', '2018-03-30').filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20)).map(maskS2clouds);
composite = collection.median(); var aoi=composite.clip(table);  mndwi = aoi.normalizedDifference(['B3', 'B11']).rename('MNDWI');
Map.addLayer(mndwi, {min: 0.4, max: 1, palette: ['black','cyan','blue' ,'yellow', '#171cd6','green', '#08d664','cyan', 'white']}, 'Pre Mon 2018 MNDWI');
var histogram = mndwi.select('MNDWI').reduceRegion({   reducer: ee.Reducer.histogram(255, 2)       .combine('mean', null, true)       .combine('variance', null, true),    geometry: polygon,    scale: 30,   bestEffort: true });
var otsu = function(histogram) {  var counts = ee.Array(ee.Dictionary(histogram).get('histogram'));   var means = ee.Array(ee.Dictionary(histogram).get('bucketMeans'));   var size = means.length().get([0]);
  var total = counts.reduce(ee.Reducer.sum(), [0]).get([0]);   var sum = means.multiply(counts).reduce(ee.Reducer.sum(), [0]).get([0]);
  var mean = sum.divide(total);   var indices = ee.List.sequence(1, size);
  var bss = indices.map(function(i) {     var aCounts = counts.slice(0, 0, i);     var aCount = aCounts.reduce(ee.Reducer.sum(), [0]).get([0]);     var aMeans = means.slice(0, 0, i);
    var aMean = aMeans.multiply(aCounts)         .reduce(ee.Reducer.sum(), [0]).get([0])         .divide(aCount);     var bCount = total.subtract(aCount);
    var bMean = sum.subtract(aCount.multiply(aMean)).divide(bCount);     return aCount.multiply(aMean.subtract(mean).pow(2)).add(            bCount.multiply(bMean.subtract(mean).pow(2)));   });
  //  print(ui.Chart.array.values(ee.Array(bss), 0, means));
  return means.sort(bss).get([-1]); };  
var threshold = otsu(histogram.get('MNDWI_histogram')); //print('PRE 2018', threshold);
//
collection = ee.ImageCollection('COPERNICUS/S2').filterDate('2015-06-01', '2015-09-30').filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20)).map(maskS2clouds);
composite = collection.median(); var aoi=composite.clip(table);  mndwi = aoi.normalizedDifference(['B3', 'B11']).rename('MNDWI');
Map.addLayer(mndwi, {min: 0.4, max: 1, palette: ['black','cyan','blue' ,'yellow', '#171cd6','green', '#08d664','cyan', 'white']}, 'Mon 2015 MNDWI');
var histogram = mndwi.select('MNDWI').reduceRegion({   reducer: ee.Reducer.histogram(255, 2)       .combine('mean', null, true)       .combine('variance', null, true),    geometry: polygon,    scale: 30,   bestEffort: true });
var otsu = function(histogram) {  var counts = ee.Array(ee.Dictionary(histogram).get('histogram'));   var means = ee.Array(ee.Dictionary(histogram).get('bucketMeans'));   var size = means.length().get([0]);
  var total = counts.reduce(ee.Reducer.sum(), [0]).get([0]);   var sum = means.multiply(counts).reduce(ee.Reducer.sum(), [0]).get([0]);
  var mean = sum.divide(total);   var indices = ee.List.sequence(1, size);
  var bss = indices.map(function(i) {     var aCounts = counts.slice(0, 0, i);     var aCount = aCounts.reduce(ee.Reducer.sum(), [0]).get([0]);     var aMeans = means.slice(0, 0, i);
    var aMean = aMeans.multiply(aCounts)         .reduce(ee.Reducer.sum(), [0]).get([0])         .divide(aCount);     var bCount = total.subtract(aCount);
    var bMean = sum.subtract(aCount.multiply(aMean)).divide(bCount);     return aCount.multiply(aMean.subtract(mean).pow(2)).add(            bCount.multiply(bMean.subtract(mean).pow(2)));   });
 //   print(ui.Chart.array.values(ee.Array(bss), 0, means));
  return means.sort(bss).get([-1]); };  
var threshold = otsu(histogram.get('MNDWI_histogram')); //print('mon 2015', threshold);
// 
collection = ee.ImageCollection('COPERNICUS/S2').filterDate('2016-06-01', '2016-09-30').filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20)).map(maskS2clouds);
composite = collection.median(); var aoi=composite.clip(table);  mndwi = aoi.normalizedDifference(['B3', 'B11']).rename('MNDWI');
Map.addLayer(mndwi, {min: 0.4, max: 1, palette: ['black','cyan','blue' ,'yellow', '#171cd6','green', '#08d664','cyan', 'white']}, 'Mon 2016 MNDWI');
var histogram = mndwi.select('MNDWI').reduceRegion({   reducer: ee.Reducer.histogram(255, 2)       .combine('mean', null, true)       .combine('variance', null, true),    geometry: polygon,    scale: 30,   bestEffort: true });
var otsu = function(histogram) {  var counts = ee.Array(ee.Dictionary(histogram).get('histogram'));   var means = ee.Array(ee.Dictionary(histogram).get('bucketMeans'));   var size = means.length().get([0]);
  var total = counts.reduce(ee.Reducer.sum(), [0]).get([0]);   var sum = means.multiply(counts).reduce(ee.Reducer.sum(), [0]).get([0]);
  var mean = sum.divide(total);   var indices = ee.List.sequence(1, size);
  var bss = indices.map(function(i) {     var aCounts = counts.slice(0, 0, i);     var aCount = aCounts.reduce(ee.Reducer.sum(), [0]).get([0]);     var aMeans = means.slice(0, 0, i);
    var aMean = aMeans.multiply(aCounts)         .reduce(ee.Reducer.sum(), [0]).get([0])         .divide(aCount);     var bCount = total.subtract(aCount);
    var bMean = sum.subtract(aCount.multiply(aMean)).divide(bCount);     return aCount.multiply(aMean.subtract(mean).pow(2)).add(            bCount.multiply(bMean.subtract(mean).pow(2)));   });
   // print(ui.Chart.array.values(ee.Array(bss), 0, means));
  return means.sort(bss).get([-1]); };  
var threshold = otsu(histogram.get('MNDWI_histogram')); //print('mon 2016', threshold);
//
collection = ee.ImageCollection('COPERNICUS/S2').filterDate('2017-06-01', '2017-09-30').filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20)).map(maskS2clouds);
composite = collection.median(); var aoi=composite.clip(table);  mndwi = aoi.normalizedDifference(['B3', 'B11']).rename('MNDWI');
Map.addLayer(mndwi, {min: 0.4, max: 1, palette: ['black','cyan','blue' ,'yellow', '#171cd6','green', '#08d664','cyan', 'white']}, 'Mon 2017 MNDWI');
var histogram = mndwi.select('MNDWI').reduceRegion({   reducer: ee.Reducer.histogram(255, 2)       .combine('mean', null, true)       .combine('variance', null, true),    geometry: polygon,    scale: 30,   bestEffort: true });
var otsu = function(histogram) {  var counts = ee.Array(ee.Dictionary(histogram).get('histogram'));   var means = ee.Array(ee.Dictionary(histogram).get('bucketMeans'));   var size = means.length().get([0]);
  var total = counts.reduce(ee.Reducer.sum(), [0]).get([0]);   var sum = means.multiply(counts).reduce(ee.Reducer.sum(), [0]).get([0]);
  var mean = sum.divide(total);   var indices = ee.List.sequence(1, size);
  var bss = indices.map(function(i) {     var aCounts = counts.slice(0, 0, i);     var aCount = aCounts.reduce(ee.Reducer.sum(), [0]).get([0]);     var aMeans = means.slice(0, 0, i);
    var aMean = aMeans.multiply(aCounts)         .reduce(ee.Reducer.sum(), [0]).get([0])         .divide(aCount);     var bCount = total.subtract(aCount);
    var bMean = sum.subtract(aCount.multiply(aMean)).divide(bCount);     return aCount.multiply(aMean.subtract(mean).pow(2)).add(            bCount.multiply(bMean.subtract(mean).pow(2)));   });
  //  print(ui.Chart.array.values(ee.Array(bss), 0, means));
  return means.sort(bss).get([-1]); };  
var threshold = otsu(histogram.get('MNDWI_histogram')); //print('mon 2017', threshold);
//
collection = ee.ImageCollection('COPERNICUS/S2').filterDate('2018-06-01', '2018-09-30').filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20)).map(maskS2clouds);
composite = collection.median(); var aoi=composite.clip(table);  mndwi = aoi.normalizedDifference(['B3', 'B11']).rename('MNDWI');
Map.addLayer(mndwi, {min: 0.4, max: 1, palette: ['black','cyan','blue' ,'yellow', '#171cd6','green', '#08d664','cyan', 'white']}, 'Mon 2018 MNDWI');
var histogram = mndwi.select('MNDWI').reduceRegion({   reducer: ee.Reducer.histogram(255, 2)       .combine('mean', null, true)       .combine('variance', null, true),    geometry: polygon,    scale: 30,   bestEffort: true });
var otsu = function(histogram) {  var counts = ee.Array(ee.Dictionary(histogram).get('histogram'));   var means = ee.Array(ee.Dictionary(histogram).get('bucketMeans'));   var size = means.length().get([0]);
  var total = counts.reduce(ee.Reducer.sum(), [0]).get([0]);   var sum = means.multiply(counts).reduce(ee.Reducer.sum(), [0]).get([0]);
  var mean = sum.divide(total);   var indices = ee.List.sequence(1, size);
  var bss = indices.map(function(i) {     var aCounts = counts.slice(0, 0, i);     var aCount = aCounts.reduce(ee.Reducer.sum(), [0]).get([0]);     var aMeans = means.slice(0, 0, i);
    var aMean = aMeans.multiply(aCounts)         .reduce(ee.Reducer.sum(), [0]).get([0])         .divide(aCount);     var bCount = total.subtract(aCount);
    var bMean = sum.subtract(aCount.multiply(aMean)).divide(bCount);     return aCount.multiply(aMean.subtract(mean).pow(2)).add(            bCount.multiply(bMean.subtract(mean).pow(2)));   });
   // print(ui.Chart.array.values(ee.Array(bss), 0, means));
  return means.sort(bss).get([-1]); };  
var threshold = otsu(histogram.get('MNDWI_histogram'));// print('mon 2018', threshold);
//
collection = ee.ImageCollection('COPERNICUS/S2').filterDate('2015-10-01', '2015-12-30').filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20)).map(maskS2clouds);
composite = collection.median(); var aoi=composite.clip(table);  mndwi = aoi.normalizedDifference(['B3', 'B11']).rename('MNDWI');
Map.addLayer(mndwi, {min: 0.4, max: 1, palette: ['black','cyan','blue' ,'yellow', '#171cd6','green', '#08d664','cyan', 'white']}, 'post 2015 MNDWI');
var histogram = mndwi.select('MNDWI').reduceRegion({   reducer: ee.Reducer.histogram(255, 2)       .combine('mean', null, true)       .combine('variance', null, true),    geometry: polygon,    scale: 30,   bestEffort: true });
var otsu = function(histogram) {  var counts = ee.Array(ee.Dictionary(histogram).get('histogram'));   var means = ee.Array(ee.Dictionary(histogram).get('bucketMeans'));   var size = means.length().get([0]);
  var total = counts.reduce(ee.Reducer.sum(), [0]).get([0]);   var sum = means.multiply(counts).reduce(ee.Reducer.sum(), [0]).get([0]);
  var mean = sum.divide(total);   var indices = ee.List.sequence(1, size);
  var bss = indices.map(function(i) {     var aCounts = counts.slice(0, 0, i);     var aCount = aCounts.reduce(ee.Reducer.sum(), [0]).get([0]);     var aMeans = means.slice(0, 0, i);
    var aMean = aMeans.multiply(aCounts)         .reduce(ee.Reducer.sum(), [0]).get([0])         .divide(aCount);     var bCount = total.subtract(aCount);
    var bMean = sum.subtract(aCount.multiply(aMean)).divide(bCount);     return aCount.multiply(aMean.subtract(mean).pow(2)).add(            bCount.multiply(bMean.subtract(mean).pow(2)));   });
 //   print(ui.Chart.array.values(ee.Array(bss), 0, means));
  return means.sort(bss).get([-1]); };  
var threshold = otsu(histogram.get('MNDWI_histogram')); //print('post 2015', threshold);
//
collection = ee.ImageCollection('COPERNICUS/S2').filterDate('2016-10-01', '2016-12-30').filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20)).map(maskS2clouds);
composite = collection.median(); var aoi=composite.clip(table);  mndwi = aoi.normalizedDifference(['B3', 'B11']).rename('MNDWI');
Map.addLayer(mndwi, {min: 0.4, max: 1, palette: ['black','cyan','blue' ,'yellow', '#171cd6','green', '#08d664','cyan', 'white']}, 'post 2016 MNDWI');
var histogram = mndwi.select('MNDWI').reduceRegion({   reducer: ee.Reducer.histogram(255, 2)       .combine('mean', null, true)       .combine('variance', null, true),    geometry: polygon,    scale: 30,   bestEffort: true });
var otsu = function(histogram) {  var counts = ee.Array(ee.Dictionary(histogram).get('histogram'));   var means = ee.Array(ee.Dictionary(histogram).get('bucketMeans'));   var size = means.length().get([0]);
  var total = counts.reduce(ee.Reducer.sum(), [0]).get([0]);   var sum = means.multiply(counts).reduce(ee.Reducer.sum(), [0]).get([0]);
  var mean = sum.divide(total);   var indices = ee.List.sequence(1, size);
  var bss = indices.map(function(i) {     var aCounts = counts.slice(0, 0, i);     var aCount = aCounts.reduce(ee.Reducer.sum(), [0]).get([0]);     var aMeans = means.slice(0, 0, i);
    var aMean = aMeans.multiply(aCounts)         .reduce(ee.Reducer.sum(), [0]).get([0])         .divide(aCount);     var bCount = total.subtract(aCount);
    var bMean = sum.subtract(aCount.multiply(aMean)).divide(bCount);     return aCount.multiply(aMean.subtract(mean).pow(2)).add(            bCount.multiply(bMean.subtract(mean).pow(2)));   });
   // print(ui.Chart.array.values(ee.Array(bss), 0, means));
  return means.sort(bss).get([-1]); };  
var threshold = otsu(histogram.get('MNDWI_histogram')); //print('post 2016', threshold);
//
collection = ee.ImageCollection('COPERNICUS/S2').filterDate('2017-10-01', '2017-12-30').filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20)).map(maskS2clouds);
composite = collection.median(); var aoi=composite.clip(table);  mndwi = aoi.normalizedDifference(['B3', 'B11']).rename('MNDWI');
Map.addLayer(mndwi, {min: 0.4, max: 1, palette: ['black','cyan','blue' ,'yellow', '#171cd6','green', '#08d664','cyan', 'white']}, 'post 2017 MNDWI');
var histogram = mndwi.select('MNDWI').reduceRegion({   reducer: ee.Reducer.histogram(255, 2)       .combine('mean', null, true)       .combine('variance', null, true),    geometry: polygon,    scale: 30,   bestEffort: true });
var otsu = function(histogram) {  var counts = ee.Array(ee.Dictionary(histogram).get('histogram'));   var means = ee.Array(ee.Dictionary(histogram).get('bucketMeans'));   var size = means.length().get([0]);
  var total = counts.reduce(ee.Reducer.sum(), [0]).get([0]);   var sum = means.multiply(counts).reduce(ee.Reducer.sum(), [0]).get([0]);
  var mean = sum.divide(total);   var indices = ee.List.sequence(1, size);
  var bss = indices.map(function(i) {     var aCounts = counts.slice(0, 0, i);     var aCount = aCounts.reduce(ee.Reducer.sum(), [0]).get([0]);     var aMeans = means.slice(0, 0, i);
    var aMean = aMeans.multiply(aCounts)         .reduce(ee.Reducer.sum(), [0]).get([0])         .divide(aCount);     var bCount = total.subtract(aCount);
    var bMean = sum.subtract(aCount.multiply(aMean)).divide(bCount);     return aCount.multiply(aMean.subtract(mean).pow(2)).add(            bCount.multiply(bMean.subtract(mean).pow(2)));   });
  //  print(ui.Chart.array.values(ee.Array(bss), 0, means));
  return means.sort(bss).get([-1]); };  
var threshold = otsu(histogram.get('MNDWI_histogram')); //print('post 2017', threshold);