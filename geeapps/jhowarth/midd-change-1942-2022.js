var table = ui.import && ui.import("table", "table", {
      "id": "projects/conservation-atlas/assets/landCover/lcBuildings_2016"
    }) || ee.FeatureCollection("projects/conservation-atlas/assets/landCover/lcBuildings_2016");
//  --------------------------------------------------------------------------------
//  Name:     01_change.js  
//  Purpose:  Changes in college lands from 1942 - 2022
//
//  Author:   Jeff Howarth
//  Modified: 09/08/2022  
//  License:  Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
//  --------------------------------------------------------------------------------
var imageTools = require('users/jhowarth/eePrimer:modules/image_tools.js');
//  --------------------------------------------------------------------------------
//  DEFINE STUDY REGION EXTENT  
//  --------------------------------------------------------------------------------
//  Load Addison County, Vermont as study region extent  
// Import college lands dataset.
var college_lands = ee.FeatureCollection(
  'projects/conservation-atlas/assets/cadastre/Midd_College_Parcels_withattributes'
  );
//  --------------------------------------------------------------------------------
//  LOAD NAIP IMAGERY FOR STUDY EXTENT   
//  --------------------------------------------------------------------------------
var collection = ee.ImageCollection("USDA/NAIP/DOQQ")
  .filterBounds(college_lands)
  ;
// print(collection);
//  --------------------------------------------------------------------------------
//  PRINT DATE AND NUMBER OF BAND YEARS FOR AN IMAGE  
//  --------------------------------------------------------------------------------
// Get first image in collection as a test image. 
var test = collection.first();
// print('Test', test);                // Print test image. 
// print(test.date().get('year'));     // Print year.
// print(test.bandNames().length());   // Print number of bands.
// Create a function to add year and band length as properties of image.   
var addYearAndBand = function(image) {
  var imageYear = image.date().get('year');
  var bandNames = image.bandNames().length();
  return image.set({year:imageYear, bands:bandNames});
  }; 
// Test function on a single band. 
// print(addYearAndBand(test));
// Map function to all images in the collection.  
var collection02 = collection.map(addYearAndBand);
// print(collection02);
//  --------------------------------------------------------------------------------
//  LIST IMAGES IN COLLECTION BY YEAR.  
//  --------------------------------------------------------------------------------
var year_list = collection02          // Load collection with year and band properties.
  .filter(                            // Filter collection.  
    ee.Filter.eq('bands', 4))         // Where number of bands equals a number (3 or 4).  
  .aggregate_array('year')            // List the year of each band in the collectino.  
  .distinct()                         // Only list each distinct (or unique) year.  
  .sort()                             // Sort the years by ascending order.  
  ;
// print('List of available years', year_list);    // Print the list of years. 
//  --------------------------------------------------------------------------------
//  LOAD DOQ IMAGES.  
//  --------------------------------------------------------------------------------
var doq = ee.ImageCollection('projects/conservation-atlas/assets/images/doq_199x')
  .filterBounds(college_lands)
  .mosaic()
  .select('b1')
;
// print('doq', doq);
//  --------------------------------------------------------------------------------
//  LOAD 1942 orthophotos    
//  --------------------------------------------------------------------------------
var image42 = ee.Image('users/jhowarth/middCC/Middlebury_1942_Ortho');
//  --------------------------------------------------------------------------------
//  DEFINE VIZ PARAMETERS    
//  --------------------------------------------------------------------------------
// Viz parameters for natural color. 
var makeNatColor = function(gamma) {
  var out = {
    min: 0, 
    max: 255, 
    bands: ['R', 'G', 'B'], 
    gamma: gamma};
  return out;
  }
;       
// Viz parameters for false color NIR. 
var falseColor = {
  min: 0,
  max: 255, 
  bands: ['N', 'R', 'G'], 
  gamma: 1
  };      
var makeGrayscale = function(gamma) {
  var out =  {
    min:0,
    max:255,
    gamma: gamma
    };
    return out;
  }
;
// style parameters for building footprints  
var building_style = {
  color: 'black',
  fillColor: '#00000000',
  };
//  --------------------------------------------------------------------------------
//  COMPOSE MAP      
//  --------------------------------------------------------------------------------
// Center map on study region.  
Map.setCenter(-73.174735, 44.010701, 16);
Map.setOptions('HYBRID');
// Define variables for first and last year. 
var first = 2006;
var last = 2016;
// Create two naip images 
var firstCollection = 
// Add earliest and most recent full image of study site. 
Map.addLayer(image42, makeGrayscale(1), '1942');
Map.addLayer(doq, makeGrayscale(1.4), '199x',0);
Map.addLayer(collection02.filter(ee.Filter.eq('year', first)), makeNatColor(1.25), String(first),0);
Map.addLayer(collection02.filter(ee.Filter.eq('year', last)), makeNatColor(0.6), String(last),0);
// print(ee.List(college_lands.aggregate_array('SOLD'))
//     .distinct()
//     .sort()
//     );
// Convert feature collection into an image.
var college_lands_image = imageTools       // module
  .makeImageFromFeatures(             // function
    college_lands,                        // feature collection  
    'SOLD'                            // property of fc to use as pixel values
  )
;
// // Inspect output of vector - raster conversion.
// // print('Image converted from feature collection', college_lands_image);
// // Define vis parameters. 
var college_lands_viz = {
  min: 0, 
  max: 1,
  palette: ['#003882', '#edd959']
  }
;  
Map.addLayer(college_lands_image, college_lands_viz, 'College Lands',0,0.5);
Map.addLayer(table.style(building_style), {}, '2016 Building footprints');
// CADASTRE  
var cadastre = ee.FeatureCollection('projects/conservation-atlas/assets/cadastre/VTPARCELS_poly_standardized_parcels_SP_v1')
  .filter(ee.Filter.eq('PROPTYPE', 'PARCEL'));
Map.addLayer(cadastre.style(building_style), {}, "Parcels",0);