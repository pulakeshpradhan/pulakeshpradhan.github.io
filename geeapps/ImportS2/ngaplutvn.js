var table = ui.import && ui.import("table", "table", {
      "id": "users/ImportS2/VientnamZone"
    }) || ee.FeatureCollection("users/ImportS2/VientnamZone");
// var geometry = ui.import && ui.import(geometry, "geometry", {
//       geometries: [
//         {
//           type: Polygon,
//           coordinates: [
//             [
//               [
//                 61.45899294480225,
//                 25.139716550822897
//               ],
//               [
//                 66.77637575730225,
//                 25.97226945460992
//               ],
//               [
//                 68.22657106980225,
//                 23.940474481492522
//               ],
//               [
//                 70.86328981980225,
//                 24.701327349532676
//               ],
//               [
//                 69.45703981980225,
//                 27.385816858253925
//               ],
//               [
//                 71.52246950730225,
//                 28.00837107751855
//               ],
//               [
//                 74.59864138230225,
//                 30.651524251758406
//               ],
//               [
//                 73.01661013230225,
//                 34.32021211371885
//               ],
//               [
//                 70.16016481980225,
//                 34.3564986741881
//               ],
//               [
//                 69.14942263230225,
//                 31.629438528770073
//               ],
//               [
//                 66.38086794480225,
//                 30.006704411000445
//               ],
//               [
//                 61.45899294480225,
//                 30.196797645109093
//               ],
//               [
//                 63.61231325730225,
//                 26.95576332281894
//               ]
//             ]
//           ],
//           evenOdd: true
//         }
//       ],
//       displayProperties:[],
//       properties: {},
//       color: '#d63000',
//       mode: 'Geometry',
//       shown: 'false',
//       locked: 'false'
//     }) || 
    /* color: #d63000 */
    /* shown: false */
// Set Google Terrain as the basemap
// Map.setOptions('TERRAIN');
// Set dates for pre- and post-hurricane event
var pre_event_beg = '2022-07-30'; 
var pre_event_final = '2022-08-20';
var post_event_beg = '2022-08-20'; 
var post_event_final = '2022-09-30';
// Load the shapefile for your area of interest
// var roi = ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level0").filter(ee.Filter.eq('ADM0_NAME', 'Vietnam'));
Map.addLayer(table, {color: 'gray'}, 'Study Area',0);
Map.centerObject(table,2);
////////////////////////Precipitation/////////////////////////////////////////////
// GPM V6 30 minute precipitation data before hurricane Ida 
var range = ee.DateRange('2022-06-01', '2022-09-30');
var datasetPre = ee.ImageCollection('NASA/GPM_L3/IMERG_V06')
    .filter(ee.Filter.date(range))
    .filterBounds(table);
// Select sum of precipitation and mask out  precipitation < 5.0 mm values.
var precipitationPre = datasetPre.select('precipitationCal').sum();
var mask = precipitationPre.gt(5.0);
var precipitationPre = precipitationPre.updateMask(mask);
var palette = [
  '000096','0064ff', '00b4ff', '33db80', '9beb4a',
  'ffeb00', 'ffb300', 'ff6400', 'eb1e00', 'af0000'
];
// display total precipitation 
var precipitationVis = {min: 5.0, max:1000.0, palette: palette};
Map.addLayer(precipitationPre, precipitationVis, 'Pre Event Precipitation',0);
// GPM V6 30 minute data post hurricane Ida 
var range = ee.DateRange(post_event_beg, post_event_final);
var datasetPost = ee.ImageCollection('NASA/GPM_L3/IMERG_V06')
    .filter(ee.Filter.date(range))
    .filterBounds(table);
// Select sum of precipitation and mask out  precipitation < 5.0 mm values.
var precipitationPost = datasetPost.select('precipitationCal').sum();
var mask = precipitationPost.gt(5.0);
var precipitationPost = precipitationPost.updateMask(mask);
var palette = [
  '000096','0064ff', '00b4ff', '33db80', '9beb4a',
  'ffeb00', 'ffb300', 'ff6400', 'eb1e00', 'af0000'
];
// display total precipitation 
var precipitationVis = {min: 5.0, max:1000.0, palette: palette};
Map.addLayer(precipitationPost, precipitationVis, 'Post Event Precipitation', 0);
// Calculate precipitation difference pre and post event
var precipitationDiff = precipitationPost.subtract(precipitationPre);
var palette = [ '000096','0064ff', '00b4ff', '33db80', '9beb4a',
  'ffeb00', 'ffb300', 'ff6400', 'eb1e00', 'af0000'];
