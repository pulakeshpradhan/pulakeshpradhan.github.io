////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Demonstrates before / after forest cover maps comparison with a variety of dates
// modeled using code from Google's "Rangeland Fractional Cover" app from Tyler Erickson + Justin Braaten
// Emil A. Cherrington (eac0021@uah.edu)
// Last update: 11 July 2021
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PART 1: CALL PACKAGES CONTAINING DATA
var a = require('users/servirbz/packages:bz/bz'); // package for pulling various Belize + global datasets
var b = require('users/servirbz/packages:mcd43a4_glob1'); // package for pulling MODIS MCD43A4 data
var c = require('users/servirbz/packages:sma_std3'); // package for spectral mixture analysis (SMA)
var d = require('users/servirbz/packages:fcover_sma'); // package for deriving forest cover from SMA
var e = require('users/servirbz/packages:borrowed/mode_dark'); // package for including Dark Mode
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PART 2A: SET UP PERCENT PANEL SELECTOR
var x = {};
x.selectPercent = {};
x.selectPercent.label = ui.Label('Select PV threshold for forest cover', {fontSize: '14px', color: 'green'});
x.selectPercent.slider = ui.Slider({min: 0.50,max: 0.90,step: 0.05,style: {fontWeight: 'bold', stretch: 'horizontal', color: 'green'}});
x.selectPercent.slider.setValue(0.70);
x.selectPercent.panel = ui.Panel([x.selectPercent.label, x.selectPercent.slider]);
// PART 2B: SET UP LEFT AND RIGHT MAPS
var leftMap = {};
var rightMap = {};
///
leftMap.controlPanel = ui.Panel(); // Define a control panel for user input
leftMap.map = ui.Map(); // Define the main interactive map
leftMap.map.setOptions('Dark', {Dark: e.darkMode()});
leftMap.map.setOptions('TERRAIN');
leftMap.map.style().set({cursor: 'crosshair'});
leftMap.selectYear = {}; // Define a data year selector widget group
leftMap.selectYear.label = ui.Label('Select a year to display');
leftMap.selectYear.slider = ui.Slider({min: b.bandInfo.startYear, max: b.bandInfo.endYear, step: 1,style: {stretch: 'horizontal'}});
leftMap.selectYear.slider.setValue(2021);
leftMap.selectYear.panel = ui.Panel([leftMap.selectYear.label, leftMap.selectYear.slider]);
leftMap.selectBand = {}; // Define a data band selector widget group
leftMap.selectBand.label = ui.Label('Select a band to display');
leftMap.selectBand.selector = ui.Select(Object.keys(b.bandInfo.bands));
leftMap.selectBand.selector.setValue("MODIS_imagery");
leftMap.selectBand.panel = ui.Panel([leftMap.selectBand.label, leftMap.selectBand.selector]);
leftMap.selectBand.selector.onChange(updateMap1);
leftMap.selectYear.slider.onChange(updateMap1);
rightMap.controlPanel = ui.Panel();
rightMap.map = ui.Map();
rightMap.map.setOptions('Dark', {Dark: e.darkMode()});
rightMap.map.setOptions('TERRAIN');
rightMap.map.style().set({cursor: 'crosshair'});
rightMap.selectYear = {};
rightMap.selectYear.label = ui.Label('Select a year to display');
rightMap.selectYear.slider = ui.Slider({min: b.bandInfo.startYear, max: b.bandInfo.endYear, step: 1,style: {stretch: 'horizontal'}});
rightMap.selectYear.slider.setValue(2021);
rightMap.selectYear.panel = ui.Panel([rightMap.selectYear.label, rightMap.selectYear.slider]);
rightMap.selectBand = {};
rightMap.selectBand.label = ui.Label('Select a band to display');
rightMap.selectBand.selector = ui.Select(Object.keys(b.bandInfo.bands));
rightMap.selectBand.selector.setValue("Forest_cover");
rightMap.selectBand.panel = ui.Panel([rightMap.selectBand.label, rightMap.selectBand.selector]);
rightMap.selectBand.selector.onChange(updateMap2);
rightMap.selectYear.slider.onChange(updateMap2);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PART 3A: FOREST COVER MAPPING FUNCTION, WHICH CALLS BACK TO PERCENT SELECTOR PANEL
function fcover(img) {
  var pct = x.selectPercent.slider.getValue();
  return ee.Image(0).where(img.select('band_1').gt(pct).and(img.select('band_0').lt(1-pct)),1)
  .set('system:time_start',img.get('system:time_start')).select(['constant'],['canopy_cover']).clip(a.bz_buff)
  .updateMask(a.msk).updateMask(img.select([0]).mask());
}
// PART 3B: SET CONTROLS FOR UPDATING LAYERS IN EACH MAP WINDOW
function updateMap1() {
  leftMap.map.layers().reset();
  var year = leftMap.selectYear.slider.getValue();
  var band = leftMap.selectBand.selector.getValue();
  var image;
  if (band == 'MODIS_imagery') {
    image = b.mcd43a4_sma_.filterDate(ee.DateRange(ee.Date.fromYMD(year, 1, 1), ee.Date.fromYMD(year, 1, 1).advance(1, 'year'))).first().updateMask(a.msk).clip(a.bz_buff);
    leftMap.map.addLayer(image, {}, 'MODIS', true);
    leftMap.map.addLayer(a.bnds_w2,{palette: "white"},"Int'l boundaries", true);
    leftMap.map.addLayer(a.bz_dist2,{palette: "black"},"District boundaries", true);
    leftMap.map.addLayer(a.pa,{palette: "yellow"},"Protected areas", true);}
  else if (band == 'Forest_cover') {
    image = b.mcd43a4_sma_.map(fcover).filterDate(ee.DateRange(ee.Date.fromYMD(year, 1, 1), ee.Date.fromYMD(year, 1, 1).advance(1, 'year'))).first().updateMask(a.msk).clip(a.bz_buff).visualize({min:0,max:1,palette:['salmon','green']});
    leftMap.map.addLayer(image, {}, 'Forest_cover', true);
    leftMap.map.addLayer(a.hill_bz,{},"Hillshade", true);
    leftMap.map.addLayer(a.bnds_w2,{palette: "white"},"Int'l boundaries", true);
    leftMap.map.addLayer(a.bz_dist2,{palette: "black"},"District boundaries", true);
    leftMap.map.addLayer(a.pa,{palette: "yellow"},"Protected areas", true);}
}
function updateMap2() {
  rightMap.map.layers().reset();
  var year = rightMap.selectYear.slider.getValue();
  var band = rightMap.selectBand.selector.getValue();
  var image;
  if (band == 'MODIS_imagery') {
    image = b.mcd43a4_sma_.filterDate(ee.DateRange(ee.Date.fromYMD(year, 1, 1), ee.Date.fromYMD(year, 1, 1).advance(1, 'year'))).first().updateMask(a.msk).clip(a.bz_buff);
    rightMap.map.addLayer(image, {}, 'MODIS');
    rightMap.map.addLayer(a.bnds_w2,{palette: "white"},"Int'l boundaries", true);
    rightMap.map.addLayer(a.bz_dist2,{palette: "black"},"District boundaries", true);
    rightMap.map.addLayer(a.pa,{palette: "yellow"},"Protected areas", true);}
  else if (band == 'Forest_cover') {
    image = b.mcd43a4_sma_.map(fcover).filterDate(ee.DateRange(ee.Date.fromYMD(year, 1, 1), ee.Date.fromYMD(year, 1, 1).advance(1, 'year'))).first().updateMask(a.msk).clip(a.bz_buff).visualize({min:0,max:1,palette:['salmon','green']});
    rightMap.map.addLayer(image, {}, 'Forest_cover');
    rightMap.map.addLayer(a.hill_bz,{},"Hillshade");
    rightMap.map.addLayer(a.bnds_w2,{palette: "white"},"Int'l boundaries", true);
    rightMap.map.addLayer(a.bz_dist2,{palette: "black"},"District boundaries", true);
    rightMap.map.addLayer(a.pa,{palette: "yellow"},"Protected areas", true);}
}
// Sets the center coordinates for the left and right maps
leftMap.map.setCenter({lon: ui.url.get('lon', -88.35), lat: ui.url.get('lat', 17.256), zoom: ui.url.get('zoom', 9)});
rightMap.map.setCenter({lon: ui.url.get('lon', -88.35), lat: ui.url.get('lat', 17.256), zoom: ui.url.get('zoom', 9)});
updateMap1(); // Renders the left map
updateMap2(); // Renders the right map
// Function for updating URL based on location of map
function updateUrlParamMap(newMapParams) {
  ui.url.set('lat', newMapParams.lat);
  ui.url.set('lon', newMapParams.lon);
  ui.url.set('zoom', newMapParams.zoom);}
