var colors = {'transparent': '#11ffee00', 'gray': '#F8F9FA'};
var TITLE_STYLE = {
  fontWeight: '100',
  fontSize: '32px',
  padding: '8px',
  color: '#616161',
  backgroundColor: colors.transparent,
};
var SUBTITLE_STYLE = {
  fontWeight: '350',
  fontSize: '18px',
  padding: '4px',
  color: '#616161',
  textAlign: 'center',
  //maxWidth: '450px',
  backgroundColor: colors.transparent,
};
var PARAGRAPH_STYLE = {
  fontSize: '12px',
  fontWeight: '50',
  color: '#616161',
  padding: '2px',
  maxWidth: '500px',
  backgroundColor: colors.transparent,
};
var BUTTON_STYLE = {
  fontSize: '14px',
  fontWeight: '100',
  color: '#616161',
  padding: '8px',
  backgroundColor: colors.transparent,
};
var SELECT_STYLE = {
  fontSize: '14px',
  fontWeight: '50',
  color: '#616161',
  padding: '2px',
  backgroundColor: colors.transparent,
  width: '180px'
};
var LABEL_STYLE = {
  fontWeight: '50',
  textAlign: 'center',
  fontSize: '14px',
  padding: '2px',
  backgroundColor: colors.transparent,
};
var infoPanel = ui.Panel({
    layout: ui.Panel.Layout.flow(), 
    style: {
      stretch: 'horizontal',
      height: '100%',
      width: '450px',
      backgroundColor: colors.gray
    }
});
//////////////////////////////////////////////////////////
// data for Default Map of land cover types 
var lc_prod = ee.ImageCollection('MODIS/006/MCD12Q1');
// filtering: temporal
var lc_2018 = lc_prod.filterDate('2018-01-01', '2018-12-31');
// filtering: spatial
var aoi_ee_envelope = ee.Geometry.Polygon(
        [[[21.697630530405302, 59.8],
          [21.697630530405302, 57.46350959318097],
          [28.355345374155302, 57.46350959318097],
          [28.355345374155302, 59.8]]], null, false);
//Clip all images of Collection by AOI geometry
var mask = ee.Image.constant(1).clip(aoi_ee_envelope).mask();
var lc_2018 = lc_2018.map(function(image){return image.updateMask(mask)});
var mappingPanel = ui.Map({
    center: {'lat': 58.854, 'lon': 25.598, 'zoom': 7}
    // style: (if you'd like to add a map style, do so here!)
  });
var LC_layer = ui.Map.Layer(lc_2018.select('LC_Type1'), {
  min:1, max:17, palette:
  ['05450a','086a10','54a708','78d203','009900','c6b044','dcd159',
  'dade48','fbff13','b6ff05','27ff87','c24f44','a5a5a5','ff6d4c',
  '69fff8','f9ffa4','1c0dff']}, 'LAND COVER');
var layers = mappingPanel.layers();
layers.add(LC_layer);
ui.root.clear() // This is important to do to remove the "normal" GEE map
ui.root.add(ui.SplitPanel(mappingPanel, infoPanel)); // order matters!
var seasonPanel = ui.Panel({layout: ui.Panel.Layout.flow('horizontal'), 
                            style: {backgroundColor: colors.transparent}});
var visPanel = ui.Panel({style: {backgroundColor: colors.transparent}}); 
var graphPanel = ui.Panel({style: {backgroundColor: colors.transparent}});
// Since we are going to store the season/vis/graph panel within the infoPanel,
// we do not need to add it to the root. 
/////// INFO PANEL /////////
// To add text, you would add them as individual "ui.Label"
infoPanel.add(ui.Label(' NDVI to FAPAR', TITLE_STYLE));
var app_description = 'This application developed for the course Data sience in RS of the University of Tartu / Tartu Observatory.'+
' It calculates FAPAR values from NDVI 16-days conposite product MODIS/006/MOD13A1 under different landcover type from'+
' of MODIS/006/MCD12Q1 product LC_Type1. You can: 1/ select the month and year to calculate and visualise Fapar map over Estonia' +
' or 2/ click on the map to explore FAPAR seasonal changes (from April to October) for specified year.' 
infoPanel.add(ui.Label(app_description, PARAGRAPH_STYLE));
/////// SEASON PANEL ///////
infoPanel.add(seasonPanel);
//infoPanel.insert(2, ui.Label('PARAMETERS', SUBTITLE_STYLE))
infoPanel.insert(2, ui.Label('Choose year and month :', LABEL_STYLE))
// Create list of years & months for the widgets to pull from
var year_list = [
    {label: '2013', value: 2013},
    {label: '2014', value: 2014},
    {label: '2015', value: 2015},
    {label: '2016', value: 2016},
    {label: '2017', value: 2017},
    {label: '2018', value: 2018},
    {label: '2019', value: 2019}
  ];
