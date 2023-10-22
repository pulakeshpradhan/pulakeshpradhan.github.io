var M6Basin = ui.import && ui.import("M6Basin", "table", {
      "id": "users/drhamedtavakolifar/T6_Main_Basins"
    }) || ee.FeatureCollection("users/drhamedtavakolifar/T6_Main_Basins"),
    Iran = ui.import && ui.import("Iran", "table", {
      "id": "users/drhamedtavakolifar/Iran"
    }) || ee.FeatureCollection("users/drhamedtavakolifar/Iran"),
    M30Basin = ui.import && ui.import("M30Basin", "table", {
      "id": "users/drhamedtavakolifar/T30_Sub_Basins"
    }) || ee.FeatureCollection("users/drhamedtavakolifar/T30_Sub_Basins"),
    Province = ui.import && ui.import("Province", "table", {
      "id": "projects/ee-drhamedtavakolifar/assets/Province"
    }) || ee.FeatureCollection("projects/ee-drhamedtavakolifar/assets/Province"),
    lakemask = ui.import && ui.import("lakemask", "image", {
      "id": "projects/ee-drhamedtavakolifar/assets/new_mask"
    }) || ee.Image("projects/ee-drhamedtavakolifar/assets/new_mask");
// Initial Map properties
ui.root.clear();
var mainpanel = ui.Panel({style: {width: '350px', 
                                  position: 'top-left', 
                                  border: '1px solid black' }});
var maP = ui.Map();
ui.root.add(mainpanel).add(maP);
// Preparing DEM layer for background map 
var dsm_iran = ee.Image('CGIAR/SRTM90_V4').clip(Iran);
var elevPalette_dem = ['#84AB84', '#DFDBB5', '#AF8467', '#7F4F4B', '#5E3942','#422B3E'];
var elevParams_dem = {min: 10, max: 4000, palette: elevPalette_dem};
initialmap();
function initialmap(){
  maP.centerObject(Iran, 5);
  maP.setOptions("TERRAIN");
  maP.addLayer(Iran, {}, 'Iran Base Map', true, 0.6);
  maP.addLayer(dsm_iran, elevParams_dem, 'Elevation Model',false, 0.4);
  maP.addLayer(M30Basin, {color: 'blue'}, '2nd Degree Basins', false, 0.4);
  maP.addLayer(Province, {color: 'red'}, 'Proviences', false, 0.4);
}
// Create the title label and add it to Map
var maptitle = ui.Label({
  value: 'Iran Snow Cover Map',
  style: {position: 'top-center', fontSize: '30px', color: '484848', fontWeight: 'bold'}
});
maP.add(maptitle);
// Retrieving the date of the last available image of MOD10A1 collection 
// for snow cover and other dates
var MOD10A1_collection = ee.ImageCollection('MODIS/006/MOD10A1');
var last_available_data_start = ee.Image(MOD10A1_collection.sort('system:time_end', false).first()).date();
var last_available_data_end = last_available_data_start.advance(-8, 'day');
var previous_year_data_start = last_available_data_start.advance(-365, 'day');
var previous_year_data_end = last_available_data_start.advance(-373, 'day');
// Extracting the 8 day period max snow cover image colection
var snowCover_colection = MOD10A1_collection
              .filter(ee.Filter.date(last_available_data_end, last_available_data_start))
              .select('NDSI_Snow_Cover');
var snowCover8 = snowCover_colection.max();
var snowCover_iran8 = snowCover8.clip(Iran);
// Extracting the 8 day period max snow cover image colection in previous_year
var previous_year_snowCover_colection = MOD10A1_collection
              .filter(ee.Filter.date(previous_year_data_end, previous_year_data_start))
              .select('NDSI_Snow_Cover');
var previous_year_snowCover8 = previous_year_snowCover_colection.max();
var previous_year_snowCover_iran8 = previous_year_snowCover8.clip(Iran);
// Formating the dates of images
var data_range_start = last_available_data_start.format("YYYY-MM-dd");
var data_range_end = last_available_data_end.format("YYYY-MM-dd");
var previous_year_data_range_start = previous_year_data_start.format("YYYY-MM-dd");
var previous_year_data_range_end = previous_year_data_end.format("YYYY-MM-dd");
// Some initial variable
var IranSnowCoverImageCurrentYear = ee.Image();
var IranSnowCoverImagePreviousYear = ee.Image(); 
// Discription about the source of data
  var date_title00 = ui.Label('Sat Images from:', {color: 'red'}); 
  var date_title0 = ui.Label('The MOD10A1 V6 Snow Cover Daily Global 500m product', {color: 'red'}, 'https://developers.google.com/earth-engine/datasets/catalog/MODIS_006_MOD10A1'); 
  mainpanel.add(date_title00);
  mainpanel.add(date_title0);