leftMap.map.onChangeBounds(ui.util.debounce(updateUrlParamMap, 100)); // posts coordinates of the map in the URL (based on the fxn above)
// Updates map when the percent slider is adjusted
x.selectPercent.slider.onChange(updateMap1);
x.selectPercent.slider.onChange(updateMap2);
// Function for updating the time series chart shown in the left panel
function updateChart() {
var chart2 = ui.Chart.image.series(b.mcd43a4_sma_.filterDate("2001-01-01","2022-01-01").map(fcover).map(b.x_pct), a.bz_buff, ee.Reducer.mean(),10000)
.setOptions({title: "Mean MODIS-derived canopy cover, 2001-2021: Belize",vAxis:{title:'% canopy cover'},
pointSize:5,series:{0:{color:'green'}}});
panel_chart.widgets().reset([ui.Label('⚙️ Processing... please wait...')]);
panel_chart.clear().add(chart2);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PART 4: UI PANEL + INITIATE THE SPLIT PANEL
var main = ui.Panel({style: {width: '350px', padding: '8px'}});
///
var splitPanel = ui.SplitPanel({firstPanel:leftMap.map, secondPanel:rightMap.map, wipe:true, style:{stretch: 'both'}});
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap.map, rightMap.map]);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PART 5: UI ELEMENTS
var title = ui.Label('Forest cover change, 2001-2021: Belize', {fontWeight: 'bold', fontSize: '22px', color: 'darkgreen'});
var descr = ui.Label('credits: derived from NASA MODIS data', {fontSize: '14px', color: 'gray'});
var credits = ui.Label('credits: derived from NASA MODIS data', {fontSize: '12px', color: 'gray'});
// Add color boxes
var makeRow = function(color1, color2) {
    var colorBox1 = ui.Label({style: {backgroundColor: '#008000',padding: '25px',margin: '0px 0px 0px 10px'}});
    var colorBox2 = ui.Label({style: {backgroundColor: '#FA8072', padding: '25px',margin: '0px 0px 0px 0px'}});
    return ui.Panel({widgets: [colorBox1,colorBox2],layout: ui.Panel.Layout.Flow('horizontal')});
};
var legend = ui.Label('Forest cover map legend:', {margin:'5px 0 5px 10px',fontSize:'11px',color:'black',fontWeight:'bold'});
var forest = ui.Label('forest', {margin:'5px 10px 10px 10px',fontSize:'11px',color:'green',fontWeight:'bold'});
var nf = ui.Label('non-forest', {margin:'5px 10px 10px 10px',fontSize:'11px',color:'salmon',fontWeight:'bold'});
var textBottom = ui.Panel([forest,nf], ui.Panel.Layout.flow('horizontal'));
var logos = ui.Panel([a.branding1, a.branding2], ui.Panel.Layout.flow('horizontal'));
// Add chart
var chart1 = ui.Chart.image.series(b.mcd43a4_sma_.filterDate("2001-01-01","2022-01-01").map(fcover).map(b.x_pct), a.bz_buff, ee.Reducer.mean(),10000)
.setOptions({title: "Mean MODIS-derived canopy cover, 2001-2021: Belize",vAxis:{title:'% canopy cover'},
pointSize:5,series:{0:{color:'green'}}});
// Add results panel which contains chart
var panel_chart = ui.Panel();
panel_chart.add(chart1);
x.selectPercent.slider.onChange(updateChart);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PART 6: ADD ITEMS TO UI
main.add(title);
main.add(descr);
main.add(ui.Label('Left map:', {fontWeight: 'bold'})).add(leftMap.selectBand.selector);
main.add(leftMap.selectYear.panel);
main.add(ui.Label('Right map:', {fontWeight: 'bold'})).add(rightMap.selectBand.selector);
main.add(rightMap.selectYear.panel);
main.add(x.selectPercent.panel);
main.add(panel_chart);
main.add(legend);
main.add(makeRow('FA8072', '008000'));
main.add(textBottom);
//main.add(linkPanel1);
main.add(logos);
ui.root.insert(0, main);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////// END ////////////////////////////////////////////////////////////////////////