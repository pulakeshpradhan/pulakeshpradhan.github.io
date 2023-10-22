//######################################################################################################## 
//#                        ESCUELA POLITÉCNIA NACIONAL                                                 #\\
//#                 FACULTAD DE INGENIERÍA CIVIL Y AMBIENTAL                                           #\\
//#                               PIJ 17 - 05                                                          #\\
//########################################################################################################
// CREATION DATE: //03/06/2020
// AUTHOR: DAVID CARCHIPULLA | cmorales.david@outlook.com
//         Environmental Engineering Thesis
//LAST UPDATE: 08/07/2020
// Github tool for exporting image collections
var batch = require('users/fitoprincipe/geetools:batch');
////////////// Importing Shapefiles, DEM, and slope tiff
var AOI = ee.FeatureCollection("users/PIJ-17-05/wetland_bff_500m"); 
var drain = ee.FeatureCollection("users/PIJ-17-05/drain_bff10m"); 
var wells = ee.FeatureCollection('users/PIJ-17-05/wells_bff10m');
var roads = ee.FeatureCollection('users/PIJ-17-05/roads_w');
var dem = ee.Image("users/PIJ-17-05/dem_antisana");
var slp = ee.Image("users/PIJ-17-05/slp_antisana");
var hp = ee.FeatureCollection('users/PIJ-17-05/Humedal_Pugllohuma7');
var spatialClass = ee.FeatureCollection('users/PIJ-17-05/class_dissolve');
// map panel
var map = ui.Map();
map.setOptions('HYBRID');
////////////// Load Sentinel-1 SAR collection and filter according to data collection type
var s1 = ee.ImageCollection('COPERNICUS/S1_GRD')
  .filterBounds(AOI)
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
  .filterMetadata('resolution_meters', 'equals' , 10);
// Filter speckle noise
var filterSpeckles = function(img) {
  var vv = img.select('VV'); //select the VV polarization band
  var vh = img.select('VH');
  var vv_smoothed = vv.focal_median(30,'circle','meters'); //Apply a focal median filter
  var vh_smoothed = vh.focal_median(30,'circle','meters'); //Apply a focal median filter
  var smoothed = ee.Image.cat(vv_smoothed, vh_smoothed)
    .rename(['VV_S', 'VH_S']);
  return img.addBands(smoothed); // Add filtered VV band to original image
};
s1=s1.map(filterSpeckles);
print(s1);
////////////// Adding Polarimetric Indexes
// Function to compute and add polarization indexes as bands
// as well as, day of the year; slope; and elevation data
var addindexes = function(ima) {
  var VV = ima.select('VV_S');
  var VH = ima.select('VH_S');
  var NDPI = VV.subtract(VH).divide(VV.add(VH));
  var NVHI = VH.divide(VV.add(VH));
  var NVVI = VV.divide(VV.add(VH));
  var VHrVV = VH.divide(VV);
  var doy = ima.date().getRelative('day', 'year');
  var doyBand = ee.Image.constant(doy).uint16().rename('doy');
  var recipe = ee.Image.cat(NDPI, NVHI, NVVI, VHrVV,doyBand,dem,slp)
    .rename(['NDPI', 'NVHI', 'NVVI', 'VHrVV','DOY','DEM','slp']);
  return ima.addBands(recipe);
};
// Add index bands to image collection
s1 = s1.map(addindexes);
// set a date property to exactly 00:00 AM
// Also, S1 images were clipped by the AOI
s1 = s1.map(function(image){
  return image.set('simpleTime', ee.Date(image.date()
                    .format('YYYY-MM-dd')).millis()).clip(AOI);
});
////////////// Load Sentinel-2 collection and filter according to data collection type
/**
 * Function to mask clouds using the Sentinel-2 QA band
 * @param {ee.Image} image Sentinel-2 image
 * @return {ee.Image} cloud masked Sentinel-2 image
 */
function maskS2clouds(image) {
  var QA = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cirrus = QA.bitwiseAnd(Math.pow(2, 11)).eq(0);
  var cloud = QA.bitwiseAnd(Math.pow(2, 10)).eq(0);
  return image.updateMask(cirrus).updateMask(cloud);
}
//Load Sentinel-2 collection and filter according to data collection type
var s2 = ee.ImageCollection('COPERNICUS/S2')
  .filterBounds(hp)
  .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than',60)
  .map(maskS2clouds);
// Function to compute and add NDVI, as well as, NDWI
var addS2indexes = function(ima) {
  var NDVI=ima.normalizedDifference(['B8', 'B4']);
  var MNDWI=ima.normalizedDifference(['B3', 'B11']);
  var doy = ima.date().getRelative('day', 'year');
  var doyBand = ee.Image.constant(doy).uint16().rename('doy');
  var indexes= ee.Image.cat(NDVI,MNDWI,doy,slp)
  .rename(['NDVI','MNDWI','DOY','slp']);
  return ima.addBands(indexes);
};
// Add index bands to image collection
s2 = s2.map(addS2indexes);
// set a date property to exactly 00:00 AM
// Also, S1 images were clipped by the AOI
s2 = s2.map(function(image){
  return image.set('simpleTime', ee.Date(image.date()
                    .format('YYYY-MM-dd')).millis()).clip(AOI);
});
////////////// Filtering by assessing dates
///Importing classified dates
var s1Dates = ee.List(['2017-06-05','2017-07-13','2017-08-18','2017-09-21',
                      '2017-10-17','2017-12-16','2018-01-09',//'2018-07-18',
                      '2018-08-25','2018-10-24','2018-12-23','2019-02-15'])
                      .map(function(date){return ee.Date(date).millis()});
