/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var S2 = ee.ImageCollection("COPERNICUS/S2"),
    DEM = ee.Image("USGS/SRTMGL1_003"),
    geometry = /* color: #d63000 */ee.Geometry.Point([141.97353565895875, 42.75552326262631]),
    inventories = ee.FeatureCollection("users/aufaristama/landslide_inventory_iburi");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
Map.centerObject(geometry, 11);
var ROI = geometry.buffer(25000);
var elevation = DEM.select('elevation')
.clip(ROI)
var terrain = ee.Terrain.products(elevation)
print('terrain', terrain);
var slope = terrain.select('slope')
//var fg_points = ee.FeatureCollection.randomPoints(inventories,1000, 0, 10);
//function
  // THRESHOLD
  // if threshold less or equal to 0 => 0 else 1
function threshold(image) {  
  var slope = terrain.select('slope')
  var thres = slope.gte(10).rename('thres')
  return image.addBands(thres);
}
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
function addindices(image) {
  var ndvi = image.normalizedDifference(['B8', 'B4']).rename(['ndvi']);
  var br = image.expression(' sqrt(((red * red)/(green*green))/2)',{
  'nir' : image.select('B8'),
  'red':image.select('B4'),
  'green':image.select('B3')
}).rename('br')
 var bsi = image.expression('((swir-swir2)/(swir+swir2))',{
  //'red':image.select('B4'),
  'swir':image.select('B11'),
  'swir2':image.select('B12'),
  'nir':image.select('B8')
}).rename('bsi')
  return image.addBands(ndvi).addBands(br).addBands(bsi);
}
/*function createTimeBand(image) {
  var year = image.date().difference(ee.Date('2015-09-01'),'year');
  return ee.Image(year).float().addBands(image);
}*/
var createTimeBand = function(image) {
  // Scale milliseconds by a large constant to avoid very small slopes
  // in the linear regression output.
  return image.addBands(image.metadata('system:time_start').divide(1e10));
}
var pre_event = S2.filterDate('2015-09-01', '2018-09-05')
.filterBounds(ROI)
.filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than', 30)
//.median()
.map(maskS2clouds)
.map(addindices)
.map(threshold)
print(pre_event, 'total_image_pre')
//Map.addLayer(terrain, {bands: ['hillshade']}, 'hillshade');
//Map.addLayer(terrain, {bands: ['slope']}, 'slope');
//Map.addLayer(pre_event.map(threshold), {bands: ['thres']}, 'threshold');
Map.addLayer(pre_event.median().clip(ROI), {bands: ['B4', 'B3', 'B2'], max: 0.5}, 'pre event');
//var post_event = S2.filterDate('2018-08-05', '2018-08-12')
var post_event = S2.filterDate('2018-09-07', '2020-09-01')
.filterBounds(ROI)
.filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than', 30)
.map(maskS2clouds)
.map(addindices)
.map(threshold)
var full_event = S2.filterDate('2015-09-01', '2020-09-01')
.filterBounds(ROI)
//filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than', 30)
//.map(maskS2clouds)
//var post_event = addIndices(post_event)
var with_indices = full_event.map(addindices);
//var greenest = with_indices.qualityMosaic('nd');
// Fit a linear trend to the sentinel-2.
var collectionndvi = full_event
.filterBounds(ROI)
    .map(addindices)
    .select('ndvi')
    .map(createTimeBand);
var fitndvi = collectionndvi.reduce(ee.Reducer.linearFit());
var collectionbsi = full_event
.filterBounds(ROI)
    .map(addindices)
    .select('bsi')
    .map(createTimeBand);
var fitbsi = collectionbsi.reduce(ee.Reducer.linearFit());
var collectionbr = full_event
.filterBounds(ROI)
    .map(addindices)
    .select('br')
    .map(createTimeBand);