// Create a section for NDSI changing and add it to Panel.
  var NDSI_title = ui.Label('NDSI Cut-off Threshold? ');
  mainpanel.add(NDSI_title);
  var NDSI_slider = ui.Slider(0,100,10,5);
  NDSI_slider.style().set('width', '300px');
  NDSI_slider.onChange(function() {
    setint();
  });
  mainpanel.add(NDSI_slider);
// Create a section for elevation changing and add it to Panel.
  var elv_title = ui.Label('Elevation Cut-off Threshold? ');
  mainpanel.add(elv_title);
  var elv_slider = ui.Slider(100,2000,100,100);
  elv_slider.onChange(function() {
    setint();
  });
  elv_slider.style().set('width', '300px');
  mainpanel.add(elv_slider);
// function for setting disable property of buttons
function setint(){
  calbot.setDisabled(false);
  B1resbot.setDisabled(true);
  B2resbot.setDisabled(true);
  Prresbot.setDisabled(true);
}
// Create a defult value button and add it to Panel.
  var button_defult = ui.Button('Default values...');
  mainpanel.add(button_defult);
  // Set a callback function to run when the
  // button is clicked.
  button_defult.onClick(function() {
    elv_slider.setValue(100);
    NDSI_slider.setValue(10);
  });
// Create Calculation botton
  var calbot = ui.Button('Calculation...');
// Create Main Basin Results Button
  var B1resbot = ui.Button('Show the Main Basins Results ...');
  B1resbot.setDisabled(true);
  B1resbot.onClick(function(){
    resultpanel2.clear();
    var B1 = zonalstat(IranSnowCoverImageCurrentYear,M6Basin);
    cartet(B1,'Snow Cover Area - Curent Year');
    var B2 = zonalstat(IranSnowCoverImagePreviousYear,M6Basin);
    cartet(B2,'Snow Cover Area - Previous Year');
  });
// Create 2d Basin Results Show Button
  var B2resbot = ui.Button('Show the 2nd Degree Basins Results ...');
  B2resbot.setDisabled(true);
  B2resbot.onClick(function(){
    resultpanel2.clear();
    var C1 = zonalstat(IranSnowCoverImageCurrentYear,M30Basin);
    cartet(C1,'Snow Cover Area - Curent Year');
    var C2 = zonalstat(IranSnowCoverImagePreviousYear,M30Basin);
    cartet(C2,'Snow Cover Area - Previous Year');
  });
// Creat Proviences Results Show Button
  var Prresbot = ui.Button('Show the Proviences Results ...')
  Prresbot.setDisabled(true);
  Prresbot.onClick(function(){
    resultpanel2.clear();
    var D1 = zonalstat(IranSnowCoverImageCurrentYear,Province);
    cartet(D1,'Snow Cover Area - Curent Year');
    var D2 = zonalstat(IranSnowCoverImagePreviousYear,Province);
    cartet(D2,'Snow Cover Area - Previous Year');
  });
  // Creat Proviences Results Show Button
  //var Exportbot = ui.Button('Export ...')
  //Exportbot.onClick(function(){
 //   Export.image.toDrive({
 //                         image: snowCover_iran8,
 //                         description: 'imageToDrive_mask',
 //                         scale: 500,
 //                         region: Iran
 //                       });
 // });
  //--------------------------------------
//---------------------------------------
  mainpanel.add(calbot);
  mainpanel.add(B1resbot);
  mainpanel.add(B2resbot);
  mainpanel.add(Prresbot);
//  mainpanel.add(Exportbot);
// Result panel on mainpanel
  var resultpanel = ui.Panel({style: {width: '300px', 
                                    position: 'top-left', 
                                    border: '1px solid black' }});  
  mainpanel.add(resultpanel);
     // Detailed Result Panel
  var resultpanel2 = ui.Panel({style: {width: '300px', 
                                    position: 'bottom-left', 
                                    border: '1px solid black' }});
  maP.add(resultpanel2);
  var respantitle = ui.Label('Detailed Result Panel');
  resultpanel2.add(respantitle)
