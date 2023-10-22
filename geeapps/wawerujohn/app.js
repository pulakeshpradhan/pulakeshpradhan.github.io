var swarms = ui.import && ui.import("swarms", "table", {
      "id": "users/wawerujohn/Samburu_Final_Swarms_Folder/Shrubland_Swarms_2020"
    }) || ee.FeatureCollection("users/wawerujohn/Samburu_Final_Swarms_Folder/Shrubland_Swarms_2020"),
    admin = ui.import && ui.import("admin", "table", {
      "id": "users/wawerujohn/Samburu_Final_Swarms_Folder/Samburu_Admin_Iebc"
    }) || ee.FeatureCollection("users/wawerujohn/Samburu_Final_Swarms_Folder/Samburu_Admin_Iebc");
// This script designed to automatically assess and quantify locust damage using NDVI changes in Laikipia and Samburu counties
// It was written by John Waweru (wawerujohn10@gmail.com) to achieve the objectives of my masters thesis.
// For future adoption kindly check in to if there's an article associated with it by then.
//Swarm data preprocessing
// Get the geometry properties of the swarm invasion points
var geometry = swarms.geometry();
Map.centerObject(geometry);
// print the feature collection to inspect its properties
//print(swarms);
// // Show the Samburu aoi with a blue outline
// var aoi = ee.Image().byte().paint({featureCollection: geometry, color: 1, width: 3});
// //Add and center the outline
// Map.addLayer(aoi, {palette: ['blue']}, 'AOI')
// Map a function to buffer each swarm invasion point to a bounding box with an area of 1Ha
var invasionbuffer = swarms.map(function(feature) {
  var area = 10000;
  return feature.buffer(ee.Number(area).sqrt().divide(2), 1).bounds();
});
// Show the invasion areas with a red outline
var outline = ee.Image().byte().paint({
  featureCollection: invasionbuffer, 
  color: 1,
  width: 2
});
//Add and center the outline
//Map.addLayer(invasionbuffer, {palette: ['red']}, 'Invasion_Zones_AOIs');
// Add buffered bounding box to the map for each swarm invasion
Map.addLayer(outline, {palette: ['red']}, 'Invasion_Zones');
// Calculate area of one buffered invasion zone in Km2
var bbox = invasionbuffer.filter(ee.Filter.eq('system:index', '00000000000000000000'));
var bboxarea = bbox.geometry().area(1, 'EPSG:32636').divide(1e6);
//print('Bounding Box Area(Km2)', bboxarea);
// Confirm buffered area bounding box in Km2 to Ha
var bboxHa = bboxarea.multiply(100);
//print('Bounding Box Area(Ha)', bboxHa);
// Function to remove cloud and snow pixels from Sentinel-2 SR image
function maskCloudAndShadowsSR(image) {
  var cloudProb = image.select('MSK_CLDPRB');
  var snowProb = image.select('MSK_SNWPRB');
  var cloud = cloudProb.lt(5);
  var snow = snowProb.lt(5);
  var scl = image.select('SCL'); 
  var shadow = scl.eq(3); // 3 = cloud shadow
  var cirrus = scl.eq(10); // 10 = cirrus
  // Cloud probability less than 5% or cloud shadow classification
  var mask = cloud.and(cirrus.neq(1)).and(shadow.neq(1));
  return image.updateMask(mask);
}
// // Function to mask clouds using the Sentinel-2 QA band
// function maskS2clouds(image) {
//   var qa = image.select('QA60');
//   // Bits 10 and 11 are clouds and cirrus, respectively.
//   var cloudBitMask = 1 << 10;
//   var cirrusBitMask = 1 << 11;
//   // Both flags should be set to zero, indicating clear conditions.
//   var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
//       .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
//   return image.updateMask(mask).divide(10000).set({'system:index':image.get('system:index'),
//                                                   'system:time_start': image.get('system:time_start')});
// }
  // // ****************************************************************************************************************** \\ \\
 // // ************************************** BEFORE INVASION COMPUTATION ************************************************* \\ \\