var fitbr = collectionbr.reduce(ee.Reducer.linearFit());
print(with_indices, 'indices')
print(post_event, 'total_image_post')
Map.addLayer(post_event.mean().clip(ROI), {bands: ['B4', 'B3', 'B2'], max: 0.5}, 'post event');
//Map.addLayer(fitndvi.clip(ROI),{}, 'reg_ndvi');
//Map.addLayer(fitbsi.clip(ROI),{}, 'reg_bsi');
//Map.addLayer(fitbr.clip(ROI),{}, 'reg_br');
var Cindies_mult = post_event.max().subtract(pre_event.max());
var Cindies_add = pre_event.max().add(post_event.max());
var Cindies_sqrt = Cindies_add.sqrt();
var Cindies = (Cindies_mult.divide(Cindies_sqrt)).multiply(100)
var Cindies_band = Cindies.select('ndvi', 'bsi', 'br')
//var Cindies = Cindies_mult.divide((pre_event.mean().add(post_event.mean()))).sqrt()
//Map.addLayer(with_indices.median().clip(ROI),{},"full event");
//Map.addLayer(Cindies.clip(ROI),{},"change");
var cndvi = Cindies.select('ndvi').gt(-0.48).and(Cindies.select('ndvi').lt(-0.25))
var cbr = Cindies.select('br').gt(4.55).and(Cindies.select('br').lt(18.00))
var cbsi = Cindies.select('bsi').gt(-8.53).and(Cindies.select('ndvi').lt(-25.00))
//var ndvi = post_event.max().select('ndvi')
//var br= post_event.max().select('br')
//var bsi = post_event.max().select('bsi')
var rndvi = fitndvi.select('scale').gt(-8.00).and(fitndvi.select('scale').lt(-2.20))
var rbsi = fitbsi.select('scale').gt(-4.00).and(fitbsi.select('scale').lt(-0.90))
var rbr = fitbr.select('scale').gt(6.65).and(fitbr.select('scale').lt(29.00))
var topo = slope.gt(10)
// Create some binary images from thresholds on the indices.
// This threshold is designed to detect bare land.
//var landslide_s = bsi.gt(-0.29).and(bsi.lt(0.27).and(ndvi.gt(0.08).and(ndvi.lt(0.57))).and(br.gt(0.30).and(br.lt(0.43))).and(slope.gte(10))).selfMask();
//var landslide_t = cbsi.gt(-1.73).and(cbsi.lt(-0.30).and(cndvi.gt(-0.88).and(cndvi.lt(-0.25))).and(cbr.gt(0.18).and(cbr.lt(1.077))).and(slope.gte(10))).selfMask();
//var landslide = landslide_s.and(landslide_t)
var landslide_rule = cndvi.add(cbr).add(cbsi).add(rndvi).add(rbsi).add(rbr).add(topo)
var landslide = landslide_rule.gte(5).selfMask()
var a = ee.Image(fitndvi.select('scale')).rename('ndvi') // product one
var b = ee.Image(fitbr.select('scale')).rename('br')
var c = ee.Image(fitbsi.select('scale')).rename('bsi')
var final = a.addBands([b, c])
//var landslide_s = bsi.gt(-0.32).and(bsi.lt(0.14).and(ndvi.gt(0.09).and(ndvi.lt(0.65))).and(br.gt(0.22).and(br.lt(0.43))).and(slope.gte(10))).selfMask();
//var landslide_t = cbsi.gt(-1.57).and(cbsi.lt(-0.22).and(cndvi.gt(-0.86).and(cndvi.lt(-0.13))).and(cbr.gt(0.08).and(cbr.lt(1.077))).and(slope.gte(10))).selfMask();
//var landslide = landslide_s.and(landslide_t)
//Map.addLayer(landslide.clip(ROI),{},"landslide");
//Map.addLayer(final.clip(ROI),{},"trend landslide");
var vis = {min: 0, max: 4, palette: ['blue', 'limegreen', 'yellow', 'darkorange', 'red']};
Map.addLayer(landslide_rule.clip(ROI).visualize(vis),{},"Landslide");
var inventoriesGEE = landslide.reduceToVectors({
  geometry: ROI,
  scale: 10,
  geometryType: 'polygon',
  eightConnected: false,
  labelProperty: 'zone',
  maxPixels: 1e8
});
Map.addLayer(inventoriesGEE,  {palette: ['red']}, 'inventoriesGEE',1)
Export.image.toDrive({
  image: Cindies.select(['ndvi', 'br', 'bsi']), 
  description: 'Cindies',
  folder: 'Landslide_Aufar',
  region: ROI,                 // smaller area
  scale: 10
})
Export.image.toDrive({
  image: post_event.max().select(['ndvi', 'br', 'bsi']), 
  description: 'post_event', 
  folder: 'Landslide_Aufar', 
  region: ROI,                 // smaller area
  scale: 10
})
/*Export.image.toDrive({
  image: fitndvi.select(['scale']), 
  description: 'fitndvi', 
  folder: 'Landslide_Aufar', 
  region: ROI,                 // smaller area
  scale: 10
})
Export.image.toDrive({
  image: fitbsi.select(['scale']), 
  description: 'fitbsi', 
  folder: 'Landslide_Aufar', 
  region: ROI,                 // smaller area
  scale: 10
})
Export.image.toDrive({
  image: fitbr.select(['scale']), 
  description: 'fitbr', 
  folder: 'Landslide_Aufar', 
  region: ROI,                 // smaller area
  scale: 10
})*/
Export.image.toDrive({
  image: final.select(['ndvi','br','bsi']), 
  description: 'trendfinal', 
  folder: 'Landslide_Aufar', 
  region: ROI,                 // smaller area
  scale: 10
})
Export.image.toDrive({
  image: landslide_rule.select(['ndvi']), 
  description: 'weight_landslide', 
  folder: 'Landslide_Aufar', 
  region: ROI,                 // smaller area
  scale: 10
})
Export.table.toDrive({
  collection: inventoriesGEE,
  description:'inventories_iburi_2018',
  fileFormat: 'SHP'
});
///////////////////////////////////////////////////////////////////
// Interlude: Intro to User Interface API
// Create a panel to hold our widgets.
var inspectorPanel = ui.Panel({style: {width: '30%'}});
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Automatic Landslide Detection via Google Earth Engine',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
   ui.Label({
    value: 'This app is designed to produce rapid map landslide by taking advantage of Google Earth Engine. The Data derived from Sentinel-2-L1C satellite images. There are three indices were derived from this app, NDVI, NSDSI and Brightness Index. The app will produce automatic landslide inventories with a layer called "inventoriesGEE". This is a beta app, any comments or suggestions to improve this app can be sent to m.aufaristama@utwente.nl.',
    style: {fontSize: '12px', fontWeight: 'bold'}
  }),
     ui.Label({
    value: 'Red color in the "Landslide layer" indicate landslide. The test Area is Iburi,Hokkaido after 2018 earthquake',
    style: {fontSize: '12px', fontWeight: 'bold'}
  }),
    ui.Label({
    value: 'Click a landslide location to see the time series NDVI, NSDSI and Brightness Index',
    style: {fontSize: '12px', fontWeight: 'italic'}
})
]);
inspectorPanel.add(intro);
inspectorPanel.add(ui.Label('[Chart]'));
var panel = ui.Panel();
panel.style().set({
    position: 'bottom-left',
    height: '650px',
    width: '400px',
})
// Add the panel to the ui.root.
Map.add(panel)
panel.add(intro)
Map.onClick(function(coords) {
  // Add a red dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'FF0000'}, 'Clicked point');
  Map.layers().set(0, dot);
  // Make time series chart of NDVI
  var tsChart= ui.Chart.image.seriesByRegion(
    with_indices, point,ee.Reducer.max(), 'ndvi', 10, 'system:time_start', 'label')
        .setChartType('LineChart')
        .setOptions({
          title: 'NDVI (2015-2020)',
          vAxis: {title: 'NDVI'},
          hAxis: {title: 'Date', format: 'MM-yy', gridlines: {count: 6}},
          region: point, 
          lineWidth: 1,
          pointSize: 2,
          series: {
            0: {color: '0FFF00'}
          }})
  // Insert the chart widget into the panel          
  panel.widgets().set(0, tsChart);
    // Make time series chart of RBR
  var tsChart1= ui.Chart.image.seriesByRegion(
    with_indices, point,ee.Reducer.max(), 'br', 10, 'system:time_start', 'label')
        .setChartType('LineChart')
        .setOptions({
          title: 'BI (2015-2020)',
          vAxis: {title: 'BI'},
          hAxis: {title: 'Date', format: 'MM-yy', gridlines: {count: 6}},
          region: point, 
          lineWidth: 1,
          pointSize: 2,
          series: {
            0: {color: 'FF0000'}
          }})
           // Insert the chart widget into the panel          
  panel.widgets().set(1, tsChart1); 
    // Make time series chart of BSI
  var tsChart2= ui.Chart.image.seriesByRegion(
    with_indices, point,ee.Reducer.max(), 'bsi', 10, 'system:time_start', 'label')
        .setChartType('LineChart')
        .setOptions({
          title: 'NSDSI (2015-2020)',
          vAxis: {title: 'NSDSI'},
          hAxis: {title: 'Date', format: 'MM-yy', gridlines: {count: 6}},
          region: point, 
          lineWidth: 1,
          pointSize: 2,
          series: {
            0: {color: '0037FF'}
          }})
  // Insert the chart widget into the panel          
  panel.widgets().set(2, tsChart2);
});
//Map.addLayer(inventories, {}, 'inventories2018')
/*
// training region is the full image
var training = Cindies_band.sample({
  region: ROI,
  scale: 10,
  numPixels: 3000
});
// train cluster on image
var clusterer = ee.Clusterer.wekaKMeans(5).train(training);
// cluster the complete image
var result = Cindies_band.cluster(clusterer)
// Display the clusters with random colors.
Map.addLayer(result.randomVisualizer(), {}, 'clusters',0);
var landslide_cluster = result.lt(1).and(slope.gte(8)).selfMask();
Map.addLayer(landslide_cluster.randomVisualizer(), {}, 'landslide_clusters');
*/