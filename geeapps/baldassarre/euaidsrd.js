///////////////////////// FUNCTIONS LANDSAT////////////////////////////////////
var R0 = /* color: #98ff00 */ee.Geometry.Polygon([[[102.31055668333124, 22.470932173452912],[104.99147273001046, 20.09598924312439],[104.31026913536178, 19.703403002940213],[104.09052755239023, 19.45495631200151],[105.16727431469123, 18.415721486990506],[106.63954489754578, 16.78202369135061],[107.5624423451943, 14.411752666478984],[107.54045736504303, 12.55280601268495],[105.8045350697372, 10.939354885953557],[103.98073324712598, 10.29142572007977], [104.85968226547959, 8.557351925286486],[107.12294693460578, 10.244684748146206],[108.72702792099997, 11.582362884084592],[109.05666068368728, 13.939584567504728],[108.2656176696601, 15.639196247395818],[107.5492381755165, 16.35132841410601],[106.98074863285576, 17.207699497780947],[105.7825527691312, 18.8288230681727],[107.51854129564323, 21.97945256989721],[106.58861007221464, 22.632739550771014],[105.34305415787587, 22.994628678960517],[102.59622566556213, 22.548848254067302]]]),
    R1 = ee.Geometry.Polygon([[[103.28606284254411, 22.59606121987643],[103.28606284254411, 20.655712869082397],[107.50481284254411, 20.655712869082397],[107.50481284254411, 22.59606121987643]]], null, false),
    R2 = ee.Geometry.Polygon([[[103.96721518629411, 19.7277231080247],[103.96721518629411, 16.76488952258612],[107.59270346754411, 16.76488952258612],[107.59270346754411, 19.7277231080247]]], null, false),
    R3 =  ee.Geometry.Polygon([[[106.81816733473161, 15.2866249325324],[106.81816733473161, 10.76564411675397],[109.13078940504411, 10.76564411675397],[109.13078940504411, 15.2866249325324]]], null, false),
    R4 = ee.Geometry.Polygon([[[104.54949057691911, 10.835790189883383],[104.54949057691911, 8.561795017958087],[106.54900229566911, 8.561795017958087],[106.54900229566911, 10.835790189883383]]], null, false);
///////////////////////// PARAMETERS LANDSAT //////////////////////////////////
var cloudCoverPerc = 50;// Maximum cloud cover percentage
var radius = 1.5; // Focal mean parameters
var kernelType = 'square';var units = 'pixels';var iterations = 2;
////////////////FUNCTIONS LANDSAT - Background//////////////////////////////////
function fillGap(img){
  return img.focal_mean(radius, kernelType, units, iterations).blend(img);
}
function cloudMaskL457(image) {
  var qa = image.select('pixel_qa');
  // If the cloud bit (5) is set and the cloud confidence (7) is high
  // or the cloud shadow bit is set (3), then it's a bad pixel.
  var cloud = qa.bitwiseAnd(1 << 5)
                  .and(qa.bitwiseAnd(1 << 7))
                  .or(qa.bitwiseAnd(1 << 3));
  // Remove edge pixels that don't occur in all bands
  var mask2 = image.mask().reduce(ee.Reducer.min());
  return image.updateMask(cloud.not()).updateMask(mask2);
}
function maskL8srClouds(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = (1 << 3);
  var cloudsBitMask = (1 << 5);
  // Get the pixel QA band.
  var qa = image.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return image.updateMask(mask);
}
function rename(img){
  return img.select(
    ['B1', 'B2', 'B3', 'B4', 'B5', 'B7'],
    ['B2', 'B3', 'B4', 'B5', 'B6', 'B7']);
}
///////////////////////// FUNCTIONS DRAWING////////////////////////////////////
// CLEAR LAST
function clearPolyLast() { 
if(drawingTools.layers().get(0)!==undefined) {  
  var layers = drawingTools.layers();
  var last = layers.get(0).geometries().length();
 if (last > 0){
  layers.get(0).geometries().remove(layers.get(0).geometries().get(last-1));
  }
}}
// Show the chart panel if this is the first time a point is clicked.
// CLEAR ALL
function clearPolygons() {
  //selectedPoints = [];
if(drawingTools.layers().get(0)!==undefined) {
  var layers = drawingTools.layers();
  var last = layers.get(0).geometries().length();
 if (last > 0){
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);}
}}
function exitDraw() {
drawingTools.stop()	;    //drawingTools.stop()	
}
// Define the geometry clearing function.
function drawRectangle() {
  drawingTools.setShape('rectangle');
  drawingTools.draw();
}
function drawPolygon() {
  drawingTools.setShape('polygon');
  drawingTools.draw();
}
/*******************************************************************************
* CHOOSE THE BACKGROUND
******************************************************************************/
var Dark = [
{
featureType: 'administrative',
elementType: 'all',
//stylers: [{visibility: 'off'}]
stylers: [{color: 'white'},{visibility: 'on'}]
},
{
featureType: 'administrative',
elementType: 'labels.text.fill',
//stylers: [{color: '#444444'}]
stylers: [{color: 'cyan'},{visibility: 'on'}]
},
{
featureType: 'landscape',
elementType: 'all',
//stylers: [{color: '#000000'}, {visibility: 'on'}]
//stylers: [{color: '#DCDCDC'}, {visibility: 'on'}] // #696969
//stylers: [{color: '#778899'}, {visibility: 'on'}] //LightSlateGrey
stylers: [{color: '#696969'}, {visibility: 'on'}] //DimGrey
},
{featureType: 'poi', elementType: 'all', stylers: [{visibility: 'off'}]}, {
featureType: 'road',
elementType: 'all',
stylers: [{saturation: -100}, {lightness: 45}]
},
{
featureType: 'road',
elementType: 'geometry.fill',
stylers: [{color: '#B8B8B8'}]
},
{
featureType: 'road',
elementType: 'geometry.stroke',
stylers: [{color: '#C0C0C0'}]
},
{featureType: 'road', elementType: 'labels', stylers: [{visibility: 'off'}]},
{
featureType: 'road',
elementType: 'labels.text.fill',
stylers: [{color: '#C0C0C0'}]
},
{
featureType: 'road',
elementType: 'labels.icon',
stylers: [{visibility: 'off'}]
},
{
featureType: 'road.highway',
elementType: 'all',
stylers: [{visibility: 'simplified'}]
},
{
featureType: 'road.arterial',
elementType: 'labels.icon',
stylers: [{visibility: 'off'}]
},
{featureType: 'transit', elementType: 'all', stylers: [{visibility: 'off'}]},
{
featureType: 'water',
elementType: 'all',
//stylers: [{color: '#434343'}, {visibility: 'on'}]
stylers: [{color: '#000000'}, {visibility: 'on'}]
//stylers: [{color: '#4169E1'}, {visibility: 'on'}] // RoyalBlue
//stylers: [{color: '#191970'}, {visibility: 'on'}]   // MidnightBlue
}
];
/*******************************************************************************
 * Model *
 *
 * A section to define information about the data being presented in your
 * app.
 *
 * Guidelines: Use this section to import assets and define information that
 * are used to parameterize data-dependant widgets and control style and
 * behavior on UI interactions.
 ******************************************************************************/
// Study Regions
var VNM_0 = ee.FeatureCollection("users/baldassarre/OGB/gadm40_VNM_0"); // Country
var VNM_05 = ee.FeatureCollection("users/baldassarre/OGB/VNM_05"); // Regions
// Units of Analysis
var VNM_051 = ee.FeatureCollection("users/baldassarre/OGB/VNM_051"); // Sub-Regions
var VNM_1 = ee.FeatureCollection("users/baldassarre/OGB/VNM_1"); // Provinces
var VNM_2 = ee.FeatureCollection("users/baldassarre/OGB/VNM_2"); // Districts
var VNM_3 = ee.FeatureCollection("users/baldassarre/OGB/VNM_3"); // Communes
//////////////////////////////////// STYLE ////////////////////////////////////
//var COUNTRIES_STYLE = {color: 'cyan', fillColor: '00000000',width: .5};//26458d
//This section defines the drawing control panel,which contains instructions and drawing tool buttons.
var symbol = {rectangle: '⬛',polygon: '🔺',};
var COUNTRIES_STYLE = {palette: 'cyan',width: .0001}
var COUNTRIES_width = .00001;
var LossGain_STYLE  = {min:-1,max:1,palette:"red,blue"};
var palettes = require('users/gena/packages:palettes');//Other color pallette for Canopy Cover
var HIGHLIGHT_STYLE = {color: 'yellow', fillColor: '00000000',width: 1};//8856a7//8856a7
/////////////////////////////////DATASET///////////////////////////////////////
var prefix  = 'projects/servir-mekong/UMD/tree_canopy/tcc_';
var prefix1 = 'users/baldassarre/OGB/';
// The tcc Servir-Mekong dataseries from 1988 to 2020
var tcc = ee.ImageCollection("projects/servir-mekong/UMD/tree_canopy");
var tcc = tcc.filterDate('1980-01-01', '2030-01-01')
// ADD CORRECT DATE for two more years
tcc2020 = ee.Image(prefix+'2020'); var may_date = 1577843200000; // 2020
var tcc2020 = tcc2020.set({'system:time_start': may_date});
tcc2021 = ee.Image(prefix+'2021');var may_date = 1609465600000; // 2021
var tcc2021 = tcc2021.set({'system:time_start': may_date});
// merge
var tcc2019 = tcc.filterDate('1980-01-01', '2030-01-01');
var tcc2020 = tcc2019.merge(tcc2020);
var tcc = tcc2020.merge(tcc2021);
// // use a function to create a image collection with forest layers
// var calcForest = function(img){
// var forest = img.gt(10)
//           .multiply(ee.Image.pixelArea()) // To help compute areas, Earth Engine has the ee.Image.pixelArea() method which generates an image in which the value of each pixel is the pixel's area in square meters.
//           .divide(10000)                  // to convert m2 to ha
//           .set("system:time_start",img.get("system:time_start"));
// return forest};
// var tcc_forest = tcc.map(calcForest);
/*******************************************************************************
******************************************************************************/
/*
* Study area ----------------------------------------
*/
// Define a JSON object for storing model info (app data).
var v0 = {};
// Define the image collection. bname: Band Name; uname: Unit Name
v0.col = ee.FeatureCollection('users/baldassarre/OGB');
v0.imgInfo = {lands: {
'Country': {prefix:'VNM_0',rname:'Country',bname:'Vietnam',color:'cyan',zoom:5.6,uname:'Country',region: 0},
'North':   {prefix:'VNM_05',rname: 'North',bname: 'North',color: 'cyan',zoom: 7,uname:'VARNAME_05',region:1},
'North Central': {prefix: 'VNM_05',rname: 'North Central',bname:'NorthCentral',color:'cyan',zoom:7,uname:'VARNAME_05',region:2},
'South Central': {prefix: 'VNM_05',rname: 'South Central',bname: 'SouthCentral',color: 'cyan',zoom: 6.5,uname:'VARNAME_05',region:3},
'South': {prefix: 'VNM_05',rname: 'South',bname: 'South',color: 'cyan',zoom: 8,uname:'VARNAME_05',region: 4},
},};
/*
* Percentage of TCC ----------------------------------------
*/
var p = {};
p.imgInfo = {'>10': {per: 10},'>15': {per: 15},'>20': {per: 20},'>25': {per: 25},
             '>30': {per: 30},'>50': {per: 50},'>75': {per: 75}};
