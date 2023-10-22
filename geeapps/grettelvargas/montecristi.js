var allArea = ui.import && ui.import("allArea", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -71.70073677936224,
                19.990034020115058
              ],
              [
                -71.90362875599763,
                19.802799693537377
              ],
              [
                -71.80792415296322,
                19.559392513513565
              ],
              [
                -71.36212359254098,
                19.458163852229127
              ],
              [
                -71.03750831010188,
                19.47486262145215
              ],
              [
                -71.02912314432928,
                19.784777199686953
              ],
              [
                -71.24627260080202,
                19.929170421030037
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-71.70073677936224, 19.990034020115058],
          [-71.90362875599763, 19.802799693537377],
          [-71.80792415296322, 19.559392513513565],
          [-71.36212359254098, 19.458163852229127],
          [-71.03750831010188, 19.47486262145215],
          [-71.02912314432928, 19.784777199686953],
          [-71.24627260080202, 19.929170421030037]]]),
    mc = ui.import && ui.import("mc", "table", {
      "id": "projects/ee-grettelvargas/assets/MC_contorno"
    }) || ee.FeatureCollection("projects/ee-grettelvargas/assets/MC_contorno"),
    s3 = ui.import && ui.import("s3", "imageCollection", {
      "id": "COPERNICUS/S3/OLCI"
    }) || ee.ImageCollection("COPERNICUS/S3/OLCI");
//=============================================================================================
/////////// Data Preprocessing /////////////
//=============================================================================================
//center map to area being classified
Map.setCenter(-71.417, 19.650, 10);
Map.addLayer(mc,{}, 'contorno' )
//specify the extent of the area to be classified
var classificationExtent = allArea; 
//------------------------------------------------------------------
// Establish function for masking clouds from Sentinel-2 image collection
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.//
  var cloudBitMask = 1 << 10; 
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
//---------------------------------------------------------------------------------------------.
//Function to mask high elevation areas out. This helps reduce the needed to train/classify
//function maskHighElevation(image) {
  // Create "elevation" layer to mask out high-elevation features
//  var srtm = ee.Image('USGS/SRTMGL1_003').clip(allArea);
//  var elevation_layer = srtm.select('elevation');
  //mask image
