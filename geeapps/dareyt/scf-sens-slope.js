var land = ee.Image("Oxford/MAP/LST_Night_5km_Monthly/2005_10").select('Mean').gt(-999)
//A Program to compute frequency of snow coverage globally from the MOD10A1
//MODIS/Terra Snow Cover Daily L3 Global 500m Grid product
// A function to reclassify MODIS snow cover products (MOD10A1/A2) values
// snow/ice--1; no snow/ice--0; all others--null
var Reclassify = function(anImage) {
  var ClassifiedImage = anImage.remap([100, 200,  25,  37,  39],   // Original pixel values from MODIS Snow Products
                                      [  1,   1,   0,   0,   0],   // Reclassified values: 1--snow/ice; 0--no snow/ice
                                      null,                        // All other MODIS snow product pixel values (0, 1, 11, 50, 254, 255)
                                      'Snow_Cover_Daily_Tile');    // The band we wish to remap
  return ClassifiedImage;
};
// Prepare MODIS snow cover data for calculating snow cover frequency
// Join MOD09 and MOD10, mask out cells with gte 25 sensor-zenith-angle, and reclassify to: 1, 0, null
var PrepareModisSnowCover = function(StartDate, EndDate) {
  var MOD10A1 = ee.ImageCollection('MOD10A1').select('Snow_Cover_Daily_Tile')
                                            .filterDate(StartDate, EndDate);
  return MOD10A1.map(Reclassify)
};
//Calculate the Snow Cover Frequency at each tile
var CalculateSnowCoverFrequency = function(ModisSnowCover) {                // We hand the function our final MODIS dataset
  var NumOfSnowDays =  ModisSnowCover.sum();                                // Calculate the number of days with snow cover with .sum()
  var NumOfValidObsDays = ModisSnowCover.count();                           // Count the number of days with a valid observation with .count()
  var SnowCoverFrequency = NumOfSnowDays.divide(NumOfValidObsDays);         // perform the calculation
  return SnowCoverFrequency;
};
//Do a linear regression of the SCF for all the years on the MODIS Record
//Define the start and end periods of all water years on the modis record
var WaterYearStartDates = ['2000-10-01','2001-10-01','2002-10-01','2003-10-01','2004-10-01','2005-10-01','2006-10-01','2007-10-01','2008-10-01','2009-10-01','2010-10-01','2011-10-01','2012-10-01','2013-10-01','2014-10-01','2015-10-01'];
var WaterYearEndDates =   ['2001-09-30','2002-09-30','2003-09-30','2004-09-30','2005-09-30','2006-09-30','2007-09-30','2008-09-30','2009-09-30','2010-09-30','2011-09-30','2012-09-30','2013-09-30','2014-09-30','2015-09-30','2016-09-30'];
var WaterYearSCFImages = [];      // Create an array to add images to
//loop over the water years and develop SFC maps for each
for (var i = 0; i < WaterYearStartDates.length; i++) { 
  var SCF = CalculateSnowCoverFrequency(PrepareModisSnowCover(WaterYearStartDates[i], WaterYearEndDates[i]) );   // Remember that PrepareModisSnowCover takes two dates, a start and an end
  var waterYearSCFImage =  ee.Image(new Date(WaterYearEndDates[i]).getFullYear())                                 // Create an image with a constant value everywhere, that value being the End Year
                             .addBands( SCF.select(['remapped'], ['Snow Cover Frequency']) ).toDouble();          // Add the Snow Cover Frequency to the newly created image.  
  WaterYearSCFImages.push(waterYearSCFImage);
}
var WaterYearSCFImages = ee.ImageCollection(WaterYearSCFImages); // We must tell GEE what type of collection this is in order to display it
//Now we calculate the Sens Slope
var Sens = WaterYearSCFImages.reduce(ee.Reducer.sensSlope()).select('slope').mask(land)
var scaVisParam = {"opacity":1,"bands":["slope"],"min":-0.02,"max":0.02,"palette":['964B00', 'A15F1C', 'AD7338', 'B98755', 'C49B71', 'D0AF8D', 'DCC3AA', 'E7D7C6', 'F3EBE2', 'FFFFFF',
                   'E7F1FA', 'CFE4F6', 'B7D7F2', '9FCAED', '88BDE9', '70B0E5', '58A3E0', '4096DC', '2989D8']};
Map.addLayer(Sens, scaVisParam, 'Sens Slope')