/*
* Units of Analysis ----------------------------------------
*/
// Define a JSON object for storing model info (app data).
var v = {};
// Define the image collection. rname: readible name; uname: Unit Name
v.col = ee.FeatureCollection('users/baldassarre/OGB');
v.imgInfo = {units: {
'Regions': {rname: 'Regions',bname: 'VNM_05',color: 'cyan',zoom: 5,uname:'VARNAME_01',region: 'Region'},
//'Sub-Regions': {rname: 'Sub-Regions',bname: 'VNM_051',color: 'cyan',zoom: 6,uname:'VARNAME_0',region: 'Region'},
'Provinces': {rname: 'Provinces',bname: 'VNM_1',color: 'cyan',zoom: 8,uname:'VARNAME_1',region: 'Region'},
'Districts': {rname: 'Districts',bname: 'VNM_2',color: 'cyan',zoom: 9,uname:'VARNAME_2',region: 'Region'},
'Communes': {rname: 'Communes',bname: 'VNM_3',color: 'cyan',zoom: 11,uname:'VARNAME_3',region: 'Region'},
},};
/*
* DATASET:  ----------------------------------------
*/
// Define a JSON object for storing model info (app data).
var m = {};
// Define the image collection.
m.col = ee.ImageCollection('projects/servir-mekong/UMD/tree_canopy');
// Define info about the bands in this collection that the app will present.
m.imgInfo = {bands: {
'Canopy Cover0': {bname: 'b1',color: '38814e',vis: {min: 0,max: 75,palette: palettes.colorbrewer.YlOrRd[9].slice(2,9),opacity:0.6}},
'Canopy Cover': {bname: 'b1',color: '38814e',vis: {min: 0,max: 75,palette: palettes.colorbrewer.YlGn[9].slice(2,9),opacity:0.6}
}},startYear: 1988,endYear: 2021,};
// Define information for example locations.
m.exLocInfo = {
  'North: Coffee plantations in Son La Province': {
    urlSlug: 'ex3',
    rname: 'North',
    lon: 103.9199, lat: 21.341, zoom: 11,
    desc: 'In recent decades in northwest Vietnam, Arabica coffee has been grown on sloping land in intensive, full sun monocultures that are not sustainable in the long term and have negative environmental impacts. There is an urgent need to reverse this negative trend by promoting good agricultural practices, including agroforestry, to prevent further deforestation and soil erosion on slopes (Nguyen et al., 2020).',
    desc1: 'Learn More:',
    txt: 'Video of our project in Thuan Chau District and links to accademic papers',
    txt1: 'Technical report about mapping smallholder coffee production systems in Thuan Chau District',
    txt2: 'Trends in tree canopy cover in Thuan Chau District (2000-2021)',
    txt3: 'Research Project: Developing and promoting market-based agroforestry and forest rehsbilitstion options for northwest Vietnam',
    txtUrl: 'https://www.youtube.com/watch?v=i9aKtECsYz8',
    txtUrl1: 'https://docs.google.com/document/d/1BCaWszXkUjRTW3X79z26URfVvMGy4U2q/edit',
    txtUrl2: 'https://docs.google.com/document/d/167ZLOBxMwDrTUxHWtvvn9URjM-3AY1vv/edit#heading=h.gjdgxs',
    txtUrl3: 'https://www.researchgate.net/project/Developing-and-promoting-market-based-agroforestry-and-forest-rehsbilitstion-options-for-northwest-Vietnam-2',
  },
  'South: Mangrove Loss in Tam Gian Dong': {
    urlSlug: 'ex1',
    rname: 'South',
    lon: 105.21, lat: 8.7967, zoom: 11,
    desc: 'In Tam Gian Dong commune (Ca Mau Province), mangroves are disappearing due to simultaneous erosion and conversion to commodities.',
    desc1: 'Learn More:',
    txt: 'Global Mangrove Loss Drivers',
    txt1: 'Mangroves in Ca Mau', 
    txtUrl: 'https://mangrovescience.earthengine.app/view/global-mangrove-loss-drivers',
    txtUrl1: 'https://baldassarre.users.earthengine.app/view/srd',
  },
  'South: Mangrove Growth in Dat Mui': {
    urlSlug: 'ex2',
    rname: 'South',
    lon:  104.74, lat: 8.6217, zoom: 11,
    desc: 'In Dat Mui commune (Ca Mau Province), mangroves are increasing.'+
    ' After an initial decres at the beginning of the 90, mangrove forest'+
    ' have increased along the cosatline from 1996 untill today. Explore TCC time series inside the communes or draw polygons along the coastline. '+
    'Or visualize the Landsat maps for the selected 1st and 2nd year of analysis',
    desc1: 'Learn More:',
    txt: 'Global Mangrove Height & Biomass Explorer',
    txt1: '',
    txtUrl: 'https://mangrovescience.earthengine.app/view/mangroveheightandbiomass',
    txtUrl1: '',
  },
  //   'North Central: ...': {
  //   urlSlug: 'ex4',
  //   rname: 'North Central',
  //   lon: 105.812, lat: 18.500, zoom: 11,
  //   desc: '...',
  //   desc1: 'Learn More:',
  //   txt: '',
  //   txt1: '',
  //   txtUrl: '',
  //   txtUrl1: '',
  // },
  //   'South Central: ...': {
  //   urlSlug: 'ex5',
  //   rname: 'South Central', 
  //   lon: 107.847, lat: 13.001, zoom: 11,
  //   desc: '...',
  //   desc1: 'Learn More:',
  //   txt: '',
  //   txt1: '',
  //   txtUrl: '',
  //   txtUrl1: '',
  // },
  //   'Country: ...': {
  //   urlSlug: 'ex6',
  //   rname: 'Country',
  //   lon: 107.847, lat: 16.264, zoom: 5.7,
  //   desc: '...',
  //   desc1: 'Learn More:',
  //   txt: 'SRD',
  //   txt1: '',
  //   txtUrl: 'http://www.srd.org.vn/',
  //   txtUrl1: '',
  // },
};
/*******************************************************************************
 * Components *
 *
 * A section to define the widgets that will compose your app.
 *
 * Guidelines:
 * 1. Except for static text and constraints, accept default values;
 *    initialize others in the initialization section.
 * 2. Limit composition of widgets to those belonging to an inseparable unit
 *    (i.e. a group of widgets that would make no sense out of order).
 ******************************************************************************/
// Define a JSON object for storing UI components.
var c = {};
// Define a control panel for user input.
c.controlPanel = ui.Panel();
// Define a series of panel widgets to be used as horizontal dividers.
c.dividers = {};
c.dividers.divider0 = ui.Panel();c.dividers.divider1 = ui.Panel();c.dividers.divider6 = ui.Panel()
c.dividers.divider2 = ui.Panel();c.dividers.divider3 = ui.Panel();
c.dividers.divider4 = ui.Panel();c.dividers.divider5 = ui.Panel();
// Define the main interactive map.
c.map = ui.Map();
///////////////////////// DRAWING TOOL /////////////////////////////////////////
var drawingTools = c.map.drawingTools();//var drawingTools = Map.drawingTools();
drawingTools.setShown(false);//drawingTools.setShown(false);
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);}
var dummyGeometry =ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '23cba7'});
//var dummyGeometry =ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '0000ff'});
drawingTools.layers().add(dummyGeometry);
////////////////////////////////////////////////////////////////////////////////
// Define an app info widget group.
c.info = {};
c.info.titleLabel = ui.Label('Forest Change Vietnam');
c.info.aboutLabel = ui.Label(
'Annual Tree Canopy Cover (TCC) product\nthat spans Vietnam from 1988 to 2021 at\n30 m resolution.\nExplore the data and Forest Loss and\nGain (LG) by selecting combinations of\nStudy Regions, Percentage of TCC and\nYears.\n'+
'Inspect the time series inside selected\nAdministrative Units or inside polygons\ncreated by the user.\n'+
'Check out or case studies in different\nregions of Vietnam.', {whiteSpace: 'pre'});
c.info.aboutLabel1 = ui.Label('To share location copy URL');
c.info.paperLabel = ui.Label({
value: 'Read about the dataset',
targetUrl: 'https://glad.umd.edu/vietnam'});
c.info.websiteLabel = ui.Label({
value: 'Methodology',
targetUrl: 'https://mygeoblog.com/2021/11/23/analyzing-forest-time-series/'});
c.info.panel = ui.Panel([ 
c.info.titleLabel, c.info.aboutLabel, c.info.aboutLabel1,
c.info.paperLabel, c.info.websiteLabel
]);
// Define a Study Reagion selector widget group.
c.selectArea = {};
c.selectRegion = {};
c.selectRegion.label = ui.Label('Study region');
c.selectRegion.selector = ui.Select(Object.keys(v0.imgInfo.lands),null,'South');
c.selectRegion.panel = ui.Panel([c.selectRegion.label, c.selectRegion.selector]);
// Define a Boundary selector widget group.
c.selectBoundary = {};
//c.selectBoundary.label = ui.Label('Units of Analysis');
c.selectBoundary.label = ui.Checkbox('Adm. Units').setValue(1);
c.selectBoundary.selector = ui.Select(Object.keys(v.imgInfo.units),null,'Provinces');
c.selectBoundary.panel = ui.Panel([c.selectBoundary.label, c.selectBoundary.selector]);
c.selectArea.panel = ui.Panel({
layout: ui.Panel.Layout.flow('horizontal'),
style: {stretch: 'horizontal', maxWidth: '270px', padding: '0px 0px 0px 8px'}});
c.selectArea.panel.add(c.selectRegion.panel).add(c.selectBoundary.panel)
//c.selectArea.panel = ui.Panel([c.selectRegion.panel, c.selectBoundary.panel]);
// Define a Study Reagion selector widget group.
c.selectPer = {};
c.selectPerlabel = {};
c.selectPerlabel.label = ui.Label('Displaying TCC ');//Tree cover with
c.selectPerlabel1 = {};
//c.selectPerlabel1.label = ui.Label(' canopy density');
c.selectPer.selector = ui.Select(Object.keys(p.imgInfo),null,'>30');
c.selectPer.panel = ui.Panel({
layout: ui.Panel.Layout.flow('horizontal'),
style: {stretch: 'horizontal', maxWidth: '270px', padding: '0px 0px 0px 8px'}});
c.selectPer.panel.add(c.selectPerlabel.label).add(c.selectPer.selector)//.add(c.selectPerlabel1.label)
// Define a data year selector widget group for YEAR 0
c.selectYear0 = {};
c.selectYear0.label = ui.Checkbox('1st Year').setValue(0);
c.selectYear0.slider = ui.Slider({min: m.imgInfo.startYear,max: m.imgInfo.endYear,step: 1});
c.selectYear0B = {};
c.selectYear0B.label = ui.Checkbox('1st Year').setValue(0);
//c.selectYear.panel0 = ui.Panel([c.selectYear.label,c.selectYear.label1]);
c.selectYear0B.panel = ui.Panel({
layout: ui.Panel.Layout.flow('horizontal'),
style: {stretch: 'horizontal', maxWidth: '270px', padding: '0px 0px 0px 0px'}});
c.selectYear0B.panel.add(c.selectYear0.label).add(c.selectYear0.slider)//.add(c.selectYear0B.label)
c.selectYear0.panel = ui.Panel([c.selectPer.panel, c.selectYear0B.panel]);//, c.selectYear0.slider
// Define a data year selector widget group for YEAR
c.selectYear = {};
c.selectYear.label = ui.Checkbox('2nd Year').setValue(0);
c.selectYear.slider = ui.Slider({min: m.imgInfo.startYear,max: m.imgInfo.endYear,step:1});
c.selectYearB = {};
c.selectYearB.label = ui.Checkbox('2nd Year').setValue(0);
//c.selectYear.panel0 = ui.Panel([c.selectYear.label,c.selectYear.label1]);
c.selectYearB.panel = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {stretch: 'horizontal', maxWidth: '270px', padding: '0px 0px 0px 0px'}
  });