var precipitationVis = {min: 5.0, max:700.0, palette: palette};
Map.addLayer(precipitationDiff, precipitationVis, 'Precipitation Difference', 0);
// Calculate precipitation time series
var precipitation = datasetPost.select('precipitationCal');
var precipTs = ui.Chart.image.seriesByRegion ({
  imageCollection: precipitation,
  regions: table,
  reducer: ee.Reducer.mean(),
  scale:10000,
  seriesProperty: 'NAME'
})
.setOptions ({
  title: 'Precipitation Rate',
  vAxis: {title: 'IMERG', maxValue: 5, minValue: 0.5},
  hAxis: {title: 'date', format: 'dd:hhmm', gridlines: {count:24}}
});
// print(precipTs);
////////////////////////////Image Collections//////////////////////////////////////
// Load Sentinel-1 C-band SAR Ground Range collection (log scale): pre-event
var S1collection_1 = ee.ImageCollection('COPERNICUS/S1_GRD')
.filter(ee.Filter.eq('instrumentMode', 'IW'))
.filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'))
.filterMetadata('resolution_meters', 'equals' , 10)
.filterBounds(table)
.filterDate(pre_event_beg, pre_event_final)
.select('VV', 'VH');
print(S1collection_1, 'Pre-Event Collection'); 
// Load Sentinel-1 C-band SAR Ground Range collection (log scale): post-event
var S1collection_2 = ee.ImageCollection('COPERNICUS/S1_GRD')
.filter(ee.Filter.eq('instrumentMode', 'IW'))
.filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'))
.filterMetadata('resolution_meters', 'equals' , 10)
.filterBounds(table)
.filterDate(post_event_beg, post_event_final)
.select('VV', 'VH');
print(S1collection_2, 'Post-Event Collection'); 
// Create a mosaic for each collection
var S1_1 = S1collection_1.mosaic().clip(table);
var S1_2 = S1collection_2.mosaic().clip(table);
// Apply speckle filter
var SMOOTHING_RADIUS = 30;
var pre_event_filtered = S1_1.focal_mean(SMOOTHING_RADIUS, 'circle', 'meters');
var post_event_filtered = S1_2.focal_mean(SMOOTHING_RADIUS, 'circle', 'meters');
// Add images to ""Layers"" in order to visualize them
Map.addLayer(S1_1, {min:-25,max:-5}, 'S1-1',0);
Map.addLayer(S1_2, {min:-25,max:-5}, 'S1-2',0);
Map.addLayer(pre_event_filtered, {min:-25,max:-5}, 'S1-1-Filt',0);
Map.addLayer(post_event_filtered, {min:-25,max:-5}, 'S1-2-Filt',0);
// Create RGB images
var S1_VV_RGB = ee.Image.cat(pre_event_filtered.select('VV'), post_event_filtered.select('VV'), pre_event_filtered.select('VV'));
var S1_VH_RGB = ee.Image.cat(pre_event_filtered.select('VH'), post_event_filtered.select('VH'), pre_event_filtered.select('VH'));
Map.addLayer(S1_VV_RGB, {min:-18,max:0}, 'S1-VV-RGB', 0);
Map.addLayer(S1_VH_RGB, {min:-25,max:-5}, 'S1-VH-RGB', 0);
// Substract after and before images. NOTE: In order to substract logarithmic values (dB) - you must perform a division
var differenceVH= post_event_filtered.select('VH').divide(pre_event_filtered.select('VH'));
Map.addLayer(differenceVH, {min: 0,max:2}, 'difference VH filtered', 0);
// Apply a threshold - based on difference image values
var UPPER_THRESHOLD = 1.15;
var LOWER_THRESHOLD = 0.7;
var inundation1 = differenceVH.gt(UPPER_THRESHOLD).or(differenceVH.lt(LOWER_THRESHOLD));
Map.addLayer(inundation1.updateMask(inundation1),
{palette:"ee360c"},'Flooded Areas - Red',0);
// Calculate pixel connectivity and remove those connected by 5 or less pixels.
var connections = inundation1.connectedPixelCount();    
var inundation2 = inundation1.updateMask(connections.gte(8));
Map.addLayer(inundation2.updateMask(inundation2),
{palette:"199911"},'Flooded Areas - Green',0);
// Remove misclassified pixels in areas with slopes greater than 5%
var srtm = ee.Image('USGS/SRTMGL1_003');
var terrain = ee.Algorithms.Terrain(srtm);
var slope = terrain.select('slope');
var inundation3 = inundation2.updateMask(slope.lt(5));
Map.addLayer(srtm, {min:0,max:1000}, 'SRTM', 0);
Map.addLayer(inundation3.updateMask(inundation3),
{palette:"ec11d1"},'Flooded Areas - Pink',0);
// Calculate inundation extent. Create a raster that contains information on pixel area
var inundation_area_pixel = inundation3
  .multiply(ee.Image.pixelArea());