//S2 showed an atypical behavior on '2018-07-16', then this date is discarted
var s2Dates = ee.List(['2017-06-06','2017-07-16','2017-08-20','2017-09-19',
                      '2017-10-19','2017-12-18','2018-01-07',//'2018-07-16',
                      '2018-08-25','2018-10-24','2018-12-23','2019-02-16'])
                      .map(function(date){return ee.Date(date).millis()});
//Applying date filter
s1 = s1.filter(ee.Filter.inList("simpleTime", s1Dates)); 
print(s1); // Saturation Dates
s2 = s2.filter(ee.Filter.inList("simpleTime", s2Dates)); 
print(s2); // Saturation Dates
////////////// Classification sentinel 1
// Reshaped sample is imported to GEE
var ClassSample = ee.FeatureCollection("users/PIJ-17-05/ClassSample");
// Needed variables are stablished
var bands = ['DEM','DOY','VH_S','VV_S','angle','slp'];
// Classifier is trained
// 800 decision trees are needed
var classifier = ee.Classifier.smileRandomForest(100).train({
  features: ClassSample,
  classProperty: 'landcover',
  inputProperties: bands // Not all variables are needed, 
  });                    // Just those included in bands
// Classification is implemented in s1
// s1 includes all images provided by GEE
// and it already has computed polarimetric indexes
var rfModel = function(classifying) {
  var classified = classifying.select(bands).classify(classifier);
  return classifying.addBands(classified);
};
var s1Classified = s1.map(rfModel);
print(s1Classified);
// Classes are selected and added to the image as new bands
// It is needed to visualiza spatial classification
var add_class = function(imgs1) {
  var class_band = imgs1.select('classification');
  var ss = class_band.eq(10);    //Identify classified pixels 
  var ws = class_band.eq(11);  // and set them equal to 1. 
  var ds = class_band.eq(12);     // All other pixels set to 0
  ss = ss.updateMask(ss);        //Remove all pixels equal to 0
  ws = ws.updateMask(ws);  //Remove all pixels equal to 0
  ds = ds.updateMask(ds);           //Remove all pixels equal to 0
  var class_bands = ee.Image.cat(ss, ws, ds)
    .rename(['Saturated','Wet','Dry']);
  return imgs1.addBands(class_bands);  
};                    
//Map classification across sentinel-1 collection and print to console to inspect
s1Classified = s1Classified.map(add_class);
print(s1Classified);
////////////// Classification sentinel 2
// Reshaped sample is imported to GEE
var S2Sample = ee.FeatureCollection("users/PIJ-17-05/S2Sample");
// Classification is implemented in s2
// s2 includes all images provided by GEE
// and it already has computed spectral indexes
var kmeansmodel = function(classifyingS2) {
  // Make the training dataset.
  var training = classifyingS2.select('MNDWI','NDVI','DOY','slp').sample({
    region: spatialClass,
    scale: 10
  });
  // Instantiate the clusterer and train it.
  var clusterer = ee.Clusterer.wekaKMeans(3).train(training);
  var classifiedS2 = classifyingS2.select('MNDWI','NDVI','DOY','slp').cluster(clusterer);
  return classifyingS2.addBands(classifiedS2);
};
var s2Classified = s2.map(kmeansmodel);
print(s2Classified);
// Classes are selected and added to the image as new bands
// It is needed to visualiza spatial classification
var add_class_s2 = function(imgs2) {
  var class_band_s2 = imgs2.select('cluster');
  var ss2 = class_band_s2.eq(0);    //Identify classified pixels 
  var ws2 = class_band_s2.eq(1);  // and set them equal to 1. 
  var ds2 = class_band_s2.eq(2);     // All other pixels set to 0
  ss2 = ss2.updateMask(ss2);        //Remove all pixels equal to 0
  ws2 = ws2.updateMask(ws2);  //Remove all pixels equal to 0
  ds2 = ds2.updateMask(ds2);           //Remove all pixels equal to 0
  var class_bands_s2 = ee.Image.cat(ss2, ws2, ds2)
    .rename(['Saturated','Wet','Dry']);
  return imgs2.addBands(class_bands_s2);  
};                    
//Map classification across sentinel-1 collection and print to console to inspect
s2Classified = s2Classified.map(add_class_s2);
print(s2Classified);
//////////////Make time series of pixels within region
var S1_Chart = ui.Chart.image.series({
  imageCollection: s1Classified.select(['Saturated','Wet','Dry']),
  region: AOI,
  reducer: ee.Reducer.sum(),
  scale:100
})
  .setOptions({
      title: 'S1 Classified Pixels',
      hAxis: {'title': 'Date'},
      vAxis: {'title': 'Ha of Inundated'},
      lineWidth: 2,
      series: {
        0: {color: '#38ad1b'}, // Dry
        2: {color: '#70dcbe'}, // Wet
        1: {color: '#2007ab'} // Saturated
        }
    });