// // ********************************************************************************************************************** \\ \\
// Add date property to the invasion buffers for selecting before and after images.
// Before and after images are selected based on the STARTDATE (date) property.
// Function to return the date property for a specific swarm invasion point.
function epoch2date(feature){
  var epoch = feature.get('STARTDATE');
  var date = ee.Date(epoch).format('YYYY-MM-dd');
  return feature.set('date', date);
}
// Apply the function to the invasion buffer feature collection.
var invasionbuffer = invasionbuffer.map(epoch2date);
// Print invasion buffers with the date property.
//print("Invasion_Buffers", invasionbuffer);
// Function to compute a before invasion Imagecollection
function dynamicDateBefore(feature){
  var swarmDate = ee.Feature(feature).get('STARTDATE');
  var beforeDate = ee.Date(swarmDate).advance(-11,'day'); 
  var Collection = ee.ImageCollection("COPERNICUS/S2_SR")
        .filter(ee.Filter.date(beforeDate, swarmDate))
        .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 70))
        .filter(ee.Filter.bounds(invasionbuffer.geometry()))
        .map(maskCloudAndShadowsSR);
  return ee.Image(Collection.median().clip(invasionbuffer.geometry()));
}
// Function to compute an after invasion Imagecollection
function dynamicDateAfter(feature){
  var swarmDate = ee.Feature(feature).get('STARTDATE');
  var afterDate = ee.Date(swarmDate).advance(11,'day');
  var Collection = ee.ImageCollection("COPERNICUS/S2_SR")
        .filter(ee.Filter.date(swarmDate, afterDate))
        .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 70))
        .filter(ee.Filter.bounds(invasionbuffer.geometry()))
        .map(maskCloudAndShadowsSR);
  return ee.Image(Collection.median().clip(invasionbuffer.geometry()));
}
// Each date iteration uses the date field from the invasion buffer 
// To filter for the before and after image at each invasion buffer
// Map the dynamic date before and after functions defined above 
// To the respective before and after image collections 
var beforeCollection = invasionbuffer.map(dynamicDateBefore);
var afterCollection = invasionbuffer.map(dynamicDateAfter);
// Add the before invasion image collections to the map
//print('Before_Invasion_Collection', beforeCollection);
// Add the after invasion image collections to the map
//print('After_Invasion_Collection', afterCollection);
// Get the before invasion image from the beforeCollection
var beforeImage = ee.ImageCollection(beforeCollection).median().clip(invasionbuffer.geometry());
// Get the after invasion image from the afterCollection
var afterImage = ee.ImageCollection(afterCollection).median().clip(invasionbuffer.geometry());
// Compute the before invasion NDVI and add it to the before invasion Image
// 'NIR' (B8) and 'RED' (B4)
var bfndvi = beforeImage.normalizedDifference(['B8', 'B4']).rename('ndvi');
var beforeImage = beforeImage.addBands(bfndvi);
//print(beforeImage, 'Bf')
// // Compute the after invasion NDVI and add it to the after Image
// // 'NIR' (B8) and 'RED' (B4)
// var afndvi = afterImage.normalizedDifference(['B8', 'B4']).rename('ndvi');
// afterImage = afterImage.addBands(afndvi);
// print before image to check if NDVI band was added
//print('Before_Image', beforeImage);
// Function to calculate the before invasion NDVI value using the invasion buffer geometry
function before(beforeImage){
  var bfndvi = beforeImage.normalizedDifference(['B8', 'B4']).rename('ndvi');
  var imageid = beforeImage.get('system:index');
  var splitid = ee.String(imageid).split("_").get(0);
  var invasion = invasionbuffer.filter(ee.Filter.eq('system:index', splitid)).first();
  var date = invasion.get('date');
  var img = bfndvi.select('ndvi').set('date',date);
  return img.reduceRegions({ 
  collection: invasionbuffer.geometry(),
  reducer: ee.Reducer.mean().setOutputs(['BF_NDVI']),
  scale: 10,
  });
}
// Map a function to compute before invasion NDVI over before invasion image collection
var beforeCollectionMeans = ee.ImageCollection(beforeCollection).map(before).flatten();
//print('Before_Collection_Means', beforeCollectionMeans);
// Function to set date property to a single before invasion image 
function addBeforeDate(image){
  var imageid = image.get('system:index');
  var splitid = ee.String(imageid).split("_").get(0);
  var invasion = invasionbuffer.filter(ee.Filter.eq('system:index', splitid)).first();
  var date = invasion.get('date');
  return image.set('date',date);
}
// Add date property to before invasion image collection 
beforeCollectionMeans = beforeCollectionMeans.map(addBeforeDate);
// Print before invasion date
//print('Before_collection_Means_With_Date', beforeCollectionMeans);
// // Visualize NDVI using a nice NDVI palette
// var palette = [
//   'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
//   '74A901', '66A000', '529400', '3E8601', '207401', '056201',
//   '004C00', '023B01', '012E01', '011D01', '011301'];
var palette = ['#d7191c','#fdae61','#ffffbf','#a6d96a','#1a9641'];
var bfndviVis = {bands:['ndvi'], min:0, max:1, palette: palette};
Map.addLayer(ee.Image(beforeImage), bfndviVis, 'bf_ndvi');
//print('beforeImage', beforeImage);
//Exporting before invasion mean ndvi values
Export.table.toDrive({
    collection: beforeCollectionMeans,
    description: 'Before_collection_Means_NDVI',
    folder: 'Samburu_Shrubland_Swarms_2017_Done',
    fileNamePrefix: 'Before_collection_Means_NDVI',
    fileFormat: 'CSV',
    selectors: 'BF_NDVI'
    });
  // // **************************************************************************************************************** \\ \\
 // // *************************************** AFTER INVASION COMPUTATION *********************************************** \\ \\