c.selectYearB.panel.add(c.selectYear.label).add(c.selectYear.slider)//.add(c.selectYearB.label)
c.selectYear.panel = ui.Panel([c.selectYearB.panel]);//c.selectYear.slider
// Define a Loss and Gain selector widget group.
c.LossGain = {};
c.LossGain.label = ui.Checkbox('Loss and Gain between 1st and 2nd.').setValue(1);
c.LossGain.panel = ui.Panel([c.LossGain.label]);
// Define a Chart and Map for A.U. selector widget group.
c.selectAU = {};
c.selectAUlabel = {};
c.selectAUlabel.label = ui.Label('Inspect the time series inside selected Adm. Units.');
c.selectAUchart = {};
c.selectAUchart.label = ui.Checkbox('Chart time series').setValue(0);
c.selectAUmap = {};
c.selectAUmap.label = ui.Checkbox('Map Landsat').setValue(0);
c.selectAUchart.panel = ui.Panel({
layout: ui.Panel.Layout.flow('horizontal'),
style: {stretch: 'horizontal', maxWidth: '270px', padding: '0px 0px 0px 8px'}});
c.selectAUchart.panel.add(c.selectAUchart.label).add(c.selectAUmap.label)
c.selectAUmap.panel = ui.Panel({
layout: ui.Panel.Layout.flow('vertical'),
style: {stretch: 'horizontal', maxWidth: '270px', padding: '0px 0px 0px 148px'}});
c.selectAUmap.panel.add(c.selectYear0B.label).add(c.selectYearB.label)
c.selectAU.panel = ui.Panel([c.selectAUlabel.label, c.selectAUchart.panel, c.selectAUmap.panel]);
// Define a Polygon selector widget group.
c.selectPolygon = {};
//c.selectPolygon.label = ui.Label('Select a drawing mode.')
c.selectPolygon.label = ui.Label('Inspect the time series inside selected\npolygons.\nSelect a drawing mode.', {whiteSpace: 'pre'})
c.selectPolygonPol = {};
c.selectPolygonPol0 = 
ui.Button({label: symbol.point +' Adm Unit',style: {stretch: 'horizontal'}})//onClick: getSelectedCountries,
c.selectPolygonPol1 = 
ui.Button({label: symbol.polygon +' Polygon',onClick: drawPolygon,style: {stretch: 'horizontal'}})
c.selectPolygonPol2 = 
ui.Button({label: symbol.rectangle +' Rectangle',onClick: drawRectangle,style: {stretch: 'horizontal'}})
c.selectPolygonPol.panel = ui.Panel({
layout: ui.Panel.Layout.flow('horizontal'),
style: {stretch: 'horizontal', maxWidth: '270px', padding: '0px 0px 0px 8px'}});
c.selectPolygonPol.panel.add(c.selectPolygonPol1).add(c.selectPolygonPol2)//.add(c.selectPolygonPol0)
c.selectPolygonClear = {};
c.clearLastPoly = 
ui.Button({label: 'Clear Last',onClick: clearPolyLast,style: {stretch: 'horizontal'}})
c.clearAllPoly = 
ui.Button({label: 'Clear all & Exit',onClick: clearPolygons,style: {stretch: 'horizontal'}})
c.exitDrawing = 
ui.Button({label: 'Exit',onClick: exitDraw,style: {stretch: 'horizontal'}})
c.selectPolygonClear.panel = ui.Panel({
layout: ui.Panel.Layout.flow('horizontal'),
style: {stretch: 'horizontal', maxWidth: '270px', padding: '0px 0px 0px 8px'}});
c.selectPolygonClear.panel.add(c.clearLastPoly).add(c.exitDrawing).add(c.clearAllPoly)
c.selectPolygon.panel = ui.Panel([c.selectPolygon.label,c.selectPolygonPol.panel]);//c.selectPolygon.label,
// Define a panel to hold the time series chart.
// 1st Chart Panel 
c.chart = {};
c.chart.shownButton = ui.Button('Hide chart');
c.chart.shownButton1 = ui.Button('Clear results');
c.chart.buttontPanel = ui.Panel([c.chart.shownButton,c.chart.shownButton1],
ui.Panel.Layout.Flow('horizontal'));//  //,{margin: '0 0 0 auto', width: '300px'}
c.chart.container = ui.Panel();  // will hold the dynamically generated chart.
c.chart.chartPanel = ui.Panel([c.chart.buttontPanel, c.chart.container]);
// 2nd Chart Panel 
var d = {};
d.chart = {};
d.chart.shownButton = ui.Button('Hide chart');
d.chart.shownButton1 = ui.Button('Clear results');
d.chart.buttontPanel = ui.Panel([d.chart.shownButton,d.chart.shownButton1],
ui.Panel.Layout.Flow('horizontal'));//  //,{margin: '0 0 0 auto', width: '300px'}
d.chart.container = ui.Panel();  // will hold the dynamically generated chart.
d.chart.chartPanel = ui.Panel([d.chart.buttontPanel, d.chart.container]);
var chartPanel = ui.Panel({
  style:{height: '155px', width: '300px', position: 'bottom-left', shown: false}});
// Define an example location selector widget group.
c.selectExample = {};
c.selectExample.label = ui.Label('Our Case Studies.');
c.selectExample.selector = ui.Select({
  items: Object.keys(m.exLocInfo),
  placeholder: 'Select a location...',
});
c.selectExample.descLabel = ui.Label();
c.selectExample.descLabel1 = ui.Label();
//c.selectExample.txt = ui.Label(); 
//c.selectExample.txtUrl = ui.Label(); 
c.selectExample.panel = ui.Panel([
  c.selectExample.label,
  c.selectExample.selector,
  c.selectExample.descLabel,
  c.selectExample.descLabel1,
  ]);
/*******************************************************************************
 * Composition *
 *
 * A section to compose the app i.e. add child widgets and widget groups to
 * first-level parent components like control panels and maps.
 *
 * Guidelines: There is a gradient between components and composition. There
 * are no hard guidelines here; use this section to help conceptually break up
 * the composition of complicated apps with many widgets and widget groups.
 ******************************************************************************/
//c.map.add(c.selectPolygon.panel);
c.controlPanel.add(c.info.panel);
c.controlPanel.add(c.dividers.divider0);
c.controlPanel.add(c.selectArea.panel);
c.controlPanel.add(c.dividers.divider1);
c.controlPanel.add(c.selectYear0.panel);
c.controlPanel.add(c.selectYear.panel);
c.controlPanel.add(c.LossGain.panel);
c.controlPanel.add(c.dividers.divider2);
c.controlPanel.add(c.selectAU.panel);
c.controlPanel.add(c.dividers.divider3);
c.controlPanel.add(c.selectPolygon.panel); 
c.controlPanel.add(c.selectPolygonClear.panel); 
c.controlPanel.add(c.dividers.divider4);
c.controlPanel.add(c.selectExample.panel);
//c.controlPanel.add(c.selectExampleUrl.panel);
//c.controlPanel.add(c.dividers.divider5);
c.map.add(c.chart.chartPanel);
c.map.add(d.chart.chartPanel);
c.map.add(chartPanel);
ui.root.clear();
// change the order if you wanna put on the left swipe the panels
ui.root.add(c.map);
ui.root.add(c.controlPanel);
/*******************************************************************************
 * Styling *
 *
 * A section to define and set widget style properties.
 *
 * Guidelines:
 * 1. At the top, define styles for widget "classes" i.e. styles that might be
 *    applied to several widgets, like text styles or margin styles.
 * 2. Set "inline" style properties for single-use styles.
 * 3. You can add multiple styles to widgets, add "inline" style followed by
 *    "class" styles. If multiple styles need to be set on the same widget, do
 *    it consecutively to maintain order.
 ******************************************************************************/