// Snow cover layer visual parameters
var snowCoverVis = {
  min: 0.0,
  max: 100,
  palette: ['black', '0dffff', '0524ff', 'ffffff'],
};
// The clicking on 'Show Results' button
calbot.onClick(function() {
  // Getting the thresholds value
  var elv_th = elv_slider.getValue();
  var NDSI_th = NDSI_slider.getValue();
  // Clear the result panel and map and initialize it
  resultpanel.clear();
  maP.clear();
  initialmap();
  resultpanel2.clear();
  maP.add(resultpanel2);
  var respantitle = ui.Label('Detailed Result Panel');
  resultpanel2.add(respantitle)
  // Enabeling the zonal statestic button
  B1resbot.setDisabled(false);
  B2resbot.setDisabled(false);
  Prresbot.setDisabled(false);
  calbot.setDisabled(true);
  // Filttering the main ritrived snow cover maaps acording to thresholds for NDSI & Elevation & Mask
  IranSnowCoverImageCurrentYear = iransnowcover_filter(NDSI_th,elv_th,snowCover_iran8);
  IranSnowCoverImagePreviousYear = iransnowcover_filter(NDSI_th,elv_th,previous_year_snowCover_iran8);
  // Calculation over iran
  var totalcurent = sumtotal(IranSnowCoverImageCurrentYear);
  var totalper = sumtotal(IranSnowCoverImagePreviousYear);
  // Adding the finl snowcover layer to the map  
  maP.addLayer(IranSnowCoverImageCurrentYear, snowCoverVis, 'Current Year 8 day MAX Snow Cover');
  maP.addLayer(IranSnowCoverImagePreviousYear, snowCoverVis, 'Previous Year 8 day MAX Snow Cover');
  var date_title1 = ui.Label('Last Avalable Date: ' + data_range_start.getInfo());
  var date_title2 = ui.Label('Max 8-Day Snow Cover is : ' + totalcurent.getInfo() + ' Km^2');
  var date_title3 = ui.Label('(from ' + data_range_end.getInfo() + ' to ' + data_range_start.getInfo() + ')'); 
  resultpanel.add(date_title1);
  resultpanel.add(date_title2);
  resultpanel.add(date_title3);
  var date_title4 = ui.Label('-----------------------------------------'); 
  var date_title5 = ui.Label('Max 8-Day Snow Cover Previous Year is : ' + totalper.getInfo() + ' Km^2');
  var date_title6 = ui.Label('(from ' + previous_year_data_range_end.getInfo() + ' to ' + previous_year_data_range_start.getInfo() + ')'); 
  resultpanel.add(date_title4);
  resultpanel.add(date_title5);
  resultpanel.add(date_title6);
});  
// ..........................................
// Function for adding filters on retrieving snow cover data and return filtered layer
function iransnowcover_filter(NDSI,elv,map) {
// Creating a mask like layer for counting the snow detected pixels
// 3 conditions are considered:
// First: the elevation Cut-off Threshold
// Second: the NDSI Cut-off Threshold
// Third: the 'lakemask' to ignore the salty lakes
  var new_mask = (dsm_iran.gt(elv)
                  .multiply(map.gt(NDSI)))
                  .multiply(lakemask.eq(1));
  var map = map.updateMask(new_mask);
  return map;
}
function sumtotal(map){
  var sum_iransnowcaverarea = map.mask().multiply(ee.Image.pixelArea()) // sq meters
                                .reduceRegion({
                                  reducer: ee.Reducer.sum(),
                                  geometry: Iran,
                                  scale: 500,
                                  maxPixels: 1e9
                                });
  var sum_iransnowcaverarea_v = ee.Number(sum_iransnowcaverarea.get('NDSI_Snow_Cover')).multiply(ee.Number(0.000001)).round();
  return sum_iransnowcaverarea_v;
}
//.........................................
// Computing zonal Statistics
function zonalstat(map,zones){
  var zonstat = (map.gt(0)
                          .multiply(ee.Image.pixelArea()))
                          .multiply(ee.Image(ee.Number(0.000001)))
                                .reduceRegions({
                                  reducer: ee.Reducer.sum(),
                                  collection: zones,
                                  scale: 500
                                });
  return zonstat;
}
//-----------------------------------------
function cartet(fetucol,Title){
  var keys = fetucol.aggregate_array('Name');
  var valuesfloat = fetucol.aggregate_array('sum');
    // We define the operation using the EE API.
  var rounding = function(number) {
    return ee.Number(number).round();
  };
  // Apply your function to each item in the list by using the map() function.
  var values = valuesfloat.map(rounding);
  var keysSorted = keys.sort(values);
  var valuesSorted = values.sort(values);
  // Define the chart and print it to the mainpanel.
  var chart = ui.Chart.array.values({array: valuesSorted, axis: 0, xLabels: keysSorted})
                  .setChartType('ColumnChart')
                  .setSeriesNames(['Snow Cover'])
                  .setOptions({
                    title: Title,
                    colors: ['red'],
                    pointSize: 2,
                    dataOpacity: 1,
                    legend: {position: 'none'},
                    hAxis: {
                      'title': 'Name of Places',
                      titleTextStyle: {italic: false, bold: true}
                    },
                    vAxis: {
                      'title': 'Snow Cover Area - Km²',
                      titleTextStyle: {italic: false, bold: true}
                    }
                  });
  resultpanel2.add(chart);
}