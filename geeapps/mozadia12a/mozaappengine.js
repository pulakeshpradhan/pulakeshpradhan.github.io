//definir la zone d'etudes
var niayes= ee.FeatureCollection('users/mozadia12a/buffer_10km');
//Display the region
Map.centerObject(niayes);
Map.addLayer(niayes);
//Set the start and end dates.
var startdate = ee.Date('2016-04-01');
var enddate = ee.Date('2016-04-30');
// Make a function to mask the clouds (adjust the threshold if necessary).
/*
var cloudThresh = 20;
var cloudfunction = function(image){
  var scored = ee.Algorithms.Landsat.simpleCloudScore(image);
  var score = scored.select('cloud');
  var cloudy = quality.gt(cloudThresh);
  var cloudmask = cloudy.not();
  return image.updateMask(cloudmask);
};
*/
//Select Landsat mood images within the specified time range and Mekong region.
var L7 = ee.ImageCollection("LANDSAT/LE07/C01/T1_TOA");
var l7images = L7.filterDate(startdate, enddate)
    .filterBounds(niayes);
    print(l7images);
//var Image4 = ee.Image("LANDSAT/LE07/C01/T1_TOA");
// Print image details to the Console
//print(Image4, "Image4");
// Add Band 1 to map
//.select( ['B3'] )
//.clip(niayes);
//.filterBounds(niayes)
//Map.addLayer(RedBandIMAGE,{bands:['B1'], min:0, max:3000}, "B1");
//Map.addLayer(RedBandIMAGE, {min:0, max:3000}, "B3");  
//Map the function over the Landsat 7 collection. 
var l7CloudMasked = l7images
//.map(cloudfunction)
.median()
.clip(niayes)
// Display the median of the image collection for the Mekong region for Landsat 7. What bands should you use to display the image as a true color image?
Map.centerObject(niayes, 5);
Map.addLayer(l7CloudMasked,{
    min: 0, 
    max: 0.5,
    bands: ['B4', 'B3', 'B2']
  },"Landsat 7 True color");
  var l7CloudMasked = l7images
//.map(cloudfunction)
.median()
.clip(niayes)