// Define CSS-like class style properties for widgets; reusable styles.
var s = {};
s.opacityWhiteMed = {backgroundColor: 'rgba(255, 255, 255, 0.5)'};
s.opacityWhiteNone = {backgroundColor: 'rgba(255, 255, 255, 0)'};
s.aboutText = {fontSize: '13px',color: '505050'};
s.widgetTitle = {fontSize: '15px',fontWeight: 'bold',margin: '8px 8px 0px 8px',color: '383838'};
s.stretchHorizontal = {stretch: 'horizontal'};
s.noTopMargin = {margin: '0px 8px 8px 8px'};
s.smallBottomMargin = {margin: '8px 8px 4px 8px'};
s.bigTopMargin = {margin: '24px 8px 8px 8px'};
s.divider = {backgroundColor: 'F0F0F0',height: '4px',margin: '20px 0px'};
// Set widget style.
c.info.titleLabel.style().set({
fontSize: '20px',
fontWeight: 'bold'
});
c.info.titleLabel.style().set(s.bigTopMargin);
c.info.aboutLabel.style().set(s.aboutText);
c.info.paperLabel.style().set(s.aboutText);
c.info.paperLabel.style().set(s.smallBottomMargin);
c.info.websiteLabel.style().set(s.aboutText);
c.info.websiteLabel.style().set(s.noTopMargin);
c.selectRegion.selector.style().set(s.stretchHorizontal);
c.selectRegion.label.style().set(s.widgetTitle);
c.selectYear0.slider.style().set(s.stretchHorizontal);
c.selectYear0.label.style().set(s.aboutText);
c.selectYear.slider.style().set(s.stretchHorizontal);
c.selectYear.label.style().set(s.aboutText);
c.selectBoundary.selector.style().set(s.stretchHorizontal);
c.selectBoundary.label.style().set(s.widgetTitle);
c.controlPanel.style().set({width: '275px',padding: '0px',});
c.map.setOptions('Dark', {Dark: Dark});//c.map.setOptions('HYBRID');
// Chart 1 *********************
c.chart.chartPanel.style().set({
position: 'bottom-right',
shown: false
});
c.chart.chartPanel.style().set(s.opacityWhiteMed);
c.chart.shownButton.style().set({
margin: '0px 0px',
});
c.chart.shownButton1.style().set({
margin: '0px 0px',
});
// Chart 2 *********************
d.chart.chartPanel.style().set({
position: 'bottom-left',
shown: false
});
d.chart.chartPanel.style().set(s.opacityWhiteMed);
d.chart.shownButton.style().set({
margin: '0px 0px',
});
d.chart.shownButton1.style().set({
margin: '0px 0px',
});
// Loop through setting divider style.
Object.keys(c.dividers).forEach(function(key) {
c.dividers[key].style().set(s.divider);
});
/*******************************************************************************
 * Behaviors *
 *
 * A section to define app behavior on UI activity.
 *
 * Guidelines:
 * 1. At the top, define helper functions and functions that will be used as
 *    callbacks for multiple events.
 * 2. For single-use callbacks, define them just prior to assignment. If
 *    multiple callbacks are required for a widget, add them consecutively to
 *    maintain order; single-use followed by multi-use.
 * 3. As much as possible, include callbacks that update URL parameters.
 ******************************************************************************/