//  return image.updateMask(elevation_layer.lte(20.0));//this cutoff is place dependent
//}
//---------------------------------------------------------------------------------------------     
// Establish variable for visualizing data on screen
var median_vis = {
  min: 0.0,
  max: 0.3,
  bands: ['B8_median', 'B11_median', 'B4_median'],
};
//---------------------------------------------------------------------------------------------
// Load image collection of Sentinel-2 surface reflectance data
//The following function composites imagery from a specified period of time using the median reducer to 
//obtain a single image. It calculates several indices and adds the layers as band of the main image. 
//This additional bands are also used in the training and classification of mangroves
var getImage = function(geometry) {
  var start = ee.Date('2021-01-01');
  var end = ee.Date('2021-04-30');
  var date_range = ee.DateRange(start,end);
  var sentinel_collection = ee.ImageCollection('COPERNICUS/S2_SR')
    .filterDate(date_range)
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))//Pre-filter to get less cloudy granules.
    .filterBounds(allArea)
    .map(maskS2clouds)
    .map(function(image) { return image.clip(mc); });
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //Reduce collection to 1 image and mask out water areas 
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // Reduce Sentinel image collection to single image
  var sentinel_image = sentinel_collection.reduce(ee.Reducer.median());
  // Create "NDWI" layer to mask out water features
  //var ndwi_layer = sentinel_image.normalizedDifference(['B3_median', 'B8_median']);
  // Mask water out of Sentinel image using NDWI layer
 // sentinel_image = sentinel_image.updateMask(ndwi_layer.lte(0.0));
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //Create additional layers to use as bands in classification and for masking 
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //Calculate and add NDVI (Normalized Difference Vegetation Index (NDVI))
  var ndvi = sentinel_image.normalizedDifference(['B8_median', 'B4_median']);
  var image = sentinel_image.addBands(ndvi.rename('NDVI'));
  //Calculate and add NDBI (Normalized Difference Built-up Index (NDBI))
  //SWIR(Band11)-NIR(Band8)/ SWIR(Band11)+NIR(Band8)
  //var ndbi = sentinel_image.normalizedDifference(['B11_median','B8_median']);
  //image = image.addBands(ndbi.rename('NDBI'));
  //Calculate and add NDBaI (Normalized Difference Bareness Index (NDBaI))
  //https://eo4sd-lab.net/sites/default/files/eo4sd_lab_s2_ndbal_guide_v1.1.pdf
  // (SWIR [B11] – Vegetation Red Edge [B8A] / (SWIR [B11] + Vegetation Red Edge [B8A])
  //var ndbai = sentinel_image.normalizedDifference(['B11_median','B8A_median']);
  //image = image.addBands(ndbai.rename('NDBaI'));
  //Calculate and add NDMI (Normalized Difference Moisture Index  (NDMI))
  //NIR(B8)-SWIR1(B11)/NIR(B8)+SWIR1(B11)
  var ndmi = sentinel_image.normalizedDifference(['B8_median', 'B11_median']);
  image = image.addBands(ndmi.rename('NDMI'));
  //---------------------------------------------------------------------------------------------  
  //Calculate mangroves heights from SRTM data following the method of Simard et al. mangrove height 
  //calculations. add the mangrove height layer as a band the the composite image.
  // SRTMHmax is estimated 95th percentile of mangrove height
 // var SRTMHmax = ee.Image("USGS/SRTMGL1_003").multiply(1.697);  // Eq. 1 Simard et al.
  //Mask the data to match sentinel image extents
  // SRTMHmax = SRTMHmax.updateMask(sentinel_image.select("B8_median"));
   //var ZeroMask = SRTMHmax.eq(0);  // Make a mask for areas with zero elevation
   //SRTMHmax = SRTMHmax.where(ZeroMask,0.5);  // Simard et al. replace elevations of 0 with 0.5
  var pal = ['EFC2B3','ECB176','E9BD3A','E6E600','63C600','00A600'];  // Define color ramp for height layer.
  //Map.addLayer(SRTMHmax, {min:0, max:20, palette: pal}, 'Mangrove Height - 95th Percentile');
   //var SRTMHba = SRTMHmax.multiply(1.0754); // Eq. 2 Simard et al.
  //Map.addLayer(SRTMHba, {min:0, max:20, palette: pal}, 'Mangrove Height - Basal Area Weighted');
  //-------------------------------------------------------
  // image = image.addBands(SRTMHba.rename('MangHGT'));
  // Mask non-Mangrove vegetation using Mangrove heights. If an appropriate cutoff for Mangroves height is 
  //know for an area, it can be used to further mask out the image 
  //var image = image.updateMask(SRTMHba.lte(22)); //eliminate areas with hights greater than 22m. 
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-
  // Mask non-mangrove candidates out of Sentinel image using NDMI layer
  //image = low_land_sentinel_image.updateMask(ndmi_layer.lte(0.1)).
  // Mask non-vegetation using NDVI: Here I use a low threshold of 0.1 in order not to exclude areas of dead mangroves.
  //If you do not need dead mangrove areas, increase the threshold to only retain green areas..
  var veg_sentinel_image = image.updateMask(ndvi.gte(0.1)).set('system:time_start',ee.Date(end).millis());
  return(veg_sentinel_image);
};
//Image to be used for training is the full extent image. I use the full extent image here because it allows me to used
//training data from any point within that extent. E.g., I can use training data for Puerto Rico to classify St. Thomas
//if the full extent image includes both of these areas.
var trainingImage = getImage(allArea);
//Map.addLayer(trainingImage, median_vis, "sentinel image: full extent");
//=============================================================================================
/////// MANGROVE CLASSIFICATION /////////
//=============================================================================================
//Image to be classified
var classificationImage = getImage(classificationExtent);
Map.addLayer(classificationImage, median_vis, "Sentinel iamgen a clasificar");
//----------------------------------------------------- -
//Merge training data feature collections into one feature collection. The training data can be collected from the image
//or can be from the field. Make sure that in the attribute table of the training data, each cover class has a unique value. 
//In this code, all mangroves points have a value of 0 'zero' and the rest can have any value.  
//var training_points = manglar.merge(camaroneras).merge(agua).merge(urbano)
// Get and print the number of training points.
//var numTrnPoints= training_points.size();
//print('Number of training points:', numTrnPoints);
//----------------------------------------------------- -
//Function for performing the classification
//function classification(trainingImage,classificationImage){
  // Designate which spectral bands to include in the classification
 // var bands = ["B8_median", "B4_median", "B3_median", "B2_median", "NDVI","NDBI", "NDBaI", "NDMI"];
  // Train the classifier using the training points
  //var training = trainingImage.select(bands).sampleRegions({
  //  collection: training_points,
  //  properties: ['class'],
  //  scale: 10
  //});
  // Establish the classifier
 // var classifier = ee.Classifier.smileRandomForest(numTrnPoints)
  //  .train({
   //   features: training,
   //   classProperty: 'class',
   //   inputProperties: bands
   // });
    //classify the image
 // var classified = classificationImage.select(bands).classify(classifier);
 // return classified;
