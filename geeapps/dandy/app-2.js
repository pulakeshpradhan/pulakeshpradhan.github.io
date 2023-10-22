// Land cover change analysis.
var lastEdit = '2021.03.23';
var assignAs = 'app-2';
var path = 'users/dandy/others/demo/proto_DEV';
/***** Data Preparation *****/ 
// Target area.
var targetArea = ee.FeatureCollection("users/dandy/melawi");
// Set default center.
Map.centerObject(targetArea,9);
Map.addLayer(ee.Image().paint(targetArea,1,2),{palette:['Black']},'Target Area');
// Image collections
var L8SR = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR");
// var L7SR = ee.ImageCollection("LANDSAT/LE07/C01/T1_SR");
// var L5SR = ee.ImageCollection("LANDSAT/LT05/C01/T1_SR");
// var L578 = L8SR.merge(L7SR).merge(L5SR);
// Image filtering - Best Image of First Semester.
var imageFilter_firstSem = ee.ImageCollection(ee.List.sequence(2015, 2020, 1).map( function(year){
  return L8SR.filter(ee.Filter.and(ee.Filter.calendarRange(1, 6, 'month'), ee.Filter.calendarRange(year, year, 'year')))
            // .filterBounds(targetArea)
             .filterMetadata('WRS_PATH','equals',120) // WRS_PATH of targetArea.
             .filterMetadata('WRS_ROW','equals',60) // WRS_ROW of targetArea.            
             .sort('CLOUD_COVER_LAND')
             .first();             
}));
// Image filtering - Best Image of Second Semester.
var imageFilter_secondSem = ee.ImageCollection(ee.List.sequence(2015, 2020, 1).map( function(year){
  return L8SR.filter(ee.Filter.and(ee.Filter.calendarRange(7, 12, 'month'), ee.Filter.calendarRange(year, year, 'year')))
            // .filterBounds(targetArea)
            .filterMetadata('WRS_PATH','equals',120) // WRS_PATH of targetArea.
            .filterMetadata('WRS_ROW','equals',60) // WRS_ROW of targetArea.               
            .sort('CLOUD_COVER_LAND')
            .first();
}));
// Image Filtering - Merge image collections.
var imageFilter = imageFilter_firstSem.merge(imageFilter_secondSem).sort('system:time_start');
print('imageFilter',imageFilter,imageFilter.aggregate_array('SENSING_TIME'),imageFilter.aggregate_array('CLOUD_COVER_LAND'))
// Map.addLayer(imageFilter.first().clip(targetArea),{bands:['B4','B3','B2'],min:0,max:2000},'imageFilter_select')
// var imageFilter_select = ee.Image(imageFilter.toList(imageFilter.size()).get(0));
// Map.addLayer(imageFilter_select.clip(targetArea),{bands:['B4','B3','B2'],min:0,max:2000},'imageFilter_select');
// print('imageFilter_select',imageFilter_select.get('CLOUD_COVER_LAND'))
// Apply cloud masking function.
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
var imageFilter_cloudmasked = imageFilter.map(maskL8sr).select(['B2','B3','B4','B5','B6','B7']);
print('imageFilter_cloudmasked',imageFilter_cloudmasked)
// Map.addLayer(imageFilter_cloudmasked.first().clip(targetArea),{bands:['B4','B3','B2'],min:0,max:0.2},'imageFilter_cloudmasked')
// var imageFilter_cloudmasked_select = ee.Image(imageFilter_cloudmasked.toList(imageFilter_cloudmasked.size()).get(0));
// Map.addLayer(imageFilter_cloudmasked_select.clip(targetArea),{bands:['B4','B3','B2'],min:0,max:0.2},'imageFilter_cloudmasked_select');
// Add NDVI and NDWI.
function L8_indices (image) {
  var input = ee.Image(image);
  var derive_NDVI = input.normalizedDifference(['B5','B4']).select([0], ['ndvi']);
  var derive_NDWI = input.normalizedDifference(['B5','B6']).select([0], ['ndwi']);
  var output = ee.Image(image).addBands(derive_NDVI.select('ndvi')).addBands(derive_NDWI.select('ndwi'));
return output;  
}  
var imageFilter_indices = imageFilter_cloudmasked.map(L8_indices);
print('imageFilter_indices',imageFilter_indices)
/***** Image Clustering *****/  
// Define input for clustering.
var input_clustering = ee.Image(imageFilter_indices.toList(imageFilter_indices.size()).get(0));
ee.Date(input_clustering.get('system:time_start')).format('yyyy/MMM/dd').evaluate(function(input_clustering_timeStart){
  Map.addLayer(input_clustering.clip(targetArea),{bands:['B4','B3','B2'],min:0,max:0.15},'Landsat-8 SR '+input_clustering_timeStart);
});
// Make the training dataset.
var training = input_clustering.sample({
  region: targetArea,
  scale: 30,
  numPixels: 5000
});
// Instantiate the clusterer and train it.
var clusterer = ee.Clusterer.wekaKMeans(10).train(training);
// Cluster the input using the trained clusterer.
var result = input_clustering.cluster(clusterer);
// print('result',result)
// Display the clusters.
// Map.addLayer(result.clip(targetArea).randomVisualizer(), {}, 'clusters')
// // Edit clusters
// // 0 Cloud/Shadow/Water    (Black)
// // 1 Artificial/Bareland   (Red)
// // 2 Vegetation            (Green)
// var cluster_visParams = {palette:['Green',  // 0 - 2
//                                   'Green',  // 1 - 2
//                                   'Black',  // 2 - 0
//                                   'Green',  // 3 - 2
//                                   'Black',  // 4 - 0
//                                   'Black',  // 5 - 0
//                                   'Green',  // 6 - 2
//                                   'Red',    // 7 - 1
//                                   'Red',    // 8 - 1
//                                   'Green'   // 9 - 2
// ],min:0,max:9};
// // Map.addLayer(result.clip(targetArea),cluster_visParams,'clusters_edit')
// // Remap clusters.
// var result_remap = result.remap([0,1,2,3,4,5,6,7,8,9],[2,2,0,2,0,0,2,1,1,2]).selfMask();
// var remap_visParams = {palette:['Black','Red','Green'],min:0,max:2};
// // Map.addLayer(result_remap.clip(targetArea),remap_visParams,'remap')
/***** Land Cover *****/  
function getLC (image) {
  var input_image = ee.Image(image);
  var landCover = input_image.cluster(clusterer);
  var output_image = landCover.remap([0,1,2,3,4,5,6,7,8,9],[2,2,0,2,0,0,2,1,1,2]).selfMask()
                              .copyProperties(ee.Image(image),['system:time_start']);
return output_image;  
}  
var landCover_coll = imageFilter_indices.map(getLC);
print('landCover_coll',landCover_coll)
// print('landCover_coll',landCover_coll.aggregate_array('system:time_start'))
// Map.addLayer(ee.Image(landCover_coll.toList(landCover_coll.size()).get(0)).clip(targetArea),remap_visParams,'landCover_coll #0');
// Map.addLayer(ee.Image(landCover_coll.toList(landCover_coll.size()).get(1)).clip(targetArea),remap_visParams,'landCover_coll #1');
/***** Land Cover Change *****/ 
// Merge ref and target land cover.
var ref_landCover = landCover_coll.toList(landCover_coll.size()).splice(-1,1);
var target_landCover = landCover_coll.toList(landCover_coll.size()).splice(0,1);
var pair_landCover = ref_landCover.zip(target_landCover);
print('pair_landCover',pair_landCover)
// Extract land cover change.
function getChange (pair) {
  var input_ref = ee.Image(ee.List(pair).get(0));                           
  var input_target = ee.Image(ee.List(pair).get(1));
  var ref_timeStart = input_ref.get('system:time_start');
  var target_timeStart =input_target.get('system:time_start');
  var ref_date = ee.Date(ref_timeStart).format('yyyy/MMM/dd');
  var target_date = ee.Date(target_timeStart).format('yyyy/MMM/dd');
  var output = input_ref.subtract(input_target)
                        .selfMask() // omit "0" , i.e., not-change
                        .uint8()    // omit "-1" , i.e., re-growth
                        .set('ref_timeStart',ref_timeStart).set('target_timeStart',target_timeStart)
                        .set('ref_date',ref_date).set('target_date',target_date)                        
return output;  
}
var change_coll = pair_landCover.map(getChange);
print('change_coll',change_coll)
// print(ee.ImageCollection(change_coll).aggregate_array('target_date'))
// // Get statistics.
// function getStat (image,scale) {
//   return image.reduceRegion({reducer:ee.Reducer.frequencyHistogram(),geometry:targetArea,scale:scale,maxPixels:1e13,tileScale:4});
// }
// // print(getStat(ee.ImageCollection(change_coll).first()))
// // Map.addLayer(ee.Image(ee.ImageCollection(change_coll).toList(change_coll.size()).get(0)).clip(targetArea),{palette:['Black','Blue'],min:0,max:1},'change_coll #0-1');
/***** Land Cover Change Area and Chart *****/
// Function for vectorization.
function getVector (input_image,input_scale,input_geometry,input_type) {
  // Perform data conversion.
  var reduceToVector = ee.Image(input_image).reduceToVectors({geometry:input_geometry,scale:input_scale,geometryType:input_type,
                                                              eightConnected:false,labelProperty:'event',maxPixels:1e13});
  // Define output.
  var output = reduceToVector;
return output;   
}
// Function to build table.
function getChangeArea (image) {
  var changeArea_image = ee.Image(image).multiply(ee.Image.pixelArea()).divide(1e6); // divide 1e6 to get sqKM unit.
  var reduceRegion_sum = {reducer:ee.Reducer.sum(),geometry:targetArea,scale:30,maxPixels:1e13,tileScale:4};  
  var changeArea_sqKM = ee.Number(changeArea_image.select('remapped').reduceRegion(reduceRegion_sum).get('remapped')).ceil();
  var ref_timeStart = ee.Image(image).get('ref_timeStart');
  var target_timeStart = ee.Image(image).get('target_timeStart');
  var ref_date = ee.Image(image).get('ref_date');  
  var target_date = ee.Image(image).get('target_date');  
return ee.Feature(targetArea.geometry().centroid(),{ref_date:ref_date,target_date:target_date,
                                                    ref_timeStart:ref_timeStart,target_timeStart:target_timeStart,
                                                    changeArea_sqKM:changeArea_sqKM}); 
}
// Generate table.
var changeArea_coll = change_coll.map(getChangeArea);
print('changeArea_coll',changeArea_coll)
// Build chart.
var changeArea_chart = ui.Chart.feature.byFeature(changeArea_coll,'target_timeStart',['changeArea_sqKM']);
changeArea_chart.setOptions({title:'Land Cover Change Analysis',titleTextStyle:{bold:true,fontSize:15}, pointSize: 8,
                            interpolateNulls:true,vAxis:{title:'Area (sqKM)'},hAxis:{title:'Time'}});