function getPropertyValueList(dataModelDict, propertyName){
// Get a list of values for a specified property name.
var result = [];
for (var key in dataModelDict) {result.push(dataModelDict[key][propertyName]);}
return result;}
// use a function to create a image collection with forest layers
var calcForest = function(img){
var per_label = c.selectPer.selector.getValue();
var per = p.imgInfo[per_label].per;
var forest = img.gt(per)
           .multiply(ee.Image.pixelArea()) // To help compute areas, Earth Engine has the ee.Image.pixelArea() method which generates an image in which the value of each pixel is the pixel's area in square meters.
           .divide(10000)                  // to convert m2 to ha
           .set("system:time_start",img.get("system:time_start"));
return forest};
// Handles TCC (for YEAR 0) selection for new map layer display.
function zoomRegion() {
// Region
var region_name = c.selectRegion.selector.getValue();
var region_prefix = v0.imgInfo.lands[region_name].prefix;
var region_code = v0.imgInfo.lands[region_name].bname;
var region_zoom = v0.imgInfo.lands[region_name].zoom;
var prefix1 = eval(region_prefix);
if (region_name == 'Country' ) {
var region = VNM_0;
}
else {
var region = prefix1.filter('VARNAME_01 == "'+region_name+'"')
}
c.map.centerObject(region, region_zoom);//
}
// Handles background (for YEAR 0) selection for new map layer display.
 function updateBack0() {
var bufferBy = function(size) {return function(feature) {return feature.buffer(size);};};
var roi = getSelectedCountries().map(bufferBy(2000));
var year = c.selectYear0.slider.getValue();
var shown = c.selectYear0B.label.getValue();
///////////////////////////1988 < YEARS < 2009 /////////////////////////////////
if (year < 2010) {
////////////////////////////////////////////////////////////////////////////
if (year < 1992) {
var start = 1;var collection1 = 'T04';var collection2 = 'T05';}
else if (year == 1992) {
start = 1;collection1 = 'T05';collection2 = 'E07';}
else if (year > 1992 && year < 2010) {
start = 0;collection1 = 'T05';collection2 = 'E07';}
// -------------------------- PROCESS -------------------------------
// COLLECTIONS
var C1 = 'LANDSAT/L'+collection1+'/C01/T1_SR';
var C2 = 'LANDSAT/L'+collection2+'/C01/T1_SR';
// Bands for visualization
var visParam = {bands: ['B5','B4','B3'],min: 0,max: 5000};
// Set date range
var startDate = (year-start)+'-01-01';
var endDate = (year)+'-12-31';
// LANDSAT COLLECTIONs
var l1 = ee.ImageCollection(C1);
var l2 = ee.ImageCollection(C2);
// Filter Landsat 1st collection and mask clouds
var l1Filt = l1.filterBounds(roi)
                .filterDate(startDate,endDate)
                .filterMetadata('CLOUD_COVER','less_than',cloudCoverPerc)
                .sort('system:time_start')
                .map(cloudMaskL457);
// Filter Landsat 2nd collection, mask clouds, and rename bands
var l2Filt = l2.filterBounds(roi)
                .filterDate(startDate,endDate)
                .filterMetadata('CLOUD_COVER','less_than',cloudCoverPerc)
                .sort('system:time_start')
                .map(cloudMaskL457);
// Merge Landsat collections
var l12 = l1Filt.merge(l2Filt);
var l12_ = l1Filt.map(fillGap).merge(l2Filt);
var l12composite_ = l12_.median().clip(roi); // can be changed to mean, min, etc
var layer = ui.Map.Layer(l12composite_,visParam,'Landsat Bands5/3/4 ' + year,shown); // 0 do not show layer untill checkbox
c.map.layers().set(0, layer);
}
////////////////////////////// YEARS > 2009 /////////////////////////////////
else if (year > 2009) {
////////////////////////////////////////////////////////////////////////////
start = 0;collection1 = 'E07';collection2 = 'C08';
// -------------------------- PROCESS -------------------------------
// COLLECTIONS
C1 = 'LANDSAT/L'+collection1+'/C01/T1_SR';
C2 = 'LANDSAT/L'+collection2+'/C01/T1_SR';
// Bands for visualization
visParam = {
  bands: ['B6','B5','B4'], // R, G, B
  min: 0, // minimum spectral value
  max: 5000 // maximum spectral value
  };
// Set date range
startDate = (year-start)+'-01-01';
endDate = (year)+'-12-31';
// LANDSAT COLLECTIONS
l1 = ee.ImageCollection(C1);
l2 = ee.ImageCollection(C2);
// Filter Landsat 1st collection, mask clouds, and rename bands
l1Filt = l1.filterBounds(roi)//('VARNAME_01 == "'+region_name+'"')
                .filterDate(startDate,endDate)
                .filterMetadata('CLOUD_COVER','less_than',cloudCoverPerc)
                .sort('system:time_start')
                .map(cloudMaskL457)
                .map(rename);
// Filter Landsat 2nd collection and mask clouds, and rename bands
l2Filt = l2.filterBounds(roi)
                .filterDate(startDate,endDate)
                .filterMetadata('CLOUD_COVER','less_than',cloudCoverPerc)
                .sort('system:time_start')
                .map(maskL8srClouds)
                .select('B2','B3','B4','B5','B6','B7');
// Merge Landsat collections
l12 = l1Filt.merge(l2Filt);
l12_ = l1Filt.map(fillGap).merge(l2Filt);
l12composite_ = l12_.median().clip(roi); // can be changed to mean, min, etc
layer = ui.Map.Layer(l12composite_,visParam,'Landsat Bands 5/3/4 ' + year,shown); // 0 do not show layer untill checkbox
c.map.layers().set(0, layer);
}
c.selectYear0B.label.onChange(function(checked){
layer.setShown(checked)
})
}
// Handles TCC (for YEAR 0) selection for new map layer display.
function updateMap0() {
// Percentage TCC
var per_label = c.selectPer.selector.getValue();
var per = p.imgInfo[per_label].per;
// Region
var region_name = c.selectRegion.selector.getValue();
var region_prefix = v0.imgInfo.lands[region_name].prefix;
var region_code = v0.imgInfo.lands[region_name].bname;
var region_zoom = v0.imgInfo.lands[region_name].zoom;
var prefix1 = eval(region_prefix);
if (region_name == 'Country' ) {
var region = VNM_0;
}
else {
var region = prefix1.filter('VARNAME_01 == "'+region_name+'"')
}
// 1st Year
var band = 'Canopy Cover';
var band0 = 'Canopy Cover0';
var year0 = c.selectYear0.slider.getValue();
var shown0 = c.selectYear0.label.getValue();
var img0 = ee.Image(prefix+parseInt(year0, 10))
.select(m.imgInfo.bands[band].bname).clip(region);
var mask0 = img0.gt(per);
var layer0 = ui.Map.Layer(
img0.updateMask(mask0),
m.imgInfo.bands[band0].vis,
band + ', ' + year0, shown0); // 0 do not show layer untill checkbox
c.map.layers().set(1, layer0);
c.selectYear0.label.onChange(function(checked){
layer0.setShown(checked)
})
}
// Handles TCC (for YEAR 0) selection for new map layer display for Example Location
function updateMap01() {
// Percentage TCC
var per_label = c.selectPer.selector.getValue();
var per = p.imgInfo[per_label].per;
// Region
var region_name1 = c.selectExample.selector.getValue();
var region_name = m.exLocInfo[region_name1].rname;
var region_prefix = v0.imgInfo.lands[region_name].prefix;
var region_code = v0.imgInfo.lands[region_name].bname;
var region_zoom = v0.imgInfo.lands[region_name].zoom;
var prefix1 = eval(region_prefix);
if (region_name == 'Country' ) {
var region = VNM_0;
}
else {
var region = prefix1.filter('VARNAME_01 == "'+region_name+'"')
}
// 1st Year
var band = 'Canopy Cover';
var band0 = 'Canopy Cover0';
var year0 = c.selectYear0.slider.getValue();
var shown0 = c.selectYear0.label.getValue();
var img0 = ee.Image(prefix+parseInt(year0, 10))
.select(m.imgInfo.bands[band].bname).clip(region);
var mask0 = img0.gt(per);
var layer0 = ui.Map.Layer(
img0.updateMask(mask0),
m.imgInfo.bands[band0].vis,
band + ', ' + year0, shown0); // 0 do not show layer untill checkbox
c.map.layers().set(1, layer0);
c.selectYear0.label.onChange(function(checked){
layer0.setShown(checked)
})
}
// Handles background (for YEAR) selection for new map layer display.
function updateBack() {
var bufferBy = function(size) {return function(feature) {return feature.buffer(size);};};
var roi = getSelectedCountries().map(bufferBy(2000));
var year = c.selectYear.slider.getValue();
var shown = c.selectYearB.label.getValue();
//print(shown)
///////////////////////////1988 < YEARS < 2009 /////////////////////////////////
if (year < 2010) {
////////////////////////////////////////////////////////////////////////////
if (year < 1992) {
var start = 1;var collection1 = 'T04';var collection2 = 'T05';}
else if (year == 1992) {
start = 1;collection1 = 'T05';collection2 = 'E07';}
else if (year > 1992 && year < 2010) {
start = 0;collection1 = 'T05';collection2 = 'E07';}
// -------------------------- PROCESS -------------------------------
// COLLECTIONS
var C1 = 'LANDSAT/L'+collection1+'/C01/T1_SR';
var C2 = 'LANDSAT/L'+collection2+'/C01/T1_SR';
// Bands for visualization
var visParam = {
  bands: ['B5','B4','B3'], // R, G, B
  min: 0, // minimum spectral value
  max: 5000 // maximum spectral value
  };
// Set date range
var startDate = (year-start)+'-01-01';
var endDate = (year)+'-12-31';
// LANDSAT COLLECTIONs
var l1 = ee.ImageCollection(C1);
var l2 = ee.ImageCollection(C2);
// Filter Landsat 1st collection and mask clouds
var l1Filt = l1.filterBounds(roi)
                .filterDate(startDate,endDate)
                .filterMetadata('CLOUD_COVER','less_than',cloudCoverPerc)
                .sort('system:time_start')
                .map(cloudMaskL457);
// Filter Landsat 2nd collection, mask clouds, and rename bands
var l2Filt = l2.filterBounds(roi)
                .filterDate(startDate,endDate)
                .filterMetadata('CLOUD_COVER','less_than',cloudCoverPerc)
                .sort('system:time_start')
                .map(cloudMaskL457);
// Merge Landsat collections
var l12 = l1Filt.merge(l2Filt);
var l12_ = l1Filt.map(fillGap).merge(l2Filt);
// Composite images
//var l1composite = l1Filt.median(); // can be changed to mean, min, etc
//var l2composite = l2Filt.median(); // can be changed to mean, min, etc
//var l12composite = l12.median(); // can be changed to mean, min, etc
var l12composite_ = l12_.median().clip(roi); // can be changed to mean, min, etc
var layer = ui.Map.Layer(l12composite_,visParam,'Landsat Bands 5/3/4 ' + year,shown); // 0 do not show layer untill checkbox
c.map.layers().set(2, layer);
}
////////////////////////////// YEARS > 2009 /////////////////////////////////
else if (year > 2009) {
////////////////////////////////////////////////////////////////////////////
start = 0;collection1 = 'E07';collection2 = 'C08';
// -------------------------- PROCESS -------------------------------
// COLLECTIONS
C1 = 'LANDSAT/L'+collection1+'/C01/T1_SR';
C2 = 'LANDSAT/L'+collection2+'/C01/T1_SR';
// Bands for visualization
visParam = {
  bands: ['B6','B5','B4'], // R, G, B
  min: 0, // minimum spectral value
  max: 5000 // maximum spectral value
  };
// Set date range
startDate = (year-start)+'-01-01';
endDate = (year)+'-12-31';
// LANDSAT COLLECTIONS
l1 = ee.ImageCollection(C1);
l2 = ee.ImageCollection(C2);
// Filter Landsat 1st collection, mask clouds, and rename bands
l1Filt = l1.filterBounds(roi)//('VARNAME_01 == "'+region_name+'"')
                .filterDate(startDate,endDate)
                .filterMetadata('CLOUD_COVER','less_than',cloudCoverPerc)
                .sort('system:time_start')
                .map(cloudMaskL457)
                .map(rename);
// Filter Landsat 2nd collection and mask clouds, and rename bands
l2Filt = l2.filterBounds(roi)
                .filterDate(startDate,endDate)
                .filterMetadata('CLOUD_COVER','less_than',cloudCoverPerc)
                .sort('system:time_start')
                .map(maskL8srClouds)
                .select('B2','B3','B4','B5','B6','B7');
// Merge Landsat collections
l12 = l1Filt.merge(l2Filt);
l12_ = l1Filt.map(fillGap).merge(l2Filt);
// Composite images
//l1composite = l1Filt.median(); // can be changed to mean, min, etc
//l2composite = l2Filt.median(); // can be changed to mean, min, etc
//l12composite = l12.median(); // can be changed to mean, min, etc
l12composite_ = l12_.median().clip(roi); // can be changed to mean, min, etc
layer = ui.Map.Layer(l12composite_,visParam,'Landsat Bands 5/3/4 ' + year,shown); // 0 do not show layer untill checkbox
c.map.layers().set(2, layer);
}
c.selectYearB.label.onChange(function(checked){
layer.setShown(checked)
})
}
// Handles TCC (for YEAR) selection for new map layer display.
function updateMap() {
// Percentage TCC
var per_label = c.selectPer.selector.getValue();
var per = p.imgInfo[per_label].per;
// Region
var region_name = c.selectRegion.selector.getValue();
var region_prefix = v0.imgInfo.lands[region_name].prefix;
var region_code = v0.imgInfo.lands[region_name].bname;
var region_zoom = v0.imgInfo.lands[region_name].zoom;
var prefix1 = eval(region_prefix);
if (region_name == 'Country' ) {
var region = VNM_0;
}
else {
var region = prefix1.filter('VARNAME_01 == "'+region_name+'"')
}
// 1st Year
var band = 'Canopy Cover';
var year = c.selectYear.slider.getValue();
var shown = c.selectYear.label.getValue();
//print(shown)
var img = ee.Image(prefix+parseInt(year, 10))
.select(m.imgInfo.bands[band].bname).clip(region);
var mask = img.gt(per);
var layer = ui.Map.Layer(
img.updateMask(mask),
m.imgInfo.bands[band].vis,
band + ', ' + year, shown); // 0 do not show layer untill checkbox
c.map.layers().set(3, layer);
c.selectYear.label.onChange(function(checked){
layer.setShown(checked)
})
}
// Handles TCC (for YEAR) selection for new map layer display for Example Location
function updateMap1() {
// Percentage TCC
var per_label = c.selectPer.selector.getValue();
var per = p.imgInfo[per_label].per;
// Region
var region_name1 = c.selectExample.selector.getValue();
var region_name = m.exLocInfo[region_name1].rname;
var region_prefix = v0.imgInfo.lands[region_name].prefix;
var region_code = v0.imgInfo.lands[region_name].bname;
var region_zoom = v0.imgInfo.lands[region_name].zoom;
var prefix1 = eval(region_prefix);
if (region_name == 'Country' ) {
var region = VNM_0;
}
else {
var region = prefix1.filter('VARNAME_01 == "'+region_name+'"')
}
// 1st Year
var band = 'Canopy Cover';
var year = c.selectYear.slider.getValue();
var shown = c.selectYear.label.getValue();
//print(shown)
var img = ee.Image(prefix+parseInt(year, 10))
.select(m.imgInfo.bands[band].bname).clip(region);
var mask = img.gt(per);
var layer = ui.Map.Layer(
img.updateMask(mask),
m.imgInfo.bands[band].vis,
band + ', ' + year, shown); // 0 do not show layer untill checkbox
c.map.layers().set(3, layer);
c.selectYear.label.onChange(function(checked){
layer.setShown(checked)
})
}
// Handles LG (between YEAR & YEAR0) selection for new map layer display.
function updateLG() {
// Percentage TCC
var per_label = c.selectPer.selector.getValue();
var per = p.imgInfo[per_label].per;
// Region
var region_name = c.selectRegion.selector.getValue();
var region_prefix = v0.imgInfo.lands[region_name].prefix;
var region_code = v0.imgInfo.lands[region_name].bname;
var region_zoom = v0.imgInfo.lands[region_name].zoom;
var prefix1 = eval(region_prefix);
if (region_name == 'Country' ) {
var region = VNM_0;
}
else {
var region = prefix1.filter('VARNAME_01 == "'+region_name+'"')
}
// 2nd Year
var band = 'Canopy Cover';
var year = c.selectYear.slider.getValue();
var img = ee.Image(prefix+parseInt(year, 10))
.select(m.imgInfo.bands[band].bname).clip(region);
// 1st Year
var band0 = 'Canopy Cover0';
var year0 = c.selectYear0.slider.getValue();
var img0 = ee.Image(prefix+parseInt(year0, 10))
.select(m.imgInfo.bands[band].bname).clip(region);
// use PER% as a threshold for forest
var shown = c.LossGain.label.getValue();
//print(shown)
var forest0  = img0.gt(per);
var forest  = img.gt(per);
var baseline = forest0.unmask(0);
var image = forest.unmask(0);
var lossGain = image.subtract(baseline);
var layerLG = ui.Map.Layer(
lossGain.updateMask(lossGain.neq(0)),
{min:-1,max:1,palette:"red,blue"},
'Loss and Gain between ' + year0+' and '+ year,shown); // 0 do not show layer untill checkbox
c.map.layers().set(4, layerLG);
c.LossGain.label.onChange(function(checked){
layerLG.setShown(checked)})
}
// Handles year and band selection for new map layer display for Example Location
function updateLG1() {
// Percentage TCC
var per_label = c.selectPer.selector.getValue();
var per = p.imgInfo[per_label].per;
// Region
var region_name1 = c.selectExample.selector.getValue();
var region_name = m.exLocInfo[region_name1].rname;
c.selectRegion.selector.setValue(findKey(v0.imgInfo.lands, 'rname', ui.url.get('lands', region_name)),false);
var region_prefix = v0.imgInfo.lands[region_name].prefix;
var region_code = v0.imgInfo.lands[region_name].bname;
var region_zoom = v0.imgInfo.lands[region_name].zoom;
var prefix1 = eval(region_prefix);
//print(region_name)
//print(typeof(region_name))
if (region_name == 'Country' ) {
var region = VNM_0;
}
else {
var region = prefix1.filter('VARNAME_01 == "'+region_name+'"')
}
// 2nd Year
var band = 'Canopy Cover';
var year = c.selectYear.slider.getValue();
var img = ee.Image(prefix+parseInt(year, 10))
.select(m.imgInfo.bands[band].bname).clip(region);
// 1st Year
var band0 = 'Canopy Cover0';
var year0 = c.selectYear0.slider.getValue();
var img0 = ee.Image(prefix+parseInt(year0, 10))
.select(m.imgInfo.bands[band].bname).clip(region);
// use PER% as a threshold for forest
var shown = c.LossGain.label.getValue();
//print(shown)
var forest0  = img0.gt(per);
var forest  = img.gt(per);
var baseline = forest0.unmask(0);
var image = forest.unmask(0);
var lossGain = image.subtract(baseline);
var layerLG = ui.Map.Layer(
lossGain.updateMask(lossGain.neq(0)),
{min:-1,max:1,palette:"red,blue"},
'Loss and Gain between ' + year0+' and '+ year,shown); // 0 do not show layer untill checkbox
c.map.layers().set(4, layerLG);
c.LossGain.label.onChange(function(checked){
layerLG.setShown(checked)})
}
// Handles year and band selection for new map layer display.
function updateBoundary() {
// Region
var boundary_region = c.selectRegion.selector.getValue();
var boundary_region_code = v0.imgInfo.lands[boundary_region].region;
var boundary_name = c.selectBoundary.selector.getValue();
var boundary_code = v.imgInfo.units[boundary_name].bname;
if (boundary_region == 'Country' ) {
var img1 = ee.FeatureCollection(prefix1+boundary_code)
}
else {
img1 = ee.FeatureCollection(prefix1+boundary_code).filter('Region == '+boundary_region_code);
}
var empty = ee.Image().byte();
var outline = empty.paint({featureCollection: img1,width: .5});
var layer = ui.Map.Layer(outline, COUNTRIES_STYLE, boundary_name,shown);
c.map.layers().set(5, layer);
var shown = c.selectBoundary.label.getValue();
c.selectBoundary.label.onChange(function(checked){
layer.setShown(checked)});
  selectedPoints = [];
  c.map.layers().remove(c.map.layers().get(6));
  c.chart.chartPanel.style().set('shown', false);
}
// Handles year and band selection for new map layer display for Example Location
function updateBoundary1() {
// Region
//var boundary_region = c.selectRegion.selector.getValue();
var boundary_region1 = c.selectExample.selector.getValue();
//print(boundary_region1)
var boundary_region = m.exLocInfo[boundary_region1].rname;
var boundary_region_code = v0.imgInfo.lands[boundary_region].region;
var boundary_name = c.selectBoundary.selector.getValue();
var boundary_code = v.imgInfo.units[boundary_name].bname;
if (boundary_region == 'Country' ) {
var img1 = ee.FeatureCollection(prefix1+boundary_code)
}
else {
img1 = ee.FeatureCollection(prefix1+boundary_code).filter('Region == '+boundary_region_code);
}
var empty = ee.Image().byte();
var outline = empty.paint({featureCollection: img1,width: .5});
var layer = ui.Map.Layer(outline, COUNTRIES_STYLE, boundary_name,shown);
c.map.layers().set(5, layer);
var shown = c.selectBoundary.label.getValue();
c.selectBoundary.label.onChange(function(checked){
layer.setShown(checked)});
  selectedPoints = [];
  c.map.layers().remove(c.map.layers().get(6));
  c.chart.chartPanel.style().set('shown', false);
}
/*******************************************************************************
********************************************************************************
SELECT POLYGONS FOR CHART MAKING
*******************************************************************************
******************************************************************************/
// A list of points the user has clicked on, as [lon,lat] tuples.
var selectedPoints = [];
// Returns the list of countries the user has selected.
function getSelectedCountries() {
var boundary_name = c.selectBoundary.selector.getValue();
var boundary_code = v.imgInfo.units[boundary_name].bname;
//print(boundary_code)
var Units = ee.FeatureCollection(prefix1+boundary_code);
//print(Units)
return Units.filterBounds(ee.Geometry.MultiPoint(selectedPoints));
}
/*******************************************************************************
********************************************************************************
DRAW POLYGON
*******************************************************************************
******************************************************************************/
function clearSelectedCountries() {
  selectedPoints = [];
  c.map.layers().remove(c.map.layers().get(6));
  c.chart.container.style().set({shown: false});
  c.chart.chartPanel.style().set('shown', false);
  var drawingTools = Map.drawingTools();
  drawingTools.setShown(false);
//  var selectedPoints =ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '23cba7'});
  c.selectPolygonPol1.onClick(drawPolygon);
}
//c.selectPolygonPol1.onClick(clearSelectedCountries);
//c.selectPolygonPol2.onClick(clearSelectedCountries);
// Updates the map overlay using the currently-selected countries.
function updateOverlay() {
var shown = c.selectAUchart.label.getValue();
if (shown === true){
//var bufferBy = function(size) {return function(feature) {return feature.buffer(size);};};
//var overlay = getSelectedCountries().map(bufferBy(100)).style(HIGHLIGHT_STYLE);
var overlay = getSelectedCountries().style(HIGHLIGHT_STYLE);
c.map.layers().set(6, ui.Map.Layer(overlay));
}
}
/*******************************************************************************
THE CHART PANEL IN THE BOTTOM RIGHT CORNER
******************************************************************************/
function drawChart(location) { //makeResultsImageSeries
var tcc_forest = tcc.map(calcForest);
// Show the chart panel if this is the first time a point is clicked.
if (!c.chart.chartPanel.style().get('shown')) {
c.chart.chartPanel.style().set('shown', true);
c.chart.container.style().set({'shown': true});
c.chart.shownButton.setLabel('Hide chart');
}
// Makes a ImageSeries of the given FeatureCollection of Provinces by name.
var boundary_name = c.selectBoundary.selector.getValue();
var boundary_unit = v.imgInfo.units[boundary_name].uname;
var styleChartAxis = {italic: false,bold: true};
var styleChartArea = {width: '300px',height: '155px',margin: '0px',padding: '0px'};
// Set chart style properties.
var chartStyle1 = {
  title: 'Selected '+boundary_name,
  titlePostion: 'none', //'top-center',
  hAxis: {title: 'Year'},
  vAxis: {title: 'Forest Area [ha]'}, //  vAxis: {title: 'NDSI', maxValue: 1, minValue: -1},
  // series: {
  //     0: {lineWidth: 2, color: 'E37D05'},
  //     1: {lineWidth: 2, color: '1D6B99', lineDashStyle: [4, 4]},
  //     2: {lineWidth: 2, color: 'E37D05'},
  //     3: {lineWidth: 2, color: '1D6B99', lineDashStyle: [4, 4]},
  //     }
}
//print(getSelectedCountries())
var chart = ui.Chart.image.seriesByRegion({
                imageCollection: tcc_forest,
                regions: getSelectedCountries(),
                reducer: ee.Reducer.sum(),//ee.Reducer.sum(),
                scale: 300,
                xProperty: 'system:time_start'
              })
              .setSeriesNames(getSelectedCountries().aggregate_array(boundary_unit))//getSelectedCountries().aggregate_array("VARNAME_1")
              .setOptions(chartStyle1);
              chart.style().set(styleChartArea);
              c.chart.container.widgets().reset([chart]);
}
/*******************************************************************************
THE CHART PANEL IN THE BOTTOM LEFT CORNER
******************************************************************************/
// Define a function that gets called on geometry drawing completion and 
// editing events to generate a time series chart for the drawn region.
function drawChart1() { //makeResultsImageSeries
var tcc_forest = tcc.map(calcForest);
// Show the chart panel if this is the first time a point is clicked.
if (!d.chart.chartPanel.style().get('shown')) {
d.chart.chartPanel.style().set('shown', true);
d.chart.container.style().set({'shown': true});
d.chart.shownButton.setLabel('Hide chart');
}
// Get the drawn geometry; it will define the reduction region.
var layers = drawingTools.layers();
var last = layers.get(0).geometries().length();
if (last === 1){
    var aoi = layers.get(0).geometries().get(last-1);aoi = ee.Geometry(aoi, null, true)}
else if (last === 2){
    var aoi0 = layers.get(0).geometries().get(last-2);aoi0 = ee.Geometry(aoi0, null, true)
    var aoi1 = layers.get(0).geometries().get(last-1);aoi1 = ee.Geometry(aoi1, null, true)
    aoi = ee.FeatureCollection([ee.Feature(aoi0),ee.Feature(aoi1)]);}
else if (last === 3){
    aoi0 = layers.get(0).geometries().get(last-3);aoi0 = ee.Geometry(aoi0, null, true) 
    aoi1 = layers.get(0).geometries().get(last-2);aoi1 = ee.Geometry(aoi1, null, true)
    var aoi2 = layers.get(0).geometries().get(last-1);aoi2 = ee.Geometry(aoi2, null, true)
    aoi = ee.FeatureCollection([ee.Feature(aoi0),ee.Feature(aoi1),ee.Feature(aoi2)]);}
else if (last === 4){
    aoi0 = layers.get(0).geometries().get(last-4);aoi0 = ee.Geometry(aoi0, null, true) 
    aoi1 = layers.get(0).geometries().get(last-3);aoi1 = ee.Geometry(aoi1, null, true)
    aoi2 = layers.get(0).geometries().get(last-2);aoi2 = ee.Geometry(aoi2, null, true) 
    var aoi3 = layers.get(0).geometries().get(last-1);aoi3 = ee.Geometry(aoi3, null, true)
    aoi = ee.FeatureCollection([ee.Feature(aoi0),ee.Feature(aoi1),ee.Feature(aoi2),ee.Feature(aoi3)]);}
else if (last === 5){
    aoi0 = layers.get(0).geometries().get(last-5);aoi0 = ee.Geometry(aoi0, null, true)
    aoi1 = layers.get(0).geometries().get(last-4);aoi1 = ee.Geometry(aoi1, null, true)
    aoi2 = layers.get(0).geometries().get(last-3);aoi2 = ee.Geometry(aoi2, null, true)
    aoi3 = layers.get(0).geometries().get(last-2);aoi3 = ee.Geometry(aoi3, null, true)
    var aoi4 = layers.get(0).geometries().get(last-1);aoi4 = ee.Geometry(aoi4, null, true)
    aoi = ee.FeatureCollection([ee.Feature(aoi0),ee.Feature(aoi1),ee.Feature(aoi2),ee.Feature(aoi3),ee.Feature(aoi4)]);}
else if (last === 6){
    aoi0 = layers.get(0).geometries().get(last-6);aoi0 = ee.Geometry(aoi0, null, true)
    aoi1 = layers.get(0).geometries().get(last-5);aoi1 = ee.Geometry(aoi1, null, true)
    aoi2 = layers.get(0).geometries().get(last-4);aoi2 = ee.Geometry(aoi2, null, true)
    aoi3 = layers.get(0).geometries().get(last-3);aoi3 = ee.Geometry(aoi3, null, true)
    aoi4 = layers.get(0).geometries().get(last-2);aoi4 = ee.Geometry(aoi4, null, true)
    var aoi5 = layers.get(0).geometries().get(last-1);aoi5 = ee.Geometry(aoi5, null, true)
    aoi = ee.FeatureCollection([ee.Feature(aoi0),ee.Feature(aoi1),ee.Feature(aoi2),ee.Feature(aoi3),ee.Feature(aoi4),ee.Feature(aoi5)]);}
else if (last === 7){
    aoi0 = layers.get(0).geometries().get(last-7);aoi0 = ee.Geometry(aoi0, null, true)
    aoi1 = layers.get(0).geometries().get(last-6);aoi1 = ee.Geometry(aoi1, null, true)
    aoi2 = layers.get(0).geometries().get(last-5);aoi2 = ee.Geometry(aoi2, null, true)
    aoi3 = layers.get(0).geometries().get(last-4);aoi3 = ee.Geometry(aoi3, null, true)
    aoi4 = layers.get(0).geometries().get(last-3);aoi4 = ee.Geometry(aoi4, null, true)
    aoi5 = layers.get(0).geometries().get(last-2);aoi5 = ee.Geometry(aoi5, null, true)
    var aoi6 = layers.get(0).geometries().get(last-1);aoi6 = ee.Geometry(aoi6, null, true)
    aoi = ee.FeatureCollection([ee.Feature(aoi0),ee.Feature(aoi1),ee.Feature(aoi2),ee.Feature(aoi3),ee.Feature(aoi4),ee.Feature(aoi5),ee.Feature(aoi6)]);}
else if (last === 8){
    aoi0 = layers.get(0).geometries().get(last-8);aoi0 = ee.Geometry(aoi0, null, true)
    aoi1 = layers.get(0).geometries().get(last-7);aoi1 = ee.Geometry(aoi1, null, true)
    aoi2 = layers.get(0).geometries().get(last-6);aoi2 = ee.Geometry(aoi2, null, true)
    aoi3 = layers.get(0).geometries().get(last-5);aoi3 = ee.Geometry(aoi3, null, true)
    aoi4 = layers.get(0).geometries().get(last-4);aoi4 = ee.Geometry(aoi4, null, true)
    aoi5 = layers.get(0).geometries().get(last-3);aoi5 = ee.Geometry(aoi5, null, true)
    aoi6 = layers.get(0).geometries().get(last-2);aoi6 = ee.Geometry(aoi6, null, true)
    var aoi7 = layers.get(0).geometries().get(last-1);aoi7 = ee.Geometry(aoi7, null, true)
    aoi = ee.FeatureCollection([ee.Feature(aoi0),ee.Feature(aoi1),ee.Feature(aoi2),ee.Feature(aoi3),ee.Feature(aoi4),ee.Feature(aoi5),ee.Feature(aoi6),ee.Feature(aoi7)]);}
else if (last === 9){
    aoi0 = layers.get(0).geometries().get(last-9);aoi0 = ee.Geometry(aoi0, null, true)
    aoi1 = layers.get(0).geometries().get(last-8);aoi1 = ee.Geometry(aoi1, null, true)
    aoi2 = layers.get(0).geometries().get(last-7);aoi2 = ee.Geometry(aoi2, null, true)
    aoi3 = layers.get(0).geometries().get(last-6);aoi3 = ee.Geometry(aoi3, null, true)
    aoi4 = layers.get(0).geometries().get(last-5);aoi4 = ee.Geometry(aoi4, null, true)
    aoi5 = layers.get(0).geometries().get(last-4);aoi5 = ee.Geometry(aoi5, null, true)
    aoi6 = layers.get(0).geometries().get(last-3);aoi6 = ee.Geometry(aoi6, null, true)
    aoi7 = layers.get(0).geometries().get(last-2);aoi7 = ee.Geometry(aoi7, null, true)
    var aoi8 = layers.get(0).geometries().get(last-1);aoi8 = ee.Geometry(aoi8, null, true)
    aoi = ee.FeatureCollection([ee.Feature(aoi0),ee.Feature(aoi1),ee.Feature(aoi2),ee.Feature(aoi3),ee.Feature(aoi4),ee.Feature(aoi5),ee.Feature(aoi6),ee.Feature(aoi7),ee.Feature(aoi8)]);}
else if (last === 10){
    aoi0 = layers.get(0).geometries().get(last-10);aoi0 = ee.Geometry(aoi0, null, true)
    aoi1 = layers.get(0).geometries().get(last-9);aoi1 = ee.Geometry(aoi1, null, true)
    aoi2 = layers.get(0).geometries().get(last-8);aoi2 = ee.Geometry(aoi2, null, true)
    aoi3 = layers.get(0).geometries().get(last-7);aoi3 = ee.Geometry(aoi3, null, true)
    aoi4 = layers.get(0).geometries().get(last-6);aoi4 = ee.Geometry(aoi4, null, true)
    aoi5 = layers.get(0).geometries().get(last-5);aoi5 = ee.Geometry(aoi5, null, true)
    aoi6 = layers.get(0).geometries().get(last-4);aoi6 = ee.Geometry(aoi6, null, true)
    aoi7 = layers.get(0).geometries().get(last-3);aoi7 = ee.Geometry(aoi7, null, true)
    aoi8 = layers.get(0).geometries().get(last-2);aoi8 = ee.Geometry(aoi8, null, true)
    var aoi9 = layers.get(0).geometries().get(last-1);aoi9 = ee.Geometry(aoi9, null, true)
    aoi = ee.FeatureCollection([ee.Feature(aoi0),ee.Feature(aoi1),ee.Feature(aoi2),ee.Feature(aoi3),ee.Feature(aoi4),ee.Feature(aoi5),ee.Feature(aoi6),ee.Feature(aoi7),ee.Feature(aoi8),ee.Feature(aoi9)]);}
// Set the drawing mode back to null; turns drawing off.
//drawingTools.setShape(null);
// Reduction scale is based on map scale to avoid memory/timeout errors.
var mapScale = Map.getScale();
var scale = mapScale > 5000 ? mapScale * 2 : 5000;
var styleChartAxis = {italic: false,bold: true};
var styleChartArea = {width: '300px',height: '155px',margin: '0px',padding: '0px'};
// Set chart style properties.
var chartStyle2 = {
  title: 'Selected Area',
  titlePostion: 'none', //'top-center',
  hAxis: {title: 'Year'},
  vAxis: {title: 'Forest Area [ha]'}, //  vAxis: {title: 'NDSI', maxValue: 1, minValue: -1},
  // series: {
  //     0: {lineWidth: 2, color: 'E37D05'},
  //     1: {lineWidth: 2, color: '1D6B99', lineDashStyle: [4, 4]},
  //     2: {lineWidth: 2, color: '23cba7', lineDashStyle: [4, 4]},
  //     3: {lineWidth: 2, color: 'E37D05', lineDashStyle: [4, 4]}
  //     }
}
var chart = ui.Chart.image.seriesByRegion({
                imageCollection: tcc_forest,
                regions: aoi,//getSelectedAoi(),
                reducer: ee.Reducer.sum(),
                scale: 300,
                xProperty: 'system:time_start'
              })
              .setOptions(chartStyle2);
              chart.style().set(styleChartArea);
  d.chart.container.widgets().reset([chart]);
}
// Set the drawing tools widget to listen for geometry drawing and 
// editing events and respond with the drawChart1 function.
drawingTools.onDraw(ui.util.debounce(drawChart1, 500));
drawingTools.onEdit(ui.util.debounce(drawChart1, 500));
/*******************************************************************************
CHART FUNCTIONALITIES
******************************************************************************/
// Updates the chart using the currently-selected charting function,
function updateChart() {
var chartBuilder = chartTypeToggleButton.value;
var chart = chartBuilder(getSelectedCountries());
//c.chart.chartPanel.clear().add(chart).add(buttonPanel);
}
// Register a click handler for the map that adds the clicked point to the
// list and updates the map overlay and chart accordingly.
function handleMapClick(location) {
var shown = c.selectAUchart.label.getValue();
var shown1 = c.selectAUmap.label.getValue();
if (shown === true){
var boundary_name = c.selectBoundary.selector.getValue();
var boundary_zoom = v.imgInfo.units[boundary_name].zoom;
selectedPoints.push([location.lon, location.lat]);
updateOverlay();
updateChart();
if (shown1 === true){updateBack0();updateBack()}
c.map.setCenter(location.lon, location.lat, boundary_zoom);//
}}
c.map.onClick(handleMapClick);
// A button widget that toggles (or cycles) between states.
// To construct a ToggleButton, supply an array of objects describing
// the desired states, each with 'label' and 'value' properties.
function ToggleButton(states, onClick) {
var index = 0;
var button = ui.Button(states[index].label);
button.value = states[index].value;
button.onClick(function() {
index = ++index % states.length;
button.setLabel(states[index].label);
button.value = states[index].value;
onClick();
});
return button;
}
// Our chart type toggle button: the button text is the opposite of the
// current state, since you click the button to switch states.
var chartTypeToggleButton = ToggleButton(
  [{label: 'Display results as table',value: drawChart,}],updateChart);