//}
//----------------------------------------------------- -
// Classify the image
//var classified_image = classification(trainingImage,classificationImage);
//Map.addLayer(classified_image.randomVisualizer(), {}, 'Clasificación RF');
//=============================================================================================
/////// POST-PROCESSING /////////
//=============================================================================================
// Smooth with a mode filter. //Filter the image to romove groups of (isolated) pixels
//var SCALE=10;
//var mode = classified_image.focal_mode();
// Weighted smoothing 
// using a 3x3 window
// euclidean distance weighting from corners
//var weights = [[1,2,1],
//               [2,3,2],
//               [1,2,1]];
// create a 3x3 kernel with the weights
// kernel W and H must equal weight H and H
//var kernel = ee.Kernel.fixed(3,3,weights);
// apply mode filter on neightborhood using weights
//var Classification_mode_filtered = classified_image.reduceNeighborhood({
//  reducer: ee.Reducer.mode(),
//  kernel: kernel
//});//.reproject('EPSG:4326', null, SCALE);
//sometimes, it may be necessary to reproject the image after filter to retain the scale. 
//In that case, add the .reproject operations above. However, this operation is costly.
//.reproject('EPSG:4326', null, SCALE)
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-
//Extract the Mangrove class from the filtered thematic map. Since we filtered the classification 
//that had all the classes in it, lets now extract just the mangrove class. The class has a value 
//of 0. This values is determined by the whatever value was assigned to the training data for mangroves.
//var Mangroves_filtered = Classification_mode_filtered.updateMask(Classification_mode_filtered.eq(0)); 
//Map.addLayer(Mangroves_filtered.randomVisualizer(), {}, 'Mangrove classification mode filtered');
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//The classification may further be filtered e.g. using mangroves height to futher eliminate non 
//mangrove areas. If a cutoff height is determined for Mangroves (mangroved are shorter than most trees), 
//then that can be used as follows. As of now, we do not know this cut-off and so the filter is not applied. 
//var Mangroves_filtered2 = Mangroves_filtered.updateMask(SRTMHba.lte(18.5));
//Map.addLayer(Mangroves_filtered2.randomVisualizer(), {}, 'Mangrove classification mode_height filtered');
//=============================================================================================-
/////// Manual Editing /////////
//=============================================================================================
//Manual editing to remove misclassifications
//create a feature collection (polygons) of areas that are not supposed to be Mangroves
//this is the 'ExclusionAreas' file here. The polygon can be a feature collected digitized here
//A function to clip off the unwanted areas from the classification
//var maskInside = function(image, geometry) {
 // var mask = ee.Image.constant(1).clip(geometry).mask().not();
 // return image.updateMask(mask);