var month_list = [
    {label: 'April (4)',value:  4},
    {label: 'May (5)',value:  5},
    {label: 'June (6)',value:  6},
    {label: 'July (7)',value:  7},
    {label: 'August (8)',value:  8},
    {label: 'September (9)',value: 9},
    {label: 'October (10)',value: 10},
  ];
var season_2_name = ui.Label('Months:', LABEL_STYLE)
var season_3_name = ui.Label('Year:', LABEL_STYLE)
var U_month = ui.Select({items: month_list, placeholder: 'Select a month', value:7, style: SELECT_STYLE})
var U_year = ui.Select({items: year_list, placeholder: 'Select a year', value: 2018, style: SELECT_STYLE})
// print(month, year)
var season2 = ui.Panel({style: {backgroundColor: colors.transparent}})
var season3 = ui.Panel({style: {backgroundColor: colors.transparent}})
season2.add(season_2_name).add(U_month)
season3.add(season_3_name).add(U_year)
seasonPanel.add(season2).add(season3)
//for landcover selection
var landcoverPanel = ui.Panel({layout: ui.Panel.Layout.flow('horizontal'), 
                            style: {backgroundColor: colors.transparent}});
var Landcover_list = [
    {label: 'Evergreen needleleaf forest', value: 0},
    {label: 'Deciduous broadleaf forest', value: 1},
    {label: 'Mixed forest', value: 2},
    {label: 'Short vegetation and crops',value: 3},
 //   {label: 'Croplands', value: 12},
 //   {label: ' Cropland/Natural Vegetation Mosaics',value:14},
  ];
