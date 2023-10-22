var Countries = ui.import && ui.import("Countries", "table", {
      "id": "USDOS/LSIB/2017"
    }) || ee.FeatureCollection("USDOS/LSIB/2017"),
    WDPA = ui.import && ui.import("WDPA", "table", {
      "id": "WCMC/WDPA/current/polygons"
    }) || ee.FeatureCollection("WCMC/WDPA/current/polygons"),
    CHIRPS = ui.import && ui.import("CHIRPS", "imageCollection", {
      "id": "UCSB-CHG/CHIRPS/PENTAD"
    }) || ee.ImageCollection("UCSB-CHG/CHIRPS/PENTAD"),
    MOD13Q1 = ui.import && ui.import("MOD13Q1", "imageCollection", {
      "id": "MODIS/006/MOD13Q1"
    }) || ee.ImageCollection("MODIS/006/MOD13Q1"),
    ltVis = ui.import && ui.import("ltVis", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "rain"
        ],
        "min": 4.64359711513255,
        "max": 17.34305028835177,
        "palette": [
          "edf8b1",
          "7fcdbb",
          "2c7fb8",
          "0a48ff"
        ]
      }
    }) || {"opacity":1,"bands":["rain"],"min":4.64359711513255,"max":17.34305028835177,"palette":["edf8b1","7fcdbb","2c7fb8","0a48ff"]},
    rainVis = ui.import && ui.import("rainVis", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "rain"
        ],
        "min": 0.15440189331332632,
        "max": 1.5545339793044755,
        "palette": [
          "edf8b1",
          "7fcdbb",
          "2c7fb8",
          "0a48ff"
        ]
      }
    }) || {"opacity":1,"bands":["rain"],"min":0.15440189331332632,"max":1.5545339793044755,"palette":["edf8b1","7fcdbb","2c7fb8","0a48ff"]},
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.MultiPoint(),
    modis13 = ui.import && ui.import("modis13", "imageCollection", {
      "id": "MODIS/006/MOD13Q1"
    }) || ee.ImageCollection("MODIS/006/MOD13Q1"),
    table = ui.import && ui.import("table", "table", {
      "id": "USDOS/LSIB_SIMPLE/2017"
    }) || ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"),
    GPM = ui.import && ui.import("GPM", "imageCollection", {
      "id": "NASA/GPM_L3/IMERG_MONTHLY_V06"
    }) || ee.ImageCollection("NASA/GPM_L3/IMERG_MONTHLY_V06"),
    C_daily = ui.import && ui.import("C_daily", "imageCollection", {
      "id": "UCSB-CHG/CHIRPS/DAILY"
    }) || ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY");
// // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// // -------------------------------------------------------------------------
// // Assigment 4 - Instructor Sandra MacFadyen
// // Student: Grettel Vargas Azofeifa
// // The Tropical Agricultural Research and Higher Education Center
// // 
// // 24 April 2021
// // -------------------------------------------------------------------------
// // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ---> GET ONLINE DATASET AND CONVERT TO AN IMPORT RECORD  <--
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// var Countries = ee.FeatureCollection('USDOS/LSIB/2017');
// var WDPA = ee.FeatureCollection('WCMC/WDPA/current/polygons');
// var CHIRPS = ee.ImageCollection("UCSB-CHG/CHIRPS/PENTAD");
// var MOD13Q1 = ee.ImageCollection("MODIS/006/MOD13Q1");
// -----------------------------------------------------------------------------
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ---> SETUP DATE RANGE <---
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Setup startDate and endDate as Date objects
var startDate = ee.Date.fromYMD(2000,1,1);
var endDate = ee.Date.fromYMD(2019,12,31);
// // Create a sequence for years and months
// // Can be used dataset does not have 'year' or 'month' properties
// var years = ee.List.sequence(2000, 2019);
// var months = ee.List.sequence(1, 12);
// -------------------------------------------------------------------------
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// // ---> GET FEATURES FROM FEATURE COLLECTIONS <---
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Country boundaries filtered to Botswana
var Botswana = Countries.filter(ee.Filter.eq('COUNTRY_NA', 'Botswana'));
// print('Check Ethiopia Info', ethiopia); // Returns info about Ethiopia but can take memory
// Other usefull print function incl.
// print('Ethiopia data-type', ethiopia.name()); // Returns object type
// print('Ethiopia collection size', ethiopia.size()); // Returns collection size
// print('Ethiopia properties', ethiopia.propertyNames()); // Returns collection properties
// // WDPA boundaries filtered to 'Gemsbok' National Park in Ethiopia
// Check out https://www.protectedplanet.net to get right name
var Gemsbok = WDPA.filter(ee.Filter.eq('ORIG_NAME', 'Gemsbok'));
// print('Gemsbok data-type', Gemsbok.name());
 Map.centerObject(Botswana, 8);
 Map.addLayer(Botswana, {color: '006600', strokeWidth: 5}, 'Botswana', false); 
 Map.addLayer(Gemsbok,{color: 'grey'}, 'Gemsbok',true, 0.8);  // Add Gemsbok boundary