// // ******************************************************************************************************************** \\ \\
// Get the after invasion image from the afterCollection
var afterImage = ee.ImageCollection(afterCollection).median().clip(invasionbuffer.geometry());
// Calculate the after invasion NDVI and add it to the before Image
// 'NIR' (B8) and 'RED' (B4)
var afndvi = afterImage.normalizedDifference(['B8', 'B4']).rename('ndvi');
afterImage = afterImage.addBands(afndvi);
// print after image to check if NDVI band was added
//print('After_Image', afterImage);
//Add the after ndvi image to the console
var afndviVis = {bands:['ndvi'], min:0, max:1, palette: palette};
Map.addLayer(afterImage, afndviVis, 'af_ndvi');
// Extracting date property for an after invasion image from an invasion buffer
function after(afterImage){
  var afndvi = afterImage.normalizedDifference(['B8', 'B4']).rename('ndvi');
  var imageid = afterImage.get('system:index');
  var splitid = ee.String(imageid).split("_").get(0);
  var invasion = invasionbuffer.filter(ee.Filter.eq('system:index', splitid)).first();
  var date = invasion.get('date');
  var img = afndvi.select('ndvi').set('date',date);
  return img.reduceRegions({ 
  collection: invasionbuffer.geometry(),
  reducer: ee.Reducer.mean().setOutputs(['AF_NDVI']),
  scale: 10,
  });
}
// Map the function over the after collection to extract the date property for each after image
var afterCollectionMeans = ee.ImageCollection(afterCollection).map(after).flatten();
//print('After_Collection_Means', afterCollectionMeans);
// Function to set date property to a single after invasion image
function addAfterDate(image){
  var imageid = image.get('system:index');
  var splitid = ee.String(imageid).split("_").get(0);
  var invasion = invasionbuffer.filter(ee.Filter.eq('system:index', splitid)).first();
  var date = invasion.get('date');
  return image.set('date',date);
}
// Add date property to an after invasion image collection
afterCollectionMeans = afterCollectionMeans.map(addAfterDate);
// Print after invasion date
//print('After_collection_Means_With_Date', afterCollectionMeans);
//Exporting after invasion mean ndvi values
Export.table.toDrive({
    collection: afterCollectionMeans,
    description: 'After_collection_Means_NDVI',
    folder: 'Samburu_Shrubland_Swarms_2017_Done',
    fileNamePrefix: 'After_collection_Means_NDVI',
    fileFormat: 'CSV',
    selectors: 'AF_NDVI'
    });
  // // ************************************************************************************************************* \\ \\
 // // ******************************* NDVI CHANGE DETECTION & COMPUTATION ******************************************* \\ \\