// Sum the area covered by inundated pixels
// 'bestEffort: true' to reduce processing time. Note - for more accurate results set 
// bestEffort to false and increase 'maxPixels'. 
var inundation_stats = inundation_area_pixel.reduceRegion({
  reducer: ee.Reducer.sum(),              
  geometry: table,
  scale: 10, // native resolution
  // maxPixels: 1e9,
  bestEffort: true
  });
// Convert inundated extent to hectares  
var inundation_area_ha = inundation_stats
  .getNumber("VH")
  .divide(10000)
  .round(); 
print(inundation_area_ha, 'Hectares of Inundated Area'); 
// Function to mask clouds using the Sentinel-2 QA band
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
// Set visualization parameters for S2 imagery
var vizParams = {
  bands: ['B4', 'B3', 'B2'],
  min: 0,
  max: 0.4,
  gamma: [0.98, 1.1, 1]
};
// Create a variable for post-flooding Sentinel-2 TOA imagery
// and filter by cloud cover (<10%), date, roi, and apply cloud mask
var post_Flood = ee.ImageCollection('COPERNICUS/S2')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
  .filterDate('2022-07-30', '2022-08-30')
  .filterBounds(table)
  .map(maskS2clouds);
// Print results to Console
print(post_Flood);
// Take median pixel value from time series and add as a Layer
var medianpixels1 = post_Flood.mean();
var medianpixelsclipped1 = medianpixels1.clip(table);
Map.addLayer(medianpixelsclipped1, vizParams, 'Post-Flood S2', 0);
Map.centerObject(table, 7);
// Create a variable for pre-hurricane Sentinel-2 TOA imagery
// and filter by cloud cover (<10%), date, roi, and apply cloud mask
var pre_Flood = ee.ImageCollection('COPERNICUS/S2')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
  .filterDate('2022-08-30', '2022-09-30')
  .filterBounds(table)
  .map(maskS2clouds);
// Print results to Console
print(pre_Flood);
// Take median pixel value from time series and add as a Layer
var medianpixels2 = pre_Flood.mean();
var medianpixelsclipped2 = medianpixels2.clip(table);
Map.addLayer(medianpixelsclipped2, vizParams, 'Pre-Flood S2', 0);
// Create post-hurricane NDVI
var post_ndvi = medianpixels1.normalizedDifference(['B8', 'B4']);
// Set visualization parameters for NDVI
var visParams_ndvi = {min: -0.2, max: 0.8, 
  palette: ['blue', 'white', 'yellow', 'green']
};
// Clip post-hurricane NDVI to roi
var post_ndvi_clip = post_ndvi.clip(table);
// Add post-hurricane NDVI as a Layer
Map.addLayer(post_ndvi_clip, visParams_ndvi, 'Post-Flood NDVI', 0);
// Create pre-hurricane NDVI
var pre_ndvi = medianpixels2.normalizedDifference(['B8', 'B4']);
var pre_ndvi_clip = pre_ndvi.clip(table);
// Add pre-hurricane NDVI as a Layer
Map.addLayer(pre_ndvi_clip, visParams_ndvi, 'Pre-Flood NDVI', 0);
// Create NDVI Difference Map
var NDVI_diff = pre_ndvi_clip.subtract(post_ndvi_clip);
Map.addLayer(NDVI_diff,
             {min: -0.2, max: 0.2, 
             palette: ['green', 'yellow', 'red']},
             'NDVI Difference', 0);
// Import JRC Global Human Settlement Popluation Density layer (250m) - number of people per cell
var population_count = ee.Image('JRC/GHSL/P2016/POP_GPW_GLOBE_V1/2015').clip(table);
// Create a raster showing exposed population only using the resampled flood layer
var population_exposed = population_count
  .updateMask(inundation3)
  .updateMask(population_count);