//};
//var Mangroves_filtered_edited = maskInside(Mangroves_filtered, ExclusionAreas);
//Map.addLayer(Mangroves_filtered_edited.randomVisualizer(), {}, 'StThomas Mangrove map');
//=============================================================================================
/////// // Calculate mangrove area, and print to console/////////
//=============================================================================================
//Mangroves area from current map
//var MangroveClass = Mangroves_filtered.select(0).rename('mangroves');//rename the mangroves band
//var areaImage = MangroveClass.add(ee.Image.pixelArea());//assign pixel values to be pixel area
//var Mangrove_area = areaImage.reduceRegion({
//  reducer: ee.Reducer.sum(), //add up areas of all pixels
//  geometry: classificationExtent,
//  scale: 10,
//  maxPixels: 1e10
 // });
//var MangroveAreaSqKm = ee.Number(
//  Mangrove_area.get('mangroves')).divide(1e6).round();
//print('Area Nicoya 2020:', man, ' SqKm');
//=============================================================================================
/////// // //Display existing layers of old Mangroves and validation data for visual comparison/////////
//============================================================================================= 
//Display existing layers of old Mangroves
//Map.addLayer(GMW, {color: 'green'}, 'GMW_2016'); //Global Mangroves watch layer
//Map.addLayer(st_ThomasJohn_NCCOS_2002, {color: 'yellow'}, 'st_ThomasJohn_NCCOS_2002');
//=============================================================================================
///////// ACCURACY ASSESSMENT /////////////
//============================================================================================= 
// Convert mangrove raster to polygon, inside of which to generate random mangrove present points for validation
//var mangroves_polygon = Mangroves_filtered.toInt().reduceToVectors({
//  geometry: classificationExtent,
//  crs: Mangroves_filtered.projection(),
 // scale: 10,
 // geometryType: 'polygon',
//  eightConnected: false,
 // maxPixels: 1e9
//});
//Map.addLayer(mangroves_polygon, {color: 'yellow'}, 'mangroves polygon');
// Export the mangrove polygon to Google Drive 
// Export.table.toDrive({
//   collection: mangroves_polygon,
//   description:'Poligonos Nicoya',
//   fileFormat: 'KMZ'
// });
// Generate random points for "mangrove presence" validation, and export to Google Drive
//var presence_points = ee.FeatureCollection.randomPoints(mangroves_polygon, 1000);
//Export.table.toDrive({collection: presence_points, fileFormat: 'GeoJSON'});
//Map.addLayer(mc, {}, 'Contorno manglares')
//Accuracy assesssment can be done outside of GEE
//=============================================================================================
//Export.table.toDrive({
//  featurecollection: classified_image,
//  description: 'clasificacion_polys',
//  fileFormat: 'SHP'
//})
//Export.image.toDrive({
//image: classified_image,
//description: 'Class_nicoya',
//scale: 10,
//region: allArea,
//fileFormat: 'GeoTIFF',
//maxPixels: 10000000000000
//});
/////// END /////////
//=============================================================================================
// Create a map title
var title = ui.Label('Monte Cristi 2021 - Sentinel-2 ', {
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '20px'
});
// Add title to the map
Map.add(title);
// Create a panel to hold the chart in the map instead of "Console" *must turn off print(chart);
var panel = ui.Panel();
panel.style().set({
  width: '350px',
  position: 'bottom-left'
});
// Add empty chart panel to map
Map.add(panel);
// Add chart to panel
//panel.add(chart_regions); // or panel.add(chart_annualRain);
// -----------------------------------------------------------------