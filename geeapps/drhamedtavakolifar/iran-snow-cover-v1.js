var iranbasins = ui.import && ui.import("iranbasins", "table", {
      "id": "users/drhamedtavakolifar/Iran"
    }) || ee.FeatureCollection("users/drhamedtavakolifar/Iran"),
    lakemask = ui.import && ui.import("lakemask", "image", {
      "id": "projects/ee-drhamedtavakolifar/assets/MaskForLakes"
    }) || ee.Image("projects/ee-drhamedtavakolifar/assets/MaskForLakes");
// Adding DEM layer as background map
var dsm = ee.Image("JAXA/ALOS/AW3D30/V2_2");
var dsm_iran = dsm.select('AVE_DSM').clip(iranbasins);
var elevPalette = ['#84AB84', '#DFDBB5', '#AF8467', '#7F4F4B', '#5E3942','#422B3E'];
var elevParams = {min: 10, max: 4000, palette: elevPalette};
Map.centerObject(iranbasins, 6);
Map.setOptions("TERRAIN");
//Map.setCenter(51, 33);
//Map.addLayer(dsm_iran, elevParams, 'Elevation Model');
Map.addLayer(iranbasins, {}, 'Iran Base Map');
// Create the title label and add it to Map
var maptitle = ui.Label({
  value: 'Iran Snow Cover Map',
  style: {position: 'top-center', fontSize: '30px', color: '484848', fontWeight: 'bold'}
});
Map.add(maptitle);
// Create a panel to hold the widgets and add it to Map.
var mainpanel = ui.Panel({
  style: {width: '400px', position: 'bottom-left'}
});
Map.add(mainpanel);
// Determining the date of last available image of MOD10A1 collection
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
var snowCover_iran8 = snowCover8.clip(iranbasins);
// Extracting the 8 day period max snow cover image colection in previous_year
var previous_year_snowCover_colection = MOD10A1_collection
              .filter(ee.Filter.date(previous_year_data_end, previous_year_data_start))
              .select('NDSI_Snow_Cover');
var previous_year_snowCover8 = previous_year_snowCover_colection.max();
var previous_year_snowCover_iran8 = previous_year_snowCover8.clip(iranbasins);
var snowCoverVis = {
  min: 0.0,
  max: 100,
  palette: ['black', '0dffff', '0524ff', 'ffffff'],
};
// .............................
function iransnowcover(NDSI,elv,title,map) {
  //var snowCover_iran8_m = snowCover_iran8.gt(NDSI);
  //var dsm_iran_m = dsm_iran.gt(elv);
  //var new_mask = dsm_iran.gt(elv).multiply(map.gt(NDSI));
  var new_mask = (dsm_iran.gt(elv).multiply(map.gt(NDSI))).multiply(lakemask.eq(1));
  //var new_mask = new_maskdata.eq(1);
  //main_snowCover_iran = main_snowCover_iran1;
  var sum_iransnowcaverarea = new_mask.multiply(ee.Image.pixelArea()) // sq meters
                                .reduceRegion({
                                  reducer: ee.Reducer.sum(),
                                  geometry: iranbasins,
                                  scale: 500,
                                  maxPixels: 1e9
                                });
  var sum_iransnowcaverarea_v = ee.Number(sum_iransnowcaverarea.get('AVE_DSM')).multiply(ee.Number(0.000001)).round();
  var map = map.updateMask(new_mask);
  Map.addLayer(map, snowCoverVis, title);
  return sum_iransnowcaverarea_v;
}
  var data_range_start = last_available_data_start.format("YYYY-MM-dd");
  var data_range_end = last_available_data_end.format("YYYY-MM-dd");
  var previous_year_data_range_start = previous_year_data_start.format("YYYY-MM-dd");
  var previous_year_data_range_end = previous_year_data_end.format("YYYY-MM-dd");
  var date_title00 = ui.Label('Base Sat Images:', {color: 'red'}); 
  var date_title0 = ui.Label('The MOD10A1 V6 Snow Cover Daily Global 500m product', {color: 'red'}, 'https://developers.google.com/earth-engine/datasets/catalog/MODIS_006_MOD10A1'); 
  var date_title1 = ui.Label('Last Avalable Date: ' + data_range_start.getInfo()); 
  var date_title2 = ui.Label('Max 8-Day Snow Cover is : ' + iransnowcover(10,100,'Current Year 8 day MAX Snow Cover',snowCover_iran8).getInfo() + ' Km^2');
  var date_title3 = ui.Label('(from ' + data_range_end.getInfo() + ' to ' + data_range_start.getInfo() + ')'); 
  mainpanel.add(date_title00);
  mainpanel.add(date_title0);
  mainpanel.add(date_title1);
  mainpanel.add(date_title2);
  mainpanel.add(date_title3);
  var date_title4 = ui.Label('-----------------------------------------'); 
  var date_title5 = ui.Label('Max 8-Day Snow Cover Previous Year is : ' + iransnowcover(10,100,'Previous Year 8 day MAX Snow Cover',previous_year_snowCover_iran8).getInfo() + ' Km^2');
  var date_title6 = ui.Label('(from ' + previous_year_data_range_end.getInfo() + ' to ' + previous_year_data_range_start.getInfo() + ')'); 
  mainpanel.add(date_title4);
  mainpanel.add(date_title5);
  mainpanel.add(date_title6);
// Create a section for NDSI changing and add it to Panel.
//var NDSI_title = ui.Label('NDSI Cut-off Threshold? ');
//mainpanel.add(NDSI_title);
//var NDSI_slider = ui.Slider(0,100,10,5);
//NDSI_slider.style().set('width', '300px');
//mainpanel.add(NDSI_slider);
// Create a section for elevation changing and add it to Panel.
//var elv_title = ui.Label('Elevation Cut-off Threshold? ');
//mainpanel.add(elv_title);
//var elv_slider = ui.Slider(100,2000,100,100);
//elv_slider.style().set('width', '300px');
//mainpanel.add(elv_slider);
// Create a apply chenge button and add it to Panel.
//var button = ui.Button('Apply changes...');
//mainpanel.add(button);
// Set a callback function to run when the
// button is clicked.
//button.onClick(iransnowcover(ee.Number(NDSI_slider.getValue()),ee.Number(elv_slider.getValue()),snowCover_iran8));
// Create a defult value button and add it to Panel.
//var button_defult = ui.Button('Defult values...');
//mainpanel.add(button_defult);
// Set a callback function to run when the
// button is clicked.
//button_defult.onClick(function() {
//  elv_slider.setValue(100);
//  NDSI_slider.setValue(10);
//});
//print(NDSI_slider.getValue());