// All values that "users" will provide input have a "U" in front of them
infoPanel.insert(4, ui.Label('Choose the Landcover type :', LABEL_STYLE))
// All values that "users" will provide input have a "U" in front of them
var U_Landcover_selector = ui.Select({items: Landcover_list, placeholder: 'Mixed forest', value: 2, style: SELECT_STYLE});
infoPanel.insert(5, U_Landcover_selector);
// We made the visPanel above!
infoPanel.add(visPanel)
/////// BUILD FAPAR PANEL ///////
var buttonHold = ui.Panel({layout: ui.Panel.Layout.flow('horizontal'), style: {backgroundColor: colors.transparent, textAlign: 'center', stretch: 'both', padding: '4px'}})
infoPanel.add(buttonHold);
// Add the run & clear buttons
var runButton = ui.Button({label: 'Display map', style: {width: '125px', maxWidth: '250px', color: '#616161'}});
var clearButton = ui.Button({label: 'Clear map', style: {width: '125px', maxWidth: '250px', color: '#616161'}});
buttonHold.add(runButton).add(clearButton);
/////////////////////////////////////////////////////////
// Dispay map click //
//////////////////////////////////////////
var clearMap = clearButton.onClick(function() {
 var layers = mappingPanel.layers()
 layers.forEach(function(x) {
   mappingPanel.remove(x) 
  })
});
// Make a panel to host the buttons (for layout purposes)
var buttonHold = ui.Panel({layout: ui.Panel.Layout.flow('horizontal'), style: {backgroundColor: colors.transparent, textAlign: 'center', stretch: 'both', padding: '4px'}})
infoPanel.add(buttonHold)
// DISPLAY MAP with Choises
var buildFapar = runButton.onClick(function() {
    var year = U_year.getValue();
    var month = U_month.getValue();
// test point OR received from API
// in the test 'Mixed forest'=3 OR from API value from 1 to 4
    var lc_type = U_Landcover_selector.getValue();  
    //print(year, month, lc_type);
    // dates calculation of two IC
    var season_start = year + '-04-01';
    var season_end = year + '-10-30';
    var month_start = year + '-' + month + '-01';
    var month_end = year + '-' + month + '-30';
    // dates for LC product
    var lc_start = year + '-01-01';
    var lc_end = year + '-12-30';  
    var lc_prod = ee.ImageCollection('MODIS/006/MCD12Q1').select('LC_Type1').filterDate(lc_start, lc_end).first()
    //MODIS NDVI 16-day composite 500m, same resolution as LC
    var ndvi_season = ee.ImageCollection('MODIS/006/MOD13A1').select('NDVI').filterDate(season_start, season_end);
    //Filtering: Spatial //Clip all images by AOI geometry
    var mask = ee.Image.constant(1).clip(aoi_ee_envelope).mask();
    var lc = lc_prod.clip(aoi_ee_envelope);
    // Clip & rescale NDVI to convinient -1 to 1   and clip to AOI geometry  
    var ndvi_season_r = ndvi_season.map(function(image){return image.updateMask(mask).multiply(0.0001)
    .copyProperties(image).set('system:time_start', image.get('system:time_start'))});
    // print(ndvi_season)
////////////////////////////////////////////////////////////////////////
// Prepare IC for season form April to October with MODIS land cover
// Land Cover masks
var con_mask = lc.eq(1); // 1- Evergreen needleleaf forest
var dec_mask = lc.eq(4); //  4 Deciduous broadleaf forest
var mix_mask = lc.eq(5); // 5 Mixed forest
var short_mask = lc.gte(6).and(lc.lte(12)).or(lc.eq(14)); // 6-12, 14 - Short vegetation 
// ---FAPAR calculation goes here--------
var masks = [con_mask, dec_mask, mix_mask, short_mask];
var nam = ['Coniferous', 'Deciduous', 'Mixed_f', 'Short_veg'];
var coef_005 = [-0.134, -0.134, -0.134, -0.134];
var coef_098 = [0.860, 0.908, 0.892, 0.856];
var ic = ndvi_season_r
//print(ic)
//var img1 = ic.first()
function clip_and_glue(img){
  var i;
  for (i = 0; i < 4; i++) {
    var ndvi = img.mask(masks[i]);
    var f = ((ndvi.subtract(ee.Number(coef_005[i]))
    .divide(ee.Number(coef_098[i]).subtract(ee.Number(coef_005[i]))))
    .multiply(0.95)); 
    img=img.addBands(f.select('NDVI').rename(nam[i]));
  }
  var fapar = img.select('Coniferous', 'Deciduous', 'Mixed_f', 'Short_veg')
  .reduce(ee.Reducer.max())
  .copyProperties(img).set('system:time_start', img.get('system:time_start'))
  .set('system:index', img.get('system:index'));
  //return fapar.select("max").rename('FAPAR');
  return fapar
}
var season_fapar=ic.map(clip_and_glue);
//lc_fapar=season_fapar.map(function(img){return (img.select('max').rename('FAPAR'))});
//print('season fapar', year, season_fapar);
var visFAPAR = {min:0, max:1.0, palette: [ 'blue', 'red', 'yellow', 'green']};  
var fapar_layer=ui.Map.Layer(season_fapar.filterDate(month_start, month_end).first(), visFAPAR,'FAPAR_for_'+year+'_'+month, true);    
var layers = mappingPanel.layers();
layers.add(fapar_layer);  
return season_fapar  
});
///////////////////////////
/////// GRAPH PANEL ///////
///////////////////////////
// default location - TÕRAVERE
var click1 = ee.Geometry.Point([26.465650617571814, 58.26569009422866]);
// We made the graphPanel above!
infoPanel.add(graphPanel)
var chartOnly = ui.Panel()
var displayGraph = ui.Button({label: 'Display graph', style: BUTTON_STYLE})
var graphTitle = ui.Label('FAPAR seasonal graph for selected year', SUBTITLE_STYLE)
var graph_description = 'Click on the map to select location. Default location is Tartu Observtory, Tõravere.'+
' Hoov over the graph with your mouse to check for particular values and image dates';
// Populating the graph panel
graphPanel.add(graphTitle).add(ui.Label(graph_description, PARAGRAPH_STYLE));
graphPanel.add(displayGraph).add(chartOnly)
/////////////////////////////////////////////////////////
// Adding onMapClick function: adding a POI to the map //
/////////////////////////////////////////////////////////
mappingPanel.add(ui.Label('Click on map to create point, \nthen click "Display graph" button'))
mappingPanel.style().set('cursor', 'crosshair')
mappingPanel.onClick(function(coords) {
  click1 = ee.Geometry.Point(coords.lon, coords.lat)
  var point_layer = ui.Map.Layer(click1 , {}, 'POI')
  mappingPanel.setCenter(coords.lon, coords.lat, 12)
  mappingPanel.addLayer(click1, {color: 'FF0000'}, 'Selected location');
});
//Map.addLayer(click1, {color: 'FF0000'}, 'Selected location');
///////////////////////////////////////////////////
// Adding display graph button onClick function  //
///////////////////////////////////////////////////
var center_point = mappingPanel.getCenter()
displayGraph.onClick(function(){
  chartOnly.clear()
    var year = U_year.getValue();
    var month = U_month.getValue();
// test point OR received from API
// in the test 'Mixed forest'=3 OR from API value from 1 to 4
    //print(year, month, lc_type);
    // dates calculation of two IC
    var season_start = year + '-04-01';
    var season_end = year + '-10-30';
    var month_start = year + '-' + month + '-01';
    var month_end = year + '-' + month + '-30';
    // dates for LC product
    var lc_start = year + '-01-01';
    var lc_end = year + '-12-30';  
    var lc_prod = ee.ImageCollection('MODIS/006/MCD12Q1').select('LC_Type1').filterDate(lc_start, lc_end).first()
    //MODIS NDVI 16-day composite 500m, same resolution as LC
    var ndvi_season = ee.ImageCollection('MODIS/006/MOD13A1').select('NDVI').filterDate(season_start, season_end);
    //Filtering: Spatial //Clip all images by AOI geometry
    var mask = ee.Image.constant(1).clip(aoi_ee_envelope).mask();
    var lc = lc_prod.clip(aoi_ee_envelope);
    // Clip & rescale NDVI to convinient -1 to 1   and clip to AOI geometry  
    var ndvi_season_r = ndvi_season.map(function(image){return image.updateMask(mask).multiply(0.0001)
    .copyProperties(image).set('system:time_start', image.get('system:time_start'))});
    // print(ndvi_season)
////////////////////////////////////////////////////////////////////////
// Prepare IC for season form April to October with MODIS land cover
// Land Cover masks
var con_mask = lc.eq(1); // 1- Evergreen needleleaf forest
var dec_mask = lc.eq(4); //  4 Deciduous broadleaf forest
var mix_mask = lc.eq(5); // 5 Mixed forest
var short_mask = lc.gte(6).and(lc.lte(12)).or(lc.eq(14)); // 6-12, 14 - Short vegetation 
// ---FAPAR calculation goes here--------
var masks = [con_mask, dec_mask, mix_mask, short_mask];
var nam = ['Coniferous', 'Deciduous', 'Mixed_f', 'Short_veg'];
var coef_005 = [-0.134, -0.134, -0.134, -0.134];
var coef_098 = [0.860, 0.908, 0.892, 0.856];
var ic = ndvi_season_r
//print(ic)
//var img1 = ic.first()
function clip_and_glue(img){
  var i;
  for (i = 0; i < 4; i++) {
    var ndvi = img.mask(masks[i]);
    var f = ((ndvi.subtract(ee.Number(coef_005[i]))
    .divide(ee.Number(coef_098[i]).subtract(ee.Number(coef_005[i]))))
    .multiply(0.95)); 
    img=img.addBands(f.select('NDVI').rename(nam[i]));
  }
  var fapar = img.select('Coniferous', 'Deciduous', 'Mixed_f', 'Short_veg')
  .reduce(ee.Reducer.max())
  .copyProperties(img).set('system:time_start', img.get('system:time_start'))
  .set('system:index', img.get('system:index'));
  //return fapar.select("max").rename('FAPAR');
  return fapar
}
var season_fapar=ic.map(clip_and_glue);
//lc_fapar=season_fapar.map(function(img){return (img.select('max').rename('FAPAR'))});
//print('season fapar', year, season_fapar);
var lc_type = U_Landcover_selector.getValue(); 
    //print(lc_type)
var lc_fapar = ic.map(function(image){return (image.subtract(ee.Number(-0.134))
.divide(ee.Number(coef_098[lc_type] - (-0.134)).multiply(0.95))
.copyProperties(image).set('system:time_start', image.get('system:time_start'))
)});
lc_fapar=lc_fapar.map(function(img){return (img.select('NDVI').rename('FAPAR'))});
  var seasonal_graph = ui.Chart.image.series({ 
  imageCollection: season_fapar.select('max'), 
  region: click1, 
  reducer: ee.Reducer.first(), 
  scale: 1000 })
  .setSeriesNames(['fAPAR'])
  .setOptions({title: 'FAPAR at selected point/year with MODIS LC, April - October',
  vAxis: {title: 'FAPAR'},
  lineWidth: 1,
  pointSize: 4
  })  
  // scenario 3
  var lc_graph= ui.Chart.image.series({ 
  imageCollection: lc_fapar.select('FAPAR'), 
  region: click1, 
  reducer: ee.Reducer.first(), 
  scale: 1000 })
  .setSeriesNames(['fAPAR'])
  .setOptions({title: 'FAPAR at selected point/year & user defined LC, April - October',
  vAxis: {title: 'FAPAR'},
  lineWidth: 1,
  pointSize: 4
  })    
  chartOnly.add(seasonal_graph).add(lc_graph)
})
infoPanel.add(ui.Label())