// -----------------------------------------------------------------------------
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// // ---> GET IMAGES FROM GEE IMAGE COLLECTIONS <---
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Here is an example of how .filterBounds doesn't really do anything for non-tiled datasets
// Don't filter CHIRPS by region
var rainAll = CHIRPS.select('precipitation')
    .filterDate(startDate, endDate);
print('rainAll Info', rainAll.limit(10));
print('rainAll data-type', rainAll.name());
// // Check how many images are in the full imageCollection
 print('rainAll collection size ', rainAll.size());
// // Filter CHIRPS by region: Ethiopia
// var rainEth = CHIRPS.select('precipitation')
//     .filterDate(startDate, endDate)
//     .filterBounds(ethiopia);
// print('rainEth Info', rainEth);
// print('rainEth data-type', rainEth.name());
// // Check how many images are in the "boundary filtered" imageCollection
// print('rainEth collection size', rainEth.size());
// // There is no difference because CHIRPS is not tiled
// -----------------------------------------------------------------------------
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// // ---> HOW TO DEAL WITH MEMORY ISSUES THEN <---
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Basics: Turn off all unnecessary calculations/print functions
// Then you can create a clip function to iterate over each image in the image collection
// ** From BONUS section, Prac #1
var clipF = function(image){
  return image.clip(Botswana).rename('rain'); // .rename because 'precipitation' is too long for me :)
};
// Now run it over the images in the collection
var rainClip = rainAll.map(clipF);
// print('Clipped rain Info', rainClip.limit(10));
// print('No. clipped rain images: ', rainClip.size());
// print('Clipped rain properties', rainClip.propertyNames());
// -----------------------------------------------------------------------------
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// // ---> VISUALISE RESULTS (DISPLAY PARAMETERS) <---
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// These can be sent to your Import Entries to clean-up your script
// Legend parameters (start with this but change based on your area properties)
 var rainYvis = {
   min: 0.6, 
   max: 1.5, 
   palette: '#edf8b1,#7fcdbb,#2c7fb8,#0a48ff'
 };
// See the difference from .filterBounds?
// Map.centerObject(ethiopia, 4.5);
// If you didn't add .first() you'd still get 2018-01, this is just to illustrate
// Map.addLayer(rainClip.first(), rainVis, 'January Rainfall 1981', false);
// -----------------------------------------------------------------------------
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// // ---> CALCULATE LONG-TERM AVERAGE RAINFALL <---
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Long-term mean rainfall of Botswana
var rainAnnual = rainClip.mean();
// var rainAnnual = rainAll.mean().clip(ethiopia); // Would also work
// print('Check Long-term mean', rainAnnual); // Use print() to check your results
// See the difference?
Map.centerObject(Botswana, 4.5);
Map.addLayer(Botswana, {color: '006600', strokeWidth: 5}, 'Botswana Boundary'); // Trick to get outline only
Map.addLayer(rainAnnual, ltVis, 'Long-term Annual Rainfall');
Map.addLayer(Gemsbok,{color: 'black'}, 'Gemsbok National Park',true, 1);  // Add Gemsbok boundary
// -----------------------------------------------------------------------------
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// // ---> GENERATE CHARTS OF TIME SERIES <---
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Display a line chart of the mean annual rainfall for Gemsbok (incl. title)
// Same approach as layer visual parameters i.e. either separate object or embeded
var opt_chart_mnthRain = {
  title: 'Mean Monthly Rainfall: Gemsbok National Park 2000-2019',
  hAxis: {title: 'Month'},
  vAxis: {title: 'Rainfall (mm)'},
};
var chart_mnthRain = ui.Chart.image.series({
  imageCollection: rainClip,
  region: Gemsbok,
  reducer: ee.Reducer.mean(),
  scale: 5000,
  xProperty: 'month' 
}).setChartType('ColumnChart')
.setOptions(opt_chart_mnthRain);
// print(chart_mnthRain);
var opt_chart_annualRain = {
  title: 'Annual Rainfall in Botswana from 2000-2019',
  // pointSize: 2, lineWidth: 1,
  hAxis: {title: 'Year'},
  vAxis: {title: 'Rainfall (mm)'},
};
 var chart_annualRain = ui.Chart.image.series({
   imageCollection: rainClip,
   region: Botswana,
   reducer: ee.Reducer.mean(),
   scale: 5000,
   xProperty: 'year' 
 }).setChartType('LineChart')
 .setOptions(opt_chart_annualRain);
 print(chart_annualRain);