// Sum pixel values of exposed population raster 
var stats = population_exposed.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: table,
  scale: 250,
  maxPixels:1e9 
});
// Get number of exposed people as integer
var number_pop_exposed = stats.getNumber('population_count').round();
print (number_pop_exposed, 'Exposed population');
// Import Roads Layer
var dataset = ee.FeatureCollection('TIGER/2016/Roads');
var roads = dataset.style({width: 1}).clip(table);
Map.addLayer(roads, {}, 'Roads', 0);
// Create a variable for Copernicus Global Land Service (CGLS) land cover (100m)
// Clip land cover to roi and add as a Layer
var lc = ee.Image("COPERNICUS/Landcover/100m/Proba-V-C3/Global/2019").clip(table);
var lc = lc.select('discrete_classification');
Map.addLayer(lc, {}, "Land Cover", 0);
// Extract only cropland pixels from CGLS using class value equal to 40
// (e.g., cultivated and managed vegetation/agriculture)
var cropmask = lc
  .eq(40);
var cropland = lc
  .updateMask(cropmask);
// Calculate affected cropland using the flood layer
var cropland_affected = inundation3
  .updateMask(cropland);
// Get pixel area of affected cropland layer
var crop_pixelarea = cropland_affected
  .multiply(ee.Image.pixelArea()); //calcuate the area of each pixel 
// Sum pixels of affected cropland layer
var crop_stats = crop_pixelarea.reduceRegion({
  reducer: ee.Reducer.sum(), //sum all pixels with area information                
  geometry: table,
  scale: 500,
  maxPixels: 1e9
  });
// Convert area to hectares
var crop_area_ha = crop_stats
  .getNumber("VH")
  .divide(1000)
  .round();
// Print results to Console
print (crop_area_ha, 'DT đất trồng trọt bị ngập nước');
// Set cropland visualization parameters
var croplandVis = {
  min: 0,
  max: 14.0,
  palette: ['30b21c'],
};
// Add cropland to map
Map.addLayer(cropland, croplandVis, 'Cropland',0);
// Add affected cropland to map
Map.addLayer(cropland_affected, croplandVis, 'Đất trồng trọt bị ảnh hưởng',0);
//---------------------------------- MAP PRODUCTION --------------------------------//
// Set position of panel where the results will be displayed 
var results = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px',
    width: '350px'
  }
});
// Prepare the visualtization parameters of the labels 
var textVis = {
  margin:'0px 8px 2px 0px',
  fontWeight:'bold'
  };
var numberVIS = {
  margin:'0px 0px 15px 0px', 
  color:'bf0f19',
  fontWeight:'bold'
  };
var subTextVis = {
  margin:'0px 0px 2px 0px',
  fontSize:'12px',
  color:'grey'
  };
var titleTextVis = {
  margin:'0px 0px 15px 0px',
  fontSize: '18px',
  fontWeight:'bold',
  color: '3333ff'
  };
// Create lables of the results 
// Titel and time period
var title = ui.Label('KẾT QUẢ', titleTextVis);
// Alternatively, print dates of the selected tiles
// var number1 = ui.Label('Please wait...',numberVIS); 
// (after_collection).evaluate(function(val){number1.setValue(val)}),numberVIS;
// Estimated flood extent 
var text1 = ui.Label('Mức lũ ước tính (hecta):',textVis);
var text1_2 = ui.Label ('Dựa trên hình ảnh Sentinel-1 từ 2022-07-20 đến 2022-09-30', subTextVis);
var number1 = ui.Label('Xin đợi...',numberVIS); 
// Estimated area of affected cropland 
var text2 = ui.Label('Diện tích đất trồng trọt ước tính bị ảnh hưởng (hecta):',textVis);
var text2_2 = ui.Label('Dựa trên lớp phủ CGLS (100m)', subTextVis);
var number2 = ui.Label('Hãy uống cafe...',numberVIS);
// Estimated number of people exposed
var text3 = ui.Label('Số người tiếp xúc ước tính: ',textVis);
var text3_2 = ui.Label('Dựa trên dữ liệu JRC/GHSL (250m)',subTextVis);
var number3 = ui.Label('Đợi xíu...',numberVIS);
inundation_area_ha.evaluate(function(val){number1.setValue(val+' hecta')});
crop_area_ha.evaluate(function(val){number2.setValue(val+' hecta')});
number_pop_exposed.evaluate(function(val){number3.setValue(val+ 'Người')});
// Disclaimer
var text4 = ui.Label('Đây là sản phẩm Thử nghiệm và chưa được xác thực.',subTextVis);
// Add the labels to the panel 
results.add(ui.Panel([
        precipTs,
        title,
        text1,
        text1_2,
        number1,
        text2,
        text2_2,
        number2,
        text3,
        text3_2,
        number3,
        text4]
      ));
// Add the panel to the map 
Map.add(results);
// Export the image to Google Drive
Export.image.toDrive({
  image: inundation3,
  description: 'Inundation',
  scale: 25,
    fileFormat: 'GeoTIFF',
});