function showHideChart() {
  var shown = true;
  var label = 'Hide chart';
  if (c.chart.shownButton.getLabel() == 'Hide chart') {
    shown = false;
    label = 'Show chart';
  }
  c.chart.container.style().set({shown: shown});
  c.chart.shownButton.setLabel(label);
}
c.chart.shownButton.onClick(showHideChart);
function showHideChart1() {
  var shown = true;
  var label = 'Hide chart';
  if (d.chart.shownButton.getLabel() == 'Hide chart') {
    shown = false;
    label = 'Show chart';
  }
  d.chart.container.style().set({shown: shown});
  d.chart.shownButton.setLabel(label);
}
d.chart.shownButton.onClick(showHideChart1);
// Show the chart panel if this is the first time a point is clicked.
function clearResults() {
if (c.chart.shownButton1.getLabel() == 'Clear results') {
  selectedPoints = [];
  c.map.layers().remove(c.map.layers().get(6));
  //var shown = false;
  //var label = 'Clear results';
  c.chart.shownButton1.setLabel('Clear results');
  c.chart.shownButton.setLabel('Show chart');
  c.chart.container.style().set({shown: false});
  //c.chart.buttontPanel.style().set({shown: false});
  c.chart.chartPanel.style().set('shown', false);
}
}
c.chart.shownButton1.onClick(clearResults);
// Show the chart panel if this is the first time a point is clicked.
function clearResults1() {
if (d.chart.shownButton1.getLabel() == 'Clear results') {
  clearPolygons();
  d.chart.shownButton1.setLabel('Clear results');
  d.chart.shownButton.setLabel('Show chart');
  d.chart.container.style().set({shown: false});
  //c.chart.buttontPanel.style().set({shown: false});
  d.chart.chartPanel.style().set('shown', false);
}
}
d.chart.shownButton1.onClick(clearResults1);
function zoomToLoc(loc) {
c.selectExample.descLabel.setValue(m.exLocInfo[loc].desc);
c.selectExample.descLabel1.setValue(m.exLocInfo[loc].desc1);
//c.selectExample.txt.setValue(m.exLocInfo[loc].txt);
//c.selectExample.txtUrl.setValue(m.exLocInfo[loc].txtUrl);
var example = c.selectExample.selector.getValue(); 
if(m.exLocInfo[example]!==undefined) {
var testo = m.exLocInfo[example].txt; var testo1 = m.exLocInfo[example].txt1;
var testo2 = m.exLocInfo[example].txt2; var testo3 = m.exLocInfo[example].txt3;
var link = m.exLocInfo[example].txtUrl; var link1 = m.exLocInfo[example].txtUrl1;
var link2 = m.exLocInfo[example].txtUrl2; var link3 = m.exLocInfo[example].txtUrl3;
c.updateUrl = {};
c.updateUrl.paperLabel = ui.Label({value: testo,targetUrl: link});
c.updateUrl.paperLabel1 = ui.Label({value: testo1,targetUrl: link1});
c.updateUrl.paperLabel2 = ui.Label({value: testo2,targetUrl: link2});
c.updateUrl.paperLabel3 = ui.Label({value: testo3,targetUrl: link3});
}
c.controlPanel.widgets().set(14, ui.Panel(c.updateUrl.paperLabel));
c.controlPanel.widgets().set(15, ui.Panel(c.updateUrl.paperLabel1));
c.controlPanel.widgets().set(16, ui.Panel(c.updateUrl.paperLabel2));
c.controlPanel.widgets().set(17, ui.Panel(c.updateUrl.paperLabel3));
  c.map.setCenter(
    m.exLocInfo[loc].lon + 0.05,  // shift map left to avoid chart.
    m.exLocInfo[loc].lat,
    m.exLocInfo[loc].zoom);
  var coords = {lon: m.exLocInfo[loc].lon, lat: m.exLocInfo[loc].lat};
}
function matchSelectors(){
  var ex_name = c.selectExample.selector.getValue();
  var ex_region = m.exLocInfo[ex_name].rname;
  c.selectRegion.selector.setValue(ex_region);
}
function matchSelectors1(){
  var ex_name = c.selectRegion.selector.getValue();
  // print(ex_name)
  var ex_region = v0.imgInfo[ex_name].rname;
  c.selectExample.selector.setValue(ex_region);
}
// c.selectRegion.selector.setValue(
// findKey(v0.imgInfo.lands, 'rname', ui.url.get('lands', 'Country')),
// false);
// c.selectExample.selector.getValue();
/*******************************************************************************
Update Url
******************************************************************************/
function updateUrlParamRegion(newValue) {
var lands = getPropertyValueList(v0.imgInfo.lands);
ui.url.set('lands', v0.imgInfo.lands[newValue].rname);}
c.selectRegion.selector.onChange(updateUrlParamRegion);
c.selectRegion.selector.onChange(zoomRegion); // Zoom on the selected Region
function updateUrlParamAU(newValue) {
var lands = getPropertyValueList(v.imgInfo.units);
ui.url.set('units', v.imgInfo.units[newValue].rname);}
c.selectBoundary.selector.onChange(updateUrlParamAU);
function updateUrlParamYear0(newValue) {ui.url.set('year0', newValue);}
c.selectYear0.slider.onChange(updateUrlParamYear0);
c.selectYear0.slider.onChange(updateMap);
function updateUrlParamYear(newValue) {ui.url.set('year', newValue);}
c.selectYear.slider.onChange(updateUrlParamYear);
c.selectYear.slider.onChange(updateMap);
function updateUrlParamPer(newValue) {ui.url.set('per', p.imgInfo[c.selectPer.selector.getValue()].per);}//p.imgInfo[newValue].per newValue
// var per_label = c.selectPer.selector.getValue();
// var per = p.imgInfo[per_label].per; p.imgInfo[c.selectPer.selector.getValue()].per
// print(p.imgInfo[c.selectPer.selector.getValue()].per)
c.selectPer.selector.onChange(updateUrlParamPer)
//c.selectPer.selector.onChange(updateMap);
function updateUrlParamExample(newValue) {
// c.selectRegion.selector.setValue(
// findKey(v0.imgInfo.lands, 'rname', ui.url.get('lands', 'Country')),
// false);m.exLocInfo[region_name1].rname
  ui.url.set('example', m.exLocInfo[newValue].urlSlug);
}
//c.selectExample.selector.onChange(updateUrlParamExample);
//c.selectExample.selector.onChange(removePanel);
// ZOOM
function updateUrlParamMap(newMapParams) {
  ui.url.set('lat', newMapParams.lat);
  ui.url.set('lon', newMapParams.lon);
  ui.url.set('zoom', newMapParams.zoom);
}
c.map.onChangeBounds(ui.util.debounce(updateUrlParamMap, 100));
//c.selectRegion.selector.onChange(updateBack0);
c.selectYear0.slider.onChange(updateBack0);
c.selectRegion.selector.onChange(updateMap0);
//c.selectYear0.slider.onChange(updateMap01);
c.selectYear0.slider.onChange(updateMap0);
//c.selectRegion.selector.onChange(updateBack);
c.selectYear.slider.onChange(updateBack);
c.selectRegion.selector.onChange(updateMap);
// c.selectYear.slider.onChange(updateMap1);
c.selectYear.slider.onChange(updateMap);
// c.selectYear0.slider.onChange(updateLG1);
c.selectYear0.slider.onChange(updateLG);
// c.selectYear.slider.onChange(updateLG1);
c.selectYear.slider.onChange(updateLG);
c.selectExample.selector.onChange(updateLG1)
c.selectRegion.selector.onChange(updateLG);
c.selectExample.selector.onChange(updateMap01)
c.selectExample.selector.onChange(updateMap1)
c.selectExample.selector.onChange(matchSelectors)
//c.selectRegion.selector.onChange(matchSelectors1)
c.selectExample.selector.onChange(zoomToLoc);
//c.selectExample.selector.onChange(updateExampleUrl)
c.selectRegion.selector.onChange(updateBoundary);
c.selectExample.selector.onChange(updateBoundary1)
c.selectBoundary.selector.onChange(updateBoundary);
//c.selectRegion.selector.onChange(updateBoundary);
c.selectPer.selector.onChange(updateLG);
//c.selectPer.selector.onChange(updateLG1);
//c.selectPer.selector.onChange(updateMap01);
//c.selectPer.selector.onChange(updateMap1);
c.selectPer.selector.onChange(updateMap0);
c.selectPer.selector.onChange(updateMap);
/*******************************************************************************
 * Initialize *
 *
 * A section to initialize the app state on load.
 *
 * Guidelines:
 * 1. At the top, define any helper functions.
 * 2. As much as possible, use URL params to initial the state of the app.
 ******************************************************************************/
