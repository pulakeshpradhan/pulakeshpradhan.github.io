var POI = /* color: #d63000 */ee.Geometry.Point([-65.00258169181865, -19.36419030430422]),
    ROI = ee.FeatureCollection("ft:17q8Tchp3XBXdNICl7-K90vfbWoux1AEEcjr3UUGN");
//############################################################################# 
//## GEE Skript zur Extraktion von Niederschlagsdaten (CHIRPS) fur 
//## definierten Punkt. Einfach den Punkt (POI) verschieben und auf
//## Run klicken. Skript extrahiert dann die Niederschlagswerte fur den Punk
//## stellt den Zeitverlauf in der Console dar und erstellt einen Export
//## Task zum exportieren der Werte in ein CSV File. Fur den Export muss
//## auf den Task Reiter gewechselt werden und den Task gestartet werden.
//## das CSV file wird in die Google Drive exportiert.
//#############################################################################
// Define selection parameters - only used for visualizing the graphs in the 
// console. The export tasks actually export all values from the entire time
// series of CHIRPS (1.1.1981 - today (31.3.2019 as of 5.5.2019)
var start_year = 2015;
var end_year = 2018;
var start_month = 1;
var end_month = 12;
var start_day = 1;
var end_day = 31;
// Define dates for which a precipitation map should be displayed and exported as tiff.
var dates_list = [ee.Date.fromYMD(2015,2,1), ee.Date.fromYMD(2018,2,1) ];
print(dates_list)
// Get a polygon of the country in question
var countries = ee.FeatureCollection('ft:1tdSwUL7MVpOauSgRzqVTOwdfy17KDbw-1d9omPw'); // Feature table containing all polygons of all countries
// Get a feature collection with just the Congo feature
var Bolivia = countries.filter(ee.Filter.eq('Country','Bolivia'));
// Center Map on POI
Map.centerObject(POI,8)
// Function to retrieve precipitation statistics at POI
function getPrecStats_POI(img){
  var out = img.reduceRegion({
    reducer: ee.Reducer.first(),
    geometry: POI,
    scale: 5000
  });
  var prec = out.get('precipitation');
  var dict = {longitude: POI.coordinates().get(0) ,latitude: POI.coordinates().get(1), year: img.get('year'), month: img.get('month'), day: img.get('day'), precipitation: out.get('precipitation')}
  var stats = ee.Feature(null, dict)
  stats = stats.set('system:time_start',img.get('system:time_start'))
  return stats
}
// Combine the mean and standard deviation reducers.
var reducers = ee.Reducer.mean().combine({
  reducer2: ee.Reducer.stdDev(),
  sharedInputs: true
});
// Function to retrieve precipitation statistics at ROI
function getPrecStats_ROI(img){
  var out = img.reduceRegion({
    reducer: reducers,
    geometry: ROI,
    scale: 5000
  });
  var prec_avg = out.get('precipitation_mean');
  var prec_std = out.get('precipitation_stdDev');
  var dict = {year: img.get('year'), month: img.get('month'), day: img.get('day'), avg_precipitation: prec_avg, std_precipitation: prec_std}
  var stats = ee.Feature(null,dict)
  stats = stats.set('system:time_start',img.get('system:time_start'))
  return stats
}
//###############################################
//## Loading and processing of data - no user input required -- These steps are only for the output in the console, not relevant for the export tasks!
//###############################################
// Laden des CHIRPS Datensatzes - only Pentad dataset currently used, to reduce amount of data
var CHIRPS_Collection = ee.ImageCollection('UCSB-CHG/CHIRPS/DAILY');
// Just for visualizing purposes, map precipitation sum of 2018 on map
var CHIRPS_2018_Collection = CHIRPS_Collection.filterDate(ee.Date.fromYMD(2018,1,1),ee.Date.fromYMD(2018,12,31));
var CHIRPS_2018_Sum = CHIRPS_2018_Collection.sum(); 
Map.addLayer(CHIRPS_2018_Sum,{palette: ['0000FF', '00FF00', 'FF0000'], min: 0, max: 4500},'2018 Precipitation sum [mm]')
// Filter dataset based on user defined time period
var CHIRPS_Collection_timeFiltered = CHIRPS_Collection.filterDate(ee.Date.fromYMD(start_year,start_month,start_day),ee.Date.fromYMD(end_year,end_month,end_day));
var prec_stats_poi = CHIRPS_Collection_timeFiltered.map(getPrecStats_POI);
// Print stats at POI for selected time frame into console
print(ui.Chart.feature.byFeature(prec_stats_poi,"system:time_start","precipitation").setOptions({
            title: 'Precipitation for POI',
            vAxis: {title: 'Precipitation [mm]'},
            hAxis: {title: 'Time'},
            lineWidth: 1,
            pointSize: 4
          }))