changeArea_chart.style().set({
  position: 'bottom-left',
  width: '500px',
  height: '300px',
  border:'1px solid black'
});
Map.add(changeArea_chart)
// Build label.
var label = ui.Label('Click a point on the chart to show images for that period.',
                    {fontWeight:'bold',fontSize:'15px',color:'Black',border:'1px solid black'});
Map.add(label)
// Interactive image.
changeArea_chart.onClick(function(xValue, yValue, seriesName) {
  if (!xValue) return;  // Selection was cleared.
  // Show the image for the clicked date.
  var change_equalDate = ee.Filter.equals('target_timeStart', xValue);
  var L8SR_equalDate = ee.Filter.equals('system:time_start', xValue);
  var change_image = ee.Image(ee.ImageCollection(change_coll).filter(change_equalDate).first());
  var change_polygon = getVector(change_image.clip(targetArea),30,targetArea,'polygon');
  var L8SR_image = ee.Image(ee.ImageCollection(imageFilter_indices).filter(L8SR_equalDate).first());
  // print(L8SR_image)
  var ref_date = change_image.get('ref_date');  
  var target_date = change_image.get('target_date'); 
  ref_date.evaluate(function(ref_date_i){
    target_date.evaluate(function(target_date_i){
        Map.addLayer(L8SR_image.clip(targetArea),{bands:['B4','B3','B2'],min:0,max:0.15},'Landsat-8 SR '+target_date_i)
        // Map.addLayer(change_image.clip(targetArea),{palette:'Red'},'Change '+ref_date_i+' - '+target_date_i)
        Map.addLayer(change_polygon,{color:'Red'},'Change '+ref_date_i+' - '+target_date_i)
    })
  })      
});