function findKey(dataModelDict, propertyName, propertyValue){
// Find the first dictionary key for a specified property value.
for (var key in dataModelDict) {
if (dataModelDict[key][propertyName] == propertyValue) {
  return key;
}
}
return null;
}
//Set model state based on URL parameters or default values.
//zoomRegion();
c.map.setCenter({
lon: ui.url.get('lon', 106.008563),
lat: ui.url.get('lat', 15.409503),
zoom: ui.url.get('zoom', 6)
});
// ZOOM
function updateUrlParamMap(newMapParams){
  ui.url.set('lat', newMapParams.lat);
  ui.url.set('lon', newMapParams.lon);
  ui.url.set('zoom', newMapParams.zoom);
}
c.map.onChangeBounds(ui.util.debounce(updateUrlParamMap, 100));
c.selectYear0.slider.setValue(ui.url.get('year0', 1990), false);
c.selectYear.slider.setValue(ui.url.get('year', 2021), false);
c.selectBoundary.selector.setValue(
findKey(v.imgInfo.units, 'rname', ui.url.get('units', 'Provinces')),
false);
c.selectRegion.selector.setValue(
findKey(v0.imgInfo.lands, 'rname', ui.url.get('lands', 'Country')),
false);
c.selectExample.selector.getValue();
// c.selectExample.selector.setValue(
// findKey(m.exLocInfo, 'rname', ui.url.get('lands', 'South')),
// false);
//Render the map and legend.
//updateLegend();
//zoomRegion();
updateBack0();
updateMap0();
updateBack();
updateMap();
updateLG();
//updateLG1();
updateBoundary();
//updateBoundary1();