// Takes a while and sometimes reports error: User memory limit exceeded
// -----------------------------------------------------------------------------
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// // ---> SUMMARISE BY YEAR <---
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Define a list of unique observation years from the image collection.
// Or you could create a series (see lines 29-32)
var years = ee.List(rainClip.aggregate_array('year')).distinct().sort();
print(years);
// Map over the list of years to build a list of annual image composites.
var yearList = years.map(function(year) {
  return rainClip
    // Filter image collection by year.
    .filterMetadata('year', 'equals', year)
    // Reduce image collection by mean.
    .reduce(ee.Reducer.mean())
    // Set composite year as an image property.
    .set('year', year)
    .set('yrString',ee.String(year).slice(0,4)); // <----- SEE SOLVE FOR MY EARLIER CHEAT WITH BANDS NAMES :)
});
// print('Check yearList', yearList);
// print('yearList size', yearList.size());
// Convert the image List to an ImageCollection.
// var rainYears = ee.ImageCollection.fromImages(yearList);
var rainYears = ee.ImageCollection.fromImages(yearList.flatten());
print('Check rainYears', rainYears.limit(10));
// print('Check rainYears', rainYears.name());
var chart_annualRain = ui.Chart.image.series({
  imageCollection: rainYears,
  region: Botswana,
  reducer: ee.Reducer.mean(),
  scale: 5000,
  xProperty: 'year'
}).setOptions(opt_chart_annualRain);
// print(chart_annualRain);
// -----------------------------------------------------------------------------
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ---> HOW DOES AWASH'S RAINFALL DIFFER FROM THE REST OF THE COUNTRY? <---
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Create a new feature collection with both Botswana and Gemsbok boundaries
var myRegions = ee.FeatureCollection([
  ee.Feature(Botswana.geometry(), {'place': 'Botswana'}), //NB! features must be geometries
  ee.Feature(Gemsbok.geometry(), {'place': 'Gemsbok'})
]);
print('Check myRegions', myRegions);
// Set chart parameters
var opt_chart_regions = {
  title: 'Annual Average Rainfall 2000-2019',
          hAxis: {title: 'Year', format: '####'},
          vAxis: {title: 'Rainfall (mm)'},
          lineWidth: 2,
          colors: ['31159a', '4ecbd4'],
};
// Define the chart and print it to the console.
var chart_regions =
    ui.Chart.image.seriesByRegion({
          imageCollection: rainYears,
          // band: 'rain_mean',
          regions: myRegions,
          reducer: ee.Reducer.mean(),
          scale: 5000,
          seriesProperty: 'place',
          xProperty: 'year'
        }).setOptions(opt_chart_regions);