// Do the same but for the whole region of interest and extract avg and std for the entire region
var prec_stats_roi = CHIRPS_Collection_timeFiltered.map(getPrecStats_ROI)
// Try to print avg precipitation for ROI in console
print(ui.Chart.feature.byFeature(prec_stats_roi,"system:time_start","avg_precipitation").setOptions({
            title: 'Avg. Precipitation for ROI',
            vAxis: {title: 'Precipitation [mm]'},
            hAxis: {title: 'Time'},
            lineWidth: 1,
            pointSize: 4
          }))
// Add feature table to map
Map.addLayer(ROI,{},'ROI');
//###############################################
// Now prepare the CHIRPS dataset for exportation 
// of the whole CHIRPS time series for defined ROI 
// and POI
//###############################################
// retrieve statistics for POI
var prec_stats_poi_total = CHIRPS_Collection.map(getPrecStats_POI);
// retrieve statistics for ROI
var prec_stats_roi_total = CHIRPS_Collection.map(getPrecStats_ROI);
// Export statistics at POI to csv file
Export.table.toDrive({
  collection: prec_stats_poi_total,
  description: 'Precipitation_Stats_Daily_POI',
  fileFormat: 'CSV'
});
// Export statistics at ROI to csv file
Export.table.toDrive({
  collection: prec_stats_roi_total,
  description: 'Precipitation_Stats_Daily_ROI',
  fileFormat: 'CSV'
});
//###############################################
// Display and export maps for specified dates
// within the dates_list variable
//###############################################
var export_imgs = dates_list.map(function(d){
  print('d',ee.Date(d))
  // extract desired image
  var img = CHIRPS_Collection.filterDate(d).first();
  var str = ee.String('Daily_Precipitation_').cat(ee.String(ee.Date(d).format("dd-MM-YYYY"))).getInfo();
  // Visualize image 
  Map.addLayer(img, {palette: ['0000FF','00FF00','FF0000'], min:0, max:60}, str);
  Export.image.toDrive({
    image: img,
    description: str,
    region: Bolivia,
    scale: 5000,
    crs: 'EPSG:4326'
  });
  return img;
})
//###############################################
// Show an example for an anomalie image
// In this example we compare the precipitation
// sum of the entire 2015 with the previous years
// (1981 - 2014) to show precipitation anomalies
//###############################################
// calculate yearly sum of precipitation
var years = ee.List.sequence(1981,2018,1);
// Define the reference period
var start_year_ref = 1981;
var end_year_ref = 2014;
// Define comparison year
var comp_year = 2015
var yearly_comp = ee.ImageCollection(
  years.map(function (y) {
    var start = ee.Date.fromYMD(y,1,1);
    var stop = ee.Date.fromYMD(y,12,31);
    return CHIRPS_Collection
        .filterDate(start,stop)
        .sum()
        .set({'system:time_start': start.millis()})
        .set({'year': y})
  }).flatten()
);
// Get the average precipitation amount for the reference years
var CHIRPS_ref_years_avg = yearly_comp.filterDate( ee.Date.fromYMD(start_year_ref,1,1), ee.Date.fromYMD(end_year_ref,12,31)).mean();
// Get the precipitation sum for the comparison year
var CHIRPS_comp_year_sum = yearly_comp.filterDate(ee.Date.fromYMD(comp_year,1,1), ee.Date.fromYMD(comp_year,12,31)).first();
// Calculate anomalies (Reference years - comparison year)
var annomalies = CHIRPS_ref_years_avg.subtract(CHIRPS_comp_year_sum);
// Visualize Reference and Comparison years
var Layername = ee.String('Precipitation_Average_').cat(start_year_ref.toString()).cat('-').cat(end_year_ref.toString()).getInfo();
Map.addLayer(CHIRPS_ref_years_avg,{palette: ['0000FF','00FF00','FF0000'],min: 0, max: 4500}, Layername);
// Export Reference image
Export.image.toDrive({
    image: CHIRPS_ref_years_avg,
    description: Layername,
    region: Bolivia,
    scale: 5000,
    crs: 'EPSG:4326'
});
// Visualize Reference year
var Layername = ee.String('Precipitation_Sum_').cat(comp_year.toString()).getInfo();
Map.addLayer(CHIRPS_comp_year_sum,{palette: ['0000FF','00FF00','FF0000'],min: 0, max: 4500}, Layername);
// Export Reference image
Export.image.toDrive({
    image: CHIRPS_comp_year_sum,
    description: Layername,
    region: Bolivia,
    scale: 5000,
    crs: 'EPSG:4326'
});
// Visualize Annomaly image in blue to red colortable. Red = less precipitation than reference years, blue = more prec. than reference years.
var Layername = ee.String('Precipitation_Annomaly_').cat(start_year_ref.toString()).cat('-').cat(end_year_ref.toString()).cat('_vs_').cat(comp_year.toString()).getInfo();
Map.addLayer(annomalies,{palette: ['0000FF','FFFFFF','FF0000'], min:-600, max:600},Layername)
// Export Annomalies image
Export.image.toDrive({
    image: annomalies,
    description: Layername,
    region: Bolivia,
    scale: 5000,
    crs: 'EPSG:4326'
});