//Set the postion of the chart and add it to the map    
S1_Chart.style().set({
    position: 'bottom-right',
    width: '500px', 
    height: '300px'    
  });
var S2_Chart = ui.Chart.image.series({
  imageCollection: s2Classified.select(['Dry','Wet','Saturated']),
  region: AOI,
  reducer: ee.Reducer.sum(),
  scale:100
})
  .setOptions({
      title: 'S2 Classified Pixels',
      hAxis: {'title': 'Date'},
      vAxis: {'title': 'Ha of class'},
      lineWidth: 2,
      series: {
        0: {color: '#38ad1b'}, // Dry
        2: {color: '#70dcbe'}, // Wet
        1: {color: '#2007ab'} // Saturated
      } 
    });
//Set the postion of the chart and add it to the map    
S2_Chart.style().set({
    position: 'bottom-left',
    width: '500px',
    height: '300px'
  });  
// Create a label on the map.
var labelS1 = ui.Label({
  value: 'Click a point on the right chart to show the image for that date.',
  style: {position: 'top-center'}
});
map.add(labelS1);
var labelS2 = ui.Label({
  value: 'Click a point on the left chart to show the image for that date.',
  style: {position: 'bottom-center'}
});
map.add(labelS2);
//Create callback function that adds image to the map coresponding with clicked data point on chart
S1_Chart.onClick(function(xValue, yValue, seriesName) {
    if (!xValue) return;  // Selection was cleared.
    // Show the image for the clicked date.
    var equalDate = ee.Filter.equals('system:time_start', xValue);
    //Find image coresponding with clicked data 
    var rfClass = ee.Image(s1Classified.filter(equalDate)
                    .first()).select('classification'); 
    //Make map layer based on SAR image, reset the map layers, 
    // and add this new layer
    var S1Layer = ui.Map.Layer(rfClass, {
      max: 12,
      min: 10,
      palette: ['#2007ab','#70dcbe','#38ad1b']
    },'SAR Classification');
    map.layers().reset([S1Layer]);
    // Show a label with the date on the map.
    labelS1.setValue((new Date(xValue)).toUTCString());
//Map aguas_abiertas
//map.addLayer(aguas_abiertas, {color: 'white'} , 'Aguas abiertas');
map.addLayer(hp, {}, 'Humedal Pugllohuma');  
  });
//Create callback function that adds image to the map coresponding with clicked data point on chart
S2_Chart.onClick(function(xValue, yValue, seriesName) {
    if (!xValue) return;  // Selection was cleared.
    // Show the image for the clicked date.
    var equalDate = ee.Filter.equals('system:time_start', xValue);
    //Find image coresponding with clicked data 
    var kmClass = ee.Image(s2Classified.filter(equalDate)
                    .first()).select('cluster'); 
    //Make map layer based on cluster classification, 
    // and add this new layer
    map.addLayer(kmClass,{
      max: 2,
      min: 0,
      palette: ['#2007ab','#70dcbe','#38ad1b']
    },'Spectral Classification');
    // Show a label with the date on the map.
    labelS2.setValue((new Date(xValue)).toUTCString());
//Map aguas_abiertas
//map.addLayer(aguas_abiertas, {color: 'white'} , 'Aguas abiertas');
  });
//////////////Customizing map
ui.root.clear();
ui.root.add(map);
//Map AOI and Zoom area
//map.addLayer(AOI, {}, 'AOI');
map.centerObject(AOI, 15.3); //Specify the zoom magnitude
//Adding charts
map.add(S1_Chart);
map.add(S2_Chart);
//First date analysis
var listOfImages = s2.toList(s2.size());
var selection = listOfImages.get(5);//select the image you want to plot
var S2_selection = ee.Image(selection);
print(S2_selection);
// Pre-define some customization options.
var options = {
  title: 'Sentinel 2 histogram',
  fontSize: 20,
  hAxis: {title: 'spectrum'},
  vAxis: {title: 'count of distribution'}};
// Make the histogram, set the options.
var histogram = ui.Chart.image.histogram(S2_selection, AOI, 30)
    .setOptions(options);
// Display the histogram.
print(histogram);
//exporting S1 Classification
//Subsetting S1 ImageColection (Classes)
//var s1Subset = s1Classified.select(['classification'],['classification']);
//Exporting
//batch.Download.ImageCollection.toDrive(s1Subset, 's1_ic', 
//                {scale: 10,
//               region: AOI.getInfo()["coordinates"],
//                 type: 'float'});
//exporting S2 Clusters
//Subsetting S2 ImageColection (Clusters)
//var s2Subset = s2Classified.select(['cluster'],['cluster']);
//Exporting
//batch.Download.ImageCollection.toDrive(s2Subset, 's2_ic', 
//                {scale: 10,
//                region: AOI.getInfo()["coordinates"],
//                 type: 'float'});