// // ***************************************************************************************************************** \\ \\
// Select the NDVI band from the before and after invasion image
var AFNDVI = afterImage.select('ndvi');
var BFNDVI = beforeImage.select('ndvi');
//print(AFNDVI, 'AFNDVI')
//print(BFNDVI, 'BFNDVI')
// Compute the NDVI difference/change image.
var difference = AFNDVI.subtract(BFNDVI); 
//Positive difference image indicates NDVI loss in the after invasion image
//print('Difference_Image', difference);
//Extract before mean NDVI value
var bfMean = ee.Feature(beforeCollectionMeans.first()).get('BF_NDVI');
var afMean = ee.Feature(afterCollectionMeans.first()).get('AF_NDVI');
//print('Before_Mean_NDVI', bfMean);
//print('After_Mean_NDVI', afMean);
// Extract after mean NDVI value
var diff = ee.Number(afMean).subtract(ee.Number(bfMean));
//print('diff', diff);
// Get the difference mean NDVI value
// Features in the 3 feature collections should be iterated in sequence
// Convert all collection as list 
var l = beforeCollectionMeans.size();
var bfList = beforeCollectionMeans.toList(l);
var l = afterCollectionMeans.size();
var afList = afterCollectionMeans.toList(l);
// var l = afterCollectionMeans.size();
// var afList = afterCollectionMeans.toList(l);
var l = invasionbuffer.size();
var invaList = invasionbuffer.toList(l);
// Create an iterList to iterate over the three feature collections
var iterList = ee.List.sequence(0,l.subtract(1));
//print(iterList);
// Create a function to use .get(n) filter to get a particular feature from our 3 different feature collections
function df (n) {
  var invaBuff = ee.Feature(invaList.get(n));
  var af = ee.Feature(afList.get(n)).get('AF_NDVI');
  var bf = ee.Feature(bfList.get(n)).get('BF_NDVI');
  var diff = ee.Number(af).subtract(ee.Number(bf));
  return invaBuff.set('diff', diff);
}
// Map the extract function on the iterList feature collection
var dfMean = iterList.map(df);
//print('Difference_Mean_NDVI', dfMean);
// Convert dfMean List to FeatureCollection
var dfMeanFc = ee.FeatureCollection(dfMean);
//print(dfMeanFc);
// Exporting difference mean ndvi values
Export.table.toDrive({
    collection: dfMeanFc,
    description: 'Samburu_Cropland_Swarms_',
    folder: 'MASTERS_2021_FINAL',
    fileNamePrefix: 'Samburu_Cropland_Swarms_',
    fileFormat: 'CSV',
    });
var diffndviVis = {bands:['ndvi'], min:0, max:1, palette: palette};
Map.addLayer(difference.clip(invasionbuffer.geometry()), diffndviVis, 'diff_image');
  // // ***************************************************************************************************************\\ \\
 // // *********************************** CHANGE IMAGE RECLASSIFICATION ********************************************** \\ \\
// // *****************************************************************************************************************  \\ \\
//Reclassify the change image to identify NDVI loss, gain and no change classes
var classified = (difference//.multiply(0)
                  .where(difference.eq(0),1) //  No Change NDVI //   White
                  .where(difference.gt(-0.01),2) //  Gain NDVI      //   Green
                  .where(difference.lt(-0.01),3)); // Loss NDVI      //   Red
//print('change_image', classified)
// Add the classified image to the map console
var dfndviVis = {min: 1, max: 3, palette: ['white', 'green', 'red']};
Map.addLayer(classified.clip(invasionbuffer.geometry()), dfndviVis, 'df_ndvi');
//Mask out the NDVI loss pixels 
var loss = classified.eq(3).selfMask();
Map.addLayer(loss, {palette:'#de2d26'}, 'NDVI loss Pixels');
//Calculate total area of NDVI loss (m2)
var Ndviloss = loss.multiply(ee.Image.pixelArea());
var NdvilossareaM2 = Ndviloss.reduceRegion({reducer: ee.Reducer.sum(), geometry: invasionbuffer.geometry(), scale: 10, maxPixels: 1e13, bestEffort: true});
//print('Total_Loss_Area_m2', NdvilossareaM2);
//Convert m2 area to Sq.Km  (Km2)
var NdvilossareaKm = ee.Number(NdvilossareaM2.get('ndvi')).divide(1e6);
//print('Total_Ndvi_Loss_AreaKm', NdvilossareaKm);
//Convert m2 area to hectares (Ha)  
var NdvilossareaHa = ee.Number(NdvilossareaKm).multiply(100);
print('Total_Ndvi_Loss_AreaHa', NdvilossareaHa);
  // // ***************************************************************************************************************** \\ \\
 // // ************************************************ LAND COVER ANALYSIS ********************************************** \\ \\