// print(chart_regions);
// -----------------------------------------------------------------------------
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ---> ADD ADDITIONAL ELEMENTS TO YOUT MAP <---
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Create a map title
var title = ui.Label('Annual Rainfall in Botswana from 2000 to 2018', {
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
panel.add(chart_regions); // or panel.add(chart_annualRain);
// -----------------------------------------------------------------------------
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// // ---> SAVE THE MAP AS A NEW APP VISIBLE ONLINE TO OTHERS <---
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// // Step-by-step
// // 1] Click the 'Apps' button above
// // 2] Select 'NEW APP'
// // 3] Give the App a Name
// // 4] Leave everything else default
// // 5] Click 'PUBLISH'
// // 6] URL will appear - Click this to see your first online interative map
// // * If you see a 'Not ready' page, give it a few minutes and try again
// // -------------------------------------------------------------------------
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ---> COMBINE AND SUMMARISE RAINFALL AND MODIS NDVI DATA <---
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Setup new startDate and endDate because NDVI data only starts in 2000
var startDateX = ee.Date.fromYMD(2000,1,1);
var endDate = ee.Date.fromYMD(2019,12,31);
// Long-term EVI data from MODIS
var ndviAll = MOD13Q1.select('NDVI')
    .filterDate(startDateX, endDate);
// Check how many images are in the full imageCollection
 print('No. ndviAll Images: ', ndviAll);
 print('No. ndviAll Images: ', ndviAll.size());
 print('ndviAll properties: ', ndviAll.propertyNames());
// ee.Number(date).toInt()
var ndviClip = ndviAll.map(function(img){
    var date = ee.Date(img.get('system:time_start')).format('YYYY');
    return img.set('year',ee.Number.parse(date))
              .set('yrString',ee.String(ee.Number.parse(date)));
});    
print('Check ndviClip: ', ndviClip.limit(10));
// print('Check ndviClip: ', ndviClip.first().propertyNames());
var yearsX = ee.List(ndviClip.aggregate_array('year')).distinct().sort();
// var yearsX = ee.List.sequence(2000, 2019); // Or just make a sequence
print('Check yearsX',yearsX);
// -------------------------------------------------------------------------
// Calculate annual mean for every year for both Rainfall and NDVI imageCollections
var annualRainNDVI_list =  yearsX.map(function(y){
  var rainYear = rainClip.filter(ee.Filter.calendarRange(y, y, 'year')).mean().rename('rain');
  var ndviYear = ndviClip.filter(ee.Filter.calendarRange(y, y, 'year')).mean().multiply(0.0001).rename('ndvi'); // Need to scale by constant
  return ndviYear.addBands(rainYear).set('year', y);
});
// print('Check annualRainNDVI_list', annualRainNDVI_list);
print('Check annualRainNDVI_list', annualRainNDVI_list.name());
// Convert the image List to an ImageCollection.
var annualRainNDVI = ee.ImageCollection.fromImages(annualRainNDVI_list.flatten());
print('Check annualRainNDVI', annualRainNDVI);
// -------------------------------------------------------------------------
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ---> GENERATE DUAL AXISES LINE CHARTS FOR RAIN AND NDVI TIME SERIES <---
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Display a comparative line chart of rainfall and NDVI for Botswana 
// Set chart parameters e.g. title
var opt_chart_RainNDVI = {
    title: "Annual Max Rainfall vs. 'Greenness (NDVI) for Botswana", 
    pointSize: 3,
    legend: {maxLines: 5, position: 'top'},
    series: { 0: {targetAxisIndex: 0, color: 'green', lineWidth: 1, pointSize: 2},
              1: {targetAxisIndex: 1, color: 'blue', lineWidth: 1, pointSize: 2}},
        vAxes: {// Adds titles to each axis.
          0: {title: 'Mean NDVI (*0.0001)'},
          1: {title: 'Mean Rainfall (mm)'}},};
// Build the chart and plot it          
var chart_RainNDVI = ui.Chart.image.series({
  imageCollection: annualRainNDVI.select(['ndvi','rain']),
  region: Botswana,
  reducer: ee.Reducer.mean(),
  scale: 5000,
  xProperty: 'year'
}).setOptions(opt_chart_RainNDVI);
// print(chart_RainNDVI);
// -----------------------------------------------------------------------------
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ---> WHAT ABOUT ACTUAL CORRELATION <---
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Creates a two-input reducer that computes Pearson's product-moment correlation coefficient 
// and the 2-sided p-value test for correlation = 0.
 var opt_chart_correlate = {
     title: "Correlation between Rainfall and NDVI for Botswana", 
     pointSize: 2,
     legend: {maxLines: 5, position: 'top'},
     series: { 0: {targetAxisIndex: 0},
               1: {targetAxisIndex: 1}},
         vAxes: {// Adds titles to each axis.
           0: {title: 'Correlation - R2)'},
           1: {title: 'P-Value'}},};
// // Build the chart and plot it          
 var chart_correlate = ui.Chart.image.series({
   imageCollection: annualRainNDVI.select(['rain', 'ndvi']),
   region: Botswana,
   reducer: ee.Reducer.pearsonsCorrelation(),
   scale: 5000,
   xProperty: 'year'
 }).setOptions(opt_chart_correlate);
 print(chart_correlate);
// -----------------------------------------------------------------------------
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ---> EXPORT DATA TO DATA TABLE (.CSV) <---
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Use the buttons on the pop-out chart to export the .csv, 
// print(chart_RainNDVI);
// // OR script the export using a reducer to get the mean value for a region from each image
var csv_annualRain = rainYears.map(function(img){
  var year = img.get('year');
  var mean = img.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: Gemsbok,
    scale: 5000
  });  
  return ee.Feature(null, {'mean': mean.get('rain_mean'),'year': year});
});
 print('Check csv_annualRain', csv_annualRain);