// // ********************************************************************************************************************  \\ \\
function createColorBar(titleText, palette, min, max) {
  // Legend Title
  var title = ui.Label({
    value: titleText, 
    style: {fontWeight: 'bold', textAlign: 'center', stretch: 'horizontal'}});
  // Colorbar
  var legend = ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '200x20',
      format: 'png', 
      min: 0, max: 1,
      palette: palette},
    style: {stretch: 'horizontal', margin: '2px 2px', maxHeight: '40px'},
  });
  // Legend Labels
  var labels = ui.Panel({
    widgets: [
      ui.Label(min, {margin: '2px 5px',textAlign: 'left', stretch: 'horizontal'}),
      ui.Label((min+max)/2, {margin: '2px 5px', textAlign: 'center', stretch: 'horizontal'}),
      ui.Label(max, {margin: '2px 5px',textAlign: 'right', stretch: 'horizontal'})],
    layout: ui.Panel.Layout.flow('horizontal')});
  // Create a panel with all 3 widgets
  var legendPanel = ui.Panel({
    widgets: [title, legend, labels],
    style: {position: 'bottom-center', padding: '4px 5px'}
  })
  return legendPanel
}
// Call the function to create a colorbar legend  
var colorBar = createColorBar('NDVI Values', palette, -1, 1)
Map.add(colorBar)
// Building an APP
// Panels are the main container widgets
var mainPanel = ui.Panel({
  style: {width: '300px'}
});
var title = ui.Label({
  value: 'Nzige App',
  style: {'fontSize': '24px'}
});
// You can add widgets to the panel
mainPanel.add(title)
var author = ui.Label('Author: John')
mainPanel.add(author)
Map.setCenter(37.43, 1.4, 8)
ui.root.add(mainPanel);
var yearDropdown = ui.Select(['2019', '2020','2021'])
mainPanel.add(yearDropdown)
var areaDropdown = ui.Select(['Laikipia', 'Samburu', 'Combined'])
mainPanel.add(areaDropdown)
var indiceDropdown = ui.Select(['NDVI', 'EVI', 'SAVI', 'MSAVI'])
mainPanel.add(indiceDropdown)
var lulcDropdown = ui.Select(['Cropland', 'Forestland', 'Shrubland', 'Total'])
mainPanel.add(lulcDropdown)
var calcButton = ui.Button('Calculate')
mainPanel.add(calcButton)
var resetButton = ui.Button('Reset')
mainPanel.add(resetButton)
var buttonClicked = function (){
  print(yearDropdown.getValue())
}
// // On June 9, 2018 - A massive dust storm hit North India
// // This example shows before and after imagery from Sentinel-2
// // Display two visualizations of a map.
// // Set a center and zoom level.
// var center = {lon:37.1219, lat: 1.6147, zoom: 8};
// // Create two maps.
// var leftMap = ui.Map(center);
// var rightMap = ui.Map(center);
// // Remove UI controls from both maps, but leave zoom control on the left map.
// leftMap.setControlVisibility(false);
// rightMap.setControlVisibility(false);
// leftMap.setControlVisibility({zoomControl: true});
// // Link them together.
// var linker = new ui.Map.Linker([leftMap, rightMap]);
// // Create a split panel with the two maps.
// var splitPanel = ui.SplitPanel({
//   firstPanel: leftMap,
//   secondPanel: rightMap,
//   orientation: 'horizontal',
//   wipe: true
// });
// // Remove the default map from the root panel.
// ui.root.clear();
// // Add our split panel to the root panel.
// ui.root.add(splitPanel);
// var rgb_vis = {min: -1, max: 1, bands: ['ndvi']};
// var preLocust = ee.Image(BFNDVI)
// var postLocust = ee.Image(AFNDVI)
// // Add a RGB Landsat 8 layer to the left map.
// leftMap.addLayer(preLocust, rgb_vis);
// rightMap.addLayer(postLocust, rgb_vis);
// //import the Esri LULC dataset
// var esri_lulc10 = ee.ImageCollection("projects/sat-io/open-datasets/landcover/ESRI_Global-LULC_10m")
// // Show the study area aoi with a blue outline
// var outline = ee.Image().byte().paint({
//   featureCollection: admin, 
//   color: 1,
//   width: 8,
// });
// //Add and center the outline
// Map.addLayer(outline, {palette: ['blue']}, 'AOI')
// // Define a dictionary which will be used to make legend and visualize image on map
// var dict = {
//   "names": ["Water", "Trees", "Grass", "Flooded Vegetation", "Crops", "Scrub/Shrub", "Built Area", "Bare Ground", "Snow/Ice", "Clouds"],
//   "colors": [ "#1A5BAB", "#358221", "#A7D282", "#87D19E", "#FFDB5C", "#EECFA8", "#ED022A", "#EDE9E4", "#F2FAFF", "#C8C8C8"]};
// // Clip the data
// var esri_lulc_clip = esri_lulc10.mosaic().clip(admin);
// // Add image to the map
// //Map.addLayer(esri_lulc_clip, {min:1, max:10, palette:dict['colors']}, 'ESRI LULC 10m')
// Map.centerObject(admin, 8)
// //Calculating Total land cover area in Sq.Km
// var esri_lulc_clipar = esri_lulc_clip.multiply(ee.Image.pixelArea())
// var esri_lulc_cliparea = esri_lulc_clipar.reduceRegion({
//   reducer: ee.Reducer.sum(), 
//   geometry: admin, scale: 10, 
//   maxPixels: 1e13, 
//   bestEffort: true
// })
// //Convert m2 area to Sq.Km    
// var esri_lulc_clipAreaKm = ee.Number(esri_lulc_cliparea.get('b1')).divide(1e6)
// //print('Total_Land_Cover_Area_Km2', esri_lulc_clipAreaKm)
// //Convert Sq.Km to Hectares (ha)
// var esri_lulc_clipAreaHa = esri_lulc_clipAreaKm.multiply(100)
// //print('Total_Land_Cover_Area_Ha', esri_lulc_clipAreaHa)
// // Export the lulc dataset
// Export.image.toDrive({
//   image: esri_lulc_clip, 
//   description: 'Samburu_LULC_10m', 
//   folder: 'DATA', 
//   region: admin, 
//   scale: 10,
//   maxPixels: 1e13
// })
// // Selecting and Masking the landcover class you are interested in analyzing
// //Shrub land cover
// var shrub = esri_lulc_clip.eq(6).selfMask()
// // //Calculating Shrub land cover area in Sq.Km
// // var shrubar = shrub.multiply(ee.Image.pixelArea())
// // var shrubarea = shrubar.reduceRegion({
// //   reducer: ee.Reducer.sum(), 
// //   geometry: admin, 
// //   scale: 10, 
// //   maxPixels: 1e13, 
// //   bestEffort: true
// // })
// // //Convert m2 area to Sq.Km    
// // var shrubAreaKm = ee.Number(shrubarea.get('b1')).divide(1e6)
// // print('Shrub_Area_Km2', shrubAreaKm)
// // //Convert Sq.Km to Hectares (ha)
// // var shrubAreaHa = shrubAreaKm.multiply(100)
// // print('Shrub_Area_Ha', shrubAreaHa)
// // //Add Shrub land cover to the map canvas
// // Map.addLayer(shrub, {palette:'#EECFA8'}, 'Shrubland')
// // // // Export Shrub land cover
// // // Export.image.toDrive({
// // //   image: shrub, 
// // //   description: 'Samburu_Shrubland', 
// // //   folder: 'DATA', 
// // //   region: admin, 
// // //   scale: 10,
// // //   maxPixels: 1e13
// // // })
// // Selecting and Masking the landcover class you are interested in analyzing
// //Forest land cover
// var forest = esri_lulc_clip.eq(2).selfMask() 
// //Calculating Forest land cover area in Sq.Km
// var forestar = forest.multiply(ee.Image.pixelArea())
// var forestarea = forestar.reduceRegion({
//   reducer: ee.Reducer.sum(), 
//   geometry: admin, 
//   scale: 10, 
//   maxPixels: 1e13, 
//   bestEffort: true
// })
// //Convert m2 area to Sq.Km  
// var forestAreaKm = ee.Number(forestarea.get('b1')).divide(1e6)
// //print('Forest_Area_Km2', forestAreaKm)
// //Convert Sq.Km to Hectares (ha)
// var forestAreaHa = forestAreaKm.multiply(100)
// //print('Forest_Area_Ha', forestAreaHa)
// //Add Forest land cover to the map canvas
// Map.addLayer(forest, {palette:'#358221'}, 'Forestland')
// // Export Forest land cover
// Export.image.toDrive({
//   image: forest, 
//   description: 'Samburu_Forestland', 
//   folder: 'DATA', 
//   region: admin, 
//   scale: 10, 
//   maxPixels: 1e13
// })
// // Selecting and Masking the landcover class you are interested in analyzing
// // Crop land cover
// var crop = esri_lulc_clip.eq(5).selfMask() 
// //Calculating Crop land cover area in Sq.Km
// var cropar = crop.multiply(ee.Image.pixelArea())
// var croparea = cropar.reduceRegion({
//   reducer: ee.Reducer.sum(), 
//   geometry: admin, 
//   scale: 10, 
//   maxPixels: 1e13, 
//   bestEffort: true
// })
// //Convert m2 area to Sq.Km  
// var cropAreaKm = ee.Number(croparea.get('b1')).divide(1e6)
// //print('Cropland_Area_Km2', cropAreaKm)
// //Convert Sq.Km to Hectares (ha)
// var cropAreaHa = cropAreaKm.multiply(100)
// //print('Cropland_Area_Ha', cropAreaHa)
// //Add Crop land cover to the map canvas
// Map.addLayer(crop, {palette:'#FFDB5C'}, 'Cropland')
// // Export Crop land cover
// Export.image.toDrive({
//   image: crop, 
//   description: 'Samburu_Cropland', 
//   folder: 'DATA', 
//   region: admin, 
//   scale: 10,
//   maxPixels: 1e13
// })
// // Selecting and Masking grassland landcover dataset
// // Vegetation and Flooded vegetation land cover
// var vegetation = esri_lulc_clip.eq(4)
// var floodVeg = esri_lulc_clip.eq(3)
// var grassland = vegetation.add(floodVeg).selfMask() 
// //Merge Shrubland and Grassland landcovers
// var shrubland = shrub.blend(grassland).selfMask()
// //Calculating Grass land cover area in Sq.Km
// var shrublandar = shrubland.multiply(ee.Image.pixelArea())
// var shrublandarea = shrublandar.reduceRegion({
//   reducer: ee.Reducer.sum(), 
//   geometry: admin, 
//   scale: 10, 
//   maxPixels: 1e13, 
//   bestEffort: true
// });
// // Export shrubland land cover
// Export.image.toDrive({
//   image: shrubland, 
//   description: 'Samburu_Shrubland', 
//   folder: 'DATA', 
//   region: admin, 
//   scale: 10, 
//   maxPixels: 1e13
// });
// //Convert m2 area to Sq.Km  
// var shrublandKm = ee.Number(shrublandarea.get('b1')).divide(1e6);
// //print('PastureLand_Area_Km2', pastureLandKm)
// //Convert Sq.Km to Hectares (ha)
// var shrublandHa = shrublandKm.multiply(100)
// //print('shrubLand_Area_Ha', shrublandHa)
// //Add shrub land cover to the map canvas
// Map.addLayer(shrubland, {palette:'#EECFA8'}, 'Shrubland')
// //Merge the four landcovers of interest for analysis
// var mergeLulc = crop.addBands(forest).addBands(shrubland)
// //print(mergeLulc)
// //Export the landcovers of interest
// Export.image.toDrive({
//   image: mergeLulc, 
//   description: 'Samburu_Landcover_AddBands', 
//   folder: 'SAMBURU',  
//   region: admin, 
//   scale: 10, 
//   maxPixels: 1e13, 
// })
// // Create a legend for the map
// var legend = ui.Panel({style: {position: 'middle-right', padding: '8px 15px'}});
// var makeRow = function(color, name) {
//   var colorBox = ui.Label({
//     style: {color: '#ffffff',
//       backgroundColor: color,
//       padding: '10px',
//       margin: '0 0 4px 0',
//     }
//   });
//   var description = ui.Label({
//     value: name,
//     style: {
//       margin: '0px 0 4px 6px',
//     }
//   }); 
//   return ui.Panel({
//     widgets: [colorBox, description],
//     layout: ui.Panel.Layout.Flow('horizontal')}
// )};
// var title = ui.Label({
//   value: 'Legend',
//   style: {fontWeight: 'bold',
//     fontSize: '16px',
//     margin: '0px 0 4px 0px'}});
// legend.add(title);
// legend.add(makeRow('#FFDB5C','Cropland'))
// legend.add(makeRow('#358221','Forestland'))
// legend.add(makeRow('#EECFA8','Shrubland'))
// Map.add(legend);