// // Export a .csv table of year and mean rainfall
 Export.table.toDrive({
   collection: csv_annualRain,
   description: 'annualRain',
   folder: 'GEE4CE',
   fileFormat: 'CSV'
 });
// -------------------------------------------------------------------------
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ---> EXPORT DATA TO "RASTER-STACK" (.TIF) <---
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var bandNames = ee.List(rainYears.aggregate_array('yrString')); // <----- SEE SOLVE FOR MY EARLIER CHEAT WITH BANDS NAMES :)
print('Check bandNames',bandNames);
// // Apply the function toBands() on the image collection to stack all bands into one image
// var rainYearsStack = rainYears.toBands().rename(['1981','1982','1983','1984','1985','1986','1987','1988','1989','1990','1991','1992','1993','1994','1995','1996','1997','1998','1999','2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019']);
var rainYearsStack = rainYears.toBands().rename(bandNames); // <----- SEE SOLVE FOR MY EARLIER CHEAT WITH BANDS NAMES :)
print('Check rainYearsStack', rainYearsStack);
// // -------------------------------------------------------------------------
// // Export aa cloud-optimized GeoTIFF.
// // i.e. rasterStack with 39 layers, representing annual rainfall from 1981 to 2019
 Export.image.toDrive({
   image: rainYearsStack,
   folder: 'GEE4CE',
   description: 'Rainfall_Sums',
   scale: 5000,
   region: Gemsbok,
   fileFormat: 'GeoTIFF',
   formatOptions: {
     cloudOptimized: true
   }
 });
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ---> PRACTICAL 4 EXERCISE <---
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// To complete the practical exercise below you need to know how to share
// your scripts with us
// Simply click on "Get Link" - the actual button NOT the dropdown arrow
// Then click the "Click to copy link" button and paste that in an email to us
// ots.online.education@gmail.com
// !NB! Remember to add the prac number in the header
// Also see https://biomath-lab.github.io/OTS-GEE/pages/4_prac.html for more help
// -----------------------------------------------------------
// Generate your own App using rainfall or any other climate variable*
// to describe how values differ from one region to the next
// * Don't forget CHIRPS is only available for the Southern Hemisphere
// [HINT: Lines 213 to 288]
// -------------------------------------------------------------------------
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ---> BONUS SECTION: WHAT ABOUT REGRESSION <---
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// REGRESSION
// Reduce the collection with the linear fit reducer.
// Independent variable are followed by dependent variables.
 var linearFit = annualRainNDVI.select(['rain', 'ndvi'])
                 .reduce(ee.Reducer.linearFit());
// Display the results.
 Map.centerObject(Botswana, 4.5);
 Map.addLayer(linearFit,
   {min: 0, max: [0.02, 0.76, 0.02], bands: ['scale', 'offset', 'scale']}, 'LinearFit Rain & NDVI');
// The result, with areas of increasing trend in blue, 
// decreasing trend in red and no trend in green
// -------------------------------------------------------------------------
// // -------------------------------------------------------------------------
// // ################################################################################
// // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//COMPARE GPM WITH CHIRPS
// filter province
var GMP_CHIRPS = table.filter(ee.Filter.eq("NAME_1","Botswana")).geometry();
// import rainfall data
var gpm = ee.ImageCollection("NASA/GPM_L3/IMERG_MONTHLY_V06").select("precipitation");
var chirps = ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY").select("precipitation");
// select period of interest
gpm = gpm.filterDate("2017-11-01","2018-12-01");
chirps = chirps.filterDate("2017-11-01","2018-12-01");
// Calculate the total amount of rain for your period
var gpmSum = gpm.mean().multiply(24*30).clip(Botswana)
var chirpsSum = chirps.sum().clip(Botswana);
/// Step 4: Add the data to them map
print(gpm);
print(chirps);
Map.addLayer(gpmSum,{min:0,max:400,palette:"white,blue,darkblue,purple"},"gpm")
Map.addLayer(chirpsSum,{min:0,max:400,palette:"white,blue,darkblue,purple"},"chirps")
var meanGPM = gpmSum.reduceRegion({reducer:ee.Reducer.mean(),geometry:Gemsbok,scale:25000,crs:"epsg:32644"});
print(meanGPM);
var meanCHIRPS = chirpsSum.reduceRegion({reducer:ee.Reducer.mean(),geometry:Gemsbok,scale:10000,crs:"epsg:32644"});
print(meanCHIRPS);